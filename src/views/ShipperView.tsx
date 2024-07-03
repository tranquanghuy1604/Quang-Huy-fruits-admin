'use client';
import FormCreateShipper from '@/components/shipper/FormCreateShipper';
import TableShipper from '@/components/shipper/TableShipper';
import { Modal } from 'antd';
import React, { useState } from 'react';

export default function ShipperView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className='flex justify-between w-full'>
        <p className='font-bold text-3xl'>Người dùng</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex flex-row gap-3 items-center border rounded-lg p-2 text-white bg-sky-500'
        >
          Thêm người giao hàng
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
        <FormCreateShipper handleCancel={() => setIsModalOpen(false)} />
      </Modal>
      <TableShipper />
    </div>
  );
}
