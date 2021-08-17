<template>
    <header>
        <div class="h-top">
            <div class="head-main">
                <div class="anto-right" v-if="!$store.state.mainState.loginOrout">
                    <a class="header-input" style="width:56px;color:#fff" target="_blank" href="http://yb22q.com">备用网址</a>
                    <input type="text" autocomplete="off" class="header-input" placeholder="帐号" v-model="passKey.userName" @blur="getCode">
                    <input type="password" autocomplete="off" class="header-input" placeholder="密码" @keyup="clearNull" v-model="passKey.password">
                    <div v-if="code_show" class="showCode">
                        <input class="header-input w-100" size="mini" autocomplete="off" placeholder="验证码" maxlength="4" type="text"
                            v-model="passKey.code"></input>
                        <img class="auth-image" :src="codeImg" alt="" @click="getCode">
                    </div>
                    <span class="login" @click="login">登录</span>
                    <span class="register" @click="register">注册</span>
                    <span class="line-kefu" @click="download">APP下载</span>
                </div>
                <div class="after-login" v-if="$store.state.mainState.loginOrout">
                    <a class="information-after-logon" style="width:56px;color:#fff;padding-top:5px;font-weight:bold" target="_blank"
                        href="http://yb22q.com">备用网址</a>
                    <div class="information-after-logon">
                        <div class="head_preleft">
                            <span class="color-ol" style="display:inline-block;margin-right:21px">欢迎您</span>
                            <span style="cursor: pointer;" class="username">
                                <span>帐号:&ensp;{{userinfo.userName}}</span>
                            </span>
                        </div>
                        <span class="line-ml"></span>
                        <div class="head_left">
                            <span class="color-ol">余额(RMB):&ensp;</span>
                            <span style="text-align: right; cursor: pointer;">
                                {{userinfo&&userinfo.balance}}
                            </span>
                            <span class="iconfont icon-refresh refresh"></span>
                        </div>
                    </div>
                    <!-- <span class="sign-out refresh" @click="getBalance">一键刷新</span> -->
                    <a href="javascript:void(0);" class="refreshbox">
                        <label style="cursor:pointer;background: linear-gradient(#fbab71,#ff7d2d);color:#fff;" for="" v-if="!showReload"
                            @click="getBalance">一键刷新</label>
                        <label style="cursor:default;background: #aeaeae;color:#fff;" for="" v-if="showReload">刷新完成</label>
                    </a>
                    <span class="sign-out" @click="$goUserCen('personage',0)">会员中心</span>
                    <span class="sign-out" @click="$goUserCen('message',0)" style="position:relative">
                        我的信息
                        <inForMation :systemmessage='systemmessage'></inForMation>
                    </span>
                    <span class="sign-out" @click="logout">登出</span>
                    <span class="sign-out kefu" @click="download">APP下载</span>
                </div>
            </div>
        </div>

        <div class="h-bottom">
            <div class="logo-nav">
                <div class="logo">
                    <a href="javascript:void(0)" @click="$router.push('/');">
                        <img src="/static/ybcp/img/home/logo.png" alt="">
                    </a>
                </div>

                <div class="nav-caidan">
                    <ul>
                        <li v-for="(item,i) in navlist1" class="nav" :class="{navActive:navActive ==i}" :key="i"
                            @click.stop="$goPath('one',item)">
                            <span class="title">{{item.name}}</span>
                            <span class="en">{{item.en}}</span>
                            <div class="sub-nav clearfix" :class="'sub-nav-'+item.en" v-if="item.sub">
                                <div class="sub" v-for="(subitem,i) in item.sub" :key="i" @click.stop="goGame(subitem,item.en)">
                                    <i v-if="subitem.hot" class="hot"></i>
                                    <a href="javascript:;">
                                        <img :src="subitem.icon" alt="">
                                    </a>
                                    <span>{{subitem.name}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS } from '@/service/public/service.js';
