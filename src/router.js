import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex/store'

Vue.use(Router)

import home from './views/home.vue'
import index from './views/home/index.vue'
import card from './views/home/card.vue'
import user from './views/home/user.vue'
import login from './views/login.vue'

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/login', component: login },
        {
            path: '/',
            component: home,
            children: [
                { path: '/', component: index },
                { path: '/index', component: index },
                { path: '/index/:group_id', component: card },
                { path: '/user', component: user }
            ]
        },
    ]
})

router.beforeEach(({meta, path}, from, next) => {
    if (!store.state.user && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

export default router