<template>
  <div>
    <span style="font-size: 30px">招聘漏斗</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
      style="color: #b1b4be"
      >更新时间:2035年6月19日 12:35:59</span
    >
    <br />
    <br />
    <div ref="main" style="width: 800px; height: 500px; margin: auto"></div>
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
      data: ['推荐简历数', '初试人数', '复试人数', '录取人数', '到岗人数']
    },
    tooltip: {
      trigger: 'item',
      formtter: '{a}<br/>{b} : {c}'
    },
    toolbox: {
      feature: {
        DataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        splitLine: {
          show: false
        },
        name: 'Actual',
        type: 'funnel',
        left: '10%',
        width: '80%',
        height: '70%',
        minSize: '5%',
        label: {
          position: 'inside',
          formatter: '{c}%',
          color: '#fff'
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
          { value: 2469, name: '推荐简历数' },
          { value: 689, name: '初试人数' },
          { value: 127, name: '复试人数' },
          { value: 25, name: '录取人数' },
          { value: 23, name: '到岗人数' }
        ],
        // Ensure outer shape will not be over inner shape when hover.
        z: 100
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>

<style></style>
