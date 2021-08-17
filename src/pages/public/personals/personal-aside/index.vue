<template>
  <div class="peronsal-aside">
    <div class="aside-nav">
      <ul>
        <li
          v-for="(item,i) in navData"
          :key="i"
          :class="{liActive:item.type ==$store.state.personal.contentView}"
          @click="toggle(item)"
        >
          <img
            :src="item.img"
            alt=""
          >
          <span>{{item.text}}</span>
          <div class="showMessg" v-if="item.type=='message'&& allUnReadCount > 0 ">{{allUnReadCount}}</div>
        </li>
        <li @click="goService">
          <img
            src="/static/public/image/userImg/kefu@3x.png"
            alt=""
          >
          <span>客服</span>
        </li>

      </ul>
    </div>

    <div class="aside-content">
      <div class="header">
        <p>{{name}}</p>
        <p>余额:{{userinfo.balance}}
          <i
            :class="['ivu-icon' ,'ivu-icon-ios-loop-strong',{active:refesh},{'newrefresh':isClick}]"
            @click="getBalance"
          ></i>
        </p>
        <p v-if="is_agency==1">代理佣金:{{userinfo.agent}}
          <img
            src="/static/public/image/userImg/agent1.png"
            style="width:16px;height:12px;cursor:pointer;"
            alt=""
            @click="getagent"
          >
        </p>

      </div>
      <component :is="'navAll'" ref="navAll"></component>
    </div>
    
    <Modal
      v-model="ifagent"
      class="ifagent"
      class-name="agent-transfer"
      width="345"
      :mask-closable="false"
    >
      <div
        class="vp-admin-wrap-close"
        slot="close"

      >
      </div>
      <div slot="header" class="tishi">
           <span>代理佣金转账</span>
      </div>
      <div class="agent-con">
           <span class="rename">代理佣金：{{userinfo_agent}}元</span>
           <input type="text" :placeholder="placehodle" id="inputtext"  
            v-model="amount"
            onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
            @blur="hanlderAmount"
            v-on:keyup.enter="getMoneySubmit">
           <label @click="amount=userinfo_agent">全部</label>
           <div class="inco">￥</div>
      </div>
      <div slot="footer" class="footer">
            <span class="span1" @click="ifagent=false">取消</span>
            <span @click="getMoneySubmit">确定</span>
      </div>
    </Modal>
    <Modal
      v-model="agentmodel"
      class="agentmodal"
      class-name="agent-transfer"
      width="290"
      :mask-closable="false"
    >
      <div
        class="vp-admin-wrap-close"
        slot="close"

      >
      </div>
      <div class="agent-con">
           <span class="rename">恭喜您获得{{$siteName}}最高代理权限!</span><br>
           <span class="newname"></span>
           <span class="renamenew">即刻享受佣金提现!</span>
      </div>
      <div slot="footer" class="footer">
            <span class="span1" @click="hidemode">取消</span>
            <span @click="sendName">立即激活</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import store from "@/vuex/store";
import navAll from "../navmenu/nav";
// import navAll from "../navmenu/newnav"; // 这个是新的支付方式
import UserService from "@/service/public/UserService.js";

