<!-- src/views/patient/Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <h2>欢迎回来，{{ patient.name }}！</h2>

    <el-row :gutter="20" class="quick-actions">
      <el-col :span="8">
        <el-card shadow="hover" @click="$router.push('/patient/appointment')">
          <el-icon size="30px"><Calendar /></el-icon>
          <h3>快速预约</h3>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click="$router.push('/patient/records')">
          <el-icon size="30px"><Document /></el-icon>
          <h3>我的预约</h3>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click="$router.push('/patient/profile')">
          <el-icon size="30px"><User /></el-icon>
          <h3>个人资料</h3>
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
        <el-table-column prop="doctor" label="医生" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="viewDetails(scope.row)">详情</el-button>
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

<script setup>
import { Calendar, Document, User } from '@element-plus/icons-vue'
import { ref } from 'vue'

const patient = ref({
  name: '张三'
})

const appointments = ref([
  {
    id: 'A1001',
    date: '2023-06-15',
    time: '09:30',
    department: '心血管内科',
    doctor: '李医生',
    status: '已确认'
  },
  {
    id: 'A1002',
    date: '2023-06-18',
    time: '14:00',
    department: '消化内科',
    doctor: '王医生',
    status: '已确认'
  }
])

const news = ref([
  {
    id: 1,
    title: '心血管内科新增专家门诊',
    content: '自6月1日起，心血管内科新增每周三上午专家门诊，由张教授坐诊。',
    date: '2023-05-28'
  },
  {
    id: 2,
    title: '医院夏季作息时间调整',
    content: '6月1日至8月31日，门诊时间调整为上午8:00-11:30，下午14:00-17:30。',
    date: '2023-05-25'
  }
])

const viewDetails = (appointment) => {
  console.log('查看预约详情:', appointment)
  // 实际项目中可以跳转到详情页
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.quick-actions {
  margin-bottom: 20px;
}

.quick-actions .el-card {
  text-align: center;
  cursor: pointer;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quick-actions h3 {
  margin-top: 10px;
}

.upcoming-appointments, .department-news {
  margin-bottom: 20px;
}

.news-date {
  margin-top: 10px;
  color: #999;
  font-size: 0.8em;
  text-align: right;
}
</style>