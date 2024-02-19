<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-18 17:12:00
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
        <leslie-button svg-name="add" height="40" @click="addNote"
          >发布文章</leslie-button
        >
        <div class="personal-space"></div>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <classification v-if="isIndex"></classification>
        <left-operate v-else></left-operate>
      </div>
      <div class="content">
        <content-list></content-list>
      </div>
      <div class="right">
        <recommend></recommend>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeslieMenu from "../leslie-Menu/index.vue";
import LeslieButton from "../leslie-button/index.vue";
import classification from "../classification/index.vue";
import recommend from "../recommend/index.vue";
import LeftOperate from "../left-operate/index.vue";
import ContentList from "../contentList/index.vue";
import { ref } from "vue";

const isIndex = ref(false);
const menuItems = ref([
  { index: 1, name: "首页" },
  { index: 2, name: "首页123" },
]);
const activeIndex = ref(1);
const handleSelect = (key: number) => {
  console.log(key);
};
const addNote = () => {
  // TODO 实现新增笔记的功能  新开窗口
  console.log("addNote");
  window.open("/add-note");
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
