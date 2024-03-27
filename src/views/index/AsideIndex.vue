<script setup>
import { ref, onMounted, onBeforeUpdate } from 'vue'
// 导入动态菜单
import MenuTree from '@/components/menu/MenuTree.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { subMenuStore } from '@/stores/modules/menu'
import { baseURL } from '@/utils/request'

// 获取route
const route = useRoute()

// 获取pinia的store
const store = subMenuStore()

const MenuData = ref([])

axios.defaults.baseURL = baseURL

// 获取菜单数据
function getMenuData(id) {
  // 将菜单数据置为空数组
  MenuData.value = []
  // 获取菜单数据并返回axios请求的Promise
  return axios.get('/menu/selectMenuTree?parentId=' + id).then((res) => {
    // 判断数据是否为空
    if (res.data !== null && res.data.length > 0) {
      MenuData.value = res.data
      return true
    } else {
      return false
    }
  })
}

onMounted(() => {
  // 获取路由传递的参数
  let parentId = route.query.parentId
  if (parentId === undefined || parentId === null) {
    parentId = store.parentId
  }
  // 获取菜单数据并判断是否获取到数据
  getMenuData(parentId).then((res) => {
    // 判断是否获取到数据
    if (res) {
      store.parentId = parentId
    } else {
      getMenuData(store.parentId).then((innerRes) => {
        // 判断是否获取到数据
        if (!innerRes) {
          // 两次都未获取到数据初始化state中的parentId
          store.$reset()
          // 获取菜单
          getMenuData(store.parentId)
        }
      })
    }
  })
})

onBeforeUpdate(() => {
  // 获取路由传递的参数
  let parentId = route.query.parentId
  if (parentId === undefined || parentId === null) {
    parentId = store.parentId
  }
  // 获取菜单数据并判断是否获取到数据
  getMenuData(parentId).then((res) => {
    // 判断是否获取到数据
    if (res) {
      store.parentId = parentId
    } else {
      getMenuData(store.parentId).then((innerRes) => {
        // 判断是否获取到数据
        if (!innerRes) {
          // 两次都未获取到数据初始化state中的parentId
          store.$reset()
          // 获取菜单
          getMenuData(store.parentId)
        }
      })
    }
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

<style scoped></style>
