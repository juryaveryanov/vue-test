<template>
  <footer class="TheFooter">
    <slot />
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss">
.TheFooter {
  padding: 0 1.5rem;
  height: 3.5rem;
  background-color: $lightest-gray;
}
</style>
