<!-- 使用vue的setup语法糖 -->
<script setup>
// 导入动态菜单数据
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
// 导入axios
import axios from 'axios'
// 导入弹窗js
import { openFullScreen, closeFullScreen } from '@/utils/loading'
// 导入动态菜单组件
import MenuTree from '@/components/menu/MenuTree.vue'

// 设置axios的baseURL
axios.defaults.baseURL = baseURL

// 定义一个ref变量，用来存储数据
let NavDrawer = ref(false)

// 定义一个ref变量，用来存储数据
let MenuData = ref([])

// 使用onMounted钩子函数，获取菜单数据
onMounted(() => {
  // 开启加载动画
  const loading = openFullScreen()

  axios
    .get('/menu/selectMenuTree?parentId=' + 0)
    .then((res) => {
      MenuData.value = res.data

      closeFullScreen(loading)
    })
    .catch(() => {
      ElMessage.error('网络不佳请稍后重试!!!')
    })
})
</script>

<template>
  <!-- 外层容器。 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列 -->
  <el-container
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <!-- 顶栏容器 -->
    <el-header style="background-color: rgb(35, 43, 64); height: 30%">
      <span>
        <el-image
          style="width: 30px; height: 40px; position: relative; top: 15px"
          src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/oa-Logo.png"
          fit="fill"
        />
        &nbsp;
        <h4 style="width: 15%; color: #fff; display: inline-block">
          OA数字化办公系统
        </h4>
      </span>
      <MenuTree
        :data="MenuData"
        mode="horizontal"
        style="width: 60%; display: inline-block"
      />
      <el-icon
        color="#fff"
        @click="NavDrawer = true"
        style="position: relative; right: 33%"
      >
        <Fold />
      </el-icon>
      <el-drawer v-model="NavDrawer" :with-header="false">
        <span>Hi there!</span>
      </el-drawer>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<style></style>
