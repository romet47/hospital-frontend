<template>
  <div class="login-container">
    <!-- 背景图片 -->
    <div class="background-image" :style="{ backgroundImage: `url(${hospitalBg})` }"></div>
    
    <!-- 登录卡片 -->
    <el-card class="login-card">
      <div class="logo">
        <img :src="hospitalLogo" alt="医院logo">
        <h2>医院预约挂号系统</h2>
      </div>

      <el-form 
        @submit.prevent="handleLogin" 
        :model="form" 
        :rules="rules"
        ref="loginForm"
      >
        <!-- 用户名输入 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名/手机号"
            prefix-icon="User"
            clearable
          />
        </el-form-item>

        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <!-- 记住密码 & 忘记密码 -->
        <div class="login-options">
          <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
          <div class="footer">
            <el-link type="primary" @click="goToForgotPassword">忘记密码?</el-link>
          </div>
        </div>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            :loading="loading"
            round
            class="login-btn"
          >
            登录
          </el-button>
        </el-form-item>

        <!-- 注册引导 -->
        <div class="register-tip">
          还没有账号? <el-link type="primary" @click="goToRegister">立即注册</el-link>
        </div>
      </el-form>
    </el-card>

    <!-- 忘记密码对话框 -->
    <el-dialog title="找回密码" v-model="forgetVisible" width="30%">
      <ForgetPassword @close="forgetVisible = false" />
    </el-dialog>
  </div>
</template>

<script setup>
import api from '@/api/http'
import ForgetPassword from '@/components/ForgetPassword.vue'
import hospitalLogo from '@/assets/hospital-logo.png'
import hospitalBg from '@/assets/hospital-bg.jpg'

// Vue核心功能
import { ref, reactive, onMounted, computed } from 'vue'

// Vue路由
import { useRouter, useRoute } from 'vue-router'

// Element Plus组件
import { ElMessage, ElMessageBox } from 'element-plus'

// API方法
import { login, register } from '@/api/auth'

// 其他工具
const router = useRouter()
const loginForm = ref(null)
const forgetVisible = ref(false)
const loading = ref(false)

// 表单数据
const form = reactive({
  username: '',
  password: ''
})

onMounted(() => {
  const savedUser = localStorage.getItem('savedUser');
  if (savedUser) {
    try {
      const { username, password } = JSON.parse(savedUser);
      form.username = username;
      form.password = password;
      rememberMe.value = true;
    } catch (e) {
      console.error('解析保存的用户信息失败:', e);
      localStorage.removeItem('savedUser');
    }
  }
});
// 表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})


// 登录逻辑
const handleLogin = async () => {
  try {
    await loginForm.value.validate();
    loading.value = true;

    const response = await login(form.username, form.password);

    if (response.token) {
      localStorage.setItem('token', response.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

      // 解析token获取角色（注意大小写）
      const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
      const userRole = tokenPayload?.role?.toUpperCase() || ''; // 转换为大写

      // 根据角色跳转
      let redirectPath = '/';
      if (userRole === 'ADMIN') {
        redirectPath = '/admin';
      } else if (userRole === 'DOCTOR') {
        redirectPath = '/doctor';
      }

      await router.push(redirectPath);

      // 只显示一次成功提示
      if (!fromRoute?.meta?.hideMessage) {
        ElMessage.success('登录成功');
      }
    }
  } catch (error) {
    ElMessage.error(error.message);
    console.error('登录错误:', error);
  } finally {
    loading.value = false;
  }
};
// 其他功能
const showForgetDialog = () => { forgetVisible.value = true }
const goToRegister = () => { router.push('/register') }
const goToForgotPassword = () => router.push('/forgot-password')
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/hospital-bg.jpg') no-repeat center center;
  background-size: cover;
  filter: brightness(0.6);
  z-index: 0;
}

.login-card {
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
}

.register-tip {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style>