<script setup>
import { ref, onMounted } from 'vue'
// 导入动态菜单
import MenuTree from '@/components/menu/MenuTree.vue'
import axios from 'axios'

const MenuData = ref([])

axios.defaults.baseURL = 'http://localhost:9999'

onMounted(() => {
  axios.get('/menu/selectMenuTree?parentId=' + 12).then((res) => {
    MenuData.value = res.data
  })
})
</script>

<template>
  <div>
    <el-aside>
      <MenuTree :data="MenuData" />
    </el-aside>
    <router-view />
  </div>
</template>

<style></style>
