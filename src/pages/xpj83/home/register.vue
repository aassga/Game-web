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
        <div class="about_content" v-if="currPage == '/about-page'">
          <div class="title">
            <h1>关于我们：</h1>
          </div>
          <div class="cont">
            <p class="des">品牌信誉-首选澳门新葡京赌场，最具公信力的博彩公司、更有高质量的游戏平台，澳门新葡京为哥斯达黎加合法注册之博彩公司之一。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。在日渐热络、成熟的网络博彩市场中，除了多元化的游戏外，网络安全最为客户注重，公司针对现阶段网络安全问题，成立了网络安全维护中心，彻底为客户的网络安全解决了后顾之忧，诺顿分级评级审核"澳门新葡京赌场"为最安全网站之一，并获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家所有隐私。</p>
            <h4 class="title">诚信为本：</h4>
            <p class="des">全网最高信誉，从澳门新葡京赌场开始！作为国际专业的网上博彩游戏运营商，我们承诺，为每一位客户提供最安全、最公平的博彩娱乐，以及全方位的服务。我们采用坚实、稳定与安全的博彩系统。所有游戏共同的优点 — 不须耗时下载；界面简单明了；操作功能齐全；画面精致优雅；游戏结果公平、公正、公开！由于您的信息保密度至关重要。我们将坚持实行严格保密和隐私制度。</p>
            <h4 class="title">多元化游戏：</h4>
            <p class="des">除了体育游戏项目多元化外，全方位提供：香港六合彩，时时彩，快乐彩等。精挑细选各种在线游戏，给您提供最好的选择。真人荷官及现场娱乐也是无可挑剔的，信誉可靠：设有 7×24小时进行在线监测，确保每一局游戏结果均为现场真实的游戏结果，而不是计算机默认的游戏结果，在我们的真人娱乐城，您可饱览整个赌场大厅和靓丽的美女荷官。玩法众多如真人百家乐，真人骰宝，真人龙虎以及真人轮盘。您也可以选择容易上手的KENO快乐彩消遣时光。</p>
            <h4 class="title">大赢家</h4>
            <p class="des">在澳门新葡京赌场的用户都是大赢家，我们将不间断的推出更多优惠，以实际、简单的申请方式迎待各来宾！。</p>
            <h4 class="title">慈善公益</h4>
            <p class="des">澳门新葡京赌场更肩负起对社会、对慈善公益的责任，也将永不磨灭的针对社会的需要作出更多的贡献。</p>
            <h4 class="title">客户服务：</h4>
            <p class="des">1、365天×24小时专业的客户服务，全天候处理会员出入款的相关事宜，严格训练的客服团队，以专业、亲切的态度，让每位玩家有宾至如归的感觉!</p>
            <p class="des">2、多渠道的与客户的互动交流，了解客户的需求，随时关注客户的意见及建议；</p>
            <p class="des">3、举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。</p>
            <h4 class="title">游戏责任：</h4>
            <p class="des">1、禁止未满18岁的人士参与赌博游戏。在加入游戏之前，请您确定您已年满18周岁。</p>
            <p class="des">2、自定博彩预算，幷按预算下注。</p>
            <h4 class="title">账户与资金：</h4>
            <p class="des">玩家网上支付和所有银行交易由国际金融机构在高标准的安全和机密的网络端口（SSL 128 bit encryption Standard）中进行。进入玩家帐户数据也必须有玩家唯一的登录ID和密码，确保客户的资金安全有保障。同时也采用最先进的加密措施来保证玩家的游戏安全，7×24小时的后台检测和监控，确保我们可以提供一个完全公正和安全的网络游戏空间。客户在本平台的所有活动均严格保密，我们绝不会向第三方（包括政府）透露客户数据。澳门新葡京赌场更专注于玩家的利益、最给力的优惠活动时时回馈各新老会员用户。品牌信誉，首选澳门新葡京赌场！</p>
          </div>
        </div>
        <!-- 联系我们 -->
        <div class="about_content" v-else-if="currPage === '/relation'">
          <div class="title">
            <h1>联系我们：</h1>
          </div>
          <div class="cont">
            <p class="des">澳门新葡京的客服中心全年无休，提供1周7天、每天24小时的优质服务。</p>
            <p class="des">如果您对本网站的使用有任何疑问，可以通过下列任一方式与客服人员联系，享受最实时的服务。</p>
            <p class="des">关于澳门新葡京的任何操作及相关问题，您可以在 ( 常见问题 )中找到答案，如果您仍然有任何疑惑？</p>
            <p class="des">请点击"在线客服"链接，即可进入在线客服系统与客服人员联系。</p>
            <p class="des">您亦可使用Email、电话方式与客服人员取得联系</p>
            <p class="des">官方投诉邮箱：amxpj@tgjt888.com</p>
          </div>
        </div>
        <!-- 存款帮助 -->
        <div class="about_content" v-else-if="currPage == '/save-help'">
          <div class="title">
            <h1>存款帮助：</h1>
          </div>
          <div class="cont">
            <h4 class="title">您现在可以通过以下方式存款到澳门新葡京：</h4>
            <h4 class="title">一、公司入款（推荐使用）</h4>
            <p class="des">会员登入后，点选“公司入款”，查看最新入款帐号，并进行转帐支付，转帐成功后填写入款信息并确认提交，财务专员收到款项及入款申请后，将第一时间内添加入款金额至您的会员帐号上，届时请注意查收，如有疑问，请及时联系24小时在线客服咨询受理！</p>
            <h4 class="title">注意事项：</h4>
            <p class="des">1、目前提供建设银行、工商银行、农业银行、招商银行卡、中国银行、浦发银行、中信银行、农村商业银行、交通银行、平安银行、民生银行、十家银行可选择，同行互转存款到帐时间约为五到十分钟，跨行划款需依据银行划款作业时间为基准，我们将于确认到帐后立刻为您游戏帐户充值。</p>
            <p class="des">2、入款帐户不定期更新，请在每次存款前，点击“公司入款”页面查询最新收款账号，如存款至过期账户造成财务无法查收，会员自行承担损失。</p>
            <h4 class="title">二、在线支付（即时到帐）</h4>
            <p class="des">会员登入后，点选“在线支付”，根据页面提示填入入款金额等操作直至入款成功 ，如有任何问题，请及时联系24小时在线客服咨询受理！</p>
            <h4 class="title">注意事项：</h4>
            <p class="des">1、支持借记卡：中国民生银行总行,中国工商银行,中国建设银行,兴业银行,中国光大银行,深圳发展银行,中国邮政,华夏银行,上海浦东发展银行,中国银行,上海银行,交通银行,广东发展银行,北京银行,中信银行,深圳平安银行,中国农业银行,招商银行。</p>
            <p class="des">2、确认送出后﹐将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待载入网络银行页面﹐传输中已将您账户数据加密﹐请耐心等待。进入网络银行页面﹐请确实填写您银行账号信息﹐支付成功﹐额度将在10分钟内系统处理完成，立即加入您的娱乐场会员账户。</p>
            <h4 class="title">三、银联支付</h4>
            <p class="des">仅供小额度存款，单笔最高￥20000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</p>
            <h4 class="title">四、微信支付</h4>
            <p class="des">仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</p>
            <h4 class="title">五、支付宝支付</h4>
            <p class="des">仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</p>
            <h4 class="title">六、云闪付</h4>
            <p class="des">仅供小额度存款，单笔最高￥5000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</p>
          </div>
        </div>
        <!-- 取款帮助 -->
        <div class="about_content" v-else-if="currPage == '/pull-help'">
          <div class="title">
            <h1>取款帮助：</h1>
          </div>
          <div class="cont">
            <p class="des">根据页面提示输入银行帐号、提款金额等信息，核实输入信息无误后确认提交，财务专员收到提款申请后，将第一时间内处理您的提款申请，请及时联系24小时在线客服咨询受理！如果您的帐号还未进行取款帐号绑定，请先绑定，当前支持绑定的银行有：工商银行、农业银行、北京银行、交通银行、中国银行、建设银行、光大银行、兴业银行、民生银行、招商银行、中信银行、广东发展银行、中国邮政、深圳发展银行、浦发银行……</p>
            <h4 class="title">取款需知:</h4>
            <p class="des">最低取款为￥100人民币，最高取款单笔￥100万人民币、单日1000万人民币；若超过1000万的提款，须提前一日提出申请。</p>
            <p class="des">取款过程，如有疑问，请第一时间联系在线客服咨询受理！</p>
          </div>
        </div>
      </div>
      <img src="/static/xpj83/img/left-logo.png" class="left-logo">
    </div>
  </div>
