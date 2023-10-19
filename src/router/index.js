import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Category from '../views/Category/_id.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router