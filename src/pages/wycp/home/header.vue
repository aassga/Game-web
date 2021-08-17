<template>
    <div class="new-header">
        <div class="cont_top">
            <div class="logo"></div>
            <div class="logo_right"></div>
            <div class="login_er">
                <div class="login_top">
                    <ul>
                        <li><a target="_blank" href="javascript: void(0)" @click="addFavorite('E彩票')">加入收藏</a></li>
                        <li>|</li>
                        <li><a class="box" href="#/home/agent">代理加盟</a></li>
                        <li>|</li>
                        <li><a class="box" target="_target" href="/static/wycp/html/download/index.html">手机投注</a></li>
                        <li>|</li>
                        <li><a target="_blank" href="http://w0661.com">导航网址</a></li>
                    </ul>
                </div>
                <div class="login_bottom">
                    <div class="login_beforn" v-if="!$store.state.mainState.loginOrout">
                        <div class="open_account"><a @click="$router.push('/home/register')"></a></div>
                        <div class="text_right">
                            <div class="text_right_top">
                                <ul>
                                    <li><input autocomplete="off" type="text" class="username" placeholder="帐号" maxlength="20"
                                            v-model="passKey.userName" @blur="getCode"></li>
                                    <li v-if="code_show"><input type="text" autocomplete="off" class="code" placeholder="验证码" maxlength="4"
                                            v-model="passKey.code" @keyup.13="login"></li>
                                    <li v-if="code_show" style="margin-left: 3px;"><img :src="codeImg" @click="getCode"
                                            style="width: 60px;height: 25px;"></li>
                                </ul>
                            </div>
                            <div class="text_right_bottom">
                                <ul>
                                    <li><input autocomplete="off" type="password" class="password" placeholder="密码" maxlength="20"
                                           @keyup="clearNull" v-model="passKey.password" @keyup.13="login">
                                    <li><a class="btn_log" @click="login"></a></li>
                                    <li><a class="pasd" @click="$forget()">忘记密码？</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="login_enter" v-if="$store.state.mainState.loginOrout">
                        <div class="login_enter_top">
                            <dl>
                                <dd>
                                    <p><a style="background: url(/static/wycp/img/ai.png) center left no-repeat;"
                                            href="#">{{userinfo.userName}}</a></p>
                                    <p><a style="color: #f9e284;" @click="logout">退出</a></p>
                                </dd>
                                <dd class="login_enter_right">
                                    <span>
                                        <a class="balance">{{userinfo ? userinfo.balance : ''}}</a>
                                        <a class="refresh_login" style="position:relative" @mouseover='newshowfresh'
                                            @mouseout='showfresh=false' :class="[balanceRefreshing ?'fres':'',isclick ?'refresh':'']"
                                            @click="getBalance">
                                        </a>
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <div class="login_enter_bottom">
                            <ol>
                                <li><a @click="$goUserCen('personage',0)">会员中心</a></li>
                                <li>|</li>
                                <li><a @click="$bindPhoneOrbank()">存款</a></li>
                                <li>|</li>
                                <li><a @click="$goUserCen('withdraw',0)">取款</a></li>
                                <li>|</li>
                                <li><a @click="$goUserCen('personage',2)">投注记录</a></li>
                                <li>|</li>
                                <li><a @click="$goUserCen('discounts',0)">实时返水</a> </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cont-bottom cen">
            <div class="wraper">
                <ul class="nav-wrap clearfix">
                    <li @click.stop="$goPath('one',item)" class="nav" :class="{'navActive':navActive==index&&index!==1}" :key=index
                        v-for="(item,index) in navList1">
                        <span class="icon-hot1" v-if="item.hot"></span>
                        <a href="javascript:;">
                            <span>
                                {{item.name}}<br>
                                <b>{{item.tag}}</b>
                            </span>
                        </a>
                        <div class="sub-nav clearfix" v-if="item.child" :class="{newNav:item.tag=='Sports'}">
                            <div class="sub" v-for="(sub,i) in item.child" :key="i" @click.stop="goGame(sub,item.tag)">
                                <span class="icon-hot1" v-if="sub.hot"></span>
                                <a href="javascript:;">
                                    <img :src="sub.icon" alt="">
                                </a>
                                <span>{{sub.name}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS } from '@/service/public/service.js';
