<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-14 19:46:34
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-14 21:05:55
 * 佛祖保佑没bug
-->

<template>
  <div class="personal">
    <leslie-dialog
      ref="dialog"
      :dialogVisible.sync="personalVisible"
      :dialogTitle="dialogTitle"
      :width="500"
      padding="0px 20px"
    >
      <template #content>
        <div class="content">
          <div class="left">
            <div class="avatar">
              <img class="img" :src="avatar" alt="" />
              <leslie-button btnType="primary">更换头像</leslie-button>
            </div>
          </div>
          <div class="right">
            <div class="userName">
              <span>用户名</span>
              <leslie-input></leslie-input>
            </div>
            <div class="password">
              <span>密码</span>
              <leslie-input></leslie-input>
            </div>
            <div class="sign">
              <span>个性签名</span>
              <leslie-input></leslie-input>
            </div>
            <leslie-button btnType="primary">修改</leslie-button>
          </div>
        </div>
      </template>
    </leslie-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import bus from "@/global/event-bus";

const personalVisible = ref(true);
const userName = ref("");
const dialogTitle = ref("个人中心");
const avatar = ref("/src/assets/images/avatar.JPG");

onMounted(() => {
  if (localStorage.getItem("isLogin") === "true") {
    userName.value = localStorage.getItem("userName") as string;
    dialogTitle.value = userName.value + "  的个人中心";
  }
  bus.on("changeVisible", (value) => {
    personalVisible.value = value as boolean;
  });
});
</script>

<style lang="less" scoped>
.personal {
  .content {
    display: flex;
    .left {
      padding: 20px;
      padding-left: 0;
      width: 160px;
      border-right: @border;
      .avatar {
        .img {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
    .right {
      padding: 20px;
      > div {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        span {
          width: 70px;
        }
      }
    }
  }
}
</style>
