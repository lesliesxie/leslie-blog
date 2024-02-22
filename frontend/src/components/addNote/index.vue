<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-22 18:55:33
 * 佛祖保佑没bug
-->
<template>
  <div class="add-note">
    <Toolbar
      class="note-tooltip"
      ref="note-tooltip"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="note-editor"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
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
  .note-editor {
    overflow-y: hidden;
    height: 500px;
  }
}
</style>
