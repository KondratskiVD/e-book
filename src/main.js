import Vue from 'vue'
import App from './App.vue'
import store from './store'

import router from './router'
Vue.config.productionTip = false

import axios from './axios.js'
Vue.prototype.$http = axios
// Tailwind
import '@/assets/css/main.css'

// Filters
import './filters/filters'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
