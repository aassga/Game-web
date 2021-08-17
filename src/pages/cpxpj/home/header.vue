<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top" :class="{ night: colorbool }">
      <!-- <div class="login">
        <div class="before_login">
          <div class="l_top">
            <div>
              <div class="header-logo"><img src="/static/cpxpj/img/logo.png" width="200px"></div>
              <div>最佳博彩认证推荐品牌</div>
            </div>
            <div>
              <div class="userInfo" v-if="userinfo">
                <p><span>欢迎您，</span><span>{{userinfo.userName}}</span><span><img src="/static/cpxpj/img/level.png" alt=""></span></p>
                <p><span>中心钱包:</span><span>{{userinfo&&userinfo.balance}}</span></p>
              </div>
              <ul>
                <li @click="personal('cun')"><a href="javascript:0">
                  <i class="cun"></i>
                  <i>存款</i>

                  </a> </li>
                <li @click="personal('qu')"><a href="javascript:0">
                  <i class="qu"></i>
                  <i>取款</i>
                  </a> </li>
                <li @click="personal('cun')"><a href="javascript:0">
                  <i class="zhuan"></i>
                  <i>转账</i>
                  </a> </li>
                <li v-show="!userinfo" @click="showLoginLogs(1)"><a href="javascript:0">
                  <i class="deng"></i>
                  <i>登录</i>
                  </a> </li>
                <li v-show="!userinfo" @click="showLoginLogs(2)"><a href="javascript:0">急速注册</a> </li>
                <li v-show="userinfo" @click="logout"><a href="#">
                  <i class="tui"></i>
                  <i>退出</i>
                  </a> </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nav-content">
          <ul class="nav-bar fl">
              <li class="tpT" v-for="(item,i) in classifyList" :key="i">
                  <img src="/static/cpxpj/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                  <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex,fontColor:colorbool}, 'x-dh-t']">
                      <span class="navName">{{item.name}}</span>
                  </a>
              </li>
          </ul>
        </div>
      </div> -->

      <!-- 登录 -->
      <div class="login">
        <!-- 登录前 -->
        <div class="before_login">
          <!-- <div class="l_top">
            <div class="top_left">
              <div>
                <img src="/static/cpxpj/img/nav-flag.png" alt="" />
                简体中文
              </div>
              <div @click="$router.push('/home')">网站页面</div>
              <div @click="personal('cun')">快速存款</div>
              <div>尊华会</div>
              <div>免费试玩</div>
            </div>

            <div class="top_right">
              <div class="top-right-domain">
                <img src="/static/cpxpj/img/nav-top-domain.png" alt="" />
                官方域名： 8222.com
              </div>

              <div class="top-right-login">
                <img src="/static/cpxpj/img/nav-login-bg.png" alt="" />
                <span v-show="!userinfo" @click="showLoginLogs(1)">登入</span>
                <span v-show="userinfo" @click="logout">退出</span>
                <span v-show="!userinfo" @click="showLoginLogs(2)">注册</span>
              </div>
              <span  v-if="userinfo">中心钱包: {{userinfo&&userinfo.balance}}</span>
            </div>
          </div> -->

          <div class="l_bot">
            <img class="nav-bot-logo" src="/static/cpxpj/img/logo.png" />

            <ul class="nav-bot-left">
              <li
                class="nav-bot-left-item"
                v-for="(item, i) in classifyList"
                :key="i"
              >
                <img
                  src="/static/cpxpj/img/hot.gif"
                  class="x-dh-i"
                  alt
                  v-if="item.hotShow"
                />
                <a
                  @click="$goPath('one', item)"
                  :class="[
                    { navActive: i == gameIndex, fontColor: colorbool },
                    'x-dh-t',
                  ]"
                >
                  <!-- add shinning text -->
                  <span
                    class="navName"
                    :class="[item.hotShow == true ? 'blingColor' : '']"
                    >{{ item.name }}</span
                  >
                </a>
              </li>
            </ul>

            <img
              class="nav-bot-img"
              src="/static/cpxpj/img/nav-bot-img.png"
              alt=""
            />

            <div class="nav-bot-right">
              <div class="nav-bot-right-item" @click="goHeader(1)">
                <!-- <div class="blingImg">
                  <img
                    class="origin"
                    src="/static/cpxpj/img/nav-bot-borrow.png"
                    alt=""
                  />
                  <img
                    class="red"
                    src="/static/cpxpj/img/nav-bot-borrow1.png"
                    alt=""
                  />
                </div> -->
                <img src="/static/cpxpj/img/nav-bot-borrow.png" alt="" />
                <!-- <span class="blingColor">免息借呗</span> -->
                <span>免息借呗</span>
              </div>

              <div class="nav-bot-right-item" @click="$router.push('/agent')">
                <img src="/static/cpxpj/img/nav-bot-agent.png" alt="" />
                <span>代理</span>
              </div>

              <div
                class="nav-bot-right-item"
                @click="openWindow('/static/cpxpj/html/download/index.html')"
              >
                <img src="/static/cpxpj/img/nav-bot-app.png" alt="" />
                <span>APP</span>
              </div>

              <div
                class="nav-bot-right-item"
                @click="$router.push('/home/youhui')"
              >
                <div class="blingImg">
                  <img
                    class="origin"
                    src="/static/cpxpj/img/nav-bot-gift.png"
                    alt=""
                  />
                  <img
                    class="red"
                    src="/static/cpxpj/img/nav-bot-gift1.png"
                    alt=""
                  />
                </div>
                <span class="blingColor">优惠</span>
              </div>

              <div
                class="nav-bot-right-item"
                @click="$goPath('one', serviceLink)"
              >
                <div class="blingImg">
                  <img
                    class="origin"
                    src="/static/cpxpj/img/nav-bot-service.png"
                    alt=""
                  />
                  <img
                    class="red"
                    src="/static/cpxpj/img/nav-bot-service1.png"
                    alt=""
                  />
                </div>
                <span class="blingColor">客服</span>
              </div>
            </div>
          </div>

          <div class="l-login">
            <div
              class="header-login"
              id="xheader-login"
              style="display: block"
              v-if="!userinfo"
            >
              <form
                name="LoginForm"
                id="loginForm"
                action="#"
                method="POST"
                target="actionframe"
                onsubmit="return false;"
              >
                <div class="header-logincon">
                  <div class="yiji">易记域名：8222.com</div>
                  <div class="forms">
                    <div class="logName">
                      <img src="/static/cpxpj/img/headerlogin.png" alt="" />
                    </div>
                    <input
                      type="submit"
                      value
                      class="subbtn"
                      @click="showLoginLogs(1)"
                    />
                    <a
                      href="javascript:void(0)"
                      class="regbtn"
                      @click="showLoginLogs(2)"
                    ></a>
                  </div>
                </div>
              </form>
            </div>

            <div class="login-after" v-if="userinfo">
              <div class="left">
                <!-- <span class="refresh_balance">
                  <a
                    class="refresh"
                    @click="getBalance"
                    @mouseover="newshowfresh"
                    @mouseout="showfresh = false"
                    :class="[
                      balanceRefreshing ? 'fres' : '',
                      isclick ? 'newfresh' : '',
                    ]"
                  ></a>
                </span>
                | -->
                <span class="user_money">
                  中心钱包：<font>{{ userinfo && userinfo.balance }}</font>
                </span>
                | <span class="yijian"> 一键回归</span>
                |
                <span class="user">
                  <i></i>欢迎您，{{ userinfo ? userinfo.userName : "" }}
                </span>
                |
                <span class="chong" @click="$bindPhoneOrbank()">
                  <i>存</i> 存款
                </span>
                |
                <span class="chong" @click="personal('qu')">
                  <i>取</i> 取款
                </span>
                |
                <span class="chong" @click="personal('cun')">
                  <i>转</i> 转账
                </span>
                |
                <span class="huiyuan" @click="goCenter('3')">
                  <i></i>会员中心
                </span>
                |
                <span class="record" @click="goCenter('4')">
                  <i></i>下注记录
                </span>
                |
                <span class="message" @click="goCenter('5')">
                  <i></i>消息中心
                </span>
                |
                <span class="loginout" @click="logout"> <i></i>退出登录 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        :visible.sync="modal6"
        class="model"
        width="306"
        height="146"
        v-model="showmodle"
        title="信息"
        :loading="loading"
        @on-ok="asyncOK"
      >
        <p>开始进行缓存清除，完毕后将会刷新网站！</p>
      </Modal>

      <qyLogin ref="qylogin" :logiinTishi="logiinTishi"></qyLogin>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
