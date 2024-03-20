<template>
  <div>
    <h1>招聘信息</h1>
    计划启动日期
    <el-date-picker
      v-model="interviewerData.plannedDate"
      type="date"
      placeholder="选择日期"
    ></el-date-picker
    ><br /><br />
    最晚到岗日期
    <el-date-picker
      v-model="interviewerData.plannedEndDate"
      type="date"
      placeholder="选择日期"
    ></el-date-picker
    ><br /><br />
    招聘负责人
    <el-select
      v-model="interviewerData.userId"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    用人经理
    <el-select
      v-model="interviewerData.userId2"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    简历筛选人
    <el-select
      v-model="interviewerData.userId3"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    <h1>面试轮次</h1>
    <div
      v-for="(itme, index) in interviewerData.interviewerNumber"
      :key="index"
    >
      <span>第 {{ index + 1 }}轮面试官</span>
      <el-select v-model="itme.userId" placeholder="全部" style="width: 250px">
        <el-option label="admin" value="1"></el-option>
        <el-option label="admin2" value="2"></el-option>
      </el-select>
      <span>会议室</span>
      <el-select
        v-model="itme.interviewer"
        placeholder="全部"
        style="width: 250px"
      >
        <el-option label="会议室A" value="1"></el-option>
        <el-option label="会议室B" value="2"></el-option>
        <el-option label="会议室C" value="3"></el-option>
        <el-option label="会议室D" value="4"></el-option>
      </el-select>
      <el-button
        size="small"
        type="primary"
        @click="delteinterviewerNumber(index)"
        >删除</el-button
      >
      <el-button
        size="small"
        type="primary"
        @click="addinterviewerNumber(index)"
        >添加</el-button
      >
      <br /><br />
    </div>
    <h1>简历通过标准</h1>
    性别
    <el-select
      v-model="interviewerData.sex"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="男" value="1"></el-option>
      <el-option label="女人" value="2"></el-option>
    </el-select>
    学历
    <el-select v-model="interviewerData.xueli" placeholder="全部">
      <el-option label="不限" value="1"></el-option>
      <el-option label="高中及以下" value="2"></el-option>
      <el-option label="大专" value="3"></el-option>
      <el-option label="本科" value="4"></el-option>
      <el-option label="硕士" value="5"></el-option>
      <el-option label="博士及以上" value="6"></el-option>
    </el-select>
    <br /><br />
    工作经验
    <el-input
      placeholder="请输入内容"
      v-model="interviewerData.workTime"
      clearable
      style="width: 250px"
    ></el-input>
    年龄
    <el-select
      v-model="interviewerData.age"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="admin" value="1"></el-option>
      <el-option label="admin2" value="2"></el-option> </el-select
    ><br /><br />
    <el-button size="small" type="primary" @click="submitMethor"
      >提交</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateflag: this.$route.query.updateflag,
      interviewerData: {
        // sex: "1",
        // xueli: "2",
        // workTime: "3",
        // age: "23",
        // plannedDate: "2024-3-13",
        // plannedEndDate: "2024-3-15",
        // userId: "2",
        // userId2: "1",
        // userId3: "2",
        // interviewerNumber: [{ userId: "1", interviewer: "1" }, { userId: "2", interviewer: "2" }],
      }
    }
  },
  methods: {
    delteinterviewerNumber(index) {
      this.interviewerData.interviewerNumber.splice(index, 1)
    },
    addinterviewerNumber() {
      if (this.interviewerData.interviewerNumber.length > 5) {
        this.$message.error('最多5轮面试')
      } else {
        this.interviewerData.interviewerNumber.push({
          userId: '',
          interviewer: ''
        })
      }
    },
    submitMethor() {
      this.$message.success('成功')
      this.$router.push({ path: '/position' })
    },
    updateflagMethor() {
      if (this.updateflag == 'true') {
        this.interviewerData = {
          sex: '1',
          xueli: '2',
          workTime: '3',
          age: '23',
          plannedDate: '2024-3-13',
          plannedEndDate: '2024-3-15',
          userId: '2',
          userId2: '1',
          userId3: '2',
          interviewerNumber: [
            { userId: '1', interviewer: '1' },
            { userId: '2', interviewer: '2' }
          ]
        }
      } else {
        this.interviewerData = {
          sex: '',
          xueli: '',
          workTime: '',
          age: '',
          plannedDate: '',
          plannedEndDate: '',
          userId: '',
          userId2: '',
          userId3: '',
          interviewerNumber: [{ userId: '', interviewer: '' }]
        }
      }
    }
  },
  created() {
    this.updateflagMethor()
  }
}
</script>

<style></style>
