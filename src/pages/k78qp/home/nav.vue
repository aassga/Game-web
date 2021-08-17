  <template>
    <div class="top_nav">
        <!-- <div class="top_nav" :class="{night:colorbool}"> -->
        <div class="nav-content">
            <div class="logo fl" style="margin-left: -50px;">
                <a href="javascript:void(0)" @click="goHome">
                    <img src="/static/k78qp/img/qy-logo1.png">
                </a>
            </div>
            <ul class="nav-bar fl">
                <li class="tpT" v-for="(item,i) in classifyList" :key="i">
                    <img src="/static/k78qp/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                    <!-- <a  @click="goLink(item,i)"  :class="[{navActive:i==gameIndex}, 'x-dh-t']"  > -->
                    <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex,fontColor:colorbool}, 'x-dh-t']">
                        <span class="navName">{{item.name}}</span>
                        <span class="navText">{{item.text}}</span>
                        <i :class="{triangle:navChecked==i}"></i>
                        <i class="triangle1"></i>
                    </a>
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
        </div>
        <div class="carouse t-default" :class="{'bounceOut':$route.path=='/home'}" v-if="$route.path==='/home'" style="cursor:pointer ">
            <Carousel autoplay loop :style="{height:carheight +'px',overflow:'hidden'}" :autoplay-speed="autoplaySpeed" :dots="dots">
                <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                    <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                        <!-- <img :src="item.img" alt> -->
                        <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"></div>
                    </a>
                    <!-- <img :src="item.img" alt v-else> -->
                    <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}" v-else></div>

                </Carousel-item>
            </Carousel>
        </div>
        <div class="newgong" v-if="$route.path==='/home'" :class="{youhuiActive:$route.path=='/home/youhui'}">
            <div class="newgong-content" @click="showTextModal()">
                <div class="notice">
                    <i class="iconfont icon-sound"></i>
                </div>
                <div class="demolist list">
                    <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                        style="color:white; font-size:14px; line-height: 40px;overflow: hidden;height: 40px;font-weight:600">
                        <span v-html="lantern"></span>
                    </marquee>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
