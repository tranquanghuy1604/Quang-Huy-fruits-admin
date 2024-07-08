'use client';
import React, { useState } from 'react';
import { Button, Form, Input, Select, Space, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQueryGetCategories } from '@/api/categories';
import { useMutationCreateProduct } from '@/api/productApi';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { useMutationUploadImage } from '@/api/uploadApi';
interface Props {
  handleCancel: () => void;
}
interface ValueForm {
  season: number;
  description: string;
  poolReward: string;
  dates: Date[];
}
const FormCreateProduct = (props: Props) => {
  const { data } = useQueryGetCategories();
  const { mutate: createProduct } = useMutationCreateProduct();
  const { mutate: uploadImage } = useMutationUploadImage();
  const queryClient = useQueryClient();
  const { handleCancel } = props;
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [properties, setProperties] = useState('');
  const dataCategory = data as any;
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info: any) => {
    setFileList(info.fileList.slice(-1));
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category_id', values.categoryId);
    formData.append('cost_price', '100000');
    formData.append('price', values.price);
    formData.append('amount', values.amount);
    formData.append('description', values.description);
    formData.append('unit', '123bbb');
    formData.append('properties', '1111');
    if (fileList.length > 0) {
      formData.append('images', (fileList[0] as any)?.originFileObj);
    }

    try {
      createProduct(formData, {
        onSuccess: (data) => {
          toast.success('Thêm sản phẩm thành công');
          queryClient.invalidateQueries(['list-product']);
          handleCancel();
        },
        onError: (error) => {
          toast.error('Lỗi khi thêm sản phẩm');
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
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item
          label='Product Name'
          name='name'
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Category ID'
          name='categoryId'
          rules={[{ required: true, message: 'Please select the category!' }]}
        >
          <Select defaultValue='' onChange={(value) => setCategoryId(value)}>
            <Select.Option value={dataCategory && dataCategory[0]?._id}>Nhập khẩu</Select.Option>
            <Select.Option value={dataCategory && dataCategory[1]?._id}>Xuất khẩu</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Please input the price!' }]}>
          <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>

        <Form.Item label='Amount' name='amount' rules={[{ required: true, message: 'Please input the amount!' }]}>
          <Input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCreateProduct;
