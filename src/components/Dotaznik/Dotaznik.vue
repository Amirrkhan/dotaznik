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

const onQuizEnded = (quizData) => {
  resultQuizData.totalPoints = quizData.totalPoints;
  resultQuizData.isQuizEnded = quizData.isQuizEnded;
  resultQuizData.totalQuestions = quizData.totalQuestions;
};
</script>

<template>
  <div class="container">
    <div v-if="!resultQuizData.isQuizEnded">
      <h2 v-if="!isClicked">Let's start Quiz</h2>
      <Suspense>
        <Questions v-if="isClicked" :handleQuizEnd="onQuizEnded" />
      </Suspense>
      <Timer
        v-if="isClicked"
        :handleTimeSpent="(timeSpent) => (resultQuizData.timeSpent = timeSpent)"
      />
      <Button v-if="!isClicked" @click="() => (isClicked = !isClicked)">
        Start Quiz
      </Button>
    </div>
    <div v-if="resultQuizData.isQuizEnded">
      <ScoreScreen
        :totalPoints="resultQuizData.totalPoints"
        :timeSpent="resultQuizData.timeSpent"
        :totalQuestions="resultQuizData.totalQuestions"
      />
      <Button>Restart</Button>
    </div>
  </div>
</template>
