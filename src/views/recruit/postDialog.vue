<script>
import axios from 'axios'

export default {
  name: 'postDialog',
  props: {
    postDialog: {
      type: Object,
      default: () => {
        return {
          visible: true,
          data: {}
        }
      }
    },
    dialogClose: {
      type: Function
    }
  },
  data() {
    return {
      post: 0, // 0: 添加  1: 修改

      active: 0,

      addPostData: {
        jobName: '',
        jobNumber: '',
        jobNature: '',
        jobDept: '',
        jobAddress: '',
        jobMinPay: '',
        jobMaxPay: '',
        jobPay: '',
        jobEducation: '',
        jobExperience: '',
        jobMajor: '',
        jobRemark: '',
        jobDescribe: '',
        jobPostStartTime: '',
        jobPostEndTime: '',
        jobPrincipal: '',
        jobSex: '',
        jobAge: '',
        jobDetailedAddress: '',
        interviewRound: [
          // 面试轮次
          {
            interviewId: '' // 面试官id
          }
        ]
      },

      userList: [], // 负责人、经理、初筛人员、面试官列表

      rules: {
        jobName: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.getUserList()
    },
    getData(data) {
      this.addPostData = data
      this.post = 1
    },
    handleClose() {
      // 重置表单数据
      // Object.assign(this.$data.addPostData, this.$options.data().addPostData)
      this.$refs.addPostData.resetFields()

      // 重置/隐藏活动组件（例如选项卡、步骤条等）
      this.active = 0

      // 关闭当前弹窗
      this.dialogClose()
    },
    // 获取用户列表
    getUserList() {
      axios.post('/recruitJob/findAll').then((res) => {
        this.userList = res.data
        // 将当前用户从用户列表中移除
        // const user = JSON.parse(document.cookie.split('=')[1]).userId
        // this.userList = this.userList.filter((item) => {
        //   return item.userId !== user
        // })
      })
    },
    addInterviewRound() {
      this.addPostData.interviewRound.push({
        interviewId: '' // 面试官id
      })
    },
    deleteInterviewRound(index) {
      this.addPostData.interviewRound.splice(index, 1)
    },
    submitForm(formName) {
      console.log(this.post)
      console.log(formName)
      console.log(this.addPostData)
      // this.$refs[this.formName].validate((valid) => {
      //   if (valid) {
      // 发送请求
      axios
        .post('/recruitJob/addJob', this.addPostData)
        .then((res) => {
          console.log(res)
          // 判断是否成功
          if (res.data.code == 200) {
            // 成功，提示用户
            ElMessage.success('恭喜你，添加成功')
            // 刷新页面
            this.$emit('init')
            // 关闭弹窗
            this.handleClose()
          } else {
            // 失败，提示用户
            ElMessage.error('添加失败')
          }
        })
        .catch(() => {
          ElMessage.error('添加失败')
        })
      //   } else {
      //     return false
      //   }
      // })
    },
    updateForm(formName) {
      console.log(this.post)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          axios
            .post('RecruitJob/updateJob', this.form)
            .then((res) => {
              // 判断是否成功
              if (res.data.code == 200) {
                // 成功，提示用户
                ElMessage.success('恭喜你，修改成功')
                // 刷新页面
                this.$emit('init')
                // 关闭弹窗
                this.handleClose()
              } else {
                // 失败，提示用户
                ElMessage.error('修改失败')
              }
            })
            .catch(() => {
              ElMessage.error('修改失败')
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<template>
  <div id="postDialog">
    <el-dialog
      :model-value="postDialog.visible"
      width="40%"
      @close="handleClose()"
    >
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="职位信息"></el-step>
        <el-step title="职位设置"></el-step>
      </el-steps>
      <el-form
        ref="addPostData"
        :model="addPostData"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-row v-show="active == 0">
          <h3>| 职位信息</h3>
          <el-row style="margin-top: 15px">
            <el-form-item label="职位名称" prop="jobName">
              <el-input
                v-model="addPostData.jobName"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <el-form-item label="招聘人数" prop="jobNumber">
              <el-input
                v-model="addPostData.jobNumber"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位性质" prop="jobNature">
              <el-select
                v-model="addPostData.jobNature"
                placeholder="全部"
                style="width: 200px; height: 40px"
              >
                <el-option label="全职" value="1"></el-option>
                <el-option label="兼职" value="2"></el-option>
                <el-option label="实习" value="3"></el-option>
                <el-option label="外派" value="4"></el-option>
                <el-option label="退休返聘" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用人部门" prop="jobDept">
              <el-select
                v-model="addPostData.jobDept"
                placeholder="全部"
                style="width: 200px; height: 40px"
              >
                <el-option label="技术部" value="1"></el-option>
                <el-option label="产品部" value="2"></el-option>
                <el-option label="销售部" value="3"></el-option>
                <el-option label="行政部" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作地点" prop="jobAddress">
              <el-input
                v-model="addPostData.jobAddress"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="jobDetailedAddress">
              <el-input
                v-model="addPostData.jobDetailedAddress"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
          </el-row>
          <h3>| 职位设置</h3>
          <el-row style="margin-top: 15px">
            <el-form-item label="薪资范围">
              <el-input
                v-model="addPostData.jobMinPay"
                style="width: 50px"
              ></el-input>
              <span style="margin: 0 10px">-</span>
              <el-input
                v-model="addPostData.jobMaxPay"
                style="width: 50px"
              ></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input
                v-model="addPostData.jobNumPay"
                style="width: 50px"
              ></el-input>
              薪
            </el-form-item>
            <el-form-item label="学历要求" prop="jobEducation">
              <el-select
                v-model="addPostData.jobEducation"
                placeholder="全部"
                style="width: 200px; height: 40px"
              >
                <el-option label="不限" value="6"></el-option>
                <el-option label="高中及以下" value="5"></el-option>
                <el-option label="大专" value="4"></el-option>
                <el-option label="本科" value="3"></el-option>
                <el-option label="硕士" value="2"></el-option>
                <el-option label="博士及以上" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作经验" prop="jobExperience">
              <el-input
                type="number"
                v-model="addPostData.jobExperience"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="jobMajor">
              <el-input
                v-model="addPostData.jobMajor"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位描述" prop="jobDescribe">
              <el-input
                type="textarea"
                v-model="addPostData.jobDescribe"
                style="width: 200px; height: 40px"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item label="上传文件" style="color: aliceblue">
              <el-upload
                v-model:file-list="fileList"
                class="avatar-uploader"
                action="http://localhost:9999/recruitJob/userImg"
                multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="3"
                :on-exceed="handleExceed"
              >
                上传文件：
                <el-button type="primary">图片上传</el-button>
                &nbsp;&nbsp;&nbsp;
                <div class="el-upload__tip">
                  支持扩展名：.png .gif .pdf .jpg,单个文件不超过500kb。
                </div>
              </el-upload></el-form-item
            >
          </el-row>
        </el-row>
        <el-row v-show="active == 1">
          <h3>| 招聘信息</h3>
          <el-row style="margin-top: 15px">
            <el-form-item label="计划启动" prop="jobPostStartTime">
              <el-date-picker
                v-model="addPostData.jobPostStartTime"
                type="datetime"
                placeholder="选择日期"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 200px"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="最晚到岗" prop="jobPostEndTime">
              <el-date-picker
                v-model="addPostData.jobPostEndTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期"
                style="width: 200px"
                clearable
              ></el-date-picker>
            </el-form-item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-form-item
              label="招聘负责"
              prop="jobPrincipal"
              style="display: block"
            >
              <CustomTransfer :type="type" :successData="successData" />
            </el-form-item>
            <br />
            <el-form-item
              label="用人经理"
              prop="jobPrincipal"
              style="display: block; width: 100%"
            >
              <CustomTransfer :type="type" :successData="successData" />
            </el-form-item>
            <br />
            <el-form-item
              label="初筛人员"
              prop="jobPrincipal"
              style="display: block"
            >
              <CustomTransfer :type="type" :successData="successData" />
            </el-form-item>
          </el-row>
          <el-row>
            <h3 style="width: 100%">| 面试轮次</h3>
            <el-row style="margin-top: 15px">
              <!-- 点击可以添加面试轮次 -->
              <el-button style="color: #409eff" @click="addInterviewRound"
                ><el-icon style="color: black"><Plus /></el-icon
              ></el-button>
              <el-row
                v-for="(item, index) in addPostData.interviewRound"
                :key="index"
              >
                &nbsp;&nbsp;&nbsp;
                <el-form-item
                  :label="'第' + (index + 1) + '轮面试官'"
                  prop="interviewId"
                  label-width="90px"
                >
                  <el-select
                    v-model="item.interviewId"
                    placeholder="请选择面试官"
                    style="width: 190px"
                  >
                    <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="会议室">
                  <el-select
                    v-model="item.interviewId"
                    placeholder="请选择会议室"
                    style="width: 190px"
                  >
                    <el-option label="会议室1" value="1"></el-option>
                    <el-option label="会议室2" value="2"></el-option>
                    <el-option label="会议室3" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-button
                  style="color: red"
                  @click="deleteInterviewRound(index)"
                  ><el-icon style="color: black"><Minus /></el-icon
                ></el-button>
              </el-row>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
            </el-row>
          </el-row>
          &nbsp;
          <el-row>
            <h3>| 简历通过要求</h3>
            <el-row style="margin-top: 15px">
              <div>&nbsp;</div>
              <br />
              <el-form-item
                label="性别通过要求"
                prop="jobSex"
                label-width="100px"
              >
                <el-select
                  v-model="addPostData.jobSex"
                  style="width: 200px"
                  placeholder="请选择性别"
                >
                  <el-option label="男" value="2"></el-option>
                  <el-option label="女" value="3"></el-option>
                  <el-option label="不限" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="学历通过要求"
                prop="jobEducation"
                label-width="100px"
              >
                <el-select
                  v-model="addPostData.jobEducation"
                  style="width: 200px"
                  placeholder="请选择学历"
                >
                  <el-option label="不限" value="6"></el-option>
                  <el-option label="高中及以下" value="5"></el-option>
                  <el-option label="大专" value="4"></el-option>
                  <el-option label="本科" value="3"></el-option>
                  <el-option label="硕士" value="2"></el-option>
                  <el-option label="博士及以上" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="工作经验通过要求"
                prop="jobExperience"
                label-width="130px"
              >
                <el-input
                  type="number"
                  v-model="addPostData.jobExperience"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="年龄通过要求"
                prop="jobAge"
                label-width="130px"
              >
                <el-select
                  v-model="addPostData.jobAge"
                  style="width: 200px"
                  placeholder="请选择学历"
                >
                  <el-option label="不限" value="0"></el-option>
                  <el-option label="25" value="1"></el-option>
                  <el-option label="27" value="2"></el-option>
                  <el-option label="30" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-row>
        </el-row>
      </el-form>
      <div v-if="active == 0">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" style="color: aliceblue" @click="active = 1"
          >下一步</el-button
        >
      </div>
      <div v-if="active == 1">
        <el-button @click="active = 0">上一步</el-button>
        <el-button
          type="primary"
          @click="
            post == 0 ? submitForm('addPostData') : updateForm('addPostData')
          "
          style="color: aliceblue"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped></style>
