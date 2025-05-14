'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  useToast,
  Card,
  CardBody
} from '@chakra-ui/react';
import { useAuth } from '../../lib/AuthContext';
import AppLayout from '../app-layout';

export default function CompleteProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUserProfileComplete } = useAuth();
  const toast = useToast();

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      await setUserProfileComplete();
      
      toast({
        title: 'Profile completed',
        description: 'Your profile has been updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <Box maxW="md" mx="auto" mt={8}>
        <Card p={6} borderRadius="lg" boxShadow="md">
          <CardBody>
            <Box textAlign="center" mb={6}>
              <Heading size="lg">Complete Your Profile</Heading>
              <Text mt={4} color="gray.600">
                Thank you for signing up! Click the button below to complete your profile.
              </Text>
            </Box>
            
            <Button
              colorScheme="brand"
              isLoading={isSubmitting}
              onClick={handleComplete}
              w="full"
              size="lg"
            >
              Complete Profile
            </Button>
          </CardBody>
        </Card>
      </Box>
    </AppLayout>
  );
} 