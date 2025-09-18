import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const newSocket = io('http://localhost:5000', {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

      newSocket.on('users:online', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('users:all', (users) => {
        setAllUsers(users);
      });

      newSocket.on('message:new', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on('messages:history', (history) => {
        setMessages(history);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token]);

  const sendMessage = (content) => {
    if (socket) {
      socket.emit('message:send', { content });
    }
  };

  const loadMessages = () => {
    if (socket) {
      socket.emit('messages:load');
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, allUsers, messages, sendMessage, loadMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};