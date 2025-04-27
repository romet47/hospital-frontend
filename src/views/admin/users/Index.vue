<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleAdd">添加用户</el-button>
  </div>
</template>

<script>
import { fetchUsers, deleteUser } from '@/api/admin';

export default {
  data() {
    return {
      userList: []
    };
  },
  created() {
    this.fetchUserList();
  },
  methods: {
    async fetchUserList() {
      try {
        const res = await fetchUsers();
        this.userList = res.content || []; // 适配后端分页格式
      } catch (error) {
        this.$message.error("加载失败: " + error.message);
      }
    },
    handleAdd() {
      this.$router.push('/admin/users/add');
    },
    handleEdit(user) {
      this.$router.push(`/admin/users/edit/${user.id}`);
    },
    async handleDelete(user) {
      try {
        await deleteUser(user.id);
        this.$message.success("删除成功");
        this.fetchUserList();
      } catch (error) {
        if (error.response?.status === 409) {
          this.$message.error("请先解除该用户的医生关联");
        } else {
          this.$message.error("删除失败");
        }
      }
    }
  }
};
</script>
