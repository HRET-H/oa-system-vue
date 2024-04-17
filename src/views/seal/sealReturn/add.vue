<template>
  <PageContainer>
    <div>
      <div>| 用章申请</div>
      <br />
      <br />
      <br />
      <div>
        <el-form :inline="true" :model="seal" class="demo-form-inline">
          <el-form-item label="用章流水号">
            <el-input v-model="seal.serial" placeholder="请输入内容"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="印章名称">
            <el-input v-model="seal.sname" placeholder="请输入内容"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="归还日期">
            <el-date-picker
              v-model="seal.returnTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <br />
          <el-form-item label="归还人">
            <el-input
              v-model="seal.returnPerson"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <br />

          <el-form-item label="备注">
            <el-input type="textarea" v-model="seal.remark"></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <el-button @click="quxiao()">取 消</el-button>
          <el-button type="primary" @click="handleadd()">确 定</el-button>
        </span>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      seal: {
        sId: '',
        speople: '',
        sname: '',
        phone: '',
        start: '',
        stype: '',
        stamp: '',
        sFile: '',
        sIllustrate: '',
        mail: '',
        applicationTime: '',
        submitTime: '',
        returnTime: '',
        returnPerson: '',
        serial: '',
        remark: ''
      }
    }
  },
  methods: {
    handleadd() {
      axios.post('/seal/radd', this.seal).then((res) => {
        if (res.status == 200) {
          //  window.location.href = "ManagementBySeal";
          console.log(this.seal)
        }
      })
    },
    quxiao() {
      window.location.href = 'ManagementBySeal'
    }
  }
}
</script>

<style scoped></style>
