<template>
  <PageContainer>
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
      <el-input
        placeholder="请输入内容"
        v-model="addCanDidate.candidateExpect"
        style="width: 350px"
      ></el-input>
    </span>
    <span style="margin-left: 270px">
      用人部门&nbsp;
      <el-select
        placeholder="全部"
        style="width: 350px"
        v-model="addCanDidate.candidateDepartment"
      >
        <el-option label="技术部" value="1"> </el-option>
        <el-option label="产品部" value="2"> </el-option>
        <el-option label="销售部" value="3"> </el-option>
        <el-option label="行政部" value="4"> </el-option>
      </el-select>
    </span>

    <br />
    <br />
    <span style="margin-left: 70px">
      添加流程&nbsp;
      <el-select
        placeholder="全部"
        style="width: 350px"
        v-model="addCanDidate.candidateStatus"
      >
        <el-option label="等待面试" value="1"> </el-option>
        <el-option label="面试中" value="2"> </el-option>
        <el-option label="面试通过" value="3"> </el-option>
        <el-option label="面试淘汰" value="4"> </el-option>
        <el-option label="待入职" value="5"> </el-option>
        <el-option label="人才库" value="6"> </el-option>
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
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateName"
      ></el-input>
    </span>
    <span style="margin-left: 300px">
      性别&nbsp;
      <el-select
        placeholder="全部"
        style="width: 350px"
        v-model="addCanDidate.candidateSex"
      >
        <el-option label="男" value="1"> </el-option>
        <el-option label="女" value="2"> </el-option>
        <el-option label="不方便透露" value="3"> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      手机号码&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidatePhoneNumber"
      ></el-input>
    </span>
    <span style="margin-left: 300px">
      学历&nbsp;
      <el-select
        placeholder="全部"
        style="width: 350px"
        v-model="addCanDidate.candidateEducation"
      >
        <el-option label="博士及以上" value="1"> </el-option>
        <el-option label="硕士" value="2"> </el-option>
        <el-option label="本科" value="3"> </el-option>
        <el-option label="大专" value="4"> </el-option>
        <el-option label="高中" value="5"> </el-option>
        <el-option label="不限" value="6"> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      出生日期&nbsp;
      <el-date-picker
        v-model="addCanDidate.candidateDateBirth"
        type="datetime"
        style="width: 350px"
        placeholder="请选择日期"
      />
    </span>
    <span style="margin-left: 300px">
      邮箱&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateMailbox"
      ></el-input>
    </span>
    <br />
    <br />
    <span style="margin-left: 100px">
      民族&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateNation"
      ></el-input>
    </span>
    <span style="margin-left: 270px">
      婚姻状况&nbsp;
      <el-select
        style="width: 350px"
        placeholder="全部"
        v-model="addCanDidate.candidateMarriage"
      >
        <el-option label="已婚" value="1"> </el-option>
        <el-option label="未婚" value="2"> </el-option>
        <el-option label="不方便透露" value="3"> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 100px">
      籍贯&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateBirthplace"
      ></el-input>
    </span>
    <span style="margin-left: 235px">
      参加工作时间&nbsp;
      <el-date-picker
        v-model="addCanDidate.candidateWorkDate"
        type="datetime"
        style="width: 350px"
        placeholder="请选择日期"
      />
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      <span> 个人优势 &nbsp;</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="addCanDidate.candidateMerit"
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
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateExpect"
      ></el-input>
    </span>
    <span style="margin-left: 270px">
      期望薪资&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateExpectPay"
      ></el-input>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      工作地点&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateWorkAddres"
      ></el-input>
    </span>
    <span style="margin-left: 270px">
      工作性质&nbsp;
      <el-select
        placeholder="全部"
        style="width: 350px"
        v-model="addCanDidate.candidateNature"
      >
        <el-option label="全职" value="1"> </el-option>
        <el-option label="兼职" value="2"> </el-option>
        <el-option label="实习" value="3"> </el-option>
        <el-option label="外派" value="4"> </el-option>
        <el-option label="退休" value="5"> </el-option>
      </el-select>
    </span>
    <br />
    <br />
    <span style="margin-left: 70px">
      到岗期限&nbsp;
      <el-input
        placeholder="请输入内容"
        style="width: 350px"
        v-model="addCanDidate.candidateExpire"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="addCanDidate.superiority1"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;请输入工作经历"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="addCanDidate.superiority2"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;请添加项目经验"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="superiority3"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;请添加培训经历"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="addCanDidate.superiority4"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;添加外语能力"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="addCanDidate.superiority5"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;添加获奖经历"
      ></el-input>
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
      <el-input
        class="el-timeline-item__tail"
        v-model="addCanDidate.superiority6"
        style="width: 100%; height: 100%"
        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;添加社交主页"
      ></el-input>
    </div>
    <br />
    <br />
    <div style="margin-left: 910px">
      <el-button style="width: 128px; height: 40px" @click="cancel"
        >取消</el-button
      >
      <el-button
        type="primary"
        style="color: aliceblue; width: 128px; height: 40px"
        @click="addCanDidateMethod"
        >确定</el-button
      >
    </div>
  </div>
</PageContainer>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      value4: [],
      textarea: '',
      addCanDidate: {
        candidateId: '',
        candidateStatus: '',
        candidateName: '',
        candidateSex: '',
        candidateAge: '',
        candidateMarriage: '',
        candidatePhone: '',
        candidateMailbox: '',
        candidateAddress: '',
        candidateMerit: '',
        candidateExpect: '',
        candidateExpectPay: '',
        candidateWorkAddres: '',
        candidateWorkDate: '',
        candidateNature: '',
        candidateExpire: '',
        superiority1: '',
        superiority2: '',
        superiority3: '',
        superiority4: '',
        superiority5: '',
        superiority6: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push('/home/recruit/candidate')
    },
    init() {
      this.addCanDidateMethod()
    },
    // 获取用户列表
    addCanDidateMethod() {
      axios
        .post('/recruitCandidate/addRecruitCandidate', this.addCanDidate)
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res)
            console.log('添加成功')
            ElMessage.success('恭喜你，添加成功')
            this.$router.push('/home/recruit/candidate')
          } else {
            console.log(res)
            console.log('添加失败')
            ElMessage.error('添加失败')
          }
        })
    },
    mounted() {
      this.init()
    }
  }
}
</script>

<style scoped>
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
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
