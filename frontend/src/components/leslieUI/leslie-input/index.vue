<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-29 16:47:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-16 22:38:25
 * 佛祖保佑没bug
-->
<template>
  <div class="leslie-input">
    <div class="input-box" v-if="!isSelect && !isTextArea">
      <input
        :placeholder="placeholder"
        class="le-input"
        v-model="inputRef.val"
        :type="showPassword &&!passwordVisible ? 'password' : 'text'"
        :style="{
          fontSize: fontSize + 'px',
          width: width + 'px',
          border: inputBorder,
          height: height + 'px',
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="svg-box" v-if="showPassword" @click="changePasswordVisible">
        <svg-icon 
          name="password-open" 
          :color="inputRef.val ? 'var(--inputColor)' : 'var(--inputPlaceholderColor)'" 
          v-if="passwordVisible" 
          class="icon"
          >
        </svg-icon>
        <svg-icon 
          name="password-close" 
          :color="inputRef.val ? 'var(--inputColor)' : 'var(--inputPlaceholderColor)'" 
          v-else 
          class="icon"
          >
        </svg-icon>
      </div>
      <!-- TODO add error text -->
      <div class="error-text" v-if="inputRef.error">{{ inputRef.message }}</div>
    </div>
    <div class="text-area-box" v-if="isTextArea">
      <textarea
        :placeholder="placeholder"
        class="text-area le-input"
        v-model="inputRef.val"
        :style="{
          fontSize: fontSize + 'px',
          width: width + 'px',
          border: inputBorder,
          resize: isResize ? 'both' : 'none',
          height: height + 'px',
          background: bgColor,
        }"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
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
import { computed, getCurrentInstance, reactive, ref, watch } from "vue";
import type { Ref } from "vue";

const { $debounce } = getCurrentInstance()?.appContext.config
  .globalProperties as any;

interface OptionType {
  text: string;
  value: string;
  selected?: boolean;
}
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  fontSize: {
    type: Number,
    default: 14,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  bgColor: {
    type: String,
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
  },
  isTextArea: {
    type: Boolean,
    default: false,
  },
  isResize: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Boolean,
    default: true,
  }
});

const inputRef = reactive({
  val: computed({
    get: () => props.modelValue || '',
    set: (val) => emit("update:modelValue", val),
}), error: false, message: "" });
const optionVisible = ref(false);
const passwordVisible = ref(false);

const selectInputRef:any = ref([]);
const lInput: Ref = ref(null);

const emit = defineEmits(["inputChange", "focus", "blur", "update:modelValue"]);

const changeSelectInput = () => {
  selectInputRef.value = []
  props.selected?.map((item) => {
    selectInputRef.value.push(item.text)
  }); 
}
const handleFocus = () => {
  emit("focus");  
}
const handleBlur = () => {
  emit("blur");
}
const changePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
}
watch(() => props.selected, () => {
 changeSelectInput()
})
// watch(modelValue, () => {
//   console.log('change modelValue', modelValue.value);
//   emit("update:modelValue", modelValue.value);
// })
const emitInput = () => {
    emit("inputChange", inputRef.val);
}
const debounceEmit = $debounce(() => {
  emitInput()
  }, 1000)
watch(inputRef, () => {
  if(props.debounce) {
    debounceEmit()
  } else {
    emitInput()
  }
});

const rotateDegree = ref('180deg');
const btnTopPosition = ref('-14px');
const showOptions = () => {
  optionVisible.value = !optionVisible.value;
  rotateDegree.value = optionVisible.value ? '0deg' : '180deg';
  btnTopPosition.value = optionVisible.value ? '-7px' : '-14px';
}

defineExpose({
  clear() {
    inputRef.val = "";
  }
})
</script>

<style lang="less" scoped>
.leslie-input {
  .input-box, .select-input-box, .text-area-box {
    --rotate-degree: v-bind(rotateDegree);
    --btn-top-position: v-bind(btnTopPosition);
    --border:v-bind(props.inputBorder);
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
    .svg-box {
      font-size: 22px;
      position: absolute;
      margin-top: 7px;
      right: 30px;
      cursor: pointer;
    }
    .text-area {
      &:hover {
        border: var(--border);
      }
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
