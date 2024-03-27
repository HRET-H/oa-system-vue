<script setup>
import { ref } from 'vue'
// 导入element-plus图标
import { Search, ArrowRight } from '@element-plus/icons-vue'
// 导入面包屑组件和message组件
import { ElBreadcrumbItem, ElMessage } from 'element-plus'
import axios from 'axios'
import { baseURL } from '@/utils/request'

// 使用defineOptions 设置组件的选项 例如 name  props  data  methods  components  setup  emits
defineOptions({
  name: 'customTransfer'
})

const props = defineProps({
  // 单选/复选  默认单选
  type: {
    type: Boolean,
    default: true
  },
  // 弹窗数据回调函数
  seccessData: Function
})

axios.defaults.baseURL = baseURL

// 弹窗信息
const dialogVisible = ref(false)

// 面包屑列表
const items = ref([{ title: '部门信息' }])
// 部门列表
const data = ref([])
// 用户列表
const userData = ref([])
// 部门名称
const deptName = ref('')
// 单选框的状态
const radioActive = ref({})
// 复选框的状态
const selectActive = ref({})
// 单选/复选框列表
const selectUser = ref([])
// 搜索框值
let searchInput = ref('')

// 打开部门信息弹框
const openDialog = () => {
  // 判断selectUser是否有值
  if (selectUser.value.length === 0) {
    // 初始化值
    getDeptValue()
  }

  // 打开弹窗
  dialogVisible.value = true
}

// 获取所有部门及员工信息
const getDeptValue = () => {
  axios.get('/dept/findDeptUser').then((res) => {
    data.value = res.data
    // 初始化复选框状态
    res.data.forEach((item) => {
      item.userList.forEach((user) => {
        selectActive.value[user.userId] = false
      })
    })
  })
}

// 根据员工姓名模糊查询部门信息
const getByUserNameDeptValue = () => {
  axios
    .get('/dept/findDeptByUserName?userName=' + searchInput.value)
    .then((res) => {
      data.value = res.data
      // 初始化复选框状态
      res.data.forEach((item) => {
        item.userList.forEach((user) => {
          selectActive.value[user.userId] = false
        })
      })
    })
}

const updateDataAndUserData = (title, userList) => {
  if (userList !== null && userList.length > 0) {
    // 将用户信息列表添加到userData中
    userData.value = userList
    // 将部门名称添加到deptName中
    deptName.value = title
    // 向item中添加部门名称值
    items.value.push({ title: title })
  }
}

// 重置部门信息
const itemsReset = () => {
  items.value = [{ title: '部门信息' }]
  userData.value = []
}

// 单选框改变
const handleRadioChange = (val, dept_name) => {
  // 清空列表
  selectUser.value = []
  // 添加部门信息
  val.deptName = dept_name
  // 将选中的数据添加到selectUser中
  selectUser.value.push(val)
}

// 复选框改变
const handleCheckedChange = (val, dept_name) => {
  // 用于确定是否勾选过
  let isFound = false
  // 判断是否勾选过如果有则删除数据
  selectUser.value.forEach((item) => {
    if (val.userId === item.userId) {
      // 删除并更新数据
      selectUser.value = selectUser.value.filter(
        (user) => user.userId !== val.userId
      )
      // 更新数据
      isFound = true
      // 终止循环
      return true
    }
  })
  // 判断是否勾选过
  if (!isFound) {
    if (selectUser.value.length >= 5) {
      selectActive.value[val.userId] = false

      // 通过改变勾选状态 让组件渲染刷新
      selectActive.value[val.userId] = !selectActive.value[val.userId]

      ElMessage({
        message: '最多选择5个用户',
        grouping: true,
        type: 'error'
      })
    } else {
      val.deptName = dept_name
      selectUser.value.push(val)
    }
  }
}
// 单选/复选框删除值
const delSelect = (val) => {
  // 判断是单选/复选框删除值
  if (props.type) {
    // 将单选框状态重置
    radioActive.value = ''
    // 删除选中的值
    selectUser.value = []
  } else {
    // 将复选框状态重置
    selectActive.value[val.userId] = false
    // 删除selectUser中的值
    selectUser.value = selectUser.value.filter(
      (item) => item.userId !== val.userId
    )
  }
}

// 取消按钮
const handleClose = () => {
  // 关闭弹窗
  dialogVisible.value = false

  if (selectUser.value.length !== 0) {
    // 调用回调函数
    props.seccessData(selectUser.value)
  } else {
    // 面包屑列表
    items.value = [{ title: '部门信息' }]
    // 部门列表
    data.value = []
    // 用户列表
    userData.value = []
    // 部门名称
    deptName.value = ''
    // 单选框的状态
    selectActive.value = {}
    // 复选框的状态
    selectActive.value = {}
    // 单选/复选框列表
    selectUser.value = []
    // 搜索框值
    searchInput.value = ''
  }
}
</script>

