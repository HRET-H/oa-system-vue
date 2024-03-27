<template>
  <div>
    <!-- 部门树 -->
    <el-aside> </el-aside>
    <!--  主要内容-->
    <el-main>
      <el-button
        @click="addPosition(undefined, true)"
        type="primary"
        style="width: 120px; height: 40px"
      >
        新建职位
      </el-button>
      <br />
      <br />
      负责人:
      <el-input
        placeholder="输入内容"
        v-model="findCondition.jobPrincipal"
        clearable
        style="width: 250px; margin-left: 10px"
      ></el-input>
      部门:
      <el-select
        v-model="findCondition.jobDept"
        placeholder="全部"
        style="width: 250px; margin-left: 10px"
      >
        <el-option label="技术部" value="1"></el-option>
        <el-option label="产品部" value="2"></el-option>
        <el-option label="销售部" value="3"></el-option>
        <el-option label="行政部" value="4"></el-option>
      </el-select>
      职位性质：
      <el-select
        v-model="findCondition.jobNature"
        placeholder="全部"
        style="width: 250px; margin-left: 10px"
      >
        <el-option label="全职" value="1"></el-option>
        <el-option label="兼职" value="2"></el-option>
        <el-option label="实习" value="3"></el-option>
        <el-option label="外派" value="4"></el-option>
        <el-option label="退休返聘" value="5"></el-option>
      </el-select>
      学历要求：
      <el-select
        v-model="findCondition.jobEducation"
        placeholder="全部"
        style="width: 250px; margin-left: 10px"
      >
        <el-option label="不限" value="6"></el-option>
        <el-option label="高中及以下" value="5"></el-option>
        <el-option label="大专" value="4"></el-option>
        <el-option label="本科" value="3"></el-option>
        <el-option label="硕士" value="2"></el-option>
        <el-option label="博士及以上" value="1"></el-option>
      </el-select>
      <br />
      <br />
      发起时间:
      <el-date-picker
        v-model="findCondition.jobSumTime"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
        style="width: 300px"
      >
      </el-date-picker>
      &nbsp;
      <el-button
        plain
        type="primary"
        @click="search()"
        style="margin-right: 10px"
        >搜索</el-button
      >

      <el-button plain @click="exportData()" style="margin-right: 10px"
        >导出</el-button
      >

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="职位信息">
          <template v-slot="scope">
            <div @click="addPosition(scope.row)">
              <span style="font-size: 16px">{{ scope.row.jobName }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 16px"
                >职位ID:{{ scope.row.jobId }}</span
              ><br />
              <span>接受简历:12</span
              >&nbsp;&nbsp;&nbsp;&nbsp;<span>初筛:5</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>待面试:1</span
              >&nbsp;&nbsp;&nbsp;&nbsp;<span>通过面试:2</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>已发offer:14</span>&nbsp;&nbsp;&nbsp;&nbsp;<span
                >人才库:3</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200%">
          <template v-slot="scope">
            <el-link
              :underline="false"
              v-if="scope.row.jobStatus == 1"
              type="primary"
              @click="updateStatusJob(2, scope.row)"
              >停止招聘&nbsp;&nbsp;</el-link
            >
            <el-link
              :underline="false"
              v-if="scope.row.jobStatus == 2"
              type="primary"
              @click="updateStatusJob(1, scope.row)"
              >开始招聘&nbsp;&nbsp;</el-link
            >
            <el-link
              :underline="false"
              type="primary"
              @click="updatePosition(scope.row, true)"
              >编辑&nbsp;&nbsp;</el-link
            >

            <el-link
              :underline="false"
              type="primary"
              v-if="scope.row.jobStatus == 2"
              @click="delete1(scope.row)"
              >删除&nbsp;&nbsp;</el-link
            >

            <el-dialog
              v-model="centerDialogVisible"
              title="dlalogTitel"
              width="500"
              :before-close="handleClose"
            >
              <span>你确定要删除吗？</span>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="centerDialogVisible = false"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="deletePostMethod(scope.row)"
                  >
                    确定
                  </el-button>
                </div>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import moment from 'moment'

export default {
  data() {
    return {
      tableData: [],
      // 默认显示第几页
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 10,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 5, 10],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      JobId: '',
      //查询条件
      findCondition: {
        //查询也是
        pageNum: '',
        //查询条数
        pageSize: '',
        //负责人
        jobPrincipal: '',
        //用人部门
        jobDept: '',
        //职位性质
        jobNature: '',
        //学历要求
        jobEducation: '',
        //开始时间
        jobStartTime: '',
        // 结束时间
        jobEndTime: '',
        // 时间
        jobSumTime: ''
      },
      centerDialogVisible: false,
      dlalogTitel: '',
      deleteById: '',
      jobStatus: ''
    }
  },
  methods: {
    updatePosition(row) {
      console.log(row)
      this.$router.push({
        path: '/home/recruit/addPositionManage',
        query: {
          JobId: row.jobId
        }
      })
      console.log(row)
    },
    // 判断是否删除
    delete1(row) {
      this.centerDialogVisible = true
      console.log(row)
      console.log(row.jobId)
      this.deleteById = row.jobId
      console.log(this.centerDialogVisible)
      this.dlalogTitel = '删除'
      // ;(centerDialogVisible = true),
      //   (dlalogTitel = '删除'),
      //   (deleteById = scope.row.jobId)
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
    // 修改职位状态
    updateStatusJob(jobStatus, row) {
      console.log(row)
      const updatedRow = {
        jobId: row.jobId,
        jobStatus: jobStatus
      }
      axios
        .post('http://localhost:9999/recruitJob/updateJob', updatedRow)
        .then((result) => {
          console.log(row)
          if (result.data.code == 200) {
            ElMessage.success('修改状态成功')
            this.search()
          } else {
            ElMessage.error('修改状态失败')
          }
          this.centerDialogVisible = false
        })
    },
    // 职位导出
    exportData() {
      // 显示加载指示器（如果有的话）
      // showLoadingIndicator();
      axios({
        method: 'get',
        url: 'http://localhost:9999/recruitJob/exportData',
        params: this.findCondition,
        responseType: 'blob' // 告诉axios期望服务器返回的数据类型
      })
        .then((response) => {
          const blob = response.data
          const fileName = '导出职位.xlsx'
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
    // 删除职位
    deletePostMethod(row) {
      console.log(row)
      console.log(row.jobId)
      axios
        .post('http://localhost:9999/recruitJob/deleteJob?JobId=' + row.jobId)
        .then((result) => {
          if (result.data.code == 200) {
            ElMessage.success('删除成功')
            this.search()
          } else {
            ElMessage.error('删除失败')
          }
          this.centerDialogVisible = false
          this.search()
        })
    },
    // 搜索
    search() {
      if (
        this.findCondition.jobSumTime != '' &&
        this.findCondition.jobSumTime.length > 0
      ) {
        console.log(this.findCondition.jobSumTime)
        this.findCondition.jobStartTime = this.findCondition.jobSumTime[0]
        this.findCondition.jobEndTime = this.findCondition.jobSumTime[1]
      }
      console.log(this.findCondition.jobStartTime)
      this.getData(this.pageSize, this.pageNum, this.findCondition)
    },
    //分页
    getData(n1, n2, findCondition) {
      findCondition.pageNum = n2
      findCondition.pageSize = n1
      axios
        .post('http://localhost:9999/recruitJob/findPage', findCondition)
        .then((res) => {
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.total
        })
    },
    // 分页
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.getData(this.pageSize, this.pageNum, this.findCondition)
      this.pageNum = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getData(this.pageSize, this.pageNum, this.findCondition)
    },
    // 时间格式
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  // 打开就执行查询
  mounted() {
    this.search()
  }
}
</script>

<style></style>
