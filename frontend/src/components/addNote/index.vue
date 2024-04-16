<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 15:45:25
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-16 21:20:46
 * 佛祖保佑没bug
-->
<template>
  <div class="add-note">
    <div class="note-top">
      <div class="note-title">
        <leslie-input
          placeholder="请输入标题"
          :width="500"
          inputBorder="none"
          :fontSize="24"
          v-model="title"
        ></leslie-input>
      </div>
      <div class="note-submit">
        <span class="note-prompt">文章将自动保存至草稿箱</span>
        <leslie-button class="note-draft" @click="onSave">草稿箱</leslie-button>
        <leslie-button btnType="primary" @click="onSubmit" ref="noteSubmit"
          >发布</leslie-button
        >
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
  <!-- TODO: 1.实现去除v-if获取到的位置仍是正确的，现由于生命周期，无法获取到正确的位置 
      TODO: 2.getLabelPosition方法不应该在这个组件实现，应该在子组件实现 -->
  <leslie-panel
    :width="520"
    v-if="panelVisible"
    :panelVisible.sync="panelVisible"
    :positionTop="positionTop"
    :positionRight="positionRight"
    panelTitle="文章分类"
  >
    <template #content>
      <leslie-form
        :formData="formData"
        :radioOptions="radioOptions"
        radioType="button"
        :selectOptions="selectOptions"
        selectMultiple
        :optionLimitLength="2"
        @radioSelected="radioSelected"
        @selectSelected="selectSelected"
      ></leslie-form>
    </template>
    <template #footer>
      <leslie-button class="close-button" @click="panelVisible = false"
        >取消</leslie-button
      >
      <leslie-button btnType="primary" class="submit-button" @click="onConfirm"
        >确定并发布</leslie-button
      >
    </template>
  </leslie-panel>
</template>

<script setup lang="ts">
import showMessage from "@/global/leslie-message.ts";
import { createContent, getClassificationList, getLabelList } from "@/server";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import MarkDownIt from "markdown-it";
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import type { Ref } from "vue";

const { $debounce } = getCurrentInstance()?.appContext.config
  .globalProperties as any;

const formData = ref([
  {
    type: "radio",
    label: "分类：",
    value: "classify",
    required: true,
  },
  {
    type: "select",
    label: "添加标签：",
    value: "label",
    required: true,
  },
]);
const radioOptions = ref([]);
const selectOptions = ref([]);

const classSelected = ref(0);
const labelSelected = ref([] as number[]);
const radioSelected = (value: number) => {
  classSelected.value = value;
};
const selectSelected = (value: number[]) => {
  labelSelected.value = value;
};

const title = ref("");
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
const parseHtml = ref("");

const panelVisible = ref(false);
const positionTop = ref(0);
const positionRight = ref(0);
const noteSubmit: Ref = ref(null);

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
const getLabelPosition = () => {
  let positionData = noteSubmit.value?.$el.getBoundingClientRect();
  let width = document.documentElement.clientWidth;
  positionTop.value = positionData.bottom;
  positionRight.value = width - (positionData.left + positionData.width / 2);
};

const getClassList = () => {
  getClassificationList().then((res) => {
    radioOptions.value = res;
  });
};
const getTagList = async () => {
  const res = await getLabelList();
  selectOptions.value = res;
};

const onSave = () => {
  // TODO 保存至草稿箱
  showMessage("保存至草稿箱");
};

const saveData = () => {
  if (!classSelected.value) {
    showMessage.error("请选择分类");
    return;
  }
  if (!labelSelected.value.length) {
    showMessage.error("请选择标签");
    return;
  }

  let data = {
    type: 0,
    author: "leslie",
    title: title.value,
    content: valueHtml.value,
    browse: 0,
    likes: 0,
    label: labelSelected.value,
    classification: classSelected.value,
    time: new Date().getTime(),
  };
  createContent(data).then(() => {
    showMessage("发布成功");
  });
};

const onSubmit = () => {
  if (!title.value) {
    showMessage.error("请输入标题");
    return;
  }
  if (!parseHtml.value) {
    showMessage.error("请输入内容");
    return;
  }
  getLabelPosition();
  panelVisible.value = true;
};

const onConfirm = () => {
  saveData();
  panelVisible.value = false;
};

onMounted(() => {
  getClassList();
  getTagList();
});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
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
