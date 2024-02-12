<script setup>
import { onBeforeUnmount, reactive, watch } from "vue";

import Question from "./Question.vue";
import Button from "../Button/Button.vue";
import Timer from "./Timer.vue";

const initialStates = {
  disableNext: false,
  disablePrev: true,
  answered: false,
  answerTemplateText: "Answer is not correct you got",
  points: 0,
};

const state = reactive({
  counterQuestions: 0,
  disabledNext: false,
  disabledPrev: true,
  answered: false,
  answerTemplateText: "Answer is not correct you got",
  points: 0,
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

// disable or enable button, to use Previous and Next buttons
watch(
  () => state.counterQuestions,
  (newCounter) => {
    newCounter === 0 && (state.disabledPrev = true);
    newCounter > 0 && (state.disabledPrev = false);
    newCounter === questions.length - 1 && (state.disabledNext = true);
    newCounter < questions.length - 1 && (state.disabledNext = false);
  }
);

// previous and next question button click, you can go to previous and next question, but next question appears only if answered
const handleButtonClick = (buttonType) => {
  if (buttonType === "prev") {
    state.counterQuestions > 0 &&
      state.counterQuestions < questions.length &&
      (state.counterQuestions--, Object.assign(state, initialStates));
  } else if (buttonType === "next") {
    state.counterQuestions < questions.length - 1 &&
      ((state.counterQuestions += 1), Object.assign(state, initialStates));
  }
};

// handle answer that comes from Question component, answer comes in type of number
const handleAnswer = (userAnswer) => {
  state.answered = true;
  questions[state.counterQuestions].correctOption === userAnswer &&
    ((state.answerTemplateText = "Answer is correct you got"),
    (state.points = questions[state.counterQuestions].points),
    (state.totalPoints =
      state.totalPoints + questions[state.counterQuestions].points));

  state.isQuizEnded = state.counterQuestions === 2;
};
</script>

<template>
  <div class="container">
    <Question
      :question="questions[state.counterQuestions]"
      :clickedAnswer="handleAnswer"
      :answered="state.answered"
    />
    <p v-if="state.answered">
      {{ state.answerTemplateText }} {{ state.points }} points
    </p>

    <Button
      v-if="state.answered"
      :disabled="state.disabledPrev"
      :onClick="() => handleButtonClick('prev')"
      >Previous
    </Button>
    <Button
      v-if="state.answered && !state.isQuizEnded"
      :disabled="state.disabledNext"
      :onClick="() => handleButtonClick('next')"
    >
      Next
    </Button>
    <Button
      v-if="state.isQuizEnded"
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
</template>
