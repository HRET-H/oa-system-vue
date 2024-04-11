<template>
  <div>
    <el-row>
      <span style="font-size: 30px">招聘数据</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
        style="color: #b1b4be; margin-top: 12px"
        >更新时间:2035年6月19日 12:35:59</span
      >
    </el-row>
    <el-row>
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计1.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计2.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计3.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计4.png" alt="" />
      </span>
      <br />
      <br />
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计5.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计6.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计7.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计8.png" alt="" />
      </span>
      &nbsp;&nbsp;
      <span>
        <img src="/public/image/RecruitmentOverview/招聘统计9.png" alt="" />
      </span>
    </el-row>
    <el-row>
      <div ref="main" style="width: 100%; height: 400px"></div>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
onMounted(() => {
  init()
})
function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value)
  // 指定图表的配置项和数据
  var option = {
    legend: {
      padding: [50, 70, 0, 0]
    },
    tooltip: {},
    width: '80%',
    dataset: {
      source: [
        ['06/16', 23, 16],
        ['06/17', 83.1, 73.4],
        ['06/18', 86.4, 65.2],
        ['06/19', 22.4, 13.9],
        ['06/20', 62.4, 33.9],
        ['06/21', 32.4, 23.9],
        ['06/22', 42.4, 63.9],
        ['06/23', 71.4, 13.9],
        ['06/24', 22.4, 63.9],
        ['06/25', 71.4, 33.9]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: 'bar', barWidth: 20, color: '#1890ff' },
      { type: 'bar', barWidth: 20, color: '#fb7b13' }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style scoped>
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
