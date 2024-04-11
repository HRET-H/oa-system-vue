import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'

// 获取当前路径
const pathSrc = path.resolve(__dirname, 'src')

// 配置vite
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  plugins: [
    Vue({
      reactivityTransform: true
    }),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      dirs: [path.resolve(pathSrc, 'composables')],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],

      dts: path.resolve(pathSrc, 'typings', 'components.d.ts')
    }),

    // 配置vue-devtools插件
    VueDevTools()
  ],

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
