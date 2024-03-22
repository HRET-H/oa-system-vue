import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入全局组件
import ui from '@/utils/global.js'

const app = createApp(App)
// 注册路由
app.use(router)
// 引入pinia
app.use(pinia)
// 注册全局组件
app.use(ui)
// 为 Element Plus 图标库注册全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载
app.mount('#app')
