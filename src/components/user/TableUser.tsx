'use client';
import { useMutationDelete, useQueryGetListUser } from '@/api/userApi';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import FormEditUser from './FormEditUser';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const { data, isLoading } = useQueryGetListUser();
  const dataUser = data as any;
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutationDelete();
  const handleDeleteUser = (id: any) => {
    deleteUser(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['list-user']);
      },
    });
  };
  const handleEditUser = (record: DataType) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã khách hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên khách hàng',
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
      title: 'Hành động',
      key: 'action',
      align: 'center',
      className: 'max-w-[150px]',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEditUser(record)}>
            Sửa
          </Button>
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
      <Modal
        destroyOnClose={true}
        centered
        title='Sửa Sản Phẩm'
        open={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <FormEditUser item={selectedUser} handleCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default TableUser;
