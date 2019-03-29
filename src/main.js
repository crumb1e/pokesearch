import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'

import '@/assets/css/tailwind.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import routes from './routes'

Vue.use(VueRouter)

Vue.config.productionTip = false

const http = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
})

NProgress.configure({ easing: 'ease', speed: 1000 })

http.interceptors.request.use(config => {
  NProgress.start()
  return config
})

http.interceptors.response.use(response => {
  NProgress.done()
  return response
})

Vue.prototype.$axios = http

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
