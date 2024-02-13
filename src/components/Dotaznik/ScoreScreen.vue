<script setup>
import { ref, watch } from "vue";

import formatTime from "../../utils/formatTime";

const results = ref(JSON.parse(localStorage.getItem("results") ?? "[]"));
const timeArraySorted = ref([]);
const successArraySorted = ref([]);
const props = defineProps({
  totalPoints: Number,
  timeSpent: Number,
  totalQuestions: Number,
});

function countCorrectAnswers() {
  return (
    (props.totalPoints * props.totalQuestions) / (props.totalQuestions * 10)
  );
}
function sortByTime() {
  timeArraySorted.value = results.value
    .slice(0, 5)
    .sort((a, b) => a.timeSpent - b.timeSpent);
}

function sortBySuccessPercent() {
  successArraySorted.value = results.value
    .slice(0, 5)
    .sort((a, b) => b.answersByPercent - a.answersByPercent);
}

function countCorrectAnswersPercent() {
  return ((props.totalPoints / props.totalQuestions) * 10).toFixed(1);
}

watch(
  () => props.timeSpent,
  () => {
    results.value.push({
      timeSpent: props.timeSpent,
      answersByPercent: countCorrectAnswersPercent(),
    });
    localStorage.setItem("results", JSON.stringify(results.value));
  }
);

watch(results.value, function () {
  results.value.length >= 4 && sortByTime();
  results.value.length >= 4 && sortBySuccessPercent();
});
</script>

<template>
  <div>
    <p>Time spent: {{ formatTime(timeSpent) }}</p>
    {{}}
    <p>
      Correct answers: {{ countCorrectAnswers() }} out of
      {{ totalQuestions }} questions ({{ countCorrectAnswersPercent() }}%)
    </p>
    <div v-if="results.length >= 4" class="flex justify-between">
      <div class="mt-10">
        <p class="text-lg mb-5">From Best to Worst time:</p>
        <p v-for="el in timeArraySorted">
          {{ formatTime(el.timeSpent) }}
        </p>
      </div>
      <div class="mt-10">
        <p class="text-lg mb-5">From Best Total Percent to Worst:</p>
        <p v-for="el in successArraySorted">{{ el.answersByPercent }}</p>
      </div>
    </div>
  </div>
</template>
