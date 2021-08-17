<template>
  <div style="background:#f9f9f9;">
    <div class="content-view">
      <div class="content-side">
        <vp-side></vp-side>
      </div>
      <transition name="fade" mode="out-in">
        <router-view :key="activeDate"></router-view>
      </transition>


      <div class="dig-div" :style="{left:rollLeft+'px'}" v-if="showId.includes(this.$route.meta.id)&&!showroll&&userinfo" @click="showroll=true">
        <div class="dig">
          <Digitroll :rollDigits="digits" :flipStra="true" ref="digitroll" :dur='600'></Digitroll>
        </div>
      </div>

      <div class="troll-div" :style="{left:bidrolLeft+'px'}" v-if="showId.length>0&&showId.includes(this.$route.meta.id)&&showroll&&userinfo">
           <div class="troll" @click="showTroll=true">
                <Bigitroll ref="bigitroll" :flipStra="true" :rollDigits='digits' :dur='600' ></Bigitroll>
           </div>
           <div class="close" @click="showroll=false"></div>
           <div class="lottery">
              <ul>
                  <li v-for="(item,i) in lotteryData" :key="i" @click="goTo(item.id)">
                     <img :src="item.id|capitalize"  alt="">
                     <span>{{item.name}}</span>
                  </li>
              </ul>
           </div>
      </div>
          <div class="troll-tishi" v-if="showTroll&&showId.includes(this.$route.meta.id)&&userinfo">
                <div class="troll-img">
                  <div class="troll-text">
                      <p class="troll-p">1、会员投注每中奖1000元，奖池累积5元，</p>
                      <p class="troll-p">投注越多奖池累积越多</p>
                      <p class="troll-p">2、会员投注中奖时，即有机会击中奖池，获</p>
                      <p class="troll-p">得奖池派彩。彩种结算时，进行奖金派发并</p>
                      <p class="troll-p">推送中奖通知</p>
                      <p class="troll-p">3、中奖金额依据奖池金额进行匹配，随机发</p>
                      <p class="troll-p">放。奖池金额越高，奖金越高，千万大奖等您拿</p>
                      <p class="troll-p" style="text-align:center;margin-top:5px">感谢您对<span>{{this.$websiteName=='aqvns'?this.$siteName:'云博科技'}}</span>的支持!</p>
                      <p class="troll-p" style="text-align:center;">祝您下注中奖，黄金万两!</p>
                  </div>
                  <div class="close" @click="showTroll=false"></div>
                </div>
          </div>
    </div>
  </div>
</template>

