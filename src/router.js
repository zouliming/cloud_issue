import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex'

Vue.use(Router)

const home = resolve => require(['./views/home.vue'], resolve)
const index = resolve => require(['./views/home/index.vue'], resolve)
const card = resolve => require(['./views/home/card.vue'], resolve)
const user = resolve => require(['./views/home/user.vue'], resolve)
const login = resolve => require(['./views/login.vue'], resolve)
const log = resolve => require(['./views/home/log.vue'], resolve)
const help = resolve => require(['./views/home/help.vue'], resolve)

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
                { path: '/user', component: user },
                { path: '/log', component: log },
                { path: '/help', component: help }
            ]
        },
    ]
})

router.beforeEach(({meta, path}, from, next) => {
    if (!store.state.user.user && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

export default router