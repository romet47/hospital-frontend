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
import { addUser } from '@/api/admin';

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
  methods: {
    async handleSubmit() {
      await addUser(this.userForm);
      this.$router.push('/admin/users');
    }
  }
};
</script>
