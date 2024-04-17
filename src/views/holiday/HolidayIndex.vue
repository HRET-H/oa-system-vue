<template>
  <div>
    <PageContainer>
      <el-row>
        <!-- 发起考核按钮 -->
        <div class="btn" style="line-height: 80px">
          <div style="float: left">
            <el-button type="primary" @click="initiateHolidayment"
              >新增假期类型</el-button
            >
          </div>

          <div style="float: right">
            <!-- form表单条查 -->
            <el-form
              ref="form"
              :model="holidayForm"
              label-width="80px"
              inline="true"
            >
              <el-form-item>
                <el-input
                  v-model="holidayForm.holidayType"
                  placeholder="请输入关键词"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <!-- 搜索重置按钮 -->
              <el-form-item>
                <el-button type="primary" @click="findHolidayPaginationList"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-table border :data="holidayList" style="width: 100%">
          <el-table-column prop="holidayType" label="假期类型" width="180">
          </el-table-column>
          <!--  -->

          <el-table-column prop="holidayDuration" label="单位时长">
          </el-table-column>
          <el-table-column prop="balanceRules" label="余额规则">
          </el-table-column>
          <el-table-column prop="scopeOfApplication" label="适用范围">
            <template v-slot:default="scope">
              {{
                scope.row.scopeOfApplication == 1
                  ? '全公司考勤'
                  : scope.row.scopeOfApplication == 2
                    ? '技术部考勤'
                    : scope.row.scopeOfApplication == 3
                      ? '产品部考勤'
                      : scope.row.scopeOfApplication == 4
                        ? '销售部考勤'
                        : ''
              }}
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <!-- <el-link
              type="primary"
              :underline="false"
              @click="detailHoliday(scope.row)"
              >详情</el-link
            > -->
              <el-link
                type="primary"
                :underline="false"
                @click="updateHoliday(scope.row)"
                >修改</el-link
              >
              <el-link
                type="primary"
                :underline="false"
                @click="deleteAssess(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <GetPagination
        style="top: 10px"
        :page-num="holidayForm.pageNum"
        :page-size="holidayForm.pageSize"
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
      holidayForm: {
        pageNum: 1,
        pageSize: 10,
        holidayType: ''
      },
      holidayId: '',
      //   考核列表
      holidayList: [],

      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findHolidayPaginationList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.holidayForm.pageSize = val
      this.findHolidayPaginationList()
    },
    handleCurrentChange(val) {
      this.holidayForm.pageNum = val
      console.log(this.pageNum)
      this.findHolidayPaginationList()
    },
    // 查询考核方法列表和分页
    findHolidayPaginationList() {
      axios
        .post(
          'http://localhost:9999/holiday/findHolidayPaginationList',
          this.holidayForm
        )
        .then((res) => {
          console.log(res.data)
          this.holidayList = res.data.list
          this.total = res.data.total
        })
    },
    // 发起考核跳转页面
    initiateHolidayment() {
      this.$router.push('/home/employee_leave/addHolidayIndex')
    },
    // 修改跳转页面（row）
    updateHoliday(row) {
      console.log(row.holidayId)
      this.$router.push({
        path: '/home/employee_leave/addHolidayIndex',
        query: { holidayId: row.holidayId }
      })
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
    deleteAssess(row) {
      axios
        .post(
          'http://localhost:9999/holiday/deleteHoliday?holidayId=' +
            row.holidayId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findHolidayPaginationList()
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
