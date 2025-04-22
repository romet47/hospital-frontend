<template>
    <el-form :model="form" :rules="rules" ref="forgetForm">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="请输入注册邮箱" />
      </el-form-item>
      
      <el-form-item prop="captcha">
        <div class="captcha-input">
          <el-input v-model="form.captcha" placeholder="验证码" />
          <el-button type="primary" @click="sendCaptcha" :disabled="countdown > 0">
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
      
      <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
    </el-form>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { sendVerificationCode, resetPassword } from '@/api/auth';
  const form = reactive({
    email: '',
    captcha: ''
  })
  
  const countdown = ref(0)
  const loading = ref(false)
  
  const sendCaptcha = () => {
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
    // 这里调用发送验证码API
  }
  
  const submit = async () => {
    loading.value = true
    try {
      // 调用找回密码API
      ElMessage.success('密码重置邮件已发送')
      emit('close')
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .captcha-input {
    display: flex;
    gap: 10px;
  }
  </style>