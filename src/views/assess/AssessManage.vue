<template>
  <div>
    <page-container>
      <!-- 发起考核按钮 -->
      <div class="btn">
        <el-button type="primary" @click="initiateAssessment"
          >发起考核</el-button
        >
      </div>
      <!-- form表单条查 -->
      <el-form ref="form" :model="assessForm" label-width="80px" inline="true">
        <el-form-item label="计划名称">
          <el-input
            v-model="assessForm.assessName"
            placeholder="计划名称"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="assessForm.status"
            placeholder="状态"
            style="width: 300px"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="未开始" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划类型">
          <el-select
            v-model="assessForm.assessType"
            placeholder="计划类型"
            style="width: 300px"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="周期性" value="1"></el-option>
            <el-option label="非周期性" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考核周期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="考核周期"
              v-model="assessForm.assessTime"
              style="width: 300px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 搜索重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="findAssessListAndPage"
            >查询</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="assessList" style="width: 100%">
        <el-table-column prop="assessName" label="计划日期" width="180">
        </el-table-column>
        <el-table-column prop="assessRange" width="180" label="考核范围">
          <template v-slot:default="scope">
            {{
              scope.row.assessRange == 0
                ? '技术部'
                : scope.row.assessRange == 1
                  ? '产品部'
                  : scope.row.assessRange == 2
                    ? '销售部'
                    : scope.row.assessRange == 3
                      ? '市场部'
                      : scope.row.assessRange == 4
                        ? '人事部'
                        : '其他'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="headId" label="计划负责人"> </el-table-column>
        <el-table-column prop="assessTime" label="考核周期"> </el-table-column>
        <el-table-column prop="assessType" label="计划类型">
          <template v-slot="scope">
            {{
              scope.row.assessType == 0
                ? '周期性'
                : scope.row.assessType == 1
                  ? '非周期性'
                  : '其他'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.status == 0" type="danger">未开始</el-tag>
            <el-tag v-else-if="scope.row.status == 1" type="warning"
              >进行中</el-tag
            >
            <el-tag v-else-if="scope.row.status == 2" type="success"
              >已完成</el-tag
            >
            <el-tag v-else-if="scope.row.status == 3" type="info"
              >已取消</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="detailAssess(scope.row)"
              >详情</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              @click="editAssess(scope.row)"
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
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="assessForm.pageNum"
        :page-size="assessForm.pageSize"
        :total="total"
        background
        layout="prev, pager, next"
      >
      </el-pagination> -->
      <GetPagination
        :page-num="assessForm.pageNum"
        :page-size="assessForm.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </page-container>
  </div>
</template>

<script>
import GetPagination from '@/components/pagination/getPagination.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  components: { GetPagination },
  data() {
    return {
      // 考核查询表单
      assessForm: {
        assessName: '',
        status: '',
        assessType: '',
        assessTime: '',
        pageNum: 1,
        pageSize: 10
      },
      assessId: '',
      //   考核列表
      assessList: [],
      // 分页
      total: 0
    }
  },
  created() {
    this.findAssessListAndPage()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.assessForm.pageSize = val
      this.findAssessListAndPage()
    },
    handleCurrentChange(val) {
      this.assessForm.pageNum = val
      // console.log(this.pageNum)
      this.findAssessListAndPage()
    },
    // 查询考核方法列表和分页
    findAssessListAndPage() {
      axios
        .post(
          'http://localhost:9999/assess/findAssessListAndPage',
          this.assessForm
        )
        .then((res) => {
          this.assessList = res.data.list
          this.total = res.data.total
        })
    },
    // 重置方法
    resetForm() {
      ;(this.assessForm = {}), this.findAssessListAndPage()
    },
    // 发起考核跳转页面
    initiateAssessment() {
      this.$router.push('/home/mova/InitiateAssessmentManager')
    },
    // 详情跳转页面（row）
    detailAssess() {
      // this.$router.push({
      //   path: '/initiateAssessment',
      //   query: { assessId: row.assessId }
      // })
    },
    // 修改跳转页面（row）
    editAssess(row) {
      this.$router.push({
        path: 'InitiateAssessmentManager',
        query: { assessId: row.assessId }
      })
    },
    // 删除考核
    deleteAssess(row) {
      axios
        .get(
          'http://localhost:9999/assess/deleteAssessMent?assessId=' +
            row.assessId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findAssessListAndPage()
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