import data1 from '../../public/user/login';
import inForMation from '../../public/home/information.vue';
export default {
    mixins: [data1],
    data() {
        return {
            systemmessage: {
                width: ' 18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#ff0000',
                position: 'absolute',
                left: '60px',
                top: '-6px',
                color: '#fff',
                lineHeight: ' 18px',
                textAlign: 'center',
                display: 'block'
            },
            allUnReadCount:10,
            left: 5,
            top: -193,
            showReload: false,
            navlist1: [
                {
                    name: '网站首页',
                    link: '/home',
                    en: 'HOME'
                },
                {
                    name: '购彩大厅',
                    link: '/plays/hall',
                    en: 'LOTTERY',
                    type:'lottery',
                    sub: [
                        {
                            name: '快速赛车',
                            icon: '/static/public/image/lottery/nico/png/12.png',
                            path: '/plays/tradition/12',
                            hot: true,
                            lid:12
                        },
                        {
                            name: '快乐赛车',
                            icon: '/static/public/image/lottery/nico/png/13.png',
                            path: '/plays/tradition/13',
                            hot: true,
                            id:13
                        },
                        {
                            name: '幸运赛车',
                            icon: '/static/public/image/lottery/nico/png/3630.png',
                            path: '/plays/tradition/3630',
                            hot: true,
                            lid:3630
                        },
                        {
                            name: '北京赛车',
                            icon: '/static/public/image/lottery/nico/png/2.png',
                            path: '/plays/tradition/2',
                            lid:2
                        },
                        {
                            name: '香港赛马',
                            icon: '/static/public/image/lottery/nico/png/10044.png',
                            path: '/plays/tradition/10044',
                            lid:10044
                        },
                        {
                            name: '快速时时彩',
                            icon: '/static/public/image/lottery/nico/png/16.png',
                            path: '/plays/tradition/16',
                            hot: true,
                            lid:16
                        },
                        {
                            name: '三分时时彩',
                            icon: '/static/public/image/lottery/nico/png/17.png',
                            path: '/plays/tradition/17',
                            hot: true,
                            lid:17
                        },
                        {
                            name: '欢乐生肖',
                            icon: '/static/public/image/lottery/nico/png/4.png',
                            path: '/plays/tradition/4',
                            lid:4
                        },

                        {
                            name: '快速六合彩',
                            icon: '/static/public/image/lottery/nico/png/18.png',
                            path: '/plays/tradition/18',
                            lid:18
                        },
                        {
                            name: '香港六合彩',
                            icon: '/static/public/image/lottery/nico/png/1.png',
                            path: '/plays/tradition/1',
                            hot: true,
                            lid:1
                        },
                        {
                            name: '快速快三',
                            icon: '/static/public/image/lottery/nico/png/27.png',
                            path: '/plays/tradition/27',
                            lid:27
                        },
                        {
                            name: '三分快三',
                            icon: '/static/public/image/lottery/nico/png/3631.png',
                            path: '/plays/tradition/3631',
                            hot: true,
                            lid:3631
                        },
                        {
                            name: '五分快三',
                            icon: '/static/public/image/lottery/nico/png/3632.png',
                            path: '/plays/tradition/3632',
                            lid:3632
                        },
                        {
                            name: '江苏快三',
                            icon: '/static/public/image/lottery/nico/png/9.png',
                            path: '/plays/tradition/9',
                            lid:9
                        },
                        {
                            name: '快乐飞艇',
                            icon: '/static/public/image/lottery/nico/png/10045.png',
                            path: '/plays/tradition/10045',
                            hot: true,
                            lid:10045
                        }
                    ]
                },
                { name: '棋牌游戏', link: '/home/chess?navid=9&id=0', en: 'CHESS' },
                { name: '真人视讯', link: '/home/live', en: 'CASINO' },
                {
                    name: '体育赛事',
                    link: '/home/tiyu',
                    en: 'SPORT',
                    link: '/home/tiyu'
                },
                { name: '电子游艺', link: '/home/slot?navid=9&id=0', en: 'GAME' },
                { name: '捕鱼达人', link: '/home/fish?navid=9&id=0', en: 'FISHING' },
                { name: '优惠活动', link: '/home/youhui', en: 'ACTIVITY' },
                { name: '在线客服', link: 'service',type:'service', en: 'SERVICE' }
            ]
        };
    },
    methods: {
        
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
                this.$loginGame(a);
            }
        }, 
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
        download() {
            window.open('/static/ybcp/html/download/index.html');
        },
        getBalance() {
            this.showReload = true;
            getS(`member/balance`).then(res => {
                if (res.code == 200) {
                    let userinfo = JSON.parse(localStorage.userinfo);
                    userinfo.balance = res.data.member;
                    userinfo.agent = res.data.agency;
                    this.$store.commit('mainState/reloadUserinfo', userinfo);
                    // this.showReload = false
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: '刷新余额成功！',
                        model: '',
                        leftspan: false
                    });
                } else {
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: '服务器报错',
                        model: '',
                        leftspan: false
                    });
                }
            });
            setTimeout(() => {
                this.showReload = false;
            }, 5000);
        },
        register() {
            this.$store.commit('ybcp/showRegister', true);
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
        navActive() {
            return this.$store.state.hsyl.navActive;
        },
        showMessage(){
            return this.$store.state.mainState.showMessage;
        }
    },
    watch: {
        'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        }
    },
    mounted() {},
    created() {
        this.is_code_show();
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
        if (!this.userinfo) return false;
        switch (this.userinfo.levelId) {
            case 2:
                this.top = 1;
                break;
            case 3:
                this.top = -31;
                break;
            case 4:
                this.top = -64;
                break;
            case 5:
                this.top = -96;
                break;
        }
    },
    components: {
        inForMation
    },
    store
};
</script>

