<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-17 18:14:08
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 20:36:49
 * 佛祖保佑没bug
-->

<template>
  <div class="leslie-popover">
    <slot>
      <span>leslie-popover</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({});
</script>

<style lang="less" scoped>
.leslie-popover {
  position: absolute;
  // right: 0;
  min-width: 50px;
  top: 50px;
  white-space: nowrap;
  background-color: @menuBgColor;
  background-color: red;
  border: @border;
  border-radius: 2px;
  z-index: 100;
}
.leslie-popover::before {
  content: "";
  position: absolute;
  // margin-left: -0.5rem;
  // top: -0.6rem;
  width: 1rem;
  height: 1rem;
  background-color: @menuBgColor;
  border: @border;
  border-right: none;
  border-bottom: none;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
