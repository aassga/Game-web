<template>
    <div class="register" v-if="isResiter">
        <div class="popup">
            <div class="headline">
            </div>

            <div class="content">
                <div class="title_tab">
                    <div class="close1" @click="close">
                        <img src="/static/ybcp/img/home/close_ico.png" alt>
                    </div>
                </div>

                <div class="row">
                    <label>帐号:</label>
                    <div class="group">
                        <input type="text" placeholder="请输入6到10位的数字或字母组合" minlength="6" maxlength="10" v-model="userName" @blur="getCode">
                    </div>
                </div>

                <div class="row">
                    <label>密码:</label>
                    <div class="group">
                        <input :type="pwdInp" ref="pwdInp" placeholder="请输入8到20位的数字或字母组合" minlength="8" @keyup="clearNull" maxlength="20" v-model="password">
                        <img @click="changType" class="eys_ico1" src="/static/ybcp/img/home/eyes_ico.png" alt>
                    </div>
                </div>

                <div class="row">
                    <label>确认密码:</label>
                    <div class="group">
                        <input type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20" @keyup="clearNull" v-model="password_confirmation">
                    </div>
                </div>

                <!-- 验证码 -->
                <div class="row" v-if="!isShowSms">
                    <label>验证码:</label>
                    <div class="group">
                        <input type="text" placeholder="请输入验证码" v-model="code" minlength="4" maxlength="4">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                        </span>
                    </div>
                </div>

                <!-- 邀请码 -->
                <div class="row" v-if="iscode">
                    <label>邀请码：</label>
                    <div class="group">
                        <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text" v-model="intacode"
                            :readonly="incodeReadonly" minlength="6" maxlength="6">
                    </div>
                </div>

                <!-- 手机号等信息 -->
                <div v-for="(item,index) in register" :key="index">
                    <div v-if="JSON.stringify(item) !== '{}' " class="row">
                        <label>{{item.name}}:</label>
                        <div class="group">
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>

                <!-- 短信验证码 -->
                <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel"
                    :inputBox="inputBox" :star="star" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" bColor="#4d8cfa">
                </sms-input>

                <div class="operate">
                    <a class="btn" @click="registerTest">立即注册</a>
                </div>

                <div class="row tip_info">
                    <p>完成即视为同意已年满18岁，且在此网站所有活动并没抵触本人所在国家所管辖的法律</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService';
import { postS } from '@/service/public/service.js';
import data from '../../public/user/register_copy.js';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data],
    data() {
        return {
            pwdInp: 'password',
            pwdInp: 'password',
            smsInputBox: {
                marginTop: '20px',
                marginBottom: '25px'
            },
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center',
                height: '46px',
                display: 'flex',
                alignItems: 'center'
            },
            star: {
                display: 'none'
            },
            curLabel: {
                width: '100px',
                height: '25px',
                lineHeight: '25px',
                color: '#333',
                fontSize: '18px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-19px)'
            },
            inputBox: {
                width: '340px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '3px',
                color: '#999',
                fontSize: '14px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-2px)',
                padding: '0 20px'
            },
            msgVerifyBox: {
                width: '196px',
                position: 'absolute',
                top: '3px',
                right: '-116px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start'
            },
            btnStyle: {
                display: 'inline-block',
                height: '40px',
                lineHeight: '40px',
                fontSize: '16px',
                borderRadius: '3px',
                padding: '0 17px',
                color: '#727272'
            },
            beforeSend: {
                color: '#fff',
                background: '#70c3ea'
            },
            reSend: {
                color: '#fff',
                background: '#e9c17a',
                marginLeft: '-10px'
            },
            msgTip: {
                margin: '0 0 0 99px',
                color: '#333',
                fontSize: '12px',
                height: '20px',
                lineHeight: '20px'
            }
        };
    },
    created() {
        this.registerInit();
    },
    mounted() {},
    methods: {
        registerInit() {
            this.agent = this.GetQueryString('agent') || this.GetQueryString('k');
            let register = JSON.parse(localStorage.getItem('config')).register.pc;
            let registermodel = JSON.parse(localStorage.getItem('config')).site_model;
            // 上面进行了判断，是使用邀请码进行注册的

            if (registermodel == 'invite_code') {
                this.iscode = true;
            } else {
                this.iscode = false;
            }

            register.forEach((v, i) => {
                this.register[i] = {};
                switch (v) {
                    case 'phone':
                        this.register[i].placeholder = '请输入手机号';
                        this.register[i].maxlength = 11;
                        this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '手机号';
                        break;
                    case 'email':
                        this.register[i].placeholder = '请输入邮箱地址';
                        this.this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '邮箱';
                        this.register[i].maxlength = 20;
                        break;
                    case 'wechat':
                        this.register[i].placeholder = '请输入微信号';
                        this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '微信';
                        this.register[i].maxlength = 20;
                        break;
                    case 'realName':
                        this.register[i].placeholder = '请输入真实姓名';
                        this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '真实姓名';
                        this.register[i].maxlength = 10;
                        break;
                    case 'payPassword':
                        this.register[i].placeholder = '请输入支付密码';
                        this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '支付密码';
                        this.register[i].maxlength = 6;
                        break;
                }
            });
        },

        close() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            // this.intacode="";
            this.registerInit();

            this.$store.commit('ybcp/showRegister', false);
        },
        changType() {
            if (this.pwdInp == 'password') {
                this.pwdInp = 'text';
            } else {
                this.pwdInp = 'password';
            }
        }
    },
    computed: {
        isResiter() {
            return this.$store.state.ybcp.registerShow;
        }
    },
    watch:{
        isResiter:function(val){
           if(val){
              this.inInCreate();
              this.inInMounted();
           }
       }
    },
    components: { smsInput },
    store
};
</script>

