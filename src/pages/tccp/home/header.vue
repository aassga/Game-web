<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top" :class="{night:colorbool}" >
      <!-- 登录 -->
      <div class="login">
        <div class="sjContainer">
          <div class="sj">
              <div class="sj-box clearfix">
                <a class="time" href="javascript:void(0)" style="color:#d060d2;margin-left:8px"><span id="EST_reciprocal">{{time}}</span></a>
                <ul class="clearfix">
                  <!-- <li><a href="javascript:;" class="colors-change detection" @click="goHeader(3)">线路检测</a>&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change jiebei" @click="goHeader(1)">免息借呗</a>&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change guanjia" @click="goHeader(2)">金管家</a>&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change download" @click="goHeader(4)">下载APP</a>&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change suggestion" @click="goHeader(0)">投诉建议</a>&nbsp;&nbsp;</li> -->
                  <li><a href="javascript:;" class="colors-change suggestion" @click="$router.push('/home')">网站首页</a>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change suggestion" @click="openKefu">在线客服</a>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
                  <li><a href="javascript:;" class="colors-change suggestion" @click="goHeader(0)">下载APP</a>&nbsp;&nbsp;|</li>
                  <li><a href="javascript:;" class="colors-change suggestion" @click="goHeader(5)" style="margin-left:10px">线路检测</a>&nbsp;&nbsp;</li>
                </ul>
              </div>
                <!-- 登录前 -->
              <div class="login-before">
                  <div class="form">
                    <div class="florList clearfix" v-if="loggedIn == false">
                      <!-- 帐号 -->
                      <div class="username">
                        <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode" maxlength="20">
                      </div>
                      <!-- 密码 -->
                      <div class="password">
                        <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password" v-on:keyup.enter="login">
                        <!-- <span class="ques" @click="$forget()">?</span> -->
                      </div>
                      <!-- 验证码 -->
                      <div class="code"  v-if="code_show">
                        <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                        <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                      </div>
                      <!-- 登录 -->
                      <div>
                        <input type="button" value="登录" id="loginBtn" style="padding:0;text-indent:0" @click="login">
                      </div>
                      <!-- 开户 -->
                      <div style="margin-right:0">
                        <!-- <a  @click="goKaihu" style="padding:0;text-indent:0"  id="resetBtn">注册</a> -->
                        <input @click="goKaihu" type="button" style="padding:0;text-indent:0" value="注册" id="resetBtn">
                      </div>
                    </div>
                    <div class="loginAfter" v-if="loggedIn == true">
                      <div><span>账号：</span><span >{{userinfo ? userinfo.userName : ''}}</span></div>
                      <div><span>余额： </span><span style="color:#F7D347">{{userinfo ? userinfo.balance : ''}} </span> 元</div>
                      <div><span @click="getBalance" >一键刷新</span></div>
                      <div><span @click="$bindPhoneOrbank()" >在线存款</span></div>
                      <div><span @click="$goUserCen('withdraw',0)" >在线取款</span></div>
                      <div><span @click="$goUserCen('personage',0)">会员中心</span></div>
                      <div @click="$goUserCen('message',0)">我的消息</div>
                      <div class="loginOut"><a href="javascript:void(0)" @click="logout">登出</a></div>
                      <!-- <div @click="getUrl">
                        <span><img src="/static/tccp/img/icon_ser.png" alt=""></span>
                        <span>在线客服</span>
                      </div> -->
                    </div>
                  </div>
              </div>
            <div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="navBox">
        <div class="navItems">
          <span @mouseover="getgameData(item)" :class="['navItem',item.text]" v-for="(item,i) in classifyList.slice(0,4)" :key="i" @click="$goPath('one',item)">
            <a href="javascript:void(0);" @click="$goPath('one',item)">{{item.name}}</a>
          </span>
        </div>
        <div class="logo" @click="$router.push('/')"><img src="/static/tccp/logo/logo.png" alt=""></div>
        <div class="navItems">
          <span @mouseover="getgameData(item)" :class="['navItem',item.text]" v-for="(item,i) in classifyList.slice(4,11)" :key="i" @click="$goPath('one',item)">
            <a href="javascript:void(0);" @click="$goPath('one',item)">{{item.name}}</a>
          </span>
        </div>
        <div :class="['slideShow',showClass?'newClass':'']" @mouseleave="clearData" >
          <div class="smallWidth" v-if="gameArr.length < 10">
            <ul>
              <li :class="gamename" v-for="(item,index) in gameArr" v-show="item.id != '0'" :key="index">
                <span v-if="gamename =='KY_CHESS'||gamename =='AG_GAME' " class="qw"><img :src="'/static/tccp/img/new_games/new_icon/'+item.gcid+'.png'" ></span>
                <span v-else><img :src="'/static/tccp/img/new_games/new_icon/'+item.id+'.png'" ></span>
                
                <span>{{item.name}}</span>
                <span @click="gogames(item)">进入游戏</span>
              </li>
            </ul>
          </div>
          <div class="slideContent" v-if="gameArr.length > 9">
            <span v-if="gameArr.length > 9" class="slidePrev"  @click="setSwiper(2)" ><Icon type="chevron-left" color="#fff"></Icon></span>
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide v-for="(item,index) in gameArr" :key="index">
                    <div :class="['slide_list',gamename]" >
                        <span v-if="lotteryImg"><img width="70px" :src="'/static/tccp/img/new_games/lottery/'+item.id+'.svg'" ></span>
                        <span v-else><img :src="'/static/tccp/img/new_games/new_icon/'+item.gcid+'.png'" ></span>
                        <span>{{item.name}}</span>
                        <span @click="gogames(item)">进入游戏</span>
                    </div>
                </swiper-slide>
            </swiper>
            <span v-if="gameArr.length > 9" class="slideNext" @click="setSwiper(1)" ><Icon type="chevron-right" color="#fff"></Icon></span>
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
              @on-ok="asyncOK">
              <p>开始进行缓存清除，完毕后将会刷新网站！</p>
       </Modal>
       <new-modal :newmodal="newmodal"></new-modal>
        <qyLogin ref="qylogin" :logiinTishi="logiinTishi"></qyLogin>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS, _SetGet, _SetPost } from "@/service/public/service.js";
