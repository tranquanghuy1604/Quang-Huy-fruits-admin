import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

export interface ParamsLogin {
  email: string;
  password: string;
}

const userApi = {
  login(params: ParamsLogin) {
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
};

export const useQueryGetListUser = () => {
  return useQuery(['list-user'], userApi.getUser);
};

export const useMutationDelete = () => {
  return useMutation((userId: any) => userApi.deleteUser(userId));
};

export const useMutationLogin = () => {
  return useMutation((params: ParamsLogin) => userApi.login(params));
};

export const useQueryGetListShipper = () => {
  return useQuery(['list-shipper'], userApi.getShipper);
};

export default userApi;
