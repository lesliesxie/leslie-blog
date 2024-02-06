<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-06 16:48:42
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
    </div>
    <div class="center">
      <div class="content"></div>
      <div class="summary">333</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeslieMenu from "../leslie-Menu/index.vue";
// import { ElMenu, ElMenuItem } from "element-plus";

const menuItems = ref([
  { index: 1, name: "首页" },
  { index: 2, name: "首页123" },
]);
const activeIndex = ref(1);
const handleSelect = (key: number) => {
  console.log(key);
};
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: calc(100vh);
  position: fixed; //禁止上拉下拉露出白底
  .top-nav {
    width: 100%;
    height: 50px;
  }
  .center {
    margin: 10px 30px 0 30px;
    height: calc(100vh - 60px);
    width: calc(100vw - 60px);
    display: flex;
    .content {
      width: calc(100% - 300px);
    }
    .summary {
      width: 300px;
    }
  }
}
</style>
