'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Space, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQueryGetCategories } from '@/api/categories';
import { useMutationCreateProduct, useMutationEditProduct } from '@/api/productApi';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
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
const FormEditProduct = (props: Props) => {
  const { data } = useQueryGetCategories();
  const queryClient = useQueryClient();
  const { handleCancel, item } = props;
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const dataCategory = data as any;

  const { mutate: editProduct } = useMutationEditProduct(item?._id);

  const [fileList, setFileList] = useState<any>([]);

  const handleFileChange = (info: any) => {
    setFileList(info.fileList.slice(-1));
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category_id', values.categoryId);
    formData.append('cost_price', values.costPrice);
    formData.append('price', values.price);
    formData.append('amount', values.amount);
    formData.append('description', values.description);
    formData.append('unit', '123bbb');
    formData.append('properties', '1111');
    if (fileList.length > 0) {
      console.log(fileList);
      formData.append('images', (fileList[0] as any)?.originFileObj);
    }

    try {
      editProduct(formData, {
        onSuccess: (data) => {
          toast.success('Sửa sản phẩm thành công');
          queryClient.invalidateQueries(['list-product']);
          handleCancel();
        },
        onError: (error) => {
          toast.error('Lỗi khi Sửa sản phẩm');
          console.error('Error creating product:', error);
        },
      });

      form.resetFields();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  return (
    <div>
      <Form
        initialValues={{
          name: item?.name,
          categoryId: item?.category_id?._id,
          costPrice: item?.cost_price,
          price: item?.price,
          amount: item?.amount,
          description: item?.description,
          images: item?.images,
          unit: item?.unit,
          properties: item?.properties,
        }}
        onFinish={onFinish}
        layout='vertical'
        form={form}
        variant='filled'
      >
        <Form.Item
          label='Product Name'
          name='name'
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Category ID'
          name='categoryId'
          rules={[{ required: true, message: 'Please select the category!' }]}
        >
          <Select onChange={(value) => setCategoryId(value)}>
            <Select.Option value={dataCategory && dataCategory[0]?._id}>Nhập khẩu</Select.Option>
            <Select.Option value={dataCategory && dataCategory[1]?._id}>Xuất khẩu</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Cost Price'
          name='costPrice'
          rules={[{ required: true, message: 'Please input the cost price!' }]}
        >
          <Input type='number' value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Please input the price!' }]}>
          <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label='Amount' name='amount' rules={[{ required: true, message: 'Please input the amount!' }]}>
          <InputNumber
            className='w-full'
            controls={false}
            value={amount}
            min={1}
            onChange={(e: any) => setAmount(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        <Form.Item label='Images' name='images' rules={[{ required: true, message: 'Please upload product images!' }]}>
          <Upload
            listType='picture'
            onChange={handleFileChange}
            beforeUpload={() => false}
            fileList={fileList}
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
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

export default FormEditProduct;
