<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 使用defineOptions 设置组件的选项 例如 name  props  data  methods  components  setup  emits
defineOptions({
  name: 'getPagination'
})

defineProps({
  pageNum: Number,
  pageSize: Number,
  total: Number,
  handleCurrentChange: Function,
  handleSizeChange: Function
})

const locale = computed(() => zhCn)
</script>

<template>
  <span
    style="top: 20px; position: relative; float: right; margin-bottom: 20px"
  >
    <el-config-provider :locale="locale">
      <el-pagination
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </span>
</template>

<style scoped></style>
