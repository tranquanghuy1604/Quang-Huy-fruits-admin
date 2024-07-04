'use client';
import ConfigProvider from '@/components/Auth/Configprovider';
import Header from '@/layout/Header';
import { SideBar } from '@/layout/SideBar';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

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
        <ConfigProvider>
          <Header />
          <div className='flex flex-row text-[#000] min-h-screen'>
            <SideBar />
            <div className='p-8 flex-grow overflow-auto'>{children}</div>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
