// 引入pinia的useUserStore方法
import { useUserStore } from '@/stores'
//引入路由
import { useRouter } from 'vue-router'

// 获取user实例
const userStore = useUserStore()
// 获取路由实例
const route = useRouter()

// 判断用户是否登录
export function getUserLogin() {
  // 获取pinia中的用户信息
  let user = userStore.user
  // 判断是否登录
  if (!user) {
    // 未登录
    ElMessage.error('请先登录🥷')
    route.push('/login')
  }
}
