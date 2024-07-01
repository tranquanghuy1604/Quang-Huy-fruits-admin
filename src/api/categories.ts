import { useQuery } from 'react-query';
import apiClient from './apiClient';

const categoriesApi = {
  getCategories() {
    const url = '/category';
    return apiClient.get(url);
  },
};

export const useQueryGetCategories = () => {
  return useQuery(['list-categories'], categoriesApi.getCategories);
};

export default categoriesApi;
