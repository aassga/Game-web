<template>
  <div class="header_box" style="border-bottom: 1px solid #49b995!important;">
    <div class="header_box_inner">
      <div id="page-header" style="position:relative;">
      <div class="header-top-wrap clearfix">
       
        <div class="header-top-right">
          <div class="login-wrap" v-if="!$store.state.mainState.loginOrout">
            <div name="LoginForm" id="LoginForm" class="loginBox clearfix">
              <p class="login-btn-wrap clearfix">
                <input
                  name="Submit"
                  type="submit"
                  value="登入"
                  class="login-submit"
                  tabindex="4"
                  @click="login"
                >
                <a href="javascript:void(0);" @click="register" class="join-btn" tabindex="5">立即注册</a>
              </p>
              <p class="login-unit login-unit-chk" v-if="code_show">
                <input
                  maxlength="4"
                  type="text"
                  class="login-input"
                  placeholder="验证码"
                  v-model="passKey.code"
                  v-on:keyup.enter="login"
                  autocomplete="off"
                  tabindex="3"
                >
                <span
                  :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}"
                  id="vPic"
                  @click="getCode"
                ></span>
              </p>
              <p class="login-unit login-unit-pwd">
                <input
                  maxlength="20"
                  type="password"
                  class="login-input"
                  placeholder="密码"
                  v-model="passKey.password"
                  @keyup="clearNull"
                  v-on:keyup.enter="login"
                  autocomplete="off"
                  tabindex="2"
                >
              </p>
              <p class="login-unit login-unit-user">
                <input
                  type="text"
                  placeholder="帐号"
                  class="login-input login-acc"
                  id="userName"
                  v-model="passKey.userName"
                  autocomplete="off"
                  @blur="getCode"
                  tabindex="1"
                >
              </p>
            </div>
          </div>
          <div class="login-after" v-if="$store.state.mainState.loginOrout">
            <div class="mem-info">
              <div class="ele-accinfo ele-acc-name">
                <span>帐号:</span>
                <span>{{userinfo.userName}}</span>
              </div>
              <div class="ele-acc-unit">
                <div id="_bbsportBalance" class="ele-accinfo ele-first-balance">
                  <span>余额:</span>
                  <span id="user_money">{{userinfo&&userinfo.balance}}</span>&nbsp;
                  <a
                    href="javascript:void(0)"
                    class="refresh"
                    @click="getBalance"
                    @mouseover='newshowfresh' @mouseout='showfresh=false' :class="[balanceRefreshing ?'fres':'',isclick ? 'newfresh':'']"
                  >
                  </a>
                </div>
              </div>
            </div>
            <div class="SU-Menual clearfix">
              <ul class="login-Menual clearfix">
                <li>
                  <a
                    id="su-deposite"
                    class="nLink"
                    href="javascript:void(0);"
                    @click="$goUserCen('recharge',0)"
                    title="线上存款"
                  >线上存款</a>
                </li>
                <li>
                  <a
                    id="su-withdraw"
                    class="nLink"
                    href="javascript:void(0);"
                    @click="$goUserCen('withdraw',0)"
                    title="线上取款"
                  >线上取款</a>
                </li>
                <li>
                  <a
                    id="su-msg"
                    class="nLink"
                    href="javascript:void(0);"
                    @click="$goUserCen('message',0)"
                    title="未读讯息"
                  >
                    未读讯息<strong v-if="allUnReadCount !=0" id="user_num">{{allUnReadCount}}</strong>
                  </a>
               
                </li>
                <li class="logoutbox">
                  <a
                    id="su-logout"
                    class="nLink"
                    href="javascript:void(0);"
                    @click="logout"
                    title="登出"
                  >登出</a>
                </li>
              </ul>
            </div>
          </div>
       
        </div>
        <div class="header-top-left-time">
           中文 GMT+8 {{time}}
        </div>
      </div>
    </div>
    </div>
    <div class="header_box_middle">

           <!-- LOGO -->
        <div class="header-logo">
          <div id="ele-logo-wrap" @click="$goPath('rot','/home')">
            <a href="javascript:;" id="ele-logo-img" title="首页"></a>
          </div>
        </div>

           <!-- 主選單 -->
          <div class="mainnav-wrap clear" :class="{'mainnav-login':userinfo}">
            <div class="mainnav" data-lsub-y="4">
              <ul class="clearfix mainBox">
                <li
                  class="LS-first"
                  v-for="(navItem,navIndex) in navList"
                  :key="navIndex"
                  
                 @click="$goPath('one',navItem)"
                >
                  <a class="nav_item_tow current" :class="{'navChecked':navIndex==navChecked}" href="javascript:void(0);">
                    <span>{{navItem.name}}</span>
                    <span>{{navItem.text}}</span>
                  </a>
                  <div class="girl dropdown">
                    <ul>
                      <li v-for="(childItem,childIndex) in navItem.list" :key="childIndex" @click.stop="$goPath('nav',childItem)">
                        <a href="javascript:void(0)">
                          <span>{{childItem.name}}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
    </div>

    <div class="header_box_bottom header-bottom-wrap clearfix">
        <div class="news-wrap clearfix" @click="showTextModal()">
          <div class="news-title">公告:</div>
          <div class="news-item ele-msg-cp">
            <div
              class="ele-news-txt"
              style="display: inline-block; height: 16px; overflow: hidden; word-break: break-all; overflow-wrap: break-word; width: 700px;"
            >
              <marquee
                v-if="lantern"
                align="middle"
                direction="left"
                loop="-1"
                scrollamount="3"
                onmouseout="this.start()"
                onmouseover="this.stop()"
                style="color:white; font-size:12px; line-height: 16px;overflow: hidden;height: 16px;"
              >
                <span v-html="lantern"></span>
              </marquee>
            </div>
          </div>
        </div>
    
        <div class="top-link-wrap">
          &nbsp;|&nbsp;<a
            href="https://xianludh.github.io/xianluu/bet365/index.html"
            target="_blank"
            class="js-article-color top-custom-link linebg"
          >线路检测</a> &nbsp;|&nbsp;
          <a
            href="javascript:;"
            style="color:#7FBFAB"
            class="js-article-color top-custom-link downloadBg"
            @click="goDownloadPage"
          >APP下载</a>
        </div>
    </div>
    <new-modal :newmodal="newmodal"></new-modal>
    <qyLogin :logiinTishi="newmodal" ref="qylogin"></qyLogin>
  </div>
