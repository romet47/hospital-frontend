<!-- src/views/patient/Profile.vue -->
<template>
  <div class="profile-container">
    <h2>个人中心</h2>

    <el-card class="profile-card">
      <el-form label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="patient.name" disabled />
        </el-form-item>
        <el-form-item label="患者ID">
          <el-input v-model="patient.id" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="patient.phone" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="patient.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProfile">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const patient = ref({
  name: '张三',
  id: 'P12345678',
  phone: '13800138000',
  email: 'patient@example.com'
})

const saveProfile = () => {
  ElMessage.success('个人信息已保存')
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