<style lang="less" scoped>
.register {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;

    .popup {
        // position: relative;
        width: 750px;
        min-height: 200px;
        // margin: 10% auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 10px;

        .headline {
            height: 120px;
            background-image: linear-gradient(160deg, #7faaff 30%, #07cacc 70%);
            border-radius: 10px 10px 0 0;
            background: url('/static/ybcp/img/home/header_log.png');

            p {
                font-size: 24px;
                color: #fff;
                position: absolute;
                left: 350px;
                top: 30px;
            }

            p:nth-child(2) {
                left: 450px;
                top: 70px;
            }
        }

        .content {
            // padding: 40px 40px 40px;
            padding: 27px 106px 48px 106px;
            .title_tab {
                // height: 40px;
                overflow: hidden;
                // padding-bottom: 10px;
                // border-bottom: 1px solid #ebecef;

                ul {
                    li {
                        float: left;

                        a {
                            display: block;
                            height: 40px;
                            line-height: 40px;
                            color: #3c3c3c;
                            font-size: 16px;
                            margin-left: 10px;
                            padding: 0 20px;
                        }

                        .cur {
                            position: relative;
                            color: #4d8cfa;
                            font-weight: bold;
                        }

                        .cur:after {
                            content: '';
                            position: absolute;
                            bottom: 1px;
                            left: 0;
                            width: 100%;
                            height: 2px;
                            background: #4d8cfa;
                        }
                    }
                }

                .close1 {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    top: 20px;
                    right: 20px;
                    // background: rgba(0, 0, 0, 0.3);
                    border-radius: 20px 0 0 20px;
                    cursor: -webkit-pointer;
                    cursor: pointer;
                    a {
                        display: block;
                        height: 100%;
                    }

                    i {
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        font-size: 20px;
                        text-align: center;
                        line-height: 32px;
                        margin: 4px;
                        color: #0a9899;
                        border-radius: 50%;
                        background: #efd402;
                        transition: transform 0.3s ease-in-out;
                    }
                }

                .close1:hover i {
                    transform: rotate(90deg);
                }
            }

            .row {
                clear: both;
                overflow: hidden;
                margin-top: 20px;

                label {
                    float: left;
                    display: block;
                    width: 98px;
                    height: 44px;
                    text-indent: 10px;
                    line-height: 44px;
                    font-size: 18px;
                    color: rgba(51, 51, 51, 1);
                }

                .group {
                    float: left;
                    overflow: hidden;
                    position: relative;
                    .eys_ico1 {
                        width: 20px;
                        height: 13px;
                        position: absolute;
                        right: 22px;
                        top: 15px;
                        cursor: -webkit-pointer;
                        cursor: pointer;
                    }
                    input {
                        width: 340px;
                        height: 40px;
                        box-sizing: border-box;
                        padding: 7px 14px 7px 22px;
                        font-size: 18px;
                        line-height: 30px;
                        border: 1px solid #ebecef;
                        border-radius: 5px;
                        background: #fff;
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);

                        &:hover,
                        &:focus {
                            border-color: #4d8cfa;
                        }
                    }

                    .yzm_reg {
                        float: right;
                        margin-left: 20px;
                        cursor: -webkit-pointer;
                        cursor: pointer;

                        img {
                            width: 78px;
                            height: 40px;
                        }
                    }
                }

                p {
                    font-size: 12px;
                }
            }

            .operate {
                width: 100%;
                margin: auto;
                text-align: center;
                margin-top: 30px;

                .btn {
                    display: inline-block;
                    width: 250px;
                    height: 40px;
                    color: #fff;
                    background: rgba(194, 36, 41, 1);
                    line-height: 40px;
                    text-align: center;
                    font-size: 18px;
                    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                    border: none;
                    // margin: 10px 0;
                    cursor: -webkit-pointer;
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;
                }
            }

            .tip_info {
                text-align: center;
                p {
                    font-size: 12px;
                    color: rgba(102, 102, 102, 1);
                }
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
