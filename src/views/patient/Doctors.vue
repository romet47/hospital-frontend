<template>
  <div class="doctors-container">
    <h2>医生列表</h2>
    <el-table :data="doctors" border style="width: 100%">
      <el-table-column prop="name" label="医生姓名" />
      <el-table-column prop="title" label="职称" />
      <el-table-column prop="specialty" label="专业特长" />
      <el-table-column label="科室">
        <template #default="{ row }">
          {{ row.department ? row.department.name : '暂无' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button size="small" @click="selectDoctor(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/request'

const doctors = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/doctors')
    doctors.value = res.data.content || []
  } catch (error) {
    console.error('加载医生列表失败', error)
  }
})

function selectDoctor(doctor) {
  alert(`选择医生：${doctor.name}`)
}
</script>

<style scoped>
.doctors-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
