<!-- src/views/patient/Index.vue -->
<template>
  <div class="patient-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="patient-info">
          <el-avatar size="large" :src="patient.avatar" />
          <div class="patient-name">{{ patient.name }}</div>
        </div>
        <el-menu
            router
            :default-active="$route.path"
            class="patient-menu"
        >
          <el-menu-item index="/patient/dashboard">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/patient/departments">
            <el-icon><OfficeBuilding /></el-icon>
            <span>科室查询</span>
          </el-menu-item>
          <el-menu-item index="/patient/doctors">
            <el-icon><Avatar /></el-icon>
            <span>医生查询</span>
          </el-menu-item>
          <el-menu-item index="/patient/appointments">
            <el-icon><Calendar /></el-icon>
            <span>预约挂号</span>
            <el-badge :value="appointmentsCount" class="badge" />
          </el-menu-item>
          <el-menu-item index="/patient/records">
            <el-icon><Document /></el-icon>
            <span>预约记录</span>
          </el-menu-item>
          <el-menu-item index="/patient/profile">
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {
  HomeFilled,
  OfficeBuilding,
  Avatar,
  Calendar,
  Document,
  User
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/request'

const route = useRoute()

const patient = ref({
  name: '张三',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  id: 'P12345678'
})
const appointmentsCount = ref(0)

// 获取当前用户和预约数量
async function loadUserInfo() {
  try {
    const res = await axios.get('/api/auth/me')
    patient.value.name = res.data.username

    const apptRes = await axios.get('/api/appointments/my')
    appointmentsCount.value = apptRes.data.filter(a => a.status === 'PENDING').length
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
}

loadUserInfo()
</script>

<style scoped>
.patient-container {
  height: 100vh;
}

.patient-menu {
  height: calc(100% - 80px);
}

.el-aside {
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.patient-info {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #eee;
}

.patient-name {
  font-weight: bold;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}

.badge {
  margin-left: 10px;
}
</style>
