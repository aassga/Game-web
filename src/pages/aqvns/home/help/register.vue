<template>
  <div>
    <div class="banner">
        <banView :headerImg="headerImg" :picBox='300' ></banView>
    </div>
    <div class="register-area">
      <div class="content clearfloat">
        <div class="nav_title"></div>
        <div class="left">
            <div class="member-container">
                <div class="member-area">
                    <div class="member-text">加入会员</div>
                    <div class="member-number">{{joinMemberCount}}<span> 人</span></div>
                </div>
                <div class="member-area">
                    <div class="member-text">活跃会员</div>
                    <div class="member-number">{{activeMemberCount}}<span> 人</span></div>
                </div>
                <div class="member-area">
                    <div class="member-text">累计奖池</div>
                    <div class="member-number">{{AGMoney.toString().substring(0,3)}},{{AGMoney.toString().substring(3,6)}},{{AGMoney.toString().substring(6,9)}}.{{AGMoney.toString().substring(9,11)}}<span> 元</span></div>
                </div>
            </div>
        </div>

        <div class="right">
          <div class="right-title">注册账号</div>
          <div class="register-wrap">
            <div class="list-box">
              <div class="list">
                <label>会员帐号：</label>
                <input
                  placeholder="帐号6-10位数字或字母"
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="userName"
                  maxlength="10"
                  @blur="getCode"
                />
              </div>
              <div class="list">
                <label>登入密码：</label>
                <input
                  placeholder="密码8-20位数字或字母"
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="password"
                  v-model="password"
                  maxlength="20"
                />
              </div>
              <div class="list">
                <label>确认密码：</label>
                <input
                  placeholder="请重复密码"
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="password"
                  v-model="password_confirmation"
                  maxlength="20"
                />
              </div>

              <!-- 手机号等其他用户资料 -->
              <div :key="index" v-for="(item,index) in register">
                <div v-if="JSON.stringify(item) !== '{}' " class="list">
                  <label>{{item.name === '手机号' ? '手机号码' : item.name}}：</label>
                  <input
                    placeholder="请输入手机号"
                    @keydown="pulicError=''"
                    v-on:keyup.enter="registerTest"
                    type="text"
                    v-model="item.value"
                    :maxlength="item.maxlength"
                  />
                </div>
              </div>

              <!-- 短信验证码 -->
              <sms-input
                v-if="isShowSms"
                :smsInputBox="smsInputBox"
                :smsCodeWrapper="smsCodeWrapper"
                :curLabel="curLabel"
                :inputBox="inputBox"
                :msgVerifyBox="msgVerifyBox"
                :btnStyle="btnStyle"
                :beforeSend="beforeSend"
                :reSend="reSend"
                :msgTip="msgTip"
                @my-event="getMsgCode"
                v-model="smsCode"
                :isShowSms="isShowSms"
                :hasSendMsg="hasSendMsg"
                :countDownTime="countDownTime"
                :paddingBottom2="paddingBottom2"
                :ShowStar="false"
              ></sms-input>

              <!-- 图片验证码 -->
              <div v-else class="list">
                <label>验证码：</label>
                <input
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="code"
                  minlength="4"
                  maxlength="4"
                  placeholder="请输入验证码"
                  class="yzmInput"
                />
                <span class="yzm_reg">
                  <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" />
                </span>
              </div>

              <!-- 邀请码 -->
              <div class="list" v-if="iscode">
                <label>邀请码：</label>
                <input
                  placeholder="请输入邀请码"
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="intacode"
                  :readonly="incodeReadonly"
                  id="incode"
                  maxlength="6"
                />
              </div>
              <div class="err" v-if="pulicError">
                <i class="iconfont icon-baojing"></i>
                <span ref="pulicError">{{pulicError}}</span>
              </div>
              <div class="treaty">
                <div class="showBox" @click="changeSrc()">
                  <img :src='checkSrc' alt="">
                </div>
                <label>
                  <input type="checkbox" v-model="isCheckbox" value="true" style="margin-right:10px;opacity:0;"/>已满18岁，且同意各项开户条约。
                </label>
              </div>
              <div class="button-area">
                <div class="submit" @click="registerTest">立即注册</div>
                <!-- <div class="cancelBtn" @click="replaceMent">重设</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import { _SetPost, postS, getS } from "@/service/public/service.js";
