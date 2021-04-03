
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('./layouts/Main.vue'),
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/pages/Home/Index.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('./views/pages/Books/Index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/pages/Result/Index.vue')
    },
  ]
})

export default router
