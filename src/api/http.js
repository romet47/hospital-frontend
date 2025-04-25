import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use(
    response => {
      return response.data; // 关键修改：直接返回data
    },
    error => {
      if (error.response?.status === 401) {
        ElMessage.error('登录已过期，请重新登录');
        localStorage.removeItem('token');
        router.push('/login');
      }
      return Promise.reject(error.response?.data || error);
    }
);

export default api;