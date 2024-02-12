<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-12 22:08:39
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-12 22:48:29
 * 佛祖保佑没bug
-->
<template>
  <div class="left-operate">
    <div class="content">
      <div class="attention"></div>
      <div
        v-for="(item, index) in leftOperate"
        @click="item.isClick = !item.isClick"
        class="operate"
        :key="index"
      >
        <svg-icon
          class="icon"
          :name="item.name"
          :color="
            item.isClick ? 'var(--itemHoverColor)' : 'var(--unClickColor)'
          "
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "../svgIcon/index.vue";
import { ref } from "vue";
const leftOperate = ref([
  { name: "like", isClick: false },
  { name: "comment", isClick: false },
  { name: "collect", isClick: false },
  { name: "forward", isClick: false },
]);
</script>

<style lang="less" scoped>
.left-operate {
  height: 100%;
  display: flex;
  align-items: center;
  .content {
    width: 80px;
    height: 50%;
    position: fixed;
    div {
      margin-top: 20px;
      background-color: @contentBgColor;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .operate {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .icon {
        font-size: 24px;
      }
    }
  }
}
</style>
