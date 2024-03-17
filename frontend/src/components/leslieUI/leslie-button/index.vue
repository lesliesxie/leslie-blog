<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-17 18:00:12
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 17:29:02
 * 佛祖保佑没bug
-->
<template>
  <button
    class="leslie-button"
    ref="leslieButton"
    :style="{
      height: height + 'px',
      backgroundColor: bgColor,
      color: bgColor ? '#eda2ed' : '',
    }"
    :class="'leslie-button--' + btnType"
    @click="emitClick"
  >
    <svg-icon v-if="svgName" :name="svgName" class="icon"></svg-icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, getCurrentInstance, ref, defineEmits } from "vue";
import type { Ref } from "vue";
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
  btnType: {
    type: String,
    default: "plain",
  },
});
const validateBtnType = (type: string): void => {
  if (!["primary", "info", "warning", "danger", "plain"].includes(type)) {
    throw new Error("btnType is invalid");
  }
};
try {
  validateBtnType(props.btnType);
} catch (error) {
  console.error(error);
}
const throttle =
  getCurrentInstance()?.appContext.config.globalProperties.$throttle;
const leslieButton: Ref = ref(null);
const emit = defineEmits(["click"]);
const emitClick = throttle(() => {
  emit("click");
}, 1000);
// let isFirstClick = true;
// const emitClick = () => {
//   // if (isFirstClick) {
//   //   isFirstClick = false;
//   //   emit("click");
//   // } else {
//   throttleClick();
//   // }
// };
</script>

<style lang="less" scoped>
.leslie-button {
  user-select: none;
  border: none;
  font-weight: 300;
  min-width: 80px;
  height: 28px;
  padding: 0 10px;
  cursor: pointer;
  color: @btnBorderColor;
  border: @btnBorder;
  .icon {
    font-size: 16px;
    position: relative;
    right: 3px;
    top: 3px;
  }
}
.leslie-button + .leslie-button {
  margin-left: 10px;
}
.leslie-button--plain {
  background-color: @plainBtnBgColor;
  &:hover {
    background-color: @plainBtnHoverBgColor;
  }
}
.leslie-button--primary {
  background-color: @primaryBtnBgColor;
  border: @btnBorder;
  color: @btnColor;
  &:hover {
    background-color: @primaryBtnHoverBgColor;
  }
}
.leslie-button--info {
  background-color: @infoBtnBgColor;
  &:hover {
    background-color: @infoBtnHoverBgColor;
  }
}
.leslie-button--warning {
  background-color: @warningBtnBgColor;
  border: 1px solid @warningBtnBorderColor;
  color: @warningBtnColor;
  &:hover {
    background-color: @warningBtnHoverBgColor;
  }
}
.leslie-button--danger {
  background-color: @dangerBtnBgColor;
  border: 1px solid @dangerBtnBorderColor;
  color: @dangerBtnColor;
  &:hover {
    background-color: @dangerBtnHoverBgColor;
  }
}
</style>
