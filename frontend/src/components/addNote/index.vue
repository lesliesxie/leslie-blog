<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-13 19:06:10
 * 佛祖保佑没bug
-->
<template>
  <div class="add-note">
    <div class="note-top">
      <div class="note-title">
        <leslie-input
          placeholder="请输入标题"
          :width="500"
          :fontSize="24"
        ></leslie-input>
      </div>
      <div class="note-submit">
        <span class="note-prompt">文章将自动保存至草稿箱</span>
        <leslie-button class="note-draft" bgColor="#fff" @click="onSave"
          >草稿箱</leslie-button
        >
        <leslie-button @click="onSubmit" ref="noteSubmit">发布</leslie-button>
      </div>
    </div>
    <div class="note">
      <div class="note-content">
        <Toolbar
          class="note-tooltip"
          ref="note-tooltip"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
        />
        <Editor
          class="note-editor"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          @onCreated="handleCreated"
        />
      </div>
      <div class="note-preview" v-html="parseHtml"></div>
    </div>
  </div>
  <leslie-panel
    :positionTop="positionTop"
    :positionRight="positionRight"
    v-if="showClassify"
    panelTitle="发布文章"
  ></leslie-panel>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
} from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import showMessage from "@/global/leslie-message.ts";
import { createContent } from "@/server";
import MarkDownIt from "markdown-it";
import type { Ref } from "vue";

const { $debounce } = getCurrentInstance()?.appContext.config
  .globalProperties as any;

const title = ref("");
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
const parseHtml = ref("");

const showClassify = ref(false);
const positionTop = ref(0);
const positionRight = ref(0);
const noteSubmit: Ref = ref(null);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const debounceHtml = $debounce(() => {
  let mdText = valueHtml.value.replace(/<p>|<\/p>|<br>/gm, "\n");
  const md = new MarkDownIt();
  parseHtml.value = md.render(mdText);
}, 1000);
watch(valueHtml, () => {
  debounceHtml();
});
// 纯文本粘贴
// const customPaste = (editor, event, callback) => {
//   const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
//   if (text) {
//     editor.insertText(text);
//     event.preventDefault();
//     callback(false);
//   }
// };
const onSave = () => {
  // TODO 保存至草稿箱
  // showMessage("保存至草稿箱");
  showClassify.value = true;
  let positionData = noteSubmit.value?.$el.getBoundingClientRect();
  positionTop.value = positionData.bottom;
  positionRight.value = positionData.left + positionData.width / 2;
};

const onSubmit = () => {
  console.log("title", title.value);

  // TODO 发布
  let data = {
    type: 0,
    author: "leslie",
    title: "title",
    content: valueHtml.value,
    browse: 0,
    likes: 0,
    time: new Date().getTime(),
  };
  createContent(data).then((res) => {
    showMessage("发布成功");
  });
};
</script>

<style lang="less" scoped>
.add-note {
  height: 100%;
  width: 100%;
  position: fixed; //禁止上拉下拉露出白底
  .note-top {
    display: flex;
    justify-content: space-between;
    height: 48px;
    .note-title {
      padding: 10px;
      display: inline-block;
    }
    .note-submit {
      padding: 0 20px;
      display: flex;
      align-items: center;
      color: #c9cdd4;
      cursor: default;
      .note-prompt {
        width: 154px;
      }
      .note-draft {
        margin: 0 20px;
      }
    }
  }
  .note {
    width: 100%;
    height: calc(100vh - 48px);
    display: flex;
    .note-content {
      width: 50%;
      .note-tooltip {
        border-top: @border;
        border-bottom: @border;
        width: 100vw;
        height: 40px;
        overflow: hidden;
      }
      .note-editor {
        padding-left: 20px;
      }
    }
    .note-preview {
      padding-left: 20px;
      border-top: @border;
      width: calc(50% - 20px);
      margin-top: 41px;
      height: calc(100vh - 90px);
      background-color: @bgColor !important;
    }
  }
}
</style>
