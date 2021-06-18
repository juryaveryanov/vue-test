<template>
  <main class="TheMain">
    <slot />
  </main>
</template>

<script>
export default {
  name: 'Themain'
}
</script>

<style lang="scss">
.TheMain {
  position: relative;
  max-width: 50rem;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: calc(100vh - 7rem);
}
</style>
