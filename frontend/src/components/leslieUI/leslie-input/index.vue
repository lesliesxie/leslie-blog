<template>
  <input
    class="leslie-input"
    :style="{ fontSize: fontSize + 'px', width: width + 'px' }"
  />
</template>

<script setup lang="ts">
defineProps({
  fontSize: {
    type: Number,
  },
  width: {
    type: Number,
  },
});
</script>

<style lang="less" scoped>
@color: #86909c;
.leslie-input {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  min-height: 28px;
  color: @color;
}
::placeholder {
  color: @color;
}
</style>
