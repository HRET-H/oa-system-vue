<template>
  <div class="zong">
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="add()">新建印章</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-form :inline="true" :model="library" class="demo-form-inline">
              <el-form-item label="印章名称">
                <el-input
                  v-model="library.sName"
                  clearable
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="责任人">
                <el-input
                  v-model="library.responsible"
                  clearable
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-select v-model="library.state">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="已借出" value="1"></el-option>
                  <el-option label="未借出" value="2"></el-option>
                  <el-option label="已封存" value="3"></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item label="创建日期">
                <el-date-picker
                  v-model="library.creationTime"
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
              border
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column prop="sname" label="印章名称"> </el-table-column>
              <el-table-column prop="responsible" label="责任人">
              </el-table-column>
              <el-table-column prop="state" label="状态">
                <template v-slot="scope">
                  <el-tag v-if="scope.row.state == '0'" type=""> 全部 </el-tag>
                  <el-tag v-if="scope.row.state == '1'" type="warning">
                    已借出
                  </el-tag>
                  <el-tag v-if="scope.row.state == '2'" type="success">
                    未借出
                  </el-tag>
                  <el-tag v-if="scope.row.state == '3'" type="info">
                    已封存
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"> </el-table-column>
              <el-table-column prop="creationTime" label="创建时间" width="180">
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    @click="handleupdater(scope.$index, scope.row)"
                    >修改</el-button
                  >

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handledel(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <GetPagination
              :page-num="library.pageNum"
              :page-size="library.pageSize"
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
      library: {
        id: '',
        sname: '',
        responsible: '',
        state: '',
        remark: '',
        creationTime: '',
        pageNum: 1,
        pageSize: 2,
        total: 0
      }
    }
  },
  created() {
    this.searchList()
  },
  methods: {
    searchList() {
      axios.post('/library/findall', this.library).then((res) => {
        this.$nextTick(() => {
          this.tableData = res.data.list
          this.total = res.data.total
        })
        console.log(res.data, 'res1111111111111')
        console.log(this.total, 'res1111111111111')
        console.log(this.library.sId)
      })
    },
    handleSizeChange(val) {
      this.library.pageSize = val
      this.searchList()
      console.log(this.pageSize)
    },
    handleCurrentChange(val) {
      this.library.pageNum = val
      this.searchList()
      console.log(this.pageNum)
    },
    // 删除
    handledel(index, row) {
      console.log(index, row)
      axios.post('/library/del?id=' + row.id).then((res) => {
        if (res.status == 200) {
          this.searchList()
        }
      })
    },
    //
    handleupdater(index, row) {
      console.log(index, row)
      //  window.location.href = "sealVaultup?id="+row.id;

      this.$router.push({ path: '/sealLibraryUpdate?id=' + row.id })
    },
    add() {
      window.location.href = '/home/seal/sealLibraryAdd'
    }
  }
}
</script>

<style scoped>
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
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
