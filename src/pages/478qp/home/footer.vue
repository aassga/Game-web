<template>
    <div id="footer-bg" class="clear">
        <div class="footer">

            <ul class="fastFunctions" :class="['view view-slideup on']">
                <li class="funcItem" v-for="item in fastNavList" :key="item.id">
                    <i class="footerIcon" :class="item.class" />
                    <div class="detailCont">
                        <span class="title">{{item.title}}</span>
                        <span class="desc">{{item.desc}}</span>
                        <ul class="links">
                            <li v-for="(subItem,i) in item.subCont" :key="i" @click="goLink(subItem.link)">{{subItem.name}}</li>
                        </ul>
                    </div>
                </li>
                <!-- 牌照弹窗 -->
                <div class="licenseShow" v-if="paizhaoShow">
                    <div class="licenseImg">
                        <div class="btn-close" @click="paizhaoShow=false">X</div>
                        <img class="img" src="/static/478qp/img/footer/zhanshi.png" alt>
                    </div>
                </div>
            </ul>

            <div class="sponsors" :class="['view view-slideup on']"></div>

            <div class="footerNav" :class="['view view-slideup on']">
                <ul>
                    <li class="footerNavItem" v-for="(item,i) in aItems" :key="i">
                        <a @click="goHelp(item.link)" href="javascript:;">{{item.item}}</a>
                    </li>
                </ul>
                <div class="copyRight">© 2020 澳门永利皇宫 版权所有. All rights reserved</div>
            </div>
        </div>
        <div class="fillSpace"></div>
        <new-modal :newmodal="newmodal"></new-modal>
    </div>
</template>

<script>
import store from '@/vuex/store';
import newModal from '../../public/home/newmodal.vue';

