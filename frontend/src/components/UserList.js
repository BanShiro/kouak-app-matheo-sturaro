import React from 'react';
import { VStack, Text, Box, Divider, Heading, Circle } from '@chakra-ui/react';
import { useSocket } from '../contexts/SocketContext';

const UserList = () => {
  const { onlineUsers = [], allUsers = [] } = useSocket();
  const offlineUsers = allUsers.filter(
    user => !onlineUsers.find(onlineUser => onlineUser.id === user.id)
  );

  return (
    <VStack align="stretch" spacing={4} p={4}>
      <Box>
        <Heading size="md" color="blue.500" _dark={{ color: "blue.300" }} mb={4}>
          Chat Users
        </Heading>
      </Box>

      <Box>
        <Text 
          fontWeight="semibold" 
          fontSize="sm" 
          color="gray.600"
          _dark={{ color: "gray.400" }} 
          mb={3}
        >
          ONLINE - {onlineUsers.length}
        </Text>
        <VStack align="stretch" spacing={2}>
          {onlineUsers.map((user) => (
            <Box
              key={user.id}
              p={3}
              borderRadius="lg"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
              display="flex"
              alignItems="center"
            >
              <Circle size="8px" bg="green.400" mr={3} />
              <Text fontWeight="medium">{user.username}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      
      <Divider />
      
      <Box>
        <Text 
          fontWeight="semibold" 
          fontSize="sm" 
          color="gray.600"
          _dark={{ color: "gray.400" }} 
          mb={3}
        >
          OFFLINE - {offlineUsers.length}
        </Text>
        <VStack align="stretch" spacing={2}>
          {offlineUsers.map((user) => (
            <Box
              key={user.id}
              p={3}
              borderRadius="lg"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
              display="flex"
              alignItems="center"
            >
              <Circle size="8px" bg="gray.300" mr={3} />
              <Text color="gray.500" _dark={{ color: "gray.400" }}>{user.username}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default UserList;