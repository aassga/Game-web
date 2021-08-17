<template>
  <div class="header">
    <!-- 头部上面 -->
    <div class="header-top">
      <div class="header-top-left-time"><img src="/static/tycjt/img/11.png" alt="">
        <span>美东时间</span> <span id="mdtime" data-nowtime="2019/03/29 02:34:04" style="font-size:12px">{{time}}</span>
      </div>
      <div class="header-top-right">
        <ul class="headRight">
          <li v-for="(item,index) in canUse" :key="index" @click="goHeader(item.link)" :class="item.className">{{item.name}}</li>
        </ul>
        

        <!-- 登录前 -->
        <div class="login-before" v-if="!$store.state.mainState.loginOrout && $route.path == '/home'">
          <!-- 用户名 -->
          <input
            autocomplete="off"
            type="text"
            placeholder="帐号"
            id="userName"
            v-model="passKey.userName"
            class="input-item username"
            v-on:keyup.enter="login"
            @blur="getCode"
          />
          <!-- 密码 -->
          <input
            autocomplete="off"
            maxlength="20"
            type="password"
            placeholder="密码"
            v-model="passKey.password"
             @keyup="clearNull"
            v-on:keyup.enter="login"
            class="input-item password"
          />
          <!-- 验证码 -->
          <input
            v-if="code_show"
            autocomplete="off"
            maxlength="4"
            type="text"
            placeholder="验证码"
            v-model="passKey.code"
            v-on:keyup.enter="login"
            class="input-item code"
          />
          <div
            v-if="code_show"
            @click="getCode"
          >
            <img :src="codeImg" class="code-img" alt="">
          </div>
          <!-- 登录 -->
          <div class="login-item" @click="login"></div>
          <!-- 注册 -->
          <div class="reg-item" @click="goKaihu">
            <router-link to=""></router-link>
          </div>
        </div>

        

        
      </div>
      <!-- 导航栏登录框 登录前-->
      <div class="header-login" id="xheader-login" style="display:block" v-if="!$store.state.mainState.loginOrout && $route.path !=  '/home'">
          <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
              <div class="header-logincon">
                  <input type="text" class="user" id="userName" name="username" tabindex="1" v-model="passKey.userName" placeholder="帐号"
                      @change="getCode">
                  <input type="password" class="pass" id="passwd" name="password" tabindex="2" v-model="passKey.password" @keyup="clearNull"
                      placeholder="密码">
                  <a href="javascript:void(0)" @click="forget()" class="forget"> 忘记？</a>

                  
                  <div class="verify_code_box" v-if="code_show">
                      <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="3" maxlength="4"
                          title="(点选此处产生新验证码)" v-model="passKey.code">
                      <img class="codeimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                          @click="getCode">
                  </div>
                  <input type="submit" value class="subbtn" @click="login">
                  <a href="javascript:void(0)" class="regbtn" @click="goKaihu"></a>
              </div>
          </form>
      </div>

      <!-- 登录后 -->
      <div class="login-after" v-if="$store.state.mainState.loginOrout">
        <div class="login-after-name">会员帐号: 
          <span class="color-red">{{userinfo.userName}}</span>
        </div>
        <span></span>
        <div>
          钱包余额 :
          <span class="color-red">{{userinfo&&userinfo.balance}}</span>
        </div>
        <div>
          <span class="refresh_balance" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'>
              <a class="refresh" :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']"></a>
          </span>
        </div>
        <span></span>
        <div @click="$goUserCen('recharge',0)">我要存款</div>
        <span></span>
        <div @click="$goUserCen('withdraw',0)">我要提款</div>
        <span></span>
        <div @click="$goUserCen('discounts',0)">时时返水</div>
        <span></span>
        <div @click="$goUserCen('personage',2)">下注记录</div>
        <span></span>
        <div @click="$goUserCen('message',0)">
          站内信
          <span class="msg" v-if="allUnReadCount > 0">{{allUnReadCount}}</span>
        </div>
        <div class="logout" @click="logout">登出</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
