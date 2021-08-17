<template>
    <div class="register">
        <div class="banner"></div>
        <div class="content">
            <div class="content clearfloat">
                <div class="right fr regin" v-if="showForm == 2" >
                    <div class="register-wrap">
                        <div class="fromTitle">会员注册</div>
                        <div class="list-box">
                            <div class="text-context">
                                <div class="title">会员帐号：</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont yonghu"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="getCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">登入密码：</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont mima"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull1" v-on:keyup.enter="registerTest"
                                        placeholder="密码 8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">确认密码：</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont mima"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull1" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                        type="password" v-model="password_confirmation" maxlength="20">
                                </div>
                            </div>

                            <!-- 手机号 微信等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title">{{item.name}}：</div>
                                    <div class="input-cont">
                                        <!-- <i class="iconfont" :class="item.divclass"></i> -->
                                        <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder"
                                            type="text" v-model="item.value" :maxlength="item.maxlength">
                                    </div>
                                </div>
                            </div>

                            <!-- 短信验证码 -->
                            <div class="smsContainer" v-if="isShowSms">
                            <!-- <div class="smsContainer" > -->
                                <!-- <i class="iconfont yanzhengma"></i> -->
                                <sms-input :qygj="theName" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                                </sms-input>
                            </div>

                            <!-- 正常验证码 -->
                            <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                                <div class="title">验证码：</div>
                                <div class="input-cont input-cont1">
                                    <!-- <i class="iconfont yanzhengma"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码"
                                        type="text" v-model="code" maxlength="4">
                                    <span class="yzm_reg">
                                        <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                                    </span>
                                    <span class="yam" @click="getCode">换一张</span>
                                </div>
                            </div>

                            <div class="text-context" v-if='iscode'>
                                <div class="title">邀请码：</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont yaoqingma"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                        type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                                </div>
                            </div>

                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <div @click="registerTest" class="submit">立即注册</div>
                            <!-- <div class="treaty">已有帐号 ?<span @click="changeTab(1)">点击登录</span></div> -->
                        </div>
                    </div>
                </div>
                <div class="right fr" v-if="showForm == 1" >
                    <div class="register-wrap">
                        <div class="fromTitle">欢迎登录</div>
                        <div class="list-box">
                            <div class="text-context">
                                <!-- <div class="title">会员帐号：</div> -->
                                <div class="input-cont">
                                    <i class="iconfont yonghu"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="getCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <!-- <div class="title">登入密码：</div> -->
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull2" v-on:keyup.enter="login"
                                        placeholder="密码 8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                </div>
                            </div>
                            <div class="code"  v-if="code_show">
                                <i class="iconfont yanzhengma"></i>
                                <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                                <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                            </div>

                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>
                            <div @click="login" class="submit">登录</div>
                            <div class="text-context1">
                                <div class="forgetPwd" @click="$forget()">忘记密码?</div>
                                <div class="toRegisiter" @click="changeTab(2)">立即注册</div>
                            </div>
                            <!-- <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data2 from "../../public/user/login"
