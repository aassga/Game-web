<template>
    <div id="header_wrap">
        <div class="header-box">
            <div class="top-header">
                <div class="wrapper">
                    <div id="div-meiDonNow">
                        m808.com
                    </div>
                    <ul class="top-nav">
                        <li>
                            美东时间 :
                            <span>{{time}}</span>
                        </li>
                        <li>
                            <a :class="className2" @click="trustLogin({id:243})">开元棋牌</a>
                        </li>
                        <li @click="$router.push('/home/agent')">
                            <a href="javascript:;">代理加盟</a>
                        </li>
                        <li @click="goDownload">
                            <a href="javascript:;">APP下载</a>
                        </li>
                        <li class="license">
                            <a href="javascript:;"> 牌照展示</a>
                        </li>
                        <li>
                            <a :class="className3">线路检测</a>
                        </li>
                        <li class="lastColor">
                            <a @click="addFavorite('澳门新葡京')">加入收藏</a>
                        </li>
                        <li class="language" select-language>
                            <span ng-repeat="item in language" data-language="zh-CN" title="简体中文" class="ng-scope"></span>
                            <span ng-repeat="item in language" data-language="zh-TW" title="繁体中文" class="ng-scope"></span>
                            <span ng-repeat="item in language" data-language="en-US" title="English" class="ng-scope"></span>
                            <span ng-repeat="item in language" data-language="th" title="ภาษาไทย" class="ng-scope"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="main clear" :class="{'tiyuBg':$route.path=='/home/tiyu' ||$route.path=='/home/qipai'}">
                <div class="main_content">
                    <div class="top_left" @click="goHome">
                        <a class="logo" href="javascript:;"></a>
                    </div>

                    <ul class="nav-bar fl">
                        <li class="tpT" v-for="(item,i) in classifyList" :key="i" :class="{isColor:item.hotShow ==true}"
                            @click.stop="$goPath('one',item)">
                            <img src="/static/cmgm/img/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                            <span class="x-dh-t">{{item.name}}</span>
                            <span class="x-dh-b">{{item.text}}</span>

                            <div class="girl dropdown">
                                <ol v-if="item.list">
                                    <li v-for="(v,i) in item.list" :key="i" @click.stop="goGame(v,item.text)">
                                        <a href="javascript:void(0)">
                                            <img :src="v.icon" width="37" height="21" alt v-if="v.icon">
                                            <span>{{v.name}}</span>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                    <div class="loginbox" v-if="!logoStyle">
                        <div id="account-box" :class="{login:userinfo}">
                            <form v-if="!$store.state.mainState.loginOrout" :class="{newform:code_show==false}">
                                <input id="userName" type="text" placeholder="帐号" v-model="passKey.userName" @change="getCode"
                                    autocomplete="off" value="">
                                <i class="userIcon"></i>

                                <input id="login_password" type="password" placeholder="密码" v-model="passKey.password"
                                   @keyup="clearNull"  v-on:keyup.enter="login" class="password" autocomplete="off">
                                <i class="pwdIcon"></i>

                                <div id="check-code-wrapper" v-if="code_show==true">
                                    <input placeholder="验证码" v-model="passKey.code" autocomplete="off" v-on:keyup.enter="login"
                                        style="border:0;padding:0!important;background:transparent">
                                    <img id="vPic" :src="codeImg" @click="getCode">
                                </div>

                                <div class="newlogin-box login_box" @click="login">登入帐号</div>

                                <div class="register-box" @click="$router.push('/home/register')">免费开户</div>
                                <span class="register-btn" @click="$router.push('/home/agent')">代理教程</span>
                                <span class="forget-btn" @click="$forget()">忘记密码?</span>
                            </form>

                            <div class="login_after" v-if="$store.state.mainState.loginOrout">
                                <div class="ele-accinfo">
                                    <span>帐号：</span>
                                    <strong class="accountUser">{{userinfo.userName}}&nbsp;&nbsp;</strong>
                                </div>
                                <div class="ele-accinfo">
                                    <span>钱包余额：</span>
                                    <strong id="user_money" class="accountUser">{{userinfo&&userinfo.balance}}</strong>
                                    <strong>
                                        <span style=" height:20px; width:20px">
                                            <a href="javascript:void(0)" class="refresh" @click="getBalance" @mouseover='newshowfresh'
                                                @mouseout='showfresh=false' :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                                            </a>
                                        </span>
                                    </strong>
                                </div>

                                <div class="lianjie">
                                    <a href="javascript:void(0);" @click="$goUserCen('personage',0)" title="个人中心">个人中心</a>
                                    <a href="javascript:void(0);" @click="$goUserCen('withdraw',0)" title="线上取款">线上取款</a>
                                    <a href="javascript:void(0);" @click="$goUserCen('recharge',0)" title="线上存款">线上存款</a>

                                </div>

                                <div class="lianjie">
                                    <a href="javascript:void(0);" @click="$goUserCen('personage',2)" title="交易记录">交易记录</a>
                                    <a href="javascript:void(0);" @click="$goUserCen('discounts',0)" title="实时返水">实时返水</a>
                                    <a href="javascript:void(0);" @click="$goUserCen('personage',8)" title="修改密码">修改密码</a>
                                </div>

                                <div class="action-box">
                                    <a class="login-box" @click="logout">登出</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toploginbox" v-if="logoStyle">
                <div class="navloginTop">
                    <form class="formbox" v-if="!$store.state.mainState.loginOrout">
                        <input id="userName" type="text" placeholder="帐号" v-model="passKey.userName" @change="getCode" />
                        <i class="userIcon2"></i>
                        <input id="login_password" type="password" placeholder="密码" v-model="passKey.password"  @keyup="clearNull" v-on:keyup.enter="login"
                            class="password" />
                        <i class="pwdIcon2"></i>

                        <div id="check-code-wrapper" v-if="code_show==true">
                            <input placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login"
                                style="border:0;padding:0!important;background:transparent;width:119px">
                            <img id="vPic" :src="codeImg" @click="getCode">
                        </div>
                        <div class="newlogin-box login_box" @click="login">登入帐号</div>
                        <div class="register-box" @click="$router.push('/home/register')">免费开户</div>
                        <span class="register-btn" @click="$router.push('/home/agent')">代理教程</span>
                    </form>
                    <div class="logafter" v-if="$store.state.mainState.loginOrout" style="height:52px">
                        <div class="ele">
                            <span>帐号：</span>
                            <strong class="accountUser">{{userinfo.userName}}&nbsp;&nbsp;</strong>
                        </div>
                        <div class="ele">
                            <span>钱包余额：</span>
                            <strong id="user_money" class="accountUser">{{userinfo&&userinfo.balance}}</strong>
                            <strong style="position:relative;top:2px;left:0">
                                <span style=" height:20px; width:20px">
                                    <a href="javascript:void(0)" @mouseover='newshowfresh' @mouseout='showfresh=false'
                                        :class="[balanceRefreshing ?'fres':'']"
                                        style="display: inline-block; width: 16px; height: 16px;  background: url('/static/cmgm/img/refresh.png')">
                                    </a>
                                </span>
                            </strong>
                        </div>
                        <div class="lianjiei">
                            <a href="javascript:void(0);" @click="$goUserCen('personage',0)" title="个人中心">个人中心</a>
                            <a href="javascript:void(0);" @click="$goUserCen('withdraw',0)" title="线上取款">线上取款</a>
                            <a href="javascript:void(0);" @click="$goUserCen('recharge',0)" title="线上存款">线上存款</a>

                        </div>
                        <div class="lianjiei">
                            <a href="javascript:void(0);" @click="$goUserCen('personage',2)" title="交易记录">交易记录</a>
                            <a href="javascript:void(0);" @click="$goUserCen('discounts',0)" title="实时返水">实时返水</a>
                            <a href="javascript:void(0);" @click="$goUserCen('personage',8)" title="修改密码">修改密码</a>
                        </div>

                        <div class="action-boxi">
                            <a class="login-box" @click="logout">登出</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="newsContent" v-if="logoStyle">
                <div class="wrapper">
                    <div class="iconText">最新公告：</div>
                    <div class="demolist list">
                        <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                            onmouseover="this.stop()"
                            style="color: white; font-size: 14px; line-height: 34px;overflow: hidden;height: 34px;">
                            <span v-html="lantern"></span>
                        </marquee>
                    </div>
                </div>
            </div>

        </div>
        <div :class="pathName">
            <Carousel autoplay loop style="height:530px;overflow:hidden" v-if="pathName=='home'" class="lunbobox">
                <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                    <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                        <img :src="item.img" alt="" style="height:530px">
                    </a>
                    <img :src="item.img" alt="" v-else style="height:530px">
                </Carousel-item>
            </Carousel>
            <div id="news" popup-page="register home">
                <div class="wrapper" v-if="!logoStyle">
                    <div class="marquee">
                        <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                            onmouseover="this.stop()"
                            style="color: white; font-size: 14px; line-height: 34px;overflow: hidden;height: 34px;">
                            <span v-html="lantern"></span>
                        </marquee>
                    </div>
                </div>
            </div>
        </div>
        <qyLogin :logiinTishi="logiinTishi" ref="qylogin"></qyLogin>
    </div>
