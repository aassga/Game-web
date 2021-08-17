<template>
  <div id="mainContainer">
    <div class="mainContent">
      <div class="mainbox" ref="gameMenu">
        <ul class="game_type game_type1">
          <li
            :class="[{'active':$route.query.id===item.id},item.class]"
            :key="index"
            v-for="(item,index) in rollList"
            @click="fetchgames(item)"
          >
            <div>
              <img style="width:60px;height:60px;" :src="item.src" alt v-if="index!=0" />
            </div>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <ul class="game_type game_type2" @click="changeMenu" v-show="rollList.length>10">
          <li @mouseover="changeSrc1" @mouseout="changeSrc2" class="deGame" id="ali">
            <img v-if="showGtu" :src="src" alt />
            <img class="imgTrue" v-else src="/static/public/image/youyi/other-item-hover.png" alt />
          </li>
        </ul>
      </div>
      <div ref="search-container" class="search-container">
        <div class="search-fl fl">
          <div class="search-info">
            <div class="search-head">
              <div>
                <div class="ipt-group">
                  <input v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()" />
                </div>
                <button class="btn-search" @click="search()">
                  <i class="search_icon"></i> 搜索
                </button>
              </div>
            </div>
            <div v-if="nowTypeList.type.list.length" class="search-detail">
              <div class="search-type">
                <dl class="search-game top">
                  <dt>
                    <i class="gicon gicon1"></i>游戏类型:
                  </dt>
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
                  <dt>
                    <i class="gicon gicon2"></i>赔钱线数:
                  </dt>
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
                  <dt>
                    <i class="gicon gicon3"></i>游戏风格:
                  </dt>
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
                <a href="javascript:;" class="game-text collect">
                  <i class="shoucang"></i>
                </a>
                <img v-lazy="item.icon" :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt/>
              </div>
              <h3>{{item.name}}</h3>
              <div class="bgcover"></div>
              <div class="goGamebtn">
                <a href="javascript:void(0)" class="playBtn" @click="loginGame(item)">进入游戏</a>
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
      showGtu: true,
      src: "/static/public/image/youyi/other-item.png",
      pageDatas: {
        page: 1
      },
      idlist: [],
      rollList: [
        {
          id: "55",
          class: "hot_game",
          type: {
            list: [
              { name: "全选", tag: "" },
              { name: "最新游戏", tag: "NEW" },
              { name: "热门游戏", tag: "HOT" },
              { name: "老虎机", tag: "SLO" },
              { name: "大额投注", tag: "MAX" },
              { name: "小额投注", tag: "MIN" },
              { name: "经典拉霸", tag: "FRT" },
              { name: "消消乐", tag: "CLH" }
            ]
          },
          line: {
            list: [
              { name: "全选", tag: "" },
              { name: "5-10线", tag: "5-10" },
              { name: "15-20线", tag: "15-20" },
              { name: "25-30线", tag: "25-30" },
              { name: "更多", tag: "MOR" }
            ]
          }
        }
      ],
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
      // 获取到所有的id
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
      // 分类要展示的所有数据
      let id = gid || this.$route.query.id || "10022";
      Object.keys(this.allGameData).forEach(v => {
        if (v == id) {
          this.showGames = this.allGameData[v];
        }
      });
      // 实际展示用的
      this.gameData = this.showGames
    },
    //数据来源
    getAllDatas() {
      if (sessionStorage.allgames) {
        // 有缓存,可以不用请求数据
        this.allGameData = JSON.parse(sessionStorage.allgames);
        let id = this.$route.query.id;
        this.giveDataById(id);
      } else {
        // 没有数据，需要请求
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
          this.$refs["search-container"].offsetHeight < 100?100:this.$refs["search-container"].offsetHeight;
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
    // 分页数量
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
    changeMenu() {
      let menu = document.getElementsByClassName("mainbox")[0];
      let aLi = document.getElementById("ali");
      let gao = window.getComputedStyle(this.$refs.gameMenu).height;
      if (parseInt(gao) <= 135) {
        aLi.className = "active";
        menu.style.height = "270px";
        menu.style.transition = "all .6s ease";
        this.showGtu = false;
        this.src = "/static/public/image/youyi/other-item-hover.png";
      } else {
        menu.style.height = "135px";
        this.showGtu = true;
        aLi.className = "deGame";
        this.src = "/static/public/image/youyi/other-item.png";
      }
    },
    changeSrc1() {
      this.src = "/static/public/image/youyi/other-item-hover.png";
    },
    changeSrc2() {
      this.src = "/static/public/image/youyi/other-item.png";
    },
    async getnewdatas() {
      await this.getid();
      await this.resetItem();
    }
  },
  created() {
    this.getnewdatas(); 
    this.$nextTick(() => {
    });
  },
  mounted() {
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    this.jackpotNumAdd();
    // 展示数据
    this.getAllDatas();
  },
  components: {}
};
</script>

