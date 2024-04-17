<template>
  <div>
    <PageContainer>
      <el-row>
        <div class="btn" style="line-height: 80px">
          <!-- form表单条查 -->
          <el-form
            ref="form"
            :model="lockerForm"
            label-width="80px"
            inline="true"
          >
            <el-form-item label="案库名称">
              <el-input
                v-model="lockerForm.lockName"
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <!-- 搜索重置按钮 -->
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100px"
                @click="sysLocker()"
                >新增</el-button
              >
              <el-button type="primary" @click="findLockerPaginationList"
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
          :data="lockerList"
          style="width: 100%; margin-top: 80px"
        >
          <el-table-column
            prop="documentationId"
            label="流水号"
          ></el-table-column>
          <el-table-column prop="lockerId" label="案库号"></el-table-column>
          <el-table-column prop="lockName" label="案库名称"></el-table-column>
          <el-table-column prop="ascriptionSect" label="归属全宗">
          </el-table-column>
          <el-table-column prop="wholeSectId" label="全宗号"></el-table-column>
          <el-table-column
            prop="affiliation"
            label="所属公司"
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column prop="updated" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="updateLocker(scope.row)"
                >修改</el-link
              >
              <el-link
                type="primary"
                :underline="false"
                @click="deleteLocker(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <GetPagination
        :page-num="lockerForm.pageNum"
        :page-size="lockerForm.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
      <el-row>
        <!-- 新增 -->
        <el-dialog
          title="添加用户"
          v-model="dialogVisible"
          :label-position="labelPosition"
        >
          <el-form
            ref="form"
            :model="addFindAllList"
            label-width="80px"
            width="30%"
            :rules="rules"
            status-icon
          >
            <el-form-item label="案库号">
              <el-input
                v-model="addFindAllList.lockerId"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="案库名称">
              <el-input
                v-model="addFindAllList.lockName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="归属全宗" style="width: 800px">
              <el-select
                v-model="addFindAllList.affiliationss"
                placeholder="请选择"
                @change="belongssFileList()"
              >
                <el-option label="A" value="1"></el-option>
                <el-option label="B" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="全宗号" style="width: 800px">
              <el-input v-model="holidayVisibe1.data.wholeSectId"></el-input>
            </el-form-item>
            <el-form-item label="全宗名称" style="width: 800px">
              <el-input v-model="holidayVisibe1.data.wholeSectName"></el-input>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button v-if="hidden == 'update'" @click="updatelockerList()"
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
      </el-row>
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
      lockerForm: {
        lockerId: '',
        pageNum: 1,
        pageSize: 10
      },
      wholeSectId: '',
      // 新增
      addFindAllList: {
        wholeSectId: '',
        lockName: '',
        ascriptionSect: '',
        affiliationss: ''
      },

      total: 0,
      hidden: 'create',
      //   考核列表
      lockerList: [],
      //  新增
      findAll: [],
      dialogVisible: false,
      holidayVisibe1: {
        data: {
          sectNumber: '',
          wholeSectName: '',
          holidayType: ''
        }
      }
    }
  },
  //   初始化加载
  created() {
    this.findLockerPaginationList()
  },
  methods: {
    // 选择下拉框内容改变
    belongssFileList() {
      const affiliationss = this.addFindAllList.affiliationss
      console.log(this.addFindAllList.affiliationss)
      axios
        .post(
          '/locker/findLockerPaginationListById?affiliationss=' + affiliationss
        )
        .then((res) => {
          console.log(res)
          const data = res.data
          this.holidayVisibe1 = data
          console.log(this.holidayVisibe1)
        })
    },
    findSuo() {
      axios.post('/locker/findAlll').then((res) => {
        console.log(res)
        this.findAll = res.data
        console.log(this.findAll)
        this.affiliationssList()
      })
    },
    // 分页
    handleSizeChange(val) {
      this.lockerForm.pageSize = val
      this.findLockerPaginationList()
    },
    handleCurrentChange(val) {
      this.lockerForm.pageNum = val
      // console.log(this.pageNum)
      this.findLockerPaginationList()
    },
    // 查询方法列表和分页
    findLockerPaginationList() {
      axios
        .post('/locker/findLockerPaginationList', this.lockerForm)
        .then((res) => {
          // 打印
          console.log(res.data)
          this.lockerList = res.data.list
          this.total = res.data.total
        })
    },
    // 新增
    addWhole() {
      axios.post('/locker/addLocker', this.addFindAllList).then((res) => {
        console.log(this.addFindAllList)
        if (res.data.code == 200) {
          console.log(res)
          //     this.$message({
          //     message: "恭喜你，" + res.data.msg,
          //     type: "success",
          // });
          console.log(1)
          ElMessage.success('新增成功')
          this.findLockerPaginationList()
          this.dialogVisible = false
        } else {
          ElMessage.error('新增失败')
        }
      })
    },
    //修改确定
    updatelockerList() {
      axios.post('/locker/updateLocker', this.addFindAllList).then((res) => {
        if (res.data.code == 200) {
          // this.$message({
          // message: "恭喜你，" + res.data.msg,
          // type: "success",
          // });
          ElMessage.success('修改成功')
          this.findLockerPaginationList()
          this.dialogVisible = false
        } else {
          // this.$message.error("错了哦，" + res.data.msg);
          ElMessage.success('修改失败')
        }
      })
    },

    // 回显
    updateLocker(row) {
      ;(this.hidden = 'update'), (this.dialogVisible = true)
      console.log(row)
      axios.post('/locker/findLock?lockerId=' + row.lockerId).then((res) => {
        console.log(res.data)
        this.addFindAllList = res.data
      })
    },
    // 弹框按钮
    sysLocker() {
      this.dialogVisible = true
      this.hidden = 'create'
    },
    // 删除考核
    deleteLocker(row) {
      axios
        .post('/locker/deleteLocker?lockerId=' + row.lockerId)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功')
            this.findLockerPaginationList()
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
