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

const countCorrectAnswers = () => {
  return (
    (props.totalPoints * props.totalQuestions) / (props.totalQuestions * 10)
  );
};
const sortByTime = () => {
  timeArraySorted.value = results.value
    .slice(0, 5)
    .sort((a, b) => a.timeSpent - b.timeSpent);
};

const sortBySuccessPercent = () => {
  successArraySorted.value = results.value
    .slice(0, 5)
    .sort((a, b) => b.answersByPercent - a.answersByPercent);
};

const countCorrectAnswersPercent = () => {
  return ((props.totalPoints / props.totalQuestions) * 10).toFixed(1);
};

watch(
  () => props.timeSpent,
  (nextVal, prevVal) => {
    results.value.push({
      timeSpent: props.timeSpent,
      answersByPercent: countCorrectAnswersPercent(),
    });
    localStorage.setItem("results", JSON.stringify(results.value));
  }
);

watch(results.value, (nextVal, prevVal) => {
  console.log(results.value.length);
  results.value.length >= 4 && sortByTime();
  results.value.length >= 4 && sortBySuccessPercent();
});
</script>

<template>
  <div class="container">
    <p>Time spent: {{ formatTime(timeSpent) }}</p>
    {{}}
    <p>
      Correct answers: {{ countCorrectAnswers() }} out of
      {{ totalQuestions }} questions ({{ countCorrectAnswersPercent() }}%)
    </p>
    <div>
      From Best to Worst time:
      <p v-for="el in timeArraySorted">{{ formatTime(el.timeSpent) }}</p>
    </div>
    <div>
      From Best Total Percent to Worst:
      <p v-for="el in successArraySorted">{{ el.answersByPercent }}</p>
    </div>
  </div>
</template>
