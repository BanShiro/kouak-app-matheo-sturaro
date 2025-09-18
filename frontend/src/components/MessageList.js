import React from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';

const MessageList = () => {
  const { messages } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = React.useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <VStack 
      align="stretch" 
      spacing={4} 
      overflowY="auto" 
      flex="1"
      p={4}
      bg="inherit"
      w="full"
    >
      {messages.map((message) => {
        const isOwnMessage = message.user.id === user?.id;
        return (
          <Box
            key={message.id}
            alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
            maxW="70%"
            w="fit-content"
            ml={isOwnMessage ? "auto" : "0"}
            mr={isOwnMessage ? "0" : "auto"}
          >
            <Text 
              fontSize="xs" 
              color="gray.500"
              _dark={{ color: "gray.400" }}
              mb={1}
              textAlign={isOwnMessage ? "right" : "left"}
            >
              {message.user.username}
            </Text>
            <Box
              bg={isOwnMessage ? "blue.500" : "gray.100"}
              _dark={{
                bg: isOwnMessage ? "blue.500" : "gray.700"
              }}
              color={isOwnMessage ? "white" : "inherit"}
              p={4}
              borderRadius="2xl"
              boxShadow="sm"
              borderTopRightRadius={isOwnMessage ? 0 : "2xl"}
              borderTopLeftRadius={isOwnMessage ? "2xl" : 0}
            >
              <Text>{message.content}</Text>
            </Box>
          </Box>
        );
      })}
      <div ref={messagesEndRef} />
    </VStack>
  );
};

export default MessageList;