import qyLogin from "../../public/home/qy-login.vue";
import data from "../../public/user/login";
import data1 from "../../public/user/login";
import newModal from "../../public/home/newmodal.vue";
export default {
  mixins: [data, data1],

  data() {
    return {
      time:"",
      lotteryImg:false,
      gamename:"",
      showKindGame:false,
      changeWidth:false,
      showClass:false,
      swiperOption: {
          autoplay: true,
          observer: true,
          observeParents: true,
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false
          // },
          loop: true,
          slidesPerView: 9
      },
      newmodal: {
        title: "来自澳门威尼斯人的消息",
        bgcolor: {
          background: "linear-gradient(90deg,#65e0f4,#4fade6)"
        }
      },
      allUnReadCount: 0,
      isclick: false,
      showfresh: false,
      balanceRefreshing: false,
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
        display: "block"
      },
      logiinTishi: {
        title: "来自澳门新葡京的消息",
        bgcolor: {
          background: "linear-gradient(to right, #65e0f4, #4fade6)"
        }
      },
      classifyList: [
        {
          name: "网站首页",
          text: "HOME",
          platform: "home",
          link: "/home"
        },
        {
          name: "真人视讯",
          text: "CASINO",
          link: "/home/live",
          platform: "live_casino",
          type: "live",
          pStyle: "",
          pImg: "",
          hot: false,
          arr:[],
        },
        {
          name: "棋牌游戏",
          text: "CHESS",
          platform: "KY_CHESS",
          // link: "/home/qipai?id=10042&name=开元棋牌",
          link: "/home/chess?navid=9&id=0",
          pStyle: "margin-left: -20px;margin-top: -12px;float: left;",
          gameName: "0",
          list: [],
          type: "chess",
          pImg: "/static/tccp/img//hot11.gif",
          hot: true,
          arr:[],
        },
        {
          name: "电子游艺",
          text: "GAME",
          platform: "AG_GAME",
          link: "/home/slot?navid=9&id=0",
          type: "live",
          pStyle: "",
          pImg: "",
          hot: false,
          arr:[],
        },
        
        {
          name: "捕鱼游戏",
          text: "FISHING",
          platform: "fish_game",
          link: "/home/fish?navid=9&id=0",
          type: "fish",
          pStyle: "",
          pImg: "",
          hot: false,
          arr:[],
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          platform: "CT_LOTTERY",
          type: "lottery",
          link: "/plays/hall",
          gameName: "0",
          pStyle: "",
          pImg: "",
          hot: false,
          arr:[],
        },
        
        {
          name: "体育赛事",
          text: "SPORTS",
          platform: "sport",
          link: "/home/tiyu?id=0",
          list: [],
          pStyle: "",
          pImg: "",
          hot: false,
          arr:[],
        },
        {
          name: "优惠活动",
          text: "ACTIVETY",
          link: "/home/youhui",
          pStyle: "margin-left: -20px;margin-top: -12px;float: left;",
          pImg: "/static/tccp/img//hot11.gif",
          hot: true
        }
      ],
      time: "",
      colorbool: false,
      modal6: false,
      loading: true,
      loggedIn: false,
      headerColorBool: false,
      headerbgColor: "#697dac",
      headerbgColor: "#d0d9e5",
      showmodle: false,
      codeImg: "/static/tccp/img/lo.png",
      left: 5,
      top: -193,
      showReload: false,
      gameArr:[],
      cpArr:[
        {
          id:"12",
          name:"快速赛车",
        },
        {
          id:"13",
          name:"快乐赛车",
        },
        {
          id:"27",
          name:"快速快3",
        },
        {
          id:"10045",
          name:"快乐飞艇",
        },
        {
          id:"3630",
          name:"幸运赛车",
        },
        {
          id:"16",
          name:"快速时时彩",
        },
        {
          id:"3",
          name:"幸运飞艇",
        },
        {
          id:"10044",
          name:"香港赛马",
        },
        {
          id:"3631",
          name:"3分快3",
        },
        {
          id:"17",
          name:"3分时时彩",
        },
        {
          id:"18",
          name:"快速六合彩",
        },
        {
          id:"19",
          name:"5分六合彩",
        },
        {
          id:"3632",
          name:"5分快3",
        },
        // {
        //   id:"2900",
        //   name:"北京赛车",
        // },
        // {
        //   id:"4",
        //   name:"欢乐生肖",
        // },
        {
          id:"9",
          name:"江苏快3",
        },
        {
          id:"10",
          name:"PC蛋蛋",
        },
        {
          id:"7",
          name:"广东11选5",
        },

      ]
    };
  },
  methods: {
    getTimes() {
            var that = this;
            let timestam = new Date().getTime();
            let time = timestam - 43200000;
            let dateObj = new Date(time),
                p0 = this.ee,
                Y = dateObj.getFullYear(),
                Mh = dateObj.getMonth() + 1,
                D = p0(dateObj.getDate()),
                X = this.we(dateObj.getDay()),
                H = p0(dateObj.getHours()),
                M = p0(dateObj.getMinutes()),
                S = p0(dateObj.getSeconds());

            if (Mh > 12) {
                Mh = '01';
            } else if (Mh < 10) {
                Mh = '0' + Mh;
            }
            let str = `${Y}/${Mh}/${D}/ (${X}) ${H}:${M}:${S}`;
            this.time = str;
        },
    goKaihu() {
      this.$store.commit('alert/showMgmRegister', true);
    },
    openKefu(){
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find(item => item.status === 'on')
        if (ser) {
          window.open(ser.url);
        }
      }
    },
    gogames(item){
      switch (this.gamename) {
        case "AG_GAME":
          this.$router.push('/home/slot?navid=9&id='+item.gcid)
          break;
        case "KY_CHESS":
         this.$router.push('/home/chess?navid=9&id='+item.gcid)
          break;
        case "fish_game":
          this.$router.push('/home/fish?navid=9&id='+item.id)
          break;
        case "live_casino":
          this.$loginGame(item)
          break;
        case "sport":
          this.$router.push('/home/tiyu?id='+item.id)
          break;
        case "CT_LOTTERY":
          if(localStorage.token){
            window.open('#/plays/tradition/'+item.id)
          }else{
            this.$errorAlert('请先登录', 'warn');
          }
          
          break;
      }
    },
    setSwiper(num) {
        if (num === 1) {
            this.swiper.slideNext();
        } else {
            this.swiper.slidePrev();
        }
    },
    async getGameDatas() {
      await this.$gameSortV4(this.getNativeDatas);
    },
    getNativeDatas() {
        if (localStorage.gameSortV4_chess) {
          this.classifyList[2].arr = JSON.parse(localStorage.gameSortV4_chess)[1].list.filter(item=>item.name !='全部').slice(-9);
        }
        if (localStorage.gameSortV4_sport) {
          this.classifyList[6].arr = this.$gameClassV4("sport");
        }
        if (localStorage.gameSortV4_lottery) {
          this.classifyList[5].arr = this.cpArr;
        }
        if (localStorage.gameSortV4_slot) {
          this.classifyList[3].arr = JSON.parse(localStorage.gameSortV4_slot)[1].list.filter(item=>item.name !='全部').slice(-10);
        }
        if (localStorage.gameSortV4_live) {
          this.classifyList[1].arr = this.$gameClassV4("live");
        }
        if (localStorage.gameSortV4_fish) {
          this.classifyList[4].arr = this.$gameClassV4('fish');
        }
    },
    getgameData(item){
      this.gameArr = [];
      if(item.text == "CHESS" ||item.text == "GAME"||item.text == "LOTTERY"||item.text == "FISHING"||item.text == "CASINO"||item.text == "SPORTS" ){
        this.gamename = item.platform;
        if(item.platform == 'CT_LOTTERY'){
          this.lotteryImg = true;
        }else{
          this.lotteryImg = false;
        }
        this.showClass = true;
        this.gameArr = item.arr;
      }else{
        this.showClass = false;
      }
    },
    clearData(a){
      this.showClass = false;
      this.gameArr = [];
    },
    goHeader(typeNum) {
      if (typeNum == 0) {
        window.location.href = '/static/tccp/html/download/index.html'
      } else if (typeNum == 1) {
        // 借呗
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
            leftspan: true
          });
        }
      } else if (typeNum == 2) {
        // 金管家
        window.open("/static/public/active/jgj/index.html", "_blank");
      } else if (typeNum == 4) {
        window.open("/static/tccp/html/download/index.html");
      } else if(typeNum == 3){
        window.open("http://285.cc");
      }else if(typeNum == 5){
        window.location.href = "http://741.com"
      }
    },
    getUrl() {
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find(item => item.status === "on");
        if (ser) {
          this.url = ser.url;
        }
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

      if (Mh > 12) {
        Mh = "01";
      } else if (Mh < 10) {
        Mh = "0" + Mh;
      }
      let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
      this.time = str;
    },
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
    logout() {
      UserService.logout.call(this);
    },
    newshowfresh() {
      if (this.balanceRefreshing) this.showfresh = false;
      else this.showfresh = true;
    },
    getBalance() {
      this.showReload = true;
      if (this.isclick) return false;
      this.isclick = true;
      this.balanceRefreshing = true;
      this.showfresh = false;
      setTimeout(() => {
        this.balanceRefreshing = false;
      }, 600);
      setTimeout(() => {
        this.isclick = false;
      }, 1000);
      getS(`member/balance`).then(res => {
        if (res.code == 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data.member;
          userinfo.agent = res.data.agency;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
          // this.showReload = false
          // this.$store.commit('alert/newshowtip',{
          //   bool:true,
          //   title:'刷新余额成功！',
          //   model:'',
          //   leftspan:false
          // })
        } else {
          this.$store.commit("alert/newshowtip", {
            bool: true,
            title: "服务器报错",
            model: "",
            leftspan: false
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
        bool: true
      });
      this.$store.commit("showContent", {
        parent: name
      });
      this.$store.commit("showNav", {
        child: num
      });
    },
    async tryPlay() {
      // let res = await this.$http.post('/api/test/registerTest', {})
      let res = await this.$http.get("/frontend/test/demo", {
        headers: { Accept: "application/x.tg.v2+json" },
        params: {}
      });
      if (res && res.code == 200) {
        UserService.setCache(res, "test");

        this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
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
        leftspan: false
      });
    },
    //是否已登录
    isLogged() {
      if (this.userinfo) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    shake(element, className, times) {
        var i = 0,
            t = false,
            o = element.attr('class'),
            c = '',
            times = times || 2;
        if (t) return;
        t = setInterval(function() {
            i++;
            c = i % 2 ? o + ' ' + className : o;
            element.attr('class', c);

            if (i == 2 * times) {
                clearInterval(t);
                element.removeClass(className);
            }
        }, 500);
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    showMessage() {
      return this.$store.state.mainState.showMessage;
    },
    swiper() {
        return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    userinfo(val) {
      if (val) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    showMessage: {
      handler: function(newval, oldVal) {
        this.allUnReadCount = this.showMessage.allUnReadCount;
      },
      deep: true
    }
  },
  mounted() {
    this.shake($('.colors-change'), 'resd', -1);
    this.shake($('.blingColor'), 'resd', -1);
    this.isLogged();
    this.getTimes();
    this.getGameDatas()
    //获取时间
    this.getNativeDatas();
    let time = setInterval(this.getTimes, 1000);
    if (localStorage.qyLogin) {
      this.$refs.qylogin.qyLogin = true;
    }
  },
  created() {
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
    newModal
  },
  store
};
</script>

<style lang="less" scoped>
.detection {
    color: yellow;
}
.jiebei {
    margin-right: 10px;
    color: yellow;
}
.guanjia {
    margin-right: 10px;
    color: yellow;
}
.download {
    margin-right: 10px;
    color: yellow;
}
.suggestion {
    color: yellow;
}
.resd {
    color: #d060d2 !important;
}
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
      font-size: 14px;
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
  background: #fff;
  // max-width: 1920px;
  // min-width: 1200px;
  width: 100%;
  margin: 0 auto;
  .header-top {
    // height: 150px;
    background: #fff;
    line-height: 50px;
    .login {
      margin: 0 auto;
      width: 100%;
      .sjContainer {
        width: 100%;
        height: 35px;
        background: #2b0636;
        .sj {
          width: 1200px;
          height: 100%;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #a4a6aa;
          cursor: pointer;
          margin: 0 auto;
          padding-left: 11px;
          .sj-box {
            width: 40%;
            line-height: 30px;
            .time {
              float: left;
            }
            ul {
              float: left;
              margin-left: 25px;
              li {
                float: left;
                // a {
                //   color: #fff;
                // }
                // .topActive {
                //   color: #ffe417 !important;
                // }
              }
            }
          }
          .login-before {
            width: 60%;
            .form {
              float: right;
              .florList {
                .code{
                  position: relative;
                  input{
                    position: relative;
                    top: -8px;
                  }
                  span{
                    display: inline-block;
                    width: 60px;
                    height: 25px;
                  }
                }
                div {
                  float: left;
                  height: 25px;
                  line-height: 25px;
                  background: #39261c;
                  border-radius: 4px;
                  margin-left: 10px;
                }
                
                #loginBtn {
                  background: #e1c68d;
                  color: #563500;
                }
                #resetBtn {
                  background: #d060d2;
                  color: #fff;
                }
              }
              .loginAfter{
                display: flex;
                float: right;
                div{
                  margin-left: 15px;
                  color: #d060d2;
                  a{
                    color: #d060d2;
                  }
                  &:nth-child(3){
                    width: 70px;
                    height: 25px;
                    margin-top: 13px;
                    text-align: center;
                    line-height: 26px;
                    font-size: 12px;
                    border-radius: 5px;
                    color: #563500;
                    background-color: #e1c68d;
                  }
                }
              }
            }
          }
        }
      }

      input {
        width: 130px;
        height: 25px;
        padding: 0 0 0 5px;
        background: #380f3a;
        line-height: 25px;
        border: none;
        color: #fec7ff;
        font-size: 14px;
        outline: none;
        text-indent: 4px;
        border-radius: 5px;
      }
      input:focus {
        color: #cd8fce;
      }
      input::-webkit-input-placeholder {
        color: #cd8fce;
      }

      input[type="button"] {
        width: 70px;
        height: 20px;
        line-height: 20px;
        color: #cd8fce;
        cursor: pointer;
      }

      .login_after {
        width: 100px;
        float: left;
        height: 40px;
        li {
          height: 40px;
          line-height: 40px;
          margin-left: 10px;

          a {
            color: #697dac;
            font-size: 14px;
          }
        }
      }
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
    }
    
    .nav{
      width: 100%;
      background: #460847;
      .navBox{
        width: 1200px;
        height: 85px;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        margin:0 auto;
        .navItems{
          .ACTIVETY{
            background-position-x: 80px;
          }
          span{
            display: inline-block;
            width: 100px;
            height: 85px;
            line-height: 85px;
            background: url(/static/tccp/img/arro.png) 100% no-repeat;
            background-position-x: 74px;
            text-align: left;
            margin-left:25px;
            cursor: pointer;
            a{
              width: 100%;
              text-decoration: none;
              color: #d060d2;
              font-size: 16px;
            }
          }
        }
        .logo{
          cursor: pointer;
          img{
            vertical-align: middle;
            width: 190px;
          }
        }
        .newClass{
          height: 200px!important;
        }
        .slideShow{
          height: 0;
          width: 100%;
          margin: 0 auto;
          background-color: #2b0636;
          position: absolute;
          top: 121px;
          left: 0;
          z-index: 9;
          overflow: hidden;
          transition: height ease 0.2s;
          .smallWidth{
            width: 1200px;
            margin: 0 auto;
            ul{
              display: flex;
              li{
                width: 133px;
                position: relative;
                span{
                  display: block;
                  text-align: center;
                  color: #d060d2;
                  cursor: pointer;
                  img{
                    position: relative;
                    top: 20px;
                  }
                  &:first-child{
                    height: 75px;
                  }
                  &:last-child{
                    border: 1px solid #d060d2;
                    border-radius: 30px;
                    width: 90%;
                    margin: 0 auto;
                    height: 42px;
                    line-height: 42px;
                    :after{
                      display: none;
                    }
                  }
                  &:last-child:hover{
                    background: linear-gradient(90deg, #821679, #b515b8);
                    color:#fff;
                  }
                }
                &:last-child{
                  :after {
                    display: none!important;
                  }
                }
                :after {
                  content: " ";
                  position: absolute;
                  height: 105px;
                  width: 1px;
                  /* left: 10px; */
                  bottom: 30px;
                  left: 133px;
                  background-color: #d060d2;
                }
              }
            }
          }
          .slideContent{
            display: flex;
            width: 1200px;
            margin: 0 auto;
            position: relative;
            >span{
              height: 50px;
              width: 50px;
              border-radius: 50%;
              text-align: center;
              // line-height: 50px;
              cursor: pointer;
              background-color: rgba(224, 218, 218, 0.6);
              margin-top: 62px;
              position: absolute;
              z-index: 99;
              &:last-child{
                right: 0;
              }
              &:hover{
                background-color: rgba(224, 218, 218, 0.8);
              }
            }
            .fish_game{
              :after {
                content: " ";
                position: absolute;
                height: 105px;
                width: 1px;
                /* left: 10px; */
                bottom: 30px;
                left: 133px;
                background-color: #d060d2;
              }
            }
            .KY_CHESS{
              :after {
                content: " ";
                position: absolute;
                height: 105px;
                width: 1px;
                /* left: 10px; */
                bottom: 30px;
                left: 133px;
                background-color: #d060d2;
              }
            }
            .AG_GAME{
              :after {
                content: " ";
                position: absolute;
                height: 105px;
                width: 1px;
                /* left: 10px; */
                bottom: 30px;
                left: 133px;
                background-color:#d060d2;
              }
            }
            .CT_LOTTERY{
              :after {
                content: " ";
                position: absolute;
                height: 105px;
                width: 1px;
                /* left: 10px; */
                bottom: 30px;
                left: 132px;
                background-color: #d060d2;
              }
            }
            .slide_list{
              
              span{
                display: block;
                text-align: center;
                cursor: pointer;
                color: #d060d2;
                &:last-child{
                  border: 1px solid #d060d2;
                  border-radius: 30px;
                  width: 90%;
                  margin: 0 auto;
                  height: 42px;
                  line-height: 42px;
                }
                &:last-child:hover{
                  background: linear-gradient(90deg, #821679, #b515b8);
                  color: #fff;
                }
                img{
                  position: relative;
                  top: 20px;
                }
              }
            }
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
</style>
