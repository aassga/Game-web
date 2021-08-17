<template>
  <div class="top_nav">
    <div class="nav-content">
      <div class="logo fl">
        <a href="javascript:void(0)" @click="$goPath('rot','/home')">
          <img src="/static/klk/img/home.png">
        </a>
      </div>
      <ul class="nav-bar fl">
        <li class="tpT" style="width: 60px">
          <a href="javascript:void(0)" @click="$goPath('rot','/home')">
            <i class="bg-home" style="left: 32px;"></i>
          </a>
        </li>
        <li
          class="tpT"
          v-for="(item,i) in classifyList"
          :key="i"
          :class="{isColor:item.hotShow ==true}"
          @click="$goPath('one',item)"
        >
          <img src="/static/klk/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
          <span class="x-dh-t">{{item.name}}</span>
          <span class="x-dh-b">{{item.text}}</span>
          <div class="girl dropdown">
            <ol>
              <li v-for="(v,i) in item.list" :key="i" @click.stop="$goPath('nav',v)">
                <a href="javascript:void(0)">
                  <img :src="v.id|capitalize" width="37" height="21" alt  v-if="v.type!='chess'&&v.type!='game2'">
                  <span>{{v.name}}</span>
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
export default {
  data() {
    return {
      classifyList: [
        {
          name: "体育赛事",
          text: "SPORTS",
          link: "/home/tiyu?id=0",
          platform: "sport",
          list: [],
        },
        {
          name: "真人娱乐",
          text: "LIVE CASINO",
          link: "/home/live",
          platform: "live_casino",
          hotShow: true,
          list: [
            {
              name: "AG视讯",
              id: "31",
              type: "live"
            },
            {
              name: "BBIN视讯",
              id: "32",
              type: "live"
            },
            {
              name: "BG视讯",
              id: "3180",
              type: "live"
            },
            {
              name: "DG视讯",
              id: "42",
              type: "live"
            },
            {
              name: "DS视讯",
              id: "34",
              type: "live"
            },
            {
              name: "OG视讯",
              id: "48",
              type: "live"
            },
            {
              name: "eBET视讯",
              id: "43",
              type: "live"
            }
          ]
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          link: "/home/chess?navid=9&id=0",
          platform: "KY_CHESS",
          hotShow: true,
          list: [],
          type:'chess',
        },
        {
          name: "MG老虎机",
          text: "MG CASINO",
          platform: "MG_GAME",
          link: "/home/slot?navid=9&id=0",
          hotShow: true,
          type:'slot',
          list: [
            {
              name: "不朽的浪漫",
              platform: "MG_GAME",
              gameName: "ImmortalRomance",
              id: "10303",
              type: "game2"
            },
            {
              name: "银行抢匪2",
              platform: "MG_GAME",
              gameName: "BreakDaBank",
              id: "10160",
              type: "game2"
            },
            {
              name: "淑女派对",
              platform: "MG_GAME",
              gameName: "LadiesNite",
              id: "10348",
              type: "game2"
            },
            {
              name: "宝石之轮",
              platform: "MG_GAME",
              gameName: "ReelGems",
              id: "10427",
              type: "game2"
            }
          ]
        },
        {
          name: "老虎机大厅",
          text: "ELECT RONIC",
          platform: "MG_GAME",
          hotShow: true,
          link: "/home/slot?navid=9&id=0",
          type:'slot',
          list: [
            {
              name: "PT老虎机",
              id: "10024",
              type: "game",
              link: "/home/slot?navid=9&id=10024"
            },
            {
              name: "AG老虎机",
              id: "10015",
              type: "game",
              link: "/home/slot?navid=9&id=10015"
            },
            {
              name: "CQ9电子",
              id: "10018",
              type: "game",
              link: "/home/slot?navid=9&id=10018"
            },
            {
              name: "MG老虎机",
              id: "10022",
              type: "game",
              link: "/home/slot?navid=9&id=10022"
            },
            {
              name: "FG老虎机",
              id: "10020",
              type: "game",
              link: "/home/slot?navid=9&id=10020"
            },
            {
              name: "PG电子",
              id: "11320",
              type: "game",
              link: "/home/slot?navid=9&id=11320"
            }
          ]
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "vr_lottery",
          link: "/plays/hall",
           type:'lottery',
        },
        {
          name: "捕鱼达人",
          text: "FISH",
          link: "/home/fish?navid=9&id=0",
          type:'fish',
        },
        {
          name: "优惠活动",
          text: "PROMOTION",
          link: "/home/youhui"
        },
        {
          name: "在线客服",
          text: "SERVICE",
          link: "service",
          type:"service"
        }
      ]
    };
  },
  methods: {
    async getGameDatas() {
      await this.$gameSortV4(this.getNativeDatas);
    },
    getNativeDatas() {
      if (localStorage.gameSortV4_chess){
        this.classifyList[2].list = this.$gameClassV4("chess");
      }
      // if (localStorage.sport_game_new) {
      //   this.classifyList[0].list = this.$gameClass("sport");
      // }
    }
  },
  mounted() {
    setInterval(() => {
      $(".isColor:odd .x-dh-t").css("color", "rgb(0,255,0)");
      $(".isColor:odd .x-dh-b").css("color", "rgb(0,255,0)");

      $(".isColor:even .x-dh-t").css("color", "rgb(255,0,0)");
      $(".isColor:even .x-dh-b").css("color", "rgb(255,0,0)");
    }, 150);
    setInterval(() => {
      $(".isColor:odd .x-dh-t").css("color", "rgb(255,0,0)");
      $(".isColor:odd .x-dh-b").css("color", "rgb(255,0,0)");

      $(".isColor:even .x-dh-t").css("color", "rgb(135,8,156)");
      $(".isColor:even .x-dh-b").css("color", "rgb(135,8,156)");
    }, 300);
  },
  created() {
      this.getGameDatas();
     
  },
  filters: {
    capitalize: function(value) {
      try {
        return `/static/klk/img/new_klk/${value}.png`;
      } catch (err) {
        return `/static/klk/img/new_klk/10020.png`;
      }
    }
  }
};
</script>

