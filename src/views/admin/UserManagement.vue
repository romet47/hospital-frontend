<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      const res = await fetchUsers();
      this.userList = res.data;
    },
    handleAdd() {
      this.$router.push('/admin/user/add');
    },
    handleEdit(user) {
      this.$router.push(`/admin/user/edit/${user.id}`);
    },
    async handleDelete(user) {
      await deleteUser(user.id);
      this.fetchUserList();
    }
  }
};
</script>
