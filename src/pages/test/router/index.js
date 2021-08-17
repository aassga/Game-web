import Vue from 'vue'
import Router from 'vue-router'
import routers from '../../public/routers/index'
//默认空首页
const index=()=>import(/* webpackChunkName: "home" */'@/pages/test/index.vue').then(m=>m.default)
const vpHome=()=>import(/* webpackChunkName: "home" */'@/pages/test/home').then(m=>m.default)
const vpHomeLive=()=>import(/* webpackChunkName: "game" */'@/pages/test/home/home-live').then(m=>m.default)
const vpGames=()=>import(/* webpackChunkName: "game" */'@/pages/test/home/games').then(m=>m.default)
const vpQipai=()=>import(/* webpackChunkName: "game" */'@/pages/test/home/qipai').then(m=>m.default)
const vpBuyu=()=>import(/* webpackChunkName: "game" */'@/pages/test/home/buyu').then(m=>m.default)
const vpYouhui=()=>import(/* webpackChunkName: "home" */'@/pages/test/home/youhui/index1').then(m=>m.default)
const vpLoading=()=>import(/* webpackChunkName: "loading" */'@/pages/public/games/loading').then(m=>m.default)
const register=()=>import(/* webpackChunkName: "home" */'@/pages/test/home/register').then(m=>m.default)
const about=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/About/index').then(m=>m.default)
const contact=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/contact').then(m=>m.default)
const savings=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/Savings/index').then(m=>m.default)
const issue=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/issue').then(m=>m.default)
const partner=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/partner').then(m=>m.default)
const help_withdrawals=()=>import(/* webpackChunkName: "help" */'@/pages/test/home/help/help-Withdrawals').then(m=>m.default)
Vue.use(Router)
const router = new Router({
    routes: [
            {
            path: '/',
            component: index,
            redirect: '/home',
            children: [
                // 主页
                {
                    path: '/home',
                    component: vpHome,
                },
                {
                    path: '/home/live',
                    component: vpHomeLive,
                },
                {
                    path: '/home/games',
                    component: vpGames,
                },
                {
                    path: '/home/qipai',
                    component: vpQipai,
                },
                {
                    path: '/home/buyu',
                    component: vpBuyu,
                },
                {
                    path: '/home/youhui',
                    component: vpYouhui,
                },
                {
                    path: '/home/register',
                    component: register,
                },
                {
                    path: '/home/about',
                    component: about,
                },
                {
                    path: '/home/contact',
                    component: contact
                },
                {
                    path: '/home/savings',
                    component: savings
                },
                {
                    path: '/home/issue',
                    component: issue
                },
                {
                    path: '/home/partner',
                    component: partner
                },
                {
                    path: '/home/help_withdrawals',
                    component: help_withdrawals
                },
                ...routers
            ]
        }, {
            path: '/loading',
            component: vpLoading,
        }
    ]
})

export default router