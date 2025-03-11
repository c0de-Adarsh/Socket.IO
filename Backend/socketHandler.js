const { getUsersInRoom, addUser, removeUser, getUser } = require('./Utils/user');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Join a room
    socket.on('join', ({ userId, username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, userId, username, room });
      
      if (error) return callback({ error });
      
      socket.join(user.room);
      
      // Welcome message to the user - सिस्टम मैसेज का फॉर्मेट सही करें
      socket.emit('message', {
        _id: new Date().getTime().toString(),
        content: `Welcome to the room ${user.room}, ${user.username}!`,
        sender: { 
          _id: 'system', 
          username: 'System' 
        },
        createdAt: new Date().toISOString()
      });
      
      // Broadcast to others in the room - सिस्टम मैसेज का फॉर्मेट सही करें
      socket.broadcast.to(user.room).emit('message', {
        _id: new Date().getTime().toString() + '-join',
        content: `${user.username} has joined!`,
        sender: { 
          _id: 'system', 
          username: 'System' 
        },
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
      console.log("Message received from client:", message);
      const user = getUser(socket.id);
      if (!user) return callback({ error: 'User not found' });
      
      // मैसेज फॉर्मेट को सही करें
      const formattedMessage = {
        _id: new Date().getTime().toString(), // एक यूनिक ID बनाएं
        content: message,  // 'text' के बजाय 'content' का इस्तेमाल करें
        sender: { 
          _id: user.userId, 
          username: user.username 
        },
        createdAt: new Date().toISOString()
      };
      
      console.log("Sending formatted message to room:", formattedMessage);
      // सभी यूजर्स को एक ही मैसेज भेजें
      io.to(user.room).emit('message', formattedMessage);
      
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
        // सिस्टम मैसेज का फॉर्मेट सही करें
        io.to(user.room).emit('message', {
          _id: new Date().getTime().toString() + '-leave',
          content: `${user.username} has left.`,
          sender: { 
            _id: 'system', 
            username: 'System' 
          },
          createdAt: new Date().toISOString()
        });
        
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room)
        });
        console.log("📢 Users in Room:", getUsersInRoom(user.room));
      }
    });
  });
};

module.exports = { socketHandler };