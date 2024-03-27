<template>
  <div style="height: 100%">
    <el-button
      @click="addcanDidate()"
      type="primary"
      style="width: 117px; height: 35px; color: aliceblue"
    >
      新增候选人 </el-button
    ><br />
    <br />
    <page-container>
      关键字：
      <el-input
        placeholder="输入内容"
        v-model="findCondition.candidateName"
        clearable
        style="width: 250px; margin-left: 10px"
      >
      </el-input>
      &nbsp;&nbsp;&nbsp;&nbsp; 部门：
      <el-select
        v-model="findCondition.candidateDepartment"
        placeholder="全部"
        style="width: 250px; height: 40px"
      >
        <el-option label="技术部" value="1"></el-option>
        <el-option label="产品部" value="2"></el-option>
        <el-option label="销售部" value="3"></el-option>
        <el-option label="行政部" value="4"></el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp; 面试官：
      <el-select
        v-model="findCondition.candidateNature"
        placeholder="全部"
        style="width: 250px; height: 40px"
      >
        <el-option label="全职" value="1"></el-option>
        <el-option label="兼职" value="2"></el-option>
        <el-option label="实习" value="3"></el-option>
        <el-option label="外派" value="4"></el-option>
        <el-option label="退休返聘" value="5"></el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp; 学历要求：
      <el-select
        v-model="findCondition.candidateEducation"
        placeholder="全部"
        style="width: 250px; height: 40px"
      >
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
        v-model="findCondition.candidateSumTime"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        range-separator="至"
        value-format="YYYY-MM-DD HH:mm:ss"
        style="width: 300px"
      >
      </el-date-picker>
      &nbsp;
      <el-button
        type="primary"
        style="width: 100px; height: 35px; color: aliceblue"
        @click="search()"
        >搜索</el-button
      >
      &nbsp;
      <el-button @click="exportData()" style="width: 100px; height: 35px"
        >导出</el-button
      >
      <br /><br />

      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = ''), search()"
      >
        <div style="font-size: 35px">{{ findConditionByNumberData.job }}人</div>
        <br />
        <span>全部</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 1), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job1 }}人
        </div>
        <br />
        <span>初筛</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 2), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job2 }}人
        </div>
        <br />
        <span>待面试</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 3), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job3 }}人
        </div>
        <br />
        <span>面试中</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 4), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job4 }}人
        </div>
        <br />
        <span>通过面试</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 5), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job5 }}人
        </div>
        <br />
        <span>待入职</span>
      </el-button>
      <el-button
        class="custom-button"
        @click="(findCondition.candidateStatus = 6), search()"
      >
        <div style="font-size: 35px">
          {{ findConditionByNumberData.job6 }}人
        </div>
        <br />
        <p>人才库</p>
      </el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="基本信息">
          <template v-slot="scope">
            <div @click="addPosition(scope.row)">
              <span>{{ scope.row.candidateId }}</span>
              <span>{{ scope.row.candidateName }}</span
              >&nbsp;&nbsp;<span>{{ scope.row.candidateExpect }}</span
              >&nbsp;&nbsp; <span>{{ scope.row.candidateTime }}</span
              >&nbsp;&nbsp;<el-button type="info" plain size="small"
                ><span>{{
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
                }}</span></el-button
              ><br />
              <span>{{ scope.row.candidateSex }}</span
              >&nbsp;|&nbsp;<span
                v-if="scope.row && scope.row.candidateDateBirth"
              >
                {{
                  // 假设 today 和 candidateDateBirth 字符串是标准的日期格式（如 "YYYY-MM-DD"）
                  calculateAge(today, scope.row.candidateDateBirth)
                }}岁</span
              >&nbsp;|&nbsp;<span>{{ scope.row.candidateExpect }}</span
              >&nbsp;&nbsp;<br />
              <span>{{ scope.row.candidateWorkAddres }}</span
              >&nbsp;|&nbsp;<span>{{ scope.row.candidateWorkDate }}</span
              >&nbsp;|&nbsp; <span>{{ scope.row.candidateBirthplace }}</span
              >&nbsp;|&nbsp;
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
              >&nbsp;|&nbsp; <span>{{ scope.row.candidateTime }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="250%">
          <template v-slot="scope">
            <el-link
              :underline="false"
              v-if="
                scope.row.candidateStatus == 1 || scope.row.candidateStatus == 6
              "
              type="primary"
              @click="sendinterview(scope.row)"
              ><el-button type="primary" style="color: aliceblue"
                >安排面试</el-button
              >&nbsp;&nbsp;</el-link
            >
            <el-link
              :underline="false"
              v-if="scope.row.candidateStatus == 4"
              type="primary"
              @click="updateStatusCandidate(5, scope.row)"
              ><el-button type="primary" style="width: 88px; color: aliceblue"
                >发offer</el-button
              >&nbsp;&nbsp;</el-link
            >
            <el-link
              :underline="false"
              v-if="scope.row.candidateStatus == 5"
              type="primary"
              @click="updateStatusCandidate(7, scope.row)"
              ><el-button type="primary" style="color: aliceblue"
                >确认入职</el-button
              >&nbsp;&nbsp;</el-link
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
            <el-link
              :underline="false"
              v-if="scope.row.candidateStatus == 7"
              type="primary"
            >
              <div style="color: black; font-size: 15px">已入职</div>
            </el-link>
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
        </template>
      </el-dialog>
      <GetPagination
        :page-num="findCondition.pageNum"
        :page-size="findCondition.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </page-container>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { ElNotification } from 'element-plus'

export default {
  data() {
    return {
      tableData: [],
      // // 默认显示第几页
      // pageNum: 1,
      // // 总条数，根据接口获取数据长度(注意：这里不能为空)
      total: 0,
      // 默认每页显示的条数（可修改）
      // pageSize: 5,
      findConditionByNumberData: '',

      //查询条件
      findCondition: {
        //查询也是
        pageNum: 1,
        //查询条数
        pageSize: 10,
        //关键字
        candidateName: '',
        //用人部门
        recruitJob: {
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
        // 时间
        candidateTime: '',
        candidateSumTime: ''
      },
      centerDialogVisible: false,
      dlalogTitel: '',
      deleteById: '',
      jobStatus: '',
      today: ''
    }
  },
  methods: {
    // 状态的转换
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
      // 序列化对象为查询参数
      const queryObject = Object.entries(row).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: encodeURIComponent(value) // 对值进行编码，防止特殊字符导致问题
        }),
        {}
      )

      console.log(queryObject.candidateId)
      console.log(queryObject)
      this.$router.push({
        path: 'interview',
        query: { queryObject: queryObject.candidateId }
      })

      console.log(row)
    },
    //添加职位
    addcanDidate(row, updateflag) {
      this.$router.push({
        path: 'addCanDidate',
        query: { detailsDate: row, updateflag: updateflag }
      })
    },
    // 状态的修改
    updateStatusCandidate(Status, row) {
      console.log(row)
      row.candidateStatus = Status
      console.log(Status)
      const updatedRow = {
        candidateId: row.candidateId,
        candidateStatus: row.candidateStatus
      }
      console.log(updatedRow)
      axios
        .post('/recruitCandidate/updateRecruitCandidateStatus', updatedRow)
        .then((result) => {
          if (result.data.code == 200) {
            ElNotification({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            console.log(result.data.msg)
          } else {
            ElNotification({
              title: '失败',
              message: '修改失败',
              type: 'error'
            })
          }
          this.centerDialogVisible = false
          this.search()
          this.findConditionByNumber()
        })
        .catch((error) => {
          // 添加错误处理逻辑
          console.error('Error updating candidate status:', error)
          this.$message.error('Failed to update candidate status.')
        })
    },
    // 导出Excel
    exportData() {
      const data = this.tableData
      console.log(data)
      axios({
        method: 'post',
        url: 'http://localhost:9999/recruitCandidate/exportData',
        data: data,
        responseType: 'blob'
      })
        .then((res) => {
          const blob = new Blob([res.data])
          const fileName = '导出候选人.xlsx'
          const url = URL.createObjectURL(blob)
          const linkNode = document.createElement('a')
          linkNode.href = url
          linkNode.setAttribute('download', fileName)
          linkNode.style.display = 'none'
          document.body.appendChild(linkNode)
          linkNode.click()
          URL.revokeObjectURL(url)
          document.body.removeChild(linkNode)
          console.log(11)
        })
        .catch((error) => {
          console.log(error)
          alert('下载文件时出错，请稍后再试。')
        })
    },
    // 删除
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

    // 分页
    handleSizeChange(val) {
      this.findCondition.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.findCondition.pageNum = val
      // console.log(this.pageNum)
      this.getData()
    },
    //搜索
    search() {
      if (
        this.findCondition.candidateSumTime != '' &&
        this.findCondition.candidateSumTime.length > 0
      ) {
        console.log(this.findCondition.candidateSumTime)
        this.findCondition.candidateStartTime =
          this.findCondition.candidateSumTime[0]
        this.findCondition.candidateEndTime =
          this.findCondition.candidateSumTime[1]
      }
      this.getData(
        console.log(this.findCondition),
        this.findCondition.pageSize,
        this.findCondition.pageNum,
        this.findCondition
      )
    },
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData() {
      axios
        .post(
          '/recruitCandidate/findByRecruitCandidatePage',
          this.findCondition
        )
        .then((reponse) => {
          this.total = reponse.data.data.total
          // 将数据的长度赋值给totalCount
          // 将数据赋值给tableData
          this.tableData = reponse.data.data.list
        })
    },
    //时间格式
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 年龄计算
    getCurrentDate() {
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      let ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    calculateAge(currentDateStr, birthDateStr) {
      // 将字符串转换为 Date 对象
      const currentDate = new Date(currentDateStr)
      const birthDate = new Date(birthDateStr)

      // 计算年龄（按完整年数计算，忽略具体月份和天数）
      let age = currentDate.getFullYear() - birthDate.getFullYear()
      const currentMonth = currentDate.getMonth()
      const birthMonth = birthDate.getMonth()

      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        age--
      }

      return age
    },
    // 查询职位
    findConditionByNumber() {
      axios.post('/recruitCandidate/findConditionByNumber').then((result) => {
        console.log(result.data.data)
        this.findConditionByNumberData = result.data.data
      })
    }
  },
  mounted() {
    //分页查询
    this.getData(
      this.findCondition.pageSize,
      this.findCondition.pageNum,
      this.findCondition
    )
    this.findConditionByNumber()
    this.today = this.getCurrentDate()
  }
}
</script>

<style scoped>
::v-deep .custom-button {
  white-space: pre-line;
  width: 150px;
  height: 80px;
}
</style>
