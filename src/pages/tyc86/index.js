import Vue from 'vue'
import router from './router'
import klkApp from './App.vue'
import '@/service/public/service'
import '@/service/public/url' //优先配置url
import util from '@/service/public/util'
import util_new from '../public/util_new/util'
import '@/assets/iconfont/public/iconfont.css'
import 'iview/dist/styles/iview.css'
import './index.less'
import animated from 'animate.css'
import VueLazyload from 'vue-lazyload'
import $http from 'axios'
import { Button, Radio, Table, Modal, Input, Icon, CarouselItem, RadioGroup, Spin, DatePicker, Option, Poptip, Select, Carousel, Slider, Message, LoadingBar, Page, Cascader, Notice,Tooltip } from 'iview'
Vue.component('Button', Button)
Vue.component('Radio', Radio)
Vue.component('Table', Table)
Vue.component('Modal', Modal)
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('CarouselItem', CarouselItem)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Spin', Spin)
Vue.component('DatePicker', DatePicker)
Vue.component('Option', Option)
Vue.component('Poptip', Poptip)
Vue.component('Select', Select)
Vue.component('Carousel', Carousel)
Vue.component('Slider', Slider)
Vue.component('Message', Message)
Vue.component('LoadingBar', LoadingBar)
Vue.component('Page', Page)
Vue.component('Cascader', Cascader)
Vue.component('Notice', Notice)
Vue.component('Tooltip', Tooltip)
Vue.use(VueLazyload)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/dist/css/swiper.css"
Vue.use(VueAwesomeSwiper)

Vue.use(animated)
import Toast from '@/service/public/Toast.js'
import Loading from '@/service/public/Loading.js'
import VueClipboard from 'vue-clipboard2'
import 'wowjs/css/libs/animate.css'
import wow from 'wowjs'
Vue.prototype.$wow=wow

Vue.use(VueClipboard)
Vue.use(util)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(util_new)
import moment from 'moment'
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Spin = Spin;
Vue.prototype.$Notice = Notice;
Vue.prototype.$moment = moment
Vue.prototype.$websiteName = 'tyc86'


// 登录注册
Vue.prototype.$registerStyle = 4;
Vue.prototype.$loginStyle = 4;
Vue.prototype.$gameStyle = 4;
Vue.prototype.$tipMsg = 'new';
Vue.prototype.$siteName = '太阳城集团';

// router.beforeEach((to, from, next) => {
//     if (to.path == '/register') {
//          if(localStorage.getItem('userinfo')){
//             router.push("/home");
//          }else{
//              next()
//          }
//     } else {
//         next()
//     }
// })
// router.beforeEach((to, from, next) => {
//     if (to.path == '/home') {
//          if(localStorage.getItem('userinfo')){
//              next()
//          }else{
//             router.push("/register");
//          }
//     } else {
//         next()
//     }
// })

// 回到顶部
router.afterEach((to, from, next) => {
    document.documentElement.scrollTop = 0;
})

window.myApp = new Vue({
    el: '#klkApp',
    router,
    template: '<klkApp/>',
    data: {
        eventHub: new Vue(),
    },
    components: { klkApp },
    created() {},
    mounted() {
        this.$nextTick(function() {
            setTimeout(() => {
                document.title = "Welcome"
            }, 200)
        })
    }
})