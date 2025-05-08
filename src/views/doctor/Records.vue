<template>
  <div class="records-container">
    <el-card class="diagnosis-card">
      <template #header>
        <div class="card-header">新建诊断记录</div>
      </template>
      <el-form ref="formRef" :model="recordForm" label-width="120px">
        <el-form-item label="患者姓名">
          <el-input v-model="recordForm.patientName" />
        </el-form-item>
        <el-form-item label="诊断结果">
          <el-select v-model="recordForm.diagnosis" placeholder="请选择诊断结果" style="width: 100%">
            <el-option label="高血压" value="hypertension" />
            <el-option label="冠心病" value="coronaryHeartDisease" />
            <el-option label="心律失常" value="arrhythmia" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细诊断">
          <el-input v-model="recordForm.detail" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="治疗建议">
          <el-input v-model="recordForm.suggestion" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRecord">保存诊断记录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="history-card">
      <template #header>
        <div class="card-header">历史诊断记录</div>
      </template>
      <el-table :data="historyRecords" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="patientName" label="患者姓名" width="120" />
        <el-table-column prop="diagnosis" label="诊断结果" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" type="primary" @click="viewDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordForm: {
        patientName: '',
        diagnosis: '',
        detail: '',
        suggestion: ''
      },
      historyRecords: [
        {
          date: '2023-06-12',
          patientName: '李四',
          diagnosis: '冠心病'
        },
        {
          date: '2023-06-05',
          patientName: '王五',
          diagnosis: '心律失常'
        }
      ]
    };
  },
  methods: {
    submitRecord() {
      // 提交诊断记录逻辑
    },
    viewDetail(row) {
      // 查看详情逻辑
    }
  }
};
</script>

<style scoped>
.records-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card-header {
  font-weight: bold;
}
</style>
