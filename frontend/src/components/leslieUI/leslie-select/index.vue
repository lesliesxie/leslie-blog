<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 21:19:53
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-20 22:57:11
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-select">
    <leslie-input ref="lInput" class="leslie-input" isSelect>
      <leslie-popover
        :positionWidth="positionWidth"
        :positionHeight="positionHeight"
      >
        <template #content>
          <leslie-option :selectOptions="selectOptions"></leslie-option>
        </template>
      </leslie-popover>
    </leslie-input>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";

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
const selected = ref();
const positionWidth = ref(0);
const positionHeight = ref(0);
const lInput: Ref = ref(null);
const getPosition = () => {
  let positionData = lInput.value?.$el.getBoundingClientRect();
  positionWidth.value = positionData.width;
  positionHeight.value = positionData.height;
};
onMounted(() => {
  getPosition();
});
</script>

<style lang="less" scoped>
.leslie-select {
}
</style>
