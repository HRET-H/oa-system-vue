<!-- 使用vue的setup语法糖 -->
<script setup>
import { baseURL } from '@/utils/request'
// 导入axios
import axios from 'axios'
// 引入路由
import { useRouter } from 'vue-router'
// 导入弹窗js
import { openFullScreen, closeFullScreen } from '@/utils/loading'
// 导入动态菜单组件
import MenuTree from '@/components/menu/MenuTree.vue'
// 引入pinia的useUserStore方法
import { useUserStore } from '@/stores'

// 获取router实例
const router = useRouter()

// 设置axios的baseURL
axios.defaults.baseURL = baseURL

// 获取useUserStore实例
const userStore = useUserStore()

// 定义一个ref变量，用来存储菜单数据
const MenuData = ref([])

// 创建审批目录
const examine = ref({})
// 菜单合集
const examines = ref([])

// 定义一个ref变量，控制水印的内容
const watermark_content = ref('')

// 获取审批目录
const getExamine = () => {
  // 获取审批数据
  axios.get('/menu/selectMenuTree?parentId=' + 77).then((res) => {
    examine.value = res.data[0]
  })
}

// 使用onMounted钩子函数，获取菜单数据
onMounted(() => {
  // 判断obj是否为空对象
  const isEmptyObject =
    Object.keys(userStore.user).length === 0 &&
    userStore.user.constructor === Object

  if (isEmptyObject) {
    ElMessage.error({
      message: '您还没登录，先去登录一下叭🎈',
      grouping: true,
      type: 'error'
    })
    router.push('/')
  } else {
    // 获取当前时间 格式为 yyyy-MM-dd
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()

    // 设置水印内容
    watermark_content.value =
      userStore.user.userName + ' ' + year + '-' + month + '-' + day

    // 开启加载动画
    const loading = openFullScreen()

    axios
      .get('/menu/selectMenuTree?parentId=' + 0)
      .then((res) => {
        MenuData.value = res.data

        getExamine()

        closeFullScreen(loading)
      })
      .catch(() => {
        ElMessage.error('网络不佳请稍后重试!!!')
      })
  }
})

// 获取菜单合集点击按钮的ref引用
const clickOutSideRef = ref()
// 获取Popover弹出框的ref引用
const popoverRef = ref()

// 显示菜单合集方法
const onClickOutside = () => {
  // 判断菜单集合是否有数据
  if (examines.value.length === 0) {
    // 将菜单数据添加到菜单集合中  利用...展开运算符
    examines.value.push(...MenuData.value)
  }
  // 显示菜单合集
  unref(popoverRef).popperRef?.delayHide?.()
}

// 退出登录
const logout = () => {
  // 消息弹出框询问
  ElMessageBox.confirm('确定要退出登录？', '操作确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '期待与您下次相遇😉'
      })

      // 删除pinia中的user值
      userStore.user = {}
      // 跳转至登录页
      router.push('/')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '欢迎回来🫨'
      })
    })
}
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
                  <v-icon
                    color="#fff"
                    icon="mdi-dots-grid"
                    ref="clickOutSideRef"
                    @click="onClickOutside"
                  />
                </a>
                <el-popover
                  ref="popoverRef"
                  :virtual-ref="clickOutSideRef"
                  trigger="click"
                  virtual-triggering
                  :width="examines.length * 82"
                >
                  <template v-for="(item, index) in examines" :key="index">
                    <div v-if="index === 1">
                      <div>{{ examine.menuName }}</div>
                      <el-row>
                        <el-col
                          v-for="(item, index) in examine.children"
                          :key="index"
                          span=""
                          style="margin: 10px 24px"
                        >
                          <router-link
                            style="text-decoration: none; color: #303133"
                            :to="item.menuPath + '?parentId=' + item.menuId"
                          >
                            <div>
                              <v-icon
                                :icon="item.menuIcon.split('|')[0]"
                                :color="item.menuIcon.split('|')[1]"
                                size="x-large"
                                v-if="
                                  item.menuIcon != null &&
                                  item.menuIcon !== '' &&
                                  item.menuIcon !== '#'
                                "
                              />
                              <v-icon icon="mdi-atom" color="#F56C6C" v-else />
                            </div>
                            <div>{{ item.menuName }}</div>
                          </router-link>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="item.children[0].menuType === 'C'">
                      <div>{{ item.menuName }}</div>
                      <el-row>
                        <el-col
                          v-for="children in item.children"
                          :key="children"
                          span=""
                          style="margin: 10px"
                        >
                          <router-link
                            style="text-decoration: none; color: #303133"
                            :to="
                              children.menuPath + '?parentId=' + children.menuId
                            "
                          >
                            <div>
                              <v-icon
                                :icon="children.menuIcon.split('|')[0]"
                                :color="children.menuIcon.split('|')[1]"
                                size="x-large"
                                v-if="
                                  children.menuIcon != null &&
                                  children.menuIcon !== '' &&
                                  children.menuIcon !== '#'
                                "
                                :class="
                                  children.menuName.length === 3
                                    ? 'el-popover_three_icon'
                                    : 'el-popover_four_icon'
                                "
                              />
                              <v-icon icon="mdi-atom" color="#F56C6C" v-else />
                            </div>
                            <div>{{ children.menuName }}</div>
                          </router-link>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </el-popover>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div style="float: right; margin-right: 10%">
              <a
                href="javascript:void(0)"
                style="position: relative; top: 25px"
                @click="router.push('/home/system?parentId=72')"
              >
                <el-icon color="#fff" size="20">
                  <Setting />
                </el-icon>
              </a>
              &nbsp;
              <el-dropdown style="position: relative; left: 10px; top: 5px">
                <el-avatar
                  :size="35"
                  :src="userStore.user.profilePhoto"
                  style="position: relative; top: 12px"
                  v-if="
                    userStore.user.profilePhoto != null &&
                    userStore.user.profilePhoto !== ''
                  "
                />
                <el-avatar
                  :size="35"
                  src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/userAll.png"
                  style="position: relative; top: 12px"
                  v-else
                />
                &nbsp;
                <span style="color: #fff">{{ userStore.user.userName }}</span>
                <el-icon style="color: #fff; margin-left: 5px">
                  <arrow-down />
                </el-icon>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <v-icon icon="mdi-account-box-edit-outline" />
                      资料设置
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <v-icon icon="mdi-key-variant" />
                      修改密码
                    </el-dropdown-item>
                    <el-dropdown-item @click="logout">
                      <v-icon icon="mdi-application-export" />
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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

/* 菜单集合名字为3位时的图标样式 */
.el-popover_three_icon {
  position: relative;
  left: 8px;
}
/* 菜单合集名字为4位时的图标样式 */
.el-popover_four_icon {
  position: relative;
  left: 15px;
}
</style>
