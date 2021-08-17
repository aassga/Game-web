<template>
    <div class="register">
        <div class="banner"></div>
        <div class="content clearfloat">
            <div class="nav-left fl">
                <div>
                    <img src="/static/99qp/img/zc.png" alt="">
                </div>
                <ul>
                    <li>
                        <p @click="$router.push('/home/about/1');"><span>关于我们</span><span>ABOUT US</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/about/4');"><span >取款帮助</span><span>WITHDRAW</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/about/3');"><span>存款帮助</span><span>DEPOSIT</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/about/2');"><span>联络我们</span><span>CONTACT US</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/tiyu?id=0');"><span>体育赛事</span><span>SPORTS</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/chess?navid=9&id=0');"><span>棋牌游戏</span><span>CHESS</span></p>
                    </li>
                    <li>
                        <p @click="$router.push('/home/slot?navid=9&id=0');"><span>电子游艺</span><span>GAME</span></p>
                    </li>
                </ul>
            </div>
            <div class="register-right fl">
                <div class="register-title">
                    <p>澳门威尼斯人官方直营线上娱乐场（千亿港元致力打造）8846.COM</p>
                    <p>目前已有3684359人 从这里进入《澳门威尼斯人》；已有338523个100万级VIP客户选择《澳门威尼斯人》！</p>
                </div>
                <div class="acount">
                    <div class="fromTitle">会员注册</div>
                    <div class="list-box">
                            <div class="text-context">
                                <div class="title"><span> * </span>会员帐号</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont yonghu"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="" type="text" v-model="userName" @blur="getCode" maxlength="10">
                                    <span>请输入<b>6-10个字符</b>, 仅可输入英文字母以及数字的组合!!</span>
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title"><span> * </span>登入密码</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont mima"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull1" v-on:keyup.enter="registerTest"
                                        placeholder="" type="password" v-model="password" maxlength="20">
                                    <span>密码规则：须为<b>8~20码英文或数字</b>符合0~9或a~z字元</span>
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title"><span> * </span>确认密码</div>
                                <div class="input-cont">
                                    <!-- <i class="iconfont mima"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" @keyup="clearNull1" v-on:keyup.enter="registerTest" placeholder=""
                                        type="password" v-model="password_confirmation" maxlength="20">
                                    <span>请再次确认密码</span>
                                </div>
                            </div>

                            

                            <!-- 短信验证码 -->
                            <!-- <div class="smsContainer" v-if="isShowSms">
                                <sms-input :qygj="theName" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                                </sms-input>
                            </div> -->
                             <!-- 手机号 微信等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title"><span> * </span>{{item.name}}</div>
                                    <div class="input-cont">
                                    <!-- <i class="iconfont" :class="item.divclass"></i> -->
                                    <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder=""
                                        type="text" v-model="item.value" :maxlength="item.maxlength">
                                        <span>{{item.placeholder}}</span>
                                    </div>
                                </div>
                            </div>
                             <div class="smsContainer" v-if="isShowSms">
                                <sms-input :qygj="'99qp'" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2" :showplaceholder='showplaceholder' :showCode='showCode'>
                                </sms-input>
                            </div>
                            <!-- 正常验证码 -->
                            <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                                <div class="title"><span> * </span>验证码</div>
                                <div class="input-cont input-cont1">
                                    <!-- <i class="iconfont yanzhengma"></i> -->
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder=""
                                        type="text" v-model="code" maxlength="4">
                                    <span class="yzm_reg">
                                        <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                                    </span>
                                    <span class="yam" @click="getCode">换一张</span>
                                </div>
                            </div>

                            <div class="text-context" v-if="iscode">
                                <div class="title"><span> * </span>邀请码</div>
                                <div class="input-cont">
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" 
                                        type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                                    <span>请输入邀请码</span>
                                </div>
                            </div>

                            <!-- 手机号 微信等信息 -->
                            <!-- <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title"><span> * </span>{{item.name}}</div>
                                    <div class="input-cont">
                                    <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder=""
                                        type="text" v-model="item.value" :maxlength="item.maxlength">
                                        <span>{{item.placeholder}}</span>
                                    </div>
                                </div>
                            </div> -->
                            <!-- 短信验证码 -->
                            <!-- <div class="smsContainer" v-if="isShowSms">
                                <sms-input :qygj="'99qp'" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2" :showplaceholder='showplaceholder' :showCode='showCode'>
                                </sms-input>
                            </div> -->
                            <!-- <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div> -->

                            <!-- <div @click="registerTest" class="submit">立即注册</div> -->
                            <!-- <div class="treaty">已有帐号 ?<span @click="changeTab(1)">点击登录</span></div> -->
                        </div>
                </div>
                <!-- <div class="datum" v-if="register.length">
                    <div class="member-title">会员资料</div>
                    
                     

                </div> -->
                <div class="submit-box">
                    <div data-v-5812be8c="" id="js-agree">
                        <p data-v-5812be8c="" id="memCash-agree">
                            <input data-v-5812be8c="" type="checkbox" name="agree" id="check1" value="Y" checked="checked">
                                                我已届满合法博彩年龄﹐且同意各项开户条约。
                        </p>
                    </div>
                    <div class="btn">
                        <span style="cursor: pointer" @click="registerTest">立即注册</span>
                        <span style="cursor: pointer" @click="reset" >注册重置</span>
                    </div>
                </div>
                <div class="remark">
                    <p>备注：</p>
                    <p>1.标记有 <span> * </span> 者为必填项目。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data1 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';
