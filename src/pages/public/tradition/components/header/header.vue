<template>
  <article>
    <div class="header-content">
      <div class="header-menu-left">
        <a href="javascript:void(0);">
          <img class="logo" :class="[$websiteName == 'test-1'?'test-1':'']" :src="lotHeadDatas.logoUrl" alt />
        </a>
        <div class="header-content-wrap">
          <label class="text name">
            <span v-if="$store.state.mainState.loginOrout">帐号:</span>
            <label v-if="$store.state.mainState.loginOrout">{{userinfo&&userinfo.userName}}</label>
          </label>
          <label class="text balance" v-if="$store.state.mainState.loginOrout">
            可用余额：
            <label class="hide">{{userinfo&&userinfo.balance||'0.00'}}</label>
          </label>
          <label v-if="$store.state.mainState.loginOrout" @click="goUserCen('recharge',0)" class="text recharge">
            <a href="javascript:void(0)">充值</a>
          </label>
          <label v-if="$store.state.mainState.loginOrout" class="line">|</label>
          <label v-if="$store.state.mainState.loginOrout" @click="goUserCen('withdraw',0)" class="text withdrawals">
            <a href="javascript:void(0)">提现</a>
          </label>
          <label v-if="$store.state.mainState.loginOrout" class="line">|</label>
          <label v-if="$store.state.mainState.loginOrout" @click="goUserCen('personage',0)" class="text withdrawals">
            <a href="javascript:void(0)">个人中心</a>
          </label>
          <label v-if="$store.state.mainState.loginOrout" class="line">|</label>
          <label v-if="$store.state.mainState.loginOrout" @click="goUserCen('personage',2)" class="text record">
            <a href="javascript:void(0)">投注记录</a>
          </label>
          <label v-if="$store.state.mainState.loginOrout" class="line">|</label>
          <label class="text exit" v-if="$store.state.mainState.loginOrout" @click="logout">
            <a>退出</a>
          </label>
          <label class="text exit" v-if="!$store.state.mainState.loginOrout" @click="login">
            <a>登录</a>
          </label>
          <label class="text exit" v-if="!$store.state.mainState.loginOrout" @click="register">
            <a>注册</a>
          </label>
        </div>
      </div>

      <div class="header-menu-right">
        <span class="text textRight hot">
          <i class="iconfont icon-hot"></i>
          <router-link tag="a" :to="{path:'/plays/hall',query:{}}">热门彩种</router-link>
        </span>
        <span class="line">|</span>
        <span class="text textRight trend">
          <i class="orange iconfont icon-curve"></i>
          <router-link tag="a" :to="{path:'/trend/'+routeUrl+'',query:{}}">开奖走势</router-link>
        </span>
        <span class="line">|</span>
        <span class="text textRight rule">
          <i class="orange iconfont icon-rule"></i>
          <a @click="newRulePage">玩法规则</a>
        </span>
        <span class="line" v-if="$websiteName!='klk'">|</span>
        <span class="text textRight phoneApp" @click="goDownLoad" v-if="$websiteName!='klk'">
          <i class="iconfont icon-CombinedShapex"></i>
          <i class="iconfont icon-apple"></i>
          <router-link tag="a" to>手机APP下载</router-link>
        </span>
      </div>
      <!-- 分为封盘、报错、恭喜 -->
      <!-- <Modal
        :scrollable="true"
        title="提示信息"
        v-model="tipDatas.bool"
        class-name="vp-all-tipModel-wrap"
        width="450"
        :transition-names="transitionNames"
      >
        <div class="tipModel-box">
          <span>
            <i v-if="tipDatas.model=='warn'" class="iconfont icon-baojing"></i>
            <i v-if="tipDatas.model=='error'" class="iconfont icon-cuowu"></i>
            <i v-if="tipDatas.model=='success'" class="iconfont icon-chenggong"></i>
          </span>
          <span>{{tipDatas.title}}</span>
        </div>
      </Modal> -->
      <Modal></Modal>
      <Modal
        :scrollable="true"
        title="提示信息"
        v-model="modeldetail.bool"
        class-name="vp-all-tipModel-wrap"
        width="450"
        :transition-names="transitionNames"
        class="Market"
      >
        <div class="tipModel-box closeMarket">
          <span>
            <i class="iconfont icon-baojing"></i>
          </span>
          <span v-html="modeldetail.title"></span>
        </div>
      </Modal>

      <div class="my-modal" v-show="ifLogin">
        <div class="bg"></div>
        <div class="my-modal-content">
          <div class="my-register">{{$store.state.alert.login.chooseModel}}</div>
          <vp-admin-index></vp-admin-index>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import UserService from "@/service/public/UserService.js";
