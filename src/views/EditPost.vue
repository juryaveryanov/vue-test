<template>
  <main class="EditPost" v-if="post">
    <form class="EditPost-form">
      <div class="EditPost-controls">
        <AppButton @click="$router.push('/')" aria-label="Cancel">
          Cancel
        </AppButton>
        <div class="EditPost-controls-update">
          <AppPreloader size="2rem" v-if="isLoading" />
          <AppButton
            v-if="post.id"
            @click="saveSelectedPost"
            class="primary"
            :disabled="!canBeSaved && !isLoading"
            aria-label="Update Post"
          >
            Update
          </AppButton>
          <AppButton
            v-else
            @click="publishPost($router)"
            class="primary"
            :disabled="!canBeSaved && !isLoading"
            aria-label="Publish Post"
          >
            Publish
          </AppButton>
        </div>
      </div>
      <AppInput
        @update:model-value="changeSelectedPost({ key: 'title', value: $event })"
        v-model="post.title"
        label="Title:"
      />
      <AppTextarea
        class="EditPost-form-body"
        @update:model-value="changeSelectedPost({ key: 'body', value: event })"
        v-model="post.body"
        type="textarea"
        label="Body:"
        autosize
      />
    </form>
  </main>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import AppInput from '@/components/UI/AppInput'
import AppTextarea from '@/components/UI/AppTextarea'
import AppButton from '@/components/UI/AppButton'
import AppPreloader from '@/components/UI/AppPreloader'

export default {
  name: 'EditPost',
  components: {
    AppInput,
    AppButton,
    AppPreloader,
    AppTextarea
  },
  methods: {
    ...mapMutations({
      setSelectedPost: 'posts/setSelectedPost',
      changeSelectedPost: 'posts/changeSelectedPost',
      setDocumentTitle: 'setDocumentTitle'
    }),
    ...mapActions({
      getSelectedPost: 'posts/getSelectedPost',
      saveSelectedPost: 'posts/saveSelectedPost',
      publishPost: 'posts/publishPost'
    })
  },
  mounted () {
    if (this.post === null) {
      if (this.$route.params.id) {
        this.getSelectedPost(this.$route.params.id)
      } else {
        this.setSelectedPost({ title: '', body: '' })
      }
    } else {
      this.setDocumentTitle(this.post.title)
    }
  },
  computed: {
    ...mapState({
      post: (state) => state.posts.selectedPost,
      savedPost: (state) => state.posts.savedPost,
      isLoading: (state) => state.posts.isLoading
    }),
    ...mapGetters({
      canBeSaved: 'posts/canBeSaved'
    })
  },
  watch: {
    post (post) {
      if (post.id) {
        this.setDocumentTitle('Edit Post: ' + post.title)
      } else {
        this.setDocumentTitle('Create New Post: ' + post.title)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.EditPost {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: $gutter;
  &-form {
    @include box-shadow(1);
    background-color: $white;
    border-radius: $radius;
    padding: $gutter;
    &-body {
      &:deep {
        > textarea {
          overflow: hidden;
          height: auto;
        }
      }
    }
  }
  &-controls {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    margin-bottom: 1.5rem;
    &-update {
      display: flex;
      align-items: center;
      > .AppPreloader {
        margin-right: 1rem;
      }
    }
  }
}
</style>
