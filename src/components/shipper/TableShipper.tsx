'use client';
import { useMutationDelete, useQueryGetListShipper, useQueryGetListUser } from '@/api/userApi';
import type { TableProps } from 'antd';
import { Button, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

interface DataType {
  _id: number;
  userName: string;
  email: string;
  phone: string;
  action?: any;
}

function TableShipper() {
  const { data, isLoading } = useQueryGetListShipper();
  const listShipper = data as any;
  const { mutate: deleteUser } = useMutationDelete();
  const queryClient = useQueryClient();
  const handleDeleteUser = (id: any) => {
    deleteUser(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['list-shipper']);
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
        dataSource={listShipper}
        rowKey='id'
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: listShipper?.total,
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

export default TableShipper;
