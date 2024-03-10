<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-17 18:00:12
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-10 19:14:59
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
  >
    <svg-icon v-if="svgName" :name="svgName" class="icon"></svg-icon>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, getCurrentInstance, onMounted, ref } from "vue";
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
});
const throttle =
  getCurrentInstance()?.appContext.config.globalProperties.$throttle;
const leslieButton: Ref = ref(null);
onMounted(() => {
  if (leslieButton.value) {
    leslieButton.value.addEventListener(
      "click",
      throttle(() => {
        console.log("button");
      }, 1000)
    );
  }
});
// onMounted(async () => {
// });

// const { appContext } = getCurrentInstance();

// const button = document.getElementsByClassName(
//   "leslie-button"
//   ) as HTMLCollectionOf<Element>;

// console.log("button", button);

// button &&
//   button.addEventListener("click", () => {
//     throttle(() => {
//       console.log("button");
//     }, 1000);
//   });
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
