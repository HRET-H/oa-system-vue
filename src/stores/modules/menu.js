import { defineStore } from 'pinia'

export const subMenuStore = defineStore('submenu', {
  state() {
    return {
      parentId: 0
    }
  },
  persist: {
    enabled: true // 开启数据缓存 +++++++
  }
})
