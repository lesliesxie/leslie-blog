<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-26 22:27:00
 * @LastEditors: leslie
 * @LastEditTime: 2024-05-04 20:30:26
 * 佛祖保佑没bug
-->

<template>
  <div class="comment">
    <div class="total-box">
      <div class="title">评论</div>
      <div class="total">{{ commentList.length }}</div>
    </div>
    <div class="submit">
      <div v-if="isLogin" class="submit-box">
        <div class="avatar"></div>
        <div class="input" :class="{ focus: inputFocus }">
          <leslie-input
            ref="inputRef"
            inputBorder="none"
            :isTextArea="true"
            :width="inputWidth"
            :height="inputFocus ? 80 : 40"
            :bgColor="inputFocus ? '' : 'var(--inputBgColor)'"
            class="input-content"
            @focus="inputFocus = true"
            @blur="inputFocus = false"
            placeholder="说点什么吧"
            @inputChange="inputChange"
            v-model="commentContent"
          />
          <leslie-button
            btnType="primary"
            class="submit"
            :disabled="!commentContent"
            @click="submit"
            @mousedown.prevent
            >发送</leslie-button
          >
        </div>
      </div>
      <div v-else class="submit-box">
        <div class="avatar"></div>
        <div class="login-box" @click="login">
          <leslie-button btnType="primary" class="login"
            >登录 / 注册</leslie-button
          >
          <span>登录以发表评论</span>
        </div>
      </div>
    </div>
    <div class="sort">
      <span
        class="hot"
        @click="changeActive('hot')"
        :style="{ color: isActive === 'hot' ? 'var(--itemHoverColor)' : '' }"
        >最热</span
      >
      <div class="footer-divider"></div>
      <span
        class="new"
        @click="changeActive('new')"
        :style="{ color: isActive === 'new' ? 'var(--itemHoverColor)' : '' }"
        >最新</span
      >
    </div>
    <div class="comment-list">
      <div v-for="item in commentList" class="list">
        <div class="avatar"></div>
        <div class="right">
          <div class="name">{{ item.author }}</div>
          <div class="content">{{ item.content }}</div>
          <div class="bottom">
            <div class="date">{{ item.createTime }}</div>
            <div class="likes">
              <svg-icon
                class="icon"
                name="likes"
                width="16"
                color="var(--inputPlaceholderColor)"
              ></svg-icon>
              {{ item.likes }}
            </div>
            <div class="reply"></div>
          </div>
        </div>
      </div>
    </div>
    <Login v-if="showLogin"></Login>
  </div>
</template>

<script setup lang="ts">
import { getCommentList, createComment } from "@/server";
import moment from "moment";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { useAuthStore } from "@/store";
import bus from "@/global/event-bus";

const route = useRoute();
const id = route.path.split("/").slice(-1)[0];

const auth = useAuthStore();

interface CommentType {
  author: string;
  content: string;
  createTime: Date;
  likes: number;
}

const commentList = ref<CommentType[]>([]);
const isLogin = ref(false);
const showLogin = ref(false);
const inputFocus = ref(false);
const isActive = ref("hot");

const commentContent = ref("");

const inputWidth = ref(0);
const inputRef: Ref = ref(null);

const login = () => {
  showLogin.value = true;
};
const changeActive = (key: string) => {
  isActive.value = key;
};

const inputChange = (value: string) => {
  commentContent.value = value;
};
const submit = () => {
  let param = {
    author: "leslie",
    avatar: "",
    content: commentContent.value,
    createTime: new Date(),
    likes: 0,
    comment: 0,
  };
  createComment(Number(id), param).then(() => {
    inputRef.value.clear();
    param.createTime = moment(param.createTime).format(
      "YYYY-MM-DD"
    ) as unknown as Date;
    commentList.value.unshift(param);
  });
};

const getInputWidth = () => {
  const inputDom = document.querySelector(".input")?.getBoundingClientRect();
  inputWidth.value = inputDom?.width as number;
};
const getComments = async () => {
  let data = await getCommentList(Number(id));
  bus.emit("commentNum", data.length);
  commentList.value = data.map((item: CommentType) => {
    return {
      ...item,
      createTime: moment(item.createTime).format("YYYY-MM-DD"),
    };
  });
};
watch(
  () => auth.isLogin,
  () => {
    isLogin.value = auth.isLogin;
  }
);
onMounted(() => {
  getComments();
  getInputWidth();
  if (localStorage.getItem("isLogin") === "true") {
    isLogin.value = true;
  }
});
</script>

<style lang="less" scoped>
.comment {
  padding: 20px;
  .total-box {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    .title {
      margin-right: 5px;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: 100%;
    cursor: pointer;
    background-image: url("../../assets/images/avatar.JPG");
  }
  .submit {
    margin: 20px 0;
    .submit-box {
      display: flex;
      width: 100%;
      .input,
      .login-box {
        margin-left: 10px;
        width: calc(100% - 50px);
        height: 80px;
        border-radius: 3px;
      }
      .input {
        // display: flex;
        background-color: @inputBgColor;
        border: @border;
        &-content {
        }
        .submit {
          border-radius: 2px;
          float: right;
          margin: 6px 10px;
        }
      }
      .focus {
        height: 120px;
        background-color: @contentBgColor;
      }
      .login-box {
        background-color: @inputBgColor;
        display: flex;
        justify-content: center;
        align-items: center;
        .login {
          margin-right: 10px;
          border-radius: 2px;
        }
      }
    }
  }
  .sort {
    display: flex;
    .hot {
      margin-right: 10px;
      cursor: pointer;
    }
    .footer-divider {
      width: 1px;
      height: 14px;
      background-color: @menuBorderColor;
      margin-top: 4px;
    }
    .new {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .comment-list {
    .list {
      display: flex;
      margin-top: 10px;
      .right {
        margin-left: 10px;
        .name {
          margin-top: 10px;
          font-size: 15px;
          font-weight: 400;
        }
        .content {
          margin: 10px 0;
          font-size: 15px;

          font-weight: 400;
        }
        .bottom {
          display: flex;
          .likes {
            margin: 0 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .icon {
              margin-right: 3px;
              margin-top: -1px;
            }
          }
        }
      }
    }
  }
}
</style>
