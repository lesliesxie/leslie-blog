<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-06 17:42:29
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-06 21:28:10
 * 佛祖保佑没bug
-->

<template>
  <div class="login">
    <leslie-dialog
      :dialogVisible.sync="dialogVisible"
      dialogTitle="登录畅享权益"
      :width="400"
    >
      <template #content>
        <span class="title">密码登录</span>
        <div class="content-box">
          <leslie-input
            class="name-input"
            :width="360"
            :height="32"
            placeholder="请输入用户名"
          ></leslie-input>
          <leslie-input
            :width="360"
            :height="32"
            show-password
            placeholder="请输入密码"
          ></leslie-input>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <leslie-button>注册</leslie-button>
          <leslie-button class="login" btnType="primary">登录</leslie-button>
        </div>
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

<style lang="less" scoped>
.login {
  .leslie-dialog {
    .title {
      font-size: 15px;
      font-weight: 400;
    }
    .content-box {
      margin: 20px 0;
      .name-input {
        margin-bottom: 15px;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      .login {
        margin-left: 40px;
      }
    }
  }
}
</style>
