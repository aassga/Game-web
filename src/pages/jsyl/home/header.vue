<template>
    <div class="indexHeader">
        <!-- 侧边栏 -->
        <div class="left_nav">

        </div>
        <div class="right_nav">
            
        </div>
        <!-- 头部导航 -->
        <div class="headerNav">
            <div class="navWrapper ">
                
                <div class="container">
                    <a href="javascript:void(0)" @click="goView('/home')" class="logo"></a>
                    <div class="w1000">
                        <div class="w1000_1">
                                <div class="toplink">
                                    <div class="lisence">
                                        <img src="/static/jsyl/img/others/lisence.png">
                                    </div>
                                    <a class="time">
                                        美东时间：
                                        <span id="mdtime" data-nowtime="2019/03/29 02:34:04">{{time}}</span>
                                    </a>

                                    <div class="commonFunc">
                                        <a href="javascript:;" class="change1 detection" @click="goHeader(0)">线路检测</a>|
                                        <a href="javascript:;" class="change2 jiebei" @click="goHeader(1)">免息借呗</a>|
                                        <a href="javascript:;" class="change3 guanjia" @click="goHeader(2)">金管家</a>|
                                        <a href="javascript:;" class="change4 download" @click="goHeader(4)">下载APP</a>|
                                        <a href="javascript:;" class="suggestion" @click="advice">投诉建议</a>
                                    </div>
                                </div>
                            </div>
                        <div class="infoList" v-if="$store.state.mainState.loginOrout">
                            <div class="left">
                                <span class="account">
                                    帐号 ：<font color="yellow">{{userinfo.userName}}</font>
                                </span>
                                <span class="user_money">
                                    余额 ：<font color="yellow">{{userinfo ? userinfo.balance : ''}}</font>
                                </span>
                                <span class="refresh_balance">
                                    <a class="refresh" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'
                                        :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                                        <!-- <freshButton v-show="showfresh" :newrefreh="newrefreh" :frehclick="frehclick" :trangle="trangle" :freh="freh"></freshButton> -->
                                    </a>
                                </span>
                            </div>
                            <div class="right">
                                <span>
                                    <a href="javascript:void(0)" @click="$goUserCen('recharge',0)">充值大厅</a>&nbsp; | &nbsp;
                                    <a href="javascript:void(0)" @click="$goUserCen('withdraw',0)">提现大厅</a>&nbsp; | &nbsp;
                                    <a href="javascript:void(0)" @click="$goUserCen('personage',2)">下注记录</a>&nbsp; | &nbsp;
                                    <a href="javascript:void(0)" @click="$goUserCen('discounts',0)">时时返水</a>&nbsp; | &nbsp;
                                    <!-- <a href="javascript:void(0)" @click="goUserCen('personage',0)" v-if="is_agent==0">会员中心</a> -->
                                    <a href="javascript:void(0)" @click="$goUserCen('message',0)" style="margin-right:10px" class="unread_msg">
                                        站内信
                                        <font v-if="allUnReadCount !=0" id="user_num">{{allUnReadCount}}</font>
                                    </a>
                                    <a class="logOut" href="javascript:void(0)" @click="logout">登出</a>
                                </span>
                            </div>
                        </div>
                        <div class="headerLogincon" v-if="!$store.state.mainState.loginOrout">
                            <input type="text" class="user" id="userName" name="username" tabindex="0" v-model="passKey.userName" placeholder="帐号"
                               @change="getCode">
                            <input type="password" class="pass" id="passwd" name="password" tabindex="0" v-model="passKey.password"
                              placeholder="密码">
                            <!-- 验证码 -->
                            <div class="verify_code_box" v-if="code_show">
                                <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="0" maxlength="4"
                                    title="(点选此处产生新验证码)" v-model="passKey.code">

                                <img class="codeimg" id="vPic" :src="codeImg" width="42" height="20" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                                    @click="getCode">
                            </div>

                            <a href="javascript:void(0)" @click="$forget()" class="forgetPwd">忘记密码</a>

                            <a href="javascript:void(0)" class="logBut subbtn1" @click="login">立即登录</a>

                            <a href="javascript:void(0)" class="logBut regbtn1" @click="goKaihu">立即注册</a>     
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 导航栏登录框 登录后 -->
        <div class="header-login">
            
            <ul id="headContainer">
                <li class="erji" v-for="(item,i) in classListData" :key="i" :class="item.text" @click="$goPath('one',item)">
                    <a href="javascript:void(0)" @click="$goPath('one',item)">
                        <span class="ch" :class="item.text == 'ACTIVETY' ? 'change5' : ''">
                            {{item.name}}
                            <img v-if="item.hot == true" src="/static/jsyl/img/home/hot.gif" alt="hot">
                        </span>
                        <span class="en" :class="item.text == 'ACTIVETY' ? 'change5' : ''">{{item.text}}</span>
                    </a> 
                    <div class="subnav">
                        <span class="jt"></span>
                        <div class="con">
                            <a href="javascript:void(0)" style="position:relative;" v-for="(v,i) in item.list" :key="i"
                                @click.stop="$goPath ('nav',v)">
                                {{v.name}}
                                <img v-if="v.id == '243' || v.id == '10613' || v.id == '10695' || v.id == '11368' || v.id == '38'" src="/static/jsyl/img/home/hot.gif" style=" position: absolute; z-index: 99; right: 5px; ">
                            </a>
                                
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 导航栏登录框 登录前-->
        <!-- <div class="header-login" id="xheader-login" style="display:block" v-if="!isShow && !$store.state.mainState.loginOrout">
            <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
                <div class="header-logincon">
                    <input type="text" class="user" id="userName" name="username" tabindex="1" v-model="passKey.userName" placeholder="帐号"
                        @change="getCode">

                    <input type="password" class="pass" id="passwd" name="password" tabindex="2" v-model="passKey.password" @keyup="clearNull"
                        placeholder="密码">

                    <a href="javascript:void(0)" @click="$forget()" class="forget"></a>

                  
                    <div class="verify_code_box">
                        <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="3" maxlength="4"
                            title="(点选此处产生新验证码)" v-model="passKey.code">

                        <img class="codeimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                    </div>

                    <input type="submit" value class="subbtn" @click="login">

                    <a href="javascript:void(0)" class="regbtn" @click="goKaihu()"></a>
                </div>
            </form>
        </div> -->

        <!-- 首页登录框 -->
        <!-- <div class="loginBox" :style="{height: carheight +'px'}" v-if="loggedIn">
            <div class="indexBannercon" v-if=" isShow && !$store.state.mainState.loginOrout">
                <div name="LoginForm" id="loginForms">
                    <div class="indexLogin" :class="[code_show ? 'withCode':'noCode']">
                        <div class="title"></div>
                        <p class="username_box">
                            <input type="text" class="user" id="userName" name="username" value="帐号" tabindex="1" placeholder="帐号"
                                @change="getCode" autocomplete="off" v-model="passKey.userName">
                        </p>
                        <p class="pwd_box">
                            <input type="password" id="passwd" name="password" v-model="passKey.password" tabindex="2" placeholder="密码"
                                autocomplete="off" v-on:keyup.enter="login" @keyup="clearNull">
                        </p>
                        <p class="code_box0" v-if="code_show">
                            <input type="text" class="yzm code_box" id="rmNum" name="rmNums" placeholder="验证码" size="4" tabindex="3"
                                maxlength="4" title="( 点选此处产生新验证码)" v-model="passKey.code" v-on:keyup.enter="login">
                            <img class="yzmimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle"
                                alt="( 点选此处产生新验证码 )" @click="getCode">
                        </p>
                        <div class="button">
                            <a class="login_btn" href="javascript:void(0)" @click="login"></a>
                            <a class="forget" href="javascript:void(0)" @click="$forget()"></a>
                        </div>

                        <a class="register_btn" :class="[code_show ? 'show_code' : 'no_code']" href="javascript:void(0)"
                            @click="goKaihu"></a>
                    </div>
                </div>
            </div>
        </div> -->
        
        
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
import $ from 'jquery';
import freshButton from '../../public/home/freshButton';
import data1 from '../../public/user/login';
export default {
    mixins: [data1],
    data() {
        return {
            showLog:false,
            allUnReadCount:10,
            codeImg:"/static/jsyl/img/new_games/lo.png",
            freh: {
                borderBottom: '7px solid #696969'
            },
            loggedIn: false,
            isclick:false,
            balanceRefreshing: false,
            showfresh: false,
            carheight: 442,
            logShow: true,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            time: '',
            lantern: '',
            isShow: true,
            showLittlePic: true,
            headBg: '',
            refreshS: false,
            classListData: [
                {
                    name: "首页",
                    text: "HOME",
                    platform: "home",
                    link: "/home",
                    hot:false,
                },
                {
                    name: "棋牌游戏",
                    text: "CHESS",
                    link: "/home/chess?navid=9&id=0",
                    platform: "KY_CHESS",
                    gameName: "0",
                    list: [],
                    type: "chess",
                    hot:true,
                },
                {
                    name: "捕鱼游戏",
                    text: "FISHING",
                    link: "/home/fish?navid=9&id=0",
                    type: "fish",
                    hot:true,
                },
                {
                    name: "真人视讯",
                    text: "CASINO",
                    link: "/home/live",
                    platform: "live_casino",
                    hot:false,
                },
                {
                    name: "电子游艺",
                    text: "GAME",
                    platform: "AG_GAME",
                    link: "/home/slot?navid=9&id=0",
                    type: "slot",
                    hot:true,
                },
                {
                    name: "彩票游戏",
                    text: "LOTTERY",
                    platform: "CT_LOTTERY",
                    link: "/plays/hall",
                    gameName: "0",
                    type: "lottery",
                    hot:false,
                },
                {
                    name: "体育赛事",
                    text: "SPORTS",
                    platform: "sport",
                    link: "/home/tiyu?id=0",
                    list: [],
                    hot:false,
                },
                {
                    name: "优惠活动",
                    text: "ACTIVETY",
                    link: "/home/youhui",
                    hot:false,
                },
                {
                    name: "在线客服",
                    text: "SERVICE",
                    link: "service",
                    type: "service",
                    hot:false,
                }
            ],
            sportsArr:[],
            passKey: {
                userName: '',
                password: '',
                code: ''
            }
        };
    },
    methods: {
        //是否已登录
        isLogged() {
            if (!localStorage.token || !localStorage.userinfo) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        },
        advice(){
            if (!localStorage.token) {
                this.errorAlert("请先登录", "warn");
            }else{
                this.$store.state.home.advice = true;
            }
            
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
        async getGameDatas() {
            await this.$gameSortV4(this.getNativeDatas);
        },
        getNativeDatas() {
            if (localStorage.gameSortV4_chess){
                this.classListData[1].list = this.$gameClassV4("chess");
            }
            if (localStorage.gameSortV4_sport){
                this.classListData[6].list = this.$gameClassV4("sport");
            }
        },
        
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
        },
        
        goKaihu() {
            // this.$router.push('/home/register/register-content');

            this.$store.commit('hsyl/showRegister', true);
        },
        loginEnter(keyNumber) {
            if (keyNumber == 13) {
                login();
            }
        },
        async getQiPai() {
            let id = '10004';
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                id,
                device: 'pc'
            });
            if (res && res.code == 200) {
                res.data[10004].forEach((item, index) => {
                    const qipai = {
                        name: item.name == '开元棋牌游戏' ? '开元棋牌' : item.name,
                        platform: item.code,
                        link: '/home/qipai?navid=9&id=' + item.id,
                        id: item.id
                    };
                    this.classListData[0].list.push(qipai);
                });
                this.classListData[0].link = this.classListData[0].list[0].link;
            }
        },
        goQipaiGame(v) {
            this.$router.push(v);
        },
        goHeader(typeNum) {
            if (typeNum == 0) {
                // 线路检测
                window.open('http://js77888.com', '_blank');
            } else if (typeNum == 1) {
               if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                   }
                  }else{
                  this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                });
                 }
                // 借呗
            } else if (typeNum == 2) {
                // 金管家
                window.open('/static/public/active/jgj/index.html');
            } else if (typeNum == 3) {
                //常见问题
                this.$router.push('/home/issue');
            } else if (typeNum == 4) {
                window.open('/static/jsyl/html/download/index.html');
            }
        },

        logout() {
            UserService.logout.call(this);
        },
        goView(link) {
            if (link) {
                if (link == 'kefu') {
                    let service = JSON.parse(localStorage.config).service;
                    if (service) {
                        let ser = service.find(item => item.status === 'on');
                        if (ser) {
                            window.open(ser.url);
                        }
                    }
                } else {
                    if (link.includes('plays/hall')) {
                        var i = window.location.href.indexOf('#');
                        var href = window.location.href.slice(0, i + 1);
                        window.open(href + link);
                    } else {
                        this.$router.push(link);
                    }
                }
            } else {
                return false;
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
            // let str = `${Y}/${Mh}/${D}/ ${H}:${M}:${S}`;
            this.time = str;
        },
        shake(element, className, times) {
            var i = 0,
                t = false,
                o = element.attr('class'),
                c = '',
                times = times || 2;
            if (t) return;
            t = setInterval(function() {
                i++;
                c = i % 2 ? o + ' ' + className : o;
                element.attr('class', c);

                if (i == 2 * times) {
                    clearInterval(t);
                    element.removeClass(className);
                }
            }, 800);
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
        is_agent() {
            return JSON.parse(localStorage.userinfo).is_agency;
        },
        showMessage(){
            return this.$store.state.mainState.showMessage;
        }
    },
    mounted() {
        this.isLogged();
        let time = setInterval(this.getTimes, 1000);
        this.shake($('.change1'), 'blues', -1);
        this.shake($('.change2'), 'yell', -1);
        this.shake($('.change3'), 'resd', -1);
        this.shake($('.change4'), 'gree', -1);
        this.shake($('.change5'), 'resd', -1);

        if (this.$route.path == '/home') {
            this.isShow = true;
            this.showLittlePic = false;
            this.logShow = true;
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
            this.isShow = false;
            this.logShow = false;
            if (
                this.$route.path == '/about-page' ||
                this.$route.path == '/register-content' ||
                this.$route.path == '/agent' ||
                this.$route.path == '/relation' ||
                this.$route.path == '/save-help' ||
                this.$route.path == '/pull-help'
            ) {
                this.showLittlePic = false;
            } else {
                this.showLittlePic = true;
            }
        }
    },
    created() {
        this.is_code_show();
        // this.getQiPai();
        this.getGameDatas();
        if (this.clientwidth > 1920) {
            this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
        }
    },

    watch: {
        isLogged() {
            this.isLogged();
        },
        'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        },
        $route() {
            if (this.$route.path == '/home') {
                this.isShow = true;
                this.showLittlePic = false;
                this.logShow = true;
                this.loggedIn = true;
            } else {
                this.isShow = false;
                this.logShow = false;
                this.loggedIn = false;
                if (
                    this.$route.path == '/about-page' ||
                    this.$route.path == '/register-content' ||
                    this.$route.path == '/agent' ||
                    this.$route.path == '/relation' ||
                    this.$route.path == '/save-help' ||
                    this.$route.path == '/pull-help'
                ) {
                    this.showLittlePic = false;
                } else {
                    this.showLittlePic = true;
                }
            }
            let bg = '/static/jsyl/img';
            switch (this.$route.path) {
                case '/home/live':
                    this.headBg = bg + '/live/women.jpg';
                    break;
                case '/home/games':
                    this.headBg = bg + '/dianzi/elecGame.jpg';
                    break;
                case '/home/qipai':
                    this.headBg = bg + '/chess/chess_bg.jpg';
                    break;
                case '/home/buyu':
                    this.headBg = bg + '/buyu/fish.jpg';
                    break;
                case '/home/youhui':
                    this.headBg = bg + '/youhui/money.jpg';
                    break;
                case '/home/agent':
                    this.headBg = bg + '/banner/about-banner.jpg';
                    break;
                default:
                    this.headBg = bg + '/banner/about-banner.jpg';
            }
        },
        refreshS: function(newVal, oldVal) {
            if (newVal) {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '刷新余额成功!',
                    model: 'success',
                    leftspan: true
                });
            }
        }
    },
    components: {
        freshButton
    },
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
* {
    margin: 0;
    padding: 0;
}

