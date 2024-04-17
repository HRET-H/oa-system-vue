import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { getAuthorityMenu } from '@/utils/getAuthorityMenu.js'

// router路由
const routes = [
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/index/Login.vue')
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/index/HomeView.vue'),
    children: [
      // 系统管理
      {
        path: 'system',
        name: '系统管理',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          // 角色管理
          {
            path: 'role',
            name: '角色管理',
            component: () => import('@/views/system/role/RoleManager.vue')
          }
        ]
      },
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
          },
          {
            path: 'appraisal_index',
            name: 'appraisal_index',
            component: () => import('@/views/assess/AssessIndex.vue')
          },
          {
            path: 'InsertAssessIndex',
            name: 'InsertAssessIndex',
            component: () => import('@/views/assess/InsertAssessIndex.vue')
          },
          {
            path: 'performance_file',
            name: 'performance_file',
            component: () => import('@/views/assess/PerformanceFile.vue')
          },
          {
            path: 'InsertPerformanceFile',
            name: 'InsertPerformanceFile',
            component: () => import('@/views/assess/InsertPerformanceFile.vue')
          },
          {
            path: 'score_setting',
            name: 'score_setting',
            component: () => import('@/views/assess/AssessScore.vue')
          },
          {
            path: 'lv_setting',
            name: 'lv_setting',
            component: () => import('@/views/assess/AssessLv.vue')
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
            path: 'holiday_type',
            name: 'holiday_type',
            component: () => import('@/views/holiday/HolidayIndex.vue')
          },
          {
            path: 'addHolidayIndex',
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
      // 档案模块
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'archives_documentation',
            name: 'archives_documentation',
            component: () => import('@/views/documentation/Documentation.vue')
          },
          {
            path: 'AddDocumentation',
            name: 'AddDocumentation',
            component: () =>
              import('@/views/documentation/AddDocumentation.vue')
          },
          {
            path: 'archives_borrowing',
            name: 'archives_borrowing',
            component: () => import('@/views/documentation/Borrowing.vue')
          },
          {
            path: 'archives_renew',
            name: 'archives_renew',
            component: () => import('@/views/documentation/renew.vue')
          },
          {
            path: 'archives_returns',
            name: 'archives_returns',
            component: () => import('@/views/documentation/returns.vue')
          }

          // {
          //   path: 'archives_whole',
          //   name: 'archives_whole',
          //   component: () => import('@/views/documentation/whole.vue')
          // },
          // {
          //   path: 'archives_files',
          //   name: 'archives_files',
          //   component: () => import('@/views/documentation/files.vue')
          // },
          // {
          //   path: 'archives_locker',
          //   name: 'archives_locker',
          //   component: () => import('@/views/documentation/locker.vue')
          // },
        ]
      },
      // 全局设置
      {
        path: 'conference_room/setting',
        name: 'conference_room/setting',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'archives_whole',
            name: 'archives_whole',
            component: () => import('@/views/documentation/whole.vue')
          },
          {
            path: 'archives_files',
            name: 'archives_files',
            component: () => import('@/views/documentation/files.vue')
          },
          {
            path: 'archives_locker',
            name: 'archives_locker',
            component: () => import('@/views/documentation/locker.vue')
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
            path: '/home/seal/seals',
            name: 'seals',
            component: () => import('@/views/seal/ManagementBySeal/index.vue')
          },
          {
            path: 'sealAdd',
            name: 'sealAdd',
            component: () => import('@/views/seal/ManagementBySeal/add.vue')
          },
          {
            path: 'sealXiang',
            name: 'sealXiang',
            component: () => import('@/views/seal/ManagementBySeal/xiang.vue')
          },
          {
            path: '/home/seal/sealReturn',
            name: 'sealReturn',
            component: () => import('@/views/seal/sealReturn/index.vue')
          },
          {
            path: 'sealReturnAdd',
            name: 'sealReturnAdd',
            component: () => import('@/views/seal/sealReturn/add.vue')
          },
          {
            path: 'sealReturnXiang',
            name: 'sealReturnXiang',
            component: () => import('@/views/seal/sealReturn/xiang.vue')
          },
          {
            path: '/home/seal/sealLibrary',
            name: 'sealLibrary',
            component: () => import('@/views/seal/sealVault/index.vue')
          },
          {
            path: 'sealLibraryAdd',
            name: 'sealLibraryAdd',
            component: () => import('@/views/seal/sealVault/add.vue')
          },
          {
            path: 'sealLibraryUpdate',
            name: 'sealLibraryUpdate',
            component: () => import('@/views/seal/sealVault/update.vue')
          }
        ]
      },
      // 职位管理
      {
        path: 'recruit',
        name: '职位管理',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'post',
            name: 'post',
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
          {
            path: 'candidate',
            name: 'candidate',
            component: () => import('@/views/recruit/canDidate.vue')
          },
          {
            path: 'interview',
            name: 'interview',
            component: () => import('@/views/recruit/InterView.vue')
          },
          {
            path: 'launchoffer',
            name: 'launchoffer',
            component: () => import('@/views/recruit/launchOffer.vue')
          },
          {
            path: 'notarizeentry',
            name: 'notarizeentry',
            component: () => import('@/views/recruit/notarizeEntry.vue')
          },
          {
            path: 'addCanDidate',
            name: 'addCanDidate',
            component: () => import('@/views/recruit/addCanDidate.vue')
          },
          {
            path: 'talent_pool',
            name: 'talent_pool',
            component: () => import('@/views/recruit/talentPool.vue')
          },
          {
            path: 'recruit_setting',
            name: 'recruit_setting',
            component: () => import('@/views/recruit/recruitSetting.vue')
          },
          {
            path: 'statistical',
            name: 'statistical',
            children: [
              {
                path: 'recruit_overview',
                name: 'recruit_overview',
                component: () =>
                  import('@/views/recruit/recruitmentOverview.vue')
              },
              {
                path: 'recruit_funnel',
                name: 'recruit_funnel',
                component: () => import('@/views/recruit/recruitFunnel.vue')
              },
              {
                path: 'resume_data',
                name: 'resume_data',
                component: () => import('@/views/recruit/resumeData.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'conference_room',
        name: 'conference_room',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'myReservation',
            name: 'myReservation',
            component: () => import('@/views/conference/MeetingBooking.vue')
          },
          {
            path: 'MeetingBookingdetails',
            name: 'MeetingBookingdetails',
            component: () =>
              import('@/views/conference/MeetingBookingdetails.vue')
          }
        ]
      },
      //考勤模块
      {
        path: 'clocking_in',
        name: 'clocking_in',
        component: () => import('@/views/index/AsideIndex.vue'),
        children: [
          {
            path: 'attendance_section',
            name: 'attendance_section',
            component: () => import('@/views/attendance/attendance_section.vue')
          },
          {
            path: 'reissue_card_rule',
            name: 'patch',
            component: () => import('@/views/attendance/patch/patchManager.vue')
          },
          {
            path: 'attendance_section_xuguangjie',
            name: 'attendance_section_xuguangjie',
            component: () => import('@/views/attendance/shifts/ad_shifts.vue')
          }
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

// 权限访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
router.beforeEach(async (to, from) => {
  if (to.path !== '/') {
    // 如果没有值, 且访问的是非登录页，拦截到登录，其他情况正常放行
    const useStore = useUserStore()
    // 判断useStore.user是否为空对象
    const isEmptyObject =
      Object.keys(useStore.user).length === 0 &&
      useStore.user.constructor === Object

    if (!isEmptyObject) {
      // 获取权限
      const getAuthority =
        to.path !== '/home' &&
        to.path !== '/home/system' &&
        to.path !== '/home/system/operation_log' &&
        to.path !== '/home/system/message_notification' &&
        to.path !== '/home/system/update_password'

      if (getAuthority) {
        // 判断用户是否有权限
        const result = await getAuthorityMenu(useStore, to, from, null)
        // 利用双重否定运算符 任何非空非零的值转换为 true，包括非零数字、非空对象、非空数组、非空字符串等；反之：!! 运算后将返回 false
        return !!result
      }
    } else {
      ElMessage.error({
        message: '您还没登录，先去登录一下叭🎈',
        grouping: true,
        type: 'error'
      })
      // 重定向至登录页
      return { name: 'Login' }
    }
  }
})

export default router
