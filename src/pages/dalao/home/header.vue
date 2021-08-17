<template>
    <div class="new-header">
        <div class="cont-top cen">
            <div class="wraper">
                <div v-if="!$store.state.mainState.loginOrout" class="login-before">
                    <div class="head_logo">
                        <p>
                            <img src="/static/dalao/img/head_logo_img.png" alt="">
                            PLAY RESPONSIBLY
                        </p>
                    </div>
                    <div class="head_right">
                        <div class="input_enter acc">
                            <p>
                                <input autocomplete="off" v-model="passKey.userName" @blur="getCode" placeholder="帐号" type="text"
                                    id='userName'>
                            </p>
                        </div>
                        <div class="input_enter pas">
                            <p>
                                <input autocomplete="off" maxlength="20" type="password" v-model="passKey.password" placeholder="密码"
                                  @keyup="clearNull" @keyup.13="login">
                            </p>
                        </div>
                        <div class="input_enter code" v-if="code_show">
                            <p>
                                <input autocomplete="off" maxlength="4" v-model="passKey.code" placeholder="验证码" type="text"
                                    @keyup.13="login">
                                <span class="img">
                                    <img :src="codeImg" alt="" @click="getCode">
                                </span>
                            </p>
                        </div>
                        <a class="in_sub" href="javascript:void(0);" @click="login">登录</a>
                        <router-link class="in_sub" to="/home/register">注册</router-link>
                        <a class="in_sub" target="_blank" href="http://6660031.com/">导航站</a>
                        <a class="mian" @click="jiebei">免息借呗</a>
                        <a href="javascript:void (0)" @click="goAgent" class="bt"><img src="/static/dalao/img/home/daili.gif" alt=""></a>

                        <a class="bt" href="javascript:void(0);" @click="$forget()">忘记密码</a>
                    </div>
                </div>
                <div v-if="$store.state.mainState.loginOrout" class="login-after">
                    <p class="log_a acc">帐号:<span class="col-advertis-yellow">{{userinfo&&userinfo.userName}}</span></p>
                    <p class="log_a balance">余额:<span class="col-advertis-yellow">{{userinfo&&userinfo.balance}}</span></p>
                    <a class="link_a1" href="javascript:void(0);" @click="$goUserCen('personage',0)">会员中心</a>

                    <a class="link_a1 link_a2" href="javascript:void(0);" @click="$bindPhoneOrbank()">充值</a>

                    <a class="link_a1 link_a2 one" href="javascript:void(0);" @click="$goUserCen('withdraw',0)">提款</a>
                    <a class="link_a1 link_aw one" href="javascript:void(0);" @click="jiebei">免息借呗</a>
                    <a class="link_a1 link_a2 two" href="#plays/hall" target="_blank">下注</a>
                    <a class="link_a1 link_a2 three" href="javascript:void(0);" @click="logout">退出</a>
                </div>
            </div>
        </div>

        <div class="cont-bottom cen">
            <div class="wraper">
                <div class="logo">
                    <img src="/static/dalao/img/home/logo.png" alt="">

                </div>
                <ul class="nav-wrap clearfix">
                    <li v-for="(item,index) in navList1" :key='index' @click.stop="$goPath('one',item)" class="nav" @click="$store.state.hsyl.navActive = index" :class="{'navActive':navActive==index}" 
                        :style="{width:(882/navList1.length).toFixed(1)+'px'}">
                        <span class="icon-hot1" v-if="item.hot"></span>
                        <a href="javascript:;">
                            <span>
                                {{item.name}}<br>
                                <b>{{item.tag}}</b>
                            </span>
                        </a>
                        <div class="sub-nav clearfix" v-if="item.child">
                            <div class="sub" v-for="(sub,i) in item.child" :key="i" @click.stop="goGame(sub,item.tag)">
                                <a href="javascript:;">
                                    <img :src="sub.icon" alt="" :style="sub.dstyle">
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
import data1 from '../../public/user/login';

