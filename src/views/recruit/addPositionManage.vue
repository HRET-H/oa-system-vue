<template>
  <div>
    <h1>职位信息</h1>
    职位名称:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobName"
      clearable
      style="width: 250px"
    ></el-input>
    招聘人数:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobNumber"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    职位性质:
    <el-select
      v-model="addPostData.jobNature"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="全职" value="1"></el-option>
      <el-option label="兼职" value="2"></el-option>
      <el-option label="实习" value="3"></el-option>
      <el-option label="外派" value="4"></el-option>
      <el-option label="退休返聘" value="5"></el-option>
    </el-select>
    用人部门:
    <el-select
      v-model="addPostData.jobDept"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="技术部" value="1"></el-option>
      <el-option label="产品部" value="2"></el-option>
      <el-option label="销售部" value="3"></el-option>
      <el-option label="行政部" value="4"></el-option>
    </el-select>
    <br /><br />
    工作地点:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobAddress"
      clearable
      style="width: 250px"
    ></el-input>
    详细地址:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobDetailedAddress"
      clearable
      style="width: 250px"
    ></el-input>
    <h1>招聘要求</h1>
    薪资范围:<el-input
      placeholder=""
      v-model="addPostData.jobMinPay"
      clearable
      style="width: 80px"
    ></el-input
    >-
    <el-input
      placeholder=""
      v-model="addPostData.jobMaxPay"
      clearable
      style="width: 80px"
    ></el-input
    >&nbsp;
    <el-input
      placeholder=""
      v-model="addPostData.jobNumPay"
      clearable
      style="width: 70px"
    ></el-input
    >薪 学历要求:
    <el-select
      v-model="addPostData.jobEducation"
      placeholder="全部"
      style="width: 250px"
    >
      <el-option label="不限" value="1"></el-option>
      <el-option label="高中及以下" value="2"></el-option>
      <el-option label="大专" value="3"></el-option>
      <el-option label="本科" value="4"></el-option>
      <el-option label="硕士" value="5"></el-option>
      <el-option label="博士及以上" value="6"></el-option> </el-select
    ><br /><br />
    工作经验:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobExperience"
      clearable
      style="width: 250px"
    ></el-input>
    专业:<el-input
      placeholder="请输入内容"
      v-model="addPostData.jobMajor"
      clearable
      style="width: 250px"
    ></el-input
    ><br /><br />
    职位描述:<el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="addPostData.jobDescribe"
    ></el-input>

    <img
      v-if="addPostData.jobFile != ''"
      :src="addPostData.jobFile"
      style="width: 100px; height: 100px"
    />
    <el-upload
      class="avatar-uploader"
      action="http://localhost:10010/manager/sysUser/userImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      只支持png，jpg格式文件
    </el-upload>
    <br />
    <el-button
      v-if="updateflag == 'true'"
      size="small"
      type="primary"
      @click="addPostDataMethod"
      >下一步</el-button
    >
  </div>
</template>

<script>
import axios from 'axios'
import ElMessage from 'element-plus'

export default {
  data() {
    return {
      detailsDate: this.$route.query.detailsDate,
      updateflag: this.$route.query.updateflag,
      addPostData: {
        jobId: '',
        jobName: '',
        jobNumber: '',
        jobStatus: '',
        jobDept: '',
        jobAddress: '',
        jobDetailedAddress: '',
        jobMinPay: '',
        jobMaxPay: '',
        jobNumPay: '',
        jobEducation: '',
        jobExperience: '',
        jobMajor: '',
        jobDescribe: '',
        jobFile: '',
        jobPrincipal: '',
        jobNature: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.addPostData.jobFile = res.data
    },
    initialize() {
      console.log(this.updateflag)
      if (this.detailsDate != undefined) {
        this.addPostData = this.detailsDate
      }
    },
    addPostDataMethod() {
      var user = JSON.parse(localStorage.getItem('loginUser'))
      this.addPostData.jobPrincipal = user.userName
      console.log(this.addPostData)
      if (this.addPostData.jobId == '') {
        axios({
          method: 'post',
          url: '/http://localhost:9999/recruitJob/updateJob',
          data: this.addPostData
        }).then((result) => {
          if (result.data.code == 200) {
            ElMessage.success('修改职位信息成功')
            this.$router.push(/setPositionManage/)
            this.$router.go(0)
          } else {
            ElMessage.error('修改职位信息失败')
          }
        })
      } else {
        axios({
          method: 'post',
          url: '/http://localhost:9999/recruitJob/addJob',
          data: this.addPostData
        }).then((result) => {
          if (result.data.code == 200) {
            ElMessage.success('添加职位信息成功')
            this.$router.push(/setPositionManage/)
            this.$router.go(0)
          } else {
            ElMessage.error('添加职位信息失败')
          }
        })
        console.log(this.addPostData)
        console.log(this.addPostData.jobFile)
      }
    }
  }
}
</script>

<style></style>
