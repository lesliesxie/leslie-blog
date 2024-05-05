<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-01 22:36:57
 * @LastEditors: leslie
 * @LastEditTime: 2024-05-05 16:26:48
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-menu">
    <div
      class="menu-item"
      v-for="item in menuItems"
      :class="{ 'is-active': item.index === activeIndex }"
      :key="item.index"
      @click="handleClick(item.index)"
    >
      菜单{{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface MenuItem {
  index: number;
  name: string;
  icon?: string;
  children?: MenuItem[];
}
const props = defineProps({
  menuItems: {
    type: Array<MenuItem>,
    required: true,
  },
  defaultActive: {
    type: Number,
  },
});
let activeIndex = ref(props.defaultActive);
const emit = defineEmits(["item-click"]);
const handleClick = (index: number) => {
  activeIndex.value = index;
  emit("item-click", index);
};
</script>

<style lang="less" scoped>
.leslie-menu {
  display: flex;
  width: 100vw;
  // border-bottom: 1px solid @menuBorderColor;
  height: 100%;
  .menu-item {
    margin-right: 40px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    padding: 0 20px;
    &:hover {
      background-color: @menuItemHoverBgColor;
    }
  }
  .is-active {
    color: @menuItemActiveColor;
    border-bottom: 2px solid @menuItemActiveColor;
  }
}
</style>
