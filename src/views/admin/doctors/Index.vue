<template>
  <div>
    <el-table
        :data="doctorList"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="数据加载中..."
    >
      <el-table-column prop="name" label="医生姓名"></el-table-column>
      <el-table-column prop="title" label="职称"></el-table-column>
      <el-table-column prop="department.name" label="所属科室"></el-table-column>
      <el-table-column prop="specialty" label="专业领域"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" @click="handleAdd" style="margin-top: 20px;">添加医生</el-button>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        :pager-count="5"
        style="margin-top: 20px;"
    >
      <template #default>
        <span class="custom-pagination">
          共 {{ pagination.total }} 条记录 / 第 {{ pagination.current }} 页
        </span>
      </template>
    </el-pagination>
  </div>
</template>

<script>
import { fetchDoctors, deleteDoctor } from '@/api/admin';
import { ElPagination } from 'element-plus';

ElPagination.props.locale = {
  type: Object,
  default: () => ({
    items_per_page: '条/页',
    jump_to: '跳至',
    page: '页',
    prev_page: '上一页',
    next_page: '下一页',
    prev_5: '向前5页',
    next_5: '向后5页',
    prev_3: '向前3页',
    next_3: '向后3页',
  })
};

export default {
  data() {
    return {
      loading: false,
      doctorList: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const res = await fetchDoctors(
            this.pagination.current - 1,
            this.pagination.size
        );

        const data = res.content || res.data?.content || res.data || res;
        if (Array.isArray(data)) {
          this.doctorList = data;
          this.pagination.total = res.totalElements || res.data?.totalElements || data.length;
        } else {
          throw new Error("API返回数据格式异常");
        }
      } catch (error) {
        console.error('加载失败:', error);
        this.$message.error('加载数据失败: ' + error.message);
      } finally {
        this.loading = false;
      }
    },
    handleSizeChange(val) {
      this.pagination.size = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.loadData();
    },
    handleAdd() {
      this.$router.push('/admin/doctors/add');
    },
    handleEdit(row) {
      this.$router.push(`/admin/doctors/edit/${row.id}`);
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确认删除该医生吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await deleteDoctor(row.id);
        this.$message.success('删除成功');
        this.loadData();
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
.custom-pagination {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}
</style>