.clear {
    clear: both;
}
a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
}
body {
    font-size: 12px;
    font-family: '微软雅黑';
    background: #2c2b2b;
    padding-top: 199px;
}
.index {
    padding-top: 144px;
}
.resd {
    color: #ff0000 !important;
}
.yell {
    color: #ffff00 !important;
}
.gree {
    color: #00ff00 !important;
}
.blues {
    color: #154cff !important;
}
.loginBox {
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, 20%);
    width: 1200px;
    margin: 0 auto;
    z-index: 3;

    .indexBannercon {
        position: relative;
        width: 100%;
        height: 442px;
        margin: 0 auto;
        z-index: 20;
        overflow: hidden;

        #loginForms {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            z-index: 20;

            .indexLogin {
                width: 280px;
                height: 360px;
                overflow: hidden;
                position: relative;
                padding-top: 28px;
                &.withCode {
                    background: url(/static/jsyl/img/login/with_code.png) no-repeat;
                    .subbtn {
                        bottom: 10px;
                    }
                }
                &.noCode {
                    background: url(/static/jsyl/img/login/no_code.png) no-repeat;
                    .subbtn {
                        bottom: 64px;
                    }
                }

                .title {
                    width: 100%;
                    height: 24px;
                    margin-bottom: 12px;
                    background: url(/static/jsyl/img/login/title.png) center center no-repeat;
                    background-size: contain;
                }
                p {
                    width: 82%;
                    height: 42px;
                    line-height: 42px;
                    margin: 0 auto;
                    border: 1px solid #212121;
                    &:hover {
                        border: 1px solid #d9b575;
                    }
                    &.username_box {
                        margin-bottom: 10px;
                        background: url(/static/jsyl/img/login/user_input.png) no-repeat center center;
                    }
                    &.pwd_box {
                        background: url(/static/jsyl/img/login/pwd_input.png) no-repeat center center;
                    }
                    &.code_box0 {
                        height: 48px;
                        line-height: 48px;
                        padding-top: 4px;
                        width: 83%;
                        margin: 12px auto;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .yzm {
                            width: 52%;
                            height: 40px;
                            line-height: 40px;
                            background: transparent;
                            border: none;
                            color: #fff !important;
                            font-size: 15px;
                            outline: 0;
                            margin: 0;
                            padding-left: 13px;
                            border: 1px solid #626262;

                            &::-webkit-input-placeholder {
                                color: #fff;
                            }
                            &::-moz-placeholder {
                                color: #fff;
                                opacity: 1;
                            }
                            &::-moz-placeholder {
                                color: #fff;
                                opacity: 1;
                            }
                        }
                        .yzm:hover {
                            border: 1px solid #d9b575 !important;
                        }

                        .yzmimg {
                            width: 44%;
                            height: 40px;
                            margin-top: 0;
                        }
                    }

                    input {
                        width: 85%;
                        height: 40px;
                        line-height: 40px;
                        background: transparent;
                        border: none;
                        color: #fff !important;
                        font-size: 15px;
                        display: block;
                        outline: 0;
                        margin: 0 34px;
                        padding-right: 10px;
                        caret-color: #fff;

                        &::-webkit-input-placeholder {
                            color: #fff;
                        }
                        &::-moz-placeholder {
                            color: #fff;
                            opacity: 1;
                        }
                        &::-moz-placeholder {
                            color: #fff;
                            opacity: 1;
                        }
                        &:-webkit-autofill {
                            -webkit-text-fill-color: #fff !important;
                            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                            background-color: transparent !important;
                            background-image: none !important;
                            transition: background-color 50000s ease-in-out 0s !important;
                        }
                    }
                }
                .code_box0 {
                    border: 0 !important;
                }

                .code_box {
                    height: 48px;
                    line-height: 48px;
                    padding-top: 4px;
                    width: 83%;
                    margin: 12px auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .yzm {
                        width: 52%;
                        height: 40px;
                        line-height: 40px;
                        background: transparent;
                        border: none;
                        color: #fff !important;
                        font-size: 15px;
                        outline: 0;
                        margin: 0;
                        padding-left: 13px;
                        border: 1px solid #212121;

                        &::-webkit-input-placeholder {
                            color: #fff;
                        }
                        &::-moz-placeholder {
                            color: #fff;
                            opacity: 1;
                        }
                        &::-moz-placeholder {
                            color: #fff;
                            opacity: 1;
                        }
                    }

                    .yzmimg {
                        width: 44%;
                        height: 40px;
                        margin-top: 0;
                    }
                }
                .button {
                    width: 82%;
                    height: 42px;
                    margin: 12px auto;
                    display: flex;
                    justify-content: space-between;

                    a {
                        width: 48%;
                        height: 100%;

                        &.login_btn {
                            text-decoration: none;
                            background: url(/static/jsyl/img/login/login_btn.png) no-repeat center center;
                            background-size: contain;

                            &:hover {
                                color: #fefba6;
                            }
                        }
                        &.forget {
                            background: url(/static/jsyl/img/login/forget_pwd.png) no-repeat center center;
                            background-size: contain;
                        }
                    }
                    .subbtn {
                        background: #27c6fa;
                        border-radius: 4px;
                        width: 259px;
                        height: 46px;
                        line-height: 40px;
                        text-align: center;
                        border: none;
                        color: #282203;
                        font-size: 18px;
                        font-family: '微软雅黑';
                        cursor: pointer;
                        display: block;
                        margin: 0 auto;
                        transition: all 0.4s;
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%, 0);

                        &:hover {
                            background: #5cd7ff;
                        }
                    }
                }
                .register_btn {
                    display: block;
                    width: 83%;
                    height: 42px;
                    background: url(/static/jsyl/img/login/register_btn.png) no-repeat center center;
                    background-size: contain;

                    &.show_code {
                        margin: 0 auto;
                    }
                    &.no_code {
                        margin: 25px auto 0;
                    }
                }
            }
        }
    }
}
.indexHeader {
    width: 100%;
    background: #000;
    border-bottom: 2px solid #535353;
    z-index: 100;
    position: relative;
    .headerNav {
        position: relative;
        width: 1200px;
        height: 100px;
        margin: 0 auto;
        z-index: 9999 !important;

        .navWrapper {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .w1000_1 {
                width: 690px;
                height: 39px;
                float: right;
                padding-right: 2px;
                .toplink {
                    line-height: 50px;
                    color: #573626;
                    position: relative;
                    padding-right: 0;

                    a {
                        color: #959595;
                        margin: 0 10px;
                        transition: all 0.4s;

                        &:hover {
                            color: #fff;
                        }
                    }
                    .time {
                        font-size: 14px;
                        color: #828282;
                        margin: 0;
                    }

                    .commonFunc {
                        position: relative;
                        float: right;
                        transform: translate(10px, 0);
                        a{
                            font-size: 14px;
                        }
                        .detection {
                            color: #00ff00;
                        }
                        .jiebei {
                            margin-right: 10px;
                            color: #ff0000;
                        }
                        .guanjia {
                            margin-right: 10px;
                            color: #ffff00;
                        }
                        .download {
                            margin-right: 10px;
                            color: #154cff;
                        }
                        .suggestion {
                            color: red;
                        }
                    }
                }
            }
            .container{
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                display: flex;
                .logo {
                    background: url(/static/jsyl/img/logo/home_logo.gif) no-repeat;
                    background-size: contain;
                    width: 450px;
                    display: inline-block;
                    height: 100px;
                    // margin-right: 90px;
                }
                .w1000 {
                    color: #fff;
                    width: 1200px;
                    height: 100%;
                    // margin: 0 auto;
                    position: relative;
                    z-index: 4;
                    // padding-left: 376px;
                    .infoList{
                        display: flex;
                        flex-direction: row;
                        // justify-content: space-between;
                        align-items: center;
                        // width: 837px;
                        float: right;
                        // margin: 0 auto;
                        .left {
                            // min-width: 305px;
                            height: 100%;
                            text-align: left;
                            display: flex;
                            align-items: center;
                            span {
                                height: 100%;
                                line-height: 54px;
                                font-size: 16px;
                                padding: 0 1px 0 0;

                                &.account {
                                    margin: 0 10px 0 0px;
                                    font {
                                        display: inline-block;
                                        min-width: 68px;
                                    }
                                }
                                &.user_money {
                                    font {
                                        display: inline-block;
                                        min-width: 35px;
                                    }
                                }

                                &.refresh_balance {
                                    .refresh {
                                        display: inline-block;
                                        width: 22px;
                                        height: 20px;
                                        background: url('/static/jsyl/img/login/refresh.png') center center no-repeat;
                                        margin-top: 20px;
                                    }
                                    .newfresh {
                                        background: url('/static/jsyl/img/login/refresh.png') no-repeat center;
                                    }
                                    .fres {
                                        -webkit-animation: spin 1s linear;
                                        animation: spin 1s linear;
                                    }
                                    @-webkit-keyframes spin {
                                        from {
                                            -webkit-transform: rotate(0deg) scale(1.2);
                                        }
                                        to {
                                            -webkit-transform: rotate(360deg) scale(1.2);
                                        }
                                    }

                                    @keyframes spin {
                                        from {
                                            transform: rotate(0deg) scale(1.2);
                                        }
                                        to {
                                            transform: rotate(360deg) scale(1.2);
                                        }
                                    }
                                }
                            }
                        }

                        .right {
                            height: 100%;
                            margin-left: 10px;
                            span {
                                color: #585858;
                                float: right;
                                a {
                                    font-size: 15px;
                                    &.logOut {
                                        display: inline-block;
                                        width: 90px;
                                        height: 30px;
                                        line-height: 30px;
                                        text-align: center;
                                        color: #000;
                                        background: url(/static/jsyl/img/login/log_out.png) center center no-repeat;
                                        background-size: cover;
                                        border-radius: 5px;
                                    }
                                }
                            }
                            #user_num{
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                background: red;
                                border-radius: 50%;
                                font-size: 12px;
                                text-align: center;
                                position: relative;
                                top: -6px;
                            }
                        }
                    }
                    .headerLogincon{
                        display: flex;
                        flex-direction: row;
                        // justify-content: space-between;
                        align-items: center;
                        // width: 837px;
                        float: right;
                        margin-top: 12px;
                         input {
                            width: 147px;
                            height: 29px;
                            line-height: 29px;
                            padding-left: 10px;
                            color: #aaa;
                            font-size: 12px;
                            font-family: 'Microsoft Yahei';
                            border: 1px solid #626262;
                            background: transparent;
                            caret-color: #ccc;

                            &::-webkit-input-placeholder {
                                color: #626262;
                            }
                            &::-moz-placeholder {
                                color: #626262;
                                opacity: 1;
                            }
                            &::-moz-placeholder {
                                color: #626262;
                                opacity: 1;
                            }
                            &:-ms-input-placeholder {
                                color: #626262;
                            }
                            &:-webkit-autofill {
                                -webkit-text-fill-color: #fff !important;
                                -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                                background-color: transparent !important;
                                background-image: none !important;
                                transition: background-color 50000s ease-in-out 0s !important;
                            }

                            &.user {
                                transition: all 0.4s;
                                margin-left: 150px;
                                &:hover {
                                    border: 1px solid #ffd053;
                                    transition: all 0.4s ease;
                                }
                            }
                            &.pass {
                                margin-left: 15px;
                                margin-right: 10px;
                                transition: all 0.4s;
                                &:hover {
                                    border: 1px solid #ffd053;
                                    transition: all 0.4s ease;
                                }
                            }
                            &.code {
                                width: 147px;
                                padding-left: 10px;
                                transition: all 0.4s;
                            }
                            &::-webkit-input-placeholder {
                                color: #fff;
                            }
                            &::-moz-placeholder {
                                color: #fff;
                                opacity: 1;
                            }
                            &:-moz-placeholder {
                                color: #fff;
                                opacity: 1;
                            }
                        }
                       .verify_code_box {
                            position: relative;
                            margin: 15px;
                            .codeimg {
                                position: absolute;
                                top: 3px;
                                right: 2px;
                                height: 20px;
                                cursor: pointer;
                            }
                        }
                        .forgetPwd {
                            height: 26px;
                            line-height: 26px;
                            display: inline-block;
                            position: relative;
                            color:#fff;
                            text-decoration: underline;
                            margin-right: 10px;
                            width:50px;
                        }

                        .logBut {
                            width: 83px;
                            height: 26px;
                            text-align: center;
                            line-height: 26px;
                            font-size: 12px;
                            font-family: 'Microsoft Yahei';
                            border: none;
                            cursor: pointer;

                            &.subbtn1 {
                                color: #54300d;
                                background: url(/static/jsyl/img/login/btn_login.png) no-repeat;
                                background-position: top center;
                                margin-right: 10px;
                                &:hover {
                                    background-position: bottom center;
                                }
                            }
                            &.regbtn1 {
                                // margin-left: 10px;
                                color: #e9d87b;
                                background: url(/static/jsyl/img/login/btn_join.png) no-repeat;
                                background-position: top center;
                                :hover {
                                    background-position: bottom center;
                                }
                            }
                        }

                    }


                    
                }
            }
        }
    }

    .header-login {
        width: 100%;
        margin: 0 auto;
        height: 80px;
        background: #0c0c0c;
        z-index: 1;
        border-bottom: 1px solid #0c0c0c;
        
        #loginForm {
            width: 100%;
            height: 100%;
            .header-logincon {
                background: url(/static/jsyl/img/home/headerlogin.png) left center no-repeat;
                height: 100%;
                width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: start;
                align-items: center;
                transform: translate(10px, 0);

                input {
                    background: #000;
                    width: 190px;
                    height: 34px;
                    line-height: 34px;
                    border: 1px solid #434343;
                    color: #fff;
                    padding-left: 15px;
                    float: left;
                    display: block;
                    margin-left: 5px;

                    &.user {
                        transition: all 0.4s;
                        margin-left: 150px;
                        &:hover {
                            border: 1px solid #ffd053;
                            transition: all 0.4s ease;
                        }
                    }
                    &.pass {
                        transition: all 0.4s;
                        &:hover {
                            border: 1px solid #ffd053;
                            transition: all 0.4s ease;
                        }
                    }
                    &.code {
                        width: 178px;
                        padding-left: 10px;
                        transition: all 0.4s;
                    }
                    &::-webkit-input-placeholder {
                        color: #fff;
                    }
                    &::-moz-placeholder {
                        color: #fff;
                        opacity: 1;
                    }
                    &:-moz-placeholder {
                        color: #fff;
                        opacity: 1;
                    }
                }

                .verify_code_box {
                    .codeimg {
                        height: 30px;
                        display: block;
                        float: left;
                        position: relative;
                        margin-left: -56px;
                        margin-top: 2px;
                        cursor: pointer;
                    }
                }
                .forget {
                    background: url(/static/jsyl/img/login/forget.png) no-repeat;
                    width: 60px;
                    height: 32px;
                    display: block;
                    float: left;
                    position: relative;
                    margin-left: -61px;
                    margin-top: -1px;
                    background-size: cover;
                }
                .subbtn {
                    background: url(/static/jsyl/img/login/subbtn.png) no-repeat;
                    width: 130px;
                    height: 34px;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    margin-left: 10px;
                    &:hover {
                        background-position: bottom center;
                    }
                }
                .regbtn {
                    background: url(/static/jsyl/img/login/regbtn.png) top center no-repeat;
                    width: 130px;
                    height: 34px;
                    display: block;
                    float: left;
                    margin-left: 7px;
                    :hover {
                        background-position: bottom center;
                    }
                }
            }
        }
        
        #headContainer {
            flex: 1;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            width: 1200px;
            margin: 0 auto;
            li {
                margin: 0;
                height: 100%;
                text-align: center;
                position: relative;
                border-bottom: 3px solid transparent;
                transition: all 0.6s ease-in-out;

                &:hover {
                    border-bottom: 3px solid #f1eda9;
                    transition: all 0.6s ease-in-out;
                    a {
                        span {
                            color: #f1eda9;
                        }
                    }
                }

                a {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    height: 100%;
                    padding-top: 15px;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;

                    .red {
                        color: #f00;
                    }

                    .ico {
                        width: 100%;
                        height: 22px;
                        margin-bottom: 10px;
                        &.home {
                            background: url(/static/jsyl/img/home/homeico.png) no-repeat center center;
                        }
                        &.elec {
                            background: url(/static/jsyl/img/home/elecico.png) no-repeat center center;
                        }
                        &.chess {
                            background: url(/static/jsyl/img/home/chess_icon.png) no-repeat center center;
                        }
                        &.casino {
                            background: url(/static/jsyl/img/home/casinoico.png) no-repeat center center;
                        }
                        &.lottery {
                            background: url(/static/jsyl/img/home/lotteryico.png) no-repeat center center;
                        }
                        &.fishing {
                            background: url(/static/jsyl/img/home/fishingico.png) no-repeat center center;
                        }
                        &.esport {
                            background: url(/static/jsyl/img/home/esportico.png) no-repeat center center;
                        }
                        &.promo {
                            background: url(/static/jsyl/img/home/promoico.png) no-repeat center center;
                        }
                        &.service {
                            background: url(/static/jsyl/img/home/serviceico.png) no-repeat center center;
                        }
                    }

                    span {
                        position: relative;
                        &:first-child {
                            font-size: 16px;
                            color: #fff;
                        }
                        &:last-child {
                            font-size: 12px;
                            color: #949494;
                            margin-top: 8px;
                        }

                        img {
                            position: absolute;
                            top: -22px;
                            right: -17px;
                        }
                    }

                    .ch {
                        font-size: 14px;
                        color: #fff;
                        letter-spacing: 1px;
                    }
                    .en {
                        font-size: 12px;
                        color: #949494;
                        margin-top: 8px;
                    }
                }

                .subnav {
                    position: absolute;
                    line-height: 36px;
                    left: -45px;
                    top: 79px;
                    z-index: 99;
                    display: none;
                    padding-top: 5px;

                    .jt {
                        background: url(/static/jsyl/img/home/arrow_top.png) no-repeat;
                        height: 5px;
                        width: 9px;
                        display: block;
                        margin: 0 auto;
                    }

                    .con {
                        background: rgba(0, 0, 0, 0.85);
                        width: 150px;
                        border: 2px solid #ffd053;
                        height: auto;
                        padding-top: 3px;

                        a {
                            color: #c7c7c7;
                            font-size: 13px;
                            display: block;
                            width: 120px;
                            height: 36px;
                            line-height: 36px;
                            text-align: center;
                            border-bottom: 1px dotted rgba(255, 255, 255, 0.15);
                            margin: 0 auto;
                            padding: 5px 15px 0;
                            position: relative;

                            &:hover {
                                color: #d6bd7b;
                            }

                            img {
                                position: absolute;
                                z-index: 99;
                                right: 5px;
                                top: 50%;
                                transform: translate(0, -35%);
                            }
                        }
                    }
                }
            }
            .SPORTS:hover{
                .subnav{
                    display: block;
                }
            }
            .CHESS:hover{
                .subnav{
                    display: block;
                }
            }
        } 
        
    }

    .notice {
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0px;
        background: url(/static/jsyl/img/others/noticebg.png) repeat-x;

        .w1000 {
            width: 1040px;
            height: 100%;
            margin: auto;
            span {
                font-size: 12px;
                background: url(/static/jsyl/img/others/notice.png) left center no-repeat;
                padding-left: 30px;
                width: 128px;
                float: left;
                display: block;
                height: 36px;
                line-height: 37px;
                color: #e0bf55;

                i {
                    font-style: normal;
                }
            }

            marquee {
                float: right;
                width: 860px;
                margin-right: 10px;
                color: #fff;
                height: 36px;
                line-height: 36px;
            }
        }
    }
}

