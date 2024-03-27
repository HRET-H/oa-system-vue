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

      form: {
        // 职位信息
        postName: '', // 职位名称
        postQuality: '', // 职位性质
        workArea: '', // 工作地点
        postMinSalary: '', // 最低薪资
        postMaxSalary: '', // 最高薪资
        postSalary: '', // 薪资
        postEducationalRequirements: '', // 学历要求
        workUndergo: '', // 工作经验
        major: '', // 专业
        postRemark: '', // 职位描述

        // 职位设置
        postSettings: {
          postStartTime: '', // 计划启动时间
          postEndTime: '', // 最晚到岗时间
          headRecruitment: '', // 招聘负责人
          employmentManager: '', // 用人经理
          resumeScreeningPersonnel: '', // 简历初筛人员
          interviewRound: [
            // 面试轮次
            {
              interviewId: '' // 面试官id
            }
          ],
          sexPassDemand: '', // 性别通过要求
          eduPassDemand: '', // 学历通过要求
          workPassExp: '', // 工作经验通过要求
          agePassDemand: '' // 年龄通过要求
        }
      },

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
    getData(data) {
      this.form = data
      this.post = 1
    },
    handleClose() {
      // 重置表单
      this.$refs.form.resetFields()
      this.active = 0
      // 关闭弹窗
      this.dialogClose()
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
    },
    addInterviewRound() {
      this.form.postSettings.interviewRound.push({
        interviewId: '' // 面试官id
      })
    },
    deleteInterviewRound(index) {
      this.form.postSettings.interviewRound.splice(index, 1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          axios
            .post('api/manager/post/addPost', this.form)
            .then((res) => {
              // 判断是否成功
              if (res.data.code == 200) {
                // 成功，提示用户
                this.$message({
                  message: '新建职位成功',
                  type: 'success'
                })
                // 刷新页面
                this.$emit('init')
                // 关闭弹窗
                this.handleClose()
              } else {
                // 失败，提示用户
                this.$message({
                  message: '新建职位失败',
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '新建职位失败',
                type: 'error'
              })
            })
        } else {
          return false
        }
      })
    },
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求
          axios
            .post('api/manager/post/updatePost', this.form)
            .then((res) => {
              // 判断是否成功
              if (res.data.code == 200) {
                // 成功，提示用户
                this.$message({
                  message: '修改职位成功',
                  type: 'success'
                })
                // 刷新页面
                this.$emit('init')
                // 关闭弹窗
                this.handleClose()
              } else {
                // 失败，提示用户
                this.$message({
                  message: '修改职位失败',
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '修改职位失败',
                type: 'error'
              })
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
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-row v-show="active == 0">
          <h3>| 职位信息</h3>
          <el-row style="position: relative; left: 5%">
            <el-form-item label="职位名称" prop="postName">
              <el-input v-model="form.postName"></el-input>
            </el-form-item>
            <el-form-item label="招聘人数" prop="postRecruitNum">
              <el-input v-model="form.postRecruitNum"></el-input>
            </el-form-item>
            <el-form-item label="职位性质" prop="postQuality">
              <el-select
                v-model="form.postQuality"
                placeholder="请选择职位性质"
              >
                <el-option label="全职" value="全职"></el-option>
                <el-option label="兼职" value="兼职"></el-option>
                <el-option label="实习" value="实习"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用人部门" prop="postDept">
              <el-input v-model="form.postDept"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" prop="workArea">
              <el-input v-model="form.workArea"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="workAddress">
              <el-input v-model="form.workAddress"></el-input>
            </el-form-item>
          </el-row>
          <h3>| 职位设置</h3>
          <el-row style="position: relative; left: 5%">
            <el-form-item label="薪资范围">
              <el-input
                v-model="form.postMinSalary"
                style="width: 80px"
              ></el-input>
              <span style="margin: 0 10px">-</span>
              <el-input
                v-model="form.postMaxSalary"
                style="width: 80px"
              ></el-input>
              &nbsp;&nbsp;&nbsp;
              <el-input
                v-model="form.postSalary"
                style="width: 80px"
              ></el-input>
              薪
            </el-form-item>
            <el-form-item label="学历要求" prop="postEducationalRequirements">
              <el-select
                v-model="form.postEducationalRequirements"
                placeholder="请选择学历要求"
              >
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作经验" prop="workUndergo">
              <el-input type="number" v-model="form.workUndergo"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
              <el-input v-model="form.major"></el-input>
            </el-form-item>
            <el-form-item label="职位描述" prop="postRemark">
              <el-input type="textarea" v-model="form.postRemark"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="上传文件" style="color: aliceblue">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <template v-slot:tip>
                  <div class="el-upload__tip">
                    支持扩展名：.rar.zip.doc.docx.pdf jpg，单个文件不超过10Mb
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-row>
        <el-row v-show="active == 1">
          <h3>| 招聘信息</h3>
          <el-row>
            <el-form-item label="计划启动时间" prop="postStartTime">
              <el-date-picker
                v-model="form.postSettings.postStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 120px"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="最晚到岗时间" prop="postEndTime">
              <el-date-picker
                v-model="form.postSettings.postEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 120px"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="招聘负责人" prop="headRecruitment">
              <el-select
                v-model="form.postSettings.headRecruitment"
                placeholder="请选择招聘负责人"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用人经理" prop="employmentManager">
              <el-select
                v-model="form.postSettings.employmentManager"
                placeholder="请选择用人经理"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简历初筛人员">
              <el-select
                v-model="form.postSettings.resumeScreeningPersonnel"
                placeholder="请选择简历初筛人员"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <h3>| 面试轮次</h3>
          <el-row style="position: relative; left: 5%">
            <!-- 点击可以添加面试轮次 -->
            <el-button
              type="primary"
              icon="el-icon-plus"
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
                icon="el-icon-delete"
                @click="deleteInterviewRound(index)"
              ></el-button>
            </el-row>
          </el-row>
          <h3>| 简历通过要求</h3>
          <el-row style="position: relative; left: 5%">
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

<style scoped></style>
