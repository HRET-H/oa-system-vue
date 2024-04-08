<script setup>
import axios from 'axios'

// 设置父组件传过来的值
defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
// 父组件调用子组件的方法
const emits = defineEmits(['close', 'init'])

// 初始化数据
const roleData = ref({
  roleName: '', // 角色名称
  roleRemark: '', // 角色备注
  menus: [] // 选中的权限菜单
})

// 表单验证规则
const rules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
}

// 初始化菜单数据
const menus = ref([])

// 树形菜单配置
const treeProps = {
  value: 'menuId', // 唯一标识
  label: 'menuName', // 显示名称
  children: 'children' // 子集
}

// 根据此值来判断是添加还是修改  addOrUpdate = true 添加  addOrUpdate = false 修改
const addOrUpdate = ref(true)

// 修改角色改变方法
const getUpdateRole = (data) => {
  // 将addOrUpdate的值改为false
  addOrUpdate.value = false

  // 将值赋给roleData
  roleData.value = data

  // 判断是否为超级管理员
  if (data.roleId !== 1) {
    // 创建一个数组用于存储权限菜单
    const menuList = []
    // 回显权限菜单
    data.menus.forEach((item) => {
      // 将菜单id添加到menuList中
      menuList.push(item.menuId)
    })
    // 将权限菜单赋值给roleData.value.menus
    roleData.value.menus = menuList
  }
}

// 初始化角色权限
const getRoleMenus = () => {
  axios.get('/menu/selectMenuTree?parentId=0').then((res) => {
    menus.value = res.data
  })
}

// 树形菜单选中方法
const check_change = (data, checked) => {
  if (checked) {
    // 判断是否选中的是父级菜单
    if (data.children && data.children.length > 0) {
      // 遍历子集
      data.children.forEach((item) => {
        // 判断子集是否在选中的权限中
        if (roleData.value.menus.indexOf(item.menuId) == -1) {
          // 如果不存在就添加
          roleData.value.menus.push(item.menuId)
          check_change(item, true)
        }
      })
    } else {
      // 不是父级菜单
      if (roleData.value.menus.indexOf(data.menuId) == -1) {
        roleData.value.menus.push(data.menuId)
      }
    }
  } else {
    // 判断是否选中的是父级菜单
    if (data.children && data.children.length > 0) {
      // 遍历子集
      data.children.forEach((item) => {
        // 判断子集是否在选中的权限中
        if (roleData.value.menus.indexOf(item.menuId) != -1) {
          // 如果存在就删除
          roleData.value.menus.splice(
            roleData.value.menus.indexOf(item.menuId),
            1
          )
          check_change(item, false)
        }
      })
    } else {
      // 不是父级菜单
      if (roleData.value.menus.indexOf(data.menuId) != -1) {
        roleData.value.menus.splice(
          roleData.value.menus.indexOf(data.menuId),
          1
        )
      }
    }
  }
}

// 处理角色权限菜单数据
const getRoleMenuInfo = () => {
  // 将menus处理成各个对象并将值赋予到对象中的menuId属性中
  roleData.value.menus = roleData.value.menus.map((item) => {
    return {
      menuId: item
    }
  })
}

// 调用表单ruleFormRef
const ruleFormRef = ref(null)

// 添加角色
const addRole = () => {
  // 判断是否满足表单验证
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 调用角色权限处理方法
      getRoleMenuInfo()
      // 发送请求
      axios
        .post('/role/addRole', roleData.value)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('添加成功')
            // 执行关闭方法
            closeDialog()
          } else {
            ElMessage.error('添加失败')
          }
        })
        .catch(() => {
          ElMessage.error('添加失败')
        })
    }
  })
}

const updateRole = () => {
  // 判断是否满足表单验证
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 调用角色权限处理方法
      getRoleMenuInfo()
      axios
        .post('/role/updateRole', roleData.value)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('修改成功')
            // 执行关闭方法
            closeDialog()
          } else {
            ElMessage.error('修改失败')
          }
        })
        .catch(() => {
          ElMessage.error('修改失败')
        })
    }
  })
}

const closeDialog = () => {
  // 重置表单
  roleData.value = {
    roleName: '',
    roleRemark: '',
    menus: []
  }
  // 关闭弹窗
  emits('close')
  // 刷新菜单
  emits('init')
}

const init = () => {
  // 初始化角色权限
  getRoleMenus()
}

// 利用expose暴露方法
defineExpose({
  getUpdateRole,
  init
})
</script>

<template>
  <el-dialog
    title="角色信息"
    :model-value="dialogVisible"
    width="50%"
    @close="closeDialog"
    :destroy-on-close="true"
  >
    <el-form
      ref="ruleFormRef"
      :model="roleData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="名称" prop="roleName">
        <el-input
          style="width: 500px"
          placeholder="请输入角色名称"
          v-model="roleData.roleName"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          style="width: 500px"
          type="textarea"
          placeholder="请输入角色描述"
          v-model="roleData.roleRemark"
        ></el-input>
      </el-form-item>
      <el-row style="height: 500px">
        <el-col :span="2">
          <el-form-item label="权限设置" />
        </el-col>
        <el-col :span="22">
          <el-tree-v2
            :data="menus"
            :props="treeProps"
            :default-checked-keys="roleData.menus"
            show-checkbox
            :height="500"
            @check-change="check_change"
            style="background-color: rgb(244, 244, 244)"
            v-if="roleData != null && roleData.roleId !== 1"
          />
          <h1 style="text-align: center; line-height: 500px; color: red" v-else>
            超级管理员，无需设置权限
          </h1>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          style="color: #fff"
          type="primary"
          @click="addOrUpdate ? addRole() : updateRole()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
