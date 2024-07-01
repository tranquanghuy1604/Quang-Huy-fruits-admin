'use client';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import AuthProvider from './AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          onError: (error: unknown) => {
            const axiosError = error as AxiosError;
          },
        },
        mutations: {
          onError: (error: unknown) => {
            const axiosError = error as AxiosError;
          },
        },
      },
    });

    return client;
  });

  return (
    <React.StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}
