'use client';
import { useQueryGetCategories } from '@/api/categories';
import { useMutationDeleteProduct, useQueryGetListProduct } from '@/api/productApi';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Spin, Table } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import FormEditProduct from './FormEditProduct';
import { FormatNumber } from '@/utils/formatNumber';

interface DataType {
  name: string;
  category_id: string;
  _id: string;
  cost_price: number;
  price: number;
  amount: number;
  description: string;
  images: string[];
  action?: any;
}

function TableProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQueryGetListProduct();
  const { mutate: deleteProduct } = useMutationDeleteProduct();
  const listProduct = data as any;
  const handleDeleteProduct = (id: any) => {
    deleteProduct(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['list-product']);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      total: pagination.total,
    });
  };
  const handleEditProduct = (record: DataType) => {
    setSelectedProduct(record);
    setIsModalOpen(true);
  };

  const columns: TableProps<DataType>['columns'] = [
    { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
    {
      title: 'Danh mục',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (_, record: any) => {
        return record?.category_id?.name;
      },
    },
    { title: 'Mã sản phẩm', dataIndex: '_id', key: '_id' },
    { title: 'Cost Price', dataIndex: 'cost_price', key: 'cost_price', render: (costPrice) => FormatNumber(costPrice) },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price) => FormatNumber(price) },
    { title: 'Số lượng', dataIndex: 'amount', key: 'amount' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (image: any) => (
        <>
          <img src={`http://localhost:5000/${image}`} style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEditProduct(record)}>
            Sửa
          </Button>
          <Button type='primary' onClick={() => handleDeleteProduct(record?._id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className='mt-[30px]'>
        <Table
          className='border'
          columns={columns}
          dataSource={listProduct}
          rowKey='categoryId'
          onChange={handleTableChange}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: listProduct?.length,
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
        <FormEditProduct item={selectedProduct} handleCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

export default TableProduct;
