<!-- 使用vue的setup语法糖 -->
<script setup>
// 导入动态菜单数据
import { ref, onMounted } from 'vue'
// 导入axios
import axios from 'axios'
// 导入动态菜单组件
import MenuTree from '@/components/menu/MenuTree.vue'

// 设置axios的baseURL
axios.defaults.baseURL = 'http://localhost:9999'

// 定义一个ref变量，用来存储数据
let MenuData = ref([])

// 使用onMounted钩子函数，获取菜单数据
onMounted(() => {
  axios.get('/menu/selectMenuTree?parentId=' + 0).then((res) => {
    MenuData.value = res.data
  })
})
</script>

<template>
  <div id="oa-home">
    <el-header>
      <el-col> </el-col>
      <el-col>
        <MenuTree :data="MenuData" mode="horizontal" />
      </el-col>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<style></style>
