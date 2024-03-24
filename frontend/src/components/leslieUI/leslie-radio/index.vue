<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 21:20:08
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-24 20:30:25
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-radio">
    <div
      class="radio-box"
      v-if="radioType === 'radio'"
      v-for="(option, index) in radioOptions"
      :key="index"
      @click="onRadioChange(index)"
    >
      <label
        class="radio-label"
        :class="{ 'is-selected': option.selected }"
        :for="option.value"
        >{{ option.text }}</label
      >
    </div>
    <div
      class="radio-button-box"
      v-if="radioType === 'button'"
      v-for="(option, index) in radioOptions"
      :key="index"
      @click="onRadioChange(index)"
    >
      <leslie-button
        btnType="info"
        class="radio-button"
        :class="{ 'is-selected': option.selected }"
        >{{ option.text }}</leslie-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface OptionType {
  id: number;
  text: string;
  value: string;
  selected?: boolean;
}
const props = defineProps({
  radioType: {
    type: String,
    default: "radio",
  },
  radioOptions: {
    type: Array<OptionType>,
    default: () => {
      return [];
    },
  },
});
const selected = ref(
  props.radioOptions.filter((option) => option.selected)?.[0]?.id || 0
);

const emit = defineEmits(["radioSelected"]);

const validateRadioOptions = (options: OptionType[]): void => {
  let selectedCount = 0;
  for (const option of options) {
    if (option.selected) {
      selectedCount++;
      if (selectedCount > 1) {
        throw new Error("Validation failed: Only one option can be selected");
      }
    }
  }
};
const validateType = (type: string): void => {
  if (type !== "radio" && type !== "button") {
    throw new Error("Validation failed: Invalid type");
  }
};
try {
  validateRadioOptions(props.radioOptions);
  validateType(props.radioType);
} catch (error) {
  console.error(error);
}
const onRadioChange = (index: number) => {
  props.radioOptions.map((option) => {
    option.selected = false;
    if (option.value === props.radioOptions[index].value) {
      selected.value = option.id;
      option.selected = true;
    }
  });
  emit("radioSelected", selected.value);
};
</script>

<style lang="less" scoped>
.leslie-radio {
  .radio-box {
    margin-right: 12px;
    .radio-label {
      cursor: pointer;
    }
    .radio-label::before {
      content: "";
      display: inline-block;
      width: 11px;
      height: 11px;
      position: relative;
      top: 1px;
      border-radius: 50%;
      border: @border;
      margin-right: 5px;
    }
    .is-selected {
      color: @primaryBtnBgColor;
    }
    .is-selected::before {
      border-color: @primaryBtnBgColor;
      background-color: @primaryBtnBgColor;
    }
  }
  .radio-button-box {
    margin-right: 10px;
    .radio-button {
    }
    .is-selected {
      color: @btnColor;
      background-color: @infoBtnSelectedBgColor;
    }
  }
}
</style>
