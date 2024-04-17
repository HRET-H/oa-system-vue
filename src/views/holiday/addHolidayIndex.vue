<template>
  <div style="height: 1260px">
    <!-- 发起考核表单 -->
    <el-form
      ref="form"
      :model="initiateHolidayForm"
      :label-position="labelPosition"
      label-width="80px"
      size="large"
    >
      <div class="title">
        <h1>基本信息</h1>
      </div>
      <el-form-item label="假期类型" style="width: 800px">
        <el-input v-model="initiateHolidayForm.holidayType"></el-input>
      </el-form-item>
      <el-form-item label="适用范围" style="width: 800px">
        <el-select
          v-model="initiateHolidayForm.scopeOfApplication"
          placeholder="请选择"
        >
          <el-option label="全公司考勤" value="1"></el-option>
          <el-option label="技术部考勤" value="2"></el-option>
          <el-option label="产品部考勤" value="3"></el-option>
          <el-option label="销售部考勤" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="余额规则" style="width: 800px">
        <el-input v-model="initiateHolidayForm.balanceRules"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <CustomTransfer :type="type" :head="head" />
      </el-form-item>
      <el-form-item label="单位时长" style="width: 200px">
        <el-select
          v-model="initiateHolidayForm.holidayDuration"
          placeholder="请选择"
        >
          <el-option label="天" value="0"></el-option>
          <el-option label="小时" value="1"></el-option>
          <el-option label="半天" value="2"></el-option>
          <el-option label="分钟" value="3"></el-option>
        </el-select>
      </el-form-item>
      <span style="color: #989daa">一天折算为</span
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>工作时长</span>
      <el-input-number
        label="一天折算为"
        v-model="initiateHolidayForm.oneConversion"
        :min="1"
        :max="10"
        controls-position="right"
        size="large"
      >
      </el-input-number>
      <span>小时</span>

      <el-form-item label="是否限额">
        <el-radio-group v-model="initiateHolidayForm.limitss" class="ml-4">
          <el-radio value="0" size="large">限额 </el-radio>
          <el-radio value="1" size="large">不限额 </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="title">
        <h1>使用规则</h1>
      </div>
      <el-form-item label="是否限额">
        <el-radio-group v-model="initiateHolidayForm.holidayProve" class="ml-4">
          <el-radio value="0" size="large">无需证明 </el-radio>
          <el-radio value="1" size="large">证明 </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="请假日期">
        <el-radio-group v-model="initiateHolidayForm.holidayDate" class="ml-4">
          <el-radio value="0" size="large">工作日 </el-radio>
          <el-radio value="1" size="large">休息日 </el-radio>
          <el-radio value="2" size="large">节假日 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最小时长">
        <el-radio-group
          v-model="initiateHolidayForm.minimumDuration"
          class="ml-4"
        >
          <el-radio value="0" size="large">不限制 </el-radio>
          <el-radio value="1" size="large">最少请假 </el-radio>
        </el-radio-group>
        <el-input-number
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
        >
        </el-input-number>
        <span>天</span>
      </el-form-item>
      <el-form-item label="最大时长">
        <el-radio-group
          v-model="initiateHolidayForm.maximumDuration"
          class="ml-4"
        >
          <el-radio value="0" size="large">不限制 </el-radio>
          <el-radio value="1" size="large">最多请假</el-radio>
        </el-radio-group>
        <el-input-number
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
        >
        </el-input-number>
        <span>天</span>
      </el-form-item>
      <el-form-item label="时间限制">
        <el-radio-group v-model="initiateHolidayForm.timeLimit" class="ml-4">
          <el-radio value="0" size="large">不限制 </el-radio>
          <el-radio value="1" size="large">提前</el-radio>
        </el-radio-group>
        <el-input-number
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
        >
        </el-input-number>
        <span>天提交申请</span>
      </el-form-item>

      <el-form-item label="申请资格">
        <el-radio-group v-model="initiateHolidayForm.eligibility" class="ml-4">
          <el-radio value="0" size="large">不限制 </el-radio>
          <el-radio value="1" size="large"
            >入职
            <el-input-number
              :min="1"
              :max="10"
              controls-position="right"
              size="large"
            >
            </el-input-number>
            <span>天提交申请</span>
          </el-radio>
          <el-radio value="2" size="large">入职可申请 </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="title">
        <h1>余额规则</h1>
      </div>
      <el-form-item label="发放方式" style="width: 800px">
        <el-select
          v-model="initiateHolidayForm.issuanceMethod"
          placeholder="请选择"
        >
          <el-option label="每月发放" value="0"></el-option>
          <el-option label="每年发放" value="1"></el-option>
          <el-option label="固定发放" value="2"></el-option>
        </el-select>
      </el-form-item>

      <span style="color: #989daa">发放日期</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>每月</span>
      <el-input-number
        label="一天折算为"
        v-model="initiateHolidayForm.releaseDate"
        :min="1"
        :max="31"
        controls-position="right"
        size="large"
      >
      </el-input-number>
      <span>号发放</span>

      <el-form-item label="发放规则" style="width: 800px">
        <el-select v-model="initiateHolidayForm.rules" placeholder="请选择">
          <el-option label="统一固定额度" value="0"></el-option>
          <el-option label="按社区工龄" value="1"></el-option>
          <el-option label="按司龄" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发放额度">
        <span style="color: #989daa">每人每年发放</span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-radio-group
          v-model="initiateHolidayForm.lssuanceQuota"
          class="ml-4"
        >
          <el-input-number
            :min="1"
            :max="10000000"
            controls-position="right"
            size="large"
          >
          </el-input-number>
          <span>天提交申请</span>
          <el-radio value="2" size="large">按实际工作时长发放 </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="假期有效期">
        <el-radio-group
          v-model="initiateHolidayForm.holidayEffective"
          class="ml-4"
        >
          <el-radio value="0" size="large">永久有效 </el-radio>
          <el-radio value="1" size="large"
            >发放日期
            <el-input-number
              :min="1"
              :max="10"
              controls-position="right"
              size="large"
            >
            </el-input-number>
            <span>天提交申请</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>超过有效期，假期余额保留</span>
            <el-input-number
              :min="1"
              :max="10"
              controls-position="right"
              size="large"
            >
            </el-input-number>
            <span>天</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addHoliday">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      // 发起考核表单
      initiateHolidayForm: {
        holidayType: '',
        scopeOfApplication: '',
        balanceRules: '',
        head: '',
        holidayDuration: '',
        oneConversion: '',
        limitss: '',
        holidayProve: '',
        holidayDate: '',
        minimumDuration: '',
        maximumDuration: '',
        timeLimit: '',
        eligibility: '',
        issuanceMethod: '',
        releaseDate: '',
        rules: '',
        lssuanceQuota: '',
        holidayEffective: '',
        holidayVisibe: [],
        PerformanceAnnouncement: ''
      },
      labelPosition: 'right'
    }
  },
  created() {
    this.findHolidayMentById()
    const re = this.$route.query.holidayId
    console.log(re)
  },
  methods: {
    addHoliday() {
      axios
        .post(
          'http://localhost:9999/holiday/addHoliday',
          this.initiateHolidayForm
        )
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            this.$router.push('holiday_type')
          } else {
            console.log('新增失败')
          }
        })
      axios
        .post(
          'http://localhost:9999/holiday/updateHoliday',
          this.initiateHolidayForm
        )
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('修改成功')
            this.$router.push('/home/mova/employee_leave')
          } else {
            console.log('修改失败')
          }
        })
    },
    findHolidayMentById() {
      const re = this.$route.query.holidayId
      axios
        .post('http://localhost:9999/holiday/findHoliday?holidayId=' + re)
        .then((res) => {
          this.initiateHolidayForm = res.data
          console.log(this.initiateHolidayForm)
        })
    },
    // 取消
    cancel() {
      this.initiateHolidayForm = {}

      this.$router.go(-1)
    },
    head() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  }
}
</script>
<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  border-left: 2px solid #409eff;
}
.title h1 {
  text-indent: 0.3em;
}
</style>
