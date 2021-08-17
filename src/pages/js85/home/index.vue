<template>
  <div class="js85-new-index">
    <div class="banner-wrap">
      <div class="carouse">
        <Carousel
          v-model="curIndex"
          :autoplay="setting.autoplay"
          :loop="setting.loop"
          :autoplay-speed="setting.autoplaySpeed"
          :radius-dot="setting.radiusDot"
          :arrow="setting.arrow"
          :trigger="setting.trigger"
          :style="{ height: carheight + 'px', overflow: 'hidden' }"
        >
          <CarouselItem
            v-for="(item, i) in carouselData"
            :key="i"
            class="myItems"
          >
            <a v-if="item.targets !== '#'">
              <div
                :style="{
                  background: 'url(' + item.img + ') no-repeat center top',
                  backgroundSize: 'cover',
                  height: carheight + 'px',
                }"
              ></div>
            </a>
            <div
              :style="{
                background: 'url(' + item.img + ') no-repeat center top',
                backgroundSize: 'cover',
                height: carheight + 'px',
              }"
              v-else
            ></div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>

    <div class="notice index-notice" :style="{ top: carheight + 'px' }">
      <div class="w1000" @click="showTextModal()">
        <span>最新公告</span>
        <marquee
          v-if="lantern"
          align="middle"
          direction="left"
          loop="-1"
          scrollamount="3"
          onmouseout="this.start()"
          onmouseover="this.stop()"
        >
          <a href="javascript:;" v-html="lantern"></a>
        </marquee>
      </div>
    </div>
    <div class="home-banner">
      <section class="sub-nav">
        <div class="contentbox">
          <div class="contentbg"></div>
        </div>
        <span class="sub-title">官方直營</span>
      </section>
    </div>
    <div class="home-container">
      <!-- <section class="sub-nav">
        
        <div
          v-for="(item, index) in subNavList"
          :key="index"
          class="sub-nav-item"
        >
          <img class="sub-nav-img" :src="item.img" alt="" />
          <div class="sub-nav-content">
            <span class="sub-nav-title">{{ item.name }}</span>
            <span>{{ item.text }}</span>

            <div class="sub-nav-btn" @click="$router.push(item.url)">
              <img src="/static/js85/img/home/v0601_img/enter-btn.png" alt="" />
            </div>
          </div>
        </div>
      </section> -->

      <section class="bg2">
        <div class="gameContainer2">
          <div class="title wow fadeInUp" data-wow-delay="0">
            <h2>全球顶级娱乐平台一应俱全</h2>
            <p>Top entertainment platforms in the world</p>
          </div>
          <div class="index_layer3">
            <div
              class="layer3_box wow"
              :class="i === 0 ? 'fadeInRight ' : 'fadeInLeft'"
              style="visibility: visible"
              data-wow-delay="0"
              v-for="(item, i) in kyGameList"
              :key="i"
            >
              <div class="icon" @click="$router.push(item.link)">
                <img :src="item.bgImg" alt="bg" class="bg" />
                <img :src="item.img" alt="bg" class="pic" />
              </div>
              <div class="text">
                <div class="text_box">
                  <div class="text_Top">
                    <p>{{ item.content }}</p>
                    <a class="playBtn" @click="$router.push(item.link)">PLAY</a>
                  </div>
                  <div class="text_Bottom">
                    <ul>
                      <li v-for="(t, i) in item.games" :key="i">
                        <a @click="$router.push(t.link)">
                          <img :src="t.icon" alt="icon" />
                          <div class="bt">{{ t.name }}</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                        'translateY(-' + noticePosition + 'px) translateZ(0px)',
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
            src="/static/js85/img/home/v0601_img/price-icon.png"
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
          src="/static/js85/img/home/v0601_img/title-hot-event.png"
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
              src="/static/js85/img/home/v0601_img/outline-square.png"
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
          <img src="/static/js85/img/home/v0601_img/girl1.png" alt="" />
        </div>
        <div class="gameImg" v-show="gameIds == 'ky'">
          <img src="/static/js85/img/home/v0601_img/girl2.png" alt="" />
        </div>
        <div class="gameImg" v-show="gameIds == 'ag'">
          <img src="/static/js85/img/home/v0601_img/girl3.png" alt="" />
        </div>
        <div class="gameImg" v-show="gameIds == 'bb'">
          <img src="/static/js85/img/home/v0601_img/girl4.png" alt="" />
        </div>
        <div class="gameImg" v-show="gameIds == 'more'">
          <img src="/static/js85/img/home/v0601_img/girl5.png" alt="" />
        </div>
      </section>

      <section class="download-section">
        <div class="download-left-box">
          <span class="download-left-title">享受优质投注快感</span>
          <span>扫码APP下载</span>
          <span>422.com</span>
          <span>支持 iOS & Android 全方位功能</span>
          <div class="title3" ref="qr-code"></div>
          <img
            class="download-btn"
            src="/static/js85/img/home/v0601_img/app-store-btn.png"
            alt=""
          />
          <img
            class="download-btn"
            src="/static/js85/img/home/v0601_img/google-play-btn.png"
            alt=""
          />
        </div>
        <img
          src="/static/js85/img/home/v0601_img/mobile-screen-shot.png"
          alt=""
          class="download-middle-img"
        />
        <div class="downlaod-right-box">
          <span class="download-right-title">随时随地赢钱利器</span>
          <div class="downlaod-content-box">
            <img src="/static/js85/img/home/v0601_img/html5-icon.png" alt="" />
            <div class="download-text-box">
              <span>H5手机介面</span>
              <span>422.com</span>
              <span>手动输入网址 立即投注</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <img
          class="service-tite"
          src="/static/js85/img/home/v0601_img/title-service.png"
          alt=""
        />
        <img
          class="service-img"
          src="/static/js85/img/home/v0601_img/service-img.png"
          alt=""
        />
      </section>

      <section class="product-box">
        <img
          class="product-title"
          src="/static/js85/img/home/v0601_img/title-product.png"
          alt=""
        />
        <div class="product-content">
          <div class="product-item">
            <span class="sub-title">电子游艺</span>
            <p class="product-content">
              8000多款老虎机、电动扑克、大型电玩、桌上游戏、以丰富的视觉、声光效果提供您一级的娱乐。
            </p>
          </div>
          <div class="product-item">
            <span class="sub-title">真人娱乐</span>
            <p class="product-content">
              提供真人娱乐、百家乐、骰宝、二八杠、龙虎斗、轮盘、金臂......精彩内容面向全玩家。
            </p>
          </div>
          <div class="product-item">
            <span class="sub-title">彩票游戏</span>
            <p class="product-content">
              彩票游戏丰富，提供最高赔率，所有赛果依据官方开奖结果。彩票游戏给您一夜致富的机会及空前的游戏体验！
            </p>
          </div>
          <div class="product-item">
            <span class="sub-title">体育赛事</span>
            <p class="product-content">
              为您提供最全面赛前及滚球投注服务,眼下最为热门的体育投注类型，总能为您营造最好的赔率，创造最大价值。
            </p>
          </div>
        </div>
      </section>
    </div>

    <div class="foot-lx">
      <div class="foot-lx-width">
        <a
          class="foot-lx-convction"
          href="tencent://message/?Menu=yes&uin=199899099"
        ></a>
        <a
          class="foot-lx-convction"
          href="tencent://message/?Menu=yes&uin=199899099"
        ></a>
        <a class="foot-lx-convction-lxyx"></a>
        <a class="foot-lx-convction-zxkf" @click="kefu"></a>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { postS, getS, _SetGet, _SetPost } from "@/service/public/service.js";

