<template>
    <form id="signUpForm" action="?" style>
        <div class="registered">
            <ul>
                <li>
                    <label>
                        <span class="star" style="display: inline;">* </span>帐号:
                    </label>
                    <input id="txtUserName" name="txtUserName" @keydown="pulicError=''" @blur="getCode" v-on:keyup.enter="registerTest"
                        v-model="userName"  placeholder="账号"
                        class="validate[required,minSize[3],maxSize[16],custom[onlyLetterNumber],funcCall[callUserNameAgent]]" minlength="6"
                        maxlength="10" type="text">
                    <span class="input_tip">请输入<font style="color:red;font-weight:bold">6-10个字元</font>, 仅可输入英文字母以及数字的组合!!</span>
                </li>
                <li>
                    <label>
                        <span class="star" style="display: inline;">* </span>密码:
                    </label>
                    <input name="txtPassword" id="txtPassword" v-model="password" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                        style placeholder="密码"
                        class="validate[required,custom[onlyLetterNumber],funcCall[checkPassWord],minSize[8],maxSize[20] input-large span8"
                        minlength="8" maxlength="20" type="password">
                    <span class="input_tip">*密码规则：须为<font style="color:red;font-weight:bold">8~20码英文或数字</font>符合0~9或a~z字元</span>
                </li>
                <li>
                    <label>
                        <span class="star" style="display: inline;">* </span>确认密码:
                    </label>
                    <input name="txtConfirmPassword" style id="txtConfirmPassword" v-model="password_confirmation" @keydown="pulicError=''"
                        v-on:keyup.enter="registerTest" placeholder="再次输入密码"
                        class="validate[required,funcCall[checkPassWord],minSize[8],maxSize[20],equals[txtPassword]] input-large span8"
                        maxlength="20" type="password">
                </li>
                <li class="btnee">注册账号</li>
            </ul>
        </div>
        <div class="registered-data">
            <ul>
                <template v-if="register.length"></template>

                <li v-for="(item,index) in register" :key="index">
                    <label>
                        <span class="star" style="display: inline;">*&nbsp;</span>
                        {{item.name}}:
                    </label>
                    <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                </li>

                <li class="verify_box">
                    <label>
                        <span class="star">*&nbsp;</span>验证码:
                    </label>
                    <input name="txtValidationCode2" id="txtValidationCode2" maxlength="4" type="text" v-model="code" placeholder="验证码"
                        @keydown="pulicError=''" class="validate[required,minSize[4],maxSize[4],custom[integer]]">
                    <span class="yzm_reg">
                        <img id="checkLoginCodeImage2" class="verify_icon" :src="codeImg" @click="getCode">
                    </span>
                </li>
                <li class="btnees">会员资料</li>
            </ul>
        </div>
        <div class="agreeBox">
            <span class="agreetxt">
                <input name="txtAgreement" id="txtAgreement" class="validate[required]" checked="checked" type="checkbox" v-model="agree">
                我已届满合法博彩年龄﹐且同意各项开户条约。
            </span>
        </div>
        <div class="err" v-if="pulicError">
            <i class="iconfont icon-baojing"></i>
            <span ref="pulicError">{{pulicError}}</span>
        </div>
        <div class="regist-btn">
            <ul>
                <li>
                    <a class="confirm_btn" @click="registerTest">确认</a>
                </li>
                <input class="reset_btn" hidefocus="true" name="reset" value="重设" @click="reset" type="reset">
            </ul>
        </div>
        <div class="JM_content JM_content_b">
            <div id="joinmem">
                <div class="resume_box">
                    <p>备注：</p>
                    <p class="resume">1.标记有 <i>*</i> 者为必填项目。</p>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data from '@/pages/public/user/register';
import $ from 'jquery';

export default {
    mixins: [data],
    data() {
        return {};
    },
    mounted() {},
    methods: {
        pushView(link) {
            this.$router.push(link);
        },
        reset() {
            (this.userName = ''),
                (this.password = ''),
                (this.password_confirmation = ''),
                (this.pulicError = ''),
                (this.code = ''),
                (this.pulicError = ''),
                this.register &&
                    this.register.forEach(item => {
                        item.value = '';
                    });
        },
        login() {
            this.$store.commit('mainState/setChooseModel', '登录');
            this.$store.commit('mainState/setLoginTitle', '登录');
        }
    },

    created() {},
    store
};
</script>

