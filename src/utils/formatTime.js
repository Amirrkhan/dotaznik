const formatTime = (elapsedTime) => {
  const minutes = `0${Math.floor(elapsedTime / 60)}`.slice(-2);
  const seconds = `0${elapsedTime % 60}`.slice(-2);
  return `${minutes}:${seconds}`;
};

export default formatTime;
