<template>
  <div id="maincontainer">
    <div class="mainContent">
      <div class="mainbox" ref="gameMenu">
        <ul class="game_type game_type1">
          <li
            :class="[theme,{'active':$route.query.id===item.id},item.class]"
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
        
        <ul class="game_type game_type2" @click="changeMenu" v-if="rollList.length>10">
          <li @mouseover="changeSrc1" @mouseout="changeSrc2" class="deGame" id="ali">
            <img v-if="showGtu" :src="src" alt />
            <img class="imgTrue" v-else :src= 'bindImg' alt />
          </li>
        </ul>
      </div>
      <div ref="search-container" :class="[theme,'search-container']">
        <div class="search-fl fl">
          <div class="search-info">
            <div class="search-head">
              <div>
                <div class="ipt-group">
                  <input v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()" />
                </div>
                <button :class="[theme,'btn-search']" @click="search()">
                  <i class="'search_icon"></i> 搜索
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
            <li :class="[theme,'game-item']" :key="index" v-for="(item,index) in gameData">
              <div class="game-pic">
                <a href="javascript:;" class="game-text collect">
                  <i class="shoucang"></i>
                </a>
                <img
                  v-lazy="item.icon"
                  :class="{'default':true,'mg-pic':$route.query.id==='10022'}"
                  alt
                />
              </div>
              <h3>{{item.name}}</h3>
              <div class="bgcover" v-show="Public_User!=='test'"></div>
              <div class="goGamebtn" v-show="Public_User!=='test'">
                <a class="playBtn" @click="$loginGame(item)">进入游戏</a>
              </div>
              <!-- <a v-show="Public_User==='test'||!Public_User" href="javascript:void(0)" id="try"
              @click="loginTest(item)">试玩游戏</a>-->
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
  props:{
    theme:String
  },
  data() {
    return {
      bindImg:"../../../../static/public/image/youyi/"+ this.theme +"-item-hover.png",
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
      src: "../../../../static/public/image/youyi/"+this.theme+"-item.png",
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
      setInter: null,
      DefaultGameData: [
          {
              code: 'YMBI',
              icon: 'http://static.k0061.com/images/default/pc/10072.png',
              id: 10072,
              lock: 0,
              name: '飞禽走兽多人版',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'YMFD',
              icon: 'http://static.k0061.com/images/default/pc/10067.png',
              id: 10067,
              lock: 0,
              name: '森林舞会多人版',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'YMBZ',
              icon: 'http://static.k0061.com/images/default/pc/10074.png',
              id: 10074,
              lock: 0,
              name: '奔驰宝马多人版',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'YMSG',
              icon: 'http://static.k0061.com/images/default/pc/10079.png',
              id: 10079,
              lock: 0,
              name: '斗三公',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'YMJJ',
              icon: 'http://static.k0061.com/images/default/pc/10080.png',
              id: 10080,
              lock: 0,
              name: '红黑梅方',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SB49',
              icon: 'http://static.k0061.com/images/default/pc/258.png',
              id: 258,
              lock: 0,
              name: '金龙珠',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'YMAC',
              icon: 'http://static.k0061.com/images/default/pc/10075.png',
              id: 10075,
              lock: 0,
              name: '动物狂欢',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SB08',
              icon: 'http://static.k0061.com/images/default/pc/266.png',
              id: 266,
              lock: 0,
              name: '麻将老虎机',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'PKBJ',
              icon: 'http://static.k0061.com/images/default/pc/269.png',
              id: 269,
              lock: 0,
              name: '杰克高手',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SB02',
              icon: 'http://static.k0061.com/images/default/pc/264.png',
              id: 264,
              lock: 0,
              name: '复古花园',
              series: 10015,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SMG_breakAway',
              icon: 'https://vnsyl.8581333.com/images/default/pc/1824.png',
              id: 10157,
              lock: 0,
              name: '冰上曲棍球',
              series: 10022,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SMG_basketballStar',
              icon: 'https://vnsyl.8581333.com/images/default/pc/1831.png',
              id: 10139,
              lock: 0,
              name: '篮球巨星',
              series: 10022,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SMG_playboy',
              icon: 'https://vnsyl.8581333.com/images/default/pc/1839.png',
              id: 10414,
              lock: 0,
              name: '花花公子',
              series: 10022,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'SMG_immortalRomance',
              icon: 'https://vnsyl.8581333.com/images/default/pc/1825.png',
              id: 10303,
              lock: 0,
              name: '不朽的浪漫',
              series: 10022,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: '5902',
              icon: 'http://static.k0061.com/images/default/pc/3568.png',
              id: 3568,
              lock: 0,
              name: '糖果派对',
              series: 10016,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: '5901',
              icon: 'http://static.k0061.com/images/default/pc/3567.png',
              id: 3567,
              lock: 0,
              name: '连环夺宝',
              series: 10016,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: '52',
              icon: 'http://static.k0061.com/images/default/pc/2646.png',
              id: 2646,
              lock: 0,
              name: '跳高高',
              series: 10018,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: '7',
              icon: 'http://static.k0061.com/images/default/pc/2667.png',
              id: 2667,
              lock: 0,
              name: '跳起来',
              series: 10018,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'fm',
              icon: 'http://static.k0061.com/images/default/pc/3338.jpg',
              id: 3338,
              lock: 0,
              name: '古怪猴子',
              series: 10024,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'bib',
              icon: 'http://static.k0061.com/images/default/pc/3347.jpg',
              id: 3347,
              lock: 0,
              name: '海底探宝',
              series: 10024,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'trpmnk',
              icon: 'http://static.k0061.com/images/default/pc/3422.jpg',
              id: 3422,
              lock: 0,
              name: '三倍猴子',
              series: 10024,
              tag: '',
              title: '',
              type: 'game'
          },
          {
              code: 'hb',
              icon: 'http://static.k0061.com/images/default/pc/3277.jpg',
              id: 3277,
              lock: 0,
              name: '狂欢夜',
              series: 10024,
              tag: '',
              title: '',
              type: 'game'
          }
      ]
    };
  },
  methods: {
    //获取数据
    async getData(item) {
      this.gameData = [];
      let idArr = this.idlist;
      // 获取到所有的id
      // this.rollList.forEach(v=>{
      //   idArr.push(v.id);
      // })

      let id = this.$route.query.id;
      if (id == 55) {
        this.showGames = this.DefaultGameData;
      } else {
        // 首次加载获取，第一页数据
        let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
          id,
          device: "pc"
        });
        if (res && res.code === 200) {
          this.showGames = res.data[id];
        }
      }
      this.gameData = this.showGames
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
        if (id == "55") {
          this.gameData = this.DefaultGameData;
        } else {
          this.giveDataById(id);
        }
      } else {
        // 没有数据，需要请求
        this.getData();

        return false;
      }
    },

    //点击导航栏
    async fetchgames(item) {
      if (item.id == "55") {
        this.showGames = this.DefaultGameData;
        this.$router.push("/home/games?id=55&name=热门游戏");
        this.gameData = this.showGames
        this.nowTypeList.type.list = [];
        this.nowTypeList.line.list = [];
        this.nowTypeList.thirt.list = [];
      } else {
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
        // this.getData()
        this.giveDataById();
        this.$nextTick(() => {
          this.offsetHeight =
            this.$refs["search-container"].offsetHeight < 100
              ? 100
              : this.$refs["search-container"].offsetHeight;
        });
      }
    },
    resulttype(item) {
      this.currenttype = item.tag;
      // this.getData();
      this.fengame();
    },
    resultline(item) {
      this.currentline = item.tag;
      // this.getData();
      this.fengame();
    },
    resultTag(item) {
      this.currentTag = item.tag;
      // this.getData();
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
    fenshu() {
      this.gameData = this.getPageCurData(
        this.showGames,
        25,
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
      // this.getData()
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
        menu.style.height = "270px";
        this.showGtu = false;
        aLi.className = "active";
        this.src = "/static/public/image/youyi/"+this.theme+"-item-hover.png";
      } else {
        menu.style.height = "135px";
        this.showGtu = true;
        aLi.className = "deGame";
        this.src = "/static/public/image/youyi/"+this.theme+"-item.png";
      }
    },
    changeSrc1() {
      this.src = "/static/public/image/youyi/"+this.theme+"-item-hover.png";
    },
    changeSrc2() {
      this.src = "/static/public/image/youyi/"+this.theme+"-item.png";
    },
    async getnewdatas() {
      await this.getid();
      await this.resetItem();
    }
  },
  created() {
    this.getnewdatas();
    this.$nextTick(() => {
      // if (this.$route.query.id) {
      //   this.resetItem()
      // } else {
      //   this.fetchgames(this.rollList[0])
      // }
    });
  },
  mounted() {
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }

    this.getAllDatas();

    this.jackpotNumAdd();
    
  },
  // watch: {
  //   $route(){
  //     this.getData()
  //   },
  // },
  components: {}
};
</script>

