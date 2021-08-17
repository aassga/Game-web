<template>
    <div class="zhucz a-bounceinB">
            <div class="loginForm" v-if="loggedIn == false">
            <!-- <div class="alreadyLogin" v-if="loggedIn == true">
                    <p><span>账号:</span> <span>{{userinfo ? userinfo.userName : ''}}</span></p>
                    <p><span>余额:</span> <span>{{userinfo ? userinfo.balance : ''}}</span></p>
                    <div>
                        <span @click="$goUserCen('personage',0)">会员中心</span>
                        <span @click="$goUserCen('withdraw',0)">在线存款</span>
                        <span @click="$goUserCen('withdraw',0)">在线取款</span>
                        <span @click="$goUserCen('personage',2)">资金流水</span>
                        <span @click="logout">登出</span>
                    </div>
            </div> -->
             <div class="noLogin" style="height:214px">
                        <div class="login_title"></div>
                        <input type="text" placeholder="账号" @change="getCode" autocomplete="off" v-model="passKey.userName">
                        <input type="password" placeholder="密码" autocomplete="off" v-model="passKey.password">
                        <input v-if="code_show" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                        <i class="icon1"></i>
                        <i class="icon2"></i>
                        <i v-if="code_show" class="icon3"></i>
                        <img v-if="code_show" class="codeimg" id="vPic" :src="codeImg" width="60" height="33" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                        <div :class="['login',{'loginPad':code_show == false}]">
                            <span @click="login">立即登入</span>
                            <span @click="goKaihu()">免费开户</span>
                        </div>
                        <div class="forget" @click="$forget()">忘记密码?</div>
              </div>
            </div>
    </div>
</template>
<script>
import $ from 'jquery';
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import data from '../../public/games/public.js';
import data1 from '../../public/user/login';
import data2 from '../../public/homeMeans/comfun.js';
import data3 from '../../public/homeMeans/Aside';
import { postS, getS } from '@/service/public/service.js';
import freshButton from '../../public/home/freshButton';
import inForMation from '../../public/home/information.vue';
export default {
    mixins: [data, data1, data2, data3],
    data() {
        return {
            loggedIn:false,
            codeImg:'/static/amjs/img/new_games/lo.png',
            systemmessage: {
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#ff0000',
                position: 'absolute',
                left: '54px',
                top: '-26px',
                lineHeight: '18px',
                textAlign: 'center',
                display: 'block'
            },
            showReload: false,
            userInfo: false,
            usercenter: [
                {
                    name: '修改密码',
                    isfont: true,
                    path: '',
                    type: 'personage',
                    typeNum: 8
                },
                {
                    name: '线上存款',
                    isfont: true,
                    path: '',
                    type: 'recharge',
                    typeNum: 0
                },
                {
                    name: '线上取款',
                    isfont: false,
                    path: '',
                    type: 'withdraw',
                    typeNum: 0
                },
                {
                    name: '下注记录',
                    isfont: true,
                    path: '',
                    type: 'personage',
                    typeNum: 2
                },
                {
                    name: '时时返水',
                    isfont: true,
                    path: '',
                    type: 'discounts',
                    typeNum: 0
                },
                {
                    name: '未读讯息',
                    isfont: false,
                    path: '',
                    type: 'message',
                    typeNum: 0
                }
            ]
        };
    },
    methods: {
        logout() {
            UserService.logout.call(this);
        },
        goKaihu() {
             this.$router.push('/home/register');
        },
        newshowfresh() {
            if (this.balanceRefreshing) this.showfresh = false;
            else this.showfresh = true;
        },

        register() {
            this.$router.push('/home/register');
        },
        isLogged() {
            if (this.userinfo) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        },
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        }
    },
    created() {
        this.is_code_show();
        this.isLogged();
    },
      watch:{
        userinfo(val){
            if (val) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        }
    },
    components: {
        freshButton,
        inForMation
    }
};
</script>