import vpAdminIndex from "../admin";
import store from "@/vuex/store";
import vpRedPackets from "../../components/redPackets/redpackets.vue";
import Modal from '../../../home/modal';
export default {
  props: {
    lotHeadDatas: {
      type: Object
    }
  },
  data() {
    return {
      ifShowBalan: false,
      routeUrl: "12",
      showWebsiteName: null,
      transitionNames: ["", "fade"],
      websiteName:this.$websiteName,
    };
  },
  methods: {
    newRulePage() {
      window.open("#/rules/ssc?id=4");
    },
    picUrl() {
      let UrlId = this.$route.meta.id;
      if (UrlId && isNaN(UrlId) === false) {
        if(UrlId==99996) this.routeUrl = "12";
        else this.routeUrl = UrlId;
      } else {
        this.routeUrl = "12";
      }
    },
    // 显示余额
    showBal() {
      if (!sessionStorage.token) {
        this.showLogin();
        return false;
      }
      if (this.userinfo) {
        UserService.vpGetBasicInfo.call(this);
      }
      this.ifShowBalan = true;
    },
    //注册
    register() {
      this.$store.commit("alert/showLogin", true);
      this.$store.commit("alert/setChooseModel", "注册帐号");
      this.$store.commit("alert/setLoginTitle", "注册帐号");
    },
    login() {
      this.$store.commit("alert/showLogin", true);
      this.$store.commit("alert/setChooseModel", "登入帐号");
      this.$store.commit("alert/setLoginTitle", "登入帐号");
    },
    // 历史记录
    history() {
      if (!sessionStorage.token) {
        this.showLogin();
        return false;
      }
    },
    logout() {
      UserService.logout.call(this);
    },
    // 打开个人中心
    goUserCen(name, num) {
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", { bool: true });
      this.$store.commit("showContent", { parent: name });
      this.$store.commit("showNav", { child: num });
    },
    //下载
    goDownLoad() {
      window.open(this.lotHeadDatas.downLoadurl);
    },
    //试玩
    async tryPlay() {
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
    }
  },
  watch: {
    "$route.fullPath": function(newVal, oldVal) {
      if (newVal) {
        this.picUrl();
      }
    }
  },
  created: function() {
    let curId = this.$route.meta.id;
    if (curId) {
      this.routeUrl = curId.toString();
    }
  },
  mounted() {
    this.$store.commit("mainState/getDownLoad", this.lotHeadDatas);
    let websiteName = this.$websiteName;
    if (
      websiteName == "jhcp" ||
      websiteName == "fczx" ||
      websiteName == "t500w" ||
      websiteName == "cjw" ||
      websiteName == "jlcp" ||
      websiteName == "jltx" ||
      websiteName == "qygj" ||
      websiteName == "xpj80" ||
      websiteName == "qygj-preview"
    ) {
      this.showWebsiteName = true;
    }
  },
  components: {
    vpAdminIndex,
    vpRedPackets,
    Modal
  },
  computed: {
    // 个人信息刷新
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    // 是否提示信息
    tipDatas() {
      return this.$store.state.alert.tipModel;
    },
    // 是否显示登录
    ifLogin() {
      return this.$store.state.alert.login.ifLogin;
    },
    // 登录注册标题切换
    modelTitle() {
      return this.$store.state.alert.login.modelTitle;
    },
    modeldetail() {
      return this.$store.state.alert.newtip;
    }
  },
  store
};
</script>

