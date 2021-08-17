<template>
  <div class="main">
    <div class="header-nav">
      <div class="header-nav-body clear-fix">
        <span>您好,欢迎来到彩票之家</span>
        <span>{{time}}</span>
        <nav class="nav">
          <ul class="clear-fix">
            <li><a target="_blank" :href="links.jiechiLink">防劫持教程</a></li>
            <li><a target="_blank" :href="links.navLink">网址导航</a></li>
            <li><a href="javascript: void(0)" @click="addFavorite('500彩票')">添加收藏</a></li>
            <li><a @click="$openKefu">在线客服</a></li>
            <li><a target="_blank" href="/m">手机版</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header-main clear-fix">
      <a href="javascript: void(0)" @click="$router.push('/')">
        <img class="logo" src="/static/cpzj/img/logo.png"/>
      </a>
      <div class="header-image" ></div>

      <div class="header-font" v-if="$store.state.mainState.loginOrout">
        <p>全新代理全新体验</p>
        <p><span>梦想</span>从这里启航</p>
      </div>
      <!-- 登录前 -->
      <!-- 有验证码情况 -->
      <div class="login-before clear-fix" v-if="!$store.state.mainState.loginOrout&&code_show" style="top:4px;right:-4px">
        <div class="form-input">
          <div class="row clear-fix" style="margin-bottom:15px">
            <input class="header-input" type="text" maxlength="20" autocomplete="off" placeholder="帐号" v-model="passKey.userName"
                   @blur="getCode">
            
            <span v-if="code_show" style="position:relative">
                <input class="header-input w-100" size="mini" autocomplete="off" placeholder="验证码" maxlength="4" type="text" v-model="passKey.code" style="width:120px"></input>
                <img class="auth-image" :src="codeImg" alt="" @click="getCode" style="position:absolute;right:-4px;top:0">
            </span>

          </div>
          <div class="row clear-fix" style="margin-bottom:15px">
            

            <input class="header-input" maxlength="20" autocomplete="off" type="password" placeholder="密码"
                 @keyup="clearNull" v-model="passKey.password">
            <a class="forget_pwd" @click="$forget()" href="javascript:void(0)">忘记密码?</a>


            <button class="header-button" @click="login" style="width:52px">登录</button>
            <button class="header-button" @click="register" style="width:52px">注册</button>
          </div>
        </div>
      </div>
      <!-- 没有验证码情况 -->
      <div class="login-before clear-fix" v-if="!$store.state.mainState.loginOrout&&!code_show" style="width:254px">
        <div class="form-input" style="height:65px;position:relative;top:8px">
          <div class="row clear-fix" style="margin-bottom:0">
            <input class="header-input" type="text" maxlength="20" autocomplete="off" placeholder="帐号" v-model="passKey.userName"
                   @blur="getCode" style="margin-bottom:8px">
                   <br><br>
            <input class="header-input" maxlength="20" autocomplete="off" type="password" placeholder="密码"
                   v-model="passKey.password" @keyup="clearNull" style="margin-bottom:4px">
            <a class="forget_pwd" @click="$forget()" href="javascript:void(0)" style="line-height:43px">忘记密码?</a>
          </div>
          <div class="row clear-fix" style="position:relative;top:-33px;right:-155px;margin-bottom:0">
            <span v-if="code_show">
                <input class="header-input w-100" size="mini" autocomplete="off" placeholder="验证码" maxlength="4" type="text" v-model="passKey.code"></input>
                <img class="auth-image" :src="codeImg" alt="" @click="getCode">
            </span>
            <button class="header-button" @click="login" style="margin-top:-38px;width:78px">登录</button>
            <button class="header-button" @click="register" style="width:78px">注册</button>
          </div>
        </div>
      </div>
      <!-- 登录后 -->
      <div class="login-after" v-if="$store.state.mainState.loginOrout">
        <div class="row">
          <p><span>用户帐号</span>：<span>{{userinfo.userName}}</span></p>
          <a href="javascript: void(0)" @click="logout">退出</a>
        </div>
        <div class="row">
          <a href="javascript: void(0)" @click="$goUserCen('personage',2)">投注记录</a>
          <span>余额</span>：<span>{{userinfo ? userinfo.balance : ''}}</span>
          <span :class="['fa fa-fw fa-refresh',isclick ?'refresh':'',balanceRefreshing ?'fa-spin':'']" style="cursor:pointer" @mouseover='showfresh=true' @mouseout='showfresh=false' @click="getBalance">
                  <!-- <freshButton class="freshButton" v-show="showfresh" :newrefreh="newrefreh" style="position:relative"></freshButton> -->
          </span>
        </div>
        <div class="row">
          <a href="javascript: void(0)" @click="$goUserCen('personage',0)">会员中心</a>
          <a href="javascript: void(0)" @click="$goUserCen('recharge',0)">存款</a>
          <a href="javascript: void(0)" @click="$goUserCen('withdraw',0)">取款</a>
        </div>
      </div>
    </div>
      <div class="my-modal" v-show="ifLogin">
        <div class="bg"></div>
        <div class="my-modal-content">
          <div class="my-register">注册帐号</div>
          <vp-admin-index></vp-admin-index>
        </div>
      </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
import vpAdminIndex from "../../public/tradition/components/admin";
import freshButton from "../../public/home/freshButton";
import data from "../../public/user/login";

