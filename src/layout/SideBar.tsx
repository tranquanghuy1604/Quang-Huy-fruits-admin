'use client';
import { routerConstants } from '@/constants/router.constant';
import { TableOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface ValueSelect {
  key: string;
}
export const SideBar: React.FC = () => {
  const pathName = usePathname();
  const defaultSelect = pathName.split('/')[1];
  const [select, setSelect] = useState(defaultSelect || 'seasons');
  const hanldeSelectMenu = (values: ValueSelect) => {
    setSelect(String(values.key));
  };
  return (
    <Menu
      onClick={(e) => hanldeSelectMenu(e)}
      className='min-h-[91vh] max-w-[15%]'
      theme='dark'
      defaultSelectedKeys={['seasons']}
      selectedKeys={[`${select}`]}
      mode='inline'
    >
      <Menu.Item key='users'>
        <Link href={routerConstants.users}>
          <UserOutlined />
          <span>Người dùng</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='order'>
        <Link href={routerConstants.orders}>
          <TableOutlined />
          <span>Đơn hàng</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='promotion'>
        <Link href={routerConstants.promotion}>
          <TableOutlined />
          <span>Khuyến mãi</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='product'>
        <Link href={routerConstants.product}>
          <TableOutlined />
          <span>Sản phẩm</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='shipper'>
        <Link href={routerConstants.shipper}>
          <TableOutlined />
          <span>Người giao hàng</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};
