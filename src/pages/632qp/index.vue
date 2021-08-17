<template>
  <div>
    <div class="vp-hsyl-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
      <!-- 传统彩票 -->
      <!-- <div class="vp-lottery-style" v-if="
        $route.path.includes('/plays')||
        $route.path.includes('/rules')||
        $route.path.includes('/trend')
        ">
        <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
        <router-view class="content-container"></router-view>
      </div> -->
      <!-- 主页 -->
      <div class="hsyl-cont-wrap">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <!-- <vp-aside></vp-aside> -->
<!--        <sideBottom></sideBottom>-->
        <router-view></router-view>
        <vp-home-footer></vp-home-footer>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
  <!-- <comModal :poptype='poptype'></comModal> -->
  <showModal :showtype='showtype'></showModal>
   <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
    <kaiJiang></kaiJiang>
    <qiandao></qiandao>
  </div>
</template>
<script>
import vpLotHeader from "@/pages/public/tradition/components/header/header";
import vpHomeHeader from "./home/header";
import vpNav from "./home/nav";
import vpAside from "./home/Aside";
import vpHomeFooter from "./home/footer";
import personals from "../public/personals";
import store from "@/vuex/store";
import comModal from "../public/home/newcommon.vue";
import data from "../public/homeMeans/index.js";
import showModal from "../public/home/showcommon.vue";
// import sideBottom from "../public/activity/sideBottom.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue';
import qiandao from '../public/qiandao/index'
export default {
  mixins: [data],
  data() {
    return {
      lotHeadDatas: {
        logoUrl: "/static/632qp/img/gc-logo.png",
        downLoadurl: "/static/632qp/html/download/index.html"
      },
      poptype: "tc",
      showtype: {
        topImg: "tc", //弹窗头部图片
        closeImg: "close_1", //弹窗关闭图片
        textColor: "#579AE5" //弹窗按钮颜色
      }
    };
  },
  methods: {},
  created() {},
  computed: {},
  components: {
    vpHomeHeader,
    vpLotHeader,
    vpNav,
    vpAside,
    vpHomeFooter,
    personals,
    comModal,
    showModal,
    // sideBottom,
    redlope,
    kaiJiang,
    qiandao
  },
  store
};
</script>






