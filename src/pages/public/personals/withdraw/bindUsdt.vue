<template>
  <div class="bindingusdt">
    <div class="header">
      绑定USDT
    </div>
    <div class="content clearfloat">

      <div class="deposit-left fl">
        <div class="row">
          <label class="text">
            提款姓名：
          </label>
          <input type="text" v-model="cardName" maxlength="15" v-if="!$store.state.mainState.userinfo.realName" placeholder="请输入开户姓名">
          <input type="text" v-model="cardName" disabled v-else>
        </div>

        <div class="row">
          <label class="text">
            USDT地址：
          </label>
          <input type="text" v-model="usdtcardNum" placeholder="请输入您的USDT-ERC20收款地址" maxlength="50"  @keyup="clearNoNum()">
        </div>
        <div class="row" >
          <label class="text">
            资金密码：
          </label>
          <input type="password" v-model="payPassword" maxlength="6" autocomplete='off' placeholder="请输入6位资金密码">
        </div>
         <div class="row" v-if="this.$store.state.mainState.userinfo.payPassword == 'unset'"> 
          <label class="text">
            确定密码：
          </label>
          <input type="password" v-model="payPassword_confirmation" maxlength="6" autocomplete='off' placeholder="请输入6位资金密码">
        </div>
        <div class="submit" @click="setBank" :class="{'active':canClick}">
          确认提交
        </div>
        <!-- <div class="tips"  :style="{marginTop: ($store.state.personal.usdtList.length == 0 ? 95 : 135) +'px'}">
          <p>注意事项:</p>
          <p>1.绑定地址必须为USDT-ERC20地址</p>
          <p>2.请务必再三确认连接名称为：ERC20地址</p>
          <p>3.如绑定地址遇到未知问题请及时联系客服</p>
        </div> -->
        <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
          {{toastText}}
        </div>

      </div>

      <div class="deposit-usdt fl">
        <Carousel v-model="value1" loop radius-dot v-if="bankList.length" :arrow="bankList.length >1 ? 'hover':'never'">
          <CarouselItem v-for="(item,i) in bankList" :key="i">
            <div class="bank" :style="{backgroundImage: 'url(/static/public/image/bank/usdt.png)', backgroundSize:'cover'}">
              <!-- <div class="mask" v-if="item.status=='no'">
                   <img src="/static/public/image/bankImg/stop.png" alt="">
              </div> -->
              <div class="title">
                <span>USDT-ERC20<span>（尾号:{{item.cardNumLast}}）</span></span>
              </div>
              <div class="bank-kh">
                <span>{{item.cardNum}}</span>
              </div>
              <div class="bank-info">
                <span class="fl">取款人：{{item.cardName}}</span>

                <span class="fr">
                  绑定时间： {{item.created_at}}
                </span>
              </div>
            </div>
          </CarouselItem>
        </Carousel>
        <div v-else style='margin:100px 0;text-align:center;'><img src='/static/public/image/userImg/no-data.png'
                                                                   alt=''></div>
      </div>
    </div>

  </div>

  
</template>

