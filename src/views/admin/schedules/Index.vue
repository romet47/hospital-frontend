<template>
  <div class="schedule-container">
    <el-table :data="scheduleList" style="width: 100%">
      <el-table-column prop="doctor.name" label="医生" width="150"></el-table-column>
      <el-table-column prop="department.name" label="科室" width="150"></el-table-column>
      <el-table-column prop="workDate" label="出诊日期" width="120">
        <template #default="{row}">
          {{ formatDate(row.workDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="timeSlot" label="时间段" width="100"></el-table-column>
      <el-table-column prop="totalNumber" label="总号源数" width="100"></el-table-column>
      <el-table-column prop="availableNumber" label="可用号源数" width="100"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="action-buttons">
      <el-button type="primary" @click="handleAdd">添加排班</el-button>
    </div>
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
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async fetchScheduleList() {
      try {
        const res = await fetchSchedules();
        this.scheduleList = res.data || [];
      } catch (error) {
        console.error('获取排班列表失败:', error);
        this.$message.error('获取排班数据失败');
      }
    },
    handleAdd() {
      this.$router.push('/admin/schedules/add').catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.error('路由跳转失败:', err);
        }
      });
    },
    handleEdit(schedule) {
      this.$router.push(`/admin/schedules/edit/${schedule.id}`);
    },
    async handleDelete(schedule) {
      try {
        await this.$confirm('确定删除该排班吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await deleteSchedule(schedule.id);
        this.$message.success('删除成功');
        this.fetchScheduleList();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    }
  }
};
</script>

<style scoped>
.schedule-container {
  padding: 20px;
}

.action-buttons {
  margin-top: 20px;
  text-align: right;
}

.el-table {
  margin-top: 20px;
}
</style>