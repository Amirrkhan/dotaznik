<script setup>
import { reactive, watch } from "vue";

import Question from "./Question.vue";
import Button from "../Button/Button.vue";

// for rewritign states after Next Button Clicked
const initialStates = {
  answered: false,
  answerTemplateText: "Answer is not correct, you got",
  points: 0,
  answeredOption: null,
};

const state = reactive({
  counterQuestions: 0,
  answered: false,
  answerTemplateText: "Answer is not correct, you got",
  points: 0,
  answeredOption: null,
  isQuizEnded: false,
  totalPoints: 0,
  timeSpent: 0,
});

const props = defineProps({
  handleQuizEnd: Function,
});

//fetching data
const questions = await fetch("http://localhost:3000/questions")
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(err.message));

// previous and next question button click, you can go to previous and next question, but next question appears only if answered
function handleButtonClick() {
  state.counterQuestions < questions.length - 1 &&
    ((state.counterQuestions += 1), Object.assign(state, initialStates));
}

// handle answer that comes from Question component, answer comes in type of number
function handleAnswer(userAnswer) {
  state.answered = true;
  state.answeredOption = userAnswer;
  questions[state.counterQuestions].correctOption === userAnswer &&
    ((state.answerTemplateText = "Answer is correct, you got"),
    (state.points = questions[state.counterQuestions].points),
    (state.totalPoints =
      state.totalPoints + questions[state.counterQuestions].points));

  state.isQuizEnded = state.counterQuestions === questions.length - 1;
}
</script>

<template>
  <div class="w-full">
    <header class="mb-5">
      <p>{{ state.counterQuestions + 1 }} question of {{ questions.length }}</p>
    </header>
    <Question
      :question="questions[state.counterQuestions]"
      @newAnswer="handleAnswer"
      :answered="state.answered"
      :answeredOption="state.answered ? state.answeredOption : null"
    />
    <p v-if="state.answered">
      {{ state.answerTemplateText }} {{ state.points }} points
    </p>
    <div class="mt-7 relative">
      <Button
        class="absolute right-0 bg-custom-theme"
        v-if="state.answered && !state.isQuizEnded"
        :onClick="() => handleButtonClick('next')"
      >
        Next
      </Button>
      <Button
        v-if="state.isQuizEnded"
        class="absolute right-0 bg-custom-theme"
        @click="
          handleQuizEnd({
            totalPoints: state.totalPoints,
            totalQuestions: questions.length,
            isQuizEnded: state.isQuizEnded,
          })
        "
        >Go to results</Button
      >
    </div>
  </div>
</template>
