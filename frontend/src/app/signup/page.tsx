'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
  Heading,
  Divider,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useAuth } from '../../lib/AuthContext';
import AppLayout from '../app-layout';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const toast = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message || 'An error occurred during signup',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Google signup failed',
        description: error.message || 'An error occurred during Google signup',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Stack spacing={4}>
          <Heading textAlign="center" size="xl">Create an Account</Heading>
          
          <Button 
            leftIcon={<FcGoogle />}
            onClick={handleGoogleSignup}
            isLoading={isLoading}
            w="full"
            variant="outline"
          >
            Sign up with Google
          </Button>
          
          <Divider />
          
          <form onSubmit={handleSignup}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Button 
                type="submit" 
                colorScheme="brand" 
                isLoading={isLoading}
                w="full"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
          
          <Text textAlign="center">
            Already have an account?{' '}
            <ChakraLink as={Link} href="/login" color="brand.500">
              Sign in
            </ChakraLink>
          </Text>
        </Stack>
      </Box>
    </AppLayout>
  );
} 