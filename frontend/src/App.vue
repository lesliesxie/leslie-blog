<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-29 21:56:35
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-19 21:58:04
 * 佛祖保佑没bug
-->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <home-page></home-page> -->
</template>

<script setup lang="ts">
// import HomePage from "@/components/homePage/index.vue";
</script>

<style lang="less" scoped></style>
