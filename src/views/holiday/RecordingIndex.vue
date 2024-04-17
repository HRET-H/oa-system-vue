<template>
  <div>
    <PageContainer>
      <!-- <el-row> 表格低-->

      <el-row>
        <div class="btn" style="line-height: 80px">
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
                  placeholder="请输入"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="请假类型">
              <el-select
                v-model="holidayForm.holidayType"
                style="width: 160px"
                placeholder="请选择请假类型"
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
                  style="width: 160px"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="发起时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="发起时间"
                  v-model="holidayForm.lnitiationTime"
                  style="width: 160px"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <!-- 搜索重置按钮 -->
            <el-form-item>
              <el-button type="primary" @click="findHolidayPaginationList"
                >查询</el-button
              >
              <el-button plain @click="exportData()" style="margin-right: 10px"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <br />
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-table border :data="holidayList" style="width: 100%">
          <el-table-column prop="approvalId" label="审批id" width="180">
          </el-table-column>
          <el-table-column prop="holidayName" label="请假人"> </el-table-column>
          <el-table-column prop="holidayType" label="请假类型">
          </el-table-column>
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
      </el-row>
      <GetPagination
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
        holidayName: '',
        holidayType: '',
        endTime: '',
        lnitiationTime: '',
        pageNum: 1,
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
    // 导出
    exportData() {
      // 显示加载指示器（如果有的话）
      // showLoadingIndicator();
      axios({
        method: 'get',
        url: 'http://localhost:9999/recording/exportData',
        params: this.findCondition,
        responseType: 'blob' // 告诉axios期望服务器返回的数据类型
      })
        .then((response) => {
          const blob = response.data
          const fileName = '请假记录导出.xlsx'
          const url = URL.createObjectURL(blob)

          const linkNode = document.createElement('a')
          linkNode.href = url
          linkNode.setAttribute('download', fileName)
          linkNode.style.display = 'none'

          // 触发下载，无需添加到DOM中
          document.body.appendChild(linkNode)
          linkNode.click()

          // 清理
          URL.revokeObjectURL(url)
          document.body.removeChild(linkNode)

          // 隐藏加载指示器（如果有的话）
          // hideLoadingIndicator();
        })
        .catch((error) => {
          // 处理错误，比如显示错误消息给用户
          console.error('下载文件时出错:', error)
          // hideLoadingIndicator(); // 如果之前显示了加载指示器，这里隐藏它
          alert('下载文件时出错，请稍后再试。')
        })
    },

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

<style scoped>
.el-form-item .asterisk-left {
  width: 160px !important;
}
/* 边框低 */
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
