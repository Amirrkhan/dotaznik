<template>
  <button
    class="button focus:outline-none hover:scale-110 duration-200 transition ease"
    @click="onClick"
  >
    <slot>click me</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: Boolean,
  onClick: Function,
});
</script>
