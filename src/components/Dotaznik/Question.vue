<script setup>
import { ref, watch } from "vue";
let answerSubmitted = ref(false);

const props = defineProps({
  question: Object,
  clickedAnswer: Function,
});

watch(answerSubmitted, (nextVal, prevVal) => {
  console.log(nextVal, prevVal);
});
</script>
<template>
  <div class="question">
    <div class="title">
      {{ question.question }}
    </div>
    <div class="options">
      <ul>
        <li
          v-for="(option, index) in question.options"
          v-bind="answerSubmitted ? 'disabled' : ''"
          @click="() => clickedAnswer(index)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.disabled {
  pointer-events: none;
}
</style>
