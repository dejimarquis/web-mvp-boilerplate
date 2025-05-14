'use client';

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex,
  Badge
} from '@chakra-ui/react';
import { FiUser, FiCheckCircle, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../lib/AuthContext';
import AppLayout from '../app-layout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { authUser, loading, profileData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/login');
    }
  }, [authUser, loading, router]);

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
      <Box>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Welcome, {profileData.firstName || authUser.displayName || 'User'}</Heading>
            <Text color="gray.600" mt={1}>
              Here's an overview of your account
            </Text>
          </Box>
          <Badge colorScheme="green" p={2} borderRadius="md">
            {profileData.subscription.toUpperCase()}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Card>
            <CardHeader pb={0}>
              <Flex align="center">
                <Icon as={FiUser} boxSize={6} color="brand.500" mr={2} />
                <Heading size="md">Profile</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Account Status</StatLabel>
                <StatNumber>Active</StatNumber>
                <StatHelpText>
                  Member since {new Date(profileData.createdAt).toLocaleDateString()}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb={0}>
              <Flex align="center">
                <Icon as={FiCheckCircle} boxSize={6} color="green.500" mr={2} />
                <Heading size="md">Status</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Profile Completion</StatLabel>
                <StatNumber>100%</StatNumber>
                <StatHelpText>
                  All required information provided
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb={0}>
              <Flex align="center">
                <Icon as={FiSettings} boxSize={6} color="purple.500" mr={2} />
                <Heading size="md">Settings</Heading>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Subscription Plan</StatLabel>
                <StatNumber>{profileData.subscription}</StatNumber>
                <StatHelpText>
                  Last updated: {new Date(profileData.updatedAt).toLocaleDateString()}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </AppLayout>
  );
} 