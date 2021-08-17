<template>
    <div class="new-index xpj-home">
        <div class="banner">
            <div class="newgong">
                <div class="newgong-content"  @click="showTextModal()">
                    <div class="demolist list">
                        <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                            style="color: white; font-size: 14px; line-height: 34px;overflow: hidden;height: 34px;">
                            <span v-html="lantern"></span>
                        </marquee>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-container">
            <section id="slot-box" ng-controller="LobbiesCtrl" class="ng-scope">
                <div class="wrapper">
                    <div class="slider-left" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                        <span class="prev"></span>
                        <span class="next"></span>
                        <div class="main-cell">
                            <div class="tempWarp" style="overflow:hidden; position:relative; width:996px">
                                <ul id="game-list">
                                    <li :class="[{'active':gameId===item.id},item.class]" :key="index" v-for="(item,index) in rollList "
                                        @mouseover="changeGame(item.id)">
                                        <div class="game-list-text">
                                            <span>{{item.name}}</span>
                                            <span>{{item.text}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="game-item">
                        <div class="game-content">
                            <ul>
                                <li class="game-item" :key="index" v-for="(item,index) in gameData" @click="$loginGame(item)">
                                    <div class="game-pic">
                                        <img :src="$getStaticUrl() + item.icon" :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt>
                                    </div>
                                    <p>
                                        <span>{{item.name}}</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="winner-box">
                        <span class="title_sort">会员账号</span>
                        <span class="title_name">游戏名称</span>
                        <span class="title_num">中奖金额</span>
                        <div class="winning-box1">
                            <ul class="winning-list" style="padding: 0 6px;">
                                <li class="winning-item" v-for="(item, i) in winningInfo" :key="i" style="width: 100%;padding: 0 5px;display: flex;justify-content: space-between;align-items: center;">
                                    <span class="order" style="display: inline-block;text-align: center;font-size: 14px;width: 30%;color: #999999;padding:0;    background: none;">{{item.name.padEnd(8, '*')}}</span>
                                    <span class="name" style="display: inline-block;text-align: center;font-size: 14px;width: 36%;color: #F46C0C;padding:0;    background: none;">{{item.uname}}</span>
                                    <span class="num" style="display: inline-block;text-align: center;font-size: 14px;width: 34%;color: #F13131;padding:0;    background: none;">{{item.num}}元</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <div id="content">
                <div class="wrapper">
                    <div id="home">
                        <ul id="game-box">
                            <li v-for="(gameItem,gameIndex) in gameList" :key="gameIndex" :class="gameItem.className" @click="$goPath('one',gameItem)"></li>
                        </ul>
                        <ul id="weblink">
                            <li v-for="(webItem,webIndex) in webList" :key="webIndex" :class="webItem.className" @click="$goPath('one',webItem)"></li>
                        </ul>
                    </div>
                </div>
                <vp-Home-Footer />
            </div>
        </div>
        <vp-mc :imgsrc="imgsrc"></vp-mc>
    </div>
</template>

<script>
import store from "@/vuex/store";
import vpHomeFooter from "./footer.vue";
import vpMc from "./mc";
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
export default {
    components: {
        vpHomeFooter,
        vpMc
    },
    data() {
        return {
            showimg: false,
            mobileDow: "ios",
            publicUrl: "http://static.1356111.com/",
            imgsrc: "/static/xpj/img/qpssq.png",
            popups: "",
            gameData: [],
            noticePosition: 0,
            carouselData: [],
            lantern: "",
            serviceUrl: null,
            gameList: [
                { name: "真人娱乐", className: "live", link: "/home/live" },
                { name: "彩票游戏", className: "lottery", link: "/plays/hall", type:'lottery'},
                {
                    name: "电子游艺",
                    className: "slot",
                    link: "/home/slot?navid=9&id=0",
                    type:'slot',
                },
                { name: "体育赛事", className: "sport", link: "/home/tiyu?id=0" }
            ],
            webList: [
                {
                    name: "电子竞技",
                    className: "slot",
                    link: "/home/slot?navid=9&id=0",
                    type:'slot',
                },
                { name: "代理教程", className: "teaching",type:"opne"},
                {
                    name: "线路检测",
                    className: "detection",
                    link: "https://x55.app/",
                    type:"openNew"
                },
                { name: "在线客服", className: "linechat", path: "service",type:"service"}
            ],
            // 轮播设置
            setting: {
                live: {
                    liveVal: 0,
                    autoplaySpeed: 3000,
                    autoplay: true,
                    dots: "none",
                    trigger: "click",
                    arrow: "never"
                }
            },
            // 滚动名单
            scrollDatas: [],
            // 选项选择
            optionList: [
                {
                    name: "AG贵宾厅",
                    index: 0,
                    platform: "live_casino",
                    id: "14",
                    img: "/static/xpj/img/banner_game/zrsx_ag.jpg"
                },
                {
                    name: "BBIN旗舰厅",
                    index: 1,
                    platform: "live_casino",
                    id: "15",
                    img: "/static/xpj/img/banner_game/zrsx_bbin.jpg"
                },
                {
                    name: "BG大遊厅",
                    index: 2,
                    platform: "live_casino",
                    id: "44",
                    img: "/static/xpj/img/banner_game/zrsx_bg.jpg"
                },
                {
                    name: "DG梦幻厅",
                    index: 3,
                    platform: "live_casino",
                    id: "33",
                    img: "/static/xpj/img/banner_game/zrsx_dg.jpg"
                },
                {
                    name: "DS视讯厅",
                    index: 4,
                    platform: "live_casino",
                    id: "16",
                    img: "/static/xpj/img/banner_game/zrsx_ds.jpg"
                }
            ],
            otherGame: [
                {
                    name: "彩票游戏",
                    img: "/static/xpj/img/home/live/gpi_cp.jpg",
                    btnName: "进入游戏",
                    router: "/plays/hall"
                },
                {
                    name: "电子游艺",
                    img: "/static/xpj/img/home/live/gpi_dzyy.jpg",
                    btnName: "进入游戏",
                    router: "/home/games?id=10022&name=MG老虎机"
                },
                {
                    name: "体育投注",
                    img: "/static/xpj/img/home/live/gpi_tytz.jpg",
                    btnName: "进入游戏",
                    router: "/sport"
                },
                {
                    name: "捕鱼达人",
                    img: "/static/xpj/img/home/live/gpi_bydr.jpg",
                    btnName: "进入游戏",
                    router: "/home/buyu"
                }
            ],
            carouselData: [],
            jackpotNum: 30631803863,
            setInter: null,
            idlist: [],
            rollList: [],
            pageDatas: {
                page: 1
            },
            currenttype: "",
            iptVal: "",
            currentline: "",
            currentTag: "",
            winningInfo: [],
            gameId: 26,
            allGameData: [],
            lanternData: "",
        };
    },
    methods: {
        // 点击导航栏
        async changeGame(id) {
            let aa = this.$getGameV4('slot',id).slice(0, 8)
            this.gameData = aa;
        },
        
        async clear() {
            this.iptVal = "";
            this.currenttype = "";
            this.currentline = "";
            this.currentTag = "";
            this.pageDatas.page = 1;
        },
        initWinningInfo() {
            let length = 50;
            let arr = ['幸运飞艇','快乐赛车','北京赛车','快速时时彩','三分时时彩','欢乐生肖','快速六合彩','香港六合彩','江苏快3','幸运赛车','五分快3','炸金花','通比牛牛']
            let data = [];
            for (let i = 0; i < length; i++) {
                let num = parseInt(
                    Math.random() * (Math.random() * (Math.random() * 360000))
                );
                num = num < 10 ? num * 1234 : num;
                num = num < 100 ? num * 123 : num;
                num = num < 1000 ? num * 12 : num;
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                name = name.substr(0, 3);
                let k = Math.floor(Math.random() * 12)
                data[i] = {name, 'uname':arr[k], num}
            }
            data.sort((a, b) => {
                return -(a.num - b.num)
            })
            this.winningInfo = data;
        },
        close() {
            this.showimg = false;
        },
        liveEnter(item) {
            this.setting.live.autoplay = false;
            this.setting.live.liveVal = item.index;
        },
        liveLeave() {
            this.setting.live.autoplay = true;
        },

        jackpotFc() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                this.jackpotNum = this.jackpotNum + 8.56;
            }, 20);
        },
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
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        },
        // 导航动画
        async slider() {
            let ul = document.getElementById("game-list");
            let prev = document.getElementsByClassName("prev")[0];
            let next = document.getElementsByClassName("next")[0];
            let main = document.getElementsByClassName("slider-left")[0];
            let n = -166;

            function left() {
                let oLi = ul.children[0];
                ul.className = "move";
                setTimeout(function () {
                    ul.removeChild(oLi);
                    ul.appendChild(oLi);
                    ul.className = "";
                }, 500);
            }

            function right() {
                let last = ul.lastElementChild;
                ul.removeChild(last);
                ul.insertBefore(last, ul.childNodes[0]);
                ul.style.left = n + "px";
                ul.className = "back";
                setTimeout(function () {
                    ul.className = "";
                    ul.style.left = "";
                }, 500);
            }
            prev.onclick = right;
            next.onclick = left;
            let timer = null;
            timer = setInterval(left, 4000);
            main.onmouseover = function () {
                clearInterval(timer);
            };
            main.onmouseout = function () {
                timer = setInterval(left, 4000);
            };
        },
        // 进入游戏
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
        // 获取电子游戏的数据
        async getid() {
            let arr = []
            this.$getObjByLocalStorage("gameSortV4_slot").forEach((gamelist)=>{
                if(gamelist.name=='电子游艺平台') {
                    gamelist.list.forEach((v) => {
                        if (v.id != 74) {
                            this.idlist.push(v.id)
                        }
                        
                    })
                }
            })
            this.idlist.forEach((item) => {
                switch (item) {
                    case 81:
                        this.gameItem = {
                            id: '10022',
                            name: 'MG老虎机',
                            text: 'MG CASINO',
                            src: '/static/public/image/youyi/mg2.png',
                            class: 'mg',
                            newclass: 'mg_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 75:
                        this.gameItem = {
                            id: '10015',
                            name: 'AG电子',
                            text: 'AG CASINO',
                            src: '/static/public/image/youyi/ag.png',
                            class: 'ag',
                            newclass: 'ag_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 83:
                        this.gameItem = {
                            id: '10024',
                            name: 'PT老虎机',
                            text: 'PT CASINO',
                            src: '/static/public/image/youyi/pt.png',
                            class: 'pt',
                            newclass: 'pt_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 77:
                        this.gameItem = {
                            id: '10018',
                            name: 'CQ9电子',
                            text: 'CQ9 CASINO',
                            src: '/static/public/image/youyi/cq9.png',
                            class: 'cq9',
                            newclass: 'cq9_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 79:
                        this.gameItem = {
                            id: '10020',
                            name: 'FG老虎机',
                            text: 'FG CASINO',
                            src: '/static/public/image/youyi/fg.png',
                            class: 'fg',
                            newclass: 'fg_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 80:
                        this.gameItem = {
                            id: '10021',
                            name: 'JDB电子',
                            text: 'JDB GAMING',
                            src: '/static/public/image/youyi/jbd.png',
                            class: 'jdb',
                            newclass: 'jdb_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 76:
                        this.gameItem = {
                            id: '10016',
                            name: 'BBIN老虎机',
                            text: 'BBIN CASINO',
                            src: '/static/public/image/youyi/bbin.png',
                            class: 'bbin',
                            newclass: 'bbin_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10014:
                        this.gameItem = {
                            id: '10014',
                            name: 'AE电子',
                            text: 'AE GAMING',
                            src: '/static/public/image/youyi/ae.png',
                            class: 'ae',
                            newclass: 'ae_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 78:
                        this.gameItem = {
                            id: '10019',
                            name: 'DT老虎机',
                            text: 'DT GAMING',
                            src: '/static/public/image/youyi/dt.png',
                            class: 'dt',
                            newclass: 'dt_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 82:
                        this.gameItem = {
                            id: '10023',
                            name: 'MW电子',
                            text: 'MW GAMING',
                            src: '/static/public/image/youyi/mw.png',
                            class: 'mw',
                            newclass: 'mw_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 84:
                        this.gameItem = {
                            id: '11320',
                            name: 'PG电子',
                            text: 'PG GAMING',
                            src: '/static/public/image/youyi/pg.png',
                            class: 'pg',
                            newclass: 'pg_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 11906:
                        this.gameItem = {
                            id: '11906',
                            name: 'PP电子',
                            text: 'PP GAMING',
                            src: '/static/public/image/youyi/pp.png',
                            class: 'pp',
                            newclass: 'pp_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10025:
                        this.gameItem = {
                            id: '10025',
                            name: 'TTG老虎机',
                            text: 'TTG GAMING',
                            src: '/static/public/image/youyi/ttg.png',
                            class: 'ttg',
                            newclass: 'ttg_game',
                        };
                        this.rollList.push(this.gameItem);
                        break;
                }
            });
            localStorage.setItem('rollList', JSON.stringify(this.rollList))
        }
    },
    created() {
        if(this.$getObjByLocalStorage(`gameSortV4_slot`)){
             this.getid();
             this.changeGame('10022')
        }else{
            setTimeout(()=>{
              this.getid();
              this.changeGame('10022')
            },1000)
        }
        this.getLanternList();
        // this.getGameData();
        setTimeout(() => {
            this.showimg = false;
        }, 7000);
        this.$nextTick(() => {
            this.slider();
        });
        if(localStorage.register){
            this.$router.push('/home/register');
            localStorage.removeItem('register')
        }
    },
    mounted() {
        this.initWinningInfo();
        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
        clearInterval(this.setInter);
        this.jackpotFc();
        this.getLantern();
        setTimeout(() => {
            this.serviceUrl =
                this.$root.config.service[0] && this.$root.config.service[0].url;
        }, 200);
        console.log("——————————————————",this.$getStaticUrl());
    },
    beforeDestroy() {
        clearInterval(this.setInter);
    },
    watch: {
        $route() { }
    },
    store
};
</script>

<style lang="less">
.alert-img {
    /deep/ .ivu-modal-content {
        background-color: transparent;
    }
}
@keyframes animate {
    0% {
        bottom: 0;
    }
    2% {
        bottom: -50px;
    }
    50% {
        bottom: -50px;
    }
    52% {
        bottom: 0px;
    }
    100% {
        bottom: 0;
    }
}

@-webkit-keyframes animate {
    0% {
        bottom: 0;
    }
    2% {
        bottom: -50px;
    }
    50% {
        bottom: -50px;
    }
    52% {
        bottom: 0px;
    }
    100% {
        bottom: 0;
    }
}

@-moz-keyframes animate {
    0% {
        bottom: 0;
    }
    2% {
        bottom: -50px;
    }
    50% {
        bottom: -50px;
    }
    52% {
        bottom: 0px;
    }
    100% {
        bottom: 0;
    }
}

@-o-keyframes animate {
    0% {
        bottom: 0;
    }
    2% {
        bottom: -50px;
    }
    50% {
        bottom: -50px;
    }
    52% {
        bottom: 0px;
    }
    100% {
        bottom: 0;
    }
}

@-ms-keyframes animate {
    0% {
        bottom: 0;
    }
    2% {
        bottom: -50px;
    }
    50% {
        bottom: -50px;
    }
    52% {
        bottom: 0px;
    }
    100% {
        bottom: 0;
    }
}

@keyframes animate2 {
    0% {
        top: 0;
    }
    1% {
        top: -25px;
    }
    5% {
        top: -25px;
    }
    6% {
        top: -50px;
    }
    10% {
        top: -50px;
    }
    11% {
        top: -75px;
    }
    15% {
        top: -75px;
    }
    16% {
        top: -100px;
    }
    20% {
        top: -100px;
    }
    21% {
        top: -125px;
    }
    25% {
        top: -125px;
    }
    26% {
        top: -150px;
    }
    30% {
        top: -150px;
    }
    31% {
        top: -175px;
    }
    35% {
        top: -175px;
    }
    36% {
        top: -200px;
    }
    40% {
        top: -200px;
    }

    41% {
        top: -225px;
    }
    45% {
        top: -225px;
    }
    46% {
        top: -250px;
    }
    50% {
        top: -250px;
    }
    51% {
        top: -275px;
    }
    55% {
        top: -275px;
    }
    56% {
        top: -300px;
    }
    60% {
        top: -300px;
    }
    61% {
        top: -325px;
    }
    65% {
        top: -325px;
    }
    66% {
        top: -350px;
    }
    70% {
        top: -350px;
    }

    71% {
        top: -375px;
    }
    75% {
        top: -375px;
    }
    76% {
        top: -400px;
    }
    80% {
        top: -400px;
    }
    81% {
        top: -425px;
    }
    85% {
        top: -425px;
    }
    86% {
        top: -450px;
    }
    90% {
        top: -450px;
    }
    91% {
        top: -475px;
    }
    95% {
        top: -475px;
    }
    96% {
        top: -500px;
    }
    100% {
        top: -500px;
    }
}

.new-index {
    position: relative;
    background: #f1f1f1;

    .banner {
        position: relative;
        background-color: #10151b;

        .newgong {
            position: absolute;
            z-index: 99;
            height: 34px;
            width: 100%;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            border-bottom: 1px solid #263c78;
            background: url(/static/xpj/img/home/newbg.png);

            .newgong-content {
                padding: 0 0 0 95px;
                overflow: hidden;
                width: 1004px;
                height: 34px;
                margin: 0 auto;
                background: url(/static/xpj/img/home/news.png) no-repeat left center;
                .demolist {
                    display: inline-block;
                    width: 950px;
                    position: relative;
                    height: 34px;
                }
            }
        }
    }
}

.guanbi img {
    position: relative;
}
.guanbi .ivu-modal-footer {
    display: none;
}
.guanbi .ivu-modal-body {
    padding: 0 !important;
    height: 425px;
}
.guanbi .ivu-modal-close {
    display: none;
}
.guanbi .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -453px;
    margin-top: -212px;
}
.guanbi .close {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    right: 100px;
    top: 80px;
    cursor: pointer;
}
</style>
