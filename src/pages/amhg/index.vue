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
        <!-- <vp-nav></vp-nav> -->
        <!-- <vp-aside></vp-aside> -->
        <!-- <sideBottom></sideBottom> -->
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
  <loginLog></loginLog>
  <attentionModel :parmas="attPar"></attentionModel>
  <safeModal :stationName="nameSta"></safeModal>
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
import loginLog from './login.vue'
import dialogModal from "../public/home/test1Dialog.vue"
import safeModal from  "../public/home/safeCheck.vue"
import vpLotHeader from "@/pages/public/tradition/components/header/header";
import vpHomeHeader from "./home/header";
import vpNav from "./home/nav";
import vpAside from "./home/Aside";
import vpHomeFooter from "./home/footer";
import personals from "../public/personals";
import store from "@/vuex/store";
import comModal from "../public/home/newcommon.vue";
import attentionModel from "../public/home/attentionModel.vue";
import data from "../public/homeMeans/index.js";
import showModal from "../public/home/showcommon.vue";
import sideBottom from "../public/activity/sideBottom.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue';
import qiandao from "../public/qiandao/index";
import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/amhg/img/gc-logo.png",
        downLoadurl: "/static/amhg/html/download/index.html"
      },
      dialogPar:{
          borderTop:"3px solid rgb(194,167,117)",
          headBg:'#fff',
          bandBorder:'1px solid #DFDFDF',
          active:'rgb(194,167,117)',
          titleColor:'#c2a775',
          ulBg:'#F2F2EA',
          ulBg2:'#f8f8f8',
          headColor:'rgb(194,167,117)',
          borderLeft:'3px solid rgb(194,167,117)',
          activeName:'amhgActive',
          hoverName:"hoverName7"
        },
      attPar:{
        btnColor:'rgb(194,167,117)',
        closeImg: "close_1", //弹窗关闭图片
        coverImgUrl:"../../../../static/amhg/img/attention.png",
      },
      nameSta:"amhg",
      poptype: "tc",
      showtype:{
          topImg:'klk',//弹窗头部图片
          closeImg:'close_1',//弹窗关闭图片
          textColor:'#B48C68',//弹窗按钮颜色
        },
    };
  },
  methods: {

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
    sideBottom,
    redlope,
    kaiJiang,
    qiandao,
    attentionModel,
    safeModal,
    dialogModal,
    loginLog,
    bindPhone,
    bindbank
  },
  store
};
</script>






