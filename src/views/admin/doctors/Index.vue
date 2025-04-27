<template>
  <div>
    <el-table :data="doctorList" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="title" label="职称"></el-table-column>
      <el-table-column prop="department.name" label="所属科室"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleAdd">添加医生</el-button>
  </div>
</template>

<script>
import { fetchDoctors, deleteDoctor } from '@/api/admin';

export default {
  data() {
    return {
      doctorList: []
    };
  },
  created() {
    this.fetchDoctorList();
  },
  methods: {
    async fetchDoctorList() {
      const res = await fetchDoctors();
      this.doctorList = res.data;
    },
    handleAdd() {
      this.$router.push('/admin/doctors/add');
    },
    handleEdit(doctor) {
      this.$router.push(`/admin/doctors/edit/${doctor.id}`);
    },
    async handleDelete(doctor) {
      await deleteDoctor(doctor.id);
      this.fetchDoctorList();
    }
  }
};
</script>
