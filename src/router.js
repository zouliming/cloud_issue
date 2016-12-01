import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from './views/index.vue'
import page2 from './views/page2.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: index },
    { path: '/index', component: index },
    { path: '/page2', component: page2 }
  ]
})
