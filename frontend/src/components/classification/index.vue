<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-06 18:13:37
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-26 22:37:03
 * 佛祖保佑没bug
-->
<template>
  <div class="classification">
    <div
      class="item"
      v-for="item in classificationList"
      :class="{ 'is-active': item.id === activeIndex }"
      :key="item.id"
      @click="changeItem(item.id)"
    >
      <svg-icon
        class="icon"
        :name="item.value"
        :color="
          item.id === activeIndex ? 'var(--itemHoverColor)' : 'var(--iconColor)'
        "
      ></svg-icon>
      <span class="name">{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getClassificationList } from "@/server/index.ts";
import { ref } from "vue";

const activeIndex = ref(1);
const changeItem = (index: number) => {
  activeIndex.value = index;
};
interface classificationListType {
  id: number;
  text: string;
  value: string;
}
const classificationList = ref<classificationListType[]>([]);
const init = async () => {
  classificationList.value = await getClassificationList();
};
init();
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
  .item + .item {
    margin-top: 5px;
  }
  .is-active {
    color: @itemHoverColor;
    background-color: @itemActiveColor;
  }
  // height: 100%;
}
</style>
