import { createRouter, createWebHashHistory } from 'vue-router'
import Blog from '../views/Blog.vue'
import EditPost from '../views/EditPost.vue'
const routes = [
  {
    path: '/:page?/',
    name: 'Blog',
    component: Blog,
    props: { q: '' }
  },
  {
    path: '/edit/:id?/',
    name: 'EditPost',
    component: EditPost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