import freshButton from '../../public/home/freshButton';
import data1 from '../../public/user/login';

export default {
    mixins: [ data1],
    data() {
        return {
            isclick:false,
            balanceRefreshing:false,
            showfresh:false,
            navList1: [
                {
                    name: '网站首页',
                    tag: 'Home',
                    link: '/home'
                },
                {
                    name: '购彩大厅',
                    tag: 'Lottery',
                    link: '/plays/hall',
                    hot: true,
                    type:'lottery',
                    child: [
                        {
                            name: '快速时时彩',
                            icon: '/static/public/image/lottery/nico/png/16.png',
                            path: '/plays/tradition/16',
                            lid:16,
                        },
                        {
                            name: '三分时时彩 ',
                            icon: '/static/public/image/lottery/nico/png/17.png',
                            path: '/plays/tradition/17',
                            lid:17,
                        },
                        {
                            name: '欢乐生肖 ',
                            icon: '/static/public/image/lottery/nico/png/4.png',
                            path: '/plays/tradition/4',
                            hot: true,
                            lid:4,
                        },
                        {
                            name: '快速赛车',
                            icon: '/static/public/image/lottery/nico/png/12.png',
                            path: '/plays/tradition/12',
                            hot: true,
                            lid:12,
                        },
                        {
                            name: '快乐赛车',
                            icon: '/static/public/image/lottery/nico/png/13.png',
                            path: '/plays/tradition/13',
                            lid:13,
                        },
                        {
                            name: '北京赛车',
                            icon: '/static/public/image/lottery/nico/png/2.png',
                            path: '/plays/tradition/2',
                            lid:2,
                        },
                        {
                            name: '幸运飞艇',
                            icon: '/static/public/image/lottery/nico/png/3.png',
                            path: '/plays/tradition/3',
                            hot: true,
                            lid:3,
                        },
                        {
                            name: '快速六合彩',
                            icon: '/static/public/image/lottery/nico/png/18.png',
                            path: '/plays/tradition/18',
                            hot: true,
                            lid:18,
                        },
                        {
                            name: '香港六合彩',
                            icon: '/static/public/image/lottery/nico/png/1.png',
                            path: '/plays/tradition/1',
                            lid:1,
                        },
                        {
                            name: '广东快乐十分',
                            icon: '/static/public/image/lottery/nico/png/5.png',
                            path: '/plays/tradition/5',
                            hot: true,
                             lid:5,
                        },
                        {
                            name: '幸运赛车',
                            icon: '/static/public/image/lottery/nico/png/3630.png',
                            path: '/plays/tradition/3630',
                            lid:3630,
                        },
                        {
                            name: '广东11选5',
                            icon: '/static/public/image/lottery/nico/png/7.png',
                            path: '/plays/tradition/7',
                            lid:7,
                        },
                        {
                            name: '三分快3',
                            icon: '/static/public/image/lottery/nico/png/3631.png',
                            path: '/plays/tradition/3631',
                            lid:3631
                        },
                        {
                            name: '香港赛马',
                            icon: '/static/public/image/lottery/nico/png/10044.png',
                            path: '/plays/tradition/10044',
                            lid:10044,
                        },
                        {
                            name: '江苏快3',
                            icon: '/static/public/image/lottery/nico/png/9.png',
                            path: '/plays/tradition/9',
                            lid:9
                        }
                    ]
                },
                { name: '棋牌游戏', link: '/home/chess?navid=9&id=0', tag: 'CHESS' },
                {
                    name: '真人娱乐',
                    tag: 'Casino',
                    link: '/home/live',
                    hot: true
                },
                {
                    name: '体育投注',
                    tag: 'Sports',
                    link: '/home/tiyu',
                    hot: true,
                },
                {
                    name: '电子游艺',
                    tag: 'Game',
                    link: '/home/slot?navid=9&id=0',
                    hot: true
                },
                {
                    name: '捕鱼达人',
                    tag: 'Fishing',
                    link: '/home/fish?navid=9&id=0'
                },
                {
                    name: '优惠活动',
                    link: '/home/youhui',
                    tag: 'Activity',
                    hot: true
                },
                {
                    name: '在线客服',
                    tag: 'Official',
                    link: 'service',
                    type: 'service'
                }
            ]
        };
    },
    methods: {
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
        },
        goGame(a,b){
            if(b == 'Lottery'){
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
        logout() {
            UserService.logout.call(this);
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
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
        navActive() {
            return this.$store.state.hsyl.navActive;
        }
    },
    created() {
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
    beforeDestroy() {},
    components: {
        freshButton
    },
    watch: {},
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
.clearfix::after {
    content: '.';
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;
}
.clearfix {
    zoom: 1;
}
.new-header {
    background: url(/static/wycp/img/header_top_bj.jpg) center top repeat;
    font-family: 'Microsoft Yahei', 'SimHei', 'SimSun', Geneva, sans-serif;

    .fl {
        float: left;
    }

    .cen {
        width: 1050px;
        margin: 0 auto;
    }

    .cont_top {
        width: 1000px;
        margin: auto;
        height: 115px;

        .logo {
            width: 310px;
            background: url(/static/wycp/img/e_logo.png) center left no-repeat;
            height: 115px;
            float: left;
            cursor: pointer;
        }
        .logo_right {
            background: url(/static/wycp/img/head_middle.png) center 16px no-repeat;
            width: 205px;
            height: 115px;
            float: left;
        }
        .login_er {
            width: 465px;
            height: 115px;
            float: right;

            .login_top {
                height: 40px;
                line-height: 40px;
                width: 465px;
                font-size: 12px;

                li {
                    float: right;
                    margin-left: 5px;
                    color: #92483c;

                    a {
                        color: #fff;
                        &.goToMobile {
                            background: url(/static/wycp/img/mobile.png) no-repeat 5px 4px;
                            width: 28px;
                            height: 28px;
                            display: block;
                        }
                    }
                }
            }
            .login_bottom {
                height: 74px;

                .open_account a {
                    display: block;
                    background: url(/static/wycp/img/register.png) no-repeat;
                    width: 120px;
                    height: 60px;
                    float: left;
                    &:hover {
                        background: url(/static/wycp/img/register.png) no-repeat;
                        background-position: 0px -60px;
                    }
                }
                .text_right {
                    width: 310px;
                    height: 74px;
                    float: right;

                    .text_right_top {
                        height: 28px;

                        li {
                            float: left;
                            input {
                                color: #fff;
                                outline: none;
                                background: linear-gradient(#3f0400, #4d0600, #4d0600);
                                font-size: 10px;
                                padding: 0 3px;
                                text-indent: 3px;

                                &.username {
                                    border-radius: 3px;
                                    width: 150px;
                                    height: 25px;
                                    border: 1px #881209 solid;
                                }
                                &.code {
                                    width: 70px;
                                    height: 25px;
                                    border: 1px #881209 solid;
                                    border-radius: 3px;
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                    .text_right_bottom {
                        margin-top: 5px;

                        li {
                            float: left;
                            height: 25px;
                            line-height: 25px;

                            input {
                                color: #b06f60;
                                font-size: 10px;
                                padding: 0 3px;
                                outline: none;
                                text-indent: 3px;

                                &.password {
                                    background: linear-gradient(#3f0400, #4d0600, #4d0600);
                                    border: none;
                                    border-radius: 3px;
                                    width: 150px;
                                    height: 25px;
                                    border: 1px #881209 solid;
                                }
                            }

                            .btn_log {
                                display: block;
                                background: url(/static/wycp/img/Login_btn.png) center no-repeat;
                                width: 70px;
                                height: 25px;
                                margin-left: 10px;
                                margin-top: 1px;
                            }
                            .pasd {
                                margin-left: 13px;
                                color: #f8eeab;
                                position: absolute;
                                font-size: 12px;
                            }
                        }
                    }
                }

                .login_enter {
                    border: 1px #d73939 solid;
                    width: 350px;
                    height: 65px;
                    float: right;
                    border-radius: 3px;

                    .login_enter_top {
                        border-bottom: 1px #d73939 solid;
                        height: 33px;
                        line-height: 33px;

                        dl dd {
                            float: left;
                            width: 174px;
                            height: 33px;
                            line-height: 33px;
                            &.login_enter_right {
                                background: #a90909;
                            }

                            p {
                                float: left;
                                height: 33px;
                                line-height: 33px;
                                width: 85px;
                                text-align: center;

                                a {
                                    padding-left: 25px;
                                    color: #fff;
                                    font-size: 13px;
                                }
                            }
                            span a {
                                display: block;
                                float: left;
                                color: #fff;
                                font-size: 12px;

                                &.balance {
                                    width: 140px;
                                    padding-left: 5px;
                                }
                                &.refresh_login {
                                    background: url(/static/wycp/img/shuaxin.png) center right no-repeat;
                                    width: 20px;
                                    height: 33px;
                                }
                                &.refresh {
                                    background: url(/static/wycp/img/newshuaxin.png) center right no-repeat;
                                }
                            }
                        }
                    }
                    .login_enter_bottom ol li {
                        float: left;
                        line-height: 32px;
                        margin-left: 14px;
                        color: #fff;

                        a {
                            color: #fff;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .cont-bottom {
        @h: 66px;
        width: 100%;
        min-width: 1000px;
        height: @h;
        background: #b62929;
        border-top: 1px solid #d1bfa5;
        border-bottom: 1px solid #d1bfa5;

        .wraper {
            width: 980px;
            margin: 0 auto;
            display: flex;
            &::after {
                content: '';
                display: block;
                clear: both;
            }
            .nav-wrap {
                li {
                    position: relative;
                    display: inline-block;
                    height: 66px;
                    list-style: none;
                    font-size: 15px;

                    &:hover .sub-nav {
                        display: block;
                        transform: translateX(-50%);
                    }

                    &.navActive {
                        background: #f14a4a;
                    }

                    a {
                        display: block;
                        height: @h;
                        text-decoration: none;
                        overflow: hidden;
                        color: #ffffff;
                        font-size: 15px;
                        padding: 0 24px;
                        text-align: center;

                        &:hover {
                            background: #f14a4a;
                        }

                        span {
                            display: block;
                            padding-top: 18px;

                            b {
                                line-height: 23px;
                                font-size: 12px;
                                font-weight: normal;
                            }
                        }
                    }

                    .icon-hot1 {
                        background: url(/static/wycp/img/hot1.gif);
                        top: 0px;
                        margin-left: 76px;
                        width: 24px;
                        height: 18px;
                        display: block;
                        position: absolute;
                    }

                    .sub-nav {
                        z-index: 66666;
                        position: absolute;
                        left: 121.5px;
                        top: 66px;
                        min-width: 476px;
                        padding: 8px 8px;
                        background-color: rgba(0, 0, 0, 0.8);
                        display: none;
                        border-radius: 8px;
                        &::after {
                            display: block;
                            position: absolute;
                            left: 37%;
                            transform: translateX(-50%);
                            width: 0;
                            height: 0;
                            border-width: 0 8px 10px;
                            border-style: solid;
                            border-color: transparent transparent rgba(0, 0, 0, 0.8); /*透明 透明  灰*/
                            margin: 40px auto;
                            top: -49px;
                        }

                        .sub {
                            text-align: center;
                            width: 92px;
                            line-height: 15px;
                            margin: 10px 0;
                            height: 100px;
                            float: left;
                            position: relative;
                            color: #fff;

                            &:hover {
                                background: rgba(96, 96, 96, 0.8);
                                border-radius: 10px;
                            }

                            a {
                                display: inline-block;
                                width: 80px;
                                height: 80px;
                                padding: 0 0 18px 0;
                                background: url(/static/wycp/img/game-icon-bg.png) no-repeat;
                                border-radius: 10px;

                                img {
                                    width: 60px;
                                    border-radius: 50%;
                                    margin-top: 8px;
                                }
                            }

                            span {
                                font-size: 13px;
                            }
                        }
                    }
                    .newNav {
                        min-width: 300px;
                        left: 46.5px;
                        &::after {
                            left: 52%;
                        }
                    }
                }
                li:nth-child(1) {
                    margin-left: 8px;
                }
            }
        }
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
