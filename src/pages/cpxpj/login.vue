<template>
  <div class="login_log" v-if="$store.state.home.showLoginLog == true">
    <div class="content">
      <div class="slider">
         <Carousel autoplay dots="none">
          <Carousel-item>
              <div class="demo-carousel"><img src="/static/cpxpj/img/s1.png" alt=""></div>
          </Carousel-item>
          <Carousel-item>
              <div class="demo-carousel"><img src="/static/cpxpj/img/s2.png" alt=""></div>
          </Carousel-item>

      </Carousel>
      </div>
      <div class="login_area">
        <div class="title">{{$store.state.home.showLoginIndex === 1 ? '欢迎登录' : '欢迎注册'}}</div>
        <div class="register-wrap" v-if="$store.state.home.showLoginIndex === 1">
            <div class="list-box">
                <div class="text-context">
                    <div class="input-cont">
                        <i class="iconfont yonghu"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                            placeholder="请输入5-20位数字或字母" type="text" v-model="passKey.userName" @blur="getCode" maxlength="20">
                    </div>
                </div>

                <div class="text-context">
                    <div class="input-cont">
                        <i class="iconfont mima"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                            placeholder="请输入8-20位数字或字母" type="password" v-model="passKey.password" maxlength="20">
                    </div>
                </div>
                <div class="text-context code" v-if="code_show">
                    <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                    <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                </div>



                <div style="clear:both"></div>
                <div class="err" v-if="pulicError">
                    <i class="iconfont icon-baojing"></i>
                    <span ref="pulicError">{{pulicError}}</span>
                </div>

                <div @click="login" class="submit">登录</div>
                <div class="text-context1">
                    <div class="forgetPwd" @click="$forget()">忘记密码?</div>|
                    <div @click="changeLoginLog(2)">快速注册</div>
                </div>
                <!-- <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div> -->
            </div>
        </div>
        <div class="register-wrap" v-if="$store.state.home.showLoginIndex === 2">
            <div class="list-box">
                <div class="text-context">
                    <div class="input-cont">
                        <i class="iconfont yonghu"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                            placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="registerCode" maxlength="10">
                    </div>
                </div>

                <div class="text-context">
                    <div class="input-cont">
                        <i class="iconfont mima"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                            placeholder="密码8-20位数字或字母" type="password" v-model="password" maxlength="20">
                    </div>
                </div>

                <div class="text-context">
                    <div class="input-cont">
                        <i class="iconfont mima"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                            type="password" v-model="password_confirmation" maxlength="20">
                    </div>
                </div>

                <!-- 手机号 微信等信息 -->
                <div :key='index' v-for="(item,index) in register">
                    <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                        <!-- <div class="title">{{item.name}}：</div> -->
                        <div class="input-cont">
                            <i class="iconfont" :class="item.divclass"></i>
                            <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder"
                                type="text" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>

                <!-- 短信验证码 -->
                <div class="smsContainer" v-if="isShowSms">
                    <!-- <i class="iconfont yanzhengma"></i> -->
                    <sms-input :qygj="theName" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                        :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                        :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                        :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                    </sms-input>
                </div>

                <!-- 正常验证码 -->
                <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                    <div class="input-cont input-cont1 cont">
                        <i class="iconfont yanzhengma"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码"
                            type="text" v-model="code" maxlength="4">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="registerCode">
                        </span>
                        <span class="yam" @click="registerCode">换一张</span>
                    </div>
                </div>

                <div class="text-context" v-if='iscode'>
                    <div class="input-cont">
                        <i class="iconfont yaoqingma"></i>
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                            type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                    </div>
                </div>

                <div class="err" v-if="pulicError">
                    <i class="iconfont icon-baojing"></i>
                    <span ref="pulicError">{{pulicError}}</span>
                </div>

                <div @click="registerTest" class="submit">注册</div>
                <div class="treaty">已有账号，点击<span @click="changeLoginLog(1)">立即登录</span></div>
            </div>
        </div>
      </div>
      <div class="close" @click="closeLogin"><Icon type="close-circled" size="35" color="#a9b5cc"></Icon></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import data1 from '../public/user/register_copy';
