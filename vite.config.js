import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite'
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
//element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'

// 配置vite
export default defineConfig({
  plugins: [
    // 配置vue插件
    vue(),
    //element按需导入
    AutoImport({
      //element
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      //element
      resolvers: [ElementPlusResolver()]
    }),
    // 配置vue-devtools插件
    VueDevTools()
  ],
  // 配置路径
  base: '/',
  // 配置别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 配置启动端口和配置
  server: {
    // 启动端口
    port: 9001,
    // ip地址
    host: true,
    // 是否自动打开浏览器
    open: false,
    // 是否开启https
    https: false
  }
})
