<template>
  <header class="TheHeader">
    <slot />
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss">
.TheHeader {
  padding: 0 1.5rem;
  height: 3.5rem;
  &::before,
  &::after {
    content: "";
    display: block;
    opacity: 0.1;
    position: absolute;
    transform-origin: right top;
    transform: skew(0deg, -30deg);
    width: 20rem;
  }
  &::before {
    background-color: $primary-color;
    left: 0;
    padding-bottom: 16%;
    top: 6rem;
    width: 20rem;
    opacity: 0.05;
  }
  &::after {
    background-color: $secondary-color;
    content: "";
    display: block;
    left: -10rem;
    padding-bottom: 30%;
    position: absolute;
    top: -8rem;
    opacity: 0.1;
  }
}
</style>
