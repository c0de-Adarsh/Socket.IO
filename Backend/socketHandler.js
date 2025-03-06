const  { getUsersInRoom, addUser, removeUser, getUser } = require('./Utils/user')


 const socketHandler = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);
  
      // Join a room
      socket.on('join', ({ userId, username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, userId, username, room });
  
        if (error) return callback({ error });
  
        socket.join(user.room);
  
        // Welcome message to the user
        socket.emit('message', {
          user: 'system',
          text: `Welcome to the room ${user.room}, ${user.username}!`,
          createdAt: new Date().toISOString()
        });
  
        // Broadcast to others in the room
        socket.broadcast.to(user.room).emit('message', {
          user: 'system',
          text: `${user.username} has joined!`,
          createdAt: new Date().toISOString()
        });
  
        // Send users in room info
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)
        });
  
        callback();
      });
  
      // Handle messages
      socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (!user) return callback({ error: 'User not found' });
  
        io.to(user.room).emit('message', {
          userId: user.userId,
          user: user.username,
          text: message,
          createdAt: new Date().toISOString()
        });
  
        callback();
      });
  
      // Handle typing indicator
      socket.on('typing', (isTyping) => {
        const user = getUser(socket.id);
        if (!user) return;
  
        socket.broadcast.to(user.room).emit('userTyping', {
          userId: user.userId,
          username: user.username,
          isTyping
        });
      });
  
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        const user = removeUser(socket.id);
  
        if (user) {
          io.to(user.room).emit('message', {
            user: 'system',
            text: `${user.username} has left.`,
            createdAt: new Date().toISOString()
          });
  
          io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
          });
        }
      });
    });
  };

  module.exports = {socketHandler}