<template>
  <div>
    <PageContainer>
      <el-row>
        <div class="btn" style="line-height: 80px">
          <!-- form表单条查 -->
          <el-form
            ref="form"
            :model="wholeForm"
            label-width="80px"
            inline="true"
          >
            <el-form-item label="全宗名称">
              <el-input
                v-model="wholeForm.wholeSectName"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属公司">
              <el-input
                v-model="wholeForm.affiliation"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <!-- 搜索重置按钮 -->
            <el-form-item>
              <el-button type="primary" @click="findWholePaginationList"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-row>

      <el-row>
        <!-- 表格 -->
        <el-table
          border
          :data="wholeList"
          style="width: 100%; margin-top: 80px"
        >
          <el-table-column
            prop="documentationId"
            label="流水号"
          ></el-table-column>
          <el-table-column prop="fileId" label="案卷号"> </el-table-column>
          <el-table-column prop="fileName" label="案卷名称"> </el-table-column>
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
          <el-table-column prop="wholeSectId" label="全宗号"></el-table-column>
          <el-table-column
            prop="wholeSectName"
            label="全宗名称"
          ></el-table-column>
          <el-table-column prop="lockerId" label="案卷号"></el-table-column>
          <el-table-column prop="lockName" label="案卷名称"></el-table-column>
          <el-table-column
            prop="secrecyGrade"
            label="保密等级"
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column prop="updated" label="更新时间"> </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="deleteWhole(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <GetPagination
        :page-num="wholeForm.pageNum"
        :page-size="wholeForm.pageSize"
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
      wholeForm: {
        wholeSectName: '',
        affiliation: '',
        pageNum: 1,
        pageSize: 10
      },
      wholeSectId: '',

      hidden: 'create',
      //   考核列表
      wholeList: [],

      total: 0
    }
  },
  //   初始化加载
  created() {
    this.findWholePaginationList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.wholeForm.pageSize = val
      this.findWholePaginationList()
    },
    handleCurrentChange(val) {
      this.wholeForm.pageNum = val
      // console.log(this.pageNum)
      this.findWholePaginationList()
    },
    // 查询考核方法列表和分页
    findWholePaginationList() {
      axios.post('/documentation/find', this.wholeForm).then((res) => {
        // 打印
        console.log(res.data)
        this.wholeList = res.data.list
        this.total = res.data.total
      })
    },

    // 删除考核
    deleteWhole(row) {
      axios
        .post('/whole/deleteWhole?wholeSectId=' + row.wholeSectId)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findWholePaginationList()
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