<style lang="less" scoped>
.mainContainer {
  background: url(/static/500w/img/dianzi/bg.png) no-repeat center;
}
.mainContent {
  margin: 0 auto;
  width: 1200px;
  padding: 10px 0 1px 0;
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

.mainbox {
  height: 135px;
  position: relative;
  margin: 0px 0 15px;
  overflow: hidden;

  .game_type1 {
    width: 1085px;
    padding: 0 0 10px 5px;
    li:hover {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
      color: #fff;
      div {
        border-bottom: 1px solid #c678d5;
      }
    }
  }
  .game_type2 {
    position: absolute;
    top: 0;
    right: 5px;
    padding: 0 0 10px 8px;

    li {
      padding: 0 !important;
      img {
        width: 98px;
        height: 120px;
      }
      &.deGame:hover {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
        div {
          border-bottom: 1px solid #c678d5;
        }
      }
      .active {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
      }
    }
  }

  .game_type {
    clear: both;
    zoom: 1;
    overflow: hidden;
    display: inline-block;

    li.hot_game {
      background: url("/static/public/image/youyi/500w.png") center top
        no-repeat;
    }
    li.hot_game:hover {
      background: url("/static/public/image/youyi/500w-hover.png") center top
        no-repeat;
      background-size: 100% 100%;
    }
    li.hot_game.active {
      background: url("/static/public/image/youyi/500w-hover.png") center top
        no-repeat;
      background-size: 100% 100%;
    }
    li {
      width: 98px;
      height: 120px;
      float: left;
      margin-right: 10px;
      margin-top: 10px;
      padding: 0 5px;
      font-size: 14px;
      background-color: #fff;
      color: rgb(153, 153, 153);
      border-radius: 10px;
      transition: all 0.2s ease 0s;
      cursor: pointer;
      text-align: center;
      overflow: hidden;

      div {
        border-bottom: 1px solid transparent;
        padding: 17px 0 8px;
      }

      span {
        line-height: 32px;
      }
    }
    li.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
      color: #fff;
      div {
        border-bottom: 1px solid #c678d5;
      }
    }
  }
  .game_type2 {
    overflow: visible;
    li {
      overflow: visible;
      margin-right: 0;
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
}

#pt-tag {
  position: absolute;
  top: 54px;
  left: 12px;
  width: 71.2px;
}

.search-container {
  padding: 10px;
  border-radius: 10px;
  background: #fff;
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
        background: url("/static/public/image/slot_sprites.png") -63px -185px;
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
        width: 590px;
        border-radius: 5px;
        border: 1px solid #d6dae4;
        vertical-align: middle;

        .ipt {
          border: none;
          width: 100%;
          padding: 0 10px;
          height: 32px;
          line-height: 32px;
          color: #c1c1c1;
          background-color: transparent;
          outline: none;
        }
      }

      .btn-search {
        outline: none;
        width: 112px;
        height: 34px;
        border: none;
        border-radius: 7px;
        vertical-align: middle;
        font-size: 16px;
        color: #fff;
        vertical-align: middle;
        background: linear-gradient(180deg, #d55ca2, #9d61dd);
        cursor: pointer;
        .search_icon {
          width: 16px;
          height: 16px;
          display: inline-block;
          background: url("/static/public/image/youyi/sousuo.png") no-repeat
            center center;
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
            color: #333;
            display: inline-block;
            vertical-align: middle;
            line-height: 15px;

            .gicon1 {
              background: url("/static/public/image/youyi/fenlei.png") no-repeat
                center center;
            }
            .gicon2 {
              background: url("/static/public/image/youyi/jiaokuanqueren.png")
                no-repeat center center;
            }
            .gicon3 {
              background: url("/static/public/image/youyi/youxi.png") no-repeat
                center center;
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
              color: #999;
              text-decoration: none;
              text-align: center;
            }

            .active {
              background: #ffd100;
              color: #333;
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
  margin-bottom: 80px;
  width: 1260px;

  .game-content::-webkit-scrollbar {
    display: none;
  }

  .game-content {
    width: 1260px;
    min-height: 300px;
    position: relative;
    margin-left: -15px;
    overflow: auto;
    padding-top: 25px;

    ul {
      margin: 0 15px;
    }

    .game-item {
      background-attachment: scroll;
      float: left;
      width: 224px;
      padding-bottom: 10px;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      color: #c1c1c1;
      text-align: left;
      transition: all 0.3s;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      text-align: center;

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

        .collect {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 27px;
          height: 27px;

          .shoucang {
            display: inline-block;
            position: relative;
            top: 7px;
            width: 27px;
            height: 27px;
            background: url("/static/public/image/icon-shoucang.png") no-repeat
              center top;
            background-size: 100%;
          }
        }

        .default {
          width: 224px;
          height: 224px;
        }

        .mg-pic {
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

      h3 {
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 12px;
      }
    }
  }

  .pagenation {
    height: 34.4px;
    text-align: center;
    margin-top: 8px;

    li {
      display: inline;
      border: 1px solid #ddd;
      padding: 6px 12px;
      border-radius: 3px;

      a {
        color: #337ab7;
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
