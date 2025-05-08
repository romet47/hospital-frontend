<template>
  <div class="profile-container">
    <h2>个人中心</h2>
    <el-card class="profile-card">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="user.name" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="user.phone" />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="user.idCard" disabled />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProfile">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/request'
import { ElMessage } from 'element-plus'

const user = ref({})

onMounted(async () => {
  try {
    const res = await axios.get('/api/auth/me')
    user.value = res.data
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
})

function saveProfile() {
  axios.put(`/api/users/${user.value.id}`, user.value)
      .then(() => {
        ElMessage.success('保存成功')
      })
      .catch(err => {
        ElMessage.error('保存失败：' + err.response?.data?.message || '网络错误')
      })
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.profile-card {
  margin-top: 20px;
}
</style>
