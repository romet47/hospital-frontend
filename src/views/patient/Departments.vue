<!-- src/views/patient/Departments.vue -->
<template>
  <div class="departments-container">
    <h2>科室列表</h2>
    <el-table :data="departments" style="width: 100%">
      <el-table-column prop="name" label="科室名称" />
      <el-table-column prop="description" label="简介" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
              size="small"
              @click="$router.push(`/patient/appointments?department=${scope.row.id}`)"
          >
            预约
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const departments = ref([
  {
    id: 1,
    name: '心血管内科',
    description: '专门治疗心脏和血管系统疾病'
  },
  {
    id: 2,
    name: '消化内科',
    description: '治疗消化系统相关疾病'
  },
  {
    id: 3,
    name: '神经内科',
    description: '治疗神经系统相关疾病'
  }
])
</script>

<style scoped>
.departments-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>