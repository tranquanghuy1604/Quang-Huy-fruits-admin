'use client';
import FormCreatePromotion from '@/components/promotion/FormCreatePromotion';
import TablePromotion from '@/components/promotion/TablePromotion';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

export default function PromotionViews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className='flex justify-between w-full'>
        <p className='font-bold text-3xl'>Người dùng</p>
        <Button type='primary' onClick={() => setIsModalOpen(true)}>
          Thêm Khuyến mãi
        </Button>
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
        <FormCreatePromotion handleCancel={() => setIsModalOpen(false)} />
      </Modal>
      <TablePromotion />
    </div>
  );
}
