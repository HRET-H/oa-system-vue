<script setup>
import axios from 'axios'
import RoleDialog from './RoleDialog.vue'

// 初始化表单数据
const form = ref({
  pageNum: 1,
  pageSize: 10,
  roleName: ''
})
const total = ref(0)
const tableData = ref([])
const dialogVisible = ref(false)

// 获取弹窗组件
const roleDialogRef = ref(null)

// 获取角色信息
const getTableData = () => {
  axios.post('/role/findByRoles', form.value).then((res) => {
    tableData.value = res.data.list
    total.value = res.data.total
  })
}

// 当分页条数改变
const handleSizeChange = (val) => {
  form.value.pageSize = val
  getTableData()
}

// 当前页改变
const handleCurrentChange = (val) => {
  form.value.pageNum = val
  getTableData()
}

// 添加/修改角色
const openRoleDialog = (data) => {
  // 判断是否传递值
  if (data) {
    // 调用弹窗组件方法
    roleDialogRef.value.getUpdateRole(data)
  }

  // 初始化
  roleDialogRef.value.init()

  // 开启弹窗
  dialogVisible.value = true
}

// 删除角色
const deleteRole = (roleId) => {
  ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const formData = new FormData()
    formData.append('roleIds', roleId)
    // 删除角色
    axios
      .post('/role/deleteRole', formData)
      .then((res) => {
        if (res.data.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新页面
          getTableData()
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败!'
          })
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
  })
}

onMounted(() => {
  // 获取菜单数据
  getTableData()
})
</script>

<template>
  <el-row>
    <RoleDialog
      ref="roleDialogRef"
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
      @init="getTableData"
    />
    <el-button type="primary" @click="openRoleDialog()">新建角色</el-button>
  </el-row>
  <el-row>
    <el-form style="position: relative; top: 10px" :inline="true" :model="form">
      <el-form-item label="角色名称">
        <el-input
          v-model="form.roleName"
          placeholder="请输入角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row>
    <el-table
      border
      :data="tableData"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="roleId" label="角色编号" width="100" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleRemark" label="角色描述" />
      <el-table-column label="员工数">
        <template #default="scope">
          {{ scope.row.users.length }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <a
            href="javascript:void(0);"
            style="color: #409eff; text-decoration: none"
            @click="openRoleDialog(scope.row)"
            >修改</a
          >
          &nbsp;
          <a
            href="javascript:void(0);"
            style="color: #409eff; text-decoration: none"
            @click="deleteRole(scope.row.roleId)"
            >删除</a
          >
        </template>
      </el-table-column>
    </el-table>

    <getPagination
      :pageNum="pagenum"
      :pageSize="pagesize"
      :total="total"
      :handleCurrentChange="handleCurrentChange"
      :handleSizeChange="handleSizeChange"
    />
  </el-row>
</template>

<style scoped>
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
