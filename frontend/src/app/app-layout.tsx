'use client';

import { Box } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" maxW="7xl" mx="auto" px={4} py={8}>
        {children}
      </Box>
    </Box>
  );
} 