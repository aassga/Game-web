<template>
  <div class="free-money">
    <div class="header">我要还款</div>
    <div class="borrow-content">
      <div class="borrow-input">
        <p>帐号余额 ：<span>{{userinfo.balance}}</span>元</p> 
        <p>欠款金额 ：<span>{{jieBeiData.huanInfo && jieBeiData.huanInfo.qiankuan ? (jieBeiData.huanInfo.qiankuan*1).toFixed(2) : '0.00'}}</span>元</p>
        <span>¥</span><input type="text" maxlength="7" :placeholder="refundData['text']" v-model="money"><span><span @click="money = refundData['allMoney']" style="cursor: pointer">全部</span></span>
      </div>
      <div class="confirm"><button style="cursor: pointer"  @click="submit" >确认还款</button></div>
      <div class="day">请保证帐户余额资金足够还款</div>
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
      async setBalanceToLocal() {
        if (!localStorage.token) {
          return false;
        }
        let res = await this.$http.post(
          `${this.$HOST_NAME}/member/setBalanceToLocal`,
          {}
        );
        if (res && res.code == 200) {
          this.getJiebeiData();
        } else {
        }
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
      },
      submit() {
         if (!this.money) {
          this.$error("请输入金额");
        }else if(this.jieBeiData.huanInfo.qiankuan <= 0){
          this.$error("暂无欠款金额");
        }else if (!parseFloat(this.money)) {
          this.$error('请输入正确的金额')
        } else if ((parseFloat(this.money) > this.userinfo.balance)) {
          this.$error('超出余额，请重新输入')
        } else if ((parseFloat(this.money) > this.jieBeiData.huanInfo.qiankuan)) {
          this.$error('超出欠款，最多需还'+ this.jieBeiData.huanInfo.qiankuan+'元')
        } else if (parseFloat(this.money) < 0) {
          this.$error('金额不能小于0元')
        } else {
          this.submitting = true;
          this.$store
            .dispatch(`game/activityJiebeiHuan`, {
              amount: parseFloat(this.money),
            })
            .then(res => {
              setTimeout(()=>{
                this.submitting = false;
              },5000);
              if (res.code === 200) {
                this.$success("还款成功")
                this.getbanlance()
                this.$nextTick(() => {
                  this.getJiebeiData()
                })
                this.money = "";
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
  
    },
    created() {
      this.jieBeiData = this.$store.state.game.jieBeiData;
      
      this.setBalanceToLocal()
    },
    computed: {
    refundData() {
      if(this.jieBeiData.huanInfo) {
        let text = ''
        let applyMoney = Number(this.jieBeiData.huanInfo.zuiduokehuan)
        if(applyMoney === 0) {
          text = '暂无欠款'
        }else if(applyMoney > 0) {
          text = `可还款${(this.jieBeiData.huanInfo.zuiduokehuan*1).toFixed(2)}元`
        }
        return {
          text :  text,
          allMoney: Number(this.jieBeiData.huanInfo.zuiduokehuan).toFixed(2),
        }
      }
    },
    userinfo() {
      return this.$store.state.mainState.userinfo;
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
        height:180px;
        background:#eee;
        border-radius:10px;
        margin: auto;
        p{
          color: #000;
          font-size: 17px;
          height: 60px;
          line-height: 60px;
          padding-left: 25px;
          border-bottom: 1px solid #fff;
          span{
            font-size: 17px;
            color:#FF0000;
          }
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
