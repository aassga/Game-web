<template>
  <div class="login-wrap">
    <div class="list-box">
      <div class="list">
        帐号：
        <input @keydown="pulicError=''" placeholder="帐号(6-20位数字或字母)" type="text" v-model="passKey.userName"
               @blur="getCode" maxlength="20">
      </div>
      <div class="list">
        密码：
        <input @keydown="pulicError=''" placeholder="密码(6-20位数字或字母)" type="password" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login" maxlength="20">
      </div>
      <div class="list list3" v-if="code_show">
        验证码：
        <input @keydown="pulicError=''" placeholder="请输入验证码" type="text" v-model="passKey.code" v-on:keyup.enter="login" maxlength="4">
        <img class="yzm" :src="codeImg" alt="" @click="getCode">
      </div>
      <div class="err" v-if="pulicError">
        <i class="iconfont icon-baojing"></i>
        <span ref="pulicError">{{pulicError}}</span>
      </div>
      <div @click="login" class="submit">
        立即登录
      </div>
      <div class="forget">
        <span>没有帐号？<label @click="register">立即注册</label></span>
      </div>
    </div>
  </div>
</template>


<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'
  import data from "../../../user/login"
  export default {
    mixins:[data],
    props:{
      clean:{type:Boolean}
    },
    data () {
      return {}
    },
    methods: {
      
      // 重置
      reset(){
        this.passKey.userName='';
        this.passKey.password='';
        this.passKey.code='';
        this.$emit('child-say');
        this.cleanvalue()
      },
      // 打开注册界面
      register () {
        this.$store.commit('alert/setChooseModel', '注册帐号')
        this.$store.commit('alert/setLoginTitle', '注册帐号')
      },
      // 清空信息
      cleanvalue(){
        this.agent = this.GetQueryString('agent')||this.GetQueryString('k');
        let registerPc = JSON.parse(localStorage.getItem('config')).register.pc
        let registermodel = JSON.parse(localStorage.getItem('config')).site_model
          if(registermodel=='invite_code'){
            this.iscode=true;
          }else{
            this.iscode=false;
        }
        registerPc.forEach((v, i) => {
          this.register[i] = {}
          switch (v) {
            case 'phone':
              this.register[i].placeholder = '请输入手机号'
              this.register[i].value = ''
              this.register[i].key = v
              this.register[i].name = '手机号'
              break
            case 'email':
              this.register[i].placeholder = '请输入邮箱地址'
              this.register[i].value = ''
              this.register[i].key = v
              this.register[i].name = '邮箱'
              break
            case 'wechat':
              this.register[i].placeholder = '请输入微信号'
              this.register[i].value = ''
              this.register[i].key = v
              this.register[i].name = '微信'
              break
            case 'realName':
              this.register[i].placeholder = '请输入真实姓名'
              this.register[i].value = ''
              this.register[i].key = v
              this.register[i].name = '真实姓名'
              break
            case 'payPassword':
              this.register[i].placeholder = '请输入支付密码'
              this.register[i].value = ''
              this.register[i].key = v
              this.register[i].name = '支付密码'
              break
          }
        });
      }
    },
    created(){
    },
     watch:{
      clean(){
        if(this.clean){
          this.reset()
        }
      }
    },
    store
  }
</script>
<style lang="less" scoped>
  .login-wrap {
    width: 350px;
    margin: 0 auto;
    padding-bottom: 50px;

    .list-box {
      .list {
        margin-bottom: 25px;
        position: relative;
        font-size: 16px;
        color: #333;
        height: 46px;
        line-height: 46px;
        box-sizing: border-box;

        input {
          width: 290px;
          height: 46px;
          border: 1px solid #DBDBDB;
          border-radius: 3px;
          color: #444444;
          font-size: 16px;
          text-indent: 4px;
          outline: none;
          padding-left: 15px;
        line-height: 46px;
        box-sizing: border-box;
        }
      }

      .list.list3 {
        padding-bottom: 30px;
        margin-left: -16px;

        .yzm {
          display: inline-block;
          cursor: pointer;
          width: 90px;
          height: 30px;
          position: absolute;
          right: 15px;
          top: 8px;
        }
      }

      .err {
        width: 296px;
        margin-left: 52px;
        height: 30px;
        line-height: 30px;
        color: #FF6600;
        font-size: 16px;
        border: 1px solid #FF6600;
        background: #FDFFEF;
        border-radius: 3px;
        padding: 0 14px;
        margin-bottom: 20px;

        i {
          margin-right: 5px;
        }
      }

      .forget {
        font-size: 16px;
        color: #999;
        zoom: 1;
        overflow: hidden;
        padding-top: 30px;
        text-align: center;

        span {
          &:first-child {
            label {
              text-decoration: underline;
              color: #FF6D0E;
              cursor: pointer;
            }
          }
        }
      }

      .submit {
        width: 296px;
        height: 45px;
        font-size: 18px;
        text-align: center;
        line-height: 45px;
        background: #FF0024;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 52px;
      }
    }
  }
</style>
