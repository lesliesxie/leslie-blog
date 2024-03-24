<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-13 21:19:53
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-24 20:34:33
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-select">
    <leslie-input
      ref="lInput"
      :selected="selected"
      class="leslie-input"
      isSelect
    >
      <leslie-popover
        :positionWidth="positionWidth"
        :positionHeight="positionHeight"
      >
        <template #content>
          <leslie-option
            @change="optionChange"
            :selectOptions="initOptions"
            :selectMultiple="selectMultiple"
            :optionLimitLength="optionLimitLength"
          ></leslie-option>
        </template>
      </leslie-popover>
    </leslie-input>
  </div>
</template>
<!-- TODO 1.select样式参照el-select 2.关闭组件再打开时option的数据仍存在但select不存在，会有偏差  3.选择时有先后顺序-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

interface OptionType {
  id: number;
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
  },
  optionLimitLength: {
    type: Number,
  },
});

const initOptions = ref([] as OptionType[]);
const selected = ref([] as OptionType[]);
const emit = defineEmits(["selectSelected"]);

const optionChange = (val: OptionType[]) => {
  selected.value = [];
  val.map((item: OptionType) => {
    if (item.selected) {
      selected.value.push(item);
    }
  });
  initOptions.value = val;

  const selectValue = selected.value.map((item) => item.id);
  emit("selectSelected", selectValue);
};

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
  initOptions.value = props.selectOptions.map((item) => {
    return { ...item, selected: false };
  });
});
onUnmounted(() => {
  console.log(112221);
});
</script>

<style lang="less" scoped>
.leslie-select {
}
</style>
