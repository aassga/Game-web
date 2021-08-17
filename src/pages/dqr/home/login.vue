<template>
    <div class="login " v-if="this.$store.state.home.showLogin" >
      <div  class="logBox animated bounceIn animate__animated animate__bounce" ref="logBox">
           <div class="logTitle">
              <div class="logR" @click="closeR"></div>
           </div>
           <div class="logBottom">
                <div class="logUser">
                    <span class="logUserT">用户名：</span>
                    <input autocomplete="off" type="text" v-model="passKey.userName" @blur="getCode" maxlength="20" placeholder="请输入用户名"  />
                </div>
                <div class="logUser">
                     <span class="logUserT">密码：</span>
                    <input autocomplete="off" maxlength="20" placeholder="请输入密码" type="password" v-model="passKey.password" v-on:keyup.enter="login"/>
                </div>
                <div class="logUser" v-if="code_show">
                     <span class="logUserT">验证码：</span>
                     <input autocomplete="off" class="logUserP" maxlength="4" placeholder="请输入验证码" type="text" v-model="passKey.code" v-on:keyup.enter="login"/>
                     <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%',width:'70px',marginLeft:'10px'}" @click="getCode"></span>
                </div>
                <div class="logMember">
                    <div class="logMemberL">
                        <img src="../../../../static/dqr/login/yuan.png" alt="">
                        <span>记住密码</span>
                    </div>
                    <div class="logMemberM" @click="$forget()" >
                        忘记密码?
                    </div>
                    <a >
                        <div @click="onRegister()">
                            没有账号
                            <span>立即注册</span>
                        </div>
                    </a>
                </div>
                <div class="logBtn" @click="login" >立即登录</div>
           </div>
      </div>
    </div>
</template>
<script>
import store from '@/vuex/store'
import data from "../../public/user/login"
export default{
    mixins:[data],
    data(){
        return{
           codeImg: "/static/dqr/img/lo.png",
        }
    },
    mounted(){
    },
    computed:{
      userinfo () {
        return this.$store.state.mainState.userinfo
      },
    },
    methods:{
    onRegister(){
      this.$store.commit('home/getShowLogin', false); 
    },
     closeR(){
      this.$refs.logBox.className = 'logBox animated bounceOutQ';
      setTimeout(()=>{
          this.$store.commit('home/getShowLogin', false); 
      },800)
     },
      isLogged() {
          if (this.userinfo) {
              this.loggedIn = true;
          } else {
              this.loggedIn = false;
          }
      },
     forget () {
        this.$store.commit('alert/newshowtip',{
               bool:true,
               title:'忘记帐号密码,请联系在线客服人员取回！',
               model:'',
               leftspan:false
            })
      },
    },
   
    store
}
</script>
<style lang="less" scoped>
  .bounceOutQ {
            -webkit-animation-name: bounceOutQ;
            animation-name: bounceOutQ;
            --animate-duration: .6s;
         }
         @-webkit-keyframes bounceOutQ {
            0% {
               -webkit-transform: scale(1);
            }
            25% {
               -webkit-transform: scale(.95);
            }
            50% {
               opacity: 1;
               -webkit-transform: scale(1.1);
            }
            100% {
               opacity: 0;
               -webkit-transform: scale(.3);
            }
         }
         @keyframes bounceOutQ {
            0% {
               transform: scale(1);
            }
            25% {
               transform: scale(.95);
            }
            50% {
               opacity: 1;
               transform: scale(1.1);
            }
            100% {
               opacity: 0;
               transform: scale(.3);
            }
         }
.login{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0,0,0,.4);
    .logBox{
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: end;
    justify-content: flex-end;
    width: 640px;
    height: 682px;
    margin: 0 auto;
    border-radius: 0 0 24px 24px;
    background-image: url(/static/dqr/login/login-bg.png);
    background-repeat: no-repeat;
    background-position-x: center; 
    .logTitle{
        height: 80px;
    border-radius: 26px 26px 0 0;
    background-color: #fff;
    background-image: url(/static/dqr/logo/logos.png),url(/static/dqr/login/bg-close.png);
    background-repeat: no-repeat;
    background-position: 38px,568px top;
    background-size: 150px,auto;
    .logR{
    float: right;
    width: 61px;
    height: 60px;
    margin-right: 15px;
    cursor: pointer;
    }
    }
    .logBottom{
        display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    // height: 220px;
    padding: 60px 90px 40px;
    border-radius: 0 0 24px 24px;
    color: #fff;
    background-color: #131a1d;
    .logUser{
        width: 470px;
        height: 32px;
        position: relative;
        display: flex;
        margin-bottom: 10px;
        .logUserT{
            box-sizing: border-box;
            align-items: center;
            width: 90px;
            padding-right: 10px;
            font-size: 20px;
            justify-content: flex-end;
            display: flex;
        }
        input{
            width: 380px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid #fff;
            text-indent: 10px;
            color: #e5e5e5;
            font-size: 16px;
            background-color: #070e11;  
            outline: 0;
        }
        .logUserP{
            width: 200px;
        }
    }
    .logMember{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 40px 9px 40px 43px;
        font-weight: 700;
        .logMemberL{
          font-size: 16px;
            img{
                width: 20px;
                height: 20px; 
                margin-right: 10px;
                cursor: pointer;
            }
            span{
                float: right;
                margin-top: 4px;
            }
        color: #fff;
     
        }
       
        a{
            color: #fff;
           text-decoration: none;
           div{
               span{
                   cursor: pointer;
                   color: #ffe417!important 
               }
           }
        }
    }
    .logBtn{
        display: flex;
        justify-content: center;
        width: 240px;
        height: 40px;
        background-color: #ffe417;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        line-height: 40px;
    }
    }
    }
}

.loginBox{
  animation: bounceIn .6s
}

@keyframes bounceIn{
      0%{
              opacity: 0;
            -webkit-transform: scale(.3);
            -ms-transform: scale(.3);
            transform: scale(.3);
      }
      50% {
            opacity: 1;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
        }
        70% {
    -webkit-transform: scale(.9);
    -ms-transform: scale(.9);
    transform: scale(.9);
    }
     100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
}
}
</style>