<template>
  <div>
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
            clearable
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
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addDoctor, fetchDepartments } from '@/api/admin';

export default {
  data() {
    return {
      doctorForm: {
        name: '',
        title: '',
        specialty: '',
        departmentId: '' // 修改为直接使用departmentId
      },
      departmentList: [],
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      const res = await fetchDepartments();

      // 处理科室数据 - 兼容多种返回格式
      this.departmentList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res)
              ? res
              : [];

      console.log('科室数据加载成功:', this.departmentList);
    } catch (error) {
      console.error('获取科室失败:', error);
      this.$message.error('加载科室数据失败');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.doctorForm.name) {
          this.$message.warning('请输入医生姓名');
          return;
        }

        if (!this.doctorForm.departmentId) {
          this.$message.warning('请选择所属科室');
          return;
        }

        const postData = {
          name: this.doctorForm.name,
          title: this.doctorForm.title,
          specialty: this.doctorForm.specialty,
          department: {
            id: this.doctorForm.departmentId
          }
        };

        await addDoctor(postData);
        this.$message.success('添加医生成功');
        this.$router.push('/admin/doctors');
      } catch (error) {
        console.error('添加失败:', error);
        this.$message.error(`添加失败: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>