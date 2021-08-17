<template>
    <div>
        <div class="vp-hsyl-style" :class="{'tcgBlur':$store.state.personal.isPersonal}">
            <!-- 传统彩票 -->
            <div class="vp-lottery-style"
                v-if=" $route.path.includes('/plays')|| $route.path.includes('/rules')|| $route.path.includes('/trend') ">
                <vp-lot-header :lotHeadDatas='lotHeadDatas'></vp-lot-header>
                <router-view class="content-container"></router-view>
            </div>
            <!-- 主页 -->
            <div v-else class="hsyl-cont-wrap">
                <!-- <router-view v-if="isRouterAlive"></router-view> -->
                <!-- <sideBottom :showleft='false'></sideBottom> -->
                <vp-home-header></vp-home-header>
                <vp-nav></vp-nav>
                <!-- <sideBottom :showleft='false'></sideBottom> -->
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
    </div>
</template>
<script>
import vpHomeHeader from './home/header.vue';
import vpNav from './home/nav.vue';
import vpLotHeader from '@/pages/public/tradition/components/header/header';
import vpAside from './home/Aside';
import vpHomeFooter from './home/footer';
import personals from '../public/personals';
import store from '@/vuex/store';
import comModal from '../public/home/newcommon';
import data from '../public/homeMeans/index.js';
import { postS, getS } from '@/service/public/service.js';
import showModal from  "../public/home/showcommon.vue";
import sideBottom from "../public/activity/sideBottom.vue";
import redlope from '../public/red-lope/index';
import kaiJiang from '../public/kai-jiang/index.vue'
export default {
    mixins: [data],
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true,
            sideNav: false,
            lotHeadDatas: {
                logoUrl: '/static/478qp/img/logo/gc-logo.png',
                downLoadurl: '/static/478qp/html/download/index.html'
            },
            poptype: 'blr',
            showtype:{
                topImg:'jsyl',//弹窗头部图片
                closeImg:'close_3',//弹窗关闭图片
                textColor:'#CCA352',//弹窗按钮颜色
                classType:'blackType'
            },
        };
    },
    methods: {
        reload() {
            //刷新页面
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
            if (localStorage.token) {
                this.getUserMsg();
            }
        },
        toggleSideNav() {
            this.sideNav = !this.sideNav;
        },
        closeSideNav() {
            this.sideNav = false;
        },
        async getUserMsg() {
            let res = await getS(`/member/messageNoticeCount`);
            if (res && res.data && res.code == 200) {
                this.$store.commit('mainState/getMessage', res.data);
            }
        }
    },
    created() {},
    mounted() {},
    computed: {},
    components: {
        vpLotHeader,
        vpHomeHeader,
        vpNav,
        vpAside,
        vpHomeFooter,
        personals,
        comModal,
        showModal,
        sideBottom,
        redlope,
        kaiJiang
    },
    store
};
</script>

<style lang="less" scoped>
.vp-hsyl-style {
    position: relative;
    .hsyl-cont-wrap {
        background: #1e1e1e;
        position: relative;
        width: 100%;
        .sideNavList {
            left: -320px;
            transition: all 0.6s ease-in-out;
            &.show {
                left: 0;
                transition: all 0.6s ease-in-out;
            }
        }

        .mainContainer {
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
            position: relative;

            &::before {
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.7);
                opacity: 0;
                visibility: hidden;
                transition: all 0.5s ease-in-out;
                z-index: 1;
            }

            &.move {
                transform: translateX(320px);
                transition: all 0.6s ease-in-out;

                &::before {
                    opacity: 1;
                    visibility: visible;
                    transition: all 0.5s ease-in-out;
                }
            }

            .cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
        }
    }
}
</style>

<style lang="less">
body {
    overflow-x: hidden;

    .vp-lottery-style {
        overflow-x: auto;
    }
}
</style>