<style lang="less">
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
.clearDiv:after {
    clear: both;
    content: '';
    display: block;
}
.zhucz {
    width: 1100px;
    clear: both;
    position: relative;
    margin: 0 auto;

 
            .loginForm{
            display: inline-block;
            position: absolute;
            top:0;
            right: 32px;
            width: 232px;
            height: 239px;
            background: url("/static/amjs/img/login_bg02.png") no-repeat;
            background-size: 100% 100%;
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
            .indexNotice {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 20px);
                height: 80px;
                width: 100%;
                background-size: contain;
                z-index: 999;
                margin: 0 auto;
                .noticeInner {
                    width: 85%;
                    height: 100%;
                    margin: 0 auto;
                    cursor: pointer;
                    transform: translate(10px, 0);

                    marquee {
                        float: right;
                        width: 185px;
                        height: 100%;
                        margin: 0 auto;
                        line-height: 20px;
                        color: #fff;
                        font-size: 12px;
                        a{
                            color: #fff;
                        }
                    }
                }
            }
        }

        h2 {
            background: url(/static/blr/img/indexc_06.png) no-repeat center top;
            width: 267px;
            height: 42px;
            text-align: center;
            font-size: 21px;
            color: #fff;
            font-weight: 100;
            line-height: 32px;
            text-indent: 22px;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: -6px;
        }

        input {
            margin-left: 20px;
            padding-left: 6px;
            width: 215px;
            height: 32px;
            line-height: 32px;
            border: solid 1px #554f4d;
            border-radius: 2px;
            background-color: #1d1b17;
            color: #fff;
            text-indent: 2px;
            font-family: 'Microsoft Yahei';
            margin-bottom: 8px;
            outline: none;
            &.dls {
                text-indent: 0;
                background: url(/static/blr/img/indexc_10.png) no-repeat center top;
                width: 62px;
                height: 43px;
                line-height: 43px;
                text-align: center;
                color: #000;
                font-family: 'Microsoft Yahei';
                font-size: 18px;
                border: none;
                cursor: pointer;
                margin-top: 5px;
                margin-left: 15px;
                float: left;

                &.loginBtn {
                    margin-left: 16px;
                }
                &.regBtn {
                    margin-left: 0;
                }

                &:hover {
                    opacity: 0.8;
                }

                &.tt {
                    text-indent: 0px;
                    background: url(/static/blr/img/ffg_03.jpg) no-repeat center top;
                    width: 92px;
                    height: 31px;
                    line-height: 31px;
                }
            }
        }

        .vm {
            vertical-align: middle;
            position: absolute;
            bottom: 70px;
            right: 25px;
            width: 50px;
            height: 20px;
        }

        .dc {
            background: url(/static/blr/img/dls.png) no-repeat center top;
            width: 230px;
            height: 190px;
            margin-top: -7px;
            margin-left: 10px;
            text-align: left;
            padding-top: 14px;
            p {
                color: #fff;
                margin-left: 15px;
                width: 100%;
                float: left;
                font-family: 'Microsoft Yahei';
                font-size: 12px;
                line-height: 26px;
                .refresh {
                    display: inline-block;
                    vertical-align: middle;
                    width: 16px;
                    height: 16px;
                    background: url('/static/blr/img/refresh.png') no-repeat;
                    position: relative;
                }
                .newfresh {
                    background: url('/static/blr/img/newrefresh.png') no-repeat;
                }
            }
            ul {
                margin-left: 6px;
                margin-top: 3px;
                float: left;
                padding-top: 4px;
                li {
                    float: left;
                    width: 68px;
                    text-align: center;
                    margin-bottom: 10px;
                    a {
                        color: #fff;
                        font-size: 12px;
                    }
                    .message {
                        position: relative;
                        div {
                            position: relative;
                        }
                    }
                    font {
                        color: #fff;
                        float: right;
                    }
                }
            }
        }
    
}
</style>