</div>
</template>

<script>
import banView from "../../public/game_new/banView";
  export default {
    data() {
      return {
        currPage:'',
        navList:[
          {
            icon:'/static/xpj83/img/game_rule.png',
            icon2:'/static/xpj83/img/game_rule_hover.png',
            name:'游戏规则',
            introduce:'GAME RULES',
            linkTo:'#/rules/ssc?id=4',
          },
          {
            icon:'/static/xpj83/img/about_1.png',
            icon2:'/static/xpj83/img/about_1_hover.png',
            name:'关于我们',
            introduce:'ABOUT US',
            linkTo:'/about-page',
          },
          {
            icon:'/static/xpj83/img/about_2.png',
            icon2:'/static/xpj83/img/about_2_hover.png',
            name:'联系我们',
            introduce:'CONTACT US',
            linkTo:'/relation',
          },
          {
            icon:'/static/xpj83/img/about_4.png',
            icon2:'/static/xpj83/img/about_4_hover.png',
            name:'存款帮助',
            introduce:'DEPOSIT',
            linkTo:'/save-help',
          },
          {
            icon:'/static/xpj83/img/about_5.png',
            icon2:'/static/xpj83/img/about_5_hover.png',
            name:'取款帮助',
            introduce:'WITHDRAW',
            linkTo:'/pull-help',
          },
        ],
        headBg: '/static/xpj83/img/about-top-bg.png',
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
      this.currPage = this.$route.path;
    },
    watch: {
      '$route.path'(newPath,oldPath){
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
  background-color: #2a0509;
}
.about-content{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  background: #1d124c url(/static/xpj83/img/aboutbg.jpg) center no-repeat;
  background-size: cover;
  .about-area{
    position: relative;
    width: 1200px;
    min-height: 811px;
    margin: 20px auto;
    background: url(/static/xpj83/img/about-line.png) no-repeat;
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
          border-bottom: 1px solid #ffe178;
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
    left: 22px;
  }

}
</style>