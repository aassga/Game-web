<template>
    <div class="register">
        <div class="register-logo">
            <img src="/static/klk/img/thirdparty/regbanner.jpg" alt="">
        </div>

        <div class="reg_step">
            <ul>
                <li>
                    <i>1</i>会员登录
                </li>
                <li class="active">
                    <i>2</i>注册申请
                </li>
                <li>
                    <i>3</i>注册成功
                </li>
                <li>
                    <i>4</i>忘记密码
                </li>
            </ul>
        </div>

        <div class="content clearfloat">
            <div class="left fl">
                <img src="/static/klk/img/thirdparty/left_banner.png" alt="">
            </div>

            <div class="right fr">
                <div class="register-wrap">
                    <div class="list-box">
                        <div class="list">
                            <label>
                                <span>*</span>
                                帐号：
                            </label>
                            <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="帐号6-10位数字或字母"
                                type="text" v-model="userName" @blur="getCode" maxlength="10">
                        </div>
                        <div class="list">
                            <label>
                                <span>*</span>
                                密码：
                            </label>
                            <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull" v-on:keyup.enter="registerTest" placeholder="密码 8-20位数字或字母"
                                type="password" v-model="password" maxlength="20">
                        </div>
                        <div class="list">

                            <label>
                                <span>*</span>
                                重复密码：
                            </label>
                            <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                type="password" v-model="password_confirmation" maxlength="20">
                        </div>

                        <!-- 手机号等其他用户资料 -->
                        <div :key='index' v-for="(item,index) in register">
                            <div v-if="JSON.stringify(item) !== '{}' " class="list">
                                <label>
                                    <span>*</span>
                                    {{item.name}}：
                                </label>
                                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder" type="text"
                                    v-model="item.value" :maxlength="item.maxlength">
                            </div>
                        </div>

                        <!-- 短信验证码 -->
                        <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel"
                            :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend"
                            :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                            :countDownTime="countDownTime" :paddingBottom2='paddingBottom2' bColor="#9900ff" :star='star'>
                        </sms-input>

                        <!-- 图片验证码 -->
                        <div v-if="!isShowSms&&!isShowTnCode" class="list">
                            <label>
                                <span>*</span>
                                验证码：
                            </label>
                            <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码"
                                type="text" v-model="code" minlength="4" maxlength="4">
                            <span class="yzm_reg">
                                <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                            </span>
                        </div>

                        <!-- 邀请码 -->
                        <div class="list" v-if='iscode'>
                            <label>
                                <span>*</span>
                                邀请码：
                            </label>
                            <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text"
                                v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
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
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data2 from '../../public/user/register_copy.js';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data2],
    data() {
        return {
            smsInputBox: {
                marginTop: '0'
            },
            paddingBottom2: '25px',
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
              star:{
               color:"#FF0000"
            },
            curLabel: {
                width: '80px',
                height: '25px',
                lineHeight: '25px',
                color: '#000',
                fontSize: '12px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-1px)'
            },
            inputBox: {
                width: '180px',
                height: '30px',
                border: '1px solid #666',
                boxShadow: '0 0 6px #3a3a3a',
                borderRadius: '3px',
                color: '#444',
                fontSize: '12px',
                textIndent: '6px',
                outline: 'none'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '-18px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            star: {
                color: '#f00'
            },
            btnStyle: {
                display: 'inline-block',
                width: '84px',
                height: '30px',
                lineHeight: '30px',
                fontSize: '11px',
                color: '#fff',
                borderRadius: '3px',
                transform: 'translate(4px,0)',
                boxSizing: 'border-box',
            },
            beforeSend: {
                color: '#fff',
                background: '#f43535'
            },
            reSend: {
                color: '#fff',
                background: '#c58728'
            },
            msgTip: {
                margin: '5px 0 16px 211px',
                color: '#333',
                fontSize: '12px'
            }
        };
    },
    mounted() {},
    methods: {},
    components: { smsInput },
    created() {},
    store
};
</script>

