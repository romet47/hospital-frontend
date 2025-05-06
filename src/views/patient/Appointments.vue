<!-- src/views/patient/Appointments.vue -->
<template>
  <div class="appointments-container">
    <h2>我的预约</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="待就诊" name="upcoming">
        <AppointmentList :appointments="upcomingAppointments" />
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="history">
        <AppointmentList :appointments="historicalAppointments" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppointmentList from '@/components/patient/AppointmentList.vue'

const activeTab = ref('upcoming')

const upcomingAppointments = ref([
  {
    id: 'A1001',
    date: '2023-06-15',
    time: '09:30',
    department: '心血管内科',
    doctor: '李医生',
    status: '已确认'
  }
])

const historicalAppointments = ref([
  {
    id: 'A0901',
    date: '2023-05-20',
    time: '10:00',
    department: '消化内科',
    doctor: '王医生',
    status: '已完成'
  }
])
</script>

<style scoped>
.appointments-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>