<script>
export default {}
</script>
<template>
  <div class="dot-flashing__dark dot-flashing">
    <div></div>
  </div>
</template>
<style lang="scss">
$size: 16px;
$radius: 8px;
$color-dark-from: var(--color-white-400);
$color-dark-to: var(--color-white-600);
$color-light-to: var(--color-black-500);
$color-light-from: var(--color-black-700);

.dot-flashing {
  position: relative;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-light-from;
  color: $color-light-from;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -24px;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-light-from;
  color: $color-light-from;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 24px;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-light-from;
  color: $color-light-from;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: $color-light-from;
  }
  50%,
  100% {
    background-color: $color-light-to;
  }
}

.dot-flashing__dark {
  position: relative;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-dark-from;
  color: $color-dark-from;
  animation: dot-flashing__dark 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing__dark::before,
.dot-flashing__dark::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing__dark::before {
  left: -24px;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-dark-from;
  color: $color-dark-from;
  animation: dot-flashing__dark 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing__dark::after {
  left: 24px;
  width: $size;
  height: $size;
  border-radius: $radius;
  background-color: $color-dark-from;
  color: $color-dark-from;
  animation: dot-flashing__dark 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing__dark {
  0% {
    background-color: $color-dark-from;
  }
  50%,
  100% {
    background-color: $color-dark-to;
  }
}
</style>
