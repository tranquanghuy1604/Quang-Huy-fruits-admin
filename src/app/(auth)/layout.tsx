'use client';
import ConfigProvider from '@/components/Auth/Configprovider';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient } from 'react-query';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken-admin');

    if (!token && pathName !== '/login') {
      router.push('/login');
    } else if (token && pathName === '/login') {
      router.push('/');
    }
  }, [pathName]);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster position='top-right' />
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
