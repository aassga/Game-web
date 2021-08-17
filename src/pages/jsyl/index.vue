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
        <vp-aside></vp-aside>
        <!-- <sideBottom></sideBottom> -->
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
        <!-- <usdtActive></usdtActive> -->
      </div>

    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <adviceModal></adviceModal>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="poptype"></safeModal>
    <vp-register></vp-register>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
  </div>
</template>
<script>
import dialogModal from '../public/home/test1Dialog.vue'
import adviceModal from "../public/personals/message/advice.vue"
import attentionModel from "../public/home/attentionModel.vue";
import safeModal from  "../public/home/safeCheck.vue"
import vpLotHeader from "@/pages/public/tradition/components/header/header";
import vpHomeHeader from "./home/header";
import vpAside from "./home/Aside";
import vpHomeFooter from "./home/footer";
import personals from "../public/personals";
import vpRegister from "./admin/register";
import comModal from "../public/home/newcommon";
import store from "@/vuex/store";
import data from "../public/homeMeans/index.js";
import showModal from "../public/home/showcommon.vue";
import sideBottom from "../public/activity/sideBottom.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue';
import qiandao from '../public/qiandao/index'
import usdtActive from "../public/activity/usdt.vue"
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/jsyl/img/logo.png",
        downLoadurl: "/static/jsyl/html/download/index.html"
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
      poptype: "jsyl",
      showtype: {
        topImg: "jsyl", //弹窗头部图片
        closeImg: "close_3", //弹窗关闭图片
        textColor: "#A99046" //弹窗按钮颜色
      },
      attPar:{
        btnColor:'#101010',
        closeImg: "close_1", //弹窗关闭图片
        coverImgUrl:"../../../../static/jsyl/img/tc.png",
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
    comModal,
    showModal,
    sideBottom,
    redlope,
    kaiJiang,
    qiandao,
    attentionModel,
    safeModal,
    adviceModal,
    dialogModal,
    usdtActive
  },
  store
};
</script>

<style lang="less" scoped>
.vnst-cont-wrap {
  overflow-x: hidden;
}
</style>
