<template>
  <div>
    <!-- <hongbaoyu :theme="'theme2'" v-show="$route.path == '/home'"></hongbaoyu> -->
    <div
      class="vp-aqvns-style"
      :class="{ tcgBlur: $store.state.personal.isPersonal }"
    >
      <!-- 传统彩票 -->
      <div
        class="vp-lottery-style"
        v-if="
          $route.path.includes('/plays') ||
          $route.path.includes('/rules') ||
          $route.path.includes('/trend')
        "
      >
        <vp-lot-header :lotHeadDatas="lotHeadDatas"></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div>
      <!-- 主页 -->
      <div v-else class="aqvns-cont-wrap">
        <vp-home-header></vp-home-header>
        <vp-aside></vp-aside>
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal></safeModal>
    <!-- <comModal :poptype='poptype'></comModal> -->
    <showModal :showtype="showtype"></showModal>
    <redlope :isRedShow="$store.state.home.isRedLop"></redlope>

    <!-- <jumpnewuser :theme="'dark'" :isNewUser='true'></jumpnewuser> -->

    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
    <vpRegister></vpRegister>
    <dialogModal :dialogPar="dialogPar"></dialogModal>
    <bindPhone></bindPhone>
    <bindbank></bindbank>
  </div>
</template>
<script>
import dialogModal from "../public/home/test1Dialog.vue";
import attentionModel from "../public/home/attentionModel.vue";
import safeModal from "../public/home/safeCheck.vue";
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
import redlope from "../public/red-lope/index";
import jumpnewuser from "../public/jump-newuser/index";
import kaiJiang from "../public/kai-jiang/index.vue";
import qiandao from "../public/qiandao/index";
// import hongbaoyu from "../public/hongbaoyu/index";
import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/js85/img/home_logo.png",
        downLoadurl: "/static/js85/html/download/index.html",
      },
      dialogPar: {
        borderTop: "3px solid #3D3F44",
        headBg: "#0F0F0F",
        bandBorder: "1px solid #3E4148",
        active: "#63666D",
        titleColor: "#484A51",
        ulBg: "#FCFCFC",
        ulBg2: "#fff",
        headColor: "#fff",
        borderLeft: "3px solid #484A51",
        activeName: "darkActive",
        hoverName: "hoverName3",
      },
      poptype: "vnso",
      showtype: {
        topImg: "vnsr", //弹窗头部图片
        closeImg: "close_3", //弹窗关闭图片
        textColor: "#3B4062", //弹窗按钮颜色
      },
      attPar: {
        btnColor: "#2D2B2B",
        closeImg: "close_1", //弹窗关闭图片
        coverImgUrl: "../../../../static/js85/img/tc.png",
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
    redlope,
    jumpnewuser,
    kaiJiang,
    qiandao,
    attentionModel,
    safeModal,
    // hongbaoyu,
    dialogModal,
    bindPhone,
    bindbank,
  },
  store,
};
</script>

<style lang="less">
body {
  overflow-x: hidden;
  .vp-aqvns-style {
    background: #202020;
  }
  .aqvns-cont-wrap {
    background: url("/static/js85/img/home/v0601_img/homePage-bg.png") no-repeat
      center top;
  }
  .vp-lottery-style {
    overflow-x: auto;
  }
}
</style>
