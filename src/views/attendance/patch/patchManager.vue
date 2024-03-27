<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const patchRef = ref()

const patchData = ref({
  adPatchName: '',
  adPatchScope: '',
  workerId: '',
  patchAllow: true,
  patchNum: '5',
  patchDays: '10',
  patchTuype: '',
  workImage: ''
})
const options = [
  {
    value: '1',
    label: '全公司考勤'
  },
  {
    value: '2',
    label: '技术部考勤'
  },
  {
    value: '3',
    label: '技术部先锋组考勤'
  },
  {
    value: '4',
    label: '产品部考勤'
  },
  {
    value: '5',
    label: '销售部考勤'
  }
]
const imgUrl = ref()

const onSelectFile = (uploadFile) => {
  console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 预览图片
  // 立刻将图片对象，存入 formModel.value.cover_img 将来用于提交
  patchData.value.workImage = uploadFile.raw
}
</script>

<template>
  <el-form ref="patchRef" :model="patchData" label-width="100px">
    <el-form-item label="规则名称" required>
      <el-input
        style="width: 240px"
        v-model="patchData.adPatchName"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    <el-form-item label="规则范围">
      <el-select
        style="width: 240px"
        v-model="patchData.adPatchScope"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="负责人" required>
      <el-upload
        ref="uploadRef"
        :auto-upload="false"
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="onSelectFile"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="允许补卡">
      <el-switch v-model="patchData.patchAllow" />
    </el-form-item>
    <el-form-item label="补卡次数">
      <el-text>
        每月最多可提交
        <el-input-number
          v-model="patchData.patchNum"
          class="mx-4"
          :min="1"
          :max="10"
          controls-position="right"
          size="small"
        />
        次补卡
      </el-text>
    </el-form-item>
    <el-form-item label="补卡时限">
      <el-text>
        可申请过去
        <el-input-number
          v-model="patchData.patchDays"
          class="mx-4"
          :min="1"
          :max="31"
          controls-position="right"
          size="small"
        />
        天内的补卡
      </el-text>
    </el-form-item>
    <el-form-item label="补卡类型">
      <el-checkbox v-model="checked1" label="缺卡" size="large" />
      <el-checkbox v-model="checked2" label="迟到" size="large" />
      <el-checkbox v-model="checked3" label="早退" size="large" />
      <el-checkbox v-model="checked4" label="正常" size="large" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
