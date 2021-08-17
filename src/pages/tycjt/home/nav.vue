<template>
  <div class="top_nav" :class="{little:showClass}">
    <div class="nav-content">
      <div class="nav_list">
        <div class="nav_contaner">
          <div class="logo fl">
            <router-link to="/">
              <img src="/static/tycjt/img/logo.gif" style="height:105px;width:317px;margin-top:5px;" />
            </router-link>
          </div>
          <ul class="nav-bar fl" @mouseover="isActive = 1"  @mouseout="isActive = 0">
            <li class="nav-item" v-for="(item,i) in classifyList" :key="i"  @click="$goPath('one',item)">
              <a :class="[{navActive:i==gameIndex && isActive == 0 ? 'navActive' : ''}]">
                <i class="ico" :class="item.ico"></i>
                <span class="navName">{{item.name}}</span>
                <!-- <span class="navText">{{item.text}}</span> -->
                <i
                  :class="{triangle:navChecked==i && item.text != 'LOTTERY' && item.text != 'SERVICE'}"
                ></i>
                <i class="triangle1"></i>
              </a>
              <div class="dropdown" v-if="item.list">
                <ol>
                  <li v-for="(v,i) in item.list" :key="i" @click.stop="$goPath('nav',v)">
                    <a href="javascript:void(0)">
                      <img :src="v.img" width="37" height="21" alt v-if="v.img" />
                      <span>{{v.name}}</span>
                      <br />
                    </a>
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
      
    </div>

    <!-- 左右浮窗 -->
    <p class="moveBTn1"></p>
    <p class="moveBTn2"></p>
    
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isActive:0,
      showClass:false,
      codeImg:"/static/tycjt/img/home/lo2.png",
      
      showfresh:false,
      classifyList: [
        {
          name: "首页",
          text: "HOME",
          platform: "home",
          link: "/home",
          ico:"icon_Home"
        },
        {
          name: '视讯直播',
          text: "CASINO",
          link: "/home/live",
          platform: "live_casino",
          ico:'icon_casino'
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          link: "/home/chess??navid=9&id=0",
          platform: "KY_CHESS",
          gameName: "0",
          type: "chess",
          ico:'icon_chess',
        },
        {
          name: "电子游艺",
          text: "GAME",
          platform: "AG_GAME",
          link: "/home/slot?navid=9&id=0",
          type: "slot",
          ico:"icon_slot"
        },
         {
          name: "捕鱼达人",
          text: "FISHING",
          link: "/home/fish?navid=9&id=0",
          type:'fish',
          ico:'icon_fishing',
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          link: "/plays/hall",
          gameName: "0",
          type:'lottery',
          ico:'icon_lottery'
        },
        {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu?id=0",
          ico:'icon_sport'
        },
        {
          name: "优惠活动",
          text: "ACTIVETY",
          link: "/home/youhui",
          ico:'icon_promo',
          // type:'youhui'
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service",
          type: "service",
          ico:'icon_service'
        }
      ],
      navChecked: 0,
      gameIndex: 0,
      passKey: {
          userName: '',
          password: '',
          code: ''
      }
    };
  },
  methods: {
    async getGameDatas() {
      await this.$gameSortV4();
    },
    getNativeDatas() {
      if (localStorage.gameSortV4_chess){
          this.classifyList[2].list = this.$gameClassV4("chess");
      }
      if (localStorage.gameSortV4_sport){
          this.classifyList[6].list = this.$gameClassV4("sport");
      }
    },
    setNavAction(path) {
      if (path === "/home") {
        this.gameIndex = 0;
        this.navChecked = 0;
      } else if (path.includes("/home/live")) {
        this.gameIndex = 1;
        this.navChecked = 1;
      } else if (path.includes("/home/chess")) {
        this.gameIndex = 2;
        this.navChecked = 2;
      } else if (path.includes("/home/slot")) {
        this.gameIndex = 3;
        this.navChecked = 3;
      } else if (path.includes("/home/fish")) {
        this.gameIndex = 4;
        this.navChecked = 4;
      } else if (path.includes("/home/tiyu")) {
        this.gameIndex = 6;
        this.navChecked = 6;
      } else if (path.includes("/home/youhui")) {
        this.gameIndex = 7;
        this.navChecked = 7;
      }
    },
    newshowfresh(){
        if(this.balanceRefreshing) this.showfresh=false
            else this.showfresh=true
    },
    goKaihu() {
        // this.$router.push('/register-content');
        // this.$errorAlert('预览版 暂未开放', 'warn')
        // return false
        this.$store.commit('alert/showMgmRegister', true);
    },
    forgetPwd() {
        this.$store.commit('alert/newshowtip', {
            bool: true,
            title: '忘记帐号密码，请联系在线客服人员取回！',
            model: '',
            leftspan: true
        });
    },
    //是否已登录
    isLogged() {
        if (!localStorage.token || !localStorage.userinfo) {
            this.showClass = false;
        } else {
            this.showClass = true;
        }
    },
  },
  mounted() {
    this.getGameDatas();
    this.isLogged();
    let routerSrc = this.$store.state.mainState.routeSrc;
    // this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
    if (routerSrc === "/home") {
      this.navChecked = 0;
      this.gameIndex = 0;
    }
  },
  created() {
    this.setNavAction(this.$route.path);
    this.$store.commit("mainState/getRoute", this.$route.path);
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      console.log(newVal);
      if(newVal == '/home'){
        if(localStorage.token || localStorage.userinfo){
          this.showClass = true;
        }else{
          this.showClass = false;
        }
        
      }else{
        this.showClass = true;
      }
      this.$store.commit("mainState/getRoute", newVal);
      this.setNavAction(newVal);
    }
  }
};
</script>

