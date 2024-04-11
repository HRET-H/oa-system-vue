<script setup>
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es' // 引入lodash的深拷贝功能
import { useRouter } from 'vue-router'

const router = useRouter()
// 创建基础配置对象（这里不再使用ref包裹）
const baseFrameConfigUp = {
  day: 'N',
  day_time: '18:00',
  day_allow: '1',
  most: '60',
  late: '5',
  lake: '30',
  type: '1',
  ad_shifts_id: ''
}

const baseFrameConfigDown = {
  ...baseFrameConfigUp,
  type: '2'
}

// 初始化frameTimeAndRulesUp和frameTimeAndRulesDown
const frameTimeAndRulesUp = cloneDeep(baseFrameConfigUp)
const frameTimeAndRulesDown = cloneDeep(baseFrameConfigDown)

const frameTimeTemplate = {
  id: '1',
  frameTimeAndRulesUp,
  frameTimeAndRulesDown
}

const frameTimeList = ref([frameTimeTemplate])
let idCounter = 2

const addFrameTimeList = () => {
  idCounter++
  // 创建新的frameTimeAndRulesUp和frameTimeAndRulesDown对象的深拷贝
  const newFrameTimeAndRulesUp = cloneDeep(baseFrameConfigUp)
  const newFrameTimeAndRulesDown = cloneDeep(baseFrameConfigDown)

  // 创建新的frameTimeTemplate实例
  const newFrameTimeList = {
    id: String(idCounter),
    frameTimeAndRulesUp: newFrameTimeAndRulesUp,
    frameTimeAndRulesDown: newFrameTimeAndRulesDown
  }

  // 将新对象添加到frameTimeList数组中
  frameTimeList.value.push(newFrameTimeList)
}

const editAdShifts = (query) => {
  // 通过路由参数传递 id 给 ad_shifts.vue
  router.push({
    name: 'attendance_section_xuguangjie',
    query: { id: query }
  })
  alert(query)
}
</script>

<template>
  <page-container title="考勤管理"
    ><div><h1>我是考勤管理</h1></div>
    <el-button type="primary" @click="addFrameTimeList">添加</el-button>
    <div v-for="(item, index) in frameTimeList" :key="index">
      {{ item.id }}
      <el-checkbox
        v-model="item.frameTimeAndRulesDown.day_allow"
        label="下班打卡"
        size="large"
      />
    </div>
    <el-button @Click="editAdShifts(13)">修改班次</el-button>
  </page-container>
</template>
<style></style>
