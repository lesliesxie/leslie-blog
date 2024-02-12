<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-06 18:13:37
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-12 21:51:33
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
        :name="item.name"
        :color="
          item.id === activeIndex ? 'var(--itemHoverColor)' : 'var(--iconColor)'
        "
      ></svg-icon>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getClassificationList } from "@/server/index.ts";
import svgIcon from "../svgIcon/index.vue";
import { ref } from "vue";

const activeIndex = ref(0);
const changeItem = (index: number) => {
  activeIndex.value = index;
};
interface classificationListType {
  id: number;
  name: string;
}
const classificationList = ref<classificationListType[]>([]);
const init = async () => {
  classificationList.value = await getClassificationList();
  console.log("classificationList", classificationList.value);
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
  .is-active {
    color: @itemHoverColor;
    background-color: @itemActiveColor;
  }
  // height: 100%;
}
</style>