<template>
  <div>
    <el-col @click="openDialog">
      <v-btn icon="mdi-plus" v-if="selectUser.length === 0"></v-btn>
      <span
        style="margin-left: 5px; margin-right: 5px"
        v-for="(item, index) in selectUser"
        :key="index"
      >
        <el-avatar
          :src="item.profilePhoto"
          v-if="item.profilePhoto != null && item.profilePhoto != ''"
        />
        <el-avatar
          src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/userAll.png"
          v-else
        />
      </span>
    </el-col>

    <!-- 部门信息选择弹窗 -->
    <el-dialog
      :model-value="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-input
              v-model="searchInput"
              style="width: 240px"
              placeholder="请输入"
              :prefix-icon="Search"
              @change="getByUserNameDeptValue"
            />
          </el-row>
          <el-row style="margin-top: 30px">
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item
                :to="{ path: '' }"
                v-for="(item, index) in items"
                :key="index"
              >
                <span v-if="items.length - 1 != index" @click="itemsReset">
                  {{ item.title }}
                </span>
                <span v-else>
                  {{ item.title }}
                </span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
          <el-row style="height: 20px">
            <v-app>
              <v-container>
                <!-- 部门信息 -->
                <div
                  v-for="(item, index) in data"
                  :key="index"
                  v-show="userData.length == 0"
                >
                  <v-btn
                    variant="text"
                    @click="updateDataAndUserData(item.deptName, item.userList)"
                  >
                    <v-icon icon="mdi-domain" color="blue-darken-2" />
                    {{ item.deptName }}
                    <span
                      v-if="item.userList != null && item.userList.length > 0"
                    >
                      （{{ item.userList.length }}）
                    </span>
                  </v-btn>
                </div>
                <!-- 部门下的用户列表 -->
                <div
                  style="
                    margin-top: 20px;
                    margin-bottom: 30px;
                    position: relative;
                  "
                  v-for="(user, index) in userData"
                  :key="index + 1"
                  v-show="userData.length > 0"
                >
                  <!-- 单选用户信息 -->
                  <el-radio-group
                    v-model="radioActive"
                    @click="handleRadioChange(user, deptName)"
                    v-if="type"
                  >
                    <el-radio :value="user.userId">
                      <el-avatar
                        :src="user.profilePhoto"
                        v-if="
                          user.profilePhoto != null && user.profilePhoto != ''
                        "
                      />
                      <el-avatar
                        src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/userAll.png"
                        v-else
                      />
                      <span style="position: absolute; top: 0px; left: 66px">
                        {{ user.userName }}
                      </span>
                      <span
                        style="
                          position: absolute;
                          top: 20px;
                          left: 66px;
                          font-size: 10px;
                          color: #cdd0d6;
                        "
                      >
                        {{ deptName }}
                      </span>
                    </el-radio>
                  </el-radio-group>
                  <!-- 复选用户信息 -->
                  <el-checkbox
                    v-model="selectActive[user.userId]"
                    @click="handleCheckedChange(user, deptName)"
                    v-else
                  >
                    <el-avatar
                      :src="user.profilePhoto"
                      v-if="
                        user.profilePhoto != null && user.profilePhoto != ''
                      "
                    />
                    <el-avatar
                      src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/userAll.png"
                      v-else
                    />
                    <span style="position: absolute; top: 0px; left: 66px">
                      {{ user.userName }}
                    </span>
                    <span
                      style="
                        position: absolute;
                        top: 20px;
                        left: 66px;
                        font-size: 10px;
                        color: #cdd0d6;
                      "
                    >
                      {{ deptName }}
                    </span>
                  </el-checkbox>
                </div>
              </v-container>
            </v-app>
          </el-row>
        </el-col>
        <el-col
          :span="12"
          style="border-left: 1px solid #ebeef5; padding-left: 20px"
        >
          <el-row> 已选择{{ selectUser.length }}位员工 </el-row>
          <el-row>
            <v-app>
              <v-container>
                <div
                  style="
                    margin-top: 20px;
                    margin-bottom: 30px;
                    position: relative;
                  "
                  v-for="(item, index) in selectUser"
                  :key="index"
                >
                  <div>
                    <el-avatar
                      :src="item.profilePhoto"
                      v-if="
                        item.profilePhoto != null && item.profilePhoto != ''
                      "
                    />
                    <el-avatar
                      src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/userAll.png"
                      v-else
                    />
                    <span style="position: absolute; top: 0px; left: 66px">
                      {{ item.userName }}
                    </span>
                    <span
                      style="
                        position: absolute;
                        top: 20px;
                        left: 66px;
                        font-size: 10px;
                        color: #cdd0d6;
                      "
                    >
                      {{ item.deptName }}
                    </span>
                    <a
                      href="javascript:void(0)"
                      style="color: dimgray"
                      @click="delSelect(item)"
                    >
                      <el-icon
                        style="position: relative; left: 60%; top: -15px"
                      >
                        <Close />
                      </el-icon>
                    </a>
                  </div>
                </div>
              </v-container>
            </v-app>
          </el-row>
        </el-col>
      </el-row>
      <template #footer>
        <div>
          <el-button @click="handleClose">取消</el-button>
          <el-button style="color: #fff" type="primary" @click="handleClose">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
