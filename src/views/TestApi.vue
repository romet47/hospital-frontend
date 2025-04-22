<script setup>
import { onMounted } from 'vue'
console.log("TestApi组件已加载") // 添加这行

onMounted(async () => {
  console.log("开始请求API...") // 添加这行
  const res = await getDepartments()
  console.log('科室数据:', res)
})
</script>