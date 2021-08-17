<template>
    <div class="register">
        <div class="wrapper">
            <div class="content">
                <fieldset>
                    <legend class="join-acc">注册帐号</legend>
                    <div class="row">
                        <label><span class="star">*&nbsp;</span>帐号:</label>
                        <input autocomplete="off" type="text" minlength="6" maxlength="10" v-model="userName" @blur="getCode"
                            @keydown="pulicError=''" v-on:keyup.enter="registerTest">
                        <div class="remark">帐号：6-10位数字或字母，支持纯数字，纯字母，及数字与字母的组合</div>
                    </div>
                    <div class="row">
                        <label><span class="star">*&nbsp;</span>密码:</label>
                        <input autocomplete="off" type="password"@keyup="clearNull" minlength="8" maxlength="20" v-model="password" @keydown="pulicError=''"
                            v-on:keyup.enter="registerTest">
                        <div class="remark">密码：须为8-20位数字或字母，支持纯数字，纯字母，及数字与字母的组合</div>
                    </div>
                    <div class="row">
                        <label><span class="star">*&nbsp;</span>确认密码:</label>
                        <input autocomplete="off" type="password"@keyup="clearNull" maxlength="20" v-model="password_confirmation" @keydown="pulicError=''"
                            v-on:keyup.enter="registerTest">
                    </div>

                    <!-- 普通验证码 -->
                    <div v-if="!isShowSms&&!isShowTnCode" class="row">
                        <label><span class="star">*&nbsp;</span>验证码:</label>
                        <input autocomplete="off" type="text" v-model="code" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                            minlength="4" maxlength="4">
                        <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                    </div>

                    <div class="row" v-if='iscode'>
                        <label><span class="star">*&nbsp;</span>邀请码:</label>
                        <!-- 只读注册 -->
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text"
                            v-model="intacode" :readonly="incodeReadonly" id="incode" minlength="6" maxlength="6">

                    </div>
                </fieldset>
                <fieldset v-if="register.length">
                    <legend class="join-acc">会员资料</legend>
                    <div v-for="(item,index) in register" :key="index">
                        <div v-if="JSON.stringify(item) !== '{}' " class="row">
                            <label><span class="star">*&nbsp;</span>{{item.name}}:</label>
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>

                    <!-- 短信验证码 -->
                    <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel"
                        :star="star" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :msgTip="msgTip"
                        :reSend="reSend" :beforeSend="beforeSend" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                        :hasSendMsg="hasSendMsg" :countDownTime="countDownTime">
                    </sms-input>

                </fieldset>
                <div class="agree">
                    <input type="checkbox" name="agree" v-model="isCheckbox">
                    我已届满合法博彩年龄﹐且同意各项开户条约。
                </div>
                <div class="err" v-if="pulicError" style="color:red">
                    <i class="iconfont icon-baojing"></i>
                    <span ref="pulicError">{{pulicError}}</span>
                </div>
                <div class="operate">
                    <a class="btn" @click="registerTest">确认</a>
                    <a class="btn" @click="submitReset">重设</a>
                </div>
                <div class="row tip_info">
                    <p>备注：</p>
                    <p>1.标记有 * 者为必填项目。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import data from '../../public/user/register';
import data2 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data2],
    components: { smsInput },
    data() {
        return {
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
            star: {
                color: '#f00',
                fontWeight: 'bold'
            },
            curLabel: {
                width: '100px',
                height: '25px',
                lineHeight: '25px',
                color: '#fff',
                fontSize: '12px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-174px)'
            },
            inputBox: {
                width: '163.3px',
                height: '25px',
                border: '1px solid #666',
                boxShadow: '0 0 6px #3a3a3a',
                borderRadius: '3px',
                color: '#444',
                fontSize: '12px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-172px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '227px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '70px',
                height: '25px',
                lineHeight: '24px',
                fontSize: '10px',
                borderRadius: '3px',
                padding: '0 3px',
                transform: 'translateY(1px)'
            },
            beforeSend: {
                color: '#fff',
                background: '#eb373a'
            },
            reSend: {
                color: '#fff',
                background: '#a98144'
            },
            msgTip: {
                margin: '5px 0 30px 138px',
                color: '#fff',
                fontSize: '11px'
            }
        };
    },
    created() {},
    methods: {
        submitReset() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            this.pulicError = '';
            this.register &&
                this.register.forEach(item => {
                    item.value = '';
                });
        }
    },
    mounted() {},
    store
};
</script>

<style lang="less" scoped>
@h: 25px;
.register {
    background: #000 url(/static/wycp/img/bg_promotions.jpg) center top no-repeat;
    min-height: 650px;

    .wrapper {
        width: 1000px;
        height: 100%;
        min-height: 650px;
        margin: auto;
        background-color: rgba(0, 0, 0, 0.6);

        .content {
            width: 700px;
            margin: auto;
            padding: 20px 0;

            fieldset {
                border: 1px solid #b48d3e;
                padding: 10px;
                width: 100%;

                legend {
                    color: #b48d3e;
                    font-weight: bold;
                    font-size: 13px;
                }
            }

            .row {
                clear: both;
                overflow: hidden;
                margin-top: 10px;
                width: 100%;
                font-size: 13px;

                label {
                    display: inline-block;
                    width: 135px;
                    height: @h;
                    text-indent: 10px;
                    line-height: @h;
                    color: #fff;
                    text-align: right;
                    padding-right: 10px;

                    .star {
                        color: #f00;
                        font-weight: bold;
                        vertical-align: -2px;
                    }
                }

                input {
                    height: @h;
                    line-height: @h;
                    border: 1px solid #666666;
                    border-radius: 3px;
                    box-shadow: 0 0 6px #3a3a3a;
                    text-indent: 10px;
                }

                .remark {
                    height: @h;
                    line-height: @h;
                    color: #fff;
                    text-indent: 140px;
                    margin-top: 10px;
                }

                img {
                    margin-left: 5px;
                    cursor: pointer;
                    width: 78px;
                    height: @h;
                    vertical-align: middle;
                }
            }

            .agree {
                padding-left: 20px;
                height: 30px;
                line-height: 30px;
                color: #fff;
                font-size: 13px;

                input {
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                }
            }

            .operate {
                width: 100%;
                margin: auto;
                text-align: center;
                margin-top: 10px;

                .btn {
                    display: inline-block;
                    width: 80px;
                    height: 40px;
                    color: #000;
                    background: #fff;
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
                p {
                    font-size: 12px;
                    height: @h;
                    line-height: @h;
                    padding-left: 20px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
