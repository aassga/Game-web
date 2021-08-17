<template>
  <div class="header">
    <!-- 头部上面 -->
    <div class="header-top">
      <div class="header-top-left-time">中文 GMT+8 {{time}}</div>
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
          <button class="login-item" @click="login">登录</button>
          <!-- 注册 -->
          <div class="reg-item">
            <router-link to="/home/register">免费开户</router-link>
          </div>
        </div>

        <!-- 登录后 -->
        <div class="login-after" v-if="$store.state.mainState.loginOrout">
          <div class="login-after-name">帐号 : {{userinfo.userName}}</div>
          <div>
            钱包余额 :
            <span class="color-yellow">{{userinfo&&userinfo.balance}}</span>
          </div>
          <div style="margin-left:8px;">
            <span
              class="fresh"
              @click="getBalance"
              :class="[balanceRefreshing ?'fres':'',isclick ?'refresh':'']"
            ></span>
          </div>
          <div @click="$goUserCen('recharge',0)">存款</div>
          <div @click="$goUserCen('withdraw',0)">提款</div>
          <div @click="$goUserCen('discounts',0)">实时返水</div>
          <div @click="$goUserCen('message',0)">
            站内信
            <span v-if="allUnReadCount !=0" class="color-yellow">({{allUnReadCount}})</span>
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
import data2 from "../../public/homeMeans/comfun.js";

export default {
  mixins: [data],
  data() {
    return {
      top: -193,
      allUnReadCount:10,
      time: "",
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
    newshowfresh() {
      if (this.balanceRefreshing) this.showfresh = false;
      else this.showfresh = true;
    },
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
    ee(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    getTimes() {
      var that = this;
      let timestam = new Date().getTime();
      let time = timestam;
      let T = "";
      let dateObj = new Date(time),
        Y = dateObj.getFullYear(),
        Mh = dateObj.getMonth() + 1,
        D = this.ee(dateObj.getDate()),
        X = this.ee(dateObj.getDay()),
        H = this.ee(dateObj.getHours()),
        M = this.ee(dateObj.getMinutes()),
        S = this.ee(dateObj.getSeconds());
      if (Mh > 12) {
        Mh = "01";
      } else if (Mh < 10) {
        Mh = "0" + Mh;
      }
      let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
      this.time = str;
    },
    register() {
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
  watch: {
      'showMessage': {
          handler: function(newval, oldVal) {
                this.allUnReadCount=this.showMessage.allUnReadCount
          },
          deep: true
      }
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
  color: #6f3e7b;
}
.fresh {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  background: url("/static/public/image/common/amxpj.png");
  vertical-align: sub;
}
.refresh {
  background: url("/static/public/image/common/newrefresh.png");
}
.fres {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
.header {
  min-width: 1200px;
  margin: 0 auto;
  background: #D0D9E5;
  font-weight: 400;

  .header-top {
    width: 1200px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    overflow: hidden;
    .header-top-left-time {
      float: left;
      padding-left: 30px;
      background: url(/static/cjw/img/home/cn.png) no-repeat left center;
      font-size: 13px;
      color:#67729F;
    }
    .header-top-right {
      float: right;
      font-size: 14px;
      overflow: hidden;
      .login-before {
        overflow: hidden;
        margin-top: 12px;
        .input-item {
          position: relative;
          float: left;
          width: 152px;
          height: 38px;
          line-height: 38px;
          border: 0;
          border-radius: 4px;
          color: #fff;
          background-color: #AAB7CA;
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
            background: url("/static/cjw/img/home/username.png") no-repeat 12px 10px, #AAB7CA;
          }
          &.password {
            padding-left: 30px;
            background: url("/static/cjw/img/home/password.png") no-repeat 12px 10px, #AAB7CA;
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
          &.login-item {
            background:#DF3E7B;
            color: #fff;
            border: none;
            cursor: pointer;
            outline: none;
          }
          &.reg-item {
            background:#697DAC;
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
        }
      }
    }
    .login-after {
      color: #697dac;
      width: 100%;
      height: 60px;
      line-height: 60px;
      & > div {
        float: left;
        margin-left: 10px;
        cursor: pointer;
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
        background-color: #697dac;
        margin-top: 11px;
        border-radius: 4px;
        color: #ffffff;
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
