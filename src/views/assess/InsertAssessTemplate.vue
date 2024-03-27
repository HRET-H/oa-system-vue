<template>
  <div style="height: 1260px">
    <!-- 发起考核模板表单 -->
    <el-form
      ref="form"
      :model="insertAssessTemplateForm"
      :label-position="labelPosition"
      label-width="80px"
      size="large"
    >
      <div class="title">
        <h1>基本信息</h1>
      </div>
      <el-form-item label="模板名称">
        <el-input v-model="insertAssessTemplateForm.templateName"></el-input>
      </el-form-item>
      <el-form-item label="评分方式">
        <el-select
          v-model="insertAssessTemplateForm.scoreMethod"
          placeholder="请选择"
        >
          <el-option label="百分制(0-100)" value="0"></el-option>
          <el-option label="十分制(0-10)" value="1"></el-option>
          <el-option label="五分制(0-5)" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计分方式">
        <el-select
          v-model="insertAssessTemplateForm.scoring"
          placeholder="请选择"
        >
          <el-option label="加权计算" value="0"></el-option>
          <el-option label="加和计算" value="1"></el-option>
        </el-select>
      </el-form-item>
      <div class="title">
        <h1>考核指标</h1>
      </div>
      <br />
      <el-form-item>
        <el-table
          :data="insertAssessTemplateForm.assessIndex"
          style="width: 100%"
        >
          <el-table-column prop="assessIndexName" label="指标名称" width="180">
            <template v-slot:default="scope">
              <el-input v-model="scope.row.assessIndexName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="indexDescription" label="指标说明" width="180">
            <template v-slot:default="scope">
              <el-input v-model="scope.row.indexDescription"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="evaluationCriteria"
            label="评价标准"
            width="180"
          >
            <template v-slot:default="scope">
              <el-input v-model="scope.row.evaluationCriteria"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="metricWeights" label="指标权重" width="180">
            <template v-slot:default="scope">
              <el-input
                v-model="scope.row.metricWeights"
                style="width: 120px"
              ></el-input>
              <el-text class="mx-1">%</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="targetValue" label="目标值" width="180">
            <template v-slot:default="scope">
              <el-input v-model="scope.row.targetValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column lable="操作">
            <template v-slot:default="scope">
              <el-button
                type="danger"
                size="mini"
                @click="deleteAssessIndex(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div><br /></div>
      <div class="title">
        <h1>考核流程设置</h1>
      </div>
      <el-text class="mx-1">员工自评</el-text>
      <el-form-item label="允许添加指标">
        <el-switch
          v-model="insertAssessTemplateForm.addMetrics"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="0"
          inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="评价权限">
        <el-checkbox-group
          v-model="insertAssessTemplateForm.commentPermissions"
        >
          <el-checkbox
            label="评分"
            name="commentPermissions"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="评语"
            name="commentPermissions"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="邀请同事评价">
        <el-switch
          v-model="insertAssessTemplateForm.inviteColleagues"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="0"
          inactive-value="1"
        >
        </el-switch>
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;</el-text>
        <el-text class="mx-1">最少</el-text>
        <el-input
          v-model="insertAssessTemplateForm.minNumber"
          placeholder="请输入"
          style="width: 80px"
        ></el-input>
        <el-text class="mx-1">人</el-text>
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;</el-text>
        <el-text class="mx-1">最多</el-text>
        <el-input
          v-model="insertAssessTemplateForm.maxNumber"
          placeholder="请输入"
          style="width: 80px"
        ></el-input>
        <el-text class="mx-1">人</el-text>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="insertAssessTemplateForm.deadline"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <br />
      <br />
      <el-text class="mx-1">上级评价</el-text>
      <el-form-item label="可执行人">
        <el-checkbox-group v-model="insertAssessTemplateForm.executor">
          <el-checkbox label="上级" name="executor" value="0"></el-checkbox>
          <el-checkbox
            label="部门负责人"
            name="executor"
            value="1"
          ></el-checkbox>
          <el-checkbox label="HRBP" name="executor" value="2"></el-checkbox>
          <el-checkbox label="指定人员" name="executor" value="3"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="评价权限">
        <el-checkbox-group
          v-model="insertAssessTemplateForm.commentPermissions"
        >
          <el-checkbox
            label="评分"
            name="commentPermissions"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="评语"
            name="commentPermissions"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="节点为空">
        <el-select
          v-model="insertAssessTemplateForm.nodeEmpty"
          placeholder="指派给指定人"
        >
          <el-option label="手动调整" :value="0"></el-option>
          <el-option label="自动调整" :value="1"></el-option>
          <el-option label="指派给指定人" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="insertAssessTemplateForm.deadline"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <div><br /></div>
      <el-form-item>
        <el-button type="primary" @click="addInsetrTemplate">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      // 发起考核表单
      insertAssessTemplateForm: {
        // assessName: '',
        // assessTime: '',
        // assessRange: '',
        // assessDescription: '',
        // assessTemplateId: '',
        // assessVisibe: [],
        // PerformanceAnnouncement: '',
        // commentPermissions: [],
        // executor: [],
        addMetrics: '0',
        inviteColleagues: '0',
        pageNum: 1,
        pageSize: 10,
        assessIndex: [],
        commentPermissions: [],
        executor: []
      },
      labelPosition: 'right'
    }
  },
  created() {
    // 展示考核指标
    this.findAssessTemplateListAndPage()
    this.findAssessTemplateById()
  },
  methods: {
    addInsetrTemplate() {
      axios
        .post(
          'http://localhost:9999/assessTemplate/addAssessTemplate',
          this.insertAssessTemplateForm
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            this.$router.push('/appraisal_template')
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    findAssessTemplateListAndPage() {
      axios
        .post(
          'http://localhost:9999/assessTemplate/findAssessTemplateListAndPage',
          this.insertAssessTemplateForm
        )
        .then((res) => {
          console.log(res.data)
          this.insertAssessTemplateForm.assessIndex =
            res.data.list[0].assessIndex
          // this.total = res.data.total
        })
    },
    findAssessTemplateById() {
      axios
        .post(
          'http://localhost:9999/assessTemplate/findAssessTemplateById?templateId=' +
            this.$route.query.templateId
        )
        .then((res) => {
          console.log(res)
          this.insertAssessTemplateForm = res.data
          console.log(this.insertAssessTemplateForm)
        })
    },
    deleteAssessIndex(row) {
      console.log(row)
      axios
        .get(
          'http://localhost:9999/assessIndex/deleteAssessIndex?assessIndexId=' +
            row
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findAssessTemplateListAndPage()
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    // 取消
    cancel() {
      this.insertAssessTemplateForm = {}

      this.$router.go(-1)
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

.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
