<template>
  <PageContainer>
    <div style="height: 1260px">
      <!-- 发起考核表单 -->
      <el-form
        ref="form"
        :model="initiateAssessmentForm"
        :label-position="labelPosition"
        label-width="80px"
        size="large"
      >
        <div class="title">
          <h1>基本信息</h1>
        </div>
        <el-form-item label="计划名称">
          <el-input v-model="initiateAssessmentForm.assessName"></el-input>
        </el-form-item>
        <el-form-item label="考核周期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="initiateAssessmentForm.assessTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="考核范围">
          <el-select
            v-model="initiateAssessmentForm.assessRange"
            placeholder="请选择"
          >
            <el-option label="技术部" value="0"></el-option>
            <el-option label="产品部" value="1"></el-option>
            <el-option label="销售部" value="2"></el-option>
            <el-option label="市场部" value="3"></el-option>
            <el-option label="人事部" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <CustomTransfer :type="type" :successData="successData" />
        </el-form-item>
        <el-form-item label="考核说明">
          <el-input
            type="textarea"
            v-model="initiateAssessmentForm.assessDescription"
          ></el-input>
        </el-form-item>
        <div class="title">
          <h1>考核范围与考核模板</h1>
        </div>
        <br />
        <el-form-item label="被考核人">
          <el-select
            v-model="initiateAssessmentForm.assessRange"
            placeholder="请选择"
          >
            <el-option label="技术部" value="0"></el-option>
            <el-option label="产品部" value="1"></el-option>
            <el-option label="销售部" value="2"></el-option>
            <el-option label="市场部" value="3"></el-option>
            <el-option label="人事部" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核模板">
          <el-select
            v-model="initiateAssessmentForm.assessTemplateId"
            placeholder="请选择"
          >
            <el-option label="技术部" value="0"></el-option>
            <el-option label="产品部" value="1"></el-option>
            <el-option label="销售部" value="2"></el-option>
            <el-option label="市场部" value="3"></el-option>
            <el-option label="人事部" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="无需被考核人">
          <el-select
            v-model="initiateAssessmentForm.assessRange"
            placeholder="请选择"
          >
            <el-option label="技术部" value="0"></el-option>
            <el-option label="产品部" value="1"></el-option>
            <el-option label="销售部" value="2"></el-option>
            <el-option label="市场部" value="3"></el-option>
            <el-option label="人事部" value="4"></el-option>
          </el-select>
        </el-form-item>
        <div><br /></div>
        <div class="title">
          <h1>更多设置</h1>
        </div>
        <el-form-item label="被考核人可见">
          <el-checkbox-group v-model="initiateAssessmentForm.assessVisibe">
            <el-checkbox
              label="上级评语"
              name="assessVisibe"
              value="0"
            ></el-checkbox>
            <el-checkbox
              label="上级评分"
              name="assessVisibe"
              value="1"
            ></el-checkbox>
            <el-checkbox
              label="同事评分"
              name="assessVisibe"
              value="2"
            ></el-checkbox>
            <el-checkbox
              label="同事评语"
              name="assessVisibe"
              value="3"
            ></el-checkbox>
            <el-checkbox
              label="总分"
              name="assessVisibe"
              value="4"
            ></el-checkbox>
            <el-checkbox
              label="等级"
              name="assessVisibe"
              value="5"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="绩效公布方式">
          <el-radio-group
            v-model="initiateAssessmentForm.PerformanceAnnouncement"
          >
            <el-radio label="负责人手动发布" value="0"></el-radio>
            <el-radio label="结束后自动发布" value="1"></el-radio>
            <el-radio label="定时公布" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <div><br /></div>
        <el-form-item>
          <el-button type="primary" @click="addAssessMent">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageContainer>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 发起考核表单
      initiateAssessmentForm: {
        assessName: '',
        assessTime: '',
        assessRange: '',
        assessDescription: '',
        assessTemplateId: '',
        assessVisibe: [],
        PerformanceAnnouncement: ''
      },
      labelPosition: 'right',
      type: true
    }
  },
  created() {
    this.findAssessMentById()
  },
  methods: {
    addAssessMent() {
      axios
        .post('/assess/addAssessMent', this.initiateAssessmentForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            // this.$message({
            //   message: '新增成功',
            //   type: 'success'
            // })
            this.$router.push('/home/mova/appraisal_plan')
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    findAssessMentById() {
      axios
        .get(
          '/assess/findAssessMentById?assessId=' + this.$route.query.assessId
        )
        .then((res) => {
          console.log(res)
          this.initiateAssessmentForm = res.data
          console.log(this.initiateAssessmentForm)
        })
    },
    // 取消
    cancel() {
      this.initiateAssessmentForm = {}

      this.$router.go(-1)
    },
    successData() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  }
}
</script>
<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  border-left: 2px solid #409eff;
}

.title h1 {
  text-indent: 0.3em;
}
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