.headerTop .lang {
    float: right;
    height: 36px;

    a {
        &.cn {
            background-position: 0 0;
        }
        &.hk {
            background-position: -23px 0;
        }
        &.usa {
            background-position: -45px 0;
        }
    }
}

.lisence {
    display: none;
    position: absolute;
    left: -100px;
    top: 30px;
    z-index: 1000;
}

.nav_fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}

.nav ul li > a span {
    background: none;
    height: 23px;
    display: block;
    margin: 0 auto;
}

.nav ul li > a span.i2 {
    background-position: -240px 0;
    width: 41px;
}
.nav ul li > a span.i3 {
    background-position: -157px 0;
    width: 37px;
}
.nav ul li > a span.i4 {
    background-position: -340px 0;
    width: 30px;
}
.nav ul li > a span.i5 {
    background-position: -70px 0;
    width: 30px;
}
.nav ul li > a span.i6 {
    background-position: -433px 0;
    width: 23px;
}
.nav ul li > a span.i7 {
    background-position: -520px 0;
    width: 20px;
}
.nav ul li > a span.i8 {
    background-position: -605px 0;
    width: 25px;
}

.nav ul li > a span.i2 {
    background-position: -240px -44px;
}
.nav ul li > a span.i3 {
    background-position: -157px -45px;
}
.nav ul li > a span.i4 {
    background-position: -340px -44px;
}
.nav ul li > a span.i5 {
    background-position: -70px -44px;
}
.nav ul li > a span.i6 {
    background-position: -430px -44px;
}
.nav ul li > a span.i7 {
    background-position: -520px -44px;
}
.nav ul li > a span.i8 {
    background-position: -605px -44px;
}
.nav ul li > a {
    color: white;
}

