'use client';
import { useMutationCreateShipper, useMutationEditShipper } from '@/api/userApi';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
interface Props {
  handleCancel: () => void;
  item: any;
}

const FormEditShipper = (props: Props) => {
  const { handleCancel, item } = props;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate: editShipper } = useMutationEditShipper(item?._id);
  const onFinish = (values: any) => {
    editShipper(
      {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success('Sửa người giao hàng thành công');
          queryClient.invalidateQueries(['list-shipper']);
          handleCancel();
        },
      },
    );
    form.resetFields();
  };

  return (
    <div>
      <Form
        initialValues={{
          first_name: item?.first_name,
          last_name: item?.last_name,
          email: item?.email,
          phone: item?.phone,
        }}
        form={form}
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item label='Tên' name='first_name' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
          <Input className='h-[50px]' placeholder='Tên' />
        </Form.Item>

        <Form.Item label='Họ' name='last_name' rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
          <Input className='h-[50px]' placeholder='Họ' />
        </Form.Item>
        <Form.Item name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
          <Input className='h-[50px]' placeholder='Số điện thoại' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your Email!' },
          ]}
        >
          <Input className='mt-[10px] h-[50px]' placeholder='Email' />
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

export default FormEditShipper;
