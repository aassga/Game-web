<template>
    <div class="register-wrap">
        <div class="list-box">
            <div class="list">
                <span class="label">帐号：</span>
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" maxlength="10" placeholder="帐号 6-10位数字或字母" type="text"
                    v-model="userName" @blur="getCode">
            </div>
            <div class="list">
                <span class="label">密码：</span>
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" @keyup="clearNull" maxlength="20" placeholder="密码 8-20位数字或字母" type="password"
                    v-model="password">
            </div>
            <div class="list">
                <span class="label">重复密码：</span>
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" @keyup="clearNull" maxlength="20" placeholder="请重复密码" type="password"
                    v-model="password_confirmation">
            </div>

            <div v-for="(item,index) in register" :key="index">
                <div v-if="JSON.stringify(item) !== '{}' " class="list">
                    <span class="label">{{item.name}}：</span>
                    <input @keydown="pulicError=''" :maxlength="item.maxlength" v-on:keyup.enter="registerTest" v-model="item.value"
                        type="text" :placeholder="item.placeholder">
                </div>
            </div>
            <!-- 短信验证码 -->
            <sms-input v-if="isShowSms && qxcp != 'qxcp'" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :reSend="reSend"
                :star="star" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                :countDownTime="countDownTime" bColor="#dbdbdb">
            </sms-input>
            <!-- 短信验证码 -->
            <sms-input v-if="isShowSms && qxcp == 'qxcp'" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :reSend="reSend"
                :star="star" :inputBox="qxcpInput" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                :countDownTime="countDownTime" bColor="#dbdbdb">
            </sms-input>
            <div class="list list3" style="position: relative;" v-if="!isShowSms&&!isShowTnCode">
                <span class="label">验证码：</span>
                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" maxlength="4" placeholder="请输入验证码" type="text"
                    v-model="code">
                <img class="yzm" :src="codeImg" alt="" @click="getCode">
            </div>
            <div class="list" v-if="iscode">
                <span class="label">邀请码：</span>
                <input @keydown="pulicError=''" maxlength="6" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text"
                    v-model="intacode" :readonly="incodeReadonly">
            </div>
            <div class="err" :class="'err_'+qxcp" v-if="pulicError">
                <i class="iconfont icon-baojing"></i>
                <span ref="pulicError">{{pulicError}}</span>
            </div>
            <div @click="registerTest" class="submit">立即注册</div>
            <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div>
        </div>
    </div>
</template>


<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService.js';
// import data from '../../../user/register';
import data1 from '../../../user/register_copy';
import smsInput from '../../../home/smsInput';

export default {
    mixins: [data1],
    props: {
        clean: { type: Boolean },
        qxcp:{type:String}
    },
    data() {
        return {
            smsInputBox: {
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
                fontSize: '16px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-15px)'
            },
            inputBox: {
                width: '160px',
                height: '46px',
                border: '1px solid #dbdbdb',
                borderRadius: '3px',
                color: '#000',
                fontSize: '16px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-15px)',
                padding: '0 15px'
            },
            qxcpInput: {
                width: '160px',
                height: '46px',
                border: '1px solid #dbdbdb',
                borderRadius: '3px',
                color: '#000',
                fontSize: '16px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-8px)',
                padding: '0 15px'
            },
            msgVerifyBox: {
                width: '196px',
                position: 'absolute',
                top: '0',
                right: '-80px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start'
            },
            btnStyle: {
                display: 'inline-block',
                height: '46px',
                lineHeight: '46px',
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
                margin: '8px 0 0 86px',
                color: '#333',
                fontSize: '12px',
                height: '20px',
                lineHeight: '20px'
            }
        };
    },
    methods: {
        // 重置
        reset() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.phoneNumber = '';
            this.pulicError = '';
            this.code = '';
            this.captcha_key = '';
            this.$emit('child-say');
            this.cleanvalue();
        },
        // 初始化数据
        cleanvalue() {
            this.agent = this.GetQueryString('agent') || this.GetQueryString('k');
            let registerPc = JSON.parse(localStorage.getItem('config')).register.pc;
            let registermodel = JSON.parse(localStorage.getItem('config')).site_model;
            if (registermodel == 'invite_code') {
                this.iscode = true;
            } else {
                this.iscode = false;
            }
            registerPc.forEach((v, i) => {
                this.register[i] = {};
                switch (v) {
                    case 'phone':
                        this.register[i].placeholder = '请输入手机号';
                        this.register[i].value = '';
                        this.register[i].key = v;
                        this.register[i].name = '手机号';
                        this.register[i].maxlength = 11;
                        break;
                    case 'email':
                        this.register[i].placeholder = '请输入邮箱地址';
                        this.register[i].value = '';
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
            if (registerPc.includes('phone') && registerPc.includes('sms')) {
                this.isShowSms = true;
            } else {
                this.isShowSms = false;
            }
            this.register = this.register.filter((item, index) => {
                return JSON.stringify(item) !== '{}';
            });
        }
    },
    created() {
        this.cleanvalue();
    },
    mounted() {
    },
    watch: {
        clean() {
            if (this.clean) {
                this.reset();
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
.register-wrap {
    width: 382px;
    margin: 0 auto;
    padding-bottom: 50px;

    .list-box {
        .list {
            margin-bottom: 25px;
            position: relative;
            font-size: 16px;
            color: #333;
            text-align: right;
            height: 46px;
            box-sizing: border-box;
            line-height: 46px;

            .label {
                display: inline-block;
            }

            input {
                display: inline-block;
                width: 290px;
                height: 46px;
                border: 1px solid #dbdbdb;
                border-radius: 3px;
                color: #444444;
                font-size: 16px;
                text-indent: 4px;
                outline: none;
                padding-left: 15px;
                box-sizing: border-box;
            }

            i {
                position: absolute;
                top: 5px;
                left: 13px;
                font-size: 24px;
                color: #949494;
            }
        }

        .list.list3 {
            /* padding-bottom: 25px;*/
            margin-left: -16px;

            .yzm {
                display: inline-block;
                cursor: pointer;
                width: 90px;
                height: 30px;
                position: absolute;
                right: 15px;
                top: 8px;
            }
        }
        .err_qxcp {
            width: 290px!important;
            margin-left: 92px!important;
            height: 30px!important;
            line-height: 30px!important;
            color: #ff6600!important;
            font-size: 16px!important;
            border: 1px solid #ff6600!important;
            background: #fdffef!important;
            border-radius: 3px!important;
            padding: 0 14px!important;
            margin-bottom: 20px!important;

            i {
                margin-right: 5px;
            }
        }
        .err {
            width: 296px;
            margin-left: 85px;
            height: 30px;
            line-height: 30px;
            color: #ff6600;
            font-size: 16px;
            border: 1px solid #ff6600;
            background: #fdffef;
            border-radius: 3px;
            padding: 0 14px;
            margin-bottom: 20px;

            i {
                margin-right: 5px;
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
            font-size: 16px;
            color: #999;
            text-align: right;
            height: 41px;
            line-height: 50px;
        }

        .submit {
            width: 296px;
            height: 45px;
            margin-left: 86px;
            // margin-top: 5px;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            background: #ff0024;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
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
