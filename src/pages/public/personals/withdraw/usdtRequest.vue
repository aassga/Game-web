<template>
  <div class="deposit">
    <div class="header">
      USDT提款
    </div>
    <div class="content clearfloat">
      <div class="deposit-usdtbing fl">
        <div class="list_user" @mouseenter="showBtn" @mouseleave="hideBtn">
          <span v-show="showSome" class="slidePrev">
            <Icon type="ios-arrow-left"></Icon>
          </span>
          <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in bankList" :key="index" v-model="value1">
                <div class="slide_box">
                  <div class="slide_list" :style="{backgroundImage: 'url(/static/public/image/bank/usdt.png)', backgroundSize:'cover'}">
                      <!-- <div class="mask" v-if="item.status=='no'">
                        <img src="/static/public/image/bankImg/stop.png" alt="">
                      </div>
                      <div class="title">
                        <img src="/static/public/image/bank/yhk.png" alt="">
                        <span>{{item.bankName}}</span>
                      </div> -->
                      <div class="title">
                          <span>USDT-ERC20<span>（尾号:{{item.cardNumLast}}）</span></span>
                      </div>
                      <div class="bank-kh">
                        <span>{{item.cardNum}}</span>
                      </div>
                      <div class="bank-info">
                        <span class="fl">
                          取款人：{{item.cardName}}
                        </span>
                        <span class="fr">
                          绑定时间： {{item.created_at}}
                        </span>
                      </div>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <span v-show="showSome" class="slideNext">
            <Icon type="ios-arrow-right"></Icon>
          </span>
        </div>
        <div class="pay-bankinfo">
          <div class="row">
            <label>提款金额：</label>
            <input autocomplete='off' type="text" v-model="amount" :placeholder="'可提现金额'+availableAmount+'元'"
                   onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" @blur="hanlderAmount">
            <a href="javascript:;" @click="amount =availableAmount" style="font-size:14px;color:#2d8cf0;">全额提款</a>
          </div>
          <!-- <div class="row middle" v-if="notAmount>0">
            <span>有{{notAmount}}元不可提现</span>
            <a href="javascript:;" @click="$error(unavailableReason)">查看原因</a>
          </div> -->
          <div class="row">
            <label>提款汇率：</label>
            <input type="text" :value=" bankList.length>0 ? bankList[this.$refs.mySwiper.swiper.activeIndex].usdtDepositRate:7.00"  disabled>
          </div>
          <div class="row">
            <label>货币数量：</label>
            <input type="text" v-model="bankSerialNumber" disabled>
          </div>
          <div class="row">
            <label>资金密码：</label>
            <input type="password" v-model="payPassword" maxlength="6" autocomplete='off' placeholder="请输入6位资金密码">
          </div>
          <p class="att">注意:收款地址绑定错误请及时联系客服解绑 ,提款前请务必再三确认收款地址为USDT-ERC20</p>
        </div>
       
        <div class="submit" @click="application" :class="{'active':canClick}">
          确认提交
        </div>
        <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
          {{toastText}}
        </div>
      </div>
      <div class="deposit-right fl">
        <Table :columns="columns" :data="data"
               no-data-text="<div style='line-height:453px;background:#f2f2f2;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data () {
      return {
        rate:7.00,
        showSome:false,
        value1: 0,
        bankSerialNumber:"0.00",
        bankList: [],
        imgUrl:'/static/public/image/userImg/usdt_bank.png',
        amount: '',
        availableAmount: '',
        notAmount: '',
        totalAmount: '',
        unavailableReason: '',
        payPassword: '',
        toastShow: false,
        toastNum: 430,
        toastText: '',
        columns: [{
          title: 'USDT地址',
          align: 'center',
          key: 'bankName',
          className: 'demo-table-info-column',
          render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  Number(params.row.usdt_count)>0 ? ("尾号:"+ (params.row.bankAccount.length> 6 ? params.row.bankAccount.substring(params.row.bankAccount.length-6,params.row.bankAccount.length):params.row.bankAccount)):params.row.bankName
                )
              ])
            }
        },
          {
            title: '提款金额',
            align: 'center',
            key: 'amount',
            className: 'demo-table-info-column'
          },
          {
            title: '提款时间',
            key: 'time',
            align: 'center',
            className: 'demo-table-info-column',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  this.$moment
                    .unix(params.row.time - 0)
                    .format('YYYY-MM-DD HH:mm:ss')
                )
              ])
            }
          },
          {
            title: '状态',
            align: 'center',
            key: 'status',
            className: 'demo-table-info-column',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.status == 'success' || params.row.status == 'virtualWithdrawals'?
                    '成功' :
                    false || params.row.status == 'fail' ? '失败' : '审核中'
                )
              ])
            }
          }
        ],
        data: [],
        canClick: false,
        swiperOption: {
            loop: true,
            slidesPerView: 1,
              pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.slideNext',
              prevEl: '.slidePrev'
            },
          },
        }
    },
    methods: {
      showBtn(){
        if(this.bankList.length > 1){
          this.showSome = true;
        }
      },
      hideBtn(){
        this.showSome = false;
      },
      fetchUserWithdrawAmmount () {
        this.$http
          .post(`${this.$HOST_NAME}/withdrawals/getWithdrawAmount`)
          .then(res => {
            if (res.code === 200 && res.data) {
              const {
                amount,
                notAmount,
                msg,
                totalAmount
              } = res.data
              this.availableAmount = amount.toFixed(2) //可用总额
              this.notAmount = notAmount //不可用金额
              // this.unavailableReason = msg.split('，')[1] //不可用原因
              this.unavailableReason = msg
              this.totalAmount = totalAmount //总金额
            } else {
              this.$error(res.message)
            }
          })
      },
      setList(){
          if(this.bankList.length){
            this.bankList.forEach(v => {
              v.created_at = this.$moment
                .unix(v.created_at - 0)
                .format('YYYY-MM-DD HH:mm:ss')
            })
            
          }
      },
      // 取款申请
      application () {
        if (this.canClick) {
          return false
        }
        // if(this.bankDetail.status=="no"){
        //     this.$error("该银行卡已停用")
        //     return false
        // }
        let isMoney = this.dInvalidMoney(this.amount)
        let isPwd = this.validatePwdAccount(this.payPassword)
        if (!isMoney) {
          this.toastShow = true
          this.toastNum = 356
          this.toastText = '请输入正确金额'
          return false
        }

        if (
          Number(this.amount) <
          Number(JSON.parse(localStorage.getItem('config')).limit.withdrawalsLimit)
        ) {
          this.toastShow = true
          this.toastNum = 356
          this.toastText =
            '提款金额不能小于' +
            JSON.parse(localStorage.getItem('config')).limit.withdrawalsLimit
          return false
        }

        if ((this.amount)*1 > (this.availableAmount)*1) {
          this.toastShow = true
          this.toastNum = 356
          this.toastText = '取款金额不能大于可用金额'
          return false
        }

        if (!isPwd) {
          this.toastShow = true
          this.toastNum = 490
          this.toastText = '请输入正确6位数字资金密码'
          return false
        }

        if (this.availableAmount <= 0) {
          this.$toast(this.unavailableReason)
          return false
        }

        this.toastShow = false
        this.canClick = true
        setTimeout(() => {
          this.canClick = false
        }, 3 * 1000)

        this.$http
          .post(`${this.$HOST_NAME}/member/setBalanceToLocal`)
          .then(res => {
            if (res.code == 200) {
              // this.amount = this.amount.toFixed(2)
              this.$http
                .post(`${this.$HOST_NAME}/withdrawals/application`, {
                  amount: this.amount,
                  payPassword: this.payPassword,
                  bankId: this.bankList[this.$refs.mySwiper.swiper.activeIndex].id,
                  withdrawalsType:"usdtWithdrawals"
                })
                .then(res => {
                  if (res.code == 200) {
                    this.amount=""
                    this.payPassword=''
                    this.$success('申请成功')
                    this.withdrawals()
                    this.fetchUserWithdrawAmmount()
                  } else {
                    this.$error(res.message)
                  }
                })
            }
          })
      },
      //  最近十条取款记录
      withdrawals () {
        this.$http.post(`${this.$HOST_NAME}/withdrawals/last`).then(res => {
          if (res.code == 200) {
            this.data = res.data
            this.data=this.data.filter((v)=>{return v.usdt_count&&Number(v.usdt_count)>0})
          }
        })
      },

      hanlderAmount () {
        if (this.amount.indexOf('.') != -1) {
          this.amount = this.amount.substring(0, this.amount.indexOf('.') + 3)
        }
      }
    },
    components: {
        swiper,
        swiperSlide,
    },
    created () {
      this.$nextTick(() => {
        this.bankList=this.$store.state.personal.usdtList
        if(!this.bankList.length){
           this.$error('请绑定USDT', 3000)
           this.$store.commit('showContent', {
                  parent: 'withdraw'
            })
            this.$store.commit('showNav', {
              child: 3
            })
        }
        // this.setList()
        this.withdrawals()
        this.fetchUserWithdrawAmmount()
      })
    },
    destroyed () {
      this.$store.commit('loading', false)
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
        
      },
      bankDetail () {
        return this.bankList[this.swiper.activeIndex-1]
      },
    },
    watch:{
      amount:function(val){
         this.bankSerialNumber=(this.amount/this.bankList[this.value1].usdtDepositRate).toFixed(4)
      }
    }
  }
