<template>
  <div>
    <PageContainer>
      <el-row>
        <div class="btn" style="line-height: 80px">
          <!-- form表单条查 -->
          <el-form
            ref="form"
            :model="returnsForm"
            label-width="80px"
            inline="true"
          >
            <el-form-item label="借阅人">
              <el-input
                v-model="returnsForm.returnName"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <!-- 搜索重置按钮 -->
            <el-form-item>
              <el-button type="primary" @click="findReturnsPaginationList"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-row>

      <!-- 表格 -->
      <el-row>
        <el-table
          border
          :data="returnList"
          style="width: 100%; margin-top: 80px"
        >
          <el-table-column
            prop="documentationId"
            label="流水号"
          ></el-table-column>
          <el-table-column prop="returnName" label="归还人"></el-table-column>
          <el-table-column prop="returnDate" label="归还日期"></el-table-column>
          <el-table-column prop="fileNumber" label="档案号"> </el-table-column>
          <el-table-column prop="fileTitle" label="档案标题"></el-table-column>
          <el-table-column prop="states" label="状态">
            <template v-slot:default="scope">
              <el-tag v-if="scope.row.states == 1" type="danger">已同意</el-tag>
              <el-tag v-else-if="scope.row.states == 2" type="warning"
                >已拒绝</el-tag
              >
              <el-tag v-if="scope.row.state == 3" type="info">审批中</el-tag>
              <!-- <el-tag v-else-if="scope.row.state == 4" type="success">已同意</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="submissionssTimes"
            label="提交时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <span v-if="scope.row.states == 1"></span>
              <el-button
                size="mini"
                @click="handleEdite(scope.$index, scope.row)"
                >停用</el-button
              >
              <el-button
                size="mini"
                @click="handleEdits(scope.$index, scope.row)"
                v-if="scope.row.states == 2"
                >启用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <GetPagination
        :page-num="returnsForm.pageNum"
        :page-size="returnsForm.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </PageContainer>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      // 考核查询表单
      returnsForm: {
        returnName: '',
        pageNum: 1,
        pageSize: 10
      },
      returnId: '',
      //   考核列表
      returnList: [],

      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findReturnsPaginationList()
  },
  methods: {
    // 状态修改
    handleEdits(index, row) {
      console.log(row)
      row.states = 1
      axios.post('/returns/updateStatuss', row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success('修改成功')
          this.findReturnsPaginationList()
        } else {
          ElMessage.error('修改失败')
        }
      })
    },
    handleEdite(index, row) {
      console.log(row)
      row.states = 2
      axios.post('/returns/updateStatuss', row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success('修改成功')
          this.findReturnsPaginationList()
        } else {
          ElMessage.error('修改失败')
        }
      })
    },

    // 分页
    handleSizeChange(val) {
      this.returnsForm.pageSize = val
      this.findReturnsPaginationList()
    },
    handleCurrentChange(val) {
      this.returnsForm.pageNum = val
      // console.log(this.pageNum)
      this.findReturnsPaginationList()
    },
    // 查询考核方法列表和分页
    findReturnsPaginationList() {
      axios
        .post('/returns/findReturnPaginationList', this.returnsForm)
        .then((res) => {
          // 打印
          console.log(res.data)
          this.returnList = res.data.list
          this.total = res.data.total
        })
    },
    // 发起考核跳转页面
    initiateDocumentation() {
      //   this.$router.push('/home/employee_leave/addHolidayIndex')
    },
    // 修改跳转页面（row）
    // eslint-disable-next-line no-unused-vars
    updateReturns(row) {
      //   console.log(row.holidayId)
      //   this.$router.push({
      //     path: '/home/employee_leave/addHolidayIndex',
      //     query: { holidayId: row.holidayId }
      //   })
    },
    // 添加职位
    addPosition(row, updateflag) {
      console.log(row)
      this.$router.push({
        path: '/home/recruit/addPositionManage',
        params: {
          detailsDate: 'row',
          jobName: 'row.jobName',
          jobStatus: 'row.jobStatus',
          jobId: 'row.jobId',
          updateflag: updateflag
        }
      })
    },

    // 删除考核
    deleteReturns(row) {
      axios
        .post('/returns/deleteReturns?returnId=' + row.borrowingId)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findReturnsPaginationList()
          } else {
            ElMessage.error('新增失败')
          }
        })
    }
  }
}
</script>

<style scoped>
.el-form-item .asterisk-left {
  width: 160px !important;
}
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  height: 75px;
}
</style>