import store from "@/vuex/store";
import data from "../../../public/user/register_copy.js";
import smsInput from "../../../public/home/smsInput";
import banView from "../../../public/game_new/banView.vue";

export default {
  mixins: [data],
  data() {
    return {
        headerImg:"/static/aqvns/img/headImg.jpg",
        checkSrc:"/static/aqvns/img/reg/checked.png",
        setInter:null,
        AGMoney: 41126438900,
        activeMemberCount:0,
        joinMemberCount:0,
        smsInputBox: {
        marginTop: "0"
      },
      paddingBottom2: "25px",
      smsCodeWrapper: {
        paddingBottom: "25px",
        position: "relative",
        fontSize: "16px",
        color: "#333"
      },
      curLabel: {
        width: "80px",
        height: "25px",
        lineHeight: "25px",
        color: "#fff",
        fontSize: "14px",
        textAlign: "right",
        display: "inline-block",
        transform: "translateX(-1px)"
      },
      inputBox: {
        width: "196px",
        height: "30px",
        border: "0",
        borderRadius: "3px",
        color: "#444",
        background:"#eee",
        fontSize: "12px",
        textIndent: "6px",
        outline: "none"
      },
      msgVerifyBox: {
        position: "absolute",
        top: "0",
        left: "287px",
        marginLeft: "2px",
        display: "flex",
        justifyContent: "flex-start",
        width: "142px"
      },
      btnStyle: {
        display: "inline-block",
        width: "84px",
        height: "30px",
        lineHeight: "30px",
        fontSize: "12px",
        color: "#fff",
        borderRadius: "3px",
        transform: "translate(4px,0)",
        boxSizing: "border-box",
        textAlign: "center"
      },
      beforeSend: {
        color: "#fff",
        background: "#f43535"
      },
      reSend: {
        color: "#fff",
        background: "#c58728"
      },
      msgTip: {
        margin: "5px 0 16px 211px",
        color: "#333",
        fontSize: "12px"
      },
      headBg: '/static/aqvns/img/reg/reg-top-bg.png',
      bgColor:'#47080E'
    };
  },
  mounted() {},
  methods: {
    async getData() {
      let res = await getS(`memberDataStatistics`);
      if (res && res.code == 200) {
        this.joinMemberCount=res.data.joinMemberCount;
        this.activeMemberCount=res.data.activeMemberCount; 
      }
    },
    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.AGMoney = this.AGMoney + 1283;
      }, 100);
    },
  },
  components: { smsInput ,banView},
  created() {
     this.getData();
     this.jackpotFc();
  },
  store
};
</script>

