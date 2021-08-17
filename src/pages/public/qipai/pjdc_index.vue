<template>
  <div class="qipaiWrap" :class="{night:colorbool}">
    <vp-header-pic :headerImg="headerImg"></vp-header-pic>
    <div class="chessGame-content">
      <div class="game-list">
        <!-- 导航栏 -->
        <dl class="js-list-items list-item">
          <dd
            v-for="(item,index) in qipaidata"
            :key="index"
            @click="changgeme(item,index)"
            :class="[{active:item.id==$route.query.id && $route.query.id!=0},{firstdd1:index==0 && $route.query.id!=0},{firstdd:$route.query.id==0&&index==0}]"
          >
            <p :class="item.newclass"></p>
            {{item.name}}
          </dd>
        </dl>

        <div class="game-box">
          <div class="game-content">
            <ul>
              <li class="game-item" :key="index" v-for="(item,index) in gameData">
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
                  <a href="javascript:void(0)" class="playBtn" @click="loginGame(item)">进入游戏</a>
                </div>
              </li>
            </ul>
          </div>
          <!-- <ul class="pagenation" v-show="total>1">
            <li>
              <a href="javascript:;" @click="firstpage()">首页</a>
            </li>
            <li>
              <a href="javascript:;" @click="prevpage()">上一页</a>
            </li>
            <li>
              <a href="javascript:;">当前：{{pageDatas.page}}</a>
            </li>
            <li>
              <a href="javascript:;" @click="nextpage()">下一页</a>
            </li>
            <li>
              <a href="javascript:;" @click="lastpage()">尾页</a>
            </li>
            <li>
              <a href="javascript:;">共{{total}}页</a>
            </li>
          </ul> -->
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
  data() {
    return {
      showGames: [],
      clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      headerImg: "/static/vnst/img/dz.jpg",
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
    // 根据id,分配展示数据
    giveDataById(gid) {
      // 分类要展示的所有数据
      if (gid == 0) {
        // 默认值
        this.showGames = this.DefaultGameData;
      } else {
        // id不为0
        let id = gid || this.$route.query.id || "10041";
        Object.keys(this.allGameData).forEach(v => {
          if (v == id) {
            this.showGames = this.allGameData[v];
          }
        });
      }
      // 实际展示用的
      this.gameData = this.showGames
      this.pageDatas.page = 1;
      this.total = Math.ceil(this.showGames.length / 20);
    },
    // 分页数量
    fenshu() {
      this.gameData = this.getPageCurData(
        this.showGames,
        20,
        this.pageDatas.page
      );
    },

    getPageCurData(date, PageSize, PageNo) {
      this.data = [];
      for (let i = 0; i < PageSize; i++) {
        let idx = PageSize * PageNo - PageSize + i;
        if (idx < date.length) this.data.push(date[idx]);
      }
      return this.data;
    },

    async search() {
      this.pageDatas.page = 1;
      let gameList = [];

      gameList = this.showGames.filter(item => {
        if (item.name.includes(this.iptVal)) {
          return item;
        }
      });
      this.gameData = gameList
    },

    //下一页
    async nextpage() {
      if (this.pageDatas.page < this.total) {
        this.pageDatas.page = this.pageDatas.page + 1;
        // this.fenshu();
        // this.getData();
      }
    },

    //上一页
    async prevpage() {
      if (this.pageDatas.page > 1) {
        this.pageDatas.page = this.pageDatas.page - 1;
        // this.fenshu();
        // this.getData();
      }
    },

    //第一页
    async firstpage() {
      this.pageDatas.page = 1;
      // this.fenshu();
      // this.getData();
    },

    //最后一页
    async lastpage() {
      this.pageDatas.page = this.total;
      // this.fenshu();
      // this.getData();
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
    if (this.clientwidth > 1920) {
      this.picBox = (400 * this.clientwidth) / 1920;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    // 获取数据
    this.getAllDatas();
  },
  watch: {
    $route() {
      // this.giveDataById()
      this.getAllDatas();
      document.documentElement.scrollTop = this.scrollTop;
    },
    clientwidth(val) {
      this.clientwidth = val;
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
  // background: #eaeaea url('/static/public/image/game/ptgame/main-bg.png') top center no-repeat;
  // background: #1e1e1e;
  background-size: 100% 100%;
  margin: 0 auto;

  .picBox {
    display: none;
  }
  .chessGame-content {
    padding-top: 24px;
    width: 1200px;
    min-height: 300px;
    margin: 0 auto;
    background: #272727;
    .game-list {
      .js-list-items {
        padding: 10px 0 10px 5px;
        margin: 0 0 15px;
        dd {
          display: inline-block;
          vertical-align: top;
          height: 104px;
          width: 140px;
          margin-left: 15px;
          padding-top: 15px;
          border-radius: 17px;
          background: #383838;
          text-align: center;
          font-size: 16px;
          color: rgb(143, 143, 143);
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -o-transition: all 0.2s;
          transition: all 0.2s;

          &.firstdd1 {
            background: url("/static/public/image/casino/hot.jpg") no-repeat
              center center;
            &:hover {
              background: url("/static/public/image/casino/hot-hover.jpg")
                no-repeat center center;
            }

            p {
              display: none;
            }
            line-height: 28px;
            margin-left: 0;
          }
          &.firstdd {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            background: url("/static/public/image/casino/hot-hover.jpg")
              no-repeat center center;
            margin-left: 0;
            &:hover {
              background: url("/static/public/image/casino/hot-hover.jpg")
                no-repeat center center;
            }
          }

          &:hover {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            font-size: 16px;
            color: #fff;
            background: linear-gradient(
              to bottom right,
              rgb(241, 211, 94),
              rgb(172, 130, 27)
            );
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

          &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(rgb(241, 211, 94), rgb(172, 130, 27));
            color: #fff;
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
        }

        .hot {
          padding-top: 0;
          line-height: 120px;
          text-align: center;
          font-size: 20px;
          color: #f44336;
        }
        .active {
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
          font-size: 16px;
          color: #fff;
          background: linear-gradient(
            to bottom right,
            rgb(241, 211, 94),
            rgb(172, 130, 27)
          );
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
        }
      }

      .search-container {
        padding: 10px;
        border-radius: 10px;
        background: #383838;
        clear: both;
        zoom: 1;
        overflow: hidden;

        .search-info {
          width: 880px;
          padding: 10px 0 10px 50px;

          .search-head {
            clear: both;
            zoom: 1;
            overflow: hidden;

            .bg-search {
              width: 26px;
              height: 26px;
              margin-right: 7px;
              display: inline-block;
              vertical-align: middle;
              background: url("http://betsb.3000018.com/game/img/slot_sprites.png") -63px -185px;
            }

            .label {
              display: inline-block;
              vertical-align: middle;
              color: #b48c68;
              text-align: left;
              font-size: 18px;
              font-weight: 600;
              padding: 0.2em 0.6em 0.3em;
              line-height: 1;
            }

            .ipt-group {
              position: relative;
              display: inline-block;
              width: 295px;
              height: 40px;
              border-radius: 5px;
              border: 1px solid #979797;
              vertical-align: middle;
              box-sizing: border-box;

              .ipt {
                border: none;
                width: 100%;
                padding: 0 10px;
                height: 100%;
                line-height: 40px;
                color: #c1c1c1;
                background-color: transparent;
                outline: none;
              }
            }

            .btn-search {
              outline: none;
              width: 112px;
              height: 40px;
              border: none;
              border-radius: 7px;
              vertical-align: middle;
              font-size: 16px;
              color: #fff;
              vertical-align: middle;
              background: linear-gradient(to bottom right, #f1d35e, #ac821b);
              cursor: pointer;
              margin-left: 20px;

              .search_icon {
                width: 16px;
                height: 16px;
                display: inline-block;
                background: url("/static/public/image/youyi/sousuo.png")
                  no-repeat center center;
                background-size: 100% 100%;
                white-space: nowrap;
                letter-spacing: -1em;
                text-indent: -99em;
                color: transparent;
                &:after {
                  /* 伪元素插入空格文本 */
                  content: "\3000";
                }
              }
            }
          }

          .search-detail {
            margin-top: 10px;
            overflow: hidden;

            .search-type {
              .search-game {
                height: 38px;
                line-height: 38px;
                font: 14px/1.6 tahoma, arial, "Microsoft YaHei", sans-serif;

                dt {
                  margin-right: 12px;
                  color: #c5c5c5;
                  display: inline-block;
                  vertical-align: middle;
                  line-height: 15px;

                  .gicon1 {
                    background: url("/static/vnst/img/image/youyi/game_type.png")
                      no-repeat center center;
                  }
                  .gicon2 {
                    background: url("/static/vnst/img/image/youyi/money.png")
                      no-repeat center center;
                  }
                  .gicon3 {
                    background: url("/static/vnst/img/image/youyi/fengge.png")
                      no-repeat center center;
                  }

                  .gicon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    background-size: 100% 100%;
                    white-space: nowrap;
                    letter-spacing: -1em;
                    text-indent: -99em;
                    color: transparent;
                    margin-right: 10px;
                    &:after {
                      /* 伪元素插入空格文本 */
                      content: "\3000";
                    }
                  }
                }

                dd {
                  display: inline-block;
                  vertical-align: middle;

                  a {
                    display: inline-block;
                    margin: 5px 20px 5px 0;
                    line-height: 28px;
                    color: #8f8f8f;
                    text-decoration: none;
                    text-align: center;
                  }

                  .active {
                    background: #ffd100;
                    color: #000;
                    padding: 0 12px;
                    border-radius: 14px;
                  }
                }
              }
            }
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
            // padding-bottom: 10px;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            color: #c1c1c1;
            text-align: left;
            transition: all 0.3s;
            background: #383838;
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
              color: #c3c3c3;
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
              opacity: 0.5;
              transition: all linear 0.3s;
            }
            .goGamebtn {
              display: none;
              transition: all linear 0.3s;
              .playBtn {
                position: absolute;
                top: 50%;
                left: 50%;
                color: #333;
                width: 110px;
                height: 35px;
                line-height: 35px;
                transform: translate(-50%, -50%);
                background: #ffd100;
                font-size: 16px;
                cursor: pointer;
                text-align: center;
                -webkit-border-radius: 6px;
                border-radius: 6px;
                &:hover {
                  background: #ffe366;
                }
              }
            }
          }
        }

        .pagenation {
          height: 30px;
          text-align: center;
          box-sizing: border-box;
          transform: translate(0, 15px);

          li {
            display: inline;
            padding: 6px 12px;
            border-radius: 3px;
            background: #444;

            a {
              color: #b2b2b2;
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