</template>

<script>
import $ from "jquery";
import newModal from '../../public/home/newmodal.vue'
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import qyLogin from '../../public/home/qy-login.vue'
import data from "../../public/user/login";
import {postS,getS,_SetGet, _SetPost} from '@/service/public/service.js'
import freshButton from "../../public/home/freshButton";

export default {
  mixins: [data],
  data() {
    return {
      isclick:false,
      balanceRefreshing:false,
      showfresh:false,
      allUnReadCount:10,
       codeImg:"/static/blr/img/new_games/log.png",
       newmodal:{
          title:"来自bet365的消息",
          bgcolor:{
               background: 'linear-gradient(180deg, #25c199, #008260)'
          }
        },
      lantern: "",
      time:'',
      showReload: false,
      navList: [
        {
          name: "首页",
          text: "HOME",
          platform: "home",
          selectNum: 0,
          link: "/home",
          className: "LS-home"
        },
         {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          selectNum: 1,
          className: "LS-ball",
          hotShow: true,
          link: '/home/tiyu?id=0',
          list: []
        },
         {
          name: "真人视讯",
          text: "CASINO",
          selectNum: 2,
          link: "/home/live",
          platform: "live_casino",
          className: "LS-live",
          hotShow: true
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          platform: "KY_CHESS",
          selectNum: 5,
          className: "LS-chess",
          link: '/home/chess?navid=9&id=0',
          type:'chess',
        },
        {
            name: "捕鱼达人",
            text: "FISHING",
            selectNum: 6,
            link: '/home/fish?navid=9&id=0',
            className: "LS-game",
            type:'fish',
        },
        {
          name: "电子游戏",
          text: "GAME",
          platform: "AG_GAME",
          selectNum: 3,
          link: '/home/slot?navid=9&id=0',
          className: "LS-lines",
          hotShow: true,
          type:'slot',
        },
       {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          selectNum: 4,
          routePath: "/plays/hall",
          link: "/plays/hall",
          gameName: "0",
          className: "LS-lottery",
          type:'lottery',
        },
        {
          name: "优惠活动",
          text: "ACTIVETY",
          selectNum: 7,
          link: "/home/youhui",
          className: "LS-youhui",
          hotShow: true
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service",
          type:"service"
        }
      ],
      navChecked: 0,
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
    newshowfresh(){
        if(this.balanceRefreshing) this.showfresh=false
            else this.showfresh=true
    },
    async getGameDatas() {
      await this.$gameSortV4(this.getNativeDatas);
    },
    getNativeDatas() {
      if (localStorage.gameSortV4_chess){
        this.navList[3].list = this.$gameClassV4("chess");
      }
      if (localStorage.gameSortV4_sport){
          this.navList[1].list = this.$gameClassV4("sport");
      }
    },
    async getLantern () {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: 'lantern',
        client_type:"PC"
      })
      if (res && res.code == 200) {
        if(res.data.data.length){
          this.lantern = res.data.data[0] && res.data.data[0].description
        }else{  
          return false;
        }

      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
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
    goDownloadPage(){
      window.open('/static/blr/html/download/index.html','_blank')
    },
    register() {
       this.$store.commit('cjw/showRegister', true)
      // this.$router.push({path:"/register"});
    
    },
    // 获取公告列表接口，并缓存
    async getLanternList() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
        limit:1000,
        page:1
      });
      if (res && res.code == 200) {
          this.lanternData = res.data;
          if(res.data.total>0){
            sessionStorage.setItem('lanterndata', JSON.stringify( this.lanternData));
          }
      }else{
        return false
      }
    },
    //点击展示公告列表
    showTextModal(){
      if(this.lanternData.total>0){
        this.$store.commit('alert/showTextTip', true)
      }else{
        return false
      }  
    },
    
  },
  mounted() {
    this.getLantern();
    this.getLanternList();
    let time = setInterval( this.getTimes, 1000);
    if(localStorage.qyLogin){
           this.$refs.qylogin.qyLogin=true
      }
    setInterval(() => {
      $(".top-link-wrap .txt1").css("color", "rgb(255,240,0)");
      $(".top-link-wrap .txt2").css("color", "rgb(255,0,0)");
    }, 250);
    setInterval(() => {
      $(".top-link-wrap .txt1").css("color", "rgb(255,0 ,0)");
      $(".top-link-wrap .txt2").css("color", "rgb(255,240,0)");
    }, 450);
  },
  computed: {
    userinfo () {
        return this.$store.state.mainState.userinfo
    },
    showMessage(){
        return this.$store.state.mainState.showMessage;
    }
  },
  created(){
    this.getGameDatas();
    this.navChecked = this.$store.state.bet.navActive;    

  },
  watch: {
      'showMessage': {
          handler: function(newval, oldVal) {
                this.allUnReadCount=this.showMessage.allUnReadCount
          },
          deep: true
      }
  },
   components:{
        newModal,
        qyLogin,
        freshButton
    },
  store
};
</script>

