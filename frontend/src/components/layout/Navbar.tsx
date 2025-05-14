'use client';

import Link from 'next/link';
import { Box, Button, Flex, HStack, Heading, useColorModeValue, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { useAuth } from "../../lib/AuthContext";

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { authUser, profileData, logout } = useAuth();

  return (
    <Box as="nav" bg={bgColor} borderBottom="1px" borderColor={borderColor} py={2}>
      <Flex align="center" justify="space-between" maxW="7xl" mx="auto" px={4}>
        <Heading as="h1" size="md">
          <Link href="/" style={{ textDecoration: 'none' }}>
            Boilerplate
          </Link>
        </Heading>
        
        {authUser ? (
          <HStack spacing={4}>
            <Menu>
              <MenuButton>
                <HStack spacing={3}>
                  <Box textAlign="right" display={{ base: "none", md: "block" }}>
                    <Text fontWeight="medium">{authUser.displayName || profileData?.firstName || 'User'}</Text>
                    <Text fontSize="sm" color="gray.500">{authUser.email}</Text>
                  </Box>
                  <Avatar 
                    name={authUser.displayName || profileData?.firstName || undefined}
                    src={authUser.photoURL || undefined}
                    size="sm"
                  />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} href="/dashboard">Dashboard</MenuItem>
                <MenuItem as={Link} href="/profile">Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <HStack spacing={4}>
            <Button as={Link} href="/login" variant="ghost" size="sm">
              Login
            </Button>
            <Button as={Link} href="/signup" colorScheme="brand" size="sm">
              Sign Up
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar; 