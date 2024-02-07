<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-29 22:47:32
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-07 16:44:31
 * 佛祖保佑没bug
-->
<template>
  <svg class="svg-icon" :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#fff",
  },
  width: {
    type: String,
    default: "1em",
  },
  height: {
    type: String,
    default: "1em",
  },
});
</script>

<style lang="less" scoped></style>
