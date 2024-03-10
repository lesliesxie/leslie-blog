<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-17 18:00:12
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-09 21:31:34
 * 佛祖保佑没bug
-->
<template>
  <button
    class="leslie-button"
    :style="{
      height: height + 'px',
      backgroundColor: bgColor,
      color: bgColor ? '#eda2ed' : '',
    }"
  >
    <svg-icon v-if="svgName" :name="svgName" class="icon"></svg-icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  svgName: {
    type: String,
  },
  height: {
    type: String,
  },
  bgColor: {
    type: String,
  },
});
</script>

<style lang="less" scoped>
.leslie-button {
  border: none;
  border: 1px solid @btnBorderColor;
  background-color: @btnBgColor;
  color: @btnColor;
  font-weight: 300;
  min-width: 80px;
  height: 28px;
  padding: 0 8px;
  cursor: pointer;
  .icon {
    font-size: 16px;
    position: relative;
    right: 3px;
    top: 3px;
  }
}
</style>
