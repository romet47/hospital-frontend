<template>
  <div class="forgot-container">
    <div class="background-overlay"></div>

    <el-card class="forgot-card">
      <div class="card-header">
        <h2>忘记密码</h2>
        <p class="subtitle">请输入注册邮箱重置密码</p>
      </div>

      <el-form
          ref="forgotForm"
          :model="form"
          :rules="rules"
          @submit.prevent="handleSubmit"
          class="forgot-form"
      >
        <el-form-item prop="email">
          <el-input
              v-model="form.email"
              placeholder="请输入注册邮箱"
              prefix-icon="Message"
              size="large"
          />
        </el-form-item>

        <el-form-item prop="code" class="code-item">
          <el-input
              v-model="form.code"
              placeholder="请输入6位验证码"
              prefix-icon="Key"
              size="large"
              maxlength="6"
          />
          <el-button
              type="primary"
              @click="sendCode"
              :disabled="!isEmailValid || countdown > 0"
              size="large"
              class="code-btn"
          >
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </el-button>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入新密码(8-20位，含大小写字母和数字)"
              prefix-icon="Lock"
              show-password
              size="large"
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请确认新密码"
              prefix-icon="Lock"
              size="large"
          />
        </el-form-item>

        <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            class="submit-btn"
            size="large"
        >
          重置密码
        </el-button>
      </el-form>

      <div class="footer">
        <el-link type="primary" @click="goToLogin">返回登录</el-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { sendVerificationCode, resetPassword } from '@/api/auth'

const router = useRouter()
const forgotForm = ref(null)
const countdown = ref(0)
const loading = ref(false)

const form = reactive({
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const validatePassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码必须为6位', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码必须是数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, max: 20, message: '长度在8-20个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: '必须包含大小写字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
})

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const sendCode = async () => {
  try {
    await forgotForm.value.validateField('email')
    loading.value = true
    await sendVerificationCode(form.email)
    ElMessage.success('验证码已发送')
    startCountdown()
  } catch (error) {
    ElMessage.error(error.message || '发送验证码失败')
  } finally {
    loading.value = false
  }
}

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

const handleSubmit = async () => {
  try {
    const valid = await forgotForm.value.validate()
    if (!valid) return

    loading.value = true
    await resetPassword({
      email: form.email,
      code: form.code,
      newPassword: form.password
    })

    ElMessage.success('密码重置成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.response?.data?.message || error.message || '重置密码失败')
  } finally {
    loading.value = false
  }
}

const goToLogin = () => router.push('/login')
</script>

<style scoped>
.forgot-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/login-bg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.forgot-card {
  width: 480px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.95);
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-header h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.forgot-form {
  margin-top: 20px;
}

.code-item {
  position: relative;
}

.code-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  letter-spacing: 2px;
}

.footer {
  margin-top: 20px;
  text-align: center;
}

/* 复用注册页面的样式 */
:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-button) {
  border-radius: 8px;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .forgot-card {
    width: 90%;
    padding: 20px;
  }
}
</style>