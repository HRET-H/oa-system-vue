<template>
  <div>
    关键字：
    <el-input
      placeholder="输入内容"
      v-model="findCondition.candidateName"
      clearable
      style="width: 250px; margin-left: 10px"
    >
    </el-input>
    部门：
    <el-select v-model="findCondition.sysJob.jobDept" placeholder="全部">
      <el-option label="技术部" value="1"></el-option>
      <el-option label="产品部" value="2"></el-option>
      <el-option label="销售部" value="3"></el-option>
      <el-option label="行政部" value="4"></el-option>
    </el-select>
    面试官：
    <el-select v-model="findCondition.sysJob.jobPrincipal" placeholder="全部">
      <el-option label="全职" value="1"></el-option>
      <el-option label="兼职" value="2"></el-option>
      <el-option label="实习" value="3"></el-option>
      <el-option label="外派" value="4"></el-option>
      <el-option label="退休返聘" value="5"></el-option>
    </el-select>
    学历要求：
    <el-select v-model="findCondition.candidateEducation" placeholder="全部">
      <el-option label="不限" value="1"></el-option>
      <el-option label="高中及以下" value="2"></el-option>
      <el-option label="大专" value="3"></el-option>
      <el-option label="本科" value="4"></el-option>
      <el-option label="硕士" value="5"></el-option>
      <el-option label="博士及以上" value="6"></el-option>
    </el-select>
    <br />
    <br />

    申请时间：
    <el-date-picker
      v-model="findCondition.candidateTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>

    <el-button size="small" @click="search()">搜索</el-button>

    <el-button size="small" @click="exportData()">导出</el-button>
    <br /><br />

    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = ''), search()"
    >
      <h1>{{ findConditionByNumberData.sum }}人</h1>
      <span>全部</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 1), search()"
    >
      <h1>{{ findConditionByNumberData.sum1 }}人</h1>
      <span>初筛</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 2), search()"
    >
      <h1>{{ findConditionByNumberData.sum2 }}人</h1>
      <span>待面试</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 3), search()"
    >
      <h1>{{ findConditionByNumberData.sum3 }}人</h1>
      <span>面试中</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 4), search()"
    >
      <h1>{{ findConditionByNumberData.sum4 }}人</h1>
      <span>通过面试</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 5), search()"
    >
      <h1>{{ findConditionByNumberData.sum5 }}人</h1>
      <span>待入职</span>
    </el-button>
    <el-button
      size="small "
      style="width: 100px"
      @click="(findCondition.candidateStatus = 6), search()"
    >
      <h1>{{ findConditionByNumberData.sum6 }}人</h1>
      <span>人才库</span>
    </el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="基本信息">
        <template v-slot="scope">
          <div @click="addPosition(scope.row)">
            <span>{{ scope.row.candidateName }}</span
            >&nbsp;&nbsp;<span>{{ scope.row.jobName }}</span
            >&nbsp;&nbsp; <span>{{ scope.row.candidateTime }}</span
            >&nbsp;&nbsp;<span>{{
              scope.row.candidateStatus == 1
                ? '初筛'
                : scope.row.candidateStatus == 2
                  ? '待面试'
                  : scope.row.candidateStatus == 3
                    ? '面试中'
                    : scope.row.candidateStatus == 4
                      ? '通过面试'
                      : scope.row.candidateStatus == 5
                        ? '待入职'
                        : scope.row.candidateStatus == 6
                          ? '人才库'
                          : '已入职'
            }}</span
            ><br />
            <span>{{ scope.row.candidateSex }}</span
            >&nbsp;|&nbsp;<span>26</span>&nbsp;|&nbsp;<span>{{
              scope.row.candidateExpect
            }}</span
            >&nbsp;&nbsp;<br />
            <span>{{ scope.row.candidateWorkAddres }}</span
            >&nbsp;|&nbsp;<span>2028-06至2031-06</span>&nbsp;&nbsp;
            <span>北京</span>&nbsp;|&nbsp; <span>计算机</span>&nbsp;|&nbsp;
            <span>{{
              scope.row.candidateEducation == 1
                ? '初中'
                : scope.row.candidateEducation == 2
                  ? '高中'
                  : scope.row.candidateEducation == 3
                    ? '大专'
                    : scope.row.candidateEducation == 4
                      ? '本科'
                      : scope.row.candidateEducation == 5
                        ? '硕士'
                        : '博士'
            }}</span
            >&nbsp;|&nbsp; <span>2028-06至2031-06</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200%">
        <template v-slot="scope">
          <el-link
            :underline="false"
            v-if="
              scope.row.candidateStatus == 1 || scope.row.candidateStatus == 6
            "
            type="primary"
            @click="sendinterview(scope.row)"
            >安排面试&nbsp;&nbsp;</el-link
          >
          <el-link
            :underline="false"
            v-if="scope.row.candidateStatus == 4"
            type="primary"
            @click="updateStatusCandidate(5, scope.row)"
            >发offer&nbsp;&nbsp;</el-link
          >
          <el-link
            :underline="false"
            v-if="scope.row.candidateStatus == 5"
            type="primary"
            @click="updateStatusCandidate(7, scope.row)"
            >确认入职&nbsp;&nbsp;</el-link
          >
          <el-link
            :underline="false"
            v-if="
              scope.row.candidateStatus != 5 &&
              scope.row.candidateStatus != 6 &&
              scope.row.candidateStatus != 7
            "
            type="primary"
            @click="updateStatusCandidate(6, scope.row)"
            >淘汰&nbsp;&nbsp;</el-link
          >
          <el-link
            :underline="false"
            v-if="
              scope.row.candidateStatus != 5 &&
              scope.row.candidateStatus != 6 &&
              scope.row.candidateStatus != 7
            "
            type="primary"
            @click="
              updateStatusCandidate(
                stringtoNum(scope.row.candidateStatus),
                scope.row
              )
            "
            >通过&nbsp;&nbsp;</el-link
          >
          <el-link
            :underline="false"
            v-if="scope.row.candidateStatus == 5"
            type="primary"
            @click="updateStatusCandidate(6, scope.row)"
            >放弃&nbsp;&nbsp;</el-link
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dlalogTitel"
      v-model:visible="centerDialogVisible"
      width="40%"
      center
    >
      <h1 style="color: red">你确定要删除吗？</h1>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deletePostMethod()"
            >确 定</el-button
          >
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  data() {
    return {
      tableData: [],
      // 默认显示第几页
      pageNum: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 10,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 5, 10],
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      findConditionByNumberData: '',

      //查询条件
      findCondition: {
        //查询也是
        pageNum: '',
        //查询条数
        pageSize: '',

        //关键字
        candidateName: '',
        //用人部门
        sysJob: {
          jobName: '',
          jobDept: '',
          jobPrincipal: ''
        },

        //学历要求
        candidateEducation: '',
        candidateStatus: '',
        //开始时间
        candidateStartTime: '',
        // 结束时间
        candidateEndTime: '',

        candidateTime: ''
      },
      centerDialogVisible: false,
      dlalogTitel: '',
      deleteById: '',
      jobStatus: ''
    }
  },
  methods: {
    stringtoNum(val) {
      var num = Number(val) + 1
      console.log(num)
      if (num == 6) {
        return 7
      }
      return num
    },
    //安排面试
    sendinterview(row) {
      this.$router.push({ path: '/interview', query: { detailsDate: row } })
    },

    //添加职位
    addCandidate(row, updateflag) {
      this.$router.push({
        path: '/addCandidate',
        query: { detailsDate: row, updateflag: updateflag }
      })
    },
    updateStatusCandidate(Status, row) {
      row.candidateStatus = Status
      axios({
        method: 'post',
        url: '/SysCandidate/updateCandidateState',
        data: row
      }).then((result) => {
        if (result.data.data != null) {
          this.$message.success(result.data.message)
        } else {
          this.$message.error(result.data.message)
        }
        this.centerDialogVisible = false
        this.search()
        this.findConditionByNumber()
      })
    },
    exportData() {
      axios({
        url: '/SysCandidate/exportData',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded', //请求的数据类型为form data格式
        // },
        method: 'POST',
        responseType: 'blob', //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
        data: this.tableData
      }).then((res) => {
        const blob = new Blob([res.data])
        const fileName = '导出候选人.xlsx'
        const linkNode = document.createElement('a')

        linkNode.download = fileName //a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none'
        linkNode.href = URL.createObjectURL(blob) //生成一个Blob URL
        document.body.appendChild(linkNode)
        linkNode.click() //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href) // 释放URL 对象
        document.body.removeChild(linkNode)
      })
    },
    deletePostMethod() {
      axios({
        method: 'post',
        url: '/sysJob/deleteJob',
        data: { jobId: this.deleteById }
      }).then((result) => {
        if (result.data.data != null) {
          this.$message.success(result.data.message)
        } else {
          this.$message.error(result.data.message)
        }
        this.centerDialogVisible = false
        this.search()
      })
    },
    //搜索
    search() {
      if (
        this.findCondition.candidateTime != '' &&
        this.findCondition.candidateTime.length > 0
      ) {
        console.log(this.findCondition.candidateTime)
        this.findCondition.candidateStartTime =
          this.findCondition.candidateTime[0]
        this.findCondition.candidateEndTime =
          this.findCondition.candidateTime[1]
      }
      this.getData(this.pageSize, this.pageNum, this.findCondition)
    },
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData(n1, n2, findCondition) {
      findCondition.pageNum = n2
      findCondition.pageSize = n1
      // findCondition.leaveInitiator = JSON.parse(localStorage.getItem("loginUser")).userId
      // 这里使用axios，使用时请提前引入
      axios
        .post('/recruitCandidate/findByRecruitCandidatePage', findCondition)
        .then((reponse) => {
          console.log(reponse.data.data.list)
          // 将数据赋值给tableData
          this.tableData = reponse.data.data.list
          console.log(this.tableData)
          // 将数据的长度赋值给totalCount
          this.totalCount = reponse.data.data.list
        })
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1, this.findCondition)
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNum = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageNum = val
      // 切换页码时，要获取每页显示的条数
      this.getData(this.pageSize, val, this.findCondition)
    },
    //时间格式
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    findConditionByNumber() {
      axios({
        method: 'post',
        url: '/SysCandidate/findConditionByNumber'
      }).then((result) => {
        this.findConditionByNumberData = result.data.data
      })
    }
  },
  created() {
    //分页查询
    this.getData(this.pageSize, this.pageNum, this.findCondition)
    this.findConditionByNumber()
  }
}
</script>

<style></style>
