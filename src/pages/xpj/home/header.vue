<template>
    <div id="header_wrap">
        <div class="header-box">
            <div class="top-header">
                <div class="wrapper">
                    <div id="div-meiDonNow">
                        美东时间 :
                        <span>{{time}}</span>
                    </div>
                    <ul class="top-nav">
                        <li>
                            <a :class="className2" @click="$router.push('/home/chess?navid=9&id=10042')">开元棋牌</a>
                        </li>
                        <li>
                            <a :class="className3" href="https://x55.app" target="_blank">线路检测</a>
                        </li>
                        <li class="lastColor">
                            <a @click="addFavorite('澳门新葡京')">加入收藏</a>
                        </li>
                        <li class="language" select-language>
                            <span ng-repeat="item in language" data-language="zh-CN" title="简体中文" class="ng-scope"></span>
                            <span ng-repeat="item in language" data-language="zh-TW" title="繁体中文" class="ng-scope"></span>
                            <span ng-repeat="item in language" data-language="en-US" title="English" class="ng-scope"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main clear" :class="{'tiyuBg':$route.path=='/home/tiyu' ||$route.path=='/home/qipai'}">
                <div class="main_content">
                    <div class="top_left">
                        <div class="logo_icon clear animated flipInY">
                            <div class="logo fleft">
                                <iframe src="/static/xpj/img/logo/logo.html" frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="top_center">
                        <div class="domain_name clear">
                            <span class="domain_title"></span>
                            <span class="domain_address"></span>
                        </div>
                        <div class="subtitle"></div>
                    </div>
                    <div id="account-box" :class="{login:userinfo}">
                        <!-- 登录前 -->
                        <form v-if="!$store.state.mainState.loginOrout" :class="{newform:code_show==false}">
                            <input id="userName" type="text" placeholder="帐号" v-model="passKey.userName" @change="getCode" autocomplete="off" tabindex="1">

                            <div id="check-code-wrapper" v-if="code_show==true">
                                <input placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login" tabindex="3">
                                <img id="vPic" :src="codeImg" @click="getCode">
                            </div>
                            <div class="newlogin-box" @click="login" v-if="code_show==false">登入帐号</div>
                            <br>
                            <input id="login_password" type="password" placeholder="密码" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login" class="password" autocomplete="off" tabindex="2">
                            <div class="newlogin-box" @click="$router.push('/home/register')" v-if="code_show==false">免费开户</div>
                            <div class="login-box" @click="login" v-if="code_show==true">登入</div>
                            <span class="forget-btn" @click="$forget()">忘记密码</span>
                            <div class="login-box" @click="$router.push('/home/register')" v-if="code_show==true">注册</div>
                        </form>
                        <!-- 登录后 -->
                        <div class="login_after" v-if="$store.state.mainState.loginOrout">
                            <div class="ele-accinfo">
                                <span>帐号：</span>
                                <strong>{{userinfo.userName}}&nbsp;&nbsp;</strong>
                                <span>钱包余额：</span>
                                <strong id="user_money">{{userinfo&&userinfo.balance}}</strong>
                                <strong style=" margin:-3px 0 10px 5px;">
                                    <span style=" height:20px; width:20px">
                                        <a class="refresh" href="javascript:void(0)" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'
                                            :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                                        </a>
                                    </span>

                                </strong>
                            </div>
                            <a class="login-box" @click="logout">登出</a>
                            <div class="lianjie">
                                <a href="javascript:void(0);" @click="$goUserCen('personage',2)" title="投注记录">投注记录</a>
                                <a href="javascript:void(0);" @click="$goUserCen('withdraw',0)" title="线上取款">线上取款</a>
                                <a href="javascript:void(0);" @click="$goUserCen('recharge',0)" title="线上存款">线上存款</a>
                                <a href="javascript:void(0);" @click="$goUserCen('personage',3)" title="交易记录">交易记录</a>
                                <a href="javascript:void(0);" @click="$goUserCen('discounts',0)" title="实时返水">实时返水</a>
                                <a href="javascript:void(0);" @click="$goUserCen('message',0)">
                                    消息记录
                                    (<font v-if="allUnReadCount !=0" id="user_num" style="color:yellow;">{{allUnReadCount}}</font>)
                                </a>
                            </div>
                        </div>
                    </div>

                    <ul class="nav-bar f1">
                        <li class="tpT" v-for="(item,i) in classifyList" :key="i" :class="{isColor:item.hotShow == true}">
                            <img src="/static/xpj/img/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                            <span class="x-dh-t" @click="$goPath('one',item)">{{item.name}}</span>
                            <div class="girl dropdown">
                                <ol>
                                    <li v-for="(v,i) in item.list" :key="i" @click="$goPath('nav',v)" :class="v.class">
                                        <a href="javascript:void(0)">
                                            <span>{{v.name}}</span>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div :class="pathName">
            <!-- <div id="news" popup-page="register home">
                <div class="wrapper">
                    <div class="marquee">
                        <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                            style="color: white; font-size: 14px; line-height: 34px;overflow: hidden;height: 34px;">
                            <span v-html="lantern"></span>
                        </marquee>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS } from '@/service/public/service.js';
