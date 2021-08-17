<template>
  <div class="free-money">
    <div class="header">我要借款</div>
    <div class="borrow-content">
      <div class="borrow-input">
        <p>可申请额度 ：<span  style="color:red" v-if="jieBeiData.huanInfo">{{borrowData['limit']}}</span>元</p>
        <span>¥</span><input type="text" maxlength="7" :placeholder="borrowData['text']" v-model="money"><span> <span @click="money = borrowData['allMoney']" style="cursor: pointer">全部</span></span>
      </div>
      <div class="confirm"><button  @click="submit" style="cursor: pointer">去借款</button></div>
      <div class="day">最后还款日:{{jieBeiData.jieInfo && jieBeiData.jieInfo.returnAmounDate ? jieBeiData.jieInfo.returnAmounDate : ''}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return{
         money: "",
         jieBeiData: {},
         submitting: false,
      }
    },
    methods: {
      submit() {
      if (!this.money) {
        this.$error("请输入金额");
      } else if (!parseFloat(this.money)) {
        this.$error('请输入正确的金额')
      }else if (this.jieBeiData.huanInfo.qiankuan > 1) {
        this.$error('请先还清欠款再来借款')
      }else if ((parseFloat(this.money) > this.jieBeiData.jieInfo.allowAmount && this.jieBeiData.jieInfo.allowAmount < 1)) {
        this.$error('暂无可借额度')
      } else if ((parseFloat(this.money) > this.jieBeiData.jieInfo.allowAmount)) {
        this.$error('借款金额大于可借额度')
      } else {
        this.submitting = true;
        this.$store
          .dispatch(`game/activityJiebeiJie`, {
            amount: parseFloat(this.money),
          })
          .then(res => {
            setTimeout(()=>{
              this.submitting = false;
            },5000);
            if (res.code === 200) {
              this.$success("借款成功")
              this.$nextTick(() => {
                this.getJiebeiData()
              })
              this.money = "";
              this.getbanlance()
            } else {
              this.$error(res.message);
            }
          })
          .catch(() => {
            this.submitting = false;
          });
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
      getbanlance(){
          this.$getS(`/member/balance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo);
            userinfo.balance = res.data.member;
            userinfo.agent = res.data.agency;
            this.$store.commit("mainState/reloadUserinfo", userinfo);
          }
        });
      }
    },
    created() {
      this.jieBeiData = this.$store.state.game.jieBeiData;
      this.getJiebeiData();
    },
    computed: {
    borrowData() {
      if(this.jieBeiData.huanInfo && this.jieBeiData.jieInfo) {
        if(Number(this.jieBeiData.huanInfo.qiankuan) > 0) {
          return {
            limit : '0.00',
            text :  `当前欠款${(this.jieBeiData.huanInfo.qiankuan*1).toFixed(2)}元`,
            allMoney: 0,
          }
        }else {
          let text = ''
          let applyMoney = Number(this.jieBeiData.jieInfo.allowAmount)
          if(applyMoney > 10) {
            text = `10.00~${this.jieBeiData.jieInfo.allowAmount}元`
          }else if(applyMoney === 10) {
            text = '可申请10.00元'
          }else if(applyMoney > 0) {
            text = '最低10.00元起'
          }else if(applyMoney === 0) {
            text = '可申请0.00元'
          }
          return {
            limit : this.jieBeiData.jieInfo.allowAmount,
            text :  text,
            allMoney: Number(this.jieBeiData.jieInfo.allowAmount).toFixed(2),
          }
        }
      }
    },
    
  }
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
      padding-top: 20px;
      .borrow-input{
        width:960px;
        height:120px;
        background:#eee;
        border-radius:10px;
        margin: auto;
        p{
          color: #000;
          font-size: 17px;
          padding-left: 25px;
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #fff;
        }
        >span{
          font-size: 24px;
          display: inline-block;
          width: 65px;
          text-align: center;
          height: 60px;
          line-height: 60px;
          color: #000;
          &:last-child{
            font-size: 17px;
            color: rgb(255,73,109);
          }
        }
        input{
          height: 35px;
          width: 830px;
          border: none;
          background: #eee;
          font-size: 16px;
          outline: none;
          text-indent: 8px;
          position: relative;
          top: -3px;
          left: -10px;
        }
      }
      .day{
        text-align: center;
        color: #BCBCBC;
        font-size: 16px;
        margin: 15px 34px 15px 0;
      }
      .confirm{
        width:398px;
        margin: 0 auto;
        padding-top: 40px;
        button{
          width:398px;
          height:60px;
          background:#ff4b6c;
          border-radius:10px;
          color: #F5F5F5;
          line-height: 60px;
          text-align: center;
          outline: none;
          border: none;
          font-size: 22px;
        }
      }
    }
  }
</style>
