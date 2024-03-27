<template>
  <div>
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
    <span style="margin-left: 70px; height: 100px">
      <span style="position: absolute; top: 640px"> 个人优势&nbsp; </span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
        :rows="4"
        style="width: 1040px; margin-left: 70px"
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

<style></style>
