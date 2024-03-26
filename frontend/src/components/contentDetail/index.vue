<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-15 17:27:43
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-26 22:37:20
 * 佛祖保佑没bug
-->
<template>
  <div class="content-detail">
    <div class="box">
      <div class="title">{{ itemDetail.title }}</div>
      <div class="data">
        <div class="author">{{ itemDetail.author }}</div>
        <!-- <div class="date">{{ date }}</div> -->
        <div class="browse">{{ itemDetail.browse }}</div>
      </div>
      <div class="content">{{ itemDetail.content }}</div>
      <div class="label">
        <span>标签：</span>
        <span>{{ itemDetail.label }}</span>
      </div>
    </div>
    <div class="comment">
      <div class="comment-title">评论{{ itemDetail.comment }}</div>
      <div class="submit-box"></div>
      <div class="comment-box">
        <!-- <comment v-for="comment in commentList"></comment> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  itemDetail: {
    type: Object,
    default: () => {},
    required: true,
  },
});
const date = ref();
// date.value = moment(props.itemDetail.time).format("YYYY-MM-DD");
console.log("date", date.value, props.itemDetail);
</script>

<style lang="less" scoped>
.content-detail {
  .box {
    background-color: @contentBgColor;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .data {
      display: flex;
      align-items: center;
      div {
        margin-right: 10px;
      }
    }
    .content {
    }
    .label {
    }
  }
  .comment {
    background-color: @contentBgColor;
  }
}
</style>
