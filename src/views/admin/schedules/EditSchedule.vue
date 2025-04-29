<template>
  <div class="form-container">
    <el-form :model="scheduleForm" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="科室" prop="departmentId">
        <el-select
            v-model="scheduleForm.departmentId"
            placeholder="请选择科室"
            @change="handleDepartmentChange"
            clearable
        >
          <el-option
              v-for="dept in departmentList"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="医生" prop="doctorId">
        <el-select
            v-model="scheduleForm.doctorId"
            placeholder="请先选择科室"
            :disabled="!scheduleForm.departmentId"
            clearable
        >
          <el-option
              v-for="doctor in filteredDoctors"
              :key="doctor.id"
              :label="`${doctor.name} (${doctor.title || '无职称'})`"
              :value="doctor.id"
          />
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
        id: null,
        doctorId: '',
        departmentId: '',
        workDate: '',
        timeSlot: 'AM',
        totalNumber: 20
      },
      rules: {
        doctorId: [{ required: true, message: '请选择医生', trigger: 'change' }],
        departmentId: [{ required: true, message: '请选择科室', trigger: 'change' }],
        workDate: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      doctorList: [],
      filteredDoctors: [],
      departmentList: [],
      loading: false
    };
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.loading = true;
        const scheduleId = this.$route.params.id;

        const [scheduleRes, doctorsRes, deptsRes] = await Promise.all([
          fetchScheduleById(scheduleId),
          fetchDoctors(),
          fetchDepartments()
        ]);

        // 处理API返回数据
        this.scheduleForm = {
          ...scheduleRes.data,
          departmentId: scheduleRes.data.department?.id || scheduleRes.data.departmentId
        };

        this.doctorList = Array.isArray(doctorsRes.data)
            ? doctorsRes.data
            : Array.isArray(doctorsRes)
                ? doctorsRes
                : [];

        this.departmentList = Array.isArray(deptsRes.data)
            ? deptsRes.data
            : Array.isArray(deptsRes)
                ? deptsRes
                : [];

        // 初始化时根据当前科室筛选医生
        if (this.scheduleForm.departmentId) {
          this.handleDepartmentChange(this.scheduleForm.departmentId);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        this.$message.error('加载数据失败');
        this.$router.push('/admin/schedules');
      } finally {
        this.loading = false;
      }
    },

    handleDepartmentChange(departmentId) {
      this.scheduleForm.doctorId = ''; // 清空已选医生
      if (departmentId) {
        this.filteredDoctors = this.doctorList.filter(
            doctor => doctor.department?.id === departmentId ||
                doctor.departmentId === departmentId
        );
      } else {
        this.filteredDoctors = [];
      }
    },

    async handleSubmit() {
      try {
        await updateSchedule(this.scheduleForm);
        this.$message.success('更新排班成功');
        this.$router.push('/admin/schedules');
      } catch (error) {
        console.error('更新排班失败:', error);
        this.$message.error(`更新失败: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>
