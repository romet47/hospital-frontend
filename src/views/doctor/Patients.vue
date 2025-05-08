<template>
  <div class="patients-container">
    <el-card class="patients-card">
      <template #header>
        <div class="card-header">今日患者队列</div>
      </template>
      <el-table :data="patients" style="width: 100%">
        <el-table-column prop="number" label="序号" width="80" />
        <el-table-column prop="name" label="患者姓名" width="120" />
        <el-table-column prop="time" label="预约时间" width="120" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handlePatient(scope.row)">
              {{ scope.row.status === 'PENDING' ? '接诊' : '详情' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTodayAppointments } from '@/api/doctor'

export default {
  data() {
    return {
      patients: []
    }
  },
  async created() {
    await this.fetchPatients()
  },
  methods: {
    async fetchPatients() {
      try {
        const res = await getTodayAppointments()
        this.patients = res.data.map((item, index) => ({
          number: index + 1,
          name: item.patient?.user?.username || '未知',
          phone: item.patient?.phone || '未知',
          time: new Date(item.appointmentTime).toLocaleTimeString(),
          status: item.status
        }))
      } catch (error) {
        console.error('获取患者失败:', error)
      }
    },
    getStatusTagType(status) {
      switch (status) {
        case 'PENDING': return 'warning'
        case 'COMPLETED': return 'success'
        case 'CANCELLED': return 'danger'
        default: return ''
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'PENDING': return '候诊中'
        case 'COMPLETED': return '已就诊'
        case 'CANCELLED': return '已取消'
        default: return ''
      }
    },
    handlePatient(row) {
      if (row.status === 'PENDING') {
        this.$message.info('开始接诊')
      } else {
        this.$message.info('查看历史记录')
      }
    }
  }
}
</script>

<style scoped>
.patients-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.card-header {
  font-weight: bold;
}
</style>
