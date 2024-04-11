<script setup>
import { provide, ref, onMounted, watch } from 'vue'
import { cloneDeep } from 'lodash-es' // 引入lodash的深拷贝功能

import request from '@/utils/request'
import { CloseBold, Select } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref('') // 使用ref包裹id参数

onMounted(() => {
  id.value = route.query.id || ''
  console.log('id:', id.value)
})

watch(id, (newVal) => {
  console.log('watchId')
  if (newVal !== '') {
    request
      .post('/adShifts/findAdShiftsByID?adShiftsId=' + id.value)
      .then((res) => {
        console.log(res)
        shiftsData.value = res.data
        elsticRulesList.value = res.data.adShiftsElasticList
        frameTimeList.value = res.data.adShiftsFrameTimeList
      })
  }
})

const shiftsData = ref({
  adShiftsId: '',
  workerId: '',
  // 允许晚走晚到 by 弹性设置 :
  shiftsElasticAllowable: false,
  // 晚到超过时间:
  shiftsElasticOvertime: '30',
  // 允许晚到超时:
  shiftsElasticOvertimeAllowable: false,
  shiftsName: '',
  adShiftsFrameTimeList: [],
  adShiftsElasticList: []
})

const workerIdArray = ref([])

// 定义并暴露给子组件的方法
const successData = (selectUser) => {
  console.log(selectUser)
  workerIdArray.value = selectUser
  let deptIds = workerIdArray.value.map((worker) => worker.deptId).join(',')
  console.log(deptIds)
  shiftsData.value.workerId = deptIds
}

// 初始化 elsticRulesList or frameTimeList 为一个空数组和一个计数器用于生成 id
let idCounter = 1 // 从 1 开始
let idCounterElastic = 1 // 从 1 开始

// 添加上下班时间和规则 ( ad_shifts_frame_time_and_rules )

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

// 父子组件通信
provide('frameData', {
  frameTimeList
})

// 弹性设置 -> 允许晚到晚走

const elasticRulesTemplate = {
  id: '1',
  go: '4',
  late: '6'
}
const elsticRulesList = ref([])

const addGoLate = () => {
  // 创建一个新的规则对象，并设置 id 为当前计数器的值
  const newElasticRule = {
    id: String(idCounterElastic),
    go: elasticRulesTemplate.go,
    late: elasticRulesTemplate.late
  }

  // 更新计数器
  idCounterElastic++

  // 将新对象添加到 elsticRulesList 数组中
  elsticRulesList.value.push(newElasticRule)
}

// 新增班次方法
const addAdShifts = () => {
  shiftsData.value.adShiftsElasticList = elsticRulesList.value
  shiftsData.value.adShiftsFrameTimeList = frameTimeList.value
  if (shiftsData.value.adShiftsId === '') {
    console.log('新增操作')
    request.post('/adShifts/addAdShiftsMqPro', shiftsData.value).then((res) => {
      if (res.status === 200) {
        ElMessage.success('新增成功')
      }
    })
  } else {
    console.log('修改操作')
    request.post('/adShifts/updateAdShifts', shiftsData.value).then((res) => {
      if (res.status === 200) {
        ElMessage.success('修改成功')
      }
    })
  }
}
</script>
<template>
  <page-container title="班次管理">
    <el-form :model="shiftsData" ref="shiftsRef" label-width="100px">
      <el-form-item label="班次名称" required>
        <el-input
          style="width: 240px"
          v-model="shiftsData.shiftsName"
          placeholder="请输入班次名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="班次负责人" required
        ><CustomTransfer :type="true" :successData="successData" />
      </el-form-item>

      <el-form-item label="上下班时间" required>
        <el-button @click="addFrameTimeList" icon="Plus">添加</el-button>
      </el-form-item>
      <el-form-item style="margin-bottom: 5%">
        <shifts-time></shifts-time>
      </el-form-item>
    </el-form>
  </page-container>
  <page-container title="弹性设置">
    <el-checkbox
      v-model="shiftsData.shiftsElasticAllowable"
      label="允许晚到晚走"
      size="large"
    />

    <el-card
      v-for="(item, index) in elsticRulesList"
      :key="index"
      style="width: 700px"
      shadow="hover"
    >
      <p>晚到规则{{ item.id }}</p>
      <span>第一天下班后晚走</span>
      <el-input-number
        v-model="item.go"
        class="mx-4"
        :min="1"
        :max="60"
        controls-position="right"
        size="small"
      />
      <span>小时,第二天上班可以晚到</span>
      <el-input-number
        v-model="item.late"
        class="mx-4"
        :min="1"
        :max="60"
        controls-position="right"
        size="small"
      />
      <span>小时</span>
    </el-card>
    <br />
    <el-button @click="addGoLate" icon="Plus" type="primary" text
      >新增晚到晚走</el-button
    >
    <div>
      <el-checkbox
        v-model="shiftsData.shiftsElasticOvertimeAllowable"
        label="晚到超过"
        size="large"
      />
      <el-input-number
        v-model="shiftsData.shiftsElasticOvertime"
        class="mx-4"
        :min="1"
        :max="60"
        controls-position="right"
        size="small"
      />
      <span>分钟为迟到</span>
    </div>
    <div
      style="float: right; margin-top: 5%; margin-bottom: 2%; margin-right: 10%"
    >
      <el-button :icon="CloseBold">取消</el-button>
      <el-button
        :icon="Select"
        type="primary"
        style="color: aliceblue"
        @click="addAdShifts"
        >提交</el-button
      >
    </div>
  </page-container>
</template>

<style></style>
