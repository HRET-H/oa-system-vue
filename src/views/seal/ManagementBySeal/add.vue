<template>
  <div>
    <div>| 用章申请</div>
    <br />
    <br />
    <br />
    <div>
      <el-form :inline="true" :model="seal" class="demo-form-inline">
        <el-form-item label="用章人">
          <el-input v-model="seal.speople" placeholder="请输入内容"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="申请日期">
          <el-date-picker
            v-model="seal.applicationTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="用章类型">
          <el-select v-model="seal.stype">
            <el-option label="外带" value="0"></el-option>
            <el-option label="公司盖章" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="印章名称">
          <el-select v-model="seal.sname">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="合同章" value="合同章"></el-option>
            <el-option label="法人章" value="法人章"></el-option>
            <el-option label="项目章" value="项目章"></el-option>
            <el-option label="财务章" value="财务章"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="盖章文件份数">
          <el-input :disabled="true" placeholder="请输入内容"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="盖章文件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template v-slot:tip>
              <div class="el-upload__tip">
                支持扩展名：.rar .zip .doc .docx .pdf .jpg，单个文件不超过10Mb
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <br />
        <el-form-item label="用章说明">
          <el-input type="textarea" v-model="seal.sIllustrate"></el-input>
        </el-form-item>

        <div class="block">
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
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
      seal: {
        sId: '',
        speople: '',
        sname: '',
        phone: '',
        start: '',
        stype: '',
        stamp: '3',
        sFile: '',
        sIllustrate: '',
        mail: '',
        applicationTime: '',
        submitTime: ''
      }
    }
  },
  methods: {
    handleadd() {
      axios.post('/seal/add', this.seal).then((res) => {
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

<style></style>