export default {
  // mixins: [data],
  data() {
    return {
      carheight: 460,
      clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      showimg: false,
      popups: "",
      lantern: "",
      curIndex: 0,
      setting: {
        autoplay: true,
        loop: true,
        autoplaySpeed: 3000,
        radiusDot: true,
        arrow: "never",
        trigger: "click",
      },
      publicUrl: "http://static.1356111.com/",
      showPopout: false,
      noticePosition: 0,
      gameList: [
        { name: "真人娱乐", className: "live", path: "/home/live" },
        { name: "彩票游戏", className: "lottery", path: "/plays/hall" },
        {
          name: "电子游艺",
          className: "slot",
          path: "/home/slot?navid=9&id=0",
        },
        { name: "体育赛事", className: "sport", path: "/home/tiyu?id=0" },
      ],
      idlist: [],
      rollList: [],
      currenttype: "",
      iptVal: "",
      currentline: "",
      currentTag: "",
      pageDatas: {
        page: 1,
      },
      gameId: 26,
      gameData: [],
      gameDataLeft: [],
      gameDataRight: [],
      winningInfo: [],
      // 轮播名单
      carouselData: [],
      superAward: 24687936,
      setInter: null,
      randomFloat: 18,
      // subNavList: [
      //   // {
      //   //   name: "真人娱乐",
      //   //   text: "casino",
      //   //   img: "/static/js85/img/home/v0601_img/casino-link.png",
      //   //   url: "/home/live",
      //   // },
      //   {
      //     name: "电子游艺",
      //     text: "Electronic game",
      //     img: "/static/js85/img/home/v0601_img/elec-link.png",
      //     url: "/home/slot?navid=9&id=0",
      //   },
      //   // {
      //   //   name: "彩票游戏",
      //   //   text: "Lottery games",
      //   //   img: "/static/js85/img/home/v0601_img/lottery-link.png",
      //   //   url: "/plays/hall",
      //   // },
      //   // {
      //   //   name: "体育赛事",
      //   //   text: "Sports events",
      //   //   img: "/static/js85/img/home/v0601_img/sport-link.png",
      //   //   url: "/home/tiyu",
      //   // },
      //   {
      //     name: "棋牌游戏",
      //     text: "Sports events",
      //     img: "/static/js85/img/home/v0601_img/board-game-link.png",
      //     url: "/home/chess?navid=9&id=0",
      //   },
      // ],
      kyGameList: [
        {
          name: "电子游艺",
          text: "SLOT GAMES",
          bgImg: "/static/js85/img/gameBg4.png",
          img: "/static/js85/img/game4.png",
          link: "/home/slot?navid=9&id=0",
          content:
            "全网最全电子游艺，汇聚世界顶级电子游艺平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
          games: [
            {
              icon: "/static/js85/img/LG_MGWBDZ.png",
              name: "MG电子",
              link: "/home/slot?navid=9&id=10022",
            },
            {
              icon: "/static/js85/img/LG_CQ.png",
              name: "CQ9电子",
              link: "/home/slot?navid=9&id=10018",
            },
            {
              icon: "/static/js85/img/LG_JDB_DZ_LHJ.png",
              name: "JDB电子",
              link: "/home/slot?navid=9&id=10021",
            },
            {
              icon: "/static/js85/img/LG_FGDZ.png",
              name: "FG电子",
              link: "/home/slot?navid=9&id=10020",
            },
            {
              icon: "/static/js85/img/LG_AGDZ.png",
              name: "AG电子",
              link: "/home/slot?navid=9&id=10015",
            },
            {
              icon: "/static/js85/img/LG_BBINDZ.png",
              name: "BBIN电子",
              link: "/home/slot?navid=9&id=10016",
            },
            {
              icon: "/static/js85/img/a15.png",
              name: "MORE",
              link: "/home/slot?navid=9&id=0",
            },
          ],
        },
        {
          name: "棋牌游戏",
          text: "CHESS GAMES",
          bgImg: "/static/js85/img/gameBg5.png",
          img: "/static/js85/img/game5.png",
          link: "/home/chess?navid=9&id=0",
          content:
            "全网最全棋牌游戏，汇聚世界顶级棋牌游戏平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
          games: [
            {
              icon: "/static/js85/img/LG_KYQP.png",
              name: "开元棋牌",
              link: "/home/chess?navid=9&id=10042",
            },
            {
              icon: "/static/js85/img/LG_SSOCHESS.png",
              name: "乐游棋牌",
              link: "/home/chess?navid=9&id=10612",
            },
            {
              icon: "/static/js85/img/10694.png",
              name: "天游棋牌",
              link: "/home/chess?navid=9&id=10694",
            },
            {
              icon: "/static/js85/img/LG_FGQP.png",
              name: "FG棋牌",
              link: "/home/chess?navid=9&id=10732",
            },
            {
              icon: "/static/js85/img/LG_VG.png",
              name: "VG棋牌",
              link: "/home/chess?navid=9&id=10041",
            },
            {
              icon: "/static/js85/img/new_games/new_icon/12465.png",
              name: "美博棋牌",
              link: "/home/chess?navid=9&id=12465",
            },
            {
              icon: "/static/js85/img/a15.png",
              name: "MORE",
              link: "/home/chess?navid=9&id=0",
            },
          ],
        },
      ],      
      eventsLeftList: [
        {
          img: "/static/js85/img/home/v0601_img/mg-elec.png",
          name: "MG电子",
          url: "/home/slot?navid=9&id=10022",
          id: "mg",
        },
        {
          img: "/static/js85/img/home/v0601_img/ag-elec.png",
          name: "AG电子",
          url: "/home/slot?navid=9&id=10015",
          id: "ag",
        },
        {
          img: "/static/js85/img/home/v0601_img/bb-elec.png",
          name: "BB电子",
          url: "/home/slot?navid=9&id=10016",
          id: "bb",
        },
        {
          img: "/static/js85/img/home/v0601_img/LG_KYQP.png",
          name: "开元棋牌",
          url: "/home/slot?navid=9&id=10042",
          id: "ky",
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
          img: "/static/js85/img/home/v0601_img/mg1.png",
          name: "108好汉",
          id: "1881",
        },
        {
          img: "/static/js85/img/home/v0601_img/mg2.png",
          name: "侠盗猎车手",
          id: "1867",
        },
        {
          img: "/static/js85/img/home/v0601_img/mg3.png",
          name: "冒险丛林(HD)",
          id: "1913",
        },
        {
          img: "/static/js85/img/home/v0601_img/mg4.png",
          name: "大航海时代",
          id: "1877",
        },
      ],
      kyList: [
        {
          img: "/static/js85/img/home/v0601_img/ky1.png",
          name: "看牌抢庄牛牛",
          id: "10688",
        },
        {
          img: "/static/js85/img/home/v0601_img/ky2.png",
          name: "21点",
          id: "251",
        },
        {
          img: "/static/js85/img/home/v0601_img/ky3.png",
          name: "森林舞会",
          id: "3604",
        },
        {
          img: "/static/js85/img/home/v0601_img/ky4.png",
          name: "百家乐",
          id: "3603",
        },
      ],
      agList: [
        {
          img: "/static/js85/img/home/v0601_img/ag1.png",
          name: "包租婆",
          id: "12243",
        },
        {
          img: "/static/js85/img/home/v0601_img/ag2.png",
          name: "疯狂弹球",
          id: "12242",
        },
        {
          img: "/static/js85/img/home/v0601_img/ag3.png",
          name: "美人鱼",
          id: "12241",
        },
        {
          img: "/static/js85/img/home/v0601_img/ag4.png",
          name: "财气冲天",
          id: "12240",
        },
      ],
      bbList: [
        {
          img: "/static/js85/img/home/v0601_img/bb1.png",
          name: "惑星战记",
          id: "3461",
        },
        {
          img: "/static/js85/img/home/v0601_img/bb2.png",
          name: "外星战记",
          id: "3466",
        },
        {
          img: "/static/js85/img/home/v0601_img/bb3.png",
          name: "外星争霸",
          id: "3467",
        },
        {
          img: "/static/js85/img/home/v0601_img/bb4.png",
          name: "传统",
          id: "3468",
        },
      ],
      moreList: [
        {
          img: "/static/js85/img/home/v0601_img/jdb-elec.png",
          name: "JDB电子",
          url: "/home/slot?navid=9&id=10021",
        },
        {
          img: "/static/js85/img/home/v0601_img/pg-elec.png",
          name: "PG电子",
          url: "/home/slot?navid=9&id=11320",
        },
        {
          img: "/static/js85/img/home/v0601_img/cq9-elec.png",
          name: "CQ9电子",
          url: "/home/slot?navid=9&id=10018",
        },
        {
          img: "/static/js85/img/home/v0601_img/pt-elec.png",
          name: "PT电子",
          url: "/home/slot?navid=9&id=0",
        },
      ],
      gameIds: "mg",
    };
  },
  methods: {
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
        case "ky":
          this.eventsMiddleList = this.kyList;
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
    goCenter(num) {
      if (localStorage.token) {
        this.$goUserCen("recharge", 0);
      } else {
        this.$errorAlert("请先登录", "warn");
      }
    },
    games(item) {
      if (item.text == "LOTTERY") {
        window.open(item.link);
      } else {
        this.$router.push(item.link);
      }
    },
    //进入个人中心
    goUserCen(name, num) {
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）

      if (!localStorage.token || !localStorage.userinfo) {
        this.$store.commit("alert/newshowtip", {
          bool: true,
          title: "请先登录！",
          model: "",
          leftspan: true,
        });
      } else {
        this.$store.commit("showPersonal", {
          bool: true,
        });
        this.$store.commit("showContent", {
          parent: name,
        });
        this.$store.commit("showNav", {
          child: num,
        });
      }
    },
    goLive(item) {
      if (item) {
        if (!localStorage.token || !localStorage.userinfo) {
          this.$router.push("/home/live");
        } else {
          this.$loginGame(item);
        }
      }
    },

    async changeGame(item) {
      //左右布局,右边是超级赢家榜
      if (item) {
        this.gameId = item.id;
        this.gameData = this.$getGameV4("slot", item.id).slice(0, 8);
      }
    },

    async changeGame_new(item) {
      //左中右布局,中间是超级赢家榜
      if (item) {
        this.gameId = item.id;
        let gameDataLeft = JSON.parse(localStorage.gameDataLeft);
        for (let game in gameDataLeft) {
          if (game == item.id) {
            this.gameDataLeft = gameDataLeft[game];
          }
        }
        let gameDataRight = JSON.parse(localStorage.gameDataRight);
        for (let game in gameDataRight) {
          if (game == item.id) {
            this.gameDataRight = gameDataRight[game];
          }
        }
        this.clear();
      }
    },

    async clear() {
      this.iptVal = "";
      this.currenttype = "";
      this.currentline = "";
      this.currentTag = "";
      this.pageDatas.page = 1;
    },

    //获取banner
    async getBanner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc",
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body; // img 图片
      }
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
        if (!res.data.data.length) return false;
        this.showPopout = true;
        this.showimg = false;
        this.popups = res.data.data[0] && res.data.data[0].description;
        this.$store.commit("mainState/resetPour", false);
      }
      this.showPopout = true;
      this.showimg = true;
      this.popups = res.data.data[0] && res.data.data[0].description;
      this.$store.commit("mainState/resetPour", false);
    },

    goView(item) {
      if (item == "/plays/hall") {
        var i = window.location.href.indexOf("#");
        var href = window.location.href.slice(0, i + 1);
        window.open(href + item);
      } else {
        this.$router.push(item);
      }
    },

    // 获取游戏列表

    // 新文字走马灯接口
    async getLantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
      });
      if (res && res.code == 200) {
        if (res.data.data.length) {
          this.lantern = res.data.data[0] && res.data.data[0].description;
        } else {
          return false;
        }
      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
    },

    hotTag(item) {
      this.hotNow.img = item.img;
      this.hotNow.name = item.name;
      this.hotNow.class = item.class;
      this.hotNow.title = item.title;
      this.hotNow.text = item.text;
      this.hotNow.btn = item.btn;
    },

    kefu() {
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find((item) => item.status === "on");
        if (ser) {
          window.open(ser.url);
        }
      }
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

    //超级奖池
    jackpotFc() {
      // var _this = this;
      // clearInterval(this.setInter);

      // this.setInter = setInterval(function() {
      //     if (typeof _this.superAward == 'number') {
      //         _this.superAward = _this.superAward.toString();
      //     } else if (_this.superAward instanceof Array) {
      //         _this.superAward = _this.superAward.join(''); //数组->字符串
      //     }

      //     var num, index;
      //     num = parseFloat(parseFloat(_this.superAward.substr(0, 5), 2) + 1); //截取前5位
      //     index = num.toString().indexOf('.');
      //     num =
      //         num.toString() +
      //         parseInt(Math.random() * 9) +
      //         parseInt(Math.random() * 9) +
      //         parseInt(Math.random() * 9) +
      //         '.' +
      //         parseInt(Math.random() * 9) +
      //         parseInt(Math.random() * 9);
      //     _this.superAward = num.split(''); //字符串->数组
      // }, 1000);
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        var num = Math.floor(Math.random() * 100);

        this.superAward = this.superAward + 18;
        this.randomFloat = num;
      }, 600);
    },
    async getnewDatas() {
      await this.$gameSortV4();
    },
    // 获取公告列表接口，并缓存
    async getLanternList() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
        limit: 1000,
        page: 1,
      });
      if (res && res.code == 200) {
        this.lanternData = res.data;
        if (res.data.total > 0) {
          sessionStorage.setItem(
            "lanterndata",
            JSON.stringify(this.lanternData)
          );
        }
      } else {
        return false;
      }
    },
    //点击展示公告列表
    showTextModal() {
      if (this.lanternData.total > 0) {
        this.$store.commit("alert/showTextTip", true);
      } else {
        return false;
      }
    },
    // 获取电子游戏的数据
    async getid() {
      let a = JSON.parse(localStorage.gameSortV4_slot)[1].list;
      a.forEach((item, index) => {
        this.idlist.push(item.gcid);
      });
      this.idlist.forEach((item) => {
        switch (item) {
          case 10022:
            this.gameItem = {
              id: "10022",
              name: "MG老虎机",
              text: "MG CASINO",
              src: "/static/public/image/youyi/mg2.png",
              class: "mg",
              newclass: "mg_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10015:
            this.gameItem = {
              id: "10015",
              name: "AG电子",
              text: "AG CASINO",
              src: "/static/public/image/youyi/ag.png",
              class: "ag",
              newclass: "ag_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10024:
            this.gameItem = {
              id: "10024",
              name: "PT老虎机",
              text: "PT CASINO",
              src: "/static/public/image/youyi/pt.png",
              class: "pt",
              newclass: "pt_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10018:
            this.gameItem = {
              id: "10018",
              name: "CQ9电子",
              text: "CQ9 CASINO",
              src: "/static/public/image/youyi/cq9.png",
              class: "cq9",
              newclass: "cq9_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10042:
            this.gameItem = {
              id: "10042",
              name: "开元棋牌",
              text: "KY_CHESS",
              class: "ky",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10041:
            this.gameItem = {
              id: "10041",
              name: "VG棋牌",
              text: "VG_CHESS",
              class: "vg",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10612:
            this.gameItem = {
              id: "10612",
              name: "乐游棋牌",
              text: "LEG_CHESS",
              class: "ly",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10636:
            this.gameItem = {
              id: "10636",
              name: "大战棋牌",
              text: "DZ_CHESS",
              class: "dz",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10020:
            this.gameItem = {
              id: "10020",
              name: "FG老虎机",
              text: "FG CASINO",
              src: "/static/public/image/youyi/fg.png",
              class: "fg",
              newclass: "fg_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10021:
            this.gameItem = {
              id: "10021",
              name: "JDB电子",
              text: "JDB GAMING",
              src: "/static/public/image/youyi/jbd.png",
              class: "jdb",
              newclass: "jdb_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10016:
            this.gameItem = {
              id: "10016",
              name: "BBIN老虎机",
              text: "BBIN CASINO",
              src: "/static/public/image/youyi/bbin.png",
              class: "bbin",
              newclass: "bbin_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10014:
            this.gameItem = {
              id: "10014",
              name: "AE电子",
              text: "AE GAMING",
              src: "/static/public/image/youyi/ae.png",
              class: "ae",
              newclass: "ae_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10019:
            this.gameItem = {
              id: "10019",
              name: "DT老虎机",
              text: "DT GAMING",
              src: "/static/public/image/youyi/dt.png",
              class: "dt",
              newclass: "dt_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10023:
            this.gameItem = {
              id: "10023",
              name: "MW电子",
              text: "MW GAMING",
              src: "/static/public/image/youyi/mw.png",
              class: "mw",
              newclass: "mw_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 11320:
            this.gameItem = {
              id: "11320",
              name: "PG电子",
              text: "PG GAMING",
              src: "/static/public/image/youyi/pg.png",
              class: "pg",
              newclass: "pg_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 11906:
            this.gameItem = {
              id: "11906",
              name: "PP电子",
              text: "PP GAMING",
              src: "/static/public/image/youyi/pp.png",
              class: "pp",
              newclass: "pp_game",
            };
            this.rollList.push(this.gameItem);
            break;
          case 10025:
            this.gameItem = {
              id: "10025",
              name: "TTG老虎机",
              text: "TTG GAMING",
              src: "/static/public/image/youyi/ttg.png",
              class: "ttg",
              newclass: "ttg_game",
            };
            this.rollList.push(this.gameItem);
            break;
        }
      });
      localStorage.setItem("rollList", JSON.stringify(this.rollList));
      this.changeGame(this.rollList[0]);
    },
  },

  created() {
    this.getLanternList();
    this.getnewDatas();
    if (localStorage.gameSortV4_slot) {
      this.getid();
    } else {
      setTimeout(() => {
        this.getid();
      }, 800);
    }
    // this.getqipai(); //获取棋牌游戏的数据
    this.getPopout();

    setTimeout(() => {
      this.showimg = false;
    }, 7000);

    // this.$nextTick(() => {
    //     this.slider();
    // });
    if (localStorage.register) {
      // this.$router.push('/home/register2');
      this.$store.commit("alert/showMgmRegister", true);
      localStorage.removeItem("register");
    }
    if (this.clientwidth > 1920) {
      this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
    }
  },
  mounted() {
    this.initWinningInfo();
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    clearInterval(this.setInter);
    this.jackpotFc();
    this.getLantern();
    setTimeout(() => {
      if (!!this.$root && !!this.$root.config && !!this.$root.config.service) {
        this.serviceUrl =
          this.$root.config.service[0] && this.$root.config.service[0].url;
      }
    }, 200);
    this.getBanner();

    this.createDownloadQRCode({
      el: this.$refs["qr-code"],
      url: window.location.origin + "/m#/download",
      size: 136,
    });
    this.changGame("mg");
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  components: {},
  store,
};
</script>

<style lang="less" scoped>
/deep/ .ivu-carousel-dots {
  z-index: 1000;
}
.alert-img {
  /deep/ .ivu-modal-content {
    background-color: transparent;
  }
  /deep/ .ivu-modal-footer {
    display: none;
  }
  /deep/ .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -325px;
    margin-top: -275px;
  }
  /deep/ .ivu-modal-body {
    padding: 0;
    height: 550px;
  }
}

.guanbi img {
  position: relative;
}
.guanbi .ivu-modal-content .ivu-modal-footer {
  display: none !important;
}
.guanbi .ivu-modal-body {
  padding: 0 !important;
  height: 550px;
}
.guanbi .ivu-modal-close {
  display: none;
}
.guanbi .ivu-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -328px;
  margin-top: -273px;
}
.guanbi .close {
  position: absolute;
  display: block;
  width: 70px;
  height: 70px;
  right: 0;
  top: 0;
  cursor: pointer;
}
body {
  background: #272727;
}
.js85-new-index {
  position: relative;
  min-width: 1200px;
  margin: 0 auto;
  // background: #272727;
  font-size: 16px;

  .just-bg {
    width: 90%;
    height: 500px;
    background: url("/static/js85/img/cbg2.jpg");
    position: absolute;
    top: 0px;
    z-index: -10;
  }

  .list li a:hover {
    background: #e1bd53;
  }
  .list li a:hover .ren {
    color: #2d1e17;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
  }
  .pt60 {
    padding-top: 60px;
  }
  .tac {
    text-align: center;
    width: 123px;
    height: 30px;
  }

  .zhenren {
    background: #1b1b1b;
    height: 231px;
    border: 0px solid #e1bd53;
    li {
      float: left;
      width: 123px;
      height: 76px;
      border-right: 1px solid #2a2a2a;
      border-bottom: 1px solid #2a2a2a;

      a {
        display: block;
        text-align: center;
        color: #fff;
        padding-top: 12px;

        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          &:hover {
            color: #ffd053;
          }
        }
      }

      &.rimr {
        border-right: none;
        width: 124px;
      }
    }
  }

  .pt20 {
    padding-top: 20px;
  }

  .lunti div {
    float: left;
    font-size: 12px;
    width: 33.3%;
    text-align: center;
    line-height: 26px;
    color: #f4dc77;
  }
  .luntop2 li .red {
    color: #ff0000;
  }

  .home-container {
    // height: 737px;
    background-size: cover;
    position: relative;
    overflow: hidden;
    margin: 36px auto 0;
    width: 1200px;

    .sub-nav {
      max-width: 600px;
      margin: 80px auto 60px auto;
      display: flex;
      justify-content: space-around;

      .sub-nav-item {
        height: 360px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.2s;

        .sub-nav-content {
          position: absolute;
          top: 274px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .sub-nav-title {
            color: white;
            font-size: 26px;
            margin-bottom: 4px;
          }
        }
        .sub-nav-img {
          object-fit: cover;
          height: 100%;
        }
        .sub-nav-btn {
          opacity: 0;
          height: 40px;
          text-align: center;
          padding-top: 4px;
          img {
            height: 30px;
          }
          img:hover {
            cursor: pointer;
          }
        }
      }
      .sub-nav-item:hover {
        transform: scale(1.1, 1.1);
        transition: transform 0.2s;
        .sub-nav-btn {
          opacity: 1;
          transition: opacity 0.2s;
        }
      }
    }

    .service-tite {
      object-fit: cover;
      margin-left: 30px;
      margin-bottom: 30px;
    }
    .service-img {
      object-fit: cover;
      width: 100%;
      margin-bottom: 10px;
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
        background: url("/static/js85/img/home/v0601_img/outline-arrow.png")
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

    .download-section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 30px 60px 30px;

      .download-left-box {
        padding-top: 20px;
        span {
          display: block;
          color: white;
          line-height: 16px;
          margin-bottom: 8px;
        }
        img {
          display: block;
        }
        .download-left-title {
          font-size: 30px;
          line-height: 40px;
          margin-bottom: 14px;
          font-weight: bold;
          color: #f5d065;
        }
        .download-QRcode {
          padding-top: 10px;
          margin-bottom: 20px;
          width: 120px;
        }
        .download-btn {
          display: inline;
          width: 160px;
          margin-right: 6px;
        }
        .title3 {
          height: 146px;
          width: 146px;
          margin: 20px 0;
          padding: 5px;
          // background: url('/static/99qp/img/qr_bg.png') no-repeat center center;
          background: white;
        }
      }
      .download-middle-img {
        height: 380px;
        margin-right: 30px;
      }
      .downlaod-right-box {
        width: 310px;
        padding-top: 20px;
        span {
          display: block;
          color: white;
          line-height: 16px;
          margin-bottom: 8px;
        }
        .download-right-title {
          font-size: 30px;
          line-height: 40px;
          margin-bottom: 14px;
          font-weight: bold;
          color: #f5d065;
        }
        .downlaod-content-box {
          display: flex;
          img {
            width: 80px;
          }
          .download-text-box {
            margin-left: 10px;
          }
        }
      }
    }

    .product-title {
      object-fit: cover;
      height: 50px;
      margin-left: 14px;
      margin-bottom: 14px;
    }
    .product-content {
      display: flex;
      justify-content: space-between;
      margin: 0 30px;

      .product-item {
        width: 240px;

        .sub-title {
          display: block;
          font-size: 20px;
          color: white;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .product-content {
          font-size: 14px;
          line-height: 20px;
          margin: 0;
          color: #c0c0c0;
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
          background: url("/static/js85/img/home/v0601_img/winner-title.png")
            no-repeat center;
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
                background: url("/static/js85/img/jingling.png") no-repeat;
                background-position: -22px -189px;
              }
              &:nth-child(2) {
                background: url("/static/js85/img/jingling.png") no-repeat;
                background-position: -78px -195px;
              }
              &:nth-child(3) {
                background: url("/static/js85/img/jingling.png") no-repeat;
                background-position: -129px -195px;
              }
              &:nth-child(4) {
                background: url("/static/js85/img/jingling.png") no-repeat;
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
                background: url("/static/js85/img/zhifubao.webp") no-repeat;
                background-position: 9px 6px;
                margin-left: 20px;
              }
              &:nth-child(3) {
                background: url("/static/js85/img/weixin.webp") no-repeat;
                background-position: 9px 6px;
              }
              &:nth-child(4) {
                background: url("/static/js85/img/yinlian.webp") no-repeat;
                background-position: 9px 6px;
              }
              &:nth-child(5) {
                background: url("/static/js85/img/kuaisu.webp") no-repeat;
                background-position: 9px 6px;
              }
            }
          }
        }

        .game_info_box {
          // height: 120px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // margin-left: 243px;
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
                  background: url(/static/js85/img/home/caijin/arrow-left.png)
                    no-repeat center center;
                  &:hover {
                    background: url(/static/js85/img/home/caijin/arrow-left-hover.png)
                      no-repeat center center;
                  }
                }
                &.next {
                  right: 20px;
                  background: url(/static/js85/img/home/caijin/arrow-right.png)
                    no-repeat center center;
                  &:hover {
                    background: url(/static/js85/img/home/caijin/arrow-right-hover.png)
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
                      background: url(/static/js85/img/xian.png) right center
                        no-repeat;
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
                        background: url(/static/js85/img/home/caijin/ae.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 30px;
                      }
                      &.ag:before {
                        background: url(/static/js85/img/home/caijin/ag.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.bbin:before {
                        background: url(/static/js85/img/home/caijin/bbin.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.cq9:before {
                        background: url(/static/js85/img/home/caijin/cq9.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.dt:before {
                        background: url(/static/js85/img/home/caijin/dt.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 34px;
                      }
                      &.fg:before {
                        background: url(/static/js85/img/home/caijin/fg.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.jdb:before {
                        background: url(/static/js85/img/home/caijin/jdb.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 30px;
                      }
                      &.mg:before {
                        background: url(/static/js85/img/home/caijin/mg.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.mw:before {
                        background: url(/static/js85/img/home/caijin/mw.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.pt:before {
                        background: url(/static/js85/img/home/caijin/pt.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.ky:before {
                        background: url(/static/js85/img/home/caijin/ky.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 32px;
                      }
                      &.vg:before {
                        background: url(/static/js85/img/home/caijin/vg.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 26px;
                      }
                      &.ly:before {
                        background: url(/static/js85/img/home/caijin/ly.png)
                          no-repeat center center;
                        background-size: contain;
                        height: 32px;
                      }
                      &.pg:before {
                        background: url(/static/js85/img/home/caijin/pg.png)
                          no-repeat center center;
                        background-size: contain;
                      }
                      &.ttg:before {
                        background: url(/static/js85/img/home/caijin/ttg.png)
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
                          background: url(/static/js85/img/home/star.png)
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
    .bg2 {
      width: 100%;
      background: url("/static/js85/img/bg_3.png") no-repeat;
      background-size: auto;
    }
    .gameContainer2 {
      width: 1200px;
      margin: 0 auto;
      .title {
        padding: 35px 0;
        h2 {
          text-align: center;
          font-size: 34px;
          color: #ffd053;
          line-height: 34px;
          padding-bottom: 10px;
        }
        p {
          text-align: center;
          color: #707574;
          font-size: 10px;
          line-height: 12px;
          // background: url(/static/js85/img/bg6.png) 50% no-repeat;
        }
      }
      .index_layer3 {
        display: flex;
        justify-content: space-between;
        .layer3_box {
          width: 590px;
          border-radius: 24px;
          .icon {
            cursor: pointer;
            width: 100%;
            height: 200px;
            position: relative;
            .bg {
              width: 100%;
              height: 100%;
            }
            .pic {
              position: absolute;
              bottom: 0;
              right: 44px;
              -webkit-transition: 0.5s;
              -o-transition: 0.5s;
              transition: 0.5s;
            }
          }
          &:hover .icon .pic {
            -webkit-animation: ab infinite linear 1.5s;
            animation: ab infinite linear 1.5s;
          }
          .text {
            width: 100%;
            height: 215px;
            background: #2c2c2c;
            border-radius: 0 0 25px 25px;
            position: relative;
            z-index: 1;
            .text_box {
              width: 560px;
              margin: 0 auto;
              .text_Top {
                width: 100%;
                padding: 20px 0;
                border-bottom: 1px solid #414141;
                overflow: hidden;
                p {
                  float: left;
                  line-height: 25px;
                  color: #fff;
                  width: 385px;
                  font-size: 12px;
                }
                a {
                  width: 155px;
                  height: 56px;
                  border-color: #664535;
                  float: right;
                  &.playBtn {
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    border-radius: 28px;
                    border-width: 3px;
                    border-style: solid;
                    font-size: 20px;
                    color: #ffd053;
                    background: url(/static/js85/img/play.png) 100px no-repeat;
                    text-indent: 40px;
                    font-weight: 700;
                    border: 1px solid #ffd053;
                  }
                }
              }

              .text_Bottom {
                width: 100%;
                ul {
                  display: flex;
                  justify-content: space-between;
                  li {
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    height: 100px;
                    cursor: pointer;
                    a {
                      color: #5c5c5c;
                      text-decoration: none;
                    }
                    &:hover {
                      .bt {
                        color: #ffd053;
                      }
                    }
                    img {
                      width: 45px;
                      height: 45px;
                      margin: 12px 0;
                    }
                    .bt {
                      font-size: 12px;
                      color: #fff;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .home-banner {
    margin: 2rem auto -3rem auto;
    .sub-nav {
      .black-dot.outer {
        height: 100px;
      }
      .black-dot {
        background: rgb(27, 27, 27);
        line-height: 100px;
        padding-top: 15px;
        ul {
          li {
            float: left;
            display: inline;
            width: 16rem;
            height: 58px;
            padding: 0;
            border-right: 1px solid rgb(40, 40, 40);
            a {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        .layout {
          display: flex;
          justify-content: center;
          margin: 0px auto;
          .link-deposit {
            padding-left: 0px;
            a {
              background: url(/static/js85/img/home/btn/btn_deposit_1.png)
                no-repeat;
            }
          }
          .link-withdraw {
            a {
              background: url(/static/js85/img/home/btn/btn_withdraw_1.png)
                no-repeat;
            }
          }
          .link-download {
            a {
              background: url(/static/js85/img/home/btn/btn_download_1.png)
                no-repeat;
            }
          }
          .link-guide {
            padding-right: 0px;
            border-width: 0px;
            border-style: initial;
            border-color: initial;
            border-image: initial;
            a {
              background: url(/static/js85/img/home/btn/btn_guide_1.png)
                no-repeat;
            }
          }
        }
      }
      .contentbox {
        width: 100%;
        .contentbg {
          width: 100%;
          height: 455px;
          background: url(/static/js85/img/home/btn/content_bg.jpg) 50% center
            no-repeat;
        }
      }
    }
    .sub-title {
      height: 40px;
      color: #66451f;
      display: flex;
      justify-content: center;
      position: relative;
      top: -2.5rem;
      font: 18px / 40px "Microsoft YaHei";
    }
  }
  .bg2 {
    width: 100%;
    background: url("/static/js85/img/bg_3.png") no-repeat;
    background-size: auto;
  }
  .gameContainer2 {
    width: 1200px;
    margin: 0 auto;
    .title {
      padding: 35px 0;
      h2 {
        text-align: center;
        font-size: 34px;
        color: #ffd053;
        line-height: 34px;
        padding-bottom: 10px;
      }
      p {
        text-align: center;
        color: #707574;
        font-size: 10px;
        line-height: 12px;
        // background: url(/static/js85/img/bg6.png) 50% no-repeat;
      }
    }
    .index_layer3 {
      display: flex;
      justify-content: space-between;
      .layer3_box {
        width: 590px;
        border-radius: 24px;
        .icon {
          cursor: pointer;
          width: 100%;
          height: 200px;
          position: relative;
          .bg {
            width: 100%;
            height: 100%;
          }
          .pic {
            position: absolute;
            bottom: 0;
            right: 44px;
            -webkit-transition: 0.5s;
            -o-transition: 0.5s;
            transition: 0.5s;
          }
        }
        &:hover .icon .pic {
          -webkit-animation: ab infinite linear 1.5s;
          animation: ab infinite linear 1.5s;
        }
        .text {
          width: 100%;
          height: 215px;
          background: #2c2c2c;
          border-radius: 0 0 25px 25px;
          position: relative;
          z-index: 1;
          .text_box {
            width: 560px;
            margin: 0 auto;
            .text_Top {
              width: 100%;
              padding: 20px 0;
              border-bottom: 1px solid #414141;
              overflow: hidden;
              p {
                float: left;
                line-height: 25px;
                color: #fff;
                width: 385px;
                font-size: 12px;
              }
              a {
                width: 155px;
                height: 56px;
                border-color: #664535;
                float: right;
                &.playBtn {
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-align: center;
                  align-items: center;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  border-radius: 28px;
                  border-width: 3px;
                  border-style: solid;
                  font-size: 20px;
                  color: #ffd053;
                  background: url(/static/js85/img/play.png) 100px no-repeat;
                  text-indent: 40px;
                  font-weight: 700;
                  border: 1px solid #ffd053;
                }
              }
            }

            .text_Bottom {
              width: 100%;
              ul {
                display: flex;
                justify-content: space-between;
                li {
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-pack: center;
                  justify-content: center;
                  -ms-flex-direction: column;
                  flex-direction: column;
                  height: 100px;
                  cursor: pointer;
                  a {
                    color: #5c5c5c;
                    text-decoration: none;
                  }
                  &:hover {
                    .bt {
                      color: #ffd053;
                    }
                  }
                  img {
                    width: 45px;
                    height: 45px;
                    margin: 12px 0;
                  }
                  .bt {
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
    .index_layer4 {
      margin-top: 35px;
      padding-bottom: 25px;
      ul {
        display: flex;
        justify-content: space-between;
        height: 200px;
        li {
          position: relative;
          width: 385px;
          height: 200px;
          cursor: pointer;
          .bg {
            width: 100%;
            height: 100%;
          }
          .pic {
            position: absolute;
            right: 10px;
            bottom: 10px;
            -webkit-transition: 0.5s;
            -o-transition: 0.5s;
            transition: 0.5s;
          }
          .pic1 {
            width: 190px;
            height: 206px;
          }
          .pic2 {
            width: 182px;
            height: 204px;
          }
          .pic3 {
            width: 222px;
            height: 200px;
          }
          &:hover .pic {
            -webkit-animation: ab infinite linear 1.5s;
            animation: ab infinite linear 1.5s;
          }
        }
      }
    }
  }
  @keyframes animateSub {
    0% {
      top: 0;
    }

    to {
      top: -700px;
    }
  }

  .home-container #slot-box:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -805px;
    bottom: -20px;
    width: 355px;
    height: 518px;
    z-index: 1;
  }

  /deep/ .carouse {
    min-width: 1200px;
    max-width: 100%;
    margin: 0 auto;

    .carousel_wrapper {
      overflow: hidden;
      width: 100%;

      .ivu-carousel-list {
        height: 100%;
        .ivu-carousel-track {
          height: 100%;
          width: 100%;
          .myItems {
            width: 100%;
            height: 100% !important;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
    .ivu-carousel-dots-inside {
      bottom: 12px;
      li {
        .radius {
          width: 12px;
          height: 12px;
          background: #fff;
        }
        &.ivu-carousel-active {
          .radius {
            background: #de3a3a;
          }
        }
      }
    }
  }

  .el-carousel {
    width: 100%;
  }

  .w1000 {
    width: 1040px;
    height: 36px;
    margin: 0 auto;
    cursor: pointer;
  }
  .index-banner {
    height: 465px;
    position: relative;
  }
  .index-bannercon {
    position: relative;
    height: 464px;
    overflow: hidden;
  }
  .index-bannercon {
    position: absolute;
    left: 50%;
    top: 0px;
    margin-left: -500px;
    z-index: 20;
  }

  .notice {
    position: absolute;
    height: 36px;
    line-height: 36px;
    width: 100%;
    margin-top: 0;
    background: url(/static/js85/img/noticebg.png) repeat-x;
  }
  .index-notice {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .notice span {
    font-size: 12px;
    background: url(/static/js85/img/notice.png) left center no-repeat;
    padding-left: 30px;
    width: 100px;
    float: left;
    display: block;
    height: 36px;
    line-height: 37px;
    color: #e0bf55;
  }
  .notice span i {
    font-style: normal;
  }
  .notice marquee {
    float: right;
    width: 860px;
    margin-right: 10px;
    color: #fff;
    height: 36px;
    line-height: 36px;
  }

  .index-slots {
    height: 453px;
    overflow: hidden;
  }

  .notice {
    height: 36px;
    line-height: 36px;
    width: 100%;
    margin-top: 0px;
    background: url(/static/js85/img/noticebg.png) repeat-x;
  }
  .index-notice {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .notice span {
    font-size: 12px;
    background: url(/static/js85/img/home/v0601_img/speaker.png) left center
      no-repeat;
    background-size: 20%;
    padding-left: 30px;
    width: 100px;
    float: left;
    display: block;
    height: 36px;
    line-height: 37px;
    color: #e0bf55;
  }
  .notice span i {
    font-style: normal;
  }
  .notice marquee {
    float: right;
    width: 920px;
    margin-right: 10px;
    color: #fff;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
  }
}
.gameImg {
  animation: bounceInRight 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1 alternate
    forwards;
}
</style>
