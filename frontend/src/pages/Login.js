import React from 'react';
import { authService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      toast({
        title: 'Connexion réussie',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      login(response.user, response.token);
      navigate('/chat');
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: error.response?.data?.message || 'Une erreur est survenue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="inherit">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" color="inherit">Connexion</Heading>
        </Stack>
        <Box 
          rounded="lg" 
          bg="inherit" 
          boxShadow="lg" 
          p={8}
          borderWidth="1px"
          borderColor="gray.700"
          _dark={{
            bg: "gray.700",
            borderColor: "gray.600"
          }}
          _light={{
            bg: "white",
            borderColor: "gray.200"
          }}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input 
                type="email"
                value={formData.email}
                onChange={handleChange}
                bg="inherit"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input 
                type="password"
                value={formData.password}
                onChange={handleChange}
                bg="inherit"
                borderColor="gray.600"
              />
            </FormControl>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Se connecter
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Pas encore de compte?{' '}
            <Link color="blue.400" onClick={() => navigate('/register')}>
              S'inscrire
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;