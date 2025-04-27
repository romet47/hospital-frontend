<template>
  <div>
    <el-form :model="userForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option label="患者" value="patient"></el-option>
          <el-option label="医生" value="doctor"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchUserById, updateUser } from '@/api/admin';

export default {
  data() {
    return {
      userForm: {
        username: '',
        email: '',
        role: ''
      }
    };
  },
  async created() {
    const userId = this.$route.params.id;
    const res = await fetchUserById(userId);
    this.userForm = res.data;
  },
  methods: {
    async handleSubmit() {
      await updateUser(this.userForm);
      this.$router.push('/admin/user');
    }
  }
};
</script>