<style lang="less">
.top_nav {
  height: 90px;

  .nav-content {
    width: 1200px;
    height: 90px;
    margin: 0 auto;

    .logo {
      width: 221px;
      padding-top: 19px;
    }

    .nav-bar {
      height: 90px;

      li {
        height: 90px;
        float: left;
        margin: 0 10px;
        position: relative;
        font-size: 12px;
        color: #000;
        line-height: 90px;
        cursor: pointer;
        text-align: center;

        &.tpT {
          padding-top: 35px;
          line-height: 20px;

          &:nth-child(2) {
            padding-left: 20px;
          }

          &:nth-child(1) {
            padding-top: 18px;
          }
        }

        a {
          width: 100%;
          height: 100%;
          display: inline-block;

          .bg-home {
            width: 25px;
            height: 23px;
            display: block;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            background: url("/static/public/image/userImg/header_nav_sprites.png") -10px -10px;
          }

          .bg-home:hover {
            background: url("/static/public/image/userImg/header_nav_sprites.png") -55px -10px;
          }
        }

        .x-dh-i {
          position: absolute;
          top: 12px;
          right: 0px;
        }

        .x-dh-t {
          display: block;
          font-size: 14px;
        }

        .x-dh-b {
          font-size: 14px;
          white-space: nowrap;
        }

        .dropdown {
          left: -20px;
          display: none;
          position: absolute;
          top: 90px;
          z-index: 999;
          background: rgba(0, 0, 0, 0.8);
          line-height: normal;
          color: #fff;
          font-size: 13px;
          border: 2px solid rgb(180, 140, 104);

          li {
            line-height: 40px;
            color: #fff;
            width: 120px;
            height: 40px;
            border-bottom: 1px dashed #ccc;
            margin: 0;

            a {
              width: 100%;
              height: 100%;
              display: inline-block;
              text-align: center;

              color: #fff;

              img {
                border: 0;
                vertical-align: middle;
              }
            }
          }

          li:hover {
            background: rgb(180, 140, 104);
          }
        }
      }

      li:hover {
        .x-dh-t {
          color: #ff5555;
        }

        .x-dh-b {
          color: #ff5555;
        }

        .dropdown {
          display: block;
        }
      }
    }
  }
}
</style>
