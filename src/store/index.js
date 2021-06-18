// If I had more time, I would have think about different store organisation
import { createStore } from 'vuex'
import { postsModule } from '@/store/postsModule'
export default createStore(
  {
    state: () => ({
      userId: 1,
      error: '',
      documentTitle: 'Blog'
    }),
    mutations: {
      setError (state, message) {
        state.error = message
      },
      setDocumentTitle (state, title) {
        state.documentTitle = 'Blog | ' + title
      }
    },
    modules: {
      posts: postsModule
    }

  }
)
