<template>
<div>
  <section class="banner-cpyx">
    <div class="banner">
          <banView :headerImg="headBg" :picBox='300' isScale='true'></banView>
    </div>
  </section>
  <div class="about-content clearfix">
    <div class="about-area clearfix">
      <div class="left-nav pull-left">
        <ul>
          <li v-for="(item,i) in navList" :key="i">
            <div @click="goLink(item.linkTo)" :class="['clearfix','nav-link',item.linkTo.includes(currPage) ? 'active' : '']">
              <img :src="item.icon" class="pull-left nav-img">
              <img :src="item.icon2" class="pull-left nav-img2">
              <!-- <div class="name-area pull-left">
                <div class="name">{{item.name}}</div>
                <div class="introduce">{{item.introduce}}</div>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="right-content pull-left">
        <!-- 关于我们 -->
        <div class="about_content" >
          <div class="title">
            <h1>关于我们：</h1>
          </div>
          <div class="cont">
            <p class="des">金沙娱乐场官方直营网投成立于2005年，是目前亚洲市场上最具公信力及最受玩家欢迎的顶级博彩娱乐网站之一，提供刺激好玩的真人荷官视讯，高频彩，电子游戏等，游戏结果公平、公正、公开！金沙娱乐场在菲律宾拥有合法博彩执照，公司的运营皆由菲律宾政府所授权和监管。我们在越来越成熟的网路博彩中，不断地求新求变，寻找最新的创意，秉持最好的服务。以带给客户高质量的服务、产品、娱乐，是我们的公司永恆宗旨。金沙娱乐场会为用户资讯的安全做出更多的努力，您的资讯保密性对我们来说是最重要的，我们将提供128位SSL加密传输与MD5加密密码，在最大程度上保障您的资讯安全。</p>
            <h4 class="title">公平诚信</h4>
            <p class="des">金沙娱乐场作为与多个国际知名游戏平台合作的在线娱乐运营商，我们对接入的所有平台均经过严格的筛选，只选用国际知名在线娱乐平台。保证让每位玩家在壹个公平、公正的环境下进行游戏。同时菲律宾政府First Cagayan leisure and Resort Corporation会对游戏平台的数据进行监控最终确保游戏的公平性和真实性。</p>
            <h4 class="title">高效存取款</h4>
            <p class="des">金沙娱乐场一直注重用户体验，高效快速的存取款业务是用户最实在的体验，所以我们一直致力于开发最新的收支业务和人员培训保证高效的存取款，保证5分钟存提款到账，为你快速享受游戏乐趣提供最大保证。</p>
            <h4 class="title">精英客服团队</h4>
            <p class="des">金沙娱乐场自成立以来，每一年我们都通过优秀培训生计划，为我们的精英客服团队不断输入专业素质全面的优秀人员，每壹个团队客服均经过严格的筛选及专业培训，用心为玩家提供优质的服务体验。全天候24小时为您提供专业、贴心的VIP服务，让您有宾至如归的感觉。</p>
            <h4 class="title">金沙娱乐场更专注于玩家的利益、最给力的优惠活动时时回馈各新老会员用户。品牌信誉，首选金沙娱乐场！</h4>
          </div>
        </div>
        <!-- 联系我们 -->
        <div class="about_content" v-else-if="currPage === 'relation'">
          <div class="title">
            <h1>联系我们：</h1>
          </div>
          <div class="cont">
            <p class="des">金沙娱乐场的客服中心全年无休，提供1周7天、每天24小时的优质服务。</p>
            <p class="des">如果您对本网站的使用有任何疑问，可以透过下列任一方式与客服人员联系，享受最实时的服务</p>
            <p class="des">点击"在线客服"链接，即可进入在线客服系统与客服人员联系。</p>
            <p class="des">您亦可使用Email与客服人员取得联系</p>
            <p class="des">官方邮箱：88@gfamjs.com</p>
            <p class="des">我司为保证服务态度与质量，现已开通投诉平台，若您对客服的服务态度不满或有答询方式有任何异议，可截图记录并发送到此投诉邮箱，我们将在6小时之内核查并回馈。</p>
          </div>
        </div>
        <!-- 存款帮助 -->
        <div class="about_content" v-else-if="currPage == 'save-help'">
          <div class="title">
            <h1>存款帮助：</h1>
          </div>
          <div class="cont">
            <h4 class="title">一、网银转账赠送存款金额1%手续费_强烈推荐使用!</h4>
            <p class="des">1. 会员登入后点击 [在线存款]，选择 [网银转账]</p>
            <p class="des">2. 请选择欲使用的银行卡。</p>
            <p class="des">3. 选择银行后，网页会显示可存入的银行账号,可直接点击网页上银行标志，自动为您带到银行首页，登入您个入网银后，请将款项转入公司提供的入款账号。</p>
            <p class="des">※如您使用农业银行/工商银行， 请将公司入款订单号贴入您网银 [备注/附言] 字段</p>
            <p class="des">※建议选择与您转账的银行同一家，同银行间转账可以立即到帐，若跨行转账有可能较晚到帐。※</p>
            <p class="des">可以自由选择:</p>
            <p class="des">(1).网银转账: 登入自己的网银页面，从银行转账到指定银行账户。</p>
            <p class="des">(2).银行柜台转账或ATM自动柜员机以银行卡或是现金方式存入指定银行账户。</p>
            <p class="des">※公司入款注意事项※</p>
            <p class="des">亲切提醒您，公司入款银行随时更变，请于每次入款前，确认您可以使用的入款账号。</p>
            <p class="des">如入款账号已过期，金沙娱乐场恕不负责！万请见谅，感谢配合。</p>
            <p class="des">4. 核对提交数据/提交申请</p>
            <p class="des">汇款完成请填写并提交相关数据，并备份您的公司入款订单号。 系统在收到款项后会进行比对，如果存款金额、时间相符合，则会将款项加入您的游戏账号中。处理时间通常为3-10分钟。(跨行转账时间可能会超过30分)</p>
            <p class="des">5. 若5钟内未到帐，请联系在线客服人员。</p>
            <p class="des">客服人员会与您核对存款数据，必要时需要您提供截图、转账数据等相关证明。</p>
            <h4 class="title">二、在线存款:</h4>
            <p class="des">1. 会员登入后点击 [存款]选择[支付宝][财付通] [在线付款]</p>
            <p class="des">2. 选择”存款金额”确认</p>
            <p class="des">3. 选择”支付银行”支援借记卡：</p>
            <p class="des">中国农业银行,中国工商银行,中国建设银行,招商银行,交通银行,上海浦东发展银行,中国光大银行,深圳平安银行。</p>
            <p class="des">4. 确认送出后，将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待加载网络银行页面，传输中已将您账户数据加密，请耐心等待。</p>
            <p class="des">5. 进入网络银行页面，请确实填写您银行账号信息，支付成功，额度将在10分钟内系统处理完成，立即加入您的金沙娱乐场会员账户。</p>
            <p class="des">存款需知:</p>
            <p class="des">金沙娱乐场最低存款为$1人民币，最高存款无上限!</p>
            <p class="des">未开通网银的会员，请到银行柜台办理。</p>
            <p class="des">如有任何问题，请联系24小时在线客服。</p>
          </div>
        </div>
        <!-- 取款帮助 -->
        <div class="about_content" v-else-if="currPage == 'pull-help'">
          <div class="title">
            <h1>取款帮助：</h1>
          </div>
          <div class="cont">
            <h4 class="title">您可以通过以下方式取款：</h4>
            <p class="des">会员登入后点选“在线取款”。</p>
            <p class="des">输入选择“取款密码”，并确认提款人姓名与您银行账号持有人相符。</p>
            <p class="des">输入“取款额度”以及“有效的手机号码”，如有任何问题，方便客服人员在第一时间与您联系。</p>
            <p class="des">确认提款银行账号正确。</p>
            <p class="des">可以选择以下方式取款：</p>
            <p class="des">绑定中国工商银行(优先)、中国农业银行、北京银行、交通银行、中国银行、中国建设银行、中国光大银行、兴业银行、中国民生银行总行、招商银行、中信银行、广东发展银行、中国邮政、深圳发展银行、上海浦东发展银行。</p>
            <p class="des">24小时取款，3分钟内到帐，不限制取款次数（24小时之内申请提款3次（包含3次）无需承担手续费，满三次后在第四笔以上申请提款时需每笔支付50元手续费用），如有任何问题，请联系24小时在线客服。</p>
            <h4 class="title">【取款注意事项】</h4>
            <p class="des">最低取款为$100人民币，单笔取款上限1000000人民币，超级VIP用户日取款上限为$5000000人民币。</p>
            <p class="des">**如有任何问题，请洽24小时在线客服！</p>
            <p class="des">**请注意**各游戏和局/未接受/取消注单，不纳入有效投注计算。体育赛事游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。</p>
            <p class="des">**大赔率产品包括: 过关、波胆、总入球、半全场、双胜彩、冠军赛。</p>
            <p class="des">**金沙娱乐场相关优惠，请详见‘优惠活动’</p>
          </div>
        </div>
      </div>
      <img src="/static/amjs/img/left-logo.png" class="left-logo">
    </div>
  </div>
