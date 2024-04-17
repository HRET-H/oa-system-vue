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
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="sysWhole()"
                plain
                >新增</el-button
              >
              <el-button type="primary" @click="findWholePaginationList"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-row>

      <!-- 表格 -->
      <el-row>
        <el-table
          border
          :data="wholeList"
          style="width: 100%; margin-top: 80px"
        >
          <el-table-column
            prop="documentationId"
            label="流水号"
          ></el-table-column>
          <el-table-column prop="wholeSectId" label="全宗号"></el-table-column>
          <el-table-column
            prop="wholeSectName"
            label="全宗名称"
          ></el-table-column>
          <el-table-column prop="affiliation" label="所属公司">
          </el-table-column>
          <el-table-column prop="author" label="提交人"></el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column prop="updated" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="updateWhole(scope.row)"
                >修改</el-link
              >
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

      <!-- 新增 -->
      <el-dialog title="添加用户" v-model="dialogVisible">
        <el-form
          ref="form"
          :model="addFindAllList"
          label-width="80px"
          width="30%"
          :rules="rules"
          status-icon
        >
          <el-form-item label="全宗号">
            <el-input
              v-model="addFindAllList.wholeSectId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
                            prop="email"
                            label="姓名"
                            :rules="[
                              { required: true, message: '请输入姓名' },
                              { type:'text',message: '姓名不能为空'}
                            ]"
                          >
                            <el-input v-model="addFindAllList.name"></el-input>
                          </el-form-item> -->

          <el-form-item label="全宗名称">
            <el-input
              v-model="addFindAllList.wholeSectName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="全宗公司">
            <el-input
              v-model="addFindAllList.affiliation"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="案卷号">
            <el-input
              v-model="addFindAllList.documentationId"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属案卷">
            <el-input
              v-model="addFindAllList.belongssFile"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-if="hidden == 'update'" @click="updateWholeList()"
            >确定</el-button
          >
          <el-button
            v-if="hidden == 'create'"
            type="primary"
            @click="addWhole()"
            >确定</el-button
          >
        </el-form-item>
      </el-dialog>
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
      // 新增
      addFindAllList: {
        wholeSectId: '',
        wholeSectName: '',
        affiliation: '',
        belongssFile: ''
      },
      //  rules: {
      //     name: [
      //       { required: true, message: '请输入活动名称', trigger: 'blur' },
      //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //     ]
      //   },
      hidden: 'create',
      //   考核列表
      wholeList: [],
      //  新增
      dialogVisible: false,

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
      axios
        .post('/whole/findWholePaginationList', this.wholeForm)
        .then((res) => {
          // 打印
          console.log(res.data)
          this.wholeList = res.data.list
          this.total = res.data.total
        })
    },
    // 新增
    addWhole() {
      axios.post('/whole/addWhole', this.addFindAllList).then((res) => {
        if (res.data.code == 200) {
          //     this.$message({
          //     message: "恭喜你，" + res.data.msg,
          //     type: "success",
          // });
          ElMessage.success('新增成功')
          this.findWholePaginationList()
          this.dialogVisible = false
        } else {
          this.$message.error('错了哦，' + res.data.msg)
        }
      })
    },
    //修改确定
    updateWholeList() {
      axios.post('/whole/updateWhole', this.addFindAllList).then((res) => {
        if (res.data.code == 200) {
          // this.$message({
          // message: "恭喜你，" + res.data.msg,
          // type: "success",
          // });
          ElMessage.success('修改成功')
          this.findWholePaginationList()
          this.dialogVisible = false
        } else {
          // this.$message.error("错了哦，" + res.data.msg);
          ElMessage.success('修改失败')
        }
      })
    },

    // 回显
    updateWhole(index, row) {
      ;(this.hidden = 'update'), (this.dialogVisible = true)
      axios
        .post('/whole/findWhole?wholeSectId=' + row.wholeSectId)
        .then((res) => {
          console.log(res.data)
          this.addFindAllList = res.data
        })
    },
    // 弹框按钮
    sysWhole() {
      this.dialogVisible = true
      this.hidden = 'create'
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
