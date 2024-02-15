<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-15 17:27:06
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-15 21:54:00
 * 佛祖保佑没bug
-->
<template>
  <div class="content-list">
    <div ref="scrollContainer" class="scroll-container">
      <div
        class="content-item"
        v-for="(item, index) in contentList"
        :key="index"
      >
        <div class="left">
          <!-- title实现悬浮时显示全部文本 -->
          <!-- TODO 文本超出时才支持悬浮显示 -->
          <!-- TODO 悬浮时鼠标会改变 -->
          <div class="title" :title="item.title">
            {{ item.title }}
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="info">
            <div class="info-left">
              <div class="author">{{ item.author }}</div>
              <div class="footer-divider"></div>
              <div class="browse">
                <svg-icon
                  name="browse"
                  class="icon"
                  color="var(--iconColor)"
                ></svg-icon
                >{{ item.browse }}
              </div>
              <div class="like">
                <svg-icon
                  name="like"
                  class="icon"
                  color="var(--iconColor)"
                ></svg-icon
                >{{ item.like }}
              </div>
            </div>
            <div class="classification">
              <div
                class="classification-item"
                v-for="(_item, index) in item.classification"
                :key="index"
              >
                {{ _item }}
              </div>
            </div>
          </div>
        </div>
        <div class="right" v-if="item.imgList.length > 0">
          <img :src="item.imgList[0]" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "../svgIcon/index.vue";
import { onMounted, ref } from "vue";

const contentList = ref([
  {
    author: "111",
    title:
      "22qqqqqqqqqqqqqqaaaaaaa生世世生世世生生世世生生生世世生生世世生生生生世世qqqqqqqqqqqqqqqqqqqqqqqqqqq2",
    content: "333",
    like: 111,
    browse: 222,
    imgList: [],
    classification: ["js", "ts"],
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: ["js"],
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
  {
    author: "111",
    title: "222",
    content: "333",
    like: 111,
    browse: 222,
    imgList: ["1", "2"],
    classification: "js",
  },
]);
const scrollContainer = ref<HTMLElement | null>(null);
const batchSize = 5;
let loadIndex = 10;
const handleScroll = () => {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;

    if (scrollTop + clientHeight >= scrollHeight) {
      setTimeout(() => {
        const newData = [];
        for (let i = 0; i < batchSize; i++) {
          newData.push({
            author: "111",
            title: "222",
            content: "333",
            like: 111,
            browse: 222,
            imgList: ["1", "2"],
            classification: "js",
          });
          loadIndex++;
        }
        contentList.value.push(...newData);
      }, 1000);
    }
  }
};
onMounted(() => {
  scrollContainer.value?.addEventListener("scroll", handleScroll);
});
</script>

<style lang="less" scoped>
.content-list {
  background-color: @contentBgColor;
  position: relative;
  height: 100%;
  overflow: scroll;
  // 支持滚动到底绑定scroll事件
  .scroll-container {
    height: 100%;
    overflow: scroll;
  }
  .content-item {
    height: 79px;
    border-bottom: 1px solid @itemBorderColor;
    padding: 10px 20px;
    display: flex;
    cursor: pointer;
    .left {
      flex: 1;
      width: 100%;
      .title {
        height: 24px;
        line-height: 24px;
        font-weight: 500;
        font-size: 16px;
        position: relative;
        white-space: nowrap; /* 文本不换行 */
        overflow: hidden; /* 文本溢出隐藏 */
        text-overflow: ellipsis; /* 使用省略号显示文本溢出部分 */
      }
      .content {
        height: 22px;
        margin: 2px 0 4px 0;
      }
      .info {
        display: flex;
        height: 22px;
        justify-content: space-between;
        .info-left {
          display: flex;
          .author {
            margin-right: 20px;
          }
          .footer-divider {
            width: 1px;
            height: 14px;
            background-color: @menuBorderColor;
            margin-top: 4px;
          }
          .icon {
            font-size: 16px;
            position: relative;
            right: 4px;
            top: 2px;
          }
          .browse {
            margin: 0 20px;
          }
        }
        .classification {
          display: flex;
          &-item {
            margin-left: 5px;
            padding: 0 5px;
            background-color: @bgColor;
          }
        }
      }
    }
    .right {
      width: 100px;
    }
  }
}
</style>
