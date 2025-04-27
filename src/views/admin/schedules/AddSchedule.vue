<template>
  <div class="form-container">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="医生" prop="doctorId">
        <el-select v-model="form.doctorId" placeholder="请选择医生">
          <el-option
              v-for="doctor in doctorList"
              :key="doctor.id"
              :label="doctor.name"
              :value="doctor.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="科室" prop="departmentId">
        <el-select v-model="form.departmentId" placeholder="请选择科室">
          <el-option
              v-for="dept in departmentList"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="出诊日期" prop="workDate">
        <el-date-picker
            v-model="form.workDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="时间段" prop="timeSlot">
        <el-select v-model="form.timeSlot" placeholder="请选择时间段">
          <el-option label="上午" value="AM"/>
          <el-option label="下午" value="PM"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总号源数" prop="totalNumber">
        <el-input-number v-model="form.totalNumber" :min="1" :max="100"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSchedule, fetchDoctors, fetchDepartments } from '@/api/admin';

export default {
  data() {
    return {
      form: {
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
      departmentList: []
    };
  },
  async created() {
    await this.fetchOptions();
  },
  methods: {
    async fetchOptions() {
      try {
        const [doctorsRes, deptsRes] = await Promise.all([
          fetchDoctors(),
          fetchDepartments()
        ]);
        this.doctorList = doctorsRes.data || [];
        this.departmentList = deptsRes.data || [];
      } catch (error) {
        console.error('获取选项失败:', error);
        this.$message.error('获取选项数据失败');
      }
    },
    submitForm() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          try {
            await addSchedule(this.form);
            this.$message.success('添加排班成功');
            this.$router.push('/admin/schedules');
          } catch (error) {
            console.error('添加排班失败:', error);
            this.$message.error(`添加失败: ${error.message || '未知错误'}`);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 22px;
}
</style>