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
                    <!-- <a href="javascript:void(0)" @click="goView('/home')" class="logo"></a> -->
                    
                    <div class="middle"><img src="/static/amjs/img/logo/logo.gif" width="300px" alt="">
                        <div class="theHttp" v-if="$store.state.mainState.loginOrout"><img src="/static/amjs/img/domain.png" alt=""></div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="someNew">
                                <div class="capital" style="margin-top:10px;position: relative;top: 15px;left: 20px;">
                                    <span>
                                        <img src="/static/amjs/img/lan_01.png" alt="">
                                        <img src="/static/amjs/img/lan_02.png" alt="">
                                        <img src="/static/amjs/img/lan_03.png" alt="">
                                    </span>
                                    <span class="time" style="display: inline-block;height: 16px;position:relative;top:2px;left:5px;font-size:14px;border-left:1px solid #696969;padding-left: 10px;">
                                        <img src="/static/amjs/img/icon_time.png" style="width:12px;position:relative;top:2px;left:-2px;" alt="">
                                        <span id="mdtime" data-nowtime="2019/03/29 02:34:04">美东时间: {{time}}</span>
                                    </span>
                                </div>
                            </div>
                            <ul>
                                <li class="colors-change detection" @click="goHeader(0)">线路检测</li>
                                <li class="colors-change jiebei" @click="goHeader(1)">免息借呗</li>
                                <li class="colors-change guanjia" @click="goHeader(2)">金管家</li>
                                <li class="colors-change download" @click="goHeader(4)" >APP下载</li>
                                <li class="colors-change suggestion" @click="advice">投诉建议</li>
                            </ul>
                        </div>
                        <!-- 登录后 -->
                        <div class="header-login">
                            <div class="w1000">
                                
                                <div v-if="!$store.state.mainState.loginOrout" class="img" style="position: relative;top: -8px;left: 90px;padding: 0 0 30px 0;height: 63px;">
                                    <img src="/static/amjs/img/domain.png" alt="">
                                    <img src="/static/amjs/img/head_log.png" alt="">
                                </div>
                                <div class="left" v-if="$store.state.mainState.loginOrout">
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
                                <div class="right" v-if="$store.state.mainState.loginOrout">
                                    <span>
                                        <a href="javascript:void(0)" @click="$goUserCen('recharge',0)">我要存款</a>&nbsp; |&nbsp;
                                        <a href="javascript:void(0)" @click="$goUserCen('withdraw',0)">我要取款</a>&nbsp; |&nbsp;
                                        <!-- <a href="javascript:void(0)" @click="goUserCen('personage',2)">下注记录</a>&nbsp; | &nbsp; -->
                                        <a href="javascript:void(0)" @click="$goUserCen('discounts',0)">时时返水</a>&nbsp; |&nbsp;
                                        <a href="javascript:void(0)" @click="$goUserCen('personage',0)" >会员中心</a>&nbsp; |&nbsp;
                                        <a href="javascript:void(0)" @click="$goUserCen('message',0)" class="unread_msg">
                                            站内信
                                            <font  id="user_num" style="color:yellow;">{{allUnReadCount}}</font>
                                            <!-- <font id="user_num" style="color:yellow;">22</font> -->
                                        </a>
                                        <a class="logOut" href="javascript:void(0)" @click="logout">登出</a>
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        
        
        <!-- 头部导航 -->
        <div class="header-float">
            <div class="navbg">
                <div class="nav w1000">
                    <ul id="head-container">
                        <li v-for="(item,index) in classListData" :class="item.text" :key="index" @click="$goPath('one',item)">
                            <a href="javascript:void(0)"  @click="$goPath('one',item)" class="nav_item">
                                <i class="ico" :class="item.ico"></i>
                                <span class="ch">{{item.name}}</span>
                                 <img v-if="item.hot == true" src="/static/amjs/img/hot.gif" alt="hot">
                            </a>
                            <div class="subnav" v-if="item.list&&item.list.length>0">
                                <span class="jt"></span>
                                <div class="con">
                                    <a v-for="(v,i) in item.list" :key="i" href="javascript:void(0)" style="position:relative;" @click.stop="$goPath('nav',v)">
                                        {{v.name}}
                                        <img src="/static/amjs/img/hot.gif" style=" position: absolute; z-index: 99; right: 5px;" v-if="[173,11421,11729,10022,10018,10021,11320,243,10613,10695].includes(v.id)">
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
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
import freshButton from '../../public/home/freshButton';
import data1 from '../../public/user/login';
export default {
    mixins: [data1],
    data() {
        return {
            showHeader:false,
            lantern: '',
            headerList:[
                {name:'手机投注',id:"1"},
                {name:'电子优惠10+9',id:"2"},
                {name:'电子棋牌升级',id:"3"},
                {name:'竞技榜',id:"4"},
                {name:'真人升级',id:"5"},
                {name:'代理加盟',id:"6"},
                {name:'活动大厅',id:"7"},
                {name:'APP下载',id:"8"},
                {name:'快速充值',id:"9"},
                {name:'备用网址',id:"10"},
            ],
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
            showLog:false,
            allUnReadCount:10,
            codeImg:"/static/amjs/img/new_games/lo.png",
            freh: {
                borderBottom: '7px solid #696969'
            },
            navId:0,
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
            
            sportsArr:[],
            passKey: {
                userName: '',
                password: '',
                code: ''
            }
        };
    },
    methods: {
        newshowfresh(){
            if(this.balanceRefreshing) this.showfresh=false
               else this.showfresh=true
        },
        logout() {
            UserService.logout.call(this);
        },
        goKaihu() {
             this.$router.push('/home/register');
        },
        goHeader(typeNum) {
            if (typeNum == 0) {
                // 线路检测
                window.open('https://4447.com/', '_blank');
            } else if (typeNum == 1) {
                // 借呗
                 if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                      //window.open('/static/amjs/html/active/jiebei/index.html');
                   }
                  }else{
                    // window.open('/static/amjs/html/active/jiebei/index.html');
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
                window.open('/static/amjs/html/download/index.html');
            }
        },
        getNativeDatas() {
            if (localStorage.chess_game_new) {
                this.classListData[1].list = this.$gameClassV4("chess");
            }
            if (localStorage.sport_game_new) {
                this.classListData[6].list = this.$gameClassV4("sport");
            }
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
        },
        //点击展示公告列表
        showTextModal(){
            if(this.lanternData.total>0){
                this.$store.commit('alert/showTextTip', true)
            }else{
                return false
            }  
        },
        //走马灯
        async getLantern () {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type:"PC"
            })
            if (res && res.code == 200) {
                if(res.data.data.length){
                    this.lantern = res.data.data[0] && res.data.data[0].description
                }else{  
                    return false;
                }
            }
        },
        //是否已登录
        isLogged() {
            if (this.userinfo) {
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
                window.open('/static/amjs/html/download/index.html');
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
        },
        
    },
    mounted() {
        this.getLantern();
        this.isLogged();
        this.getNativeDatas();
        let time = setInterval(this.getTimes, 1000);
        this.shake($('.colors-change'), 'resd', -1);
        this.shake($('.blingColor'), 'resd', -1);
        if (this.$route.path == '/home') {
            this.isShow = true;
            this.showLittlePic = false;
            this.logShow = true;
            // this.loggedIn = false;
            this.showHeader = false;
        } else {
            // this.loggedIn = true;
            this.isShow = false;
            this.logShow = false;
            this.showHeader = true;
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
        userinfo(val){
            if (val) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        },
        $route() {
            if (this.$route.path == '/home') {
                this.isShow = true;
                this.showLittlePic = false;
                this.logShow = true;
                this.loggedIn = true;
                this.showHeader = false;
            } else {
                this.showHeader = true;
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
            let bg = '/static/amjs/img';
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
* {
    margin: 0;
    padding: 0;
}
.resd {
    color: #ff0000 !important;
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

.header-login {
    width: 100%;
    height: 45px;
    z-index: 1;
    margin-top: 34px;
    margin-left: -28px;
    .w1000 {
        color: #fff;
        width: 780px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 4;
        display: flex;
        .left {
            min-width: 250px;
            height: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            margin-left: 10px;
            span {
                height: 100%;
                line-height: 45px;
                font-size: 14px;
                padding: 0 1px 0 0;

                &.account {
                    // margin: 0 6px 0 0px;
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
                        background: url('/static/amjs/img/refresh.png') center center no-repeat;
                        // transform: scale(1.2);
                        margin-top: 13px;
                    }
                    .newfresh{
                        background:url('/static/amjs/img/newfresh.png') no-repeat center;
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
        .logOut {
            display: inline-block;
            width: 62px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #000;
            background: url(/static/amjs/img/log_out.png) center center no-repeat;
            background-size: contain;
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
        .right {
            flex: 1;
            // margin-left: -86px;
            span {
                a {
                    font-size: 14px;

                }
            }
        }
    }
}
.header-float {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    z-index: 9999 !important;

    .navbg {
        height: 90px;

        .nav {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            
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
                                background: url(/static/amjs/img/homeico.png) no-repeat center center;
                            }
                            &.elec {
                                background: url(/static/amjs/img/elecico.png) no-repeat center center;
                            }
                            &.chess {
                                background: url(/static/amjs/img/chess_icon.png) no-repeat center center;
                            }
                            &.casino {
                                background: url(/static/amjs/img/casinoico.png) no-repeat center center;
                            }
                            &.lottery {
                                background: url(/static/amjs/img/lotteryico.png) no-repeat center center;
                            }
                            &.fishing {
                                background: url(/static/amjs/img/fishingico.png) no-repeat center center;
                            }
                            &.esport {
                                background: url(/static/amjs/img/esportico.png) no-repeat center center;
                            }
                            &.promo {
                                background: url(/static/amjs/img/promoico.png) no-repeat center center;
                            }
                            &.service {
                                background: url(/static/amjs/img/serviceico.png) no-repeat center center;
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

.indexHeader {
    width: 100%;
    // background: #161616;
    background: url('/static/amjs/img/header_bg.jpg')no-repeat;
    background-size: 100% 100%;
    border-bottom: 1px solid #303030;
    z-index: 100;
    position: relative;
    .headerNav {
        position: relative;
        width: 100%;
        // height: 140px;
        margin: 0 auto;
        z-index: 9999 !important;
        background: #000;
        .header_nav{
            height: 50px;
            background: rgba(0,0,0,0.6);
            #headContainer {
                flex: 1;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                z-index: 1000;
                width: 1074px;
                margin: 0 auto;
                li {
                    margin: 0;
                    height: 100%;
                    text-align: center;
                    position: relative;
                    border-bottom: 3px solid transparent;
                    transition: all 0.6s ease-in-out;
                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        height: 100%;
                        width: 118px;
                        padding-top: 5px;
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
                                background: url(/static/amjs/img/home/homeico.png) no-repeat center center;
                            }
                            &.elec {
                                background: url(/static/amjs/img/home/elecico.png) no-repeat center center;
                            }
                            &.chess {
                                background: url(/static/amjs/img/home/chess_icon.png) no-repeat center center;
                            }
                            &.casino {
                                background: url(/static/amjs/img/home/casinoico.png) no-repeat center center;
                            }
                            &.lottery {
                                background: url(/static/amjs/img/home/lotteryico.png) no-repeat center center;
                            }
                            &.fishing {
                                background: url(/static/amjs/img/home/fishingico.png) no-repeat center center;
                            }
                            &.esport {
                                background: url(/static/amjs/img/home/esportico.png) no-repeat center center;
                            }
                            &.promo {
                                background: url(/static/amjs/img/home/promoico.png) no-repeat center center;
                            }
                            &.service {
                                background: url(/static/amjs/img/home/serviceico.png) no-repeat center center;
                            }
                        }

                        span {
                            position: relative;
                            font-size: 14px;
                            color: #fff;
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
                    &:hover{
                        >a {
                            background: url('/static/amjs/img/nav_hover.png')no-repeat center center;
                            background-size: 100px 30px;
                            background-position-y: 10px;
                            span {
                                color: #6e3a0f;
                            }
                        }
                    }
                    .subnav {
                        position: absolute;
                        line-height: 36px;
                        left: -14px;
                        top: 48px;
                        z-index: 99;
                        display: none;
                        padding-top: 5px;

                        .jt {
                            background: url(/static/amjs/img/home/arrow_top.png) no-repeat;
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
        .navWrapper {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            .container{
                width: 1000px;
                margin: 0 auto;
                height: 100%;
                display: flex;
                
                
                .middle{
                    width: 30%;
                    text-align: center;
                        margin-left: -3px;
                }
                .right{
                    // width:40%;
                    position: relative;
                    padding-top: 10px;
                    margin-left: -1px;
                    .someNew{
                        
                    }
                    div{
                        display: flex;
                        ul{
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-end;
                            position: relative;
                            top:13px;
                            left:100px;
                            li{
                                border-right: 1px solid #696969;
                                padding: 0 6px;
                                font-size:12px;
                                color: #fff;
                                margin: 15px 0 0 0;
                                cursor: pointer;
                                height: 12px;
                                &:last-child{
                                    border: none;
                                    // padding-right: 0;
                                }
                            }
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
        }
        .loginForm2{
            width: 232px;
            height: 239px;
            background: url('/static/amjs/img/login_bg02.png') no-repeat center center;
            position: absolute;
            top: 207px;
            right: 221px;
            .alreadyLogin{
                    height: 185px;
                    margin-top: 50px;
                    margin-left: 30px;
                p{
                    height: 30px;
                    line-height: 30px;
                    span{
                        font-size: 12px;
                        color:#fff;
                        &:last-child{
                            color: #FDE04E;
                        }
                    }
                }
                div{
                    span{
                        display: inline-block;
                        padding: 0 6px 0 1px;
                        border-right: 1px solid #fff;
                        font-size: 12px;
                        margin-top: 10px;
                        color:#fff;
                        cursor: pointer;
                        &:last-child{
                            border: none;
                        }
                        &:nth-child(3){
                            border: none;
                        }
                    }
                }
            }
            .login_title{
                width: 114px;
                height: 18px;
                margin: 20px auto;
                background: url('/static/amjs/img/login_title.png') no-repeat;
                background-size: 100% 100%;
                
            }
            
            i{
                display: inline-block;
                width: 30px;
                height: 30px;
                position: absolute;
            }
            .icon1{
                background: url('/static/amjs/img/icon_id.png') no-repeat;
                top: 68px;
                left: 30px;
            }
            .icon2{
                background: url('/static/amjs/img/icon_pw.png') no-repeat;
                top: 110px;
                left: 32px;
            }
            .icon3{
                background: url('/static/amjs/img/icon_yz.png') no-repeat;
                top: 151px;
                left: 32px;
            }
            .codeimg{
                display: inline-block;
                position: absolute;
                top: 142px;
                left: 152px;
                cursor: pointer;
            }
            .forget{
                text-align: center;
                font-size: 12px;
                color: #fff1bb;
                padding: 7px 0 0 0;
                cursor: pointer;
            }
            .login{
                width: 194px;
                margin: 0 auto;
                display: flex;
                span{
                    cursor: pointer;
                    display: inline-block;
                    width: 92px;
                    height: 34px;
                    font-size: 12px;
                    line-height: 34px;
                    text-align: center;
                    color:#6E3A0F;
                    background: url('/static/amjs/img/btn_reg.png') no-repeat;
                    background-size: 100% 100%;
                    &:first-child{
                        margin-right: 10px;
                        color: #fff;
                        background: url('/static/amjs/img/btn_login.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            input{
                display: block;
                width: 162px;
                height: 34px;
                margin: 0 auto 5px;
                padding-left: 30px;
                color: #fff1bb;
                line-height: 32px;
                font-size: 13px;
                background-position: 10px center;
                background-color: transparent;
                border: 1px solid #322f2f;
                box-sizing: initial;
                position: relative;
            }
            input::-webkit-input-placeholder {
                color:#fff1bb!important;
            }
        }
    }
    

}
.nav .subnav {
    position: absolute;
    line-height: 36px;
    left: -42px;
    top: 86px;
    z-index: 99;
    display: none;
    padding-top: 5px;
}
.nav .subnav .jt {
    background: url(/static/amjs/img/menujt.png) no-repeat;
    height: 5px;
    width: 9px;
    display: block;
    margin: 0 auto;
}
.nav .subnav .con {
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



</style>