<style lang="less" scoped>
@import "../../../../../assets/less/public/var.less";
@-webkit-keyframes _scaleEnter {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes _scaleEnter {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@-webkit-keyframes _scaleLeave {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
}

@keyframes _scaleLeave {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
}
/deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
.vp-login-warp {
  /deep/ .ivu-modal-wrap {
    overflow: inherit;
    .ivu-modal {
      top: 10%;
      .ivu-modal-header {
        margin: 14px 20px 0 20px;
        height: 70px;

        .ivu-modal-header-inner {
          font-size: 20px;
          color: #333;
          font-weight: normal;
          border-bottom: 2px solid #ff0024;
          display: inline-block;
          width: auto;
          padding: 20px 10px 34px 10px;
        }
      }

      .ivu-modal-body {
        padding: 30px;
      }

      .ivu-modal-footer {
        display: none;
      }
    }
  }
}

article {
  position: relative;
  width: 100%;
  height: @header-height;
  font-size: 0;
  background-color: #fff;
  border-bottom: 1px solid #ecebeb;

  .header-content {
    width: @base-width;
    height: 100%;
    margin: 0 auto;
    font-size: 16px;
    color: #696969;
    line-height: 80px;
    background: #fff;
    overflow: hidden;
    display: flex;
    position: relative;
    justify-content: space-between;

    .header-menu-left {
      display: flex;
      justify-content: space-between;
      float: left;
      .logo {
        width: 175px;
        margin-top: 13px;
      }

      .header-content-wrap {
        margin-left: 33px;
        float: left;

        .show {
          padding: 0 10px;
        }

        .hide {
          color: #ff0000;
          margin-left: -10px;
        }

        .balance {
          padding: 0 8px;
        }
      }
    }

    .header-menu-right {
      position: absolute;
      right: 5px;

      .textRight {
        cursor: pointer;
      }
    }

    i {
      color: #ff5050;
    }

    .line {
      padding: 0 2px;
      color: #bababa;
    }

    .show,
    .recharge,
    .withdrawals,
    .vpCenter,
    .record,
    .exit {
      cursor: pointer;
    }
  }

  a {
    color: #696969;

    &:hover {
      color: #ff6600;
    }
  }
}
.my-modal {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .bg {
    z-index: 9998;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.36);
  }
  .my-modal-content {
    max-width: 750px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
    background-color: #fff;
    // padding: 5% 0;
    border-radius: 10px;

    .vp-admin-wrap {
      padding: 116px 0 0px;
    }

    .my-register {
      position: absolute;
      font-size: 20px;
      line-height: 20px;
      color: #333;
      font-weight: normal;
      border-bottom: 2px solid #ff0024;
      padding: 20px 10px 20px 10px;
      top: 0px;
      left: 30px;
      z-index: 99;
    }
  }
}

/deep/.ivu-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 318px;
  -webkit-animation: _scaleEnter 0.3s ease;
  animation: _scaleEnter 0.3s ease;
  &.v-leave-active {
    -webkit-animation: _scaleLeave 0.3s ease;
    animation: _scaleLeave 0.3s ease;
  }
}
/deep/.ivu-modal-close {
  top: 0;
  right: 20px;
}
/deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
  color: #999;
  font-size: 37px;
  top: 0;
}
/deep/.ivu-modal-header {
  border-bottom: none;
  padding: 0;
}
/deep/ .ivu-modal-body {
  padding: 0;
}

/deep/.ivu-modal-footer {
  border-top: none;
  display: none;
}

// .agent-transfer {
//   .tishi {
//     height: 37px;
//     line-height: 37px;
//     font-size: 16px;
//     color: #fff;
//     background: linear-gradient(180deg, #9d63f3, #e549b0);
//     border-radius: 6px 6px 0 0;
//     span {
//       margin-left: 30px;
//     }
//   }
//   .agent-con {
//     position: relative;
//     padding: 51.5px 0;
//   }
//   .icon-baojing {
//     font-size: 40px;
//     color: #f90;
//   }
//   .iconspan {
//     margin-left: 70px;
//     height: 40px;
//     line-height: 40px;
//     display: block;
//     font-size: 16px;
//     position: relative;
//     .tispan {
//       margin-left: 10px;
//       position: absolute;
//       font-size: 17px;
//       color: #1f1f1f;
//     }
//   }
//   .newspan {
//     margin-left: 165px;
//   }
// }
</style>
