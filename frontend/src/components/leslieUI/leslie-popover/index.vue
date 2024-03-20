<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-17 18:14:08
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-20 23:00:37
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
import { onMounted, ref } from "vue";
import type { Ref } from "vue";

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
const positionWidth = ref(`calc(${props.positionWidth - 20}px)`);
const positionHeight = ref(`calc(${props.positionHeight + 28}px)`);
</script>

<style lang="less" scoped>
.leslie-popover {
  --position-width: v-bind(positionWidth);
  --position-height: v-bind(positionHeight);
  width: var(--position-width);
  position: relative;
  top: var(--position-height);
  margin-left: calc((var(--position-width) * -1) - 20px);
  min-height: 30px;
  white-space: nowrap;
  background-color: @menuBgColor;
  border: @border;
  border-radius: 2px;
  z-index: 100;
  padding: 10px;
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
