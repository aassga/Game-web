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
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="poptype"></safeModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <bindPhone></bindPhone>
    <bindbank></bindbank>
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
  import comModal from  "../public/home/caipiaoModal.vue"
  import data from "../public/homeMeans/index.js"
  import showModal from  "../public/home/showcommon.vue";
  import redlope from '../public/red-lope/index';
  import kaiJiang from '../public/kai-jiang/index.vue';
  import qiandao from '../public/qiandao/index';
  import usdtActive from "../public/activity/usdt.vue"
  import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
  export default {
    mixins: [data],
    data () {
      return {
        lotHeadDatas: {
          logoUrl: '/static/amvns/img/gc-logo.png',
          downLoadurl: '/static/amvns/html/download/index.html'
        },
        poptype:"amvns",
        showtype:{
          topImg:'mgm',//弹窗头部图片
          closeImg:'close_2',//弹窗关闭图片
          textColor:'#604323',//弹窗按钮颜色
        },
        dialogPar:{
          borderTop:"3px solid #c39952",
          headBg:'#c39952',
          bandBorder:'1px solid #5A0812',
          active:'#927340',
          titleColor:'#c39952',
          ulBg:'#FCFCFC',
          ulBg2:'#fff',
          headColor:'#fff',
          borderLeft:'3px solid #c39952',
          activeName:'goldActive',
          hoverName:"hoverName6"
        },
        attPar:{
          btnColor:'#58CFFB',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/amvns/img/tc.png",
        },
      }
    },
    methods: {
      
    },
    created () {
      
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
      redlope,
      kaiJiang,
      qiandao,
      safeModal,
      attentionModel,
      usdtActive,
      dialogModal,
      bindPhone,
      bindbank
    },
    store
  }
</script>






