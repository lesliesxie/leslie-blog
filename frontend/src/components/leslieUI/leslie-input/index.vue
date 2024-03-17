<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-29 16:47:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 20:37:14
 * 佛祖保佑没bug
-->
<template>
  <div class="input-box" v-if="!isSelect">
    <input
      :placeholder="placeholder"
      class="leslie-input"
      v-model="inputRef.val"
      :style="{
        fontSize: fontSize + 'px',
        width: width + 'px',
        border: inputBorder,
      }"
    />
    <!-- TODO add error text -->
    <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
  </div>
  <div class="select-input-box" v-if="isSelect">
    <input
      :placeholder="placeholder"
      class="leslie-input is-select"
      v-model="inputRef.val"
      :readonly="isSelect"
      @click="showOptions"
      :style="{
        fontSize: fontSize + 'px',
        width: width + 'px',
        border: inputBorder,
      }"
    ><span class="is-select"></span></input>
    <!-- TODO add error text -->
    <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const props = defineProps({
  fontSize: {
    type: Number,
    default: 14,
  },
  width: {
    type: Number,
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  inputBorder: {
    type: String,
    default: "1px solid #e9e0e9",
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
});
const inputRef = reactive({ val: "", error: false, message: "" });
const optionVisible = ref(false);
const rotateDegree = ref('180deg');
const btnTopPosition = ref('-14px');
const showOptions = () => {
  optionVisible.value = !optionVisible.value;
  rotateDegree.value = optionVisible.value ? '0deg' : '180deg';
  btnTopPosition.value = optionVisible.value ? '-7px' : '-14px';
}
</script>

<style lang="less" scoped>
.input-box, .select-input-box {
  --rotate-degree: v-bind(rotateDegree);
  --btn-top-position: v-bind(btnTopPosition);
  display: flex;
  align-items: center;
  .leslie-input {
    margin: 0;
    padding: 0;
    outline: none;
    min-height: 28px;
    color: @inputColor;
    border-radius: @inputBorderRadius;
  }
  ::placeholder {
    color: @inputPlaceholderColor;
  }
  .is-select {
    cursor: pointer;
    display: inline-block;
    user-select: none;
  }
  .is-select::before {
    content: "^";
    color: @inputPlaceholderColor;
    scale: 1.5;
    position: absolute;
    margin-top: var(--btn-top-position);
    margin-left: -16px;
    transform: rotate(var(--rotate-degree));
     -webkit-transform: rotate(var(--rotate-degree));
  }
}
</style>
