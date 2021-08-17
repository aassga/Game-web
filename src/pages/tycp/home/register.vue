<template>
    <div class="wbw-register">
        <h3 class="reg_tit">用户注册</h3>
        <p class="reg_small"></p>
        <ul class="regMain">
            <!-- 账号 -->
            <li>
                <span>帐号：</span>
                <input type="text" placeholder="帐号（6-10位数字或字母）" autocomplete="off" class="userInput" v-model="userName" @blur="getCode"
                    minlength="6" maxlength="10">
            </li>
            <!-- 密码 -->
            <li>
                <span>密码：</span>
                <input type="password" placeholder="密码（8-20位数字或字母）" @keyup="clearNull" autocomplete="off" class="userInput" v-model="password" minlength="8"
                    maxlength="20">
            </li>
            <!-- 确认密码 -->
            <li>
                <span>重复密码：</span>
                <input type="password" placeholder="密码（8-20位数字或字母）" @keyup="clearNull" autocomplete="off" class="userInput" v-model="password_confirmation"
                    maxlength="20">
            </li>
            <!-- 手机号等信息 -->
            <li v-for="(item,key) in register" :key="key">
                <span>{{item.name}}</span>
                <input type="text" autocomplete="off" class="userInput" v-model="item.value" :maxlength="item.maxlength">
            </li>
            <!-- 验证码 -->
            <li>
                <span>验 证 码：</span>
                <input type="passwoed" autocomplete="off" class="userInput" v-model="code" placeholder="邀请码" maxlength="4">
                <span class="codeyzm" :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'cover'}" @click="getCode"></span>
            </li>
            <!-- 邀请码 -->
            <li v-if="iscode">
                <span>邀请码：</span>
                <input type="text" placeholder="邀请码" autocomplete="off" class="userInput" v-model="intacode" :readonly="incodeReadonly">
            </li>

            <li>
                <span></span>
                <input type="checkbox" style="width: inherit; margin-right: 5px;" v-model="isCheckbox">
                <span class="man18">我已经年满18岁</span>
            </li>

            <li style="margin-top: 10px;">
                <span></span>
                <a class="mainColorBtn" @click="registerTest">注 册</a>
                <a class="chongzhi" @click="reset">重 置</a>
            </li>
        </ul>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data from '../../public/user/register';
export default {
    mixins: [data],
    data() {
        return {};
    },
    methods: {
        login() {
            this.$store.commit('mainState/setChooseModel', '登录');
            this.$store.commit('mainState/setLoginTitle', '登录');
        },

        reset() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            this.register.forEach(v => {
                v.value = '';
            });
        }
    },
    created() {},
    mounted() {},
    store
};
</script>

<style lang="less" scoped>
.wbw-register {
    width: 870px;
    min-height: 480px;
    margin: 30px auto;
    border: 1px solid #e1e1e2;
    padding-top: 20px;
    font-size: 14px;
    background: url('../../../../static/tycp/img/home/loginBg.png') no-repeat 450px 220px #fff;

    h3 {
        font-size: 24px;
        color: #ff2c55;
        margin-bottom: 5px;
        margin-left: 30px;
        margin-top: 0;
    }

    p {
        margin-left: 30px;
        color: #646464;
        margin-bottom: 10px;
        margin-top: 0;
        height: 24px;
    }

    .regMain {
        border-top: 1px dashed #e0e3e6;
        padding: 50px 0;
        font-size: 0;
        margin: 0 30px;

        li {
            color: #000;
            line-height: 36px;
            margin-bottom: 4px;
            position: relative;

            > span {
                display: inline-block;
                width: 18%;
                text-align: right;
                font-size: 12px;
                color: #333;
                padding-right: 5px;
            }

            .man18 {
                width: 12%;
            }

            > input {
                height: 36px;
                width: 280px;
                border: 1px solid #e7e8e8;
                background-color: #feffff;
                color: #a9a9a9;
                padding-left: 10px;
                text-indent: 6px;
                margin: 0;
                vertical-align: top !important;
                line-height: 20px;
                padding: 5px;
                font-size: 12px;
            }

            > input:focus {
                outline: none;
            }

            .codeyzm {
                width: 110px;
                height: 30px;
                padding-left: 10px;
                position: absolute;
                top: 3px;
                left: 313px;
            }

            .mainColorBtn {
                display: inline-block;
                width: 130px;
                line-height: 36px;
                color: #fff !important;
                padding: 0 15px;
                border-radius: 3px;
                font-size: 14px;
                margin-right: 10px;
                min-width: 55px;
                text-align: center;
                cursor: pointer;
                background: #e4393c;
                margin: 10px 0;
            }

            .chongzhi {
                display: inline-block;
                width: 130px;
                line-height: 36px;
                color: #fff !important;
                padding: 0 15px;
                border-radius: 3px;
                font-size: 14px;
                margin-right: 10px;
                min-width: 55px;
                text-align: center;
                cursor: pointer;
                background: rgb(113, 112, 116);
                margin: 10px 0;
                margin-left: 20px;
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
