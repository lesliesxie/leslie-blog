<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-06 17:42:29
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-06 21:09:20
 * 佛祖保佑没bug
-->

<template>
  <div class="login">
    <leslie-dialog
      :dialogVisible.sync="dialogVisible"
      dialogTitle="登录畅享权益"
    >
      <template #content>
        <span>leslie-login内容区域</span>
      </template>
    </leslie-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import bus from "@/global/event-bus";

const dialogVisible = ref(true);

onMounted(() => {
  bus.on("changeVisible", (value) => {
    dialogVisible.value = value as boolean;
  });
});
</script>

<style lang="less" scoped></style>