export default {
    mixins: [data1],
    data() {
        return {
            refreshS: false,
            checkIndex: 0,
            time: this.getTimes(new Date()),
            navList1: [
                {
                    name: '网站首页',
                    tag: 'Home',
                    link: '/home'
                },
                {
                    name: '购彩大厅',
                    tag: 'LOTTERY',
                    link: '/plays/hall',
                    hot: true,
                    type:'lottery',
                    child: [
                        {
                            name: '幸运赛车',
                            icon: '/static/public/image/lottery/nico/png/3630.png',
                            path: '/plays/tradition/3630',
                            hot: true,
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:3630
                        },
                        {
                            name: '江苏快三',
                            icon: '/static/public/image/lottery/nico/png/9.png',
                            path: '/plays/tradition/9',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:9
                        },
                        {
                            name: '北京PK10',
                            icon: '/static/public/image/lottery/nico/png/2.png',
                            path: '/plays/tradition/2',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:2
                        },
                        {
                            name: '快速赛车',
                            icon: '/static/public/image/lottery/nico/png/12.png',
                            path: '/plays/tradition/12',
                            hot: true,
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:12
                        },
                        {
                            name: '欢乐生肖',
                            icon: '/static/public/image/lottery/nico/png/4.png',
                            path: '/plays/tradition/4',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:4
                        },
                        {
                            name: '快速时时彩',
                            icon: '/static/public/image/lottery/nico/png/16.png',
                            path: '/plays/tradition/16',
                            hot: true,
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            lid:16
                        },
                        {
                            name: '香港六合彩',
                            icon: '/static/public/image/lottery/nico/png/1.png',
                            path: '/plays/tradition/1',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            hot: true,
                            lid:1
                        },
                        {
                            name: '快速六合彩',
                            icon: '/static/public/image/lottery/nico/png/18.png',
                            path: '/plays/tradition/18',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            hot: true,
                            lid:18
                        },
                        {
                            name: '三分时时彩',
                            icon: '/static/public/image/lottery/nico/png/17.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/17',
                            hot: true,
                            lid:17
                        },
                        {
                            name: '快乐赛车',
                            icon: '/static/public/image/lottery/nico/png/13.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/13',
                            hot: true,
                            lid:13
                        },
                        {
                            name: '幸运飞艇',
                            icon: '/static/public/image/lottery/nico/png/3.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/3',
                            hot: true,
                            lid:3
                        },
                        {
                            name: '广东11选5',
                            icon: '/static/public/image/lottery/nico/png/7.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/7',
                            lid:7
                        },
                        {
                            name: '三分快3',
                            icon: '/static/public/image/lottery/nico/png/3631.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/3631',
                            lid:3631
                        },
                        {
                            name: '快速快3',
                            icon: '/static/public/image/lottery/nico/png/27.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/27',
                            lid:27
                        },
                        {
                            name: '五分快3',
                            icon: '/static/public/image/lottery/nico/png/3632.png',
                            dstyle: 'width:60px;height:60px;margin-top:9px;',
                            path: '/plays/tradition/3632',
                            hot: true,
                            lid:3632
                        }
                    ]
                },
                {
                    name: '真人娱乐',
                    tag: 'Casino',
                    link: '/home/live',
                    hot: true
                },
                { name: '棋牌游戏', link: '/home/chess?navid=9&id=0', tag: 'CHESS' },
                {
                    name: '体育投注',
                    tag: 'Sports',
                    link: '/home/sport',
                },
                {
                    name: '电子游艺',
                    tag: 'Game',
                    link: '/home/slot?navid=9&id=0'
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
                    link: '/kefu',
                    tag: 'Official',
                    link: 'service',
                    type: 'service',
                }
            ]
        };
    },
    mounted() {this.shake($('.mian'), 'resd', -1);},
    methods: {
        goAgent() {
            this.$router.push('/home/agent');
        },

        getBalance() {
            this.refreshS = true;
            getS(`member/balance`).then(res => {
                if (res.code == 200) {
                    let userinfo = JSON.parse(localStorage.userinfo);
                    userinfo.balance = res.data.member;
                    userinfo.agent = res.data.agency;
                    this.$store.commit('mainState/reloadUserinfo', userinfo);
                    this.refreshS = false;
                } else {
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: '服务器报错',
                        model: 'warn'
                    });
                }
            });
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
        jiebei(){
            // 借呗
            if (localStorage.token) {
                if (this.$store.state.game.jieBeiData.show) {
                    this.$goUserCen("borrowMoney", 0);
                } else {
                    this.$goUserCen("recharge", 0);
                }
            } else {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '请先登录',
                    model: 'warn'
                });
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
            }, 500);
        }
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
        // this.is_code_show();
        
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
    store
};
</script>

