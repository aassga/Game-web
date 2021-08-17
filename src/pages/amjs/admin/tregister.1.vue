<template>
    <div class="register">
        <vp-register class="registerBox"></vp-register>
        <div class="about-banner"></div>
       <div class="abount-main">
             <vp-notice></vp-notice>
           <div class="cs">
               <div class="conter">
                   <!-- 新手指南 -->
                   <vp-sidebar></vp-sidebar>
                   <!-- 注册 -->
                   <!-- <div class="right"> -->
                       <!-- <div class="head">
                           <p  class="join" style="background: url(/static/amjs/img/favicon.ico) no-repeat left center;background-size: 48px 48px;">立即加入</p>
                       </div> -->
                       <!-- <div class="content">
                           <h2>注册账号</h2>
                            <p id="js-username" style="display: block;">
                                <label>
                                    <span class="star" style="display: inline;">*&nbsp;</span>会员帐号：
                                </label>
                                <input type="text" name="username" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                    id="username" v-model="userName" value maxheight="30" size="15" @blur="getCode"
                                    maxlength="10" placeholder="账号">
                                <i style="display: block;margin-top: 5px;margin-left: 24%;">
                                    请输入<strong>6-10个字元</strong>, 仅可输入英文字母以及数字的组合!!</i>
                            </p>
                           <div class="use" style="font-size:12px">
                               <label>
                                <span class="title">会员账号:</span>
                                <input @keydown="pulicError=''" 
                                v-on:keyup.enter="registerTest"
                                id="username" 
                                v-model="userName" 
                                value 
                                maxheight="30" 
                                size="15" 
                                @blur="getCode"
                                maxlength="10" 
                                name="username" 
                                type="text">
                               
                               </label>
                                <p>
                                 <span class="title"></span>
                                <i style="display: block;text-align: left">须为<font style="color:#ff0000">6-10</font>仅可输入英文字母以及数字的组合!!
                                </i>
                                 </p>
                           </div>
                           <div class="pass" style="font-size:12px">
                               <label>
                                <span class="title">登入密码:</span>
                                <input type="password" name="password" @keydown="pulicError=''"
                                v-on:keyup.enter="registerTest"
                                id="password" v-model="password" value
                                maxlength="20"
                                >
                                 <br>
                                 <span class="title"></span>
                                 <i style="display: block;text-align: left">密码规则：须为<font style="color:#ff0000">8~20码英文或数字</font>符合0~9或a~z字元
                                </i>
                               </label>
                           </div>
                           
                           <div class="rep" style="font-size:12px">
                               <label>
                                <span class="title">确认密码:</span>
                                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                placeholder="请再次输入密码"
                                  v-model="password_confirmation"
                                  maxlength="20"
                                  value type="password" name="passwd" >
                               </label>
                           </div>
                           <!-- 普通验证码 -->
                           <!-- v-if="!isShowSms&&!isShowTnCode" -->
                             <!-- <div id="js-rmNum" style="display: block;" >
                                <label>
                                <span class="title">*验证码:</span>
                                <input class="pwd-input-set RmNum" name="rmNum" id="rmNum" type="text" size="4"
                                    placeholder="验证码" @keydown="pulicError=''" v-model="code" title="( 点选此处产生新验证码 )"
                                    maxlength="4">
                                <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" style="cursor:pointer">
                                <br>
                                 <span class="title" style="display: block;"></span>
                                 <i style="display: block;text-align: left">
                                </i>
                                </label>
                            </div> -->
                            <!-- 邀请码 -->
                            <!-- v-if="iscode" -->
                            <!-- <div id="js-InvitationCode" style="display: block;font-size:12px" >
                                <label>
                                    <span class="title">*邀请码：</span>
                                    <input type="text" name="InvitationCode" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                    @keydown="pulicError=''" v-model="intacode" id="InvitationCode" value
                                    class="InvitationCode_adv" size="15" :readonly="incodeReadonly" maxlength="6">
                                    <br>
                                     <span class="title" style="display: block;"></span>
                                    <i style="display: block;text-align: left"></i>
                                </label>
                            </div>
                           <div class="reg-bottom"></div>
                             <h2>会员资料</h2>
                        <div style="font-size:12px" v-for="(item,index) in register" :key="index">
                                <label v-if="JSON.stringify(item) !== '{}' ">
                                    <span class="title">*{{item.name}}：</span>
                                     <input type="text" :placeholder="item.placeholder" v-model="item.value"
                                    :maxlength="item.maxlength">
                                </label>
                        </div> -->

                        <!-- 短信验证码 -->
                        <!-- v-if="isShowSms" -->
                        <!-- <sms-input  :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper"
                            :curLabel="curLabel" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle"
                            :msgTip="msgTip" :reSend="reSend" :beforeSend="beforeSend" @my-event="getMsgCode"
                            v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                            :countDownTime="countDownTime" :star='star'>
                        </sms-input>
                           <div class="reg-bottom"></div>
                           <p class="check" style="text-align:left;margin-left:14px">
                               <input  value="Y" v-model="agree" type="checkbox" class="checkbox" checked='checked'>
                               <span>我已届满合法博彩年龄﹐且同意各项开户条约。</span>
                               <a target='_blank'>开户协议</a>
                           </p> -->
                       
                       <!-- </div> --> 
                        <!-- 确认/重设 -->
                        <!-- <div id="memCash-confirm" align="center">
                            <input type="button" name="OK2" id="OK2" class="joinform_submit" value="确认"
                             @click="registerTest"   style="cursor:pointer">
                            <input type="reset" name="CANCEL2" id="CANCEL2" class="joinform_cancel" value="重设"
                              @click="reset"      style="cursor:pointer">
                        </div> -->

                        <!-- 备注 -->
                        <!-- <div class="JM_content JM_content_b">
                            <div id="joinmem" style="line-height: 30px;">
                                <div>
                                    <p style="text-algin:left;">备注：</p>
                                    <p style="text-algin:left;">1.标记有 <b>*</b> 者为必填项目。</p>
                                </div>
                            </div>
                        </div> -->
                      
                   <!-- </div> -->
                     <div class="gywm_nr">
                        <div class="zci">
                            <div id="right_center">
                                <!-- 注册 -->
                                <div class="loginer">
                                    <form method="post" name="myFORM" class="JoinMemForm" id="myFORM" style="display: block;">
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
                                                    <span class="star" style="display: inline;">*&nbsp;</span>会员帐号：
                                                </label>
                                                <input type="text" name="username" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                                    id="username" v-model="userName" value maxheight="30" size="15" @blur="getCode"
                                                    maxlength="10" placeholder="账号">
                                                <i style="display: block;margin-top: 5px;margin-left: 24%;">
                                                    请输入<strong>6-10个字元</strong>, 仅可输入英文字母以及数字的组合!!</i>
                                            </p>

                                            <!-- 密码 -->
                                            <p id="js-password" style="display: block;">
                                                <label>
                                                    <span class="star" style="display: inline;">*&nbsp;</span>登入密码：
                                                </label>
                                                <input type="password" name="password" @keydown="pulicError=''"
                                                    v-on:keyup.enter="registerTest" id="password" v-model="password" value
                                                    class="password_adv" size="15" maxlength="20" placeholder="密码">
                                                <i style="display: inline-block;width: 72%;margin-left: 24%;">
                                                    密码规则：须为<strong>8~20码英文或数字</strong>符合0~9或a~z字元
                                                </i>
                                            </p>

                                            <!-- 确认密码 -->
                                            <p id="js-passwd" style="display: block;">
                                                <label title="确认密码">
                                                    <span class="star" style="display: inline;">*&nbsp;</span>确认密码：
                                                </label>
                                                <input type="password" name="passwd" @keydown="pulicError=''" placeholder="请再次输入密码"
                                                    v-on:keyup.enter="registerTest" id="passwd" value v-model="password_confirmation"
                                                    size="15" maxlength="20">
                                            </p>

                                            <!-- 普通验证码 -->
                                            <p id="js-rmNum" style="display: block;" v-if="!isShowSms&&!isShowTnCode">
                                                <label>
                                                    <span class="star" style="display: inline;">*&nbsp;</span>验证码：
                                                </label>
                                                <input class="pwd-input-set RmNum" name="rmNum" id="rmNum" type="text" size="4"
                                                    placeholder="验证码" @keydown="pulicError=''" v-model="code" title="( 点选此处产生新验证码 )"
                                                    maxlength="4">
                                                <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" style="cursor:pointer">
                                            </p>

                                            <!-- 邀请码 -->
                                            <p id="js-InvitationCode" style="display: block;" v-if="iscode">
                                                <label>
                                                    <span class="star" style="display: inline;">*&nbsp;</span>邀请码：
                                                </label>
                                                <input type="text" name="InvitationCode" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                                    @keydown="pulicError=''" v-model="intacode" id="InvitationCode" value
                                                    class="InvitationCode_adv" size="15" :readonly="incodeReadonly" maxlength="6">
                                            </p>
                                        </fieldset>

                                        <!--其他资料-->
                                        <fieldset v-if="register.length">
                                            <legend class="join-acc">会员资料</legend>
                                            <p class="row" v-for="(item,index) in register" :key="index">
                                                <span v-if="JSON.stringify(item) !== '{}' ">
                                                    <label>
                                                        <span class="star" style="display: inline;">*&nbsp;</span>
                                                        {{item.name}}：
                                                    </label>
                                                    <input type="text" :placeholder="item.placeholder" v-model="item.value"
                                                        :maxlength="item.maxlength">
                                                </span>
                                            </p>

                                            <!-- 短信验证码 -->
                                            <sms-input v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper"
                                                :curLabel="curLabel" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle"
                                                :msgTip="msgTip" :reSend="reSend" :beforeSend="beforeSend" @my-event="getMsgCode"
                                                v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                                                :countDownTime="countDownTime" :star='star'>
                                            </sms-input>
                                        </fieldset>

                                        <!-- 同意條約 -->
                                        <div id="js-agree">
                                            <p id="memCash-agree">
                                                <input type="checkbox" name="agree" id="check1" value="Y" v-model="agree" checked>
                                                我已届满合法博彩年龄﹐且同意各项开户条约。
                                            </p>
                                        </div>
                                        <br>

                                        <div class="err" v-if="pulicError">
                                            <i class="iconfont icon-baojing"></i>
                                            <span ref="pulicError">{{pulicError}}</span>
                                        </div>

                                        <!-- 确认/重设 -->
                                        <div id="memCash-confirm" align="center">
                                            <input type="button" name="OK2" id="OK2" class="joinform_submit" value="确认"
                                                @click="registerTest" style="cursor:pointer">
                                            <input type="reset" name="CANCEL2" id="CANCEL2" class="joinform_cancel" value="重设"
                                                @click="reset" style="cursor:pointer">
                                        </div>

                                        <!-- 备注 -->
                                        <div class="JM_content JM_content_b">
                                            <div id="joinmem">
                                                <div>
                                                    <p>备注：</p>
                                                    <p>1.标记有 <b>*</b> 者为必填项目。</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import vpRegister from './nregister';
