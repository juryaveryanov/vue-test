<template>
  <svg
    class="SvgIcon"
    xmlns="http://www.w3.org/2000/svg"
    :style="'--size:' + size"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: '1rem'
    }
  },
  computed: {
    iconPath () {
      let icon = require(`@/assets/icons/${this.name}.svg`)
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default
      }
      return icon.url
    }
  }
}
</script>

<style lang="scss">
.SvgIcon {
  --size: 1rem;
  fill: currentColor;
  height: var(--size);
  width: var(--size);
  vertical-align: middle;
}
</style>
