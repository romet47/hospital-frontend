<template>
  <div>
    <el-form :model="doctorForm" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="doctorForm.name"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="doctorForm.title"></el-input>
      </el-form-item>
      <el-form-item label="所属科室">
        <el-select v-model="doctorForm.departmentId" placeholder="请选择科室">
          <el-option
              v-for="department in departmentList"
              :key="department.id"
              :label="department.name"
              :value="department.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDoctor, fetchDepartments } from '@/api/admin';

export default {
  data() {
    return {
      doctorForm: {
        name: '',
        title: '',
        departmentId: ''
      },
      departmentList: []
    };
  },
  async created() {
    const res = await fetchDepartments();
    this.departmentList = res.data;
  },
  methods: {
    async handleSubmit() {
      await addDoctor(this.doctorForm);
      this.$router.push('/admin/doctors');
    }
  }
};
</script>
