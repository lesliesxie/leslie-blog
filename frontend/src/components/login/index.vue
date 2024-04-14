<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-06 17:42:29
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-14 20:40:58
 * 佛祖保佑没bug
-->

<template>
  <div class="login">
    <leslie-dialog
      ref="dialog"
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
            @inputChange="userNameChange"
            :debounce="false"
          ></leslie-input>
          <leslie-input
            :width="360"
            :height="32"
            show-password
            placeholder="请输入密码"
            @inputChange="passwordChange"
            :debounce="false"
          ></leslie-input>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <leslie-button @click="onRegister">注册并登录</leslie-button>
          <leslie-button class="login" @click="onLogin" btnType="primary"
            >登录</leslie-button
          >
        </div>
      </template>
    </leslie-dialog>
  </div>
</template>

<script setup lang="ts">
import { register, login } from "@/server/index";
import { onMounted, reactive, ref } from "vue";
import type { Ref } from "vue";
import bus from "@/global/event-bus";
import showMessage from "@/global/leslie-message";
import { useAuthStore } from "@/store";

const auth = useAuthStore();

const dialogVisible = ref(true);
const dialog: Ref = ref(null);
const userForm = reactive({ userName: "", password: "" });

const userNameChange = (value: string) => {
  userForm.userName = value;
};
const passwordChange = (value: string) => {
  userForm.password = value;
};
const checkInput = () => {
  if (!userForm.userName) {
    showMessage.error("请输入用户名");
    return false;
  }
  if (!userForm.password) {
    showMessage.error("请输入密码");
    return false;
  }
  return true;
};
const onRegister = async () => {
  if (checkInput()) {
    try {
      await register(userForm);
      dialog.value.closeDialog();
      showMessage.success("注册成功，即将登录");
    } catch (error: any) {
      showMessage.error(error.response.data.message);
    }
  }
};
const onLogin = async () => {
  if (checkInput()) {
    try {
      await login(userForm);
      dialog.value.closeDialog();
      showMessage.success("登录成功");
      auth.login(userForm);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userName", userForm.userName);
    } catch (error: any) {
      showMessage.error(error.response.data.message);
    }
  }
};

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
