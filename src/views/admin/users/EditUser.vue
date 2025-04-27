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
    try {
      const userId = this.$route.params.id;
      const res = await fetchUserById(userId);
      this.userForm = res; // 直接赋值 res 而非 res.data
    } catch (error) {
      console.error("加载用户失败:", error);
      this.$message.error("加载用户信息失败");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await updateUser(this.userForm);
        this.$message.success("更新成功");
        this.$router.push('/admin/users');
      } catch (error) {
        this.$message.error("更新失败: " + (error.response?.data || "网络错误"));
      }
    }
  }
};
</script>
