<template>
  <div class="content_bg"  >
     <hongbaoyu :theme="'theme2'" :btnSite="'leftBtn'" v-show="$route.path=='/home'"></hongbaoyu>
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
    <jing :nameSta='nameSta'></jing>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="nameSta"></safeModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype='showtype'></showModal>
    <alertResiter></alertResiter>
    <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
    <dialogModal :dialogPar='dialogPar'></dialogModal>
  </div>
</template>
<script>
import alertResiter from './home/alertRegiste.vue';
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
import jing from "../public/home/moneyManage.vue";
import usdtActive from "../public/activity/usdt.vue";
import hongbaoyu from "../public/hongbaoyu/index";
import $ from "jquery";
export default {
  mixins: [data],
  data() {
    return {
        count:30,
        minSize:80,
        maxSize:100,
    //    count:0,
        liParams: [],
            timer: null,
            duration: 10000 ,// 定义时间
      lotHeadDatas: {
        logoUrl: "/static/737qp/img/gc-logo.png",
        downLoadurl: "/static/737qp/html/download/index.html"
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
        btnColor:'rgba(46,166,238,1)',
        closeImg: "close_1", //弹窗关闭图片
        coverImgUrl:"../../../../static/737qp/img/attention.png",
      },
      nameSta:"478qp",
      poptype: "tc",
      showtype: {
        topImg: "737qp", //弹窗头部图片
        closeImg: "close_1", //弹窗关闭图片
        textColor: "#579AE5" //弹窗按钮颜色
      }
    };
  },
  components: {
    vpHomeHeader,
    vpLotHeader,
    vpNav,
    vpAside,
    vpHomeFooter,
    personals,
    alertResiter,
    // comModal,
    showModal,
    sideBottom,
    redlope,
    kaiJiang,
    qiandao,
    attentionModel,
    safeModal,
    jing,
    dialogModal,
    usdtActive,
    hongbaoyu,
  },
  store
};
</script>
<style lang="less" scoped >

</style>





