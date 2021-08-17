<template>
  <div class="new-index klk-home">
    <div class="newgong">
      <div class="newgong-content" @click="showTextModal()">
        <div class="notice">
          <i class="iconfont icon-sound"></i>
        </div>

        <div class="demolist list">
          <marquee
            v-if="lantern"
            align="middle"
            direction="left"
            loop="-1"
            scrollamount="3"
            onmouseout="this.start()"
            onmouseover="this.stop()"
            style="color: white; font-size: 15px; line-height: 40px;overflow: hidden;height: 40px;"
          >
            <span v-html="lantern"></span>
          </marquee>
        </div>
      </div>
    </div>
    <!-- 新轮播图接口写法 -->
    <div class="carouse" >
        <Carousel autoplay loop style="height:530px">
          <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems" >
              <img :src="item.img" />
          </Carousel-item>
        </Carousel>
    </div>
    <div class="downLoad-wrap">
      <div class="download">
        <div class="app_part">
          <i class="xiazai"></i>
          <h3>下载专区</h3>
        </div>
        <div class="down_part" @click="$router.push({path:'/home/partner'})">
          <i class="daili"></i>
          <h3>代理加盟</h3>
        </div>
      </div>
      <div class="jackpots active">
        <div class="light">
          <div class="jackpot-title">
            <img src="/static/klk/img/jockpot.png" alt>
          </div>
          <div class="jackpot-number">
            <span>￥</span>
            <span>{{jackpotNum.toString().substring(0,3)}}</span>
            <span>，</span>
            <span>{{jackpotNum.toString().substring(3,6)}}</span>
            <span>，</span>
            <span>{{jackpotNum.toString().substring(6,9)}}</span>
            <span>.</span>
            <span>{{jackpotNum.toString().substring(9,11)}}</span>
          </div>
          <div class="jackpots_bar">
            <img src="/static/klk/img/jack_bar.png">
          </div>
          <div class="jackpots_model">
            <img src="/static/klk/img/jack_model.png">
          </div>
        </div>
      </div>
    </div>
    <div class="kelake-bot-wrap">
      <div class="game-list-left">
        <div class="winner_list">
          <div class="section_title">
            <h4>
              <i class="zhongjiang"></i>中奖名单
            </h4>
          </div>
          <div class="topLoop">
            <ul>
              <li :key="index" v-for="(item,index)   in scrollDatas" >
                  <div class="gamepic">
                    <img :src="item.ico" alt>
                  </div>
                  <div class="wintext">
                    <div>恭喜玩家{{item.account}}****在{{item.name}}</div>
                    <div>
                      存款
                      <span>{{item.in==0?100:item.in}}</span>元
                    </div>
                    <div>
                      喜提￥
                      <span>{{+item.out==0?10000:Math.floor(item.out)}}</span>元
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="game-list-right">
        <div class="section_title">
          热门游戏推荐
          <ul class="type">
            <li
              @click="optionFc(item)"
              :key="index"
              v-for="(item,index) in optionList"
              :class="{'active':optionSel==item.name}"
            >
              <a :class="{'active':optionSel==item.name}" href="javascript:void(0)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="all">
          <div @click="upCarl" class="arrow left">
            <div class="bg-arrow_left"></div>
          </div>
          <Carousel
            ref="carousel"
            class="all-vrL"
            v-model="value3"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :trigger="setting.trigger"
            :arrow="setting.arrow2"
          >
            <Carousel-item :key="outIndex" v-for="(outItem,outIndex) in optionList">
              <ul class="type-ul">
                <li :key="index" v-for="(item,index) in showTypList" class="type-li">
                  <!-- lmm optionSel -->
                  <div :class="[{'active':optionSel=='MG'}]" class="img">
                    <img :src="$getStaticUrl()+item.icon" alt>
                  </div>
                  <div class="mask">
                    <div class="play" @click="$loginGame(item)">
                      <a href="javascript:void(0);">进入游戏</a>
                    </div>
                  </div>
                  <div class="text">{{item.name}}</div>
                </li>
              </ul>
            </Carousel-item>
          </Carousel>
          <div @click="downCarl" class="arrow right">
            <div class="bg-arrow_right"></div>
          </div>
        </div>
        <div class="slot_game game-bg">
          <Carousel
            class="slot-vrL"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :trigger="setting.trigger"
            :arrow="setting.arrow"
          >
            <Carousel-item>
              <ul class="item_list">
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10022'})">
                  <div class="ball">MG</div>
                  <div class="text">MG老虎机</div>
                </li>
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10015'})">
                  <div class="ball">AG</div>
                  <div class="text">AG老虎机</div>
                </li>
                <li class="item loy" @click="$router.push({path:'home/slot?navid=9&id=10024'})">
                  <div class="ball">PT</div>
                  <div class="text">PT老虎机</div>
                </li>
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10018'})">
                  <div class="ball">CQ9</div>
                  <div class="text">CQ9老虎机</div>
                </li>
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10020'})">
                  <div class="ball">FG</div>
                  <div class="text">FG老虎机</div>
                </li>
              </ul>
            </Carousel-item>
            <Carousel-item>
              <ul class="item_list">
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10021'})">
                  <div class="ball">JDB</div>
                  <div class="text">JDB电子</div>
                </li>
                <li class="item loy" @click="$router.push({path:'home/slot?navid=9&id=10016'})">
                  <div class="ball">BBIN</div>
                  <div class="text">BBIN老虎机</div>
                </li>
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10019'})">
                  <div class="ball">DT</div>
                  <div class="text">DT老虎机</div>
                </li>
                <li class="item" @click="$router.push({path:'home/slot?navid=9&id=10023'})">
                  <div class="ball">MW</div>
                  <div class="text">MW老虎机</div>
                </li>
              </ul>
            </Carousel-item>
          </Carousel>
        </div>
        <div class="live_game">
          <div class="live game-bg">
            <Carousel
              class="vrL"
              :autoplay="setting.autoplay"
              :autoplay-speed="setting.autoplaySpeed"
              :dots="setting.dots"
              :trigger="setting.trigger"
              :arrow="setting.arrow"
            >
              <Carousel-item>
                <ul class="item_list">
                  <li
                    class="item"
                    @click="$loginGame({name:'OG视讯厅',id:'48',platform:'live_casino'})"
                  >
                    <div class="ball">OG</div>
                    <div class="text">OG视讯厅</div>
                  </li>
                  <li
                    class="item"
                    @click="$loginGame({name:'eBET视讯厅',id:'43',platform:'live_casino'})"
                  >
                    <div class="ball">eBET</div>
                    <div class="text">eBET视讯厅</div>
                  </li>
                  <!-- <li
                    class="item loy"
                    @click="$loginGame({name:'LMG视讯厅',id:'45',platform:'live_casino'})"
                  >
                    <div class="ball">LMG</div>
                    <div class="text">LMG视讯厅</div>
                  </li> -->
                </ul>
              </Carousel-item>
              <Carousel-item>
                <ul class="item_list">
                  <li class="item" @click="$loginGame({name:'AG视讯',id:'31',platform:'live_casino'})">
                    <div class="ball">AG</div>
                    <div class="text">AG视讯</div>
                  </li>
                  <li
                    class="item"
                    @click="$loginGame({name:'BBIN视讯',id:'32',platform:'live_casino'})"
                  >
                    <div class="ball">BBIN</div>
                    <div class="text">BBIN视讯</div>
                  </li>
                  <li
                    class="item loy"
                    @click="$loginGame({name:'BG视讯',id:'3180',platform:'live_casino'})"
                  >
                    <div class="ball">BG</div>
                    <div class="text">BG视讯</div>
                  </li>
                  <li class="item" @click="$loginGame({name:'DG视讯',id:'42',platform:'live_casino'})">
                    <div class="ball">DG</div>
                    <div class="text">DG视讯</div>
                  </li>
                  <li class="item" @click="$loginGame({name:'DS视讯',id:'34',platform:'live_casino'})">
                    <div class="ball">DS</div>
                    <div class="text">DS视讯</div>
                  </li>
                </ul>
              </Carousel-item>
            </Carousel>
          </div>
          <div class="gym game-bg">
            <Carousel
              class="vrL"
              :autoplay="setting.autoplay"
              :autoplay-speed="setting.autoplaySpeed"
              :dots="setting.dots"
              :trigger="setting.trigger"
              :arrow="setting.arrow"
            >
              <Carousel-item>
                <ul class="item_list">
                  <li class="item" @click="$loginGame({name:'沙巴体育',id:'38',platform:'sport'})">
                    <div class="ball">沙巴</div>
                    <div class="text">沙巴体育</div>
                  </li>
                </ul>
              </Carousel-item>
              <Carousel-item>
                <ul class="item_list">
                  <li class="item" @click="$loginGame({name:'皇冠体育',id:'39',platform:'sport'})">
                    <div class="ball">皇冠</div>
                    <div class="text">皇冠体育</div>
                  </li>
                </ul>
              </Carousel-item>
              <Carousel-item>
                <ul class="item_list">
                  <li class="item" @click="$loginGame({name:'IM体育',id:'11368',platform:'sport'})">
                    <div class="ball">IM</div>
                    <div class="text">IM体育</div>
                  </li>
                </ul>
              </Carousel-item>
            </Carousel>
          </div>
        </div>
        <div class="fish_game game-bg">
          <ul class="item_list">
            <li class="item" @click="$loginGame({name:'捕鱼王',platform:'AG_GAME',gameName:'548',id:265})">
              <div class="ball">AG</div>
              <div class="text">捕鱼王</div>
            </li>
            <li
              class="item"
              @click="$loginGame({name:'深海大赢家',platform:'PT_GAME',gameName:'cashfi',id:3296})"
            >
              <div class="ball">PT</div>
              <div class="text">深海大赢家</div>
            </li>
            <li
              class="item loy"
              @click="$loginGame({name:'千炮捕鱼',platform:'MW_GAME',gameName:'1051',id:151})"
            >
              <div class="ball">MW</div>
              <div class="text">千炮捕鱼</div>
            </li>
            <li
              class="item"
              @click="$loginGame({name:'龙王捕鱼',platform:'JDB_GAME',gameName:'7#7002',id:174})"
            >
              <div class="ball">JDB</div>
              <div class="text">龙王捕鱼</div>
            </li>
            <li
              class="item"
              @click="$loginGame({name:'欢乐捕鱼',platform:'FG_GAME',gameName:'fish_hl',id:2626})"
            >
              <div class="ball">FG</div>
              <div class="text">欢乐捕鱼</div>
            </li>
            <li
              class="item"
              @click="$loginGame({name:'美人捕鱼',platform:'FG_GAME',gameName:'fish_mm',id:2576})"
            >
              <div class="ball">FG</div>
              <div class="text">美人捕鱼</div>
            </li>
          </ul>
        </div>
        <div class="lottery_game game-bg">
          <ul class="item_list">
            <li class="item loy" @click="$router.push({path:'/plays/hall'})">
              <div class="ball">传统</div>
              <div class="text">传统彩票</div>
            </li>
            <li class="item loy" @click="$loginGame({id:'30',platform:'vr_lottery',name:'VR彩票',})">
              <div class="ball">VR</div>
              <div class="text">VR彩票</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import store from "@/vuex/store";
