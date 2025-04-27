<template>
  <div>
    <el-form :model="scheduleForm" label-width="80px">
      <el-form-item label="医生">
        <el-select v-model="scheduleForm.doctorId" placeholder="请选择医生">
          <el-option
              v-for="doctor in doctorList"
              :key="doctor.id"
              :label="doctor.name"
              :value="doctor.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="scheduleForm.departmentId" placeholder="请选择科室">
          <el-option
              v-for="department in departmentList"
              :key="department.id"
              :label="department.name"
              :value="department.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出诊日期">
        <el-date-picker v-model="scheduleForm.workDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="时间段">
        <el-select v-model="scheduleForm.timeSlot" placeholder="请选择时间段">
          <el-option label="上午" value="上午"></el-option>
          <el-option label="下午" value="下午"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总号源数">
        <el-input-number v-model="scheduleForm.totalNumber" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchScheduleById, updateSchedule, fetchDoctors, fetchDepartments } from '@/api/admin';

export default {
  data() {
    return {
      scheduleForm: {
        doctorId: '',
        departmentId: '',
        workDate: '',
        timeSlot: '',
        totalNumber: 1
      },
      doctorList: [],
      departmentList: []
    };
  },
  async created() {
    const scheduleId = this.$route.params.id;
    const res = await fetchScheduleById(scheduleId);
    this.scheduleForm = res.data;

    const doctorsRes = await fetchDoctors();
    this.doctorList = doctorsRes.data;

    const departmentsRes = await fetchDepartments();
    this.departmentList = departmentsRes.data;
  },
  methods: {
    async handleSubmit() {
      await updateSchedule(this.scheduleForm);
      this.$router.push('/admin/schedules');
    }
  }
};
</script>
