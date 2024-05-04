<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-14 19:46:34
 * @LastEditors: leslie
 * @LastEditTime: 2024-05-04 17:25:46
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
              <leslie-input v-model="user.userName"></leslie-input>
            </div>
            <div class="password">
              <span>密码</span>
              <leslie-input v-model="user.password"></leslie-input>
            </div>
            <div class="sign">
              <span>个性签名</span>
              <leslie-input></leslie-input>
            </div>
            <leslie-button class="edit" @click="onEdit" btnType="primary"
              >修改</leslie-button
            >
          </div>
        </div>
      </template>
    </leslie-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import bus from "@/global/event-bus";
import { getUser, updateUser } from "@/server";
import showMessage from "@/global/leslie-message";

const personalVisible = ref(true);
let user = reactive({
  id: 0,
  userName: "",
  password: "",
});
const dialogTitle = ref("个人中心");
const avatar = ref("/src/assets/images/avatar.JPG");

const onEdit = async () => {
  await updateUser(user.id, user);
  showMessage.success("修改成功");
  localStorage.setItem("userName", user.userName);
  dialogTitle.value = user.userName + "  的个人中心";
  personalVisible.value = false;
};

onMounted(async () => {
  if (localStorage.getItem("isLogin") === "true") {
    user.userName = localStorage.getItem("userName") as string;
    dialogTitle.value = user.userName + "  的个人中心";
    let data = await getUser(user.userName);
    // 对象赋值不更改会页面无法及时渲染
    user = Object.assign(user, data);
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
      .edit {
        margin-top: 24px;
      }
    }
  }
}
</style>
