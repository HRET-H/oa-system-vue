<script setup>
import { ref, onMounted } from 'vue'
// 导入动态菜单
import MenuTree from '@/components/menu/MenuTree.vue'
import axios from 'axios'

const MenuData = ref([])

axios.defaults.baseURL = 'http://localhost:9999'

onMounted(() => {
  axios.get('/menu/selectMenuTree?parentId=' + 28).then((res) => {
    MenuData.value = res.data
  })
})
</script>

<template>
  <div>
    <!-- 外层容器。 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列 -->
    <el-container>
      <!-- 侧边栏容器 -->
      <el-aside style="border-right: 2px solid #d4d7de">
        <MenuTree :data="MenuData" style="height: 100vh; padding-top: 5%" />
      </el-aside>
      <!-- 主要区域容器 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style></style>