import $ from 'jquery';
import data1 from '../../public/user/login';
import freshButton from '../../public/home/freshButton';

export default {
    mixins: [data1],
    data() {
        return {
            allUnReadCount:10,
            isclick:false,
            codeImg:"/static/xpj/img/new_games/log.png",
            refreshS: false,
            balanceRefreshing: false,
            showfresh: false,
            classifyList: [
                {
                    name: '官网首页',
                    text: 'HOME',
                    platform: 'home',
                    link: '/home',
                    className: 'LS-home'
                },
                {
                    name: '体育赛事',
                    text: 'SPORTS',
                    platform: 'sport',
                    link: '/home/tiyu?id=0',
                    className: 'LS-ball',
                    hotShow: true
                },
                {
                    name: '真人视讯',
                    text: 'CASINO',
                    link: '/home/live',
                    platform: 'live_casino',
                    className: 'LS-live',
                    hotShow: true
                },
                {
                    name: '电子游戏',
                    text: 'GAME',
                    platform: 'AG_GAME',
                    link: '/home/slot?navid=9&id=0',
                    className: 'LS-lines',
                    type: "slot",
                    hotShow: true
                },
                {
                    name: '彩票游戏',
                    text: 'LOTTERY',
                    platform: 'CT_LOTTERY',
                    link: '/plays/hall',
                    gameName: '0',
                    type: "lottery",
                    className: 'LS-lottery'
                },
                {
                    name: '棋牌游戏',
                    text: 'CHESS',
                    platform: 'KY_CHESS',
                    link: '/home/chess?navid=9&id=0',
                    gameName: '0',
                    type: "chess",
                    className: 'LS-chess'
                },
                {
                    name: '捕鱼游戏',
                    text: 'FISHING',
                    link: '/home/fish?navid=9&id=0',
                    type: "fish",
                    className: 'LS-game'
                },
                {
                    name: '优惠活动',
                    text: 'ACTIVETY',
                    link: '/home/youhui',
                    className: 'LS-youhui',
                    hotShow: true
                },
                {
                    name: '在线客服',
                    text: 'SERVICE',
                    link: 'service',
                    type: "service",
                    className: 'LS-kefu'
                }
            ],
            serviceUrl: null,
            time: '',
            interval: null,
            isLogin: false,
            navList: [],
            className1: 'orange',
            className2: 'yellow',
            className3: 'white',
            className4: 'white',
            className5: 'red',
            className6: 'white',
            pathName: 'home',
            lantern: '',
            hasRotate: true
        };
    },

    methods: {
        getBalance() {
            if(this.isclick) return false
            this.isclick=true
            this.balanceRefreshing=true
            this.showfresh=false
            setTimeout(()=>{
                this.balanceRefreshing=false
            },600)
            setTimeout(()=>{
                this.isclick=false
            },1000)
            getS(`member/balance`).then(res => {
                if (res.code === 200) {
                let userinfo = JSON.parse(localStorage.userinfo);
                userinfo.balance = res.data.member;
                userinfo.agent = res.data.agency;
                this.$store.commit("mainState/reloadUserinfo", userinfo);
                }
            });
        },
        async getGameDatas() {
            await this.$gameSortV4();
        },
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
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
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: '抱歉，您所使用的浏览器无法完成此操作。\n加入收藏失败，电脑请使用Ctrl+D进行添加',
                        model: 'warn'
                    });
                }
            }
        },

        ee(num) {
            if (num < 10) {
                num = '0' + num;
            }
            return num;
        },
        we(num) {
            switch (num) {
                case 1:
                    num = '一';
                    break;
                case 2:
                    num = '二';
                    break;
                case 3:
                    num = '三';
                    break;
                case 4:
                    num = '四';
                    break;
                case 5:
                    num = '五';
                    break;
                case 6:
                    num = '六';
                    break;
                case 7:
                    num = '七';
                    break;
            }
            return num;
        },
        getTimes() {
            var that = this;
            let timestam = new Date().getTime();
            let time = timestam - 43200000;
            let dateObj = new Date(time),
                p0 = this.ee,
                Y = dateObj.getFullYear(),
                Mh = dateObj.getMonth() + 1,
                D = p0(dateObj.getDate()),
                X = this.we(dateObj.getDay()),
                H = p0(dateObj.getHours()),
                M = p0(dateObj.getMinutes()),
                S = p0(dateObj.getSeconds());

            if (Mh > 12) {
                Mh = '01';
            } else if (Mh < 10) {
                Mh = '0' + Mh;
            }
            let str = `${Y}/${Mh}/${D}/ (${X}) ${H}:${M}:${S}`;
            this.time = str;
        },
        goHome() {
            this.$router.push('/home');
        },
        reginer() {
            this.$router.push('/home/register/denglu');
        },
        async getlantern() {
            
            let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
                type: 'lantern',
                desc_client_type: 'html'
            });
            if (res && res.code == 200) {
                if (!res.data.data.length) return false;
                this.lantern = res.data.data[0] && res.data.data[0].description;
            }
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        },

        async tryPlay() {
            let res = await this.$http.get('/frontend/test/demo', {
                headers: { Accept: 'application/x.tg.v2+json' },
                params: {}
            });
            if (res && res.code == 200) {
                UserService.setCache(res, 'test');

                this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
                    let platform = res.data.platform;
                    let alias = res.data.alias;
                    let keys = Object.keys(platform);
                    let refund = [];
                    keys.forEach((v, i) => {
                        refund[i] = {};
                        refund[i].title = v;
                        refund[i].list = [];
                        platform[v].forEach((a, j) => {
                            refund[i].list[j] = {};
                            refund[i].list[j].key = Object.keys(a)[0];
                            refund[i].list[j].refund = Object.values(a)[0];
                            refund[i].list[j].name = alias[refund[i].list[j].key];
                        });
                    });
                    localStorage.setItem('refund', JSON.stringify(refund));
                });
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        },
        changeclass() {
            this.className1 == 'orange' ? (this.className1 = 'white') : (this.className1 = 'orange');
            this.className2 == 'yellow' ? (this.className2 = 'red') : (this.className2 = 'yellow');
            this.className3 == 'white' ? (this.className3 = 'yellow') : (this.className3 = 'white');
            this.className4 == 'white' ? (this.className4 = 'cyan') : (this.className4 = 'white');
            this.className5 == 'red' ? (this.className5 = 'white') : (this.className5 = 'red');
            this.className6 == 'white' ? (this.className6 = 'green') : (this.className6 = 'white');
        },
        getPath() {
            if (this.$route.path == '/home') {
                this.pathName = 'home';
            } else if (this.$route.path == '/home/live') {
                this.pathName = 'homeLives';
            } else if (this.$route.path == '/home/slot') {
                this.pathName = 'homeGames_1';
            } else if (this.$route.path == '/home/fish') {
                this.pathName = 'homeBuyus';
            } else if (this.$route.path == '/home/register') {
                this.pathName = 'homeBuyus';
            } else if (this.$route.path == '/home/youhui') {
                this.pathName = 'homeYouhuis';
            }else if(this.$route.path == '/home/tiyu'){
                 this.pathName = 'homeTiyus';
            }else if(this.$route.path == '/home/chess'){
                 this.pathName = 'homeQipais';
            } else {
                this.pathName = 'homeHide';
            }
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
        showMessage(){
            return this.$store.state.mainState.showMessage;
        }
    },
    components: {
        freshButton
    },
    created() {
        this.getGameDatas();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'hidden') {
                if (!localStorage.userinfo) {
                    let timer = setInterval(() => {
                        if (localStorage.userinfo) {
                            clearInterval(timer);
                            window.location.reload();
                        }
                    }, 1000);
                }
            }
        });
    },
    watch: {
        $route: 'getPath',
        refreshS: function(newVal, oldVal) {
            console.log(newVal);
            if (newVal) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '刷新余额成功!',
                    model: 'success',
                    leftspan: true
                });
            }
        },
        'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        }
    },
    mounted() {
        this.getPath();
        let timer = setInterval(this.changeclass, 450);
        let time = setInterval(this.getTimes, 1000);
    },
    beforeDestroy() {},
    destroyed() {},
    store
};
</script>
<style lang="less" scoped>
.fres {
    -webkit-animation: spin 1s linear;
    animation: spin 1s linear;
}
@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}

input::-webkit-input-safebox-button {
    display: none;
}
</style>

