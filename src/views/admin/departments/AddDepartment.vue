<template>
  <div>
    <el-form :model="departmentForm" label-width="80px">
      <el-form-item label="科室名称">
        <el-input v-model="departmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科室描述">
        <el-input v-model="departmentForm.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDepartment } from '@/api/admin'; // 引入添加API

export default {
  data() {
    return {
      departmentForm: {
        name: '',
        description: '',
        status: 1 // 默认状态
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await addDepartment(this.departmentForm);
        this.$message.success('添加成功');
        this.$router.push('/admin/departments');
      } catch (error) {
        this.$message.error('添加失败');
      }
    }
  }
};
</script>