.nav ul li a p {
    margin-top: 10px;
    height: 12px;
    font-size: 14px;
}
.nav ul li a i {
    display: inline-block;
    font-style: normal;
    font-family: Arial;
    margin-top: 9px;
    font-size: 13px;
}

.nav ul li:hover > a span.i2 {
    background-position: -240px -44px;
}
.nav ul li:hover > a span.i4 {
    background-position: -340px -44px;
}
.nav ul li:hover > a span.i5 {
    background-position: -70px -44px;
}
.nav ul li:hover > a span.i6 {
    background-position: -430px -44px;
}
.nav ul li:hover > a span.i7 {
    background-position: -520px -44px;
}
.nav ul li:hover > a span.i8 {
    background-position: -605px -44px;
}
.nav ul li:hover > a > p,
.nav ul li:hover > a > i {
    color: #ffd053;
}

.nav ul li > a span.i3 {
    width: 37px;
    background-position: 6px -44px;
}
.nav ul li > a span.i88 {
    width: 37px;
    background-position: -58px -44px;
}
.nav ul li > a span.i78 {
    width: 37px;
    background-position: -130px -44px;
}
.nav ul li > a span.i68 {
    width: 45px;
    background-position: -199px -44px;
}
.nav ul li > a span.i58 {
    width: 38px;
    background-position: -278px -44px;
}
.nav ul li > a span.i48 {
    width: 38px;
    background-position: -339px -44px;
}
.nav ul li > a span.i38 {
    width: 38px;
    background-position: -471px -44px;
}
.nav ul li > a span.i28 {
    width: 38px;
    background-position: -539px -44px;
}
.nav ul li > a span.i98 {
    width: 38px;
    background-position: -601px -44px;
}
.nav ul li > a span.i168 {
    width: 38px;
    background-position: -398px -44px;
}

::-webkit-input-placeholder {
    color: #f5e97b;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    background-image: none !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>