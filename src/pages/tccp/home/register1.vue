<template>
  <div>
  <div class="banner"></div>
  <div class="registerBox">
    <div class="register">
      <div class="register-left fl">
        <h2>欢迎注册<span>register</span></h2>
        <div class="rigisterModal">
          <ul></ul>
        </div>
        <div class="acount">
          <div class="list-box">
            <div class="text-context">
              <div class="input-cont">
                <div class="iconfont">
                  <img
                    src="/static/tccp/img/register/pel.png"
                    alt=""
                  />
                </div>
                <input
                  placeholder="用户名"
                  autocomplete="off"
                  @keydown="pulicError = ''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="userName"
                  @blur="getCode"
                  maxlength="10"
                />
              </div>
              <p class="inputP">
                <span>*</span>
                6-10个字符, 英文字母以及数字的组合!!
              </p>
            </div>

            <div class="text-context">
              <div class="input-cont">
                <div class="iconfont">
                  <img
                    src="/static/tccp/img/register/key.png"
                    alt=""
                  />
                </div>
                <input
                  autocomplete="off"
                  @keydown="pulicError = ''"
                  @keyup="clearNull1"
                  v-on:keyup.enter="registerTest"
                  placeholder="密码"
                  type="password"
                  v-model="password"
                  maxlength="20"
                />
              </div>
              <p class="inputP">
                <span>*</span>
                8~20码英文或数字符合0~9或a~z字元
              </p>
            </div>

            <div class="text-context">
              <div class="input-cont">
                <div class="iconfont">
                  <img
                    src="/static/tccp/img/register/key.png"
                    alt=""
                  />
                </div>
                <input
                  autocomplete="off"
                  @keydown="pulicError = ''"
                  @keyup="clearNull1"
                  v-on:keyup.enter="registerTest"
                  placeholder="确定密码"
                  type="password"
                  v-model="password_confirmation"
                  maxlength="20"
                />
              </div>
              <p class="inputP">
                <span>*</span>
                请再次确认密码
              </p>
            </div>
            
            <div v-if="register.length">
             <div class="text-context" :key="index" v-for="(item, index) in register">
              <div class="input-cont">
                <div class="iconfont">
                  <img
                    src="/static/tccp/img/register/key.png"
                    alt=""
                  />
                </div>
                <input
                  @keydown="pulicError = ''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="item.value"
                  :maxlength="item.maxlength"
                  :placeholder="item.placeholder"
                />
              </div>
              <p class="inputP">
                <span>*</span>
                 {{ item.placeholder }}
              </p>
            </div>
            </div>
            <!-- 短信验证码 -->
             <div class="text-context" v-if="isShowSms">
                <div class="input-cont input-cont1">
                    <div class="iconfont">
                        <img
                        src="/static/tccp/img/register/key.png"
                        alt=""
                        />
                    </div>
                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="验证码"
                        type="text" v-model="smsCode" maxlength="4">
                 
                </div>
                   <span class="yzm_btn" @click="getMsgCode" v-show="!hasSendMsg">获取验证码</span>
                   <span class="yzm_btn" v-show="hasSendMsg" @click="getMsgCode">重新发送({{countDownTime}})</span>
                   <p class="inputP" style="margin-left:123px" v-show="hasSendMsg">
                        <span>*</span>
                           验证码已发送,5分钟内有效,请勿泄露
                    </p>
            </div>

            <div class="text-context" v-if="!isShowSms&&!isShowTnCode">
                <div class="input-cont input-cont1">
                    <div class="iconfont">
                        <img
                        src="/static/tccp/img/register/key.png"
                        alt=""
                        />
                    </div>
                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="验证码"
                        type="text" v-model="code" maxlength="4">
                 
                </div>
                   <span class="yzm_reg">
                        <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                    </span>
                    <span class="yam" @click="getCode">换一张</span>
            </div>

            <div class="text-context" v-if="iscode">
              <div class="input-cont">
                <div class="iconfont">
                  <img
                    src="/static/tccp/img/register/key.png"
                    alt=""
                  />
                </div>
                <input
                  autocomplete="off"
                  @keydown="pulicError = ''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="intacode"
                  :readonly="incodeReadonly"
                  id="incode"
                  maxlength="6"
                  placeholder="请输入邀请码"
                />
              </div>

              <p class="inputP">
                <span>*</span>
                请输入邀请码
              </p>
            </div>

            <div @click="registerTest" class="submit">立即注册</div>
            <h3 class="treaty">
              已有帐号 ?<span @click="loginSubmit">点击登录</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="register-right">
        <div class="iconR">
          <div class="icon">
           <div class="qr" ref="qr-code"></div>
          </div>
          <!-- <span><img src="../../../../static/tccp/img/register/erm.png"  alt=""/></span> -->
        </div>
        <div class="testR">
          <p style="color: #fff;">扫码下载 澳门威尼斯人 APP</p>
          <span>（ iOS / Android 通用 ）</span>
        </div>
        <div class="phoneR">
          <img
            src="../../../../static/tccp/img/register/regPhone.png"
            alt=""
          />

        </div>
        <div class="linkR">
          <p style="color: #fff;">
            H5页面访问：
            <span>www.2207.com</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import { _SetPost, postS } from "@/service/public/service.js";
