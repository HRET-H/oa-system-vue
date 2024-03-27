<script setup>
import { ref } from 'vue'
const shiftsRef = ref()
const shiftsData = ref({
  adShiftsId: '',
  workerId: '',
  shiftsFrameIs: '',
  shiftsElasticAllowable: '',
  shiftsElasticOvertime: '',
  shiftsElasticOvertimeAllowable: '',
  shiftsName: '',
  adShiftsFrameTimeList: [],
  adShiftsFrameRulesList: [],
  adShiftsEalsticList: []
})

const workerIdArray = ref([])

const seccessData = (selectUser) => {
  console.log(selectUser)
  workerIdArray.value = selectUser
  let deptIds = workerIdArray.value.map((worker) => worker.deptId).join(',')
  console.log(deptIds)
  shiftsData.value.workerId = deptIds
}
</script>
<template>
  <page-container title="班次管理">
    <el-form :model="shiftsData" ref="shiftsRef" label-width="100px">
      <el-form-item label="班次名称" required>
        <el-input
          style="width: 240px"
          v-model="shiftsData.shiftsName"
          placeholder="请输入班次名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="班次负责人" required
        ><CustomTransfer :type="true" :seccessData="seccessData" />
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style></style>
