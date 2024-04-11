<template>
  <div>
    <!-- 发起评分设置按钮 -->
    <div class="btn">
      <el-popover
        placement="bottom"
        width="200"
        trigger="manual"
        :visible="visible"
      >
        <el-button @click="scoreForm = true">评分制</el-button>
        <el-button @click="leaveForm = true">等级制</el-button>
        <template #reference>
          <el-button class="m-2" @Click="visible = !visible"
            >新建评分机制</el-button
          >
        </template>
      </el-popover>
      <!-- 隐藏弹框 -->
      <!-- Form -->
      <el-dialog title="新增评分方式" v-model="scoreForm">
        <el-form :model="Assessform" lable-position="left">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.scoreName"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="评分区间" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.scoreBands"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input
            >分
          </el-form-item>
          <el-form-item label="保留小数" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.keepDecimals"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input
            >位
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <div class="dialog-footer">
            <el-button @click="scoreForm = false">取 消</el-button>
            <el-button type="primary" @click="addAssessScore()"
              >确 定</el-button
            >
          </div>
        </template>
      </el-dialog>
      <!--  -->
      <el-dialog title="新增评分方式" v-model="leaveForm">
        <el-form :model="Assessform">
          <el-form-item label="等级制名称" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.hierarchyName"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="等级名称" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.leaveName"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input
            >分
          </el-form-item>
          <el-form-item label="等级说明" :label-width="formLabelWidth">
            <el-input
              v-model="Assessform.leaveIllustrate"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></el-input
            >位
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <div class="dialog-footer">
            <el-button @click="leaveForm = false">取 消</el-button>
            <el-button type="primary" @click="addAssessScore()"
              >确 定</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table :data="assessScoreList" style="width: 100%">
      <el-table-column prop="scoreName" label="评分名称" width="180">
      </el-table-column>
      <el-table-column prop="scoreBands" width="180" label="评分区间">
      </el-table-column>
      <el-table-column prop="keepDecimals" label="保留小数"> </el-table-column>
      <el-table-column prop="createBy" label="创建人"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot:default="scope">
          <el-tag v-if="scope.row.status == 0" type="danger">启用</el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="warning">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="detailAssessScore(scope.row)"
            >停用</el-link
          >
          <el-link
            type="primary"
            :underline="false"
            @click="editAssessScore(scope.row)"
            >修改</el-link
          >
          <el-link
            type="primary"
            :underline="false"
            @click="deleteAssessScore(scope.row)"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <GetPagination
      :page-num="Assessform.pageNum"
      :page-size="Assessform.pageSize"
      :total="total"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      Assessform: {
        pageNum: 1,
        pageSize: 5
      },
      assessScoreId: '',
      // 评分设置查询表单
      //   考核列表
      assessScoreList: [],
      // 分页
      total: 0,
      scoreForm: false,
      leaveForm: false,
      visible: false
    }
  },
  created() {
    this.findAssessScoreListAndPage()
  },
  methods: {
    scoreBtn() {
      this.scoreForm = true
    },
    leaveBtn() {
      this.leaveForm = true
    },
    // 分页
    handleSizeChange(val) {
      this.Assessform.pageSize = val
      this.findAssessScoreListAndPage()
    },
    handleCurrentChange(val) {
      this.Assessform.pageNum = val
      // console.log(this.pageNum)
      this.findAssessScoreListAndPage()
    },
    // 查询考核方法列表和分页
    findAssessScoreListAndPage() {
      axios
        .post('/assessScore/findAssessScoreListAndPage', this.Assessform)
        .then((res) => {
          console.log(res)
          this.assessScoreList = res.data.list
          this.total = res.data.total
        })
    },
    addAssessScore() {
      axios
        .post('/assessScore/addAssessScore', this.InsertAssessIndexForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            // this.$message({
            //   message: '新增成功',
            //   type: 'success'
            // })
            ;(this.scoreForm = false), (this.leaveForm = false)
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    editAssessScore(row) {
      axios
        .get(
          '/assessScore/findAssessScoreById?assessScoreId=' + row.assessScoreId
        )
        .then((res) => {
          console.log(res)
          this.Assessform = res.data
          ;(this.scoreForm = false), (this.leaveForm = false)
          // console.log(this.InsertAssessIndexForm)
        })
    },
    // 重置方法
    resetForm() {
      ;(this.Assessform = {}), this.findAssessScoreListAndPage()
    },
    // // 发起考核跳转页面
    // initiateAssessment() {
    //   this.$router.push('/home/mova/InitiateAssessmentManager')
    // },
    // 详情跳转页面（row）
    // detailAssess() {
    // this.$router.push({
    //   path: '/initiateAssessment',
    //   query: { assessId: row.assessId }
    // })
    // },
    // // 修改跳转页面（row）
    // editAssess(row) {
    //   this.$router.push({
    //     path: 'InitiateAssessmentManager',
    //     query: { assessId: row.assessId }
    //   })
    // },
    // 删除考核
    deleteAssessScore(row) {
      axios
        .get(
          '/assessScore/deleteAssessScore?assessScoreId=' + row.assessScoreId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findAssessScoreListAndPage()
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
