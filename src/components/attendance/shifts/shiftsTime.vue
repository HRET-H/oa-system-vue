<script setup>
import { inject } from 'vue'

const optionsDay = [
  {
    value: 'T',
    label: '当日'
  },
  {
    value: 'N',
    label: '明天'
  }
]

const frameData = inject('frameData')
const frameTimeList = frameData.frameTimeList
</script>

<template>
  <div>
    <el-row v-for="(item, index) in frameTimeList" :key="index">
      <el-col :span="0.5"
        ><div class="grid-content ep-bg-purple" />

        <el-card style="height: 100%" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>时段</span>
            </div>
          </template>
          <div style="margin-top: 40%">
            <p style="margin: auto">
              {{ item.id }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content ep-bg-purple-light" />
        <el-card style="height: 100%" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>上班时间</span>
            </div>
          </template>
          <div style="margin-top: 10%">
            <el-select
              placeholder="Select"
              style="width: 100%"
              v-model="item.frameTimeAndRulesUp.day"
            >
              <el-option
                v-for="it in optionsDay"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <el-time-select
              v-model="item.frameTimeAndRulesUp.day_time"
              style="width: 100%"
              start="00:00"
              step="00:30"
              end="23:59"
              placeholder="Select time"
              format="hh:mm"
            />
            <el-checkbox
              v-model="item.frameTimeAndRulesUp.day_allow"
              label="上班打卡"
              size="large"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content ep-bg-purple" />
        <el-card style="height: 100%" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>下班时间</span>
            </div>
          </template>
          <div style="margin-top: 10%">
            <el-select
              v-model="item.frameTimeAndRulesDown.day"
              placeholder="Select"
              style="width: 100%"
            >
              <el-option
                v-for="it in optionsDay"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <el-time-select
              v-model="item.frameTimeAndRulesDown.day_time"
              style="width: 100%"
              start="00:00"
              step="00:30"
              end="23:59"
              placeholder="Select time"
              format="hh:mm"
            />
            <el-checkbox
              v-model="item.frameTimeAndRulesDown.day_allow"
              label="下班打卡"
              size="large"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="7"
        ><div class="grid-content ep-bg-purple-light" />
        <el-card style="height: 100%">
          <template #header>
            <div class="card-header">
              <span>上班打卡规则</span>
            </div>
          </template>
          <div style="margin-top: 5%">
            <span>最早可以提前</span>
            <el-input-number
              v-model="item.frameTimeAndRulesUp.most"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟进行打卡</span>
            <br />
            <span>晚于</span>
            <el-input-number
              v-model="item.frameTimeAndRulesUp.late"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟打卡为迟到</span>
            <br />
            <span>晚于</span>
            <el-input-number
              v-model="item.frameTimeAndRulesUp.lake"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟打卡为缺卡半天</span>
          </div>
        </el-card></el-col
      >
      <el-col :span="7"
        ><div class="grid-content ep-bg-purple" />
        <el-card style="height: 100%" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>下班打卡规则</span>
            </div>
          </template>
          <div style="margin-top: 5%">
            <span>最早可以提前</span>
            <el-input-number
              v-model="item.frameTimeAndRulesDown.most"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟进行打卡</span>
            <br />
            <span>晚于</span>
            <el-input-number
              v-model="item.frameTimeAndRulesDown.late"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟打卡为迟到</span>
            <br />
            <span>晚于</span>
            <el-input-number
              v-model="item.frameTimeAndRulesDown.lake"
              class="mx-4"
              :min="1"
              :max="60"
              controls-position="right"
              size="small"
            />
            <span>分钟打卡为缺卡半天</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