<style lang="less" scoped>
.new-header {
    background: black;
    font-family: 'Microsoft Yahei', 'SimHei', 'SimSun', Geneva, sans-serif;

    .fl {
        float: left;
    }

    .cen {
        width: 1050px;
        margin: 0 auto;
    }
    .mian{
        display: inline-block;
        width: 70px;
        height: 35px;
        background: red;
        line-height: 35px;
        border-radius: 15px;
        color: blue;
        border: 1px solid blue;
        font-size: 15px;
        text-align: center;
        margin-top: 7px;
    }
    .resd {
        color: yellow !important;
        border: 1px solid yellow;
    }
    .cont-top {
        width: 100%;
        min-width: 1200px;
        height: 50px;
        overflow: hidden;
        background-color: #272524;

        .wraper {
            width: 1097px;
            margin: 0 auto;

            &::after {
                content: '';
                display: block;
                clear: both;
            }

            .login-before {
                .head_logo {
                    position: relative;
                    width: 180px;
                    left: 10px;
                    height: auto;
                    font-style: italic;
                    line-height: 50px;
                    font-size: 16px;
                    color: #ffffff;
                    float: left;

                    p {
                        float: left;
                        font-size: 14px;
                        line-height: 55px;
                        white-space: nowrap;

                        img {
                            float: left;
                            margin-top: 7px;
                            margin-right: 7px;
                        }
                    }
                }

                .head_right {
                    // padding-left: 30px;
                    // float: right;
                    display: flex;
                    justify-content: flex-end;
                    &::after {
                        content: '';
                        display: block;
                        clear: both;
                    }
                    >div{
                        margin-left: 5px;
                    }
                    >a{
                        margin-right: 5px;
                    }
                    .input_enter {
                        float: left;
                        
                        p {
                            width: 160px;
                            height: 38px;
                            overflow: hidden;
                            float: left;
                            margin-top: 7px;
                            // margin-right: 12px;

                            input {
                                width: 160px;
                                height: 38px;
                                line-height: 38px;
                                vertical-align: middle;
                                font-size: 14px;
                                color: #ffffff;
                                background-color: transparent;
                                outline: none;
                                box-sizing: border-box;
                                padding-left: 45px;
                                border: 0;
                                text-indent: 5px;
                            }
                        }

                        &.acc {
                            p {
                                background: url(/static/dalao/img/input_user_bg.png) no-repeat;
                            }
                        }

                        &.pas {
                            p {
                                background: url(/static/dalao/img/input_pass_bg.png) no-repeat;
                            }
                        }

                        &.code {
                            position: relative;
                            width: 145px;
                            margin-top: 2px;
                            margin-right: 5px;
                            p {
                                background: url(/static/dalao/img/input_code_bg.png) no-repeat;
                            }

                            input {
                                padding-left: 10px;
                                height: 32px;
                            }

                            .img {
                                float: left;
                                margin-top: 2px;
                                // margin-left: 10px;

                                img {
                                    width: 60px;
                                    height: 27px;
                                    position: absolute;
                                    right: 2px;
                                    top: 9.7px;
                                    cursor: pointer;
                                    border-bottom-right-radius: 11px;
                                    border-top-right-radius: 11px;
                                }
                            }
                        }
                    }

                    .in_sub {
                        display: block;
                        width: 60px;
                        height: 35px;
                        line-height: 34px;
                        float: left;
                        margin-top: 7px;
                        // margin-left: 10px;
                        font-size: 14px;
                        text-align: center;
                        color: #ffffff;
                        cursor: pointer;
                        background: url(/static/dalao/img/input_sub_bg.png) no-repeat;
                    }

                    .bt {
                        display: block;
                        width: 70px;
                        height: 38px;
                        line-height: 34px;
                        float: left;
                        margin-top: 7px;
                        // margin-left: 8px;
                        font-size: 14px;
                        text-align: center;
                        color: #ffffff;
                        cursor: pointer;
                        margin-right: 10px;
                        img {
                            width: 100%;
                        }
                    }
                }
            }

            .login-after {
                .log_a {
                    width: 195px;
                    height: 44px;
                    overflow: hidden;
                    float: left;
                    margin-top: 6px;
                    line-height: 40px;
                    vertical-align: middle;
                    font-size: 14px;
                    color: #ffffff;
                    text-indent: 45px;
                    margin-right: 10px;

                    &.acc {
                        background: url(/static/dalao/img/log_bg.png) left top no-repeat;
                    }

                    &.balance {
                        background: url(/static/dalao/img/log_bg.png) left -44px no-repeat;
                    }
                }
                .link_aw {
                    display: block;
                    width: 108px;
                    height: 50px;
                    overflow: hidden;
                    float: left;
                    padding-left: 43px;
                    font-size: 16px;
                    color: #ffffff;
                    line-height: 50px;
                    box-sizing: border-box;
                    margin-right: 8px;
                    background: url(/static/dalao/img/head_link_bg.png) -540px 7px no-repeat!important;

                    &:hover {
                        text-decoration: none;
                        color: #ffd830;
                        background: url(/static/dalao/img/head_link_bg.png) -540px -66px no-repeat!important;
                    }
                }
                .link_a1 {
                    display: block;
                    width: 108px;
                    height: 50px;
                    overflow: hidden;
                    float: left;
                    padding-left: 43px;
                    font-size: 16px;
                    color: #ffffff;
                    line-height: 50px;
                    box-sizing: border-box;
                    margin-right: 8px;
                    background: url(/static/dalao/img/head_link_bg.png) -108px 7px no-repeat;

                    &:hover {
                        text-decoration: none;
                        color: #ffd830;
                        background: url(/static/dalao/img/head_link_bg.png) -108px -66px no-repeat;
                    }
                }

                .link_a2 {
                    width: 90px;

                    &.one {
                        background: url(/static/dalao/img/head_link_bg.png) left 7px no-repeat;

                        &:hover {
                            text-decoration: none;
                            color: #ffd830;
                            background: url(/static/dalao/img/head_link_bg.png) left -66px no-repeat;
                        }
                    }

                    &.two {
                        background: url(/static/dalao/img/head_link_bg.png) -320px 7px no-repeat;

                        &:hover {
                            text-decoration: none;
                            color: #ffd830;
                            background: url(/static/dalao/img/head_link_bg.png) -320px -66px no-repeat;
                        }
                    }

                    &.three {
                        background: url(/static/dalao/img/head_link_bg.png) -428px 7px no-repeat;

                        &:hover {
                            text-decoration: none;
                            color: #ffd830;
                            background: url(/static/dalao/img/head_link_bg.png) -428px -66px no-repeat;
                        }
                    }
                }
            }
        }
    }

    .cont-bottom {
        width: 100%;
        min-width: 1000px;
        height: 77px;
        background: #af221f;

        .wraper {
            width: 1097px;
            margin: 0 auto;

            &::after {
                content: '';
                display: block;
                clear: both;
            }

            .logo {
                float: left;
                width: 215px;
                height: 76px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .nav-wrap {
                li {
                    position: relative;
                    display: inline-block;
                    height: 77px;
                    list-style: none;
                    font-size: 15px;

                    &:hover .sub-nav {
                        display: block;
                        transform: translateX(-50%);
                    }

                    &.navActive {
                        background: #ffd830;
                        color: #662d91;
                    }

                    a {
                        display: block;
                        height: 77px;
                        text-decoration: none;
                        overflow: hidden;
                        color: #ffffff;
                        font-size: 15px;
                        padding: 0 19px;
                        text-align: center;

                        &:hover {
                            background: #ffd830;
                            color: #662d91;
                        }

                        span {
                            display: block;
                            // min-width: 70px;
                            padding-top: 20px;

                            b {
                                line-height: 20px;
                                font-size: 12px;
                                font-weight: normal;
                            }
                        }
                    }

                    .icon-hot1 {
                        background: url(/static/dalao/img/hot1.gif);
                        top: 0px;
                        margin-left: 76px;
                        width: 24px;
                        height: 18px;
                        display: block;
                        position: absolute;
                    }

                    .sub-nav {
                        z-index: 6;
                        position: absolute;
                        left: 61.5px;
                        top: 76px;
                        width: 578px;
                        padding: 20px 34px;
                        background-color: rgba(0, 0, 0, 0.8);
                        display: none;
                        border-radius: 8px;

                        &:nth-child(2) {
                            width: 375px;
                        }

                        &::after {
                            display: block;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 26px;
                            height: 19px;

                            top: -8px;
                        }

                        .sub {
                            text-align: center;
                            width: 92px;
                            line-height: 15px;
                            margin: 5px;
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
                                background: url(/static/dalao/img/game-icon-bg.png) no-repeat;
                                border-radius: 10px;

                                img {
                                    width: 73px;
                                    height: 73px;
                                    border-radius: 50%;
                                }
                            }

                            span {
                                font-size: 12px;
                            }
                        }
                    }
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
