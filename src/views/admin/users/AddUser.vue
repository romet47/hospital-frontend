<template>
  <div>
    <el-form :model="userForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option label="患者" value="PATIENT"></el-option>
          <el-option label="医生" value="DOCTOR"></el-option>
          <el-option label="管理员" value="ADMIN"></el-option>
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
        password: '', // 必须包含密码字段
        email: '',
        role: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.userForm.password) {
        this.$message.error("密码不能为空");
        return;
      }
      try {
        await addUser(this.userForm);
        this.$message.success("用户添加成功");
        this.$router.push('/admin/users');
      } catch (error) {
        this.$message.error("添加失败: " + (error.response?.data?.message || "网络错误"));
      }
    }
  }
};
</script>