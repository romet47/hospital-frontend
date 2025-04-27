<template>
  <div>
    <el-table :data="departmentList" style="width: 100%">
      <el-table-column prop="name" label="科室名称"></el-table-column>
      <el-table-column prop="description" label="科室描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleAdd">添加科室</el-button>
  </div>
</template>

<script>
import { fetchDepartments, deleteDepartment } from '@/api/admin';

export default {
  data() {
    return {
      departmentList: []
    };
  },
  created() {
    this.fetchDepartmentList();
  },
  methods: {
    async fetchDepartmentList() {
      const res = await fetchDepartments();
      this.departmentList = res.data;
    },
    handleAdd() {
      this.$router.push('/admin/department/add');
    },
    handleEdit(department) {
      this.$router.push(`/admin/department/edit/${department.id}`);
    },
    async handleDelete(department) {
      await deleteDepartment(department.id);
      this.fetchDepartmentList();
    }
  }
};
</script>
