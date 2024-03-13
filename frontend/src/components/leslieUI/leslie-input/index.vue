<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-29 16:47:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-13 16:02:13
 * 佛祖保佑没bug
-->
<template>
  <div class="input-box">
    <input
      :placeholder="placeholder"
      class="leslie-input"
      v-model="inputRef.val"
      :style="{ fontSize: fontSize + 'px', width: width + 'px' }"
    />
    <!-- TODO add error text -->
    <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  fontSize: {
    type: Number,
  },
  width: {
    type: Number,
  },
  placeholder: {
    type: String,
  },
});
const inputRef = reactive({ val: "", error: false, message: "" });
</script>

<style lang="less" scoped>
@color: #86909c;
.leslie-input {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  min-height: 28px;
  color: @color;
}
::placeholder {
  color: @color;
}
</style>
