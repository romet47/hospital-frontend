<template>
  <div>
    <el-table
        :data="departmentList"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="数据加载中..."
    >
      <el-table-column prop="name" label="科室名称"></el-table-column>
      <el-table-column prop="description" label="科室描述"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          {{ formatStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleAdd">添加科室</el-button>
  </div>
</template>

<script>
import { fetchDepartments, deleteDepartment } from '@/api/admin';

export default {
  data() {
    return {
      departmentList: [],
      loading: false
    };
  },
  created() {
    this.fetchDepartmentList();
  },
  methods: {
    formatStatus(status) {
      const statusMap = {
        1: '正常',
        2: '停用'
        // 添加其他状态码对应的文本
      };
      return statusMap[status] || '未知状态';
    },
    async fetchDepartmentList() {
      this.loading = true;
      try {
        const res = await fetchDepartments();
        // 直接使用响应数据（已经是数组）
        this.departmentList = Array.isArray(res) ? res : [];
      } catch (error) {
        console.error('获取科室失败:', error);
        this.$message.error('获取科室列表失败');
      } finally {
        this.loading = false;
      }
    },
    handleAdd() {
      this.$router.push('/admin/departments/add');
    },
    handleEdit(row) {
      // 添加路由跳转保护
      this.$nextTick(() => {
        this.$router.push({
          path: `/admin/doctors/edit/${row.id}`,
          query: { _t: Date.now() } // 防止路由缓存
        }).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('路由跳转失败:', err);
          }
        });
      });
    },
    async handleDelete(department) {
      try {
        await this.$confirm('确认删除该科室吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await deleteDepartment(department.id);
        this.$message.success('删除成功');
        this.fetchDepartmentList();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    }
  }
};
</script>