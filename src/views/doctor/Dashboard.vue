<template>
  <div class="dashboard-container">
    <h2>欢迎回来，{{ doctor.name }}！</h2>

    <el-row :gutter="20" class="quick-actions">
      <el-col :span="6">
        <el-card shadow="hover" @click="$router.push('/doctor/schedule')">
          <el-icon><Calendar /></el-icon>
          <h3>我的排班</h3>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="$router.push('/doctor/patients')">
          <el-icon><User /></el-icon>
          <h3>患者队列</h3>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="$router.push('/doctor/records')">
          <el-icon><Document /></el-icon>
          <h3>诊断记录</h3>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="$router.push('/doctor/templates')">
          <el-icon><Notebook /></el-icon>
          <h3>诊断模板</h3>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="upcoming-appointments">
      <template #header>
        <span>即将到来的预约</span>
      </template>
      <el-table :data="appointments" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="time" label="时间" width="120" />
        <el-table-column prop="department" label="科室" />
        <el-table-column prop="patientName" label="患者姓名" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="viewDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="department-news">
      <template #header>
        <span>科室公告</span>
      </template>
      <el-collapse>
        <el-collapse-item v-for="item in news" :key="item.id" :title="item.title">
          <div>{{ item.content }}</div>
          <div class="news-date">{{ item.date }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>

import { getDoctorInfo, getTodayAppointments } from '@/api/doctor'
import { Calendar, User, Document, Notebook } from '@element-plus/icons-vue'
export default {
  components: {
    Calendar,
    User,
    Document,
    Notebook
  },
  data() {
    return {
      doctor: {},
      appointments: [],
      news: [
        {
          id: 1,
          title: '关于调整门诊时间的通知',
          content: '根据医院安排，自2023年7月1日起，部分科室门诊时间将进行调整，请各位医生注意查看新的排班表。',
          date: '2023-06-10'
        },
        {
          id: 2,
          title: '心血管内科专家讲座通知',
          content: '本周五下午3点，心血管内科将在学术报告厅举办专家讲座，请相关科室医生准时参加。',
          date: '2023-06-08'
        }
      ]
    }
  },
  async created() {
    await this.fetchDoctorInfo()
    await this.fetchTodayAppointments()
  },
  methods: {
    async fetchDoctorInfo() {
      try {
        const res = await getDoctorInfo()
        this.doctor = res.data
      } catch (error) {
        console.error('获取医生信息失败:', error)
      }
    },
    async fetchTodayAppointments() {
      try {
        const res = await getTodayAppointments()
        this.appointments = res.data.map(item => ({
          date: item.appointmentTime,
          time: '10:00',
          department: item.department?.name || '未知科室',
          patientName: item.patient?.user?.username || '未知患者'
        }))
      } catch (error) {
        console.error('获取患者队列失败:', error)
      }
    },
    viewDetails(item) {
      // 查看详情逻辑
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.quick-actions {
  margin-bottom: 20px;
}
.upcoming-appointments {
  margin-bottom: 20px;
}
.department-news .news-date {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
}
</style>
