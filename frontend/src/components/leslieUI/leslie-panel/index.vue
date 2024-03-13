<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 15:52:38
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-13 21:55:50
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-panel" :style="{ top: positionTop }">
    <div class="title" v-if="isTitle">
      {{ panelTitle }}
    </div>
    <div class="content">
      <leslie-form :formData="formData"></leslie-form>
    </div>
    <div class="button-box">
      <leslie-button bgColor="#fff" class="button close-button" v-if="close">{{
        closeText
      }}</leslie-button>
      <leslie-button class="button submit-button" v-if="submit">{{
        submitText
      }}</leslie-button>
    </div>
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
  close: {
    type: Boolean,
    default: true,
  },
  closeText: {
    type: String,
    default: "取消",
  },
  submit: {
    type: Boolean,
    default: true,
  },
  submitText: {
    type: String,
    default: "确定",
  },
});
const positionTop = ref(`calc(${props.positionTop + 10}px)`);
const positionRight = ref(`calc(${props.positionRight - 12}px)`);
const formData = ref([
  {
    type: "radio",
    label: "分类：",
    value: "classify",
    required: true,
  },
  {
    type: "select",
    label: "添加标签：",
    value: "label",
    required: true,
  },
]);
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
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: @border;
  }
  .content {
    border-bottom: @border;
  }
  .button-box {
    margin: 20px;
    float: right;
    .submit-button {
      margin-left: 20px;
    }
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