<style lang="less" scoped>
.fres{
      -webkit-animation: spin 1s linear;
      animation: spin 1s linear;
}
@-webkit-keyframes spin {
      from {
          -webkit-transform: rotate(0deg) ;
        }
      to {
          -webkit-transform: rotate(360deg) ;
      }
  }

@keyframes spin {
    from {
        transform: rotate(0deg) ;
    }
    to {
        transform: rotate(360deg) ;
    }
}
.header-box{
  border-bottom: 1px solid #49b995!important;
}
.header_box_inner{
    background:#00644a;
    #page-header {
  width: 1000px;
  margin: 0 auto;
  .header-top-wrap {
    height: 50px;
    width:100%;
    
    .header-top-right {
      float: right;
      width: 730px;
      .login-wrap {
        float: right;
        padding-top: 8px;
        .loginBox {
          overflow: hidden;
          .login-input {
            width: 110px;
            border: none;
            color: #6cd8bc !important;
            background-color: transparent !important;
            outline: none;
            line-height: 23px;
            height:23px;
            font-size: 14px;
          }
          .login-input::-moz-placeholder {
            color: #6cd8bc;
          }
          .login-input:-ms-input-placeholder {
            color: #6cd8bc;
          }
          .login-input::-webkit-input-placeholder {
            color: #6cd8bc;
          }
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #116b4f inset;
          }
          .login-btn-wrap {
            float: right;
            margin-left:8px;
            .login-submit {
              float: left;
              width: 76px;
              height: 34px;
              line-height: 32px;
              background:rgba(255,230,24,1);
              border: 0;
              cursor: pointer;
              border-radius: 4px;
              font-size: 14px;
              color:rgba(0,100,74,1);
              font-family: 'MicrosoftYaHei';
              font-weight:400;
            }
            a {
              float: left;
              line-height: 26px;
              text-decoration: none;
            }
            .join-btn {
              float: left;
              width: 76px;
              height: 34px;
              line-height: 32px;
              background-color: #6cd8bc;
              border: 1px solid #6cd8bc;
              cursor: pointer;
              border-radius: 5px;
              font-size: 14px;
              color: #00503b;
              font-family: '微软雅黑';
              margin-left: 10px;
              text-align: center;
            }
            
          }
          .login-unit {
              float: right;
              position: relative;
              width: 120px;
              height: 34px;
              line-height: 32px;
              margin-left: 8px;
              padding-left: 4px;
              background-color: #00503b;
              border-radius: 5px;
          }
          .login-unit-chk {
            width: 90px;
            margin-right:70px;
            .login-placeholder {
              position: absolute;
              left: 6px;
              top: 1px;
              cursor: text;
              color: #b7fbe5;
              font-family: arial;
              transition: 2s all;
            }
            .login-input {
              width: 92px;
            }
            #vPic {
              position: absolute;
              right: -66px;
              top: 0;
              cursor: pointer;
              display: inline-block;
              width: 58px;
              height: 32px;
              border-radius: 3px;
            }
          }
          .login-unit-user {
            .login-placeholder {
              position: absolute;
              left: 6px;
              top: 1px;
              cursor: text;
              color: #b7fbe5;
              font-family: arial;
            }
          }
          .login-unit-pwd {
            .login-placeholder {
              position: absolute;
              left: 6px;
              top: 1px;
              cursor: text;
              color: #b7fbe5;
              font-family: arial;
            }
          }
        }
        .loginBox:before {
          content: "";
          display: table;
        }
        .loginBox:after {
          clear: both;
          content: "";
          display: table;
        }
      }
      .login-after {
     
        color: #fff;
        text-align: right;
        float: right;
        
        .mem-info {
          float:left;
          font-size:16px;
          margin-top:10px;
          .ele-accinfo {
            display: inline-block;
            padding-right: 5px;
            span {
              line-height: 26px;
              color: #fff;
              text-align: right;
            }
            strong {
              color: #fff;
              font-weight: bold;
            }
          }
          .ele-acc-unit {
            display: inline-block;
            #_bbsportBalance {
              display: inline-block;
              padding-right: 5px;
              span {
                line-height: 30px;
                color: #fff;
                text-align: right;
              }
              strong {
                color: #fff;
                font-weight: bold;
              }
              .refresh{
                 display: inline-block; 
                 width: 15px; 
                 height: 15px;
                 background: url(/static/blr/img/home/refresh.png);
                 position:relative;
                 top:2px
              }
              .newfresh{
                background: url(/static/blr/img/home/newrefresh.png);
              }
            }
          }
        }
        .SU-Menual {
          line-height: 30px;
          color: #fff;
          margin-top:10px;
          float:left;
          .login-Menual {
            float: right;
            li {
              float: left;
              font-size:16px;
              padding:0 8px;
              a {
                color: #fff;
                text-decoration: none;
                transition: color 0.2s;
              }
              #user_num{
                display:inline-block;
                color:#FEE11F;
                margin-left:2px;
              }
            }
            
          }
          .login-Menual:before {
            content: "";
            display: table;
          }
          .logoutbox{
            width: 41px;
            height: 32px;
            line-height:32px;
            background: #FEE11F;
            border-radius: 4px;
            padding: 0!important;
            text-align: center;
            margin-left:8px;
          }
          #su-logout{
            font-size:14px;
            color: #00644a;
          }
        }
      }
      .login-after:after{
        clear:both;
        content:'';
        display: block;
      }
     
      .mainnav-login {
        padding-top: 0;
      }
    }
    .header-top-left-time{
        float: left;
        height: 50px;
        line-height: 50px;
        color: #85b9ab;
        padding-left: 30px;
        background: url(/static/blr/img/zh.png) no-repeat left center;
        font-size: 14px;
    }
  }
  .clearfix {
    content: "";
    display: table;
  }
  .navChecked {
      color: #ffe519;
      border-radius: 3px;
    .nav_item_tow {
      color: #ffe519 !important;
    }
  }
  .header-bottom-wrap {
    width: 100%;
    .showTime{
      float:left;
    }
    
  }
  .header-bottom-wrap:after {
    content: "";
    display: table;
  }
}


}

