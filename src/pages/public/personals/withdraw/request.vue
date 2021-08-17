<template>
  <div class="deposit" v-if="this.bankList.length">
    <div class="header">
      提款申请
    </div>
    <div class="content clearfloat">

      <div class="deposit-left fl">

        <!-- <Carousel v-model="value1" loop radius-dot @on-change="hanlderCarousel"  :arrow="bankList.length >1 ? 'hover':'never'">
          <CarouselItem v-for="(item,i) in bankList" :key="i" :style="{width:534+'px'}">
            <div class="bank" :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'cover'}">
               <div class="mask" v-if="item.status=='no'">
                   <img src="/static/public/image/bankImg/stop.png" alt="">
              </div>
              <div class="title">
                <img src="/static/public/image/bank/yhk.png" alt="">
                <span>{{item.bankName}}</span>
              </div>

              <div class="bank-kh">
                <p>{{item.cardNum}}</p>
              </div>
              <div class="bank-info">
                <span class="fl">取款人：{{item.cardName}}</span>

                <span class="fr">
                  绑定时间： {{item.created_at}}
                </span>
              </div>
            </div>
          </CarouselItem>
        </Carousel> -->
        <div class="list_user" @mouseenter="showBtn" @mouseleave="hideBtn">
          <span v-show="showSome" class="slidePrev">
            <Icon type="ios-arrow-left"></Icon>
          </span>
          <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in bankList" :key="index" v-model="value1">
                <div class="slide_box">
                  <div class="slide_list" :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'cover'}">
                      <div class="mask" v-if="item.status=='no'">
                        <img src="/static/public/image/bankImg/stop.png" alt="">
                      </div>
                      <div class="title">
                        <img src="/static/public/image/bank/yhk.png" alt="">
                        <span>{{item.bankName}}</span>
                      </div>
                      <div class="bank-kh">
                        <p>{{item.cardNum}}</p>
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
          <!-- <div class="bar">
              <span>持卡人：{{bankDetail.cardName}}</span>
            </div>
            <div class="bar">
              <span>省/市：{{bankDetail.cardAddress}}</span>
            </div>
            <div class="bar">
              <span>开户行：{{bankDetail.bankName}}</span>
            </div>
            <div class="bar">
              <span>支行：{{bankDetail.bankName}}</span>
            </div> -->

          <div class="row">
            <label>提款金额：</label>
            <input autocomplete='off' type="text" v-model="amount" :placeholder="'可提现金额'+availableAmount+'元'"
                   onkeyup="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" @blur="hanlderAmount">
            <a href="javascript:;" @click="amount =availableAmount" style="font-size:14px;color:#2d8cf0;">全额提款</a>
          </div>
          <div class="row middle" v-if="notAmount>0">
            <!-- <span>有{{notAmount}}元不可提现</span> -->
            <span v-html="relMsg"></span>
            <!-- <a href="javascript:;" @click="$error(unavailableReason)">查看原因</a> -->
          </div>
          <div class="row">
            <label>资金密码：</label>
            <input type="password" v-model="payPassword" maxlength="6" autocomplete='off'>
          </div>
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
        showSome:false,
        value1: 0,
        bankList: [],
        bankData: [
          '工商银行',
          '农业银行',
          '建设银行',
          '招商银行',
          '中国银行',
          '浦发银行',
          '中信银行',
          '交通银行',
          '民生银行',
          '兴业银行',
          '邮政银行',
          '光大银行',
          '华夏银行',
          '浙商银行',
          '包商银行',
          '北京银行',
          '上海银行',
          "东莞银行",
          "广发银行",
          "平安银行",
          "徽商银行",
          '江苏银行',
          "北京农商",
          "成都银行",
          "吉林银行",
          "农村信用社",
          '哈尔滨银行',
          '深圳发展银行',
          "浙江网商银行",
          "福建农村信用社",
          "广州农村商业银行",
          '其它'
        ],
        // bankDetail: {},
        relMsg:"",
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
          title: '银行名称',
          align: 'center',
          key: 'bankName',
          className: 'demo-table-info-column'
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
                  params.row.status == 'success' ?
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
            }
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
              this.availableAmount = amount //可用总额
              this.notAmount = notAmount //不可用金额
              // this.unavailableReason = msg.split('，')[1] //不可用原因
              this.unavailableReason = msg
              let realmsg = msg;
              let num= realmsg.match(/\d+\.\d+/g);
              this.relMsg = realmsg.replace(num,`<span style='color:#ff9146'>${num}</span>`)
              this.totalAmount = totalAmount //总金额
            } else {
              this.$error(res.message)
            }
          })
      },
      // 获取用户银行卡信息
      userBank () {
        this.$store.commit('loading', true)
        this.$http.post(`${this.$HOST_NAME}/member/bank`).then(res => {
          if (res.code == 200) {
            res.data.forEach(v => {
              v.created_at = this.$moment
                .unix(v.created_at - 0)
                .format('YYYY-MM-DD')
            })
            res.data.forEach(v => {
              v.cardNum = v.cardNum
                .replace(/\s/g, '  ')
                .replace(/(.{4})/g, '$1 ')
                
              if(this.bankData.indexOf(v.bankName)!=-1){
                   v.imgUrl = `/static/public/image/bankImg/${v.bankName}.png`
              }else{
                   if(v.bankName=="广州发展银行"){
                        v.imgUrl = `/static/public/image/bankImg/${v.bankName}.png`
                   }else{
                        v.imgUrl = `/static/public/image/bankImg/morenBank.png`
                   }
              }
            })
            this.bankList = res.data
            if (!this.bankList.length) {
              if (localStorage.Public_User == 'test') {
                this.$error('试玩用户无权限，请注册正式用户', 3000)
              } else {
                this.$error('请绑定银行卡', 3000)
                this.$store.commit('showContent', {
                  parent: 'withdraw'
                })
                if(this.$store.state.home.usdtWithdrawalsRate&&this.$store.state.home.usdtWithdrawalsRate!=='0'){
                  this.$store.commit('showNav', {
                    child: 2
                  })
                }else{
                   this.$store.commit('showNav', {
                    child: 1
                  })
                }
              }
              return false
            }
            this.$store.commit('loading', false)
          } else {
            // 没有银行卡跳去绑定银行卡

            // this.$store.commit("showContent", {
            //   parent: "withdraw"
            // });
            // this.$store.commit("showNav", {
            //   child: 2
            // });
          }
        })
      },
      hanlderCarousel (oldval, newval) {},

      // 取款申请
      application () {
        if (this.canClick) {
          return false
        }
        if(this.bankDetail.status=="no"){
            this.$error("该银行卡已停用")
            return false
        }
        let isMoney = this.dInvalidMoney(this.amount)
        let isPwd = this.validatePwdAccount(this.payPassword)
        if (!isMoney) {
          this.toastShow = true
          this.toastNum = 375
          this.toastText = '请输入正确金额'
          return false
        }

        if (
          Number(this.amount) <
          Number(JSON.parse(localStorage.getItem('config')).limit.withdrawalsLimit)
        ) {
          this.toastShow = true
          this.toastNum = 375
          this.toastText =
            '提款金额不能小于' +
            JSON.parse(localStorage.getItem('config')).limit.withdrawalsLimit
          return false
        }

        if ((this.amount)*1 > (this.availableAmount)*1) {
          this.toastShow = true
          this.toastNum = 375
          this.toastText = '提款金额不能大于' + this.availableAmount
          return false
        }

        if (!isPwd) {
          this.toastShow = true
          this.notAmount > 0 ? this.toastNum = 465 : this.toastNum = 430
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
                  bankId: this.bankDetail.id
                })
                .then(res => {
                  if (res.code == 200) {
                    this.amount=""
                    this.payPassword=''
                    this.withdrawals()
                    this.fetchUserWithdrawAmmount()
                    this.$success('申请成功')
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
            this.data =this.data.filter((v)=>{return Number(v.usdt_count)<=0 })
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
        this.userBank()
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
      .deposit-left {
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
            img {
              width: 36px;
              vertical-align: middle;
              margin-right: 8px;
              opacity: 0;
            }
            span {
              font-size: 1.6em;
              color: #fff;
              vertical-align: middle;
              margin-left: 5px;
            }
          }
          .bank-kh {
            height: 110px;
            line-height: 110px;
            text-align: center;
            p {
              font-size: 2.6em;
              color: #fff;
            }
          }
          .bank-info {
            height: 36px;
            line-height: 36px;
            span {
              display: inline-block;
              font-size: 1.4em;
              color: #fff;
            }
          }
        }
        .list_user{
          margin-top: 25px;
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
                  img {
                    width: 36px;
                    vertical-align: middle;
                    margin-right: 8px;
                    opacity: 0;
                  }
                  span {
                    font-size: 1.6em;
                    color: #fff;
                    vertical-align: middle;
                    margin-left: 5px;
                  }
                }
                .bank-kh {
                  height: 110px;
                  line-height: 110px;
                  text-align: center;
                  p {
                    font-size: 2.6em;
                    color: #fff;
                  }
                }
                .bank-info {
                  height: 36px;
                  line-height: 36px;
                  span {
                    display: inline-block;
                    font-size: 1.4em;
                    color: #fff;
                  }
                }
            }
          }
        }
        .pay-bankinfo {
          padding-left: 88px;
          // padding-right: 130px;
          // margin-top: 20px;
          margin-top: 78px;
          border-bottom: 1px solid #f3f3f3;
          padding-bottom: 34px;
          .row {
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
            margin-top: 20px;
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
              margin-right: 20px;
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
          margin-top: 20px;
          margin-left: 150px;
          display: inline-block;
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
        // .ivu-carousel-arrow,
        // .ivu-carousel-arrow-hover {
        //   display: none;
        // }
      }
      .deposit-right {
        width: 48%;
        height: 580px;
        // margin-top: 66px;
        background: #f2f2f2;
        // padding: 0 20px;
        border-radius: 0 0 15px 0;
        // margin-top: 4px;
        // .title {
        //   height: 62px;
        //   line-height: 62px;
        //   font-size: 1.6em;
        //   background: #fff;
        //   padding: 0 20px;
        // }
      }
    }
  }

  .ivu-table {
    background: #f2f2f2;
  }
</style>
