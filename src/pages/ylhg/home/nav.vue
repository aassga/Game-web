  <template>
    <div class="top_nav">
        <DIV class="nav-content content view view-slideup on">
            <ul class="nav-bar">
                <li class="tpT" v-for="(item,i) in classifyList" :key="i">
                    <img src="/static/ylhg/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                    <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex,fontColor:colorbool}, 'x-dh-t']">
                        <span class="navName">{{item.name}}</span>
                    </a>
                    <span class="dot-line"></span>
                    <div class="girl dropdown" v-if="item.list">
                        <ol>
                            <li v-for="(v,i) in item.list" :key="i" @click="$goPath('nav',v)">
                                <a href="javascript:void(0)">
                                    <img :src="v.img" width="37" height="21" alt v-if="v.img">
                                    <span>{{v.name}}</span>
                                    <br>
                                </a>
                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
        </DIV>
        <div class="carouse t-default" :class="{'bounceOut':$route.path=='/home'}" v-if="$route.path==='/home'">
            <Carousel :autoplay="isAutoPlay" loop :style="{width: curWidth + 'px',height:carheight +'px',overflow:'hidden',margin:'0 auto'}"
                :autoplay-speed="autoplaySpeed" :dots="dots" view view-slideup on style="cursor:pointer">
                <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                    <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                        <div
                            :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}">
                        </div>
                    </a>
                    <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"
                        v-else>
                    </div>
                </Carousel-item>
            </Carousel>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import data from '../../public/games/public.js';
