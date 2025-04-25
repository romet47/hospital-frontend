<!-- src/views/admin/Index.vue -->
<template>
  <div class="admin-container">
    <el-container>
      <!-- 侧边栏导航 -->
      <el-aside width="200px">
        <el-menu
            router
            :default-active="$route.path"
            class="admin-menu"
        >
          <el-menu-item index="/admin/users">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/departments">
            <el-icon><OfficeBuilding /></el-icon>
            <span>科室管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/doctors">
            <el-icon><Avatar /></el-icon>
            <span>医生管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/schedules">
            <el-icon><Calendar /></el-icon>
            <span>排班管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/stats">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {
  User,
  OfficeBuilding,
  Avatar,
  Calendar,
  DataAnalysis
} from '@element-plus/icons-vue'
</script>

<style scoped>
.admin-container {
  height: 100vh;
}

.admin-menu {
  height: 100%;
}

.el-aside {
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}
</style>