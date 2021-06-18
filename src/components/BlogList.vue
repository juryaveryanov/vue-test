<template>
  <div class="BlogList">
    <transition>
      <div v-if="posts.length">
        <BlogListItem v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </transition>
    <transition>
      <div class="BlogList-preloaderWrapper" v-if="isLoading">
        <AppPreloader class="BlogList-preloaderWrapper-preloader" />
      </div>
    </transition>
    <div v-if="!isLoading && !posts.length" class="BlogList-nothingFound">
      Sorry, Nothing Found
    </div>
  </div>
</template>

<script>
import BlogListItem from '@/components/BlogListItem.vue'
import AppPreloader from '@/components/UI/AppPreloader.vue'

export default {
  name: 'BlogList',
  components: {
    BlogListItem,
    AppPreloader
  },
  props: {
    posts: Array,
    isLoading: Boolean
  }
}
</script>

<style lang="scss">
.BlogList {
  position: relative;
  flex-grow: 1;
  padding: 1.5rem 0;
  &-transitionWrapper {
    position: relative;
  }
  &-nothingFound {
    @include box-shadow(1);
    text-align: center;
    padding: 1.5rem;
  }
  &-preloaderWrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    background-color: rgba($white, 0.5);
    &-preloader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &-enter-active {
      opacity: 0;
      transition: opacity 0.5s ease-out;
    }
    &-leave-active {
      opacity: 0;
      transition: opacity 0.5s ease-out;
    }
  }
}
</style>
