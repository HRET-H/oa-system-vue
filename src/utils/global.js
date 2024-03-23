// 注册全局组件

// 导入需要注册的全局组件
import getPagination from '@/components/pagination/getPagination.vue'

const components = [getPagination]

// 添加全局组件
export default {
  // 使用install方法，在app上进行扩展
  install(app) {
    // 遍历注册
    components.forEach((component) => {
      // 注册
      app.component(component.name, component)
    })
  }
}
