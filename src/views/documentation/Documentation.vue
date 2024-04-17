<template>
  <div style="margin-top: 100px">
    <PageContainer>
      <div class="btn">
        <el-row>
          <el-button type="primary" @click="initiateAddment">新增</el-button>
        </el-row>
        <!-- form表单条查 -->

        <el-form
          ref="form"
          :model="documentationForm"
          label-width="80px"
          inline="true"
        >
          <el-form-item label="档案号">
            <el-input
              v-model="documentationForm.fileNumber"
              placeholder="请输入内容"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="档案标题">
            <el-input
              v-model="documentationForm.fileTitle"
              placeholder="请输入内容"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="借用状态">
            <el-select
              v-model="documentationForm.secrecyGrade"
              placeholder="请选择请假类型"
              style="width: 300px"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="已借出" value="1"></el-option>
              <el-option label="未借出" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销毁状态">
            <el-select
              v-model="documentationForm.smallStates"
              placeholder="请选择请假类型"
              style="width: 300px"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="已销毁" value="1"></el-option>
              <el-option label="未销毁" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择"
                v-model="documentationForm.creationTime"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择"
                v-model="documentationForm.updated"
                style="width: 300px"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 搜索重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="findDocumentationPaginationList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->

      <el-table
        :data="documentationList"
        style="width: 100%; margin-top: 130px"
      >
        <el-table-column
          prop="documentationId"
          label="流水号"
        ></el-table-column>
        <el-table-column prop="fileNumber" label="档案号"></el-table-column>
        <el-table-column prop="fileTitle" label="文件标题"></el-table-column>
        <el-table-column prop="documentNumber" label="文号"> </el-table-column>
        <el-table-column
          prop="ascriptionSect"
          label="归属全宗"
        ></el-table-column>
        <el-table-column prop="sectNumber" label="全宗号"></el-table-column>
        <!-- <el-table-column prop="belongssFile" label="所属案卷"></el-table-column> -->
        <el-table-column prop="belongssFile" label="所属案卷">
          <template v-slot:default="scope">
            {{
              scope.row.belongssFile == 1
                ? '专利文件库'
                : scope.row.belongssFile == 2
                  ? '项目合同库'
                  : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="fileId" label="案卷号"> </el-table-column>
        <el-table-column prop="fileName" label="案卷名称"> </el-table-column>
        <el-table-column prop="fileId" label="案卷号"></el-table-column>
        <el-table-column prop="author" label="提交人"></el-table-column>
        <el-table-column prop="secrecyGrade" label="保密等级"></el-table-column>
        <el-table-column prop="states" label="借用状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.states == 1" type="danger">已借出</el-tag>
            <el-tag v-else-if="scope.row.states == 2" type="warning"
              >未借出</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="smallStates" label="销毁状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.smallStates == 1" type="danger"
              >已销毁</el-tag
            >
            <el-tag v-else-if="scope.row.smallStates == 2" type="warning"
              >未销毁</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column prop="updated" label="更新时间"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="updateDocumentation(scope.row)"
              >修改</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              @click="deleteDocumentation(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <GetPagination
        :page-num="documentationForm.pageNum"
        :page-size="documentationForm.pageSize"
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
      documentationForm: {
        fileNumber: '',
        fileTitle: '',
        secrecyGrade: '',
        smallStates: '',
        creationTime: '',
        updated: '',
        pageNum: 1,
        pageSize: 10
      },
      documentationId: '',
      //   考核列表
      documentationList: [],

      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findDocumentationPaginationList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.documentationForm.pageSize = val
      this.findDocumentationPaginationList()
    },
    handleCurrentChange(val) {
      this.documentationForm.pageNum = val
      // console.log(this.pageNum)
      this.findDocumentationPaginationList()
    },
    // 查询考核方法列表和分页
    findDocumentationPaginationList() {
      axios
        .post(
          '/documentation/findDocumentationPaginationList',
          this.documentationForm
        )
        .then((res) => {
          // 打印
          console.log(res.data)
          this.documentationList = res.data.list
          this.total = res.data.total
        })
    },
    // 发起考核跳转页面
    initiateAddment() {
      this.$router.push('/home/record/AddDocumentation')
    },
    // 修改跳转页面（row）
    updateDocumentation(row) {
      console.log(row.documentationId)
      this.$router.push({
        path: '/home/record/AddDocumentation',
        query: { documentationId: row.documentationId }
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
    deleteDocumentation(row) {
      axios
        .post(
          '/documentation/deleteDocumentation?documentationId=' +
            row.documentationId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findDocumentationPaginationList()
          } else {
            ElMessage.error('删除失败')
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
