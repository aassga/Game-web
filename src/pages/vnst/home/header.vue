<template>
    <div class="header index-header">
        <!-- 头部时间等信息 -->
        <div class="header-top">
            <div class="w1000">
                <div class="toplink">
                    <div class="lisence">
                        <img src="/static/vnst/img/pz.png">
                    </div>
                    <a class="time">
                        美东时间：
                        <span id="mdtime" data-nowtime="2019/03/29 02:34:04">{{time}}</span>
                    </a>

                    <div class="commonFunc">
                        <a href="javascript:;" class="colors-change detection" @click="goHeader(0)">线路检测</a>|
                        <a href="javascript:;" class="colors-change jiebei" @click="goHeader(1)">免息借呗</a>|
                        <a href="javascript:;" class="colors-change guanjia" @click="goHeader(2)">金管家</a>|
                        <a href="javascript:;" class="colors-change download" @click="goHeader(4)">下载APP</a>|
                        <a href="javascript:;" class="colors-change suggestion" @click="goUserCen('message',1)">投诉建议</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 头部导航 -->
        <div class="header-float">
            <div class="navbg">
                <div class="nav w1000">
                    <a href="javascript:void(0)" @click="goView('/home')" class="logo"></a>
                    <ul id="head-container">
                        <li v-for="(item,index) in classListData" :class="item.text" :key="index" @click="$goPath('one',item)">
                            <a href="javascript:void(0)"  @click="$goPath('one',item)" class="nav_item">
                                <i class="ico" :class="item.ico"></i>
                                <span class="ch">{{item.name}}</span>
                                 <img v-if="item.hot == true" src="/static/vnst/img/hot.gif" alt="hot">
                            </a>
                            <div class="subnav" v-if="item.list&&item.list.length>0">
                                <span class="jt"></span>
                                <div class="con">
                                    <a v-for="(v,i) in item.list" :key="i" href="javascript:void(0)" style="position:relative;" @click.stop="$goPath('nav',v)">
                                        {{v.name}}
                                        <img src="/static/vnst/img/hot.gif" style=" position: absolute; z-index: 99; right: 5px;" v-if="[173,11421,11729,10022,10018,10021,11320,243,10613,10695].includes(v.id)">
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 首页登录框 -->
        <div class="lgobox" :style="{height: carheight +'px'}" v-if="logShow">
            <div class="index-bannercon w1000" v-if=" isShow && !$store.state.mainState.loginOrout">
                <div name="LoginForm" id="loginForms">
                    <div class="index-login" :class="[code_show ? 'withCode':'noCode']">
                        <div class="title"></div>
                        <p class="username_box">
                            <input type="text" class="user" id="userName" name="username" value="帐号" tabindex="1" placeholder="帐号"
                                @change="getCode" autocomplete="off" v-model="passKey.userName">
                        </p>
                        <p class="pwd_box">
                            <input type="password" id="passwd" name="password" v-model="passKey.password" tabindex="2" placeholder="密码"
                                autocomplete="off" @keyup="clearNull" v-on:keyup.enter="login">
                        </p>
                        <p class="code_box0" v-if="code_show">
                            <input type="text" class="yzm code_box" id="rmNum" name="rmNums" placeholder="验证码" size="4" tabindex="3"
                                maxlength="4" title="( 点选此处产生新验证码)" v-model="passKey.code" v-on:keyup.enter="login">
                            <img class="yzmimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle"
                                alt="( 点选此处产生新验证码 )" @click="getCode">
                        </p>
                        <div class="button">
                            <a class="login_btn" href="javascript:void(0)" @click="login"></a>
                            <a class="forget" href="javascript:void(0)" @click="forgetPwd"></a>
                        </div>

                        <a class="register_btn" :class="[code_show ? 'show_code' : 'no_code']" href="javascript:void(0)"
                            @click="goKaihu"></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导航栏登录框 登录后 -->
        <div class="header-login" v-if="$store.state.mainState.loginOrout">
            <div class="w1000">
                <div class="img" style="margin-left:8px"><img src="/static/vnst/img/new_games/head_log.png" alt=""></div>
                <div class="left">
                    <span class="account">
                        会员帐号 ：<font color="yellow">{{userinfo.userName}}</font>
                    </span>
                    <span class="user_money">
                        钱包余额 ：<font color="yellow">{{userinfo ? userinfo.balance : ''}}</font>
                    </span>
                    <span class="refresh_balance">
                        <a class="refresh" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false' :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']"></a>
                    </span>
                </div>
                <div class="right">
                    <span>
                        <a href="javascript:void(0)" @click="$goUserCen('recharge',0)">我要存款</a>&nbsp; | &nbsp;
                        <a href="javascript:void(0)" @click="$goUserCen('withdraw',0)">我要取款</a>&nbsp; | &nbsp;
                        <!-- <a href="javascript:void(0)" @click="goUserCen('personage',2)">下注记录</a>&nbsp; | &nbsp; -->
                        <a href="javascript:void(0)" @click="$goUserCen('discounts',0)">时时返水</a>&nbsp; | &nbsp;
                        <a href="javascript:void(0)" @click="$goUserCen('personage',0)" v-if="is_agent==0">会员中心</a>
                        <a href="javascript:void(0)" @click="$goUserCen('message',0)" class="unread_msg">
                            站内信
                            <font v-if="allUnReadCount !=0" id="user_num" style="color:yellow;">{{allUnReadCount}}</font>
                        </a>
                        <a class="logOut" href="javascript:void(0)" @click="logout">登出</a>
                    </span>
                </div>
            </div>
        </div>

        <!-- 导航栏登录框 登录前-->
        <div class="header-login" id="xheader-login" style="display:block" v-if="!isShow && !$store.state.mainState.loginOrout">
            <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
                <div class="header-logincon">
                    <input type="text" class="user" id="userName" name="username" tabindex="1" v-model="passKey.userName" placeholder="帐号"
                        @change="getCode">
                    <input type="password" class="pass" id="passwd" name="password" tabindex="2" v-model="passKey.password" @keyup="clearNull"
                        placeholder="密码">
                    <a href="javascript:void(0)" @click="forgetPwd" class="forget"></a>

                    <!-- 验证码 -->
                    <div class="verify_code_box" v-if="code_show">
                        <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="3" maxlength="4"
                            title="(点选此处产生新验证码)" v-model="passKey.code">
                        <img class="codeimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                    </div>
                    <input type="submit" value class="subbtn" @click="login">
                    <a href="javascript:void(0)" class="regbtn" @click="goKaihu"></a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
