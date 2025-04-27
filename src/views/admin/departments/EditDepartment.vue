<template>
  <div v-loading="loading">
    <el-form :model="departmentForm" label-width="120px">
      <el-form-item label="科室名称">
        <el-input v-model="departmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科室描述">
        <el-input v-model="departmentForm.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="departmentForm.status">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="handleSubmit"
            :loading="loading"
        >
          保存
        </el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchDepartmentById, updateDepartment } from '@/api/admin';

export default {
  name: 'EditDepartmentPage',
  data() {
    return {
      loading: false,
      departmentForm: {
        id: null,
        name: '',
        description: '',
        status: 1
      }
    };
  },
  methods: {
    async handleSubmit() {
      console.log('保存方法被调用'); // 调试语句
      try {
        this.loading = true;
        const response = await updateDepartment(
            this.departmentForm.id,
            this.departmentForm
        );
        console.log('API响应:', response);
        this.$message.success('更新成功');
        this.$router.push('/admin/departments');
      } catch (error) {
        console.error('保存错误:', error);
        this.$message.error('更新失败: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },
    async loadData() {
      try {
        this.loading = true;
        const res = await fetchDepartmentById(this.$route.params.id);
        console.log('API返回数据:', res); // 调试
        this.departmentForm = {
          ...(res.data || res),
          id: this.$route.params.id // 确保ID正确
        };
      } catch (error) {
        console.error('加载错误:', error);
        this.$message.error('加载科室数据失败');
        this.$router.push('/admin/departments');
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    console.log('组件创建，路由ID:', this.$route.params.id); // 调试
    this.loadData();
  }
};
</script>