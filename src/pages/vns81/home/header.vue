<template>
    <div class="header index-header">
        <!-- 头部时间等信息 -->
        <div class="headerTop">
            <div class="w1000">
                <div class="toplink">
                    <img src="/static/vns81/img/china.png" alt="" style="vertical-align: middle;margin-top: -3px;">
                    <a href="javascript:;" class="colors-change">简体中文</a>|
                    <a href="javascript:;" class="colors-change computed" @click="goHeader(1)">棋牌、电子、捕鱼(升级模式)</a>
                    <!-- <a href="javascript:;" class="colors-change ky" @click="goHeader(7)">开元棋牌</a> -->
                    <div class="commonFunc">
                        <a href="javascript:;" class="colors-change1 qipai" @click="goHeader(4)">手机APP下载</a>|
                        <a href="javascript:;" class="colors-change2 suggestion" @click="$goUserCen('message',1)">投诉建议</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导航栏 -->
        <div class="main clear" :class="[isFixedHeader ? 'fix' : 'abs']">
            <div class="main_content">
                <div class="top_left" @click="goHome">
                    <a class="logo" href="javascript:;"></a>
                </div>
                <ul class="navBar">
                    <li class="tpT" v-for="(item,i) in classifyList" :key="i" :class="[{isColor:item.hotShow ==true},item.className,item.text]" @click.stop="$goPath('one',item)">
                        <img src="/static/vns81/img/home/hot.gif" class="ico" alt v-if="item.hotShow">
                        <span class="zh" :class="[{changeText1:item.className=='casino'},{changeText2:item.className=='elec_game'}]">{{item.name}}</span>
                        <span class="en" :class="[{changeText3:item.className=='casino'},{changeText4:item.className=='elec_game'}]">{{item.text}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 导航栏登录框 登录后 userinfo-->
        <div class="headerLogin" v-if="loggedIn">
            <div class="afterLogin">
                <div class="left">
                    <span class="account">
                        会员帐号：<font color="yellow">{{userinfo.userName}}</font>
                    </span>
                    <span class="user_money">
                        钱包余额：<font color="yellow">{{userinfo ? userinfo.balance : ''}}</font>
                    </span>
                    <span class="refresh_balance">
                        <a class="refresh" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'
                            :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                        </a>
                    </span>
                </div>
                <div class="right">

                    
                    <span>
                        <a href="javascript:void(0)" @click="$goUserCen('recharge',0)">我要存款</a>&nbsp; | &nbsp;
                        <a href="javascript:void(0)" @click="$goUserCen('withdraw',0)">我要取款</a>&nbsp; | &nbsp;
                        <!-- <a href="javascript:void(0)" @click="$goUserCen('personage',2)">下注记录</a>&nbsp; | &nbsp; -->
                        <a href="javascript:void(0)" @click="$goUserCen('discounts',0)">实时返水</a>&nbsp; | &nbsp;
                        <a href="javascript:void(0)" @click="$goUserCen('personage',0)" v-if="is_agent==0">会员中心</a>
                        <a href="javascript:void(0)" @click="$goUserCen('message',0)" class="unread_msg">
                            未读信息
                            <font v-if="allUnReadCount !=0" id="user_num" style="color:yellow;">{{allUnReadCount}}</font>
                        </a>
                        <a class="logOut" href="javascript:void(0)" @click="logout">登出</a>
                    </span>
                </div>
            </div>
        </div>
        <!-- 导航栏登录框 登录前 userinfo-->
        <div class="headerLogin" v-if="!isShow && !loggedIn">
            <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
                <div class="headerLogincon">
                    <input type="text" class="user" id="userName" name="username" tabindex="1" v-model="passKey.userName" placeholder="帐号" @change="getCode">
                    <input type="password" class="pass" id="passwd" name="password" tabindex="2" @keyup="clearNull" v-model="passKey.password" placeholder="密码">
                    <a href="javascript:void(0)" @click="$forget()" class="forget"></a>
                    <!-- 验证码 -->
                    <div class="verify_code_box" v-if="code_show">
                        <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="3" maxlength="4" title="(点选此处产生新验证码)" v-model="passKey.code">
                        <img class="codeimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle" alt="(点选此处产生新验证码)" @click="getCode">
                    </div>
                    <input type="submit" value class="subbtn" @click="login">
                    <a href="javascript:void(0)" class="regbtn" @click="goKaihu"></a>
                </div>
            </form>
        </div>

        <!-- 登录框 -->
        <div class="loginBox" :style="{height: carheight +'px'}" v-if="loggedIn2">
            <div class="indexBannercon" :class="[!showLoginBox ? 'show' : '']">
                <div name="LoginForm" id="loginForms" :class="[!showLoginBox ? 'show' : '']">
                    <div class="indexLogin" :class="[code_show ? 'withCode':'noCode']">
                        <div class="title"></div>
                        <p class="username_box">
                            <input type="text" class="user" id="userName" name="username" value="帐号" tabindex="1" placeholder="帐号"
                                @change="getCode" autocomplete="off" v-model="passKey.userName">
                        </p>
                        <p class="pwd_box">
                            <input type="password" id="passwd" name="password" v-model="passKey.password" tabindex="2" placeholder="密码"
                                autocomplete="off" v-on:keyup.enter="login">
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
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
import $ from 'jquery';
import data from '../../public/user/login';
import freshButton from '../../public/home/freshButton';
export default {
    mixins: [data],
    components: {
        // vpHeaderPic
    },
    data() {
        return {
            allUnReadCount:10,
            loggedIn: false,
            loggedIn2:false,
            isFixedHeader: false,
            freh: {
                borderBottom: '7px solid #696969'
            },
            showLoginBox: false,
            isclick:false,
            showfresh:false,
            balanceRefreshing: false,
            carheight: 460,
            logShow: true,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: '/static/vns81/img/tiger.jpg',
            time: '',
            lantern: '',
            isShow: true,
            showLittlePic: true,
            headBg: '',
            refreshS: false,
            classListData: [
                {
                    name: '棋牌游戏',
                    text: 'CHESS',
                    platform: 'KY_CHESS',
                    hotShow: true,
                    link: '',
                    gameName: '0',
                    list: []
                }
            ],
            passKey: {
                userName: '',
                password: '',
                code: ''
            },
            classifyList: [
                {
                    name: '首页',
                    text: 'HOME',
                    link: '/home',
                    className: 'homePage'
                },{
                    name: '棋牌游戏',
                    text: 'CHESS',
                    platform: 'KY_CHESS',
                    link: '/home/chess?navid=9&id=0',
                    className: 'chess',
                    gameName: '0',
                    hotShow: true,
                    type: "chess",
                    list: []
                },
                {
                    name: '真人娱乐',
                    text: 'LIVE CASINO',
                    link: '/home/live',
                    platform: 'live_casino',
                    hotShow: true,
                    className: 'casino',
                    list: []
                },
                {
                    name: '彩票游戏',
                    text: 'LOTTERY',
                    platform: 'vr_lottery',
                    link: '/plays/hall',
                    className: 'lottery',
                    type: "lottery",
                },
                {
                    name: '电子游艺',
                    text: 'ELECT RONIC',
                    platform: 'MG_GAME',
                    hotShow: true,
                    type: "slot",
                    className: 'elec_game',
                    link: '/home/slot?navid=9&id=0',
                    list: []
                },
                {
                    name: '捕鱼达人',
                    text: 'FISH',
                    hotShow: true,
                    type: "fish",
                    link: '/home/fish?navid=9&id=0',
                    className: 'fish'
                },
                {
                    name: '体育赛事',
                    text: 'SPORTS',
                    platform: 'sport',
                    link: '/home/tiyu?id=0',
                    className: 'sport',
                    list: []
                },
                {
                    name: '优惠活动',
                    text: 'PROMOTION',
                    link: '/home/youhui',
                    className: 'promo'
                },
                {
                    name: '代理加盟',
                    text: 'AGENT',
                    link: '/home/agent',
                    className: 'agent'
                },
                {
                    name: '在线客服',
                    text: 'SERVICE',
                    link: 'service',
                    type: "service",
                    className: 'service'
                }
            ],
            
        };
    },
    methods: {
        async getGameDatas() {
            await this.$gameSortV4();
            // await this.getNativeDatas();
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
        //滚动监听
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 42) {
                this.isFixedHeader = true;
            } else {
                this.isFixedHeader = false;
            }
        },
        forget() {
            this.$store.commit('alert/newshowtip', {
                bool: true,
                title: '忘记帐号密码，请联系在线客服人员取回！',
                model: '',
                leftspan: true
            });
        },
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
        },
        ctrNavShow(event) {
            $(event.target)
                .children('div')
                .show();
        },
        ctrNavHide(event) {
            $(event.target)
                .children('div')
                .hide();
        },
        goKaihu() {
            this.$store.commit('hsyl/showRegister', true);
        },
        bgoLink(item) {
            this.goLink(item);
        },
        loginEnter(keyNumber) {
            if (keyNumber == 13) {
                login();
            }
        },
        
        goQipaiGame(v) {
            this.$router.push(v);
        },
        goHeader(typeNum) {
            if (typeNum == 0) {
                // 线路检测
                window.open('https://675.com/', '_blank');
            } else if (typeNum == 1) {
                // 捕鱼
                this.$router.push('/home/fish?navid=9&id=0');
            } else if (typeNum == 2) {
                // 金管家
                this.$router.push('/home/youhui');
            } else if (typeNum == 3) {
                //常见问题
                this.$router.push('/home/issue');
            } else if (typeNum == 4) {
                window.open('/static/vns81/html/download/index.html');
            } else if (typeNum == 5) {
                this.$router.push('/home/chess?navid=9&id=10042');
            } else if (typeNum == 6) {
                this.$router.push('/home/chess?navid=9&id=10042');
            } else if (typeNum == 7) {
                this.$router.push('/home/chess?navid=9&id=10042');
            }
        },
        
        goHome() {
            this.$router.push('/home');
        },
        // logout() {
        //     UserService.logout.call(this);
        // },
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
            }, 500);
        },
        //是否已登录
        isLogged() {
            if (localStorage.userinfo && localStorage.token) {
                this.loggedIn = true;
                this.loggedIn2 = true;
            } else {
                this.loggedIn = false;
                this.loggedIn2 = false;
            }
        }
    },
    computed: {
        showMessage(){
            return this.$store.state.mainState.showMessage;
       },
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
        is_agent() {
            return JSON.parse(localStorage.userinfo).is_agency;
        }
    },
    mounted() {
        this.isLogged();
        window.addEventListener('scroll', this.handleScroll);
        let time = setInterval(this.getTimes, 1000);
        this.shake($('.colors-change1'), 'gree', -1);
        this.shake($('.colors-change2'), 'yell', -1);
        this.shake($('.colors-change3'), 'resd', -1);

        if (this.$route.path == '/home') {
            this.isShow = true;
            this.showLittlePic = false;
            this.logShow = true;
            if(localStorage.userinfo || localStorage.token){
                this.loggedIn2 = false;
            }else{
                this.loggedIn2 = true;
            }
            
        } else {
            this.isShow = false;
            this.logShow = false;
            this.loggedIn2 = false;
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
        this.getGameDatas();
        this.is_code_show();
        // this.getQiPai();
        if (this.clientwidth > 1920) {
            this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
        }
    },

    watch: {
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
                if(localStorage.userinfo && localStorage.token){
                    this.loggedIn2 = false;
                }else{
                    this.loggedIn2 = true;
                }
            } else {
                this.isShow = false;
                this.logShow = false;
                this.loggedIn2 = false;
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
            let bg = '/static/vns81/img';
            switch (this.$route.path) {
                case '/home/live':
                    this.headBg = bg + '/women.jpg';
                    break;
                case '/home/games':
                    this.headBg = bg + '/dz.jpg';
                    break;
                case '/home/qipai':
                    this.headBg = bg + '/tiger.jpg';
                    break;
                case '/home/buyu':
                    this.headBg = bg + '/fish.jpg';
                    break;
                case '/home/youhui':
                    this.headBg = bg + '/money.jpg';
                    break;
                case '/home/agent':
                    this.headBg = bg + '/about-banner.jpg';
                    break;
                default:
                    this.headBg = bg + '/about-banner.jpg';
            }
        },
        isLogged() {
            this.isLogged();
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
    color: #ff0 !important;
}
.gree {
    color: #00ff00 !important;
}
.blues {
    color: #154cff !important;
}
.index-header {
    background: #171717;
    width: 100%;
    position: relative;
    z-index: 12;
    border-bottom: 1px solid #262626;
    .loginBox {
      display: block;
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, 6%);
      width: 1200px;
      margin: 0 auto;
      z-index: 3;

      .indexBannercon {
        display: none;
        &.show {
          display: block;
          position: relative;
          width: 100%;
          height: 442px;
          margin: 132px auto 0;
          z-index: 20;
          overflow: hidden;
          animation: 1s flipInX;
        }

        #loginForms {
          position: absolute;
          top: 46%;
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
              background: url(/static/vns81/img/login/with_code.png) no-repeat;
              .subbtn {
                bottom: 10px;
              }
            }
            &.noCode {
              background: url(/static/vns81/img/login/no_code.png) no-repeat;
              .subbtn {
                bottom: 64px;
              }
            }

            .title {
              width: 100%;
              height: 24px;
              margin-bottom: 12px;
              background: url(/static/vns81/img/login/title.png) center center
                no-repeat;
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
                background: url(/static/vns81/img/login/user_input.png)
                  no-repeat center center;
              }
              &.pwd_box {
                background: url(/static/vns81/img/login/pwd_input.png)
                  no-repeat center center;
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
                  background: url(/static/vns81/img/login/login_btn.png)
                    no-repeat center center;
                  background-size: contain;

                  &:hover {
                    color: #fefba6;
                  }
                }
                &.forget {
                  background: url(/static/vns81/img/login/forget_pwd.png)
                    no-repeat center center;
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
                font-family: "微软雅黑";
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
              background: url(/static/vns81/img/login/register_btn.png)
                no-repeat center center;
              width: 83%;
              height: 42px;
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

      @keyframes flipInX {
        0% {
          -moz-transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
          -ms-transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
          -o-transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
          -webkit-transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
          transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
          -moz-transition-timing-function: ease-in;
          -o-transition-timing-function: ease-in;
          -webkit-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
          opacity: 0;
        }
        40% {
          -moz-transform: perspective(900px) rotate3d(1, 0, 0, -20deg);
          -ms-transform: perspective(900px) rotate3d(1, 0, 0, -20deg);
          -o-transform: perspective(900px) rotate3d(1, 0, 0, -20deg);
          -webkit-transform: perspective(900px) rotate3d(1, 0, 0, -20deg);
          transform: perspective(900px) rotate3d(1, 0, 0, -20deg);
          -moz-transition-timing-function: ease-in;
          -o-transition-timing-function: ease-in;
          -webkit-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
        }
        60% {
          -moz-transform: perspective(900px) rotate3d(1, 0, 0, 10deg);
          -ms-transform: perspective(900px) rotate3d(1, 0, 0, 10deg);
          -o-transform: perspective(900px) rotate3d(1, 0, 0, 10deg);
          -webkit-transform: perspective(900px) rotate3d(1, 0, 0, 10deg);
          transform: perspective(900px) rotate3d(1, 0, 0, 10deg);
          opacity: 1;
        }

        80% {
          -moz-transform: perspective(900px) rotate3d(1, 0, 0, -5deg);
          -ms-transform: perspective(900px) rotate3d(1, 0, 0, -5deg);
          -o-transform: perspective(900px) rotate3d(1, 0, 0, -5deg);
          -webkit-transform: perspective(900px) rotate3d(1, 0, 0, -5deg);
          transform: perspective(900px) rotate3d(1, 0, 0, -5deg);
        }
        100% {
          -moz-transform: perspective(900px);
          -ms-transform: perspective(900px);
          -o-transform: perspective(900px);
          -webkit-transform: perspective(900px);
          transform: perspective(900px);
        }
      }
    }
    .headerTop {
        height: 42px;
        border-bottom: 1px solid #262626;

        .w1000 {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding-left: 6px;
            .toplink {
                line-height: 42px;
                color: #fff;
                position: relative;
                padding-right: 0;

                a {
                    color: #959595;
                    margin: 0 9px;
                    transition: all 0.4s;
                    &.fs {
                        color: #959595;
                        transition: all 0s;
                    }
                    &.xl {
                        color: #dfbb4c;
                        margin-right: 0px;
                    }
                    &.color1 {
                        color: #ff0000;
                    }
                    &.computed {
                        color: #ff0000;
                    }
                    &.ky {
                        color: #0f0;
                    }
                    &:hover {
                        color: #ffd053;
                        text-decoration: underline;
                    }
                }
                .time {
                    font-size: 12px;
                    color: #d9d243;
                    margin: 0;
                }

                .commonFunc {
                    position: relative;
                    float: right;
                    transform: translate(10px, 0);
                    color: #fff;
                    .qipai {
                        color: #154cff;
                    }
                    .detection {
                        color: #00ff00;
                    }
                    .jiebei {
                        margin-right: 10px;
                        color: red;
                    }
                    .guanjia {
                        margin-right: 10px;
                        color: #ffd053;
                    }
                    .download {
                        margin-right: 10px;
                        color: #959595;
                    }
                    .suggestion {
                        color: #ff0000;
                    }
                    .repacks {
                        color: #959595;
                    }
                    a:hover {
                        color: #ffd053;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .main {
        width: 100%;
        background-color: #2c2b2b;
        z-index: 100;

        &.abs {
            position: absolute;
            top: 42px;
        }
        &.fix {
            position: fixed;
            top: 0;
        }
        .main_content {
            position: relative;
            width: 1200px;
            margin: 0 auto;
            text-align: center;
            height: 78px;
            .top_left {
                position: absolute;
                top: 0;
                left: -30px;
                width: 238px;
                height: 189px;
                z-index: 1000;

                .logo {
                    position: absolute;
                    top: 0;
                    left: 35px;
                    height: 167px;
                    width: 176px;
                    background: url(/static/vns81/img/home/logo.png) no-repeat center;
                    background-size: 100%;
                }
            }
            .navBar {
                height: 90px;
                float: right;

                .tpT {
                    height: 90px;
                    float: left;
                    margin: 0 18px;
                    position: relative;
                    font-size: 12px;
                    color: #eee;
                    line-height: 90px;
                    cursor: pointer;
                    text-align: center;
                    padding-top: 27px;
                    line-height: 20px;

                    .ico {
                        position: absolute;
                        top: 12px;
                        right: 0px;
                    }

                    span {
                        &.zh {
                            display: block;
                            font-size: 14px;
                            color: #fff;
                        }
                        &.en {
                            font-size: 12px;
                            white-space: nowrap;
                            color: #949494;
                            margin-top: 8px;
                        }
                    }

                    .dropdown {
                        left: 50%;
                        display: none;
                        position: absolute;
                        top: 90px;
                        z-index: 999;
                        background: rgba(0, 0, 0, 0.8);
                        line-height: normal;
                        color: #fff;
                        font-size: 13px;
                        transform: translateX(-50%);
                        ol {
                            border: 2px solid rgb(180, 140, 104);
                            li {
                                line-height: 40px;
                                color: #fff;
                                width: 120px;
                                height: 40px;
                                border-bottom: 1px dashed #ccc;
                                margin: 0;
                                float: unset;
                                a {
                                    width: 100%;
                                    height: 100%;
                                    display: inline-block;
                                    text-align: center;
                                    color: #fff;

                                    img {
                                        border: 0;
                                        vertical-align: middle;
                                    }
                                }
                            }
                            li:last-child {
                                border: 0;
                            }
                            li:hover {
                                background: rgb(180, 140, 104);
                            }
                        }
                    }

                    &:last-child {
                        margin-right: 0;
                    }
                    &.promo {
                        span {
                            color: #ff0000;
                        }
                    }
                    &:hover {
                        .zh {
                            color: #ffd053;
                        }

                        .en {
                            color: #ffd053;
                        }

                        .dropdown {
                            display: block;
                        }
                    }
                }
            }
        }
    }

    .headerLogin {
        width: 100%;
        height: 55px;
        margin-top: 90px;
        background: #0c0c0c;
        z-index: 1;
        border-bottom: 1px solid #0c0c0c;

        #loginForm {
            width: 100%;
            height: 100%;

            .headerLogincon {
                height: 100%;
                width: 1200px;
                margin: 0 auto;
                padding-left: 269px;
                display: flex;
                justify-content: start;
                align-items: center;
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
                    background: url(/static/vns81/img/forget.png) no-repeat;
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
                    background: url(/static/vns81/img/subbtn.png) no-repeat;
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
                    background: url(/static/vns81/img/regbtn.png) top center no-repeat;
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

        .afterLogin {
            color: #fff;
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 4;
            padding-left: 250px;

            .left {
                min-width: 250px;
                height: 100%;
                text-align: left;
                display: flex;
                align-items: center;
                padding-left: 25px;
                span {
                    height: 100%;
                    line-height: 54px;
                    font-size: 16px;
                    padding: 0 1px 0 0;

                    &.account {
                        margin: 0 6px 0 0px;
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
                            background: url('/static/vns81/img/refresh.png') center center no-repeat;
                            margin-top: 17px;
                        }
                        .newfresh {
                            background: url('/static/vns81/img/newfresh.png') no-repeat center;
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
                flex: 1;
                margin-left: 8px;
                span {
                    a {
                        font-size: 15px;

                        &.unread_msg {
                            margin: 0 8px;
                        }

                        &.logOut {
                            display: inline-block;
                            width: 62px;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            color: #000;
                            background: url(/static/vns81/img/log_out.png) center center no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }
        }
    }

    .notice {
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0px;
        background: url(/static/vns81/img/noticebg.png) repeat-x;

        .w1000 {
            width: 1040px;
            height: 100%;
            margin: auto;
            span {
                font-size: 12px;
                background: url(/static/vns81/img/notice.png) left center no-repeat;
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
    position: absolute;
    left: -100px;
    top: 30px;
    display: none;
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

.nav ul li > a.color1 {
    color: #e60012;
}
.nav ul li > a.color2 {
    color: #ffd053;
}
.nav ul li > a span.i2.color1 {
    background-position: -240px -22px;
}
.nav ul li > a span.i3.color1 {
    background-position: -157px -22px;
}
.nav ul li > a span.i5.color1 {
    background-position: -70px -22px;
}
.nav ul li > a span.i7.color1 {
    background-position: -520px -22px;
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
.navBar .subnav {
    position: absolute;
    line-height: 36px;
    left: -42px;
    top: 86px;
    z-index: 99;
    display: none;
    padding-top: 5px;
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
.navBar .subnav .jt {
    background: url(/static/vns81/img/menujt.png) no-repeat;
    height: 5px;
    width: 9px;
    display: block;
    margin: 0 auto;
}
.navBar .subnav .con {
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
