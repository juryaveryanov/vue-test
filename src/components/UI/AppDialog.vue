<template>
  <div class="AppDialog" v-if="active" @click="$emit('closeDialog')">
    <div class="AppDialog-content" @click.stop>
      <slot></slot>
      <div class="AppDialog-content-buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeDialog']
}
</script>

<style lang="scss" scoped>
.AppDialog {
  align-items: center;
  background: rgba($black, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 1.5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  &-content {
    background-color: $white;
    border-radius: $radius;
    max-width: 30rem;
    padding: 1.5rem;
    &-buttons {
      padding-top: 1.5rem;
    }
  }
}
</style>
