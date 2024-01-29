<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-29 22:47:32
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-29 23:24:29
 * 佛祖保佑没bug
-->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="prefix + iconName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: 'icon-'
  },
  iconName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  }
})

</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