import "@/assets/iconfont/klk/iconfont.css";
export default {
  data() {
    return {
      checkedIndex: 0,
      showimg: false,
      showPopout: true,
      popups: "",
      lantern: "",
      value3: 0,
      // 轮播设置
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "none",
        trigger: "click",
        arrow: "hover",
        arrow2: "never"
      },
      // 滚动名单
      random: [
        {
          account: "",
          name: "百人牛牛",
          ico: "/static/public/image/game/ptgame/brnn.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "斗地主",
          ico: "/static/public/image/game/ptgame/ddz.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "二八杠",
          ico: "/static/public/image/game/ptgame/erb.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "欢乐红包",
          ico: "/static/public/image/game/ptgame/hlhb.jpg",
          in: 0,
          out: 0
        },

        {
          account: "",
          name: "抢庄牌九",
          ico: "/static/public/image/game/ptgame/qzpj.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "射龙门",
          ico: "/static/public/image/game/ptgame/slm.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "通比牛牛",
          ico: "/static/public/image/game/ptgame/tbnn.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "幸运五张",
          ico: "/static/public/image/game/ptgame/xywz.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "押庄龙虎",
          ico: "/static/public/image/game/ptgame/yzlh.jpg",
          in: 0,
          out: 0
        },
        {
          account: "",
          name: "炸金花",
          ico: "/static/public/image/game/ptgame/zjh.jpg",
          in: 0,
          out: 0
        }
      ],
      scrollDatas: [],
      // 选项选择
      optionList: [
        { name: "PT", id: "10024", index: 0 },
        { name: "MG", id: "10022", index: 1 },
        { name: "AG", id: "10015", index: 2 },
        { name: "CQ9", id: "10018", index: 3 },
        { name: "DT", id: "10019", index: 4 },
        { name: "BBIN", id: "10016", index: 5 }
      ],
      optionSel: "PT",
      // 显示图片
      showTypList: [],
      carouselData: [],
      jackpotNum: 41126438900,
      setInter: null,
      publicUrl: "http://img.7900005.com/",
      downloadAppTarget: "",
      lanternData: ""
    };
  },
  methods: {
    // showAttention(){
    //   this.$store.commit('alert/changeAttention', true)
    // }, 
    upCarl() {
      if (this.value3 == 0) return false;
      this.value3--;
      if (this.value3 <= 0) {
        this.value3 = 0;
      }
      this.optionSel = this.optionList[this.value3].name;
      this.getTypeL(this.optionList[this.value3].id);
    },
    downCarl() {
      if (this.value3 == this.optionList.length - 1) return false;
      this.value3++;
      if (this.value3 >= this.optionList.length - 1) {
        this.value3 = this.optionList.length - 1;
      }
      this.optionSel = this.optionList[this.value3].name;
      this.getTypeL(this.optionList[this.value3].id);
    },
    optionFc(item) {
      this.optionSel = item.name;
      this.getTypeL(item.id);
      this.value3 = item.index;
    },
    async getTypeL(id) {
      let selectid = id;
      this.showTypList= this.$getGameV4('slot',id).slice(0, 6)
      // this.$store
      //   .dispatch("game/gameSortNew", { id: id, device: "pc" })
      //   .then(res => {
      //     if (res && res.code == 200) {
      //       this.showTypList = res.data[selectid].slice(0, 6);
      //     } else {
      //       this.$store.commit("alert/showTipModel", {
      //         bool: true,
      //         title: res.message,
      //         model: "warn"
      //       });
      //     }
      //   });
    },
    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.jackpotNum = this.jackpotNum + 8.56;
      }, 100);
    },
    // 新文字走马灯接口
    async getLantern() {
      this.$store
        .dispatch("home/newNotice", { type: "lantern", client_type: "PC" })
        .then(res => {
          if (res && res.code == 200) {
            if (res.data.data.length) {
              this.lantern = res.data.data[0] && res.data.data[0].description;
            } else {
              return false;
            }
          }
        });
    },
    async getBanner() {
      this.$store
        .dispatch("home/position", { position: "banner", clientType: "pc" })
        .then(res => {
          if (res && res.code == 200) {
            this.carouselData = res.data[0] && res.data[0].body;
            this.downloadAppTarget =
              res.data[0] && res.data[0].downloadAppTarget;
          }
        });
    },
    downloadAppFc() {
      window.open("/static/klk/html/download/index.html");
    },
    // 获取公告列表接口，并缓存
    async getLanternList() {
      this.$store
        .dispatch("home/newNotice", {
          type: "lantern",
          client_type: "PC",
          limit: 1000,
          page: 1
        })
        .then(res => {
          if (res && res.code == 200) {
            this.lanternData = res.data;
            if (res.data.total > 0) {
              sessionStorage.setItem(
                "lanterndata",
                JSON.stringify(this.lanternData)
              );
            }
          }
        });
    },
    //点击展示公告列表
    showTextModal() {
      if (this.lanternData.total > 0) {
        this.$store.commit("alert/showTextTip", true);
      } else {
        return false;
      }
    }
  },
  created() {
    if(localStorage.register){
      this.$router.push('/home/register');
      localStorage.removeItem('register')
    }
    this.showPopout = false;
    this.getBanner();
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
        var id = Math.ceil(Math.random() * 61);
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
      // console.log(v)
      // debugger
      item.in = Math.random().toFixed(2) * 1000;
      item.out =
        Math.random().toFixed(2) * 1000 * Math.random().toFixed(1) * 100 < 1
          ? 10000
          : Math.random().toFixed(2) * 1000 * Math.random().toFixed(1) * 100;
      item.account = generateMixed(3);
    });
    this.scrollDatas = datas;
    this.optionFc(this.optionList[0]);
    this.getLanternList();
  },
  mounted() {
    clearInterval(this.setInter);
    this.jackpotFc();
    this.getLantern();
    // this.getGameData();
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
  },
  store
};
</script>

