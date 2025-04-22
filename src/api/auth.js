import api from './http';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/auth/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '登录失败');
  }
};

export const register = async (userData, code) => {
  try {
    const response = await api.post('/api/auth/register', userData, {
      params: { code }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '注册失败',
      error: error
    };
  }
};

export const sendVerificationCode = async (email) => {
  try {
    const response = await api.post('/api/auth/send-code', { email });
    return {
      success: true,
      data: response
    };
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await api.get('/api/auth/check-email', {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 确保添加这个导出
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/api/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};