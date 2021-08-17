<template>
    <div class="vns81NewIndex" :style="{marginTop: loggedIn ? '-90px' : '0'}">
        <!-- 登录框 滚动到一定距离显示 -->
        <!-- <div class="headerLogin" v-if="showLoginBox && !loggedIn">
            <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
                <div class="headerLogincon">
                    <input type="text" class="user" id="userName" name="username" tabindex="0" v-model="passKey.userName" placeholder="帐号"
                        @change="getCode">

                    <input type="password" class="pass" id="passwd" name="password" tabindex="0" v-model="passKey.password"
                        placeholder="密码">

                    <div class="verify_code_box" v-if="code_show">
                        <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="0" maxlength="4"
                            title="(点选此处产生新验证码)" v-model="passKey.code">

                        <img class="codeimg" id="vPic" :src="codeImg" width="50" height="26" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                    </div>

                    <a href="javascript:void(0)" @click="forget" class="forgetPwd">忘记密码</a>

                    <a href="javascript:void(0)" class="logBut subbtn1" @click="login">登入</a>

                    <a href="javascript:void(0)" class="logBut regbtn1" @click="goKaihu">免费开户</a>
                </div>
            </form>
        </div> -->

        <!-- 轮播 -->
        <div class="bannerWrap">
            <div class="carouse" :style="{width: curWidth + 'px'}">
                <Carousel :autoplay="setting.autoplay" :loop="setting.loop" :autoplay-speed="setting.autoplaySpeed"
                    :trigger="setting.trigger" :radius-dot="setting.radiusDot" :arrow="setting.arrow"
                    :style="{overflow:'hidden',width:'100%',height:carheight +'px'}">

                    <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                        <a v-if="item.targets !=='#'">
                            <div
                                :style="{background: 'url(' + item.img + ') no-repeat center center',backgroundSize:'cover',height: carheight +'px'}">
                            </div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ') no-repeat center center',backgroundSize:'cover',height: carheight +'px'}"
                            v-else>
                        </div>
                    </Carousel-item>
                </Carousel>
            </div>

            
        </div>

        <!-- 跑马灯 -->
        <div class="indexNotice" :style="{top: carheight +'px'}">
            <div class="noticeBox" @click="showTextModal()">
                <span>最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="5" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
            </div>
        </div>

        <!-- 电子部分 -->
        <div class="dianziPart">
            <div class="game_nav" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                <span class="arrow prev" @click="gamesAnm(1)"></span>
                <span class="arrow next" @click="gamesAnm(-1)"></span>
                <div class="mainCell">
                    <div class="tempWarp">
                        <ul id="game_list" :style="{width:rollList.length*120+'px',left:0}" ref="gameList">
                            <li v-for="(item,index) in rollList " :key="index"
                                :style="{backgroundImage:'url(/static/vns81/img/image/game/'+item.id+'.png)'}" @click="goto(item)">
                                {{item.name}}
                                <i class="hover_bg"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 内页跳转 -->
        <div class="cont">
            <div class="inner">
                <ul id="home-casino" class="ng-scope">
                    <li class="board" @click="goView('/home/chess?navid=9&id=0')"></li>
                    <li class="live" @click="goView('/home/live')"></li>
                    <li class="fish" @click="goView('/home/fish?navid=9&id=0')"></li>
                    <li class="game" @click="goView('/home/slot?navid=9&id=0')"></li>
                </ul>
                <ul class="home-info">
                    <li class="mobile"></li>
                    <li class="qrcode">
                        <div class="ios" ref="qr-code-ios"></div>
                        <div class="android" ref="qr-code"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
