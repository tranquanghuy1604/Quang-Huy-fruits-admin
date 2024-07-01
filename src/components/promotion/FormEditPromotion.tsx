'use client';
import { useQueryGetListProduct } from '@/api/productApi';
import { useMutationCreatePromotion, useMutationEditPromotion } from '@/api/promotionApi';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

const { RangePicker } = DatePicker;

interface Props {
  handleCancel: () => void;
  item: any;
}
interface ValueForm {
  season: number;
  description: string;
  poolReward: string;
  dates: Date[];
}
const FormEditPromotion = (props: Props) => {
  const queryClient = useQueryClient();
  const { handleCancel, item } = props;
  const { data } = useQueryGetListProduct();
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const listProduct = data as any;
  const { mutate: editPromotion } = useMutationEditPromotion(item?._id);
  const onFinish = (values: any) => {
    editPromotion(
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
          toast.success('Sửa thành công');
          handleCancel();
        },
      },
    );

    form.resetFields();
  };
  console.log(item?.product_id);
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout='vertical'
        initialValues={{
          name: item?.name,
          productId: item?.product_id,
          discount: item?.discount,
          dates: [moment(item?.startDate), moment(item?.endDate)],
        }}
        form={form}
      >
        <Form.Item
          label='Tên khuyến mãi'
          name='name'
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item label='Sản phẩm' name='productId' rules={[{ required: true, message: 'Please select a product!' }]}>
          <Select
            defaultValue={item?.product_id}
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
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormEditPromotion;
