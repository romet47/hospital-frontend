<!-- src/views/admin/users/UserManagement.vue -->
<template>
  <div class="user-management">
    <el-card>
      <!-- 搜索栏 -->
      <el-form :inline="true" class="search-form">
        <el-form-item>
          <el-input v-model="searchParams.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchParams.role" placeholder="角色">
            <el-option label="全部" value=""/>
            <el-option label="患者" value="patient"/>
            <el-option label="医生" value="doctor"/>
            <el-option label="管理员" value="admin"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadUsers">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- 用户表格 -->
      <el-table :data="users" v-loading="loading">
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="role" label="角色">
          <template #default="{row}">
            <el-tag :type="roleTagType[row.role]">
              {{ roleMap[row.role] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{row}">
            <el-button size="small" @click="editUser(row)">编辑</el-button>
            <el-popconfirm title="确认删除该用户？" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @current-change="handlePageChange"
          :current-page="pagination.current"
          :page-size="pagination.size"
          :total="pagination.total"
          class="pagination"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getUsers, deleteUser } from '@/api/admin'

// 论文中要求的角色映射
const roleMap = {
  patient: '患者',
  doctor: '医生',
  admin: '管理员'
}

const roleTagType = {
  patient: 'success',
  doctor: 'warning',
  admin: 'danger'
}

// 状态管理
const users = ref([])
const loading = ref(false)
const searchParams = ref({
  username: '',
  role: ''
})

// 分页参数（与后端API文档一致）
const pagination = ref({
  current: 1,
  size: 10,
  total: 0
})

// 加载用户数据
const loadUsers = async () => {
  try {
    loading.value = true
    const res = await getUsers({
      ...searchParams.value,
      page: pagination.value.current - 1, // 后端从0开始
      size: pagination.value.size
    })
    users.value = res.data.content
    pagination.value.total = res.data.totalElements
  } finally {
    loading.value = false
  }
}

// 初始化加载
onMounted(loadUsers)
</script>