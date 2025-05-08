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
    id: 1,
    doctor: { department: { name: '心血管内科' }, name: '李医生' },
    schedule: { workDate: '2023-06-15', timeSlot: '上午' },
    status: 'PENDING'
  }
])

const historicalAppointments = ref([
  {
    id: 2,
    doctor: { department: { name: '消化内科' }, name: '王医生' },
    schedule: { workDate: '2023-05-20', timeSlot: '上午' },
    status: 'COMPLETED'
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
