import Vue from 'vue'
import Router from 'vue-router'
//默认空首页
const index = r => require.ensure([], () => r(require('@/pages/k78qp/index.vue')), 'index')
// 新首页
const vpHome = r => require.ensure([], () => r(require('@/pages/k78qp/home')), 'vpHome')

const vpHomeLive = r => require.ensure([], () => r(require('@/pages/k78qp/home/home-live')), 'vpHomeLive')
const vpGames = r => require.ensure([], () => r(require('@/pages/k78qp/home/games')), 'vpGames')
const vpQipai = r => require.ensure([], () => r(require('@/pages/k78qp/home/qipai')), 'vpQipai')
const vpBuyu = r => require.ensure([], () => r(require('@/pages/k78qp/home/buyu')), 'vpBuyu')
const vpYouhui = r => require.ensure([], () => r(require('@/pages/k78qp/home/youhui')), 'vpYouhui')
const vpLoading = r => require.ensure([], () => r(require('@/pages/public/games/loading')), 'vpLoading')
const register = r => require.ensure([], () => r(require('@/pages/k78qp/home/register')), 'register')
// 帮助
const vp_tiyu = r => require.ensure([], () => r(require('@/pages/k78qp/home/tiyu')), 'tiyu')
const about = r => require.ensure([], () => r(require('@/pages/k78qp/home/help/About')), 'about')
const agent = r => require.ensure([], () => r(require('@/pages/k78qp/home/help/Agent')), 'agent')
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/agent',
      component: agent,
      name: 'agent'
    },
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
          path: '/home/chess',
          component: vpQipai,
        },
        {
          path: '/home/tiyu',
          component: vp_tiyu,
        },
        {
          path: '/home/slot',
          component: vpGames,
        },
        {
          path: '/home/fish',
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
          path: '/home/about/:id',
          component: about,
        },
      ]
    }, {
      path: '/loading',
      component: vpLoading,
    }
  ]
})

export default router
