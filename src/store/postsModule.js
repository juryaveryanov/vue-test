import axios from 'axios'
import removeHtml from '@/helpers/removeHtml'
const API_PATH = 'https://jsonplaceholder.typicode.com/'
// const API_PATH = 'http://localhost:3001/'
export const postsModule = {
  state: () => ({
    posts: [
    ],
    selectedPost: null,
    savedPost: null,
    totalPages: 0,
    limit: 4,
    page: 1,
    isLoading: true,
    searchIsLoading: false,
    deleteConfirm: false,
    searchQ: ''
  }),
  getters: {
    canBeSaved (state) {
      if (state.selectedPost &&
        removeHtml(state.selectedPost.title) !== '' &&
        removeHtml(state.selectedPost.body) !== '' &&
        (state.savedPost.title !== state.selectedPost.title ||
          state.savedPost.body !== state.selectedPost.body)) {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setSelectedPost (state, post) {
      state.selectedPost = post
      state.savedPost = { ...post }
    },
    changeSelectedPost (state, { key, value }) {
      const post = { ...state.selectedPost }
      post[key] = value
      state.selectedPost = post
    },
    setPage (state, page) {
      state.page = parseInt(page)
    },
    setLoading (state, val) {
      state.isLoading = val
    },
    setSearchQ (state, val) {
      state.searchQ = val
    },
    setSearchIsLoading (state, val) {
      state.searchIsLoading = val
    },
    deletePost (state, post) {
      const index = state.posts.indexOf(post)
      state.posts.splice(index, 1)
      if (state.posts.length === 0) {
        state.totalPages--
        state.page = state.page > 1 ? state.page - 1 : 1
      }
    },
    setTotalPages (state, totalPages) {
      state.totalPages = parseInt(totalPages)
    },
    addPosts (state, posts) {
      state.posts.push(...posts)
    },
    setDeleteConfirm (state, val) {
      state.deleteConfirm = val
    }
  },

  actions: {
    async getPosts ({ state, commit }) {
      const params = {
        _page: state.page,
        _limit: state.limit,
        _sort: 'id',
        _order: 'desc'
      }
      if (state.searchQ.trim()) {
        params.q = state.searchQ.trim()
      }
      commit('setLoading', true)
      return axios
        .get(`${API_PATH}posts`, {
          params: params
        })
        .then((response) => {
          commit('setPosts', response.data)
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
          commit('setSearchIsLoading', false)
          commit('setLoading', false)
          commit(
            'setDocumentTitle',
            `Page ${state.page} from ${state.totalPages}${params.q ? ' | Search:"' + params.q + '"' : ''}`,
            { root: true }
          )
        })
        .catch((error) => {
          alert(error)
        })
    },
    async publishPost ({ state, commit, rootState }, router) {
      commit('setLoading', true)
      axios
        .post(`${API_PATH}posts`, {
          userId: rootState.userId,
          title: removeHtml(state.selectedPost.title),
          body: removeHtml(state.selectedPost.body)
        })
        .then((response) => {
          commit('setSelectedPost', response.data)
          router.replace(`/edit/${state.selectedPost.id}`)
        })
        .catch((error) => {
          commit('setError', error.message, { root: true })
        })
        .then(() => {
          commit('setLoading', false)
        })
    },
    async getSelectedPost ({ state, commit }, postId) {
      commit('setLoading', true)
      return axios
        .get(`${API_PATH}posts/${postId}`)
        .then((response) => {
          commit('setSelectedPost', response.data)
        })
        .catch((error) => {
          commit('setError', error.message, { root: true })
          commit('setSelectedPost', { title: '', body: '' })
        })
        .then(() => {
          commit('setLoading', false)
        })
    },
    async saveSelectedPost ({ state, commit, dispatch }) {
      commit('setLoading', true)
      return axios
        .patch(`${API_PATH}posts/${state.selectedPost.id}`, {
          title: removeHtml(state.selectedPost.title),
          body: removeHtml(state.selectedPost.body)
        })
        .then((response) => {
          commit('setSelectedPost', response.data)
        })
        .catch((error) => {
          commit('setError', error.message, { root: true })
        })
        .then(() => {
          commit('setLoading', false)
        })
    },
    async deletePost ({ state, commit, dispatch }, post) {
      try {
        await axios.delete(`${API_PATH}posts/${post.id}`)
        commit('deletePost', post)
        dispatch('getPosts')
      } catch (error) {
        commit('setError', error.message, { root: true })
      }
    },
    async changePage ({ state, commit, dispatch }, page) {
      commit('setPage', page)
      commit('setLoading', true)
      await dispatch('getPosts')
      commit('setLoading', false)
    },
    async changeRoute ({ state, commit }, { routeMethod }) {
      const routeParams = {}
      routeParams.path = '/' + (state.page > 1 ? state.page : '')
      if (state.searchQ) {
        routeParams.query = { q: state.searchQ }
      }
      routeMethod(routeParams)
    },
    search ({ commit, dispatch }) {
      commit('setPage', 1)
      dispatch('getPosts')
    }
  },
  namespaced: true
}
