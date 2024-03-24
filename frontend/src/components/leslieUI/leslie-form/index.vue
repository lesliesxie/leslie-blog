<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 20:41:47
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-24 20:27:17
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-form">
    <div v-for="(item, index) of formData" class="form-item" :key="index">
      <div class="item-content" v-if="item.type === 'input'">
        <span class="item-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-input></leslie-input>
      </div>
      <div class="item-content" v-if="item.type === 'select'">
        <span class="item-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-select
          class="item-component"
          :selectOptions="selectOptions"
          :selectMultiple="selectMultiple"
          :optionLimitLength="optionLimitLength"
          @selectSelected="selectSelected"
        ></leslie-select>
      </div>
      <div class="item-content" v-if="item.type === 'radio'">
        <span class="item-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-radio
          class="item-component"
          :radioType="radioType"
          :radioOptions="radioOptions"
          @radioSelected="radioSelected"
        ></leslie-radio>
      </div>
      <span class="item-error" v-if="item.error">{{ item.error }}</span>
    </div>
  </div>
</template>
<!-- TODO 组件通信优化 -->
<script setup lang="ts">
import { onMounted, ref } from "vue";

type itemType = "input" | "select" | "radio" | "checkbox" | "textarea";
interface FormData {
  type: itemType;
  label: string;
  value: string;
  required?: boolean;
  validate?: object[];
}
interface InputType {
  label: string;
  value: string;
}
interface CheckboxOptions {
  text: string;
  value: string;
}
interface RadioOptions {
  text: string;
  value: string;
  selected?: boolean;
}
interface SelectOptions {
  text: string;
  value: string;
}
const props = defineProps({
  formData: {
    type: Array<FormData>,
    required: true,
  },
  // inputOptions: {
  //   type: ,
  // },
  radioType: {
    type: String,
    default: "radio",
  },
  radioOptions: {
    type: Array<RadioOptions>,
  },
  selectOptions: {
    type: Array<SelectOptions>,
  },
  selectMultiple: {
    type: Boolean,
  },
  optionLimitLength: {
    type: Number,
  },
  checkboxOptions: {
    type: Array<CheckboxOptions>,
  },
});
const labelWidth = ref("");

const emit = defineEmits(["radioSelected", "selectSelected"]);
const selectSelected = (value: number[]) => {
  emit("selectSelected", value);
};
const radioSelected = (value: number) => {
  emit("radioSelected", value);
};

onMounted(() => {
  let labelArr = Array.from(document.querySelectorAll(".item-label")).map(
    (item) => {
      return item.clientWidth;
    }
  );
  labelWidth.value = `${Math.max(...labelArr)}px`;
});
</script>

<style lang="less" scoped>
.leslie-form {
  width: 100%;
  .form-item {
    margin-bottom: 10px;
    .item-content {
      display: flex;
      align-items: center;
      min-height: 30px;
      --label-width: v-bind(labelWidth);
      .item-label {
        height: 30px;
        line-height: 30px;
        width: var(--label-width);
        position: absolute;
        font-weight: normal;
        text-align: right;
      }
      .is-required::before {
        content: "*";
        margin-right: 4px;
        vertical-align: middle;
        color: @messageErrorColor;
      }
      .item-component {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        gap: 10px 0;
        margin-left: calc(var(--label-width) + 5px);
      }
    }
    .item-error {
      color: @messageErrorColor;
    }
  }
}
</style>
