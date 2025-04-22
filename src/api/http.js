import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 不再自动返回 response.data，保留完整响应
    return response
  },
  error => {
    // 返回完整的错误响应，便于前端处理
    return Promise.reject(error.response?.data || error)
  }
)

export default api  // 关键导出