import store from "@/vuex/store";
import data1 from "../../public/user/register_copy";
export default {
  mixins: [data1],
  data() {
    return {
      hasSendMsg:false,
      countDownTime:60,
      codeImg: "/static/tccp/img/new_games/lo.png",
      tabIndex: 1,
      rememberPassword: false,
      paddingBottom2: "20px",
    };
  },
  mounted() {
    this.createDownloadQRCode({
        el: this.$refs['qr-code'],
        url: window.location.origin + '/m#/download',
        size: 115
    })
  },
  methods: {
    loginSubmit() {
      this.$store.commit("home/getShowLogin", true);
    },
    // 密码框禁止输入空格
    clearNull1() {
      this.password_confirmation = this.password_confirmation.replace(
        /\s+/g,
        ""
      );
      this.password = this.password.replace(/\s+/g, "");
    },
    clearNull2() {
      this.passKey.password = this.passKey.password.replace(/\s+/g, "");
    },
    reset() {
      (this.userName = ""),
        (this.password = ""),
        (this.password_confirmation = ""),
        (this.verificationCode = ""),
        (this.InvitationCode = ""),
        (this.pulicError = ""),
        (this.code = ""),
        this.register &&
          this.register.forEach((item) => {
            item.value = "";
          });
    },
  },
  components: {
  },
  created() {},
  store,
};
</script>

