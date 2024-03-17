<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 15:52:38
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 17:20:56
 * 佛祖保佑没bug
-->
<template>
  <div
    class="leslie-panel"
    v-if="panelVisible"
    :style="{ top: positionTop, width: width + 'px' }"
  >
    <div class="title" v-if="isTitle">
      {{ panelTitle }}
    </div>
    <div class="content">
      <slot name="content">
        <span>leslie-panel内容区域</span>
      </slot>
    </div>
    <div class="button-box">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  panelVisible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 500,
  },
  panelTitle: {
    type: String,
    default: "Leslie-Panel",
  },
  isTitle: {
    type: Boolean,
    default: true,
  },
  // 调用者底部距离页面顶部的距离
  positionTop: {
    type: Number,
    default: 0,
  },
  // 调用者中点距离页面左侧的距离
  positionRight: {
    type: Number,
    default: 0,
  },
});

const positionTop = ref(`calc(${props.positionTop + 10}px)`);
const positionRight = ref(`calc(${props.positionRight - 12}px)`);
</script>

<style lang="less" scoped>
.leslie-panel {
  position: absolute;
  right: 0;
  white-space: nowrap;
  background-color: @menuBgColor;
  border: @border;
  border-radius: 2px;
  z-index: 100;
  .title {
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: @border;
  }
  .content {
    display: block;
    padding: 20px;
    border-bottom: @border;
  }
  .button-box {
    margin: 20px;
    float: right;
  }
}
.leslie-panel::before {
  --position-right: v-bind(positionRight);
  content: "";
  position: absolute;
  margin-left: -0.5rem;
  top: -0.6rem;
  width: 1rem;
  height: 1rem;
  right: var(--position-right);
  background-color: @menuBgColor;
  border: @border;
  border-right: none;
  border-bottom: none;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
