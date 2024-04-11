<template>
  <div>
    <el-row>
      <span style="font-size: 30px">招聘漏斗</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
        style="color: #b1b4be; margin-top: 12px"
        >更新时间:2035年6月19日 12:35:59</span
      >
    </el-row>
    <el-row>
      <div ref="main" style="width: 100%; height: 500px; margin: auto"></div>
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
    xAxis: {
      axisLine: { show: false },
      // 其他x轴配置项
      type: 'category'
    },
    yAxis: {
      axisLine: { show: false }
      // 其他y轴配置项
    },
    grid: {
      borderWidth: 0 // 设置横线和竖线的宽度为0
    },
    legend: {
      data: ['推荐简历数', '初试人数', '复试人数', '录取人数', '到岗人数']
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br/>{b} : {c}'
    },
    splitLine: {
      show: false
    },
    toolbox: {
      feature: {
        DataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: '招聘详情',
        type: 'funnel',
        left: '20%',
        width: '60%',
        height: '60%',
        minSize: '5%',
        label: {
          position: 'inside',
          formatter: '{c}人',
          color: '#232b40'
        },
        itemStyle: {
          opacity: 0.5,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            position: 'inside',
            formatter: '{b}人数: {c}'
          }
        },
        data: [
          { value: 2469, name: '推荐简历数', itemStyle: { color: '#347fb9' } },
          { value: 689, name: '初试人数', itemStyle: { color: '#994da5' } },
          { value: 127, name: '复试人数', itemStyle: { color: '#ff8000' } },
          { value: 25, name: '录取人数', itemStyle: { color: '#9a9a9a' } },
          { value: 23, name: '到岗人数', itemStyle: { color: '#ff5d5d' } }
        ],
        z: 100
      }
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
