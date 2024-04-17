<template>
  <div>
    <!-- 发起指标按钮 -->
    <el-row>
      <div class="btn">
        <el-button
          type="primary"
          @click="this.$router.push('/home/mova/insertAssessIndex')"
          >新建指标</el-button
        >
      </div>
    </el-row>
    <!-- form表单条查 -->
    <el-row>
      <el-form
        ref="form"
        :model="assessIndexForm"
        label-width="80px"
        inline="true"
      >
        <el-form-item label="指标名称">
          <el-input
            v-model="assessIndexForm.assessIndexName"
            placeholder="指标名称"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="assessIndexForm.status"
            placeholder="状态"
            style="width: 300px"
          >
            <el-option
              label="全部"
              :value="
                assessIndexForm.status == '0' || assessIndexForm.status == '1'
              "
            ></el-option>
            <el-option label="启用" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="创建时间"
              v-model="assessIndexForm.createTime"
              style="width: 300px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 搜索重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="findAssessIndexListAndPage"
            >查询</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <!-- 表格 -->
      <el-table border :data="assessIndexList" style="width: 100%">
        <el-table-column prop="assessIndexId" label="指标ID" width="180">
        </el-table-column>
        <el-table-column prop="assessIndexName" label="指标名称" width="180">
        </el-table-column>
        <el-table-column prop="indexDescription" width="180" label="指标类型">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.status == 0" type="danger">启用</el-tag>
            <el-tag v-else-if="scope.row.status == 1" type="warning"
              >停用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="detailAssessIndex(scope.row)"
              >停用</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              @click="editAssessIndex(scope.row)"
              >修改</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              @click="deleteAssessIndex(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <GetPagination
        :page-num="assessIndexForm.pageNum"
        :page-size="assessIndexForm.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      // 指标查询表单
      assessIndexForm: {
        pageNum: 1,
        pageSize: 10
      },
      assessIndexId: '',
      //   考核指标列表
      assessIndexList: [],
      // 分页
      total: 0
    }
  },
  created() {
    this.findAssessIndexListAndPage()
  },
  refAssessIndex() {
    this.$router.push('/home/mova/InsertAssessIndex')
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.assessIndexForm.pageSize = val
      this.findAssessIndexListAndPage()
    },
    handleCurrentChange(val) {
      this.assessIndexForm.pageNum = val
      // console.log(this.pageNum)
      this.findAssessIndexListAndPage()
    },
    // 查询考核方法列表和分页
    findAssessIndexListAndPage() {
      axios
        .post('/assessIndex/findAssessIndexListAndPage', this.assessIndexForm)
        .then((res) => {
          this.assessIndexList = res.data.list
          this.total = res.data.total
        })
    },
    // 重置方法
    resetForm() {
      ;(this.assessIndexForm = {}), this.findAssessIndexListAndPage()
    },
    // 发起指标跳转页面
    initiateAssessIndex() {
      this.$router.push('/home/mova/InsertAssessIndex')
    },
    // 详情跳转页面（row）
    detailAssessIndex() {
      if (this.assessIndexForm.status == '1') {
        this.assessIndexForm.status == '0'
        // this.findAssessIndexListAndPage()
      } else {
        this.assessIndexForm.status == '1'
        // this.findAssessIndexListAndPage()
      }
      // this.$router.push({
      //   path: '/initiateAssessIndex',
      //   query: { assessId: row.assessId }
      // })
    },
    // 修改跳转页面（row）
    editAssessIndex(row) {
      this.$router.push({
        path: 'InsertAssessIndex',
        query: { assessIndexId: row.assessIndexId }
      })
    },
    // 删除考核
    deleteAssessIndex(row) {
      axios
        .get(
          '/assessIndex/deleteAssessIndex?assessIndexId=' + row.assessIndexId
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findAssessIndexListAndPage()
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
