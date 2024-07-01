'use client';
import FormCreateProduct from '@/components/product/FormCreateProduct';
import TableProduct from '@/components/product/TableProduct';
import { Modal } from 'antd';
import { useState } from 'react';
export default function ProductView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className='flex justify-between w-full'>
        <p className='font-bold text-3xl'>Người dùng</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex flex-row gap-3 items-center border rounded-lg p-2 text-white bg-sky-500'
        >
          Thêm sản phẩm
        </button>
      </div>

      <Modal
        centered
        title='Thêm Sản Phẩm'
        open={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={600}
      >
        <FormCreateProduct handleCancel={() => setIsModalOpen(false)} />
      </Modal>
      <TableProduct />
    </div>
  );
}
