<template>
  <article class="BlogListItem">
    <h2 class="BlogListItem-title" v-html="highlight(post.title)"></h2>
    <p class="BlogListItem-body" v-html="highlight(post.body)"></p>
    <button
      class="BlogListItem-btn BlogListItem-btn_delete"
      @click="setDeleteConfirm(true)"
      aria-label="Delete Post"
    >
      <SvgIcon size=".75rem" name="delete" />
    </button>
    <button
      class="BlogListItem-btn BlogListItem-btn_edit"
      @click="editPost"
      aria-label="Edit Post"
    >
      <SvgIcon name="edit" size="1.25rem" />
    </button>
    <teleport to="body">
      <AppDialog :active="deleteConfirm" @closeDialog="confirmDelete(false)">
        Are you sure you want to delete this item?
        <template v-slot:buttons>
          <div style="text-align: center">
            <AppButton @click="confirmDelete(false)" style="margin-right: .5rem"> No </AppButton>
            <AppButton @click="confirmDelete(true)" v-focus class="secondary"> Yes </AppButton>
          </div>
        </template>
      </AppDialog>
    </teleport>
  </article>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SvgIcon from '@/components/SvgIcon'
import AppDialog from '@/components/UI/AppDialog'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'BlogListItem',
  components: {
    SvgIcon,
    AppDialog,
    AppButton
  },
  props: {
    post: Object
  },
  methods: {
    confirmDelete (confirmed) {
      this.setDeleteConfirm(false)
      if (confirmed === true) {
        this.deletePost(this.post)
      }
    },
    editPost () {
      this.setSelectedPost(this.post)
      this.$router.push(`/edit/${this.post.id}`)
    },
    highlight (txt) {
      const query = this.searchQ.trim()
      if (!query) {
        return txt
      }
      return txt.replace(new RegExp(query, 'gi'), (match) => {
        return '<mark class="BlogListItem-mark">' + match + '</mark>'
      })
    },
    ...mapMutations({
      setSelectedPost: 'posts/setSelectedPost',
      setDeleteConfirm: 'posts/setDeleteConfirm'
    }),
    ...mapActions({
      deletePost: 'posts/deletePost'
    })
  },
  computed: {
    ...mapState({
      searchQ: (state) => state.posts.searchQ,
      deleteConfirm: (state) => state.posts.deleteConfirm
    })
  }
}
</script>

<style lang="scss" scoped>
.BlogListItem {
  @include box-shadow(1);
  background-color: $white;
  border-radius: $radius;
  margin-bottom: 1.5rem;
  opacity: 1;
  padding: 0 2rem;
  position: relative;
  transition: transform 0.5s ease, opacity 0.25s ease;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  &-btn {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    line-height: 0;
    outline: 0;
    padding: 0;
    position: absolute;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &_delete {
      top: 0;
      left: 0;
      .SvgIcon {
        fill: $gray;
      }
      &:hover {
        .SvgIcon {
          fill: $error;
        }
      }
    }
    &_edit {
      background-color: rgba($secondary-color, 0.75);
      border-radius: 0 $radius 0 100%;
      height: 2.5rem;
      right: 0;
      top: 0;
      width: 2.5rem;
      transition: background-color 0.5s ease;
      .SvgIcon {
        transform: translate(0.25rem, -0.25rem);
        fill: $white;
      }
      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
  &-title {
    margin: 0;
    padding: 2rem 0 0.5rem;
    font-size: $h4-font-size;
  }
  &-body {
    margin: 0;
    padding-bottom: 2.5rem;
    white-space: pre-wrap;
  }
  &:deep {
    .BlogListItem-mark {
      background-color: rgba($secondary-color, 0.25);
      color: $text-color;
    }
  }
  @media (min-width: $sm) {
    padding: 0 2.5rem;
  }
}
</style>
