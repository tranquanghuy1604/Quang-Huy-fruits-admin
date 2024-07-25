import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
function Header() {
  return (
    <header className='bg-gray-900 text-white flex justify-between items-center px-4 py-2'>
      <div className='flex items-center '>
        <Image width={50} height={50} src='/logo.png' alt='Logo' className='mr-6' />
        <div className='flex items-center justify-center gap-2'>
          <HomeOutlined />
          <span>Quang Huy fruits</span>
        </div>
      </div>
      <div className='flex items-center'>
        <span className='mr-2'>Quan trị viên</span>
        <UserOutlined />
      </div>
    </header>
  );
}

export default Header;