<style lang="less" scoped>
.reg-top{
  width: 100%;
  height: 300px;
  background-color: #47080E;
}
.register-area {
  // width: 1920px;
  height: 815px;
  background: url(/static/aqvns/img/reg/reg-content-bg.png) no-repeat center center;
  margin: 0 auto;
  background-size: cover;
  font-family: Microsoft YaHei !important;
  overflow: hidden;
  .content {
    width: 1000px;
    height: 810px;
    margin: 20px auto 0;
    position: relative;
    background: url("/static/aqvns/img/reg/reg-bg.png") no-repeat;
    background-size: 100%;
    .nav_title{
        height: 130px;
        width: 100%;
        background: url("/static/aqvns/img/reg/nav_title.png") 42px 42px no-repeat;
    }
    .header-img {
      position: absolute;
      top: 38px;
      left: 50px;
      width: 920px;
      color:#fff;
      & > div {
        position: absolute;
        top: 2px;
        &.title-1{
          left: 55px;
        }
        &.title-2{
          left: 254px;
        }
        &.title-3{
          left: 453px;
        }
        &.title-4{
          left: 650px;
        }
        &.title-5{
          left: 848px;
        }
        p:last-child{
          margin-top: 6px;
        }
      }
    }
    .left {
      position: relative;
      float: left;
      width: 50%;
      height: 700px;
      .member-container {
        position: absolute;
        top: 170px;
        left: 66px;
        .member-area {
          margin-top: 24px;
          .member-text {
            font-size: 16px;
            font-weight: 400;
            color: #fff;
          }
          .member-number {
            font-size: 35px;
            font-weight: 400;
            color: #d6b653;
            margin-top: 7px;
            span{
              font-size: 20px;
            }
          }
        }
      }
    }

    .right {
      float: left;
      width: 50%;
      padding-left: 40px;
      .right-title {
        font-size: 28px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        margin-top: 82px;
      }
    }
  }

  .register-wrap {
    margin-top: 34px;
    .list-box {
      .list {
        padding-bottom: 25px;
        position: relative;
        font-size: 16px;
        color: #333;

        input {
          width: 292px;
          height: 30px;
          border: 1px solid transparent;
          // box-shadow: 0 0 6px #3a3a3a;
          border-radius: 3px;
          color: #444444;
          font-size: 12px;
          text-indent: 6px;
          background-color: #EEEEEE;
        }
        .yzmInput{
            width: 200px!important;
        }
        label {
          font-size: 14px;
          color: #fff;
          width: 80px;
          text-align: right;
          display: inline-block;
        }

        i {
          position: absolute;
          top: 5px;
          left: 13px;
          font-size: 24px;
          color: #949494;
        }

        .yzm_reg {
          position: absolute;
          top: 0;
          right: 84px;
          cursor: pointer;

          img {
            width: 84px;
            height: 30px;
          }
        }
      }

      .smsInputBox {
        .list {
          padding-bottom: 25px;
          position: relative;
          font-size: 16px;
          color: #333;
          text-align: center;

          &.msgCodeWrapper {
            .msg_verify_box {
              position: absolute;
              top: 0;
              left: 264px;
              margin-left: 2px;
              display: flex;
              justify-content: flex-start;
              width: 142px;
              text-align: center;
              a {
                display: inline-block;
                height: 28px;
                line-height: 28px;
                font-size: 10px;
                color: #46080e;
                border-radius: 3px;
                padding: 0 3px;
                transform: translateY(1px);

                &.get_code_btn {
                  &.before_send {
                    color: #000;
                    border: 1px solid #000;
                  }
                  &.after_send {
                    color: #696969;
                    border: 1px solid #696969;
                  }
                }
                &.reSend {
                  color: #000;
                  border: 1px solid #000;
                  margin-left: 8px;
                }
              }
            }
          }

          input {
            width: 180px;
            height: 30px;
            border: 1px solid #666;
            box-shadow: 0 0 6px #3a3a3a;
            border-radius: 3px;
            color: #444;
            font-size: 12px;
            text-indent: 6px;
          }

          label {
            font-size: 12px;
            color: #000;
            width: 80px;
            text-align: right;
            display: inline-block;
          }

          i {
            position: absolute;
            top: 5px;
            left: 13px;
            font-size: 24px;
            color: #949494;
          }
        }
        .msg_tip {
          margin: 5px 0 30px 211px;
          color: #333;
          font-size: 12px;
        }
      }

      .err {
        display: inline-block;
        min-width: 180px;
        height: 30px;
        line-height: 28px;
        padding-right: 8px;
        margin: 0 0 20px 210px;
        color: #444;
        font-size: 14px;
        border: 1px solid #666;
        box-shadow: 0 0 6px #3a3a3a;
        border-radius: 3px;

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

      .treaty {
        font-size: 14px;
        color: #fff;
        padding: 0px 0 20px 125px;
        position: relative;
        .showBox{
            z-index: 999;
            position: absolute;
            width: 14px;
            height:14px;
            top: 0;
            img{
              width: 14px;
              height:14px;
            }
          }
      }
      .button-area {
        overflow: hidden;
        .submit {
          width: 226px;
          height: 48px;
          line-height: 48px;
          font-size: 18px;
          text-align: center;
          background: #cba52f;
          color: #fff;
          margin: 0 auto;
          border-radius: 6px;
          cursor: pointer;
          &:active{
            transform: scale(.92)
          }
          &:hover {
            color: #f5d065;
          }
        }
        .cancelBtn {
          float: left;
          width: 130px;
          margin-left: 43px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 18px;
          color: #000;
          background: #697DAC;
          border-radius: 6px;
          cursor: pointer;
          &:active{
            transform: scale(.92)
          }
          &:hover {
            color:#fff;
          }
        }
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
