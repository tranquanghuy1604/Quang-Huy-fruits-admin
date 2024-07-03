'use client';
import { useMutationDelete, useQueryGetListUser } from '@/api/userApi';
import type { TableProps } from 'antd';
import { Button, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

interface DataType {
  _id: number;
  userName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  action?: any;
}

function TableUser() {
  const { data, isLoading } = useQueryGetListUser();
  const dataUser = data as any;
  console.log(dataUser);
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutationDelete();
  const handleDeleteUser = (id: any) => {
    deleteUser(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['list-user']);
      },
    });
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã khách hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (_, record: any) => record?.last_name + ' ' + record?.first_name,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record: any) => (record?.gender === 'male' ? 'Nam' : 'Nữ'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (_, record: any) => record?.ward + ', ' + record?.province,
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'max-w-[150px]',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary'>Sửa</Button>
          <Button type='primary' onClick={() => handleDeleteUser(record._id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      total: pagination.total,
    });
  };
  return (
    <div className='mt-[30px]'>
      <Table
        className='border'
        columns={columns}
        dataSource={dataUser}
        rowKey='id'
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: dataUser?.total,
        }}
        loading={
          isLoading && {
            indicator: (
              <div>
                <Spin />
              </div>
            ),
          }
        }
      />
    </div>
  );
}

export default TableUser;
