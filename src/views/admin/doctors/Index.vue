<!-- src/views/admin/departments/Index.vue -->
<template>
  <div class="department-management">
    <el-page-header @back="$router.push('/admin')" content="医生管理" />
    <el-card class="content-card">
      <!-- 页面具体内容将在这里实现 -->
      <p>医生管理页面内容</p>
    </el-card>
  </div>
</template>

<script setup>
// 科室管理逻辑将在这里实现
</script>

<style scoped>
.content-card {
  margin-top: 20px;
}
</style>