import vpHeaderPic from './headerPic';
export default {
    mixins: [data],
    inject: ['reload'],
    data() {
        return {
            isAutoPlay: true,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: '/',
            lantern: '',
            isHome: true,
            bannerIndex: 4,
            isRegister: false,
            navChecked: 0,
            autoplaySpeed: 6000,
            dots: 'none',
            carheight: 480,
            curWidth: 1920,
            gameIndex: 0,
            carouselData: [],
            bounceTrue: false,
            checked: 0,
            classifyList: [
                {
                    name: '首页',
                    text: 'HOME',
                    platform: 'home',
                    link: '/home'
                },
                {
                    name: '真人视讯',
                    text: 'CASINO',
                    link: '/home/live',
                    platform: 'live_casino'
                },
                {
                    name: '棋牌游戏',
                    text: 'CHESS',
                    platform: 'KY_CHESS',
                    link: '/home/chess?navid=9&id=0',
                    gameName: '0'
                },
                {
                    name: '彩票游戏',
                    text: 'LOTTERY',
                    platform: 'CT_LOTTERY',
                    link: '/plays/hall',
                    type:"lottery",
                    gameName: '0'
                },
                {
                    name: '电子游戏',
                    text: 'GAME',
                    platform: 'AG_GAME',
                    link: '/home/slot?navid=9&id=0'
                },
                {
                    name: '捕鱼游戏',
                    text: 'FISHING',
                    link: '/home/fish?navid=9&id=0'
                },
                {
                    name: '体育电竞',
                    text: 'SPORTS',
                    platform: 'sport',
                    link: '/home/tiyu?id=0'
                },
                {
                    name: '优惠活动',
                    text: 'ACTIVETY',
                    link: '/home/youhui'
                },
                {
                    name: '在线客服',
                    text: 'SERVICE',
                    link: 'service',
                    type:"service",
                }
            ],
            lantern: '',
            flag: 0,
            getnightbool: false
        };
    },
    methods: {
        async getGameDatas() {
            await this.$gameSortV4();
        },
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: 'banner',
                clientType: 'pc'
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
                this.downloadAppTarget = res.data[0] && res.data[0].downloadAppTarget;
            }
        },
        // 新文字走马灯接口
        async getLantern() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type: 'PC'
            });
            if (res && res.code == 200) {

                if (res.data.data.length) {
                    this.lantern = res.data.data[0] && res.data.data[0].description;
                } else {
                    return false;
                }
            }
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        },
        setActiveItem1(e) {
            this.flag = e.offsetX;
        },
        setActiveItem2(e) {
            if (e.offsetX - this.flag > 10) {
                this.$refs.carousel.prev();
            } else if (e.offsetX - this.flag < -10) {
                this.$refs.carousel.next();
            }
        },
        goHome() {
            this.$router.push('/home');
        },

        goLink(item, i) {
            this.gameIndex = i;
            this.navChecked = i;
            localStorage.setItem('navIndex', i);
            if (item.link) {
                if (item.link == 'service') {
                    let service = JSON.parse(localStorage.config).service;
                    if (service) {
                        let ser = service.find(item => item.status === 'on');
                        if (ser) {
                            window.open(ser.url);
                        }
                    }
                } else if (item.link == '/plays/hall') {
                    window.open('#/plays/hall');
                    return false;
                } else if (item.link == '/home/youhui') {
                    this.$router.push(item.link);
                    this.reload();
                } else {
                    this.$router.push(item.link);
                    this.reload();
                }
            } else if (item.gameName) {
                this.trustLogin(item);
            }
        },
        thirdParty(item, platform) {
            if (item.link == '/plays/hall') {
                window.open('#/plays/hall');
                return false;
            } else if (item.platform == 'VR_LOTTERY') {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: '未登录',
                        model: '',
                        leftspan: true
                    });
                    return false;
                } else {
                    this.getItemId({ id: '30', platform: 'vr_lottery', name: 'VR彩票' });
                }
            }
            if (item.id) {
                this.getItemId(item);
            } else if (item.gameName) {
                this.trustLogin(item);
            } else if (item.num) {
                this.$router.push('/home/games?id=' + item.num);
            } else {
                this.$router.push(item.link);
            }
        }
    },
    watch: {
        '$route.path': function(newVal, oldVal) {
            switch (true) {
                case newVal == '/home':
                    this.gameIndex = 0;
                    this.navChecked = 0;
                    break;
                case newVal.includes('/home/live'):
                    this.gameIndex = 1;
                    this.navChecked = 1;
                    break;
                case newVal.includes('/home/chess'):
                    this.gameIndex = 2;
                    this.navChecked = 2;
                    break;
                case newVal == '/home/youhui':
                    this.gameIndex = 7;
                    this.navChecked = 7;
                    break;
                case newVal.includes('/home/slot'):
                    this.gameIndex = 4;
                    this.navChecked = 4;
                    break;
                case newVal == '/home/fish':
                    this.gameIndex = 5;
                    this.navChecked = 5;
                    break;
                case newVal == '/home/tiyu':
                    this.gameIndex = 6;
                    this.navChecked = 6;
                    break;
            }
            this.$store.commit('mainState/getRoute', newVal);
        },
        '$store.state.mainState.color': {
            handler: function(newer, older) {
            },
            deep: true
        }
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        }
    },
    created() {
        this.getGameDatas();
        this.getBanner();
        this.$store.commit('mainState/getRoute', this.$route.path);
        
    },
    mounted() {
        if (this.clientwidth <= 1920) {
            this.curWidth = this.clientwidth;
        } else {
            this.curWidth = 1920;
        }

        this.getnightbool = this.$store.state.mainState.color;

        let routerSrc = this.$store.state.mainState.routeSrc;

        this.navChecked = this.gameIndex = localStorage.getItem('navIndex');

        if (routerSrc === '/home') {
            this.navChecked = 0;
            this.gameIndex = 0;
        }

        this.getLantern();

        setInterval(() => {
            $('.isColor:odd .x-dh-t').css('color', 'rgb(0,255,0)');
            $('.isColor:odd .x-dh-b').css('color', 'rgb(0,255,0)');
            $('.isColor:even .x-dh-t').css('color', 'rgb(255,0,0)');
            $('.isColor:even .x-dh-b').css('color', 'rgb(255,0,0)');
        }, 150);

        setInterval(() => {
            $('.isColor:odd .x-dh-t').css('color', 'rgb(255,0,0)');
            $('.isColor:odd .x-dh-b').css('color', 'rgb(255,0,0)');
            $('.isColor:even .x-dh-t').css('color', 'rgb(135,8,156)');
            $('.isColor:even .x-dh-b').css('color', 'rgb(135,8,156)');
        }, 300);

    },
    components: {
        vpHeaderPic
    }
};
</script>
<style lang="less">
/deep/.carouse {
    /deep/.ivu-carousel {
        .ivu-carousel-arrow {
            width: 70px;
            height: 70px;
            .ivu-icon::before {
                font-size: 40px;
            }
        }
        .ivu-carousel-arrow.right {
            right: 100px;
        }
        .ivu-carousel-arrow.left {
            left: 100px;
        }
    }
}
.top_nav {
    position: relative;
    width: 100%;
    background: #0f0f0f;
    margin: 0 auto;
    .nav-content {
        width: 1200px;
        height: 42px;
        margin: 0 auto;
        .logo {
            float: left;
            text-align: center;
            width: 334px;
            height: 30px;
            margin-top: 26px;
        }
        .nav-bar {
            width: 100%;
            height: 42px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            & > li {
                position: relative;
                height: 42px;
                font-size: 16px;
                color: #fff;
                list-style: none;
                cursor: pointer;
                transition: all 0.3s;
                &.tpT {
                    line-height: 42px;
                }
                a {
                    width: 100%;
                    height: 100%;
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: inherit;
                    position: relative;
                    font-weight: normal !important;
                    line-height: 40px;
                    font-family: 'PingFang SC', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'STHeitiSC-Light', 'Microsoft Yahei',
                        sans-serif, arial;
                    -webkit-font-smoothing: antialiased;
                    .navName {
                        display: block;
                        color: #fff;
                        font-weight: normal !important;
                        font-size: 15px;
                    }
                    .navText {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        font-size: 12px;
                        margin: 0 auto;
                        top: 22px;
                        white-space: nowrap;
                        text-align: center;
                        font-weight: normal !important;
                    }
                    .bg-home {
                        width: 25px;
                        height: 23px;
                        display: block;
                        position: relative;
                        top: 50%;
                        transform: translateY(-50%);
                        background: url('/static/public/image/userImg/header_nav_sprites.png') -10px -10px;
                    }
                    .bg-home:hover {
                        background: url('/static/public/image/userImg/header_nav_sprites.png') -55px -10px;
                    }
                }
                &:not(:last-child) > .dot-line {
                    position: absolute;
                    top: 16px;
                    right: -42px;
                    width: 1px;
                    height: 12px;
                    border-right: 1px dotted #525866;
                }

                .x-dh-i {
                    position: absolute;
                    top: 12px;
                    right: 0px;
                }
                .x-dh-t {
                    display: block;
                    &:hover {
                    }
                    &:hover .triangle1 {
                        display: block;
                    }
                }
                .navActive {
                    .navName,
                    .navText {
                        color: #cca352;
                    }
                }
                .fontColor {
                    color: #d7d7e2;
                }
                .triangle {
                    font-size: 22px;
                    content: '';
                    position: absolute;
                    bottom: 0px;
                    left: 50%;
                    margin-left: -5px;
                    border: 5px solid transparent;
                    border-bottom: 5px solid #cca352;
                    transition: all 0.2s;
                }
                .triangle1 {
                    display: none;
                    font-size: 22px;
                    content: '';
                    position: absolute;
                    bottom: 0px;
                    left: 50%;
                    margin-left: -5px;
                    border: 5px solid transparent;
                    border-bottom: 5px solid #cca352;
                    transition: all 0.2s;
                }

                .x-dh-b {
                    white-space: nowrap;
                }
                .dropdown {
                    left: 50%;
                    display: none;
                    position: absolute;
                    top: 38px;
                    z-index: 999;
                    transform: translate(-50%, 0);
                    display: none;
                    border-radius: 10px;
                    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                    color: #fff;
                    background: #0f0f0f;
                    ol {
                        width: 120px;
                        padding-top: 10px;
                        li {
                            line-height: 40px;
                            color: #fff;
                            width: 120px;
                            height: 40px;
                            margin: 0;
                            a {
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                text-align: center;
                                color: #fff;
                                vertical-align: top;
                                font-size: 14px;
                                img {
                                    border: 0;
                                    vertical-align: middle;
                                }
                                span {
                                    font-size: 14px;
                                }
                            }
                            &:hover {
                                display: block;
                                position: relative;
                                color: #647488;
                            }
                        }

                        li:hover {
                            background: #cca352;
                        }
                        li:nth-child(1):hover {
                            background: #cca352;
                            border-radius: 0px;
                        }
                        li:last-child:hover {
                            background: #cca352;
                            border-radius: 0px 0px 10px 10px;
                        }
                    }
                }
                .dropdown:after {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: -16px;
                    margin-left: -4px;
                    border: 8px solid transparent;
                    border-bottom: 8px solid #cca352;
                }
            }
            li:first-child {
                padding-left: 0;
            }
            li > a:after {
                content: '';
                background-color: #cca352;
                width: 0;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: 0;
                transition: all 0.8s;
            }
            li a.navActive:after {
                content: '';
                background-color: #cca352;
                width: 100%;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: 0;
                transition: all 0.8s;
            }
            li:hover > a:after,
            li > a.navActive:after {
                width: 100%;
            }
            li:last-child {
                margin-right: 0;
                padding-right: 0;
            }
            li:hover {
                .x-dh-t {
                    .navName,
                    .navText {
                        color: #cca352 !important;
                    }
                }
                .x-dh-b {
                    color: #cca352;
                }
                .dropdown {
                    display: block;
                }
            }
        }
    }
    .carouse {
        text-align: center;
        width: 100%;
        margin: 0 auto;
        background: #141414;
        /deep/ .el-carousel__indicators {
            bottom: 5px;
        }

        /deep/ .el-carousel__button {
            -webkit-text-stroke-width: 10px;
            height: 10px;
            border-radius: 50%;
        }
    }
    .newgong {
        position: absolute;
        height: 40px;
        width: 100%;
        bottom: 0px;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 12;
        .newgong-content {
            width: 1200px;
            height: 40px;
            margin: 0 auto;
            .notice {
                float: left;
                position: relative;
                top: 12px;
                left: 25px;
                margin-right: 50px;
                i {
                    font-weight: 600;
                    color: white;
                    font-family: 'iconfont' !important;
                    font-size: 16px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                }
            }
            .demolist {
                display: inline-block;
                width: 990px;
            }
        }
    }
    .youhuiActive {
        top: 100px !important;
    }
}

.night {
    background: rgba(18, 21, 66, 0.8);
}

.bounceOut {
    position: relative;
    animation: bounceOut 0.3s ease;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
}

@keyframes bounceOut {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
        transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
        opacity: 1;
        transform: scaleX(1);
    }
}
.view.view-slideup {
    opacity: 0;
}

.view.view-slideup.on {
    opacity: 1;
    animation: view-slideup 0.8s ease;
}

@keyframes view-slideup {
    0% {
        opacity: 0;
        transform: translate(0, 30px);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}
</style>
