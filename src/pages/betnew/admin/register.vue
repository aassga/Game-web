<template>
    <div class="register" v-if="isResiter">
        <div class="popup">
            <div class="headline">
                <p>注册bet365会员</p>
                <p>开启您的财富之旅</p>
            </div>

            <div class="content">
                <div class="title_tab">
                    <ul>
                        <li>
                            <a class="cur" href="javascript:void(0)">注册帐号</a>
                        </li>
                    </ul>
                    <div class="close1" @click="close">
                        <a href="javascript:void(0)">
                            <span class="closeBox"></span>
                            <img src="/static/betnew/img/xx.png" alt="">
                        </a>
                    </div>
                </div>
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
                        <input autocomplete="off" type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20" v-model="password">
                    </div>
                </div>

                <div class="row">
                    <label>确认密码：</label>
                    <div class="group">
                        <input autocomplete="off" type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password_confirmation">
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
                    :countDownTime="countDownTime" :paddingBottom2="paddingBottom2" bColor="#007b5b">
                </sms-input>

                <div v-if="!isShowSms&&!isShowTnCode" class="row">
                    <label>验证码：</label>
                    <div class="group">
                        <input autocomplete="off" type="text" placeholder="请输入验证码" v-model="code" maxlength="4" style="width:218px">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                        </span>
                    </div>
                </div>
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
import { postS, getS } from '@/service/public/service.js';
import data from '../../public/user/register';
import data2 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data2],
    components: { smsInput },
    data() {
        return {
            codeImg:"/static/betnew/img/new_games/re.png",
            smsInputBox: {
                marginTop: '20px'
            },
            smsCodeWrapper: {
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            paddingBottom2: '5px',
            curLabel: {
                width: '100px',
                height: '25px',
                lineHeight: '25px',
                color: '#2e2e2e',
                fontSize: '14px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-190px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '213px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '3px',
                color: '#000',
                fontSize: '12px',
                outline: 'none',
                paddingLeft: '12px',
                transform: 'translateX(-162px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '190px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '90px',
                height: '40px',
                lineHeight: '40px',
                fontSize: '14px',
                borderRadius: '3px',
                transform: 'translateY(1px)',
            },
            beforeSend: {
                 color: '#fff',
                 background: '#069772'
            },
            reSend: {
                 color: '#006f51',
                 background: '#f8e423'
            },
            msgTip: {
                margin: '5px 0 16px 122px',
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
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            this.replaceMent();
            this.$store.commit('cjw/showRegister', false);
        }
    },
    computed: {
        isResiter() {
            return this.$store.state.cjw.registerShow;
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
        position: relative;
        width: 753px;
        min-height: 200px;
        margin: 10% auto;
        background: #fff;
        border-radius: 10px;

        .headline {
            height: 122px;
            background-image: linear-gradient(160deg, #7faaff 30%, #07cacc 70%);
            border-radius: 10px 10px 0 0;
            background: url('/static/betnew/img/bg_reg_title.png');
            background-size: contain;

            p {
                font-size: 27.4px;
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
            padding: 40px 40px 40px;

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
                            color: #00a97d;
                            font-weight: bold;
                        }

                        .cur:after {
                            content: '';
                            position: absolute;
                            bottom: 1px;
                            left: 0;
                            width: 100%;
                            height: 2px;
                            background: #00a97d;
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
                        width: 25px;
                        height: 24px;
                        position: absolute;
                        left: 9px;
                        top: 8px;
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
                    width: 120px;
                    height: 40px;
                    text-indent: 10px;
                    line-height: 40px;
                    font-size: 13px;
                    color: #333;
                    font-family: '微软雅黑';
                    text-align: left;
                    padding-left: 21px;
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
                        outline: 0;

                        &:hover,
                        &:focus {
                            outline: 0;
                            border-color: #007b5b;
                            box-shadow: 0 0 2px 0 #007b5b;
                        }
                    }

                    .yzm_reg {
                        float: right;
                        margin-left: 8px;
                        cursor: pointer;

                        img {
                            width: 84px;
                            height: 40px;
                            position: relative;
                            top: 0px;
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
                    color: #fff;
                    background: #00a97d;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                    border: none;
                    margin: 10px 0;
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;
                }
            }

            .tip_info {
                text-align: center;
            }
        }
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
