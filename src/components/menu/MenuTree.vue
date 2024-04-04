<script setup>
// defineProps等价于 props
defineProps({
  data: {
    type: Array,
    default: () => ref([])
  },
  mode: {
    type: String,
    default: 'vertical'
  }
})
</script>

<template>
  <div>
    <!-- // 注意： 在template标签上使用v-for，:key="index"不能写在template标签上，因为其标签不会被渲染，会引起循环错误 -->
    <el-menu
      v-if="mode === 'horizontal'"
      :mode="mode"
      :router="true"
      background-color="rgb(35,43,64)"
      text-color="#fff"
    >
      <template v-for="(item, index) in data">
        <!-- 判断子级类型是否为菜单 -->
        <el-sub-menu
          :index="item.menuPath + '?parentId=' + item.menuId"
          :key="index"
          v-if="
            item.children != null &&
            item.children.length > 0 &&
            item.children[0].menuType === 'C'
          "
        >
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item
            :key="menu_index"
            :index="menu_item.menuPath + '?parentId=' + menu_item.menuId"
            v-for="(menu_item, menu_index) in item.children"
          >
            <span>{{ menu_item.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 子级无菜单 -->
        <template v-else>
          <el-menu-item
            :key="index"
            :index="item.menuPath + '?parentId=' + item.menuId"
          >
            <span>{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

    <el-menu v-else :mode="mode" :router="true">
      <template v-for="(item, index) in data">
        <!-- 情况一：当 item 有子集时 -->
        <el-sub-menu
          :key="index"
          :index="item.menuPath + '?parentId=' + item.menuId"
          v-if="item.children !== null && item.children.length > 0"
        >
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
          <MenuTree :data="item.children"></MenuTree>
        </el-sub-menu>

        <!-- 情况二：当 item 没有子集时 -->
        <el-menu-item
          :key="index + 1"
          :index="item.menuPath + '?parentId=' + item.menuId"
          v-else
        >
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
/* 设置激活菜单的样式 */
.el-menu-item.is-active {
  font-weight: bold;
}
</style>
