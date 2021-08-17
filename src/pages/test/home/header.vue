<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top">
      <!-- 登录 -->
      <div class="login">

        <!-- 登录前 -->
        <div class="login-before" v-if="!userinfo">
          <!-- 用户名 -->
          <div class="username">
            <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode">
          </div>
          <!-- 密码 -->
          <div class="password">
            <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login">
          </div>
          <!-- 验证码 -->
          <div class="code"  v-if="code_show">
            <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
            <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'cover'}" @click="getCode"></span>
          </div>
          <!-- 登录 -->
          <div>
            <input type="button" value="登录" id="loginBtn" @click="login">
          </div>
          <!-- 开户 -->
          <div>
            <router-link tag="input" to="/home/register" type="button" value="免费开户" id="resetBtn"></router-link>
          </div>
          <!-- 试玩 -->
          <div>
            <!-- <input type="button" value="试玩" @click="tryPlay" style="background-color: #7fb1a7"> -->
            <!-- <router-link tag="input" to="/home" type="button" value="试玩"  style="background-color: #7fb1a7" @click.native="tryPlay"></router-link> -->
          </div>
          <!-- 忘记密码 -->
          <div class="last_item">
            <a class="forgetpwd" @click="forget" href="javascript:void(0)">忘记密码?</a>
          </div>
        </div>

        <!-- 登录后 -->
        <div class="login-after" v-if="userinfo">

          <!-- 欢迎 -->
          <div class="part1">
            <span>欢迎您！</span>
            <i class="vip-sprite"
               :style="{backgroundImage: 'url(' + dengjiImg + ')', backgroundPosition:left+'px '+top+'px'}"></i>
            <span>帐号：</span>
            <span>{{userinfo.userName}}</span>
          </div>
          <!-- 余额 -->
          <div class="part2 ">
            &nbsp;
            <label>
              <label>余额(RMB):</label>
            </label>
            <span style="margin-left: 5px; margin-right: 5px;">{{userinfo&&userinfo.balance}}</span>
          </div>

          <div class="part3">

            <a href="javascript:void(0);">
                <label style="cursor:pointer;background: rgb(222, 150, 120);color:#fff;" for="" v-if="!showReload" @click="getBalance">一键刷新</label>
                <label style="cursor:default;background: #aeaeae;color:#fff;" for="" v-if="showReload">刷新完成</label>
            </a>

          </div>

          <div class="part5">
            <i class="iconfont icon-home-user"></i>
            <a href="javascript:void(0)" @click="goUserCen('personage',0)">会员中心</a>
            <div class="login-dropdown" style="width: 120px;">
              <ul>
                <li @click="goUserCen('recharge',0)">存款</li>
                <li @click="goUserCen('withdraw',0)">提款</li>

              </ul>
            </div>
          </div>

          <div class="part6">
            <i class="iconfont icon-home-message"></i>
            <a href="javascript:void(0)" @click="goUserCen('message',0)" style="position:relative">
              我的信息
                <inForMation></inForMation>
            </a>
          </div>

          <div class="last_item">
            <a href="javascript:void(0);" @click="logout">登出</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'
  import {postS,getS} from '@/service/public/service.js'
  import inForMation from "../../public/home/information.vue" 
  import data from "../../public/user/login"
  export default {
    mixins:[data],
    data () {
      return {
        left: 5,
        top: -193,
        showReload: false,
      }
    },
    methods: {
      getBalance () {
        this.showReload = true
        getS(`member/balance`).then(res => {
            if (res.code == 200) {
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)
              this.$store.commit('alert/showTipModel',{
                bool:true,
                title:'刷新余额成功！',
                model:'',
                leftspan:false
              })
            }else{
              this.$store.commit('alert/showTipModel',{
                bool:true,
                title:'服务器报错',
                model:'',
                leftspan:false
              })
            }
          })
          setTimeout(()=>{
              this.showReload = false
          },5000)

      },
      // 打开个人中心
      goUserCen (name, num) {
        //name的类型有 ：  recharge （充值）  personage （个人资料）
        //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
        this.$store.commit('showPersonal', {
          bool: true
        })
        this.$store.commit('showContent', {
          parent: name
        })
        this.$store.commit('showNav', {
          child: num
        })
      },
      forget () {
        // alert('忘记帐号密码，请联系在线客服人员取回！')
        this.$store.commit("alert/showTipModel", {
          bool: true,
          title: '忘记帐号密码，请联系在线客服人员取回！',
          model: "warn"
        });

      },
    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      }
    },
    created () {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == 'hidden') {
          if (!localStorage.userinfo) {
            let timer = setInterval(() => {
              if (localStorage.userinfo) {
                clearInterval(timer)
                window.location.reload()
              }
            }, 1000)
          }
        }
      })
      if (!this.userinfo) return false
      switch (this.userinfo.levelId) {
        case 2:
          this.top = 1
          break
        case 3:
          this.top = -31
          break
        case 4:
          this.top = -64
          break
        case 5:
          this.top = -96
          break
      }
    },
    components:{
       inForMation
    },
    store
  }
