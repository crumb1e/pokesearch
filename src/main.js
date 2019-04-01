import Vue from 'vue'
import VueRouter from 'vue-router'
import anime from 'animejs/lib/anime.es.js'
import App from './App.vue'

import '@/assets/css/tailwind.css'
import 'nprogress/nprogress.css'
import routes from './routes'
import http from './api'

Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$axios = http
Vue.prototype.$anim = anime

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
