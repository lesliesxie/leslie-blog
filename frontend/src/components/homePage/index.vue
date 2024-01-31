<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 22:13:18
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-31 23:12:24
 * 佛祖保佑没bug
-->
<template>
  <div class="home-page">
    <div class="top-nav">
      <el-menu
        class="leslie-menu"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">首页123</el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <div class="content"></div>
      <div class="summary">333</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
