import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const orderApi = {
  getAllOrder() {
    const url = '/order';
    return apiClient.get(url);
  },
  deleteOrder(orderId: any) {
    const url = `/order/${orderId}`;
    return apiClient.delete(url);
  },
  changeDelivery(orderId: any) {
    const url = 'order/change-delivery';
    return apiClient.post(url, orderId);
  },
};

export const useQueryGetAllOrder = () => {
  return useQuery(['list-order'], orderApi.getAllOrder);
};

export const useMutationDeleteOrder = () => {
  return useMutation((orderId: any) => orderApi.deleteOrder(orderId));
};

export const useMutationChangeDelivery = () => {
  return useMutation((orderId: any) => orderApi.changeDelivery(orderId));
};

export default orderApi;
