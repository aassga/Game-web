<template>
    <div>
        <div class="qmcp-home-header">
            <div class="wrapper">
                <div class="time" id="time">{{time|sliceLength}}</div>
                <div class="lang" v-if="!userinfo">GIOCO RESPONSABILE</div>
                <div class="login-before" v-if="!$store.state.mainState.loginOrout">
                    <div class="userName">
                        <input autocomplete="off" type="text" placeholder="帐号" v-model="passKey.userName" @blur="getCode">
                    </div>
                    <div class="password">
                        <input autocomplete="off" maxlength="20" type="password" placeholder="密码" @keyup="clearNull" v-model="passKey.password">
                    </div>
                    <div :class="code_show==1 ? 'code' : 'code1'">
                        <span class="codespan" v-if="code_show">
                            <input autocomplete="off" maxlength="4" type="text" v-model="passKey.code">
                            <img :src="codeImg" alt="" @click="getCode">
                        </span>
                        <a class="btn_login" @click="login">登录</a>
                        <a class="btn_reg" @click="register">注册</a>
                        <a class="btn_reg" onclick='window.open("http://qm.net/")' target="_blank" style="padding:0 15px">导航网</a>
                        <!-- <span  @click="tryPlay">试玩</span> -->
                        <span class="forget_pwd" @click="$forget()">忘记帐号密码?</span>
                    </div>
                </div>

                <!-- 登录后 -->
                <div class="login-after" v-if="$store.state.mainState.loginOrout">
                    <div class="userName fl">帐号：{{userinfo.userName}}</div>
                    <div class="balance fl">余额:{{userinfo&&userinfo.balance}}</div>
                    <div class="userCenter fl link" @click="$goUserCen('personage',0)"><span>会员中心</span></div>
                    <div class="agent fl link" @click="$goUserCen('personage',2)"><span>投注记录</span></div>
                    <div class="deposit fl link w60" @click="$bindPhoneOrbank()"><span>充值</span></div>
                    <div class="withdraw fl link w60" @click="$goUserCen('withdraw',0)"><span>提款</span></div>
                    <div class="exit fl link w60" @click="logout"><span>退出</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { postS, getS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data from '../../public/user/login';
export default {
    mixins: [data],
    data() {
        return {
            time: this.getTimes(new Date())
        };
    },
    filters: {
        sliceLength(val) {
            return val
                .substring(11, val.length - 3)
                .replace(/时/g, ':')
                .replace(/分/g, '');
        }
    },
    methods: {
        forget() {
            this.$store.commit('alert/showTipModel', {
                bool: true,
                title: '忘记帐号密码，请联系在线客服人员取回！',
                model: 'warn'
            });
        },
        getBalance() {
            getS(`member/balance`).then(res => {
                if (res.code == 200) {
                    let userinfo = JSON.parse(localStorage.userinfo);
                    userinfo.balance = res.data.member;
                    userinfo.agent = res.data.agency;
                    this.$store.commit('mainState/reloadUserinfo', userinfo);
                }
            });
        },
        goUserCen(name, num) {
            this.$store.commit('showPersonal', { bool: true });
            this.$store.commit('showContent', { parent: name });
            this.$store.commit('showNav', { child: num });
        },
        register() {
            this.$router.push('/home/register');
        },
        kefuFc() {
            let url = JSON.parse(localStorage.getItem('config')).service[0].url;
            window.open(url);
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
        setInterval(() => {
            this.time = this.getTimes(new Date());
        }, 1000);

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
    store
};
</script>
<style lang="less" scoped>
.cont-bottom {
    @h: 69px;
    width: 100%;
    min-width: 1000px;
    height: @h;
    background: url(/static/qmcp/img/main_bg.png) repeat-x;
    border-bottom: 1px solid #782828;

    .wraper {
        width: 1180px;
        margin: 0 auto;

        &::after {
            content: '';
            display: block;
            clear: both;
        }

        .logo {
            float: left;
            width: 200px;
            height: 69px;
            background: url(/static/qmcp/img/logo.png) no-repeat center center;
            z-index: 999;
        }

        .nav-wrap {
            li {
                position: relative;
                display: inline-block;
                height: 69px;
                list-style: none;
                font-size: 14px;

                &:hover .sub-nav {
                    display: block;
                    transform: translateX(-50%);
                }

                &.navActive {
                    width: 124px;
                    height: 69px;
                    background: url(/static/qmcp/img/nav_active.png) no-repeat;
                }

                a {
                    display: block;
                    height: @h;
                    text-decoration: none;
                    overflow: hidden;
                    font-size: 14px;
                    padding: 0 22.3px;
                    text-align: center;
                    color: #2c2c2c;
                    &:hover {
                        //  background: #f14a4a;
                        width: 124px;
                        height: 69px;
                        background: url(/static/qmcp/img/nav_active.png) no-repeat;
                        color: #fff;
                        transform: scale(1.1);
                        -webkit-transform: scale(1.1);
                        -moz-transform: scale(1.1);
                        -o-transform: scale(1.1);
                        -ms-transform: scale(1.1);
                    }

                    span {
                        display: block;
                        padding-top: 20px;
                        font-size: 14px;

                        b {
                            line-height: 20px;
                            font-size: 12px;
                            font-weight: normal;
                        }
                    }
                }

                .icon-hot1 {
                    background: url(/static/ecp/img/hot1.gif);
                    top: 0px;
                    margin-left: 76px;
                    width: 24px;
                    height: 18px;
                    display: block;
                    position: absolute;
                }

                .sub-nav {
                    z-index: 99;
                    position: absolute;
                    left: 47.5px;
                    top: 69px;
                    width: 578px;
                    padding: 20px 34px;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: none;
                    border-radius: 8px;

                    &:nth-child(2) {
                        width: 374px;
                    }

                    &::after {
                        display: block;
                        position: absolute;
                        left: 50%;
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
                            background: url(/static/ecp/img/game-icon-bg.png) no-repeat;
                            border-radius: 10px;

                            img {
                                width: 73px;
                                height: 73px;
                            }
                        }

                        span {
                            font-size: 12px;
                            display: block;
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


