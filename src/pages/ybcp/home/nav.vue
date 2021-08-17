<template>
  <div class="top_nav">
    <div class="nav-content">
      <div class="logo fl">
        <a href="javascript:void(0)" @click="goHome">
          <img src="/static/ybcp/img/logo.png">
        </a>
      </div>

      <ul class="nav-bar fl">
        <li
          class="tpT"
          v-for="(item,i) in classifyList"
          :key="i"
          :class="{isColor:item.hotShow ==true}"
        >
          <img src="/static/ybcp/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
          <span class="x-dh-t" @click="$goPath('one',item)">{{item.name}}</span>
          <span class="x-dh-b" @click="$goPath('one',item)">{{item.text}}</span>
          <div class="girl dropdown">
            <ol>
              <li v-for="(v,i) in item.list" :key="i" @click="goGame(v,item.text)">
                <a href="javascript:void(0)">
                  <img :src="v.img" width="37" height="21" alt v-if="v.img">
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
import data from "../../public/games/public.js";
import wm from '../../../../static/ybcp/img/live/log_wm.png'
import ag from '../../../../static/ybcp/img/live/log_ag.png'
import bb from '../../../../static/ybcp/img/live/log_bbin.png'
import bg from '../../../../static/ybcp/img/live/log_bg.png'
import dg from '../../../../static/ybcp/img/live/log_dg.png'
import ds from '../../../../static/ybcp/img/live/log_ds.png'
import ebet from '../../../../static/ybcp/img/live/log_ebet.png'
import eov from '../../../../static/ybcp/img/live/log_eov.png'
import mg from '../../../../static/ybcp/img/live/log_mg.png'
import og from '../../../../static/ybcp/img/live/log_og.png'
import pt from '../../../../static/ybcp/img/live/log_pt.png'
import vr from '../../../../static/ybcp/img/live/log_vr.png'
export default {
  mixins: [data],
  data() {
    return {
      classifyList: [
        {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu",
        },
        {
          name: "真人娱乐",
          text: "LIVE CASINO",
          link: "/home/live",
          platform: "live_casino",
          hotShow: true,
          list: []
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          platform: "KY_CHESS",
          hotShow: true,
          link: "/home/chess?navid=9&id=0",
          gameName: "0",
          list: [
            {
              name: "开元棋牌",
              // gameName: "610",
              platform: "KY_CHESS",
              link: "/home/games?id=10042&name=开元棋牌",
            },
            {
              name: "VG棋牌",
              // gameName: "830",
              platform: "KY_CHESS",
              link: "/home/games?id=10041&name=VG棋牌",
            }

            // {
            //   name: "斗地主",
            //   gameName: "610",
            //   platform: "KY_CHESS"
            // },
            // {
            //   name: "抢庄牛牛",
            //   gameName: "830",
            //   platform: "KY_CHESS"
            // },
            // {
            //   name: "炸金花",
            //   gameName: "220",
            //   platform: "KY_CHESS"
            //   // img: require("/static/ybcp/img/thirdparty/bb.png"),
            //   // id: "41"
            // },
            // {
            //   name: "德州扑克",
            //   platform: "KY_CHESS",
            //   // img: require("/static/ybcp/img/thirdparty/agty.png"),
            //   gameName: "620"
            // },
            // {
            //   name: "21点",
            //   platform: "KY_CHESS",
            //   gameName: "600"
            // }
          ]
        },
        {
          name: "MG老虎机",
          text: "MG CASINO",
          platform: "MG_GAME",
          link: "/home/slot?navid=9&id=0",
          hotShow: true,
          list: [
            {
              name: "冰上曲棍球",
              platform: "MG_GAME",
              gameName: "breakaway"
            },
            {
              name: "不朽的浪漫",
              platform: "MG_GAME",
              gameName: "ImmortalRomance"
            },
            {
              name: "银行抢匪2",
              platform: "MG_GAME",
              gameName: "BreakDaBank"
              // img: require("/static/ybcp/img/thirdparty/bb.png"),
              // id: "41"
            },
            {
              name: "淑女派对",
              platform: "MG_GAME",
              // img: require("/static/ybcp/img/thirdparty/agty.png"),
              gameName: "LadiesNite"
            },
            {
              name: "宝石之轮",
              platform: "MG_GAME",
              gameName: "ReelGems"
            }
          ]
        },
        {
          name: "老虎机大厅",
          text: "ELECT RONIC",
          platform: "MG_GAME",
          hotShow: true,
          link: "/home/slot?navid=9&id=0",
          list: [
            {
              name: "PT老虎机",
              img: "/static/ybcp/img/thirdparty/pt.png",
              num: "10024"
            },
            {
              name: "AG老虎机",
              img: "/static/ybcp/img/thirdparty/agty.png",
              num: "10015"
            },
            {
              name: "CQ9电子",
              img: "/static/ybcp/img/thirdparty/CQ9.png",
              num: "10018"
              // img: require("/static/ybcp/img/thirdparty/bb.png"),
              // id: "41"
            },
            {
              name: "MG老虎机",
              // img: require("/static/ybcp/img/thirdparty/agty.png"),
              img: "/static/ybcp/img/thirdparty/mg.png",
              num: "10022"
            },
            {
              name: "FG老虎机",
              img: "/static/ybcp/img/thirdparty/fg.png",
              num: "10020"
            }
          ]
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          type:'lottery',
          platform: "vr_lottery",
          link: "/plays/hall"
          
        },
        {
          name: "捕鱼达人",
          text: "FISH",
          link: "/home/fish?navid=9&id=0"
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
          type: "service"
        }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
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
  },
  mounted() {
    let allGame = this.$getObjByLocalStorage(`live_game_new`);
    this.classifyList[1].sub = allGame;
    this.classifyList[1].sub.forEach(arr => {
      switch (arr.id) {
        case 31:
            arr.icon = ag;
            break;
          case 32:
            arr.icon = bb;
            break;
          case 3180:
            arr.icon = bg;
            break;
          case 42:
            arr.icon = dg;
            break;
          case 34:
            arr.icon = ds;
            break;
          case 48:
            arr.icon = og;
            break;
          case 43:
            arr.icon = ebet;
            break;
          case 30:
            arr.icon = vr;
            break;
          case 12033:
            arr.icon = mg;
            break;  
          case 11543:
            arr.icon = pt;
            break;  
          case 11758:
            arr.icon = eov;
            break;
          case 12035:
            arr.icon = wm;
            break;
      }
      
    });
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
        cursor: -webkit-pointer;
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
          // position: absolute;
          // top: -5px;
          // left: 18px;
          // line-height: 30px;
          display: block;
          font-size: 14px;
        }

        .x-dh-b {
          // position: absolute;
          // line-height: 30px;
          font-size: 14px;
          white-space: nowrap;
          // top: 14px;
          // left: -2px;
          // width: 100%;
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
