<template>
  <div>
    <div class=" page-container">
      <div class="content clearfloat">
        <div class="at-wrap ">  
          <registerLeft></registerLeft>
        <div id="page-right">
          <div class="join-wrap">
            <div id="join-container">
              <div class="join-header-title">
                澳门金沙棋牌www.8824.com欢迎您的加入！
              </div>
              <div class="join-header-content" style="font-size:15px;line-height:30px">
                <div>
                  <p><strong>1.  澳门金沙棋牌：<span>官方直营,诚信第一品牌</span>，值得您的信赖。</strong></p>
                  <p><strong>2. 我们的<span>优惠</span>不像“<span>高利贷</span>”那么<span>高</span>，但资金一定永远像“<span>瑞士银行</span>”一样<span>安全</span>。</strong></p>
                  <p><strong>3. 24小时任意提款，<span>没有对比就没有伤害</span>，日提款支持<span>3000万</span></strong></p>
                  <p><strong>4. 全网<span>首家出款</span>系统对接<span>银行支付</span>中心，单笔支持<span>100万30秒</span>到账，<span>大额无忧</span>.</strong></p>
                  <p><strong>5. 我们<span>发誓承诺</span>，为每一位客户提供<span>最安全、最公平、最公正</span>的博彩游戏，以及全方位的服务。</strong></p>
                  <P></P>
                </div>
                <fieldset class="fieldset">
                  <span class="regist">注册账号</span>
                  <div class="register-wrap">
            <div class="list-box">
              <div class="list">
                <label>会员帐号：</label>
                <input
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="text"
                  v-model="userName"
                  maxlength="10"
                  placeholder="请输入账号"
                  @blur="getCode"
                />
                <span class="tip">帐号6-10位数字或字母</span>
              </div>
              <div class="list">
                <label>登入密码：</label>
                <input
                  placeholder="请输入密码"
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="password"
                  v-model="password"
                  maxlength="20"
                />
                <span class="tip">密码8-20位数字或字母</span>
              </div>
              <div class="list">
                <label>确认密码：</label>
                <input
                  autocomplete="off"
                  @keydown="pulicError=''"
                  v-on:keyup.enter="registerTest"
                  type="password"
                  v-model="password_confirmation"
                  maxlength="20"
                  placeholder="请输入确认密码"
                />
                <span class="tip">请输入确认密码!</span>
              </div>

              <!-- 手机号等其他用户资料 -->
              <div :key="index" v-for="(item,index) in register">
                <div v-if="JSON.stringify(item) !== '{}' " class="list">
                  <label>{{item.name === '手机号' ? '手机号码' : item.name}}：</label>
                  <input
                    :placeholder="item.placeholder"
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
              <div v-if="!isShowSms&&!isShowTnCode" class="list">
                <label style="color:#bbb">验证码：</label>
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
            </div>
          </div>
                </fieldset>
          <div class="btn-group">
            <div class="treaty">
              <div class="showBox" @click="changeSrc()" style="padding-left:188px">
                <img :src='checkSrc' alt="">
                <input type="checkbox" v-model="isCheckbox" value="true" style="margin-right:10px;opacity:0;"/>我已届满合法博彩年龄﹐且同意各项开户条约！
              </div>
              
            </div>
              <div class="form-control">

                <div class="button-area">
                  <div class="submit" @click="registerTest">立即注册</div>
                  <div class="cancelBtn" @click="replaceMent">重新填写</div>
                </div>
              </div>
          </div>
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
import UserService from "@/service/public/UserService.js";
import { _SetPost, postS, getS } from "@/service/public/service.js";
import store from "@/vuex/store";
import data from "../../public/user/register_copy.js";
import smsInput from "../../public/home/smsInput";
import banView from "../../public/game_new/banView";
import registerLeft from "./registerLeft";
export default {
  mixins: [data],
  data() {
    return {
      sideMemuList:[
        "捕鱼机","BB电子",
        "PT电子","SG电子",
         "MW电子" ,"JDB电子",
          "AG电子" ,"HB电子",
          "MG电子", "BB视讯",  "AG视讯"     
      ],
        checkSrc:"/static/103qp/img/reg/checked.png",
        setInter:null,
        AGMoney: 41126438900,
        activeMemberCount:0,
        joinMemberCount:0,
        smsInputBox: {
        marginLeft: "36px"
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
        color: "#bbb",
        fontSize: "14px",
        textAlign: "right",
        display: "inline-block",
        transform: "translateX(-1px)"
      },
      inputBox: {
        width: "146px",
        height: "24px",
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
        top: "4px",
        left: "234px",
        marginLeft: "2px",
        display: "flex",
        justifyContent: "flex-start",
        width: "142px"
      },
      btnStyle: {
        display: "inline-block",
        width: "84px",
        height: "24px",
        lineHeight: "24px",
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
        color: "#333",
        fontSize: "12px",
        position: "absolute",
        color: "#ddd",
        fontSize: "12px",
        marginTop: "-33px",
        marginLeft:" 332px",
      },
      headBg: '/static/103qp/img/reg/reg-top-bg.png',
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
  components: { smsInput ,banView,registerLeft},
  created() {
     this.getData();
     this.jackpotFc();
  },
  store
};
</script>

<style lang="less" scoped>

.page-container {
  
    background:  url(/static/103qp/img/re/page_container_bg.jpg) 50% 0 no-repeat;
    padding: 5px 0;
  .content {
    width: 1200px;
    margin: 0 auto;
    .at-wrap{
      background: url(/static/103qp/img/re/container_article_y.png) 50% 0 repeat-y;
    
 
    #page-right{
          width: 905px;
          padding: 10px 36px;
          float: right;
          .join-wrap{
              position: relative;
              padding: 20px;
              font-size: 16px;
              line-height: 18px;
              #join-container{
                color: #fff;
                .join-header-title{
                  margin-bottom: 10px;
                  background: url(/static/103qp/img/re/m_welcome.png) 0 0 no-repeat;
                  max-height: 70px;
                  line-height: 80px;
                  color:#fff;
                  text-indent: 1em; 
                  font-size: 24px;
                  padding-left: 60px;
                  font-weight: 700;
                  white-space: nowrap;
                  position: relative;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .join-header-content{
                  strong{
                    font-weight: 700;
                    span{
                      font-size: 15px;
                      color:#FFFF00;
                    }
                  }
                 .fieldset{
                   padding: .35em .625em .75em;
                    margin: 20px auto;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    .regist{
                      margin-left: 18px;
                      padding: 0 5px;
                      color: #fff100;
                      font-size: 14px;
                      display: block;
                      margin-top: -21px;
                    }
                 }
                 .btn-group{
                   margin-top: 30px;
                   margin-bottom: 30px;
                   .form-control{
                        display: inline-block;
                        text-align: left;
                        vertical-align: top;
                        position: relative;
                        margin-left: 249px;
                        margin-top: 25px;
                     .button-area {
                       overflow: hidden;
                       .submit {
                        display: inline-block;
                        text-align: center;
                         width: 100px;
                         height: 28px;
                         line-height: 28px;
                         color: #462205;
                         font-size: 15px;
                         margin: 0 10px;
                         background-color: #FEC36A;
                         box-shadow: inset 0px 0px 2px #fff5e6;
                         cursor: pointer;
                         &:active{
                           transform: scale(.92)
                         }
                         &:hover {
                           color:#fff;
                         }
                       }
                       .cancelBtn {
                         text-align: center;
                         display: inline-block;
                         width: 100px;
                         height: 28px;
                         line-height: 28px;
                         color: #fff;
                         font-size: 15px;
                         margin: 0 10px;
                         background-color: #8B0B12;
                         box-shadow: inset 0px 0px 2px #ff000e;
                         cursor: pointer;
                         &:active{
                           transform: scale(.92)
                         }
                         &:hover {
                          color: #462205;
                         }
                       }
                     }
                   }
                 }
                }
    .register-wrap {
      padding-left:120px;
    margin-top: 15px;
    .list-box {
      .list {
        padding-bottom: 25px;
        position: relative;
        font-size: 16px;
        color: #333;

        input {
          width: 240px;
          height: 24px;
          border: 1px solid transparent;
          // box-shadow: 0 0 6px #3a3a3a;
          border-radius: 3px;
          color: #444444;
          font-size: 12px;
          text-indent: 6px;
          outline: none;
          background-color: #EEEEEE;
        }
        .yzmInput{
            width: 200px!important;
        }
        label {
          font-size: 14px;
          color: #fff;
          width: 115px;
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
            height: 24px;
          }
        }
        .tip{
          color: #bbb;
          font-size: 12px;
          padding-left:5px;
        }
      }

      .smsInputBox {
        .list {
          padding-bottom: 25px;
          position: relative;
          font-size: 12px;
          color: #bbb;;
          text-align: center;

          &.msgCodeWrapper {
            .msg_verify_box {
              position: absolute;
              top: 0;
              left: 328px;
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
            height: 24px;
            border: 1px solid #666;
            box-shadow: 0 0 6px #3a3a3a;
            border-radius: 3px;
            color: #444;
            font-size: 12px;
            text-indent: 6px;
            outline: none;
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
        height: 24px;
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


     
    }
    }

    
  

              }
          }   
    }
   

  }

  .at-wrap:before,
  .at-wrap:after {
      content: '';
      clear: both;
      display: block;
      width: 1000px;
      height: 2px;
  }
  .at-wrap:before {
      background: url('/static/103qp/img/re/container_article_y.png') 50% 0 no-repeat;
  }
  .at-wrap:after {
      background: url('/static/103qp/img/re/container_article_y.png') 50% 0 no-repeat;
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
