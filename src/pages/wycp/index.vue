<template>
    <div>
        <div class="vp-wycp-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
            <!-- 传统彩票 -->
            <div class="vp-lottery-style" v-if="
                $route.path.includes('/plays') ||
                $route.path.includes('/rules') ||
                $route.path.includes('/trend') ">
                <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
                <router-view class="content-container"></router-view>
            </div>
            <!-- 主页 -->
            <div v-else class="wycp-cont-wrap">
                <vp-home-header></vp-home-header>
                <vp-aside></vp-aside>
                <router-view></router-view>
                <vp-home-footer></vp-home-footer>
            </div>
        </div>
        <div class="personals-wrap-style">
            <personals></personals>
        </div>
        <dialogModal :dialogPar='dialogPar'></dialogModal>
        <attentionModel :parmas="attPar"></attentionModel>
        <safeModal :stationName="poptype"></safeModal>
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
let timer;
import dialogModal from '../public/home/test1Dialog.vue'
import attentionModel from "../public/home/attentionModel.vue";
import safeModal from  "../public/home/safeCheck.vue"
import vpLotHeader from '@/pages/public/tradition/components/header/header';
import vpHomeHeader from './home/header';
import vpAside from './home/Aside';
import vpHomeFooter from './home/footer';
import personals from '../public/personals';
import store from '@/vuex/store';
import comModal from '../public/home/newcommon';
import data from '../public/homeMeans/index.js';
import showModal from  "../public/home/showcommon.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue';
import qiandao from '../public/qiandao/index'
import bindPhone from "../public/home/bindPhone";
import bindbank from "../public/home/bindbankcar.vue";
export default {
    mixins: [data],
    data() {
        return {
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
            lotHeadDatas: {
                logoUrl: '/static/wycp/img/logo.png',
                downLoadurl: '/static/wycp/html/download/index.html'
            },
            poptype:"ecp",
            showtype:{
                topImg:'ecp',//弹窗头部图片
                closeImg:'close_1',//弹窗关闭图片
                textColor:'#C42529',//弹窗按钮颜色
            },
            attPar:{
                btnColor:'#E44B48',
                closeImg: "close_1", //弹窗关闭图片
                coverImgUrl:"../../../../static/wycp/img/tc.png",
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
        comModal,
        showModal,
        redlope,
        kaiJiang,
        qiandao,
        attentionModel,
        safeModal,
        dialogModal,
        bindPhone,
        bindbank
    },
    store
};
</script>