import data2 from "../public/user/login"
import smsInput from '../public/home/smsInput';
export default {
    mixins: [data1,data2],
    data(){
        return{ }
    },
    methods:{
        closeLogin(){
            this.$store.state.home.showLoginLog = false;
            this.replaceMent();
            this.passKey.userName = "";
            this.passKey.password = "";
            this.passKey.code = "";
        },
        changeLoginLog(i){
          this.$store.state.home.showLoginIndex = i;
        }
    },
}
</script>

<style  lang="less" scoped>
  .login_log{
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:1001;
    display: flex;
    justify-content:center;
    align-items:center;
    .content{
      width: 952px;
      height: 522px;
      display: flex;
      background: white;
      position: relative;
      // border: 1px solid #C2BE60;
      .close{
        position: absolute;
        top: -40px;
        right: -30px;
        cursor: pointer;
      }
      .slider{
        width: 365px;
        height: 520px;
      }
      .login_area{
        width:585px;
        height: 520px;
        // background: black;
        .title{
          width: 320px;
          margin: 40px auto;
          color: black;
          font-weight: bold;
          font-size:40px;
        }
        .register-wrap {
            width: 320px;
            margin: 30px auto;
            .list-box {
              .code{
                  width: 300px;
                border-bottom: 1px solid #f0f0f4;
                margin-top: 30px;
                input{
                  border: none;
                  outline: none;
                  margin-bottom: 10px;
                  background: transparent;
                  color: black;
                }
                input::-webkit-input-placeholder {
                    font-size: 16px;
                    color:#cac7c7;
                }
                span{
                    display: inline-block;
                    height: 38px;
                    width: 120px;
                    position: absolute;
                    top: -18px;
                    right: 0px;
                }
              }
              .text-context {
                  margin-bottom:15px;
                  box-sizing: border-box;
                  position: relative;
                  .title {
                      display: inline-block;
                      text-align: right;
                      min-width: 110px;
                      font-size: 14px;
                      line-height: 40px;
                      color: #666666;
                  }

                  .input-cont {

                      display: inline-block;
                      height: 44px;
                      width: 300px;
                      background: transparent;
                      border-bottom: 1px solid #f0f0f4;
                      .iconfont {
                          width: 20px;
                          height: 20px;
                          vertical-align: middle;
                          color: #bbafd2;
                      }
                      input {
                          position: relative;
                          width: 100%;
                          height: 44px;
                          line-height: 44px;
                          border-radius: 5px;
                          // padding-left: 10px;
                          background: transparent;
                          border: none;
                          outline: none;
                          color: black;
                      }

                      input::-webkit-input-placeholder {
                          font-size: 16px;
                          color:#CCC9CA;
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
                      top: 2px;
                      right:70px;
                      cursor: pointer;

                      img {
                          height: 35px;
                          width: 100px;
                          border-radius: 20px;
                      }
                  }
                  .yam {
                      position: absolute;
                      top: 12px;
                      right: 19px;
                      color: #5caaea;
                      cursor: pointer;
                  }
              }
              .text-context1{
                  display: flex;
                  flex-wrap: nowrap;
                  margin: 15px 0 15px 48px;
                  div{
                      width: 40%;
                      text-align: center;
                      color: #A1A1B2;
                      font-size: 14px;
                      cursor: pointer;
                      .ivu-radio-wrapper{
                          font-size: 18px!important;
                      }
                  }
              }
              .err {
                  width: 150px;
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
              .submit {
                  width:300px;
                  height:40px;
                  background:#e5e5e5;
                  border-radius:10px;
                  line-height: 40px;
                  border: none;
                  box-shadow: none;
                  text-align: center;
                  font-size: 20px;
                  color: #444952;
                  transition: all 0.2s;
                  cursor: pointer;
              }
              .treaty{
                color: #737780;
                font-size: 14px;
                width: 100%;
                text-align: center;
                margin-top: 25px;
                cursor: pointer;
                span{
                  color: #BB9759;
                }
              }
            }
        }
      }
    }
  }
</style>