</div>
</template>

<script>
import banView from "../../../public/game_new/banView.vue";
  export default {
    data() {
      return {
        currPage:'',
        navList:[
          {
            icon:'/static/amjs/img/game_rule.png',
            icon2:'/static/amjs/img/game_rule_hover.png',
            name:'游戏规则',
            introduce:'GAME RULES',
            linkTo:'#/rules/ssc?id=4',
          },
          {
            icon:'/static/amjs/img/about_1.png',
            icon2:'/static/amjs/img/about_1_hover.png',
            name:'关于我们',
            introduce:'ABOUT US',
            linkTo:'/home/register/about-page',
          },
          {
            icon:'/static/amjs/img/about_2.png',
            icon2:'/static/amjs/img/about_2_hover.png',
            name:'联系我们',
            introduce:'CONTACT US',
            linkTo:'/home/register/relation',
          },
          {
            icon:'/static/amjs/img/about_4.png',
            icon2:'/static/amjs/img/about_4_hover.png',
            name:'存款帮助',
            introduce:'DEPOSIT',
            linkTo:'/home/register/save-help',
          },
          {
            icon:'/static/amjs/img/about_5.png',
            icon2:'/static/amjs/img/about_5_hover.png',
            name:'取款帮助',
            introduce:'WITHDRAW',
            linkTo:'/home/register/pull-help',
          },
        ],
        headBg: '/static/amjs/img/about-top-bg.png',
        bgColor:'#47080E'
      }
    },
    methods:{
      goLink(link) {
        (link.includes('/rules')) && window.open(link)
        this.$router.push(link)
      }
    },
    created() {
      document.documentElement.scrollTop = 0;
      this.currPage = this.$route.name;
    },
    watch: {
      '$route.name'(newPath,oldPath){
        this.currPage = newPath;
      }
    },
    components:{
      banView
    }
  }
