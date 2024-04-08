<template>
  <div>
    <!-- form表单条查 -->
    <el-form
      ref="form"
      :model="assessScoreForm"
      label-width="80px"
      inline="true"
    >
      <el-form-item label="分布规则">
        <el-select
          v-model="assessScoreForm.distributionRules"
          placeholder="对应分布区间"
          style="width: 300px"
        >
          <el-option
            label="全部"
            :value="
              assessScoreForm.distributionRules == '0' ||
              assessScoreForm.distributionRules == '1'
            "
          ></el-option>
          <el-option label="对应分布区间" :value="0"></el-option>
          <el-option label="正态分布" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <br />
      <!-- 表格 -->
      <el-table
        :data="assessScoreList"
        style="width: 100%"
        v-show="(listOne = true)"
      >
        <el-table-column prop="scoreName" label="等级名称" width="180">
          <template v-slot:default="scope">
            <el-input v-model="scope.row.scoreName" type="text"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="scoreBands" label="分数区间" width="180">
          <el-text>0 ⩽ 分数 ⩽ </el-text>
          <template>
            <el-input v-model="scope.row.scoreBands" type="text"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveIllustrate"
          width="180"
          label="等级说明"
          placeholder="请输入"
        >
        </el-table-column>
      </el-table>
      <!--  -->
      <el-table
        :data="assessScoreList"
        style="width: 100%"
        v-show="(listTwo = false)"
      >
        <el-table-column prop="leaveName" label="等级名称" width="180">
          <template v-slot:default="scope">
            <el-input v-model="scope.row.leaveName" type="text"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fraction" label="所占比例" width="180">
          <template>
            <el-input v-model="scope.row.scoreBands" type="text"></el-input>
          </template>
          <el-text>%</el-text>
        </el-table-column>
        <el-table-column
          prop="leaveIllustrate"
          width="180"
          label="等级说明"
          placeholder="请输入"
        >
        </el-table-column>
      </el-table>
      <!-- 搜索重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="findAssessIndexListAndPage"
          >查询</el-button
        >
        <el-button @click="resetForm">重置</el-button>
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
      // 指标查询表单
      assessScoreForm: {
        pageNum: 1,
        pageSize: 10
      },
      //   assessIndexId: '',
      //   考核指标列表
      assessScoreList: [],
      // 分页
      total: 0,
      listOne: true,
      listTwo: false
    }
  },
  created() {
    this.findAssessScoreListAndPage()
  },
  //   refAssessIndex() {
  //     this.$router.push('/home/mova/InsertAssessIndex')
  //   },
  methods: {
    findAssessScoreListAndPage() {
      axios
        .post('/assessScore/findAssessScoreListAndPage', this.assessScoreForm)
        .then((res) => {
          console.log(res)
          this.assessScoreList = res.data.list
          this.total = res.data.total
        })
    },
    addAssessScore() {
      axios
        .post('/assessScore/addAssessScore', this.InsertAssessIndexForm)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            ElMessage.success('新增成功')
            // this.$message({
            //   message: '新增成功',
            //   type: 'success'
            // })
            ;(this.scoreForm = false), (this.leaveForm = false)
          } else {
            ElMessage.error('新增失败')
          }
        })
    }
  }
}
</script>
<style scoped>
.el-form-item .asterisk-left {
  width: 160px !important;
}

.btn {
  width: 100%;
  height: 75px;
}
</style>
