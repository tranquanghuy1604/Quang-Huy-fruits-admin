'use client';
import { useQueryGetListProduct } from '@/api/productApi';
import { useMutationCreatePromotion } from '@/api/promotionApi';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

const { RangePicker } = DatePicker;

interface Props {
  handleCancel: () => void;
}
interface ValueForm {
  season: number;
  description: string;
  poolReward: string;
  dates: Date[];
}
const FormCreatePromotion = (props: Props) => {
  const { mutate: createPromotion } = useMutationCreatePromotion();
  const queryClient = useQueryClient();
  const { handleCancel } = props;
  const { data } = useQueryGetListProduct();
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const listProduct = data as any;
  const onFinish = (values: any) => {
    createPromotion(
      {
        name: values.name,
        product_id: values.productId,
        discount: values.discount,
        startDate: values.dates[0].toDate(),
        endDate: values.dates[1].toDate(),
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(['list-promotion']);
          toast.success('Thêm khuyến mãi thành công');
          handleCancel();
        },
      },
    );

    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item
          label='Tên khuyến mãi'
          name='name'
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item label='Sản phẩm' name='productId' rules={[{ required: true, message: 'Please select a product!' }]}>
          <Select
            className='w-full'
            options={listProduct?.map((item: any) => ({ value: item?._id, label: item?.name }))}
          />
        </Form.Item>

        <Form.Item
          label='Khuyến mãi'
          name='discount'
          rules={[{ required: true, message: 'Please input the discount!' }]}
        >
          <InputNumber className='w-full' controls={false} type='number' />
        </Form.Item>

        <Form.Item
          label='Thời gian khuyến mãi'
          name='dates'
          rules={[{ required: true, message: 'Please select the promotion dates!' }]}
        >
          <RangePicker format='YYYY-MM-DD' className='w-full' renderExtraFooter={() => 'extra footer'} showTime />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCreatePromotion;
