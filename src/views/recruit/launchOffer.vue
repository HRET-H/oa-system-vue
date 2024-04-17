<template>
  <div>
    <div style="font-size: 30px">候选人信息</div>
    <br />
    入职职位：
    <el-select
      v-model="addlaunchOfferData.candidateExpect"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="计算机" value="计算机" />
      <el-option label="牧师" value="牧师" />
      <el-option label="java" value="java" />
      <el-option label="前端" value="前端" />
      <el-option label="其他" value="其他" />
    </el-select>
    <br />
    <br />
    入职部门：
    <el-select
      v-model="addlaunchOfferData.candidateDepartment"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="技术部" value="1" />
      <el-option label="产品部" value="2" />
      <el-option label="销售部" value="3" />
      <el-option label="行政部" value="4" />
    </el-select>
    <br />
    <br />
    入职职位：
    <el-select
      v-model="addlaunchOfferData.candidateExpect"
      placeholder="请选择"
      style="width: 250px"
    >
      <el-option label="计算机" value="计算机" />
      <el-option label="牧师" value="牧师" />
      <el-option label="java" value="java" />
      <el-option label="前端" value="前端" />
      <el-option label="其他" value="其他" />
    </el-select>
    <br />
    <br />
    预计入职时间：
    <el-date-picker
      v-model="addlaunchOfferData.candidateStorage"
      type="datetime"
      value-format="YYYY-MM-DD HH:mm:ss"
      placeholder="选择日期"
      style="width: 250px"
    />
    <br />
    <br />
    通知方式：
    <el-radio v-model="addlaunchOfferData.inform" label="短息通知"
      >短息通知</el-radio
    >
    <el-radio v-model="addlaunchOfferData.inform" label="邮件通知"
      >邮件通知</el-radio
    >
    <br />
    <br />
    发件邮箱：
    <el-input
      v-model="addlaunchOfferData.candidateMailbox"
      placeholder="请输入发件邮箱"
      style="width: 250px"
    />
    <br />
    <br />
    <div style="font-size: 30px">邮件模板</div>
    <br />
    <br />
    抄送人：
    <el-input
      v-model="addlaunchOfferData.copyPerson"
      placeholder="请输入抄送人"
    ></el-input>
    <br />
    <br />
    邮件主题：
    <el-input
      v-model="addlaunchOfferData.emailSubject"
      placeholder="请输入邮件主题"
    ></el-input>
    <br />
    <br />
    邮件内容：
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入邮件内容"
      v-model="addlaunchOfferData.emailContent"
    ></el-input>
    <br />
    <br />
    上传附件：
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:9999/recruitJob/userImg"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
    ></el-upload>
    <br />
    <div style="font-size: 30px">短信模板</div>
    <br />
    邮件内容：
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入邮件内容"
      v-model="addlaunchOfferData.emailContent2"
    ></el-input>

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
      addlaunchOfferData: {
        candidateExpect: '',
        candidateDepartment: '',
        emailContent: '',
        emailSubject: '',
        copyPerson: '',
        candidateMailbox: '',
        inform: '',
        candidateStorage: '',
        emailContent2: ''
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
        console.log(result)
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
    }
  }
}
</script>

<style></style>
