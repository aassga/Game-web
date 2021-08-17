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
                   <div class="right">
                       <div class="head">
                           <p  class="join" style="background: url(/static/amjs/img/sunny.ico) no-repeat left center;background-size: 48px 48px;">立即加入</p>
                       </div>
                       <div class="content">
                           <h2>注册账号</h2>
                           <div class="use" style="font-size:12px">
                               <label>
                                <span class="title"><span class="xing">*&nbsp;</span>会员账号：</span>
                                <input placeholder="账号" @keydown="pulicError=''" 
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
                                 <br>
                                 <span class="title"></span>
                                <i class="ifont" style="display: block;text-align: left">须为<font style="color:#ff0000">6-10</font>仅可输入英文字母以及数字的组合!!
                                </i>
                               </label>
                           </div>
                           <div class="pass" style="font-size:12px">
                               <label>
                                <span class="title"><span class="xing">*&nbsp;</span>登入密码：</span>
                                <input type="password" placeholder="密码" name="password" @keydown="pulicError=''"
                                v-on:keyup.enter="registerTest"
                                id="password" v-model="password" value
                                maxlength="20"
                                >
                                 <br>
                                 <span class="title"></span>
                                 <i class="ifont" style="display: block;text-align: left">密码规则：须为<font style="color:#ff0000">8~20码英文或数字</font>符合0~9或a~z字元
                                </i>
                               </label>
                           </div>
                           
                           <div class="rep" style="font-size:12px">
                               <label>
                                <span class="title"><span class="xing">*&nbsp;</span>确认密码：</span>
                                <input @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                  v-model="password_confirmation"
                                  maxlength="20"
                                  value type="password" name="passwd" >
                                 <br>
                                 <span class="title"></span>
                                 <i class="ifont" style="display: block;text-align: left">请再次输入密码
                                </i>
                               </label>
                           </div>
                           <!-- 普通验证码 -->
                             <div v-if="!isShowSms&&!isShowTnCode" id="js-rmNum" style="display: block;" >
                                <label>
                                    <span class="title"><span class="xing">*&nbsp;</span>验证码：</span>
                                <input class="pwd-input-set RmNum" name="rmNum" id="rmNum" type="text" size="2"
                                    placeholder="验证码" @keydown="pulicError=''" v-model="code" title="( 点选此处产生新验证码 )"
                                    maxlength="4">
                                <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" style="cursor:pointer">
                                <br>
                                 <span class="title" style="display: block;"></span>
                                 <i class="ifont" style="display: block;text-align: left">
                                </i>
                                </label>
                            </div>
                            <!-- 邀请码 -->
                            <div  v-if="iscode" id="js-InvitationCode" style="display: block;font-size:12px" >
                                <label>
                                    <span class="title"><span class="xing">*&nbsp;</span>邀请码：</span>
                                    <input type="text" name="InvitationCode" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                    @keydown="pulicError=''" v-model="intacode" id="InvitationCode" value
                                    class="InvitationCode_adv" size="15" :readonly="incodeReadonly" maxlength="6">
                                    <br>
                                     <span class="title" style="display: block;"></span>
                                    <i class="ifont" style="display: block;text-align: left"></i>
                                </label>
                            </div>
                           <div class="reg-bottom"></div>
                             <h2>会员资料</h2>
                        <div style="font-size:12px" v-for="(item,index) in register" :key="index">
                                <label v-if="JSON.stringify(item) !== '{}' ">
                                    <span class="title"><span class="xing">*&nbsp;</span>{{item.name}}：</span>
                                     <input type="text" :placeholder="item.placeholder" v-model="item.value"
                                    :maxlength="item.maxlength">
                                    <br>
                                   <span class="title"></span>
                                <i class="ifont" style="display: block;text-align: left"></i>
                                </label>

                        </div>

                        <!-- 短信验证码 -->
                        <sms-input v-if="isShowSms"  :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper"
                            :curLabel="curLabel" :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle"
                            :msgTip="msgTip" :reSend="reSend" :beforeSend="beforeSend" @my-event="getMsgCode"
                            v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                            :countDownTime="countDownTime" :star='star'>
                        </sms-input>
                           <div class="reg-bottom"></div>
                           <p class="check" style="text-align:left;margin-left:14px;font-size:12px;color:#fff">
                               <input  value="Y" v-model="agree" type="checkbox" class="checkbox" checked='checked'>
                               <span>我已届满合法博彩年龄﹐且同意各项开户条约。</span>
                           </p>
                       </div>
                        <!-- 确认/重设 -->
                        <div id="memCash-confirm" align="center">
                            <input type="button" name="OK2" id="OK2" class="joinform_submit" value="确认"
                             @click="registerTest"   style="cursor:pointer">
                            <input type="reset" name="CANCEL2" id="CANCEL2" class="joinform_cancel" value="重设"
                              @click="reset"    style="cursor:pointer">
                        </div>

                        <!-- 备注 -->
                        <div class="remark" align="left">
                            <div id="joinmem" style="padding-left:14px">
                                    <p >备注</p>
                                    <p style="text-algin:left!important;">1.标记有 <b style="color:#ff0000">*</b> 者为必填项目。</p>
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
                
                // marginTop: '15px'
            },
            smsCodeWrapper: {
                position: 'relative',
                fontSize: '12px',
                textAlign: 'left',
                paddingLeft: '150px',
            },
            star:{
               color:"#f8e678;"
            },
            curLabel: {
                width: '100px',
                color:'#f8e678',
                height: '25px',
                lineHeight: '25px',
                fontSize: '12px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-177px)'
            },
            inputBox: {
                width: '184px',
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
                right: '207px',
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
                marginTop:'4px',
                borderRadius: '3px',
                padding: '0 3px',
                transform: 'translateY(1px)'
            },
            beforeSend: {
                color: '#fff',
                background: '#f8e678',
                height:'22px',
                lineHeight:'22px'
            },
            reSend: {
                color: '#fff',
                background: '#f8e678',
                height:'22px',
                lineHeight:'22px'
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
        background: #272727 url(/static/amjs/img/banner_welcome.jpg) center no-repeat;
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
                .right{
                   width: 764px;
                //    position: relative;
                   margin-right: 0;
                   float: left;
                   margin-top: 15px;
                   .head{
                       width: 100%;
                       height: 58px;
                       padding: 5px;
                       text-align: center;
                       background: url(/static/amjs/img/reg_right_add.png) no-repeat center -4px;;
                       border: none;
                       .join{
                           display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            padding-left: 55px;
                            line-height: 50px;
                            color: #f8e678;
                       }
                   }
                   .content{
                       box-sizing: content-box;
                       h2{
                           font-weight: bold;
                           text-align: left;
                            color: #FF0;
                            padding-left: 39px;
                            background: url(/static/amjs/img/reg_border_top.png) no-repeat 15px bottom;
                            height: 20px;
                            line-height: 15px;
                            width: 750px;
                            font-size: 12px;
                       }
                       div{
                        line-height: 30px;
                        color: #f8e678;
                        border-right: solid 2px #9b836f;
                        border-left: solid 2px #9b836f;
                        width: 735px;
                        margin-left: 15px;
                        padding-left: 100px;
                        position: relative;
                        clear: both;
                        overflow: hidden;
                        .title{
                            display: block;
                            font-size: 12px;
                            width: 90px;
                            float: left;
                            text-align: right;
                            padding-right: 15px;
                            height: 22px;
                            line-height: 22px;
                            color: #f8e678;
                            .xing{
                                vertical-align: -2px;
                            }
                        }
                        .ifont{
                            margin-top:-8px;
                        }
                        input{
                          background-position: 0px 0px;
                          float: left;
                          border-radius: 3px;
                          border:none;
                          outline: none;
                          text-indent: 5px;
                          width: 184px;
                          font-size: 12px;
                          height: 22px;
                        }
                        .check{
                             margin-top: 10px;
                             font-size: 12px;
                             text-align: left;
                             margin-left: 15px;
                             color: #fff;
                            .checkbox{
                               background-image: none;
                                height: 13px;
                                width: 13px;
                                margin-right: 10px;
                            }
                            span{
                                padding-left:5px;
                            }
                        }
                        .checkLoginCodeImage{
                            float: left;
                            padding-left: 5px;
                            padding-top: 1px;
                            width:64px;
                            height: 22px;
                        }
                     

                       }
                       .reg-bottom{
                        background: url(/static/amjs/img/reg_border_bottom.png) no-repeat;
                        height: 15px;
                        border: none 0px;
                        width: 735px;
                        margin-bottom: 15px;
                        padding-left: 0px;
                       }
                      
                   }
                    #memCash-confirm{
                        padding-top:20px;
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
                    .remark{
                      font-size: 12px;
                       color: #fff; 
                       p{
                           height: 20px;
                           line-height:20px;
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
        }
    }
}

</style>

