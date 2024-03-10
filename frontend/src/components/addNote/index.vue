<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-10 17:25:10
 * 佛祖保佑没bug
-->
<template>
  <!-- TODO 争取实现全屏，左侧写右侧是效果   -->
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
        <leslie-button @click="onSubmit">发布</leslie-button>
      </div>
    </div>
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
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import showMessage from "@/global/leslie-message.ts";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
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
  showMessage("保存至草稿箱");
};

const onSubmit = () => {
  // TODO 发布
};
</script>

<style lang="less" scoped>
.add-note {
  height: 100%;
  position: fixed; //禁止上拉下拉露出白底
  .note-top {
    display: flex;
    justify-content: space-between;
    // position: fixed;
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
      .note-draft {
        margin: 0 20px;
      }
    }
  }
  .note-content {
    border: 1px solid #ccc;
    .note-tooltip {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
