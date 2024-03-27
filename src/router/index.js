import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/index/HomeView.vue'),
    children: [
      // 跳转到考核页面
      {
        path: 'mova',
        name: 'mova',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'appraisal_plan',
            name: 'appraisal_plan',
            component: () => import('@/views/assess/AssessManage.vue')
          },
          {
            path: 'InitiateAssessmentManager',
            name: 'InitiateAssessmentManager',
            component: () =>
              import('@/views/assess/InitiateAssessmentManager.vue')
          },
          // 考核模板页面
          {
            path: 'appraisal_template',
            name: 'appraisal_template',
            component: () => import('@/views/assess/AssessTemplate.vue')
          },
          {
            path: 'insertAssessTemplate',
            name: 'insertAssessTemplate',
            component: () => import('@/views/assess/InsertAssessTemplate.vue')
          }
        ]
      },
      // 员工假期模块
      {
        path: 'employee_leave',
        name: 'employee_leave',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: '/holiday_type',
            name: 'holiday_type',
            component: () => import('@/views/holiday/HolidayIndex.vue')
          },
          {
            path: '/addHolidayIndex',
            name: 'addHolidayIndex',
            component: () => import('@/views/holiday/addHolidayIndex.vue')
          },
          {
            path: 'leave_record',
            name: 'leave_record',
            component: () => import('@/views/holiday/RecordingIndex.vue')
          },
          // 假期余额
          {
            path: 'leave_balance',
            name: 'leave_balance',
            component: () => import('@/views/holiday/HolidayDalance.vue')
          }
          
        ]
      },
      // 用章模块
      {
        path: 'seal',
        name: 'seal',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: '/seals',
            name: 'seals',
            component: () => import('@/views/seal/SealIndex.vue')
          },
         
          
        ]
      },
      
      {
        path: 'recruit',
        name: 'recruit',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: '/positionManage',
            name: 'positionManage',
            component: () => import('@/views/recruit/positionManage.vue')
          },
          {
            path: 'addPositionManage',
            name: 'addPositionManage',
            component: () => import('@/views/recruit/addPositionManage.vue')
          },
          {
            path: 'setPositionManage',
            name: 'setPositionManage',
            component: () => import('@/views/recruit/setPosition.vue')
          },
          
        ]
      }
    ]
  }
]

// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory     地址栏不带 #
// 2. hash模式：   createWebHashHistory 地址栏带 #
// console.log(import.meta.env.DEV)

// vite 中的环境变量 import.meta.env.BASE_URL  就是 vite.config.js 中的 base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  // if (!useStore.token && to.path !== '/login') return '/login'
  console.log(useStore.token && to.path)
})

export default router
