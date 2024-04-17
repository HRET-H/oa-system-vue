<template>
  <div>
    <el-row>
      <!-- form表单条查 -->
      <el-form
        ref="form"
        :model="userAndAssessForm"
        label-width="80px"
        inline="true"
      >
        <el-input
          v-model="userAndAssessForm.assessName"
          style="width: 240px; float: right"
          placeholder="搜索"
          :prefix-icon="Search"
          @click="findAssessAndUserListAndPage()"
        />
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table border :data="userAndAssessList" style="width: 100%">
        <el-table-column prop="users[0].userId" label="员工ID" width="180">
        </el-table-column>
        <el-table-column prop="users[0].userName" width="180" label="姓名">
        </el-table-column>
        <el-table-column prop="depts[0].deptName" label="部门">
        </el-table-column>
        <el-table-column prop="recruitJobs[0].jobName" label="职位">
        </el-table-column>
        <el-table-column prop="recruitJobs[0].jobTime" label="入职时间">
        </el-table-column>
        <el-table-column prop="recruitJobs[0].jobTime" label="转正时间">
        </el-table-column>
        <!-- <el-table-column prop="jobTime" label="考核次数">{{  }} </el-table-column> -->
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="detailAssessAndUser(scope.row)"
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
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 考核查询表单
      userAndAssessForm: {
        assessName: '',
        status: '',
        assessType: '',
        assessTime: '',
        pageNum: 1,
        pageSize: 10
      },
      assessId: '',
      //   考核列表
      userAndAssessList: [],
      // 分页
      total: 0
    }
  },
  created() {
    this.findAssessAndUserListAndPage()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.userAndAssessForm.pageSize = val
      this.findAssessAndUserListAndPage()
    },
    handleCurrentChange(val) {
      this.userAndAssessForm.pageNum = val
      // console.log(this.pageNum)
      this.findAssessAndUserListAndPage()
    },
    // 查询考核方法列表和分页
    findAssessAndUserListAndPage() {
      axios
        .post('/assess/findAssessAndUserListAndPage', this.userAndAssessForm)
        .then((res) => {
          console.log(res)
          this.userAndAssessList = res.data.list
          this.total = res.data.total
        })
    },
    // 重置方法
    resetForm() {
      ;(this.userAndAssessForm = {}), this.findAssessAndUserListAndPage()
    },
    // 详情跳转页面（row）
    detailAssessAndUser() {
      console.log(this.$route.query.userId)
      this.$router.push({
        path: 'InsertPerformanceFile',
        query: { userId: this.$route.query.userId }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item .asterisk-left {
  width: 160px !important;
}

.btn {
  width: 100%;
  height: 75px;
}
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
