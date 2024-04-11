import { defineStore } from 'pinia'

// 用户模块
export const useUserStore = defineStore(
  'oa-user',
  () => {
    const user = ref({})
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      user,
      setUser
    }
  },
  {
    persist: true
  }
)
