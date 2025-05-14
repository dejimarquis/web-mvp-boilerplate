'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  Card,
  CardBody,
  Divider,
  Avatar,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useAuth } from '../../lib/AuthContext';
import AppLayout from '../app-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { deleteUser } from '../../lib/api';

export default function Profile() {
  const { authUser, loading, profileData, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading, router]);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      await logout();
      toast({
        title: 'Account deleted',
        description: 'Your account has been successfully deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete account',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Box textAlign="center" py={10}>
          <Text>Loading...</Text>
        </Box>
      </AppLayout>
    );
  }

  if (!authUser || !profileData) {
    return null; // Will redirect in the useEffect
  }

  return (
    <AppLayout>
      <Box maxW="3xl" mx="auto">
        <Heading mb={6}>Your Profile</Heading>

        <Card mb={6}>
          <CardBody>
            <Flex align="center" mb={4}>
              <Avatar 
                size="xl" 
                name={authUser.displayName || profileData?.firstName || undefined}
                src={authUser.photoURL || undefined}
                mr={6}
              />
              <Box>
                <Heading size="md">{profileData.firstName} {profileData.lastName}</Heading>
                <Text color="gray.600">{authUser.email}</Text>
                <Text mt={2} fontSize="sm">
                  Member since {new Date(profileData.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card mb={6}>
          <CardBody>
            <Heading size="md" mb={4}>Account Information</Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input value={authUser.email || ''} isReadOnly />
              </FormControl>
              
              <FormControl>
                <FormLabel>Subscription Plan</FormLabel>
                <Input value={profileData.subscription} isReadOnly />
              </FormControl>
            </Stack>
          </CardBody>
        </Card>

        <Divider my={6} />

        <Box textAlign="center">
          <Button colorScheme="red" onClick={onOpen}>
            Delete Account
          </Button>
        </Box>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This action cannot be undone. All your data will be permanently deleted.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </AppLayout>
  );
} 