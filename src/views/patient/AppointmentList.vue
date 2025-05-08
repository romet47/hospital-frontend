<template>
  <el-table :data="appointments" border style="width: 100%">
    <el-table-column prop="doctor.department.name" label="科室"></el-table-column>
    <el-table-column prop="doctor.name" label="医生"></el-table-column>
    <el-table-column prop="schedule.workDate" label="日期"></el-table-column>
    <el-table-column prop="schedule.timeSlot" label="时间段"></el-table-column>
    <el-table-column label="状态">
      <template #default="{ row }">
        <span :style="{ color: getStatusColor(row.status) }">{{ formatStatus(row.status) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="text" @click="viewDetail(row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const props = defineProps(['appointments'])

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

function viewDetail(row) {
  alert(`查看预约 ID: ${row.id}`)
}
</script>
