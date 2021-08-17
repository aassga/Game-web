<template>
    <div class="container">
         <div class="cp-container-wrap">
            <vp-activity :text="activityText"></vp-activity>
            <div class=" lottery-header-item"> 
                <div class="item item1">
                     <div class="lottery-logo">
                         <div class="logoBox">
                            <img class="ico" src="/static/public/image/lottery/nico/png/99996.png" alt="">
                            <div class="hoverMaskBox"></div>
                         </div>   
                     </div>
                </div>
                <div class="item item2">
                    <div class="text-name">
                         <span>长龙助手</span>  
                    </div>
                    <div class="tuijian">
                      <span>推荐星级</span>
                      <ul class="icon"><li v-for="k in 5" :key='k'></li></ul>
                    </div>
                    <div class="plays-wrap">
                      <div class="plays">
                        <span @click="playsChoose('官方玩法')" :class="{'active':actived.plays=='官方玩法'}">官方玩法</span>
                        <span @click="playsChoose('传统玩法')" :class="{'active':actived.plays=='传统玩法'}">传统玩法</span>
                      </div>
                    </div>
                </div>
                <div class="item item3">
                     <p class="title">长龙介绍</p>
                     <div class="content-title">
                          <p class="content">长龙助手是对快3、时时彩、PK10、六合彩特定玩法的“大小单双” 开奖结果进行跟踪统计，并可进行快捷投注的助</br>手工具。每期出现大、小、单、双的概率为50%，如果连续3期及以上的开奖结果相同，称之为“长龙”，通常会采用倍投的方式进行“斩龙”或“顺龙”。</br>
                          1.什么叫斩龙</br>如连续开5期“单”，可以选择“双”进行投注，这种投注方案称之为“斩龙”</br>
                          2.什么叫顺龙</br>如连续开5期“单”，继续选择“单”进行投注，这种投注方案称之为“顺龙”</br>
                          3.什么叫倍投</br>倍投是一种翻倍投注方式，是为了保障能够在“斩龙”或“顺龙”的过程中持续盈利的一种投注方式。
                          </p>
                     </div>
                
                </div>
            </div>
            
         <div class="cp-container-content" style="position:relative">
                  <div class="cp-title">
                       <div class="iusse">彩种信息</div>
                       <div class="change">投注选项</div>
                       <div class="iusse">彩种信息</div>
                       <div class="change">投注选项</div>
                  </div>
                  <Spin size="large" style="top:100px;background-color:transparent" fix v-if='isLoading'></Spin>
                  <div class="lottery-content-all-left">
                       <div class="all-left">
                       <div class="content" v-for="(item,index) in showData" :key="index" v-if="showData.length">
                          <div class="logo">
                            <div class="img"><img :src="'/static/public/image/lottery/nico/png/'+item.lid+'.png'" alt=""></div>
                              
                         </div>
                          <div class="message">
                            <p class="text">{{item.lotteryName}}</p>
                            <div class="middle">
                              <span class="iusse">{{item['issue'].toString().length>9?item['issue'].toString().substr(8):item['issue']}}期</span>
                              <span class="timer">
                                <vp-timer :timerDatas="item" v-on:child-say="timeout" :itemIndex='index'></vp-timer>
                              </span>
                            </div>
                            <div class="plays">
                              <div class="ball ball1">{{item.ballTitle}}</div>
                              <div class="ball ball2">{{item.playwayTitle}}</div>
                              <div class="ball ball3">{{item.num}}期</div>
                            </div>
                          </div>
                           
                           
                         
                          <div class="odds" v-if="active">
                              <div class="odd" v-for="(odd,k) in item.playwayJson" :key="k"  @click="chooseFastBet(item,k,index)"  :class="{'active':odd.active||item.fengpan<=0}">
                                <div class="fenpan" v-if="odd.active||item.fengpan<=0"></div>
                                <p class="odd-one" :class="{'colorActive':odd.colorActive}">{{odd.code}}</p>
                                <p class="odd-two" :class="{'colorActive':odd.colorActive}">{{odd.odds}}</p>
                              </div>
                           </div>
                       </div>
                       </div>
                  </div>
                 <div class="lottery-content-all-right">
                      <vp-fast-and-submit
                        v-on:range-say="rangeChange"
                        v-on:submit-Input-say="fastInput"
                        v-on:submit-resetAll="resetAll"
                        v-on:submit-review="review"
                        :totalCount="totalCount"
                        :selectFast="selectFast"
                        :saveSelectMoney="saveSelectMoney"
                        :confirmbet="confirmbet"
                    >
                    </vp-fast-and-submit>
                    <vp-ranking ref="vpRanking"></vp-ranking>
                 </div>
            </div>   
         </div>
         <Modal :scrollable=true title="投注信息" v-model="modal" class-name="vp-betting-warp" width="584" height="400"
           @on-ok="submit">
         <vp-betting ref="betting"></vp-betting>
          <div slot="footer">
            <Button type="text" size="large" @click="modal=false">取消</Button>
            <Button type="primary" size="large" @click="submit">确定</Button>
          </div>
    </Modal>
    </div>
