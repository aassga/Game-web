<template>
  <div class="footer-box">
    <div class="footer-area">
      <!-- <div class="title">
        <ul>
          <li>太阳城</li>
          <li>浏览器推荐</li>
          <li>监管机构</li>
          <li>合作伙伴</li>
        </ul>
      </div> -->
      <div class="link-area">
        <ul>
          <li><a @click="service('help')">帮助</a></li>
          <li><a @click="service('advice')">投诉建议</a></li>
          <li><router-link to="/home/about/question">常见问题</router-link></li>
          <li><router-link to="/home/about/aboutUs">关于我们</router-link></li>
          <li><router-link to="/home/about/contactUs">联络我们</router-link></li>
          <li><a @click="service('agent')">代理加盟</a></li>
          <li><router-link to="/home/about/deposit">存款帮助</router-link></li>
          <li><router-link to="/home/about/wthdrawal">取款帮助</router-link></li>
        </ul>
      </div>

      <div class="deviceKind"></div>
      <div class="bottom_footer">
        <div class="bottom_one">
          <h3>关于我们</h3>
          <p>太阳城乃正式注册的网上博彩公司。我们为客户提供全球最顶尖的百家乐游戏以及多元化网上娱乐，我们承诺配备最优质的投注方法，并辅以最先进的网络技术支援，献上最佳的客户服务有最优惠的支付方案。</p>
        </div>
        <div class="bottom_twe">
          <span>合作加盟</span>
          <span>PARTNERSHIP AND</span>
        </div>
        <div class="bottom_third">
          <div class="bank">
            <h3>推荐银行</h3>
            <p><img src="/static/tyc82/img/bank.png" /></p>
            <p> 
              <span>工行</span>
              <span>建行</span>
              <span>招行</span>
              <span>农行</span>
            </p>
          </div>
          <div class="browser">
            <h3>推荐浏览器</h3>
            <p><img src="/static/tyc82/img/broser.png" /></p>
            <p>
              <span>谷歌</span>
              <span>百度</span>
              <span>搜狐</span>
              <span>火狐</span>
            </p>
          </div>
        </div>
      </div>
      <div class="footer-text">
        <p>Copyright © 太阳城 Reserved</p>
      </div>
    </div>
      <new-modal :newmodal="newmodal"></new-modal>
  </div>
</template>

<script>
import store from "@/vuex/store";
import newModal from "../../public/home/newmodal.vue";
export default {
  data() {
    return {
      newmodal: {
        title: "来自太阳城的消息",
        bgcolor: {
          background: "linear-gradient(135deg,#e9d89c,#cb9b35)"
        }
      }
    };
  },
  methods: {
    gameRules(){
      window.open('#/rules/ssc?id=4');
    },
    service(a){
      if(a == 'help'){
        let service = JSON.parse(localStorage.config).service;
        if (service) {
          let ser = service.find(item => item.status === 'on')
          if (ser) {
            window.open(ser.url);
          }
        }
      }else if(a == 'advice'){
        if(!localStorage.token || !localStorage.userinfo){
          this.$router.push('/home/about/contactUs');
        }else{
          this.$goUserCen('message',1)
        }
        
      }else{
        this.$router.push('/home/agent');
      }
      
    }
  },
  computed: {},
  mounted() {},
  components: {
    newModal
  },
  store
};
</script>

<style lang="less" scoped>
.footer {
  .pull-left {
    float: left !important;
  }
  
  .pull-right {
    float: right !important;
  }

  .clearfix:before,
  .clearfix:after {
    content: " ";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }
}
.footer-box {
  width: 100%;
  height: 300px;
  background-color: #1b1b1b;
  font-family: Microsoft YaHei !important;
  .deviceKind{
    height: 67px;
    background: url('/static/tyc82/img/footer_kind.png') no-repeat;
    width: 1200px;
    margin: 0 auto;
    background-size: 100% auto;
    background-position-y: 15px;
  }
  .bottom_footer{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    >div{
      width: 30%;
      padding: 15px;
    }
    h3{
      color: #fff;
      font-size:16px;
      font-weight:500;
      margin-bottom: 17px;
    }
    p{
      color: #858585;
      font-size:12px;
      line-height:25px;
    }
    .bottom_one{
      padding: 15px 20px 0 0px!important;
    }
    .bottom_twe{
      background: url('/static/tyc82/img/partener.png') no-repeat;
      background-position: 38px 30px!important;
      span{
        display: block;
        width: 57%;
        text-align: center;
        line-height: 30px;
        
        &:first-child{
          color: #eac25d;
          font-size:20px;
          font-weight:500;
          margin: 30px 0 0 20px;
        }
        &:last-child{
          margin-left: 30px;
        }
      }
    }
    .bottom_third{
      display: flex;
      flex-wrap:nowrap;
      justify-content: space-between;
      width: 35%;
      div{
        margin-left: 15px;
      }
      p{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        span{
          width: 25%;
          text-align: center;
          &:first-child{
            text-align: left;
            padding-left: 5px;
          }
          &:nth-child(2){
            padding-right: 2px;
          }
          &:nth-child(3){
            padding-left: 2px;
          }
          &:last-child{
            text-align: right;
            padding-right: 5px;
          }
        }
      }
      .browser{
        margin-left: 50px;
      }
    }
  }
  .footer-area {
    position: relative;
    background: #1b1b1b;
    .title {
      overflow: hidden;
      ul {
        margin-top: 22px;
        li:nth-child(1) {
          margin-left: 6px;
          margin-right: 66px;
        }
        li:nth-child(2) {
          margin-right: 71px;
        }
        li:nth-child(3) {
          margin-right: 76px;
        }
        li {
          display: inline-block;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
        }
      }
    }
    .link-area { 
      border-top:1px solid #313131;
      border-bottom:1px solid #313131;
      width: 100%;
      height: 60px;
      ul {
        display: flex;
        flex-direction: row;
        width: 1200px;
        margin: 0 auto;
        flex-wrap:nowrap;
        justify-content: space-around;
        li {
          margin-top: 20px;
          margin-left: 4px;
          span{
            display: block;
            font-size: 12px;
            text-align: center;
            line-height: 26px;
          }
          a {
            font-size: 15px;
            color: #fff;
            &:hover {
              color: #ffda82;
            }
          }
        }
      }
    }
    .footer-text {
      background: url("/static/tyc82/img/home/footer-line.png") no-repeat;
      background-size: 100% auto;
      margin-top: 26px;
      p {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #565656;
        padding: 16px;
      }
    }
    .shuxian {
      position: absolute;
      top: -179px;
      &.shuxian1 {
        left: 100px;
      }
      &.shuxian2 {
        left: 280px;
      }
      &.shuxian3 {
        left: 414px;
      }
    }
    .footer-bg {
      position: absolute;
      top: -173px;
      &.footer-bg1 {
        left: 140px;
      }
      &.footer-bg2 {
        left: 310px;
      }
      &.footer-bg3 {
        left: 469px;
      }
    }
  }
}
</style>