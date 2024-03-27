<template>
  <div>
    <h1>基本信息</h1>
    面试方法:
    <el-select
      v-model="addinterviewData.method"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="线下面试" value="1"></el-option>
      <el-option label="视频面试" value="2"></el-option>
      <el-option label="电话面试" value="3"></el-option> </el-select
    ><br /><br />
    面试联系人:
    <el-select
      v-model="addinterviewData.userId"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    面试轮次:<el-input
      placeholder="请输入内容"
      v-model="addinterviewData.numbers"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    面试时间:
    <el-date-picker
      v-model="addinterviewData.interviewTime"
      type="date"
      placeholder="选择日期"
    >
    </el-date-picker
    ><br /><br />
    面试时长:<el-input
      placeholder="请输入内容"
      v-model="addinterviewData.timeLength"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    会议室:<el-input
      placeholder="请输入内容"
      v-model="addinterviewData.room"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    面试官:
    <el-select
      v-model="addinterviewData.interviewer"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    <h1>通知方式</h1>
    面试官通知:
    <el-checkbox-group
      v-model="addinterviewData.inform"
      @change="changeCheckBox"
    >
      <el-checkbox label="邮件通知"></el-checkbox>
      <el-checkbox label="站内通知"></el-checkbox>
      <el-checkbox label="短息通知"></el-checkbox><br />
    </el-checkbox-group>
    候选人通知
    <el-checkbox-group
      v-model="addinterviewData.inform2"
      @change="changeCheckBox2"
    >
      <el-checkbox label="邮件通知"></el-checkbox>
      <el-checkbox label="短息通知"></el-checkbox><br />
    </el-checkbox-group>

    <br />

    <el-button size="small" type="primary" @click="submitAndRedirect"
      >确认</el-button
    >
    <el-button size="small" type="primary" @click="backinterviewDataMethod"
      >取消</el-button
    >
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      requestParams: {}, // 初始化为空对象，将在mounted钩子函数中填充
      addinterviewData: {
        method: '',
        userId: '', // 根据实际情况初始化
        numbers: '',
        interviewTime: '',
        timeLength: '',
        room: '',
        interviewer: '',
        inform: [],
        inform2: []
      }
    }
  },

  async mounted() {
    // 将查询参数映射回对象
    this.requestParams = Object.fromEntries(
      Object.entries(this.$route.query).map(([key, value]) => [
        decodeURIComponent(key),
        decodeURIComponent(value)
      ])
    )

    // 然后构建请求体
    // const requestBody = {
    //   candidateStatus: 2,
    //   candidateId: this.$route.query.queryObject
    // }
    // console.log(requestBody)
    // this.submitAndRedirect()
    // 使用requestBody发起请求...
  },

  methods: {
    async submitAndRedirect() {
      try {
        const requestBody = {
          candidateStatus: 2,
          candidateId: this.$route.query.queryObject
          // 根据实际需求添加addinterviewData中的其他字段到请求体
        }
        console.log(requestBody)
        const result = await axios.post(
          '/recruitCandidate/updateRecruitCandidateStatus',
          requestBody
        )

        if (result.data.data == null) {
          console.log('更新成功')
        } else {
          console.log('更新失败')
        }

        this.centerDialogVisible = false
        this.$router.push({ path: 'candidate' })
      } catch (error) {
        console.error('提交数据时发生错误：', error)
        // 可以在这里增加更具体的错误提示或处理逻辑
      }
    },
    backinterviewDataMethod() {
      this.$router.push({ path: '/home/recruit/candidate' })
    },
    changeCheckBox(val) {
      console.log(val)
    },
    changeCheckBox2(val) {
      console.log(val)
    }
  }
}
</script>

<style></style>
