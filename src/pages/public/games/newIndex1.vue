<template>
  <div id="maincontainer">
    <div class="mainContent">
      <div ref="search-container" class="search-container">
        <div class="search-head">
          <div class="left">
            <div class="ipt-group">
              <input v-model="iptVal" class="ipt" placeholder="请输入游戏名称" autocomplete="off" @keyup.enter="search()">
              <div class="searchbox" @click="search()">
              </div> 
              <div v-if="nowTypeList.type.list.length" class="right">
                  <span @click="reset()">x</span>
              </div>
            </div>
          </div>
        </div>
        <div class="search-info">
          <div class="search-detail">
            <div class="search-type">
              <ul class="gameType clear">
                 <li v-for="(item,index) in rollList" :key="index" class="lf gameName" @click="fetchgames(item,index)" :class="{active:index==gameIndex}"><a href="javascript:;">{{item.name}}</a></li>
                 <span class="allGame">全部游戏：</span>
              </ul>
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
                  :src="item.icon"
                  :class="{'default':true,'mg-pic':$route.query.id==='26'}"
                  alt
                >
              </div>
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
      showGames:[],
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
      gameIndex:1,
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
      idlist:[],
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
      // 获取棋牌游戏数据
      async getDataQpai(){
          let id='10004'
          let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
          id,
          device: 'pc',
          })
          if(res && res.code==200){
            sessionStorage.setItem("qipai",JSON.stringify(res.data[10004]));
          }
      },
      // 获取棋牌所有数据
      async getData(){
        var allGameData = {};
        let idArr = [];
        var gameList = [];
        let id = this.$route.query.id;
        if(sessionStorage.qipai){
          var idBoxlist = JSON.parse(sessionStorage.qipai)
        }else{
          this.getDataQpai()
        }
        idBoxlist.forEach((item =>{
          const qipaiData = {
                id: item.id,
                name: item.name=='开元棋牌游戏'||item.name=='棋牌游戏'?item.name='开元棋牌':item.name,
                class: item.code=='VG_CHESS'?item.code='vg':item.code||item.code=='KY_CHESS'?item.code='ky':item.code,
                type: { list: [] },
                line: { list: [] }
          }
          this.rollList.push(qipaiData)
        }))
        this.rollList.forEach((v)=>{
          idArr.push(v.id)
        })
        let gameId
        let res
        for(let i=0;i<idArr.length;i++){
            gameId = idArr[i];
            if(gameId!=0){

                res = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
                id:gameId,
                device: 'pc',
              })
            }
            
          if (res && res.code === 200) {
            gameList = (res.data[gameId])
            allGameData[idArr[i]] = gameList;
            
          }
        }
          allGameData['allDatas']=this.allDatas;
          localStorage.setItem("gameDate",JSON.stringify(allGameData));
          this.gameData = allGameData['10042']
      },
  
    async fetchgames (item,index) {
      this.gameIndex = index
      if(!localStorage.gameDate){
        return false;
      }
      let gameDate = JSON.parse(localStorage.gameDate);
      if(item){
        this.gameId = item.id;
        for(let game in gameDate){
          if(game==item.id){
            this.gameData = gameDate[game]
            this.showGames=gameDate[game]
          }
        }
        this.allDatas=gameDate['allDatas']
      }
    },

    resulttype(item) {
      this.currenttype = item.tag;
      this.getData();
    },
    resultline(item) {
      this.currentline = item.tag;
      this.getData();
    },
    resultTag(item) {
      this.currentTag = item.tag;
      this.getData();
    },

    async search() {
      this.pageDatas.page = 1;
      let gameList=[];
      gameList=this.showGames.filter(item=>{
        if(item.name.includes(this.iptVal)){
          return item;
        }
      })
      this.gameData=gameList
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
    }
  },
  created() {
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
      let obj = {};
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
  mounted () {
        let isquestion=localStorage.getItem("gameDate");
        if(!isquestion){
          this.getData()
        }else{
          // 还得接着判断，如果，是原来的旧数据，需要处理一波
          if(JSON.parse(isquestion)['allDatas']&&JSON.parse(isquestion)['allDatas'].length>0){
            //是新数据，直接执行下面的
            this.changgeme({id:this.gameId})
          }else{
            // 是原来的缓存，需要重新请求数据
            this.getData()
          }
        }
       if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        this.publicUrl = config.statics
      }
    },
  components: {}
};
</script>

<style lang="less" scoped>
.gameType{
    padding-left:82px;
    position:relative;
    li.active{
        a{
            color: #7d34c7;
            border-bottom: 2px solid #7d34c7;
        }
    }
}
.allGame{
    position:absolute;
    left:0;
    top:8px;
    margin-right: 10px;
    color: #636363;
    display: inline-block;
    vertical-align: middle;
    font-size: 17px;
    line-height:28px;
}
.gameName{
    margin: 8px -3px;
    padding: 0 10px;
    line-height: 28px;
    text-decoration: none;
    text-align: center;
    background-color: transparent;
    font-size: 17px;
    a{
        color: #636363;
    }
    a:hover{
        color: #7d34c7;
        border-bottom: 2px solid #7d34c7;
        cursor:pointer;
    }
   
}
.lf{
    float:left;
}
.rt{
    float:right;
}
.clear:after{
    content:'';
    display:block;
    clear:both;
}
#maincontainer {
  // padding-bottom: 20px;
  // padding-top: 10px;
  // background: url("/static/public/image/game/ptgame/slotGame_bg.jpg") no-repeat,
  //   #f3f2ef;
  // background-size: 100% 120%;
}

