<template>
  <div>
    <div>| 新建申请</div>
    <br />
    <br />
    <br />
    <div>
      <el-form :inline="true" :model="library" class="demo-form-inline">
        <el-form-item label="印章名称">
          <el-input v-model="library.sname" placeholder="请输入内容"></el-input>
        </el-form-item>
        <br />

        <br />
        <el-form-item label="负责人">
          <el-input
            v-model="library.responsible"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <br />
        <el-from-item label="印章封存">
          <el-radio v-model="library.state" value="2" label="1">正常</el-radio>
          <el-radio v-model="library.state" value="3" label="2">封存</el-radio>
        </el-from-item>
        <br />
        <el-form-item label="备注">
          <el-input type="textarea" v-model="library.sIllustrate"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="quxiao()">取 消</el-button>
        <el-button type="primary" @click="handleadd()">确 定</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      library: {
        id: '',
        sname: '',
        responsible: '',
        state: '',
        remark: '',
        creationTime: ''
      }
    }
  },
  methods: {
    handleadd() {
      axios.post('/library/add', this.library).then((res) => {
        if (res.status == 200) {
          //  window.location.href = "ManagementBySeal";
          console.log(this.library)
        }
      })
    },
    quxiao() {
      window.location.href = 'sealVault'
    }
  }
}
</script>

<style></style>
