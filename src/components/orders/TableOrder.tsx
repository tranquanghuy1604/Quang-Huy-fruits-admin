'use client';
import { useMutationChangeDelivery, useMutationDeleteOrder, useQueryGetAllOrder } from '@/api/orderApi';
import type { TableProps } from 'antd';
import { Button, Modal, Rate, Space, Spin, Table } from 'antd';
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
  product_name: any;
  total_price: number;
  rate: any;
  rates: any;
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
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      width: 200,
    },
    {
      title: 'Đơn hàng',
      dataIndex: 'product_name',
      key: 'product_name',
      width: 200,
      render: (product) => product.map((item: any) => item.productName + ' x ' + item.quantity).join(', '),
    },
    {
      title: 'Email',
      dataIndex: 'customer',
      key: 'customer',
      width: 200,
      render: (customer) => customer.email,
    },
    {
      title: 'Họ tên khách hàng',
      dataIndex: 'customer',
      key: 'customer',
      width: 200,
      render: (customer) => customer.fullname,
    },
    {
      title: 'Họ tên người giao hàng',
      dataIndex: 'shipper_name',
      key: 'shipper_name',
      width: 200,
      render: (shipper_name) =>
        shipper_name !== null ? `${shipper_name.first_name} ${shipper_name.last_name}` : 'Chưa có người nhận',
    },
    {
      title: 'Kiểu thanh toán',
      dataIndex: 'payment_method',
      key: 'payment_method',
      width: 150,
    },
    {
      title: 'Mô tả người dùng',
      dataIndex: 'note',
      key: 'note',
      width: 200,
    },
    {
      title: 'Ngay khởi tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (created_at) => moment(created_at).format('YYYY-MM-DD'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status) => getTagColor(status),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 150,
      render: (total_price) => Number(total_price).toLocaleString('en-US'),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rate',
      key: 'rate',
      width: 200,
      render: (_, record) => (
        <div>
          <Rate value={record?.rates?.map((item: any) => item.rate)} />
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rates',
      key: 'rates',
      width: 200,
      render: (rates) => (rates.length === 0 ? 'Chưa có đánh giá' : rates?.map((rate: any) => rate.content)),
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
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
      width: 300,
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
