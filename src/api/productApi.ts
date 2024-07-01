import { ParamsCreateProduct } from '@/types/app.types';
import apiClient from './apiClient';
import { useMutation, useQuery } from 'react-query';

const productApi = {
  getListProduct() {
    const url = '/product';
    return apiClient.get(url);
  },
  createProduct(formData: FormData) {
    const url = '/product';
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteProduct(productId: any) {
    const url = `/product/${productId}`;
    return apiClient.delete(url);
  },
  editProduct(formData: FormData, productId: any) {
    const url = `/product/${productId}`;
    return apiClient.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const useQueryGetListProduct = () => {
  return useQuery(['list-product'], productApi.getListProduct);
};

export const useMutationCreateProduct = () => {
  return useMutation((formData: FormData) => productApi.createProduct(formData));
};

export const useMutationDeleteProduct = () => {
  return useMutation((params: any) => productApi.deleteProduct(params));
};

export const useMutationEditProduct = (productId: any) => {
  return useMutation((formData: FormData) => productApi.editProduct(formData, productId));
};

export default productApi;
