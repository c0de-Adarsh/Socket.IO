import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { setUsers } from '../Slice/roomSlice';
import { addMessage } from '../Slice/messageSlice';

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  setTyping: () => {}
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeRoom } = useSelector((state) => state.rooms);

  useEffect(() => {
    // Initialize socket connection 
    const newSocket = io('https://chat-app-jmtx.onrender.com', {
      withCredentials: true
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });

    newSocket.on('message', (message) => {
      console.log('Received message from server:', message);
      
     
      dispatch(addMessage(message));
    });

    newSocket.on('roomData', ({ users }) => {
      console.log('Room data updated:', users);
      dispatch(setUsers(users));
    });

    newSocket.on('userTyping', (data) => {
      console.log('User typing:', data);
      
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  // Join a chat room
  const joinRoom = (roomData) => {
    if (socket && isConnected) {
      socket.emit('join', roomData, (error) => {
        if (error) {
          console.error('Error joining room:', error);
        }
      });
    }
  };

  // Leave the current room
  const leaveRoom = () => {
    if (socket && isConnected && activeRoom) {
      socket.emit('leaveRoom');
    }
  };

  // Send a message
  const sendMessage = (message, callback) => {
    if (socket && isConnected) {
    
      socket.emit('sendMessage', message, (response) => {
        if (response && response.error) {
          console.error('Error sending message:', response.error);
        }
        if (callback) callback(response);
      });
    }
  };

  // Set typing indicator
  const setTyping = (isTyping) => {
    if (socket && isConnected) {
      socket.emit('typing', isTyping);
    }
  };

  return (
    <SocketContext.Provider value={{ 
      socket, 
      isConnected, 
      joinRoom, 
      leaveRoom, 
      sendMessage, 
      setTyping 
    }}>
      {children}
    </SocketContext.Provider>
  );
};