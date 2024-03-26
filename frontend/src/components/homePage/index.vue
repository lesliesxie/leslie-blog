<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-26 22:28:22
 * 佛祖保佑没bug
-->
<template>
  <div class="home-page">
    <div class="top-nav">
      <leslie-menu
        :menu-items="menuItems"
        :default-active="activeIndex"
        @item-click="handleSelect"
      >
      </leslie-menu>
      <div class="nav-right">
        <leslie-button
          btnType="primary"
          svg-name="add"
          height="40"
          @click="addNote"
          >新建笔记</leslie-button
        >
        <div class="personal-space"></div>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <classification v-if="!showDetail"></classification>
        <left-operate v-else></left-operate>
      </div>
      <div class="content">
        <content-list v-if="!showDetail" @item-detail="toDetail"></content-list>
        <content-detail v-else :itemDetail="itemDetail"></content-detail>
      </div>
      <div class="right">
        <recommend></recommend>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeslieMenu from "@/components/leslieUI/leslie-Menu/index.vue";
import classification from "../classification/index.vue";
import recommend from "../recommend/index.vue";
import LeftOperate from "@/components/leslieUI/left-operate/index.vue";
import ContentList from "../contentList/index.vue";
import { ref } from "vue";

const menuItems = ref([{ index: 1, name: "首页" }]);
const activeIndex = ref(1);

const itemDetail = ref({});
const showDetail = ref(false);

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
  showDetail.value = true;
  itemDetail.value = value;
};
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: calc(100vh);
  position: fixed; //禁止上拉下拉露出白底
  background-color: @bgColor;
  color: @fontColor;
  .top-nav {
    width: 100%;
    height: 50px;
    position: fixed;
    background-color: @contentBgColor;
    display: flex;
    justify-content: space-between;
    .nav-right {
      width: 30%;
      display: flex;
      align-items: center;
      .personal-space {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: red;
      }
    }
  }
  .center {
    margin: 10px 30px 0 30px;
    margin-top: 60px;
    height: calc(100vh - 60px);
    width: calc(100vw - 60px);
    display: flex;
    .left,
    .right {
      flex: 1;
      overflow-x: hidden;
      flex-basis: 0;
    }
    .left {
      max-width: 180px;
    }
    .content {
      margin: 0 20px;
      min-width: 580px;
      flex: 1;
    }
    .right {
      max-width: 260px;
    }
    @media (max-width: 1120px) {
      .left {
        display: none;
      }
    }
  }
}
</style>
