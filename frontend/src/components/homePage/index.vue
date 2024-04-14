<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-14 20:40:32
 * 佛祖保佑没bug
-->
<template>
  <div class="home-page">
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
      </template>
      <template #left>
        <classification></classification>
      </template>
      <template #content>
        <content-list @item-detail="toDetail"></content-list>
      </template>
      <template #right>
        <recommend></recommend>
      </template>
    </leslie-index>
    <Login v-if="showLogin"></Login>
    <personal v-if="personalVisible"></personal>
  </div>
</template>

<script setup lang="ts">
import LeslieMenu from "@/components/leslieUI/leslie-Menu/index.vue";
import recommend from "../recommend/index.vue";
import ContentList from "../contentList/index.vue";
import { onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import bus from "@/global/event-bus";
import { useAuthStore } from "@/store";

const auth = useAuthStore();

const menuItems = ref([{ index: 1, name: "首页" }]);
const activeIndex = ref(1);

const isLogin = ref(false);
const showLogin = ref(false);

const personalVisible = ref(false);

const panelVisible = ref(false);
const positionTop = ref(0);
const positionRight = ref(0);
const avatar: Ref = ref(null);

const login = () => {
  showLogin.value = true;
  bus.emit("changeVisible", true);
};

const onPersonal = () => {
  personalVisible.value = true;
  bus.emit("changeVisible", true);
};

const logout = () => {
  auth.logout();
  panelVisible.value = false;
  isLogin.value = false;
  localStorage.setItem("isLogin", "false");
  localStorage.setItem("userName", "");
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

const toDetail = (value: any) => {
  window.open("/content-detail/" + value.id);
};

const getPositionData = () => {
  let data = document.querySelector(".personal-space")?.getBoundingClientRect();
  positionRight.value =
    document.body.clientWidth -
    (data?.left as number) -
    (data?.width as number) / 2 -
    10;
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
.home-page {
  .personal-space {
    // position: absolute;
    margin-left: 20px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      background-size: 100%;
      background-image: url("../../assets/images/avatar.JPG");
    }
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