export default {
    mixins: [data1],
    data() {
        return {
            smsInputBox: {
                marginTop: '15px'
            },
            codeImg: '/static/99qp/img/new_games/lo.png',
            tabIndex:1,
            rememberPassword:false,
            paddingBottom2:"20px",
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '13px',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: '75px',
                height: '40px',
                lineHeight: '40px',
                color: '#696969',
                fontSize: '13px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-278px)'
            },
            star: {
                color:'#FF0000',
                fontSize: '16px',
                verticalAlign: '-4px'
            },
            inputBox: {
                width: '170px',
                height: '32px',
                lineHeight: '32px',
                color: '#000',
                fontSize: '16px',
                textIndent: '25px',
                outline: 'none',
                boxShadow: 'inset 1px 1px 5px 0px rgba(0, 0, 0, 0.11)',
                // border: 'solid 1px #cccccc',
                transform: 'translateX(-210px)',
                border:'none'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '1PX',
                right: '415PX',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '87px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '87px',
                height: '32px',
                lineHeight: '32px',
                textAlign: 'center',
                fontSize: '14px',
                borderRadius: '5px',
                boxSizing: 'border-box',
                transform: 'translateY(2px)'
            },
            beforeSend: {
                color: '#fff',
                background:"#FD4848"
            },
            reSend: {
                color: '#fff',
                background: '#FD4848'
            },
            msgTip: {
                margin: '5px 0 16px 170px',
                color: '#696969',
                fontSize: '12px'
            },
            showplaceholder:true,
            showCode:true,
        };
    },
    mounted() {
        setTimeout(()=>{
            this.inInCreate();
        },4000)
    },
    methods: {
        // 密码框禁止输入空格
        clearNull1(){
            this.password_confirmation = this.password_confirmation.replace(/\s+/g,"");
            this.password = this.password.replace(/\s+/g,"");
        },
        clearNull2(){
            this.passKey.password = this.passKey.password.replace(/\s+/g,"");
        },
         reset() {
            (this.userName = ''),
                (this.password = ''),
                (this.password_confirmation = ''),
                (this.verificationCode = ''),
                (this.InvitationCode = ''),
                (this.pulicError = ''),
                (this.code = ''),
                this.register &&
                    this.register.forEach(item => {
                        item.value = '';
                    });
        }
    },
    components: {
        smsInput,
    },
    created() {
    },
    store
};
</script>

