<template>
  <div class="AppInput">
    <label class="AppInput-label" v-if="label" :for="uniqId">
      {{ label }}
    </label>
    <textarea
      :id="uniqId"
      v-if="type === 'textarea'"
      :value="value"
      :placeholder="placeholder"
      @input="updateInput"
    />
    <input
      v-else
      :value="value"
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
    value: [String, Number],
    type: {
      validator (value) {
        return ['text', 'textarea', 'search'].includes(value)
      }
    },
    label: String,
    ariaLabel: String,
    placeholder: String
  },
  methods: {
    updateInput (event) {
      this.$emit('update:input', event.target.value, event.target)
    }
  }
}
</script>

<style lang="scss">
.AppInput {
  width: 100%;
  & + & {
    padding-top: 1.5rem;
  }
  > input,
  > textarea {
    background-color: $lightest-gray;
    border-radius: $radius;
    border: 0;
    border: 1px solid $light-gray;
    box-shadow: none;
    color: $text-color;
    display: block;
    font-family: $main-font;
    font-size: 1rem;
    height: 3rem;
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    transition: box-shadow 0.5s ease, background-color 0.5s ease;
    width: 100%;
    &:focus {
      @include box-shadow(2);
      background-color: $white;
      outline: none;
      transition: box-shadow 0.5s ease, background-color 0.5s ease;
    }
    &::placeholder {
      color: $gray;
      font-size: math.div(16, 18) + rem;
    }
  }
  textarea {
    display: block;
    height: 10rem;
    resize: none;
    width: 100%;
  }
  &-label {
    display: block;
    font-weight: bolder;
    margin-bottom: 0.5rem;
    font-size: math.div(16, 18) + rem;
  }
}
</style>
