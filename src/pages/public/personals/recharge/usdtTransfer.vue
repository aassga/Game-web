<template>
  <div>
    <div class="on-line" v-if="usdtData.length">
      <div class="header">
        <div class="title">
          <span>
            <img :src="usdtImg" />
          </span>
          <span>{{className}}</span>
        </div>
      </div>
      <div class="payment">
       <div class="title">
          <ul>
            <li v-for="(item,i) in usdtData" :key="i">
              <span :class="{spanActive:spanActive ==i}" @click="toggle(i,item)">充值通道{{i+1}}</span>
            </li>
          </ul>
        </div>
      </div>
       <div class="transfer_usdt">
        <p class="usdt_Title">温馨提示：使用数字货币存取款，避免银行流水过大被风控，大额娱乐首选！</p>
        <div class="step">
          <div class="usdt_first_step">
            <div class="step_head">
              <span>第一步</span>
              <span> <i>充值地址：</i> <i>{{usdtData[spanActive].address}}</i> <i @click="onCopy(usdtData[spanActive].address)" style="cursor:pointer;">复制</i></span>
            </div>
            <div class="step_content">
              <p>USDT-ERC20收款码</p>
              <div>
                <!-- <img src="/static/public/image/userImg/usdt_code.png"> -->
                <span class="loadCode">
                  <div class="qr">
                     <img :src="usdtData[spanActive].qrCodeImg" class="qrcode" style="width:154px;height:154px">
                  </div>
                </span>
              </div>
              <div>请使用app扫描付款</div>
              <div style="cursor:pointer;" @click="openUsdt">查看USDT转账教程>></div>
            </div>
          </div>
          <div><img src="/static/public/image/userImg/next_step.png" ></div>
          <div class="usdt_second_step">
            <div class="step_head">
              <span>第二步</span>
            </div>
            <div class="step_content">
              <div>
                <span>货币数量: </span>
                <input v-model="usdtParames.min_amount" type="text" :placeholder="'最小充值数量'+usdtData[spanActive].min_usdt_count"  @keyup="clearNoNum()" maxlength="12">
              </div>
              <div>
                <span>区块链交易ID: </span>
                <input v-model="usdtParames.usdtId" type="text" placeholder="请输入后六位" maxlength="6">
              </div>
              <div>
                <span>存款汇率: </span>
                <input  type="text" :value="usdtData[spanActive].usdtDepositRate" disabled>
              </div>
              <div>
                <span>转账金额: </span>
                <input v-model="usdtParames.usdtMoney" type="text" placeholder="转账金额" disabled>
              </div>
              <div class="bar" v-if="discountList.length > 0">
                <span class="text">优惠比例:</span>
                <Select class="bank2" v-model="discountVal" :disabled="discountList.length == 1">
                  <Option :value="i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]" v-for="(i,j) in discountList" :key="j">{{i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]}}% (存款{{i.multiple}}倍打码)</Option>
                </Select>
              </div>
              <div>
                <div class="submitPay" @click="submitBnk" :class="{'actives':!canClick}" >
                    确认提交
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-pay-tongdao">
      <img src="/static/public/image/userImg/no-pay-tongdao.png" alt />
    </div>
     <realModal ref="realModal" @payMoney="payMoney"></realModal>
  </div>
