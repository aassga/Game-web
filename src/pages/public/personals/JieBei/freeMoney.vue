<template>
  <div class="free-money">
    <div class="header">免息借呗</div>
    <div class="borrow-content">
      <div class="show-borrow">
        <div :class="jieBeiData.jieInfo && jieBeiData.jieInfo.overdueMsg ? 'can-borrow2' : 'can-borrow'"></div>
        <p class="returnDate2" v-if="jieBeiData.jieInfo && jieBeiData.jieInfo.overdueMsg">{{jieBeiData.jieInfo.overdueMsg}}</p>
        <div :class="jieBeiData.jieInfo && jieBeiData.jieInfo.overdueMsg ? 'money2' : 'money'">
          <p>总额度</p>
          <p>{{jieBeiData.jieInfo && jieBeiData.jieInfo.totalAmount ? jieBeiData.jieInfo.totalAmount : '0.00'}}</p>
          <p @click="checkDetail(1)" style="cursor: pointer">查看详情</p>
        </div>
        <div class="already">
          <div>
            <p>本期借款</p>
            <p>{{jieBeiData.jieInfo &&jieBeiData.jieInfo.currentLoan ? jieBeiData.jieInfo.currentLoan : '0.00'}}</p>
          </div>
          <div>
            <p>待还款</p>
            <p>{{jieBeiData.jieInfo && jieBeiData.jieInfo.alreadyUseAmount ? jieBeiData.jieInfo.alreadyUseAmount : '0.00'}}</p>
          </div>
        </div>
        <p class="returnDate" v-if="jieBeiData.jieInfo && jieBeiData.jieInfo.returnAmounDate2">{{jieBeiData.jieInfo.returnAmounDate2}}</p>
        
      </div>
      <div :class="jieBeiData.jieInfo && jieBeiData.jieInfo.overdueMsg ? 'ad2' : 'ad'" ></div>
      <div class="btn-group">
        <p @click="doBorrow('borrow')">去借款</p>
        <p @click="doBorrow('repay')">去还款</p>
      </div>
      
    </div>
    <div class="logBg" v-if="showDetail">
      <div class="detailLog">
        <p class="title">我的额度</p>
        <span class="close" @click="checkDetail(2)"><img src="/static/public/image/userImg/cl.png" width="28px"></span>
        <div class="totalMont">
          <div>
            <p>总额度</p>
            <p>{{jieBeiData.jieInfo && jieBeiData.jieInfo.totalAmount ? jieBeiData.jieInfo.totalAmount : '0.00'}}</p>
          </div>
          <div>
            <p>
              <span>本期借款</span>
              <span>{{jieBeiData.jieInfo &&jieBeiData.jieInfo.currentLoan ? jieBeiData.jieInfo.currentLoan : '0.00'}}</span>
            </p>
            <p>
              <span>待还款</span>
              <span>{{jieBeiData.jieInfo && jieBeiData.jieInfo.alreadyUseAmount ? jieBeiData.jieInfo.alreadyUseAmount : '0.00'}}</span>
            </p>
          </div>
        </div>
        <div v-if="jieBeiData.jiebeiEdu.length" class="total">
          <div class="totalMont2"  v-for="(item,i) in jieBeiData.jiebeiEdu" :key="i">
            <p>
              <span>{{item.name}}</span>
              <span>{{item.level}}级</span>
            </p>
            <p>
              <span>可借额度</span>
              <span>{{(item.edu*1).toFixed(2)}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    data () {
      return{
         jieBeiData: {},
         showDetail:false
      }
    },
    methods: {
      checkDetail(a){
        if(a == 1){
          this.showDetail = true;
        }else{
          this.showDetail = false;
        }
        
      },
      doBorrow(name){
        if(name == 'borrow'){
          this.$store.commit('showNav', { child: 1 });
        }else{
          this.$store.commit('showNav', { child: 2 });
        }
      },
      getJiebeiData() {
        this.$store
          .dispatch("game/activityJiebeiJieHuanInfo")
          .then(res => {
            if (res.code === 200)
              this.$store.commit("game/setJieBeiData", res.data);
              this.jieBeiData = res.data
          })
          .catch(() => {});
      },
    },
    created() {
       this.jieBeiData = this.$store.state.game.jieBeiData;
       this.getJiebeiData();
    },
    
  }
</script>

