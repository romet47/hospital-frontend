<template>
  <div>
    <el-table :data="statsList" style="width: 100%">
      <el-table-column prop="department.name" label="科室"></el-table-column>
      <el-table-column prop="totalAppointments" label="总预约数"></el-table-column>
      <el-table-column prop="completedAppointments" label="已完成预约数"></el-table-column>
      <el-table-column prop="cancelledAppointments" label="已取消预约数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchDepartmentStats } from '@/api/admin';

export default {
  data() {
    return {
      statsList: []
    };
  },
  created() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      const res = await fetchDepartmentStats();
      this.statsList = res.data;
    }
  }
};
</script>
