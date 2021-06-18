/**
 * Modifier CSS classes:
 * .primary
 * .secondary
 * .tertiary
 * .small
 * .outline
 * .flat
 * .noArrow
 */
<template>
  <button class="AppButton" :class="{ hasIcon: $slots.icon }" type="button">
    <span class="AppButton-svgIcon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton'
}
</script>

<style lang="scss" scoped>
.AppButton {
  @include box-shadow(1);
  background-color: $white;
  border-radius: $radius;
  border: 0;
  color: $button-default-text-color;
  cursor: pointer;
  display: inline-block;
  font-size: math.div(16, 18) + rem;
  font-weight: $bolder;
  font-weight: 500;
  line-height: 1.5;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 0.75rem;
  padding-left: math.div(3.5, 2) + rem;
  padding-right: math.div(3.5, 2) + rem;
  padding-top: 0.75rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: padding-left 0.25s ease-in, padding-right 0.25s ease-in,
    filter 0.25s ease-in, box-shadow 0.25s ease-in;
  user-select: none;
  white-space: nowrap;
  z-index: 1;
  &::before {
    background-color: $black;
    bottom: 0;
    content: "";
    display: block;
    left: -0.5rem;
    opacity: 0.05;
    position: absolute;
    right: -0.5rem;
    top: 0;
    transform: skewX(-25deg) translateX(-100%);
    transition: transform 0.25s ease-in;
    z-index: -1;
  }
  &::after {
    border: 2px solid $dark-gray;
    border-width: 2px 2px 0 0;
    content: "";
    display: block;
    height: 0.5rem;
    opacity: 0;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform-origin: center;
    transform: translate(-0.75rem, -50%) rotate(45deg);
    transition: transform 0.25s ease-in, opacity 0.25s ease-in;
    width: 0.5rem;
  }
  &:visited {
    color: $dark-gray;
  }
  &:hover,
  &:active {
    @include box-shadow(3);
    color: $button-default-text-color;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    transition: padding-left 0.25s ease-in, padding-right 0.25s ease-in,
      filter 0.25s ease-in, box-shadow 0.25s ease-in;
    &::before {
      transform: skewX(-25deg) translateX(-2rem);
      transition: transform 0.25s ease-in;
    }
    &::after {
      transform: translate(-0.125rem, -50%) rotate(45deg);
      transition: transform 0.25s ease-in, opacity 0.25s ease-in;
      opacity: 1;
    }
  }
  &:active {
    &::before {
      transform: skewX(-25deg) translateX(0);
      transition: transform 0.25s ease-in;
    }
  }
  &:focus {
    outline: 0;
    background-color: rgba($secondary-color, 0.05);
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
    &:hover {
      @include box-shadow(1);
      pointer-events: none;
    }
  }
  &.noArrow {
    &::before,
    &::after {
      display: none;
    }
    padding: 0.75rem;
  }
  &.primary {
    background-color: $primary-color;
    color: $button-color-text-color;
    filter: none;
    &:hover,
    &:active {
      background-color: $primary-color;
      color: $button-color-text-color;
      filter: brightness(105%);
    }
    &:visited {
      color: $button-color-text-color;
    }
    &::after {
      border-color: $button-color-text-color;
    }
    &:focus {
      background-color: lighten($primary-color, 5%);
    }
  }
  &.secondary {
    background-color: $secondary-color;
    color: $button-color-text-color;
    &:hover,
    &:active {
      color: $button-color-text-color;
      background-color: $secondary-color;
    }
    &:visited {
      color: $button-color-text-color;
    }
    &::after {
      border-color: $button-color-text-color;
    }
    &:focus {
      background-color: lighten($secondary-color, 5%);
    }
  }
  &.tertiary {
    background-color: $tertiary-color;
    color: $button-color-text-color;
    &:hover,
    &:active {
      color: $button-color-text-color;
      background-color: $tertiary-color;
    }
    &:visited {
      color: $button-color-text-color;
    }
    &::after {
      border-color: $button-color-text-color;
    }
    &:focus {
      background-color: lighten($tertiary-color, 5%);
    }
  }
  &.small {
    font-size: 0.75rem;
  }
  &.outline {
    border: 1px dotted $button-color-text-color;
  }
  &.flat {
    box-shadow: none;
  }
  &.hasIcon {
    padding-left: 2rem;
    &:hover,
    &:active {
      padding-right: math.div(3.5, 2) + rem;
    }
  }
  &-svgIcon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    font-size: 0;
  }
}
</style>
