<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-31 19:43:04
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
        <div class="personal-space"></div>
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
  </div>
</template>

<script setup lang="ts">
import LeslieMenu from "@/components/leslieUI/leslie-Menu/index.vue";
import recommend from "../recommend/index.vue";
import ContentList from "../contentList/index.vue";
import { ref } from "vue";

const menuItems = ref([{ index: 1, name: "首页" }]);
const activeIndex = ref(1);

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
</script>

<style lang="less" scoped>
.home-page {
  .personal-space {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: red;
  }
}
</style>
