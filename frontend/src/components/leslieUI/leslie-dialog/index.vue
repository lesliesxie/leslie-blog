<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-06 17:44:32
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-06 21:26:39
 * 佛祖保佑没bug
-->

<template>
  <div class="overlay" v-show="dialogVisible"></div>
  <div
    class="leslie-dialog"
    v-if="dialogVisible"
    :style="{ width: width + 'px' }"
  >
    <div class="top">
      <div class="title" v-if="isTitle">
        {{ dialogTitle }}
      </div>
      <span class="close" @click="closeDialog" v-if="showClose">X</span>
    </div>
    <div class="content">
      <slot name="content">
        <span>leslie-dialog内容区域</span>
      </slot>
    </div>
    <div class="button-box">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import bus from "@/global/event-bus";

defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 500,
  },
  dialogTitle: {
    type: String,
    default: "Leslie-Dialog",
  },
  isTitle: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
});

const closeDialog = () => {
  bus.emit("changeVisible", false);
};
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.leslie-dialog {
  position: fixed;
  background-color: @dialogBgColor;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 150;
  .top {
    width: 100%;
    height: 50px;
    border-bottom: @border;
    .title {
      padding: 20px;
      font-size: 18px;
      font-weight: 500;
    }
    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }
  .content {
    padding: 20px;
  }
  .button-box {
    margin: 0 20px 20px 20px;
  }
}
</style>
