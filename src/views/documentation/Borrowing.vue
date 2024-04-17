<template>
  <div>
    <PageContainer>
      <el-row>
        <div class="btn" style="line-height: 80px">
          <!-- form表单条查 -->
          <el-form
            ref="form"
            :model="borrowingForm"
            label-width="80px"
            inline="true"
            style="margin-top: 20px"
          >
            <el-form-item label="借阅人">
              <el-input
                v-model="borrowingForm.borrowingName"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <!-- 搜索重置按钮 -->
            <el-form-item>
              <el-button type="primary" @click="findBorrowingPaginationList"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-row>

      <el-row>
        <!-- 表格 -->
        <el-table
          border
          :data="borrowingList"
          style="width: 100%; margin-top: 80px"
        >
          <el-table-column
            prop="documentationId"
            label="流水号"
          ></el-table-column>
          <el-table-column prop="fileNumber" label="档案号"></el-table-column>
          <el-table-column prop="fileTitle" label="文件标题"></el-table-column>
          <el-table-column prop="borrowingName" label="借阅人">
          </el-table-column>
          <el-table-column
            prop="borrowingSecrecy"
            label="保密等级"
          ></el-table-column>
          <el-table-column
            prop="dateApplication"
            label="申请日期"
          ></el-table-column>
          <el-table-column prop="returnDate" label="归还日期"></el-table-column>
          <el-table-column prop="states" label="状态">
            <template v-slot:default="scope">
              <el-tag v-if="scope.row.states == 1" type="danger">已同意</el-tag>
              <el-tag v-else-if="scope.row.states == 2" type="warning"
                >已拒绝</el-tag
              >
              <el-tag v-if="scope.row.states == 3" type="info">审批中</el-tag>
              <!-- <el-tag v-else-if="scope.row.states == 4" type="success" >已同意</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column prop="updated" label="更新日期"> </el-table-column>

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
        <GetPagination
          :page-num="borrowingForm.pageNum"
          :page-size="borrowingForm.pageSize"
          :total="total"
          :handle-current-change="handleCurrentChange"
          :handle-size-change="handleSizeChange"
        />
      </el-row>
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
      borrowingForm: {
        borrowingName: '',
        pageNum: 1,
        pageSize: 10
      },

      states: '',

      borrowingId: '',
      //   考核列表
      borrowingList: [],

      centerDialogVisible: false,
      jobStatus: '',
      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findBorrowingPaginationList()
  },
  methods: {
    // 状态修改
    handleEdits(index, row) {
      console.log(row)
      row.states = 1
      axios.post('/borrowing/updateStatus', row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success('修改成功')
          this.findBorrowingPaginationList()
        } else {
          ElMessage.error('修改失败')
        }
      })
    },
    handleEdite(index, row) {
      console.log(row)
      row.states = 2
      axios.post('/borrowing/updateStatus', row).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success('修改成功')
          this.findBorrowingPaginationList()
        } else {
          ElMessage.error('修改失败')
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.borrowingForm.pageSize = val
      this.findBorrowingPaginationList()
    },
    handleCurrentChange(val) {
      this.borrowingForm.pageNum = val
      // console.log(this.pageNum)
      this.findBorrowingPaginationList()
    },
    // 查询考核方法列表和分页
    findBorrowingPaginationList() {
      axios
        .post('/borrowing/findHolidayDalance', this.borrowingForm)
        .then((res) => {
          // 打印
          console.log(res.data)
          this.borrowingList = res.data.list
          this.total = res.data.total
        })
    },
    // 发起考核跳转页面
    initiateDocumentation() {
      //   this.$router.push('/home/employee_leave/addHolidayIndex')
    },

    // 状态修改
    handleEdit() {
      axios.post('/borrowing/updateStatus').then((res) => {
        if (res.data.code == 200) {
          ElMessage.success('修改成功')
          this.findBorrowingPaginationList()
        } else {
          // this.$message.error("错了哦，" + res.data.msg);
          ElMessage.success('修改失败')
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