<style lang="less" scoped>
.register {
    margin: 0 auto;
    .banner{
        max-width: 1920px;
        height: 300px;
        margin: 0 auto;
        background: url('/static/99qp/img/carouel/dl.png') center top/ cover no-repeat;
    }
    .content {
        position: relative;
        width: 1200px;
        margin: 30px auto;
        min-height: 645px;
        background-size: 100% 100%;
        .nav-left{
            width: 298px;
            ul{
                li{
                    height: 44px;
                    line-height: 44px;
                    cursor: pointer;
                    background-image:linear-gradient(0deg, 
                        #fafafa 0%, 
                        #ffffff 100%);
                    box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.15);
                    &:hover{
                        background: #5973f6;
                        p{
                           background: url('/static/99qp/img/zc_jt_h.png') 100% 50% no-repeat;
                           span{
                             &:first-child{
                                color: #fff;
                            }
                            &:nth-child(2){
                                color: #fff;
                            }
                           }
                        }
                    }
                    p{
                        width: 212px;
                        margin-left:68px;
                        background: url('/static/99qp/img/zc_jt.png') 100% 50% no-repeat;
                        span{
                            &:first-child{
                                font-size: 16px;
                                color: #666666;
                            }
                            &:nth-child(2){
                                font-size:12px;
                                color: #949494;
                                margin-left:5px;
                            }
                        }
                        i{
                            margin-left:46px;
                        }
                    }
                    
                }
                
            }
        }
        .register-right{
            margin-left:48px;
            .register-title{
                margin:31px 0 0 9px;
                p{
                    font-size: 14px;
                    line-height: 25px;
                    letter-spacing: 1px;
                    color: #6a6a6a;
                 }
            }
            .acount{
                width: 854px;
                min-height: 289px;
                margin-top:45px;
                box-shadow: 3px 4px 21px 0px 
                    rgba(0, 0, 0, 0.17);
                border: solid 1px #e2e2e2;
                .fromTitle{
                    width: 86px;
                    height: 34px;
                    line-height: 34px;
                    margin:-17px 0 0 20px;
                    background-color: #5973f6;
                    font-size: 13px;
                    font-weight: bold;
                    line-height: 31px;
                    letter-spacing: 1px;
                    color: #ffffff;
                    text-align: center;
                }
                .list-box {
                    margin:45px 0 0 42px;
                    .text-context {
                        margin-bottom:23px;
                        box-sizing: border-box;
                        .title {
                            width: 70px;
                            text-align: left;
                            display: inline-block;
                            font-size: 13px;
                            letter-spacing: 1px;
                            color: #666666;
                            span{
                                color: #ff0000;
                                font-size:16px;
                                vertical-align: -4px;
                            }
                        }
                    
                    .input-cont {
                        position: relative;
                        display: inline-block;
                        margin-left:54px;
                        .iconfont {
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                            color: #bbafd2;
                            z-index: 9;
                        }
                        input {
                            position: relative;
                            width: 265px;
                            height: 32px;
                            line-height: 32px;
                            box-shadow: inset 1px 1px 5px 0px 
                                rgba(0, 0, 0, 0.11);
                            border: solid 1px #cccccc;
                            padding-left: 25px;
                            border: none;
                            outline: 0;
                        }
                        input::-webkit-input-placeholder {
                            font-size: 16px;
                            color: #A6A6A6;
                        }
                        span{
                            font-size: 13px;
                            color: #777777;  
                            margin-left:14px;
                            b{
                                color: #ff0000;
                                font-weight: normal;
                            }
                        }
                    }
                    .input-cont1 {
                        width: 160px!important;
                        input{
                            width:160px!important;
                        }
                    }

                    i {
                        position: absolute;
                        top: 10px;
                        left: 13px;
                        font-size: 24px;
                        color: #949494;
                    }
                    
                    .yzm_reg {
                        position: absolute;
                        top: -1px;
                        right: -105px;
                        cursor: pointer;

                        img {
                            height: 35px;
                            width: 100px;
                            border-radius: 5px;
                        }
                    }
                    .yam {
                        position: absolute;
                        top: 7px;
                        right: -170px;
                        color: #5caaea;
                        cursor: pointer;
                    }
                }
               
                .err {
                    width: 180px;
                    margin-left: 210px;
                    height: 30px;
                    line-height: 30px;
                    color: #444444;
                    font-size: 14px;
                    border: 1px solid #666666;
                    box-shadow: 0 0 6px #3a3a3a;
                    // background: #fdffef;
                    border-radius: 3px;
                    // padding: 0 14px;
                    margin-bottom: 20px;

                    i {
                        padding-left: 5px;
                        font-size: 15px;
                    }
                }
                
                }
            
            }
            .datum{
                    width: 854px;
                    min-height: 147px;
                    margin-top:36px;
                    box-shadow: 3px 4px 21px 0px 
                        rgba(0, 0, 0, 0.17);
                    border: solid 1px #e2e2e2;
                        padding-bottom: 27px;
                .member-title{
                  width: 86px;
                  height: 34px;
                  margin:-17px 0 0 20px;
                  background-color: #5973f6;
                  text-align: center;
                  font-family: MicrosoftYaHei;
                  font-size: 13px;
                  font-weight: bold;
                  line-height: 34px;    
                  letter-spacing: 1px;
                  color: #ffffff;
                }
                .text-context{
                    margin:28px 0 0 42px;
                    .title{
                        width: 70px;
                        text-align: right;
                        display: inline-block;
                        font-size: 13px;
                        letter-spacing: 1px;
                        color: #666666;
                        span{
                                color: #ff0000;
                                font-size:16px;
                                vertical-align: -4px;
                            }
                    }
                    .input-cont{
                        position: relative;
                        display: inline-block;
                        margin-left: 54px;
                        input{
                            position: relative;
                            width: 265px;
                            height: 32px;
                            line-height: 32px;
                            box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.11);
                            border: solid 1px #cccccc;
                            padding-left: 25px;
                            border: none;
                            outline: 0;
                        }
                        span{
                            font-size: 13px;
                            color: #777777;
                            margin-left:14px;
                        }
                    }
                }
            }
            .submit-box{
                width: 300px;
                margin:0 auto;
                #js-agree{
                    display: block;
                    font-size: 10px;
                    margin-top:55px;
                    #memCash-agree{
                        padding-left: 20px;
                        input{
                            height: 13px;
                            transform: translateY(2px);
                        }
                    }

                }
                .btn{
                    margin:28px 0 0 16px;
                    span{
                        display: inline-block;
                        width: 132px;
                        height: 39px;
                        line-height: 39px;
                        border-radius: 6px;
                        font-size: 18px;
                        color: #ffffff;
                        text-align: center;
                        &:first-child{
                            background-image: linear-gradient(90deg, 
                                #fa6665 0%, 
                                #ee2f2d 100%), 
                            linear-gradient(
                                #d20000, 
                                #d20000);
                            background-blend-mode: normal, 
                                normal;
                        }
                        &:last-child{
                            background-image: linear-gradient(-19deg, 
                                #5b71e8 0%, 
                                #789afa 100%), 
                            linear-gradient(
                                #2665b2, 
                                #2665b2);
                            background-blend-mode: normal, 
                                normal;
                            margin-left:4px;
                        }
                    }
                }
                
            }
            .remark{
                    margin:29px 53px 0 0;
                    p{
                        font-size: 13px;
                        line-height: 30px;
                        color: #666666;
                        span{
                           color: #ff0000;
                           margin:0 5px;
                           vertical-align: -4px;
                        }
                    }
                }
        }
    }
}

</style>