.header_box_middle{
  width:1000px;
  height:80px;
  margin:0 auto;
  border-bottom: 1px solid #046f50;
  .header-logo {
      float: left;
      width: 163px;
      margin-top: 4px;
      margin-left:-20px;
      #ele-logo-wrap {
        background-position: 100% 100%;
        width: 163px;
        height: 69px;
        background-image: url(/static/blr/img/home/homeLogo.png);
        background-repeat: no-repeat;
        display: block;
        cursor: pointer;
      }
    }
   .mainnav-wrap {
     width:774px;
     height:80px;
     line-height:80px;
     float:right;
    .mainnav {
      height: 80px;
      .mainBox {
        height: 80px;
        padding-top:20px;
        li:first-child{
          .nav_item_tow{
            width:56px!important;
          }
          
        }
        li {
          float: left;
          margin: 0 1px;
          position: relative;
          .nav_item_tow {
            display: block;
            width: 79px;
            height: 40px;
            line-height: 20px;
            color: #fff;
            font-size: 16px;
            font-family: '微软雅黑';
            text-align: center;
            text-decoration: none;
            margin: 0 4px;
            span:first-child{
              font-size:14px;
            }
            span:last-child{
              font-size:12px;
            }
            &:hover {
              color: #ffe519;
            }
          }
          .navChecked{
            color: #ffe519;
          }
          .girl {
            text-align: left;
            display: none;
            position: absolute;
            top: 100%;
            z-index: 999;
            line-height: normal;
            color: #fff;
            font-size: 13px;
            left: 50%;
            transform: translateX(-50%);
            ul:after{
              clear:both;
              content:'';
              display: block;
            }
            li{
              width: 92px;
              height: 34px;
              line-height:34px;
              padding: 0 5px;
              background: #0e6349;
              text-align: center;
              &:hover a{
                color:#35ffc1!important;
              }
              a{
                padding: 0 4px;
                color: #ffffff;
                text-decoration: none;
                display: inline-block;
                font-size: 14px;
                height: 34px;
                line-height: 34px;
                margin: 0;
                width:100%;
                border-bottom: 1px solid #084f39;
                position: relative;
                text-align: center;
              }
  

            }
            li:last-child a{
              border-bottom:0;
              
            }
          
           
          }
          
          &:hover .girl{
              display: block;
          }
        }
        .LS-first:last-child{
          a{
            color:#ffe519!important;
          }
        }

        li:last-child{
          
          .nav_item_tow{
            margin-right:0;
          }
        }
      }
    }
  }
}