import inForMation from "../../public/home/information.vue";
import qyLogin from "../../public/home/qy-login.vue";
// import data from "../../public/user/login";
export default {
  // mixins: [data],
  data() {
    return {
      serviceLink: {
        name: "客服",
        text: "SERVICE",
        link: "service",
        type: "service",
      },
      systemmessage: {
        width: " 18px",
        height: "18px",
        borderRadius: "50%",
        backgroundColor: "#ff0000",
        position: "absolute",
        left: "58px",
        top: "-9px",
        color: "#fff",
        lineHeight: " 18px",
        textAlign: "center",
        display: "block",
      },
      logiinTishi: {
        title: "来自澳门新葡京的消息",
        bgcolor: {
          background: "linear-gradient(to right, #65e0f4, #4fade6)",
        },
      },
      time: "",
      colorbool: false,
      modal6: false,
      loading: true,
      headerColorBool: false,
      headerbgColor: "#697dac",
      headerbgColor: "#d0d9e5",
      showmodle: false,
      codeImg: "/static/cpxpj/img/new_games/lo.png",
      left: 5,
      top: -193,
      gameIndex: 0,
      navChecked: 0,
      showReload: false,
      classifyList: [
        {
          name: "首页",
          text: "HOME",
          platform: "home",
          link: "/home",
          hotShow: false,
        },
        {
          name: "视讯",
          text: "CASINO",
          link: "/home/live",
          platform: "live_casino",
          type: "live",
          hotShow: true,
        },
        {
          name: "棋牌",
          text: "CHESS",
          platform: "KY_CHESS",
          // link: "/home/qipai?id=10042&name=开元棋牌",
          link: "/home/chess?navid=9&id=0",
          gameName: "0",
          list: [],
          type: "chess",
          hotShow: true,
        },
        {
          name: "电子",
          text: "GAME",
          platform: "AG_GAME",
          link: "/home/slot?navid=9&id=0",
          type: "live",
          hotShow: true,
        },
        {
          name: "捕鱼",
          text: "FISHING",
          link: "/home/fish?navid=9&id=0",
          type: "fish",
          hotShow: true,
        },
        {
          name: "彩票",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          type: "lottery",
          link: "/plays/hall",
          gameName: "0",
          hotShow: false,
        },
        {
          name: "体育",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu?id=0",
          list: [],
          hotShow: false,
        },
        // {
        //   name: "优惠",
        //   text: "ACTIVETY",
        //   link: "/home/youhui",
        // },
        // {
        //   name: "客服",
        //   text: "SERVICE",
        //   link: "service",
        //   type: "service",
        // },
      ],
    };
  },
  methods: {
    goCenter(num) {
      if (localStorage.token) {
        switch (num) {
          case "1":
            this.$goUserCen("recharge", 0);
            break;
          case "2":
            this.$goUserCen("withdraw", 0);
            break;
          case "3":
            this.$goUserCen("personage", 0);
            break;
          case "4":
            this.$goUserCen("personage", 2);
            break;
          case "5":
            this.$goUserCen("message", 0);
            break;
        }
      } else {
        this.$errorAlert("请先登录", "warn");
      }
    },
    shake(element, className, times) {
      var i = 0,
        t = false,
        o = element.attr("class"),
        c = "",
        times = times || 2;
      if (t) return;
      t = setInterval(function () {
        i++;
        c = i % 2 ? o + " " + className : o;
        element.attr("class", c);

        if (i == 2 * times) {
          clearInterval(t);
          element.removeClass(className);
        }
      }, 500);
    },
    openWindow(url) {
      window.open(url);
    },
    showLoginLogs(i) {
      this.$store.state.home.showLoginIndex = i;
      this.$store.state.home.showLoginLog = true;
    },

    personal(a) {
      if (!this.userinfo) {
        this.$errorAlert("请先登录", "warn");
        return false;
      } else {
        if (a == "cun") {
          if (!this.userinfo.phone)
            this.$store.commit("alert/changbindbank", true);
          else this.$goUserCen("recharge", 0);
          // this.$goUserCen('recharge',0);
        } else {
          this.$goUserCen("withdraw", 0);
        }
      }
    },
    goHeader(typeNum) {
      if (typeNum == 0) {
        // 线路检测
        // alert("暂未开放，敬请期待")
        return false;
      } else if (typeNum == 1) {
        if (localStorage.token) {
          if (this.$store.state.game.jieBeiData.show) {
            this.$goUserCen("borrowMoney", 0);
          } else {
            this.$goUserCen("recharge", 0);
          }
        } else {
          this.$store.commit("alert/newshowtip", {
            bool: true,
            title: "请先登录",
            model: "error",
            leftspan: true,
          });
        }
      } else if (typeNum == 2) {
        // 金管家
        window.open("/static/cpxpj/html/active/sxjgj/index.html", "_blank");
      }
    },
    //获取时间
    ee(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    we(num) {
      switch (num) {
        case 1:
          num = "一";
          break;
        case 2:
          num = "二";
          break;
        case 3:
          num = "三";
          break;
        case 4:
          num = "四";
          break;
        case 5:
          num = "五";
          break;
        case 6:
          num = "六";
          break;
        case 7:
          num = "七";
          break;
      }
      return num;
    },
    goLink(item, i) {
      this.gameIndex = i;
      this.navChecked = i;
      localStorage.setItem("navIndex", i);
      if (item.link) {
        if (item.link == "service") {
          let service = JSON.parse(localStorage.config).service;
          if (service) {
            let ser = service.find((item) => item.status === "on");
            if (ser) {
              window.open(ser.url);
            }
          }
        } else if (item.link == "/plays/hall") {
          window.open("#/plays/hall");
          return false;
        } else if (item.link == "/home/youhui") {
          this.$router.push(item.link);
        } else {
          this.$router.push(item.link);
        }
      } else if (item.gameName) {
        this.trustLogin(item);
      }
    },
    getTimes() {
      var that = this;
      let timestam = new Date().getTime();
      let time = timestam;
      let T = "";
      let dateObj = new Date(time),
        p0 = this.ee,
        Y = dateObj.getFullYear(),
        Mh = dateObj.getMonth() + 1,
        D = p0(dateObj.getDate()),
        X = this.we(dateObj.getDay()),
        H = p0(dateObj.getHours()),
        M = p0(dateObj.getMinutes()),
        S = p0(dateObj.getSeconds());
      // if(H>=12){
      //   T = 'PM'
      //   H = H-12
      // }else{
      //   T = 'AM'
      // }

      if (Mh > 12) {
        Mh = "01";
      } else if (Mh < 10) {
        Mh = "0" + Mh;
      }
      let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
      this.time = str;
    },

    focusname() {},
    changcolor() {
      this.colorbool = !this.colorbool;
      this.$store.commit("mainState/changcolor", this.colorbool);
    },

    cleanUp() {
      this.showmodle = true;
    },
    asyncOK() {
      window.location.reload();
    },
    logout () {
      UserService.logout.call(this)
    },
    getBalance() {
      this.showReload = true;
      getS(`member/balance`).then((res) => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data.member;
          userinfo.agent = res.data.agency;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
          // this.showReload = false
          this.$store.commit("alert/newshowtip", {
            bool: true,
            title: "刷新余额成功！",
            model: "",
            leftspan: false,
          });
        } else {
          this.$store.commit("alert/newshowtip", {
            bool: true,
            title: "服务器报错",
            model: "",
            leftspan: false,
          });
        }
      });
      setTimeout(() => {
        this.showReload = false;
      }, 5000);
    },
    // 打开个人中心
    goUserCen(name, num) {
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", {
        bool: true,
      });
      this.$store.commit("showContent", {
        parent: name,
      });
      this.$store.commit("showNav", {
        child: num,
      });
    },
    async tryPlay() {
      // let res = await this.$http.post('/api/test/registerTest', {})
      let res = await this.$http.get("/frontend/test/demo", {
        headers: { Accept: "application/x.tg.v2+json" },
        params: {},
      });
      if (res && res.code == 200) {
        UserService.setCache(res, "test");

        this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then((res) => {
          let platform = res.data.platform;
          let alias = res.data.alias;
          let keys = Object.keys(platform);
          let refund = [];
          keys.forEach((v, i) => {
            refund[i] = {};
            refund[i].title = v;
            refund[i].list = [];
            platform[v].forEach((a, j) => {
              refund[i].list[j] = {};
              refund[i].list[j].key = Object.keys(a)[0];
              refund[i].list[j].refund = Object.values(a)[0];
              refund[i].list[j].name = alias[refund[i].list[j].key];
            });
          });

          // this.refundData = refund;
          localStorage.setItem("refund", JSON.stringify(refund));
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    forget() {
      this.$store.commit("alert/newshowtip", {
        bool: true,
        title: "忘记帐号密码,请联系在线客服人员取回！",
        model: "",
        leftspan: false,
      });
    },
    // is_code_show(){
      //    getS(`is-show-captcha-with-type`, { device: 'pc' }).then(res => {
      //   if (res && res.code === 200) {
      //     this.code_show = res.data.isShowCaptcha;
      //   }
      // });
    // }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      switch (true) {
        case newVal == "/home":
          this.gameIndex = 0;
          this.navChecked = 0;
          break;
        case newVal.includes("/home/chess"):
          this.gameIndex = 2;
          this.navChecked = 2;
          break;
        case newVal == "/home/live":
          this.gameIndex = 1;
          this.navChecked = 1;
          break;
        case newVal.includes("/home/slot"):
          this.gameIndex = 4;
          this.navChecked = 4;
          break;
        case newVal == "/home/fish":
          this.gameIndex = 5;
          this.navChecked = 5;
          break;
        case newVal == "/home/tiyu":
          this.gameIndex = 6;
          this.navChecked = 6;
          break;
        case newVal == "/home/youhui":
          this.gameIndex = 7;
          this.navChecked = 7;
          break;
      }
      this.$store.commit("mainState/getRoute", newVal);
    },
  },
  mounted() {
    // 夜间模式
    // let date = new Date()
    // let newHour = date.getHours()
    // if(newHour>=18 || newHour<=5){
    //   this.changcolor()
    // }
    //获取时间
    this.shake($(".blingColor"), "resd", -1);
    this.shake($(".blingImg"), "d-contrl", -1);
    let routerSrc = this.$store.state.mainState.routeSrc;
    this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
    if (routerSrc === "/home") {
      this.navChecked = 0;
      this.gameIndex = 0;
    }
    let time = setInterval(this.getTimes, 1000);
    if (localStorage.qyLogin) {
      this.$refs.qylogin.qyLogin = true;
    }
    if (localStorage.register) {
      this.showLoginLogs(2);
      localStorage.removeItem("register");
    }
  },
  created() {
    // console.log(">>>>>>>>>>>", this.$store.state.mainState)
    // this.is_code_show();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "hidden") {
        if (!localStorage.userinfo) {
          let timer = setInterval(() => {
            if (localStorage.userinfo) {
              clearInterval(timer);
              window.location.reload();
            }
          }, 1000);
        }
      }
    });
    if (!this.userinfo) return false;
    switch (this.userinfo.levelId) {
      case 2:
        this.top = 1;
        break;
      case 3:
        this.top = -31;
        break;
      case 4:
        this.top = -64;
        break;
      case 5:
        this.top = -96;
        break;
    }
  },
  components: {
    qyLogin,
    inForMation,
  },
  store,
};
</script>

