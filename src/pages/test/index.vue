<template>
  <div>
    <div class="vp-hsyl-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
      <!-- 传统彩票 -->
      <div class="vp-lottery-style" v-if="
        $route.path.includes('/plays')||
        $route.path.includes('/rules')||
        $route.path.includes('/trend')
        ">
        <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div>
      <!-- 主页 -->
      <div v-else class="hsyl-cont-wrap">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <vp-aside></vp-aside>
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <comModal></comModal>
    <showModal :showtype='showtype'></showModal>

  </div>
</template>
<script>
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpNav from './home/nav'
  import vpAside from './home/Aside'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import store from '@/vuex/store'
  import comModal from  "../public/home/common.vue"
  import data from "../public/homeMeans/index.js"
  import showModal from  "../public/home/showcommon.vue"

  export default {
    mixins: [data],
    data () {
      return {
        // 公告是图片还是文字
        lotHeadDatas: {
          logoUrl: '/static/test/img/logo.png',
          downLoadurl: '/static/test/html/download/index.html',
        },
        showtype:{
          topImg:'klk',//弹窗头部图片
          closeImg:'close_1',//弹窗关闭图片
          textColor:'#B48C68',//弹窗按钮颜色
        },
      }
    },
    methods: {
    },
    created () {
    },
    computed: {
    },
    watch:{
    },
    components: {
      vpHomeHeader,
      vpLotHeader,
      vpNav,
      vpAside,
      vpHomeFooter,
      personals,
      comModal,
      showModal
    },
    store
  }
</script>






