<template>
  <div>
    <page-container>
      <div class="btn">
        <!-- form表单条查 -->
        <el-form
          ref="form"
          :model="holidayForm"
          label-width="80px"
          inline="true"
        >
          <el-form-item>
            <el-form-item label="请假人">
              <el-input
                v-model="holidayForm.holidayName"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="请假类型">
            <el-select
              v-model="holidayForm.holidayType"
              placeholder="请选择请假类型"
              style="width: 300px"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="事假" value="1"></el-option>
              <el-option label="年假" value="2"></el-option>
              <el-option label="病假" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="完成时间"
                v-model="holidayForm.endTime"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="发起时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="发起时间"
                v-model="holidayForm.lnitiationTime"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 搜索重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="findHolidayPaginationList"
              >查询</el-button
            >
            <el-button type="primary" @click="handleExport">导出</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table :data="holidayList" style="width: 100%">
        <el-table-column prop="approvalId" label="审批id" width="180">
        </el-table-column>
        <el-table-column prop="holidayName" label="请假人"> </el-table-column>
        <el-table-column prop="holidayType" label="请假类型"> </el-table-column>
        <el-table-column prop="holidayDuration" label="请假时长">
        </el-table-column>
        <el-table-column prop="lnitiationTime" label="发起时间">
        </el-table-column>
        <el-table-column prop="endTime" label="完成时间"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="deleteHoliday(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="holidayForm.pageNum"
        :page-size="holidayForm.pageSize"
        :total="total"
        background
        layout="prev, pager, next"
      >
      </el-pagination>
    </page-container>
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
        holidayName: '',
        holidayType: '',
        endTime: '',
        lnitiationTime: '',
        pageNum: 0,
        pageSize: 10
      },
      approvalId: '',
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
          'http://localhost:9999/recording/findRecordingPaginationList',
          this.holidayForm
        )
        .then((res) => {
          console.log(res.data)
          this.holidayList = res.data.list
          this.total = res.data.total
        })
    },

    /** 导出按钮操作 */
    handleExport() {},
    // 删除考核
    deleteHoliday(row) {
      axios
        .post(
          'http://localhost:9999/recording/deleteRecording?approvalId=' +
            row.approvalId
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

<style>
.el-form-item .asterisk-left {
  width: 160px !important;
}

.btn {
  width: 100%;
  height: 75px;
}
</style>