import data from "../../public/user/login";
export default {
  mixins: [data],
  data() {
    return {
      codeImg:"/static/tycjt/img/home/lo.png",
      top: -193,
      time: "",
      balanceRefreshing:false,
      canUse:[
        {name:"APP下载",link:"downLoad",className:"downLoad change1"},
        {name:"免息借呗",link:"borrowM",className:"borrowM change2"},
        {name:"金管家",link:"mManage",className:"mManage change3"},
        {name:"线路检测",link:"checkLine",className:"checkLine change4"},
        {name:"投诉建议",link:"advice",className:"advice"}
      ],
      passKey: {
          userName: '',
          password: '',
          code: ''
      },
      isclick:false,
      balanceRefreshing:false,
      showfresh:false,
      allUnReadCount:10,
    };
  },
  methods: {
    getBalance() {
      if(this.isclick) return false
      this.isclick=true
      this.balanceRefreshing=true
      this.showfresh=false
      setTimeout(()=>{
          this.balanceRefreshing=false
      },600)
      setTimeout(()=>{
          this.isclick=false
      },1000)
      getS(`member/balance`).then(res => {
        if (res.code === 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data.member;
          userinfo.agent = res.data.agency;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
        }
      });
    },
    goHeader(name){
      switch (name) {
        case 'downLoad':
          window.open('/static/tycjt/html/download/index.html');
          break;
        case 'borrowM':
          if(localStorage.token){
              if(this.$store.state.game.jieBeiData.show){
                  this.$goUserCen('borrowMoney',0)
              }else{
                 this.$goUserCen('recharge',0)
                 //window.open('/static/tycjt/html/active/jiebei/index.html');
              }
          }else{
            //window.open('/static/tycjt/html/active/jiebei/index.html');
             this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                });
          }
          break;
        case 'mManage':
          window.open('/static/public/active/jgj/index.html');
          break;
        case 'checkLine':
          window.open('https://xianludh.github.io/xianluu/tycjiu/index.html');
          
          // this.$errorAlert('预览版 暂未开放', 'warn')
          // return false
          break;
        case 'advice':
          if(!localStorage.token || !localStorage.userinfo){
            this.$router.push('/home/about/contactUs');
          }else{
            this.$goUserCen('message',1)
          }
          break;
      }
    },
    goKaihu() {
        // this.$router.push('/register-content');
        // this.$errorAlert('预览版 暂未开放', 'warn')
        // return false
        this.$store.commit('alert/showMgmRegister', true);
    },
    newshowfresh() {
      if (this.balanceRefreshing) this.showfresh = false;
      else this.showfresh = true;
    },
    ee(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    },
    we(num) {
        switch (num) {
            case 1:
                num = '一';
                break;
            case 2:
                num = '二';
                break;
            case 3:
                num = '三';
                break;
            case 4:
                num = '四';
                break;
            case 5:
                num = '五';
                break;
            case 6:
                num = '六';
                break;
            case 7:
                num = '七';
                break;
        }
        return num;
    },
    shake(element, className, times) {
            var i = 0,
                t = false,
                o = element.attr('class'),
                c = '',
                times = times || 2;
            if (t) return;
            t = setInterval(function() {
                i++;
                c = i % 2 ? o + ' ' + className : o;
                element.attr('class', c);

                if (i == 2 * times) {
                    clearInterval(t);
                    element.removeClass(className);
                }
            }, 800);
    },
    getTimes() {
            var that = this;
            let timestam = new Date().getTime();
            let time = timestam - 43200000;
            let dateObj = new Date(time),
                p0 = this.ee,
                Y = dateObj.getFullYear(),
                Mh = dateObj.getMonth() + 1,
                D = p0(dateObj.getDate()),
                X = this.we(dateObj.getDay()),
                H = p0(dateObj.getHours()),
                M = p0(dateObj.getMinutes()),
                S = p0(dateObj.getSeconds());

            if (Mh > 12) {
                Mh = '01';
            } else if (Mh < 10) {
                Mh = '0' + Mh;
            }
            let str = `${Y}/${Mh}/${D}/ (${X}) ${H}:${M}:${S}`;
            this.time = str;
        },
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    showMessage(){
      return this.$store.state.mainState.showMessage;
    }
  },
  watch: {
      'showMessage': {
          handler: function(newval, oldVal) {
                this.allUnReadCount=this.showMessage.allUnReadCount
          },
          deep: true
      }
  },
  created() {
    setTimeout(()=>{
        if(localStorage.register){
          this.$store.commit('alert/showMgmRegister', true);
          localStorage.removeItem('register')
        }
    },3000)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        if (!localStorage.userinfo) {
          let timer = setInterval(() => {
            if (localStorage.userinfo) {
              clearInterval(timer);
              window.location.reload();
            }
          }, 1000);
        }
      }
    });
    if (!this.userinfo) return false;
    switch (this.userinfo.levelId) {
      case 2:
        this.top = 1;
        break;
      case 3:
        this.top = -31;
        break;
      case 4:
        this.top = -64;
        break;
      case 5:
        this.top = -96;
        break;
    }
  },
  mounted() {
    let time = setInterval(this.getTimes, 1000);
    this.shake($('.change1'), 'blues', -1);
    this.shake($('.change2'), 'yell', -1);
    this.shake($('.change3'), 'resd', -1);
    this.shake($('.change4'), 'gree', -1);
    // this.shake($('.change5'), 'resd', -1);
  },
  components: {},
  store
};
</script>

