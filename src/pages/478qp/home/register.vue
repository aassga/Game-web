<template>
    <div class="register">
        <div class="content">
            <div class="titleWrapper">
                <span class="regTitle">澳门永利皇宫开户</span>
                <span class="regService">如开户遇到问题,请联系<i @click="goService">在线客服</i></span>
            </div>

            <div class="regBox phone">
                <div class="regPanel">
                    <div class="listBox">
                        <div class="inputBox">
                            <div class="text-context">
                                <div class="title">帐号：</div>
                                <div class="input-cont">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" minlength="6"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="getCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">密码：</div>
                                <div class="input-cont">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" minlength="8"
                                        placeholder="密码 8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">重复密码：</div>
                                <div class="input-cont">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                        type="password" v-model="password_confirmation" maxlength="20">
                                </div>
                            </div>

                            <!-- 手机号等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}' " class="text-context">
                                    <div class="title">{{item.name}}：</div>
                                    <div class="input-cont">
                                        <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder"
                                            type="text" v-model="item.value" :maxlength="item.maxlength">
                                    </div>
                                </div>
                            </div>

                            <!-- 短信验证码 -->
                            <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper"
                                :paddingBottom2="paddingBottom2" :curLabel="curLabel" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox"
                                :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode"
                                v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg" :star="star" bColor="#cca353"
                                :countDownTime="countDownTime">
                            </sms-input>

                            <!-- 验证码 -->
                            <div v-else class="text-context">
                                <div class="title">验证码：</div>
                                <div class="input-cont input-cont1">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码"
                                        type="text" v-model="code" maxlength="4" class="verifyCode">
                                    <img :src="codeImg" @click="getCode">
                                </div>
                            </div>

                            <div class="text-context" v-if='iscode'>
                                <div class="title">邀请码：</div>
                                <div class="input-cont">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                        type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                                </div>
                            </div>

                            <div class="err" v-if="pulicError">
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <div @click="registerTest" class="submit">立即注册</div>
                            <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div>
                        </div>
                    </div>
                    <a href="javascript: void(0)" class="promo"></a>
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
import vpHomeHeader from './header.vue';
import vpNav from './nav.vue';
import vpFooter from './footer';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data1],
    data() {
        return {
            codeImg: '/static/478qp/img/thirdparty/code.png',
            smsInputBox: {
                marginTop: '15px'
            },
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            paddingBottom2: '18px',
            curLabel: {
                width: '114px',
                height: '16px',
                lineHeight: '16px',
                color: '#c2c0c0',
                fontSize: '15px',
                textAlign: 'right',
                display: 'block',
                marginBottom: '6px',
                transform: 'translateX(-54px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '168px',
                height: '40px',
                padding: '10px 12px',
                border: '1px solid #656565',
                position: 'relative',
                background: '#242424',
                color: '#fff',
                fontSize: '14px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-101px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '20px',
                right: '-9px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '198px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '88px',
                height: '40px',
                lineHeight: '39px',
                fontSize: '13px',
                color: '#fff',
                transform: 'translateY(3px)',
            },
            beforeSend: {
                color: '#d9c17a',
                background: '#7484a2',
            },
            reSend: {
                color: '#2a2c30',
                background: '#a38f56',
            },
            msgTip: {
                margin: '2px 0 15px',
                color: '#999',
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
            this.$store.commit('mainState/setChooseModel', '登录');
            this.$store.commit('mainState/setLoginTitle', '登录');
        },
        goService() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    window.open(ser.url);
                }
            }
        }
    },
    created() {},
    components: {
        vpHomeHeader,
        vpNav,
        vpFooter,
        smsInput
    },
    store
};
</script>

<style lang="less" scoped>
.register {
    background: #1e1e1e;
    color: #999;

    .content {
        width: 1220px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 40px;
        padding-top: 40px;
        .titleWrapper {
            background: #141414;
            padding: 25px 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .regTitle {
                color: #cca353;
                font-size: 22px;
            }
            .regService {
                font-size: 16px;
                i {
                    font-style: normal;
                    color: #cca352;
                    cursor: pointer;
                }
            }
        }

        .regBox {
            background: #181818;
            border: 1px solid transparent;

            .regPanel {
                position: relative;
                width: 910px;
                min-height: 580px;
                margin: 55px auto 60px;
                background: url(/static/478qp/img/register/fast_register_panel4.png) no-repeat center;
                display: flex;
                justify-content: center;
                align-items: center;

                .listBox {
                    width: 370px;
                    height: 100%;
                    margin: 20px 0 0 86px;

                    .inputBox {
                        .text-context {
                            margin-bottom: 10px;
                            box-sizing: border-box;

                            .title {
                                font-size: 15px;
                                color: #c2c0c0;
                                margin-bottom: 6px;
                            }

                            .input-cont {
                                margin-bottom: 15px;
                                position: relative;
                                width: 270px;

                                input {
                                    font-size: 14px;
                                    padding: 10px 12px;
                                    width: 270px;
                                    border: 1px solid #656565;
                                    position: relative;
                                    background: #242424;
                                    color: #fff;
                                    outline: none;

                                    &.verifyCode {
                                        width: 173px;
                                    }

                                    &::-webkit-input-placeholder {
                                        color: #676a70;
                                    }
                                    &:hover,
                                    &:focus {
                                        border-color: #cca353;
                                    }
                                }

                                &.input-cont1 {
                                    display: flex;
                                    justify-content: space-between;
                                    input {
                                        width: 168px;
                                    }

                                    img {
                                        height: 40px;
                                        width: 88px;
                                        cursor: pointer;
                                    }
                                }
                            }

                            i {
                                position: absolute;
                                top: 10px;
                                left: 13px;
                                font-size: 24px;
                                color: #949494;
                            }
                        }

                        .err {
                            width: 180px;
                            margin-left: 210px;
                            height: 30px;
                            line-height: 30px;
                            color: #444;
                            font-size: 14px;
                            border: 1px solid #666;
                            box-shadow: 0 0 6px #3a3a3a;
                            border-radius: 3px;
                            margin-bottom: 20px;

                            i {
                                padding-left: 5px;
                                font-size: 15px;
                            }
                        }

                        .submit {
                            width: 270px;
                            height: 46px;
                            line-height: 46px;
                            outline: 0;
                            border: none;
                            cursor: pointer;
                            margin-top: 20px;
                            text-align: center;
                            font-size: 16px;
                            color: #fff;
                            background: url(/static/478qp/img/register/submit_register1.png) no-repeat center;
                            transition: all 0.2s;

                            &:hover {
                                background: url(/static/478qp/img/register/submit_register2.png) no-repeat center;
                                transition: all 0.2s;
                            }
                        }

                        .treaty {
                            font-size: 12px;
                            color: #999;
                            text-align: left;
                            height: 20px;
                            line-height: 20px;
                            margin-top: 3px;
                        }
                    }
                }

                .promo {
                    flex: 1;
                    height: 100%;
                    cursor: pointer;
                }
            }
        }
    }
}

input::-webkit-input-placeholder {
    color: #676a70 !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
