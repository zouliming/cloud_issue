import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex/store'

Vue.use(Router)

import index from './views/index.vue'
import user from './views/user.vue'
import login from './views/login.vue'

 const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: index },
    { path: '/index', component: index },
    { path: '/user', component: user },
    { path: '/login', component:login }
  ]
})

router.beforeEach(({meta, path}, from, next) => {
    if (!store.state.user && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

export default router