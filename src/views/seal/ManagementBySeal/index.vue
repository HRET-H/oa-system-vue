<template>
  <div class="zong">
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="add()">新建申请</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-form :inline="true" :model="seal" class="demo-form-inline">
              <el-form-item label="用章人">
                <el-input
                  v-model="seal.speople"
                  clearable
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>

              <el-form-item label="印章名称">
                <el-select v-model="seal.sname">
                  <el-option label="全部" value="全部"></el-option>
                  <el-option label="合同章" value="合同章"></el-option>
                  <el-option label="法人章" value="法人章"></el-option>
                  <el-option label="项目章" value="项目章"></el-option>
                  <el-option label="财务章" value="财务章"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="状态">
                <el-select v-model="seal.state">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="申请中" value="1"></el-option>
                  <el-option label="已同意" value="2"></el-option>
                  <el-option label="已拒绝" value="3"></el-option>
                  <el-option label="已撤销" value="4"></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item label="申请日期">
                <el-date-picker
                  v-model="seal.applicationTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="提交时间">
                <el-date-picker
                  v-model="seal.submitTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchList">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column prop="speople" label="用章人"> </el-table-column>
              <el-table-column prop="sname" label="印章名称"> </el-table-column>
              <el-table-column prop="applicationTime" label="申请日期">
              </el-table-column>
              <el-table-column prop="state" label="状态">
                <template v-slot="scope">
                  <el-tag v-if="scope.row.state == '0'" type="danger">
                    全部
                  </el-tag>
                  <el-tag v-if="scope.row.state == '1'" type="">
                    申请中
                  </el-tag>
                  <el-tag v-if="scope.row.state == '2'" type="success">
                    已同意
                  </el-tag>
                  <el-tag v-if="scope.row.state == '3'" type="warning">
                    已拒绝
                  </el-tag>
                  <el-tag v-if="scope.row.state == '4'" type="info">
                    已撤销
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" width="180">
              </el-table-column>
              <el-table-column label="操作" width="250px" align="center">
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >详细</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleupdater(scope.$index, scope.row, 3)"
                    >拒绝</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleupdatea(scope.$index, scope.row, 2)"
                    >同意</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <GetPagination
              :page-num="seal.pageNum"
              :page-size="seal.pageSize"
              :total="total"
              :handle-current-change="handleCurrentChange"
              :handle-size-change="handleSizeChange"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tableData: [],
      seal: {
        sId: '',
        speople: '',
        sname: '',
        phone: '',
        start: '',
        stype: '',
        stamp: '',
        sFile: '',
        sIllustrate: '',
        mail: '',
        applicationTime: '',
        submitTime: '',
        pageNum: 1,
        pageSize: 2
      },
      total: 0
    }
  },
  created() {
    this.searchList()
  },
  methods: {
    searchList() {
      axios.post('/seal/findall', this.seal).then((res) => {
        this.$nextTick(() => {
          console.log(res.data)
          this.tableData = res.data.list
          this.total = res.data.total
        })
        console.log(res.data, 'res1111111111111')
        console.log(this.total, 'res1111111111111')
        console.log(this.seal.sId)
      })
    },
    handleSizeChange(val) {
      this.seal.pageSize = val
      this.searchList()
      console.log(this.pageSize)
    },
    handleCurrentChange(val) {
      this.seal.pageNum = val
      this.searchList()
      console.log(this.pageNum)
    },
    // 同意
    handleupdatea(index, row, sta) {
      console.log(index, row)
      axios
        .post('/seal/updatebyida?id=' + row.sid + '&state=' + sta)
        .then((res) => {
          if (res.status == 200) {
            this.searchList()
          }
        })
    },
    // 拒绝
    handleupdater(index, row, sta) {
      console.log(index, row)
      axios
        .post('/seal/updatebyidr?id=' + row.sid + '&state=' + sta)
        .then((res) => {
          if (res.status == 200) {
            this.searchList()
          }
        })
    },
    add() {
      window.location.href = 'sealAdd'
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({ path: '/sealXiang?id=' + row.sid })
    }
  }
}
</script>

<style>
.zong {
  background-color: #f4f4f4;

  width: 100%;
  height: 100%;
}
.bg-purple-dark {
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  background-color: white;
}
</style>
