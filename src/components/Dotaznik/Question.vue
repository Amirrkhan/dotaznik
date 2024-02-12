<script setup>
import { ref } from "vue";
const disableClass = ref("disable");
const props = defineProps({
  question: Object,
  clickedAnswer: Function,
  answered: Boolean,
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
          @click="$emit('newAnswer', answered === false ? index : null)"
          :key="index"
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
