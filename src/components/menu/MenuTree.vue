<template>
  <div>
    <el-menu :mode="mode" router="true">
      <template v-for="(item, index) in data">
        <!-- 情况一：当 item 有子集时 -->
        <el-sub-menu
          :key="index"
          :index="item.menuPath"
          v-if="item.children !== null && item.children.length > 0"
        >
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
          <MenuTree :data="item.children"></MenuTree>
        </el-sub-menu>

        <!-- 情况二：当 item 没有子集时 -->
        <el-menu-item :key="index + 1" :index="item.menuPath" v-else>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MenuTree',
  props: {
    data: {
      type: Array,
      default: ref([])
    },
    mode: {
      type: String,
      default: 'vertical'
    }
  }
  // 注意： 在template标签上使用v-for，:key="index"不能写在template标签上，因为其标签不会被渲染，会引起循环错误
}
</script>

<style scoped>
/* 设置激活菜单的样式 */
.el-menu-item.is-active {
  background-color: rgba(84, 194, 195, 1) !important;
  color: #fff !important;
}
</style>
