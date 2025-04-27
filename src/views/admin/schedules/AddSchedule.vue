<template>
  <div>
    <el-table :data="scheduleList" style="width: 100%">
      <el-table-column prop="doctor.name" label="医生"></el-table-column>
      <el-table-column prop="department.name" label="科室"></el-table-column>
      <el-table-column prop="workDate" label="出诊日期"></el-table-column>
      <el-table-column prop="timeSlot" label="时间段"></el-table-column>
      <el-table-column prop="totalNumber" label="总号源数"></el-table-column>
      <el-table-column prop="availableNumber" label="可用号源数"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleAdd">添加排班</el-button>
  </div>
</template>

<script>
import { fetchSchedules, deleteSchedule } from '@/api/admin';

export default {
  data() {
    return {
      scheduleList: []
    };
  },
  created() {
    this.fetchScheduleList();
  },
  methods: {
    async fetchScheduleList() {
      const res = await fetchSchedules();
      this.scheduleList = res.data;
    },
    handleAdd() {
      this.$router.push('/admin/schedules/add');
    },
    handleEdit(schedule) {
      this.$router.push(`/admin/schedules/edit/${schedule.id}`);
    },
    async handleDelete(schedule) {
      await deleteSchedule(schedule.id);
      this.fetchScheduleList();
    }
  }
};
</script>
