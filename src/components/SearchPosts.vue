<template>
  <div class="SearchPosts">
    <AppInput
      v-model="searchQ"
      class="SearchPosts-input"
      @update:model-value="setSearchTimeout"
      type="search"
      placeholder="Start typing to search"
      aria-label="Search for Posts"
    />
    <div class="SearchPosts-icon">
      <transition name="SearchPosts-icon">
        <AppPreloader v-if="searchIsLoading" size="1.5rem" />
        <SvgIcon v-else name="search" size="1.5rem" />
      </transition>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput'
import AppPreloader from '@/components/UI/AppPreloader'
import SvgIcon from '@/components/SvgIcon'
import { mapState, mapMutations, mapActions } from 'vuex'

let searchTimeout
export default {
  name: 'SearchPosts',
  components: {
    AppInput,
    SvgIcon,
    AppPreloader
  },
  methods: {
    ...mapMutations({
      setSearchIsLoading: 'posts/setSearchIsLoading',
      setSearchQ: 'posts/setSearchQ'
    }),
    ...mapActions({
      changeRoute: 'posts/changeRoute'
    }),
    setSearchTimeout (q) {
      this.setSearchQ(q)
      this.setSearchIsLoading(true)
      if (searchTimeout) clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        this.$store.dispatch('posts/search')
        this.changeRoute({ routeMethod: this.$router.replace })
      }, 500)
    }
  },
  computed: {
    ...mapState({
      searchIsLoading: (state) => state.posts.searchIsLoading,
      searchQ: (state) => state.posts.searchQ,
      page: (state) => state.posts.page
    })
  }
}
</script>
<style lang="scss">
.SearchPosts {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  &-icon {
    height: 2.5rem;
    position: relative;
    width: 2.5rem;
    > .SvgIcon,
    > .AppPreloader {
      right: 0;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    &-enter-active {
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
    &-leave-active {
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
  }
  &-input {
    margin-bottom: 0;
  }
}
</style>
