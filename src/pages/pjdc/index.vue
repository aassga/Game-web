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
        <!-- <usdtActive></usdtActive> -->
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <showModal :showtype='showtype'></showModal>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
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
  import comModal from '../public/home/newcommon'
  import data from "../public/homeMeans/index.js"
  import redlope from '../public/red-lope/index';
  import kaiJiang from '../public/kai-jiang/index.vue';
  import showModal from '../public/home/showcommon.vue';
  import qiandao from "../public/qiandao/index";
  import usdtActive from "../public/activity/usdt.vue"
  export default {
    mixins: [data],
    data () {
      return {
        // 公告是图片还是文字
        lotHeadDatas: {
          logoUrl: '/static/pjdc/img/lottery_logo.png',
          downLoadurl: '/static/pjdc/html/download/index.html',
        },
        dialogPar:{
          borderTop:"3px solid #8F212B",
          headBg:'#680915',
          bandBorder:'1px solid #5A0812',
          active:'#C1172E',
          titleColor:'#B10F24',
          ulBg:'#FCFCFC',
          ulBg2:'#fff',
          headColor:'#fff',
          borderLeft:'3px solid #BC4D57',
          activeName:'redActive',
          hoverName:"hoverName4"
        },
        nameSta:"pjdc",
        poptype: 'pj',
         showtype: {
          topImg: 'pjdc',//弹窗头部图片
          closeImg: 'close_1',//弹窗关闭图片
          textColor: '#CF3A36',//弹窗按钮颜色
        },
        attPar:{
          btnColor:'#631619',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/pjdc/img/tc.png",
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
      redlope,
      kaiJiang,
      showModal,
      qiandao,
      attentionModel,
      safeModal,
      dialogModal,
      usdtActive
    },
    store
  }
</script>






