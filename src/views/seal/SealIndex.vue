<template>
  <div>
    <page-container>
      <!-- 发起考核按钮 -->
      <div class="btn">
        <!-- <el-button type="primary" @click="initiateSealment"
          >新增用章类型</el-button
        > -->
        <!-- form表单条查 -->
        <el-form ref="form" :model="sealForm" label-width="80px" inline="true">
          <el-form-item label="用章人">
            <el-input
              v-model="sealForm.sealName"
              placeholder="请输入内容"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="用章名称">
            <el-select v-model="holidayForm.sealTitle" style="width: 300px">
              <el-option label="全部"></el-option>
              <el-option label="合同章" value="1"></el-option>
              <el-option label="法人章" value="2"></el-option>
              <el-option label="项目章" value="3"></el-option>
              <el-option label="财务章" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="holidayForm.state" style="width: 300px">
              <el-option label="全部"></el-option>
              <el-option label="申请中" value="0"></el-option>
              <el-option label="已同意" value="1"></el-option>
              <el-option label="已拒绝" value="2"></el-option>
              <el-option label="已撤销" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="申请时间"
                v-model="holidayForm.dateOfPplication"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="提交时间"
                v-model="holidayForm.submissionTime"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 搜索重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="findSealPaginationList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table :data="sealList" style="width: 100%">
        <el-table-column
          prop="sealName"
          label="用章人"
          width="180"
        ></el-table-column>
        <el-table-column prop="sealTitle" label="用章名称"> </el-table-column>
        <el-table-column prop="dateOfPplication" label="申请日期">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.state == 0" type="danger">未开始</el-tag>
            <el-tag v-else-if="scope.row.state == 1" type="warning"
              >审批中</el-tag
            >
            <el-tag v-else-if="scope.row.state == 2" type="success"
              >已同意</el-tag
            >
            <el-tag v-else-if="scope.row.state == 3" type="info">已拒绝</el-tag>
            <el-tag v-else-if="scope.row.state == 4" type="info">已撤销</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="submissionTime" label="提交时间">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <!-- <el-link
              type="primary"
              :underline="false"
              @click="editSeal(scope.row)"
              >修改</el-link
            > -->
            <el-link
              type="primary"
              :underline="false"
              @click="deleteSeal(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="sealForm.pageNum"
        :page-size="sealForm.pageSize"
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
      sealForm: {
        sealName: '',
        sealTitle: '',
        state: '',
        dateOfPplication: '',
        submissionTime: '',
        pageNum: 0,
        pageSize: 10
        // sealType: '',
      },
      sealId: '',
      //   考核列表
      sealList: [],

      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findSealPaginationList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.sealForm.pageSize = val
      this.findSealPaginationList()
    },
    handleCurrentChange(val) {
      this.sealForm.pageNum = val
      console.log(this.pageNum)
      this.findSealPaginationList()
    },
    // 查询考核方法列表和分页
    findSealPaginationList() {
      axios
        .post(
          'http://localhost:9999/seal/findSealPaginationList',
          this.sealForm
        )
        .then((res) => {
          console.log(res.data)
          this.sealList = res.data.list
          this.total = res.data.total
        })
    },
    // 发起考核跳转页面
    // initiateSealment() {
    //   this.$router.push('/home/employee_leave/addHolidayIndex')
    // },
    // 修改跳转页面（row）
    // editSeal(row) {
    //   this.$router.push({
    //     path: '/addHolidayIndex',
    //     query: { sealId: row.sealId }
    //   })
    // },
    // 添加职位
    // addPosition(row, updateflag) {
    //   console.log(row)
    //   this.$router.push({
    //     path: '/home/recruit/addPositionManage',
    //     params: {
    //       detailsDate: 'row',
    //       jobName: 'row.jobName',
    //       jobStatus: 'row.jobStatus',
    //       jobId: 'row.jobId',
    //       updateflag: updateflag
    //     }
    //   })
    // },

    // updateStatusJob(jobStatus, row) {
    //   row.jobStatus = status
    //   axios
    //     .post('http://localhost:9999/recruitJob/updateJob', row)
    //     .then((result) => {
    //       console.log(row)
    //       if (result.data.code == 200) {
    //         ElMessage.success('修改状态成功')
    //         this.search()
    //       } else {
    //         ElMessage.error('修改状态失败')
    //       }
    //       this.centerDialogVisible = false
    //     })
    // },

    // 删除考核
    deleteSeal(row) {
      axios
        .post('http://localhost:9999/seal/deleteSeal?sealId=' + row.sealId)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findSealPaginationList()
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
