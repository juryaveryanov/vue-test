<template>
  <div class="AppInput">
    <label class="AppInput-label" v-if="label" :for="uniqId">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateInput"
      :id="uniqId"
      :type="type"
      :aria-label="ariaLabel"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  data () {
    return {
      uniqId: Math.random().toString(36).substr(2, 9)
    }
  },
  props: {
    modelValue: [String, Number],
    type: {
      validator (value) {
        return ['text', 'search', 'number'].includes(value)
      }
    },
    label: String,
    ariaLabel: String,
    placeholder: String
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.AppInput {
  width: 100%;
  margin-bottom: 1.5rem;
  > input {
    @include input-styles;
  }
  &-label {
    display: block;
    font-weight: bolder;
    margin-bottom: 0.5rem;
    font-size: math.div(16, 18) + rem;
  }
}
</style>
