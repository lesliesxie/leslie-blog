<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 21:19:53
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 20:33:24
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-select">
    <leslie-input isSelect v-model="selected">
      <slot name="option">
        <leslie-popover>123</leslie-popover>
      </slot>
    </leslie-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface OptionType {
  label: string;
  value: string;
  selected?: boolean;
}
const props = defineProps({
  selectOptions: {
    type: Array<OptionType>,
    required: true,
  },
});
const selected = ref();
</script>

<style lang="less" scoped>
.leslie-select {
}
</style>
