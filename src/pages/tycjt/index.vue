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
      <div v-else class="hsyl-cont-wrap" style="background:#141414">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <vp-aside></vp-aside>
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
        <!-- <usdtActive></usdtActive> -->
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <alertResiter></alertResiter>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
  </div>
</template>
<script>
  import dialogModal from '../public/home/test1Dialog.vue'
  import attentionModel from "../public/home/attentionModel.vue";
  import safeModal from  "../public/home/safeCheck.vue"
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpNav from './home/nav'
  import vpAside from './home/Aside'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import store from '@/vuex/store'
  import comModal from  "../public/home/newcommon"
  // import comModal from  "../public/home/common.vue"
  import data from "../public/homeMeans/index.js"
  import showModal from  "../public/home/showcommon.vue"
  import alertResiter from './home/alertRegiste.vue'
  import redlope from '../public/red-lope/index';
  import kaiJiang from '../public/kai-jiang/index.vue'
  import qiandao from "../public/qiandao/index";
  import usdtActive from "../public/activity/usdt.vue"
  export default {
    mixins: [data],
    data () {
      return {
        // 公告是图片还是文字
        showtype:{
            topImg:'vnsr',//弹窗头部图片
            closeImg:'close_3',//弹窗关闭图片
            textColor:'#3B4062',//弹窗按钮颜色
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
        nameSta:"tycjt",
        poptype: 'vnso',
        lotHeadDatas: {
          logoUrl: '/static/tycjt/img/lottery_logo.png',
          downLoadurl: '/static/tycjt/html/download/index.html',
        },
        attPar:{
          btnColor:'#1B1B1B',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/tycjt/img/tc.png",
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
      showModal,
      alertResiter,
      kaiJiang,
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