<style lang="less" scoped>
.resd {
    color: #ff0000 !important;
}
.yell {
    color: #ffff00 !important;
}
.gree {
    color: #00ff00 !important;
}
.blues {
    color: #154cff !important;
}
.msg{
  color: #fff;
  font-size: 12px;
  display: inline-block;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  background: #ba0000;
  right: -15px;
  text-align: center;
  line-height: 17px;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.color-yellow {
  color: #ebbd46;
}
.fresh {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  background: url("/static/tycjt/img/refresh.png");
  vertical-align: sub;
}
.refresh {
  background: url("/static/tycjt/img/newrefresh.png");
}
.fres {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

.header {
  min-width: 1200px;
  margin: 0 auto;
  background: #141414;
  border-bottom: 1px solid #373737;
  .header-top {
    width: 1200px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    .header-top-left-time {
      float: left;
      padding-left: 30px;
      background: url(/static/tycjt/img/mar.png) no-repeat left center;
      font-size: 14px;
      color: #868686;
      img{
        display: block;
        float: left;
        margin:6px 5px 0 3px;  
      }
    }
    .header-top-right {
      float: right;
      font-size: 15px;
      overflow: hidden;
      .headRight{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height:16px ;
        line-height: 16px;
        margin-top: 9px;
        font-size: 12px;
        li{
          color: #06ff00;
          cursor: pointer;
          padding: 0px 15px;
          text-align: center;
          border-right: 1px solid #a288ff;
          &.borrowM{
            color: #ff0000;
          }
          &.mManage{
             color: #ffff00;
          }
          &.checkLine{
             color: #154cff;
          }
          &.advice{
            color: red;
            border-right:none;
          }
        }
      }
      .login-before {
        width: 1200px;
        margin: 0 auto;
        position: absolute;
        background: url('/static/tycjt/img/login.png') no-repeat;
        left: 50%;
        top: 200px;
        z-index: 3;
            padding: 55px 0 71px 20px;
        background-size: 252px;
        transform: translate(-50%);
        .input-item {
          position: relative;
          display: block;
          width: 214px;
          height: 38px;
          line-height: 38px;
          border: 1px solid #282828;
          border-radius: 4px;
          color: #fff;
          background-color: #060909!important;
          outline: none;
          margin-top: 13px;
          &::-webkit-input-placeholder {
            color: #fff;
          }
          &::-moz-placeholder {
            color: #fff;
          }
          &::-moz-placeholder {
            color: #fff;
          }
          &:-ms-input-placeholder {
            color: #fff;
          }
          &.username {
            padding-left: 30px;
            background: url("/static/tycjt/img/home/username.png") no-repeat 12px 10px;
          }
          &.password {
            padding-left: 30px;
            background: url("/static/tycjt/img/home/password.png") no-repeat 12px 10px;
          }
          &.code {
            padding-left: 30px;
            width: 130px;
            background-size: 13%;
            background: url("/static/tycjt/img/home/yzCode.png") no-repeat 9px 8px;
          }
        }
        .code-img {
          width: 76px;
          height: 36px;
          position: absolute;
          top: 171px;
          left: 156px;
        }
        .login-item,
        .reg-item {
          width: 216px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          text-align: center;
          font-weight: 400;
          margin-top: 18px;
          &.login-item {
            // background: linear-gradient(180deg, #ffaf24, #ffda60);
            // color: #280b08;
            // border: none;
            // cursor: pointer;
            // outline: none;
            background: url("/static/tycjt/img/home/dl.png") no-repeat;
            &:hover{
              cursor:pointer;
            }
          }
          &.reg-item {
            background: url("/static/tycjt/img/home/ro.png") no-repeat;
            cursor: pointer;
            a {
              color: #fff;
            }
          }
        }
      }
    }
    .header-login {
      width: 1200px;
      height: 55px;
      background: #141414;
      z-index: 1;
      border-bottom: 1px solid #0c0c0c;
      position: absolute;
      top: 161px;
      #loginForm {
          width: 1200px;
          height: 100%;
          margin: 0 auto;
          // padding-left: 360px;
          .header-logincon {
              background: url(/static/tycjt/img/wzs.png) left center no-repeat;
              height: 100%;
              width: 1200px;
              margin: 0 auto;
              display: flex;
              justify-content: start;
              align-items: center;
              transform: translate(365px);
              input {
                  background: #000;
                  width: 155px;
                  height: 30px;
                  line-height: 30px;
                  border: 1px solid #434343;
                  color: #fff;
                  padding-left: 15px;
                  float: left;
                  display: block;
                  margin-left: 5px;
                  font-size: 14px;
                  &.user {
                      transition: all 0.4s;
                      margin-left: 205px;
                      &:hover {
                          border: 1px solid #ffd053;
                          transition: all 0.4s ease;
                      }
                  }
                  &.pass {
                      transition: all 0.4s;
                      &:hover {
                          border: 1px solid #ffd053;
                          transition: all 0.4s ease;
                      }
                  }
                  &.code {
                      width: 130px;
                      padding-left: 10px;
                      margin-left: 7px;
                      transition: all 0.4s;
                  }
                  &::-webkit-input-placeholder {
                      color: #fff;font-size: 14px;
                  }
                  &::-moz-placeholder {
                      color: #fff;font-size: 14px;
                      opacity: 1;
                  }
                  &:-moz-placeholder {
                      color: #fff;font-size: 14px;
                      opacity: 1;
                  }
              }

              .verify_code_box {
                  .codeimg {
                      height: 28px;
                      display: block;
                      float: left;
                      position: relative;
                      margin-left: -56px;
                      margin-top: 1px;
                      cursor: pointer;
                  }
              }
              .forget {
                  display: block;
                  width: 45px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
                  background-color: #391C1F;
                  position: relative;
                  margin-left: -47px;
                  margin-top: 0px;
                  font-size: 14px;
                  color: #fff;
              }
              .subbtn {
                  background: url(/static/tycjt/img/subbtn.png) no-repeat;
                  width: 100px;
                  height: 30px;
                  border: none;
                  padding: 0;
                  cursor: pointer;
                  margin-left: 8px;
                  // opacity: 0.8;
                  // &:hover {
                  //     opacity: 1;
                  // }
              }
              .regbtn {
                  background: url(/static/tycjt/img/regbtn.png) top center no-repeat;
                  width: 100px;
                  height: 30px;
                  display: block;
                  float: left;
                  margin-left: 5px;
                  // opacity: 0.8;
                  // &:hover {
                  //     opacity: 1;
                  // }
              }
          }
      }

      .w1000 {
          color: #fff;
          width: 1200px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 4;
          // padding-left: 371px;
          
          .left {
              min-width: 250px;
              height: 100%;
              text-align: left;
              display: flex;
              align-items: center;
              margin-left: 96px;
              span {
                  height: 100%;
                  line-height: 54px;
                  font-size: 16px;
                  padding: 0 1px 0 0;

                  &.account {
                      margin: 0 6px 0 0px;
                      font {
                          display: inline-block;
                          min-width: 68px;
                      }
                  }
                  &.user_money {
                      font {
                          display: inline-block;
                          min-width: 35px;
                      }
                  }

                  
              }
          }

          .right {
              flex: 1;
              margin-left: 8px;
              span {
                  a {
                      font-size: 15px;

                      &.unread_msg {
                          margin: 0 8px;
                      }

                      &.logOut {
                          display: inline-block;
                          width: 62px;
                          height: 24px;
                          line-height: 24px;
                          text-align: center;
                          color: #000;
                          background: url(/static/tycjt/img/log_out.png) center center no-repeat;
                          background-size: contain;
                      }
                  }
              }
          }
      }
    }
    .login-after {
      color: #f8ce5a;
      width: 100%;
      height: 60px;
      line-height: 60px;
      display: flex;
      padding-left: 352px;
      width: 1200px;
      margin: 0 auto;
      position: absolute;
      top: 161px;
      >span{
        display: inline-block;
        height: 17px;
        width: 1px;
        background: #7d6e44;
        margin: 22px -2px 0 7px;
        
      }
      & > div {
        margin-left: 10px;
        cursor: pointer;
        position: relative;
      }
      div:nth-child(1),
      div:nth-child(2) {
        cursor: text;
      }
      .logout {
        width: 90px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background-color: #ffc13d;
        margin-top: 11px;
        border-radius: 4px;
        color: #280b08;
        margin-left: 22px;
      }
      .refresh_balance {
          .refresh {
              display: inline-block;
              width: 22px;
              height: 20px;
              background: url('/static/tycjt/img/refresh.png') center center no-repeat;
              transform: scale(1.2);
              margin-top: 19px;
          }
          .newfresh{
              background:url('/static/tycjt/img/newfresh.png') no-repeat center;
          }
          .fres{
                -webkit-animation: spin 1s linear;
                animation: spin 1s linear;
          }
          @-webkit-keyframes spin {
                from {
                    -webkit-transform: rotate(0deg) scale(1.2);
                  }
                to {
                    -webkit-transform: rotate(360deg) scale(1.2);
                }
            }

          @keyframes spin {
              from {
                  transform: rotate(0deg) scale(1.2);
              }
              to {
                  transform: rotate(360deg) scale(1.2);
              }
          }

        }
    }
  }
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent !important;
  // background-image: none!important;
  transition: background-color 50000s ease-in-out 0s !important;
}
</style>