export default {
  data() {
    return {
      codeImg: "/static/vns81/img/new_games/lo.png",
      lanternData: "",
      loggedIn: false,
      showLoginBox: false,
      carheight: 599,
      curWidth: 1920,
      clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      showimg: false,
      popups: "",
      lantern: "",
      value3: 0,
      publicUrl: "http://static.1356111.com/",
      showPopout: false,
      noticePosition: 0,
      gameList: [
        { name: "真人娱乐", className: "live", path: "/home/live" },
        { name: "彩票游戏", className: "lottery", path: "/plays/hall" },
        {
          name: "电子游艺",
          className: "slot",
          path: "/home/games?id=26&name=MG老虎机"
        },
        { name: "体育赛事", className: "sport", path: "/home/tiyu" }
      ],
      idlist: [],
      rollList: [
        {
          name: "开元棋牌",
          id: "10042"
        },
        {
          name: "乐游棋牌",
          id: "10612"
        },
        {
          name: "天游棋牌",
          id: "10694"
        },
        {
          name: "VG棋牌",
          id: "10041"
        },
        {
          name: "MG电子",
          id: "10022"
        },
        {
          name: "CQ9电子",
          id: "10018"
        },
        {
          name: "JDB电子",
          id: "10021"
        },
        {
          name: "PG电子",
          id: "11320"
        },
        {
          name: "AG电子",
          id: "10015"
        },
        {
          name: "PT电子",
          id: "10024"
        }
      ],
      currenttype: "",
      iptVal: "",
      currentline: "",
      currentTag: "",
      pageDatas: {
        page: 1
      },
      gameId: 26,
      gameData: [],
      gameDataLeft: [],
      gameDataRight: [],
      winningInfo: [],
      // 轮播名单
      carouselData: [],
      superAward: "24687936.18",
      setInter: null,
      setting: {
        autoplay: true,
        loop: true,
        autoplaySpeed: 3000,
        radiusDot: true,
        arrow: "never",
        trigger: "click"
      }
    };
  },
  methods: {
    //是否已登录
    isLogged() {
      if (localStorage.userinfo && localStorage.token) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    //滚动监听
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 400) {
        this.showLoginBox = true;
      } else {
        this.showLoginBox = false;
      }
    },

    forget() {
      this.$store.commit("alert/newshowtip", {
        bool: true,
        title: "忘记帐号密码，请联系在线客服人员取回！",
        model: "",
        leftspan: true
      });
    },

    goKaihu() {
      this.$store.commit("hsyl/showRegister", true);
    },

    //进入个人中心
    // goUserCen(name, num) {
    //     //name的类型有 ：  recharge （充值）  personage （个人资料）
    //     //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）

    //     if (!localStorage.token || !localStorage.userinfo) {
    //         this.$store.commit('alert/newshowtip', {
    //             bool: true,
    //             title: '请先登录！',
    //             model: '',
    //             leftspan: true
    //         });
    //     } else {
    //         this.$store.commit('showPersonal', {
    //             bool: true
    //         });
    //         this.$store.commit('showContent', {
    //             parent: name
    //         });
    //         this.$store.commit('showNav', {
    //             child: num
    //         });
    //     }
    // },
    goLive(item) {
      if (item) {
        if (!localStorage.token || !localStorage.userinfo) {
          this.$router.push("/home/live");
        } else {
          this.getItemId(item);
        }
      }
    },
    async changeGame(item) {
      //左右布局,右边是超级赢家榜
      if (item) {
        this.gameId = item.id;
        let gameDate = JSON.parse(localStorage.gameDate);
        for (let game in gameDate) {
          if (game == item.id) {
            this.gameData = gameDate[game];
          }
        }
        this.clear();
      }
    },
    gamesAnm(num) {
      clearInterval(this.gameTimer);
      let oUl = document.getElementById("game_list");
      let ofirstLi = oUl.getElementsByTagName("li")[0];
      let jumpNum = ofirstLi.offsetWidth;
      let oLeft = parseInt(oUl.style.left);
      // 左边left值,最左
      let minLeft = -Math.abs(oUl.offsetWidth - 11 * 120);
      let jumpLeft = 0;

      if (num == 1) {
        // 左按钮
        jumpLeft = 120;
        if (oLeft >= 0) {
          oLeft = minLeft;
        } else {
          oLeft += jumpLeft;
        }
      } else if (num == -1) {
        jumpLeft = -120;
        if (oLeft <= minLeft) {
          oLeft = 0;
        } else {
          oLeft += jumpLeft;
        }
      }
      oUl.style.left = oLeft + "px";
      // 开启定时器
      this.gameTimer = setInterval(() => {
        this.gamesAnm(-1);
      }, 2000);
    },
    async clear() {
      this.iptVal = "";
      this.currenttype = "";
      this.currentline = "";
      this.currentTag = "";
      this.pageDatas.page = 1;
    },
    goto(item) {
      if (item.id) {
        if (item.name.includes("棋牌")) {
          this.$router.push({
            path: `/home/chess?navid=9&id=${item.id}`
          });
        } else {
          this.$router.push({
            path: `/home/slot?navid=9&id=${item.id}`
          });
        }
      } else {
      }
    },
    //获取banner
    async getBanner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
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
        desc_client_type: "html"
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
      } else if (item == "/home/games") {
        this.$router.push("/home/games?id=55&name=热门游戏");
      } else {
        this.$router.push(item);
      }
    },

    // 获取游戏列表
    // async getData() {
    //     var allGameData = {};
    //     let idArr = [];
    //     var gameList = [];

    //     this.rollList.forEach(v => {
    //         idArr.push(v.id);
    //     });
    //     let res = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
    //         id: '10022',
    //         device: 'pc'
    //     });
    //     if (res && res.code === 200) {
    //         this.gameData = res.data[10022].slice(0, 8);
    //     }

    //     let gameId = idArr.join('|');
    //     let res2 = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
    //         id: gameId,
    //         device: 'pc'
    //     });

    //     if (res2 && res2.code == 200) {
    //         idArr.forEach((item, index) => {
    //             gameList = res2.data[item].slice(0, 8);
    //             allGameData[idArr[index]] = gameList;
    //         });
    //         localStorage.setItem('gameDate', JSON.stringify(allGameData));
    //     }
    // },

    // 新文字走马灯接口
    async getLantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC"
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
        let ser = service.find(item => item.status === "on");
        if (ser) {
          window.open(ser.url);
        }
      }
    },
    //导航动画
    async slider() {
      let ul = document.getElementById("game_list");
      let prev = document.getElementsByClassName("prev")[0];
      let next = document.getElementsByClassName("next")[0];
      let main = document.getElementsByClassName("game_nav")[0];
      let n = -120;

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

      prev.onclick = left;
      next.onclick = right;
      let timer = null;
      timer = setInterval(left, 2000);
      main.onmouseover = function() {
        clearInterval(timer);
      };
      main.onmouseout = function() {
        timer = setInterval(left, 2000);
      };
    },

    // initWinningInfo() {
    //     let data = [];
    //     let games = [
    //         '跳高高',
    //         '篮球巨星',
    //         '水果拉霸',
    //         '湛蓝深海',
    //         '冰上曲棍球',
    //         '金钱蛙',
    //         '飞天',
    //         '发财神',
    //         '空手道猪',
    //         '雷霆风暴',
    //         '熊之舞',
    //         '不朽的爱情',
    //         '嗨爆大马戏',
    //         '银行劫匪',
    //         '雷霆风暴',
    //         '不朽的爱情',
    //         '侠盗猎车手',
    //         '水果拉霸',
    //         '空手道猪',
    //         '冰上曲棍球',
    //         '飞天',
    //         '抢庄牛牛',
    //         '十三水',
    //         '斗地主',
    //         '押庄龙虎',
    //         '德州扑克',
    //         '不朽的浪漫',
    //         '银行劫匪2',
    //         '108好汉',
    //         '逐鹿三国',
    //         '跳高高',
    //         '篮球巨星',
    //         '水果拉霸',
    //         '湛蓝深海',
    //         '冰上曲棍球',
    //         '金钱蛙',
    //         '飞天',
    //         '发财神',
    //         '空手道猪',
    //         '雷霆风暴',
    //         '嗨爆大马戏',
    //         '银行劫匪',
    //         '雷霆风暴',
    //         '不朽的浪漫',
    //         '银行劫匪2',
    //         '108好汉',
    //         '逐鹿三国',
    //         '冒险丛林',
    //         '城市猎人',
    //         '大航海时代'
    //     ];
    //     for (let i = 0; i < games.length; i++) {
    //         let num = parseInt(Math.random() * (Math.random() * (Math.random() * 360000)));
    //         num = num < 10 ? num * 1234 : num;
    //         num = num < 100 ? num * 123 : num;
    //         num = num < 1000 ? num * 12 : num;
    //         let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
    //         name = name.substr(0, 3);

    //         data[i] = { name, num, game_name: games[i] };
    //     }

    //     this.arraySort(data, (v1, v2) => v1.num < v2.num);
    //     this.winningInfo = data;
    // },

    //超级奖池
    // jackpotFc() {
    //     var _this = this;
    //     clearInterval(this.setInter);

    //     this.setInter = setInterval(function() {
    //         if (typeof _this.superAward == 'number') {
    //             _this.superAward = _this.superAward.toString();
    //         } else if (_this.superAward instanceof Array) {
    //             _this.superAward = _this.superAward.join(''); //数组->字符串
    //         }

    //         var num, index;
    //         num = parseFloat(parseFloat(_this.superAward.substr(0, 5), 2) + 1); //截取前5位
    //         index = num.toString().indexOf('.');
    //         num =
    //             num.toString() +
    //             parseInt(Math.random() * 9) +
    //             parseInt(Math.random() * 9) +
    //             parseInt(Math.random() * 9) +
    //             '.' +
    //             parseInt(Math.random() * 9) +
    //             parseInt(Math.random() * 9);
    //         _this.superAward = num.split(''); //字符串->数组
    //     }, 1000);
    // },
    // async getnewDatas() {
    //     await this.getid();
    //     await this.getData();
    // },
    // 获取公告列表接口，并缓存
    async getLanternList() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
        limit: 1000,
        page: 1
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
    }
    //获取电子游艺参数
    // async getGameData() {
    //     let res = await postS(`gameSortSlot`,{device:'pc'})
    //     if (res && res.code === 200) {
    //         sessionStorage.setItem('allgames', JSON.stringify(res.data));
    //     }
    // },
  },

  created() {
    // this.getid();
    // this.getnewDatas();
    // this.getqipai(); //获取棋牌游戏的数据
    this.getPopout();
    // this.getGameData();

    setTimeout(() => {
      this.showimg = false;
    }, 7000);
    setTimeout(() => {
      if(localStorage.register){
        this.$store.commit('hsyl/showRegister', true);
        localStorage.removeItem('register')
      }
    }, 2000);
    

    if (this.clientwidth < 1920) {
      this.curWidth = this.clientwidth;
    } else {
      this.curWidth = 1920;
    }
  },
  mounted() {
    this.getLanternList();
    window.addEventListener("scroll", this.handleScroll);
    this.isLogged();

    // this.initWinningInfo();
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config);
      this.publicUrl = config.statics;
    }
    clearInterval(this.setInter);
    // this.jackpotFc();
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
      size: 110
    });

    this.createDownloadQRCode({
      el: this.$refs["qr-code-ios"],
      url: window.location.origin + "/m#/download",
      size: 110
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    // $route() {
    //     this.getData();
    // },
    isLogged() {
      this.isLogged();
    }
  },
  components: {},
  store
};
</script>

