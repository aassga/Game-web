<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top" :class="{night:colorbool}" >
    <!-- <div class="header-top" :class="{night:colorbool}" :style="{backgroundColor:headerbgColor}"> -->
      <!-- 登录 -->
      <div class="login">
        <div class="sjContainer">
          <div class="sj">
            <div>
              <span style="color:#A4A6AA;">美东时间</span>
              <a href="javascript:void(0)" style="color:#A4A6AA;margin-left:8px">GMT+8 &nbsp;<span id="EST_reciprocal">{{time}}</span></a>
            </div>
            <div>
              <span class="somePart" @click="goHeader(1)">免息借呗</span>
              <span class="somePart" @click="goHeader(2)">金管家</span>
              <span class="somePart" @click="goHeader(4)">线路检测</span>
              <span class="somePart" @click="goHeader(3)">下载APP</span>
              <span class="somePart" @click="goHeader(0)">投诉建议</span>
              <span class="somePart">
                <img src="/static/99qp/img/c1.png" alt="" style="vertical-align: middle;">'
                <img src="/static/99qp/img/c2.png" alt="" style="vertical-align: middle;">'
              </span>

            </div>
          </div>
        </div>

        <!-- 登录前 -->
        <div class="login-before">
          <div class="logoImg">
            <img src="/static/99qp/img/logo3.png" >
          </div>
          <div class="loginForm">
            <div class="nav">
              <ul>
                <li v-for="(item,index) in classifyList" :key="index"  @click="$goPath('one',item)">
                  <span>{{item.name}}</span>
                   <p v-if="item.hot" :style="item.pStyle">
                          <img :src="item.pImg" alt="">
                    </p>
                </li>
              </ul>
            </div>
            <div class="form">
              <div class="yuming" v-if="!code_show"><img src="/static/99qp/img/yum.png" width="185px" alt=""></div>
              <div class="florList" v-if="loggedIn == false">
                <!-- 帐号 -->
                <div class="username">
                  <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode" maxlength="20">
                </div>
                <!-- 密码 -->
                <div class="password">
                  <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password" v-on:keyup.enter="login">
                  <!-- <span class="ques" @click="$forget()">?</span> -->
                </div>
                <!-- 验证码 -->
                <div class="code" v-if="code_show">
                  <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                  <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                </div>
                <!-- 登录 -->
                <div>
                  <input type="button" value="会员登录" id="loginBtn" style="padding:0;text-indent:0" @click="login">
                </div>
                <!-- 开户 -->
                <div style="margin-right:0">
                  <router-link tag="input" to="/home/register" type="button" style="padding:0;text-indent:0" value="立即注册" id="resetBtn"></router-link>
                </div>
                <div class="last_item" style="margin-right:0">
                  <a class="forgetpwd" @click="$forget()" href="javascript:void(0)">忘记密码?</a>
                </div>
                <div @click="getUrl">
                  <span><img src="/static/99qp/img/icon_ser.png" alt=""></span>
                  <span>在线客服</span>
                </div>
              </div>
              <div class="loginAfter" v-if="loggedIn == true">
                <div><span>会员账号：</span><span style="color:#F20017">{{userinfo ? userinfo.userName : ''}}</span></div>
                <div><span>帐号余额： </span><span style="color:#F20017">{{userinfo ? userinfo.balance : ''}}</span>
                  <!-- <span class="refresh_balance">
                      <a class="refresh" @click="getBalance" @mouseover='newshowfresh' @mouseout='showfresh=false'
                          :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']">
                      </a>
                  </span> -->
                </div>
                <div><span @click="$bindPhoneOrbank()" style="padding-right:5px;border-right:1px solid #E5E5E5">充值大厅</span></div>
                <div><span @click="$goUserCen('discounts',0)" style="padding-right:5px;border-right:1px solid #E5E5E5">时时返水</span></div>
                <div @click="$goUserCen('message',0)"><span>站内信</span> &nbsp;(<span style="color:#F20017;">{{allUnReadCount}}</span>)</div>
                <div class="loginOut"><a href="javascript:void(0)" @click="logout">登出</a></div>
                <div @click="getUrl">
                  <span><img src="/static/99qp/img/icon_ser.png" alt=""></span>
                  <span @click="getUrl">在线客服</span>
                </div>
              </div>
            </div>

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
       <new-modal :newmodal="newmodal"></new-modal>
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
  // import data1 from '../../public/user/login';
   import newModal from "../../public/home/newmodal.vue";
  export default {
    mixins:[data],

    data () {
      return {
        newmodal: {
          title: "来自澳门威尼斯人的消息",
          bgcolor: {
            background: "linear-gradient(90deg,#65e0f4,#4fade6)"
          }
        },
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
        classifyList: [
          {
              name: "首页",
              text: "HOME",
              platform: "home",
              link: "/home",
              pStyle: '',
              pImg: '',
              hot: false,
          },
          {
              name: "棋牌游戏",
              text: "CHESS",
              platform: "KY_CHESS",
              // link: "/home/qipai?id=10042&name=开元棋牌",
              link: "/home/chess?navid=9&id=0",
              pStyle: 'position: absolute;top: -15px;left: 193px;',
              gameName: "0",
              list: [],
              type:'chess',
              pImg: '/static/99qp/img//hot11.gif',
              hot: true,
          },
          {
              name: "电子游艺",
              text: "GAME",
              platform: "AG_GAME",
              link: "/home/slot?navid=9&id=0",
              type:'live',
              pStyle: '',
              pImg: '',
              hot: false,
          },
          {
              name: "捕鱼游戏",
              text: "FISHING",
              link: "/home/fish?navid=9&id=0",
              type:'fish',
              pStyle: '',
               pImg: '',
               hot: false,
          },
          {
              name: "视讯直播",
              text: "CASINO",
              link: "/home/live",
              platform: "live_casino",
              type:'live',
              pStyle: '',
              pImg: '',
              hot: false,
          },
          {
              name: "体育赛事",
              text: "SPORTS",
              platform: "sport",
              link: "/home/tiyu?id=0",
              list: [],
              pStyle: '',
               pImg: '',
               hot: false,
          },
          {
              name: "彩票游戏",
              text: "LOTTERY",
              platform: "CT_LOTTERY",
              type:"lottery",
              link: "/plays/hall",
              gameName: "0",
              pStyle: '',
               pImg: '',
               hot: false,
          },

          // {
          //     name: "logo",
          //     logoUrl:'/static/99qp/img/logo_4.png',
          //     type:"logo",
          // },


          {
              name: "手机APP",
              text: "PHONE",
              type:"load",
              pStyle: '',
              pImg: '',
              hot: true,
          },
          {
              name: "优惠活动",
              text: "ACTIVETY",
              link: "/home/youhui",
               pStyle: 'position: absolute;top: -15px;left: -19px;',
               pImg: '/static/99qp/img//hot11.gif',
               hot: true,
          }
      ],
        time:"",
        colorbool:false,
        modal6: false,
        loading: true,
        loggedIn:false,
        headerColorBool:false,
        headerbgColor:"#697dac",
        headerbgColor:"#d0d9e5",
        showmodle:false,
        codeImg: '/static/99qp/img/lo.png',
        left: 5,
        top: -193,
        showReload: false,

      }
    },
    methods: {
      goHeader(typeNum){
        if(typeNum==0){
          // 余额宝
          // this.$store.state.alert.showJinggj = true;
          if(localStorage.token){
             this.$goUserCen('message',1)
          }else{
              this.$store.commit('alert/newshowtip', {
              bool: true,
              title: '请先登录',
              model: 'error',
              leftspan: true
            });
          }
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
          window.open("/static/public/active/jgj/index_white.html","_blank");
        }else if(typeNum==3){
          window.open('/static/99qp/html/download/index.html')
        } else if (typeNum === 4) {
          // 线路检测
          window.open('http://8846.com/', '_blank');
        }
      },
      getUrl(){
        let service = JSON.parse(localStorage.config).service;
        if (service) {
          let ser = service.find(item => item.status === 'on')
          if (ser) {
            this.url = ser.url;
            window.open(this.url)
          }
        }
      },
      async getGameDatas() {
        await this.$gameSortV4();
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
      changcolor(){
        this.colorbool=!this.colorbool
        console.log(this.colorbool)
         this.$store.commit('mainState/changcolor',this.colorbool)
      },

      cleanUp(){
            this.showmodle=true

      },
      asyncOK(){
           window.location.reload()
      },
      logout () {
        UserService.logout.call(this)
      },
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
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)
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
      //是否已登录
      isLogged() {
          if (this.userinfo) {
              this.loggedIn = true;
          } else {
              this.loggedIn = false;
          }
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
      userinfo(val){
        if (val) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
      },
      'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        },
    },
    mounted () {
      this.isLogged();
      this.getGameDatas();
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
        newModal
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
    background: #fff;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    .header-top {
      height: 150px;
      background: #fff;
      line-height: 50px;
      .login {
        margin: 0 auto;
        width: 100%;
        .sjContainer{
          width: 100%;
          border-bottom: 1px solid #EAEAEA;
          .sj{
            width:1200px;
            height:100%;
            display:flex;
            font-size:14px;
            color: #A4A6AA;
            cursor: pointer;
            margin: 0 auto;
            div{
              width: 86%;
              line-height: 30px;
              &:last-child{
                width: 41%;
              }
            }
            .somePart{
              color: #5A5A5A;
              display: inline-block;
              width: 60px;
              text-align: center;
              border-left: 1px solid #EAEAEA;
              height: 16px;
              line-height: 16px;
            }

          }
        }

        input{
          width: 123px;
          height: 34px;
          padding: 0 0 0 5px;
          background: transparent;
          line-height: 34px;
          color:#000;
          border: 1px solid #CCCCCC;
          font-size: 14px;
          outline: none;
          text-indent: 4px;
          border-radius:5px;
        }
        input:focus{
           color: #697dac;
        }
        input::-webkit-input-placeholder{
          color: #A0A0A0;
        }

        input[type="button"] {
          width: 90px;
          height: 30px;
          line-height: 30px;
          color: #2C1900;
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
          display: flex;
          width: 1200px;
          margin: 0 auto;
            .logoImg{
              height: 104px;
              width: 320px;
              position: relative;
              top: 5px;
              left: 0;
            }
            .loginForm {
              z-index:1000;
              // width: 1012px;
              .nav{
                height: 52px;
                margin-top: 7px;
                margin-left: 10px;
                border-bottom: 1px solid #E5E5E5;
                ul{
                  display: flex;
                  float: right;
                  height: 52px;
                  position: relative;
                  li{
                    color: #595959;
                    font-size: 16px;
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    position: relative;
                    span{
                      width: 100px;
                      height: 17px;
                      line-height: 17px;
                      display: inline-block;
                      text-align: center;
                      border-left: 1px solid #E5E5E5;

                    }
                    &:first-child{
                      span{
                        border: none;
                      }

                    }
                    &:hover{
                      color: #4C62D6;
                      border-bottom: 2px solid #5973F6;
                    }
                  }
                }

              }
              .form{
                display: flex;
                position: relative;
                // margin: 0 6px 0;
                text-align: left;
                float: right;
                .yuming{
                  width: 190px;
                  line-height: 60px;
                }
                .florList{
                  display: flex;
                  div{
                    margin-left: 3px;
                    &:last-child{
                      span{
                        font-size: 20px;
                        color: #4B62D6;
                        cursor: pointer;
                        img{
                          width: 30px;
                          position: relative;
                          top: 4px;
                        }
                      }
                    }
                  }
                  .code {
                    input{
                      width:136px;
                    }
                    span {
                      display: inline-block;
                      cursor: pointer;
                      width: 80px;
                      height: 34px;
                      position: absolute;
                      right: 378px;
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
                      border-radius:2px;
                      cursor: pointer;
                      font-size: 15px;
                      color: #A0A0A0;
                    }
                  }
                  #loginBtn {

                    background: linear-gradient(-70deg, #C7C7C7, #EFEFEF);
                    border-radius: 3px 4px 4px 3px;
                  }
                  #resetBtn {
                    background: linear-gradient(-70deg, #FFDA5B, #FFE07D);
                    border-radius: 3px 4px 4px 3px;
                  }
                }
                .loginAfter{
                  display: flex;
                  margin-left: -20px;
                  div{
                    margin-left: 5px;
                    line-height: 54px;
                    .refresh_balance {
                      display: inline-block;
                      .refresh {
                          display: inline-block;
                          width: 22px;
                          height: 20px;
                          background: url('/static/99qp/img/refresh.png') center center no-repeat;
                          position: relative;
                          top: 5px;
                      }
                      .newfresh {
                          background: url('/static/99qp/img/refresh.png') no-repeat center;
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
                    span{
                      color:#4D4D4D;
                      font-size: 15px;
                      cursor: pointer;
                      img{
                        width: 30px;
                        position: relative;
                        top:5px;
                      }
                    }
                  }
                  .loginOut{
                    a{
                      display: inline-block;
                      width: 53px;
                      height: 30px;
                      background: linear-gradient(-70deg, #FFD95B, #FFDF7C);
                      border-radius: 3px;
                      line-height: 30px;
                      text-align: center;
                      font-size: 14px;
                      color: #2B1800;
                    }
                  }
                }
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
