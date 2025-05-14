'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../lib/AuthContext';
import theme from '../lib/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
} 