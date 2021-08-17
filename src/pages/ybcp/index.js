import Vue from 'vue'
import router from './router'
import ybcpApp from './App.vue'
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
import { Button, Radio, Table, Modal, Input, Icon, CarouselItem, RadioGroup, Spin, DatePicker, Option, Poptip, Select, Carousel, Slider, Message, LoadingBar, Page, Cascader, Notice } from 'iview'
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
Vue.use(VueLazyload)

Vue.use(animated)
import Toast from '@/service/public/Toast.js'
import Loading from '@/service/public/Loading.js'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(util)
Vue.use(util_new)
Vue.use(Loading)
Vue.use(Toast)

import moment from 'moment'
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Spin = Spin;
Vue.prototype.$Notice = Notice;
Vue.prototype.$moment = moment

// 登录注册
Vue.prototype.$gameStyle = 2;
Vue.prototype.$registerStyle = 2;
Vue.prototype.$loginStyle = 2;
Vue.prototype.$tipMsg = 'new';
Vue.prototype.$siteName = '亚博彩票';
Vue.prototype.$websiteName = 'ybcp';

// 回到顶部
router.afterEach((to, from, next) => {
    document.documentElement.scrollTop = 0
})

window.myApp = new Vue({
    el: '#ybcpApp',
    router,
    template: '<ybcpApp/>',
    data: {
        eventHub: new Vue(),
    },
    components: { ybcpApp },
    created() {

    },
    mounted() {
        this.$nextTick(function() {
            setTimeout(() => {
                document.title = 'Welcome'
            }, 200)
        })
    }
})