<template>
  <div class="register-container">
    <div class="background-overlay"></div>
    
    <el-card class="register-card">
      <div class="card-header">
        <h2>用户注册</h2>
        <p class="subtitle">加入我们，开启全新体验</p>
      </div>
      
      <el-form 
        ref="registerForm"
        :model="form" 
        :rules="rules"
        @submit.prevent="handleRegister"
        class="register-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名(3-20位字母、数字或下划线)"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="email" class="email-item">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            prefix-icon="Message"
            size="large"
            @blur="checkEmailAvailability"
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

        <el-form-item prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入6位数字验证码"
            prefix-icon="Key"
            size="large"
            maxlength="6"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码(8-20位，含大小写字母和数字)"
            prefix-icon="Lock"
            show-password
            size="large"
          />
          <div class="password-strength">
            <div :class="['strength-bar', { active: passwordStrength >= 1 }]"></div>
            <div :class="['strength-bar', { active: passwordStrength >= 3 }]"></div>
            <div :class="['strength-bar', { active: passwordStrength >= 5 }]"></div>
            <span class="strength-text">
              {{ ['弱', '中', '强'][Math.min(2, Math.floor(passwordStrength / 2))] }}
            </span>
          </div>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            size="large"
          />
        </el-form-item>

        <el-button 
          type="primary" 
          native-type="submit"
          :loading="loading"
          class="register-btn"
          size="large"
        >
          立即注册
        </el-button>
      </el-form>

      <div class="footer">
        <div class="login-tip">
          已有账号? <el-link type="primary" @click="goToLogin">去登录</el-link>
        </div>
        <div class="agreement">
          注册即表示同意<el-link type="primary" @click="goToAgreement">《用户协议》</el-link>和<el-link type="primary" @click="goToPrivacy">《隐私政策》</el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register, sendVerificationCode, login, checkEmail } from '@/api/auth'

const router = useRouter()
const registerForm = ref(null)
const countdown = ref(0)
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})



const checkEmailAvailability = async () => {
  if (!isEmailValid.value) return;

  try {
    const res = await checkEmail(form.email);
    if (res.exists) { // 现在直接检查res.exists
      ElMessage.warning('该邮箱已注册');
      form.email = '';
    }
  } catch (error) {
    console.error('邮箱检查失败:', error);
    ElMessage.error('邮箱验证服务暂时不可用');
  }
};

const validatePassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3-20个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码必须为6位', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码必须是6位数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '长度在8-20个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
      message: '必须包含大小写字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
});

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
};

const passwordStrength = computed(() => {
  return checkPasswordStrength(form.password);
});

const sendCode = async () => {
  try {
    await registerForm.value.validateField('email');
    const checkRes = await checkEmail(form.email);

    if (checkRes.exists) { // 直接检查exists属性
      throw new Error('该邮箱已注册');
    }

    loading.value = true;
    await sendVerificationCode(form.email);
    ElMessage.success('验证码已发送');
    startCountdown();
  } catch (error) {
    ElMessage.error(error.message || '发送验证码失败');
  } finally {
    loading.value = false;
  }
};

const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) clearInterval(timer);
  }, 1000);
};

const handleRegister = async () => {
  try {
    const valid = await registerForm.value.validate();
    if (!valid) return;

    loading.value = true;

    // 修改为URL参数方式传递code
    const response = await register({
      username: form.username,
      email: form.email,
      password: form.password
    }, form.code); // 将code作为第二个参数传递

    if (response.success) {
      ElMessage.success('注册成功，正在自动登录...');
      try {
        const loginRes = await login(form.username, form.password);
        if (loginRes.token) {
          localStorage.setItem('token', loginRes.token);
          router.push('/');
        }
      } catch (loginError) {
        ElMessage.warning('注册成功，请手动登录');
        router.push('/login');
      }
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error('注册失败: ' + (error.response?.data?.message || error.message || '未知错误'));
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => router.push('/login');
const goToAgreement = () => router.push('/agreement');
const goToPrivacy = () => router.push('/privacy');
</script>

<style scoped>
.register-container {
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

.register-card {
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

.register-form {
  margin-top: 20px;
}

.email-item {
  position: relative;
}

.code-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
}

.password-strength {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  flex: 1;
  margin-right: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  transition: all 0.3s;
}

.strength-bar.active {
  background-color: var(--el-color-primary);
}

.strength-text {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}

.register-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  letter-spacing: 2px;
}

.footer {
  margin-top: 20px;
  text-align: center;
}

.login-tip {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.agreement {
  color: #999;
  font-size: 12px;
  margin-top: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-button) {
  border-radius: 8px;
}
/* 添加输入框获取焦点时的效果 */
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

/* 添加按钮悬停效果 */
.register-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .register-card {
    width: 90%;
    padding: 20px;
  }
}
</style>