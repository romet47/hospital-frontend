import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const request = axios.create({
    baseURL: 'http://localhost:8080', // 后端API的基础URL
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在请求头中添加token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response.data;
    },
    (error) => {
        // 处理错误响应
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    ElMessage.error('未授权，请重新登录');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 404:
                    ElMessage.error('资源未找到');
                    break;
                case 500:
                    ElMessage.error('服务器错误');
                    break;
                default:
                    ElMessage.error(`请求失败：${error.response.status}`);
            }
        } else {
            ElMessage.error('网络错误，请检查网络连接');
        }
        return Promise.reject(error);
    }
);

export default request;
