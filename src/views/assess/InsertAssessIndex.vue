<template>
  <PageContainer>
    <div style="height: 1260px">
      <!-- 发起指标表单 -->
      <el-form
        ref="form"
        :model="InsertAssessIndexForm"
        :label-position="labelPosition"
        label-width="80px"
        size="large"
      >
        <el-form-item label="指标名称">
          <el-input
            v-model="InsertAssessIndexForm.assessIndexName"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="指标说明">
          <el-input
            v-model="InsertAssessIndexForm.IndexDescription"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="评价标准">
          <el-input
            v-model="InsertAssessIndexForm.evaluationCriteria"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item label="评价上限">
          <el-input
            type="textarea"
            v-model="InsertAssessIndexForm.ratingCaps"
            style="width: 100px"
          ></el-input>
          <el-text>分</el-text>
        </el-form-item>
        <el-form-item label="目标人">
          <el-input
            v-model="InsertAssessIndexForm.targetValue"
            style="width: 180px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAssessIndex">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageContainer>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      // 发起考核表单
      InsertAssessIndexForm: {},
      labelPosition: 'right'
    }
  },
  created() {
    this.findAssessIndexById()
  },
  methods: {
    addAssessIndex() {
      axios
        .post('/assessIndex/addAssessIndex', this.InsertAssessIndexForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            // this.$message({
            //   message: '新增成功',
            //   type: 'success'
            // })
            this.$router.push('/home/mova/appraisal_index')
          } else {
            ElMessage.error('新增失败')
          }
        })
    },
    findAssessIndexById() {
      axios
        .get(
          '/assessIndex/findAssessIndexById?assessIndexId=' +
            this.$route.query.assessIndexId
        )
        .then((res) => {
          console.log(res)
          this.InsertAssessIndexForm = res.data
          console.log(this.InsertAssessIndexForm)
        })
    },
    // 取消
    cancel() {
      this.InsertAssessIndexForm = {}

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
.el-row {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
