<template>
  <div class="qipaiWrap" :class="{night:colorbool}">
    <div class="chessGame-content">
      <div class="game-list">
        <!-- 导航栏 -->
        <dl class="js-list-items list-item">
          <dd
            class="blueitem"
            v-for="(item,index) in qipaidata"
            :key="index"
            @click="changgeme(item,index)"
            :class="[theme,{active:item.id==$route.query.id && $route.query.id!=0},
            {firstdd1:index==0 && $route.query.id!=0},
            {firstdd:$route.query.id==0&&index==0},
            {bluebgColor:item.id==$route.query.id && $route.query.id!=0}
            ]"
          >
            <p :class="item.newclass"></p>
            {{item.name}}
          </dd>
        </dl>
        <div class="game-box">
          <div class="game-content">
            <ul>
              <li :class="['game-item',sportAnimated,bgColor]" :key="index" v-for="(item,index) in gameData">
                <div class="game-pic">
                  <img
                    v-lazy="item.icon"
                    :class="{'default':true,'mg-pic':$route.query.id==='26'}"
                    alt
                  />
                </div>
                <h3>{{item.name}}</h3>
                <div class="bgcover"></div>
                <div class="goGamebtn">
                  <a :class="[theme,'playBtn']" @click="$loginGame(item)">进入游戏</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _SetGet, _SetPost } from "@/service/public/service.js";
import vpHeaderPic from "./headerPic";
import data from "@/pages/public/games/public.js";

