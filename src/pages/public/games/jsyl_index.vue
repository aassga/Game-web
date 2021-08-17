<template>
  <div class="mainContainer">
    <div class="mainContent">
      <!-- 获奖信息 -->
      <div class="jianglun">
        <div class="jiangnei">
          <div class="jiangchi tiaoshuFn">{{parseFloat(jackpotNum1,2).toLocaleString()}}</div>
          <div class="luntop">
            <ul
              class="winner_list"
              :style="{transform:'translateY(-'+noticePosition+'px) translateZ(0)'}"
            >
              <li v-for="(item,i) in rewardList" :key="i">
                <span class="city_name">{{item.city}}</span>
                <span class="user_name">{{item.userName.padEnd(6,'*')}}</span>
                <span class="lut3">在</span>
                <span class="game_name">{{item.gameName}}</span>
                <span class="money_amount">
                  获得
                  <em>{{item.money}}元</em>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="cl"></div>
      </div>
      <!-- 导航列表 -->
      <div class="mainbox">
        <div class="nav prev"></div>
        <div class="nav next"></div>
        <div class="box">
          <ul id="slider">
            <li
              :class="[{'active':$route.query.id===item.id,'active':$route.query.id==rollList[index].id},item.class]"
              :key="index"
              v-for="(item,index) in rollList"
              @click="fetchgames(item)"
            >
              <i :class="'slider-'+item.class+'-icon'"></i>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索框 -->
      <div ref="search-container" class="search-container">
        <div class="search-info">
          <div class="search-head">
            <div class="left">
              <i class="bg-search"></i>
              <label class="label">搜索游戏:</label>
              <div class="ipt-group">
                <input v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()" />
              </div>
              <button class="btn-search" @click="search()">搜索</button>
            </div>
            <!-- <div
                            v-if="nowTypeList.type.list.length"
                            class="right"
                        >
                            <button @click="reset()">重置</button>
            </div>-->
          </div>
          <div v-if="nowTypeList.type.list.length" class="search-detail">
            <div class="search-type">
              <dl class="search-game top">
                <dt>游戏类型:</dt>
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
                <dt>赔钱线数:</dt>
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
                <dt>游戏风格:</dt>
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
        <!-- <div ref="list_winner" :style="{height:offsetHeight+'px'}" v-show="$route.query.id!=='10042'&&$route.query.id!=='10020'&&
        $route.query.id!=='10021'&&$route.query.id!=='10014'" class="list_winner">-->

        <!-- <div ref="list_winner" :style="{height:offsetHeight+'px'}" v-show="false" class="list_winner">
                    <div>
                        <div class="section_title">
                            <h4>
                                <i class="iconfont icon-zhongjiangmingdan"></i>中奖名单
                            </h4>
                        </div>
                        <div class="topLoop">
                            <ul>
                                <div class="wrap">
                                    <li :key="index" v-for="(item,index)   in scrollDatas">
                                        <div class="gamepic">
                                            <img :src="item.ico" alt>
                                        </div>
                                        <div class="wintext">
                                            <div>恭喜玩家{{item.account}}****在{{item.name}}</div>
                                            <div>
                                                存款
                                                <span>{{item.in===0?100:item.in}}</span>元
                                            </div>
                                            <div>
                                                喜提￥
                                                <span>{{+item.out===0?10000:Math.floor(item.out)}}</span>元
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
        </div>-->
      </div>
      <!-- 游戏列表 -->
      <div class="game-box">
        <div class="game-content">
          <ul>
            <li class="game-item" :key="index" v-for="(item,index) in gameData">
              <div class="game-pic">
                <img :src="item.icon" :class="{'default':true,'mg-pic':$route.query.id==='26'}" alt />
              </div>
              <h3>{{item.name}}</h3>
              <div class="bgcover" v-show="Public_User!=='test'"></div>
              <div class="goGamebtn" v-show="Public_User!=='test'">
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
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
import { _SetGet, _SetPost } from "@/service/public/service.js";
import UserService from "@/service/public/UserService.js";
import mixin from "./public.js";

