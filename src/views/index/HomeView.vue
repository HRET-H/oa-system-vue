<!-- 使用vue的setup语法糖 -->
<script setup>
import { baseURL } from '@/utils/request'
// 导入axios
import axios from 'axios'
// 导入弹窗js
import { openFullScreen, closeFullScreen } from '@/utils/loading'
// 导入动态菜单组件
import MenuTree from '@/components/menu/MenuTree.vue'
import router from '@/router'

// 设置axios的baseURL
axios.defaults.baseURL = baseURL

// 定义一个ref变量，用来存储菜单数据
const MenuData = ref([])

// 定义一个ref变量，控制水印的内容
const watermark_content = ref('')

// 使用onMounted钩子函数，获取菜单数据
onMounted(() => {
  // 获取当前时间 格式为 yyyy-MM-dd
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  // 设置水印内容
  watermark_content.value = 'HRET ' + year + '-' + month + '-' + day

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
  <el-watermark :content="watermark_content">
    <!-- 外层容器。 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列 -->
    <el-container
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <!-- 顶栏容器 -->
      <el-header style="background-color: rgb(35, 43, 64); height: 68px">
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="6">
                <span style="margin-left: 30px">
                  <el-image
                    style="
                      width: 30px;
                      height: 40px;
                      position: relative;
                      top: 15px;
                    "
                    src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/oa-Logo.png"
                    fit="fill"
                  />
                  &nbsp;
                  <h4 style="color: #fff; display: inline-block">
                    OA数字化办公系统
                  </h4>
                </span>
              </el-col>
              <el-col :span="16">
                <MenuTree
                  :data="MenuData"
                  mode="horizontal"
                  style="width: 50%; position: relative; top: 5px"
                />
              </el-col>
              <el-col
                :span="2"
                style="position: relative; left: -33%; top: 20px"
              >
                <a href="javascript:void(0)">
                  <v-icon color="#fff" icon="mdi-dots-grid" />
                </a>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <a
              href="javascript:void(0)"
              style="position: relative; top: 25px"
              @click="router.push('/home/system?parentId=72')"
            >
              <el-icon color="#fff" size="20">
                <Setting />
              </el-icon>
            </a>
          </el-col>
        </el-row>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-watermark>
</template>

<style>
*::-webkit-scrollbar {
  display: none;
}
</style>
