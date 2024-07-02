'use client';
import { useMutationChangeDelivery, useMutationDeleteOrder, useQueryGetAllOrder } from '@/api/orderApi';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Spin, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import FormEditOrder from './FormEditOrder';
import { getTagColor } from '@/utils/getTextStatus';

interface DataType {
  _id: string;
  customer: any;
  shipper_name: any;
  payment_method: string;
  note: string;
  created_at: string;
  status: string;
  total_price: number;
  action?: any;
}

function TableOrder() {
  const { data, isLoading } = useQueryGetAllOrder();
  const listOrder = data as any;
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { mutate: deleteOrder } = useMutationDeleteOrder();
  const queryClient = useQueryClient();
  const { mutate: changeDelivery } = useMutationChangeDelivery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DataType | null>(null);
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      total: pagination.total,
    });
  };
  console.log(listOrder);
  const handleConfirmOrder = (orderId: any) => {
    changeDelivery(
      { _id: orderId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['list-order']);
          queryClient.invalidateQueries(['list-user']);
          toast.success('Đơn đã được gửi đi');
        },
      },
    );
  };

  const handleDeleteOrder = (orderId: any) => {
    deleteOrder(orderId, {
      onSuccess: (data) => {
        toast.success('Xóa thành công');
        queryClient.invalidateQueries(['list-order']);
      },
    });
  };

  const handleOrder = (record: DataType) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer.email,
    },
    {
      title: 'Ho ten',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer.fullname,
    },
    {
      title: 'Ho ten shipper',
      dataIndex: 'shipper_name',
      key: 'shipper_name',
      render: (shipper_name) =>
        shipper_name !== null ? `${shipper_name.first_name} ${shipper_name.last_name}` : 'Chưa có người nhận',
    },
    {
      title: 'Kieu thanh toan',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: 'Mo ta',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Ngay khoi tao',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => moment(created_at).format('YYYY-MM-DD'),
    },
    {
      title: 'Trang thai',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getTagColor(status),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (total_price) => Number(total_price).toLocaleString('en-US'),
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'max-w-[200px]',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleOrder(record)}>
            Sửa
          </Button>
          <Button type='primary' onClick={() => handleDeleteOrder(record._id)}>
            Xóa
          </Button>
          <Button
            disabled={record?.status !== 'waiting-confirm'}
            type='primary'
            onClick={() => handleConfirmOrder(record?._id)}
          >
            Xác nhận đơn
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='mt-[30px]'>
      <Table
        virtual
        className='border'
        columns={columns}
        dataSource={listOrder}
        rowKey='id'
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: listOrder?.length,
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
        <FormEditOrder item={selectedOrder} handleCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default TableOrder;
