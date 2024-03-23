import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
// 导入模块
export * from './modules/user'
export * from './modules/menu'
// export * from './modules/counter'

// import { useUserStore } from './modules/user'
// export { useUserStore }
// import { useCountStore } from './modules/counter'
// export { useCountStore }