// import data from '../../public/user/register';
import data1 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';
export default {
    mixins: [data1,data2],
    
    data() {
        return {
            theName:'test-1',
            showForm:1,
            smsInputBox: {
                marginTop: '15px'
            },
            codeImg: '/static/vnso/img/new_games/lo.png',
            tabIndex:1,
            rememberPassword:false,
            paddingBottom2:"20px",
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: '75px',
                height: '40px',
                lineHeight: '40px',
                color: '#696969',
                fontSize: '16px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-58px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '200px',
                height: '40px',
                lineHeight: '40px',
                // borderRadius: '20px',
                // padding: '0 37px',
                // background: '#eee',
                color: '#A6A6A6',
                fontSize: '16px',
                textIndent: '6px',
                outline: 'none',
                borderBottom: "1px solid #C9C9C9",
                borderTop: "1px solid transparent",
                borderLeft: "1px solid transparent",
                borderRight: "1px solid transparent",
                transform: 'translateX(-60px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '116px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '116px',
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontSize: '14px',
                borderRadius: '5px',
                boxSizing: 'border-box',
                transform: 'translateY(2px)'
            },
            beforeSend: {
                color: '#fff',
                background:"#FD4848"
            },
            reSend: {
                color: '#fff',
                background: '#FD4848'
            },
            msgTip: {
                margin: '5px 0 16px 88px',
                color: '#696969',
                fontSize: '12px'
            }
        };
    },
    mounted() {
        // this.createDownloadQRCode({
        //     el: this.$refs['qr-code'],
        //     url: window.location.origin + '/m#/download',
        //     size: 130
        // });
        let tab = localStorage.showForm;
        if(tab){
            this.showForm = tab;
        }
    },
    destroyed(){
        localStorage.removeItem('showForm')
    },
    methods: {
        // 密码框禁止输入空格
        clearNull1(){
            this.password_confirmation = this.password_confirmation.replace(/\s+/g,"");
            this.password = this.password.replace(/\s+/g,"");
        },
        clearNull2(){
            this.passKey.password = this.passKey.password.replace(/\s+/g,"");
        },
        login() {
            // this.$store.commit('mainState/setChooseModel', '登录');
            // this.$store.commit('mainState/setLoginTitle', '登录');
            this.$router.push("/home")
        },
        getUrl(){
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    this.url = ser.url
                }
            }
        },
        getCode() {
            if (!this.userName) {
                return false
            }
            if (this.userName.length < 5) {
                this.errorAlert("请输入6位帐号", 'warn')
                this.userName = ''
                return false
            }
            getS(`captcha`, { userName: this.userName }).then(res => {
                if (res.code == 200) {
                    this.codeImg = res.data.captcha_image_text
                    this.captcha_key = res.data.captcha_key
                }
            })
        },
    },
    components: {
        smsInput,
    },
    created() {
        if(this.$route.query.id){
            this.showForm = 1;
        }else{
            this.showForm = 2;
        }
    },
    watch:{
        showForm(val){
            localStorage.setItem('showForm',val);
        },
        $route(val){
            if(val.query.id){
                this.showForm = 1;
            }else{
                this.showForm = 2;
            }
        }
    },
    store
};
</script>

