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
    <jing :nameSta='nameSta'></jing>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
    <dialogModal :dialogPar='dialogPar' v-if="$route.path!='/home/register'"></dialogModal>
    <bindPhone></bindPhone>
   <bindbank></bindbank>
  </div>
</template>
<script>
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
import jing from "../public/home/moneyManage.vue"
import usdtActive from "../public/activity/usdt.vue";
import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/vnso/img/gc-logo.png",
        downLoadurl: "/static/vnso/html/download/index.html"
      },
      dialogPar:{
          borderTop:"3px solid rgb(104, 176, 216)",
          headBg:'#fff',
          bandBorder:'1px solid #DFDFDF',
          active:'rgb(104, 176, 216)',
          titleColor:'#78BADC',
          ulBg:'#F2F2EA',
          ulBg2:'#f8f8f8',
          headColor:'rgb(104, 176, 216)',
          borderLeft:'3px solid rgb(104, 176, 216)',
          activeName:'test1Active',
          hoverName:"hoverName1"
        },
      attPar:{
        btnColor:'rgba(46,166,238,1)',
        closeImg: "close_1", //弹窗关闭图片
        coverImgUrl:"../../../../static/vnso/img/attention.png",
      },
      nameSta:"vnso",
      poptype: "tc",
      showtype: {
        topImg: "tc", //弹窗头部图片
        closeImg: "close_1", //弹窗关闭图片
        textColor: "#579AE5" //弹窗按钮颜色
      }
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
    // comModal,
    showModal,
    sideBottom,
    redlope,
    kaiJiang,
    qiandao,attentionModel,safeModal,
    jing,dialogModal,
    usdtActive,
       bindPhone,
    bindbank
  },
  store
};
</script>
<style scoped>

.hsyl-cont-wrap{
  background:url('/static/vnso/img/bg_3.png') no-repeat center top;
  background-size: 100% 3191px;
  background-position-y:-10px;
}
</style>