import store from '@/vuex/store';
import vpNotice from '../home/notice';
import vpSidebar from '../home/sidebar';
import data from '../../public/user/register_copy.js';
import smsInput from '../../public/home/smsInput';
export default{
    mixins: [data],
    store,
    components:{
       vpRegister,
       vpSidebar,
       vpNotice,
       smsInput
    },
    data(){
        return{
            codeImg:'/static/blr/img/new_games/re.png',
            agree: true,
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
            star:{
               color:"#FF0000"
            },
            curLabel: {
                width: '100px',
                height: '25px',
                lineHeight: '25px',
                color: '#fff',
                fontSize: '12px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-177px)'
            },
            inputBox: {
                width: '102px',
                height: '22px',
                border: '1px solid #666',
                boxShadow: '0 0 6px #3a3a3a',
                borderRadius: '3px',
                color: '#444',
                fontSize: '12px',
                textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-166px)'
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
                height: '22px',
                lineHeight: '21px',
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
                margin: '5px 0 30px 152px',
                color: '#fff',
                fontSize: '12px'
            }

        }
    },
    methods:{
        reset(){
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
    }
}
</script>
<style lang="less" scoped>
.register{
    position: relative;
    .registerBox {
        position: absolute;
        top: 28px;
        left: 0;
        right: 0;
    }
   .about-banner {
        min-height: 291px;
        background: #272727 url(/static/blr/img/gyws_02.jpg) center no-repeat;
    }

    .abount-main{
        .cs{
            margin: 0 auto;
            clear: both;
            padding-bottom: 40px;
            height: auto;
            background:url(/static/amjs/img/bg_welcome.jpg) center no-repeat;  
            .conter{
                width: 1000px;
                min-height: 600px;
                margin: 0 auto;
                text-align: center; 
                // .right{
                //    width: 764px;
                // //    position: relative;
                //    margin-right: 0;
                //    float: left;
                //    margin-top: 15px;
                //    .head{
                //        width: 100%;
                //        height: 58px;
                //        padding: 5px;
                //        text-align: center;
                //        background: url(/static/amjs/img/reg_right_add.png) no-repeat center -4px;;
                //        border: none;
                //        .join{
                //            display: inline-block;
                //             font-size: 14px;
                //             font-weight: bold;
                //             padding-left: 55px;
                //             line-height: 53px;
                //             color: #f8e678;
                //        }
                //    }
                //    .content{
                //        box-sizing: content-box;
                //        h2{
                //            font-weight: bold;
                //            text-align: left;
                //             color: #FF0;
                //             padding-left: 39px;
                //             background: url(/static/amjs/img/reg_border_top.png) no-repeat 15px bottom;
                //             height: 20px;
                //             line-height: 15px;
                //             width: 750px;
                //             font-size: 12px;
                //        }
                //        div{
                //         line-height: 30px;
                //         color: #f8e678;
                //         border-right: solid 2px #9b836f;
                //         border-left: solid 2px #9b836f;
                //         width: 735px;
                //         margin-left: 15px;
                //         padding-left: 100px;
                //         position: relative;
                //         clear: both;
                //         overflow: hidden;
                //         .title{
                //             display: block;
                //             font-size: 12px;
                //             width: 90px;
                //             float: left;
                //             text-align: right;
                //             padding-right: 15px;
                //             height: 20px;
                //             line-height: 20px;
                //             color: #f8e678;
                //         }
                //         input{
                //           background-position: 0px 0px;
                //           float: left;
                //             padding-left: 25px;
                //             width: 159px;
                //             height: 22px;
                //         }
                //         .check{
                //              margin-top: 10px;
                //              font-size: 12px;
                //              text-align: left;
                //              margin-left: 15px;
                //             .checkbox{
                //                background-image: none;
                //                 height: 13px;
                //                 width: 13px;
                //                 margin-right: 10px;
                //             }
                //             span{
                //                 padding-left:5px;
                //             }
                //         }
                //         .checkLoginCodeImage{
                //             float: left;
                //             padding-left: 5px;
                //             padding-top: 2px;
                //         }
                     

                //        }
                //        .reg-bottom{
                //         background: url(/static/amjs/img/reg_border_bottom.png) no-repeat;
                //         height: 15px;
                //         border: none 0px;
                //         width: 735px;
                //         margin-bottom: 15px;
                //         padding-left: 0px;
                //        }
                      
                //    }
                //     #memCash-confirm{
                //         padding-top:20px;
                //         input {
                //         display: inline-block;
                //         height: 35px;
                //         line-height: 35px;
                //         padding: 0 20px;
                //         // background: #fff;
                //         font-size: 16px;
                //         // border: 1px solid #5b5b5b;
                //         color: #fff;
                //         font-family: 'Microsoft YaHei';
                //         outline: none;
                //         border: none;
                //         border-radius: 3px;
                //         }
                //         .joinform_submit {
                //             background: #eb373a;
                //         }
                //         .joinform_cancel {
                //             background: #a98144;
                //             }
                //     }
                //     .JM_content {
                //         padding: 10px 10px 10px 20px;
                //         font-size: 10px;
                //         p {
                //             b {
                //                 color: #f00;
                //             }
                //         }
                //     }
                // }

                   .gywm_nr {
                    width: 716px;
                    float: right;
                    margin-right: 45px;
                    margin-top: 35px;

                    .zci {
                        width: 715px;
                        float: left;
                        color: #fff;

                        #right_center {
                            float: right;
                            color: #ffff;

                            .loginer {
                                text-align: left;

                                .JoinMemForm {
                                    fieldset {
                                        font-size: 12px;
                                        border: 1px solid #b48d3e;
                                        margin: 10px;
                                        padding: 10px;

                                        legend {
                                            margin-left: 0;
                                            padding: 0 3px;
                                            font-size: 12px;
                                            font-weight: bold;
                                            background: transparent;
                                            color: #b48d3e;
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
                                                    color: #f00;
                                                }
                                            }
                                            span {
                                                display: inline-block;
                                                line-height: 25px;
                                            }
                                            strong {
                                                color: #f00;
                                                font-weight: bold;
                                            }
                                            input {
                                                width: 170px;
                                                height: 22px;
                                                line-height: 22px;
                                                border: 1px solid #666;
                                                box-shadow: 0 0 6px #3a3a3a;
                                                border-radius: 3px;
                                                color: #444;
                                                font-size: 12px;
                                                text-indent: 6px;
                                                outline: none;
                                                margin: 0 15px;

                                                &#rmNum {
                                                    width: 102px;
                                                    margin: 0 0 0 15px;
                                                }
                                            }

                                            img {
                                                width: 58px;
                                                height: 21px;
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
                                            }
                                        }
                                    }

                                    #js-agree {
                                        display: block;
                                        font-size: 10px;

                                        #memCash-agree {
                                            padding-left: 20px;

                                            input {
                                                height: 13px;
                                                transform: translate(0, 2px);
                                            }
                                        }
                                    }

                                    .err {
                                        width: 262px;
                                        height: 30px;
                                        line-height: 30px;
                                        margin: 0 0 20px 18px;
                                        color: #fff;
                                        font-size: 14px;
                                        border: 1px solid #666666;
                                        box-shadow: 0 0 6px #3a3a3a;
                                        border-radius: 3px;
                                        display: flex;
                                        align-items: center;

                                        i {
                                            padding: 2px 0 0 5px;
                                            margin-right: 5px;
                                            font-size: 15px;
                                        }
                                    }

                                    #memCash-confirm {
                                        input {
                                            display: inline-block;
                                            height: 35px;
                                            line-height: 35px;
                                            padding: 0 20px;
                                            // background: #fff;
                                            font-size: 16px;
                                            // border: 1px solid #5b5b5b;
                                            color: #fff;
                                            font-family: 'Microsoft YaHei';
                                            outline: none;
                                            border: none;
                                            border-radius: 3px;
                                        }
                                        .joinform_submit {
                                            background: #eb373a;
                                        }
                                        .joinform_cancel {
                                            background: #a98144;
                                        }
                                    }

                                    .JM_content {
                                        padding: 10px 10px 10px 20px;
                                        font-size: 10px;
                                        p {
                                            b {
                                                color: #f00;
                                            }
                                        }
                                    }
                                }
                            }

                            p {
                                font-size: 12px;
                                margin: 1em 0;
                            }
                        }
                    }
                }
            }
           
        }
    }
}

</style>