</script>

<style lang="less" scoped>
  .new-header {
    max-width: 1920px;
    min-width: 1200px;
    margin: 0 auto;
    background: #fff;

    .header-top {
      height: 50px;
      background: #1d1d1d;
      line-height: 50px;

      .login {
        margin: 0 auto;
        width: 1000px;

        input {
          width: 150px;
          height: 30px;
          padding: 0 0 0 5px;
          background: #505050;
          line-height: 30px;
          color: #fff;
          border: none;
          font-size: 14px;
          outline: none;
          text-indent: 4px;
        }

        input[type="button"] {
          width: 80px;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          cursor: pointer;
          color: #fff;
        }

        .login-before {
          float: right;
          // margin-top: 10px;
          div {
            float: left;
            position: relative;
            margin: 0 6px 0;
            text-align: left;

            #loginBtn {
              background: #ff5555;
            }

            #resetBtn {
              background: #b48c68;
            }
          }

          .code {
            input {
              width: 160px;
            }

            span {
              display: inline-block;
              cursor: pointer;
              width: 90px;
              height: 30px;
              position: absolute;
              right: 0;
              top: 10px;
            }
          }

          .last_item {
            margin: 0 0 0 6px;

            a {
              line-height: 30px;
              color: #9e9e9e;
              cursor: pointer;
              font-size: 14px;
            }
          }
        }

        .login-after {
          float: right;
          font-size: 13px;

          // a {
          //   height: 30px;
          //   text-align: center;
          //   line-height: 30px;
          //   color: #fff;
          //   width: 60px;
          //   display: inline-block;
          // }

          a {
            height: 30px;
            text-align: center;
            line-height: 30px;
            min-width: 60px;
            color:#fff;
            display: inline-block;
            label{
              display: inline-block;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }

          div {
            height: 50px;
            margin-right: 10px;
            float: left;
            line-height: 50px;
            color: #fff;

            i {
              vertical-align: middle;
            }

            a {
              vertical-align: middle;
            }
          }

          .part1 {
            .vip-sprite {
              width: 38px;
              height: 30px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 4px;
            }
          }

          .part5 {
            position: relative;

            .login-dropdown {
              display: none;
              position: absolute;
              top: 50px;
              left: -30px;
              z-index: 9999;
              background: #1d1d1d;
              height: 68px;
              line-height: 68px;

              ul {
                li {
                  display: block;
                  width: 100%;
                  text-align: center;
                  height: 34px;
                  line-height: 34px;
                  cursor: pointer;
                }

                li:hover {
                  background: #b48c68;
                }
              }
            }
          }

          .part5:hover {
            .login-dropdown {
              display: block;
            }
          }

          .last_item {
            a {
              background: #b48c68;
              // margin-top: 10px;
            }
          }
        }
      }
    }
  }


  input:-webkit-autofill{
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent!important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s!important;
  }
</style>
