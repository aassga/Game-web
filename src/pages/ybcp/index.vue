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
    <vp-register></vp-register>
    <vp-login></vp-login>
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
import vpLotHeader from "@/pages/public/tradition/components/header/header";
import vpHomeHeader from "./home/header";
import vpAside from "./home/Aside";
import vpHomeFooter from "./home/footer";
import personals from "../public/personals";
import store from "@/vuex/store";
import vpRegister from "./home/register";
import vpLogin from "./home/login";
import comModal from "../public/home/newcommon.vue";
import data from "../public/homeMeans/index.js";
import showModal from "../public/home/showcommon.vue";
import redlope from "../public/red-lope/index";
import kaiJiang from "../public/kai-jiang/index.vue";
import qiandao from "../public/qiandao/index";
import usdtActive from "../public/activity/usdt.vue"
import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/ybcp/img/gc-logo.png",
        downLoadurl: "/static/ybcp/html/download/index.html"
      },
      poptype: "ybcp",
      showtype: {
        topImg: "aobo", //弹窗头部图片
        closeImg: "close_1", //弹窗关闭图片
        textColor: "#CF3A36" //弹窗按钮颜色
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
      attPar:{
          btnColor:'#E44B48',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/ybcp/img/tc.png",
      },
    };
  },
  methods: {},
  created() {},
  components: {
    vpHomeHeader,
    vpLotHeader,
    vpAside,
    vpHomeFooter,
    personals,
    vpRegister,
    vpLogin,
    comModal,
    showModal,
    redlope,
    kaiJiang,
    qiandao,
    attentionModel,
    safeModal,
    usdtActive,
    dialogModal,
     bindPhone,
    bindbank
  },
  store
};
</script>






