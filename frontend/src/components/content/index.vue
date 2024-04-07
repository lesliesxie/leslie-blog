<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-30 21:09:57
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-05 21:21:02
 * 佛祖保佑没bug
-->

<template>
  <div class="content">
    <leslie-index>
      <template #top-nav>
        <leslie-menu
          :menu-items="menuItems"
          :default-active="activeIndex"
          @item-click="handleSelect"
        >
        </leslie-menu>
      </template>
      <template #nav-right>
        <leslie-button
          btnType="primary"
          svg-name="add"
          height="40"
          @click="addNote"
          >新建笔记</leslie-button
        >
        <div class="personal-space">
          <div class="avatar" v-if="isLogin"></div>
          <leslie-button
            v-else
            btnType="primary"
            height="40"
            class="login"
            @click="login"
            >登录 / 注册</leslie-button
          >
        </div>
      </template>
      <template #left>
        <left-operate></left-operate>
      </template>
      <template #content>
        <content-detail></content-detail>
      </template>
      <template #right>
        <recommend></recommend>
      </template>
    </leslie-index>
    <Login v-if="showLogin"></Login>
  </div>
</template>

<script setup lang="ts">
import LeslieMenu from "@/components/leslieUI/leslie-Menu/index.vue";
import recommend from "../recommend/index.vue";
import { onMounted, ref } from "vue";
import bus from "@/global/event-bus";

const menuItems = ref([{ index: 1, name: "首页" }]);
const activeIndex = ref(1);

const isLogin = ref(false);
const showLogin = ref(false);

const login = () => {
  showLogin.value = true;
  bus.emit("changeVisible", true);
};

const handleSelect = (key: number) => {
  console.log(key);
};
const addNote = () => {
  // 问题：路由改变页面没变：/ =》 /add-note
  //                    homePage => homePage
  // 原因：路由配置不正常，使用了createWebHashHistory而不是createWebHistory
  // createWebHashHistory使用后所有路由都会变成#/结尾导致只会跳转到首页，具体哪里配错未发现
  window.open("/add-note");
};
onMounted(() => {
  bus.on("login", () => {
    isLogin.value = true;
  });
});
</script>

<style lang="less" scoped>
.content {
  .personal-space {
    margin-left: 50px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-size: 100%;
      background-image: url("../../assets/images/avatar.JPG");
    }
  }
}
</style>
