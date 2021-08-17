<template>
  <div>
    <div class="vp-hsyl-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
      <!-- 传统彩票 -->
      <div class="vp-lottery-style" v-if="
                $route.path.includes('/plays') ||
                $route.path.includes('/rules') ||
                $route.path.includes('/trend') ">
        <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div>
      <!-- 主页 -->
      <div v-else class="hsyl-cont-wrap">
        <vp-home-header></vp-home-header>
        <router-view></router-view>
        <!-- <sideBottom></sideBottom> -->
        <vp-home-footer v-if="$route.path !=='/home'"></vp-home-footer>
        <usdtActive></usdtActive>
      </div>

    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <vp-register></vp-register>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
    <bindPhone></bindPhone>
    <bindbank></bindbank>
  </div>
</template>
<script>
  let timer
  import dialogModal from '../public/home/test1Dialog.vue'
  import attentionModel from "../public/home/attentionModel.vue";
  import safeModal from  "../public/home/safeCheck.vue"
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import vpRegister from './admin/register'
  import store from '@/vuex/store'
  import comModal from '../public/home/newcommon'
  import data from '../public/homeMeans/index.js'
  import showModal from '../public/home/showcommon.vue'
  import sideBottom from "../public/activity/sideBottom.vue";
  import redlope from '../public/red-lope/index';
  import kaiJiang from '../public/kai-jiang/index.vue';
  import qiandao from '../public/qiandao/index'
  import usdtActive from "../public/activity/usdt.vue"
  import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
  export default {
    mixins: [data],
    data () {
      return {
        lotHeadDatas: {
          logoUrl: '/static/betnew/img/homeLogo.png',
          downLoadurl: '/static/betnew/html/download/index.html'
        },
        dialogPar:{
          borderTop:"3px solid #10A57F",
          headBg:'#00644A',
          bandBorder:'1px solid #3F4248',
          active:'#18B88F',
          titleColor:'#119976',
          ulBg:'#FCFCFC',
          headColor:'#fff',
          borderLeft:'3px solid #15B68C',
          activeName:'betActive',
          hoverName:"hoverName2",
        },
        nameSta:'bet365',
        poptype: 'bet',
        showtype: {
          topImg: 'bet365',//弹窗头部图片
          closeImg: 'close_1',//弹窗关闭图片
          textColor: '#007B5B',//弹窗按钮颜色
        },
        attPar:{
          btnColor:'#017B5B',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/betnew/img/tc.png",
        },
      }
    },
    methods: {},
    created () {},
    components: {
      vpHomeHeader,
      vpLotHeader,
      vpHomeFooter,
      personals,
      vpRegister,
      comModal,
      showModal,
      sideBottom,
      redlope,
      kaiJiang,
      qiandao,
      attentionModel,
      safeModal,
      dialogModal,
      usdtActive,
      bindPhone,
      bindbank
    },
    store
  }
</script>

<style lang="less" scoped>
</style>
