<template>
  <ul class="AppPagination" v-if="total > 1">
    <li
      v-if="current > 1"
      class="AppPagination-item"
      @click="updateCurrent(current - 1)"
    >
      <button aria-label="Previous page" class="AppPagination-navButton">
        <SvgIcon name="arrow-left" size=".75rem" />
      </button>
    </li>
    <li v-for="page in pages" :key="page" class="AppPagination-item">
      <AppButton
        @click="updateCurrent(page)"
        class="noArrow"
        :disabled="page === current"
        :aria-label="`Page ${page}`"
      >
        {{ page }}
      </AppButton>
    </li>
    <li v-if="current < total" class="AppPagination-item">
      <button
        aria-label="Next page"
        @click="updateCurrent(current + 1)"
        class="AppPagination-navButton"
      >
        <SvgIcon name="arrow-right" size=".75rem" />
      </button>
    </li>
  </ul>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'AppPagination',
  components: {
    AppButton,
    SvgIcon
  },
  props: {
    total: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 5
    }
  },
  emits: ['update:current'],
  methods: {
    updateCurrent (page) {
      this.$emit('update:current', page)
    }
  },
  computed: {
    pages () {
      const pages = []
      const size = this.size
      const total = this.total
      const current = this.current
      const before = Math.floor(size / 2)
      const after = size - before
      // Сurrent page is one of the first
      let start = 1
      let end = size

      if (size < total) {
        // Сurrent page is somewere in the middle of range
        if (current > before) {
          start = current - before + (size % 2 ? 0 : 1)
          end = current + after - (size % 2 ? 1 : 0)
        }
        // Сurrent page is in the end
        if (current <= total && current > total - after) {
          start = total - size + 1
          end = total
        }
      } else {
        end = total
      }
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>

<style lang="scss">
.AppPagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  &-item {
    padding: 0.25rem;
  }
  &-navButton {
    height: 3rem;
    width: 2rem;
    outline: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.75;
    transition: opacity 0.25s ease;
    &:hover {
      opacity: 1;
    }
    .SvgIcon {
      fill: $secondary-color;
    }
  }
}
</style>