<style lang="less" scoped>
.register {
    width: 1200px;
    margin: 0 auto;

    .reg_step {
        text-align: center;

        ul {
            li {
                cursor: pointer;
                display: inline-block;
                margin-right: 30px;
                padding: 10px 0;
                font-weight: bold;
                color: #000;
                text-align: center;
                margin-left: -7px;
                font-size: 14px;
                border-bottom: 2px solid transparent;

                i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    line-height: 18px;
                    margin-right: 5px;
                    text-align: center;
                    border: 1px solid #939393;
                    font-size: 16px;
                    color: #939393;
                    font-style: italic;
                }
            }

            .active {
                border-bottom: 2px solid red;
            }
        }
    }

    .content {
        padding: 52px 0 60px;
        background: #fff;

        .left {
            width: 49%;
            height: 100%;
            text-align: center;
        }

        .right {
            padding-top: 20px;
            margin-top: 40px;
            width: 45%;
            padding-right: 20px;
            margin-right: 60px;
            border: 1px solid #b48d3e;
            border-radius: 5px;
        }
    }

    .register-wrap {
        .list-box {
            .list {
                padding-bottom: 25px;
                position: relative;
                font-size: 16px;
                color: #333;
                text-align: center;

                input {
                    width: 180px;
                    height: 30px;
                    border: 1px solid #666666;
                    box-shadow: 0 0 6px #3a3a3a;
                    border-radius: 3px;
                    color: #444444;
                    font-size: 12px;
                    text-indent: 6px;
                    outline: none;
                }

                input:focus {
                    border: 1px solid #9900ff;
                }

                label {
                    font-size: 12px;
                    color: #000;
                    width: 80px;
                    text-align: right;
                    display: inline-block;

                    span {
                        color: #f00;
                        font-weight: bold;
                        vertical-align: -2px;
                    }
                }

                i {
                    position: absolute;
                    top: 5px;
                    left: 13px;
                    font-size: 24px;
                    color: #949494;
                }

                .yzm_reg {
                    position: absolute;
                    top: 0;
                    right: 36px;
                    cursor: pointer;

                    img {
                        width: 84px;
                        height: 30px;
                    }
                }
            }

            .smsInputBox {
                .list {
                    padding-bottom: 25px;
                    position: relative;
                    font-size: 16px;
                    color: #333;
                    text-align: center;

                    &.msgCodeWrapper {
                        .msg_verify_box {
                            position: absolute;
                            top: 0;
                            right: -18px;
                            margin-left: 2px;
                            display: flex;
                            justify-content: flex-start;
                            width: 142px;

                            a {
                                display: inline-block;
                                height: 28px;
                                line-height: 28px;
                                font-size: 10px;
                                border-radius: 3px;
                                padding: 0 3px;
                                transform: translateY(1px);

                                &.get_code_btn {
                                    &.before_send {
                                        color: #000;
                                        border: 1px solid #000;
                                    }
                                    &.after_send {
                                        color: #696969;
                                        border: 1px solid #696969;
                                    }
                                }
                                &.reSend {
                                    color: #000;
                                    border: 1px solid #000;
                                    margin-left: 8px;
                                }
                            }
                        }
                    }

                    input {
                        width: 180px;
                        height: 30px;
                        border: 1px solid #666;
                        box-shadow: 0 0 6px #3a3a3a;
                        border-radius: 3px;
                        color: #444;
                        font-size: 12px;
                        text-indent: 6px;
                        outline: none;

                        &:focus {
                            border: 1px solid #9900ff;
                        }
                    }

                    label {
                        font-size: 12px;
                        color: #000;
                        width: 80px;
                        text-align: right;
                        display: inline-block;

                        span {
                            color: #f00;
                            font-weight: bold;
                            vertical-align: -2px;
                        }
                    }

                    i {
                        position: absolute;
                        top: 5px;
                        left: 13px;
                        font-size: 24px;
                        color: #949494;
                    }
                }
                .msg_tip {
                    margin: 5px 0 30px 211px;
                    color: #333;
                    font-size: 12px;
                }
            }

            .err {
                display: inline-block;
                min-width: 180px;
                height: 30px;
                line-height: 28px;
                padding-right: 8px;
                margin: 0 0 20px 210px;
                color: #444;
                font-size: 14px;
                border: 1px solid #666;
                box-shadow: 0 0 6px #3a3a3a;
                border-radius: 3px;

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
                width: 200px;
                height: 45px;
                margin-left: 200px;
                margin-top: 5px;
                font-size: 18px;
                text-align: center;
                line-height: 45px;
                background: #f4272d;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
