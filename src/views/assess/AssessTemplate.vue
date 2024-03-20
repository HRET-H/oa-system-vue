<template>
  <div>
    <page-container>
      <!-- 新建考核模板按钮 -->
      <div class="btn">
        <el-button
          type="primary"
          @click="this.$router.push('/insertAssessTemplate')"
          >新建考核模板</el-button
        >
        <el-input
          v-model="assessTemplateInput"
          style="width: 240px"
          placeholder="Type something"
          :prefix-icon="Search"
          @click="findAssessTemplateListAndPage"
        />
      </div>
      <!-- 表单 -->
      <el-form :model="assessTemplateForm"> </el-form>
      <!-- 表格 -->
      <el-table :data="assessTemplateList" style="width: 100%">
        <el-table-column prop="templateId" label="模板ID"> </el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column prop="scoreMethod" label="评分制" width="180">
          <template v-slot:default="scope">
            {{
              scope.row.scoreMethod == 0
                ? '百分制'
                : scope.row.scoreMethod == 1
                  ? '十分制'
                  : scope.row.scoreMethod == 2
                    ? '五分制'
                    : '其他'
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          width="180"
          label="总分"
        ></el-table-column>
        <el-table-column prop="scoring" label="计分方式">
          <template v-slot:default="scope">
            {{
              scope.row.scoring == 0
                ? '加权计算'
                : scope.row.scoring == 1
                  ? '加和计算'
                  : '其他'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="editAssessTemplate(scope.row)"
              >修改</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              @click="deleteAssessTemplate(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="assessTemplateForm.pageNum"
        :page-size="assessTemplateForm.pageSize"
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
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      // 菜单树
      MenuData: ref([]),

      // 考核模板查询表单
      assessTemplateForm: {
        pageNum: 0,
        pageSize: 10
      },
      templateId: '',
      //   考核列表
      assessTemplateList: [],
      // 分页
      total: 0
    }
  },
  created() {
    this.findAssessTemplateListAndPage()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.assessTemplateForm.pageSize = val
      this.findAssessTemplateListAndPage()
    },
    handleCurrentChange(val) {
      this.assessTemplateForm.pageNum = val
      // console.log(this.assessForm.pageNum)
      this.findAssessTemplateListAndPage()
    },
    // 查询考核方法列表和分页
    findAssessTemplateListAndPage() {
      axios
        .post(
          'http://localhost:9999/assessTemplate/findAssessTemplateListAndPage',
          this.assessTemplateForm
        )
        .then((res) => {
          console.log(res.data)
          this.assessTemplateList = res.data.list
          this.total = res.data.total
        })
    },
    // // 重置方法
    // resetForm() {
    //     this.assessForm = {},
    //         this.findAssessListAndPage();
    // },
    // 详情跳转页面（row）
    // detailAssess() {
    //     // this.$router.push({
    //     //   path: '/initiateAssessment',
    //     //   query: { assessId: row.assessId }
    //     // })
    // },
    // 修改跳转页面（row）
    editAssess(row) {
      this.$router.push({
        path: '/InsertAssessTemplate',
        query: { templateId: row.templateId }
      })
    },
    // 删除考核
    deleteAssessTemplate(row) {
      axios
        .post(
          'http://localhost:9999/assessTemplate/deleteAssessTemplate?templateId=' +
            row.templateId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findAssessTemplateListAndPage()
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