</script>

<style lang="less" scoped>
  .deposit {
    .header {
      height: 60px;
      color: #696969;
      line-height: 85px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 1.8em;
      padding-left: 10px;
      font-weight: 400;
      margin: 0 14px;
    }
    .content {
      .deposit-usdtbing {
        width: 52%;
        .bank {
          width: 380px;
          height: 210px;
          // background: linear-gradient(90deg, #ff6d4f, #fb4f5a);
          margin: 0 auto;
          margin-top: 25px;
          // border-radius: 10px;
          border-radius: 23px;
          padding: 18px 20px;
          background-color: #11927B;
          position: relative;
           .mask{
             width: 380px;
             height: 210px;
             position: absolute;
             border-radius: 23px;
             left: 0;
             top: 0;
             background-color: rgba(0,0,0,.4);
             z-index: 1000;
             img{
               margin-top: 20px;
               margin-left: 210px;
               width: 140px;
               height: 60px;
             }
          }
          .title {
             width: 290px;
             margin-left: 62px;
             height: 28px;
             margin-top: 13px;
             overflow:hidden; 
             text-overflow:ellipsis; 
             white-space:nowrap; 
            span {
              font-size: 16px;
              color: #fff;
            }
          }
          .bank-kh {
            height: 110px;
            // line-height: 110px;
            // text-align: center;
            word-break: break-all;
            white-space: normal;
            padding-top: 28px;
            span{
              font-size: 2.6em;
              color: #fff;
              word-break: break-all;
              white-space: normal;
            }
          }
          .bank-info {
            height: 36px;
            line-height: 36px;
            span {
              display: inline-block;
              font-size: 14px;
              color: #fff;
            }
          }
        }
        .list_user{
          margin-top: 15px;
          position: relative;
          width: 534px;
          height: 236px;
          &>span{
            position: absolute;
            top: 36%;
            display: flex;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            background: #dedada;
            opacity: 0.7;
            cursor: pointer;
            outline: none;
            z-index: 99;
              i{
                display: block;
                color: #fff;
                font-size: 16px;
              }
          }
          .slidePrev{
              left: 22px;
          }
          .slideNext{
              right: 22px;
          }
          .slidePrev:hover{
            background: #a09e9e;
          }
          .slideNext:hover{
            background: #a09e9e;
          }
          .swiper-pagination-bullet-active{
            background:#ff9146;

          }
          .slide_box{
            width: 534px;
            height: 236px;
            padding: 0 77px;
            .slide_list{
                width: 380px;
                height: 210px;
                border-radius: 23px;
                padding: 18px 20px;
                padding-top: 20px;
                position: relative;
                .mask{
                  width: 380px;
                  height: 210px;
                  position: absolute;
                  border-radius: 23px;
                  left: 0;
                  top: 0;
                  background-color: rgba(0,0,0,.4);
                  z-index: 1000;
                  img{
                    margin-top: 20px;
                    margin-left: 210px;
                    width: 140px;
                    height: 60px;
                  }
                }
                .title {
                  width: 290px;
                  margin-left: 62px;
                  height: 28px;
                  margin-top: 13px;
                  overflow:hidden; 
                  text-overflow:ellipsis; 
                  white-space:nowrap; 
                  span {
                    font-size: 16px;
                    color: #fff;
                  }
                }
                .bank-kh {
                  height: 110px;
                  // line-height: 110px;
                  // text-align: center;
                  word-break: break-all;
                  white-space: normal;
                  padding-top: 28px;
                  span {
                    font-size: 2.6em;
                    color: #fff;
                    word-break: break-all;
                    white-space: normal;
                  }
                }
                .bank-info {
                  height: 36px;
                  line-height: 36px;
                  span {
                    display: inline-block;
                    font-size: 14px;
                    color: #fff;
                  }
                }
            }
          }
        }
        .att{
          width:495px;
          height:18px;
          margin: 15px auto;
          font-size:12px;
          font-family:MicrosoftYaHei;
          color:rgba(253,51,50,1);
          text-align: center;
          line-height: 18px;
        }
        .pay-bankinfo {
          border-bottom: 1px solid #f3f3f3;
          .row {
            margin-left: 78px;
            &.middle {
              width: 70%;
              font-size: 14px;
              text-align: center;
              a {
                // margin-left: 30px;
                float: right;
                // font-size:14px;
              }
            }
            margin-top: 15px;
            label {
              font-size: 15px;
              font-family: "Microsoft YaHei";
            }
            input {
              height: 38px;
              font-size: 16px;
              background: #f5f5f5;
              border: 1px solid #f5f5f5;
              border-radius: 10px;
              // padding: 0 16px;
              text-indent: 3px;
              padding-left: 10px;
              -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
              -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
              box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
              color: #666;
              margin-right: 10px;
              &:not(.other) {
                width: 242px;
                height: 38px;
                background: #f9f9f9;
              }
            }
            input:focus {
              outline: none !important;
              border: 1px solid rgba(254, 134, 93, 0.6);
              box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06), 0 1px 10px 5px rgba(254, 134, 93, 0.14);
            }
          }
          .bar {
            margin-top: 16px;
            // padding-left: 20px;
            display: flex;
            span {
              // width: 35%;
              // display: inline-block;
              font-size: 14px;
              flex: 1;
            }
            span:nth-child(2) {
              // text-align: right;
            }
          }
        }
        .submit {
          width: 140px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          color: #fff;
          font-size: 1.8em;
          background: linear-gradient(180deg, #ff3492, #ff1e4f);
          border-radius: 10px;
          margin: 20px auto;
          // display: inline-block;
          cursor: pointer;
          &.active {
            background: linear-gradient(180deg, #ccc, #eee);
            &:hover {
              cursor: not-allowed;
            }
          }
        }
        .max-bank {
          margin-left: 24px;
          font-size: 1.3em;
        }
        .toast {
          width: 200px;
          height: 30px;
          line-height: 30px;
          background: #ff9900;
          color: #fff;
          font-size: 14px;
          font-weight: 200;
          position: absolute;
          right: 410px;
          top: 30px;
          border-radius: 5px;
          z-index: 99;
          text-indent: 1em;
        }
        .toast::after {
          content: "";
          width: 0;
          height: 0;
          border-width: 4px 8px 4px 0px;
          border-style: solid;
          border-color: transparent #f90 transparent transparent;
          display: block;
          position: absolute;
          top: 10px;
          left: -8px;
        }
        .ivu-carousel-dots-inside {
          bottom: -20px;
        }
      }
      .deposit-right {
        width: 48%;
        height: 580px;
        background: #f2f2f2;
        border-radius: 0 0 15px 0;
      }
    }
  }

  .ivu-table {
    background: #f2f2f2;
  }
</style>