import $ from 'jquery';
import data1 from '../../public/user/login';
import freshButton from "../../public/home/freshButton";
export default {
    mixins: [data1],
    data() {
        return {
            allUnReadCount:10,
            codeImg:'/static/vnst/img/new_games/lo.png',
            freh:{
               borderBottom: '7px solid #696969',
            },
            isclick:false,
            balanceRefreshing:false,
            showfresh:false,
            carheight: 460,
            logShow: true,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: '/static/vnst/img/tiger.jpg',
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
                    ico:'home'
                },
                {
                    name: "棋牌游戏",
                    text: "CHESS",
                    link: "/home/chess?navid=9&id=0",
                    platform: "KY_CHESS",
                    gameName: "0",
                    list: [],
                    type: "chess",
                    ico:'chess',
                    hot:true,
                },
                {
                    name: "捕鱼游戏",
                    text: "FISHING",
                    link: "/home/fish?navid=9&id=0",
                    type: "fish",
                    ico:'fishing',
                    hot:true,
                    list:[
                        {
                            name:"JDB财神捕鱼",
                            id:173,
                            type:'game2'
                        },
                        {
                            name:"JDB五龙捕鱼",
                            id:11421,
                            type:"game2",
                        },
                        {
                            name:"AG捕鱼王3D",
                            id:11729,
                            type:"game2",
                        },
                        {
                            name:"CQ9皇金渔场2",
                            id:11680,
                            type:"game2",
                        },
                        {
                            name:"BG捕鱼",
                            id:3602,
                            type:"game2",
                        },
                        {
                            name:"FG美人捕鱼",
                            id:2576,
                            type:"game2",
                        }
                   ]
                },
                {
                    name: "老虎机",
                    text: "GAME",
                    platform: "AG_GAME",
                    link: "/home/slot?navid=9&id=0",
                    type: "slot",
                    ico:'elec',
                    hot:true,
                    list:[
                       {
                           name:'MG电子',
                           link:"/home/slot?navid=9&id=10022",
                           id:10022
                       },
                       {
                           name:'CQ9电子',
                           link:"/home/slot?navid=9&id=10018",
                           id:10018
                       },
                       {
                           name:'JDB电子',
                           link:"/home/slot?navid=9&id=10021",
                           id:10021
                       },
                       {
                           name:'PG电子',
                           link:"/home/slot?navid=9&id=11320",
                           id:11320
                       },
                       {
                           name:'AG电子',
                           link:"/home/slot?navid=9&id=10015",
                           id:10015
                       },
                       {
                           name:'PT电子',
                           link:"/home/slot?navid=9&id=10024",
                           id:10024
                       },
                    ]
                },
            
                {
                    name: "真人视讯",
                    text: "CASINO",
                    link: "/home/live",
                    platform: "live_casino",
                    ico:'casino'
                },
                {
                    name: "彩票游戏",
                    text: "LOTTERY",
                    platform: "CT_LOTTERY",
                    link: "/plays/hall",
                    gameName: "0",
                    type: "lottery",
                    ico:'lottery'
                },
               
                {
                    name: "电竞体育",
                    text: "SPORTS",
                    platform: "sport",
                    link: "/home/tiyu?id=0",
                    ico:'esport'
                },
                {
                    name: "优惠活动",
                    text: "ACTIVETY",
                    link: "/home/youhui",
                    ico:'promo'
                },
                {
                    name: "在线客服",
                    text: "SERVICE",
                    link: "service",
                    type: "service",
                    ico:'service'
                }
            ],
            passKey: {
                userName: '',
                password: '',
                code: ''
            },
            // isClick:true,
        };
    },
    methods: {
        async getGameDatas() {
            await this.$gameSortV4(this.getNativeDatas);
        },
        getNativeDatas() {
            if (localStorage.gameSortV4_chess){
                this.classListData[1].list = this.$gameClassV4("chess");
            }
        },
        async getBalance() {
            if(this.isclick) return false
            this.isclick=true
            this.balanceRefreshing=true
            this.showfresh=false
            setTimeout(()=>{
                this.balanceRefreshing=false
            },600)
            setTimeout(()=>{
                this.isclick=false
            },10000)
            let res = await this.$http.get(`${this.$HOST_NAME}/refreshBalance`, {});
            if (res.code === 200) {
                let userinfo = JSON.parse(localStorage.userinfo);
                userinfo.balance = res.data.balance;
                this.$store.commit("mainState/reloadUserinfo", userinfo);
            }
            // getS(`member/balance`).then(res => {
            //     if (res.code === 200) {
            //     let userinfo = JSON.parse(localStorage.userinfo);
            //     userinfo.balance = res.data.member;
            //     userinfo.agent = res.data.agency;
            //     this.$store.commit("mainState/reloadUserinfo", userinfo);
            //     }
            // });
        },
        newshowfresh(){
            if(this.balanceRefreshing) this.showfresh=false
               else this.showfresh=true
        },
        
        goKaihu() {
            // this.$router.push('/home/register2');
            this.$store.commit('alert/showMgmRegister', true);
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
                window.open('https://4470.com/', '_blank');
            } else if (typeNum == 1) {
                // 借呗
                 if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                      //window.open('/static/vnst/html/active/jiebei/index.html');
                   }
                  }else{
                    // window.open('/static/vnst/html/active/jiebei/index.html');
                  this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                   });
                 }
            } else if (typeNum == 2) {
                // 金管家
               window.open('/static/public/active/jgj/index.html');
            } else if (typeNum == 3) {
                //常见问题
                this.$router.push('/home/issue');
            } else if (typeNum == 4) {
                window.open('/static/vnst/html/download/index.html');
            }
        },
        forgetPwd() {
            this.$store.commit('alert/newshowtip', {
                bool: true,
                title: '忘记帐号密码，请联系在线客服人员取回！',
                model: '',
                leftspan: true
            });
        },

        logout() {
            UserService.logout.call(this);
        },
        goUserCen(name, num) {
            //name的类型有 ：  recharge （充值）  personage （个人资料）
            //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）

            if (!localStorage.token || !localStorage.userinfo) {
                this.errorAlert('请先登录!');
            } else {
                this.$store.commit('showPersonal', {
                    bool: true
                });
                this.$store.commit('showContent', {
                    parent: name
                });
                this.$store.commit('showNav', {
                    child: num
                });
            }
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
        let time = setInterval(this.getTimes, 1000);
        this.shake($('.colors-change'), 'resd', -1);
        this.shake($('.blingColor'), 'resd', -1);
        if (this.$route.path == '/home') {
            this.isShow = true;
            this.showLittlePic = false;
            this.logShow = true;
        } else {
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
        this.getGameDatas();
        this.is_code_show();
        // this.getQiPai();
        if (this.clientwidth > 1920) {
            this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
        }
    },
    
    watch: {
        $route() {
            if (this.$route.path == '/home') {
                this.isShow = true;
                this.showLittlePic = false;
                this.logShow = true;
            } else {
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
            let bg = '/static/vnst/img';
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
        'refreshS':function(newVal,oldVal){
              if(newVal){
                   this.$store.commit('alert/newshowtip', {
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
    components: {
      freshButton
    },
    store
};
</script>

<style lang="less" scoped>
.fres{
      -webkit-animation: spin 1s linear;
      animation: spin 1s linear;
}
@-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg) ;
        }
      to {
          -webkit-transform: rotate(360deg) ;
      }
  }
  @keyframes spin {
    from {
        transform: rotate(0deg) ;
    }
    to {
        transform: rotate(360deg) ;
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
.blingColor{
    color: #ffff00;
}
.index-header {
    background: #171717;
    width: 100%;
    position: relative;
    z-index: 12;
    border-bottom: 1px solid #262626;

    .header-top {
        height: 36px;
        border-bottom: 1px solid #262626;

        .w1000 {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding-left: 6px;
            .toplink {
                line-height: 36px;
                color: #573626;
                position: relative;
                padding-right: 0;

                a {
                    color: #959595;
                    margin: 0 10px;
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
                    &:hover {
                        color: #fff;
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

                    .detection {
                        color: yellow;
                    }
                    .jiebei {
                        margin-right: 10px;
                        color: yellow;
                    }
                    .guanjia {
                        margin-right: 10px;
                        color: yellow;
                    }
                    .download {
                        margin-right: 10px;
                        color: yellow;
                    }
                    .suggestion {
                        color: yellow;
                    }
                }
            }
        }
    }

    .header-float {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        z-index: 9999 !important;

        .navbg {
            height: 106px;

            .nav {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                .logo {
                    background: url(/static/vnst/img/home_logo.png) no-repeat;
                    background-size: contain;
                    width: 302px;
                    height: 100%;
                    margin-right: 70px;
                }
                #head-container {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    li {
                        margin: 0;
                        height: 100%;
                        text-align: center;
                        position: relative;
                        a {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            position: relative;
                            height: 100%;
                            color: #ffd053;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            .ico {
                                width: 100%;
                                height: 22px;
                                margin-bottom: 10px;
                                &.home {
                                    background: url(/static/vnst/img/homeico.png) no-repeat center center;
                                }
                                &.elec {
                                    background: url(/static/vnst/img/elecico.png) no-repeat center center;
                                }
                                &.chess {
                                    background: url(/static/vnst/img/chess_icon.png) no-repeat center center;
                                }
                                &.casino {
                                    background: url(/static/vnst/img/casinoico.png) no-repeat center center;
                                }
                                &.lottery {
                                    background: url(/static/vnst/img/lotteryico.png) no-repeat center center;
                                }
                                &.fishing {
                                    background: url(/static/vnst/img/fishingico.png) no-repeat center center;
                                }
                                &.esport {
                                    background: url(/static/vnst/img/esportico.png) no-repeat center center;
                                }
                                &.promo {
                                    background: url(/static/vnst/img/promoico.png) no-repeat center center;
                                }
                                &.service {
                                    background: url(/static/vnst/img/serviceico.png) no-repeat center center;
                                }
                            }
                            img{
                                position: absolute;
                                top:10px;
                                right: -14px;
                            }

                            .ch {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }

    .lgobox {
        width: 1200px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        z-index: 3;
        transform: translate(-50%, 0);

        .index-bannercon {
            #loginForms {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                z-index: 20;

                .index-login {
                    width: 280px;
                    height: 360px;
                    overflow: hidden;
                    position: relative;
                    padding-top: 28px;
                    &.withCode {
                        background: url(/static/vnst/img/login/with_code.png) no-repeat;
                        .subbtn {
                            bottom: 10px;
                        }
                    }
                    &.noCode {
                        background: url(/static/vnst/img/login/no_code.png) no-repeat;
                        .subbtn {
                            bottom: 64px;
                        }
                    }

                    .title {
                        width: 100%;
                        height: 24px;
                        margin-bottom: 12px;
                        background: url(/static/vnst/img/login/title.png) center center no-repeat;
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
                            background: url(/static/vnst/img/login/user_input.png) no-repeat center center;
                        }
                        &.pwd_box {
                            background: url(/static/vnst/img/login/pwd_input.png) no-repeat center center;
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
                                background: url(/static/vnst/img/login/login_btn.png) no-repeat center center;
                                background-size: contain;

                                &:hover {
                                    color: #fefba6;
                                }
                            }
                            &.forget {
                                background: url(/static/vnst/img/login/forget_pwd.png) no-repeat center center;
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
                        background: url(/static/vnst/img/login/register_btn.png) no-repeat center center;
                        width: 83%;
                        height: 42px;
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

    .header-login {
        width: 100%;
        height: 55px;
        background: #0c0c0c;
        z-index: 1;
        border-bottom: 1px solid #0c0c0c;

        #loginForm {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            // padding-left: 360px;
            .header-logincon {
                background: url(/static/vnst/img/headerlogin.png) left center no-repeat;
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
                    background: url(/static/vnst/img/forget.png) no-repeat;
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
                    background: url(/static/vnst/img/subbtn.png) no-repeat;
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
                    background: url(/static/vnst/img/regbtn.png) top center no-repeat;
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

        .w1000 {
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
            // padding-left: 371px;
            .left {
                min-width: 250px;
                height: 100%;
                text-align: left;
                display: flex;
                align-items: center;
                margin-left: 96px;
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
                            background: url('/static/vnst/img/refresh.png') center center no-repeat;
                            // transform: scale(1.2);
                            margin-top: 17px;
                        }
                        .newfresh{
                            background:url('/static/vnst/img/newfresh.png') no-repeat center;
                        }
                        .fres{
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
                            background: url(/static/vnst/img/log_out.png) center center no-repeat;
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
        background: url(/static/vnst/img/noticebg.png) repeat-x;

        .w1000 {
            width: 1040px;
            height: 100%;
            margin: auto;
            span {
                font-size: 12px;
                background: url(/static/vnst/img/notice.png) left center no-repeat;
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

.header-top .lang {
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
.header .nav .subnav {
    position: absolute;
    line-height: 36px;
    left: -42px;
    top: 86px;
    z-index: 99;
    display: none;
    padding-top: 5px;
}
.header .nav .subnav .jt {
    background: url(/static/vnst/img/menujt.png) no-repeat;
    height: 5px;
    width: 9px;
    display: block;
    margin: 0 auto;
}
.header .nav .subnav .con {
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
.FISHING:hover{
    .subnav{
        display: block;
    }
}
.GAME:hover{
    .subnav{
        display: block;
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