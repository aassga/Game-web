<template>
    <div class="register" v-show="isResiter">

        <div class="popup">
            <div class="headline">
            </div>

            <div class="content">
                <div class="title_tab">

                    <div class="close1" @click="close">
                        <a href="javascript:void(0)">
                            <span class="closeBox"></span>
                            <img src="/static/amxpj/img/xx.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="regTitle">注册账号</div>
                <div class="row">
                    <label>会员帐号：</label>
                    <div class="group">

                        <input autocomplete="off" type="text" placeholder="请输入6到10位的数字或字母组合" maxlength="10" v-model="userName"
                            @blur="getCode">
                    </div>
                </div>

                <div class="row">
                    <label>登入密码：</label>
                    <div class="group">
                        <input autocomplete="off" :type="pwdInp" ref="pwdInp" @keyup="clearNull" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password">
                        <!-- <img @click='changType' class='eys_ico1' src="/static/amxpj/img/reg/eyes_ico.png" alt=""> -->
                    </div>
                </div>

                <div class="row">
                    <label>确认密码：</label>
                    <div class="group">

                        <input autocomplete="off" type="password" @keyup="clearNull" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password_confirmation">
                    </div>
                </div>

                <div class="row" v-for="(item,index) in register" :key="index">
                    <div v-if="JSON.stringify(item) !== '{}' ">
                        <label>{{item.name}}：</label>
                        <div class="group">
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>
                <div class="row" v-if="!isShowSms&&!isShowTnCode">
                    <label>验证码：</label>
                    <div class="group">
                        <input autocomplete="off" class="regCode" type="text" placeholder="请输入验证码" v-model="code" maxlength="4">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                        </span>
                    </div>
                </div>
                <!-- 短信验证码 -->
                <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :inputBox="inputBox"
                    :star="star" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                    :countDownTime="countDownTime" bColor="#4d8cfa">
                </sms-input>
                <div class="row" v-if="iscode">
                    <label>邀请码：</label>
                    <div class="group">

                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text"
                            v-model="intacode" :readonly="incodeReadonly">
                    </div>
                </div>

                

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
            smsInputBox: {
                marginTop: '20px'
            },
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: '114px',
                height: '40px',
                lineHeight: '40px',
                color: '#0b0b0b',
                fontSize: '16px',
                textAlign: 'left',
                display: 'inline-block',
                transform: 'translateX(-129px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '220px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '5px',
                background: '#fff',
                color: '#999',
                fontSize: '14px',
                // textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-158px)',
                paddingLeft:'15px'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '-3px',
                right: '107px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '179px'
            },
            btnStyle: {
                display: 'inline-block',
                height: '40px',
                lineHeight: '40px',
                fontSize: '13px',
                borderRadius: '3px',
                padding: '0 6px',
                transform: 'translateY(3px)'
            },
            beforeSend: {
                color: '#fff',
                background: '#f43535'
            },
            reSend: {
                color: '#fff',
                background: '#da8a34'
            },
            msgTip: {
                margin: '5px 0 16px 97px',
                color: '#333',
                fontSize: '12px'
            }
        };
    },
    created() {
        
    },
    mounted() {},
    methods: {
        close() {
            this.replaceMent()
            this.$store.commit('alert/showMgmRegister', false);
        },
        //修改密码框type类型
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
            return this.$store.state.alert.mgmRegister;
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
    components: {
        smsInput
    },
    store
};
</script>

<style lang="less" scoped>
.regCode{
    width: 220px!important;
}
.register {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1900;

    .popup {
        // position: relative;
        width: 745px;
        min-height: 200px;
        // margin: 10% auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        border-radius: 10px;

        .headline {
            height: 120px;
            // background-image: linear-gradient(160deg, #7faaff 30%, #07cacc 70%);
            border-radius: 10px 10px 0 0;
            background: url('/static/amxpj/img/reg/dialogImg.png') no-repeat;
            background-size: 100% 100%;
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
            background: #fff;
            padding: 27px 57px 30px 71px;
            .regTitle{
                color: #0b0b0b;
                font-size: 21px;
                margin-left: 10px;
                margin-bottom: 30px;
            }
            .title_tab {
                overflow: hidden;

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
                    width: 50px;
                    height: 40px;
                    top: 15px;
                    right: 0;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 20px 0 0 20px;

                    a {
                        display: block;
                        height: 100%;
                    }
                    .closeBox {
                        width: 32px;
                        height: 32px;
                        background: white;
                        border-radius: 50%;
                        position: absolute;
                        left: 6px;
                        top: 4px;
                    }

                    img {
                        width: 18px;
                        height: 18px;
                        position: absolute;
                        left: 13px;
                        top: 11px;
                        transition: transform 0.3s ease-in-out;
                    }

                    i {
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        text-align: center;
                        line-height: 34px;
                        font-size: 18px;
                        margin: 4px;
                        color: #0a9899;
                        border-radius: 50%;
                        background: #fff;
                        transition: transform 0.3s ease-in-out;
                    }
                }

                .close1:hover img {
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
                    width: 100px;
                    height: 40px;
                    text-indent: 10px;
                    line-height: 40px;
                    // text-align: right;
                    padding-right: 10px;
                    font-size: 16px;
                    color: #0b0b0b;
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
                        cursor: pointer;
                    }
                    input {
                        width: 308px;
                        height: 40px;
                        box-sizing: border-box;
                        padding: 7px 14px 7px 15px;
                        line-height: 40px;
                        border: 1px solid #ebecef;
                        border-radius: 5px;
                        background: #fff;
                        font-size: 14px;
                        color: #0b0b0b;
                        &:hover,
                        &:focus {
                            border:1px solid #4d8cfa;
                            // box-shadow: 0 0 2px 0 #4d8cfa;
                             border-radius: 5px;
                             outline: none;
                        }
                    }

                    .yzm_reg {
                        float: right;
                        margin-left: 10px;
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
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;
                }
            }

            .tip_info {
                text-align: center;
                margin-top: 26px;
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