</script>

<style lang="less" scoped>
.pull-left {
  float: left !important;
}

.pull-right {
  float: right !important;
}
.about_content{
  margin-left: 30px;
}
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}

.clearfix:after {
  clear: both;
}
.banner-cpyx {
  background-color: #2b292a;
}
.about-content{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  background: #2b292a url(/static/amjs/img/aboutbg.jpg) center no-repeat;
  background-size: cover;
  .about-area{
    position: relative;
    width: 1200px;
    min-height: 811px;
    margin: 20px auto;
    background: url(/static/amjs/img/about-line.png) no-repeat;
    background-color: #1b1b1b;
    border:1px solid #3d3d3d;
    background-position: 229px 88px;
    .left-nav{
      width: 256px;
      margin-top: 98px;
      ul {
        li {
          cursor: pointer;
          width: 202px;
          height: 86px;
          border-bottom: 1px dashed #ffe178;
          margin: 0 auto;
          .nav-link{
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            .nav-img{
              display: block;
              margin-top: 28px;
              // margin-left: 30px;
            }
            .nav-img2{
              display: none;
              margin-top: 28px;
              // margin-left: 30px;
            }
            .name-area{
              margin-left: 20px;
              margin-top: 26px;
              .name{
                font-size: 18px;
              }
              .introduce{
                font-size: 12px;
                margin-top: 7px;
              }
            }
            &:hover,&.active{
              .nav-img {
                display: none;
              }
              .nav-img2 {
                display: block;
              }
              .name-area{
                color: #F4C462;
              }
            }
          }
        }
      }
    }
    .right-content{
      width: 850px;
      padding: 45px 0 0 35px;
      color: #fff;
      .title{
        color: #F4C462;
        h1{
          font-size: 22px;
          height: 50px;
          border-bottom: 1px solid#ffe27a;
        }
      }
      .cont{
        margin-top: 15px;
        min-height: 650px;
        padding-bottom: 20px;
        h4 {
          padding: 26px 0;
        }
        .des{
          line-height: 24px;
        }
        &::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        &::-webkit-scrollbar-thumb {
          width: 0;
          background:transparent;
        }
        -ms-overflow-style: none;
        scrollbar-width:none
      }
    }
  }
  .left-logo{
    position: absolute;
    top: 26px;
    left: 42px;
  }

}
</style>