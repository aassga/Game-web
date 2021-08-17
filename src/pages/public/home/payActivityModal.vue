<template>
  <div class="filter" v-if="$store.state.personal.showRechargeChannel">
  <div :class="['content',$store.state.personal.rechargeChannelTrue ? 'true' : 'false']">
    <img src="/static/public/image/paycheck/close.png" class="close-btn" @click="hide">
    <div v-if="$store.state.personal.rechargeChannelTrue" class="massage">
      <div class="tit">——更换通道可领取——</div>
      <div class="money-box"><span class="money">{{$store.state.personal.rechargeChannelMoney}}</span>元</div>
      <p>很抱歉！当前支付通道不稳定</p>
      <p style="margin-top:20px">请更换至其他稳定通道</p>
    </div>
    <div v-else class="massage">
      <p>很抱歉！</p>
      <p>当前支付通道不稳定</p>
      <p>请更换至其他稳定通道</p>
    </div>
    <img class="btn" src="/static/public/image/paycheck/flbtn.png" @click="changeHandle"/>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods:{
     hide(){
        this.$store.commit('setShowRechargeChannel', false);
     },
     changeHandle(){
      let bankInfo = this.$store.state.personal.itemDatas
      if(this.$store.state.personal.showRechargeChannel){
        this.$store.dispatch('game/payActivityGet', {id: bankInfo.id,device: 'pc' }).then(res=>{
          if (res.code === 200) {
            if(res.data.code === 200) {
              this.$errorAlert('领取成功', "warn")
            }else {
              this.$errorAlert(res.data.msg,'warn')
            }
              setTimeout(()=>{
                this.checkHandle(bankInfo)
              },1500)
          } else {
              this.$errorAlert(res.message,'warn')
              setTimeout(()=>{
                this.checkHandle(bankInfo)
              },1500)
          }
        })
      }else{
         this.checkHandle(bankInfo)
      }
     },
     checkHandle(bankInfo){
        let bankList = this.$store.state.personal.paymentAll
        let bankIdList = []
        let channelIdList = [bankInfo.jump1,bankInfo.jump2,bankInfo.jump3]
        bankList.forEach(item => {
          bankIdList.push(item.id)
        });
        let channelList = channelIdList.filter((x)=>{
          return bankIdList.includes(x) 
        }) 
        if(channelList.length) {
          this.$emit('refreshList',channelList);
          this.hide()
        }else {
          this.hide()
          this.$errorAlert('当前暂无可跳转通道', "warn")
        }
     }
  },
}
</script>>
<style type="text/css" lang="less" scoped>
  .filter{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1600;
  .content{
    width: 846px;
    height: 636px;
    top: 50%;
    left: 50%;
    position: relative;
    transform: translate(-50%, -50%);
    .close-btn {
        position: absolute;
        top: 89px;
        right: 95px;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    &.true {
    background-image: url("/static/public/image/paycheck/flpay.png");
    background-size: 100% 100%;
    .massage {
      font-family:PingFang SC;
      position: absolute;
      top: 232px;
      left: 266px;
      width: 400px;
      height: 250px;
      color: #FFED85;
      .tit {
        font-size: 24px;
        text-align: center;
        margin-top: 3px;
      }
      .money-box {
        font-size: 26px;
        text-align: center;
        margin: 20px 0;
        .money {
          font-size: 50px;
          color: #FFF7CD;
          padding-right: 20px;
        }
      }
      p {
         font-size: 30px;
         text-align: center;
        }
      }
    }
    &.false{
        background-image: url("/static/public/image/paycheck/pay.png");
        background-size: 100% 100%;
        .massage{
            font-family:PingFang SC;
            position: absolute;
            top: 232px;
            left: 266px;
            width: 400px;
            height: 250px;
            color: #FFED85;
            padding: 30px;
        }
        p{
          text-align: center;
          font-size: 30px;
          margin-top: 20px;
        }
    }
    .btn {
        position: absolute;
        left: 315px;
        bottom: 36px;
        width: 260px;
        height: 80px;
        cursor: pointer;
    }
   }
  }
</style>