'use client';
import { useMutationDeletePromotion, useQueryGetAllPromotion } from '@/api/promotionApi';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Spin, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import FormEditPromotion from './FormEditPromotion';
import { useQueryClient } from 'react-query';

interface DataType {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  discount: number;
  action?: any;
}

function TablePromotion() {
  const { data, isLoading } = useQueryGetAllPromotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<DataType | null>(null);
  const { mutate: deletePromotion } = useMutationDeletePromotion();
  const queryClient = useQueryClient();
  const listPromotion = data as any;
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Mã khuyến mãi',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => moment(startDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => moment(endDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
      render: (discount) => {
        return <div>{discount}%</div>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      className: 'max-w-[150px]',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            disabled={moment(record?.endDate).format('YYYY-MM-DD') < moment(Date.now()).format('YYYY-MM-DD')}
            type='primary'
            onClick={() => handlePromotion(record)}
          >
            Sửa
          </Button>
          <Button type='primary' onClick={() => handleDeletePromotion(record?._id)}>
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

  const handlePromotion = (record: DataType) => {
    setSelectedPromotion(record);
    setIsModalOpen(true);
  };
  const handleDeletePromotion = (id: any) => {
    deletePromotion(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['list-promotion']);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <>
      <div className='mt-[30px]'>
        <Table
          className='border'
          columns={columns}
          dataSource={listPromotion}
          rowKey='id'
          onChange={handleTableChange}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: listPromotion?.length,
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
        <FormEditPromotion item={selectedPromotion} handleCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}

export default TablePromotion;
