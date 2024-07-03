import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const userApi = {
  login(params: any) {
    const url = '/user/login-admin';
    return apiClient.post(url, params);
  },
  deleteUser(userId: any) {
    const url = `/user/${userId}`;
    return apiClient.delete(url);
  },
  getUser() {
    const url = `/user/get-list-user`;
    return apiClient.get(url);
  },
  getShipper() {
    const url = `/user/get-list-shipper`;
    return apiClient.get(url);
  },
  createShipper(params: any) {
    const url = `/user/create-shipper`;
    return apiClient.post(url, params);
  },
  editShipper(shipperId: any, params: any) {
    const url = `/user/${shipperId}`;
    return apiClient.put(url, params);
  },
};

export const useQueryGetListUser = () => {
  return useQuery(['list-user'], userApi.getUser);
};

export const useMutationDelete = () => {
  return useMutation((userId: any) => userApi.deleteUser(userId));
};

export const useMutationLogin = () => {
  return useMutation((params: any) => userApi.login(params));
};
export const useMutationCreateShipper = () => {
  return useMutation((params: any) => userApi.createShipper(params));
};

export const useQueryGetListShipper = () => {
  return useQuery(['list-shipper'], userApi.getShipper);
};

export const useMutationEditShipper = (shipperId: any) => {
  return useMutation((params: any) => userApi.editShipper(shipperId, params));
};

export default userApi;
