<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-20 22:55:47
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-23 22:09:06
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-option">
    <div
      class="select-option"
      v-for="(item, index) in selectOptions"
      :key="index"
      :class="{ 'is-selected': item.selected }"
      @click="checkOption(item)"
    >
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import showMessage from "@/global/leslie-message.ts";
import { onMounted, onUnmounted } from "vue";

interface OptionType {
  text: string;
  value: string;
  selected?: boolean;
}
const props = defineProps({
  selectOptions: {
    type: Array<OptionType>,
    required: true,
  },
  selectMultiple: {
    type: Boolean,
    default: false,
  },
  optionLimitLength: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(["change"]);

const checkOption = (item: OptionType) => {
  if (!props.selectMultiple) {
    props.selectOptions.forEach((option: OptionType) => {
      option.selected = option.value === item.value ? !option.selected : false;
    });
  } else {
    const selectedCount = props.selectOptions.filter(
      (option) => option.selected
    ).length;
    if (
      !item.selected &&
      props.optionLimitLength &&
      selectedCount >= props.optionLimitLength
    ) {
      showMessage("最多只能选择" + props.optionLimitLength + "项");
      return;
    } else {
      item.selected = !item.selected;
    }
  }
  emit("change", props.selectOptions);
};
onMounted(() => {});
onUnmounted(() => {
  console.log(111);
});
</script>

<style lang="less" scoped>
.leslie-option {
  user-select: none;
  .select-option {
    cursor: pointer;
    padding: 5px;
    width: calc(100% - 10px);
    &:hover {
      background-color: @optionHoverBgColor;
    }
    span {
      margin: 0 10px;
    }
  }
  .is-selected {
    background-color: @optionSelectedBgColor;
    &:hover {
      background-color: @optionSelectedBgColor;
    }
  }
  .select-option + .select-option {
    margin-top: 3px;
  }
}
</style>
