<template>
  <div class="doctor-container">
    <!-- 顶部医生信息 -->
    <div class="header-section">
      <div class="doctor-info">
        <el-avatar :size="60" :src="doctor.avatar"></el-avatar>
        <div>
          <h2 style="margin: 0">{{ doctor.name }} ({{ doctor.department }})</h2>
          <p style="margin: 5px 0 0; color: #666;">{{ doctor.title }} | 工号: {{ doctor.id }}</p>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="refreshData" icon="Refresh">刷新</el-button>
      </div>
    </div>

    <!-- 快捷操作区 -->
    <div class="quick-actions">
      <el-button type="primary" @click="$router.push('/doctor/schedule')" icon="Calendar">我的排班</el-button>
      <el-button type="success" @click="$router.push('/doctor/patients')" icon="User">患者队列</el-button>
      <el-button type="warning" @click="$router.push('/doctor/records')" icon="Document">诊断记录</el-button>
      <el-button type="info" @click="$router.push('/doctor/templates')" icon="Notebook">诊断模板</el-button>
    </div>

    <!-- 标签页 -->
    <div class="tab-container">
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="排班管理" name="schedule" />
        <el-tab-pane label="患者队列" name="patients" />
        <el-tab-pane label="诊断记录" name="records" />
        <el-tab-pane label="诊断模板" name="templates" />
      </el-tabs>
    </div>

    <!-- 内容区域 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: this.$route.name.split('Doctor')[1].toLowerCase(),
      doctor: {}
    }
  },
  methods: {
    async refreshData() {
      await this.fetchDoctorInfo()
    },
    async fetchDoctorInfo() {
      try {
        const res = await import('@/api/doctor').then(m => m.getDoctorInfo())
        this.doctor = res.data
      } catch (error) {
        console.error('获取医生信息失败:', error)
      }
    },
    handleTabChange(tabName) {
      this.$router.push(`/doctor/${tabName}`)
    }
  },
  created() {
    this.fetchDoctorInfo()
  }
}
</script>

<style scoped>
.doctor-container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.doctor-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.quick-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.tab-container {
  margin-bottom: 15px;
}
</style>