.header_box_bottom{
  width:1000px;
  height:34px;
  margin:0 auto;
  border-top: 1px solid #228767;
  .news-wrap {
      float: left;
      width: 740px;
      margin-top: 8px;
      position: relative;
      left: 12px;
      .news-title {
          float: left;
          min-width: 30px;
          height: 16px;
          line-height: 16px;
          color: #ffdf1b;
          font-weight: bold;
          font-size: 14px;
      }
      .ele-msg-cp {
        cursor: pointer;
      }
      .news-item {
            float: left;
            width: 695px;
            color: #fff;
            margin-left: 10px;
     /deep/.ele-news-txt {
          display: inline-block;
          height: 16px;
          overflow: hidden;
          word-break: break-all;
          overflow-wrap: break-word;
          width: 400px;
          marquee{
            p{
              span{
                font-size: 13px!important;
              }
            }
          }
        }
      }
    }
    .top-link-wrap {
      float: right;
      width: 240px;
      line-height: 30px;
      text-align: right;
      color: #7fbfab;
      a{
        font-size:14px;
        color: rgb(127, 191, 171);
        display:inline-block;
        width:100px;
        text-align:center;
      }
      .top-service-icon {
        padding-left:20px;
        background:url(/static/blr/img/kf.png) no-repeat 10px center;
        background-size:18px 20px;
        color: #ffe618;
      }
      .linebg{
        padding-left:20px;
        background:url(/static/blr/img/jc.png) no-repeat 10px center;
        background-size:18px 20px;
      }
      .downloadBg{
        padding-left:20px;
        background:url(/static/blr/img/sj.png) no-repeat 10px center;
      }
    }
}
</style>