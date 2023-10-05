import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Category from '../views/Category/_id.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/:id',
    name: 'Category',
    component: Category
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router