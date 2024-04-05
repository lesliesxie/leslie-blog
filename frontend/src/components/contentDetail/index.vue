<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-15 17:27:43
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-05 21:22:01
 * 佛祖保佑没bug
-->
<template>
  <div class="content-detail" v-if="itemDetail">
    <div class="box">
      <div class="title">{{ itemDetail.title }}</div>
      <div class="data">
        <div class="author">{{ itemDetail.author }}</div>
        <div class="date">{{ date }}</div>
        <div class="browse">
          <svg-icon
            class="icon"
            name="browse"
            width="16"
            color="var(--inputPlaceholderColor)"
          ></svg-icon>
          {{ itemDetail.browse }}
        </div>
      </div>
      <div class="content" v-html="parseHtml"></div>
      <div class="label">
        <span>标签：</span>
        <div
          class="label-item"
          v-for="(_item, index) in itemDetail.label"
          :key="index"
        >
          {{ _item.text }}
        </div>
      </div>
    </div>
    <div class="comment">
      <!-- <div class="comment-title">评论{{ itemDetail.comment }}</div> -->
      <!-- <div class="submit-box"></div> -->
      <div class="comment-box">
        <comment></comment>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import moment from "moment";
import MarkDownIt from "markdown-it";
import { useRoute } from "vue-router";
import { queryContentListById } from "@/server";

const route = useRoute();
const id = route.path.split("/").slice(-1)[0];

const itemDetail = ref();
const date = ref();
const parseHtml = ref("");

const queryDetail = async (id: number) => {
  itemDetail.value = await queryContentListById(id);
  date.value = moment(itemDetail.value.createTime).format("YYYY-MM-DD");
  let mdText = itemDetail.value.content.replace(/<p>|<\/p>|<br>/gm, "\n");
  const md = new MarkDownIt();
  parseHtml.value = md.render(mdText);
};

onMounted(() => {
  queryDetail(Number(id));
});
</script>

<style lang="less" scoped>
.content-detail {
  height: 100%;
  overflow: scroll;
  .box {
    background-color: @contentBgColor;
    margin-bottom: 20px;
    padding: 20px;
    .title {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .data {
      display: flex;
      align-items: center;
      .author {
        color: @inputColor;
      }
      .browse {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 5px;
          margin-top: -1px;
        }
      }
      div {
        margin-right: 20px;
        color: @inputPlaceholderColor;
      }
    }
    .content {
      font-size: 16px;
      margin: 30px 0;
    }
    .label {
      display: flex;
      &-item {
        margin-left: 5px;
        padding: 0 5px;
        background-color: @bgColor;
      }
    }
  }
  .comment {
    background-color: @contentBgColor;
  }
}
</style>