<style lang="less">
.color-red{
  color: #ff3030;
}
.msg{
  color: #fff;
  font-size: 12px;
  display: inline-block;
  height: 17px;
  width: 17px;
  border-radius: 50%;
  position: absolute;
  top: 6px;
  background: #ba0000;
  right: -15px;
  text-align: center;
  line-height: 17px;
}
.little{
  margin-bottom: 58px!important;
}
.top_nav {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(26,26,26);
  .nav-content {
    margin: 0 auto;
    .logo {
      float: left;
      text-align: left;
      width: 342px;
      height: 88px;
      margin-top: 2px;

    }
    .nav_list{
      border-bottom: 2px solid rgba(250, 232, 134);
      height: 123px;
      background: linear-gradient(180deg,#1c1c1c,#0f0f0f);
    }
    .nav_contaner{
      width: 1200px;
      margin: 0 auto;
      height: 123px;
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .nav-bar {
      float: right;
      height: 123px;
      li:last-child {
        margin-right: 0;
      }
      li.nav-item > a {
        height:123px;
        border-bottom: 4px transparent solid;
       
        .ico {
          // width: 100%;
          height: 32px;
          margin-bottom: 7px;
          &.icon_Home {
              background: url(/static/tycjt/img/icon_Home.png) no-repeat center center;
          }
          &.icon_slot {
              background: url(/static/tycjt/img/icon_slot.png) no-repeat center center;
          }
          &.icon_chess {
              background: url(/static/tycjt/img/icon_chess.png) no-repeat center center;
          }
          &.icon_casino {
              background: url(/static/tycjt/img/icon_casino.png) no-repeat center center;
          }
          &.icon_lottery {
              background: url(/static/tycjt/img/icon_lottery.png) no-repeat center center;
          }
          &.icon_fishing {
              background: url(/static/tycjt/img/icon_fishing.png) no-repeat center center;
          }
          &.icon_sport {
              background: url(/static/tycjt/img/icon_sport.png) no-repeat center center;
          }
          &.icon_promo {
              background: url(/static/tycjt/img/icon_promo.png) no-repeat center center;
          }
          &.icon_service {
              background: url(/static/tycjt/img/icon_service.png) no-repeat center center;
          }
       }
       &:hover {
          border-bottom: 4px #ffda82 solid;
          color: #ffda82;
        }
      }
      li {
        float: left;
        position: relative;
        height: 123px;
        line-height: 30px;
        margin: 0 14px;
        font-size: 15px;
        color: #54689a;
        padding: 0 6px;
        list-style: none;
        cursor: pointer;
        transition: all 0.3s;
        & a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          color: #fff;
          border-bottom: 2px transparent solid;
          .navName {
            display: block;
          }
          .navText {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 12px;
            margin: 0 auto;
            top: 22px;
            white-space: nowrap;
            text-align: center;
          }
          .triangle,
          .triangle1 {
            display: none;
            font-size: 22px;
            content: "";
            position: absolute;
            bottom: 0px;
            left: 50%;
            margin-left: -5px;
            border: 5px solid transparent;
            border-bottom: 5px solid #f8ce5a;
            transition: all 0.2s;
          }

          // &:hover .triangle1 {
          //   display: block;
          // }

          &.navActive {
            border-bottom: 4px #f8ce5a solid;
            color: #f8ce5a;
          }
        }
        .dropdown {
          left: 44%;
          position: absolute;
          top: 0px;
          z-index: 999;
          transform: translate(-50%, 0);
          display: block;
          border-radius: 10px;
          box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
          font-size: 14px;
          color: #647488;
          background-color: rgba(90, 15, 25, 0.9);
          transition: all 0.5s ease;
          border: 1px solid #a31d30;
          max-height: 100px;
          overflow: hidden;
          opacity: 0;
          ol {
            width: 120px;
            padding-top: 10px;
            li {
              line-height: 40px;
              color: #fff;
              width: 120px;
              height: 40px;
              margin: 0;
              a {
                width: 100%;
                height: 100%;
                display: inline-block;
                text-align: center;
                color: #f6abb5;
                vertical-align: top;
                font-size: 14px;
                img {
                  border: 0;
                  vertical-align: middle;
                }
                span {
                  font-size: 14px;
                }
              }
              &:hover {
                display: block;
                position: relative;
                color: #647488;
                a {
                  color: #ffc800;
                }
              }
            }

            li:hover {
              background: rgba(187, 34, 55, 0.3);
            }
          }
        }
        .dropdown:after {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          top: -16px;
          margin-left: -4px;
          border: 8px solid transparent;
          border-bottom: 8px solid rgba(90, 15, 25, 0.9);
        }
        &:hover {
          .dropdown {
            top: 80px;
            max-height: 500px;
            opacity: 1;
          }
        }
      }
    }

    
  }
  
  .left{
    position: fixed;
    height: 450px;
    width: 140px;
    left: -137px;
    top: 120px;
    z-index: 9;
    transition: all 0.2s linear;
    .server{
      height: 370px;
      width: 140px;
      background: url('/static/tycjt/img/home/left.gif') no-repeat;
      li{
        height: 45px;
      }
    }
    p{
      position: absolute;
      top: 94px;
      left: 136px;
    }
    &:hover{
      left: 0;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
  .right{
    position: fixed;
    height: 450px;
    width: 140px;
    right: -140px;
    top: 120px;
    z-index: 9;
      transition: all 0.2s linear;
    .server{
      height: 370px;
      width: 140px;
      background: url('/static/tycjt/img/home/right.gif') no-repeat
    }
    p{
      position: absolute;
      top: 94px;
      right: 139px;
    }
    &:hover{
      right: 0;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }

  
}
</style>
