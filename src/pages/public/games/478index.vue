<template>
  <div id="maincontnew" style="margin-top:30px">
    <div class="mainContent">
      <div ref="search-container" class="search-container">
        <div class="search-head">
            <div class="left">
              <div class="ipt-group">
                <input v-model="iptVal" class="ipt" placeholder="请输入游戏名称" autocomplete="off" @keyup.enter="search()">
                <div class="searchbox" @click="search()">
                </div> 
              </div>
            </div>
        </div>
        <div class="search-info">
          <div class="search-detail">
            <div class="search-type">
              <ul class="gameType clear">
                 <li v-for="(item,index) in rollList" :key="index" class="lf gameName" @click="fetchgames(item)" :class="[{'active':$route.query.id===item.id},item.class]"><a href="javascript:;">{{item.name}}</a></li>
                 <span class="allGame">全部游戏：</span>
              </ul>
              <div v-if="nowTypeList.type.list.length">
                <dl class="search-game top">
                    <dt>游戏类型：</dt>
                    <dd>
                    <a
                        href="javascript:;"
                        @click="resulttype(item)"
                        :key="index"
                        :class="{'active':item.tag===currenttype}"
                        v-for="(item,index) in  nowTypeList.type.list"
                    >{{item.name}}</a>
                    </dd>
                </dl>
                <dl v-if="nowTypeList.line.list.length" class="search-game bottom">
                    <dt>赔钱线数：</dt>
                    <dd>
                    <a
                        href="javascript:;"
                        @click="resultline(item)"
                        :key="index"
                        :class="{'active':item.tag===currentline}"
                        v-for="(item,index) in nowTypeList.line.list"
                    >{{item.name}}</a>
                    </dd>
                </dl>
                <dl v-if="nowTypeList.thirt.list.length" class="search-game bottom">
                    <dt>游戏风格：</dt>
                    <dd>
                    <a
                        href="javascript:;"
                        @click="resultTag(item)"
                        :key="index"
                        :class="{'active':item.tag===currentTag}"
                        v-for="(item,index) in nowTypeList.thirt.list"
                    >{{item.name}}</a>
                    </dd>
                </dl>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div class="game-box">
        <div class="game-content">
          <ul>
            <li class="game-item" :key="index" v-for="(item,index) in gameData">
              <div class="game-pic">
                <img
                  v-lazy="item.icon"
                  :class="{'default':true,'mg-pic':$route.query.id==='10022'}"
                  alt
                >
              </div>
              <div class="game-mask"></div>
              <div class="gameMask">
                <p class="gameItemName">{{item.name}}</p>
                <div class="collectImg"></div>
              </div>
              <div class="bgcover">
                 
              </div>
              <div class="goGamebtn">
                    <a
                        v-show="Public_User!=='test'"
                        href="javascript:void(0)"
                        class="play"
                        @click="loginGame(item)"
                    >进入游戏</a> 
              </div>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _SetGet, _SetPost } from "@/service/public/service.js";
import mixin from "./public.js";

