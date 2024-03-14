<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 21:20:08
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-14 22:22:47
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-radio">
    <!-- TODO 实现点击文字也能切换，修改选中样式 -->
    <div
      class="radio-box"
      v-if="radioType === 'radio'"
      v-for="(option, index) in radioOptions"
      :key="index"
      @change="onRadioChange(option)"
    >
      <input type="radio" v-model="selected" :value="option.value" />
      <label :for="option.value">{{ option.text }}</label>
    </div>
  </div>
  <div
    class="radio-button-box"
    v-if="radioType === 'button'"
    v-for="(option, index) in radioOptions"
    :key="index"
    @change="onRadioChange(option)"
  >
    <leslie-button
      class="radio-button"
      :class="{ 'is-selected': option.selected }"
      >{{ option.text }}</leslie-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface OptionType {
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
const selected = ref("");
selected.value = props.radioOptions.filter(
  (option) => option.selected
)[0].value;

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
const onRadioChange = (option: OptionType) => {
  console.log(selected.value);
};
</script>

<style lang="less" scoped>
.leslie-radio {
}
</style>
