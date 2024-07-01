import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 8000,
  headers: {
    'content-type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken-admin');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (typeof window === 'undefined') {
      throw error;
    }
    return Promise.reject(error);
  },
);
export default apiClient;
