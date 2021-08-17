<template>
  <div class="wbw-login">
    <h3 class="reg_tit">登入帐号</h3>
    <p class="reg_small"></p>
    <ul class="regMain">
      <li>
        <span>帐 号：</span>
        <input type="text" autocomplete="off" class="userInput" placeholder="请输入帐号" v-model="passKey.userName" @blur="getCode" maxlength="20">

      </li>

      <li>
        <span>密 码：</span>
        <input type="password" autocomplete="off" class="userInput" placeholder="请输入密码" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login" maxlength="20">

      </li>
      <li v-if="code_show">
        <span>验 证 码：</span>
        <input type="passwoed" autocomplete="off" class="userInput" placeholder="请输入验证码" v-model="passKey.code" v-on:keyup.enter="login" maxlength="4">
        <span class="codeyzm" :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'cover'}"
              @click="getCode"></span>

      </li>

      <li style="margin-top: 23px;">
        <span></span>
        <a class="mainColorBtn" @click="login">登 录</a>
        <a><a @click="forgetPwd" class="forgetPwd">忘记密码?</a></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import {postS,getS} from '@/service/public/service.js'
  import data from "../../public/user/login"
  export default {
    mixins:[data],
    data () {
      return {
      }
    },
    methods: {
      forgetPwd () {
        this.$store.commit('alert/showTipModel',{
          bool:true,
          title:'请联系客服修改密码',
          model:'warn'
        })
      },
      },
    created(){
    }
  }
</script>

<style lang="less" scoped>
  .wbw-login {
    width: 870px;
    min-height: 480px;
    margin: 30px auto;
    border: 1px solid #e1e1e2;
    padding-top: 20px;
    font-size: 14px;
    background: url("../../../../static/csj/img/home/loginBg.png") no-repeat 450px 220px #fff;

    h3 {
      font-size: 24px;
      color: #ff2c55;
      margin-bottom: 5px;
      margin-left: 30px;
      margin-top: 0;
    }

    p {
      margin-left: 30px;
      color: #646464;
      margin-bottom: 10px;
      margin-top: 0;
      height: 24px;
    }

    .regMain {
      border-top: 1px dashed #e0e3e6;
      padding: 50px 0;
      font-size: 0;
      margin: 0 30px;

      li {
        color: #000;
        line-height: 36px;
        margin-bottom: 4px;
        position: relative;

        > span {
          display: inline-block;
          width: 18%;
          text-align: right;
          font-size: 12px;
          color: #333;
          padding-right: 5px;
        }

        > input {
          height: 36px;
          width: 280px;
          border: 1px solid #e7e8e8;
          background-color: #feffff;
          color: #a9a9a9;
          padding-left: 10px;
          margin: 0;
          vertical-align: top !important;
          line-height: 20px;
          padding: 5px;
          font-size: 12px;
          text-indent: 5px;
        }

        > input:focus {
          outline: none;
        }

        .codeyzm {
          width: 90px;
          height: 30px;
          position: absolute;
          top: 3px;
          left: 332px;
        }

        .mainColorBtn {
          display: inline-block;
          width: 130px;
          line-height: 36px;
          color: #fff !important;
          padding: 0 15px;
          border-radius: 3px;
          font-size: 14px;
          margin-right: 10px;
          min-width: 55px;
          text-align: center;
          cursor: pointer;
          background: #e4393c;
          margin: 10px 0;
        }

        .forgetPwd {
          font-size: 12px;
          text-decoration: underline;
          margin-left: 40px;
          color: #ff2c55;
        }
      }
    }
  }
  input:-webkit-autofill{
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent!important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s!important;
  }
</style>