<style lang="less" >
.alert-img {
  /deep/ .ivu-modal-content {
    background-color: transparent;
  }
}
.new-index {
  position: relative;
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;
  background: #f1f1f1;

  .newgong {
    position: absolute;
    height: 51px;
    width: 100%;
    top: 479px;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 12;

    .newgong-content {
      width: 1200px;
      height: 51px;
      margin: 0 auto;

      .notice {
        display: inline-block;
        float: left;
        position: relative;
        top: 12px;
        left: 25px;
        margin-right: 50px;

        i {
          color: #fff;
          font-size: 23px;
        }
      }

      .demolist {
        display: inline-block;
        width: 990px;
      }
      /deep/.el-carousel {
        overflow: visible;
      }
    }
  }

  .carouse {
    text-align: center;
    width: 100%;
    overflow: hidden;
    /deep/.el-carousel {
      overflow-x: unset;
    }

    /deep/ .el-carousel__indicators {
      bottom: 5px;
    }

    /deep/ .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }

  .downLoad-wrap {
    zoom: 1;
    width: 1200px;
    margin: 0 auto;
    padding-top: 22px;
    padding-bottom: 22px;

    .download {
      width: 330px;
      font-size: 14px;
      display: inline-block;
      margin-right: 15px;

      .app_part,
      .down_part {
        padding-top: 28px;
        float: left;
        width: 165px;
        height: 150px;
        // line-height: 150px;
        position: relative;
        background: #b48c68;
        text-align: center;
        font-size: 18px;
        color: #fff;
        transition: all 0.5s;
        cursor: pointer;

        &:hover {
          background: #ff5555;
        }

        i {
          display: block;
          width: 60px;
          height: 62px;
          margin: 0 auto;
        }
        .xiazai {
          background: url("/static/klk/img/icon/xiazaizhaunqu1.png") 0 0 /100% no-repeat;
        }
        .daili {
          background: url("/static/klk/img/icon/dailijiameng1.png") 0 0 /100% no-repeat;
        }
        h3 {
          padding-top: 15px;
        }
      }

      .down_part {
        background: #b59f85;
        float: right;
      }
    }

    .jackpots {
      display: inline-block;
      width: 850px;
      height: 150px;
      background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
        url("/static/klk/img/jackpot_out1.jpg") no-repeat;
      position: relative;
      -webkit-animation: bg 0.5s linear infinite;
      -o-animation: bg 0.5s linear infinite;
      -moz-animation: bg 0.5s linear infinite;
      animation: bg 0.5s linear infinite;
      @-webkit-keyframes bg {
        0% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out1.jpg") no-repeat;
        }
        100% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out2.jpg") no-repeat;
        }
      }
      @-moz-keyframes bg {
        0% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out1.jpg") no-repeat;
        }
        100% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out2.jpg") no-repeat;
        }
      }
      @-o-keyframes bg {
        0% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out1.jpg") no-repeat;
        }
        100% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out2.jpg") no-repeat;
        }
      }
      @-ms-keyframes bg {
        0% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out1.jpg") no-repeat;
        }
        100% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out2.jpg") no-repeat;
        }
      }
      @keyframes bg {
        0% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out1.jpg") no-repeat;
        }
        100% {
          background: url("/static/klk/img/jackpot_in1.jpg") no-repeat center,
            url("/static/klk/img/jackpot_out2.jpg") no-repeat;
        }
      }

      .light {
        height: 150px;

        .jackpots_model {
          position: absolute;
          top: -33px;
          left: -39px;
        }

        .jackpot-title {
          float: left;
          padding: 47px 1% 47px 12.5%;
        }

        .jackpot-number {
          float: left;
          line-height: 150px;
          font-size: 52px;
          color: #fff;
          font-weight: 600;
          // letter-spacing: 4px;
          span {
            display: inline-block;
            float: left;
          }
        }

        .jackpots_bar {
          position: absolute;
          top: -5px;
          right: -60px;
        }
      }
    }
  }

  .kelake-bot-wrap {
    width: 1200px;
    margin: 0 auto;
    zoom: 1;
    overflow: hidden;

    .section_title {
      padding-left: 20px;
      background: #b48c68;
      line-height: 50px;
      color: #fff;

      .type {
        float: right;
        margin-right: 35px;

        li {
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
          letter-spacing: normal;
          zoom: 1;
          height: 20px;
          margin: 16px -12px 0 15px;
          padding: 0 12px;
          line-height: 20px;
          border-radius: 15px;
          background: #b48c68;
          color: #fff;

          &.active {
            background: #fff;
            color: #b48c68;
          }
          a {
            color: #fff;

            &.active {
              background: #fff;
              color: #b48c68;
            }
          }
        }
      }
    }

    .game-list-left {
      position: relative;
      height: 985px;
      width: 330px;
      background: #fff;
      margin-bottom: 20px;
      float: left;
      .section_title {
        padding-left: 20px;
        position: absolute;
        top: 0;
        width: 100%;
        background: #b48c68;
        line-height: 50px;
        color: #fff;
        z-index: 37;
        h4 {
          display: flex;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: auto 5px;
            background: url("/static/klk/img/icon/zhongjiangmingdan.png") 0 0 /100%
              no-repeat;
          }
        }
      }
      .topLoop {
        margin-top: 50px;
        height: 931px;
        overflow: hidden;
        position: relative;
        ul {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          transition: all;
          -webkit-animation: animateSub 120s linear infinite;
          -o-animation: animateSub 120s linear infinite;
          -moz-animation: animateSub 120s linear infinite;
          animation: animateSub 120s linear infinite;
          @keyframes animateSub {
            0% {
              top: 0;
              // transform:translate(0,0);
              box-shadow: none;
            }
            100% {
              top: -5000px;
              // transform:translate(0,-5000px);
              box-shadow: none;
            }
          }
          li {
            padding: 20px 20px 0;
            border-bottom: 2px solid #f1f1f1;
            height: 100px;
            width: 100%;
            cursor: pointer;
            .gamepic {
              width: 66px;
              height: 66px;
              float: left;
              margin-right: 15px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .wintext {
              width: 200px;
              height: 66px;
              float: left;
              font-size: 12px;
              color: #555;

              div {
                padding-bottom: 6px;
                line-height: 18px;
                display: flex;
                align-content: center;
                span {
                  color: red;
                }
                small {
                  display: inline-block;
                  height: 20px;
                  line-height: 20px;
                  // padding: 0px 5px;
                  font-size: 12px;
                  // background: #FD4747;
                  // color: #fff;
                }
              }
            }
          }
        }
      }
    }

    .game-list-right {
      float: right;
      position: relative;
      width: 850px;

      .game-bg {
        overflow: hidden;
        position: relative;

        &:hover {
          .item_list {
            display: block;
          }

          &::before {
            content: "";
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.6);
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
          }
        }

        .item_list {
          display: none;
          text-align: center;

          .item {
            position: relative;
            display: inline-block;
            color: #fff;
            cursor: pointer;

            .ball {
              width: 64px;
              height: 64px;
              border-radius: 99em;
              border: 1px solid #fff;
              font-size: 18px;
              line-height: 64px;
              text-align: center;
              margin-bottom: 10px;
              -moz-transition: transform 0.5s ease;
              -webkit-transition: transform 0.5s ease;
              -o-transition: transform 0.5s ease;
              transition: transform 0.5s ease;
              display: inline-block;
            }

            &.loy {
              padding-top: 50px;

              &:first-child {
                padding-right: 50px;
              }
            }

            &:hover {
              .ball {
                background: #fd4747;
                border: 1px solid #fd4747;
                transform: rotate(360deg);
              }
            }
          }
        }
      }

      .all {
        position: relative;

        .arrow {
          position: absolute;
          top: 0;
          height: 100%;
          z-index: 2;
          width: 15px;
          cursor: pointer;

          &.left {
            left: 0;
          }

          &.right {
            right: 0;
          }

          .bg-arrow_left {
            width: 15px;
            height: 23px;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: url(/static/klk/img/arrow_sprites.png) -10px -10px;
          }

          .bg-arrow_right {
            width: 15px;
            height: 23px;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: url(/static/klk/img/arrow_sprites.png) -45px -10px;
          }
        }

        .all-vrL {
          position: relative;
          height: 155px;
          overflow: hidden;

          .type-ul {
            text-align: center;

            .type-li {
              position: relative;
              overflow: hidden;
              display: inline-block;
              margin: 20px 6px;
              cursor: pointer;

              &:hover {
                .mask {
                  top: 0;
                }
              }

              .mask {
                position: absolute;
                top: -110px;
                left: 0;
                width: 116px;
                height: 110px;
                background-color: rgba(0, 0, 0, 0.6);
                -webkit-transition: all 0.3s ease;
                -o-transition: all 0.3s ease;
                transition: all 0.3s ease;

                div {
                  display: block;
                  width: 75px;
                  height: 30px;
                  line-height: 30px;
                  background: #fd4747;
                  margin: 40px auto 16px;
                  border-radius: 5px;
                  font-size: 12px;

                  a {
                    color: #fff;
                  }
                }

                .play {
                  background: #b48c68;
                }

                &.active {
                  padding-top: 20px;
                }
              }

              .img {
                width: 116px;
                height: 110px;
                position: relative;
                overflow: hidden;

                img {
                  width: 100%;
                  height: 100%;
                }

                &.active {
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }

              .text {
                font-size: 14px;
                padding-top: 5px;
              }
            }
          }
        }
      }

      .slot_game {
        height: 200px;
        margin-bottom: 20px;
        background-image: url("/static/klk/img/game/slot_game.jpg");
        background-size: cover;

        .slot-vrL {
          height: 200px;

          .item_list {
            .item {
              padding-top: 60px;
              padding-left: 40px;
            }
          }
        }
      }

      .live_game {
        zoom: 1;
        overflow: hidden;

        .vrL {
          width: 100%;
          height: 180px;
          overflow: hidden;

          .item_list {
            .item {
              padding-top: 50px;
              padding-left: 5px;
              padding-right: 5px;
              // padding:0;
            }
          }

          .right {
            right: 0;
          }
        }

        .live {
          width: 559px;
          height: 180px;
          margin-right: 21px;
          overflow: hidden;
          position: relative;
          background-image: url("/static/klk/img/game/live_casino.jpg");
          float: left;
          background-size: cover;
        }

        .gym {
          width: 270px;
          height: 180px;
          overflow: hidden;
          position: relative;
          float: left;
          background-image: url("/static/klk/img/game/sports_events.jpg");
          background-size: cover;
        }
      }

      .fish_game {
        height: 180px;
        margin-top: 10px;
        background-image: url("/static/klk/img/game/fishing_game.jpg");
        background-size: cover;

        .item_list {
          .item {
            padding-right: 58px;

            &:last-child {
              padding-right: 0;
            }
          }
        }
      }

      .lottery_game {
        height: 180px;
        margin-top: 10px;
        background-image: url("/static/klk/img/game/lottery.jpg");
        background-size: cover;
      }
    }
  }
}
</style>
