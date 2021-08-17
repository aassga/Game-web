<template>
<div>
  <section class="banner-cpyx">
    <banView :headerImg="headBg" :picBox='300' :BGC='bgColor'></banView>
  </section>
  <div class="about-content clearfix">
    <div class="about-area clearfix">
      <div class="left-nav pull-left">
        <ul>
          <li v-for="(item,i) in navList" :key="i">
            <div @click="goLink(item.linkTo)" :class="['clearfix','nav-link',item.linkTo.includes(currPage) ? 'active' : '']">
              <img :src="item.icon" class="pull-left nav-img">
              <img :src="item.icon2" class="pull-left nav-img2">
              <div class="name-area pull-left">
                <div class="name">{{item.name}}</div>
                <div class="introduce">{{item.introduce}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="right-content pull-left">
        <!-- 关于我们 -->
        <div v-if="currPage === 'aboutUs'">
          <div class="title">
            <h1>关于我们：</h1>
          </div>
          <div class="cont">
            <p class="des">澳门新葡京拥有菲律宾最具权威的First Cagayan博彩运营牌照；我们在移动投注、信息安全及其它技术方面都处于行业领先地位。澳门新葡京奉行客户至上，信誉为本的价值观，为众多澳门新葡京会员提供优质的服务，是您最值得信赖的投注机构。</p>
            <p class="des">澳门新葡京拥有多元化游戏平台，集真人娱乐、棋牌、彩票、电子游戏、体育竞猜，捕鱼等多款游戏，澳门新葡京是2018世界杯官方指定合作伙伴，是四大体育赛事的顶级合法投注机构，被誉为是业内最安全、最丰富，最专业，最诚信的线上博彩集团公司。</p>
            <h4 class="title">产品介绍</h4>
            <p class="des">澳门新葡京自主研发的全球一体化移动娱乐客户端，将海量真人娱乐厅、棋牌、彩票、电子游戏、体育竞猜，捕鱼等最新娱乐项目装进移动端，让用户体验时下备受推崇的一体化移动娱乐概念。被誉为业界最便捷，最丰富，最专业的当代产品，全方位覆盖安卓/IOS/H5/PC四大端，让用户足不出户，随时随地均可享受澳门新葡京带来的尊贵优质投注体验，最佳赔率选择，最便捷的操作方式，最高投注效率，是一款业界领先、具有里程碑意义的移动客户端。</p>
            <h4 class="title">支付渠道</h4>
            <p class="des">澳门新葡京与中国银联合作，全面无缝衔接，支持各大支付方式，云闪付、支付宝、微信、网银、银联、京东钱包等应有尽有。经过云加密采用国际标准256位加密技术的支付系统保障您的支付存提万无一失。</p>
            <h4 class="title">安全及隐私</h4>
            <p class="des">澳门新葡京非常重视客户的隐私，绝不会泄漏、转售或与其他机构进行交换，公司在严格的安全系统中将客户资料加密储存，以保护客户资料的安全。</p>
          </div>
        </div>
        <!-- 联系我们 -->
        <div v-else-if="currPage === 'contactUs'">
          <div class="title">
            <h1>联系我们：</h1>
          </div>
          <div class="cont">
            <p class="des">澳门新葡京的客服中心全年无休，提供1周7 天、每天24小时的优质服务。</p>
            <p class="des">如果您对本网站的使用有任何疑问，可以透过下列任一方式与客服人员联系，享受最实时的服务</p>
            <p class="des">点击"在线客服"连结，即可进入在线客服系统与客服人员联系。</p>
            <p class="des">您亦可使用Email与客服人员取得联系</p>
            <p class="des">官方邮箱：amxpjtousuyx526@gmail.com</p>
          </div>
        </div>
        <!-- 存款帮助 -->
        <div v-else-if="currPage === 'deposit'">
          <div class="title">
            <h1>存款帮助：</h1>
          </div>
          <div class="cont">
            <h4 class="title">一、公司入款:（ 赠送存款金额1.0%手续费 ）强烈推荐使用</h4>
            <p class="des">1. 会员登入后点击 [在线存款 ]，选择 [公司入款 ]</p>
            <p class="des">2. 请选择欲使用的银行卡。</p>
            <p class="des">3. 选择银行后，网页会显示可存入的银行账号。可直接点击网页上银行标志，自动为您带到银行首页，</p>
            <p class="des">登入您个入网银后，请将款项转入公司提供的入款账号。</p>
            <p class="des">※如您使用农业银行/工商银行， 请将公司入款订单号贴入您网银 [备注/附言] 字段</p>
            <p class="des">※建议选择与您转账的银行同一家，同银行间转账可以立即到帐，若跨行转账有可能较晚到帐。※可以自由选择:</p>
            <p class="des">(1).网络银行: 登入自己的网络银行页面，从银行网页上转账到指定银行账户中。</p>
            <p class="des">(2).ATM自动柜员机 : 到实体自动柜员机以银行卡或是现金方式存入，没有开启网银功能与存现金的会员可用</p>
            <p class="des">(3).银行柜台转账 : 到银行柜台完成转账手续</p>
            <p class="des">※公司入款注意事项※</p>
            <p class="des">亲切提醒您，公司入款银行随时更变，请于每次入款前，确认您可以使用的入款账号。</p>
            <p class="des">如入款账号已过期，澳门新葡京恕不负责！万请见谅，感谢配合。</p>
            <p class="des">4. 核对提交数据/提交申请</p>
            <p class="des">汇款完成请填写并提交相关数据，并备份您的公司入款订单号。 系统在收到款项后会进行比对，如果存款金</p>
            <p class="des">额、时间相符合，则会将款项加入您的游戏账号中。处理时间通常为5-30分钟。(跨行转账时间可能会超过30分)</p>
            <p class="des">5. 若5钟内未到帐，请联系在线客服人员。</p>
            <p class="des">客服人员会与您核对存款数据，必要时需要您提供截图、转账数据等相关证明。</p>
            <h4 class="title">二、在线存款 :</h4>
            <p class="des">1. 会员登入后点击 [在线存款]，选择 [在线付款]</p>
            <p class="des">2. 选择入款额度，并请确实填写 ”联络电话” ，如有任何问题，方便澳门新葡京客服第一时间与您联系。</p>
            <p class="des">3. 选择”支付银行”。</p>
            <p class="des">支援借记卡：中国农业银行,中国工商银行,中国建设银行,招商银行,交通银行,上海浦东发展银行,中国光大银行,深圳平安银行。</p>
            <p class="des">4. 确认送出后，将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待加载网络银行页面，传输中已将您账户数据加密，请耐心等待。</p>
            <p class="des">5. 进入网络银行页面，请确实填写您银行账号信息，支付成功，额度将在10分钟内系统处理完成，立即加入您的澳门新葡京会员账户。</p>
            <p class="des">存款需知:</p>
            <p class="des">澳门新葡京最低存款为$100人民币，最高存款无上限!</p>
            <p class="des">未开通网银的会员，请亲洽您的银行柜台办理。</p>
            <p class="des">如有任何问题，请洽24小时在线客服。</p>
          </div>
        </div>
        <!-- 取款帮助 -->
        <div v-else-if="currPage === 'wthdrawal'">
          <div class="title">
            <h1>取款帮助：</h1>
          </div>
          <div class="cont">
            <h4 class="title">您可以通过以下方式取款：</h4>
            <p class="des">1. 会员登入后点选“在线取款”。</p>
            <p class="des">2. 输入选择“取款密码”，并确认提款人姓名与您银行账号持有人相符。</p>
            <p class="des">3. 输入“取款额度”以及“有效的手机号码”，如有任何问题，方便客服人员在第一时间与您联系。</p>
            <p class="des">4. 确认提款银行账号正确。</p>
            <p class="des">5. 可以选择以下方式取款：</p>
            <p class="des">绑定中国工商银行(优先)、中国农业银行、北京银行、交通银行、中国银行、中国建设银行、中国光大银行、兴业银行、中国民生银行总行、招商银行、中信银行、广东发展银行、中国邮政、深圳发展银行、上海浦东发展银行。</p>
            <p class="des">24小时取款，5分钟内到帐，不限制取款金额，不限制取款次数，如有任何问题，请联系24小时在线客服，</p>
            <p class="des">【取款注意事项】</p>
            <p class="des">6. 最低取款为$100人民币，取款上限为$200000人民币。(在线支付每日最高取款总额上限为$300000人民币,公司入款每日最高取款总额上限为$1000000人民币)。</p>
            <p class="des">7. 澳门新葡京保留权利审核会员账户，若由最后一次入款起，有效下注金额需达到入款金额的100%，未达到而申请出款者，公司将收取入款金额的30%行政费用，以及$50出款手续费。</p>
            <p class="des">**如有任何问题，请洽24小时在线客服！</p>
            <p class="des">**请注意**各游戏和局/未接受/取消注单，不纳入有效投注计算。运动博弈游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。</p>
            <p class="des">**大赔率产品包括: 1X2、过关、波胆、总入球、半全场、双胜彩、冠军赛。</p>
            <p class="des">**澳门新葡京相关优惠，请详见‘优惠活动’</p>
          </div>
        </div>
      </div>
      <img src="/static/amxpj/img/about/left-logo.png" class="left-logo">
    </div>
  </div>
</div>
</template>

<script>
import banView from "../../../public/game_new/banView";
  export default {
    data() {
      return {
        currPage:'',
        navList:[
          {
            icon:'/static/amxpj/img/about/gameRule-icon.png',
            icon2:'/static/amxpj/img/about/gameRule-icon2.png',
            name:'游戏规则',
            introduce:'GAME RULES',
            linkTo:'#/rules/ssc?id=4',
          },
          {
            icon:'/static/amxpj/img/about/aboutUS-icon.png',
            icon2:'/static/amxpj/img/about/aboutUS-icon2.png',
            name:'关于我们',
            introduce:'ABOUT US',
            linkTo:'/home/about/aboutUs',
          },
          {
            icon:'/static/amxpj/img/about/contactUs-icon.png',
            icon2:'/static/amxpj/img/about/contactUs-icon2.png',
            name:'联系我们',
            introduce:'CONTACT US',
            linkTo:'/home/about/contactUs',
          },
          {
            icon:'/static/amxpj/img/about/deposit-icon.png',
            icon2:'/static/amxpj/img/about/deposit-icon2.png',
            name:'存款帮助',
            introduce:'DEPOSIT',
            linkTo:'/home/about/deposit',
          },
          {
            icon:'/static/amxpj/img/about/wthdrawal-icon.png',
            icon2:'/static/amxpj/img/about/wthdrawal-icon2.png',
            name:'取款帮助',
            introduce:'WITHDRAW',
            linkTo:'/home/about/wthdrawal',
          },
        ],
        headBg: '/static/amxpj/img/about/about-top-bg.png',
        bgColor:'#1b1533'
      }
    },
    methods:{
      goLink(link) {
        (link.includes('/rules')) && window.open(link)
        this.$router.push(link)
      }
    },
    created() {
      document.documentElement.scrollTop = 0
      this.currPage = this.$route.params.page
    },
    watch: {
      '$route.params.page'(newPath,oldPath){
        this.currPage = newPath
      }
    },
    components:{
      banView,
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

.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}

.clearfix:after {
  clear: both;
}
.banner-cpyx {
  background-color: #2a0509;
}
.about-content{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  background: #1b1533;
  background-size: cover;
  .about-area{
    position: relative;
    width: 1200px;
    min-height: 811px;
    margin: 20px auto;
    background: url('/static/amxpj/img/about/about-line.png') no-repeat;
    background-color: #251c47;
    border:1px solid #443776;
    background-position: 229px 88px;
    .left-nav{
      width: 256px;
      margin-top: 98px;
      ul {
        li {
          cursor: pointer;
          width: 202px;
          height: 86px;
          border-bottom: 1px dashed #52477d;
          margin: 0 auto;
          .nav-link{
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            .nav-img{
              display: block;
              margin-top: 28px;
              margin-left: 30px;
            }
            .nav-img2{
              display: none;
              margin-top: 28px;
              margin-left: 30px;
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
          border-bottom: 1px solid #52477d;
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
    left: 32px;
  }

}
</style>