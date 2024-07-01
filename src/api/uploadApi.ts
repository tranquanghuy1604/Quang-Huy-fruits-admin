import { useMutation } from 'react-query';
import apiClient from './apiClient';

const uploadApi = {
  uploadImage(params: any) {
    const url = '/upload';
    return apiClient.post(url, params);
  },
};

export const useMutationUploadImage = () => {
  return useMutation((params: any) => uploadApi.uploadImage(params));
};

export default uploadApi;
