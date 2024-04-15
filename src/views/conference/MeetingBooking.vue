<template>
  <div>
    <el-row>
      &nbsp;&nbsp;&nbsp;&nbsp;会议主题：
      <el-input
        placeholder="输入内容"
        v-model="meeting.conferenceTheme"
        clearable
        style="width: 300px; margin-left: 10px; height: 32px"
      ></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp; 会议类型:<el-select
        placeholder="全部"
        v-model="meeting.conferenceType"
        style="width: 300px; margin-left: 10px"
      >
        <el-option label="我发起的" value="1"></el-option>
        <el-option label="我主持的" value="2"></el-option>
        <el-option label="我参与的" value="3"></el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp; 会议状态:
      <el-select
        placeholder="全部"
        v-model="meeting.conferenceStatus"
        style="width: 300px; margin-left: 10px"
      >
        <el-option label="未开始" value="1"></el-option>
        <el-option label="进行中" value="2"></el-option>
        <el-option label="已结束" value="3"></el-option>
      </el-select>
      <br />
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp; 会议时间：
        <el-date-picker
          v-model="meeting.meetingSumTime"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          range-separator="至"
          value-format="YYYY-MM-DD HH:mm:ss"
          style="width: 300px"
        >
        </el-date-picker>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        <el-button type="primary" @click="search()" style="color: aliceblue"
          >搜索</el-button
        >

        <el-button plain @click="reload()">重置</el-button>
      </span>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="conferenceTheme"
          label="会议主题"
          width="203"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roomName"
          label="会议室"
          width="182"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="meetingTime"
          label="会议时间"
          width="240"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="initiator"
          label="发起人"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="compere"
          label="主持人"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="numberParticipants"
          label="与会人数"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="conferenceStatus"
          label="状态"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <el-button @click="particulars">详情</el-button>
        </el-table-column>
      </el-table>
      <GetPagination
        :page-num="meeting.pageNum"
        :page-size="meeting.pageSize"
        :total="total"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MeetingBooking',
  data() {
    return {
      tableData: [],
      meeting: {
        conferenceTheme: '',
        roomName: '',
        meetingTime: '',
        initiator: '',
        compere: '',
        conferenceType: '',
        numberParticipants: '',
        conferenceStatus: '',
        pageNum: 1,
        pageSize: 10,
        //开始时间
        meetingStartTime: '',
        // 结束时间
        meetingEndTime: '',
        // 时间
        meetingSumTime: ''
      },
      total: 0
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.meeting.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.meeting.pageNum = val
      this.getData()
    },
    // 搜索
    search() {
      if (
        this.meeting.meetingSumTime != '' &&
        this.meeting.meetingSumTime.length > 0
      ) {
        console.log(this.meeting.meetingSumTime)
        this.meeting.meetingStartTime = this.meeting.meetingSumTime[0]
        this.meeting.meetingEndTime = this.meeting.meetingSumTime[1]
      }
      this.getData(
        console.log(this.meeting),
        this.meeting.pageSize,
        this.meeting.pageNum,
        this.meeting
      )
    },
    // 详情的跳转
    particulars() {},
    // 将页码，及每页显示的条数以参数传递提交给后台
    getData() {
      axios
        .post('/MeetingBooking/findMeetingBookingPage', this.meeting)
        .then((reponse) => {
          console.log(reponse)
          this.total = reponse.data.data.total
          // 将数据的长度赋值给totalCount
          // 将数据赋值给tableData
          this.tableData = reponse.data.data.list
        })
    },
    // 重置表单数据
    reload() {
      this.meeting = {
        meetingName: '',
        meetingTime: '',
        meetingPlace: '',
        meetingType: '',
        meetingStatus: '',
        meetingContent: '',
        meetingPeople: '',
        meetingRemark: '',
        pageNum: 1,
        pageSize: 10,
        //开始时间
        meetingStartTime: '',
        // 结束时间
        meetingEndTime: '',
        // 时间
        meetingSumTime: ''
      }
      this.search()
    }
  },
  // 优先执行
  mounted() {
    //分页查询
    this.getData(
      this.meeting.pageSize,
      this.meeting.pageNum,
      this.meetingmeeting
    )
  }
}
</script>

<style scoped>
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