<style lang="less" scoped>
.banner{
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/tccp/img/banner/headImg.png') top/cover no-repeat;
}
.registerBox {
  width: 100%;
  padding: 20px 0;
  background: #2B2A2A;
  .register {
    margin: 0 auto;
    width: 1200px;
    background-color: #1b1b1b;
    border: 1px solid #3d3d3d;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    .register-left {
      width: 780px;
      h2 {
        font-size: 28px;
        color: #fff;
        height: 85px;
        line-height: 85px;
        text-indent: 50px;
        span {
          color: #171717;
        }
      }
      .acount {
        padding: 0 0 20px 165px;
        .text-context {
          width: 100%;
          // height: 42px;
          overflow: hidden;
          padding-top: 18px;
          .input-cont {
            width: 308px;
            height: 42px;
            overflow: hidden;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            border-radius: 8px;
            float: left;
            position: relative;
            .iconfont {
              float: left;
              width: 45px;
              height: 40px;
              position: relative;
              background: #e9e8e8;
              img {
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
            input {
              width: calc(100% - 45px);
              height: 100%;
              text-indent: 5px;
              border: none;
              outline: 0;
            }

            span {
              font-size: 13px;
              color: #777777;
              margin-left: 14px;
              b {
                color: #ff0000;
                font-weight: normal;
              }
            }
          }
          .input-cont1 {
            width: 185px !important;
            input {
            //   width: 160px !important;
            }
          }
          .yzm_reg {
                position: absolute;
                cursor: pointer;
                img {
                    height: 40px;
                    width: 100px;
                    border-radius: 20px;
                    margin-left: 20px;
                }
            }
            .yzm_btn{
                position: absolute;
                cursor: pointer;
                height: 40px;
                width: 100px;
                border-radius: 10px;
                margin-left: 20px;
                background-color: #ec6941;
                color: #fff;
                line-height: 40px;
                text-align: center;
            }
            .yam {
                position: absolute;
                   margin-top: 15px;
                  margin-left: 140px;
                color: #4CA2F4;
                cursor: pointer;
            }
          .inputP {
            font-size: 12px;
            float: left;
            padding-left: 15px;
            line-height: 42px;
            color: #b8b8b8;
            span {
              color: red;
            }
          }
        }
        .submit {
          display: block;
          width: 308px;
          height: 55px;
          margin-top: 20px;
          border-radius: 26px;
          text-align: center;
          line-height: 55px;
          color: #fff;
          font-size: 16px;
          border: none;
          cursor: pointer;
          background: #cba52f;
        }
        .treaty {
          padding-top: 25px;
          width: 308px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          span {
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .datum {
        width: 854px;
        min-height: 147px;
        margin-top: 36px;
        box-shadow: 3px 4px 21px 0px rgba(0, 0, 0, 0.17);
        border: solid 1px #e2e2e2;
        .member-title {
          width: 86px;
          height: 34px;
          margin: -17px 0 0 20px;
          background-color: #5973f6;
          text-align: center;
          font-family: MicrosoftYaHei;
          font-size: 13px;
          font-weight: bold;
          line-height: 34px;
          letter-spacing: 1px;
          color: #ffffff;
        }
        .text-context {
          width: 100%;
          overflow: hidden;
          padding-top: 18px;
          .title {
            width: 70px;
            text-align: right;
            display: inline-block;
            font-size: 13px;
            letter-spacing: 1px;
            color: #666666;
            span {
              color: #ff0000;
              font-size: 16px;
              vertical-align: -4px;
            }
          }
          .input-cont {
            width: 308px;
            height: 42px;
            overflow: hidden;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            border-radius: 8px;
            float: left;
            position: relative;
            input {
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
            span {
              font-size: 13px;
              color: #777777;
              margin-left: 14px;
            }
          }
          .inputP {
            font-size: 12px;
            float: left;
            padding-left: 15px;
            line-height: 42px;
            color: #b8b8b8;
          }
        }
      }
    }
    .register-right {
      width: calc(100% - 780px);
      float: right;
      padding-top: 22px;
      // border-left: 1px solid #555;
      .iconR {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        .icon{
          width: 123px;
          height: 123px;
          border: 1px solid #363636;
          background: #fff;
          padding: 3px;
        }
        span {
          width: 116px;
          display: inline-block;
          height: 116px;
        }
      }
      .testR {
        width: 100%;
        padding: 15px 0;
        text-align: center;
        p {
          line-height: 28px;
          text-align: center;
          color: #5c5c5c;
          font-size: 14px;
        }
        span {
          display: inline-block;
          color: #fff;
          line-height: 28px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .phoneR {
        width: 100%;
        img {
          display: block;
          margin: 0 auto;
          width: 253px;
          height: 226px;
        }
      }
      .linkR {
        width: 100%;
        padding: 15px 0;
        text-align: center;
        p {
          line-height: 28px;
          text-align: center;
          color: #5c5c5c;
          font-size: 14px;
          span {
            display: inline-block;
            color: #fff;
            line-height: 28px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
