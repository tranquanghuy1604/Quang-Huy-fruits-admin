import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const promotionApi = {
  getAllPromotion() {
    const url = '/promotion/list-promotion';
    return apiClient.get(url);
  },
  createPromotion(params: any) {
    const url = `/promotion`;
    return apiClient.post(url, params);
  },
  editPromotion(params: any, promotionId: any) {
    const url = `/promotion/${promotionId}`;
    return apiClient.put(url, params);
  },
  deletePromotion(promotionId: any) {
    const url = `/promotion/${promotionId}`;
    return apiClient.delete(url);
  },
};

export const useQueryGetAllPromotion = () => {
  return useQuery(['list-promotion'], promotionApi.getAllPromotion);
};

export const useMutationCreatePromotion = () => {
  return useMutation((params: any) => promotionApi.createPromotion(params));
};

export const useMutationEditPromotion = (promotionId: any) => {
  return useMutation((params: any) => promotionApi.editPromotion(params, promotionId));
};
export const useMutationDeletePromotion = () => {
  return useMutation((promotionId: any) => promotionApi.deletePromotion(promotionId));
};

export default promotionApi;
