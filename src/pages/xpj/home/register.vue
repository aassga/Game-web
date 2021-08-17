<template>
    <div>
        <div id="news" popup-news="" popup-page="register home">
            <div class="wrapper">
                <div class="marquee">
                    <marquee scrollamount="3" scrolldelay="100" direction="left" onmouseover="this.stop();" onmouseout="this.start();"
                        style="cursor:pointer;font-size:14px">
                        <span v-html="lantern"></span>
                    </marquee>
                </div>
            </div>
        </div>
        <div class="reginer_box">
            <div class="reginer_cont">

                <div id="left_center">
                    <ul id="sidebar">
                        <li><a @click="goLink('/home/games?id=10022&name=MG老虎机')">电子游艺</a></li>
                        <li><a @click="goLink('/home/games?id=10022&name=MG老虎机')">MG电子</a></li>
                        <li><a @click="goLink('/home/buyu')">捕鱼游戏</a></li>
                        <li><a @click="goLink('/home/live')">真人视讯</a></li>
                        <li><a @click="goLink('/home/tiyu')">体育赛事</a></li>
                        <li><a @click="goLink('/home/youhui')">优惠活动</a></li>
                        <li><a @click="goLink('/service')">在线客服</a></li>
                    </ul>
                </div>

                <div id="right_center">
                    <!-- 注册 -->
                    <div class="loginer">
                        <span
                            style="font-family: &quot;Microsoft YaHei&quot;,微软雅黑,&quot;MicrosoftJhengHei&quot;,华文细黑,STHeiti,MingLiu;font-size: 17px;padding: 0 4px 0 10px; display:block; ">
                            <div class="register-slogan">新葡京赌场，欢迎您的加入！<span ng-bind="ContactInfo.Easydomain" class="ng-binding"></span>
                            </div>

                            <p>*新葡京赌场不计输赢天天返水高达2.0%无上限</p>
                            <p>*MG电子天天返水2.0%起！电子游艺更有七大专题优惠！</p>
                            <p>*MW大满贯电子千炮捕鱼隆重推出,无论输赢天天返利28033！</p>
                            <p>*24小时提款0审核0冻结0手续费不限提款次数，存取款0-5分钟火速到帐；</p>
                            <p>*畅享极速存款，手机也能在线支付，微信/支付宝支付扫一扫1~5000秒到帐；</p>

                        </span>
                        <form method="post" name="myFORM" class="JoinMemForm" id="myFORM" style="display: block;color:#fff">
                            <!-- 第三方登入 -->
                            <input type="hidden" name="key" value="add">
                            <input type="hidden" name="SS" value>
                            <input type="hidden" name="SR" value>
                            <input type="hidden" name="TS" value>

                            <!--会员资料-->
                            <fieldset>
                                <legend class="join-acc">注册帐号</legend>
                                <p style="position:relative;min-height:1px;">
                                    <a style="position:absolute;top:0px;"></a>
                                </p>

                                <!-- 账号 -->
                                <p id="js-username" style="display: block;">
                                    <label>
                                        <span class="star" style="display: inline;">*&nbsp;</span>帐 号：
                                    </label>
                                    <input type="text" name="username" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="账号" id="username" v-model="userName" value maxheight="30" size="15" @blur="getCode"
                                        maxlength="10" autocomplete="off">
                                    <span>请输入6-10个字元, 仅可输入英文字母以及数字的组合!!</span>
                                </p>

                                <!-- 密码 -->
                                <p id="js-password" style="display: block;">
                                    <label>
                                        <span class="star" style="display: inline;">*&nbsp;</span>密 码：
                                    </label>
                                    <input type="password" name="password" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        id="password" v-model="password" value class="password_adv" size="15" maxlength="20"
                                        placeholder="密码" autocomplete="off">
                                    <span>
                                        *密码规则：须为8~20码英文或数字符合0~9或a~z字元
                                    </span>
                                </p>

                                <!-- 确认密码 -->
                                <p id="js-passwd" style="display: block;">
                                    <label title="确认密码">
                                        <span class="star" style="display: inline;">*&nbsp;</span>确认密码：
                                    </label>
                                    <input type="password" name="passwd" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        id="passwd" value v-model="password_confirmation" size="15" maxlength="20" placeholder="请再次输入密码">
                                </p>

                                <!-- 短信验证码 -->
                              

                                <!-- 图片验证码 -->
                                <p id="js-rmNum" style="display: block;" v-if='!isShowSms&&!isShowTnCode'>
                                    <label>
                                        <span class="star" style="display: inline;">*&nbsp;</span>验证码：
                                    </label>
                                    <input class="pwd-input-set RmNum" name="rmNum" id="rmNum" type="text" size="4" @keydown="pulicError=''"
                                        v-model="code" title="( 点选此处产生新验证码 )" placeholder="验证码" minlength="4" maxlength="4">
                                    <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" style="cursor:pointer">
                                </p>

                                <!-- 邀请码 -->
                                <p id="js-InvitationCode" style="display: block;" v-if="iscode">
                                    <label>
                                        <span class="star" style="display: inline;">*&nbsp;</span>邀请码：
                                    </label>
                                    <input type="text" name="InvitationCode" v-on:keyup.enter="registerTest" @keydown="pulicError=''"
                                        v-model="intacode" id="InvitationCode" value class="InvitationCode_adv" size="15" minlength="6"
                                        maxlength="6" :readonly="incodeReadonly" placeholder="邀请码">
                                </p>
                            </fieldset>

                            <!--其他资料-->
                            <fieldset v-if="register.length">
                                <legend class="join-acc">会员资料</legend>
                                <p class="row" v-for="(item,index) in register" :key="index" v-if="JSON.stringify(item) !== '{}'">
                                        <label>
                                            <span class="star" style="display: inline;">*&nbsp;</span>
                                            {{item.name}}：
                                        </label>
                                        <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                                </p>
                                <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :reSend="reSend"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :star="star" :beforeSend="beforeSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                                    :countDownTime="countDownTime">
                                </sms-input>
                            </fieldset>

                            <!-- 同意條約 -->
                            <div id="js-agree" style="display: block;font-size:10px;">
                                <p id="memCash-agree" style="padding-left: 20px;">
                                    <input type="checkbox" name="agree" id="check1" value="Y" style="height:13px;" v-model="isCheckbox"
                                        checked>我已届满合法博彩年龄﹐且同意各项开户条约。
                                </p>
                            </div>
                            <br>

                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <!-- 确认/重设 -->
                            <div id="memCash-confirm" align="center">
                                <input type="button" name="OK2" id="OK2" class="joinform_submit" value="确认" @click="registerTest"
                                    style="cursor:pointer">
                                <input type="reset" name="CANCEL2" id="CANCEL2" class="joinform_cancel" value="重设" @click="reset"
                                    style="cursor:pointer">
                            </div>

                            <!-- 备注 -->
                            <div class="JM_content JM_content_b">
                                <div id="joinmem">
                                    <div>
                                        <p>备注：</p>
                                        <p>1.标记有 * 者为必填项目。</p>
                                        <!-- <p>2.取款密码为取款时的凭证,请会员务必仔细填写。</p> -->
                                    </div>
                                </div>
                            </div>
                        </form>
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
import data from '../../public/user/register_copy.js';
import data1 from '../../public/homeMeans/Aside';
import data2 from '../../public/homeMeans/home_index';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data, data1, data2],
    data() {
        return {
            codeImg:"/static/xpj/img/new_games/re.png",
            lantern: '',
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
            curLabel: {
                width: '135px',
                height: '25px',
                lineHeight: '25px',
                color: '#fff',
                fontSize: '12px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-193px)'
            },
            star: {
                color: '#fff',
                fontWeight: 'bold',
                verticalAlign: '-2px'
            },
            inputBox: {
                width: '81px',
                height: '22px',
                border: 'none',
                boxShadow: '0 0 6px #3a3a3a',
                borderRadius: '3px',
                color: '#444',
                fontSize: '12px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-183px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '226px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            btnStyle: {
                display: 'inline-block',
                height: '22px',
                lineHeight: '21px',
                fontSize: '10px',
                borderRadius: '3px',
                padding: '0 3px',
                transform: 'translateY(1px)'
            },
            beforeSend: {
                color: '#fff',
                background:"#ff8605"
            },
            reSend: {
                color: '#fff',
                background:"#39a8d6"
            },
            msgTip: {
                margin: '7px 0 16px 151px',
                color: '#fff',
                fontSize: '12px'
            }
        };
    },
    methods: {
        goLink(link) {
            if (link == '/service') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else {
                this.$router.push({
                    path: link
                });
            }
        },

        reset() {
            (this.userName = ''),
                (this.password = ''),
                (this.password_confirmation = ''),
                (this.verificationCode = ''),
                (this.InvitationCode = ''),
                (this.pulicError = ''),
                (this.code = ''),
                (this.pulicError = ''),
                this.register &&
                    this.register.forEach(item => {
                        item.value = '';
                    });
        }
    },
    mounted() {
        this.getLantern();
    },
    components: { smsInput },
    created() {
    },
    store
};
</script>

