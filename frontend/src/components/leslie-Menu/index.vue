<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-01 22:36:57
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-01 23:38:11
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-menu">
    <ul>
      <li v-for="item in menuItems" :key="item.index">菜单{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  index: number;
  name: string;
  icon?: string;
  children?: MenuItem[];
}
defineProps({
  menuItems: {
    type: Array<MenuItem>,
    required: true,
  },
});
</script>

<style lang="less" scoped></style>