export default {
  mixins: [mixin],
  data() {
    return {
      reward: 562562652.32,
      rewardList: [],
      // 修改
      showGames: [],
      random: [
        {
          account: "",
          name: "MG老虎机逐鹿三国",
          ico: "/static/public/image/game/ptgame/2049.png",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "JDB电子直播变脸",
          ico: "/static/public/image/game/ptgame/171.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "AG老虎机运财羊",
          ico: "/static/public/image/game/ptgame/271.gif",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "AG老虎机麻将老虎机",
          ico: "/static/public/image/game/ptgame/266.gif",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "MG老虎机城市猎人",
          ico: "/static/public/image/game/ptgame/1921.png",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "开元棋牌抢庄牛牛",
          ico: "/static/public/image/game/ptgame/245.png",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "FG老虎机炸金花",
          ico: "/static/public/image/game/ptgame/2551.png",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "FG老虎机二人麻将",
          ico: "/static/public/image/game/ptgame/2549.png",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "DT老虎机传奇之路",
          ico: "/static/public/image/game/ptgame/80.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "VG棋牌百人牛牛",
          ico: "/static/public/image/game/ptgame/3620.png",
          in: 0,
          out: 0
        }
      ],
      scrollDatas: [],
      jackpotNum1: 28318571,
      jackpotNum2: 12961370,
      noticePosition: 0,
      publicUrl: "http://img.7900005.com/",
      currenttype: "",
      currentline: "",
      currentTag: "",
      gameData: [],
      offsetHeight: 187,
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
    initWinningInfo() {
      let data = [];
      let games = [
        { city: "广州", gameName: "跳高高" },
        { city: "齐齐哈尔", gameName: "金钱蛙" },
        { city: "武汉", gameName: "冰上曲棍球" },
        { city: "吉林", gameName: "篮球巨星" },
        { city: "昆明", gameName: "水果拉霸" },
        { city: "深圳", gameName: "湛蓝深海" },
        { city: "郑州", gameName: "金钱蛙" },
        { city: "青岛", gameName: "飞天" },
        { city: "唐山", gameName: "发财神" },
        { city: "合肥", gameName: "空手道猪" },
        { city: "绵阳", gameName: "雷霆风暴" },
        { city: "贵阳", gameName: "水果拉霸" },
        { city: "南宁", gameName: "嗨爆大马戏" },
        { city: "海南", gameName: "熊之舞" },
        { city: "锦江", gameName: "水果拉霸" },
        { city: "江州", gameName: "跳高高" },
        { city: "十堰", gameName: "侠盗猎车手" },
        { city: "甘肃", gameName: "不朽的爱情" },
        { city: "南京", gameName: "雷霆风暴" },
        { city: "长沙", gameName: "银行劫匪" },
        { city: "石家庄", gameName: "嗨爆大马戏" },
        { city: "北京", gameName: "冰上曲棍球" },
        { city: "辽宁", gameName: "城市猎人" },
        { city: "马鞍山", gameName: "逐鹿三国" },
        { city: "内蒙古", gameName: "篮球巨星" },
        { city: "郴州", gameName: "跳高高" },
        { city: "衡水", gameName: "逐鹿三国" },
        { city: "赣州", gameName: "108好汉" },
        { city: "黄冈", gameName: "银行劫匪2" },
        { city: "广州", gameName: "不朽的浪漫" },
        { city: "东莞", gameName: "德州扑克" },
        { city: "株洲", gameName: "押庄龙虎" },
        { city: "上海", gameName: "斗地主" },
        { city: "徐州", gameName: "不朽的爱情" },
        { city: "济南", gameName: "十三水" },
        { city: "威海", gameName: "抢庄牛牛" },
        { city: "台州", gameName: "飞天" },
        { city: "徐州", gameName: "冰上曲棍球" },
        { city: "福州", gameName: "雷霆风暴" },
        { city: "泉州", gameName: "不朽的浪漫" },
        { city: "厦门", gameName: "空手道猪" },
        { city: "汕头", gameName: "银行劫匪2" },
        { city: "桂林", gameName: "银行劫匪" },
        { city: "重庆", gameName: "雷霆风暴" },
        { city: "长沙", gameName: "108好汉" },
        { city: "南京", gameName: "飞天" },
        { city: "烟台", gameName: "发财神" },
        { city: "昆明", gameName: "湛蓝深海" },
        { city: "宁波", gameName: "冒险丛林" },
        { city: "上海", gameName: "大航海时代" }
      ];
      for (let i = 0; i < games.length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        num = num < 10 ? num * 1234 : num;
        num = num < 100 ? num * 123 : num;
        num = num < 1000 ? num * 12 : num;
        num = num > 99999 ? 86563 : num;
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        name = name.substr(0, 3);

        data[i] = {
          city: games[i].city,
          userName: name,
          gameName: games[i].gameName,
          money: num
        };
      }

      this.arraySort(data, (v1, v2) => v1.num < v2.num);
      this.rewardList = data;
    },
    //获取数据
    async getData(item) {
      this.gameData = [];
      let idArr = this.idlist;
      // 获取到所有的id
      // this.rollList.forEach(v=>{
      //   idArr.push(v.id);
      // })

      let id = this.$route.query.id;
      // 首次加载获取，第一页数据
      let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
        id,
        device: "pc"
      });
      if (res && res.code === 200) {
        this.showGames = res.data[id];
        // this.gameData=this.showGames.splice(0,20)
        this.gameData = this.showGames;
        this.pageDatas.page = 1;
        this.total = Math.ceil(this.showGames.length / 20);
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
      this.gameData = this.showGames;
      this.pageDatas.page = 1;
      this.total = Math.ceil(this.showGames.length / 20);
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
          id: item.id
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
      // this.getData();
      this.giveDataById(item.id);
      this.$nextTick(() => {
        this.offsetHeight =
          this.$refs["search-container"].offsetHeight < 100
            ? 100
            : this.$refs["search-container"].offsetHeight;
      });
    },
    //下一页
    async nextpage() {
      if (this.pageDatas.page < this.total) {
        this.pageDatas.page = this.pageDatas.page + 1;
        // this.getData();
        this.fenshu();
      }
    },
    //上一页
    async prevpage() {
      if (this.pageDatas.page > 1) {
        this.pageDatas.page = this.pageDatas.page - 1;
        // this.getData();
        this.fenshu();
      }
    },
    //第一页
    async firstpage() {
      this.pageDatas.page = 1;
      // this.getData();
      this.fenshu();
    },
    //最后一页
    async lastpage() {
      this.pageDatas.page = this.total;
      // this.getData();
      this.fenshu();
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
      // this.gameData=datas.splice(0,20)
      this.gameData = datas;
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
      this.gameData = gameList;
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
        this.jackpotNum1 =
          parseInt(this.jackpotNum1) +
          9 +
          "." +
          Math.floor(Math.random() * 9 + 1) +
          Math.floor(Math.random() * 9 + 1);
        // this.jackpotNum1 = this.jackpotNum1 + 8.56;
      }, 300);
    },

    async slider() {
      let ul = document.getElementById("slider");
      let prev = document.getElementsByClassName("prev")[0];
      let next = document.getElementsByClassName("next")[0];
      let main = document.getElementsByClassName("mainbox")[0];
      let n = -97;

      function left() {
        let oLi = ul.children[0];
        ul.className = "move";
        setTimeout(function() {
          ul.removeChild(oLi);
          ul.appendChild(oLi);
          ul.className = "";
        }, 500);
      }

      function right() {
        let last = ul.lastElementChild;
        ul.removeChild(last);
        ul.insertBefore(last, ul.childNodes[0]);
        ul.style.left = n + "px";
        ul.className = "back";
        setTimeout(function() {
          ul.className = "";
          ul.style.left = "";
        }, 500);
      }

      prev.onclick = right;
      next.onclick = left;
      let timer = null;
      timer = setInterval(left, 4000);
      main.onmouseover = function() {
        clearInterval(timer);
      };
      main.onmouseout = function() {
        timer = setInterval(left, 4000);
      };
    },
    // 初始化列表
    rollListInit() {
      let nrollList = [];
      this.rollList.forEach((item, index) => {
        if (item.id == 10042 || item.id == 10041) {
        } else {
          nrollList.push(item);
        }
      });
      this.rollList = nrollList;
    },
    getRollList(routeId) {
      let RollList = JSON.parse(localStorage.rollList);
      for (let i = 0; i < RollList.length; i++) {
        RollList[i].id === routeId && this.fetchgames(RollList[i]);
        return false;
      }
    }
  },
  created() {
    this.getid();
    if (this.$store.state.szc.changedian) {
      this.fetchgames(this.$store.state.szc.changedian);
    }
    this.$nextTick(() => {
      this.slider();
      // if (this.$route.query.id) {
      //   this.resetItem();
      // } else {
      //   this.fetchgames(this.rollList[0]);
      // }
    });
    let chars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "j",
      "k",
      "-",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];

    // 随机用户名
    function generateMixed(n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 62);
        res += chars[id];
      }
      return res;
    }

    //50个模型demo
    let datas = [];
    for (let index = 0; index < 50; index++) {
      // debugger
      let obj = {};
      // for(let key in this.random[Math.floor(Math.random() * 10)]) {
      //   obj[key]=this.random[Math.floor(Math.random() * 10)][key]
      // }
      Object.assign(obj, obj, this.random[Math.floor(Math.random() * 10)]);
      datas.push(obj);
    }
    // 求出随机数
    datas.forEach((item, v) => {
      item.in = Math.random().toFixed(2) * 1000;
      item.out =
        Math.random().toFixed(2) * 1000 * Math.random().toFixed(1) * 100 < 1
          ? 10000
          : Math.random().toFixed(2) * 1000 * Math.random().toFixed(1) * 100;
      item.account = generateMixed(3);
    });
    this.scrollDatas = datas;
  },
  mounted() {
    this.initWinningInfo();
    if (localStorage.hotgame) {
      this.fetchgames(JSON.parse(localStorage.hotgame));
    }
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    this.jackpotNumAdd();

    // 展示数据
    this.getAllDatas();

    // 初始化导航栏的数据
    if (this.$websiteName == "cjw") {
      this.rollListInit();
    }

    this.getRollList(this.$route.query.id);
  },
  watch: {
    $route() {
      this.getAllDatas();
      this.getRollList(a.query.id);
    }
    // pageDatas:{
    //   handler(nVal,oVal){
    //     if(nVal.page!=oVal.page){
    //       this.pageDatas.page=nVal.page;
    //       let prepNum=nVal*20;
    //       let nextNum=(nVal+1)*20;
    //       if(nextNum>this.showGames.length){
    //         nextNum=this.showGames.length
    //       }
    //       this.gameData=this.showGames.splice(prepNum,nextNum)
    //     }
    //   },
    //   deep:true
    // }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.mainContainer {
  background: #693a00;
  padding: 15px 0;
  width: 1000px;
  margin: 0 auto;

  .mainContent {
    margin: 0 auto;
    width: 1000px;
    padding-bottom: 1px;

    .jianglun {
      height: 245px;
      background: url(/static/jsyl/img/dianzi/jianglun.png) no-repeat center top;

      .jiangnei {
        width: 240px;
        padding-top: 42px;
        float: right;

        .jiangchi {
          width: 240px;
          font-size: 20px;
          color: #fffb47;
          line-height: 34px;
          padding-left: 50px;
          padding-bottom: 25px;
        }

        .luntop {
          width: 264px;
          height: 120px;
          position: relative;
          overflow: hidden;
          transform: translate(-54px, 0);

          &:hover {
            .winner_list {
              animation-play-state: paused;
            }
          }

          .winner_list {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            animation: animateSub2 80s linear infinite;

            @keyframes animateSub2 {
              0% {
                top: 0;
              }
              to {
                top: -1200px;
              }
            }

            li {
              font-size: 12px;
              line-height: 24px;
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -webkit-justify-content: space-between;
              -ms-flex-pack: justify;
              justify-content: space-between;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              color: #fff;

              span {
                font-size: 12px;
                line-height: 24px;

                &.city_name {
                  width: 52px;
                }
                &.user_name {
                  width: 42px;
                }
                &.lut3 {
                  // padding-right: 2px;
                }
                &.game_name {
                  width: 62px;
                  color: #fbcf4c;
                }
                &.money_amount {
                  width: 78px;
                  em {
                    color: #f80000;
                  }
                }
              }
            }
          }
        }
      }
    }

    .mainbox {
      margin: 0 auto;
      width: 100%;
      position: relative;
      margin-top: 10px;
      background: url(/static/jsyl/img/dianzi/dianziqiebg.png) center top
        no-repeat;

      .nav {
        width: 23px;
        height: 90px;
        position: absolute;
        cursor: pointer;
        line-height: 90px;
        font-weight: bold;
        font-size: 24px;
        text-align: center;

        &.prev {
          left: 0;
          background: url(/static/jsyl/img/dianzi/dbtle.png) center center
            no-repeat;
        }
        &.next {
          right: 0;
          background: url(/static/jsyl/img/dianzi/dbtri.png) center center
            no-repeat;
        }
      }

      .box {
        width: 952px;
        height: 90px;
        position: relative;
        margin: 0 auto;
        overflow: hidden;

        #slider {
          position: absolute;
          width: 1200px;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          li {
            width: 95px;
            height: 60px;
            text-align: center;
            position: relative;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            background: url(/static/jsyl/img/dianzi/dianxian.png) no-repeat left
              center;

            &:hover {
              span {
                color: #fff;
                text-decoration: underline;
              }
            }
            &.active {
              span {
                color: #fff;
                text-decoration: underline;
              }
            }

            i {
              width: 100%;
              height: 40px;
              background-size: contain;
            }

            span {
              color: #693a00;
              line-height: 20px;
            }

            &.ae {
              .slider-ae-icon {
                background: url("/static/jsyl/img/dianzi/ae.png") center center
                  no-repeat;
              }
            }
            &.ag {
              .slider-ag-icon {
                background: url("/static/jsyl/img/dianzi/ag.png") center center
                  no-repeat;
              }
            }
            &.bbin {
              .slider-bbin-icon {
                background: url("/static/jsyl/img/dianzi/bbin.png") center
                  center no-repeat;
              }
            }
            &.cq9 {
              .slider-cq9-icon {
                background: url("/static/jsyl/img/dianzi/cq9.png") center center
                  no-repeat;
              }
            }
            &.dt {
              .slider-dt-icon {
                background: url("/static/jsyl/img/dianzi/dt.png") center center
                  no-repeat;
              }
            }
            &.dz {
              .slider-dz-icon {
                background: url("/static/jsyl/img/dianzi/dz.png") center center
                  no-repeat;
              }
            }
            &.fg {
              .slider-fg-icon {
                background: url("/static/jsyl/img/dianzi/fg.png") center center
                  no-repeat;
              }
            }
            &.jdb {
              .slider-jdb-icon {
                background: url("/static/jsyl/img/dianzi/jdb.png") center center
                  no-repeat;
              }
            }
            &.ky {
              .slider-ky-icon {
                background: url("/static/jsyl/img/dianzi/ky.png") center center
                  no-repeat;
              }
            }
            &.ly {
              .slider-ly-icon {
                background: url("/static/jsyl/img/dianzi/ly.png") center center
                  no-repeat;
              }
            }
            &.mg {
              .slider-mg-icon {
                background: url("/static/jsyl/img/dianzi/mg.png") center center
                  no-repeat;
              }
            }
            &.mw {
              .slider-mw-icon {
                background: url("/static/jsyl/img/dianzi/mwg.png") center center
                  no-repeat;
              }
            }
            &.pt {
              .slider-pt-icon {
                background: url("/static/jsyl/img/dianzi/pt.png") center center
                  no-repeat;
              }
            }
            &.ttg {
              .slider-ttg-icon {
                background: url("/static/jsyl/img/dianzi/ttg.png") center center
                  no-repeat;
              }
            }
            &.vg {
              .slider-vg-icon {
                background: url("/static/jsyl/img/dianzi/vg.png") center center
                  no-repeat;
              }
            }

            &:hover {
              color: #fff;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .search-container {
      width: 100%;
      padding: 33px 0 0 20px;
      position: relative;

      &:after {
        clear: both;
        content: "";
        display: block;
      }

      .search-info {
        width: 666px;
        float: left;
        .search-head {
          height: 55px;
          padding: 0;

          .left {
            float: left;

            .bg-search {
              width: 36px;
              height: 26px;
              display: inline-block;
              vertical-align: middle;
              background: url("/static/jsyl/img/dianzi/search_ico.png") center
                center no-repeat;
            }

            .label {
              display: inline-block;
              vertical-align: middle;
              color: #f6c954;
              text-align: left;
              font-size: 18px;
              font-weight: 600;
              padding: 0 6px;
              line-height: 1;
            }

            .ipt-group {
              width: 280px;
              height: 36px;
              position: relative;
              display: inline-block;
              vertical-align: middle;
              background: #fff;
              border-radius: 4px;
              margin-right: 10px;

              .ipt {
                border: none;
                width: 100%;
                height: 100%;
                padding: 0 10px;
                line-height: 36px;
                font-size: 14px;
                color: #323232;
                background-color: transparent;
                outline: none;
              }
            }

            .btn-search {
              width: 94px;
              height: 36px;
              vertical-align: middle;
              background: #f6c954;
              border-radius: 4px;
              font-size: 18px;
              color: #441f0c;
              font-weight: bold;
              text-align: center;
              cursor: pointer;
              user-select: none;
              border: none;
              outline: none;
            }
          }

          .right {
            float: right;

            button {
              width: 114px;
              height: 36px;
              font-size: 16px;
              color: #fff;
              background: #787876;
              border-radius: 7px;
              line-height: inherit;
              cursor: pointer;
              outline: none;
              border: 1px solid transparent;
              user-select: none;
              white-space: nowrap;
            }
          }
        }

        .search-detail {
          margin-top: 15px;
          padding-left: 7px;
          padding-bottom: 16px;
          overflow: hidden;
          text-align: left;
          border: none;

          .search-type {
            .search-game {
              margin-bottom: 5px;
              height: 38px;
              line-height: 38px;

              dt {
                margin-right: 5px;
                color: #f6c954;
                display: inline-block;
                vertical-align: middle;
                font-size: 14px;
              }

              dd {
                display: inline-block;
                vertical-align: middle;

                a {
                  display: inline-block;
                  padding: 0 12px;
                  line-height: 30px;
                  color: #fff;
                  text-decoration: none;
                  text-align: center;
                  background-color: transparent;
                  font-size: 14px;

                  &:hover {
                    color: #ad9444;
                    text-decoration: underline;
                  }

                  &.active {
                    background: #f6c954;
                    color: #4e2a10;
                    border-radius: 4px;
                  }
                }
              }
            }
          }
        }
      }

      .list_winner {
        position: relative;
        float: right;
        width: 250px;
        background: #f8f1e8;
        top: 0;
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
                  color: #337ab7;
                  line-height: 1.4;

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
      margin-left: -2px;
      width: 1020px;

      .game-content::-webkit-scrollbar {
        display: none;
      }

      .game-content {
        width: 1020px;
        min-height: 300px;
        position: relative;
        overflow: auto;

        ul {
          margin: 0 15px;
        }

        .game-item {
          float: left;
          width: 177px;
          height: 256px;
          padding: 10px 10px;
          margin: 0 10px 20px 10px;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          color: #fff;
          text-align: center;
          background: #7a4800;
          border: 1px solid #a36204;
          box-shadow: none;
          overflow: hidden;
          transition: all 0.4s;
          transform: translateY(3px);

          &:hover {
            transition: all 0.4s;
            transform: translateY(-3px);
            .bgcover,
            .goGamebtn {
              display: block;
            }
          }

          .game-pic {
            width: 154px;
            height: 154px;
            overflow: hidden;

            .default {
              width: 154px;
              height: 154px;
            }
          }

          h3 {
            font-size: 14px;
            line-height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
              color: #c97a09;
              width: 96px;
              height: 30px;
              line-height: 30px;
              transform: translate(-50%, -50%);
              background: url(/static/jsyl/img/dianzi/dzenter.png) no-repeat
                center top;
              font-size: 16px;
              cursor: pointer;
              text-align: center;
              -webkit-border-radius: 16px;
              border-radius: 16px;
            }
          }
        }
      }

      .pagenation {
        height: 35px;
        text-align: center;
        margin-top: 0;

        li {
          display: inline-block;
          height: 100%;
          line-height: 35px;
          padding: 0 14px;
          border: 1px solid #a36204;
          border-radius: 3px;

          a {
            color: #a36204;
          }
        }
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
