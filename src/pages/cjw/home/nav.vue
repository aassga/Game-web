<template>
  <div class="top_nav">
    <div class="nav-content">
      <div class="logo fl">
        <router-link to="/">
          <img src="/static/cjw/img/logo.png" style="width:268px;height:80px;" />
        </router-link>
      </div>
      <ul class="nav-bar fl">
        <li class="nav-item" v-for="(item,i) in classifyList" :key="i">
          <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex ? 'navActive' : ''}]">
            <span class="navName">{{item.name}}</span>
            <span class="navText">{{item.text}}</span>
            <i
              :class="{triangle:navChecked==i && item.text != 'LOTTERY' && item.text != 'SERVICE'}"
            ></i>
            <i class="triangle1"></i>
          </a>
          <div class="dropdown" v-if="item.list">
            <ol>
              <li v-for="(v,i) in item.list" :key="i" @click="goGame(v,item.text)">
                <a href="javascript:void(0)">
                  <img :src="v.img" width="37" height="21" alt v-if="v.img"/>
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
</template>

<script>
import $ from "jquery";
import { postS, getS, _SetGet, _SetPost } from "@/service/public/service.js";
export default {
  data() {
    return {
      classifyList: [
        {
          name: "首页",
          text: "HOME",
          platform: "home",
          link: "/home"
        },
        {
          name: "真人娱乐",
          text: "CASINO",
          link: "/home/live",
          platform: "live_casino"
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          link: "/home/chess?navid=9&id=0",
          platform: "KY_CHESS",
          gameName: "0",
          list: []
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          link: "/plays/hall",
          gameName: "0",
          type:'lottery'

        },
        {
          name: "电子游艺",
          text: "GAME",
          platform: "AG_GAME",
          link: "/home/slot?navid=9&id=0"
        },
        {
          name: "捕鱼达人",
          text: "FISHING",
          link: "/home/fish?navid=9&id=0"
        },
        {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu",
        },
        {
          name: "优惠活动",
          text: "ACTIVETY",
          link: "/home/youhui"
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service",
          type: "service"
        }
      ],
      navChecked: 0,
      gameIndex: 0,
    };
  },
  methods: {
    async getQiPai() {
      // let id = "10004";
      // this.$store.dispatch('game/ChessFishSort',{ device: "pc",type: "1"}).then(res=>{
      //     if(res&&res.code==200){
      //       res.data.list.platform.forEach((item, index) => {
      //         if (item.name != '全部') {
      //           const qipai = {
      //             name: item.name == "开元棋牌游戏" ? "开元棋牌" : item.name,
      //             platform: item.code,
      //             link: "/home/chess?navid=9&id=" + item.id
      //           };
      //           this.classifyList[2].list.push(qipai);
      //         }
      //       });
      //     }
      // })
      await this.$gameSortV4(this.getNativeDatas);
    },
    getNativeDatas() {
      if (localStorage.chess_game_new) {
          this.classifyList[2].list = this.$gameClassV4("chess");
      }
    },
    goLink(item, i) {
      localStorage.setItem("navIndex", i);
      if (item.link) {
        if (item.link == "service") {
          let service = JSON.parse(localStorage.config).service;
          if (service) {
            let ser = service.find(item => item.status === "on");
            if (ser) {
              window.open(ser.url);
            }
          }
        } else if (item.link == "/plays/hall") {
          window.open("#/plays/hall");
          return false;
        } else {
          this.gameIndex = i;
          this.navChecked = i;
          this.$router.push(item.link);
        }
      } else if (item.gameName) {
        this.trustLogin(item);
      }
    },
    goGame(a,b){
      if(b == 'LOTTERY'){
        if(localStorage.token){
          this.$store.dispatch('lottery/getStopLotteryCheck',a.lid).then(res=>{
              if(res&&res.length >0 ){
                  this.$store.commit('alert/showTipModel', {
                  bool: true,
                  title: res.replace(/，/g,'</br>'),
                  model: 'warn',
                  type:'closeMaret',
                  });
              }else{
              window.open(this.$router.resolve(a.path).href)
              return false
              }
          })
        }else{
            this.dNotify("请先登录", 'error')
        }
      }else{
        if (b != 'service') {
          this.$router.push(a.link);
        }else{
          this.$loginGame(a);
        }
      }
    },
    setNavAction(path) {
      if(path === '/home') {
        this.gameIndex = 0;
        this.navChecked = 0;
      }else if(path.includes('/home/live')) {
        this.gameIndex = 1;
        this.navChecked = 1;
      }else if(path.includes('/home/chess')) {
        this.gameIndex = 2;
        this.navChecked = 2;
      }else if(path.includes('/home/slot')) {
        this.gameIndex = 4;
        this.navChecked = 4;
      }else if(path.includes('/home/fish')) {
        this.gameIndex = 5;
        this.navChecked = 5;
      }else if(path.includes('/home/tiyu')) {
        this.gameIndex = 6;
        this.navChecked = 6;
      }else if(path.includes('/home/youhui')) {
        this.gameIndex = 7;
        this.navChecked = 7;
      }
    }
  },
  mounted() {
    this.gameIndex = 0;
    // this.$root.eventHub.$on("gameIndex", msg => {
    //   this.gameIndex = msg;
    //   this.navChecked = msg;
    // });
    // let routerSrc = this.$store.state.mainState.routeSrc;
    // this.navChecked = this.gameIndex = localStorage.getItem('navIndex');
    // if (routerSrc === "/home") {
    //   this.navChecked = 0;
    //   this.gameIndex = 0;
    // }
  },
  created() {
    this.getQiPai();
    this.setNavAction(this.$route.path)
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      this.$store.commit("mainState/getRoute", newVal);
      this.setNavAction(newVal)
    }
  }
};
</script>

<style lang="less">
.top_nav {
  position: relative;
  min-width: 1200px;
  height: 100px;
  margin: 0 auto;
  background-color: #ffffff;
  .nav-content {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    .logo {
      float: left;
      text-align: left;
      width: 278px;
      height: 88px;
      margin-top: 10px;
    }

    .nav-bar {
      float: right;
      height: 100px;
      li:last-child {
        margin-right:0;
      }
      li.nav-item > a{
        &:hover {
          border-bottom: 4px #579AE5 solid;
          color: #579AE5;
        }
      }
      li {
        float: left;
        position: relative;
        height: 100px;
        line-height: 78px;
        margin: 0 14px;
        font-size: 16px;
        color: #54689a;
        padding: 0 6px;
        list-style: none;
        cursor: pointer;
        transition: all 0.3s;
        & 
        a {
          width: 100%;
          height: 86px;
          display: block;
          text-align: center;
          text-decoration: none;
          color: inherit;
          position: relative;
          color: #54689A;
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
            border-bottom: 5px solid #579AE5;
            transition: all 0.2s;
          }

          &:hover .triangle1 {
            display: block;
          }

          &.navActive {
            border-bottom: 4px #579AE5 solid;
            color: #579AE5;
            height: 86px;
            .triangle {
              display: block;
            }
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
          color: #79859b;
          background-color: #fff; 
          transition: all .5s ease;
          // border: 1px solid #a31d30;
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
                color: #79859b;
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
                  color:#647488;
                }
              }
            }

            li:hover {
              background:#e8edf5;
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
          border-bottom: 8px solid rgba(90,15,25,.9);
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
}
</style>
