<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-06 18:13:37
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-07 17:51:54
 * 佛祖保佑没bug
-->
<template>
  <div class="classification">
    <div
      class="item"
      v-for="item in classificationList"
      :class="{ 'is-active': item.index === activeIndex }"
      :key="item.index"
      @click="changeItem(item.index)"
    >
      <svg-icon
        class="icon"
        :name="item.name"
        :color="
          item.index === activeIndex
            ? 'var(--itemHoverColor)'
            : 'var(--iconColor)'
        "
      ></svg-icon>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import svgIcon from "../svgIcon/index.vue";
import { ref } from "vue";

const classificationList = ref([
  { index: 0, name: "blog" },
  { index: 1, name: "js" },
  { index: 2, name: "js" },
  { index: 1, name: "js" },
  { index: 1, name: "js" },
  { index: 1, name: "js" },
]);
const activeIndex = ref(0);
const changeItem = (index: number) => {
  activeIndex.value = index;
};
</script>

<style lang="less" scoped>
.classification {
  background-color: @contentBgColor;
  padding: 10px;
  .item {
    height: 30px;
    padding: 10px 17px;
    font-size: 16px;
    line-height: 30px;
    display: flex;
    cursor: pointer;
    .icon {
      margin-top: 7px;
    }
    .name {
      margin-left: 15px;
      display: inline-block;
      position: relative;
    }
    &:hover {
      border-radius: @itemBorderRadius;
      background-color: @itemHoverBgColor;
    }
  }
  .is-active {
    color: @itemHoverColor;
    background-color: @itemActiveColor;
  }
  // height: 100%;
}
</style>
