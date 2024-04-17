<template>
  <PageContainer>
    <div>
      <div class="block">
        <el-avatar
          :size="100"
          src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/2126366332.jpg"
        ></el-avatar>
        <el-descriptions title="绩效考核档案" v-model="userAndAssessList">
          <el-descriptions-item
            label="职位"
            v-model="jobName"
          ></el-descriptions-item>
          <el-descriptions-item
            label="部门"
            v-model="deptName"
          ></el-descriptions-item>
          <el-descriptions-item
            label="入职时间"
            v-model="jobTime"
          ></el-descriptions-item>
          <el-descriptions-item
            label="转职时间"
            v-model="jobTime"
          ></el-descriptions-item>
        </el-descriptions>
      </div>
      <el-table border :data="userAndAssessForm.assessList" style="width: 100%">
        <el-table-column prop="assessName" label="考核计划" width="180">
        </el-table-column>
        <el-table-column prop="assessTime" label="考核期" width="180">
        </el-table-column>
        <el-table-column prop="assessScore" label="绩效得分"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="detailAssess(scope.row)"
              >详情</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <GetPagination
        :page-num="userAndAssessForm.pageNum"
        :page-size="userAndAssessForm.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </div>
  </PageContainer>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      userAndAssessForm: {
        assessList: [],
        pageNum: 1,
        pageSize: 10
      },
      userAndAssessList: {
        pageNum: 0,
        pageSize: 0,
        assessId: '',
        assessName: '',
        assessTime: '',
        assessScore: '',
        assessType: '',
        status: '',
        depts: [],
        recruitJobs: []
      },
      //   assessList: [],
      total: 0
    }
  },
  created() {
    this.findAssessAndUserListAndPage()
    this.findAssess()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.userAndAssessForm.pageSize = val
      this.findAssess()
    },
    handleCurrentChange(val) {
      this.userAndAssessForm.pageNum = val
      // console.log(this.pageNum)
      this.findAssess()
    },
    findAssessAndUserListAndPage() {
      axios
        .post('/assess/findAssessAndUserListAndPage', this.userAndAssessList)
        .then((res) => {
          console.log(res)
          this.userAndAssessList = res.data.list
          this.total = res.data.total
        })
    },
    findAssess() {
      axios
        .post('/assess/findAssessListAndPage', this.userAndAssessForm)
        .then((res) => {
          console.log(res)
          this.userAndAssessForm.assessList = res.data.list
          this.total = res.data.total
        })
    },
    // 详情跳转页面（row）
    detailAssess() {}
  }
}
</script>
<style scoped>
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