<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'

  export default {
    data () {
      return {
        value1: 0,
        autoplay: 3500,
        bankList: [],
        bankId: '',
        qitaBank: false,
        cardName: this.$store.state.mainState.userinfo.realName,
        cardAddress: '',
        toastShow: false,
        toastNum: 30,
        cardNum: '',
        payPassword: '',
        payPassword_confirmation:'',
        usdtcardNum:"",
        toastText: '',
        key: '',
        value: '',
        canClick: false,
        param:'',
      }
    },
    methods: {
       clearNoNum() {
          this.usdtcardNum = this.usdtcardNum.replace(/[\u4e00-\u9fa5]+/g, ""); //验证非汉字
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
      usdtList() {
        this.$http.post(`${this.$HOST_NAME}/member/usdtList`).then(res => {
          if (res.code == 200) {
            if(res.data.length){
              res.data.forEach(v => {
                v.created_at = this.$moment
                  .unix(v.created_at - 0)
                  .format('YYYY-MM-DD')
              })
            }
            this.bankList = res.data
            // this.setList();
            this.$store.commit('usdtList',res.data);
            this.$store.commit('loading', false)
          } else {
            this.$store.commit('loading', false)
          }
        })
      },
      setBank () {
        if (this.canClick) {
          return false
        }
        var reg = /^[\u4E00-\u9FA5·]+$/
        if (!reg.test(this.cardName) &&
          !this.$store.state.mainState.userinfo.realName
        ) {
          this.toastText = '请输入开户姓名'
          this.toastShow = true
          this.toastNum = 28
          return false
        }
        if(!this.usdtcardNum){
          this.toastText = '请输入USDT地址'
          this.toastShow = true
          this.toastNum = 88
          return false
        }
        var regusdt = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(regusdt.test(this.usdtcardNum)){
          this.toastText = '请输入正确的USDT地址'
          this.toastShow = true
          this.toastNum = 88
          this.usdtcardNum=''
          return false
        }
        if (!this.payPassword){
          this.toastText = '请输入正确的6位资金密码'
          this.toastShow = true
          this.toastNum = 146
          return false
        }
        if(this.$store.state.mainState.userinfo.payPassword == 'unset'){
          if (!this.payPassword_confirmation){
            this.toastText = '请输入正确的6位资金密码'
            this.toastShow = true
            this.toastNum = 204
            return false
          }
          if(this.payPassword_confirmation!=this.payPassword){
             this.toastText = '两次密码不一样'
             this.toastShow = true
             this.toastNum = 204
             return false
          } 
        }
        this.toastShow = false
        this.param = {
              cardNum: this.usdtcardNum,
              payPassword :this.payPassword,
        }
        if(this.$store.state.mainState.userinfo.payPassword == 'unset'){
            this.param.payPassword_confirmation=this.payPassword_confirmation
        }
        if(!this.$store.state.mainState.userinfo.realName){
            this.param.cardName=this.cardName
        }
        this.canClick = true
        setTimeout(() => {
          this.canClick = false
        }, 3 * 1000)
        this.$postS(`member/set-usdt-info`, this.param).then(res => {
          if (res.code == 200) {
            this.$success('绑定成功')
            this.usdtList()
            // if(!this.$store.state.mainState.userinfo.realName){
            //    this.$store.state.mainState.userinfo.realName= this.cardName
            // }
            this.param={}
            // this.cardName=''
            this.usdtcardNum=''
            this.payPassword=''
            this.payPassword_confirmation=''
            UserService.vpGetBasicInfo.call(this)
          } else {
            this.$error(res.message)
          }
        })
      },
    },
    created () {
      this.$nextTick(() => {
        this.bankList=this.$store.state.personal.usdtList
        // this.setList();
      })
    },
    destroyed () {
      this.$store.commit('loading', false)
    },
    components: {
    },
    watch: {
    }
  }
</script>

<style lang="less">
.peronsals .binding .content  .deposit-left{
  .ivu-select {
      width: 242px;
      .ivu-select-dropdown-list {
        height: 265px;
      }
    }
    .adressSelect {
      .ivu-select-dropdown-list {
        height: 340px;
      }
    }
    .csSelect {
      .ivu-select-dropdown-list {
        max-height: 340px;
        height: auto;
      }
    }
    .mbSelect {
      .ivu-select-dropdown-list {
        max-height: 230px;
        height: auto;
      }
    }
}
  .bindingusdt {
    .header {
      height: 66px;
      //  font-weight: 200;
      border-bottom: 1px solid #f3f3f3;
      font-size: 1.8em;
      padding-left: 10px;
      color: #696969;
      line-height: 85px;
      font-weight: 400;
      margin: 0 14px;
      font-family: "Microsoft YaHei";
    }
    .content {
      .deposit-left {
        padding-top: 6px;
        width: 52%;
        position: relative;
        .tips{
          position: relative;
          padding: 20px;
          width: 339px;
          border:1px solid rgba(224,224,224,1);
          margin-left: 65px;
          // margin-top: 135px;
          p{
            color: #969696;
            font-size: 14px;
            line-height: 25px;
            &:first-child{
              font-weight: bold;
            }
          }
        }
        .row {
          margin-top: 20px;
          .text {
            display: inline-block;
            width: 144px;
            text-align: right;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            vertical-align: middle;
            color: #696969;
          }
          input {
            width:275px;
            height:37px;
            background:rgba(249,249,249,1);
            border:1px solid rgba(245,245,245,1);
            font-size: 16px;
            border-radius: 10px;
            text-align: left;
            text-indent: 0.4em;
            padding-left: 7px;
            // -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            // -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            // box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            color: #666;
            &:not(.other) {
              width: 275px;
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
          // margin-top: 36px;
          height: 50px;
          line-height: 50px;
          // border-bottom: 1px solid #dbdbdb;
          label {
            display: inline-block;
            width: 144px;
            text-align: right;
            font-size: 15px;
            font-family: "Microsoft YaHei";
          }
          span {
            font-size: 15px;
            font-family: "Microsoft YaHei";
            span {
              color: #f90;
              text-decoration: underline;
              font-family: "Microsoft YaHei";
              cursor: pointer;
              font-size: 15px;
              padding-left: 5px;
              padding-left: -2px;
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
          margin-top: 28px;
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
          padding-left: 20px;
          font-size: 1.3em;
          display: block;
          font-size: 15px;
          border-bottom: 1px solid #f3f3f3;
          padding-bottom: 20px;
          margin: 1px 50px;
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
          right: -93px;
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
      }
      .deposit-usdt {
        width: 48%;
        height: 584px;
        background: #f2f2f2;
        border-radius: 0 0 15px 0;
        // margin-top: 66px;
        .bank {
          width: 380px;
          height: 210px;
          // background: linear-gradient(90deg, #ff6d4f, #fb4f5a);
          margin: 0 auto;
          margin-top: 25px;
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
              // line-height: 28px;
            }
          }
          .bank-kh {
            height: 110px;
            // line-height: 110px;
            // text-align: center;
            word-break: break-all;
            white-space: normal;
            padding-top:28px;
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
        .ivu-carousel-dots-inside {
          bottom: -20px;
        }
      }
    }
  }
</style>
