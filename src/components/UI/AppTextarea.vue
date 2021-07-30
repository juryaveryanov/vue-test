<template>
  <div class="AppTextarea">
    <label class="AppTextarea-label" v-if="label" :for="uniqId">
      {{ label }}
    </label>
    <textarea
      :id="uniqId"
      ref="textarea"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateInput"
    />
  </div>
</template>

<script>
export default {
  name: 'AppTextarea',
  data () {
    return {
      uniqId: Math.random().toString(36).substr(2, 9)
    }
  },
  props: {
    modelValue: [String, Number],
    autosize: Boolean,
    label: String,
    ariaLabel: String,
    placeholder: String
  },
  methods: {
    updateInput (event) {
      this.$emit('update:modelValue', event.target.value)
      if (this.autosize) {
        this.setHeight()
      }
    },
    setHeight () {
      const textarea = this.$refs.textarea
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  },
  mounted () {
    if (this.autosize) {
      this.setHeight()
      window.addEventListener('resize', this.setHeight)
    }
  }
}
</script>

<style lang="scss">
.AppTextarea {
  width: 100%;
  margin-bottom: 1.5rem;
  > textarea {
    @include input-styles;
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
