<template>
  <div class="top_nav">
    <div class="nav-content">
      <div class="logo fl">
        <router-link to="/">
          <img :src="logoPng" style="width:288px;height:80px;" />
        </router-link>
      </div>
      <ul class="nav-bar fl">
        
        <li class="nav-item" v-for="(item,i) in classifyList" :key="i" @click="$goPath('one',item)">
          <img class="hotGif" v-if="item.hot == true" src="/static/amxpj/img/home/hot.gif" alt="hot">
          <a  :class="[{navActive:i==gameIndex ? 'navActive' : ''}]">
             <!-- <img class="hotGif" v-if="item.hot == true" src="/static/amxpj/img/home/hot.gif" alt="hot"> -->
            <span class="navName">{{item.name}}</span>
            <span class="navText">{{item.text}}</span>
            <!-- <img class="hotGif" v-if="item.hot == true" src="/static/amxpj/img/home/hot.gif" alt="hot"> -->
            <i :class="{triangle:navChecked==i && item.text != 'LOTTERY' && item.text != 'SERVICE'}"></i>
            <i class="triangle1"></i>
          </a>
          <div class="dropdown" v-if="item.list">
            <ol>
              <li v-for="(v,i) in item.list" :key="i" @click.stop="$goPath('nav',v)">
                <a href="javascript:void(0)">
                  <img :src="v.img" width="37" height="21" alt v-if="v.img" />
                  <span>{{v.name}}</span>
                  <img class="hotGif2" v-if="v.id == '243' || v.id == '10613' || v.id == '10695' || v.id == '38' || v.id == '11368'|| v.id == '10054' || v.id == '10055' || v.id == '10057'|| v.id == '173'|| v.id == '11421'|| v.id == '11729'" src="/static/amxpj/img/home/hot.gif" alt="hot">
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
          link: "/home",
          hot:false
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          link: "/home/chess?navid=9&id=0",
          platform: "KY_CHESS",
          gameName: "0",
          list: [],
          type: "chess",
          hot:true
        },
        {
          name: "捕鱼达人",
          text: "FISHING",
          link: "/home/fish?navid=9&id=0",
          type: "fish",
          hot:true,
          list:[
            {
              name:"JDB财神捕鱼",
              id:"173",
              type:'game2'
            },
            {
              name:"五龙捕鱼",
              id:"11421",
              type:"game2",
            },
            {
              name:"AG捕鱼王3D",
              id:"11729",
              type:"game2",
            },
            {
              name:"CQ9皇金渔场2",
              id:"11680",
              type:"game2",
            },
            {
              name:"天豪3D捕鱼",
              id:"11670",
              type:"game2",
            },
            {
              name:"FG美人捕鱼",
              id:"2576",
              type:"game2",
            },
            {
              name:"FG欢乐捕鱼",
              id:"2626",
              type:"game2",
            },
          ]
        },
         {
          name: "真人娱乐",
          text: "CASINO",
          link: "/home/live",
          platform: "live_casino",
          hot:true
        },
         {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          link: "/plays/hall",
          gameName: "0",
          type: "lottery",
          hot:false
        },
        // {
        //   name: "真人娱乐",
        //   text: "CASINO",
        //   link: "/home/live",
        //   platform: "live_casino",
        //   hot:false
        // },
         {
          name: "电子游艺",
          text: "GAME",
          platform: "AG_GAME",
          link: "/home/slot?navid=9&id=0",
          type: "slot",
          hot:false
        },
        {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu?id=0",
          list: [],
          hot:false
        },
        {
          name: "优惠活动",
          text: "ACTIVETY",
          link: "/home/youhui",
          hot:false
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service",
          type: "service",
          hot:false
        }
      ],
      logoPng: "/static/amxpj/img/logo-2.png",
      navChecked: 0,
      gameIndex: 0
    };
  },
  methods: {
    async getGameDatas() {
      await this.$gameSortV4(this.getNativeDatas);
    },
    getNativeDatas() {
      if (localStorage.gameSortV4_chess) {
          this.classifyList[1].list = this.$gameClassV4("chess");
      }
      if (localStorage.gameSortV4_sport) {
          this.classifyList[6].list = this.$gameClassV4("sport");
      }
    },
    getLogo() {
      this.$store
        .dispatch("home/logoList", { position: "logo", clientType: "pc" })
        .then(res => {
          if (res && res.code == 200 && res.data.body[0]) {
            this.logoPng = res.data.body[0].img;
          }
        });
    },
    setNavAction(path) {
      if (path === "/home") {
        this.gameIndex = 0;
        this.navChecked = 0;
      } else if (path.includes("/home/chess")) {
        this.gameIndex = 1;
        this.navChecked = 1;
      } else if (path.includes("/home/fish")) {
        this.gameIndex = 2;
        this.navChecked = 2;
      } else if (path.includes("/home/slot")) {
        this.gameIndex = 5;
        this.navChecked = 5;
      } else if (path.includes("/home/live")) {
        this.gameIndex = 3;
        this.navChecked = 3;
      } else if (path.includes("/home/tiyu")) {
        this.gameIndex = 6;
        this.navChecked = 6;
      } else if (path.includes("/home/youhui")) {
        this.gameIndex = 7;
        this.navChecked = 7;
      }
    }
  },
  mounted() {
    let routerSrc = this.$store.state.mainState.routeSrc;
    if (routerSrc === "/home") {
      this.navChecked = 0;
      this.gameIndex = 0;
    }
  },
  created() {
    this.getGameDatas();
    // this.getLogo();
    this.setNavAction(this.$route.path);
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      this.$store.commit("mainState/getRoute", newVal);
      this.setNavAction(newVal);
    }
  }
};
</script>

