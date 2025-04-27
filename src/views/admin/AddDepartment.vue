<template>
  <div>
    <el-form :model="departmentForm" label-width="80px">
      <el-form-item label="科室名称">
        <el-input v-model="departmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科室描述">
        <el-input v-model="departmentForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDepartment } from '@/api/admin';

export default {
  data() {
    return {
      departmentForm: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      await addDepartment(this.departmentForm);
      this.$router.push('/admin/department');
    }
  }
};
</script>
