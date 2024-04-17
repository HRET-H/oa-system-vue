<template>
  <div style="height: 1260px">
    <!-- 发起考核表单 -->
    <el-form
      ref="form"
      :model="initiateAddForm"
      :label-position="labelPosition"
      label-width="80px"
      size="large"
    >
      <div class="title">
        <h1>新建档案</h1>
      </div>
      <!-- <el-form-item label="档案号" style="width: 800px">
        <el-input v-model="initiateAddForm.documentationId"></el-input>
      </el-form-item> -->

      <el-form-item label="所属案卷" style="width: 800px">
        <el-select
          v-model="initiateAddForm.belongssFile"
          placeholder="请选择"
          @change="belongssFileList()"
        >
          <el-option label="专利文件库" value="1"></el-option>
          <el-option label="项目合同库" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="全宗号" style="width: 800px">
        <el-input v-model="holidayVisibe1.data.wholeSectId"></el-input>
      </el-form-item>
      <el-form-item label="全宗名称" style="width: 800px">
        <el-input v-model="holidayVisibe1.data.wholeSectName"></el-input>
      </el-form-item>
      <el-form-item label="库号" style="width: 800px">
        <el-input v-model="holidayVisibe1.data.lockerId"></el-input>
      </el-form-item>
      <el-form-item label="案库名称" style="width: 800px">
        <el-input v-model="holidayVisibe1.data.lockName"></el-input>
      </el-form-item>

      <el-form-item label="文件标题" style="width: 800px">
        <el-input v-model="initiateAddForm.fileTitle"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <CustomTransfer :type="type" :head="head" />
      </el-form-item>
      <el-form-item label="档案摘要" style="width: 800px">
        <el-input v-model="initiateAddForm.summary"></el-input>
      </el-form-item>
      <div class="title">
        <h1>销毁记录</h1>
      </div>
      <el-form-item label="销毁状态" style="width: 800px">
        <el-select v-model="initiateAddForm.smallStates" placeholder="请选择">
          <el-option label="未销毁" value="1"></el-option>
          <el-option label="已销毁" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="销毁时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="销毁时间"
            v-model="initiateAddForm.destructionTime"
            style="width: 300px"
          ></el-date-picker>
        </el-col>
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
      initiateAddForm: {
        // documentationId: '',
        belongssFile: '',
        fileTitle: '',
        summary: '',
        smallStates: '',
        destructionTime: '',

        holidayVisibe: [],
        PerformanceAnnouncement: ''
      },
      findAll: [],
      labelPosition: 'right',
      holidayVisibe1: {
        data: {
          sectNumber: '',
          wholeSectName: '',
          lockerId: '',
          holidayType: ''
        }
      }
    }
  },
  created() {
    this.findHolidayMentById()
    const re = this.$route.query.documentationId
    console.log(re)
  },
  methods: {
    // 选择下拉框内容改变
    belongssFileList() {
      const belongssFile = this.initiateAddForm.belongssFile
      console.log(this.initiateAddForm.belongssFile)
      axios
        .post(
          '/documentation/findArchivesDocumentationById?belongssFile=' +
            belongssFile
        )
        .then((res) => {
          console.log(res)
          const data = res.data
          this.holidayVisibe1 = data
          console.log(this.holidayVisibe1)
        })
    },
    findSuo() {
      axios.post('/documentation/findAll').then((res) => {
        console.log(res)
        this.findAll = res.data
        console.log(this.findAll)
        this.belongssFileList()
      })
    },
    // 新增
    addHoliday() {
      axios
        .post('/documentation/addDocumentation', this.initiateAddForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            this.$router.push('archives_documentation')
          } else {
            console.log('新增失败')
          }
        })
      axios
        .post('/documentation/updateDocumentation', this.initiateAddForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('修改成功')
            this.$router.push('archives_documentation')
          } else {
            console.log('修改失败')
          }
        })
    },
    findHolidayMentById() {
      const re = this.$route.query.documentationId
      axios
        .post('/documentation/findDocumentation?documentationId=' + re)
        .then((res) => {
          this.initiateAddForm = res.data
          console.log(this.initiateAddForm)
        })
    },
    // 取消
    cancel() {
      this.initiateAddForm = {}

      this.$router.go(-1)
    },
    head() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    seccessData() {
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
