<template>
  <div>
    <div class="vp-vnst-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
      <!-- 传统彩票 -->
      <div class="vp-lottery-style"
           v-if=" $route.path.includes('/plays')|| $route.path.includes('/rules')|| $route.path.includes('/trend') ">
        <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div>
      <!-- 主页 -->
      <div v-else class="vnst-cont-wrap">
        <vp-home-header></vp-home-header>
       <!-- <sideBottom></sideBottom> -->
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
        <!-- <usdtActive></usdtActive> -->
      </div>

    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <vp-register></vp-register>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <kaiJiang></kaiJiang>
    <showModal :showtype='showtype'></showModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <qiandao></qiandao>
  </div>
</template>
<script>
  import dialogModal from '../public/home/test1Dialog.vue'
  import attentionModel from "../public/home/attentionModel.vue";
  import safeModal from  "../public/home/safeCheck.vue"
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpAside from './home/Aside'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import vpRegister from './admin/register'
  import comModal from '../public/home/newcommon'
  import store from '@/vuex/store'
  import data from '../public/homeMeans/index.js'
  import kaiJiang from '../public/kai-jiang/index.vue'
  import showModal from '../public/home/showcommon.vue'
  import sideBottom from "../public/activity/sideBottom.vue";
  import redlope from '../public/red-lope/index';
  import qiandao from '../public/qiandao/index'
  import usdtActive from "../public/activity/usdt.vue"
  export default {
    mixins: [data],
    data () {
      return {
        lotHeadDatas: {
          logoUrl: '/static/vns81/img/logo.png',
          downLoadurl: '/static/vns81/html/download/index.html'
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
        nameSta:"vns81",
        poptype: 'vns',
        showtype: {
          topImg: 'vnsr',//弹窗头部图片
          closeImg: 'close_3',//弹窗关闭图片
          textColor: '#3B4062',//弹窗按钮颜色
        },
        attPar:{
          btnColor:'#2D2B2B',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/vns81/img/tc.png",
        },
      }
    },
    methods: {},
    created () {},
    components: {
      vpHomeHeader,
      vpLotHeader,
      vpAside,
      vpHomeFooter,
      personals,
      vpRegister,
      comModal,
      kaiJiang,
      showModal,
      sideBottom,
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

<style lang="less">
  body {
    overflow-x: hidden;

    .vp-lottery-style {
      overflow-x: auto;
    }
  }
</style>
