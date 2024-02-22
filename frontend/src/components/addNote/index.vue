<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-22 21:34:50
 * 佛祖保佑没bug
-->
<template>
  <!-- TODO 头部加个标题栏，右侧有存进草稿箱或发布按钮 -->
  <!-- TODO 争取实现全屏，左侧写右侧是效果   -->
  <div class="add-note">
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
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

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
</script>

<style lang="less" scoped>
.add-note {
  border: 1px solid #ccc;
  height: 100%;
  .note-tooltip {
    border-bottom: 1px solid #ccc;
  }
}
</style>
