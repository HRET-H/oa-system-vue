<template>
  <div>
    <el-row>
      <div style="font-size: 16px; width: 100%">
        <span style="color: #1890ff">|&nbsp;&nbsp;&nbsp;</span>
        <span>预定会议室</span>
        <div style="margin: 20px; width: 100%; color: #f4f4f4"><hr /></div>
      </div>
      <div style="width: 1600px; height: 138px; background-color: #f8f8f8">
        <span>
          <img
            src="/public/image/MeetingBooking/会议室1.png"
            alt="会议室"
            style="margin-top: 15px; margin-left: 15px"
          />
        </span>
        <span style="font-size: 20px; position: absolute; top: 105px">
          &nbsp; 多媒体演示会议室</span
        >
        <span
          style="
            font-size: 13px;
            color: #637284;
            position: absolute;
            top: 140px;
          "
        >
          &nbsp; &nbsp;坐席20 A栋7楼
        </span>
        <span
          style="
            font-size: 13px;
            color: #637284;
            position: absolute;
            top: 180px;
          "
        >
          <el-button text bg size="small">投影仪</el-button>
          <el-button text bg size="small">白板</el-button>
          <el-button text bg size="small">电脑</el-button>
          <el-button text bg size="small">空调</el-button>
        </span>
        <span
          style="
            font-size: 13px;
            color: #637284;
            position: absolute;
            top: 150px;
            right: 10px;
          "
          >会议日期:2035-09-14 &nbsp;&nbsp;&nbsp;15:30至17:00</span
        >
        <span
          style="
            font-size: 13px;
            color: #637284;
            position: absolute;
            top: 175px;
            right: 10px;
          "
          >会议时长:90分钟</span
        >
      </div>
      <el-col>
        <div width="100%">
          <img
            src="/public/image/MeetingBooking/会议室日程表.png"
            alt="会议室日程表"
          />
        </div>
      </el-col>
      <el-col><br /></el-col>
      <el-col>
        <div style="display: inline">
          主持人:
          <span>
            <CustomTransfer
              :type="type"
              style="display: inline-block"
              :successData="successData"
          /></span>
        </div>
      </el-col>
      <el-col><br /></el-col>
      <el-col>
        <div>
          参会人员：
          <CustomTransfer
            :type="type"
            style="display: inline-block"
            :successData="successData"
          />
        </div>
      </el-col>
      <el-col><br /></el-col>
      <el-col>
        会议主题:
        <el-input
          placeholder="请输入"
          v-model="conferenceTheme"
          style="width: 350px"
        ></el-input>
      </el-col>
      <el-col><br /></el-col>
      <el-col>
        会议描述:
        <el-input
          placeholder="请输入"
          v-model="MeetingDescription"
          style="width: 350px; height: 80px"
        ></el-input>
      </el-col>
      <el-col><br /></el-col>
      <el-col>
        会议通知:
        <el-input
          placeholder="请输入"
          v-model="meetingNotice"
          style="width: 350px"
        ></el-input>
      </el-col>
      <el-col><br /></el-col>
      <el-col><br /></el-col>
      <el-col style="position: absolute; bottom: 15px; right: 10px">
        <el-button
          style="width: 128px; height: 36px"
          type="primary"
          @click="reload"
          >取消</el-button
        >
        <el-button
          style="width: 128px; height: 36px"
          type="primary"
          @click="reload"
          >确定</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: false,
      successData: [],
      MeetingDescription: '给销售部同事演示产品新功能',
      conferenceTheme: '产品演示',
      meetingNotice: '会议提前30分钟'
    }
  },
  methods: {
    reload() {
      this.$router.push({ path: 'myReservation' })
    }
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
