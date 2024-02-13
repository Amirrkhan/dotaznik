<script setup>
import { ref, reactive } from "vue";

import Questions from "./Questiions.vue";
import ScoreScreen from "./ScoreScreen.vue";
import Timer from "./Timer.vue";

import Button from "../Button/Button.vue";

const isClicked = ref(false);

// Data after is quiz ended
const resultQuizData = reactive({
  isQuizEnded: false,
  totalPoints: 0,
  timeSpent: 0,
  totalQuestions: 0,
});
function restartQuiz() {
  resultQuizData.isQuizEnded = false;
}
function onQuizEnded(quizData) {
  resultQuizData.totalPoints = quizData.totalPoints;
  resultQuizData.isQuizEnded = quizData.isQuizEnded;
  resultQuizData.totalQuestions = quizData.totalQuestions;
}
</script>

<template>
  <div
    class="bg-custom-darkest p-9 text-custom-light shadow-lg rounded-md w-[50rem] h-full"
  >
    <div v-if="!resultQuizData.isQuizEnded">
      <h1 v-if="!isClicked" class="text-custom-light">Let's start Quiz</h1>
      <Suspense>
        <Questions v-if="isClicked" :handleQuizEnd="onQuizEnded" />
      </Suspense>
      <Timer
        class="left-0 w-[10%] text-md rounded-lg bg-custom-theme p-1 mt-10"
        v-if="isClicked"
        :handleTimeSpent="(timeSpent) => (resultQuizData.timeSpent = timeSpent)"
      />
      <Button
        class="mt-28 bg-custom-theme"
        v-if="!isClicked"
        @click="() => (isClicked = !isClicked)"
      >
        Start Quiz
      </Button>
    </div>
    <div v-if="resultQuizData.isQuizEnded">
      <ScoreScreen
        :totalPoints="resultQuizData.totalPoints"
        :timeSpent="resultQuizData.timeSpent"
        :totalQuestions="resultQuizData.totalQuestions"
      />
      <Button @click="restartQuiz" class="bg-custom-theme mt-10"
        >Restart</Button
      >
    </div>
  </div>
</template>