<style lang="less" scoped>
.h-top {
    width: 100%;
    height: 36px;
    background-image: -webkit-gradient(linear, left top, right top, from(rgba(205, 16, 20, 0.8)), to(#cd1014));
    .head-main {
        width: 1360px;
        height: 36px;
        margin: 0 auto;
        .anto-list {
            float: left;
            border-left: 1px solid hsla(0, 0%, 100%, 0.1);
            li {
                float: left;
                width: 78px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                color: #fff;
                font-size: 12px;
                border-right: 1px solid hsla(0, 0%, 100%, 0.1);
                cursor: pointer;
            }
        }
        .anto-right {
            float: right;
            .header-input {
                float: left;
                height: 20px;
                padding: 4px 14px;
                line-height: 20px;
                border-radius: 15px;
                box-sizing: content-box;
                margin-right: 10px;
                border: none;
                font-size: 14px;
                outline: none;
                cursor: pointer;
                margin-top: 4px;
                width: 120px;
            }
            .showCode {
                float: left;
                .w-100 {
                    width: 70px;
                }
                img {
                    float: left;
                    margin-top: 4px;
                    height: 26px;
                    width: 57px;
                    margin-right: 10px;
                }
            }
            span {
                float: left;
                font-size: 14px;
                color: #fff;
                margin-right: 7px;
                border-radius: 30px;
                margin-top: 7px;
                padding: 4px 18px;
                font-weight: 550;
                cursor: pointer;
            }
            .login {
                background: -webkit-gradient(linear, left top, right top, from(#fe7673), to(#ff3d3d));
            }
            .register {
                background: -webkit-gradient(linear, left top, right top, from(#fdaa78), to(#ff7826));
            }

            .line-kefu {
                border: 1px solid #fff;
                padding: 3px 18px;
            }
        }
        .after-login {
            span {
                font-weight: bold;
            }
            float: right;
            .information-after-logon {
                float: left;
                color: #fff;
                font-size: 12px;
                border-radius: 30px;
                line-height: 28px;
                position: relative;
                span {
                    float: left;
                    font-weight: bold;
                }
                .head_preleft {
                    float: left;
                    padding-right: 10px;
                    box-sizing: border-box;
                    padding-top: 5px;
                    padding-left: 10px;
                    position: relative;
                    span {
                        float: left;
                    }
                    .username {
                        i {
                            transition: transform 0.2s, -webkit-transform 0.2s;
                        }
                        [class^='el-icon-'] {
                            font-family: element-icons !important;
                            speak: none;
                            font-style: normal;
                            font-weight: 400;
                            font-variant: normal;
                            text-transform: none;
                            line-height: 1;
                            vertical-align: baseline;
                            display: inline-block;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                        }
                        .more-person-accounts {
                            position: absolute;
                            top: 33px;
                            right: 0;
                            width: 100%;
                            background: rgba(70, 37, 37, 0.9);
                            border-radius: 0 0 5px 5px;
                            z-index: 334;
                            height: 0;
                            -webkit-transition: height 0.2s linear;
                            transition: height 0.2s linear;
                            overflow: hidden;
                            li {
                                float: left;
                                width: 100%;
                                height: 32px;
                                border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
                                line-height: 32px;
                                font-size: 12px;
                                text-align: center;
                                color: hsla(0, 0%, 100%, 0.5);
                            }
                        }
                    }
                    .color-ol {
                        color: #fff;
                    }

                    &:hover .more-person-accounts {
                        height: 192px;
                    }
                }
                .line-ml {
                    width: 1px;
                    height: 10px;
                    background: hsla(0, 0%, 100%, 0.2);
                    margin-top: 14px;
                }
                .head_left {
                    min-width: 80px;
                    float: left;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 5px 5px 0 10px;
                    position: relative;
                }
            }
            .refreshbox {
                float: left;
                text-align: center;
                width: 78px;
                height: 24px;
                line-height: 24px;
                margin-top: 5.5px;
                label {
                    display: inline-block;
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    font-size: 12px;
                    border-radius: 12px;
                }
            }
            .information-after-login:after {
                width: 1px;
                height: 10px;
                content: '';
                background: hsla(0, 0%, 100%, 0.2);
                display: block;
                position: absolute;
                right: 0;
                top: 14px;
            }
            .sign-out {
                box-sizing: border-box;
                float: left;
                font-size: 12px;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 30px;
                padding: 3px 15px;
                margin-top: 6px;
                height: 24px;
                line-height: 18px;
                margin-left: 4px;
                cursor: pointer;
                -webkit-transition: border-color 0.6s ease, color 0.6s ease;
                transition: border-color 0.6s ease, color 0.6s ease;
            }
            .sign-out:nth-child(4) {
                border: 0;
                padding-left: 0;
            }
            .sign-out:nth-child(3) {
                border: 0;
            }
            .refresh {
                border: 0;
                display: inline-block;
                background: url(/static/ybcp/img/home/refesh.png) no-repeat 100% 100%;
            }
            .kefu {
                margin-left: 10px;
                border: 0;
                display: inline-block;
                background: url(/static/ybcp/img/home/kefu.png) no-repeat 100% 100%;
            }
        }
    }
}

.h-bottom {
    width: 100%;
    height: 60px;
    border-top: 1px solid hsla(0, 0%, 100%, 0.2);
    background-image: -webkit-gradient(linear, left top, right top, from(rgba(205, 16, 20, 0.8)), to(#cd1014));
    .logo-nav {
        width: 1360px;
        height: 60px;
        margin: 0 auto;
        .logo {
            float: left;
            a {
                display: inline-block;
                img {
                    width: 142px;
                    height: 45px;
                    margin-top: 7px;
                    margin-left: 0px;
                    cursor: pointer;
                }
            }
        }

        .nav-caidan {
            float: right;
            font-size: 16px;
            ul {
                li.nav {
                    &.navActive,
                    &:hover {
                        background: url(/static/ybcp/img/nav_active.png) no-repeat;
                        background-size: 100% 100%;
                        color: #fff;

                        .sub-nav {
                            display: block;
                            transform: translateX(-50%);
                        }
                    }

                    position: relative;
                    float: left;
                    width: 102px;
                    height: 58px;
                    cursor: pointer;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    span.title,
                    span.en {
                        width: 100%;
                        display: inline-block;
                        margin-top: 19px;
                    }
                    span.en {
                        margin-top: 8px;
                        font-size: 10px;
                    }
                    .sub-nav {
                        z-index: 6;
                        position: absolute;
                        left: 47.5px;
                        top: 58px;
                        width: 578px;
                        padding: 20px 34px;
                        background-color: rgba(0, 0, 0, 0.8);
                        border-radius: 5px;
                        &.sub-nav-SPORT {
                            width: 375px;
                        }
                        &::after {
                            display: block;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 26px;
                            height: 19px;
                            background: url(/static/ybcp/img/triangles_back.png?e60836c752) no-repeat;
                            top: -8px;
                        }
                        display: none;
                        .sub {
                            text-align: center;
                            width: 92px;
                            line-height: 15px;
                            margin: 5px;
                            height: 108px;
                            float: left;
                            position: relative;
                            color: #fff;
                            &:hover {
                                background: rgba(211, 211, 211, 0.8);
                                border-radius: 8px;
                            }
                            span {
                                font-size: 13px;
                            }
                            a {
                                display: inline-block;
                                width: 80px;
                                height: 80px;
                                margin: 5px auto;
                                background: #df4545;
                                border-radius: 10px;
                                img {
                                    width: 72px;
                                    height: 72px;
                                    margin-top: 4px;
                                }
                            }
                            .hot {
                                position: absolute;
                                top: 0;
                                right: 0;
                                width: 21px;
                                height: 9px;
                                background-image: url('/static/ybcp/img/hot.gif');
                            }
                        }
                    }
                }
                .navActive {
                    color: #b62929;
                }
            }
        }
    }
}

// 兼容ie
.h-top,
.h-bottom {
    background: rgba(205, 16, 20, 0.8);
    background: -moz-linear-gradient(linear, left top, right top, rgba(205, 16, 20, 0.8) 0%, #cd1014 100%);
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(205, 16, 20, 0.8)), color-stop(100%, #cd1014));
    background: -webkit-linear-gradient(linear, left top, right top, rgba(205, 16, 20, 0.8) 0%, #cd1014 100%);
    background: -o-linear-gradient(linear, left top, right top, rgba(205, 16, 20, 0.8) 0%, #cd1014 100%);
    background: -ms-linear-gradient(linear, left top, right top, rgba(205, 16, 20, 0.8) 0%, #cd1014 100%);
    background: linear-gradient(linear, left top, right top, rgba(205, 16, 20, 0.8) 0%, #cd1014 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(205, 16, 20, 0.8)', endColorstr='#cd1014',GradientType=0 );
}
:root .h-top,
:root .h-bottom {
    filter: none;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