<script>
// 侧边导航栏
import vpSide from "./components/side/side";
import Digitroll from "./components/digitroll/index.js";
import Bigitroll from "./components/digitroll/troll.js";
import { _SetPost, postS, getS } from "@/service/public/service.js";
let prizePooltimer;
export default {
  data() {
    return {
      activeDate: "start",
      digits: "5099987",
      // bidits:'5099986',
      clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      rollLeft: "",
      lotteryData: [
        { id: 10045, name: "快乐飞艇" },
        { id: 12, name: "快速赛车" },
        { id: 16, name: "快速时时彩" },
        { id: 13, name: "快乐赛车" },
        { id: 3630, name: "幸运赛车" },
        { id: 17, name: "3分时时彩" },
        { id: 10044, name: "香港赛马" },
        { id: 27, name: "快速快3" },
        { id: 18, name: "快速六合彩" },
        { id: 3631, name: "3分快3" },
        { id: 3632, name: "5分快3" },
        { id: 19, name: "5分六合彩" }
      ],
      showroll: true,
      showTroll: false,
      bigprizePool: "",
      prizePool: "",
      bidrolLeft: "",
      reStart: true,
      showId: [],
      path: "",
      oldpath: ""
    };
  },
  methods: {
    numeration() {
      if (this.clientwidth <= 1345) {
        this.rollLeft = 0;
        this.bidrolLeft = 0;
      } else {
        if ((this.clientwidth - 1345) / 2 - 400 < 30) this.bidrolLeft = 0;
        else this.bidrolLeft = (this.clientwidth - 1345) / 2 - 400;
        if ((this.clientwidth - 1345) / 2 - 184 < 30) this.rollLeft = 0;
        else this.rollLeft = (this.clientwidth - 1345) / 2 - 184;
      }
    },
    showBigtroll() {
      this.showroll = true;
      let oldpool = "";
      let newPool = "";
      if (this.oldpath.meta && this.showId.includes(this.oldpath.meta.id)) {
        this.prizeArray &&
          this.prizeArray.forEach(prize => {
            if (this.oldpath.meta.id == prize.lotteryId)
              oldpool = prize.prizePool;
            if (this.$route.meta.id == prize.lotteryId)
              newPool = prize.prizePool;
          });
        oldpool = this.changPre(oldpool);
        newPool = this.changPre(newPool);
        if (oldpool && newPool && oldpool != newPool) {
          let numPool = this.changpoll(oldpool, newPool);
          this.setdigit(newPool, numPool);
        } else {
          this.setdigit(newPool, 0);
        }
      } else {
        if (localStorage.prizeArray) {
          let prizeArray = JSON.parse(localStorage.prizeArray);
          prizeArray &&
            prizeArray.forEach(prize => {
              if (this.$route.meta.id == prize.lotteryId) {
                this.digits = this.changPre(prize.prizePool);
              }
            });
        }
      }
    },
    changpoll(num1, num2) {
      for (var i = 0; i < num1.length; i++) {
        if (num1.charAt(i) != num2.charAt(i)) {
          return 8 - i;
        }
      }
    },
    changPre(newPool) {
      if (typeof newPool != "string") newPool = newPool.toString();
      if (newPool.indexOf(".") != -1) newPool = newPool.split(".")[0];
      if (newPool.length >= 8) newPool = newPool.slice(0, 8);
      else newPool = this.addPreZero(newPool, 8);
      return newPool;
    },
    setdigit(newPool, numPool) {
      let pool = [];
      for (var i = 0; i < newPool.length; i++) {
        let obj = {};
        obj.value = newPool.charAt(i);
        if (i >= newPool.length - numPool) obj.dur = (newPool.length - i) * 400;
        else obj.dur = 20;
        pool.push(obj);
      }
      setTimeout(() => {
        if (this.showroll) this.$refs.bigitroll.setDigit(pool);
        else this.$refs.digitroll.setDigit(pool);
      }, 1500);
    },
    addPreZero(num, len) {
      var t = (num + "").length,
        s = "";
      for (var i = 0; i < len - t; i++) {
        s += "0";
      }
      return s + num;
    },
    async setBalanceToLocal() {
      if (!localStorage.token) {
        return false;
      }
      let res = await this.$http.post(
        `${this.$HOST_NAME}/member/setBalanceToLocal`,
        {}
      );
      if (res && res.code == 200) {
      } else {
      }
    },
    goTo(id) {
      if (localStorage.token) {
        if (localStorage.Public_User == "test") {
          this.dNotify("彩票暂无试玩,立即注册", "error");
        } else {
          if (id !== "438") {
             this.$store.dispatch('lottery/getStopLotteryCheck',id).then(res=>{
               if(res&&res.length >0 ){
                     this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: 'warn',
                        type:'closeMaret',
                     });
               }else{
                  this.$router.push({
                      path: `/plays/tradition/${id}`
                  });
               }
            })
          } else {
            this.$router.push({
              path: "/plays/hall"
            });
          }
        }
      } else {
        this.$store.commit("alert/showLogin", true);
        this.$store.commit("alert/setLoginTitle", "用户登录");
      }
    }
  },
  created() {
    if (localStorage.prizeArray) {
      this.showId = [];
      let prizeArray = JSON.parse(localStorage.prizeArray);
      prizeArray &&
        prizeArray.forEach(prize => {
          if (this.$route.meta.id == prize.lotteryId) {
            this.digits = this.changPre(prize.prizePool);
          }
          this.showId.push(prize.lotteryId);
        });
    }
    this.setBalanceToLocal();
    this.numeration();
  },
  mounted() {},
  //这个没法重新加载动画
  render(createElement) {
    return createElement(App);
  },
  destroyed() {
    clearInterval(prizePooltimer);
  },
  computed: {
    prizeArray() {
      return this.$store.state.mainState.prizeArray;
    },
    userinfo() {
      return this.$store.state.mainState.userinfo;
    }
  },
  watch: {
    // 防止组件不刷新，路由一旦有变动就刷新key
    $route(val, oldVal) {
      this.activeDate = new Date().getTime();
      if (this.showId.includes(this.$route.meta.id)) {
        this.path = val;
        this.oldpath = oldVal;
        this.numeration();
        this.showroll = true;
        this.prizeArray &&
          this.prizeArray.forEach(prize => {
            if (this.$route.meta.id == prize.lotteryId) {
              this.bigprizePool = this.changPre(prize.prizePool);
            }
          });
        if (this.bigprizePool) this.showBigtroll();
      }
    },
    prizeArray: {
      handler: function(newValue, oldValue) {
        if (this.showId.includes(this.$route.meta.id)) {
          this.prizeArray &&
            this.prizeArray.forEach(prize => {
              if (this.$route.meta.id == prize.lotteryId) {
                if (this.bigprizePool == "") {
                  this.bigprizePool = this.changPre(prize.prizePool);
                  this.digits = this.bigprizePool;
                } else {
                  let resPool = this.changPre(prize.prizePool);
                  if (this.bigprizePool != resPool) {
                    let numPool = this.changpoll(this.bigprizePool, resPool);
                    this.setdigit(resPool, numPool);
                    this.bigprizePool = resPool;
                  }
                }
              }
            });
        }
      },
      deep: true
    },
    showroll: function(val, oldVal) {
      this.digits = this.bigprizePool;
    },
    clientwidth: function(val, oldVal) {
      this.numeration();
    }
  },
  filters: {
    capitalize: function(value) {
      try {
        return `/static/public/image/lottery/nico/svg/${value}.svg`;
      } catch (err) {
        return `/static/public/image/lottery/ico/vp-changwan-ico.png`;
      }
    }
  },
  components: {
    vpSide,
    Digitroll,
    Bigitroll
  }
};
</script>
<style lang="less">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
<style lang="less" scoped>
.dig-div {
  position: fixed;
  width: 184px;
  height: 93px;
  bottom: 10px;
  z-index: 1000;
  cursor: pointer;
  background: url("/static/public/image/digitroll/rol.png");
  .dig {
    margin-top: 47px;
    width: 150px;
    margin-left: 20px;
  }
}
.troll-div {
  position: fixed;
  width: 400px;
  height: 276px;
  //  left: 0;
  bottom: 10px;
  z-index: 1000;
  background: url("/static/public/image/digitroll/rol2.png");
  .troll {
    width: 253px;
    margin: 45px 0 0 81px;
    cursor: pointer;
  }
  .close {
    position: absolute;
    right: 16px;
    top: 37px;
    width: 33px;
    height: 27px;
    background: url("/static/public/image/digitroll/roll/close.png");
    background-size: auto 100%;
    cursor: pointer;
  }
  .lottery {
    position: absolute;
    left: 87px;
    top: 90px;
    width: 240px;
    height: 140px;
    ul {
      overflow: hidden;
      li {
        height: 33px;
        line-height: 33px;
        //  width: 33.33%;
        float: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          font-size: 12px;
          color: #a1644c;
        }
      }
      li:nth-child(3n + 1) {
        width: 33%;
      }
      li:nth-child(3n + 2) {
        width: 32%;
      }
      li:nth-child(3n + 3) {
        width: 35%;
      }
    }
  }
}
.troll-tishi {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1900;
  display: flex;
  justify-content: center;
  align-items: center;
  .troll-img {
    width: 493px;
    height: 650px;
    background-image: url("/static/public/image/digitroll/troimg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    .troll-text {
      width: 340px;
      height: auto;
      position: absolute;
      //  border: 1px solid red;
      left: 80px;
      top: 157px;
      .troll-p {
        font-size: 17px;
        line-height: 34px;
        font-family: PingFangSC-Regular, sans-serif;
        color: #000;
      }
    }
    .close {
      width: 305px;
      height: 47px;
      position: absolute;
      left: 96px;
      bottom: 50px;
      cursor: pointer;
    }
  }
}
</style>