// import data from "../../public/games/public.js";
export default {
    // mixins: [data],
    data() {
        return {
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: "/",
            lantern: "",
            isHome: true,
            bannerIndex: 4,
            isRegister: false,
            navChecked: 0,
            autoplaySpeed: 3000,
            dots: 'none',
            carheight: 530,
            gameIndex: 0,
            carouselData: [
            ],
            bounceTrue: false,
            checked: 0,
            classifyList: [
                {
                    name: "首页",
                    text: "HOME",
                    platform: "home",
                    link: "/home"
                },
                {
                    name: "棋牌游戏",
                    text: "CHESS",
                    platform: "KY_CHESS",
                    link: "/home/chess?navid=9&id=0",
                    gameName: "0",
                    list: [],
                    type:'chess'
                },
                {
                    name: "捕鱼游戏",
                    text: "FISHING",
                    link: "/home/fish?navid=9&id=0",
                    type:'fish'
                },
                {
                    name: "电子游戏",
                    text: "GAME",
                    platform: "AG_GAME",
                    link: "/home/slot?navid=9&id=0",
                    type:'live'
                },
                {
                    name: "真人视讯",
                    text: "CASINO",
                    link: "/home/live",
                    platform: "live_casino",
                    type:'live'
                },
                {
                    name: "开元棋牌",
                    text: "KY CHESS",
                    platform: "KY_CHESS",
                    type:'chess',
                    link: "/home/chess?navid=9&id=10042",
                    gameName: "0"
                },
                {
                    name: "乐游棋牌",
                    text: "LY CHESS",
                    platform: "KY_CHESS",
                    type:'chess',
                    link: "/home/chess?navid=9&id=10612",
                    gameName: "0"
                },
                {
                    name: "天游棋牌",
                    text: "TH CHESS",
                    type:'chess',
                    platform: "KY_CHESS",
                    link: "/home/chess?navid=9&id=10694",
                    gameName: "0"
                },
                {
                    name: "优惠活动",
                    text: "ACTIVETY",
                    link: "/home/youhui"
                },
            ],
            lantern: "",
            flag: 0,
            getnightbool: false,
            lanternData: "",
        };
    },
    methods: {
        async getGameDatas() {
            if(localStorage.slot_game_new) this.getNativeDatas()
            else await this.$getAllgame(this.getNativeDatas);
        },
        getNativeDatas() {
            if (localStorage.chess_game_new) {
                this.classifyList[1].list = this.$gameClass("chess");
            }
        },
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: "banner",
                clientType: "pc"
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
            }
        },
        drop(event) {
        },
        dragover(event) {
            event.preventDefault();
        },
        // 新文字走马灯接口
        async getLantern() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: "lantern",
                client_type: "PC"
            });
            if (res && res.code == 200) {
                if (res.data.data.length) {
                    this.lantern = res.data.data[0] && res.data.data[0].description;
                } else {
                    return false;
                }
            }
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
            this.$router.push("/home");
        },
        // 获取公告列表接口，并缓存
        async getLanternList() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: "lantern",
                client_type: "PC",
                limit:1000,
                page:1
            });
            if (res && res.code == 200) {
                this.lanternData = res.data;
                if(res.data.total>0){
                    sessionStorage.setItem('lanterndata', JSON.stringify( this.lanternData));
                }
            }else{
                return false
            }
        },
        //点击展示公告列表
        showTextModal(){
            if(this.lanternData.total>0){
                this.$store.commit('alert/showTextTip', true)
            }else{
                return false
            }  
        }
    },
    watch: {
        "$route.fullPath": function (newVal, oldVal) {
            switch (true) {
                case newVal == "/home":
                    this.gameIndex = 0;
                    this.navChecked = 0;
                    break;
                case newVal == '/home/chess?navid=9&id=0':
                    this.gameIndex = 1;
                    this.navChecked = 1;
                    break;
                case newVal == "/home/live":
                    this.gameIndex = 4;
                    this.navChecked = 4;
                    break;
                case newVal.includes("/home/slot"):
                    this.gameIndex = 3;
                    this.navChecked = 3;
                    break;
                case newVal == "/home/fish?navid=9&id=0":
                    this.gameIndex = 2;
                    this.navChecked = 2;
                    break;
                case newVal == "/home/chess?navid=9&id=10042":
                    this.gameIndex = 5;
                    this.navChecked = 5;
                    break;
                case newVal == "/home/chess?navid=9&id=10612":
                    this.gameIndex = 6;
                    this.navChecked = 6;
                    break;
                case newVal == "/home/chess?navid=9&id=10694":
                    this.gameIndex = 7;
                    this.navChecked = 7;
                    break;
                case newVal.includes("/home/youhui"):
                    this.gameIndex = 8;
                    this.navChecked = 8;
                    break;
            }
            this.$store.commit("mainState/getRoute", newVal);
        },
    },
    mounted() {
        this.getnightbool = this.$store.state.mainState.color;
        let routerSrc = this.$store.state.mainState.routeSrc;
        this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
        if (routerSrc === "/home") {
            this.navChecked = 0;
            this.gameIndex = 0;
        }
        this.getLantern();
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        }
    },
    created() {
        this.getGameDatas();
        this.getBanner();
        this.getLanternList();
        this.$store.commit("mainState/getRoute", this.$route.path);
        if (this.clientwidth > 1920) {
            this.carheight = (530 * this.clientwidth) / 1920 * 0.9
        }
    }
};
</script>
<style lang="less">
.carouse {
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
    // max-width: 1920px;
    // min-width: 1200px;
    width: 100%;
    margin: 0 auto;
    .nav-content {
        width: 1200px;
        height: 100px;
        margin: 0 auto;
        .logo {
            float: left;
            text-align: center;
            width: 334px;
            height: 30px;
            margin-top: 26px;
        }
        .nav-bar {
            float: right;
            height: 100px;
            // margin-right:10px;
            li {
                float: left;
                position: relative;
                height: 100px;
                line-height: 85px;
                margin: 0 15px;
                font-size: 16px;
                color: #54689a;
                padding: 0 6px;
                list-style: none;
                cursor: pointer;
                transition: all 0.3s;
                &.tpT {
                    line-height: 85px;
                }
                a {
                    width: 100%;
                    height: 95%;
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: inherit;
                    position: relative;
                    .navName {
                        display: block;
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
                .x-dh-i {
                    position: absolute;
                    top: 12px;
                    right: 0px;
                }
                .x-dh-t {
                    display: block;
                    &:hover {
                        border-bottom: 4px #579ae5 solid;
                        color: #579ae5;
                    }
                    &:hover .triangle1 {
                        display: block;
                    }
                }
                .navActive {
                    border-bottom: 4px #579ae5 solid;
                    color: #579ae5;
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
                    border-bottom: 5px solid #579ae5;
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
                    border-bottom: 5px solid #579ae5;
                    transition: all 0.2s;
                }

                .x-dh-b {
                    white-space: nowrap;
                }
                .dropdown {
                    left: 44%;
                    display: none;
                    position: absolute;
                    top: 80px;
                    z-index: 999;
                    transform: translate(-50%, 0);
                    display: none;
                    border-radius: 10px;
                    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                    color: #647488;
                    background: #fff;
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
                                color: #647488;
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
                            background: #e8edf5;
                        }
                        li:nth-child(1):hover {
                            background: #e8edf5;
                            border-radius: 0px;
                        }
                        li:last-child:hover {
                            background: #e8edf5;
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
                    border-bottom: 8px solid #e7edf7;
                }
            }
            li:last-child {
                margin-right: 0;
                padding-right: 0;
            }
            li::after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 0;
                height: 2px;
                color: #5caaea;
                background-color: #5caaea;
                transition: 0.5s all linear;
            }
            li:hover {
                .x-dh-t {
                    color: #5caaea;
                }
                .x-dh-b {
                    color: #5caaea;
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
        // height: 530px;
        margin: 0 auto;
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
                display: inline-block;
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
/deep/.carouse {
    .ivu-carousel {
        .ivu-carousel-arrow {
            width: 70px;
            height: 70px;
        }
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
</style>