export default {
  mixins: [data],
  props: {
    theme: {
      type: String,
      default: () => {
        return "red";
      }
    },
    bgColor: {
      type: String,
      default: () => {
        return "purpleBg";
      }
    }
  },
  data() {
    return {
      showGames: [],
      sportAnimated: "animated fadeInDown",
      scrollDatas: [],
      jackpotNum1: 41318571943,
      jackpotNum2: 12961370,
      publicUrl: "http://img.7900005.com/",
      currenttype: "",
      currentline: "",
      gameIndex: 0,
      picBox: "",
      currentTag: "",
      gameData: [],
      offsetHeight: 100,
      total: "",
      iptVal: "",
      pageDatas: {
        page: 1
      },
      Public_User: localStorage.Public_User,
      idlist: [],
      nowTypeList: {
        type: { list: [] },
        line: { list: [] },
        thirt: { list: [] }
      },
      setInter: null,
      scrollTop: null,
      qipaiitem: {},
      qipaidata: [
        {
          id: 0,
          name: "",
          class: ""
        }
      ],
      DefaultGameData: [
        {
          id: 245,
          name: "抢庄牛牛",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/245.png"
        },
        {
          id: 3618,
          name: "斗地主",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/3618.png"
        },
        {
          id: 246,
          name: "炸金花",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/246.png"
        },
        {
          id: 251,
          name: "21点",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/251.png"
        },
        {
          id: 3624,
          name: "加倍斗地主",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/3624.png"
        },
        {
          id: 248,
          name: "二八杠",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/248.png"
        },
        {
          id: 3605,
          name: "百人牛牛",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/3605.png"
        },
        {
          id: 247,
          name: "德州扑克",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/247.png"
        },
        {
          id: 3626,
          name: "血战麻将",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/3626.png"
        },
        {
          id: 256,
          name: "十三水",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/256.png"
        },
        {
          id: 250,
          name: "押庄龙虎",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/250.png"
        },
        {
          id: 252,
          name: "通比牛牛",
          lock: 0,
          icon: "https://static.k0061.com/images/default/pc/252.png"
        }
      ]
    };
  },
  methods: {
    //获取数据
    async getData(item) {
      this.gameData = [];
      let idArr = this.idlist;
      // 所有请求,获取到所有的数据
      let gameId = idArr.join("|");
      let res2 = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
        id: gameId,
        device: "pc"
      });
      if (res2 && res2.code == 200) {
        this.isloading = false;
        this.allGameData = res2.data;
        sessionStorage.setItem("qipaiGames", JSON.stringify(this.allGameData));
        let id = this.$route.query.id;
        this.giveDataById(id);
      } else {
        this.isloading = true;
      }
    },
    giveDataById(gid) {
      if (gid == 0) {
        this.showGames = this.DefaultGameData;
      } else {
        let id = gid || this.$route.query.id || "10041";
        Object.keys(this.allGameData).forEach(v => {
          if (v == id) {
            this.showGames = this.allGameData[v];
          }
        });
      }
      this.gameData = this.showGames;
    },
    //搜索
    async search() {
      let gameList = [];
      gameList = this.showGames.filter(item => {
        if (item.name.includes(this.iptVal)) {
          return item;
        }
      });
      this.gameData = gameList;
    },
    //数据来源
    getAllDatas() {
      if (sessionStorage.qipaiGames) {
        this.allGameData = JSON.parse(sessionStorage.qipaiGames);
        let id = this.$route.query.id;
        this.giveDataById(id);
      } else {
        this.getData();
        return false;
      }
    },
    // 点击导航栏
    async changgeme(item, index) {
      this.gameIndex = index;
      this.sportAnimated = "";
      this.$router.push({
        path: `/home/qipai`,
        query: {
          id: item.id,
          name: item.name
        }
      });
      this.giveDataById(item.id);
    },

    async getDataQpai2() {
      this.idlist = [];
      if (sessionStorage.qipai) {
        let qipai = JSON.parse(sessionStorage.qipai);
        qipai.forEach(item => {
          this.idlist.push(item.id);
        });
        this.getAllDatas();
      } else {
        let id = "10004";
        let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
          id,
          device: "pc"
        });
        if (res && res.code == 200) {
          sessionStorage.setItem("qipai", JSON.stringify(res.data[10004]));
          res.data[10004].forEach(item => {
            this.idlist.push(item.id);
          });
          this.getAllDatas();
        }
      }
      this.idlist.forEach(item => {
        switch (item) {
          case 10042:
            this.qipaiitem = {
              id: 10042,
              name: "开元棋牌",
              class: "ky",
              newclass: "game_ky",
              path: "/home?id=10042&name=开元棋牌",
              img: "/static/public/image/game/ptgame/gameky.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 10041:
            this.qipaiitem = {
              id: 10041,
              name: "VG棋牌",
              class: "vg",
              newclass: "game_vg",
              path: "/home?id=10041&name=VG棋牌",
              img: "/static/public/image/game/ptgame/VG_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 10612:
            this.qipaiitem = {
              id: 10612,
              name: "乐游棋牌",
              class: "ly",
              newclass: "game_ly",
              path: "/home?id=10612&name=乐游棋牌",
              img: "/static/public/image/game/ptgame/ly_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 10636:
            this.qipaiitem = {
              id: 10636,
              name: "大战棋牌",
              class: "dz",
              newclass: "game_dz",
              path: "/home?id=10636&name=大战棋牌",
              img: "/static/public/image/game/ptgame/dz_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 10694:
            this.qipaiitem = {
              id: 10694,
              name: "天游棋牌",
              class: "th",
              newclass: "game_th",
              path: "/home?id=10694&name=天游棋牌",
              img: "/static/public/image/game/ptgame/th_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 10732:
            this.qipaiitem = {
              id: 10732,
              name: "FG棋牌",
              class: "fg",
              newclass: "game_fg",
              path: "/home?id=10732&name=FG棋牌",
              img: "/static/public/image/game/ptgame/fg_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 11759:
            this.qipaiitem = {
              id: 11759,
              name: "大富翁棋牌",
              class: "dfw",
              newclass: "game_dfw",
              path: "/home?id=11759&name=大富翁棋牌",
              img: "/static/public/image/game/ptgame/dfw_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 11755:
            this.qipaiitem = {
              id: 11775,
              name: "美天棋牌",
              class: "mt",
              newclass: "game_mt",
              path: "/home?id=11755&name=美天棋牌",
              img: "/static/public/image/game/ptgame/mt_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 11828:
            this.qipaiitem = {
              id: 11828,
              name: "凯旋棋牌",
              class: "lc",
              newclass: "game_lc",
              path: "/home?id=11828&name=凯旋棋牌",
              img: "/static/public/image/game/ptgame/lc_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 11857:
            this.qipaiitem = {
              id: 11857,
              name: "新世界棋牌",
              class: "xsj",
              newclass: "game_xsj",
              path: "/home?id=11857&name=新世界棋牌",
              img: "/static/public/image/game/ptgame/xsj_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
          case 11881:
            this.qipaiitem = {
              id: 11881,
              name: "AK棋牌",
              class: "ak",
              newclass: "game_ak",
              path: "/home?id=10732&name=FG棋牌",
              img: "/static/public/image/game/ptgame/ak_CHESS.png"
            };
            this.qipaidata.push(this.qipaiitem);
            break;
        }
      });
    },
    //监听滚动事件
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    }
  },
  created: function() {
    this.getDataQpai2();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    this.getAllDatas();
  },
  watch: {
    $route() {
      this.getAllDatas();
      document.documentElement.scrollTop = this.scrollTop;
    }
  },
  components: {
    vpHeaderPic
  },
  computed: {
    colorbool() {
      return this.$store.state.mainState.color;
    }
  }
};
</script>

<style lang="less" scoped>
.qipaiWrap {
  background-size: 100% 100%;
  margin: 0 auto;
  .picBox {
    display: none;
  }
  .chessGame-content {
    width: 1200px;
    min-height: 300px;
    margin: 0 auto;
    .game-list {
      .js-list-items {
        margin: 30px 0;
        dd {
          display: inline-block;
          vertical-align: top;
          height: 102px;
          width: 135px;
          margin-right: 11px;
          padding-top: 10px;
          margin-bottom:15px;
          border-radius: 10px;
          text-align: center;
          font-size: 16px;
          color: #151515;
          // color: #fff;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -o-transition: all 0.2s;
          transition: all 0.2s;
          background: #ffffff;
          background-size: 100% 100%;
          &:hover {
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            font-size: 16px;
            color:#151515;
          }
          p {
            width: 111px;
            height: 43px;
            margin: 0 auto 10px;
          }
          .game_ky {
            background: url("/static/public/image/casino/ky-vnst.png") no-repeat
              center center;
          }
          .game_ly {
            background: url("/static/public/image/casino/ly-vnst.png") no-repeat
              center center;
          }
          .game_dz {
            background: url("/static/public/image/game/ptgame/dz-qygj.png")
              no-repeat center center;
          }
          .game_vg {
            background: url("/static/public/image/casino/vg-vnst.png") no-repeat
              center center;
          }
          .game_fg {
            background: url("/static/public/image/game/ptgame/fg-qygj.png")
              no-repeat center center;
          }
          .game_th {
            background: url("/static/public/image/game/ptgame/th-qygj.png")
              no-repeat center center;
          }
          .game_mt {
            background: url("/static/public/image/game/ptgame/mt_CHESS.png")
              no-repeat center center;
          }
          .game_xsj {
            background: url("/static/public/image/game/ptgame/xsj_CHESS.png") no-repeat
              center center;
          }
          .game_lc {
            background: url("/static/public/image/game/ptgame/lc_CHESS.png")
              no-repeat center center;
          }
          .game_ak {
            background: url("/static/public/image/game/ptgame/ak_CHESS.png")
              no-repeat center center;
          }
          .game_dfw {
            background: url("/static/public/image/game/ptgame/dfw_CHESS.png")
              no-repeat center center;
          }
          &:hover .game_ky {
            background: url("/static/public/image/casino/ky-hover.png")
              no-repeat center center;
          }
          &:hover .game_ly {
            background: url("/static/public/image/casino/ly-hover.png")
              no-repeat center center;
          }
          &:hover .game_dz {
            background: url("/static/public/image/game/ptgame/dz-qy-hover.png")
              no-repeat center center;
          }
          &:hover .game_vg {
            background: url("/static/public/image/casino/vg-hover.png")
              no-repeat center center;
          }
          &:hover .game_fg {
            background: url("/static/public/image/game/ptgame/FG_icon.png")
              no-repeat center center;
          }
          &:hover .game_th {
            background: url("/static/public/image/game/ptgame/th-qy-hover.png")
              no-repeat center center;
          }

          &:hover .game_mt {
            background: url("/static/public/image/game/ptgame/mt_CHESS_hover.png")
              no-repeat center center;
          }
          &:hover .game_ak {
            background: url("/static/public/image/game/ptgame/ak_CHESS_hover.png")
              no-repeat center center;
          }
          &:hover .game_xsj {
            background: url("/static/public/image/game/ptgame/xsj_CHESS_hover.png")
              no-repeat center center;
          }
          &:hover .game_lc {
            background: url("/static/public/image/game/ptgame/lc_CHESS_hover.png")
              no-repeat center center;
          }
          &:hover .game_dfw {
            background: url("/static/public/image/game/ptgame/dfw_CHESS_hover.png")
              no-repeat center center;
          }
        }
        .purple {
          background: #2C3966;
          color: #fff;
          
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(44, 57, 102, 1),
              rgb(115, 133, 189)
            );
            color: #fff;
          }
          &.firstdd1 {
            background-size: 100% 100%;
            background: url("/static/public/image/game_pic/vg-hot.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/game_pic/vg-hoverhot.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            
          }
          &.firstdd {
            background: url("/static/public/image/game_pic/vg-hoverhot.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(44, 57, 102, 1),
              rgb(115, 133, 189)
            );
          }
        }
        .blue {
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(81, 177, 231, 1),
              rgba(98, 219, 242, 1)
            );
            color: #fff;
          }
          &.firstdd1 {
            background-size: 100% 100%;
            background: url("/static/public/image/casino/blue_image/hot_bg.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/hot_bg1.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/hot_bg1.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(81, 177, 231, 1),
              rgba(98, 219, 242, 1)
            );
          }
        }
        .red,.red2,.red3,.red4 {
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            color: #fff;
          }
          &.firstdd1 {
            background-size: 100% 100%;
            background: url("/static/public/image/casino/blue_image/red.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/red_bg.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/red_bg.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
          }
        }
        .red5 {
          background-color: #6d1919!important;
          color: #fff;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            color: #fff;
          }
          &.firstdd1 {
            background-size: 100% 100%;
            background: url("/static/public/image/casino/blue_image/qmcp_hot.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/red_bg.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/red_bg.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
          }
        }
        .black{
          background: rgba(48, 47, 50, 1);
          color: #ffffff;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(247, 27, 44, 1),
              rgba(253, 136, 121, 1)
            );
            color: #fff;
          }
          &.firstdd1 {
            
            background: url("/static/public/image/casino/blue_image/ecp_hot.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/red_bg.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/red_bg.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(247, 27, 44, 1),
              rgba(225, 99, 83, 1)
            );
          }
        }
        .darkRed {
          background: #fff;
          color: #000;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            
          }
          &:hover{
            color: #fff;
          }
          &.firstdd1 {
            background: url("/static/public/image/casino/blue_image/red.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/red.png")
                no-repeat center center;
              // background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            // background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/qmcp_active.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            // background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            color: #fff;
          }
        }
        .darkRed2 {
          background: #6d1919;
          color: #fff;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            
          }
          &:hover{
            color: #fff;
          }
          &.firstdd1 {
            background: url("/static/public/image/casino/blue_image/qmcp_hot.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/qmcp_hot.png")
                no-repeat center center;
              // background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            // background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/qmcp_active.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            // background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgba(253, 144, 128, 1),
              rgba(247, 27, 44, 1)
            );
            color: #fff;
          }
        }
        .lightPurple {
          background: #2A2851;
          color: #fff;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(
              rgb(81, 64, 141, 1),
              rgb(114, 85, 152, 1)
            );
            // background: #2C3966;
            
          }
          &.firstdd1 {
            
            background: url("/static/public/image/game_pic/sjhot_bj.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/game_pic/sjactive.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/game_pic/sjactive.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(
              23deg,
              rgb(81, 64, 141, 1),
              rgb(114, 85, 152, 1)
            );
            // background: #2C3966;
          }
        }
        .darkPurple{
          background: #ffffff;
          color:  #000;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
            color: #fff;
          }
          &.firstdd1 {
            background: url("/static/public/image/casino/blue_image/jx_hot.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/jx_hot.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/jxactive.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221))
          }
        }
        .skyBlue{
          background: #ffffff;
          color:  #000;
          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(23deg,#51b1e7,#62dbf2);
            color: #fff;
          }
          &.firstdd1 {
            background: url("/static/public/image/casino/blue_image/hot_bg.png")
              no-repeat center center;
            &:hover {
              background: url("/static/public/image/casino/blue_image/hot_bg1.png")
                no-repeat center center;
              background-size: 100% 100%;
            }
            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
            background-size: 100% 100%;
          }
          &.firstdd {
            background: url("/static/public/image/casino/blue_image/hot_bg1.png")
              no-repeat center center;
            -webkit-transform: scale(1.05);
            -ms-transform: scale(1.05);
            transform: scale(1.05);
            background-size: 100% 100%;
            margin-left: 0;
          }
          &.bluebgColor {
            background: linear-gradient(23deg,#62dbf2,#51b1e7)
          }
        }
        .active {
          -webkit-transform: scale(1.05);
          -ms-transform: scale(1.05);
          transform: scale(1.05);
          font-size: 16px;
          color: #fff;

          .game_ky {
            background: url("/static/public/image/game/ptgame/ky-qy-hover.png");
          }
          .game_ly {
            background: url("/static/public/image/game/ptgame/ly-qy-hover.png");
          }
          .game_dz {
            background: url("/static/public/image/game/ptgame/dz-qy-hover.png");
          }
          .game_vg {
            background: url("/static/public/image/game/ptgame/vg-qy-hover.png");
          }
          .game_fg {
            background: url("/static/public/image/game/ptgame/FG_icon.png");
          }
          .game_th {
            background: url("/static/public/image/game/ptgame/th-qy-hover.png")
              no-repeat center center;
          }
          .game_mt {
            background: url("/static/public/image/game/ptgame/mt_CHESS_hover.png")
              no-repeat center center;
          }
          .game_ak {
            background: url("/static/public/image/game/ptgame/ak_CHESS_hover.png")
              no-repeat center center;
          }
          .game_xsj {
            background: url("/static/public/image/game/ptgame/xsj_CHESS_hover.png")
              no-repeat center center;
          }
          .game_lc {
            background: url("/static/public/image/game/ptgame/lc_CHESS_hover.png")
              no-repeat center center;
          }
          .game_dfw {
            background: url("/static/public/image/game/ptgame/dfw_CHESS_hover.png")
              no-repeat center center;
          }
        }

      }
      .game-box {
        margin: 0 auto;
        .game-content {
          width: 1260px;
          min-height: 680px;
          position: relative;
          margin-left: -15px;
          overflow: auto;
          padding-top: 3px;
          &::-webkit-scrollbar {
            display: none;
          }
          ul {
            margin: 0 15px;
          }
          .game-item {
            float: left;
            width: 224px;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            text-align: left;
            transition: all 0.3s;
            border-radius: 10px;
            overflow: hidden;
            text-align: center;
            transition: opacityfun ease 0.6s;
            &:hover {
              transition: all 0.4s;
              transform: translateY(-3px);
              .bgcover,
              .goGamebtn {
                display: block;
              }
            }
            .game-pic {
              position: relative;
              width: 100%;
              height: 224px;
              overflow: hidden;

              .default {
                width: 224px;
                height: 224px;
              }

              .mg-pic {
                width: 200%;

                &:hover {
                  transform: translateX(-50%);
                }
              }
            }

            h3 {
              font-size: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 12px 0;
            }

            .bgcover {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              background: #000;
              opacity: 0.4;
              transition: all linear 0.3s;
            }
            .goGamebtn {
              display: none;
              transition: all linear 0.3s;
              .playBtn {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 110px;
                height: 35px;
                line-height: 35px;
                transform: translate(-50%, -50%);
                font-size: 16px;
                cursor: pointer;
                text-align: center;
                -webkit-border-radius: 6px;
                border-radius: 6px;
              }
              
            }
          }
          .purpleBg {
            background:#182043FF;
            color:#FFFFFFFF;
            box-shadow:0px 4px 5px 0px rgba(0, 0, 0, 0.15);
            h3 {
              color: #FFFFFFFF;
            }
            .goGamebtn {
              .playBtn {
                color: #333;
                background: #ffd100;

              &:hover {
                  background: #ffe366;
                }
              }
            }
          }
          .whiteBg {
            background: #ffffff;
            color: #343536;
            h3 {
              color: #252525;
            }
            .goGamebtn {
              .playBtn {
                color: #333;
                background: #ffd100;

              &:hover {
                  background: #ffe366;
                }
              }
              .darkRed.playBtn{
                background: linear-gradient(23deg,#f71b2c,#fd9080);
                color: #fff;
                &:hover {
                  background: linear-gradient(23deg,#fd9080,#f71b2c);
                }
              }
            }
          }
          .blackBg {
            background: #312F32;
            color: #fff;
            h3 {
              color: #fff;
            }
            .goGamebtn {
              .playBtn {
                color: #fff;
                background: #DF3C38;

              &:hover {
                  background: #DF3C38;
                }
              }
            }
          }
          .redBg {
            background: #6D1919;
            color: #fff;
            h3 {
              color: #fff;
            }
            .goGamebtn {
              .playBtn {
                color: #fff;
                background: #E4393C;

              &:hover {
                  background: #E4393C;
                }
              }
            }
          }
          .lightPurpleBg{
            background: #2A2851;
            color: #fff;
            h3 {
              color: #fff;
            }
            .goGamebtn {
              .playBtn {
                color: #000000;
                background: #FDE901;

              &:hover {
                  background: #FDE901;
                }
              }
            }
          }
          
        }
      }
    }
  }
}
.night {
  background: rgba(18, 21, 66, 0.8);
}

@keyframes opacityfun {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