<style lang="less" scoped>
.register {
    margin: 0 auto;
    .banner{
        max-width: 1920px;
        height: 300px;
        margin: 0 auto;
        background: url('/static/vnso/img/carouel/dl.jpg') center top/ cover no-repeat;
    }
    .content {
        position: relative;
        width: 1200px;
        margin: 30px auto;
        min-height: 645px;
        background: url('/static/vnso/img/login_bg.png') no-repeat;
        background-size: 100% 100%;
        .register-logo {
            text-align: center;
            line-height: 99px;
            height: 99px;
            font-size: 36px;
            color: #5caaea;
            background: url(/static/vnso/img/thirdparty/regbanner.jpg) no-repeat center;
        }
        .reg_step {
            text-align: center;
            margin: 0 auto 50px;
            border-bottom: 1px solid #ddd;
            ul {
                li {
                    display: inline-block;
                    vertical-align: top;
                    width: 200px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    font-size: 16px;
                    color: #5caaea;

                    .tip-num {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        margin-right: 10px;
                        border-radius: 5px;
                        text-align: center;
                        color: #fff;
                        background: linear-gradient(to right, #65e0f4, #4fade6);
                    }
                }

                .active {
                    background: url(/static/vnso/img/thirdparty/hover.png) no-repeat center;
                    .tip-num {
                        background: #5caaea;
                    }
                }
            }
        }
        .content {
            .regin{
                margin-top: -50px;
                .text-context{
                    border: none!important;
                }
                .input-cont{
                    width: 315px!important;
                    input{
                        width: 100%!important;
                        border: none!important;
                        outline: none!important;
                        padding-left: 0!important;
                        border-bottom: 1px solid #C9C9C9!important;
                    }
                }
            }
            .right {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 404px;
                top: 125px;
                left: -91px;
                .code {
                    border-bottom: 1px solid #C9C9C9;
                    position: relative;
                    width: 260px;
                    input {
                        width: 160px;
                        height: 40px;
                        border: none;
                        outline: none;
                        padding-left: 11px;
                        margin-left: 27px;
                    }
                    .iconfont {
                        width: 24px;
                        height: 24px;
                        vertical-align: middle;
                        color: #bbafd2;
                        display: inline-block;
                        position: absolute;
                        left: 11px;
                        top: 8px;
                    }
                    .yanzhengma {
                        background: url('/static/vnso/img/zhuce/yanzhengma.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    span {
                        display: inline-block;
                        cursor: pointer;
                        width: 80px;
                        height: 35px;
                        position: absolute;
                        right: 0;
                        top: 7px;
                        border-bottom-right-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                }
            }
        }
        
        .register-wrap {
            .fromTitle{
                color: #4B9BF2;
                width: 404px;
                text-align: center;
                font-size: 24px;
                height:60px;
            }
            .list-box {
                
                .text-context {
                    margin-bottom:25px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #C9C9C9;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        min-width: 80px;
                        font-size: 16px;
                        line-height: 40px;
                        text-align: right;
                    }
                    
                    .input-cont {
                        position: relative;
                        display: inline-block;
                        height: 40px;
                        width: 430px;
                        border-radius: 20px;
                        .iconfont {
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                            color: #bbafd2;
                            z-index: 9;
                        }
                        .yonghu {
                            background: url('/static/vnso/img/zhuce/username.png') no-repeat;
                            background-size: 100% 100%;

                        }
                        .mima {
                            background: url('/static/vnso/img/zhuce/mimaask.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .yanzhengma {
                            background: url('/static/vnso/img/zhuce/yanzhengma.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .shoujihao {
                            background: url('/static/vnso/img/zhuce/shoujihao.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .yaoqingma {
                            background: url('/static/vnso/img/zhuce/yaoqingma.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .youxiang {
                            background: url('/static/vnso/img/zhuce/youxiang.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .weixin {
                            background: url('/static/vnso/img/zhuce/weixin.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .zhifumima {
                            background: url('/static/vnso/img/zhuce/zhifumima.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        input {
                            position: relative;
                            width: 90%;
                            height: 40px;
                            line-height: 40px;
                            // border-radius: 0 5px 5px 0;
                            padding-left: 36px;
                            border: none;
                            outline: 0;
                        }
                        input::-webkit-input-placeholder {
                            font-size: 16px;
                            color: #A6A6A6;
                        }
                    }
                    .input-cont1 {
                        width: 160px!important;
                    }

                    i {
                        position: absolute;
                        top: 10px;
                        left: 13px;
                        font-size: 24px;
                        color: #949494;
                    }
                    
                    .yzm_reg {
                        position: absolute;
                        top: 2.5px;
                        right: -105px;
                        cursor: pointer;

                        img {
                            height: 35px;
                            width: 100px;
                            border-radius: 20px;
                        }
                    }
                    .yam {
                        position: absolute;
                        top: 12px;
                        right: -160px;
                        color: #5caaea;
                        cursor: pointer;
                    }
                }
                .treaty{
                    font-size: 16px;
                    color: #8A8A8A;
                    height: 40px;
                    // line-height: 50px;
                    text-align: center;
                    padding-left: 60px;
                    span{
                        color: #4CA2F4;
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
                .text-context1{
                    display: flex;
                    flex-wrap: nowrap;
                    div{
                        width: 50%;
                        height: 50px;
                        text-align: left;
                        line-height: 50px;
                        color: #8A8A8A;
                        font-size: 18px;
                        cursor: pointer;
                        &:last-child{
                            text-align: right;
                            color: #4CA2F4;
                        }
                    }
                }
                .err {
                    width: 180px;
                    margin-left: 210px;
                    height: 30px;
                    line-height: 30px;
                    color: #444444;
                    font-size: 14px;
                    border: 1px solid #666666;
                    box-shadow: 0 0 6px #3a3a3a;
                    // background: #fdffef;
                    border-radius: 3px;
                    // padding: 0 14px;
                    margin-bottom: 20px;

                    i {
                        padding-left: 5px;
                        font-size: 15px;
                    }
                }

                .forget {
                    font-size: 16px;
                    color: #666;
                    zoom: 1;
                    overflow: hidden;
                    padding-bottom: 26px;

                    span {
                        &:first-child {
                            float: left;

                            label {
                                text-decoration: underline;
                                cursor: pointer;
                            }
                        }
                    }
                }


                .submit {
                    width:404px;
                    height:40px;
                    border-radius:20px;
                    line-height: 40px;
                    border: none;
                    box-shadow: none;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                    margin: 30px 0 30px 0;
                    transition: all 0.2s;
                    cursor: pointer;
                    background: linear-gradient(90deg,#65e0f4,#4fade6);
                }
            }
        }
    }
}
.smsContainer {
    position: relative;

    .iconfont {
        position: absolute;
        left: 98px;
        top: 10px;
        z-index: 10;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        color: #bbafd2;

        &.yanzhengma {
            background: url('/static/vnso/img/zhuce/yanzhengma.png') no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
