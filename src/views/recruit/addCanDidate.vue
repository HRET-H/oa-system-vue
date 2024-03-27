<template>
  <div style="width: 1220px; margin: 0 auto">
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px">|</span>
        <span style="font-size: 26px">职位信息</span>
      </div>
    </h1>
    <br />
    <span style="margin-left: 70px">
      招聘职位&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <span style="margin-left: 270px">
      用人部门&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      添加流程&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">候选人信息</span>
      </div>
    </h1>
    <br />
    <span style="margin-left: 100px">
      姓名&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 300px">
      性别&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      手机号码&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 300px">
      学历&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      出生日期&nbsp;
      <el-date-picker v-model="value4" type="dates" placeholder="请选择日期" />
    </span>
    <span style="margin-left: 430px">
      邮箱&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <br />
    <br />
    <span style="margin-left: 100px">
      民族&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 270px">
      婚姻状况&nbsp;
      <el-select style="width: 350px" placeholder="全部">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 100px">
      籍贯&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 235px">
      参加工作时间&nbsp;
      <el-date-picker v-model="value4" type="dates" placeholder="请选择日期" />
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      <span> 个人优势 &nbsp;</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
        :rows="4"
        style="width: 1050px"
      ></el-input>
    </span>
    <br />
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">求职意向</span>
      </div>
    </h1>
    <br />
    <span style="margin-left: 70px">
      期望职位&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 270px">
      期望薪资&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      工作地点&nbsp;
      <el-input placeholder="请输入内容" style="width: 350px"></el-input>
    </span>
    <span style="margin-left: 270px">
      工作性质&nbsp;
      <el-select placeholder="全部" style="width: 350px">
        <el-option> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      到岗期限&nbsp;
      <span>
        <el-select placeholder="全部" style="width: 350px">
          <el-option> </el-option>
        </el-select>
      </span>
    </span>
    <br />
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">工作经历</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加工作经历</span>
    </div>
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">项目经验</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加项目经验</span>
    </div>
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">培训经历</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加培训经历</span>
    </div>
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">外语能力</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加外语能力</span>
    </div>
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">获奖经历</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加获奖经历</span>
    </div>
    <br />
    <br />
    <h1>
      <div>
        <span style="color: #1890ff; font-size: 36px"><b>|</b></span>
        <span style="font-size: 26px">社交主页</span>
      </div>
    </h1>
    <br />
    <div class="el-timeline">
      <span class="el-timeline-item__tail">+ 添加社交主页</span>
    </div>
    <br />
    <br />
    <div style="margin-left: 910px">
      <el-button style="width: 128px; height: 40px">取消</el-button>
      <el-button
        type="primary"
        style="color: aliceblue; width: 128px; height: 40px"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value4: [],
      textarea: ''
    }
  }
}
</script>

<style>
.el-timeline {
  width: 1100px;
  height: 150px;
  border: 1px solid rgb(210, 210, 210); /* 设置边框为实线且颜色为深灰色 */
  background-color: transparent; /* 设置背景为透明以实现空心效果 */
  position: relative;
  right: -10px;
  text-align: center;
  margin-left: 70px;
}
.el-timeline-item__tail {
  text-align: center;
  line-height: 150px;
}
</style>
