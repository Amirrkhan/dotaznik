<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import formatTime from "../../utils/formatTime";

const timeElapsed = ref(0);
const interval = ref(undefined);
const props = defineProps({
  handleTimeSpent: Function,
});
onMounted(() => startTimer());

function startTimer() {
  interval.value = setInterval(() => {
    timeElapsed.value++;
  }, 1000);
}
function stopTimer() {
  console.log("timer is stopped");
  clearInterval(interval.value);
  props.handleTimeSpent(timeElapsed);
}

onUnmounted(function () {
  stopTimer();
});
</script>

<template>
  <div>{{ formatTime(timeElapsed) }}</div>
</template>