export default {
  mixins: [data],
  data() {
    return {
      isclick:false,
      balanceRefreshing:false,
      showfresh:false,
      time: this.getHMS(new Date()),
      links: {
        navLink: "http://666cpzj.com",
        jiechiLink: "http://jc.qm80.com/#other-router"
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
    //注册
    register() {
      this.$store.commit("alert/showLogin", true);
      this.$store.commit("alert/setChooseModel", "注册帐号");
      this.$store.commit("alert/setLoginTitle", "注册帐号");
    }
  },
  computed: {
    // 个人信息刷新
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    // 是否提示信息
    tipDatas() {
      return this.$store.state.alert.tipModel;
    },
    // 是否显示登录
    ifLogin() {
      return this.$store.state.alert.login.ifLogin;
    },
    // 登录注册标题切换
    modelTitle() {
      return this.$store.state.alert.login.modelTitle;
    }
  },
  created() {
    if (localStorage.zhuce) {
      if (!localStorage.token) {
        this.register();
        localStorage.removeItem("zhuce");
      }
    }
    setInterval(() => {
      this.time = this.getTimes(new Date());
    }, 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
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
  },
  components: {
    vpAdminIndex,
    freshButton
  },
  store
};
</script>

<style type="text/less" lang="less" scoped>
.vp-login-warp {
  /deep/ .ivu-modal-wrap {
    top: 50%;
    -webkit-transform: translateY(-60%);
    -moz-transform: translateY(-60%);
    -o-transform: translateY(-60%);
    -ms-transform: translateY(-60%);
    transform: translateY(-60%);
    overflow: inherit;

    .ivu-modal {
      top: 10%;

      .ivu-modal-header {
        margin: 14px 20px 0 20px;
        height: 70px;

        .ivu-modal-header-inner {
          font-size: 20px;
          color: #333;
          font-weight: normal;
          border-bottom: 2px solid #ff0024;
          display: inline-block;
          width: auto;
          padding: 20px 10px 34px 10px;
        }
      }

      .ivu-modal-body {
        padding: 30px;
      }

      .ivu-modal-footer {
        display: none;
      }
    }
  }
}

.row:after,
.clear-fix {
  content: "";
  display: table;
  clear: both;
  zoom: 1;
}

.main {
  .header-nav {
    line-height: 30px;
    background-color: #f5f5f5;

    .header-nav-body {
      width: 1000px;
      margin: 0 auto;
      font-size: 12px;
      // padding-right:7px;
      .nav {
        float: right;

        ul {
          li {
            float: right;

            a {
              color: #5e5e5e;
            }

            a:hover {
              color: #f13131;
            }
          }

          li:after {
            content: "|";
            padding: 0 6px;
          }

          li:first-child::after {
            content: "";
            padding: unset;
          }
        }
      }
    }
  }

  .header-main {
    width: 1000px;
    height: 99px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;

    a {
      float: left;

      .logo {
        height: 99px;
      }
    }

    .header-image {
      float: left;
      width: 240px;
      height: 87px;
      background-size: 100% 100%;
      background: url("/static/cpzj/img/header-img.png") no-repeat;
    }

    .header-font {
      float: left;
      color: red;
      line-height: 30px;
      margin: 20px 0 0 25px;
      span {
        display: inline-block;
        margin-right: 10px;
      }
    }

    .login-before {
      width: 309px;
      height: 99px;
      padding-top: 10px;
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;

      .row {
        position: relative;
        margin-bottom: 15px;
        white-space: nowrap;
      }
      .form-input {
        .header-input,
        .header-button {
          float: left;
          height: 20px;
          padding: 4px 14px;
          line-height: 20px;
          border-radius: 15px;
          box-sizing: content-box;
          margin-right: 4px;
          border: none;
          font-size: 14px;
          outline: none;
          cursor: pointer;
          &:last-child {
            margin-right: 0;
          }
        }

        .header-input {
          width: 120px;
          border: 1px solid #999999;

          &.w-100 {
            width: 70px;
          }

          &:hover,
          &:focus {
            border: 1px solid #f13131;
            box-shadow: 0 0 3px 0 #f13131;
          }
        }

        .header-button {
          width: 40px;
          color: #444444;
          background-color: #d4d4d4;
          padding: 4px 10px;

          &:hover {
            color: white;
            background-color: #f13131;
          }
        }

        .auth-image {
          float: left;
          margin-top: 2px;
          height: 26px;
          width: 57px;
          margin-right: 10px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        .forget_pwd {
          float: left;
          line-height: 30px;
          margin-right: 10px;
          font-size: 12px;
          color: #999999;
          position: absolute;
          right: 150px;
          &:hover {
            color: #f13131;
          }
        }
      }

      .form-button {
        width: 60px;
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
    .login-after {
      width: 235px;
      height: 85px;
      margin: 10px 0 0 5px;
      float: right;
      font-size: 14px;

      .row {
        height: 28px;
        line-height: 28px;
        position: relative;
        white-space: nowrap;
        &:nth-child(1) {
          position: relative;
          a {
            color: #999999;
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        &:nth-child(2) span:nth-child(4) {
          margin-left: 10px;
        }
        a {
          color: #000;
          margin-right: 16px;
        }
        .refresh {
          color: #999;
        }
      }
    }
  }
  .my-modal {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .bg {
      z-index: 9998;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.36);
    }
    .my-modal-content {
      max-width: 750px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 9999;
      background-color: #fff;
      // padding: 5% 0;
      border-radius: 10px;

      .vp-admin-wrap {
        padding: 116px 0 0px;
      }

      .my-register {
        position: absolute;
        font-size: 20px;
        line-height: 20px;
        color: #333;
        font-weight: normal;
        border-bottom: 2px solid #ff0024;
        padding: 20px 10px 20px 10px;
        top: 0px;
        left: 30px;
        z-index: 99;
      }
    }
  }
}

input:-webkit-autofill {
  -webkit-text-fill-color: #333 !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent !important;
  transition: background-color 50000s ease-in-out 0s !important;
}
</style>