export default {
  data() {
    return {
      navData: [
        {
          text: "充值",
          type: "recharge",
          img: "/static/public/image/userImg/chongzhi@3x.png"
        },
        {
          text: "提款",
          type: "withdraw",
          img: "/static/public/image/userImg/tikuan@3x.png"
        },
        {
          text: "借呗",
          type: "borrowMoney",
          img: "/static/public/image/userImg/jiebei@2x.png"
        },
        {
          text: "个人",
          type: "personage",
          img: "/static/public/image/userImg/geren@3x.png"
        },
        {
          text: "优惠",
          type: "discounts",
          img: "/static/public/image/userImg/youhui@3x.png"
        },
        {
          text: "代理",
          type: "agency",
          img: "/static/public/image/userImg/daili@3x.png"
        },
        {
          text: "信息",
          type: "message",
          img: "/static/public/image/userImg/gonggao@3x.png"
        }
      ],
      navData2: [
        {
          text: "充值",
          type: "recharge",
          img: "/static/public/image/userImg/chongzhi@3x.png"
        },
        {
          text: "提款",
          type: "withdraw",
          img: "/static/public/image/userImg/tikuan@3x.png"
        },
        {
          text: "借呗",
          type: "borrowMoney",
          img: "/static/public/image/userImg/jiebei@2x.png"
        },
        {
          text: "个人",
          type: "personage",
          img: "/static/public/image/userImg/geren@3x.png"
        },
        {
          text: "优惠",
          type: "discounts",
          img: "/static/public/image/userImg/youhui@3x.png"
        },
        {
          text: "信息",
          type: "message",
          img: "/static/public/image/userImg/gonggao@3x.png"
        }
      ],
      amount: "",
      name: "",
      placehodle: "转账金额",
      refesh: false,
      canClick: false,
      ifbalance: false,
      ifagent: false,
      agentmodel: false,
      isClick: false,
      personal_commission_mode: localStorage.personal_mode
    };
  },
  methods: {
    usdtList(){
         this.$http.post(`${this.$HOST_NAME}/member/usdtList`).then(res=>{
            if(res.code == 200){
              if(res.data.length){
                res.data.forEach(v => {
                 v.created_at = this.$moment
                   .unix(v.created_at - 0)
                   .format('YYYY-MM-DD')
               })
              }
              this.$store.commit('usdtList',res.data);
            }
         })
    },
    toggle(item) {
      if(item.type=='withdraw'){
         this.usdtList()
      }
      this.$store.commit("showContent", {
        parent: item.type
      });
      this.$store.commit("showNav", {
        child: 0
      });
      this.name = item.text;
      if (item.type == "agency") {
        this.ifbalance = true;
      } else {
        this.ifbalance = false;
      }
    },
   
    getBalance() {
      setTimeout(() => {
        if (this.isClick) return false;
        this.refesh = true;
        setTimeout(() => {
          this.refesh = false;
        }, 1000);
        this.isClick = true;
        setTimeout(() => {
          this.isClick = false;
        }, 5000);
        this.$getS(`/member/balance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo);
            userinfo.balance = res.data.member;
            userinfo.agent = res.data.agency;
            this.$store.commit("mainState/reloadUserinfo", userinfo);
          }
        });
      }, 500);
    },
    getMoneySubmit() {
      if (this.canClick) {
        return false;
      }
      if (!this.amount) {
        this.$error("请输入提款金额");
        this.ifagent = false;
        return false;
      }
      if (this.amount < 1) {
        this.ifagent = false;
        this.$error("转账金额不能小于1元");
        return false;
      }
      if (Number(this.amount) > Number(this.userinfo_agent)) {
        this.ifagent = false;
        this.$error("转账金额输入错误");
        return false;
      }
      this.canClick = true;
      setTimeout(() => {
        this.canClick = false;
      }, 5 * 1000);

      this.$postS("agency/agencyToMember", { money: this.amount }).then(res => {
        if (res && res.code == 200) {
          this.amount = "";
          this.ifagent = false;
          this.$success(res.data);
        } else {
          while (res.message.indexOf("|") >= 0)
            res.message = res.message.replace("|", "");
          this.ifagent = false;
          this.$error(res.message);
        }
      });
    },
    hanlderAmount() {
      if (this.amount.indexOf(".") != -1) {
        this.amount = this.amount.substring(0, this.amount.indexOf(".") + 3);
      }
    },
    goService() {
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find(item => item.status === "on");
        if (ser) {
          window.open(ser.url);
        }
      }
    },
    closeagent() {
      this.ifagent = false;
      this.amount = "";
    },
    getagent() {
      this.amount = "";
      if (this.personal_commission_mode == "mode_b") {
        this.$postS(`agency/commissionType`, {
          type: "1"
        }).then(res => {
          if (res && res.code == 200) {
            if (res.data[0].commission_type == 0) {
              this.agentmodel = true;
            } else {
              this.ifagent = true;
            }
          } else {
            this.$error(res.message);
          }
        });
      } else {
        this.ifagent = true;
      }
    },
    hidemode() {
      this.agentmodel = false;
    },
    sendName() {
      this.$postS(`agency/commissionType`, {
        type: "2"
      }).then(res => {
        if (res && res.code == 200) {
          if (res.data[0].commission_type == 1) {
            this.agentmodel = false;
            this.ifagent = true;
          }
        } else {
          this.$error(res.message);
        }
      });
    }
  },
  created() {
    if (this.$store.state.personal.contentView == "agency") {
      this.ifbalance = true;
    }
    if(this.$store.state.personal.contentView=="withdraw"){
      this.usdtList()
    }
    let isnav = JSON.parse(localStorage.userinfo).is_agency;
    if (isnav) {
      this.navData = this.navData;
    } else {
      this.navData = this.navData2;
    }
    if(this.$websiteName=='fhcp'||this.$websiteName=='xpj83'||this.$websiteName=='dqr'){this.navData = this.navData2;}
    if (!this.name) {
      this.navData.forEach(item => {
        if (item.type == this.$store.state.personal.contentView) {
          this.name = item.text;
        }
      });
    }
    if(!this.$store.state.game.jieBeiData.show){
         this.navData=this.navData.filter(item=>item.type!="borrowMoney")
    }
    if(this.$websiteName=='500w'){
        this.navData=this.navData.filter(item=>item.type=="withdraw")
    }
  },
  computed: {
    liActive() {
      return this.$store.state.personal.liActive;
    },
    navView() {
      return this.$store.state.personal.navView;
    },
    text() {
      return this.$store.state.personal.navText;
    },
    userinfo_agent() {
      return this.$store.state.mainState.userinfo.agent;
    },
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    is_agency() {
      return this.$store.state.mainState.userinfo.is_agency;
    },
    allUnReadCount() {
      return this.$store.state.mainState.showMessage.allUnReadCount;
    }
  },
  components: {
    navAll
  },
  store
};
</script>

<style lang="less" scoped>
@-webkit-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-ms-keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.peronsal-aside {
  padding-left: 72px;
  position: relative;
  .aside-nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 72px;
    background: url("/static/public/image/userImg/mockup_bg.png") left bottom
        no-repeat,
      url("/static/public/image/userImg/mockup_bg_left.png");
    padding-top: 0.6em;
    border-radius: 15px 0 0 15px;
    ul {
      li {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        position: relative;
        img {
          width: 42px;
          height: 42px;
          display: inline-block;
        }
        span {
          font-size: 14px;
          color: #fff;
          margin-top: 7px;
          font-weight: 200;
          font-family: "Microsoft YaHei";
          font-weight: 400;
        }
       .showMessg {
        color: #d12323;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        right: 6px;
        top: 5px;
        line-height: 20px;
        text-align: center;
        display: block;
      }
      }
      .liActive {
        background: #fe6565;
      }
    }
  }
  .aside-content {
    color: #fff;
    font-weight: 200;
    .header {
      // height: 10em;
      text-align: center;
      margin-bottom: 18.4px;
      p:nth-child(1) {
        font-size: 2.4em;
        padding-top: 30px;
      }
      p:nth-child(2) {
        font-size: 16px;
        padding-top: 10px;
        i {
          cursor: pointer;
        }
        .active {
          -webkit-animation: animate 1s infinite linear;
          animation: animate 1s infinite linear;
          -moz-animation: animate 1s infinite linear;
          -o-animation: animate 1s infinite linear;
          -ms-animation: animate 1s infinite linear;
        }
        .newrefresh {
          color: #d4d4d4;
        }
      }
      p:nth-child(3) {
        font-size: 16px;
        padding-top: 10px;
        i {
          cursor: pointer;
        }
      }
    }
  }
}

/deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
/deep/.ivu-modal-close {
  right: 0;
}
/deep/.ivu-modal-footer {
  border-top: none;
}
/deep/.ivu-modal {
  top: 50%;
  margin-top: -159px;
  height: 318px;
}
/deep/.ivu-modal-header {
  border-bottom: none;
  padding: 0;
}

.agent-transfer {
  .vp-admin-wrap-close {
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;
    &:hover {
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }
    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      -moz-transition: all 0.5s ease-in;
      -webkit-transition: all 0.5s ease-in;
      -o-transition: all 0.5s ease-in;
      transition: all 0.5s ease-in;
      a {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("/static/public/image/common/vp-common-close.png") #fff;
        background-size: 98% 98%;
        // transform: rotate(0deg);
      }
      &:hover {
        transform: translateX(40%);
        // &::before{
        //   color: #fff;
        // }
      }
    }
  }
  .agent-header {
    font-size: 18px;
    color: #000;
    padding: 24px 0 24px 24px;
  }
  .agent-liner {
    width: 416px;
    height: 1px;
    background: rgba(219, 219, 219, 0.8);
    margin-left: 25px;
  }
  .agent-con {
    .agent-p {
      margin-left: 90px;
      margin-top: 44px;
      font-size: 16px;
      color: #333;
    }
    .account {
      display: inline-block;
      margin-left: 91px;
      margin-top: 26px;
      position: relative;
      label {
        width: 33px;
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: #ff9146;
      }
      input {
        width: 218px;
        height: 36px;
        font-size: 14px;
        background: #f5f5f5;
        border: 0 solid #f5f5f5;
        border-radius: 5px;
        // padding: 0 16px;
        text-align: left;
        padding-left: 22px;
        text-indent: 6px;
        -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
        color: #666;
        border-color: none;
      }
      input:focus {
        outline: none !important;
        border: 1px solid rgba(254, 134, 93, 0.6);
        box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06),
          0 1px 10px 5px rgba(254, 134, 93, 0.14);
      }
      .inco {
        width: 8px;
        height: 11px;
        position: absolute;
        font-size: 14px;
        color: #555;
        left: 10px;
        top: 8px;
      }
    }
    .agent-submit {
      width: 140px;
      height: 42px;
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
      line-height: 42px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      margin-top: 39px;
      border-radius: 8px;
      font-size: 16px;
      margin-left: 163px;
      display: inline-block;
    }
  }
  // }
}
.agentmodal {
  /deep/ .ivu-modal-mask {
    z-index: 2000;
  }

  /deep/ .ivu-modal-wrap {
    z-index: 2000;
  }

  /deep/ .ivu-modal-close {
    right: 0;
  }

  /deep/ .ivu-modal-footer {
    border-top: none;
    padding: 0;
    text-align: left;
  }

  /deep/ .ivu-modal {
    top: 50%;
    margin-top: -75px;
    height: 318px;
  }

  /deep/ .ivu-modal-header {
    border-bottom: none;
    padding: 0;
  }

  /deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
    display: none;
  }
  /deep/ .ivu-modal-content {
    border-radius: 10px;
  }
  /deep/ .ivu-modal-body {
    padding: 0;
  }

  /deep/ .ivu-modal-close {
    top: 3px;
  }
  .footer {
    height: 39px;
    background: #d93d32;
    border-radius: 0 0 10px 10px;
    display: flex;
    span {
      width: 172.5px;
      height: 39px;
      display: inline-block;
      color: #ffffff;
      font-size: 16px;
      line-height: 39px;
      text-align: center;
      cursor: pointer;
    }
    .span1 {
      border-right: 1px solid #e96057;
    }
  }
  .headerp {
    text-align: center;
    margin-top: 20px;
  }

  .tishi {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #ffffff;
    background-color: #403d58;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #4b495c;
    span {
      margin-left: 110px;
      margin-top: 16px;
      font-size: 18px;
    }
  }

  .agent-con {
    position: relative;
    background-color: #403d58;
    height: 111px;
    padding-top: 33px;
    border-radius: 10px 10px 0 0;
    .showname {
      color: #d93d32;
    }
    .rename {
      font-size: 16px;
      color: #fff;
      text-align: center;
      display: block;
    }
    .newname {
    }
    .renamenew {
      font-size: 16px;
      color: #fff;
      display: block;
      text-align: center;
      margin-top: -12px;
    }
    input {
      width: 238px;
      height: 38px;
      margin-left: 54px;
      margin-top: 21px;
      border: 1px solid #6e6c7c;
      border-radius: 3px;
      color: #fff;
      text-indent: 5px;
    }
    label {
      width: 33px;
      display: inline-block;
      margin-left: 10px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: #ff9146;
    }
    #inputtext {
      background-color: #403d58;
    }
  }

  .icon-baojing {
    font-size: 45px;
    color: #f90;
  }

  .iconspan {
    margin-left: 82px;
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 16px;
    position: relative;
    margin-top: 40px;

    .tispan {
      margin-left: 10px;
      position: absolute;
      font-size: 26px;
      color: #1f1f1f;
    }
  }

  .pay {
    display: block;
    position: absolute;
    width: 160px;
    height: 35px;
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 18px;
    left: 130px;
    top: 80px;
    border-radius: 10px;
  }

  .vp-admin-wrap-close {
    display: none;
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;

    &:hover {
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }

    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      -moz-transition: all 0.5s ease-in;
      -webkit-transition: all 0.5s ease-in;
      -o-transition: all 0.5s ease-in;
      transition: all 0.5s ease-in;

      a {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("/static/public/image/common/vp-common-close.png") #fff;
        background-size: 98% 98%;
        // transform: rotate(0deg);
      }
    }
  }
}
.ifagent {
  /deep/ .ivu-modal-mask {
    z-index: 2000;
  }

  /deep/ .ivu-modal-wrap {
    z-index: 2000;
  }

  /deep/ .ivu-modal-close {
    right: 0;
  }

  /deep/ .ivu-modal-footer {
    border-top: none;
    padding: 0;
    text-align: left;
  }

  /deep/ .ivu-modal {
    top: 50%;
    margin-top: -130px;
    height: 318px;
  }

  /deep/ .ivu-modal-header {
    border-bottom: none;
    padding: 0;
  }

  /deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
    display: none;
  }

  /deep/ .ivu-modal-body {
    padding: 0;
  }

  /deep/ .ivu-modal-close {
    top: 3px;
  }
  .footer {
    height: 39px;
    background: #d93d32;
    border-radius: 0 0 6px 6px;
    display: flex;
    span {
      width: 172.5px;
      height: 39px;
      display: inline-block;
      color: #ffffff;
      font-size: 16px;
      line-height: 39px;
      text-align: center;
      cursor: pointer;
    }
    .span1 {
      border-right: 1px solid #e96057;
    }
  }
  .headerp {
    text-align: center;
    margin-top: 20px;
  }

  .tishi {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #ffffff;
    background-color: #403d58;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #4b495c;
    span {
      margin-left: 110px;
      margin-top: 16px;
      font-size: 18px;
    }
  }

  .agent-con {
    position: relative;
    background-color: #403d58;
    height: 135px;
    padding-top: 17px;
    .showname {
      color: #d93d32;
    }
    .rename {
      margin-left: 110px;
      font-size: 14px;
      color: #fff;
    }
    label {
      width: 33px;
      display: inline-block;
      margin-left: 10px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: #fff;
      cursor: pointer;
    }
    input {
      width: 238px;
      height: 38px;
      margin-left: 33px;
      margin-top: 21px;
      border: 1px solid #6e6c7c;
      border-radius: 3px;
      color: #fff;
      text-indent: 5px;
      position: relative;
      padding-left: 20px;
    }
    .inco {
      width: 8px;
      height: 11px;
      position: absolute;
      font-size: 14px;
      color: #fff;
      left: 40px;
      top: 68px;
    }
    #inputtext {
      background-color: #403d58;
    }
  }

  .icon-baojing {
    font-size: 45px;
    color: #f90;
  }

  .iconspan {
    margin-left: 82px;
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 16px;
    position: relative;
    margin-top: 40px;

    .tispan {
      margin-left: 10px;
      position: absolute;
      font-size: 26px;
      color: #1f1f1f;
    }
  }

  .pay {
    display: block;
    position: absolute;
    width: 160px;
    height: 35px;
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 18px;
    left: 130px;
    top: 80px;
    border-radius: 10px;
  }

  .vp-admin-wrap-close {
    display: none;
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;

    &:hover {
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }

    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      -moz-transition: all 0.5s ease-in;
      -webkit-transition: all 0.5s ease-in;
      -o-transition: all 0.5s ease-in;
      transition: all 0.5s ease-in;

      a {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("/static/public/image/common/vp-common-close.png") #fff;
        background-size: 98% 98%;
        // transform: rotate(0deg);
      }
    }
  }
}
</style>
