<template>
  <div>
    <div style="font-size: 30px">基本信息</div>
    <br />
    邮箱:
    <el-input v-model="addnotarizeEntryData.candidateMailbox"></el-input>
    <br /><br />
    入职职位:<el-input
      placeholder="请输入内容"
      v-model="addnotarizeEntryData.candidateExpect"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    实际入职时间:
    <el-date-picker
      v-model="addnotarizeEntryData.candidateStorage"
      type="date"
      placeholder="选择日期"
    >
    </el-date-picker
    ><br /><br />
    <div style="font-size: 30px">个人信息</div>
    出生日期:
    <el-date-picker
      v-model="addnotarizeEntryData.candidateDateBirth"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      placeholder="选择日期"
      style="width: 250px"
    /><br /><br />
    性别:
    <el-select
      v-model="addnotarizeEntryData.candidateSex"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="未知" value="0" />
      <el-option label="男" value="1" />
      <el-option label="女" value="2" />
    </el-select>
    <br /><br />
    婚姻状况:
    <el-select
      v-model="addnotarizeEntryData.candidateMarriage"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="未知" value="0" />
      <el-option label="已婚" value="1" />
      <el-option label="未婚" value="2" /> </el-select
    ><br /><br />
    民族：
    <el-input
      v-model="addnotarizeEntryData.candidateNation"
      placeholder="输入"
      style="width: 250px"
    ></el-input>
    <br /><br />
    籍贯：
    <el-input
      v-model="addnotarizeEntryData.candidateBirthplace"
      placeholder="输入"
      style="width: 250px"
    ></el-input
    ><br /><br />
    参加工作时间:
    <el-date-picker
      v-model="addnotarizeEntryData.candidateWorkDate"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      placeholder="选择日期"
      style="width: 250px"
    /><br /><br />
    政治面貌:
    <el-input
      v-model="addnotarizeEntryData.candidatePhoneNumber"
      placeholder="输入"
      style="width: 250px"
    ></el-input>
    <br /><br />
    <div style="font-size: 30px">基本信息</div>
    <br />
    学历：
    <el-select
      v-model="addnotarizeEntryData.candidateEducation"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="不限" value="6"></el-option>
      <el-option label="高中及以下" value="5"></el-option>
      <el-option label="大专" value="4"></el-option>
      <el-option label="本科" value="3"></el-option>
      <el-option label="硕士" value="2"></el-option>
      <el-option label="博士及以上" value="1"></el-option>
    </el-select>
    结束时间：
    <el-date-picker
      type="datetime"
      placeholder="选择日期时间"
      style="width: 250px"
      value-format="yyyy-MM-dd HH:mm:ss"
    ></el-date-picker>
    <br /><br />
    毕业院校：
    <el-input placeholder="请输入" style="width: 250px"></el-input>
    专业：
    <el-input placeholder="请输入" style="width: 250px"></el-input>
    <h1>紧急联系人</h1>
    姓名:
    <el-input placeholder="请输入" style="width: 250px"></el-input>
    关系:
    <el-input placeholder="请输入" style="width: 250px"></el-input>
    <br />
    <br />
    联系人电话：
    <el-input placeholder="请输入" style="width: 250px"></el-input>
    <div style="font-size: 30px">审批记录</div>
    审批人：
    <CustomTransfer :type="type" :successData="successData" />
    抄送人：
    <CustomTransfer :type="type" :successData="successData" />

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
      addnotarizeEntryData: {
        candidateMailbox: '',
        candidateExpect: '',
        candidateDepartment: '',
        emailContent: '',
        emailSubject: '',
        copyPerson: '',
        inform: '',
        candidateStorage: '',
        emailContent2: '',
        candidateDateBirth: ''
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
          // 根据实际需求添加addnotarizeEntryData中的其他字段到请求体
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
