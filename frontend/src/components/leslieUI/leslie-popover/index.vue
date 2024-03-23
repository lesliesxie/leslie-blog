<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-17 18:14:08
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-23 20:05:33
 * 佛祖保佑没bug
-->

<template>
  <div class="leslie-popover">
    <slot name="content">
      <span>leslie-popover</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  positionWidth: {
    type: Number,
    default: 100,
  },
  positionHeight: {
    type: Number,
    default: 0,
  },
});
const positionWidth = ref(`calc(${props.positionWidth}px)`);
const positionHeight = ref(`calc(${props.positionHeight + 12}px)`);
</script>

<style lang="less" scoped>
.leslie-popover {
  --position-width: v-bind(positionWidth);
  --position-height: v-bind(positionHeight);
  min-width: var(--position-width);
  position: absolute;
  top: var(--position-height);
  min-height: 30px;
  white-space: nowrap;
  background-color: @menuBgColor;
  border: @border;
  border-radius: 2px;
  z-index: 100;
  padding: 11px 0;
}
.leslie-popover::before {
  content: "";
  position: absolute;
  margin-left: calc(var(--position-width) / 2 - 0.5rem);
  top: -0.6rem;
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
