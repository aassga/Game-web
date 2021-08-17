  <template>
    <div class="top_nav">
        <!-- <div class="top_nav" :class="{night:colorbool}"> -->
        
        <div class="carouse t-default" :class="{'bounceOut':$route.path=='/home'}" v-if="$route.path==='/home'" style="cursor:pointer ">
            <!-- iView Carousel -->
            <!-- <Carousel autoplay loop :style="{height:carheight +'px',overflow:'hidden'}" :autoplay-speed="autoplaySpeed" :dots="dots">
                <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                    <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                        <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"></div>
                    </a>
                    <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}" v-else></div>
                </Carousel-item>
            </Carousel> -->
            <!-- vue-awesome-swiper -->
            <swiper
                 v-if="carouselData.length"
                :options="swiperOption"
                ref="mySwiper"
                :style="{ height: carheight + 'px', overflow: 'hidden' }"
            >
                <swiper-slide
                v-for="(item, i) in carouselData"
                :key="i"
                class="myItems"
                >
                <a :href="item.targets" target="_blank" v-if="item.targets !== '#'">
                    <div
                    :style="{
                        background: 'url(' + item.img + ')  no-repeat center top',
                        backgroundSize: 'cover',
                        height: carheight + 'px'
                    }"
                    ></div>
                </a>
                <div
                    :style="{
                    background: 'url(' + item.img + ')  no-repeat center top',
                    backgroundSize: 'cover',
                    height: carheight + 'px'
                    }"
                    v-else
                ></div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="newgong" v-if="$route.path==='/home'" :class="{youhuiActive:$route.path=='/home/youhui'}">
            <div class="newgong-content" @click="showTextModal()">
                <div class="notice">
                    <i class="iconfont icon-sound"></i>
                </div>
                <div class="demolist list">
                    <marquee v-if="lantern" align="middle" direction="up" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                        style="color:#8f98b2; font-size:20px; line-height: 40px;overflow: hidden;height: 40px;margin-top:10px">
                        <span v-html="lantern"></span>
                    </marquee>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    data() {
        return {
            swiperOption: {
                pagination: {
                el: ".swiper-pagination",
                clickable: true
                },
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                speed: 1000,
                loop: true,
                grabCursor: true,
            },
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: "/",
            lantern: "",
            isHome: true,
            bannerIndex: 4,
            isRegister: false,
            navChecked: 0,
            autoplaySpeed: 3000,
            dots: 'inside',
            carheight: 530,
            gameIndex: 0,
            carouselData: [
                // {img:"/static/amhg/img/b1.png"},
                // {img:"/static/amhg/img/b2.png"},
                // {img:"/static/amhg/img/b3.png"},
            ],
            bounceTrue: false,
            checked: 0,
            flag: 0,
            getnightbool: false,
            lanternData: "",
        };
    },
    methods: {
        async getGameDatas() {
            await this.$gameSortV4(this.getNativeDatas);
        },
        getNativeDatas() {
            
            // if (localStorage.chess_game_new) {
            //     this.classifyList[2].list = this.$gameClassV4("chess");
            // }
            // if (localStorage.sport_game_new) {
            //     this.classifyList[6].list = this.$gameClassV4("sport");
            // }
        },
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: "banner",
                clientType: "pc"
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
                // this.downloadAppTarget = res.data[0] && res.data[0].downloadAppTarget;
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
                // desc_client_type: 'html'
                client_type: "PC"
            });
            if (res && res.code == 200) {
                // if (!res.data.data.length) return false
                // this.lantern = res.data.data[0] && res.data.data[0].description

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
            this.$router.push("/home");
        },
        getQiPai() {
            let qipai = JSON.parse(sessionStorage.qipai);
            qipai.forEach(item => {
                const qipai = {
                    name: item.name == "开元棋牌游戏" ? '开元棋牌' : item.name,
                    platform: item.code,
                    link: "/home/qipai?navid=9&id=" + item.id,
                }
                this.classifyList[2].list.push(qipai)
            });
        },
        goLink(item, i) {
            this.gameIndex = i;
            this.navChecked = i;
            localStorage.setItem("navIndex", i);
            if (item.link) {
                if (item.link == "service") {
                    let service = JSON.parse(localStorage.config).service;
                    if (service) {
                        let ser = service.find(item => item.status === "on");
                        if (ser) {
                            window.open(ser.url);
                        }
                    }
                } else if (item.link == "/plays/hall") {
                    window.open("#/plays/hall");
                    return false;
                } else if (item.link == "/home/youhui") {
                    this.$router.push(item.link);
                } else {
                    this.$router.push(item.link);
                }
            } else if (item.gameName) {
                this.trustLogin(item);
            }
        },
        thirdParty(item, platform) {
            if (item.link == "/plays/hall") {
                window.open("#/plays/hall");
                return false;
            } else if (item.platform == "VR_LOTTERY") {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$store.commit("alert/newshowtip", {
                        bool: true,
                        title: "未登录",
                        model: "",
                        leftspan: true
                    });
                    return false;
                } else {
                    this.getItemId({ id: "30", platform: "vr_lottery", name: "VR彩票" });
                }
            }
            if (item.id) {
                this.getItemId(item);
            } else if (item.gameName) {
                this.trustLogin(item);
            } else if (item.num) {
                this.$router.push("/home/games?id=" + item.num);
            } else {
                this.$router.push(item.link);
            }
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
        
        "$store.state.mainState.color": {
            handler: function (newer, older) {
            },
            deep: true
        }
    },
    mounted() {
        // if (sessionStorage.qipai) {
        //     this.getQiPai();
        // } else {
        //     setTimeout(() => {
        //         this.getQiPai();
        //     }, 5000);
        // }
        this.getnightbool = this.$store.state.mainState.color;
        let routerSrc = this.$store.state.mainState.routeSrc;
        this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
        if (routerSrc === "/home") {
            this.navChecked = 0;
            this.gameIndex = 0;
        }
        this.getLantern();
        setInterval(() => {
            $(".isColor:odd .x-dh-t").css("color", "rgb(0,255,0)");
            $(".isColor:odd .x-dh-b").css("color", "rgb(0,255,0)");
            $(".isColor:even .x-dh-t").css("color", "rgb(255,0,0)");
            $(".isColor:even .x-dh-b").css("color", "rgb(255,0,0)");
        }, 150);

        setInterval(() => {
            $(".isColor:odd .x-dh-t").css("color", "rgb(255,0,0)");
            $(".isColor:odd .x-dh-b").css("color", "rgb(255,0,0)");
            $(".isColor:even .x-dh-t").css("color", "rgb(135,8,156)");
            $(".isColor:even .x-dh-b").css("color", "rgb(135,8,156)");
        }, 300);
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        },
        swiper() {
            return this.$refs.mySwiper.swiper;
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
<style lang="less" scoped>
.carouse {
    // /deep/.ivu-carousel {
    //     .ivu-carousel-arrow {
    //         width: 70px;
    //         height: 70px;
    //         .ivu-icon::before {
    //             font-size: 40px;
    //         }
    //     }
    //     .ivu-carousel-arrow.right {
    //         right: 100px;
    //     }
    //     .ivu-carousel-arrow.left {
    //         left: 100px;
    //     }        
    // }
}

// iview carousel dots style
// .ivu-carousel-dots {
//     margin-bottom: 1rem;
// }
// .ivu-carousel-dots li button {
//     width: 32px !important;
//     height: 12px !important;
//     border-radius: 10px !important;
//     background: #000 none repeat scroll 0 0;
//     margin: 0 5px;
// }

// .ivu-carousel-dots li.ivu-carousel-active>button {
//     opacity: 1;
//     width: 32px !important;
//     background: #fff none repeat scroll 0 0;
// }
// iview carousel dots style end
// vue-awesome-swiper pagination style
/deep/ .swiper-pagination-bullet {
  width: 32px !important;
  height: 12px !important;
  border-radius: 10px !important;
  background: #000 none repeat scroll 0 0;
  margin: 0 5px;
}

/deep/ .swiper-pagination-bullet-active {
  opacity: 1;
  width: 32px !important;
  background: #fff none repeat scroll 0 0;
}
// vue-awesome-swiper pagination style end

.top_nav {
    position: relative;
    // max-width: 1920px;
    // min-width: 1200px;
    width: 100%;
    margin: 0 auto;
    
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
        height: 60px;
        line-height: 60px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 442%);
        background:#fff;
        border-radius:30px;
        z-index: 12;
        box-shadow: 0 5px 40px 0 rgba(106,113,127,.15);
        .newgong-content {
            width: 1200px;
            height: 40px;
            margin: 0 auto;
            .notice {
                display: inline-block;
                float: left;
                position: relative;
                top: 0px;
                left: 25px;
                margin-right: 40px;
                i {
                    font-weight: 600;
                    color: gold;
                    font-family: 'iconfont' !important;
                    font-size: 22px;
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
