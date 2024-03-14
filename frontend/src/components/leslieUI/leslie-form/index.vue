<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 20:41:47
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-14 22:09:21
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-form" v-for="(item, index) of formData" :key="index">
    <div class="form-item" v-if="item.type === 'input'">
      <div class="item-content">
        <span class="form-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-input></leslie-input>
      </div>
      <span class="item-error" v-if="item.error">{{ item.error }}</span>
    </div>
    <div class="form-item" v-if="item.type === 'select'">
      <div class="item-content">
        <span class="form-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-select :selectOptions="selectOptions"></leslie-select>
      </div>
      <span class="item-error" v-if="item.error">{{ item.error }}</span>
    </div>
    <div class="form-item" v-if="item.type === 'radio'">
      <div class="item-content">
        <span class="form-label" :class="{ 'is-required': item.required }">{{
          item.label
        }}</span>
        <leslie-radio
          :radioType="radioType"
          :radioOptions="radioOptions"
        ></leslie-radio>
      </div>
      <span class="item-error" v-if="item.error">{{ item.error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
  checkboxOptions: {
    type: Array<CheckboxOptions>,
  },
});
</script>

<style lang="less" scoped>
.leslie-form {
  margin: 20px;
  .form-item {
    margin-bottom: 10px;
    .item-content {
      display: flex;
      .form-label {
        font-weight: normal;
      }
      .is-required::before {
        content: "*";
        margin-right: 4px;
        vertical-align: middle;
        color: @messageErrorColor;
      }
    }
    .item-error {
      color: @messageErrorColor;
    }
  }
}
</style>