export default {
  mixins: [mixin],
  data() {
    return {
      showGames: [],
      random: [],
      scrollDatas: [],
      jackpotNum1: 41318571943,
      jackpotNum2: 12961370,
      publicUrl: "http://img.7900005.com/",
      currenttype: "",
      currentline: "",
      currentTag: "",
      gameData: [],
      offsetHeight: 100,
      total: "",
      iptVal: "",
      pageDatas: {
        page: 1
      },
      idlist: [],
      rollList: [],
      nowTypeList: {
        type: { list: [] },
        line: { list: [] },
        thirt: { list: [] }
      },
      setInter: null
    };
  },
  methods: {
    //获取数据
    async getData(item) {
      this.gameData = [];
      let idArr = this.idlist;
      let id = this.$route.query.id;
      // 首次加载获取，第一页数据
      let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
        id,
        device: "pc"
      });
      if (res && res.code === 200) {
        this.showGames = res.data[id];
        this.gameData = this.showGames
      }
      // 所有请求,获取到所有的数据
      let gameId = idArr.join("|");
      let res2 = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
        id: gameId,
        device: "pc"
      });
      if (res2 && res2.code == 200) {
        this.allGameData = res2.data;
        sessionStorage.setItem("allgames", JSON.stringify(this.allGameData));
      }
      this.getAllDatas();
    },
    // 根据id,分配展示数据
    giveDataById(gid) {
      let id = gid || this.$route.query.id || "10022";
      Object.keys(this.allGameData).forEach(v => {
        if (v == id) {
          this.showGames = this.allGameData[v];
        }
      });
      this.gameData = this.showGames
      this.pageDatas.page = 1;
      this.total = Math.ceil(this.showGames.length / 20);
    },
    //数据来源
    getAllDatas() {
      if (sessionStorage.allgames) {
        this.allGameData = JSON.parse(sessionStorage.allgames);
        let id = this.$route.query.id;
        this.giveDataById(id);
        
      } else {
        this.getData();
        return false;
      }
    },
    //点击导航栏
    async fetchgames(item) {
      let scrollTop = document.documentElement.scrollTop;
      this.$router.push({
        path: `/home/games`,
        query: {
          id: item.id,
          name: item.name
        }
      });
      window.scrollTo(0, scrollTop);
      this.nowTypeList.type.list = item.type.list;
      this.nowTypeList.line.list = item.line.list;
      if (item.thirt) {
        this.nowTypeList.thirt.list = item.thirt.list;
      } else {
        this.nowTypeList.thirt.list = [];
      }
      this.clear();
      this.giveDataById();
      this.$nextTick(() => {
        this.offsetHeight =
          this.$refs["search-container"].offsetHeight < 100
            ? 100
            : this.$refs["search-container"].offsetHeight;
      });
    },
    resulttype(item) {
      this.currenttype = item.tag;
      this.fengame();
    },
    resultline(item) {
      this.currentline = item.tag;
      this.fengame();
    },
    resultTag(item) {
      this.currentTag = item.tag;
      this.fengame();
    },
    fengame() {
      let datas = [];
      datas = this.showGames.filter(item => {
        let flag = true;
        flag = flag && item.tag.includes(this.currenttype) ? true : false;
        flag = flag && item.tag.includes(this.currentline) ? true : false;
        flag = flag && item.tag.includes(this.currentTag) ? true : false;
        if (flag) {
          return item;
        }
      });
      this.gameData = datas
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
    async clear() {
      this.iptVal = "";
      this.currenttype = "";
      this.currentline = "";
      this.currentTag = "";
      this.pageDatas.page = 1;
    },
    reset() {
      this.clear();
      this.resetItem();
      this.giveDataById();
    },
    resetItem() {
      this.rollList.forEach(item => {
        if (item.id === this.$route.query.id) {
          this.fetchgames(item);
        }
      });
    },
    jackpotNumAdd() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.jackpotNum1 = this.jackpotNum1 + 8.56;
        this.jackpotNum2 = this.jackpotNum2 + 8.56;
      }, 100);
    },
    // 初始化列表
    rollListInit() {
      let nrollList = [];
      this.rollList.forEach((item, index) => {
        if (item.id == 26 || item.id == 19) {
        } else {
          nrollList.push(item);
        }
      });
      this.rollList = nrollList;
    },
    async getnewdatas(){
         await this.getid()
         await this.resetItem()
    }
  },
  created() {
    this.getnewdatas()
    this.$nextTick(() => {});
  },
  mounted() {
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    this.jackpotNumAdd();
    this.getAllDatas();
    if (this.$websiteName == "478qp") {
      this.rollListInit();
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.gameType {
  padding-left: 82px;
  position: relative;
  li.active {
    border: 1px solid #cca352;
    a {
      color: #cca352;
    }
  }
}
.allGame {
  position: absolute;
  left: 0;
  top: 8px;
  margin-right: 10px;
  color: #999;
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
  line-height: 26px;
}
.gameName {
  margin: 5px 3px;
  padding: 0 10px;
  line-height: 26px;
  text-decoration: none;
  text-align: center;
  background-color: transparent;
  font-size: 15px;
  border: 1px solid transparent;
  border-radius:3px; 
  a {
    color: #999;
  }
  a:hover {
    color: #cca352;
    cursor: pointer;
  }
}
.gameName:hover{
    border: 1px solid #cca352;
}
.lf {
  float: left;
}
.rt {
  float: right;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
#maincontainer {
  margin-top:30px; 
}

.mainContent {
  margin: 0 auto;
  width: 1200px;
  padding-bottom: 1px;
}

.banner {
  background-color: #000;

  img {
    display: block;
    width: 960px;
    margin: 0 auto;
    cursor: pointer;
  }
}

.top-info {
  height: 164px;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  margin: 0 auto;

  .jackpots {
    width: 980px;
    height: 164px;
    position: absolute;
    z-index: 2;
    background: url(http://betsb.3000018.com/game/img/jackpot-light1.png)
      no-repeat;
    background-size: contain;
    background-position: center;
    left: 50%;
    transform: translateX(-50%);

    #j-count {
      position: absolute;
      font-size: 19px;
      color: #451804;
      .num-item {
        display: inline-block;
        width: 22px;
        height: 35px;
        padding: 0 5px;
        line-height: 35px;
        background: #fec352 -webkit-linear-gradient(#fec352, #da9306);
        background: #fec352 -o-linear-gradient(#fec352, #da9306);
        background: #fec352 linear-gradient(#fec352, #da9306);
        border-radius: 3px;
        margin-right: 3px;
        text-align: center;
      }
    }

    .pt {
      left: 61px;
      top: 80px;
    }

    .dt {
      right: 100px;
      top: 80px;
    }
  }
}

.mainbox {
  margin: 0 auto;
  width: 1000px;
  position: relative;
  margin-top: 30px;

  .box {
    width: 872px;
    height: 90px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;

    #slider {
      position: absolute;
      width: 1200px;

      li {
        width: 97px;
        height: 90px;
        float: left;
        border-top: 1px solid #c1c1c1;
        border-right: 1px dashed #c1c1c1;
        border-bottom: 1px solid #c1c1c1;
        text-align: center;
        position: relative;
        cursor: pointer;

        &:hover {
          background: #b48c68;
          color: #fff;
        }

        span {
          line-height: 32px;
        }

        i {
          margin: 12px auto 5px;
          display: block;
        }
      }

      li.active {
        background: #b48c68;
        color: #fff;
      }
    }
  }

  .nav {
    width: 47px;
    height: 90px;
    position: absolute;
    cursor: pointer;
    border: 1px solid #ccc;
    line-height: 90px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;

    &:hover {
      color: #fff;
      background: #ccc;
    }
  }

  .prev {
    left: 17px;
  }

  .next {
    right: 17px;
  }
}

.slider-mg-icon {
  width: 38px;
  height: 38px;
  background: url("/static/public/image/game/ptgame/slot.png") -68px -126px;
  margin-bottom: 4px !important;
}

.slider-ag-icon {
  width: 67px;
  height: 37px;
  background: url("/static/public/image/game/ptgame/slot.png") -10px -10px;
}

.slider-pt-icon {
  width: 66px;
  height: 37px;
  background-size: 66px;
  background-position: 0 -10px;

  &::after {
    content: "PT";
    position: relative;
    font-size: 48px;
    top: -2px;
    color: #777;
  }

  &.active {
    &::after {
      color: #fff;
    }
  }
}

#pt-tag {
  position: absolute;
  top: 54px;
  left: 12px;
  width: 71.2px;
}

