<template>
    <div class="register">
        <div class="content">
            <div class="register-logo">免费注册</div>

            <div class="reg_step">
                <ul>
                    <li class="active">
                        <span class="tip-num">1</span>
                        注册申请
                    </li>
                    <li>
                        <span class="tip-num">2</span>
                        注册成功
                    </li>
                    <li>
                        <span class="tip-num">3</span>
                        忘记密码
                    </li>
                </ul>
            </div>
            
            <div class="content clearfloat">
                <div class="left fl">
                    <img class="phone-img1 animated fadeInLeft" src="/static/qygj/img/thirdparty/pone-bg.png" alt="">
                    <div class="qy-code-down1 animated fadeInRight">
                        <div class="qr-code" ref="qr-code"></div>
                    </div>
                </div>
                <div class="right fr" >
                    <div class="register-wrap">
                        <div class="list-box">
                            <div class="text-context">
                                <div class="title">会员帐号：</div>
                                <div class="input-cont">
                                    <i class="iconfont yonghu"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="getCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">登入密码：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="密码 8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">重复密码：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                        type="password" v-model="password_confirmation" maxlength="20">
                                </div>
                            </div>

                            <!-- 手机号 微信等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title">{{item.name}}：</div>
                                    <div class="input-cont">
                                        <i class="iconfont" :class="item.divclass"></i>
                                        <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder"
                                            type="text" v-model="item.value" :maxlength="item.maxlength">
                                    </div>
                                </div>
                            </div>

                            <!-- 短信验证码 -->
                            <div class="smsContainer" v-if="isShowSms">
                                <i class="iconfont yanzhengma"></i>
                                <sms-input :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                                </sms-input>
                            </div>

                            <!-- 正常验证码 -->
                            <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                                <div class="title">验证码：</div>
                                <div class="input-cont input-cont1">
                                    <i class="iconfont yanzhengma"></i>
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
                                    <i class="iconfont yaoqingma"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                        type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                                </div>
                            </div>

                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <div @click="registerTest" class="submit">立即注册</div>
                            <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data from '../../public/user/register';
import data1 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';
export default {
    mixins: [data1],
    
    data() {
        return {
            
            smsInputBox: {
                marginTop: '15px'
            },
            codeImg: '/static/qygj/img/new_games/lo.png',
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
                fontSize: '14px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-148px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '260px',
                height: '40px',
                lineHeight: '40px',
                border: 'none',
                borderRadius: '20px',
                padding: '0 37px',
                background: '#eee',
                color: '#444',
                fontSize: '16px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-127px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '82px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '167px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '116px',
                height: '36px',
                lineHeight: '36px',
                textAlign: 'center',
                fontSize: '14px',
                borderRadius: '20px',
                boxSizing: 'border-box',
                transform: 'translateY(2px)'
            },
            beforeSend: {
                color: '#fff',
                background:"linear-gradient(to right, #65e0f4, #4fade6)"
            },
            reSend: {
                color: '#fff',
                background: '#ff4545'
            },
            msgTip: {
                margin: '5px 0 16px 88px',
                color: '#696969',
                fontSize: '12px'
            }
        };
    },
    mounted() {
        this.createDownloadQRCode({
            el: this.$refs['qr-code'],
            url: window.location.origin + '/m#/download',
            size: 130
        });
    },
    methods: {
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
        
    },
    components: {
        smsInput,
    },
    mounted(){
    },
    created() {},
    watch:{},
    store
};
</script>

<style lang="less" scoped>
.register {
    width: 1200px;
    margin: 0 auto;
    .content {
        position: relative;
        min-height: 700px;
        padding: 30px 0;
        .register-logo {
            text-align: center;
            line-height: 99px;
            height: 99px;
            font-size: 36px;
            color: #5caaea;
            background: url(/static/qygj/img/thirdparty/regbanner.jpg) no-repeat center;
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
                    background: url(/static/qygj/img/thirdparty/hover.png) no-repeat center;
                    .tip-num {
                        background: #5caaea;
                    }
                }
            }
        }
        .content {
            .left {
                display: inline-block;
                vertical-align: top;
                position: relative;
                margin: 0 40px;
                width: 461px;
                height: 486px;
                background: url(/static/qygj/img/thirdparty/left_banner.png) no-repeat center;
                background-size: 380px;

                .phone-img1 {
                    position: absolute;
                    top: -20px;
                    left: 50px;
                }

                .qy-code-down1 {
                    position: absolute;
                    bottom: -30px;
                    right: 65px;
                    width: 213px;
                    height: 249px;
                    background: url('/static/qygj/img/thirdparty/qy-code-down.png') no-repeat;
                    .qr-code {
                        margin-top: 80px;
                        margin-left: 45px;
                    }
                }
            }

            .right {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 50%;
                //  height: 486px;
            }
        }
        
        .register-wrap {
            .list-box {
                
                .text-context {
                    margin-bottom:20px;
                    box-sizing: border-box;
                    .title {
                        display: inline-block;
                        vertical-align: top;
                        min-width: 80px;
                        font-size: 14px;
                        line-height: 40px;
                    }
                    
                    .input-cont {
                        position: relative;
                        display: inline-block;
                        height: 40px;
                        width: 430px;
                        padding: 0 20px;
                        border-radius: 20px;
                        background: #eee;

                        .iconfont {
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                            color: #bbafd2;
                        }
                        .yonghu {
                            background: url('/static/qygj/img/zhuce/username.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .mima {
                            background: url('/static/qygj/img/zhuce/mimaask.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .yanzhengma {
                            background: url('/static/qygj/img/zhuce/yanzhengma.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .shoujihao {
                            background: url('/static/qygj/img/zhuce/shoujihao.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .yaoqingma {
                            background: url('/static/qygj/img/zhuce/yaoqingma.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .youxiang {
                            background: url('/static/qygj/img/zhuce/youxiang.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .weixin {
                            background: url('/static/qygj/img/zhuce/weixin.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .zhifumima {
                            background: url('/static/qygj/img/zhuce/zhifumima.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        input {
                            position: relative;
                            width: 90%;
                            height: 40px;
                            line-height: 40px;
                            border-radius: 0 5px 5px 0;
                            background: #eee;
                            border: none;
                            outline: 0;
                            margin-left: 20px;
                        }
                    }
                    .input-cont1 {
                        width: 260px;
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

                .treaty {
                    font-size: 15px;
                    color: #999;
                    text-align: center;
                    padding: 20px 0;
                    padding-left: 60px;
                }

                .submit {
                    width:270px;
                    height:40px;
                    border-radius:20px;
                    line-height: 40px;
                    border: none;
                    box-shadow: none;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                    transition: all 0.2s;
                    cursor: pointer;
                    // background: linear-gradient(to,right#65e0f4,#4fade6);
                    background: linear-gradient(to right, #65e0f4, #4fade6);
                    // background: #4fade6;
                    margin-left: 160px;
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
            background: url('/static/qygj/img/zhuce/yanzhengma.png') no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
