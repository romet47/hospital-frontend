<template>
  <div class="templates-container">
    <el-card class="templates-card">
      <template #header>
        <div class="card-header">常用诊断模板</div>
      </template>
      <el-table :data="templates" style="width: 100%">
        <el-table-column prop="name" label="模板名称" />
        <el-table-column prop="condition" label="适用病症" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" @click="useTemplate(scope.row)">使用</el-button>
            <el-button size="small" type="warning" @click="editTemplate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="add-template-card">
      <template #header>
        <div class="card-header">添加新模板</div>
      </template>
      <el-form ref="formRef" :model="templateForm" label-width="120px">
        <el-form-item label="模板名称">
          <el-input v-model="templateForm.name" placeholder="例如：高血压标准方案" />
        </el-form-item>
        <el-form-item label="适用病症">
          <el-input v-model="templateForm.condition" placeholder="例如：原发性高血压" />
        </el-form-item>
        <el-form-item label="诊断内容">
          <el-input v-model="templateForm.diagnosis" type="textarea" :rows="4" placeholder="输入标准诊断内容..." />
        </el-form-item>
        <el-form-item label="治疗方案">
          <el-input v-model="templateForm.treatment" type="textarea" :rows="4" placeholder="输入标准治疗方案..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitTemplate">保存模板</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templates: [
        {
          name: '高血压标准方案',
          condition: '原发性高血压'
        },
        {
          name: '冠心病标准方案',
          condition: '冠状动脉粥样硬化'
        }
      ],
      templateForm: {
        name: '',
        condition: '',
        diagnosis: '',
        treatment: ''
      }
    };
  },
  methods: {
    useTemplate(row) {
      // 使用模板逻辑
    },
    editTemplate(row) {
      // 编辑模板逻辑
    },
    submitTemplate() {
      // 提交模板逻辑
    }
  }
};
</script>

<style scoped>
.templates-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card-header {
  font-weight: bold;
}
</style>
