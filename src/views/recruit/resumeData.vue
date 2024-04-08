<template>
  <div>
    <span style="font-size: 30px">数据分析图</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
      style="color: #b1b4be"
      >更新时间:2035年6月19日 12:35:59</span
    >
    <br />
    <br />
    <span
      ref="main"
      style="
        width: 40%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      ref="main2"
      style="
        width: 28%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      ref="main3"
      style="
        width: 29%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span>
    <br />
    <br />
    <span
      ref="main4"
      style="
        width: 40%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      ref="main5"
      style="
        width: 28%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <span
      ref="main6"
      style="
        width: 29%;
        height: 300px;
        border: solid 1px #e9eaee;
        margin: auto;
        display: inline-block;
      "
    ></span>
    <br />
    <br />
    <span style="font-size: 30px">数据分析表</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
      style="color: #b1b4be"
      >更新时间:2035年6月19日 12:35:59</span
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="candidateId" label="简历ID"></el-table-column>
      <el-table-column
        prop="candidateName"
        label="候选人姓名"
      ></el-table-column>
      <el-table-column
        prop="candidateDepartment"
        label="部门"
      ></el-table-column>
      <el-table-column prop="candidateExpect" label="职位"></el-table-column>
      <el-table-column prop="candidateEducation" label="学历"></el-table-column>
      <el-table-column prop="candidateSex" label="性别"></el-table-column>
      <el-table-column
        prop="candidateStatus"
        label="当前状态"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'
import axios from 'axios'
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const main2 = ref()
const main3 = ref()
const main4 = ref()
const main5 = ref()
const main6 = ref()
onMounted(() => {
  init1(), init2(), inti3(), init4(), inti5(), inti6(), getData()
})
function init1() {
  let myChart = echarts.init(main.value)
  var option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      subtext: '各部门入职人数'
    },
    legend: {
      orient: 'vertical', //设置图例的方向
      right: 'right',
      icon: 'circle', // 设置图例为圆点
      top: 'center',
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: '各部门入职人数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: '{a}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 537, name: '销售部' },
          { value: 376, name: '人事部' },
          { value: 183, name: '产品部' },
          { value: 276, name: '技术部' }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
function init2() {
  let myChart = echarts.init(main2.value)
  var option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      subtext: '性别比例'
    },
    legend: {
      // orient: '', //设置图例的方向
      // right: 'button',
      // top: 'center',
      icon: 'circle', // 设置图例为圆点
      bottom: 0,
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 30, name: '男' },
          { value: 30, name: '女' },
          { value: 30, name: '未知' }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
function inti3() {
  let myChart = echarts.init(main3.value)
  var option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      subtext: '学历分布'
    },
    legend: {
      // orient: '', //设置图例的方向
      // right: 'button',
      // top: 'center',
      icon: 'circle', // 设置图例为圆点
      bottom: 0,
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: '学历分布',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'right'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 30, name: '博士', itemStyle: { color: '#5d62e9' } },
          { value: 50, name: '硕士', itemStyle: { color: '#ff565b' } },
          { value: 60, name: '本科', itemStyle: { color: '#15d4a3' } },
          { value: 40, name: '大专', itemStyle: { color: '#ffcd64' } }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
function init4() {
  let myChart = echarts.init(main4.value)
  var option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      subtext: '各部门招聘完成度'
    },
    legend: {
      orient: 'vertical', //设置图例的方向
      right: 'right',
      icon: 'circle', // 设置图例为圆点
      top: 'center',
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: '1',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'right'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 53, name: '销售部' },
          { value: 26, name: '技术部' },
          { value: 15, name: '人事部' },
          { value: 6, name: '产品部' }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
function inti5() {
  let myChart = echarts.init(main5.value)
  var option = {
    tooltip: {
      trigger: 'item'
    },
    title: {
      subtext: '年龄分布'
    },
    legend: {
      // orient: '', //设置图例的方向
      // right: 'button',
      // top: 'center',
      icon: 'circle', // 设置图例为圆点
      bottom: 0,
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        radius: ['60%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            color: '#4c4a4a',
            formatter: '{total|{c}%}' + '\n\r' + '{b}',
            rich: {
              total: {
                fontSize: 35,
                fontFamily: '微软雅黑',
                color: '#454c5c'
              },
              active: {
                fontFamily: '微软雅黑',
                fontSize: 16,
                color: '#6c7a89',
                lineHeight: 30
              }
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 90, name: '35岁以下' },
          { value: 15, name: '35-40岁' },
          { value: 5, name: '40岁以上' }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
function inti6() {
  let myChart = echarts.init(main6.value)
  var option = {
    title: {
      subtext: '招聘完成度' //副标题文本，'\n'指定换行
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // orient: '', //设置图例的方向
      // right: 'button',
      // top: 'center',
      icon: 'circle', // 设置图例为圆点
      bottom: 0,
      itemGap: 30 //设置图例的间距
    },
    series: [
      {
        name: '招聘完成度',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            color: '#4c4a4a',
            formatter: '{total|{c}%} ' + '\n\r' + '{b}',
            rich: {
              total: {
                fontSize: 35,
                fontFamily: '微软雅黑',
                color: '#454c5c'
              },
              active: {
                fontFamily: '微软雅黑',
                fontSize: 16,
                color: '#6c7a89',
                lineHeight: 30
              }
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 89, name: '已入职', itemStyle: { color: '#1890ff' } },
          {
            value: 100 - 89,
            name: '剩余招聘人数',
            itemStyle: { color: '#e9eaee' }
          }
        ]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
let tableData = []
//搜索
// 将页码，及每页显示的条数以参数传递提交给后台
function getData() {
  // 假设这里的axios.post请求参数已正确设置，仅关注函数调用
  axios.post('/recruitCandidate/findAll').then((response) => {
    for (let i = 0; i < response.data.length; i++) {
      tableData.push({
        candidateId: response.data[i].candidateId,
        candidateName: response.data[i].candidateName,
        candidateDepartment: response.data[i].candidateDepartment,
        candidateExpect: response.data[i].candidateExpect,
        candidateEducation: response.data[i].candidateEducation,
        candidateSex: response.data[i].candidateSex,
        candidateStatus: response.data[i].candidateStatus
      })
    }
    console.log(tableData)
  })
}
</script>

<style></style>