<style lang="less" scoped>
body {
  background: #141416;
}
.vns81NewIndex {
  position: relative;
  min-width: 1200px;
  margin: 0 auto;
  background: #141416;
  font-size: 16px;

  .headerLogin {
    position: fixed;
    top: 90px;
    z-index: 100;
    width: 100%;
    height: 52px;
    background: #1a1919;
    border-top: 1px solid #3d3b3b;
    border-bottom: 1px solid #3d3b3b;

    #loginForm {
      width: 100%;
      height: 100%;
      .headerLogincon {
        height: 100%;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: start;
        align-items: center;
        transform: translate(78px, 0);
        padding-left: 47px;

        input {
          height: 32px;
          line-height: 30px;
          width: 147px;
          padding-left: 10px;
          font-family: "Microsoft Yahei";
          background: transparent;
          caret-color: #fff;
          color: #fff;
          font-size: 13px;
          border: 1px solid #454545;
          outline: none;
          border-radius: 3px;
          transition: border linear 0.3s;

          &::-webkit-input-placeholder {
            color: #626262;
          }
          &::-moz-placeholder {
            color: #626262;
            opacity: 1;
          }
          &::-moz-placeholder {
            color: #626262;
            opacity: 1;
          }
          &:-ms-input-placeholder {
            color: #626262;
          }
          &:-webkit-autofill {
            -webkit-text-fill-color: #fff !important;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
            background-color: transparent !important;
            background-image: none !important;
            transition: background-color 50000s ease-in-out 0s !important;
          }

          &.user {
            transition: all 0.4s;
            margin-left: 150px;
            &:hover {
              border: 1px solid #ffd053;
              transition: all 0.4s ease;
            }
          }
          &.pass {
            margin-left: 15px;
            margin-right: 15px;
            transition: all 0.4s;
            &:hover {
              border: 1px solid #ffd053;
              transition: all 0.4s ease;
            }
          }
          &.code {
            width: 147px;
            padding-left: 10px;
            transition: all 0.4s;
          }
          &::-webkit-input-placeholder {
            color: #fff;
          }
          &::-moz-placeholder {
            color: #fff;
            opacity: 1;
          }
          &:-moz-placeholder {
            color: #fff;
            opacity: 1;
          }
        }

        .verify_code_box {
          position: relative;
          margin-right: 15px;
          .codeimg {
            position: absolute;
            top: 3px;
            right: 2px;
            cursor: pointer;
          }
        }
        .forgetPwd {
          height: 32px;
          line-height: 32px;
          display: inline-block;
          position: relative;
          color: #959595;
          text-decoration: none;
          margin-right: 15px;
          font-size: 12px;
          transition: color linear 0.3s;
        }

        .logBut {
          width: 112px;
          height: 31px;
          text-align: center;
          line-height: 30px;
          font-size: 15px;
          font-family: "Microsoft Yahei";
          border: none;
          border-radius: 3px;
          cursor: pointer;
          &.subbtn1 {
            color: #fff;
            background: url(/static/vns81/img/login/login_btn2.png) no-repeat
              center;
            &:hover {
              filter: grayscale(0.2);
            }
          }
          &.regbtn1 {
            margin-left: 10px;
            color: #3f3d0a;
            font-weight: bold;
            background: url(/static/vns81/img/login/reg_btn2.png) no-repeat
              center;
            :hover {
              filter: grayscale(0.2);
            }
          }
        }
      }
    }

    .w1000 {
      color: #fff;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 4;
      .left {
        min-width: 250px;
        height: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        span {
          height: 100%;
          line-height: 54px;
          font-size: 16px;
          padding: 0 1px 0 0;

          &.account {
            margin: 0 6px 0 0px;
            font {
              display: inline-block;
              min-width: 68px;
            }
          }
          &.user_money {
            font {
              display: inline-block;
              min-width: 35px;
            }
          }

          &.refresh_balance {
            .refresh {
              display: inline-block;
              width: 22px;
              height: 20px;
              background: url("/static/vns81/img/login/refresh.png") center
                center no-repeat;
              margin-top: 17px;
            }
            .newfresh {
              background: url("/static/vns81/img/login/newfresh.png") no-repeat
                center;
            }
            .fres {
              -webkit-animation: spin 1s linear;
              animation: spin 1s linear;
            }
            @-webkit-keyframes spin {
              from {
                -webkit-transform: rotate(0deg) scale(1.2);
              }
              to {
                -webkit-transform: rotate(360deg) scale(1.2);
              }
            }

            @keyframes spin {
              from {
                transform: rotate(0deg) scale(1.2);
              }
              to {
                transform: rotate(360deg) scale(1.2);
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        margin-left: 8px;
        span {
          a {
            font-size: 15px;

            &.unread_msg {
              margin: 0 8px;
            }

            &.logOut {
              display: inline-block;
              width: 62px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              color: #000;
              background: url(/static/vns81/img/login/log_out.png) center
                center no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }

  .dianziPart {
    height: 115px;
    background: #1d1d1d;
    text-align: center;
    position: relative;

    .game_nav {
      position: relative;
      width: 1200px;
      height: 115px;
      margin: 0 auto;
      overflow: hidden;
      padding: 10px 0;

      .arrow {
        // display: inline-block;
        display: none;
        position: absolute;
        top: 20px;
        z-index: 1;
        width: 30px;
        height: 30px;
        background-position: center top;
        background-repeat: no-repeat;
        cursor: pointer;
        vertical-align: top;
        &:hover {
          background-position: center bottom;
        }

        &.prev {
          left: 0;
          background-image: url(/static/vns81/img/home/prev.png);
        }

        &.next {
          right: 0;
          background-image: url(/static/vns81/img/home/next.png);
        }
      }

      .mainCell {
        height: 100%;

        .tempWarp {
          overflow: hidden;
          width: 100%;
          height: 100%;
          margin: auto;
          position: relative;

          #game_list {
            height: 100%;
            padding: 0;
            transition: all 0.5s ease;

            &.move {
              transition: all 0.5s ease;
              -webkit-transition: all 0.5s ease;
            }
            &.back {
              transition: all 0.5s ease;
              -webkit-transition: all 0.5s ease;
            }

            li {
              float: left;
              width: 120px;
              height: 100%;
              padding-top: 66px;
              color: #fff;
              font-size: 14px;
              text-align: center;
              background-position: center 15px;
              background-repeat: no-repeat;
              vertical-align: top;
              -moz-transition: all 0.4s !important;
              -o-transition: all 0.4s !important;
              -webkit-transition: all 0.4s !important;
              transition: all 0.4s !important;
              background-size: 37%;
              cursor: pointer;
              position: relative;

              .hover_bg {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url(/static/vns81/img/home/hover.png) no-repeat
                  center;
                opacity: 0;
                transition: all 0.4s ease-in-out;
              }

              &:hover {
                .hover_bg {
                  opacity: 1;
                  transition: all 0.4s ease-in-out;
                }
              }
            }
          }
        }
      }
    }
  }

  .cont {
    height: 716px;
    position: relative;
    background: url("/static/vns81/img/home/bottom_nav/bottom_bg.jpg");
    border-top: 1px solid #484848;

    .inner {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 40px 0 48px;
      .ng-scope {
        width: 804px;
        height: 632px;
        vertical-align: top;
        padding-top: 5px;
        background-color: #151515;
        border: 1px solid #242424;
        display: inline-block;
        margin: 0 auto;
        padding: 0;
        list-style: none;
        li {
          display: inline-block;
          width: 384px;
          height: 300px;
          vertical-align: top;
          margin: 7px;
          background-repeat: no-repeat;
          background-position: center top;
          cursor: pointer;
          &.game {
            background-image: url("/static/vns81/img/home/casino_slot.jpg");
            background-size: cover;
          }
          &.live {
            background-image: url("/static/vns81/img/home/casino_live.jpg");
            background-size: cover;
          }
          &.board {
            background-image: url("/static/vns81/img/home/casino_board.jpg");
            background-size: cover;
          }
          &.fish {
            background-image: url("/static/vns81/img/home/casino_fish.jpg");
            background-size: cover;
          }
        }
        li:hover {
          background-position: center bottom;
        }
      }
      .home-info {
        vertical-align: top;
        margin-left: 10px;
        display: inline-block;
        margin: 0 auto;
        padding: 0;
        list-style: none;
        li {
          width: 384px;
          &.mobile {
            height: 420px;
            margin-bottom: 10px;
            background: url("/static/vns81/img/home/info_moblie.png") no-repeat;
            background-size: contain;
          }
          &.qrcode {
            height: 204px;
            padding: 23px 53px 56px 46px;
            background: url("/static/vns81/img/home/infor_qr.png") no-repeat;
            background-size: contain;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
              width: 120px;
              height: 120px;
              background: #fff;
              padding: 5px;
            }
          }
        }
      }
    }
  }

  .bannerWrap {
    width: 100%;
    height: 599px;
    position: relative;

    /* /deep/  */
    .carouse {
      width: 1920px;
      margin: 0 auto;

      .ive-carousel {
        .ivu-carousel-list {
          height: 100%;
          .ivu-carousel-track {
            height: 100% !important;
            width: 100% !important;
            &.higher {
              width: 100% !important;
            }

            .myItems {
              width: 100% !important;
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
        bottom: 46px;
        z-index: 1;
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

    
  }

  .indexNotice {
    z-index: 20;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 36px;
    line-height: 36px;
    width: 100%;
    margin-top: 0;
    transform: translateY(-36px);
    background: url(/static/vns81/img/noticebg.png) repeat-x;

    .noticeBox {
      width: 1200px;
      height: 36px;
      margin: 0 auto;
      cursor: pointer;

      span {
        font-size: 12px;
        background: url(/static/vns81/img/notice.png) left center no-repeat;
        padding-left: 30px;
        float: left;
        height: 36px;
        line-height: 37px;
        color: #e0bf55;
      }

      marquee {
        float: right;
        width: 1080px;
        margin-right: 10px;
        color: #fff;
        height: 36px;
        line-height: 36px;
        font-size: 12px;

        a {
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
