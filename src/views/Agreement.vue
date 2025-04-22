<template>
  <div class="agreement-container">
    <h1>用户协议</h1>
    <!-- 这里添加协议内容 -->
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.agreement-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>