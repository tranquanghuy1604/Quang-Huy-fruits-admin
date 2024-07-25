'use client';
import { useMutationDelete, useQueryGetListShipper, useQueryGetListUser } from '@/api/userApi';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import FormEditShipper from './FormEditShipper';

interface DataType {
  _id: number;
  userName: string;
  email: string;
  phone: string;
  action?: any;
}

function TableShipper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState<DataType | null>(null);
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
  const handleEditShipper = (record: DataType) => {
    setSelectedShipper(record);
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã khách hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên người giao hàng',
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
      title: 'Hành động',
      key: 'action',
      align: 'center',
      className: 'max-w-[150px]',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEditShipper(record)}>
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
        <FormEditShipper item={selectedShipper} handleCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default TableShipper;
