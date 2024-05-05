<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-12 22:08:39
 * @LastEditors: leslie
 * @LastEditTime: 2024-05-05 16:25:14
 * 佛祖保佑没bug
-->
<template>
  <div class="left-operate">
    <div class="content">
      <div class="avatar"></div>
      <div
        v-for="(item, index) in leftOperate"
        @click="clickOperate(item, index)"
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
        <span v-show="item.number" class="number">{{ item.number }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { queryContentListById, updateContent } from "@/server";
import { useRoute } from "vue-router";
import bus from "@/global/event-bus";

const route = useRoute();
const id = route.path.split("/").slice(-1)[0];

const leftOperate = ref([
  { name: "likes", isClick: false, number: 0 },
  { name: "comment", isClick: false, number: 0 },
  // { name: "collect", isClick: false, number: 0 },
  // { name: "forward", isClick: false },
]);
const data = ref<any>({});

const clickOperate = (item: any, index: number) => {
  // TODO状态保存
  item.isClick = !item.isClick;
  switch (item.name) {
    case "likes":
      item.number = item.isClick ? item.number + 1 : item.number - 1;
      updateContent(Number(id), { ...data.value, likes: item.number });
      break;
  }
  console.log("item", item, index);
};

const getData = async () => {
  data.value = await queryContentListById(Number(id));
  leftOperate.value[0].number = data.value.likes;
};
onMounted(() => {
  getData();
  bus.on("commentNum", (value) => {
    leftOperate.value[1].number = value as number;
  });
});
</script>

<style lang="less" scoped>
.left-operate {
  height: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  .content {
    width: 80px;
    height: 50%;
    position: fixed;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-size: 100%;
      cursor: pointer;
      background-image: url("../../../assets/images/avatar.JPG");
    }
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
      .number {
        position: absolute;
        margin-top: -40px;
        margin-left: 40px;
        font-size: 10px;
        color: @contentBgColor;
        background-color: @messageInfoColor;
        border-radius: 5px;
        padding: 3px;
      }
    }
  }
}
</style>