</template>
<script>
import store from '@/vuex/store'
import realModal from './realNameModal'
export default {
  data () {
    return {
      usdtImg: '/static/public/image/userImg/usdt.png',
      canClick: true,
      spanActive: 0,
      usdtParames: {
        min_amount: '',
        usdtId: '',
        usdtMoney: ''
      },
      discountList: [],
      discountVal: ''
    }
  },
  methods: {
    payMoney () {
      this.sendMony()
    },
    getDisCountData () {
      this.$http.post(`${this.$HOST_NAME}/deposit/getDepositBonusList `, { depositType: 'usdt' }).then(res => {
        if (res.code == 200 && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].val = i;
            res.data[i].bonusRate = res.data[i].bonusRate.toString();
          }
          this.discountList = res.data
          this.discountVal = res.data[0].bonusRate.indexOf('_') === -1 ? res.data[0].bonusRate : res.data[0].bonusRate.split('_')[1]
        }
      })
    },
    clearNoNum () {
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace(/[\u4e00-\u9fa5]+/g, '') // 验证非汉字
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace(/^\./g, '') // 验证第一个字符是数字而不是
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 只保留第一个小数点, 清除多余的
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3') // 只能输入6个小数
      this.usdtParames.min_amount = this.usdtParames.min_amount.replace(/^\D*(\d{0,7}(?:\.\d{0,4})?).*$/g, '$1')
    },
    openUsdt () {
      window.open('/static/public/active/hb/index.html')
    },
    submitBnk () {
      if (!this.canClick) {
        return false
      }
      this.canClick = false
      setTimeout(() => {
        this.canClick = true
      }, 3 * 1000)

      if (!this.usdtParames.min_amount) {
        this.$error('请输入货币数量')
        return false
      }
      if (Number(this.usdtParames.min_amount) < Number(this.usdtData[this.spanActive].min_usdt_count)) {
        this.$error('最小充值数量' + this.usdtData[this.spanActive].min_usdt_count)
        return false
      }
      if (!this.usdtParames.usdtId) {
        this.$error('请输入区块链交易ID')
        return false
      }
      if (this.usdtParames.usdtId.length < 6) {
        this.$error('请输入正确的区块链交易ID')
        return false
      }
      if (!JSON.parse(localStorage.userinfo).realName) {
        this.$refs.realModal.ifmodel = true
        return false
      }
      this.sendMony()
    },
    sendMony () {
      let data = {
        device: 'pc',
        depositId: this.usdtData[this.spanActive].id,
        classId: this.usdtData[this.spanActive].classId,
        className: this.usdtData[this.spanActive].className,
        bankId: this.usdtData[this.spanActive].address,
        bankSerialNumber: this.usdtParames.usdtId,
        amount: this.usdtParames.usdtMoney,
        usdt_count: this.usdtParames.min_amount,
        bonusRate: this.discountVal
      }
      if(data.bonusRate=="") delete data.bonusRate;
      this.$http.post(`${this.$HOST_NAME}/deposit/usdtDeposit`, data).then(res => {
        if (res.code == 200) {
          this.$success(res.data)
          this.usdtParames.min_amount = ''
          this.usdtParames.usdtId = ''
          this.usdtParames.usdtMoney = ''
        } else {
          this.$error(res.message)
        }
      })
    },
    toggle (i, item) {
      this.spanActive = i
      this.usdtParames.min_amount = ''
      this.usdtParames.usdtId = ''
      this.usdtParames.usdtMoney = ''
    },
    onCopy (text) {
      this.$copyText(text.replace(/\s*/g, '')).then(() => {
        this.$success('复制成功')
      })
    }
  },
  mounted () {
    this.getDisCountData()
  },
  computed: {
    className () {
      return this.$store.state.personal.itemDatas.className
    },
    usdtData () {
      return this.$store.state.personal.usdtData
    }
  },
  components: {
    realModal
  },
  watch: {
    'usdtParames.min_amount': function (val) {
      this.usdtParames.usdtMoney = this.usdtParames.min_amount * this.usdtData[this.spanActive].usdtDepositRate
    }
  },
  store
}
</script>>
<style lang="less" scoped>
.on-line {
  padding: 0 14px;
  height: 100%;
  width: 100%;
  position: relative;
  // border-bottom: 1px solid rgba(246, 246, 246, 1);

  .header {
    height: 70px;
    padding-top: 15px;

    .title {
      padding-left: 30px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;

      img {
        width: 26px;
        vertical-align: middle;
      }

      span {
        font-size: 16px;
        vertical-align: middle;
        padding-left: 5px;
        border-right: 1px solid #dbdbdb;
        padding-right: 10px;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .payment{
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 14px;
        height: 100px;
       .title {
        // height: 66px;
        padding-left: 150px;
        padding-top: 10px;
        min-height: 66px;
        height: auto;
        display: inline-block;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 10px;
        width: 95%;
        ul {
          li {
            font-size: 16px;
            font-weight: 200;
            width: 125px;
            height: 40px;
            float: left;
            line-height: 40px;
            text-align: center;

            span {
              padding: 8px 20px;
              cursor: pointer;
            }

            .spanActive {
              background: linear-gradient(180deg, #fe8983, #f0b761);
              border-radius: 10px;
              color: #fff;
            }
          }
        }
      }
  }
   .transfer_usdt{
      .step{
        display: flex;
        flex-wrap: nowrap;
        margin:15px auto;
        width: 942px;
        >div{
          width: 45%;
          margin-left: 21px;
          &:nth-child(2){
            width:10%;
            text-align: center;
            line-height: 40;
            img{
              width: 33px;
            }
          }
        }
        .usdt_second_step{
          .step_head{
            span{
              display: inline-block;
              height: 60px;
              line-height: 60px;
              color: #545454;
              font-size: 14px;
              &:first-child{
                font-size: 20px;
                color: #888888;
                margin-left: 42px;
              }
            }
          }
          .step_content{
            margin-top: -15px;
            .discountSelect{
              .selectOp{
                width: 260px;
                outline: none;
                border-color: transparent;
                background: #f5f5f5;
                margin-left: 13px;
                height: 38px;
                border-radius: 10px;
                font-size: 15px;
              }
            }
            /deep/.bank2{
              // .ivu-select-single .ivu-select-selection{
                width: 263px;
                margin-top: 0;
                margin-left: 10px;
              // }
              /deep/.ivu-select-selection{
                width: 263px;
              }
            }
            div{

              display: flex;
              flex-wrap: nowrap;
              margin-top: 20px;
              position: relative;
              span{
                display: inline-block;
                width:110px;
                color: #696969;
                font-size: 16px;
                margin-top: 12px;
                text-align: right;
              }
              input{
                border: none;
                outline: none;
                width:262px;
                height:38px;
                background:rgba(245,245,245,1);
                border-radius:10px;
                padding-left: 10px;
                font-size: 15px;
                margin-left: 12px;
              }
              .submitPay {
                border-top: 1px solid #f3f3f3;
                width: 140px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                color: #fff;
                font-size: 1.8em;
                background:linear-gradient(0deg,rgba(255,31,83,1) 0%,rgba(255,34,136,1) 100%);
                border-radius: 10px;
                margin-top: 20px;
                display: inline-block;
                cursor: pointer;
                margin: 20px auto;
                &.actives {
                  background: linear-gradient(180deg, #ccc, #eee);

                  &:hover {
                    cursor: not-allowed;
                  }
                }
              }
              i{
                display: inline-block;
                width: 40px;
                height: 30px;
                background: #ff9900;
                border-radius: 6px;
                color: #fff;
                position: absolute;
                right: 120px;
                top: 4px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
              }
            }
          }
        }
        .usdt_first_step{
          .step_head{
            span{
              display: inline-block;
              height: 60px;
              line-height: 60px;
              color: #545454;
              font-size: 14px;
              &:first-child{
                font-size: 20px;
                color: #888888;
              }
              &:nth-child(2){
                display: flex;
                flex-wrap: nowrap;
                color: #545454;
                i{
                  display: inline-block;
                  height: 38px;
                  line-height: 38px;
                  width: 70px;
                  &:nth-child(2){
                    width: 253px;
                    border-radius:10px;
                    background:rgba(249,249,249,1);
                    border:1px solid rgba(245,245,245,1);
                    text-align: center;
                    overflow: hidden;
                  }
                  &:last-child{
                    width:56px;
                    background:rgba(253,153,38,1);
                    color:#fff;
                    text-align: center;
                    border-radius:10px;
                    margin-left: 20px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
          .step_content{
            text-align: center;
            p{
              height:24px;
              text-align: center;
              font-size:18px;
              font-family:MicrosoftYaHei;
              color:#343434;
            }
            div{
              &:first-child{
                height: 199px;
              }
              &:nth-child(2){
                height:199px;
                background:rgba(255,255,255,1);
                border-radius:5px;
                color: #545454;
                font-size: 16px;
                text-align:center ;
                margin-bottom: 8px;
                position: relative;
                .loadCode{
                  display: inline-block;
                  width: 202px;
                  height: 199px;
                  background: url('/static/public/image/userImg/usdt_code.png') no-repeat;
                  background-size: cover;
                }
                img{
                  width:202px;
                }
                .qr{
                   width: 154px;
                   height: 154px;
                   margin: 25px auto;
                   overflow: hidden;
                }
                .qrcode{
                   width: 154px;
                   height: 154px;
                   display: block;
                  //  margin: 25px auto;
                  //  position: absolute;
                  //  left: 124px;
                  //  top:25px;
                }
              }
              &:nth-child(3){
                width:180px;
                height:35px;
                line-height: 35px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(230,230,230,1);
                border-radius:5px;
                color: #545454;
                font-size: 16px;
                text-align:center;
                margin: 0 auto;
                img{
                  width:202px;
                }
              }
              &:last-child{
                height:19px;
                font-size:14px;
                font-family:MicrosoftYaHei;
                line-height:19px;
                color:rgba(31,140,232,1);
                font-size: 14px;
                margin: 13px 0 8px 0;
              }
            }
            img{
              width:202px;
            }
          }
        }
      }
      .usdt_Title{
        width:942px;
        height:40px;
        background:rgba(249,249,249,1);
        border:1px solid rgba(219,219,219,1);
        opacity:1;
        border-radius:5px;
        color: #FD3332;
        font-size: 14px;
        line-height: 40px;
        padding-left: 30px;
        margin: 0 auto;
        margin-top: 20px;
      }

    }

 }

 .no-pay-tongdao {
    img {
      display: block;
      margin: 200px auto;
    }
  }
</style>
