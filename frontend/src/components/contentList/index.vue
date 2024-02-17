<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-15 17:27:06
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-17 17:48:27
 * 佛祖保佑没bug
-->
<template>
  <div class="content-list">
    <div ref="scrollContainer" class="scroll-container">
      <div
        class="content-item"
        v-for="(item, index) in _contentList"
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
              <div class="likes">
                <svg-icon
                  name="likes"
                  class="icon"
                  color="var(--iconColor)"
                ></svg-icon
                >{{ item.likes }}
              </div>
            </div>
            <div class="classification">
              <div
                class="classification-item"
                v-for="(_item, index) in item.classification"
                :key="index"
              >
                {{ _item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- TODO 图片加载存在问题 -->
        <div class="right" v-if="item.imgList">
          <img :src="item.imgList[0]" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getContentList } from "@/server";
import SvgIcon from "../svgIcon/index.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

interface classificationType {
  id: number;
  name: string;
}
interface contentListType {
  author: string;
  title: string;
  content: string;
  likes: number;
  browse: number;
  imgList: string[];
  classification: classificationType[];
}
const contentList = ref<contentListType[]>([]);
const _contentList = ref<contentListType[]>([]);
const scrollContainer = ref<HTMLElement | null>(null);
const containerHeight = ref(0);
let loadIndex = 5;
const updateContainerHeight = () => {
  if (scrollContainer.value) {
    containerHeight.value = scrollContainer.value.clientHeight;
    loadIndex = Math.floor(containerHeight.value / 80) - 1;
  }
};
const init = async () => {
  contentList.value = await getContentList();
  _contentList.value = contentList.value.slice(0, loadIndex);
};
const batchSize = 5;
const handleScroll = () => {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    if (
      scrollTop + clientHeight >= scrollHeight &&
      loadIndex + 1 < contentList.value.length
    ) {
      setTimeout(() => {
        const newData = [];
        for (let i = 0; i < batchSize; i++) {
          newData.push(contentList.value[loadIndex]);
          loadIndex++;
        }
        _contentList.value.push(...newData);
      }, 1000);
    }
  }
};
onMounted(() => {
  updateContainerHeight();
  init();
  window.addEventListener("resize", updateContainerHeight);
  scrollContainer.value?.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateContainerHeight);
  scrollContainer.value?.removeEventListener("scroll", handleScroll);
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
        white-space: nowrap; /* 文本不换行 */
        overflow: hidden; /* 文本溢出隐藏 */
        text-overflow: ellipsis; /* 使用省略号显示文本溢出部分 */
      }
      .content {
        height: 22px;
        margin: 2px 0 4px 0;
        white-space: nowrap; /* 文本不换行 */
        overflow: hidden; /* 文本溢出隐藏 */
        text-overflow: ellipsis; /* 使用省略号显示文本溢出部分 */
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
      width: 200px;
      position: relative;
    }
  }
}
</style>