export default {
    data() {
        return {
            scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            isShow: false,
            paizhaoShow: false,
            aItems: [
                { item: '关于我们', link: '/home/about/aboutUs' },
                { item: '联系我们', link: '/home/about/contactUs' },
                { item: '存款帮助', link: '/home/about/saveHelp' },
                { item: '取款帮助', link: '/home/about/withdrawHelp' },
                { item: '合作伙伴', link: '/home/about/partners' }
            ],
            fastNavList: [
                {
                    id: 2,
                    class: 'downloadApp',
                    title: '下载APP',
                    desc: '五分钟助您畅游澳门永利皇宫',
                    subCont: [{ name: '立即查看>', link: '/download' }]
                },
                {
                    id: 3,
                    class: 'fastFunc',
                    title: '便捷功能',
                    desc: '快捷游戏 永不失联',
                    subCont: [{ name: '加入收藏', link: '/save' }, { name: '设为首页', link: '/setHome' }]
                },
                {
                    id: 4,
                    class: 'agent',
                    title: '合作代理',
                    desc: '加入我们 合作共赢',
                    subCont: [{ name: '立即查看', link: '/home/about/partners' }]
                },
                {
                    id: 5,
                    class: 'license',
                    title: '牌照展示',
                    desc: '持有 Pagcor 合法执照',
                    subCont: [{ name: '立即查看>', link: '/showLicense' }]
                }
            ],
            curId: 0,
            show_mobile: true,
            animatedStaues: false,
            // footerBg:"",
            footbgcolor: '#0F0F0F',
            newmodal: {
                title: '来自澳门永利皇宫的消息',
                bgcolor: {
                    background: 'linear-gradient(to right, #fcc65b, #b0701c)'
                }
            }
        };
    },
    methods: {
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (this.$route.path == '/home') {
                if (scrollTop >= 1550) {
                    this.isShow = true;
                }
            } else if (this.$route.path == '/home/live') {
                if (scrollTop >= 790) {
                    this.isShow = true;
                }
            } else if (this.$route.path.includes('/home/qipai')) {
                if (scrollTop >= 380) {
                    this.isShow = true;
                }
            } else if (this.$route.path.includes('/home/games')) {
                if (scrollTop >= 480) {
                    this.isShow = true;
                }
            } else if (this.$route.path == '/home/buyu') {
                if (scrollTop >= 1200) {
                    this.isShow = true;
                }
            } else if (this.$route.path == '/home/about/partners') {
                if (scrollTop >= 300) {
                    this.isShow = true;
                }
            }
        },
        /**
         * 收藏本站
         * @param title
         */
        addFavorite(title) {
            var url = 'http://' + location.hostname + '/';
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, '');
                } catch (e) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: '抱歉，您所使用的浏览器无法完成此操作。\n加入收藏失败，电脑请使用Ctrl+D进行添加',
                        model: 'warn'
                    });
                }
            }
        },
        /* 设为首页 */
        setIndex() {
            var content =
                '<font size="3.5">抱歉，您所使用的浏览器无法完成此操作。您需要手动设置为首页，' +
                '请参考<a style="color:#57a3f3;" href="http://www.baidu.com/cache/sethelp/index.html" target="_blank">如何设为首页</a></font>';
            // this.$Modal.info({
            //     title: '设为首页提示',
            //     content: content
            // });


            var url = 'http://' + location.hostname + '/';
            try {
                window.external.addFavorite(url, '设为首页提示');
            } catch (e) {
                try {
                    window.sidebar.addPanel('设为首页提示', url, '');
                } catch (e) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: content,
                        model: 'warn'
                    });
                }
            }
        },

        goLink(link) {
            if (link == '/kefu') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else if (link == '/showLicense') {
                this.paizhaoShow = true;
            } else if (link == '/download') {
                window.open('/static/478qp/html/download/index.html');
            } else if (link == '/save') {
                this.addFavorite('澳门永利皇宫');
            } else if (link == '/setHome') {
                this.setIndex();
            } else {
                this.$router.push(link);
            }
        },

        goHelp(link) {
            this.$router.push(link);
        }
    },
    computed: {
        // 是否提示信息
        tipDatas() {
            return this.$store.state.alert.tipModel;
        },
        colorbool() {
            return this.$store.state.mainState.color;
        }
    },

    watch: {
        colorbool(newbool, oldbool) {
            if (newbool == true) {
                this.footerBg = '/static/478qp/img/index-main-bg-n.jpg';
            } else {
                this.footerBg = '/static/478qp/img/home/image_2019_02_14T08_56_54_932Z.png';
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

        if (
            this.$route.path == '/home/register' ||
            this.$route.path == '/home/about/aboutUs' ||
            this.$route.path == '/home/about/contactUs' ||
            this.$route.path == '/home/about/saveHelp' ||
            this.$route.path == '/home/about/withdrawHelp' ||
            this.$route.path == '/home/tiyu' ||
            this.$route.path == '/home/youhui'
        ) {
            this.isShow = true;
        }
    },
    created() {
        this.$store.commit('mainState/getRoute', this.$route.path);
    },
    components: {
        newModal
    },
    store
};
</script>

<style lang="less" scoped>
#footer-bg {
    zoom: 1;
    width: 100%;
    margin: auto;
    border-top: 1px solid #ba924a;
    background: linear-gradient(to bottom, #0a0a0a, #1b1b1b);

    .footer {
        width: 1200px;
        margin: 0 auto;
        background: linear-gradient(to bottom, #0a0a0a, #1b1b1b);

        .fastFunctions {
            border-bottom: 1px solid #2a2c31;
            padding: 24px 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .funcItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .footerIcon {
                    width: 60px;
                    height: 60px;
                    margin-right: 16px;
                    background: url('/static/478qp/img/footer/footer_icons.png') no-repeat center;

                    &.contact {
                        background-position: 0 0;
                    }
                    &.downloadApp {
                        background-position: -60px 0;
                    }
                    &.fastFunc {
                        background-position: -300px 0;
                    }
                    &.agent {
                        background-position: -120px 0;
                    }
                    &.license {
                        background-position: 0 0;
                    }
                }
                .detailCont {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;

                    .title {
                        font-size: 16px;
                        color: #ccc;
                        font-weight: normal;
                        margin-bottom: 10px;
                    }
                    .desc {
                        font-size: 12px;
                        color: #666;
                    }
                    .links {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding-top: 5px;

                        li {
                            color: #cca352;
                            margin-top: 10px;
                            margin-right: 20px;
                            font-size: 12px;
                            cursor: pointer;
                            opacity: 1;

                            &:hover {
                                opacity: 0.5;
                            }
                        }
                    }
                }
            }

            .licenseShow {
                position: fixed;
                background: rgba(0, 0, 0, 0.6);
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 10000000000;
                text-align: center;

                &:before {
                    content: '';
                    height: 100%;
                    display: inline-block;
                    vertical-align: middle;
                }

                .licenseImg {
                    position: relative;
                    width: 800px;
                    vertical-align: middle;
                    height: 800px;
                    line-height: 800px;
                    display: inline-block;
                    background: #e6e6e6;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;

                    .btn-close {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        cursor: pointer;
                        color: #fff;
                        height: 40px;
                        line-height: 33px;
                        text-align: center;
                        width: 40px;
                        font-size: 20px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        background: #868484;
                        border: 4px solid #fff;
                    }
                }
            }
        }

        .sponsors {
            width: 100%;
            height: 66px;
            background: url(/static/478qp/img/footer/sponsors.png) no-repeat center bottom;
        }

        .footerNav {
            border-top: 1px solid #2a2c31;
            height: 77px;
            width: 100%;

            ul {
                padding-top: 20px;
                text-align: center;
                margin-bottom: 8px;
                display: flex;
                justify-content: center;
                align-items: center;

                li {
                    width: 110px;

                    &:not(:first-child) {
                        border-left: 1px solid #666;
                    }

                    a {
                        font-size: 14px;
                        color: #666;
                        transition: opacity 0.2s;
                        opacity: 1;

                        &:hover {
                            transition: opacity 0.2s;
                            opacity: 0.5;
                        }
                    }
                }
            }

            .copyRight {
                font-size: 12px;
                color: #484848;
                text-align: center;
                margin-top: 8px;
            }
        }
    }
    .fillSpace {
        width: 100%;
        height: 380px;
        position: fixed;
        bottom: 0;
        z-index: -1;
        background: #1b1b1b;
    }
}

.view.view-slideup {
    opacity: 0.01;
}

.view.view-slideup.on {
    opacity: 1;
    animation: view-slideup 0.8s ease;
}

@keyframes view-slideup {
    0% {
        opacity: 0.01;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
