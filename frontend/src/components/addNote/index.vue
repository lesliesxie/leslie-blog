<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-19 14:30:42
 * 佛祖保佑没bug
-->
<template>
  <div class="add-note">
    <!-- TODO 实现新增笔记页面 -->
    <!-- <input type="text" v-model="noteTitle" placeholder="请输入标题" />
    <div
      contenteditable="true"
      ref="editor"
      class="custom-editor"
      @input="updateNoteContent"
    ></div>
    <input type="file" @change="handleFileUpload" />
    <button @click="saveNote">保存</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const noteTitle = ref("");
const noteContent = ref("");
const editor = ref<HTMLElement | null>(null);
let selectedFile: File | null = null;
const updateNoteContent = () => {
  noteContent.value = editor.value?.innerHTML || "";
};
const handleFileUpload = (e: Event) => {
  selectedFile = (e.target as HTMLInputElement).files?.[0] || null;
};
const saveNote = async () => {
  console.log("111");
};
</script>

<style lang="less" scoped>
.add-note {
}
</style>
