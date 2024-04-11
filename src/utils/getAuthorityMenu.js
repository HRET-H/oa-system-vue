import axios from 'axios'
import { baseURL } from '@/utils/request'

// 菜单权限判断
export function getAuthorityMenu(userStore, to, from, path) {
  // 获取pinia中的用户信息
  const user = userStore.user
  // 判断是否为超级管理员 注：超级管理员拥有所有权限
  if (user.role.roleId !== 1) {
    // 判断path是否为空
    if (path === '' || path === undefined || path == null) {
      // 获取当前路由
      path = to.fullPath.split('?')[0]
    }

    const formData = new FormData()
    formData.append('roleId', user.role.roleId)
    formData.append('path', path)

    // 通过axios发送请求 将角色id和当前路由传递到后台
    return axios
      .post(baseURL + '/role/getAuthorizationRole', formData)
      .then((res) => {
        // 判断是否有权限
        if (res.data.code !== 200) {
          // 无权限
          ElMessage.error({
            message: '您没有权限访问该页面🎈',
            grouping: true,
            type: 'error'
          })
          return false
        } else {
          return true
        }
      })
      .catch(() => {
        ElMessage.error({
          message: '您没有权限访问该页面🎈',
          grouping: true,
          type: 'error'
        })
        return false
      })
  } else {
    return true
  }
}
