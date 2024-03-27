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
      <!-- <el-form-item label="负责人">
        <i class="el-icon-circle-plus-outline"></i>
      </el-form-item> -->
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

      <el-input-number
        label="一天折算为"
        v-model="initiateHolidayForm.oneConversion"
        :min="1"
        :max="10"
        controls-position="right"
        size="large"
      >
      </el-input-number>

      <el-form-item label="是否限额">
        <el-radio-group v-model="initiateHolidayForm.limitss" class="ml-4">
          <el-radio value="1" size="large">限额 </el-radio>
          <el-radio value="2" size="large">不限额 </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="title">
        <h1>使用规则</h1>
      </div>
      <!-- <el-form-item label="请假证明">
        <el-checkbox-group v-model="initiateHolidayForm.holidayProve">
          <el-checkbox
            label="无需证明"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="证明"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>  -->

      <!-- <el-form-item label="计入请假日期">
        <el-checkbox-group v-model="initiateHolidayForm.holidayDate">
          <el-checkbox
            label="工作日"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="休息日"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
          <el-checkbox
            label="节假日"
            name="holidayVisibe"
            value="2"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <!-- <el-form-item label="单次最小时长">
        <el-checkbox-group v-model="initiateHolidayForm.minimumDuration">
          <el-checkbox
            label="不限制"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="限制"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <!-- <el-form-item label="单次最大时长">
        <el-checkbox-group v-model="initiateHolidayForm.maximumDuration">
          <el-checkbox
            label="不限制"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="限制"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <!-- <el-form-item label="申请时间限制">
        <el-checkbox-group v-model="initiateHolidayForm.timeLimit">
          <el-checkbox
            label="不限制"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="限制"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <!-- <el-form-item label="申请资格">
        <el-checkbox-group v-model="initiateHolidayForm.eligibility">
          <el-checkbox
            label="不限制"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="转正可申请"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
          <el-checkbox
            label="入职可申请"
            name="holidayVisibe"
            value="2"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <div class="title">
        <h1>余额规则</h1>
      </div>
      <!-- <el-form-item label="发放方式">
        <el-select
          v-model="initiateHolidayForm.IssuanceMethod"
          placeholder="请选择"
        >
          <el-option label="每月发放" value="0"></el-option>
          <el-option label="每年发放" value="1"></el-option>
          <el-option label="固定发放" value="2"></el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-input-number
        label="发放日期"
        v-model="initiateHolidayForm.releaseDate"
        :min="1"
        :max="31"
        controls-position="right"
        size="large"
      >
      </el-input-number> -->

      <!-- <el-form-item label="发放规则">
        <el-select v-model="initiateHolidayForm.rules" placeholder="请选择">
          <el-option label="统一固定额度" value="0"></el-option>
          <el-option label="按社区工龄" value="1"></el-option>
          <el-option label="按司龄" value="2"></el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-input-number
        label="发放额度"
        v-model="initiateHolidayForm.lssuanceQuota"
        :min="1"
        :max="1000000"
        controls-position="right"
        size="large"
      >
      </el-input-number> -->
      <!-- <el-form-item label="假期有效期">
        <el-checkbox-group v-model="initiateHolidayForm.holidayEffective">
          <el-checkbox
            label="永久有效"
            name="holidayVisibe"
            value="0"
          ></el-checkbox>
          <el-checkbox
            label="发放日有效"
            name="holidayVisibe"
            value="1"
          ></el-checkbox>
          <el-checkbox
            label="超过有效期"
            name="holidayVisibe"
            value="2"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

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
        holidayDuration: '',
        oneConversion: '',
        limitss: '',
        // holidayProve: '',
        // holidayDate: '',
        // minimumDuration: '',
        // maximumDuration: '',
        // timeLimit: '',
        // eligibility: '',
        // IssuanceMethod: '',
        // releaseDate: '',
        // rules: '',
        // lssuanceQuota: '',
        // holidayEffective: '',
        holidayVisibe: [],
        PerformanceAnnouncement: ''
      },
      labelPosition: 'right'
    }
  },
  created() {
    this.findHolidayMentById()
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
            // this.$message({
            //   message: '新增成功',
            //   type: 'success'
            // })
            this.$router.push('/home/mova/employee_leave')
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    findHolidayMentById() {
      axios
        .get(
          'http://localhost:9999/holiday/findHoliday?holidayId=' +
            this.$route.query.holidayId
        )
        .then((res) => {
          console.log(res)
          this.initiateHolidayForm = res.data
          console.log(this.initiateHolidayForm)
        })
    },
    // 取消
    cancel() {
      this.initiateHolidayForm = {}

      this.$router.go(-1)
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
