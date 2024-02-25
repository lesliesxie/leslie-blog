<template>
  <input
    class="leslie-input"
    :style="{ fontSize: fontSize + 'px', width: width + 'px' }"
  />
</template>

<script setup lang="ts">
defineProps({
  fontSize: {
    type: String,
  },
  width: {
    type: String,
  },
});
</script>

<style lang="less" scoped>
.leslie-input {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  min-height: 28px;
}
</style>
