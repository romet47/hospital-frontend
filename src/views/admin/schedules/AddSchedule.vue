<template>
  <div class="form-container">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="科室" prop="departmentId">
        <el-select
            v-model="form.departmentId"
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
            v-model="form.doctorId"
            placeholder="请先选择科室"
            :disabled="!form.departmentId"
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
        departmentId: '',
        doctorId: '',
        workDate: '',
        timeSlot: 'AM',
        totalNumber: 20,
        availableNumber: 20, // 初始等于总号源数
        status: 1 // 默认状态为启用
      },
      rules: {
        departmentId: [{ required: true, message: '请选择科室', trigger: 'change' }],
        doctorId: [{ required: true, message: '请选择医生', trigger: 'change' }],
        workDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        totalNumber: [{ required: true, message: '请输入总号源数', trigger: 'blur' }]
      },
      doctorList: [],
      filteredDoctors: [],
      departmentList: [],
      loading: false
    };
  },
  async created() {
    await this.fetchOptions();
  },
  methods: {
    async fetchOptions() {
      try {
        this.loading = true;
        const [doctorsRes, deptsRes] = await Promise.all([
          fetchDoctors(),
          fetchDepartments()
        ]);

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

      } catch (error) {
        console.error('获取选项失败:', error);
        this.$message.error('获取选项数据失败');
      } finally {
        this.loading = false;
      }
    },

    handleDepartmentChange(departmentId) {
      this.form.doctorId = '';
      if (departmentId) {
        this.filteredDoctors = this.doctorList.filter(
            doctor => doctor.department?.id === departmentId ||
                doctor.departmentId === departmentId
        );
      } else {
        this.filteredDoctors = [];
      }
    },

    async submitForm() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          try {
            const postData = {
              doctor: { id: this.form.doctorId },
              department: { id: this.form.departmentId },
              workDate: this.form.workDate,
              timeSlot: this.form.timeSlot,
              totalNumber: this.form.totalNumber,
              availableNumber: this.form.totalNumber,
              status: 1
            };

            await addSchedule(postData);
            this.$message.success('添加排班成功');
            this.$router.push('/admin/schedules');
          } catch (error) {
            console.error('添加排班失败:', error);
            let errorMsg = '添加失败';
            if (error.response) {
              errorMsg += `: ${error.response.data || '服务器错误'}`;
            }
            this.$message.error(errorMsg);
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