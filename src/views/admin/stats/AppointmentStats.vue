<!-- src/views/admin/stats/AppointmentStats.vue -->
<template>
  <div class="stats-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div id="departmentChart" style="height:400px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="statusChart" style="height:400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import { getAppointmentStats } from '@/api/stats'

onMounted(async () => {
  const res = await getAppointmentStats()
  renderCharts(res.data)
})

// 按照论文要求使用ECharts可视化
const renderCharts = (data) => {
  // 科室预约量饼图
  const deptChart = echarts.init(document.getElementById('departmentChart'))
  deptChart.setOption({
    title: { text: '科室预约分布' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      data: data.departmentStats.map(item => ({
        value: item.count,
        name: item.departmentName
      }))
    }]
  })

  // 预约状态环形图
  const statusChart = echarts.init(document.getElementById('statusChart'))
  statusChart.setOption({
    title: { text: '预约状态分布' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: data.statusStats.map(item => ({
        value: item.count,
        name: item.status
      }))
    }]
  })
}
</script>