<template>
  <button @click="onClick" class="Button" :disabled="disabled">
    <slot>click me</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: Boolean,
  onClick: Function,
});
</script>