<style lang="less">
.hotGif{
  position: absolute;
  top: 25px;
  right: -15px;
}
.hotGif2{
  position: absolute;
  top: 6px;
  right: -3px;
}
.top_nav {
  position: relative;
  min-width: 1200px;
  height: 120px;
  margin: 0 auto;
  background-position: 73px -2px;
  background: linear-gradient(0deg, rgba(65, 58, 102, 1), rgba(31, 27, 54, 1));
  border: 1px solid #655b9a;
  .nav-content {
    width: 1200px;
    height: 120px;
    margin: 0 auto;
    .logo {
      float: left;
      text-align: left;
      width: 288px;
      height: 80px;
      margin-top: 20px;
    }

    .nav-bar {
      float: right;
      height: 120px;
      li:last-child {
        margin-right: 0;
      }
      li.nav-item > a {
        &:hover {
          border-bottom: 4px #ffda82 solid;
          color: #ffda82;
        }
      }
      li {
        float: left;
        position: relative;
        height: 120px;
        line-height: 78px;
        margin: 0 14px;
        font-size: 16px;
        color: #54689a;
        padding: 0 6px;
        list-style: none;
        cursor: pointer;
        transition: all 0.3s;
        & a {
          width: 100%;
          height: 120px;
          display: block;
          text-align: center;
          text-decoration: none;
          color: inherit;
          position: relative;
          color: #ffea83;
          .navName {
            font-size: 16px;
            line-height: 16px;
            display: block;
            padding-top: 46px;
          }
          .navText {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 12px;
            margin: 0 auto;
            top: 40px;
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
            border-bottom: 5px solid #ffda82;
            transition: all 0.2s;
          }

          &:hover .triangle1 {
            display: block;
          }

          &.navActive {
            border-bottom: 4px #ffda82 solid;
            color: #ffda82;
            height: 120px;
            .triangle {
              display: block;
            }
          }
        }
        .dropdown {
          left: 44%;
          position: absolute;
          top: 44px;
          z-index: 999;
          transform: translate(-50%, 0);
          display: block;
          border-radius: 10px;
          box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
          font-size: 14px;
          color: #647488;
          background-color: rgba(21, 17, 42, 0.9);
          transition: all 0.5s ease;
          border: 1px solid #8273ce;
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
                color: #afa1e9;
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
                  color: #ffe593;
                }
              }
            }

            li:hover {
              background: #5e528f;
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
            top: 116px;
            max-height: 500px;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
