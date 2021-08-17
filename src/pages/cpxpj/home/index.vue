<template>
  <div class="new-index klk-home">
    <div class="content_bg">
      <div class="content content-main-bg" :class="{ night: colorbool }">
        <heaerNav></heaerNav>

        <!-- <banView :headerImg="'/static/cpxpj/img/banner-img.png'" :picBox='400' isScale='true'></banView> -->

        <div class="wp">
          <div class="sub-nav">
            <div class="nav-item" @click="openWindow('/static/cpxpj/html/download/index.html')">
              <img src="/static/cpxpj/img/sub-nav-bg1.png" alt="" />
              <span class="item-title">下载APP</span>
              <span>领取更多福利</span>
            </div>
            <div class="nav-item"  @click="$router.push('/agent')">
              <img src="/static/cpxpj/img/sub-nav-bg2.png" alt="" />
              <span class="item-title">代理加盟</span>
              <span>高返利, 高收益的合作模式</span>
            </div>
            <div class="nav-item" @click="openWindow('/static/public/active/jgj/index.html')">
              <img src="/static/cpxpj/img/sub-nav-bg3.png" alt="" />
              <span class="item-title">VIP金管家</span>
              <span>尊享体验 管家式的贵宾服务</span>
            </div>
          </div>

          <div class="title_h">
            <div></div>
            <div>
              <img src="/static/cpxpj/img/title1.png" alt="" />
            </div>
            <div></div>
          </div>

          <div class="content_h">
            <div @click="$router.push('/home/live')"></div>
            <div>
              <ul>
                <li
                  v-for="(item, index) in gameList"
                  @click="$router.push(item.link)"
                  :style="{
                    backgroundImage: 'url(' + item.img + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'contain',
                  }"
                  :key="index"
                ></li>
              </ul>
            </div>
          </div>

          <!-- <div class="content_j">
              <ul>
                <li v-for="(item,index) in gameList2" :key="index" @click="$loginGame(item)" :style="{backgroundImage:'url(' + item.img + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></li>
              </ul>
            </div> -->

          <section id="slot-box" ng-controller="LobbiesCtrl" class="ng-scope">
            <div class="wrapper">
              <div class="winner-list-bg">
                <div class="winner-list-title">获奖名单</div>
              </div>

              <div class="game_info_box">
                <div class="winner_list">
                  <div class="title_txt">
                    <span class="id">会员账号</span>
                    <span class="game-name">游戏名称</span>
                    <span class="amount">中奖金额</span>
                  </div>
                  <div class="winning-box1">
                    <ul
                      class="winning-list"
                      :style="[
                        {
                          transform:
                            'translateY(-' +
                            noticePosition +
                            'px) translateZ(0px)',
                        },
                      ]"
                    >
                      <li
                        class="winning-item"
                        v-for="(item, i) in winningInfo"
                        :key="i"
                      >
                        <i class="user_id">{{ item.name.padEnd(8, "*") }}</i>
                        <i class="game_name">{{ item.game_name }}</i>
                        <i class="money_num">{{ item.num }}</i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <img
                class="winner-price-img"
                src="/static/cpxpj/img/price-icon.png"
                alt=""
              />

              <div class="first_part">
                <div class="part_middle">
                  <div class="super_award">
                    {{ superAward.toLocaleString() }}.{{
                      randomFloat.toLocaleString().padEnd(2, "0")
                    }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="events-section">
            <img
              class="events-title"
              src="/static/cpxpj/img/title-hot-event.png"
              alt=""
            />
            <div class="events-left-box">
              <div
                v-for="(item, index) in eventsLeftList"
                :key="index"
                class="events-left-item"
                @mouseover="changGame(item.id)"
                @click="goMore(item.id)"
              >
                <img :src="item.img" alt="" />
                <span>{{ item.name }}</span>
                <img
                  class="left-item-bg"
                  src="/static/cpxpj/img/outline-square.png"
                  alt=""
                />
              </div>
            </div>
            <div class="events-middle-box">
              <div
                v-for="(item, index) in eventsMiddleList"
                :key="index"
                class="events-middle-item"
              >
                <img :src="item.img" alt="" />
                <span>{{ item.name }}</span>
                <div class="events-middle-btn" @click="loginGame(item)">
                  进入游戏
                </div>
              </div>
            </div>

            <div class="gameImg" v-show="gameIds == 'mg'">
              <img src="/static/cpxpj/img/girl1.png" alt="" />
            </div>
            <div class="gameImg" v-show="gameIds == 'mt'">
              <img src="/static/cpxpj/img/girl2.png" alt="" />
            </div>
            <div class="gameImg" v-show="gameIds == 'ag'">
              <img src="/static/cpxpj/img/girl3.png" alt="" />
            </div>
            <div class="gameImg" v-show="gameIds == 'bb'">
              <img src="/static/cpxpj/img/girl4.png" alt="" />
            </div>
            <div class="gameImg" v-show="gameIds == 'more'">
              <img src="/static/cpxpj/img/girl5.png" alt="" />
            </div>
          </section>

          <div class="title_h">
            <div></div>
            <div>
              <img src="/static/cpxpj/img/title2.png" alt="" />
            </div>
            <div></div>
          </div>

          <div class="content_l">
            <div>
              <img
                src="/static/cpxpj/img/l1.png"
                alt=""
                @click="$router.push('/home/youhui')"
              />
            </div>
            <div>
              <img
                src="/static/cpxpj/img/l2.png"
                alt=""
                @click="$router.push('/home/youhui')"
              />
            </div>
            <div>
              <img
                src="/static/cpxpj/img/l3.png"
                alt=""
                @click="$router.push('/home/youhui')"
              />
            </div>
          </div>
        </div>

        <Modal
          :scrollable="true"
          title="网站公告"
          ok-text="关闭"
          v-model="showPopout"
          width="657"
          class="vp-popout-box"
        >
          <div class="popout-box">
            <span v-html="popups"></span>
          </div>
        </Modal>
      </div>
      <float></float>
    </div>
  </div>
</template>

<script>
import heaerNav from "./nav.vue";
import store from "@/vuex/store";
import UserService from "@/service/public/UserService.js";
import float from "./float";
import banView from "../../public/game_new/banView.vue";

export default {
  data() {
    return {
      showimg: false,
      slideTrue: false,
      showPopout: false,
      nightColor: "#fff",
      popups: "",
      lantern: "",
      value3: 0,
      canvas: null,
      borderColor: "#c6e4fc",
      colors: { blue: "#0084ff", red: "#fe0000", green: "#49ea00" },
      winningInfo: [],
      noticePosition: 0,
      superAward: 24687936,
      randomFloat: 18,
      // 轮播设置
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "none",
        trigger: "click",
        arrow: "hover",
        arrow2: "never",
      },
      gameList: [
        {
          img: "/static/cpxpj/img/cq_g.png",
          link: "/home/slot?navid=9&id=10018",
        },
        {
          img: "/static/cpxpj/img/jdb_g.png",
          link: "/home/slot?navid=9&id=10021",
        },
        {
          img: "/static/cpxpj/img/bb_g.png",
          link: "/home/slot?navid=9&id=10016",
        },
        {
          img: "/static/cpxpj/img/hb_g.png",
          link: "/home/slot?navid=9&id=10022",
        },
      ],
      gameList2: [
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/245.png",
          id: 245,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/10688.png",
          id: 10688,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/251.png",
          id: 251,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/249.png",
          id: 249,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/248.png",
          id: 248,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/246.png",
          id: 246,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/11182.png",
          id: 11182,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/11180.png",
          id: 11180,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/10629.png",
          id: 10629,
        },
        {
          img: "https://xpjstatic.7876111.com/images/style61/pc/11179.png",
          id: 11179,
        },
      ],

      //middle section game data
      eventsLeftList: [
        {
          img: "/static/cpxpj/img/mg-elec.png",
          name: "MG电子",
          url: "/home/slot?navid=9&id=10022",
          id: "mg",
        },
        {
          img: "/static/cpxpj/img/mw-fish.png",
          name: "MT捕鱼",
          url: "/home/slot?navid=9&id=11320",
          id: "mt",
        },
        {
          img: "/static/cpxpj/img/ag-elec.png",
          name: "AG电子",
          url: "/home/slot?navid=9&id=10015",
          id: "ag",
        },
        {
          img: "/static/cpxpj/img/bb-elec.png",
          name: "BB电子",
          url: "/home/slot?navid=9&id=10016",
          id: "bb",
        },
        {
          img: "",
          name: "+更多游戏",
          url: "/home/slot?navid=9&id=0",
          id: "more",
        },
      ],
      eventsMiddleList: [],
      mgList: [
        {
          img: "/static/cpxpj/img/mg1.png",
          name: "108好汉",
          id: "1881",
        },
        {
          img: "/static/cpxpj/img/mg2.png",
          name: "侠盗猎车手",
          id: "1867",
        },
        {
          img: "/static/cpxpj/img/mg3.png",
          name: "冒险丛林(HD)",
          id: "1913",
        },
        {
          img: "/static/cpxpj/img/mg4.png",
          name: "大航海时代",
          id: "1877",
        },
      ],
      mtList: [
        {
          img: "/static/cpxpj/img/mt1.png",
          name: "李逵劈鱼",
          id: "12037",
        },
        {
          img: "/static/cpxpj/img/mt2.png",
          name: "金蟾捕鱼",
          id: "12038",
        },
        {
          img: "/static/cpxpj/img/mt3.png",
          name: "3D捕鱼",
          id: "12040",
        },
        {
          img: "/static/cpxpj/img/mt4.png",
          name: "疯狂捕鱼",
          id: "12041",
        },
      ],
      agList: [
        {
          img: "/static/cpxpj/img/ag1.png",
          name: "包租婆",
          id: "12243",
        },
        {
          img: "/static/cpxpj/img/ag2.png",
          name: "疯狂弹球",
          id: "12242",
        },
        {
          img: "/static/cpxpj/img/ag3.png",
          name: "美人鱼",
          id: "12241",
        },
        {
          img: "/static/cpxpj/img/ag4.png",
          name: "财气冲天",
          id: "12240",
        },
      ],
      bbList: [
        {
          img: "/static/cpxpj/img/bb1.png",
          name: "惑星战记",
          id: "3461",
        },
        {
          img: "/static/cpxpj/img/bb2.png",
          name: "外星战记",
          id: "3466",
        },
        {
          img: "/static/cpxpj/img/bb3.png",
          name: "外星争霸",
          id: "3467",
        },
        {
          img: "/static/cpxpj/img/bb4.png",
          name: "传统",
          id: "3468",
        },
      ],
      moreList: [
        {
          img: "/static/cpxpj/img/jdb-elec.png",
          name: "JDB电子",
          url: "/home/slot?navid=9&id=10021",
        },
        {
          img: "/static/cpxpj/img/pg-elec.png",
          name: "PG电子",
          url: "/home/slot?navid=9&id=11320",
        },
        {
          img: "/static/cpxpj/img/cq9-elec.png",
          name: "CQ9电子",
          url: "/home/slot?navid=9&id=10018",
        },
        {
          img: "/static/cpxpj/img/pt-elec.png",
          name: "PT电子",
          url: "/home/slot?navid=9&id=0",
        },
      ],
      gameIds: "mg",
    };
  },
  methods: {
    openWindow(url) {
      window.open(url)
    },
    loginGame(item) {
      if (item.url) this.$router.push(item.url);
      else this.$loginGame(item);
    },
    goMore(id) {
      if (id == "more") {
        this.$router.push("/home/slot?navid=9&id=0");
      }
    },
    changGame(id) {
      this.gameIds = id;
      switch (id) {
        case "mg":
          this.eventsMiddleList = this.mgList;
          break;
        case "mt":
          this.eventsMiddleList = this.mtList;
          break;
        case "ag":
          this.eventsMiddleList = this.agList;
          break;
        case "bb":
          this.eventsMiddleList = this.bbList;
          break;
        case "more":
          this.eventsMiddleList = this.moreList;
          break;
      }
    },
    //超级奖池
    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        var num = Math.floor(Math.random() * 100);

        this.superAward = this.superAward + 18;
        this.randomFloat = num;
      }, 600);
    },
    initWinningInfo() {
      let data = [];
      let games = [
        "跳高高",
        "篮球巨星",
        "水果拉霸",
        "湛蓝深海",
        "冰上曲棍球",
        "金钱蛙",
        "飞天",
        "发财神",
        "空手道猪",
        "雷霆风暴",
        "熊之舞",
        "不朽的爱情",
        "嗨爆大马戏",
        "银行劫匪",
        "雷霆风暴",
        "不朽的爱情",
        "侠盗猎车手",
        "水果拉霸",
        "空手道猪",
        "冰上曲棍球",
        "飞天",
        "抢庄牛牛",
        "十三水",
        "斗地主",
        "押庄龙虎",
        "德州扑克",
        "不朽的浪漫",
        "银行劫匪2",
        "108好汉",
        "逐鹿三国",
        "跳高高",
        "篮球巨星",
        "水果拉霸",
        "湛蓝深海",
        "冰上曲棍球",
        "金钱蛙",
        "飞天",
        "发财神",
        "空手道猪",
        "雷霆风暴",
        "嗨爆大马戏",
        "银行劫匪",
        "雷霆风暴",
        "不朽的浪漫",
        "银行劫匪2",
        "108好汉",
        "逐鹿三国",
        "冒险丛林",
        "城市猎人",
        "大航海时代",
      ];
      for (let i = 0; i < games.length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        num = num < 10 ? num * 1234 : num;
        num = num < 100 ? num * 123 : num;
        num = num < 1000 ? num * 12 : num;
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        name = name.substr(0, 3);

        data[i] = { name, num, game_name: games[i] };
      }

      this.arraySort(data, (v1, v2) => v1.num < v2.num);
      this.winningInfo = data;
    },
    goHelp(index) {
      if (index == 5) {
        this.getUrl();
      } else {
        this.$router.push("/home/about/" + index);
      }
    },
    getUrl() {
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find((item) => item.status === "on");
        if (ser) {
          window.open(ser.url);
        }
      }
    },
    golotteryStart(v) {
      if (!localStorage.token || !localStorage.userinfo) {
        this.$store.commit("alert/newshowtip", {
          bool: true,
          title: "请先登录！",
          model: "",
          leftspan: true,
        });
      } else {
        this.$store.dispatch("lottery/getStopLotteryCheck", v).then((res) => {
          if (res && res.length > 0) {
            this.$store.commit("alert/newshowtip", {
              bool: true,
              title: res.replace(/，/g, "</br>"),
              model: "",
              type: "closeMaret",
            });
          } else {
            window.open(`#/plays/tradition/${v}`);
          }
        });
      }
    },
    golottery() {
      window.open(`#/plays/hall`);
    },
    sortBy(field) {
      return function (a, b) {
        var value1 = a[field];
        var value2 = b[field];
        return -(value1 - value2);
      };
    },
    close() {
      this.showimg = false;
    },

    async getPopout() {
      if (!this.$store.state.mainState.ifpourT || localStorage.token)
        return false;
      let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
        type: "popups",
        desc_client_type: "html",
      });
      if (res && res.code == 200) {
        if (!res.data.data.length) {
          this.showimg = true;
          return false;
        }
        this.showPopout = true;
        this.showimg = true;
        this.popups = res.data.data[0] && res.data.data[0].description;
        this.$store.commit("mainState/resetPour", false);
      }
    },
  },
  created() {
    setTimeout(() => {
      this.showimg = false;
    }, 10000);
  },
  mounted() {
    this.initWinningInfo();
    this.jackpotFc();
    this.changGame("mg");

    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
  },
  computed: {
    colorbool() {
      return this.$store.state.mainState.color;
    },
    websocketdata() {
      return this.$store.state.mainState.websoc;
    },
  },
  watch: {
    websocketdata() {
      this.websoc();
    },
  },
  components: {
    heaerNav,
    float,
    banView,
  },
  filters: {
    capitalize: function (value) {
      try {
        return `/static/public/image/lottery/nico/png/${value}.png`;
      } catch (err) {
        return `/static/public/image/lottery/nico/png/438.png`;
      }
    },
    formateNum: function (value) {
      value = value.toString();
      if (!value) return "0.00";
      var intPart = Number(value).toFixed(0); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.split(".");
      if (value2Array.length === 2) {
        // =2表示数据有小数位
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0,实际上用不着
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }
    },
  },
  store,
};
</script>

