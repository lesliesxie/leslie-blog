<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-30 21:11:30
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-30 21:34:44
 * 佛祖保佑没bug
-->

<template>
  <div class="leslie-index">
    <div class="top-nav">
      <slot name="top-nav"></slot>
      <div class="nav-right">
        <slot name="nav-right"></slot>
      </div>
    </div>
    <div class="center">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({});
</script>

<style lang="less" scoped>
.leslie-index {
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
