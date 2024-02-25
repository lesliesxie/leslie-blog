<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-25 23:00:35
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-25 23:09:59
 * 佛祖保佑没bug
-->
<template>
  <div v-if="show" :class="['leslie-message', type]">{{ message }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  showTime: {
    type: Number,
  },
});

const show = ref(false);
const message = ref("");
const type = ref("success");

function showMessage(msg: string, msgType: string = "success") {
  message.value = msg;
  type.value = msgType;
  show.value = true;
  const showTime = props.showTime || 3000;
  setTimeout(() => {
    show.value = false;
  }, showTime);
}
</script>

<style lang="less" scoped>
.leslie-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 100;
}
.success {
  background-color: red;
}
.error {
  background-color: green;
}
</style>