.slider-cq9-icon {
  width: 66px;
  height: 37px;
  background: url("/static/public/image/game/ptgame/cq9.png");
  background-size: 66px;
  background-position: 0 -10px;
}

.slider-ky-icon {
  width: 68px;
  height: 47px;
  background: url("/static/public/image/game/ptgame/ky.png");
  background-size: 76px;
  background-position: -5px -5px;
  margin: 4px auto 3px !important;
}

.slider-fg-icon {
  width: 45px;
  height: 41px;
  background: url("/static/public/image/game/ptgame/fg.png");
  background-size: 45px;
  margin-bottom: 1px !important;
}

.slider-vg-icon {
  width: 45px;
  height: 41px;
  background: url("/static/public/image/game/ptgame/vg.png") no-repeat;
  background-size: 45px;
  background-position: 0 5px;
  margin-bottom: 1px !important;
}

.slider-jdb-icon {
  width: 68px;
  height: 47px;
  background: url("/static/public/image/game/ptgame/jdb.png");
  background-size: 76px;
  background-position: -5px -18px;
  margin-bottom: -5px !important;
}

.slider-bbin-icon {
  width: 55px;
  height: 39px;
  background: url("/static/public/image/game/ptgame/bb.png");
  background-size: 55px;
  background-position: 0 -10px;
  margin-bottom: 2px !important;
}

.slider-ae-icon {
  width: 92px;
  height: 39px;
  background: url("/static/public/image/game/ptgame/ae.png");
  background-size: 92px;
  background-position: 0 -27px;
  margin-bottom: 2px !important;
}

.slider-dt-icon {
  width: 53px;
  height: 40px;
  background: url("/static/public/image/game/ptgame/slot.png") -97px -10px;
  margin-bottom: 1px !important;
}

.slider-mw-icon {
  width: 88px;
  height: 37px;
  background: url("/static/public/image/game/ptgame/mwg.png") no-repeat bottom;
  margin-bottom: 4px !important;
}

.slider-ttg-icon {
  width: 55px;
  height: 39px;
  background: url("/static/public/image/game/ptgame/slot.png") -10px -67px;
  margin-bottom: 2px !important;
}

