<template>
  <div class="filter" v-if="$store.state.personal.paymentModal">
    <div class="content">
      <div class="massage">
        <p>支付已超额最大额度<span>{{$store.state.personal.paymentModalData.dailyAmount}}元</span></p>
        <p>大额推荐银行转帐加送<span>{{$store.state.personal.paymentModalData.bankRate}}%</span></p>
      </div>
      <div class="btn">
        <div @click="changePayment"><img :src="$store.state.personal.paymentModalData.bal_amount<=0 ?'/static/public/image/paycheck/cance.png':'/static/public/image/paycheck/paybtn1.png'" alt=""></div>
        <div @click="changeInternet"><img src="/static/public/image/paycheck/paybtn2.png" alt=""></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    changePayment() {
      this.$store.commit('paymentModal', false);
    },
    changeInternet() {
      this.$store.commit('paymentModal', false);
      this.$emit('refreshModal');
    }
  },
};
</script>>
<style type="text/css" lang="less" scoped>
.filter {
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
  .content {
    width: 352px;
    height: 367.5px;
    top: 50%;
    left: 50%;
    position: relative;
    transform: translate(-50%, -50%);
    background-image: url("/static/public/image/paycheck/payment.png");
    background-size: 100% 100%;
    .massage {
      font-family: PingFang SC;
      position: absolute;
      top: 165px;
      width: 352px;
      color: #fff;
      font-size: 23px;
      p {
        text-align: center;
        span {
          color: #fff600;
          font-size: 28px;
        }
      }
      p:nth-child(2) {
        margin-top: 20px;
      }
    }
    .btn {
      position: absolute;
      width: 352px;
      height: 39px;
      display: flex;
      bottom: 22px;
      left: 0;
      div {
        width: 156px;
        height: 39px;
        cursor: pointer;
      }
      div:nth-child(1) {
        // background-image: url("/static/public/image/paycheck/paybtn1.png");
        background-size: 100% 100%;
        margin: 0 8px 0 15px;
      }
      div:nth-child(2) {
        // background-image: url("/static/public/image/paycheck/paybtn2.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>