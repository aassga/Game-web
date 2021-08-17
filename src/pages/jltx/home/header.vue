<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top" :class="{night:colorbool}" >
    <!-- <div class="header-top" :class="{night:colorbool}" :style="{backgroundColor:headerbgColor}"> -->
      <!-- 登录 -->
      <div class="login">
        <div class="sj">
            <img src="/static/jltx/img/china.png" alt="" style="vertical-align: middle;margin-right:10px;">
            <span style="color:#A4A6AA;">中文</span>
            <a href="javascript:void(0)" style="color:#A4A6AA;margin-left:8px">GMT+8 &nbsp;<span id="EST_reciprocal">{{time}}</span></a>
        </div>
        <!-- 登录前 -->
        <div class="login-before" v-if="!$store.state.mainState.loginOrout" :class="{headerColor:headerColorBool}">
          <!-- 帐号 -->
          <div class="username">
            <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode" @focus="focusname" maxlength="20">
          </div>
          <!-- 密码 -->
          <div class="password">
            <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password" @keyup="clearNull" v-on:keyup.enter="login">
            <span class="ques" @click="$forget()">?</span>
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
          <div style="margin-right:0">
            <router-link tag="input" to="/home/register" type="button" style="padding:0;text-indent:0" value="免费开户" id="resetBtn"></router-link>
          </div>
          <!-- 试玩 -->
          <!-- <div>
            <input type="button" value="试玩" @click="tryPlay" style="background-color: #7fb1a7">
            <router-link tag="input" to="/home" type="button" value="试玩"  style="background-color: #7fb1a7;padding:0;text-indent:0" @click.native="tryPlay"></router-link>
          </div> -->
          <!-- 忘记密码 -->
          <!-- <div class="last_item" style="margin-right:0">
            <a class="forgetpwd" @click="$forget()" href="javascript:void(0)">帐号问题?</a>
          </div> -->
        </div>

        <!-- 登录后 -->
        <div class="login-after" v-if="$store.state.mainState.loginOrout">

          <!-- 欢迎 -->
          <div class="part1" :class="{headerColor:headerColorBool}">
            <!-- <span>欢迎您！</span> -->
            <!-- <i class="vip-sprite"
               :style="{backgroundImage: 'url(' + dengjiImg + ')', backgroundPosition:left+'px '+top+'px'}"></i> -->
            <span>会员帐号 ：</span>
            <span style="margin-left:-8px">{{userinfo.userName}}</span>
          </div>
          <!-- 余额 -->
          <div class="part2 " :class="{headerColor:headerColorBool}">
            &nbsp;
            <label>
              <label>帐号余额 ：</label>
            </label>
            <span :class="{'blink':blinkClass}" style="margin-left: -7px; margin-right: 12px;">{{userinfo&&userinfo.balance}}
              <span class="refresh_balance">
                  <!-- <a class="refresh" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'
                      :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                  </a> -->
              </span>
            </span>
          </div>
          <div class="part5" :class="{headerColor:headerColorBool}">
            <a href="javascript:void(0)" @click="getBalance">刷新</a>
            <a href="javascript:void(0)" style="color:#45DC1C" @click="$goUserCen('recharge',0)">线上存款</a>
            <a href="javascript:void(0)" @click="$goUserCen('withdraw',0)">线上取款</a>
            <a href="javascript:void(0)" @click="$goUserCen('discounts',0)">时时返水</a>
            <a href="javascript:void(0)" @click="$goUserCen('message',0)" class="unread_msg">
                站内信
                 <font><span style="color:#FF0000"><span style="color: #ADADAD;">(</span><span style="color:#FF0000">{{allUnReadCount}}</span><span style="color: #ADADAD;">)</span></span></font>
                <!-- <span  v-else style="color: #ADADAD;">(<span style="color:#FF0000">0</span>)</span> -->
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
  // import inForMation from "../../public/home/information.vue" 
  import qyLogin from '../../public/home/qy-login.vue'
  import data from "../../public/user/login"
  export default {
    mixins:[data],
    data () {
      return {
        blinkClass:false,
        allUnReadCount:0,
        isclick:false,
        showfresh: false,
        balanceRefreshing: false,
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
             title:"来自澳门新葡京的消息",
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
        codeImg: '/static/jltx/img/new_games/lo.png',
        left: 5,
        top: -193,
        showReload: false,
       
      }
    },
    methods: {
      goHeader(typeNum){
        if(typeNum==0){
          // 余额宝
          this.$store.state.alert.showJinggj = true;
        }else if(typeNum==1){
          // 借呗
          if(localStorage.token){
            if(this.$store.state.game.jieBeiData.show){
              this.$goUserCen('borrowMoney',0)
            }else{
              this.$goUserCen('recharge',0)
            }
          }else{
            this.$store.commit('alert/newshowtip', {
              bool: true,
              title: '请先登录',
              model: 'error',
              leftspan: true
            });
          }
        }else if(typeNum==2){
          // 金管家
          window.open("/static/jltx/html/active/sxjgj/index.html","_blank");
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
      // getTimes() {
      //   var that = this;
      //   let timestam = new Date().getTime();
      //   let time = timestam - 43200000;
      //   let dateObj = new Date(time),
      //       p0 = this.ee,
      //       Y = dateObj.getFullYear(),
      //       Mh = dateObj.getMonth() + 1,
      //       D = p0(dateObj.getDate()),
      //       X = this.we(dateObj.getDay()),
      //       H = p0(dateObj.getHours()),
      //       M = p0(dateObj.getMinutes()),
      //       S = p0(dateObj.getSeconds());

      //   if (Mh > 12) {
      //       Mh = "01";
      //   } else if (Mh < 10) {
      //       Mh = "0" + Mh;
      //   }
      //   let str = `${Y}/${Mh}/${D} ${H}:${M}:${S}`;
      //   this.time = str ;
      // },
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
        // if(H>=12){
        //   T = 'PM'
        //   H = H-12
        // }else{
        //   T = 'AM'
        // }

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
      // logout () {
      //   UserService.logout.call(this)
      // },
      newshowfresh() {
          if (this.balanceRefreshing) this.showfresh = false;
          else this.showfresh = true;
      },
      getBalance () {
        this.showReload = true;
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
            if (res.code == 200) {
              this.blinkClass = true;
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)

              setTimeout(() => {
                this.blinkClass = false;
              }, 1000);
              // this.showReload = false
              // this.$store.commit('alert/newshowtip',{
              //   bool:true,
              //   title:'刷新余额成功！',
              //   model:'',
              //   leftspan:false
              // })
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
      async tryPlay () {
        // let res = await this.$http.post('/api/test/registerTest', {})
        let res = await this.$http.get("/frontend/test/demo", { headers: { 'Accept': 'application/x.tg.v2+json' },params:{}});
        if (res && res.code == 200) {
          UserService.setCache(res, 'test')

          this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
            let platform = res.data.platform
            let alias = res.data.alias
            let keys = Object.keys(platform)
            let refund = []
            keys.forEach((v, i) => {
              refund[i] = {}
              refund[i].title = v
              refund[i].list = []
              platform[v].forEach((a, j) => {
                refund[i].list[j] = {}
                refund[i].list[j].key = Object.keys(a)[0]
                refund[i].list[j].refund = Object.values(a)[0]
                refund[i].list[j].name = alias[refund[i].list[j].key]
              })
            })

            // this.refundData = refund;
            localStorage.setItem('refund', JSON.stringify(refund))
          })
          setTimeout(() => {
            window.location.reload()
          }, 500)
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
      // is_code_show(){
      //    getS(`is-show-captcha-with-type`, { device: 'pc' }).then(res => {
      //   if (res && res.code === 200) {
      //     this.code_show = res.data.isShowCaptcha;
      //   }
      // });
    // }
    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      },
      showMessage(){
        return this.$store.state.mainState.showMessage;
      }
    },
    watch:{
      'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        },
    },
    mounted () {
      // 夜间模式
      // let date = new Date()
      // let newHour = date.getHours()
      // if(newHour>=18 || newHour<=5){
      //   this.changcolor()
        // }
      //获取时间
      let time = setInterval( this.getTimes, 1000);
      if(localStorage.qyLogin){
           this.$refs.qylogin.qyLogin=true
      }
      
    },
    created () {
      // this.is_code_show();
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
    },
    store
  }
</script>

<style lang="less" scoped>
/* 定义keyframe动画，命名为blink */
@keyframes blink{
  0%{opacity: 1;}
  // 20%{opacity: 0.7;}
  // 40%{opacity: 0.5;}
  // 60%{opacity: 0.2;}
  100%{opacity: 0;} 
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0%{opacity: 1;}
  // 20%{opacity: 0.7;}
  // 40%{opacity: 0.5;}
  // 60%{opacity: 0.2;}
  100%{opacity: 0;} 
}
@-moz-keyframes blink {
    0%{opacity: 1;}
  // 20%{opacity: 0.7;}
  // 40%{opacity: 0.5;}
  // 60%{opacity: 0.2;}
  100%{opacity: 0;} 
}
@-ms-keyframes blink {
    0%{opacity: 1;}
  // 20%{opacity: 0.7;}
  // 40%{opacity: 0.5;}
  // 60%{opacity: 0.2;}
  100%{opacity: 0;} 
}
@-o-keyframes blink {
   0%{opacity: 1;}
  // 20%{opacity: 0.7;}
  // 40%{opacity: 0.5;}
  // 60%{opacity: 0.2;}
  100%{opacity: 0;} 
}
/* 定义blink类*/
.blink{
    color: #dd4814;
    animation: blink 1s linear infinite;  
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
  .red-font{
    color:#FF0000;
  }
  .headerLinkBox{
    width:350px;
    display:inline-block;
    overflow:hidden;
    height:100%;
    li{
      float: left;
      // width:60px;
      margin:0 15px;
      position:relative;
      a{
            color: #697dac;
            font-size: 14px;
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
    background: #1E1E1E;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    .header-top {
      height: 50px;
      background: #1E1E1E;
      line-height: 50px;
      .login {
        margin: 0 auto;
        width: 1200px;
        .sj{
          // width:100px;
          height:100%;
          // background-color: red;
          display:inline-block;
          font-size:14px;
          color: #A4A6AA;
          cursor: pointer;
          // margin-left:64px;
          .somePart{
            display: inline-block;
            width: 60px;
            text-align: center;
            border-right: 1px solid #54585E;
            height: 16px;
            line-height: 16px;
          }
          .somePart.jing{
            color: #2DE4FF;
          }
          .somePart.yue{
            color: #4CD920;
            padding-right: 5px;
          }
          .somePart.jie{
            color: #FA48FC;
            width: 70px;
            border: none;
          }
        }
        input{
          width: 150px;
          height: 34px;
          padding: 0 0 0 5px;
          background: #1E1E1E;
          line-height: 34px;
          color:#bdbdbd;
          border: none;
          font-size: 14px;
          outline: none;
          text-indent: 4px;
          border-radius:5px;
          border: 1px solid #575757;
        }
        // input:focus{
        //    background: #fff;
        //    color: #697dac;
        // }
        input::-webkit-input-placeholder{
          color: #bdbdbd;
        }

        input[type="button"] {
          width: 80px;
          height: 34px;
          line-height: 34px;
          border-radius:5px;
          color: #fff;
          cursor:pointer;
          border: none;
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
              background: linear-gradient(0deg,#d5a655, #faf486); 
              color: #000;/* Safari 5.1 - 6.0 */
            }
            .ques{
              width: 20px;
              height: 20px;
              display: inline-block;
              background: #82868d;
              color: #fff;
              text-align: center;
              line-height: 20px;
              border-radius: 50%;
              font-size: 14px;
              position: absolute;
              top: 15px;
              right: 8px;
              cursor: pointer;
            }
            #resetBtn {
                background: linear-gradient(180deg, #A60808, #DC1919);  
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
              height: 34px;
              position: absolute;
              right: 0;
              top: 8px;
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            }
          }

          .last_item {
            margin: 0 0 0 6px;
            a {
              line-height: 34px;
              width:45px;
              height:34px;
              background:rgba(255,201,86,1);
              border-radius:2px;
              cursor: pointer;
              font-size: 15px;
              color: #280B08;
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
            width: 60px;
            display: inline-block;
          }
          .part2{
            margin: 0;
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
          .unread_msg {
            font-size: 14px;
            margin: 0 8px;
            width: 60px;
            #user_num{
              display: inline-block;
                background: red;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 50%;
                position: relative;
                top: -10px;
                left: -6px;
                font-size: 12px;
                color: #fff;
                top: -27px;
                left: 30px;
            }
          }
          .refresh_balance {
            .refresh {
                display: inline-block;
                width: 22px;
                height: 20px;
                margin-top: -2px;
                background: url('/static/jltx/img/refresh.png') center center no-repeat;
            }
            .newfresh {
                background: url('/static/jltx/img/newfresh.png') no-repeat center;
            }
            .fres {
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
          div {
            height: 50px;
            margin-right: 10px;
            float: left;
            line-height: 50px;
            color: #ADADAD;
            font-size: 14px;
            span{
              &:last-child{
                color: #FFC956;
              }
            }
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
            a{
              display: inline-block;
              width: 70px;
              height: 16px;
              line-height: 16px;
              padding-right:5px;
              color: #ADADAD;
              border-right: 1px solid #54585E;
              margin-top: -2px;
              &:first-child{
                width: 38px;
              }
              &:last-child{
                border: none;
                width: 85px;
                margin: -2px 20px 0 4px;
              }
            }
          }
          .last_item {
            a {
             line-height: 30px;
              width:90px;
              height:30px;
              background:url('/static/jltx/img/home/button.png')no-repeat;
              border-radius:2px;
              cursor: pointer;
              font-size: 16px;
              color: #280B08;
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