#slider li:hover .slider-mg-icon,
#slider li.active .slider-mg-icon {
  background: url("/static/public/image/game/ptgame/slot2.png") -170px -68px;
}

#slider li:hover .slider-ag-icon,
#slider li.active .slider-ag-icon {
  background: url("/static/public/image/game/ptgame/slot2.png") -10px -10px;
}

#slider li:hover .slider-pt-icon,
#slider li.active .slider-pt-icon {
  color: white;

  &::after {
    content: "PT";
    position: relative;
    font-size: 48px;
    top: -2px;
    color: #fff;
  }
}

#slider li:hover .slider-cq9-icon,
#slider li.active .slider-cq9-icon {
  background: url("/static/public/image/game/ptgame/cq92.png");
  background-size: 66px;
  background-position: 0 -10px;
}

#slider li:hover .slider-fg-icon,
#slider li.active .slider-fg-icon {
  background: url("/static/public/image/game/ptgame/fg2.png");
  background-size: 45px;
}

#slider li:hover .slider-bbin-icon,
#slider li.active .slider-bbin-icon {
  background: url("/static/public/image/game/ptgame/bb2.png");
  background-size: 55px;
  background-position: 0 -10px;
}

#slider li:hover .slider-ae-icon,
#slider li.active .slider-ae-icon {
  background: url("/static/public/image/game/ptgame/ae2.png");
  background-size: 92px;
  background-position: 0 -27px;
}

#slider li:hover .slider-dt-icon,
#slider li.active .slider-dt-icon {
  background: url("/static/public/image/game/ptgame/slot2.png") -97px -10px;
}

#slider li:hover .slider-mw-icon,
#slider li.active .slider-mw-icon {
  background: url("/static/public/image/game/ptgame/mwg_h.png") no-repeat bottom;
}

#slider li:hover .slider-ttg-icon,
#slider li.active .slider-ttg-icon {
  background: url("/static/public/image/game/ptgame/slot2.png") -10px -67px;
}

.search-container {
  width: 100%;
  // min-height: 150px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
  .search-head {
    height: 33px;
    padding: 0;
    position: absolute;
    right: 0;
    .left {
      float: right;
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
        width: 240px;
        position: relative;
        display: inline-block;
        height: 34px;
        background: url('/static/478qp/img/computer/search.png');
        .ipt {
          height: 100%;
          width: 190px;
          padding: 0 34px 0 16px;
          font-size: 14px;
          line-height: 34px;
          color: #999;
          background: none;
          border: 0;
          outline: 0;
        }
        .searchbox {
          position: absolute;
          right:16px;
          top: 8px;
          width: 18px;
          height: 18px;
          z-index: 8;
          background: url(/static/478qp/img/computer/icon-search.png) no-repeat;
          background-size: cover;
          cursor: pointer;
        }

        .right {
          position: absolute;
          right: 10px;
          top: 2px;
          span {
            font-size: 26px;
            color: #d1d1d1;
            cursor: pointer;
          }
        }
      }

      .btn-search {
        width: 92px;
        height: 36px;
        vertical-align: middle;
        background: #b48c68;
        border-radius: 7px;
        font-size: 16px;
        color: #fff;
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;
        outline: none;
      }
    }
  }
  .search-info {
    width: 800px;
    padding-top: 0px;
    .search-detail {
      margin-top: 15px;
      padding-left: 7px;
      padding-bottom: 16px;
      overflow: hidden;
      text-align: left;
      border: none;

      .search-type {
        .search-game {
          margin-bottom: 10px;
          height: 40px;
          line-height: 40px;

          dt {
            margin-right: 4px;
            color: #999;
            display: inline-block;
            vertical-align: middle;
            font-size: 15px;
          }

          dd {
            display: inline-block;
            vertical-align: middle;

            a {
              display: inline-block;
              margin: 0 3px;
              padding: 0 10px;
              line-height: 26px;
              color: #999;
              text-decoration: none;
              text-align: center;
              background-color: transparent;
              font-size: 15px;
              border: 1px solid transparent;
              border-radius:3px; 
              &:hover {
                color: #cca352;
                border: 1px solid #cca352;
              }
            }

            .active {
              color: #cca352;
              border: 1px solid #cca352;
              // padding: 0 7px;
            }
          }
        }
      }
    }
  }

  .list_winner {
    position: absolute;
    width: 250px;
    background: #fff;
    top: 38px;
    right: 0;
    border-bottom: 1px solid #b48c68;
    overflow: hidden;

    .section_title {
      padding-left: 20px;
      background: #b48c68;
      line-height: 50px;
      color: #fff;
    }

    .topLoop {
      ul {
        overflow: hidden;
        border-left: 1px solid #b48c68;
        border-right: 1px solid #b48c68;

        .wrap {
          position: relative;
          top: 0;
          -webkit-animation: animateSub 120s linear infinite;
          -o-animation: animateSub 120s linear infinite;
          -moz-animation: animateSub 120s linear infinite;
          animation: animateSub 120s linear infinite;
          @keyframes animateSub {
            0% {
              top: 0;
            }
            100% {
              top: -5000px;
            }
          }

          li {
            padding: 20px 20px 0;
            border-bottom: 2px solid #f1f1f1;
            height: 100px;
            width: 100%;

            .gamepic {
              width: 55px;
              height: 65px;
              float: left;
              margin-right: 15px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .wintext {
              width: 135px;
              float: left;
              font-size: 12px;
              color: #555;

              div {
                span {
                  color: red;
                }
              }
            }
          }
        }
      }
    }
  }
}

