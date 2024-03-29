<template>
  <div>
    <el-dialog
      :model-value="postDialog.visible"
      width="50%"
      @close="handleClose()"
    >
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="职位信息"></el-step>
        <el-step title="职位设置">职位设置</el-step>
      </el-steps>
      <el-form
        ref="form"
        :model="addPost"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-row v-show="active == 0">
          <h3>| 职位信息</h3>
          <el-row>
            <el-form-item label="职位名称" prop="jobName">
              <el-input v-model="addPost.jobName"></el-input>
            </el-form-item>
            <el-form-item label="招聘人数" prop="jobNumber">
              <el-inpu v-model="addPost.jobNumber"></el-inpu>
            </el-form-item>
            <el-form-item label="职位性质" prop="jobNature">
              <el-select v-model="addPost.jobNature" placeholder="请选择">
                <el-option label="全职" value="1"></el-option>
                <el-option label="兼职" value="2"></el-option>
                <el-option label="实习" value="3"></el-option>
                <el-option label="外派" value="4"></el-option>
                <el-option label="退休返聘" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用人部门" prop="jobdept">
              <el-input v-model="addPost.jobdept"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" prop="jobAddress">
              <el-select v-model="addPost.jobAddress" placeholder="全部">
                <el-option label="技术部" value="1"></el-option>
                <el-option label="产品部" value="2"></el-option>
                <el-option label="销售部" value="3"></el-option>
                <el-option label="行政部" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="jobDetailedAddress">
              <el-input
                v-model="addPost.jobDetailedAddress"
                placeholder="请输入详细地址"
              ></el-input>
            </el-form-item>
          </el-row>
          <h3>| 职位管理</h3>
          <el-row>
            <el-form-item label="薪资范围">
              <el-input
                v-model="addPost.jobMinPay"
                style="width: 80px"
              ></el-input>
              <span style="margin: 0 10px">-</span>
              <el-input
                v-model="addPost.jobMaxPay"
                style="width: 80px"
              ></el-input>
              &nbsp;&nbsp;
              <el-input v-model="addPost.jobNumPay"></el-input>薪
            </el-form-item>
            <el-form-item label="学历要求" prop="jobEducation">
              <el-select
                v-model="addPost.jobEducation"
                placeholder="请选择学历要求"
              >
                <el-option label="不限" value="1"></el-option>
                <el-option label="高中及以下" value="2"></el-option>
                <el-option label="大专" value="3"></el-option>
                <el-option label="本科" value="4"></el-option>
                <el-option label="硕士" value="5"></el-option>
                <el-option label="博士及以上" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作经验" prop="jobExperience">
              <el-input
                placeholder="请输入内容"
                v-model="addPost.jobExperience"
              ></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="jobMajor">
              <el-input
                placeholder="请输入内容"
                v-model="addPost.jobMajor"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位描述" prop="jobDescribe">
              <el-input
                placeholder="请输入内容"
                v-model="addPost.jobDescribe"
              ></el-input>
            </el-form-item>
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
                <el-button size="small" type="primary">点击上传</el-button>
                <template v-slot:tip>
                  <div class="el-upload__tip">
                    支持扩展名：.rar.zip.doc.docx.pdf jpg,单个文件不超过500kb
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-row>
        <el-row v-show="active == 1">
          <h3>| 招聘信息</h3>
          <el-row>
            <el-form-item label="计划启动时间" prop="jobPostStartTime">
              <el-date-picker
                v-model="addPost.postStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 120px"
                clearable
              />
            </el-form-item>
            <el-form-item label="最晚到岗时间" prop="jobPostEndTime">
              <el-date-picker
                v-model="addPost.postEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 120px"
                clearable
              />
            </el-form-item>
            <el-form-item lobel="招聘负责人" prop="headRecruitment">
              <CustomTransfer :type="type" :seccessData="seccessData" />
            </el-form-item>
            <el-form-item lobel="用人经理" prop="employmentManager">
              <CustomTransfer :type="type" :seccessData="seccessData" />
            </el-form-item>
            <el-form-item lobel="简历初筛人员" prop="resumeScreeningPersonnel">
              <CustomTransfer :type="type" :seccessData="seccessData" />
            </el-form-item>
          </el-row>
          <h3>| 面试轮次</h3>
          <el-row>
            <!-- 点击可以添加面试轮次 -->
            <el-button
              type="primary"
              style="color: aliceblue"
              icon="Plus"
              @click="addInterviewRound"
            ></el-button>
            <el-row
              v-for="(item, index) in form.postSettings.interviewRound"
              :key="index"
            >
              <el-form-item
                :label="'第' + (index + 1) + '轮面试官'"
                prop="interviewId"
              >
                <el-select
                  v-model="item.interviewId"
                  placeholder="请选择面试官"
                >
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-button
                type="danger"
                icon="Delete"
                @click="deleteInterviewRound(index)"
              ></el-button>
            </el-row>
          </el-row>
          &nbsp;
          <h3>| 简历通过要求</h3>
          <el-row>
            <el-form-item label="性别通过要求" prop="sexPassDemand">
              <el-select v-model="form.postSettings.sexPassDemand">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="不限" value="不限"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历通过要求" prop="eduPassDemand">
              <el-select v-model="form.postSettings.eduPassDemand">
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作经验通过要求" prop="workPassExp">
              <el-input
                type="number"
                v-model="form.postSettings.workPassExp"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄通过要求" prop="agePassDemand">
              <el-input
                type="number"
                v-model="form.postSettings.agePassDemand"
              ></el-input>
            </el-form-item>
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
          @click="post == 0 ? submitForm('form') : updateForm('form')"
          style="color: aliceblue"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    addpostDialog: {
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
      addPost: {
        postName: '',
        postDescription: '',
        postTime: '',
        postRange: '',
        postVisibe: [],
        PerformanceAnnouncement: '',
        commentPermissions: [],
        executor: []
      },
      true: 'true',
      userList: [], // 负责人、经理、初筛人员、面试官列表
      rules: {
        postName: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.getUserList()
    },
    // 获取用户列表
    getUserList() {
      axios
        .get('api/manager/sysUser/selectAllUser')
        .then((res) => {
          this.userList = res.data
          // 将当前用户从用户列表中移除
          const user = JSON.parse(document.cookie.split('=')[1]).userId
          this.userList = this.userList.filter((item) => {
            return item.userId !== user
          })
        })
        .catch(() => {
          this.$message({
            message: '获取用户列表失败',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style></style>
