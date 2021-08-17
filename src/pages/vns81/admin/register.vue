<template>
    <div class="registerContainer" v-if="isResiter">
        <div class="popup">
            <div class="headline">
            </div>
            <div class="content">
                <div class="title_tab">
                    <ul>
                        <li>
                            <a class="cur" href="javascript:void(0)">用户注册</a>
                        </li>
                    </ul>
                    <div class="close1" @click="close">
                        <a href="javascript:void(0)"></a>
                    </div>
                </div>

                <div class="row">
                    <label>会员帐号：</label>
                    <div class="group">
                        <input type="text" placeholder="6到10位的数字或字母组合" minlength="6" maxlength="10" v-model="userName" @blur="getCode">
                    </div>
                </div>

                <div class="row">
                    <label>登入密码：</label>
                    <div class="group">
                        <input type="password" placeholder="8到20位的数字或字母组合" maxlength="20" minlength="8" v-model="password">
                    </div>
                </div>

                <div class="row">
                    <label>确认密码：</label>
                    <div class="group">
                        <input type="password" placeholder="请重新输入密码" maxlength="20" v-model="password_confirmation">
                    </div>
                </div>

                <!-- 手机号等信息 -->
                <div v-for="(item,index) in register" :key="index">
                    <div v-if="JSON.stringify(item) !== '{}' " class="row">
                        <label>{{item.name}}：</label>
                        <div class="group">
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>

                <!-- 短信验证码 -->
                <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend"
                    :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                    :countDownTime="countDownTime" :paddingBottom2="paddingBottom2"  bColor="#ffa200">
                </sms-input>

                <!-- 验证码 -->
                <div v-if="!isShowSms&&!isShowTnCode" class="row">
                    <label>验证码：</label>
                    <div class="group">
                        <input type="text" class="regCode" placeholder="请输入验证码" v-model="code">
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
                            :readonly="incodeReadonly">
                    </div>
                </div>

                <div class="operate">
                    <a class="btn" @click="registerTest"><span>立即注册</span></a>
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
import data from '../../public/user/register';
import data2 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data2],
    data() {
        return {
            codeImg: '/static/vns81/img/new_games/re.png',
            smsInputBox: {
                marginTop: '20px'
            },
            smsCodeWrapper: {
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            paddingBottom2: '0',
            curLabel: {
                width: '100px',
                height: '25px',
                lineHeight: '25px',
                color: '#2e2e2e',
                fontSize: '14px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-219px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '195px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '3px',
                color: '#000',
                fontSize: '14px',
                outline: 'none',
                paddingLeft: '12px',
                transform: 'translateX(-169px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '-1px',
                right: '202px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '106px',
                height: '40px',
                lineHeight: '40px',
                fontSize: '14px',
                borderRadius: '3px',
                transform: 'translateY(1px)'
            },
            beforeSend: {
                color: '#464646',
                background: '#f7da85'
            },
            reSend: {
                color: '#fff',
                background: '#788494'
            },
            msgTip: {
                margin: '6px 0 20px 119px',
                color: '#e80000',
                fontSize: '12px'
            }
        };
    },
    created() {
    },
    mounted() {
        this.intacode = this.GetQueryString('agent') || this.GetQueryString('k');
        this.incodeReadonly = !!this.intacode;
    },
    methods: {
        close() {
            this.replaceMent();
            this.$store.commit('hsyl/showRegister', false);
        },
    },
    computed: {
        isResiter() {
            return this.$store.state.hsyl.registerShow;
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
.registerContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    .regCode{
        width: 220px!important;
    }
    .popup {
        position: relative;
        width: 750px;
        min-height: 200px;
        margin: 10% auto;
        border-radius: 10px;
        border: 1px solid #dbdbdb;

        .headline {
            height: 120px;
            background: url(/static/vns81/img/login/bg_reg_title.png) no-repeat center;
            background-size: contain;

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
            padding: 40px;
            background: #fff;
            border-radius: 0 0 8px 8px;

            .title_tab {
                height: 40px;
                overflow: hidden;
                padding-bottom: 10px;
                border-bottom: 1px solid #ebecef;

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
                            color: #272727;
                            font-weight: bold;

                            &:after {
                                content: '';
                                position: absolute;
                                bottom: 1px;
                                left: 0;
                                width: 100%;
                                height: 2px;
                                background: #272727;
                            }
                        }
                    }
                }

                .close1 {
                    position: absolute;
                    width: 26px;
                    height: 26px;
                    top: 19px;
                    right: 19px;
                    a {
                        display: block;
                        width: 26px;
                        height: 26px;
                        background: url(/static/vns81/img/login/ic_close.png) no-repeat center;
                        background-size: contain;
                    }
                }
            }

            .row {
                clear: both;
                overflow: hidden;
                margin-top: 20px;

                label {
                    float: left;
                    display: block;
                    width: 120px;
                    height: 40px;
                    text-indent: 10px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #2e2e2e;
                }

                .group {
                    float: left;
                    overflow: hidden;

                    input {
                        width: 310px;
                        height: 40px;
                        box-sizing: border-box;
                        padding: 5px 10px;
                        font-size: 18px;
                        line-height: 30px;
                        border: 1px solid #ebecef;
                        border-radius: 3px;
                        background: #fff;
                        font-size: 14px;
                        outline: none;

                        &:hover,
                        &:focus {
                            border-color: #ffa200;
                            box-shadow: 0 0 2px 0 #ffa200;
                        }
                    }

                    .yzm_reg {
                        float: right;
                        margin-left: 5px;
                        cursor: pointer;
                        margin-top: 1px;
                        img {
                            width: 84px;
                            height: 38px;
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
                margin-top: 20px;

                .btn {
                    display: inline-block;
                    width: 250px;
                    height: 40px;
                    background: #e80000;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    border: none;
                    margin: 10px 0;
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;

                    span {
                        color: #fff;
                    }
                }
            }

            .tip_info {
                text-align: center;
            }
        }
    }
}

.smsCodeWrapper {
    padding-bottom: 0 !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