</template>
<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import qyLogin from '../../public/home/qy-login.vue';
import { postS, getS } from '@/service/public/service.js';
import freshButton from '../../public/home/freshButton';
import data1 from '../../public/user/login';
import data2 from '../../public/nav/index';


export default {
    mixins: [data1, data2],
    data() {
        return {
            isclick:false,
            balanceRefreshing:false,
            showfresh:false,
            logiinTishi: {
                title: '来自美高梅的消息',
                bgcolor: {
                    background: 'linear-gradient(to right, #824d34, #824d34)'
                }
            },
            logoStyle: false,
            carouselData: [],
            classifyList: [
                {
                    name: '首页',
                    text: 'HOME',
                    link: '/home'
                },
                {
                    name: '体育赛事',
                    text: 'SPORTS',
                    platform: 'sport',
                    link: '/home/tiyu',
                   
                },
                {
                    name: '真人娱乐',
                    text: 'LIVE CASINO',
                    link: '/home/live',
                    platform: 'live_casino',
                    hotShow: true,
                    // list: []
                },
                {
                    name: '棋牌游戏',
                    text: 'CHESS',
                    platform: 'KY_CHESS',
                    hotShow: true,
                    link: '/home/chess?navid=9&id=0',
                    gameName: '0',
                    // list: []
                },
                {
                    name: '电子游艺',
                    text: 'ELECT RONIC',
                    platform: 'MG_GAME',
                    hotShow: true,
                    link: '/home/slot?navid=9&id=0',
                    
                },
                {
                    name: '彩票游戏',
                    text: 'LOTTERY',
                    platform: 'vr_lottery',
                    link: '/plays/hall',
                    type:'lottery'
                },
                {
                    name: '捕鱼达人',
                    text: 'FISH',
                    link: '/home/fish?navid=9&id=0'
                },
                {
                    name: '优惠活动',
                    text: 'PROMOTION',
                    link: '/home/youhui'
                },
                {
                    name: '在线客服',
                    text: 'SERVICE',
                    link: 'service',
                    type: 'service',
                }
            ],
            
            time: '',
            className1: 'orange',
            className2: 'yellow',
            className3: 'white',
            className4: 'white',
            className5: 'red',
            className6: 'white',
            pathName: 'home',
            lantern: ''
        };
    },

    methods: {
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
        },
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
        goDownload() {
            window.open('/static/cmgm/html/download/index.html');
        },
        goGame(a,b){
            if(b == 'LOTTERY'){
            if(localStorage.token){
                this.$store.dispatch('lottery/getStopLotteryCheck',a.lid).then(res=>{
                    if(res&&res.length >0 ){
                        this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: 'warn',
                        type:'closeMaret',
                        });
                    }else{
                    window.open(this.$router.resolve(a.path).href)
                    return false
                    }
                })
            }else{
                this.dNotify("请先登录", 'error')
            }
            }else{
                this.$loginGame(a)
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
                this.logoStyle = false;
            } else if (this.$route.path == '/home/live') {
                this.pathName = 'homeLive';
                this.logoStyle = true;
            } else if (this.$route.path == '/home/games') {
                this.pathName = 'homeGames';
                this.logoStyle = true;
            } else if (this.$route.path == '/home/buyu') {
                this.pathName = 'homeBuyu';
                this.logoStyle = true;
            } else if (this.$route.path == '/home/register') {
                this.pathName = 'homeBuyu';
                this.logoStyle = true;
            } else if (this.$route.path == '/home/youhui') {
                this.pathName = 'homeYouhui';
                this.logoStyle = true;
            } else {
                this.pathName = 'homeHide';
                this.logoStyle = true;
            }
        },
        // 初始化header
        initHeaer() {
            // 进行一系列操作,首先进行深拷贝，不影响元数据
            let oList = this.origiList.slice(0);
        },
        //轮播图
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: "banner",
                clientType: "pc"
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
            }
        },
        //走马灯
        getLantern () {
            let res = JSON.parse(sessionStorage.lanterndata)
            if(res.data.length){
                this.lantern = res.data[0] && res.data[0].description
            }
        },
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        }
    },
    created() {
        this.getBanner();
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
        this.getPath();
        this.getLantern();
    },
    watch: {
        $route() {
            this.getPath();
        }
    },
    mounted() {
        
        if (localStorage.qyLogin) {
            this.$refs.qylogin.qyLogin = true;
        }
        this.getPath();
        let timer = setInterval(this.changeclass, 450);
        let time = setInterval(this.getTimes, 1000);
        
    },
    components: {
        qyLogin,
        freshButton
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
.refresh {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    background: url('/static/cmgm/img/refresh.png');
}
.newfresh {
    background: url('/static/cmgm/img/newrefresh.png');
}
.newsContent {
    color: #ffff98;
    .iconText {
        width: 110px;
        height: 34px;
        font-size: 15px;
        line-height: 34px;
        float: left;
        background: url(/static/public/image/common/news.png) no-repeat;
        background-position: left center;
        padding-left: 30px;
        margin-left: 8px;
    }
    .demolist {
        float: left;
        width: 668px;
    }
}
.logo {
    background-size: contain !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
/deep/ .ivu-carousel-dots {
    position: absolute;
    bottom: 100px;
}
</style>


