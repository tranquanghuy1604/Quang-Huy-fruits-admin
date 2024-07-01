'use client';
import { useMutationDelete, useQueryLogin } from '@/api/userApi';
import type { TableProps } from 'antd';
import { Button, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

interface DataType {
  _id: number;
  userName: string;
  email: string;
  action?: any;
}

function TableUser() {
  const { data, isLoading } = useQueryLogin();
  const listData = data as any;
  const dataUser = listData?.users;
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
      title: 'User id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
          total: listData?.total,
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
