const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const connectedUsers = new Map();

const socketHandler = (io) => {
  // Middleware d'authentification pour Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log('User connected:', socket.user.username);
    
    // Ajouter l'utilisateur à la liste des connectés
    connectedUsers.set(socket.user.id, {
      id: socket.user.id,
      username: socket.user.username,
      socketId: socket.id
    });
    
    // Charger la liste de tous les utilisateurs
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true
      }
    });

    // Émettre la liste mise à jour des utilisateurs connectés et tous les utilisateurs
    io.emit('users:online', Array.from(connectedUsers.values()));
    socket.emit('users:all', allUsers);

    // Gérer la déconnexion
    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.user.username);
      connectedUsers.delete(socket.user.id);
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          username: true
        }
      });
      io.emit('users:online', Array.from(connectedUsers.values()));
      io.emit('users:all', allUsers);
    });

    // Gérer les nouveaux messages
    socket.on('message:send', async (messageData) => {
      try {
        // Sauvegarder le message dans la base de données
        const message = await prisma.message.create({
          data: {
            content: messageData.content,
            userId: socket.user.id
          },
          include: {
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        });

        // Émettre le message à tous les clients
        io.emit('message:new', message);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message:error', { error: 'Failed to save message' });
      }
    });

    // Charger l'historique des messages
    socket.on('messages:load', async () => {
      try {
        const messages = await prisma.message.findMany({
          take: 50,
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        });

        socket.emit('messages:history', messages.reverse());
      } catch (error) {
        console.error('Error loading messages:', error);
        socket.emit('messages:error', { error: 'Failed to load messages' });
      }
    });
  });
};

module.exports = socketHandler;