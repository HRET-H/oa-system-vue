// 注册全局组件

// 导入需要注册的全局组件
import getPagination from '@/components/pagination/getPagination.vue'

const components = [getPagination]

export default {
  install: (app) => {
    components.forEach((component) => {
      // 在app上进行扩展，app提供 component directive 函数
      // 如果要挂载原型 app.config.globalProperties 方式

      // 利用组件的name属性，将组件注册为全局组件
      app.component(
        // 注册的名字
        component.name,
        // 组件的实现
        {
          /* ... */
          getPagination
        }
      )
    })
  }
}
