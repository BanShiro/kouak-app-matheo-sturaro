import React from 'react';
import { authService } from '../services/api';
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

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = React.useState({
    username: '',
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
      await authService.register(formData);
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte a été créé avec succès',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.response?.data?.message || 'Une erreur est survenue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Inscription</Heading>
        </Stack>
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Nom d'utilisateur</FormLabel>
              <Input 
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input 
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input 
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
            >
              S'inscrire
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Déjà un compte?{' '}
            <Link color="blue.400" onClick={() => navigate('/login')}>
              Se connecter
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;