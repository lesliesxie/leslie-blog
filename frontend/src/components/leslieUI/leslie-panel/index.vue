<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 15:52:38
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-13 18:59:50
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-panel" :style="{ top: positionTop }">
    <div class="title" v-if="isTitle">
      {{ panelTitle }}
    </div>
    <div class="content"></div>
    <div class="button-box"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  panelTitle: {
    type: String,
    required: true,
  },
  isTitle: {
    type: Boolean,
    default: true,
  },
  positionTop: {
    type: Number,
    default: 0,
  },
  positionRight: {
    type: Number,
    default: 0,
  },
});
const positionTop = ref(`calc(${props.positionTop + 10}px)`);
console.log("positionTop", props.positionRight);
</script>

<style lang="less" scoped>
.leslie-panel {
  position: absolute;
  right: 0;
  width: 560px;
  white-space: nowrap;
  background-color: @menuBgColor;
  border: @border;
  border-radius: 2px;
  z-index: 100;
  .title {
    font-size: 18px;
    font-weight: 700;
    border-bottom: @border;
  }
  .content {
  }
  .button-box {
  }
}
.leslie-panel:before {
  content: "";
  position: absolute;
  margin-left: -0.5rem;
  top: -0.6rem;
  width: 1rem;
  height: 1rem;
  right: 50%;
  background-color: @menuBgColor;
  border: @border;
  border-right: none;
  border-bottom: none;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
