import React from 'react';
import { Box, Flex, Input, Button, useToast, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import DarkModeSwitch from '../components/DarkModeSwitch';

const Chat = () => {
  const [message, setMessage] = React.useState('');
  const { sendMessage, loadMessages } = useSocket();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  React.useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    } else {
      toast({
        title: 'Message vide',
        description: 'Veuillez entrer un message',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex direction="column" h="100vh" bg="inherit" overflow="hidden">
      {/* Header avec bouton de déconnexion */}
      <Flex
        w="100%"
        justify="space-between"
        p={4}
        borderBottom="1px"
        borderColor="inherit"
        position="sticky"
        top={0}
        bg="inherit"
        zIndex={1}
        alignItems="center"
      >
        {/* Dark Mode Switch à gauche */}
        <Box>
          <DarkModeSwitch />
        </Box>
        
        {/* Bouton déconnexion à droite */}
        <Button
          onClick={handleLogout}
          colorScheme="blue"
          size="sm"
          leftIcon={<Text fontSize="lg">👋</Text>}
        >
          Se déconnecter
        </Button>
      </Flex>

      {/* Contenu principal */}
      <Flex flex="1" overflow="hidden">
        {/* Liste des utilisateurs connectés */}
        <Box 
          w="300px" 
          borderRight="1px" 
          borderColor="gray.200"
          shadow="sm"
        >
          <UserList />
        </Box>

        {/* Zone de chat */}
        <Flex flex="1" direction="column" mx={4} my={4} borderRadius="lg" shadow="sm" overflow="hidden">
          <Box flex="1" overflow="auto">
          {/* Messages */}
            <MessageList />
          </Box>

          {/* Input pour envoyer un message */}
          <Box p={4} borderTop="1px" borderColor="inherit">
            <form onSubmit={handleSendMessage}>
              <Flex>
                <Input
                  placeholder="Tapez votre message..."
                  mr={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="lg"
                  bg="inherit"
                  border="1px solid"
                  borderColor="gray.300"
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  _focus={{
                    boxShadow: "none",
                    borderColor: "blue.500"
                  }}
                />
                <Button 
                  type="submit" 
                  colorScheme="blue"
                  size="lg"
                  px={8}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "md"
                  }}
                >
                  Envoyer
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Chat;