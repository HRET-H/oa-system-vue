import { ElLoading } from 'element-plus'

// 定义 SVG 加载图标，并包含 view-box 属性
const svg = `
  <svg viewBox="-10, -10, 50, 50">
    <path class="path" d="
      M 30 15
      L 28 17
      M 25.61 25.61
      A 15 15, 0, 0, 1, 15 30
      A 15 15, 0, 1, 1, 27.99 7.5
      L 15 15
    " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  </svg>
`

// 打开ElLoading全屏加载层方法
export function openFullScreen() {
  let loading = ElLoading.service({
    lock: true,
    spinner: svg,
    text: '正在奋力加载中...'
  })

  return loading
}

// 关闭ElLoading全屏加载层方法
export function closeFullScreen(option) {
  option.close()
}
