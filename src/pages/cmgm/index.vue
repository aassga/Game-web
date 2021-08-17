<template>
    <div>
        <div class="vp-hsyl-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
            <!-- 传统彩票 -->
            <div class="vp-lottery-style" v-if="
                $route.path.includes('/plays')||
                $route.path.includes('/rules')||
                $route.path.includes('/trend') ">
                <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
                <router-view class="content-container"></router-view>
            </div>
            <!-- 主页 -->
            <div v-else class="hsyl-cont-wrap">
                <vp-home-header></vp-home-header>
                <vp-aside></vp-aside>
                <router-view></router-view>
                <vp-home-footer v-if="$route.path!=='/home'"></vp-home-footer>
            </div>
        </div>
        <div class="personals-wrap-style">
            <personals></personals>
        </div>
        <attentionModel :parmas="attPar"></attentionModel>
        <safeModal :stationName="nameSta"></safeModal>
        <comModal></comModal>
        <showModal :showtype='showtype'></showModal>
        <redlope :isRedShow='$store.state.home.isRedLop'></redlope>
        <kaiJiang></kaiJiang>
        <qiandao></qiandao>
    </div>
</template>
<script>
import attentionModel from "../public/home/attentionModel.vue";
import safeModal from  "../public/home/safeCheck.vue"
import vpLotHeader from '@/pages/public/tradition/components/header/header';
import vpHomeHeader from './home/header';
import vpAside from './home/Aside';
import vpHomeFooter from './home/footer';
import personals from '../public/personals';
import store from '@/vuex/store';
import comModal from '../public/home/common.vue';
import data from '../public/homeMeans/index.js';
import showModal from  "../public/home/showcommon.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue';
import qiandao from '../public/qiandao/index'
export default {
    mixins: [data],
    data() {
        return {
            lotHeadDatas: {
                logoUrl: '/static/cmgm/img/home/cpLogo.png',
                downLoadurl: '/static/cmgm/html/download/index.html'
            },
            nameSta:"cmgm",
            poptype:"tc",
            showtype:{
                topImg:'mgm',//弹窗头部图片
                closeImg:'close_2',//弹窗关闭图片
                textColor:'#604323',//弹窗按钮颜色
            },
            attPar:{
                btnColor:'rgba(46,166,238,1)',
                closeImg: "close_1", //弹窗关闭图片
                coverImgUrl:"../../../../static/cmgm/img/tc.png",
            },
        };
    },
    mounted() {},
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
        safeModal
    },
    store
};
</script>

<style>
body {
    background: #fff;
}
</style>