<style lang="less" scoped>
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

    li.darkPurple.hot_game {
      background: url("/static/public/image/youyi/zhot-game1.png") center top
        no-repeat;
    }
    li.darkPurple.hot_game:hover {
      background: url("/static/public/image/youyi/zhot-game-hover1.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkPurple.hot_game.active {
      background: url("/static/public/image/youyi/zhot-game-hover1.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkPurple2.hot_game {
      background: url("/static/public/image/youyi/ybcp.png") center top
        no-repeat;
    }
    li.darkPurple2.hot_game:hover {
      background: url("/static/public/image/youyi/ybcp-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkPurple2.hot_game.active {
      background: url("/static/public/image/youyi/ybcp-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.skyBlue.hot_game {
      background: url("/static/public/image/youyi/hsyl.png") center top
        no-repeat;
    }
    li.skyBlue.hot_game:hover {
      background: url("/static/public/image/youyi/hsyl-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.skyBlue.hot_game.active {
      background: url("/static/public/image/youyi/hsyl-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkRed.hot_game {
      background: url("/static/public/image/youyi/cpzj.png") center top
        no-repeat;
    }
    li.darkRed.hot_game:hover {
      background: url("/static/public/image/youyi/cpzj-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkRed.hot_game.active {
      background: url("/static/public/image/youyi/cpzj-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.darkRed2.hot_game {
      background: url("/static/public/image/youyi/ecp-1.png") center top
        no-repeat;
    }
    li.darkRed2.hot_game:hover {
      background: url("/static/public/image/youyi/ecp-1-hover.png") center
        no-repeat;
      background-size: 100% 100%;
    }
    li.darkRed2.hot_game.active {
      background: url("/static/public/image/youyi/ecp-1-hover.png") center
        top no-repeat;
      background-size: 100% 100%;
    }
    li.lightPurple.hot_game {
      background: url("/static/public/image/youyi/sjcp.png") 
      top no-repeat;
    }
    li.lightPurple.hot_game:hover {
      background: url("/static/public/image/youyi/sjcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.lightPurple.hot_game.active {
      background: url("/static/public/image/youyi/sjcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red.hot_game {
      background: url("/static/public/image/youyi/fhcp.png") 
      top no-repeat;
    }
    li.red.hot_game:hover {
      background: url("/static/public/image/youyi/fhcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red.hot_game.active {
      background: url("/static/public/image/youyi/fhcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red2.hot_game {
      background: url("/static/public/image/youyi/500wcp.png") 
      top no-repeat;
    }
    li.red2.hot_game:hover {
      background: url("/static/public/image/youyi/500wcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red2.hot_game.active {
      background: url("/static/public/image/youyi/500wcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red3.hot_game {
      background: url("/static/public/image/youyi/fczx.png") 
      top no-repeat;
    }
    li.red3.hot_game:hover {
      background: url("/static/public/image/youyi/fczx-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red3.hot_game.active {
      background: url("/static/public/image/youyi/fczx-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red4.hot_game {
      background: url("/static/public/image/youyi/jhcp.png") 
      top no-repeat;
    }
    li.red4.hot_game:hover {
      background: url("/static/public/image/youyi/jhcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red4.hot_game.active {
      background: url("/static/public/image/youyi/jhcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red5.hot_game {
      background: url("/static/public/image/youyi/qmcp.png") 
      top no-repeat;
    }
    li.red5.hot_game:hover {
      background: url("/static/public/image/youyi/qmcp-hover.png")
        top no-repeat;
      background-size: 100% 100%;
    }
    li.red5.hot_game.active {
      background: url("/static/public/image/youyi/qmcp-hover.png")
        top no-repeat;
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
    li.darkRed2{
      background-color: #fff;
      color: #000;
      border-bottom: 1px solid #e8b6ba;
    }
    li.darkRed2:hover{
      color: #fff;
      background: linear-gradient(23deg,#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #e8b6ba;
      }
    }
    li.darkRed2.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient(23deg,#fd9080,#f71b2c);
      color: #fff;
      div {
        border-bottom: 1px solid #e8b6ba;
      }
    }
    li.darkPurple.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient( rgb(157, 97, 221),rgb(213, 92, 162));
      color: #fff;
      div {
        border-bottom: 1px solid #c678d5;
      }
    }
    li.darkPurple:hover{
      background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
    }
    li.darkPurple2.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient( rgb(157, 97, 221),rgb(213, 92, 162));
      color: #fff;
      div {
        border-bottom: 1px solid #c678d5;
      }
    }
    li.darkPurple2:hover{
      background: linear-gradient(rgb(213, 92, 162), rgb(157, 97, 221));
    }
    li.skyBlue:hover{
      background: linear-gradient(23deg,#51b1e7,#62dbf2);
      div {
        border-bottom: 1px solid #5dcfef;
      }
    }
    li.skyBlue.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient(23deg,#62dbf2,#51b1e7);
      color: #fff;
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.darkRed:hover{
      background: linear-gradient(23deg,#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #5dcfef;
      }
    }
    li.darkRed.active {
      transform: scale(1.1);
      font-size: 16px;
      background: linear-gradient(23deg,#fd9080),#f71b2c;
      color: #fff;
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.lightPurple{
      background:#2a2851;
      color: #fff;
    }
    li.lightPurple:hover{
      background: linear-gradient(23deg, #51408d, #725598);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.lightPurple.active{
      // 
      background: linear-gradient(23deg, #725598, #51408d);
      div {
        border-bottom: 1px solid #53b5e8;
        
      }
    }
    li.red:hover{
      background: linear-gradient(#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.red.active{
      // 
      background: linear-gradient(#fd9080,#f71b2c);
      div {
        border-bottom: 1px solid #53b5e8;
        
      }
    }
    li.red2:hover{
      background: linear-gradient(#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.red2.active{
      // 
      background: linear-gradient(#fd9080,#f71b2c);
      div {
        border-bottom: 1px solid #53b5e8;
        
      }
    }
    li.red3:hover{
      background: linear-gradient(#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.red3.active{
      color:#fff;
      background: linear-gradient(#fd9080,#f71b2c);
      div {
        border-bottom: 1px solid #53b5e8;
        
      }
    }
    li.red4:hover{
      background: linear-gradient(#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.red4.active{
      color:#fff;
      background: linear-gradient(#fd9080,#f71b2c);
      div {
        border-bottom: 1px solid #53b5e8;
        
      }
    }
    li.red5:hover{
      background: linear-gradient(#f71b2c,#fd9080);
      div {
        border-bottom: 1px solid #53b5e8;
      }
    }
    li.red5.active{
      color:#fff;
      background: linear-gradient(#fd9080,#f71b2c);
      div {
        border-bottom: 1px solid #53b5e8;
        
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
.lightPurple.search-container{
  background: #664e94;
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
      .skyBlue.btn-search{
        background: linear-gradient(23deg,#51b1e7,#62dbf2);
      }
      .darkPurple.btn-search{
        background: linear-gradient(180deg, #d55ca2, #9d61dd);
      }
      .darkRed.btn-search{
        background: linear-gradient(23deg,#f71b2c,#fd9080);
      }
      .darkRed2.btn-search{
        background: #f71b2c;
      }
      .lightPurple.btn-search{
        background: #2a2851;
      }
      .red.btn-search{
        background: linear-gradient(#fd9080,#f71b2c);
      }
      .red2.btn-search{
        background: linear-gradient(#fd9080,#f71b2c);
      }
      .red3.btn-search{
        background: linear-gradient(#fd9080,#f71b2c);
      }
      .red4.btn-search{
        background: linear-gradient(#fd9080,#f71b2c);
      }
      .red5.btn-search{
        background: linear-gradient(#fd9080,#f71b2c);
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

      h3 {
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 12px;
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
          color: #fff;
          width: 110px;
          height: 35px;
          line-height: 35px;
          transform: translate(-50%, -50%);
          background: linear-gradient(23deg,#f71b2c,#fd9080);
          font-size: 16px;
          cursor: pointer;
          text-align: center;
          -webkit-border-radius: 6px;
          border-radius: 6px;
          &:hover {
             background: linear-gradient(23deg,#fd9080,#f71b2c);
          }
        }
      }
    }
    .darkRed2.game-item{
      background: #f71b2c;
      h3{
        color: #fff;
      }
    }
    .lightPurple.game-item{
      background: #2a2851;
      h3{
        color: #fff;
      }
    }
    .skyBlue .playBtn{
      background: #51b1e7!important;
      h3{
        color: #000!important;
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
