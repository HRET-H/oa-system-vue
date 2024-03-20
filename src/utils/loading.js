import { ElLoading } from 'element-plus'

// 打开全屏加载层方法
export function openFullScreen() {
  let loading = ElLoading.service({
    lock: true,
    text: '正在奋力加载中...'
  })

  return loading
}

// 关闭全屏加载层方法
export function closeFullScreen(option) {
  option.close()
}
