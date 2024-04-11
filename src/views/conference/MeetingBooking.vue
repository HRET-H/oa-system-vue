<template>
  <div>
    <el-row>
      &nbsp;&nbsp;&nbsp;&nbsp;会议主题：
      <el-input
        placeholder="输入内容"
        clearable
        style="width: 300px; margin-left: 10px; height: 32px"
      ></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp; 会议类型:<el-select
        placeholder="全部"
        style="width: 300px; margin-left: 10px"
      >
        <option label="我发起的" value="1"></option>
        <option label="我主持的" value="2"></option>
        <option label="我参与的" value="3"></option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp; 会议状态:<el-select
        placeholder="全部"
        style="width: 300px; margin-left: 10px"
      >
        <option label="未开始" value="1"></option>
        <option label="进行中" value="2"></option>
        <option label="已结束" value="3"></option>
      </el-select>
      <br />
      <br />
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp; 会议时间：
        <el-date-picker
          v-model="date"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
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
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
