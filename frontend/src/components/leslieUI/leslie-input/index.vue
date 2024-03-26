<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-29 16:47:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-26 20:53:31
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-input">
    <div class="input-box" v-if="!isSelect">
      <input
        :placeholder="placeholder"
        class="le-input"
        v-model="inputRef.val"
        :style="{
          fontSize: fontSize + 'px',
          width: width + 'px',
          border: inputBorder,
        }"
      />
      <!-- TODO add error text -->
      <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
    </div>
    <div class="select-input-box" v-if="isSelect">
      <input
        :placeholder="placeholder"
        class="le-input is-select"
        :readonly="isSelect"
        ref="lInput"
        :value="selectInputRef"
        @click="showOptions"
        :style="{
          fontSize: fontSize + 'px',
          width: width + 'px',
          border: inputBorder,
        }"
        ><span class="is-select"></span>
        <slot v-if="optionVisible"></slot>
      </input>
      <!-- TODO add error text -->
      <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, watch } from "vue";
import type { Ref } from "vue";

const { $debounce } = getCurrentInstance()?.appContext.config
  .globalProperties as any;

interface OptionType {
  text: string;
  value: string;
  selected?: boolean;
}
const props = defineProps({
  fontSize: {
    type: Number,
    default: 14,
  },
  width: {
    type: Number,
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  inputBorder: {
    type: String,
    default: "1px solid #e9e0e9",
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Array<OptionType>,
  }
});
const inputRef = reactive({ val: "", error: false, message: "" });
const optionVisible = ref(false);

const selectInputRef:any = ref([]);
const lInput: Ref = ref(null);

const emit = defineEmits(["inputChange"]);

const changeSelectInput = () => {
  selectInputRef.value = []
  props.selected?.map((item) => {
    selectInputRef.value.push(item.text)
  }); 
}
watch(() => props.selected, () => {
 changeSelectInput()
  
})
const debounceEmit = $debounce(() => {
    emit("inputChange", inputRef.val);
  }, 1000)
watch(inputRef, () => {
  debounceEmit()
});

const rotateDegree = ref('180deg');
const btnTopPosition = ref('-14px');
const showOptions = () => {
  optionVisible.value = !optionVisible.value;
  rotateDegree.value = optionVisible.value ? '0deg' : '180deg';
  btnTopPosition.value = optionVisible.value ? '-7px' : '-14px';
}
</script>

<style lang="less" scoped>
.leslie-input {
  .input-box, .select-input-box {
    --rotate-degree: v-bind(rotateDegree);
    --btn-top-position: v-bind(btnTopPosition);
    display: flex;
    align-items: center;
    .le-input {
      margin: 0;
      padding: 0;
      outline: none;
      min-height: 28px;
      color: @inputColor;
      border-radius: @inputBorderRadius;
    }
    ::placeholder {
      color: @inputPlaceholderColor;
    }
    .is-select {
      cursor: pointer;
      display: inline-block;
      user-select: none;
    }
    .is-select::before {
      content: "^";
      color: @inputPlaceholderColor;
      scale: 1.5;
      position: absolute;
      margin-top: var(--btn-top-position);
      margin-left: -16px;
      transform: rotate(var(--rotate-degree));
       -webkit-transform: rotate(var(--rotate-degree));
    }
  }
}
</style>
