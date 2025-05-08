<template>
  <div class="schedule-container">
    <el-card class="schedule-card">
      <template #header>
        <div class="card-header">本周排班</div>
      </template>
      <el-table :data="schedules" style="width: 100%">
        <el-table-column prop="workDate" label="日期" width="120" />
        <el-table-column prop="day" label="星期" width="120" />
        <el-table-column prop="timeSlot" label="时间段" />
        <el-table-column prop="department.name" label="科室" />
        <el-table-column prop="totalNumber" label="号源数量" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editSchedule(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="add-schedule-card">
      <template #header>
        <div class="card-header">添加新排班</div>
      </template>
      <el-form ref="formRef" :model="scheduleForm" label-width="120px">
        <el-form-item label="日期">
          <el-date-picker v-model="scheduleForm.workDate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="时间段">
          <el-select v-model="scheduleForm.timeSlot" placeholder="请选择时间段">
            <el-option label="上午" value="AM" />
            <el-option label="下午" value="PM" />
          </el-select>
        </el-form-item>
        <el-form-item label="科室">
          <el-select v-model="scheduleForm.departmentId" placeholder="请选择科室" style="width: 100%">
            <el-option
                v-for="dept in departments"
                :key="dept.id"
                :label="dept.name"
                :value="dept.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="号源数量">
          <el-input-number v-model="scheduleForm.totalNumber" :min="1" :max="100" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存排班</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addSchedule } from '@/api/doctor'
import { getDepartments } from '@/api/admin'

export default {
  data() {
    return {
      schedules: [],
      departments: [],
      scheduleForm: {
        workDate: '',
        timeSlot: '',
        departmentId: '',
        totalNumber: 20
      }
    }
  },
  async created() {
    this.fetchSchedules()
    this.fetchDepartments()
  },
  methods: {
    async fetchSchedules() {
      try {
        const res = await import('@/api/doctor').then(m => m.getDoctorSchedules())
        this.schedules = res.data
      } catch (error) {
        console.error('获取排班失败:', error)
      }
    },
    async fetchDepartments() {
      try {
        const res = await getDepartments()
        this.departments = res.data
      } catch (error) {
        console.error('获取科室失败:', error)
      }
    },
    async submitForm() {
      try {
        const payload = {
          doctor: { id: this.$store.state.user.id }, // 假设用户ID存储在Vuex中
          department: { id: this.scheduleForm.departmentId },
          workDate: this.scheduleForm.workDate,
          timeSlot: this.scheduleForm.timeSlot,
          totalNumber: this.scheduleForm.totalNumber,
          availableNumber: this.scheduleForm.totalNumber,
          status: 1
        }

        await addSchedule(payload)
        this.$message.success('排班已添加')
        this.fetchSchedules()
      } catch (error) {
        this.$message.error('添加排班失败')
      }
    },
    editSchedule(row) {
      // 修改排班逻辑
    }
  }
}
</script>

<style scoped>
.schedule-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.card-header {
  font-weight: bold;
}
.schedule-card {
  margin-bottom: 20px;
}
</style>
