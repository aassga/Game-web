<template>
  <div class="header">
    <!-- 头部上面 -->
    <div class="header-top">
      <div class="header-top-left-time"> <span> </span> </div>
      <div class="header-top-right">
        <!-- 登录前 -->
        <div class="login-before" v-if="!$store.state.mainState.loginOrout">
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
          <button class="login-item" @click="login">登入</button>
          <!-- 注册 -->
          <div class="reg-item">
            <button @click="regtster">免费开户</button>
          </div>
        </div>

        <!-- 登录后 -->
        <div class="login-after" v-if="$store.state.mainState.loginOrout">
          <div class="login-after-name">会员帐号:
            <span class="color-yellow">{{userinfo.userName}}</span>
          </div>
          <span></span>
          <div>
            帐号余额:
            <span class="color-yellow">{{userinfo&&userinfo.balance}}</span>
          </div>
          <div style="margin:-2px 0 0 5px">
            <span
              class="fresh"
              @click="getBalance"
              :class="[balanceRefreshing ?'fres':'',isclick ?'refresh':'']"
            ></span>
          </div>
          <span></span>
          <div @click="$goUserCen('recharge',0)">我要存款</div>
          <span></span>
          <div @click="$goUserCen('withdraw',0)">我要提款</div>
          <span></span>
          <div @click="$goUserCen('discounts',0)">时时返水</div>
          <span></span>
          <div @click="$goUserCen('message',0)">
            站内信
            <span class="msg" v-if="allUnReadCount > 0">{{allUnReadCount}}</span>
          </div>
          <div class="logout" @click="logout">登出</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
import inForMation from "../../public/home/information.vue";
import data from "../../public/user/login";

export default {
  mixins: [data],
  data() {
    return {
      allUnReadCount:10,
      codeImg:"/static/mgm/img/new_games/lo.png",
      top: -193,
      interName: "m9984",
      isclick:false,
      balanceRefreshing:false,
      showfresh:false,
      passKey: {
        userName: "",
        password: ""
      }
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
    regtster(){
        this.$store.commit('alert/showMgmRegister', true);
    },
    newshowfresh() {
      if (this.balanceRefreshing) this.showfresh = false;
      else this.showfresh = true;
    },
  },
  watch: {
      'showMessage': {
          handler: function(newval, oldVal) {
                this.allUnReadCount=this.showMessage.allUnReadCount
          },
          deep: true
      }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    showMessage(){
        return this.$store.state.mainState.showMessage;
    }
  },
  created() {
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
  },
  components: {},
  store
};
</script>

<style lang="less" scoped>
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
.msg{
  color: #fff;
  font-size: 12px;
  display: inline-block;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  background: #ba0000;
  right: -12px;
  text-align: center;
  line-height: 17px;
}
.fresh {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  background: url("/static/mgm/img/refresh.png");
  vertical-align: sub;
}
.refresh {
  background: url("/static/mgm/img/newrefresh.png");
}
.fres {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
.header {
  min-width: 1200px;
  margin: 0 auto;
  background: #15112A;
  font-weight: 400;

  .header-top {
    width: 1200px;
    height: 52px;
    line-height: 52px;
    margin: 0 auto;
    overflow: hidden;
    .header-top-left-time {
      float: left;
      height: 52px;
      padding-left: 278px;
      background: url(/static/mgm/img/home/duchang.png) no-repeat 18px center;
      background-size: 240px 37px;
      font-size: 17px;
      color: #5E528F;
      span{
        color: #8273CE;
      }
    }
    .header-top-right {
      float: right;
      font-size: 14px;
      overflow: hidden;
      .login-before {
        overflow: hidden;
        margin-top: 7px;
        .input-item {
          position: relative;
          float: left;
          width: 172px;
          height: 38px;
          line-height: 38px;
          border: 1px solid #453B70;
          border-radius: 4px;
          color: #fff;
          background-color: transparent;
          margin-left: 8px;
          outline: none;
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
            background: url("/static/mgm/img/home/username.png") no-repeat 12px 10px;
          }
          &.password {
            padding-left: 30px;
            background: url("/static/mgm/img/home/password.png") no-repeat 12px 10px;
          }
          &.code {
            padding-left: 10px;
            width: 94px;
          }
        }
        .code-img {
          width: 76px;
          height: 36px;
        }
        .login-item,
        .reg-item {
          width: 90px;
          height: 38px;
          line-height: 38px;
          border-radius: 4px;
          text-align: center;
          font-weight: 400;
          font-size: 16px;
          &.login-item {
            background:linear-gradient(0deg,rgba(242,228,139,1),rgba(227,199,90,1));
            color: #280b08;
            border: none;
            cursor: pointer;
            outline: none;
          }
          &.reg-item {
            background:linear-gradient(0deg,rgba(231,0,0,1),rgba(143,0,0,1));
            cursor: pointer;
            a {
              color: #fff;
            }
          }
        }
        & > div,
        & button {
          float: left;
          margin-left: 8px;
          background: transparent;
          outline: none;
          border: none;
          color: #fff;
          width: 72px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .login-after {
      color: #8273CE;
      width: 100%;
      height: 52px;
      line-height: 52px;
      font-size: 16px;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      
      >span{
        display: inline-block;
        height: 17px;
        width: 1px;
        background: #362c5b;
        margin: 18px -2px 0 7px;
        
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
        font-size: 16px;
        background-color: #ffc13d;
        margin-top: 7px;
        border-radius: 4px;
        color: #280b08;
        margin-left: 21px;
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
