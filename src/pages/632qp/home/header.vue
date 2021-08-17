<template>
  <div class="new-header">

    <!-- 头部上面 -->
    <div class="header-top" :class="{night:colorbool}" >
    <!-- <div class="header-top" :class="{night:colorbool}" :style="{backgroundColor:headerbgColor}"> -->
      <!-- 登录 -->
      <div class="login">
        <div class="sj">
            <img src="/static/632qp/img/china.png" alt="" style="vertical-align: middle;margin-right:10px;">
            <span style="color:#697dac;">中文</span>
            <a href="javascript:void(0)" style="color:#697dac;margin-left:8px">GMT+8 &nbsp;<span id="EST_reciprocal">{{time}}</span></a>
        </div>
        <!-- 登录前 -->
        <div class="login-before" v-if="!userinfo" :class="{headerColor:headerColorBool}">
          <!-- 帐号 -->
          <div class="username">
            <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode" @focus="focusname" maxlength="20">
          </div>
          <!-- 密码 -->
          <div class="password">
            <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login">
          </div>
          <!-- 验证码 -->
          <div class="code"  v-if="code_show">
            <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
            <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
          </div>
          <!-- 登录 -->
          <div>
            <input type="button" value="登录" id="loginBtn" style="padding:0;text-indent:0" @click="login">
          </div>
          <!-- 开户 -->
          <div>
            <router-link tag="input" to="/home/register" type="button" style="padding:0;text-indent:0" value="免费开户" id="resetBtn"></router-link>
          </div>
          <!-- 试玩 -->
          <!-- <div>
            <input type="button" value="试玩" @click="tryPlay" style="background-color: #7fb1a7">
            <router-link tag="input" to="/home" type="button" value="试玩"  style="background-color: #7fb1a7;padding:0;text-indent:0" @click.native="tryPlay"></router-link>
          </div> -->
          <!-- 忘记密码 -->
          <div class="last_item" style="margin-right:0">
            <a class="forgetpwd" @click="forget" href="javascript:void(0)">帐号问题?</a>
          </div>
        </div>

        <!-- 登录后 -->
        <div class="login-after" v-if="userinfo">

          <!-- 欢迎 -->
          <div class="part1" :class="{headerColor:headerColorBool}">
            <!-- <span>欢迎您！</span> -->
            <i class="vip-sprite"
               :style="{backgroundImage: 'url(' + dengjiImg + ')', backgroundPosition:left+'px '+top+'px'}"></i>
            <span>帐号：</span>
            <span style="margin-left:-8px">{{userinfo.userName}}</span>
          </div>
          <!-- 余额 -->
          <div class="part2 " :class="{headerColor:headerColorBool}">
            &nbsp;
            <label>
              <label>余额(RMB)</label>
            </label>
            <span style="margin-left: 5px; margin-right: 5px;">{{userinfo&&userinfo.balance}}</span>
          </div>

          <div class="part3" :class="{headerColor:headerColorBool}">
            <a href="javascript:void(0);">
              <label style="cursor:pointer;background: #df3e7b;color:#fff;border-radius: 5px;" for="" v-if="!showReload" @click="getBalance">一键刷新</label>
              <label style="cursor:default;background: #697dac;color:#fff;border-radius: 5px;" for="" v-if="showReload">刷新完成</label>
            </a>
          </div>

          <div class="part5" :class="{headerColor:headerColorBool}">
            <i class="iconfont icon-home-user"></i>
            <a href="javascript:void(0)" @click="goUserCen('personage',0)">会员中心</a>

            <div class="login-dropdown" style="width: 120px;">
              <ul>
                <li @click="goUserCen('recharge',0)">存款</li>
                <li @click="goUserCen('withdraw',0)">提款</li>

              </ul>
            </div>
          </div>

          <div class="part6" :class="{headerColor:headerColorBool}">
            <i class="iconfont icon-home-message"></i>
            <a href="javascript:void(0)" @click="goUserCen('message',0)" style="position:relative">
              我的信息
              <inForMation :systemmessage='systemmessage'></inForMation>
            </a>
          </div>

          <div class="last_item" style="margin-right:0">
            <a href="javascript:void(0);" @click="logout">登出</a>
          </div>
        </div>
      </div>
       <Modal
              :visible.sync="modal6"
               class="model"
               width="306"
               height="146"
              v-model="showmodle"
              title="信息"
              :loading="loading"
              @on-ok="asyncOK">
              <p>开始进行缓存清除，完毕后将会刷新网站！</p>
       </Modal>
        <qyLogin ref="qylogin" :logiinTishi="logiinTishi"></qyLogin>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'
  import {postS,getS} from '@/service/public/service.js'
  import inForMation from "../../public/home/information.vue"
  import qyLogin from '../../public/home/qy-login.vue'
  import data from "../../public/user/login"
  export default {
    mixins:[data],
    data () {
      return {
        systemmessage:{
                width:' 18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#ff0000',
                position: 'absolute',
                left: '58px',
                top: '-9px',
                color:'#fff',
                lineHeight:' 18px',
                textAlign: 'center',
                display: 'block',
            },
        logiinTishi:{
             title:"来自乐游棋牌的消息",
             bgcolor:{
               background: 'linear-gradient(to right, #65e0f4, #4fade6)'
             }
        },
        time:"",
        colorbool:false,
        modal6: false,
        loading: true,
        headerColorBool:false,
        headerbgColor:"#697dac",
        headerbgColor:"#d0d9e5",
        showmodle:false,
        codeImg: '/static/632qp/img/new_games/lo.png',
        left: 5,
        top: -193,
        showReload: false,

      }
    },
    methods: {
      goHeader(typeNum){
        if(typeNum==0){
          // 线路检测
          // alert("暂未开放，敬请期待")
          return false;
        }else if(typeNum==1){
          // 借呗
           this.$store.commit('alert/newshowtip',{
               bool:true,
               title:'暂未开放，敬请期待',
               model:'',
               leftspan:true
            })
        }else if(typeNum==2){
          // 金管家
          window.open("/static/632qp/html/active/sxjgj/index.html","_blank");
        }
      },
            //获取时间
      ee(num) {
        if (num < 10) {
          num = "0" + num;
        }
        return num;
      },
      we(num){
        switch (num) {
          case 1: num = "一"; break;
          case 2: num = "二"; break;
          case 3: num = "三"; break;
          case 4: num = "四"; break;
          case 5: num = "五"; break;
          case 6: num = "六"; break;
          case 7: num = "七"; break;
        }
        return num;
      },
      getTimes() {
      var that = this;
      let timestam = new Date().getTime();
      let time = timestam;
      let T = '';
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
        Mh = "01";
      } else if (Mh < 10) {
        Mh = "0" + Mh;
      }
      let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
      this.time = str;
    },
      focusname(){
      },
      changcolor(){
        this.colorbool=!this.colorbool
         this.$store.commit('mainState/changcolor',this.colorbool)
      },

      cleanUp(){
            this.showmodle=true

      },
      asyncOK(){
           window.location.reload()
      },
      getBalance () {
        this.showReload = true
        getS(`member/balance`).then(res => {
            if (res.code == 200) {
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)
              // this.showReload = false
              this.$store.commit('alert/newshowtip',{
                bool:true,
                title:'刷新余额成功！',
                model:'',
                leftspan:false
              })
            }else{
              this.$store.commit('alert/newshowtip',{
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
        this.$store.commit('alert/newshowtip',{
               bool:true,
               title:'忘记帐号密码,请联系在线客服人员取回！',
               model:'',
               leftspan:false
            })
      },
    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      }
    },
    watch:{

    },
    mounted () {
      let time = setInterval( this.getTimes, 1000);
      if(localStorage.qyLogin){
           this.$refs.qylogin.qyLogin=true
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
        qyLogin,
        inForMation
    },
    store
  }
</script>

<style lang="less" scoped>
  .headerLinkBox{
    width:350px;
    display:inline-block;
    overflow:hidden;
    height:100%;
    li{
      float: left;
      margin:0 15px;
      position:relative;
      a{
            color: #697dac;
            font-size: 15px;
            margin-left: 30px;
      }
      img{
        position:absolute;
        top:50%;
        transform:translateY(-50%)
      }
    }
    li:nth-child(1){
        margin-left:0;
    }
  }




  .new-header {
    background: #fff;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    .header-top {
      height: 60px;
      background: #d0d9e5;
      line-height: 60px;
      .login {
        margin: 0 auto;
        width: 1200px;
        .sj{
          // width:100px;
          height:100%;
          // background-color: red;
          display:inline-block;
          font-size:15px;
          // margin-left:64px;
        }
        input{
          width: 150px;
          height: 34px;
          padding: 0 0 0 5px;
          background: #aab7ca;
          line-height: 34px;
          color:#fff;
          border: none;
          font-size: 14px;
          outline: none;
          text-indent: 4px;
          border-radius:5px;
        }
        input:focus{
           background: #fff;
           color: #697dac;
        }
        input::-webkit-input-placeholder{
          color: #fff;
        }

        input[type="button"] {
          width: 80px;
          height: 34px;
          line-height: 34px;
          border-radius:5px;
          color: #fff;
          cursor:pointer;
        }
        .login_after{
          width: 100px;
          float: left;
          height: 40px;
           li{
            height: 40px;
            line-height: 40px;
            margin-left:10px;

            a{
              color: #697dac;
              font-size:14px;
            }
           }

        }
        .headerColor{
          color:white!important;
          a{
            color:white!important;
          }
          li{
            a{
              color:white;
            }
          }
        }
        .login-before {
          float: right;
          // margin-right:12px;
          div {
            float: left;
            position: relative;
            margin: 0 6px 0;
            text-align: left;

            #loginBtn {
              background: #df3e7b; /* Safari 5.1 - 6.0 */
            }

            #resetBtn {
              background: #697dac;
            }
          }

          .code {
            input {
              width: 160px;
            }

            span {
              display: inline-block;
              cursor: pointer;
              width: 80px;
              height: 35px;
              position: absolute;
              right: 0;
              top: 13px;
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            }
          }

          .last_item {
            margin: 0 0 0 6px;

            a {
              line-height: 34px;
              color: #697dac;
              cursor: pointer;
              font-size: 14px;
            }
          }
        }

        .login-after {
          float: right;
          font-size: 13px;
          // margin-right: 6px;
          a {
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #697dac;
            min-width: 60px;
            display: inline-block;
          }
          .part3{
            a{
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #697dac;
              min-width: 60px;
              display: inline-block;
              label{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
            }
          }

          div {
            height: 60px;
            margin-right: 10px;
            float: left;
            line-height: 60px;
            color: #697dac;
            font-size: 15px;

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
              z-index: 9999666;
              height:68px;
              line-height: 68px;
              border-radius: 0 0 10px 10px;
              box-shadow: 3px 3px 6px rgba(0, 0, 0, .5);
              background-color: #fff;

              ul {
                li {
                  display: block;
                  width: 100%;
                  text-align: center;
                  height: 34px;
                  line-height: 34px;
                  cursor: pointer;
                }
                li:last-child:hover{
                      border-radius:0 0 10px 10px;
                }
                li:hover {
                    background: #d0d9e5;
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
             background: #697dac;
             border-radius: 5px;
             color:#fff;
            }
          }
        }
      }
    }
    .night{
       background: rgb(16, 17, 35)
    }
  }
 .model /deep/.ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -153px;
        margin-top: -73px;
  }
  .model /deep/.ivu-modal-close{
    display: none;
  }
  .model /deep/.ivu-btn-text{
    display: none
  }
  .model /deep/.ivu-modal-body p{
     font-size: 14px;
  }


  input:-webkit-autofill{
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent!important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s!important;
  }
</style>
