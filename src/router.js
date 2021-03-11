
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [

    {
      path: '',
      component: () => import('./layouts/Main.vue'),
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/pages/Home/Index.vue')
        },
        {
          path: '/books',
          name: 'books',
          component: () => import('./views/pages/Books/Index.vue')
        },
        {
          path: '/book/:id',
          name: 'book',
          component: () => import('./views/pages/Books/Book.vue')
        }
      ]
    }
  ]
})

export default router
