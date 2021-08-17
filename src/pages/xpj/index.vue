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
        <!-- <sideBottom></sideBottom> -->
        <router-view></router-view>
        <vp-home-footer v-if="$route.path!=='/home'"></vp-home-footer>
        <!-- <usdtActive></usdtActive> -->
        <div class="gotop" v-if="btnFlag" @click="gotop"><img src="/static/xpj/img/top.svg" width="80px"></div>
      </div>
    </div>
    <div class="personals-wrap-style">
      <personals></personals>
    </div>
    <attentionModel :parmas="attPar"></attentionModel>
    <safeModal :stationName="poptype"></safeModal>
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
  import attentionModel from "../public/home/attentionModel.vue";
  import safeModal from  "../public/home/safeCheck.vue"
  import vpLotHeader from '@/pages/public/tradition/components/header/header'
  import vpHomeHeader from './home/header'
  import vpAside from './home/Aside'
  import vpHomeFooter from './home/footer'
  import personals from '../public/personals'
  import store from '@/vuex/store'
  import comModal from  "../public/home/newcommon.vue"
  import data from "../public/homeMeans/index.js"
  import showModal from  "../public/home/showcommon.vue"
  import sideBottom from "../public/activity/sideBottom.vue";
  import redlope from '../public/red-lope/index';
  import kaiJiang from '../public/kai-jiang/index.vue';
  import qiandao from "../public/qiandao/index";
  import usdtActive from "../public/activity/usdt.vue"
  export default {
    mixins: [data],
    data () {
      return {
        lotHeadDatas: {
          logoUrl: '/static/xpj/img/home/cpLogo.png',
          downLoadurl: '/static/xpj/html/download/index.html'
        },
        btnFlag:false,
        dialogPar:{
          borderTop:"3px solid #695BB0",
          headBg:'#211D38',
          bandBorder:'1px solid #161325',
          active:'#7265B9',
          titleColor:'#5F52A2',
          ulBg:'#FCFCFC',
          ulBg2:'#fff',
          headColor:'#fff',
          borderLeft:'3px solid #978DCC',
          activeName:'purpleActive',
          hoverName:"hoverName5"
        },
        poptype:"xpj",
        showtype:{
          topImg:'blr',//弹窗头部图片
          closeImg:'close_4',//弹窗关闭图片
          textColor:'#3661DE',//弹窗按钮颜色
          classType:'blueType'
        },
        attPar:{
          btnColor:'#111C3E',
          closeImg: "close_1", //弹窗关闭图片
          coverImgUrl:"../../../../static/xpj/img/tc.png",
        },
      }
    },
    methods: {
      //点击返回顶部
      gotop() {
        var timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop =osTop + ispeed;
          this.isTop = true;
          if (osTop === 0) {
            clearInterval(timer);
          }
        }, 20);
      },
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 0) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      }
    },
    created () {
    },
    mounted(){
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    computed: {
        userinfo() {
          return this.$store.state.mainState.userinfo;
        }
    },
    components: {
      vpHomeHeader,
      vpLotHeader,
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
      usdtActive
    },
    store
  }
</script>

<style>
  body {
    background: #fff;

  }
  .gotop{
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 80px;
    height: 80px;
    z-index: 10000;
  }
</style>