<style lang="less" scoped>
#news {
    position: relative;
    z-index: 1;
    margin-top: -35px;
    height: 34px;
    border-bottom: 1px solid #263c78;
    background: url(/static/xpj/img/newbg.png);
    .wrapper {
        position: relative;
        width: 1040px;
        margin: 0 auto;
        padding: 0 0 0 95px;
        height: 34px;
        line-height: 34px;
        background: url(/static/xpj/img/news.png) no-repeat left center;

        .marquee {
            float: left;
            width: 945px;
            color: #ffffff;
            font-size: 10px;
            height: 34px;
        }
    }
}
.reginer_box {
    width: 100%;
    overflow: hidden;
    // position: relative;
    background: #142044 url('/static/xpj/img/reginer_bg.jpg') center top no-repeat;

    .reginer_cont {
        width: 1040px;
        height: auto;
        margin: 20px auto;
        padding: 33px 33px 22px;
        border: 1px solid #1e3064;
        background: url(/static/xpj/img/unlobbybg.png);
        overflow: hidden;

        #left_center {
            float: left;
            width: 235px;
            height: 683px;
            padding: 86px 0 0;
            background: url(/static/xpj/img/aside.png) no-repeat left top;
            overflow: hidden;

            #sidebar li {
                width: 232px;
                height: 48px;

                a {
                    display: block;
                    height: 100%;
                    padding-left: 68px;
                    color: #fff;
                    font-size: 16px;
                    text-align: left;
                    text-decoration: none;
                    line-height: 45px;
                    background: url(/static/xpj/img/aside_btn.png) no-repeat;
                }

                &:hover a {
                    color: #f4f183;
                    background: url(/static/xpj/img/aside_btnh.png) no-repeat;
                }
            }
        }

        #right_center {
            float: right;
            color: #ffff;

            .register-slogan {
                height: 58px;
                padding-top: 25px;
                font-size: 14px;
                text-align: center;
                background: url(/static/xpj/img/register_slogan.png) no-repeat left center;
                color: #fff;
            }

            p {
                font-size: 12px;
                margin: 1em 0;
                color: #fff;
            }

            .JoinMemForm {
                fieldset {
                    font-size: 10px;
                    border: 1px solid #30478e;
                    margin: 10px;
                    padding: 10px;

                    legend {
                        margin-left: 25px;
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: bold;
                        background: #121d3f;
                    }

                    p {
                        label {
                            float: left;
                            height: 25px;
                            line-height: 25px;
                            text-align: right;
                            width: 135px;
                            .star {
                                font-weight: bold;
                                vertical-align: -2px;
                            }
                            .red {
                                color: rgb(255, 0, 0);
                            }
                        }
                        span {
                            display: inline-block;
                            line-height: 25px;
                        }
                        input {
                            width: 148px;
                            height: 22px;
                            line-height: 22px;
                            border: 1px solid #666;
                            box-shadow: 0 0 6px #3a3a3a;
                            border-radius: 3px;
                            color: #444;
                            font-size: 12px;
                            text-indent: 6px;
                            outline: none;
                            border: none;
                            margin: 0 15px;

                            &#rmNum {
                                width: 81px;
                                margin: 0 0 0 15px;
                            }
                        }
                        img {
                            width: 58px;
                            height: 23px;
                            vertical-align: middle;
                            margin-left: 5px;
                            border-radius: 3px;
                        }
                        .memCash_text {
                            display: block;
                            padding: 5px 0 0 135px;
                            min-height: 26px;
                            border: 0;
                            font-size: 100%;
                            font: inherit;
                            vertical-align: baseline;
                        }
                    }
                }
                #memCash-confirm {
                    input {
                        display: inline-block;
                        width: 106px;
                        height: 38px;
                        margin: 0 5px;
                        padding: 0;
                        color: #fff;
                        font-size: 17px;
                        font-weight: bold;
                        line-height: 38px;
                        vertical-align: top;
                        border: none;
                        border-radius: 5px;
                        background: transparent url(/static/xpj/img/btn.png) no-repeat center top;
                        &:hover {
                            background-position: 0 -38px;
                        }
                    }
                }
            }
            .err {
                display: inline-block;
                min-width: 210px;
                padding-right: 8px;
                margin: 0 0 20px 22px;
                height: 30px;
                line-height: 30px;
                color: #fff;
                font-size: 14px;
                border: 1px solid #666;
                box-shadow: 0 0 6px #3a3a3a;
                border-radius: 3px;

                i {
                    padding-left: 5px;
                    font-size: 15px;
                }
            }
            .JM_content {
                padding: 10px 10px 10px 20px;
                font-size: 10px;
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
