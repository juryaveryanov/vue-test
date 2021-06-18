<template>
  <div class="AppPreloader" :style="`--size:${size}`">
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 "
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AppPreloader',
  props: {
    size: {
      type: String,
      default: '2.5rem'
    }
  }
}
</script>

<style lang="scss">
.AppPreloader {
  width: var(--size);
  height: var(--size);
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  border-radius: 50%;
  background-color: $white;
  opacity: 0.8;

  > svg {
    width: 100%;
    height: 100%;
    fill: transparent;
    stroke: $primary-color;
    stroke-width: 20;
    stroke-dasharray: 600;
    stroke-dashoffset: 0;
    animation: dashAnimation 1.5s linear infinite;
    transform-origin: center;
  }

  @keyframes dashAnimation {
    0% {
      stroke-dashoffset: -600;
      transform: rotate(0deg);
      stroke: $secondary-color;
    }
    50% {
      stroke-dashoffset: 0;
      transform: rotate(180deg);
      stroke: $primary-color;
    }
    100% {
      stroke-dashoffset: 600;
      transform: rotate(360deg);
      stroke: $secondary-color;
    }
  }
}
</style>
