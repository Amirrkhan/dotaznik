<script setup>
import { ref } from "vue";

const correct = ref(false);
const props = defineProps({
  question: Object,
  clickedAnswer: Function,
  answered: Boolean,
  answeredOption: null,
});
</script>
<template>
  <div class="question w-full">
    <div class="title text-xl mb-3">
      {{ question.question }}
    </div>
    <button
      class="p-2 flex flex-col w-[100%] text-left gap-5 text-lg bg-custom-dark mb-2 rounded-2xl cursor-pointer duration-500 transition ease hover:shadow-2xl border-none focus:outline-none"
      v-for="(option, index) in question.options"
      :class="
        index === props.answeredOption
          ? 'bg-custom-theme translate-x-3 '
          : answered
          ? 'bg-custom-accent'
          : ''
      "
      @click="$emit('newAnswer', !answered ? index : null)"
      :disabled="answered"
      :key="index"
    >
      {{ option }}
    </button>
  </div>
</template>

<style>
.disabled {
  pointer-events: none;
}
</style>
