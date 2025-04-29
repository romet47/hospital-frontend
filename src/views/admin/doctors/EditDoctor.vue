<template>
  <div v-if="initialized">
    <el-form :model="doctorForm" label-width="120px">
      <el-form-item label="姓名" required>
        <el-input v-model="doctorForm.name" placeholder="请输入医生姓名"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input v-model="doctorForm.title" placeholder="请输入职称"></el-input>
      </el-form-item>
      <el-form-item label="专业领域">
        <el-input v-model="doctorForm.specialty" placeholder="请输入专业领域"></el-input>
      </el-form-item>
      <el-form-item label="所属科室" required>
        <el-select
            v-model="doctorForm.departmentId"
            placeholder="请选择科室"
            style="width: 100%"
        >
          <el-option
              v-for="department in departmentList"
              :key="department.id"
              :label="department.name"
              :value="department.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-empty v-else description="加载中..." />
</template>

<script>
import { fetchDoctorById, updateDoctor, fetchDepartments } from '@/api/admin';

export default {
  data() {
    return {
      initialized: false,
      doctorForm: {
        id: null,
        name: '',
        title: '',
        specialty: '',
        departmentId: ''  // 修改为直接使用departmentId而不是嵌套对象
      },
      departmentList: []
    };
  },
  async created() {
    try {
      const doctorId = this.$route.params.id;
      if (!doctorId) {
        throw new Error('无效的医生ID');
      }

      const [doctorRes, departmentsRes] = await Promise.all([
        fetchDoctorById(doctorId),
        fetchDepartments()
      ]);

      console.log('医生数据:', doctorRes);
      console.log('科室数据:', departmentsRes);

      // 处理医生数据 - 根据你的Postman响应结构调整
      const doctorData = doctorRes.data || doctorRes;
      this.doctorForm = {
        id: doctorData.id,
        name: doctorData.name,
        title: doctorData.title,
        specialty: doctorData.specialty,
        departmentId: doctorData.department?.id || doctorData.departmentId
      };

      // 处理科室数据 - 确保是数组格式
      this.departmentList = Array.isArray(departmentsRes.data)
          ? departmentsRes.data
          : Array.isArray(departmentsRes)
              ? departmentsRes
              : [];

      this.initialized = true;
    } catch (error) {
      console.error('初始化失败:', error);
      this.$message.error(`加载失败: ${error.message}`);
      this.$router.replace('/admin/doctors');
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.doctorForm.departmentId) {
        this.$message.warning('请选择所属科室');
        return;
      }

      try {
        // 根据你的API文档调整提交数据结构
        const updateData = {
          id: this.doctorForm.id,
          name: this.doctorForm.name,
          title: this.doctorForm.title,
          specialty: this.doctorForm.specialty,
          department: {
            id: this.doctorForm.departmentId
          }
        };

        await updateDoctor(updateData);
        this.$message.success('医生信息更新成功');
        this.$router.push('/admin/doctors');
      } catch (error) {
        console.error('更新失败:', error);
        this.$message.error(`更新失败: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>

<style scoped>
.custom-pagination {
  margin-right: 15px;
  color: #666;
}
</style>