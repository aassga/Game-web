  <template>
    <div class="top_nav">
        <!-- <div class="nav-content">
            <div class="nav_box">
                <ul class="nav-bar fl">
                    <li :class="['tpT',item.name == 'logo' ? 'logoClass':'']" v-for="(item,i) in classifyList" :key="i" >
                        <img src="/static/99qp/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow && item.name != 'logo'">
                        <img v-if="item.name == 'logo'" :src="item.logoUrl" width="305px">
                        <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex,fontColor:colorbool,'x-dh-t':item.name != 'logo'}]" @mouseover="getList(item)">
                            <span v-if="item.name != 'logo'" class="navName">{{item.name}}</span>
                            <span class="navText">{{item.text}}</span>
                            <i :class="{triangle:navChecked==i}"></i>
                            <i class="triangle1"></i>
                        </a>
                        <div class="girl dropdown" v-if="item.list && showDrapdown == true">
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
        </div> -->
        <div class="carouse t-default" :class="{'bounceOut':$route.path=='/home'}" v-if="$route.path==='/home'" style="cursor:pointer ">
            <Carousel
                autoplay loop
                :style="{height:carheight +'px',overflow:'hidden'}"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
                <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                    <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                            <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"></div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}" v-else></div>
                </Carousel-item>
                
            </Carousel>
        </div>
        <div class="newgong" v-if="$route.path==='/home'" :class="{youhuiActive:$route.path=='/home/youhui'}">
            <div class="newgong-content" @click="showTextModal()">
                <div class="notice">
                    <i class="iconfont"><img src="/static/99qp/img/notice.png" alt=""></i>
                </div>
                <div class="demolist list">
                    <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                        style="color:#000; font-size:14px; line-height: 40px;overflow: hidden;height: 40px;">
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
            setting: {
                autoplay: true,
                autoplaySpeed: 2500,
                dots: 'inside',
                trigger: 'click',
                arrow: 'hover'
            },
            node:document.getElementsByClassName('ivu-carousel-dots'),
            index: 1,
            showDrapdown:false,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: "/",
            lantern: "",
            lanternData: "",
            isHome: true,
            bannerIndex: 4,
            isRegister: false,
            navChecked: 0,
            carheight: 533,
            gameIndex: 0,
            carouselData: [
                // {img:"/static/99qp/img/a.jpg"},
                // {img:"/static/99qp/img/d.jpg"},
                // {img:"/static/99qp/img/e.jpg"},
                
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
                    name: "视讯直播",
                    text: "CASINO",
                    link: "/home/live",
                    platform: "live_casino",
                    type:'live'
                },
                {
                    name: "棋牌游戏",
                    text: "CHESS",
                    platform: "KY_CHESS",
                    // link: "/home/qipai?id=10042&name=开元棋牌",
                    link: "/home/chess?navid=9&id=0",
                    gameName: "0",
                    list: [],
                    type:'chess'
                },
                {
                    name: "彩票游戏",
                    text: "LOTTERY",
                    platform: "CT_LOTTERY",
                    type:"lottery",
                    link: "/plays/hall",
                    gameName: "0"
                },
                {
                    name: "捕鱼游戏",
                    text: "FISHING",
                    link: "/home/fish?navid=9&id=0",
                    type:'fish'
                },
                {
                    name: "logo",
                    logoUrl:'/static/99qp/img/logo_4.png',
                    type:"logo",
                },
                {
                    name: "电子游艺",
                    text: "GAME",
                    platform: "AG_GAME",
                    link: "/home/slot?navid=9&id=0",
                    type:'live'
                },
                {
                    name: "体育赛事",
                    text: "SPORTS",
                    platform: "sport",
                    link: "/home/tiyu?id=0",
                    list: []
                },
                {
                    name: "手机APP",
                    text: "PHONE",
                    type:"load"
                },
                {
                    name: "优惠活动",
                    text: "ACTIVETY",
                    link: "/home/youhui"
                },
                {
                    name: "在线客服",
                    text: "SERVICE",
                    link: "service",
                    type:'service'
                }
            ],
            
            flag: 0,
            getnightbool: false,
            
        };
    },
    methods: {
        getList(a){
            if(a.list && a.list.length > 0){
                this.showDrapdown = true;
            }else{
                this.showDrapdown = false;
            }
        },
        // async getGameDatas() {
        //     if(localStorage.slot_game_new) this.getNativeDatas()
        //     else await this.$getAllgame(this.getNativeDatas);
        // },
        // getNativeDatas() {
        //     if (localStorage.chess_game_new) {
        //         this.classifyList[2].list = this.$gameClass("chess");
        //     }
        //     if (localStorage.sport_game_new) {
        //         this.classifyList[7].list = this.$gameClass("sport");
        //     }
        // },
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: "banner",
                clientType: "pc"
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
                 this.downloadAppTarget = res.data[0] && res.data[0].downloadAppTarget;
            }
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
                  console.log("文字走马灯没有数据返回");
                  return false;
              }
          }
          // 参数： type: lantern 走马灯
          // 参数： type: popups 弹窗
          // 参数： type: notice 提示
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
        },
    },
    watch: {
        "$route.path": function (newVal, oldVal) {
            switch (true) {
                case newVal == "/home":
                    this.gameIndex = 0;
                    this.navChecked = 0;
                    localStorage.setItem('navIndex', 0)
                    break;
                case newVal.includes("/home/chess"):
                    this.gameIndex = 2;
                    this.navChecked = 2;
                    localStorage.setItem('navIndex', 2)
                    break;
                case newVal == "/home/live":
                    this.gameIndex = 1;
                    this.navChecked = 1;
                    localStorage.setItem('navIndex', 1)
                    break;
                case newVal.includes("/home/slot"):
                    this.gameIndex = 6;
                    this.navChecked = 6;
                    localStorage.setItem('navIndex', 6)
                    break;
                case newVal == "/home/fish":
                    this.gameIndex = 4;
                    this.navChecked = 4;
                    localStorage.setItem('navIndex', 4)
                    break;
                case newVal == "/home/tiyu":
                    this.gameIndex = 7;
                    this.navChecked = 7;
                    localStorage.setItem('navIndex', 7)
                    break;
                case newVal == "/home/youhui":
                    this.gameIndex = 9;
                    this.navChecked = 9;
                    localStorage.setItem('navIndex', 9)
                    break;
            }
            this.$store.commit("mainState/getRoute", newVal);
        }
    },
    mounted() {
        this.getLanternList();
        this.getLantern();
        this.getnightbool = this.$store.state.mainState.color;
        let routerSrc = this.$store.state.mainState.routeSrc;
        this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
        if (routerSrc === "/home") {
            this.navChecked = 0;
            this.gameIndex = 0;
        }
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
        swiper () {
            return this.$refs.mySwiper.swiper
        }
    },
    created() {
        // this.getGameDatas();
        this.getBanner();
        this.$store.commit("mainState/getRoute", this.$route.path);
    }
};
</script>
<style lang="less">
.ivu-carousel-dots li button{
    opacity: 1!important;
    width: 12px!important;
    height: 12px!important;
    // display: inline-block;
    border-radius: 50%!important;
    background: #fff!important;
    margin: 0 12px!important;
    transition: none!important;
}
.ivu-carousel-dots li.ivu-carousel-active>button{
    width: 12px!important;
    height: 12px!important;
    border-radius: 50%!important;
    background: #007aff!important;
}
.ivu-carousel-dots li:hover >button{
    background: #007aff!important;
}
.ivu-carousel-dots-inside{
    bottom:15px!important;
}
.top_nav {
    position: relative;
    // max-width: 1920px;
    // min-width: 1200px;
    width: 100%;
    margin: 0 auto;
    // background: #eff1f4;
    .swiper-container {
       max-width: 1920px;
       height: 550px;
       margin: 0 auto;
     }
     
     .swiper-button-prev1, .swiper-button-next1 {
       position: absolute;
       top: 45%;
       width: 80px;
       height: 80px;
       z-index: 10;
       cursor: pointer;
       color: #fff;
       background: rgba(0, 0, 0, 0.3);
       border-radius: 50%;
       font-size: 50px;
       line-height: 80px;
       outline: none!important;
     }
     .swiper-button-prev1:hover, .swiper-button-next1:hover{
         background: rgba(0, 0, 0, 0.4);
     }
     .swiper-button-next1 {
       right: 10px;
       left: auto;
     }
     .swiper-button-prev1 {
       left: 10px;
       right: auto;
       
     }
    .nav-content {
        width: 100%;
        background: #fff;
        .nav_box{
            width: 1200px;
            height: 90px;
            margin: 0 auto;
        }
        .logo {
            float: left;
            text-align: center;
            width: 334px;
            height: 30px;
            margin-top: 26px;
        }
        .logoClass{
            width: 305px;
            margin: 0!important;
            line-height: 125px!important;
        }
        .nav-bar {
            float: right;
            height: 90px;
            width: 100%;
            li {
                float: left;
                position: relative;
                height: 90px;
                line-height: 85px;
                margin: 0 16px;
                font-size: 16px;
                color: #54689a;
                list-style: none;
                cursor: pointer;
                transition: all 0.3s;
                &:nth-child(5){
                    margin-right: 11px;
                }
                &:nth-child(7){
                    margin-left: 9px;
                }
                &:first-child{
                    margin-left: 0;
                }
                &.tpT {
                    line-height: 75px;
                }
                a {
                    width: 100%;
                    height: 95%;
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: inherit;
                    position: relative;
                    color: #666666;
                    padding-left: 1px;
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
                        color: #52aaf7;
                    }
                    &:hover .triangle1 {
                        display: block;
                    }
                }
                .navActive {
                    border-bottom: 4px #579ae5 solid;
                    color: #52aaf7;
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
    .newgong {
        height: 40px;
        width: 1200px;
        margin: 0 auto;
        background:#fff;
        // position: absolute;
        // bottom: 0;
        z-index: 9;
        // box-shadow:0px 6px 6px 0px rgba(186,206,235,0.31);
        // border-radius:20px;
        .newgong-content {
            width: 1200px;
            height: 40px;
            margin: 0 auto;
            .notice {
                display: inline-block;
                float: left;
                position: relative;
                top: 5px;
                left: 2px;
                margin-right: 15px;
                i {
                    font-weight: 500;
                    color: #4B9BF1;
                    font-family: 'iconfont' !important;
                    font-size: 16px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                }
            }
            .demolist {
                display: inline-block;
                width: 1090px;
                color: #7C7C7C;
            }
        }
    }
    .carouse {
        text-align: center;
        max-width: 1920px;
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
    .youhuiActive {
        top: 100px !important;
    }
}
.my-bullet{
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 50%;
    background: #fff;
    margin: 0 12px;
  }
  .my-bullet-active{
    background: #579ae5;
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
