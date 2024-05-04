<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-05-04 16:39:16
 * @LastEditors: leslie
 * @LastEditTime: 2024-05-04 17:44:14
 * 佛祖保佑没bug
-->

<template>
  <div class="personal-space">
    <div
      class="avatar"
      ref="avatar"
      v-if="isLogin"
      @click="panelVisible = !panelVisible"
    >
      <leslie-panel
        :width="76"
        v-if="panelVisible"
        :panelVisible.sync="panelVisible"
        :positionTop="positionTop"
        :positionRight="positionRight"
        :isTitle="false"
        padding="0"
      >
        <template #content>
          <div class="info">
            <span @click="onPersonal">个人中心</span>
            <span @click="logout">退出登录</span>
          </div>
        </template>
      </leslie-panel>
    </div>
    <leslie-button
      v-else
      btnType="primary"
      height="40"
      class="login"
      @click="login"
      >登录 / 注册</leslie-button
    >
  </div>
  <Login v-if="showLogin"></Login>
  <personal v-if="personalVisible"></personal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import bus from "@/global/event-bus";
import { useAuthStore } from "@/store";

const auth = useAuthStore();

const isLogin = ref(false);
const showLogin = ref(false);
const personalVisible = ref(false);
const panelVisible = ref(false);
const positionTop = ref(0);
const positionRight = ref(0);
const avatar: Ref = ref(null);

const login = () => {
  panelVisible.value = false;
  showLogin.value = true;
  bus.emit("changeVisible", true);
};

const onPersonal = () => {
  personalVisible.value = true;
  showLogin.value = false;
  bus.emit("changeVisible", true);
};

const logout = () => {
  auth.logout();
  panelVisible.value = false;
  personalVisible.value = false;
  isLogin.value = false;
  localStorage.setItem("isLogin", "false");
  localStorage.setItem("userName", "");
};

const getPositionData = () => {
  let data = document.querySelector(".personal-space")?.getBoundingClientRect();
  positionRight.value =
    document.body.clientWidth -
    (data?.left as number) -
    (data?.width as number);
  positionTop.value = (data?.top as number) + (data?.height as number) + 5;
};

watch(
  () => auth.isLogin,
  () => {
    isLogin.value = auth.isLogin;
  }
);
onMounted(() => {
  if (localStorage.getItem("isLogin") === "true") {
    isLogin.value = true;
  }
  getPositionData();
});
</script>

<style lang="less" scoped>
.personal-space {
  position: relative;
  float: right;
  right: 30px;
  top: 5px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    background-size: 100%;
    background-image: url("../../assets/images/avatar.JPG");
  }
  .info {
    user-select: none;
    display: flex;
    flex-direction: column;
    span {
      padding: 10px;
      &:hover {
        background-color: @itemHoverBgColor;
      }
    }
    span + span {
      padding-top: 5px;
      border-top: @border;
    }
  }
}
</style>
