<template>
  <div class="Blog">
    <div class="Blog-controls">
      <AppButton
        class="Blog-controls-add primary"
        @click="$router.push(`/edit/`)"
      >
        <template v-slot:icon>
          <SvgIcon name="plus" />
        </template>
        Add Post
      </AppButton>
      <SearchPosts />
    </div>
    <AppPagination
      :total="totalPages"
      :current="page"
      @update:current="changePage"
    />
    <BlogList :posts="posts" :isLoading="isLoading" />
    <AppPagination
      :total="totalPages"
      :current="page"
      @update:current="changePage"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

import BlogList from '@/components/BlogList'
import SearchPosts from '@/components/SearchPosts'
import AppPagination from '@/components/UI/AppPagination'
import AppButton from '@/components/UI/AppButton'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'Blog',
  components: {
    BlogList,
    AppPagination,
    SearchPosts,
    AppButton,
    SvgIcon
  },
  methods: {
    ...mapActions({
      getPosts: 'posts/getPosts',
      changeRoute: 'posts/changeRoute'
    }),
    ...mapMutations({
      setSelectedPost: 'posts/setSelectedPost',
      setSearchQ: 'posts/setSearchQ',
      setPage: 'posts/setPage',
      setLoading: 'posts/setLoading',
      setDocumentTitle: 'setDocumentTitle'
    }),
    changePage (page) {
      this.setPage(page)
      this.setLoading(true)
      this.changeRoute({ routeMethod: this.$router.push })
      this.getPosts().then(() => {
        this.setLoading(false)
        window.scrollTo(0, 0)
      })
    }
  },
  mounted () {
    this.setSelectedPost(null)
    if (this.$route.query && this.$route.query.q) {
      this.setSearchQ(this.$route.query.q)
    }
    if (this.$route.params.page) {
      this.setPage(this.$route.params.page)
    }
    this.changeRoute({ routeMethod: this.$router.replace })
    this.getPosts()
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      totalPages: (state) => state.posts.totalPages,
      limit: (state) => state.posts.limit,
      page: (state) => state.posts.page,
      isLoading: (state) => state.posts.isLoading,
      searchQ: (state) => state.posts.searchQ
    })
  }
}
</script>
<style lang="scss" scoped>
.Blog {
  &-controls {
    margin-bottom: $gutter;
    @media (min-width: $sm) {
      display: flex;
    }
    &-add {
      width: 100vw;
      margin-bottom: $gutter;
      @media (min-width: $sm) {
        width: auto;
        margin-bottom: 0;
        margin-right: $gutter;
      }
    }
  }
}
</style>
