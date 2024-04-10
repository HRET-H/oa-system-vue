import axios from 'axios'
// 引入User
import { useUserStore } from '@/stores'
//引入路由
import { useRouter } from 'vue-router'

// 获取pinia的store
const userStore = useUserStore()
// 获取route
const route = useRouter()

// 菜单权限判断
export function getAuthorityMenu(path) {
  // 获取pinia中的用户信息
  const user = userStore.user
  // 判断是否为超级管理员
  if (user.role.roleId === 1) {
    // 超级管理员拥有所有权限
    return true
  }
  // 判断path是否为空
  if (path === '' || path === undefined || path == null) {
    // 获取当前路由
    path = route.fullPath.split('?')[0]
  }

  const formData = new FormData()
  formData.append('roleId', user.role.roleId)
  formData.append('path', path)

  // 通过axios发送请求 将角色id和当前路由传递到后台
  return axios
    .post('/role/getAuthorizationRole', formData)
    .then((res) => {
      // 判断是否有权限
      if (res.data.code !== 200) {
        // 无权限
        ElMessage.error('无权限操作')
        // 返回上一页
        route.back()
      }
    })
    .catch(() => {
      ElMessage.error('无权限操作')
      // 返回上一页
      route.back()
    })
}