.game-box {
  margin: 0 auto;
  // margin-bottom: 80px;
  /* margin-left: -9px; */
  width: 100%;

  .game-content::-webkit-scrollbar {
    display: none;
  }

  .game-content {
    width: 100%;
    // height: 590px;
    position: relative;
    // margin-top: 20px;
    margin-left: 2px;
    overflow: auto;
    // padding-top: 25px;
    margin-bottom: 20px;

    // ul {
    //   margin: 0 15px;
    // }

    .game-item {
      float: left;
      position: relative;
      // width: 233px;
      width: 220px;
      // height: 126px;
      height: 186px;
      margin: 0 22px 22px 2px;
      overflow: hidden;

      &:hover img {
        transition: all 0.8s ease-in-out;
        transform: scale(1.1);
      }
      &:hover .bgcover,
      &:hover .goGamebtn {
        display: block;
      }
      &:hover .game-pic{
          border: 1px solid #cca352;
      }
      .game-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        // border:1px solid #eee;
        text-align: center;
        .default {
          width: 100%;
          //   height: 154px;
          // margin-top:-23px;
          // margin-top:-17px;
        }

        .mg-pic {
          // width: 200%;

          // &:hover {
          //   transform: translateX(-50%);
          // }
        }
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
        position: relative;
        transition: all linear 0.3s;
        a {
          &.play {
            cursor: pointer;
            text-align: center;
            position: absolute;
            bottom: 66px;
            left: 30px;
            // background-color: rgba(117, 68, 217, 0.85);
            // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#D97544D9', endColorstr='#D97544D9', GradientType=0);
            background: url("/static/public/image/game/ptgame/btn1.png") no-repeat;
            font-size: 16px;
            color: #fff;
            width: 160px;
            line-height: 40px;
            -webkit-border-radius: 36px;
            border-radius: 6px;
            
          }
          &.play:hover {
            background-color: rgba(117, 68, 217, 1);
          }
          &#try:hover {
            background-color: rgba(77, 71, 194, 1);
          }

          &#try {
            cursor: pointer;
            text-align: center;
            position: absolute;
            bottom: 30px;
            left: 60px;
            background-color: rgba(77, 71, 194, 0.7);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#D97544D9', endColorstr='#D97544D9', GradientType=0);
            font-size: 14px;
            color: #fff;
            width: 120px;
            line-height: 30px;
            -webkit-border-radius: 36px;
            border-radius: 15px;
          }
        }
      }
      .game-mask{
        // width: 100%;
        // height: 100%;
        // z-index: 100;
        // display: block;
        // position: absolute;
        // top: 0;
        // left: 0;
        // background: url('/static/478qp/img/computer/mask.png') repeat;
      }
      .gameMask {
        background: #000;
        opacity: 0.6;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 25px;
        padding: 0 4px;
        z-index: 1;
        text-align: center;
        .gameItemName {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          line-height: 25px;
          font-size: 15px;
          padding-left: 10px;
          margin: 0;
          color: #fff;
        }
        .collectImg {
          float: right;
          width: 16px;
          height: 20px;
          margin-top: 3.5px;
          margin-right: 8px;
          background: url('/static/public/image/game/ptgame/icon-flame.png')
            no-repeat center;
        }
      }
    }
    .game-item:nth-child(5n) {
      margin-right: 0;
    }
  }

  .pagenation {
    height: 34.4px;
    text-align: center;
    margin-top: 8px;

    li {
      display: inline;
      // border: 1px solid #cca352;
      padding: 6px 12px;
      border-radius: 3px;
      background:#444;
      a {
        color: #b2b2b2;
      }
    }
  }
}

.move {
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transform: translate3d(-97px, 0, 0);
}

.back {
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  transform: translate3d(97px, 0, 0);
}
</style>
