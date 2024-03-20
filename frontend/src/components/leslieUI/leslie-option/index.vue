<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-20 22:55:47
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-20 23:04:10
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-option">
    <div
      class="select-option"
      v-for="(item, index) in selectOptions"
      :key="index"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
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
});
</script>

<style lang="less" scoped>
.leslie-option {
  .select-option {
    cursor: pointer;
  }
  .select-option + .select-option {
  }
}
</style>