<style lang="less" scoped>
  .free-money{
    .header{
      height: 66px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 1.8em;
      padding-left: 10px;
      color: #696969;
      line-height: 70px;
      font-weight: 400;
      cursor: pointer;
      margin-left:14px;
    }
    .borrow-content{
      background: #fff;
      .show-borrow{
        width: 964px;
        margin: 15px auto;
        position: relative;
        .returnDate{
          position: absolute;
          top: 33px;
          left: 0;
          color: rgb(126,74,18);
          font-size: 18px;
          background: #d2a87b;
          height: 33px;
          padding: 0 18px 0 15px;
          line-height: 33px;
          border-radius: 0px 25px 25px 0px;
        }
        .returnDate2{
          position: absolute;
          top: 17px;
          left: 0;
          font-size: 16px;
          color: #ff0000;
          background: rgba(241, 218, 194, 0.2);;
          width: 100%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          img{
            position: absolute;
            left: 342px;
            top: 2px
          }
        }
        .money2{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          transform: translate(-50%, -50%);
          p{
            color: #FFFFFF;
            font-size: 20px;
            width: 100%;
            text-align: center;
            line-height: 43px;
            &:nth-child(2){
              font-size: 45px;
              padding-bottom: 15px;
              padding-top: 6;
            }
            &:last-child{
              width: 137px;
              height: 35px;
              line-height: 35px;
              border-radius: 19px;
              color: #fff;
              font-size: 16px;
              background: rgb(255,73,109);
              margin: auto;
            }
          }
        }
        .money{
          position: absolute;
          top: 40%;
          left: 50%;
          width: 200px;
          transform: translate(-50%, -50%);
          p{
            color: #FFFFFF;
            font-size: 20px;
            width: 100%;
            text-align: center;
            line-height: 45px;
            &:nth-child(2){
              font-size: 45px;
              padding-bottom: 12px;
              padding-top: 6;
            }
            &:last-child{
              width: 137px;
              height: 35px;
              line-height: 35px;
              border-radius: 19px;
              color: #fff;
              font-size: 18px;
              background: rgb(255,73,109);
              margin: auto;
            }
          }
        }
        .already{
          position: absolute;
          bottom: -38px;
          left: 45px;
          width: 875px;
          height: 80px;
          background: #fff;
          border-radius: 10px;
          display: flex;
          flex-wrap: nowrap;
          padding: 10px;
          border: 1px solid #ffe7ca;
          div{
            width: 50%;
            &:last-child{
              border-left: 1px solid #ffe7ca;
            }
            p{
              color: rgb(220,176,138);
              font-size: 18px;
              text-align: center;
              line-height: 30px;
              &:last-child{
                color: #000;
                font-size: 22px;
              }
            }
          }
        }
      }
      .can-borrow{
        height: 220px;
        width: 964px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('/static/public/image/userImg/br_bg.png');
      }
      .can-borrow2{
        height: 250px;
        width: 964px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('/static/public/image/userImg/br_bg.png');
      }
      .ad2{
        width:875px;
        height:165px;
        background-image: url('/static/public/image/userImg/br_bg3.png');
        background-size: 100%;
        background-repeat: no-repeat;
        border-radius:10px;
        margin: 30px auto;
      }
      .ad{
        width:875px;
        height:165px;
        background-image: url('/static/public/image/userImg/br_bg3.png');
        background-size: 100%;
        background-repeat: no-repeat;
        border-radius:10px;
        margin: 42px auto;
      }
      .btn-group{
        display: flex;
        flex-wrap: nowrap;
        width: 875px;
        margin: 0 auto;
        cursor: pointer;
        padding-bottom: 123px;
        p{
          width:398px;
          height:60px;
          font-size: 22px;
          color: #fff;
          background:#ff4b6c;
          border-radius:10px;
          line-height: 60px;
          text-align: center;
          &:last-child{
            background:#d4a982;
            margin-left: 80px;
          }
        }
      }
    }
    .logBg{
      width: 100%;
      height: 100%;
      background: rgba(128, 109, 109, 0.3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .detailLog{
      width: 438px;
      height: auto;
      background: rgba(250, 240, 226,0.9);;
      border-radius: 15px;
      border: 1px solid #eeb981;
      position: absolute;
      top: 50%;
      left: 60%;
      transform: translate(-50%, -50%);
      padding-bottom: 30px;
      .close{
        position: absolute;
        top: 12px;
        right: 12px;
        cursor: pointer;
      }
      .title{
        width: 100%;
        text-align: center;
        height: 60px;
        line-height: 60px;
        color: rgb(158,104,55);
        font-size: 17px;
      }
      .total{
         max-height: 215px;
         overflow-y: auto;
      }
      .totalMont2{
        background: #fef5e9
        
      }
      .totalMont2,.totalMont3{
        width: 390px;
        height: 60px;
        margin: 15px auto;
        border:1px solid rgba(220,220,220,1);
        border-radius:10px;
        display: flex;
        flex-wrap: nowrap;
        padding: 10px;
        p{
          width: 50%;
          line-height: 20px;
          span{
            display: block;
            color: #000;
            font-size: 14px;
          }
          &:last-child{
            text-align: right;
          }
        }
      }
      .totalMont{
        width: 390px;
        height: 148px;
        margin: auto;
        border-radius: 15px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('/static/public/image/userImg/log_bg.png');
        div:first-child{
          padding: 10px;
          p{
            color: rgb(158,104,55);
            font-size: 16px;
            line-height: 30px;
            &:last-child{
              font-size: 24px;
              color: #fff;
            }
          }
        }
        div:last-child{
          display: flex;
          flex-wrap: nowrap;
          padding: 10px;
          p{
            width: 50%;
            line-height: 20px;
            &:last-child{
              text-align: right;
            }
            span{
              display: block;
              color: rgb(158,104,55);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