</template>

<script>
import vpActivity from "@/pages/public/tradition/components/activity/walkactivity";
import changDragon from "@/pages/public/tradition/data/chang-dragon";
import vpTimer from "./timer";
import { postS, getS } from "@/service/public/service.js";
import $http from "axios";
export default {
  mixins: [changDragon],
  data() {
    return {
      isLoading: true,
      activityText: "",
      confirmbet: true,
      lotterData: [],
      odds: [],
      back_game: [],
      showData: [],
      active: true,
      checkData: "",
      actived: {
        plays: "传统玩法"
      }
    };
  },
  props: {},
  components: {
    vpActivity,
    vpTimer
  },
  computed: {
    LotteryLongDragon() {
      return this.$store.state.mainState.LotteryLongDragon;
    }
  },
  watch: {
    LotteryLongDragon: function(val) {
      this.lotterData = this.LotteryLongDragon.filter(
        lot => !this.back_game.includes(lot.lid)
      );
      this.changDragon();
    }
  },
  methods: {
    playsChoose(datas) {
      if (datas != "传统玩法") {
        this.dNotify("即将上线", "warn");
      }
      this.$emit("plays-say", datas);
    },
    timeout(val) {
      this.active = false;
      if (val && this.showData[val].playwayJson) {
        this.showData[val].playwayJson.forEach(play => {
          play.active = true;
          if (play.colorActive) play.colorActive = false;
        });
      }
      if (val == 0) {
        this.showData[0].playwayJson.forEach(play => {
          play.active = true;
          if (play.colorActive) play.colorActive = false;
        });
      }
      this.active = true;
    },
    review() {
      let reviewArr = [];
      this.showData.forEach((lottery, index) => {
        lottery.playwayJson.length &&
          lottery.playwayJson.forEach(play => {
            if (play.colorActive) {
              reviewArr.push(lottery);
            }
          });
      });
      this.publicReview(reviewArr);
    },
    chooseFastBet(data, index, lotindex) {
      if (data.fengpan <= 0 || data.playwayJson[index].active) return false;
      this.active = false;
      this.showData.length &&
        this.showData.forEach((lottery, index) => {
          if (index != lotindex) {
            lottery.playwayJson.length &&
              lottery.playwayJson.forEach(play => {
                play.colorActive = false;
              });
          }
        });
      data.playwayJson.length &&
        data.playwayJson.forEach((play, lotindex) => {
          if (lotindex != index) {
            play.colorActive = false;
          }
        });
      data.playwayJson[index].colorActive = !data.playwayJson[index]
        .colorActive;
      if (data.playwayJson[index].colorActive) {
        this.checkData = data;
        this.checkData.index = index;
      } else {
        this.checkData = "";
      }
      this.active = true;
      this.calculationTotal();
    },
    async lotteryLongDragon() {
      this.isLoading = true;
      let res = await getS(`lotteryLongDragon`);
      if (res && res.data && res.code == 200) {
        this.isLoading = false;
        this.lotterData = res.data.list;
        this.back_game = Object.values(res.data.back_game);
        this.changDragon();
      }
    },
    async getOddsAll() {
      let res = await $http.get(`/api/v1/lottery/getOddsAll`).then(res => {
        if (res && res.data && res.code == 200) {
          this.odds = res.data;
          this.lotteryLongDragon();
        }
      });
    },
    changDragon() {
      let isRefresh = false;
      this.lotterData.length &&
        this.lotterData.forEach((lottery, index) => {
          this.odds.forEach((odd, index) => {
            if (lottery.lid == odd.id) {
              if (typeof lottery.playwayJson == "string")
                lottery.playwayJson = JSON.parse(lottery.playwayJson);
              lottery.playwayJson.length &&
                lottery.playwayJson.forEach((play, index) => {
                  if (play.code && play.playway) {
                    play.odds = odd.data[play.playway + "_" + play.code].odds;
                  }
                });
            }
          });
        });
      this.$nextTick(() => {
        this.showData = [];
        this.lotterData.length &&
          this.lotterData.forEach((lottery, index) => {
            if (
              lottery.playwayJson &&
              typeof lottery.playwayJson == "object" &&
              lottery.playwayJson[0]["odds"] != "" &&
              lottery.playwayJson[1]["odds"] != ""
            ) {
              lottery.playwayJson.length &&
                lottery.playwayJson.forEach((play, lotIndex) => {
                  if (lottery.fengpan <= 0) {
                    lottery.playwayJson[lotIndex].active = true;
                  } else {
                    lottery.playwayJson[lotIndex].active = false;
                  }
                  if (JSON.stringify(this.checkData) != "{}") {
                    if (
                      this.checkData.code == lottery.code &&
                      this.checkData.lid == lottery.lid
                    ) {
                      if (this.checkData.index == lotIndex) {
                        play.colorActive = true;
                        isRefresh = true;
                      }
                    }
                  }
                });

              this.showData.push(lottery);
            }
          });
        if (!isRefresh) {
          this.resetAll();
        }
      });
    }
  },
  create() {},
  mounted() {
    this.getOddsAll();
  }
};
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  .cp-container-wrap {
    width: 100%;
    .lottery-header-item {
      .item {
        &.item1 {
          position: relative;
          // border-right: 1px dashed #ccc;
          text-align: center;
          padding-top: 15px;
          width: 202px;
          .lottery-logo {
            width: 100%;
            height: 100%;
          }
          &:hover {
            .hoverMaskBox {
              background-position: top left, bottom right, 0 0, 0 0;
            }
          }
          &.over {
            padding-right: 19px;
            padding-left: 19px;
          }
          .hoverMaskBox {
            position: absolute;
            width: 123px;
            height: 123px;
            background-image: url("/static/public/image/lottery/ico/button_bg.png"),
              url("/static/public/image/lottery/ico/button_bg.png");
            background-position:left, top right, 0 0, 0 0;
            -webkit-transition: background-position 1s;
            -moz-transition: background-position 1s;
            transition: background-position 1s;
          }
          .ico {
            width: 123px;
            height: 123px;
            float: left;
            &.over {
              margin-right: 20px;
            }
          }
          .logoBox {
            width: 123px;
            height: 123px;
            margin-left: 24px;
          }
        }
        &.item2 {
          position: relative;
          border-right: 1px dashed #ccc;
          width: 233px;
          padding-top: 15px;
          .text-name {
            display: flex;
            span {
              font-size: 40px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #555;
            }
          }
          .tuijian {
            height: 40px;
            display: flex;
            span {
              line-height: 44px;
              font-size: 14px;
              color: rgba(85, 85, 85, 1);
            }
            .icon {
              display: inline-block;
              margin-left: 12px;
              display: flex;
              line-height: 40px;
              align-items: center;
              li {
                width: 15px;
                height: 14.5px;
                background: url("/static/public/image/lottery/star.png");
                background-size: 100% 100%;
                margin: 3px 0 0 5px;
              }
            }
          }
          .text-lottery {
            margin-top: 20px;
            display: flex;
            img {
              width: 51px;
              height: 51px;
            }
            .name {
              margin-left: 24px;
              .lottery {
                height: 26px;
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #555;
              }
            }
            .timer {
              display: flex;
              margin-top: 7px;
              height: 26px;
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              .lotttery-iusse {
                color: #555;
              }
              .timer-wrap {
                color: #ff0101;
                margin-left: 14px;
              }
            }
            .iusse {
              margin-left: 16px;
              display: flex;
              .ball {
                height: 25px;
                line-height: 25px;
                color: #fff;
                font-size: 16px;
                text-align: center;
                border-radius: 5px;
              }
              .ball1 {
                width: 67px;
                background-color: #cacdc6;
              }
              .ball2 {
                width: 42px;
                margin-left: 10px;
                background-color: #50b65e;
              }
              .ball3 {
                width: 54px;
                margin-left: 10px;
                background-color: #ed6057;
              }
            }
          }
        }
        &.item3 {
          padding: 13px 0 21px 50px;
          .title {
            height: 24px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(41, 41, 41, 1);
          }
          .content-title {
            width: 620px;
            height: 104px;
            position: relative;
            overflow: hidden;
          }
          .content {
            color: #656565;
            font-size: 12px;
            line-height: 1.5;
            font-family: Microsoft YaHei;
            font-weight: 400;
            margin-top: 10px;
            overflow-y: scroll;
            overflow-x: hidden;
            position: absolute;
            left: 0;
            top: 0;
            right: -17px;
            bottom: 0;
          }
        }
        .explainDiv {
          display: none;
          position: absolute;
          width: 492px;
          height: auto;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 9px 0px rgba(177, 178, 195, 0.58);
          border-radius: 10px;
          top: 50px;
          right: 0;
          padding: 13px 18px;
          z-index: 3;
          p {
            line-height: 28px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
          }
          cursor: pointer;
        }
        &:hover .explainDiv {
          display: block;
        }
      }
    }
  }
}
.plays-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  .plays {
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
    display: flex;

    span {
      position: relative;
      background: #f8f8f8;
      border: 1px solid #eaeaea;
      border-right: 0;
      padding: 8px;
      cursor: pointer;
      float: left;
      white-space: nowrap;

      &.active {
        background: #fff;
        color: #fc0000;
      }

      &:first-child {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
      }

      &:nth-child(2) {
        img {
          position: absolute;
          top: -10px;
          left: 32px;
        }
      }

      &:last-child {
        border-right: 1px solid #eaeaea;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
  }
}
.cp-container-content {
  width: 100%;
  .cp-title {
    zoom: 1;
    overflow: hidden;
    height: 42px;
    border: 1px solid #dedede;
    border-left: 0;
    border-right: 0;
    background: rgba(248, 246, 246, 0.59);
    padding-left: 38px;
    box-shadow: 3px 3px 5px #ffffff inset;
    color: #4c4c4c;
    font-size: 16px;
    line-height: 42px;
    text-align: center;
    display: flex;
    .name {
      width: 72px;
    }
    .iusse {
      width: 130px;
      // margin-left: 50px;
    }
    .change {
      width: 160px;
      margin-left: 125px;
    }
    .time {
      margin-left: 71px;
    }
    .timeIusse {
      margin-left: 76px;
    }
    div:nth-child(3) {
      margin-left: 30px;
    }
  }

  .lottery-content-all-left {
    height: 960px;
    // max-height: 900px;
    width: 910px;
    float: left;
    position: relative;
    overflow: hidden;
    .all-left {
      overflow-y: scroll;
      overflow-x: hidden;
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      .content:nth-child(odd) {
        border-left: 1px solid #dedede;
      }
      .content {
        zoom: 1;
        float: left;
        width: 452px;
        overflow: hidden;
        height: 112px;
        padding: 20px 0 20px 20px;
        border-bottom: 1px solid #dedede;
        border-right: 1px solid #dedede;
        display: flex;

        .logo {
          width: 70px;
          text-align: center;
          img {
            width: 70px;
            height: 70px;
          }
        }
        .message {
          width: 200px;
          padding-left: 10px;
          .text {
            color: #666;
            font-size: 18px !important;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 20px;
          }
          .middle {
            .iusse {
              width: 100px;
              text-align: center;
              color: #555;
              font-size: 14px;
              line-height: 30px;
            }
            .timer {
              // width: 100px;
              display: inline-block;
              margin-left: 10px;
              text-align: center;
              color: #ff0101;
              font-size: 16px;
            }
          }
          .plays {
            display: flex;
            width: 230px;
            font-size: 14px;
            color: #fff;
            display: flex;
            .ball {
              height: 20px;
              line-height: 20px;
              text-align: center;
              border-radius: 5px;
            }
            .ball1 {
              width: 73px;
              display: inline-block;
              text-align: center;
              margin-right: 10px;
              background-color: #cacdc6;
            }
            .ball2 {
              width: 33px;
              display: inline-block;
              text-align: center;
              margin-right: 10px;
              background-color: #50b65e;
            }
            .ball3 {
              width: 49px;
              text-align: center;
              display: inline-block;
              background-color: #ed6057;
            }
          }
        }
        .odds {
          width: 140px;
          display: flex;
          margin-left: 10px;
          cursor: pointer;
          .odd {
            width: 65px;
            height: 65px;
            background: rgba(251, 251, 251, 1);
            border: 1px solid rgba(236, 236, 236, 1);
            border-radius: 5px;
            text-align: center;
            position: relative;
            .fenpan {
              width: 34.5px;
              height: 33.5px;
              background: url("/static/public/image/fenpan.png");
              background-size: 100% 100%;
              position: absolute;
              right: 0;
              top: 0;
            }
            &-one {
              color: #666;
              font-size: 24px;
              margin-top: 11px;
            }
            &-two {
              color: #b8b8b8;
              font-size: 14px;
              margin-top: 6px;
              line-height: 19px;
            }
          }
          .odd:nth-child(2) {
            margin-left: 10px;
          }
          .active {
            background: rgba(239, 239, 239, 1);
            cursor: default;
          }
          .colorActive {
            color: #ff5c5c !important;
          }
        }
      }
    }
  }
  .lottery-content-all-right {
    float: left;
    width: 230px;
    padding: 10px 0 0 30px;
  }
}
</style>