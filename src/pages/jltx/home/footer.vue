<template>
    <div id="footer-bg" class="clear">
        <div class="footer">
            <div class="footer-top">
                <div>
                    <p>关于澳门永利皇宫</p>
                    <p>澳门永利皇宫为融合六大国际化平台，鉴于平台间各自拥有不同之独立与管理系统，遭遇技术上严峻考验。永利皇宫集团率领团队以“多平台技术”与“高质量服务”为主轴，秉持非突破不可的信念，将永利皇宫打造成亚洲在线专业品牌，拥有澳门政府发放的博彩牌照，在亚洲博彩大奖中被评为最佳娱乐场，与亚洲最大博彩软件提供商LEBO进行技术深度合作，提供刺激好玩的电子、棋牌、捕鱼、视讯、彩票、体育共同打造高品质游戏平台，目前拥有澳门及菲律宾合法注册之博彩牌照。我们一切博彩营业行为皆遵从澳门政府及菲律宾政府博彩条约。我们在越来越热的网络博彩市场中，不断地求新求变，寻找最新的创意，秉持最好的服务。以带给客户高品质的服务、产品、娱乐，是我们的企业永恒宗旨。 我们全年24小时无间断的给广大会员提供服务</p>
                </div>
                <div>
                    <p>联系我们</p>
                    <p>
                        <span @click="goLink('/kefu')"></span>
                    </p>
                    <p>监管机构</p>
                    <p>
                        <span><img src="/static/jltx/img/fo1.png" alt=""></span>
                        <span><img src="/static/jltx/img/fo2.png" alt=""></span>
                        <span><img src="/static/jltx/img/fo3.png" alt=""></span>
                    </p>
                </div>
            </div>
            <div class="sponsors" :class="['view view-slideup on']"></div>
            <div class="footerNav" :class="['view view-slideup on']">
                <ul>
                    <li class="footerNavItem" v-for="(item,i) in aItems" :key="i">
                        <a @click="goHelp(item.link)" href="javascript:;">{{item.item}}</a>
                    </li>
                </ul>
                <div class="copyRight">Copyright © 澳门永利皇宫 Reserved</div>
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
            imgSrc:'/static/jltx/img/service.png',
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
                window.open('/static/jltx/html/download/index.html');
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
        },
        mouseOver(){
            this.imgSrc = '/static/jltx/img/service_h.png'
        },
        mouseLeave(){
            this.imgSrc = '/static/jltx/img/service.png'
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
                this.footerBg = '/static/jltx/img/index-main-bg-n.jpg';
            } else {
                this.footerBg = '/static/jltx/img/home/image_2019_02_14T08_56_54_932Z.png';
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
    border-top: 1px solid #1A1A1A;
    background: #000000;

    .footer {
        width: 100%;
        margin-top: 30px;
        .footer-top{
            width: 1200px;
            display: flex;
            margin: 0 auto;
            height: 250px;
            div{
                
                &:first-child{
                    width: 792px;
                    p{
                        &:first-child{
                            color: #fff;
                            font-size: 19px;
                        }
                        &:last-child{
                            color: #9C9FA4;
                            font-size: 13px;line-height: 30px;
                            margin-top: 25px;
                        }

                    }
                }
                &:last-child{
                    margin-left: 30px;
                    p{
                        color: #fff;
                        font-size: 19px; 
                        &:nth-child(3){
                            margin-top: 30px;
                            margin-bottom: 30px;
                        }
                        &:nth-child(2){
                            span{
                                display: inline-block;
                                width: 363px;
                                height: 88px;
                                cursor: pointer;
                                background: url('/static/jltx/img/service.png') no-repeat;
                                background-size: 100% 100%;
                                &:hover{
                                    background: url('/static/jltx/img/service_h.png') no-repeat;
                                    background-size: 100% 100%;
                                    background-position: 0 -1px;
                                }
                            }
                            

                        }
                        &:last-child{
                            margin-top: 20px;
                            span{
                                display: inline-block;
                                width: 90px;
                                height: 100px;
                                img{
                                    vertical-align: center;
                                }
                                &:nth-child(2){
                                    margin-right: 15px;
                                }
                            }
                        }
                    }
                    
                }
            }
        }
        .sponsors {
            width: 1200px;
            margin: 0 auto;
            height: 109px;
            background: url(/static/jltx/img/logoarr.png) no-repeat center bottom;
        }

        .footerNav {
            border-top: 1px solid #1A1A1A;
            height: 77px;
            width: 100%;
            margin-top: 21px;
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
                        border-left: 1px solid #3F4042;
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