<style lang="less" scoped>
.headerLinkBox {
  width: 350px;
  display: inline-block;
  overflow: hidden;
  height: 100%;
  li {
    float: left;
    // width:60px;
    margin: 0 15px;
    position: relative;
    a {
      color: #697dac;
      font-size: 15px;
      margin-left: 30px;
    }
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  li:nth-child(1) {
    margin-left: 0;
  }
}

.new-header {
  background: #191919;
  width: 100%;
  margin: 0 auto;
  height: 157px;
  .header-top {
    background: #191919;
    height: 157px;
    width: 100%;
    position: fixed;
    z-index: 1000;
    left: 50%;
    transform: translate(-50%, 0);
    .login {
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      .sj {
        height: 100%;
        display: inline-block;
        font-size: 15px;
      }
      input {
        width: 150px;
        height: 34px;
        padding: 0 0 0 5px;
        background: #aab7ca;
        line-height: 34px;
        color: #fff;
        border: none;
        font-size: 14px;
        outline: none;
        text-indent: 4px;
        border-radius: 5px;
      }
      input:focus {
        background: #fff;
        color: #697dac;
      }
      input::-webkit-input-placeholder {
        color: #fff;
      }

      input[type="button"] {
        width: 80px;
        height: 34px;
        line-height: 34px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
      .nav-content {
        width: 100%;
        height: 58px;
        margin: 0 auto;
        background: #191919;
        .logo {
          float: left;
          text-align: center;
          width: 334px;
          height: 30px;
          margin-top: 26px;
        }
        .nav-bar {
          height: 60px;
          width: 1200px;
          margin: 0 auto;
          float: initial;
          li {
            float: left;
            position: relative;
            height: 60px;
            line-height: 60px;
            margin: 0 32px;
            font-size: 16px;
            color: #54689a;
            list-style: none;
            cursor: pointer;
            transition: all 0.3s;
            &:first-child {
              margin-left: 0;
            }
            &.tpT {
              line-height: 60px;
            }
            a {
              width: 100%;
              height: 100%;
              display: block;
              text-align: center;
              text-decoration: none;
              color: inherit;
              position: relative;
              font-size: 20px;
              color: #f7c750;
              .navName {
                display: block;
              }
              .navText {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                font-size: 12px;
                margin: 0 auto;
                top: 22px;
                white-space: nowrap;
                text-align: center;
              }
              .bg-home {
                width: 25px;
                height: 23px;
                display: block;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                background: url("/static/public/image/userImg/header_nav_sprites.png") -10px -10px;
              }
              .bg-home:hover {
                background: url("/static/public/image/userImg/header_nav_sprites.png") -55px -10px;
              }
            }
            .x-dh-i {
              position: absolute;
              top: 12px;
              right: 0px;
            }
            .x-dh-t {
              display: block;
              &:hover {
                border-bottom: 3px solid #bf9d6e;
                color: #bf9d6e;
              }
              &:hover .triangle1 {
                display: block;
              }
            }
            .navActive {
              border-bottom: 3px #bf9d6e solid;
              color: #bf9d6e;
            }
            .fontColor {
              color: #d7d7e2;
            }
            .triangle {
              font-size: 22px;
              content: "";
              position: absolute;
              bottom: 0px;
              left: 50%;
              margin-left: -5px;
              border: 5px solid transparent;
              border-bottom: 5px solid #579ae5;
              transition: all 0.2s;
            }
            .triangle1 {
              display: none;
              font-size: 22px;
              content: "";
              position: absolute;
              bottom: 0px;
              left: 50%;
              margin-left: -5px;
              border: 5px solid transparent;
              border-bottom: 5px solid #579ae5;
              transition: all 0.2s;
            }

            .x-dh-b {
              white-space: nowrap;
            }
          }
          li:last-child {
            margin-right: 0;
            padding-right: 0;
          }
          li::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 0;
            height: 2px;
            color: #5caaea;
            background-color: #5caaea;
            transition: 0.5s all linear;
          }
          li:hover {
            .x-dh-t {
              color: #bf9d6e;
            }
            .x-dh-b {
              color: #bf9d6e;
            }
          }
        }
      }
      .before_login {
        width: 100%;
        height: 100%;
        background: #191919;

        .l_bot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100px;

          &::after {
            content: "";
            height: 1px;
            background: #333;
            position: fixed;
            top: 100px;
            right: 0;
            left: 0;
          }

          .nav-bot-logo {
            width: 200px;
            margin-right: 20px;
            object-fit: contain;
          }
          .nav-bot-left {
            display: flex;
            align-items: center;

            .nav-bot-left-item {
              margin-right: 30px;
              position: relative;
              img {
                position: absolute;
                right: -20px;
                top: -20px;
              }
              a {
                color: #957c55;
                font-size: 20px;
              }
              &::after {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                border-top: 2px solid #333;
                border-right: 2px solid #333;
                transform: rotate(135deg);
                position: absolute;
                right: -16px;
                top: 10px;
              }
            }
            :first-child::after {
              border: 0;
            }
            :last-child::after {
              border: 0;
            }
            :nth-last-child(2)::after {
              border: 0;
            }
            :nth-last-child(3)::after {
              border: 0;
            }
          }
          .nav-bot-img {
            width: 200px;
            object-fit: contain;
          }
          .nav-bot-right {
            display: flex;
            align-items: center;

            .nav-bot-right-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #937a54;
              margin-left: 14px;
              cursor: pointer;
              img {
                display: block;
                height: 20px;
                margin-bottom: 10px;
              }
            }
          }
        }

        .l-login {
          height: 57px;

          .header-login {
            #loginForm {
              width: 1200px;
              height: 100%;
              margin: 0 auto;
              padding: 10px 0;

              .header-logincon {
                height: 100%;
                width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;

                .yiji {
                  color: #ffd053;
                  font-size: 22px;
                  line-height: 35px;
                }
                .forms {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  transform: translate(10px, 0);
                }
                .subbtn {
                  background: url(/static/cpxpj/img/subbtn.png) no-repeat;
                  width: 130px;
                  height: 34px;
                  border: none;
                  padding: 0;
                  cursor: pointer;
                  margin-left: 10px;

                  &:hover {
                    background-position: bottom center;
                  }
                }
                .regbtn {
                  background: url(/static/cpxpj/img/regbtn.png) top center
                    no-repeat;
                  width: 130px;
                  height: 34px;
                  display: block;
                  float: left;
                  margin-left: 7px;

                  :hover {
                    background-position: bottom center;
                  }
                }
              }
            }
          }

          .login-after {
            width: 1200px;
            margin: 0 auto;
            padding: 15px 0;
            height: 100%;

            .left {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .chong {
                color: #fff;
                i {
                  display: inline-block;
                  line-height: 23px;
                  height: 23px;
                  width: 23px;
                  text-align: center;
                  background: #fe5b01;
                  border-radius: 50%;
                  color: #fff;
                  margin-right: 6px;
                }
              }
              .huiyuan,
              .record,
              .message,
              .loginout {
                line-height: 30px;
                display: flex;
                align-items: center;
                i {
                  display: inline-block;
                  width: 24px;
                  height: 19px;
                  background: url("/static/cpxpj/img/jingling.png") no-repeat;
                }
              }
              .yijian {
                color: #d7be1f;
                i {
                  color: #6d6d6d;
                }
              }
              .huiyuan {
                color: #12e9d0;
                i {
                  background-position: -6px -89px;
                }
              }
              .record {
                color: #06ce06;
                i {
                  background-position: -32px -89px;
                }
              }
              .message {
                color: #fed02d;
                i {
                  background-position: -123px -88px;
                }
              }
              .loginout {
                color: #ff3d3d;
                i {
                  background-position: -100px -89px;
                }
              }
              span {
                height: 100%;
                font-size: 14px;
                color: #fff;
                padding: 0 5px;
                cursor: pointer;
                display: flex;
                align-items: center;

                &.user_money {
                  font {
                    min-width: 30px;
                    display: inline-block;
                    background: #fa5a00;
                    padding: 0 6px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    color: #fff;
                  }
                }

                // &.refresh_balance {
                //   .refresh {
                //     width: 50px;
                //     display: inline-block;
                //     width: 22px;
                //     height: 20px;
                //     // margin-top: 5px;
                //     background: url("/static/839qp/img/refresh.png") center
                //       center no-repeat;
                //   }
                //   .newfresh {
                //     background: url("/static/839qp/img/newfresh.png") no-repeat
                //       center;
                //   }
                //   .fres {
                //     -webkit-animation: spin 1s linear;
                //     animation: spin 1s linear;
                //   }
                //   @-webkit-keyframes spin {
                //     from {
                //       -webkit-transform: rotate(0deg) scale(1.2);
                //     }
                //     to {
                //       -webkit-transform: rotate(360deg) scale(1.2);
                //     }
                //   }

                //   @keyframes spin {
                //     from {
                //       transform: rotate(0deg) scale(1.2);
                //     }
                //     to {
                //       transform: rotate(360deg) scale(1.2);
                //     }
                //   }
                // }
              }
            }
          }
        }
      }

      // .login_after {
      //   width: 100px;
      //   float: left;
      //   height: 40px;
      //   li {
      //     height: 40px;
      //     line-height: 40px;
      //     margin-left: 10px;

      //     a {
      //       color: #697dac;
      //       font-size: 14px;
      //     }
      //   }
      // }
      .headerColor {
        color: white !important;
        a {
          color: white !important;
        }
        li {
          a {
            color: white;
          }
        }
      }
      .login-before {
        float: right;
        // margin-right:12px;
        div {
          float: left;
          position: relative;
          margin: 0 6px 0;
          text-align: left;

          #loginBtn {
            background: #df3e7b; /* Safari 5.1 - 6.0 */
          }

          #resetBtn {
            background: #697dac;
          }
        }

        .code {
          input {
            width: 160px;
          }

          span {
            display: inline-block;
            cursor: pointer;
            width: 80px;
            height: 35px;
            position: absolute;
            right: 0;
            top: 13px;
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
          }
        }

        .last_item {
          margin: 0 0 0 6px;

          a {
            line-height: 34px;
            color: #697dac;
            cursor: pointer;
            font-size: 14px;
          }
        }
      }
    }
  }
  .night {
    background: rgb(16, 17, 35);
  }
}
.model /deep/.ivu-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -153px;
  margin-top: -73px;
}
.model /deep/.ivu-modal-close {
  display: none;
}
.model /deep/.ivu-btn-text {
  display: none;
}
.model /deep/.ivu-modal-body p {
  font-size: 14px;
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent !important;
  // background-image: none!important;
  transition: background-color 50000s ease-in-out 0s !important;
}

.resd {
  color: #ff0000 !important;
}

.blingImg {
  .origin {
    display: block !important;
  }
  .red {
    display: none !important;
  }
}
.d-contrl {
  .origin {
    display: none !important;
  }
  .red {
    display: block !important;
  }
}
</style>
