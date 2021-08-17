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
         <usdtActive></usdtActive>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <attentionModel :parmas="attPar"></attentionModel>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <kaiJiang></kaiJiang>
    <showModal :showtype='showtype'></showModal>
    <safeModal></safeModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <qiandao></qiandao>
  </div>
</template>
<script>
  import dialogModal from '../public/home/test1Dialog.vue'
  import attentionModel from "../public/home/attentionModel.vue";
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpNav from './home/nav'
  import vpAside from './home/Aside'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import store from '@/vuex/store'
  import comModal from  "../public/home/newcommon.vue"
  import data from "../public/homeMeans/index.js"
  import kaiJiang from '../public/kai-jiang/index.vue'
  import showModal from  "../public/home/showcommon.vue"
  import safeModal from  "../public/home/safeCheck.vue"
  import redlope from '../public/red-lope/index';
  import qiandao from '../public/qiandao/index';
  import usdtActive from "../public/activity/usdt.vue"
  export default {
    mixins: [data],
    data () {
      return {
        // 公告是图片还是文字
        lotHeadDatas: {
          logoUrl: '/static/klk/img/cp.png',
          downLoadurl: '/static/klk/html/download/index.html',
        },
        poptype:"blr",
        showtype:{
          topImg:'klk',//弹窗头部图片
          closeImg:'close_1',//弹窗关闭图片
          textColor:'#B48C68',//弹窗按钮颜色
        },
        dialogPar:{
            borderTop:"3px solid #3D3F44",
            headBg:'#0F0F0F',
            bandBorder:'1px solid #3E4148',
            active:'#63666D',
            titleColor:'#484A51',
            ulBg:'#FCFCFC',
            ulBg2:'#fff',
            headColor:'#fff',
            borderLeft:'3px solid #484A51',
            activeName:'darkActive',
            hoverName:"hoverName3"
        },
        attPar:{
          btnColor:'#b48b7a',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/klk/img/attention.png",
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
      kaiJiang,
      showModal,
      redlope,
      qiandao,
      attentionModel,
      safeModal,
      dialogModal,
      usdtActive
    },
    store
  }
</script>






