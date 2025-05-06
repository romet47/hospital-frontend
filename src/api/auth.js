import api from './http';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/auth/login', {
      username,
      password
    });

    // 修改这里，确保正确处理响应结构
    if (!response?.token) {
      throw new Error('登录响应中没有token');
    }

    return {
      token: response.token,
      ...response  // 保留其他响应数据
    };
  } catch (error) {
    const errorMsg = error.response?.data?.message ||
        error.message ||
        '登录失败';
    throw new Error(errorMsg);
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
    const response = await api.get('/api/auth/check-email', { params: { email } });

    // 调试日志（完成后可删除）
    console.log('完整响应对象:', response);
    console.log('响应数据:', response.data);

    // 直接返回整个response，由调用方处理
    return response;
  } catch (error) {
    console.error('邮箱检查请求失败:', error);
    throw new Error(error.response?.data?.message || '邮箱验证服务暂时不可用');
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