<style lang="less" scoped>
#signUpForm {
    color: #fff;
    width: 600px;
    margin: 0 auto;

    .registered {
        border: 1px #b48d3e solid;
        padding-bottom: 20px;
        margin-top: 24px;
        position: relative;
        ul {
            li {
                margin: 15px 0px 0px 50px;

                &.btnee {
                    position: absolute;
                    left: -33px;
                    top: -25px;
                    width: 56px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    background: #1b1b1b;
                    color: #b48d3e;
                    font-weight: bold;
                }

                label {
                    display: block;
                    width: 100px;
                    height: 28px;
                    float: left;
                    line-height: 28px;
                    text-align: right;
                    padding-right: 8px;

                    span {
                        &.star {
                            color: #f00;
                            font-weight: bold;
                            vertical-align: -2px;
                        }
                    }
                }

                input {
                    border: 1px solid #666666;
                    background: #fff;
                    width: 142px;
                    height: 28px;
                    line-height: 28px;
                    color: #000;
                    padding: 0 6px;
                    box-shadow: 0 0 6px #3a3a3a;
                }

                .input_tip {
                    display: block;
                    margin-left: 18%;
                    margin-top: 5px;
                }
            }
        }
    }

    .registered-data {
        border: 1px #b48d3e solid;

        padding-bottom: 20px;
        margin-top: 24px;
        position: relative;
        ul {
            li {
                margin: 15px 0px 0px 50px;
                &:first-of-type {
                    margin-top: 40px;
                }
                &.verify_box {
                    label {
                        .star {
                            display: inline;
                        }
                    }

                    #txtValidationCode2 {
                        width: 86px;
                    }

                    .yzm_reg {
                        position: absolute;
                        left: 240px;

                        .verify_icon {
                            width: 50px;
                            height: 27px;
                            margin-top: 1px;
                        }
                    }
                }
                &.btnees {
                    position: absolute;
                    left: -33px;
                    top: -25px;
                    background: #1b1b1b;
                    width: 56px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: #b48d3e;
                    font-weight: bold;
                }

                label {
                    display: block;
                    width: 100px;
                    height: 28px;
                    float: left;
                    line-height: 28px;
                    text-align: right;
                    padding-right: 8px;

                    span {
                        &.star {
                            color: #f00;
                            font-weight: bold;
                            vertical-align: -2px;
                        }
                    }
                }

                input {
                    border: 1px solid #666666;
                    background: #fff;
                    width: 142px;
                    height: 28px;
                    line-height: 28px;
                    color: #000;
                    padding: 0 6px;
                    box-shadow: 0 0 6px #3a3a3a;
                }
                .input_tip {
                    display: block;
                    margin-left: 18%;
                    margin-top: 5px;
                }
            }
        }
    }

    .agreeBox {
        margin: 12px 0px 0px 12px;
        font-size: 12px;

        .agreetxt {
            input[type='checkbox'],
            input[type='radio'] {
                transform: translate(0, 2px);
            }
            a {
                cursor: pointer;
                text-decoration: underline;
                color: #f68b1e;
            }
        }
    }

    .err {
        width: 262px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        border: 1px solid #666666;
        box-shadow: 0 0 6px #3a3a3a;
        border-radius: 3px;
        margin-top: 20px;
        margin-left: 18px;
        display: flex;
        align-items: center;

        i {
            padding: 2px 0 0 5px;
            margin-right: 5px;
            font-size: 15px;
        }
    }

    .regist-btn {
        margin-top: 30px;
        height: 39px;
        width: 100%;
        box-sizing: border-box;

        &::after {
            clear: both;
        }

        ul {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            li {
                float: left;
                .confirm_btn {
                    display: block;
                    width: 74px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    padding: 0 20px;
                    color: #000;
                    font-size: 16px;
                    font-family: 'Microsoft YaHei';
                    background: #fff;
                    border: 1px solid #5b5b5b;
                }
            }

            .reset_btn {
                cursor: pointer;
                display: block;
                width: 74px;
                height: 35px;
                float: left;
                margin-left: 5px;
                color: #000;
                font-size: 16px;
                font-family: 'Microsoft YaHei';
                background: #fff;
                border: 1px solid #5b5b5b;
            }
        }
    }

    .JM_content {
        padding: 0 10px 10px 20px;
        font-size: 10px;
        #joinmem {
            .resume_box {
                p {
                    font-size: 12px;
                    margin: 1em 0;

                    &.resume {
                        padding-left: 20px;
                        i {
                            color: #f00;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
}
</style>
