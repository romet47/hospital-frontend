<template>
  <div class="dashboard-container">
    <!-- 欢迎信息 -->
    <div class="welcome-section">
      <h2>欢迎回来，{{ user.name }}！</h2>
      <button @click="refreshData" class="el-button el-button--primary el-button--small">刷新数据</button>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <div class="action-card" @click="quickAppointment">
        <i class="el-icon-date"></i>
        <h3>快速预约</h3>
      </div>
      <div class="action-card" @click="goToAppointments">
        <i class="el-icon-document"></i>
        <h3>我的预约 <span class="badge">{{ appointments.length }}</span></h3>
      </div>
      <div class="action-card" @click="goToRecords">
        <i class="el-icon-folder-opened"></i>
        <h3>就诊记录</h3>
      </div>
      <div class="action-card" @click="goToProfile">
        <i class="el-icon-user"></i>
        <h3>个人中心</h3>
      </div>
    </div>

    <!-- 预约表格 -->
    <div class="data-card">
      <h3>近期预约</h3>
      <el-table :data="appointments" border style="width: 100%">
        <el-table-column prop="doctor.department.name" label="科室"></el-table-column>
        <el-table-column prop="doctor.name" label="医生"></el-table-column>
        <el-table-column prop="schedule.workDate" label="日期"></el-table-column>
        <el-table-column prop="schedule.timeSlot" label="时间"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <span :style="{ color: getStatusColor(row.status) }">{{ formatStatus(row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="viewDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 医院公告 -->
    <div class="data-card">
      <h3>医院公告</h3>
      <div v-for="notice in notices" :key="notice.id" class="notice-item">
        <h4>{{ notice.title }}</h4>
        <p>{{ notice.content }}</p>
        <p class="date">{{ notice.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/request'

const user = ref({})
const appointments = ref([])
const notices = ref([
  {
    id: 1,
    title: '夏季门诊时间调整',
    content: '6月15日起，下午门诊时间调整为14:00-17:30',
    date: '2023-06-10'
  },
  {
    id: 2,
    title: '新设备投入使用',
    content: '放射科新增MRI设备，现已投入使用',
    date: '2023-06-05'
  }
])

onMounted(async () => {
  try {
    const resUser = await axios.get('/api/auth/me')
    user.value = resUser.data

    const resAppointments = await axios.get('/api/appointments/my')
    appointments.value = resAppointments.data
  } catch (error) {
    console.error('加载数据失败', error)
  }
})

function refreshData() {
  // 可以重新拉取数据或触发刷新逻辑
}

function quickAppointment() {
  window.location.href = '/#/patient/appointments'
}

function goToAppointments() {
  window.location.href = '/#/patient/appointments'
}

function goToRecords() {
  alert('跳转至就诊记录页面')
}

function goToProfile() {
  window.location.href = '/#/patient/profile'
}

function viewDetail(row) {
  alert(`查看预约 ID: ${row.id}`)
}

function getStatusColor(status) {
  switch (status) {
    case 'PENDING':
      return '#e6a23c'
    case 'COMPLETED':
      return '#67c23a'
    case 'CANCELLED':
      return '#909399'
    default:
      return '#333'
  }
}

function formatStatus(status) {
  switch (status) {
    case 'PENDING':
      return '待就诊'
    case 'COMPLETED':
      return '已完成'
    case 'CANCELLED':
      return '已取消'
    default:
      return status
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.quick-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.action-card {
  flex: 1;
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}
.action-card:hover {
  transform: translateY(-5px);
}
.badge {
  display: inline-block;
  background: #f56c6c;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
}
.notice-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.notice-item:last-child {
  border-bottom: none;
}
.date {
  font-size: 12px;
  color: #999;
}
</style>