.mainContent {
//   background-color: #fafafa;
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
    background: url(http://betsb.3000018.com/game/img/jackpot-light1.png) no-repeat;
    background-size: contain;
    background-position: center;
    /* text-align: center; */
    /* margin: 0 auto; */
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
    padding-right: 60px;
    position: absolute;
    /* display: inline-block; */
    right: 0;
      // border-bottom: 1px dashed #c1c1c1;
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
        width: 253px;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px 0 0 3px;
        border: 1px solid #afafb4;
        box-sizing: border-box;

          .ipt {
            border: none;
            width: 100%;
            padding: 0 10px;
            height: 32px;
            line-height: 32px;
            color: #c1c1c1;
            background-color: transparent;
            outline: none;
            box-sizing: border-box;
          }
          .searchbox{
            position: absolute;
            right: -60px;
            top: -1px;
            width: 60px;
            height: 34px;
            z-index: 8;
            background: url(/static/public/image/game/ptgame/gobtn.jpg) no-repeat center;
            background-size: cover;
            cursor: pointer;
            // .bg-search {
            //     display: inline-block;
            //     width: 26px;
            //     height: 26px;
            //     vertical-align: middle;
            //     background: url(http://betsb.3000018.com/game/img/slot_sprites.png) -63px -185px;
            //     cursor: pointer;
            //     position: relative;
            //     left: 50%;
            //     top: 50%;
            //     transform: translate(-50%,-50%);
            // }
          }
         
          
          .right {
                // float: right;
                position: absolute;
                right: 10px;
                top: 2px;
                span {
                    // width: 114px;
                    // height: 36px;
                    font-size: 26px;
                    color: #d1d1d1;
                    // background: #787876;
                    // border-radius: 7px;
                    // line-height: inherit;
                    cursor: pointer;
                    // outline: none;
                    // border: 1px solid transparent;
                    // user-select: none;
                    // white-space: nowrap;
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
  // border-bottom: 1px dashed #c9c9c9;
  .search-info {
    width: 800px;
    padding-top: 0px;
    // border-right: 1px dashed #c1c1c1;
   

    .search-detail {
      margin-top: 15px;
      padding-left: 7px;
      padding-bottom: 16px;
      overflow: hidden;
      text-align: left;
      border: none;

      .search-type {
        // float: left;
        // border-right: 1px dashed #c9c9c9;
        .search-game {
            margin-bottom: 10px;
            height: 40px;
            line-height: 40px;

          dt {
            margin-right: 10px;
            color: #636363;
            display: inline-block;
            vertical-align: middle;
            // font-weight: 700;
            font-size: 15px;
          }

          dd {
            display: inline-block;
            vertical-align: middle;

            a {
              display: inline-block;
              margin: 0 4px;
              padding: 0 10px;
              line-height: 28px;
              color: #636363;
              text-decoration: none;
              text-align: center;
              background-color: transparent;
              font-size: 15px;
   
              &:hover {
                color: #7d34c7;
                border-bottom: 2px solid #7d34c7;
              }
            }

            .active {
              color: #7d34c7;
              border-bottom: 2px solid #7d34c7;
              padding: 0 7px;
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
    margin-bottom: 80px;
    /* margin-left: -9px; */
    width: 100%;

  .game-content::-webkit-scrollbar {
    display: none;
  }

  .game-content {
    width: 100%;
    // height: 590px;
    position: relative;
    margin-top: 20px;
    margin-left: 2px;
    overflow: auto;
    padding-top: 25px;
    margin-bottom: 20px;

    // ul {
    //   margin: 0 15px;
    // }

    .game-item {
    float: left;
    position: relative;
    // width: 233px;
    width:220px;
    // height: 126px;
    height:186px;
    margin: 0 22px 22px 2px;
    overflow: hidden;

      &:hover img{
        transition: all 0.1s;
        transform:scale(1.1)
      }
      &:hover .bgcover,&:hover .goGamebtn{
          display:block;
      }


      .game-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border:1px solid #eee;
        text-align: center;
        .default {
          width: 90%;
        //   height: 154px;
        margin-top:-13px;
        }

        .mg-pic {
          // width: 200%;

          // &:hover {
          //   transform: translateX(-50%);
          // }
        }
      }
      .bgcover{
          display:none;
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          right:0;
          background:#000;
          opacity:.5;
          transition:all linear .3s;
          
      }
      .goGamebtn{
          display:none;
          position:relative;
          transition:all linear .3s;
          a {
            &.play {
                cursor: pointer;
                text-align: center;
                position: absolute;
                bottom: 66px;
                left: 60px;
                background-color: rgba(117, 68, 217, .85);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#D97544D9', endColorstr='#D97544D9', GradientType=0);
                font-size: 14px;
                color: #fff;
                width: 120px;
                line-height: 30px;
                -webkit-border-radius: 36px;
                border-radius: 15px;
            }
            &.play:hover{
                background-color: rgba(117, 68, 217, 1);
            }
            &#try:hover{
                background-color: rgba(77 , 71, 194,1);
            }

            &#try{
                cursor: pointer;
                text-align: center;
                position: absolute;
                bottom: 30px;
                left: 60px;
                background-color: rgba(77 , 71, 194,.7);
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

      .gameMask {
          background:#000;
          opacity:.6;
          position:absolute;
          bottom:0;
          width:100%;
          height:25px;
          padding:0 4px;
          z-index: 1;
          .gameItemName{
              line-height:25px;
              margin:0;
              float:left;
              color:#fff;
          }
          .collectImg{
              float:right;
              width:21px;
              height:18px;
              margin-top:3.5px;
              background:url(/static/public/image/game/ptgame/icon-love.png) no-repeat center;
          }                           
        // color: #333;
        // font-size: 16px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // margin: 10px 0;
        // margin-top: 5px;
      }

      
    }
    .game-item:nth-child(5n){
      margin-right:0;
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