<style lang="less">
.new-index {
  position: relative;
  // max-width: 1920px;
  // min-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: #191919;

  .content_bg {
    background-color: #191919;
    overflow: hidden;
    width: 100%;
    .content-main-bg {
      position: relative;
      padding-bottom: 10px;
      background: url(/static/cpxpj/img/index-main-bg-1.png) no-repeat center
        top;
      background-size: 100% 100%;
      .wp {
        width: 1200px;
        margin: 0 auto;

        .sub-nav {
          display: flex;
          justify-content: space-between;
          padding-top: 70px;
          margin: 0 100px 50px 100px;
          .nav-item {
            cursor: pointer;
            position: relative;
            width: 312px;
            height: 76px;
            img {
              width: 100%;
              height: 100%;
            }
            span {
              position: absolute;
              top: 46px;
              left: 100px;
              display: block;
              color: #c0c0c0;
            }
            .item-title {
              color: white;
              font-weight: bold;
              font-size: 20px;
              top: 16px;
            }
          }
        }

        .title_h {
          display: flex;
          margin: 20px 0 20px 0;
          img {
            height: 60px;
            width: 100%;
            display: block;
            object-fit: contain;
            object-position: center;
          }
          div {
            width: 35%;
            &:last-child {
              transform: rotateY(180deg);
            }
            &:first-child,
            &:last-child {
              background: url("/static/cpxpj/img/t_2.png") no-repeat;
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              width: 30%;
              span {
                display: block;
                &:first-child {
                  text-align: center;
                  font-size: 32px;
                  color: #444952;
                  font-weight: 700;
                  margin-bottom: 10px;
                }
                &:last-child {
                  text-align: center;
                  font-size: 18px;
                  color: #444952;
                }
              }
            }
          }
        }
        .content_h {
          display: flex;
          margin: 40px 0 40px 0;
          div {
            width: 50%;
            &:first-child {
              width: 588px;
              height: 588px;
              background: url("/static/cpxpj/img/ag_g.png") no-repeat;
              background-size: 100% 100%;
              border-radius: 10px;
              cursor: pointer;
              &:hover {
                box-shadow: 0 0 10px #f7e7c9;
              }
            }
            &:last-child {
              ul {
                display: flex;
                flex-wrap: wrap;
                li {
                  height: 284px;
                  width: 284px;
                  border-radius: 10px;
                  margin: 18px 15px 0 15px;
                  cursor: pointer;
                  &:first-child {
                    margin-top: 0;
                  }
                  &:nth-child(2) {
                    margin-top: 0;
                    margin-left: 0;
                    margin-right: 0;
                  }
                  &:nth-child(4) {
                    margin-left: 0;
                    margin-right: 0;
                  }
                  &:hover {
                    box-shadow: 0 0 10px #f7e7c9;
                  }
                }
              }
            }
          }
        }
        .content_j {
          margin: 40px 0 80px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li {
              width: 222px;
              height: 222px;
              border-radius: 10px;
              margin-bottom: 15px;
              cursor: pointer;
              &:hover {
                box-shadow: 0 0 10px #f7e7c9;
              }
            }
          }
        }

        #slot-box {
          position: relative;
          width: 100%;
          font-size: 0;
          margin: 0 auto;
          margin-bottom: 30px;
          .wrapper {
            position: relative;
            width: 100%;
            z-index: 99;
            padding: 34px 0 0 50px;
            display: flex;

            .winner-list-bg {
              background: url("/static/cpxpj/img/winner-title.png") no-repeat
                center;
              background-size: contain;
              width: 60px;
              height: 100px;
              .winner-list-title {
                width: 20px;
                height: 80px;
                font-size: 20px;
                margin: 10px 0 0 15px;
                font-weight: bold;
                line-height: 20px;
                background: linear-gradient(
                  120deg,
                  #fcf990 0%,
                  #f7c64f 40.1611328125%,
                  #fcfd97 72.607421875%,
                  #ffe17e 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            .winner-price-img {
              margin: auto 0;
              margin-right: 30px;
            }

            .first_part {
              display: flex;
              justify-content: space-between;

              .part_left,
              .part_right {
                border-top: 1px solid #323232;
                border-bottom: 1px solid #323232;
                height: 85px;
                span {
                  display: inline-block;
                  height: 58px;
                  width: 53px;
                  line-height: 105px;
                  color: #fff;
                  font-size: 12px;
                  text-align: center;
                  margin: 12px 10px;
                  cursor: pointer;
                }
              }
              .part_left {
                span {
                  &:first-child {
                    background: url("/static/aqvns/img/jingling.png") no-repeat;
                    background-position: -22px -189px;
                  }
                  &:nth-child(2) {
                    background: url("/static/aqvns/img/jingling.png") no-repeat;
                    background-position: -78px -195px;
                  }
                  &:nth-child(3) {
                    background: url("/static/aqvns/img/jingling.png") no-repeat;
                    background-position: -129px -195px;
                  }
                  &:nth-child(4) {
                    background: url("/static/aqvns/img/jingling.png") no-repeat;
                    background-position: -22px -244px;
                    margin-right: 20px;
                  }
                  &:last-child {
                    width: 30px;
                    height: 83px;
                    background: #ffe371;
                    line-height: 1;
                    color: #000;
                    padding: 22px 10px;
                    margin: 0;
                  }
                }
              }
              .part_middle {
                div {
                  &:first-child {
                    display: flex;
                    justify-content: space-around;
                    span {
                      &:first-child,
                      &:last-child {
                        border-bottom: 1px solid #856f32;
                        display: inline-block;
                        width: 140px;
                        height: 15px;
                      }
                      &:nth-child(2) {
                        color: #ffe371;
                        font-size: 26px;
                      }
                    }
                  }
                }
                .super_award {
                  height: 94px;
                  text-align: center;
                  font-size: 68px;
                  line-height: 54px;
                  color: #ff2e2e;
                  margin: 0 auto;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  .award_num {
                    flex: 1;
                    // height: 34px;
                    font-size: 68px;
                    color: #ffed8d;
                    display: flex;
                    justify-content: space-between;
                    li {
                      flex: 1;
                      box-sizing: border-box;
                      background-size: contain;
                      color: #ff2e2e;
                      width: 40px;
                      // height: 42px;
                      // font-weight: bold;
                      // line-height: 34px;
                    }
                  }
                }
              }
              .part_right {
                span {
                  &:first-child {
                    width: 30px;
                    height: 83px;
                    background: #ffe371;
                    line-height: 1;
                    color: #000;
                    padding: 22px 10px;
                    margin: 0;
                  }
                  &:nth-child(2) {
                    background: url("/static/aqvns/img/zhifubao.webp") no-repeat;
                    background-position: 9px 6px;
                    margin-left: 20px;
                  }
                  &:nth-child(3) {
                    background: url("/static/aqvns/img/weixin.webp") no-repeat;
                    background-position: 9px 6px;
                  }
                  &:nth-child(4) {
                    background: url("/static/aqvns/img/yinlian.webp") no-repeat;
                    background-position: 9px 6px;
                  }
                  &:nth-child(5) {
                    background: url("/static/aqvns/img/kuaisu.webp") no-repeat;
                    background-position: 9px 6px;
                  }
                }
              }
            }

            .game_info_box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;

              .game_container {
                width: 713px;
                height: 100%;
                padding-top: 9px;
                .game_nav {
                  height: 102px;
                  width: 100%;
                  position: relative;
                  z-index: 1;
                  margin: 0 auto;
                  border-radius: 5px;
                  white-space: nowrap;

                  .arrow {
                    position: absolute;
                    top: 31px;
                    width: 30px;
                    height: 30px;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    cursor: pointer;

                    &.prev {
                      z-index: 999;
                      left: 20px;
                      background: url(/static/aqvns/img/home/caijin/arrow-left.png)
                        no-repeat center center;
                      &:hover {
                        background: url(/static/aqvns/img/home/caijin/arrow-left-hover.png)
                          no-repeat center center;
                      }
                    }
                    &.next {
                      right: 20px;
                      background: url(/static/aqvns/img/home/caijin/arrow-right.png)
                        no-repeat center center;
                      &:hover {
                        background: url(/static/aqvns/img/home/caijin/arrow-right-hover.png)
                          no-repeat center center;
                      }
                    }
                  }
                  .main-cell {
                    height: 100%;
                    .tempWarp {
                      overflow: hidden;
                      width: 86%;
                      height: 100%;
                      margin: auto;
                      position: relative;

                      #game-list {
                        width: 3000px;
                        height: 100%;
                        position: relative;
                        margin: 0;
                        display: table;

                        &.move {
                          transition: all 0.5s ease;
                          -webkit-transition: all 0.5s ease;
                          transform: translate3d(-104px, 0, 0);
                        }
                        &.back {
                          transition: all 0.5s ease;
                          -webkit-transition: all 0.5s ease;
                          transform: translate3d(104px, 0, 0);
                        }

                        li {
                          background: url(/static/aqvns/img/xian.png) right
                            center no-repeat;
                          cursor: pointer;
                          width: 104px;
                          float: left;
                          height: 102px;
                          display: table-cell;
                          color: #fff;
                          font-size: 14px;
                          text-align: left;
                          vertical-align: top;
                          transition: all 1s !important;
                          position: relative;

                          &::before {
                            content: "";
                            margin-right: 10px;
                            height: 37px;
                            width: 60px;
                            margin-top: 26px;
                            text-align: left;
                            vertical-align: middle;
                            background-repeat: no-repeat;
                            background-position: 50%;
                            position: absolute;
                            top: 9%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                          }

                          &.ae:before {
                            background: url(/static/aqvns/img/home/caijin/ae.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 30px;
                          }
                          &.ag:before {
                            background: url(/static/aqvns/img/home/caijin/ag.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.bbin:before {
                            background: url(/static/aqvns/img/home/caijin/bbin.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.cq9:before {
                            background: url(/static/aqvns/img/home/caijin/cq9.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.dt:before {
                            background: url(/static/aqvns/img/home/caijin/dt.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 34px;
                          }
                          &.fg:before {
                            background: url(/static/aqvns/img/home/caijin/fg.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.jdb:before {
                            background: url(/static/aqvns/img/home/caijin/jdb.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 30px;
                          }
                          &.mg:before {
                            background: url(/static/aqvns/img/home/caijin/mg.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.mw:before {
                            background: url(/static/aqvns/img/home/caijin/mw.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.pt:before {
                            background: url(/static/aqvns/img/home/caijin/pt.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.ky:before {
                            background: url(/static/aqvns/img/home/caijin/ky.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 32px;
                          }
                          &.vg:before {
                            background: url(/static/aqvns/img/home/caijin/vg.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 26px;
                          }
                          &.ly:before {
                            background: url(/static/aqvns/img/home/caijin/ly.png)
                              no-repeat center center;
                            background-size: contain;
                            height: 32px;
                          }
                          &.pg:before {
                            background: url(/static/aqvns/img/home/caijin/pg.png)
                              no-repeat center center;
                            background-size: contain;
                          }
                          &.ttg:before {
                            background: url(/static/aqvns/img/home/caijin/ttg.png)
                              no-repeat center center;
                            background-size: contain;
                          }

                          &.active {
                            span {
                              color: #fefd8a !important;
                            }
                          }
                          &:hover {
                            background-color: #222;
                          }

                          .game-list-text {
                            width: 100%;
                            vertical-align: middle;
                            text-align: center;
                            position: absolute;
                            bottom: 28px;
                            transition: all 1s;

                            span {
                              display: block;
                              text-align: center;

                              &:nth-child(2) {
                                color: #7a5434;
                                font-size: 14px;
                                text-align: left;
                                margin-top: 5px;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }

                .game_list_box {
                  width: 100%;
                  margin: 14px 0 0 0;
                  padding: 9px 4px;
                  .game-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .content {
                      width: 100%;

                      ul {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;

                        .game-item {
                          display: inline-block;
                          position: relative;
                          vertical-align: top;
                          padding: 0 6px 15px;
                          width: 25%;
                          height: 180px;
                          overflow: hidden;
                          background-color: transparent;
                          cursor: pointer;
                          box-sizing: border-box;
                          .game-pic {
                            transition: all 0.4s;
                            text-align: center;

                            img {
                              width: 100%;
                              height: 110px;
                              transition: all 2s;
                            }
                          }

                          .game_name {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            color: #fff;
                            font-size: 14px;
                            text-align: center;
                            line-height: 24px;
                            z-index: 1;

                            .name_txt {
                              overflow: hidden;
                              text-overflow: ellipsis;
                              text-align: center;
                              white-space: nowrap;
                              border-bottom: 1px solid #585858;
                              padding-top: 4px;
                            }
                          }
                          .star_num {
                            z-index: 1;
                            overflow: hidden;
                            white-space: nowrap;
                            position: relative;
                            text-align: right;
                            color: #8e8e8e;
                            font-size: 14px;
                            padding-right: 6px;

                            &:after {
                              content: "";
                              position: absolute;
                              top: 7px;
                              left: 10px;
                              height: 10px;
                              width: 55px;
                              background: url(/static/aqvns/img/home/star.png)
                                repeat-x 0;
                            }
                          }

                          &:hover .game_name {
                            background-color: #e1bd53;
                          }
                        }
                      }
                    }
                  }
                }
              }

              .winner_list {
                width: 320px;
                height: 96%;
                margin-top: -10px;
                text-align: center;
                vertical-align: top;
                overflow: hidden;
                // display: flex;
                // justify-content: space-between;

                .title_txt {
                  height: 26px;
                  line-height: 26px;
                  width: 82%;
                  margin-left: 20px;

                  // border-bottom: 1px solid #444;
                  display: flex;
                  justify-content: space-between;
                  span {
                    padding: 0;
                    color: #f4dc77;
                    font-size: 14px;
                    flex: 1;
                    &.id {
                      text-align: left;
                    }
                    &.amount {
                      text-align: center;
                      padding-left: 10px;
                    }
                    &.game-name {
                      text-align: center;
                    }
                  }
                }

                .winning-box1 {
                  overflow: hidden;
                  position: relative;
                  height: 66px;
                  // margin-top: 14px;
                  @keyframes animateSub {
                    0% {
                      top: 0;
                    }

                    to {
                      top: -700px;
                    }
                  }

                  &:hover {
                    .winning-list {
                      animation-play-state: paused;
                    }
                  }

                  .winning-list {
                    position: relative;
                    left: 0;
                    top: 0;
                    animation: animateSub 40s linear infinite;

                    .winning-item {
                      width: 100%;
                      padding: 0 10px 0 4px;
                      line-height: 22px;
                      display: flex;
                      flex-direction: row;
                      justify-content: center;
                      align-items: center;

                      &:after {
                        content: "";
                        display: table;
                        clear: both;
                        zoom: 1;
                      }
                      &:first-child,
                      &:nth-child(2),
                      &:nth-child(3) {
                        .order {
                          background-color: red;
                        }
                      }

                      i {
                        font-size: 12px;
                        font-weight: 400;
                        flex: 1;
                        text-align: left;
                      }
                      .user_id {
                        color: #fefa84;
                        padding-left: 20px;
                      }
                      .money_num {
                        color: red;
                      }
                      .game_name {
                        color: #868686;
                      }
                      .order {
                        display: block;
                        float: left;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        color: #fff;
                        background-color: #afafaf;
                        border-radius: 4px;
                      }
                      .sort {
                        float: left;
                        width: 75px;
                        color: #f27800;
                        text-align: center;
                        font-weight: 400;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .events-section {
          position: relative;
          display: flex;
          justify-content: space-between;
          height: 620px;
          .events-title {
            height: 42px;
            margin-left: 30px;
            position: absolute;
          }
          .events-left-box {
            background: url("/static/cpxpj/img/outline-arrow.png")
              no-repeat center;
            background-size: contain;
            height: 460px;
            width: 300px;
            margin: 70px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .events-left-item {
              position: relative;
              z-index: 999;
              width: 150px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: transform 0.3s;
              span {
                display: block;
                font-size: 18px;
                color: white;
                transition: color 0.5s;
                margin-left: 10px;
              }
              .left-item-bg {
                position: absolute;
                top: -2px;
                left: -10px;
                z-index: -1;
                height: 42px;
                opacity: 0;
                transition: opacity 0.5s;
              }
              &:nth-child(1) {
                left: 30px;
              }
              &:nth-child(2) {
                left: 90px;
              }
              &:nth-child(3) {
                left: 120px;
              }
              &:nth-child(4) {
                left: 90px;
              }
              &:nth-child(5) {
                left: 30px;
              }
            }
            .events-left-item:hover {
              transform: scale(1.15, 1.15);
              transform: translateX(20px);
              transition: transform 0.3s;
              span {
                color: #171717;
                transition: color 0.5s;
              }
              .left-item-bg {
                opacity: 1;
                transition: opacity 0.5s;
              }
            }
          }

          .events-middle-box {
            display: grid;
            grid-template-columns: 120px 120px;
            gap: 40px;
            padding: 100px 0;

            .events-middle-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 100%;
                height: 120px;
                border-radius: 20%;
                margin-bottom: 10px;
                transition: transform 0.2s;
              }
              span {
                color: white;
                font-size: 18px;
                margin-bottom: 8px;
              }
              .events-middle-btn {
                height: 30px;
                width: 110px;
                text-align: center;
                font-size: 16px;
                line-height: 30px;
                color: #ffffff;
                border: 1px solid #535965;
                border-radius: 15px;
                cursor: pointer;
              }
            }
            .events-middle-item:hover {
              img {
                transform: scale(1.1, 1.1);
                transition: transform 0.2s;
              }
              span {
                color: #f5d065;
              }
            }
          }
          img {
            object-fit: contain;
          }
          .gameImg {
            width: 630px;
            height: 540px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: right;
            }
            // position: relative;
            // top: -600px;
            // left: 643px;
          }
        }

        .content_l {
          display: flex;
          justify-content: space-around;
          margin: 40px 0 40px 0;
          cursor: pointer;
          div {
            margin-right: 12px;
            &:hover {
              box-shadow: 0 0 10px #f7e7c9;
            }
          }
        }
      }
    }
    .night {
      background: url(/static/cpxpj/img/index-main-bg-n.jpg) no-repeat center
        top;
      background-size: 100% 100%;
    }
  }
}

.vp-popout-box {
  /deep/ .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -328px;
    margin-top: -273px;
  }

  /deep/ .ivu-modal-close {
    z-index: 2;
    top: 6px;

    i {
      color: #fff;
    }
  }

  /deep/ .ivu-modal-header {
    width: 650px;
    height: 34px;
    margin-top: 5px;
    margin-left: 3px;
    padding: 0;
    border-radius: 10px;
    border: 1px solid #494437;
    background: #ff0000
      url(/static/cpxpj/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50%
      repeat-x;
    color: #ffffff;
    font-weight: bold;
    position: relative;
    top: 4px;

    .ivu-modal-header-inner {
      color: #fff;
      line-height: 34px;
      height: 34px;
      padding-left: 15px;
    }
  }

  /deep/ .ivu-modal-footer {
    border-top: 1px solid #cdd5da;

    .ivu-btn-text {
      display: none;
    }

    .ivu-btn-primary {
      background: #ff0000;
      border-color: #ff0000;
      padding: 3px 12px 3px 12px;
      border-radius: 6px;
    }
  }

  .popout-box {
    min-height: 427px;
    font-family: "Microsoft YaHei";
    font-size: 24px;
    line-height: 1.5;
    color: #383838;
  }

  // /deep/
}
.slideTop3 {
  padding: 0 70px;
  background-color: white;
  border-radius: 20px;
  position: relative;
  bottom: -2000px;
}

.animationName(@name,@time) {
  animation-delay: 2s;
  animation: @name 0.5s @time 1;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode: forwards;
}

.keyFrames(@name,@value,@value1) {
  @keyframes @name {
    0% {
      left: @value;
      opacity: 0;
    }
    50% {
      left: @value;
      opacity: 0;
    }
    100% {
      left: @value1;
      opacity: 1;
    }
  }
}
.keyFrames2(@name,@value,@value1) {
  @keyframes @name {
    0% {
      right: @value;
      opacity: 0;
    }
    50% {
      right: @value;
      opacity: 0;
    }
    100% {
      right: @value1;
      opacity: 1;
    }
  }
}
.keyFrames3(@name,@value,@value1) {
  @keyframes @name {
    0% {
      top: @value;
      opacity: 0;
    }
    50% {
      top: @value;
      opacity: 0;
    }
    100% {
      top: @value1;
      opacity: 1;
    }
  }
}

.slideLeft {
  .animationName(slideLeft,0.2s);
}
.keyFrames(slideLeft,-2000px,0);

.slideRight1 {
  .animationName(slideRight1,0.4s);
}
.keyFrames2(slideRight1,-2000px,0);

.slideRight2 {
  .animationName(slideRight2,1s);
}
.keyFrames2(slideRight2,-2000px,0);

.slideLeft2 {
  .animationName(slideLeft2,0.8s);
}
.keyFrames(slideLeft2,-2000px,0);

.slideTop1 {
  .animationName(slideTop1,0.6s);
}
.keyFrames3(slideTop1,2000px,0);

.slideLeft3 {
  .animationName(slideLeft3,1.2s);
}
.keyFrames(slideLeft3,-2000px,0);

.slideTop2 {
  .animationName(slideTop2,1.6s);
}
.keyFrames3(slideTop2,2000px,0);

.slideRight3 {
  .animationName(slideRight3,1.4s);
}
.keyFrames2(slideRight3,-2000px,0);

.slideTop3 {
  .animationName(slideTop3,1.8s);
}
.keyFrames3(slideTop3,2000px,0);

//  @keyframes winning-list-animation {
//   from {
//     top: 0;
//   }
//   to {
//     top: -760%;
//   }
// }

// @-webkit-keyframes winning-list-animation {
//   from {
//     top: 0;
//   }
//   to {
//     top: -760%;
//   }
// }

.gameImg {
  animation: bounceInRight 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1 alternate
    forwards;
}
</style>
