<template>
  <div id="content_bg" class="content-main-bg">
    <div class="banner"></div>
    <div class="content clear">
      <div class="sidebar fl" id="sidebar">
        <ul class="clear">
          <li
            :class="[$route.params.id == index ? 'on' : '']"
            @click="tab(index)"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="bg"></div>
            <div class="nr">
              <span>·</span><i>{{ item.item }}</i>
            </div>
          </li>
        </ul>
      </div>

      <div class="main fr">
        <div class="right" id="items">
          <div class="item" v-show="$route.params.id == 1">
            <div class="title">
              <h1>关于我们</h1>
            </div>
            <div class="cont">
              <p class="des">
                品牌信誉-首选太阳城集团，最具公信力的博彩公司、更有高质量的游戏平台，太阳城集团为哥斯达黎加合法注册之博彩公司之一。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。在日渐热络、成熟的网络博彩市场中，除了多元化的游戏外，网络安全最为客户注重，公司针对现阶段网络安全问题，成立了网络安全维护中心，彻底为客户的网络安全解决了后顾之忧，诺顿分级评级审核"太阳城集团"为最安全网站之一，并获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家所有隐私。
              </p>
              <h4 class="title">诚信为本：</h4>
              <p class="des">
                全网最高信誉，从太阳城集团开始！作为国际专业的网上博彩游戏运营商，我们承诺，为每一位客户提供最安全、最公平的博彩娱乐，以及全方位的服务。我们采用坚实、稳定与安全的博彩系统。所有游戏共同的优点
                —
                不须耗时下载；界面简单明了；操作功能齐全；画面精致优雅；游戏结果公平、公正、公开！由于您的信息保密度至关重要。我们将坚持实行严格保密和隐私制度。
              </p>
              <h4 class="title">多元化游戏：</h4>
              <p class="des">
                除了体育游戏项目多元化外，全方位提供：香港六合彩，时时彩，快乐彩等。精挑细选各种在线游戏，给您提供最好的选择。真人荷官及现场娱乐也是无可挑剔的，信誉可靠：设有
                7×24小时进行在线监测，确保每一局游戏结果均为现场真实的游戏结果，而不是计算机默认的游戏结果，在我们的真人娱乐城，您可饱览整个赌场大厅和靓丽的美女荷官。玩法众多如真人百家乐，真人骰宝，真人龙虎以及真人轮盘。您也可以选择容易上手的KENO快乐彩消遣时光。
              </p>
              <h4 class="title">大赢家</h4>
              <p class="des">
                在太阳城集团的用户都是大赢家，我们将不间断的推出更多优惠，以实际、简单的申请方式迎待各来宾！。
              </p>
              <h4 class="title">慈善公益</h4>
              <p class="des">
                太阳城集团更肩负起对社会、对慈善公益的责任，也将永不磨灭的针对社会的需要作出更多的贡献。
              </p>
              <h4 class="title">客户服务：</h4>
              <p class="des">
                1、365天×24小时专业的客户服务，全天候处理会员出入款的相关事宜，严格训练的客服团队，以专业、亲切的态度，让每位玩家有宾至如归的感觉!
              </p>
              <p class="des">
                2、多渠道的与客户的互动交流，了解客户的需求，随时关注客户的意见及建议；
              </p>
              <p class="des">
                3、举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。
              </p>
              <h4 class="title">游戏责任：</h4>
              <p class="des">
                1、禁止未满18岁的人士参与赌博游戏。在加入游戏之前，请您确定您已年满18周岁。
              </p>
              <p class="des">2、自定博彩预算，幷按预算下注。</p>
              <h4 class="title">账户与资金：</h4>
              <p class="des">
                玩家网上支付和所有银行交易由国际金融机构在高标准的安全和机密的网络端口（SSL
                128 bit encryption
                Standard）中进行。进入玩家帐户数据也必须有玩家唯一的登录ID和密码，确保客户的资金安全有保障。同时也采用最先进的加密措施来保证玩家的游戏安全，7×24小时的后台检测和监控，确保我们可以提供一个完全公正和安全的网络游戏空间。客户在本平台的所有活动均严格保密，我们绝不会向第三方（包括政府）透露客户数据。太阳城集团更专注于玩家的利益、最给力的优惠活动时时回馈各新老会员用户。品牌信誉，首选太阳城集团！
              </p>
            </div>
          </div>
          <div class="item" v-show="$route.params.id == 2">
            <div class="title">
              <h1>联系我们</h1>
            </div>
            <div class="cont">
              <p class="des">
                太阳城集团的客服中心全年无休，提供1周7天、每天24小时的优质服务。
              </p>
              <p class="des">
                如果您对本网站的使用有任何疑问，可以通过下列任一方式与客服人员联系，享受最实时的服务。
              </p>
              <p class="des">
                关于太阳城集团的任何操作及相关问题，您可以在 ( 常见问题
                )中找到答案，如果您仍然有任何疑惑？
              </p>
              <p class="des">
                请点击"在线客服"链接，即可进入在线客服系统与客服人员联系。
              </p>
              <p class="des">您亦可使用Email、电话方式与客服人员取得联系</p>
              <p class="des">官方投诉邮箱：htyc@tgjt888.com</p>
            </div>
          </div>
          <div class="item" v-show="$route.params.id == 3">
            <div class="title">
              <h1>存款帮助</h1>
            </div>
            <div class="cont">
              <h4 class="title">您现在可以通过以下方式存款到太阳城集团：</h4>
              <h4 class="title">一、公司入款（推荐使用）</h4>
              <p class="des">
                会员登入后，点选“公司入款”，查看最新入款帐号，并进行转帐支付，转帐成功后填写入款信息并确认提交，财务专员收到款项及入款申请后，将第一时间内添加入款金额至您的会员帐号上，届时请注意查收，如有疑问，请及时联系24小时在线客服咨询受理！
              </p>
              <h4 class="title">注意事项：</h4>
              <p class="des">
                1、目前提供建设银行、工商银行、农业银行、招商银行卡、中国银行、浦发银行、中信银行、农村商业银行、交通银行、平安银行、民生银行、十家银行可选择，同行互转存款到帐时间约为五到十分钟，跨行划款需依据银行划款作业时间为基准，我们将于确认到帐后立刻为您游戏帐户充值。
              </p>
              <p class="des">
                2、入款帐户不定期更新，请在每次存款前，点击“公司入款”页面查询最新收款账号，如存款至过期账户造成财务无法查收，会员自行承担损失。
              </p>
              <h4 class="title">二、在线支付（即时到帐）</h4>
              <p class="des">
                会员登入后，点选“在线支付”，根据页面提示填入入款金额等操作直至入款成功
                ，如有任何问题，请及时联系24小时在线客服咨询受理！
              </p>
              <h4 class="title">注意事项：</h4>
              <p class="des">
                1、支持借记卡：中国民生银行总行,中国工商银行,中国建设银行,兴业银行,中国光大银行,深圳发展银行,中国邮政,华夏银行,上海浦东发展银行,中国银行,上海银行,交通银行,广东发展银行,北京银行,中信银行,深圳平安银行,中国农业银行,招商银行。
              </p>
              <p class="des">
                2、确认送出后﹐将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待载入网络银行页面﹐传输中已将您账户数据加密﹐请耐心等待。进入网络银行页面﹐请确实填写您银行账号信息﹐支付成功﹐额度将在10分钟内系统处理完成，立即加入您的娱乐场会员账户。
              </p>
              <h4 class="title">三、银联支付</h4>
              <p class="des">
                仅供小额度存款，单笔最高￥20000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。
              </p>
              <h4 class="title">四、微信支付</h4>
              <p class="des">
                仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。
              </p>
              <h4 class="title">五、支付宝支付</h4>
              <p class="des">
                仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。
              </p>
              <h4 class="title">六、云闪付</h4>
              <p class="des">
                仅供小额度存款，单笔最高￥5000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。
              </p>
            </div>
          </div>
          <div class="item" v-show="$route.params.id == 4">
            <div class="title">
              <h1>取款帮助</h1>
            </div>
            <div class="cont">
              <p class="des">
                根据页面提示输入银行帐号、提款金额等信息，核实输入信息无误后确认提交，财务专员收到提款申请后，将第一时间内处理您的提款申请，请及时联系24小时在线客服咨询受理！如果您的帐号还未进行取款帐号绑定，请先绑定，当前支持绑定的银行有：工商银行、农业银行、北京银行、交通银行、中国银行、建设银行、光大银行、兴业银行、民生银行、招商银行、中信银行、广东发展银行、中国邮政、深圳发展银行、浦发银行……
              </p>
              <h4 class="title">取款需知:</h4>
              <p class="des">
                最低取款为￥100人民币，最高取款单笔￥100万人民币、单日1000万人民币；若超过1000万的提款，须提前一日提出申请。
              </p>
              <p class="des">
                取款过程，如有疑问，请第一时间联系在线客服咨询受理！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { item: "游戏规则" },
        { item: "关于我们" },
        { item: "联系我们" },
        { item: "存款帮助" },
        { item: "取款帮助" },
      ],
      checkedIndex: 0,
      childCheckedIndex: 0,
      navTitle: "注册帐号",
    };
  },
  methods: {
    tab(index) {
      if (index == 0) {
        window.open("#/rules/ssc?id=4");
      } else {
        this.$router.push({
          path: "/home/about/" + index,
        });
      }
    },

    changeNav(index) {
      this.checkedIndex = index;
    },
    goLink(i, item) {
      this.childCheckedIndex = i;
      this.navTitle = item.title;
    },
  },
};
</script>

<style lang="less" scoped>
.lists-enter-active,
.lists-leave-active {
  //   transition: transform .5s;
  animation: you 0.2s 1;
}
.lists-enter, .lists-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  display: none;
  // opacity: 0;
  //   transition:  transform 0 ease 0;
  //   transform: scale(1.2)
}
@keyframes you {
  to {
    transform: scale(1);
  }
  from {
    transform: scale(1.1);
  }
}
.clear {
  clear: both;
  zoom: 1;
  overflow: hidden;
}
.relative {
  position: relative;
}

.content-main-bg {
  // max-width: 1920px;
  // min-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  background: #280830;
  .banner {
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url("/static/tyc86/img/gy.png") center top/ cover no-repeat;
  }
}

#content_bg .content {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  background: #2b0636;
  min-height: 600px;
  margin: 0 auto;
  padding: 20px;
}

#content_bg .content .sidebar {
  background-color: #380f3a;
  border: 1px solid #4c1451;
  width: 230px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding: 10px 0;
}

#content_bg .content .sidebar ul {
  width: 100%;
  border-radius: 5px;
  background-color: #380f3a;
}

#content_bg .content .sidebar ul li {
  float: left;
  width: 230px;
  height: 58px;
  line-height: 58px;
  padding-left: 45px;
  // border-left: 4px solid transparent;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
}
#content_bg .content .sidebar ul li .bg {
  width: 100%;
  height: 58px;
  background: linear-gradient(90deg, #821679, #b515b8);
  transition: 0.5s;
  position: absolute;
  left: -100%;
  top: 0;
}
#content_bg .content .sidebar ul li .nr {
  width: 100%;
  height: 100%;
  padding-left: 50px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 58px;
  font-size: 14px;
  color: #666;
}
#content_bg .content .sidebar ul li .nr span {
  font-weight: 700;
  font-size: 20px;
  transition: 0.4s;
  padding-right: 10px;
  color: #666;
}
#content_bg .content .sidebar ul .on .bg {
  left: 0;
}

#content_bg .content .sidebar ul .on .nr {
  background: linear-gradient(90deg, #821679, #b515b8);
  color: #fff;
}
#content_bg .content .sidebar ul .on .nr span {
  color: #000;
}

@keyframes stripes {
  to {
    background-size: 100% 100%;
  }
}

#content_bg .content .sidebar ul li .iconfont {
  margin-right: 10px;
  font-size: 24px;
  vertical-align: middle;
}
#content_bg .content .sidebar .clear {
  height: 100%;
}
#content_bg .content .main {
  padding-left: 10px;
}
#content_bg .content .main .right {
  width: 920px;
  border-radius: 15px;
  min-height: 700px;
  font-size: 14px;
  padding: 25px 45px;
  background-color: #380f3a;
  border: 1px solid #4c1451;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

#content_bg .content .main .right .checkedIndex {
  background: rgba(161, 189, 240, 1) !important;
  color: white !important;
  height: 58px !important;
}

#content_bg .content .main .right .leftNav {
  float: left;
  cursor: pointer;
  width: 261px;
  display: inline-block;
  height: 51px;
  color: rgba(153, 153, 153, 1);
  background: rgba(241, 241, 241, 1);
  text-align: center;
}

#content_bg .content .main .right .rightNav {
  cursor: pointer;
  float: left;
  position: relative;
  display: inline-block;
  width: 261px;
  height: 51px;
  color: rgba(153, 153, 153, 1);
  background: rgba(241, 241, 241, 1);
  text-align: center;
}
#content_bg .content .main .right .rightNav .childNavList {
  transition: all 2s;
  display: none;
  position: absolute;
  left: 0;
  top: 58px;
  z-index: 99999999;
}

#content_bg .content .main .right .rightNav:hover .navActive {
  display: block;
}

#content_bg .content .main .right .rightNav .childNavList li {
  color: #999999;
  text-align: left;
  padding-left: 57px;
  width: 263px;
  height: 51px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(161, 189, 240, 1);
}

#content_bg .content .main .right .title {
  height: 51px;
  line-height: 51px;
  width: 100%;
  font-size: 18px;
  color: #666;
}
#content_bg .content .main .right .title_border {
  width: 100%;
  height: 7px;
  // background-color: rgba(161, 189, 240, 1)
}

#content_bg .content .main .right h2 {
  height: 60px;
  width: 642px;
  line-height: 60px;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 2px solid #e1ceae;
}
#content_bg .content .main .right .item > .title {
  color: #666;
  width: 865px;
  margin-bottom: 15px;
}

#content_bg .content .main .right h1 {
  font-size: 18px;
  height: 50px;
  color: #f7c96a;
}
#content_bg .content .main .right .cont {
  color: #fff;
  margin-top: 15px;
  min-height: 650px;
  width: 841px;
  margin: 0 auto;
  padding-bottom: 20px;
  font-size: 14px;
  h4 {
    font-size: 16px;
    font-weight: bold;
    color: #f7c96a;
  }
  .des {
    line-height: 30px;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-thumb {
    width: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#content_bg .content .main .right dl {
  padding: 10px 25px 30px;
}

#content_bg .content .main .right dl dt {
  margin: 15px 0;
  font-size: 16px;
  color: #666;
  font-weight: bold;
}

#content_bg .content .main .right dl dd {
  line-height: 2.2;
  font-size: 14px;
}
#content_bg .content .main .right dl dd table tr td {
  border: 1px solid;
  text-align: center;
  padding: 0 10px;
}
.rule-list {
  font-size: 18px;
  padding: 0 25px;
  border-bottom: 1px solid #ddd;
}
.rule-list li {
  display: inline-block;
  height: 65px;
  line-height: 65px;
  margin-right: 50px;
  color: #666;
  cursor: pointer;
}
.rule-list li.active,
.rule-list li:hover {
  border-bottom: 2px solid #fff;
}

.url-link {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  color: #3075f2;
}
.text-center {
  text-align: center;
}
.red {
  color: #ff4a3b;
}
.table th {
  background: #e3eaf1;
  height: 30px;
  color: #666;
}
.table td,
table th {
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 5px;
  background: #f3f4f4;
  text-align: center;
}
.table {
  width: 97%;
  margin: 12px;
  border-top: 1px solid #bbb;
  border-left: 1px solid #bbb;
  border-spacing: 0;
  font-size: 16px;
  color: #666;
  border-radius: 10px;
  border-collapse: separate;
}
.table tr {
  height: 30px;
}

table th:nth-last-of-type(1) {
  border-radius: 0 10px 0 0;
}
table th:nth-of-type(1) {
  border-radius: 10px 0 0 0;
}
table td.bottom-border-radius {
  border-radius: 0 0 10px 0;
}
table td.left-border-radius {
  border-radius: 0 0 0 10px;
}

.markedCss {
  font-size: 16px;
  font-weight: bold;
  color: #007aff;
}

.license-container {
  overflow: hidden;
  border: 5px solid #e6cdb7;
}

.license1 {
  float: left;
  width: 25%;
  border-right: 5px solid #e6cdb7;
}

.license1 > img {
  width: 100%;
}
.detail-intro {
  float: left;
  width: auto;
  padding: 7% 5%;
}
.detail-intro > p {
  line-height: 3;
}
.detail-intro > p span {
  color: red;
}

.detail-intro > a {
  display: block;
  height: 60px;
  line-height: 60px;
  text-align: left;
}

.detail-intro .btn {
  display: inline-block;
  text-align: center;
  width: 160px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #fd4747;
  color: #fff;
}

.detail-intro img {
  vertical-align: middle;
}

.service-cont li {
  display: inline-block;
  vertical-align: top;
  width: 200px;
  height: 200px;
  padding: 20px;
  margin-right: 10px;
  text-align: center;
  border-radius: 10px;
  background: #eff3f7;
  -webkit-box-shadow: 0 0.1rem 0.1rem transparent;
  box-shadow: 0 0.1rem 0.1rem transparent;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

.service-cont li:hover {
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  -webkit-transform: translateY(-2%);
  -ms-transform: translateY(-2%);
  transform: translateY(-2%);
}
.block {
  display: block;
}
.service-context {
  line-height: 1;
}

.service-context .service-title {
  margin: 20px 0 5px;
  color: #fff;
  font-size: 14px;
}
.service-context .service-text {
  margin-bottom: 20px;
  color: #999;
  font-size: 12px;
}
.service-context .service-btn {
  height: 26px;
  line-height: 25px;
  width: 80px;
  border-radius: 13px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background: #a1bdf0;
}
.code-cont {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  padding: 20px 8px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  color: #fff;
  background: #8facdf;
}

.code-cont.show {
  display: block;
}

.email-item {
  display: inline-block;
  width: 270px;
  margin: 30px 10px 0 0;
  line-height: 1;
  padding: 15px 25px;
  border-radius: 10px;
  background: #eff3f7;
}

.email-item .service-title {
  margin-bottom: 8px;
  color: #fff;
  font-size: 14px;
}
.email-item .service-text {
  color: #999;
  font-size: 12px;
  line-height: 1.5;
}
.email-item .service-title .iconfont {
  margin-right: 5px;
  font-size: 16px;
  color: #f3c56d;
}
.top_nav .dropdown {
  width: 714px;
}

.content-main-bg.night {
  background: url(/images/main-bg-night.jpg) repeat-y center top;
}

.Cooperative {
  min-height: 900px;
  .title {
    padding: 0 !important;
    .rightNav {
      .childNavList {
        li:hover {
          background: rgba(237, 244, 250, 1) !important;
          color: rgba(161, 189, 240, 1);
        }
      }
    }
  }
  dl {
    padding: 0 !important;
  }
  .navLeftItem {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .navHeader {
      margin: 0 auto;
      padding: 30px 0 56px 0;
      h3 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      p {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(105, 105, 105, 1);
      }
      ul {
        width: 100%;
        margin-top: 51px;
        overflow: hidden;
        li {
          width: 160px;
          height: 98px;
          padding: 25px 0 28px 0;
          text-align: center;
          line-height: 24px;
          background: rgba(161, 189, 240, 1);
          box-shadow: 0px 7px 8px 0px rgba(38, 103, 222, 0.27);
          border-radius: 10px;
          color: white;
          float: left;
        }
        li:nth-child(2) {
          margin: 0 67px;
        }
        li:nth-child(1) {
          margin-left: 130px;
        }
      }
    }
    .navContent {
      padding: 42px 0 37px 0;
      h3 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      p {
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(105, 105, 105, 1);
      }
      ul {
        overflow: hidden;
        position: relative;
        margin-top: 35px;
        padding-left: 131px;
        padding-right: 105px;
        li {
          float: left;
          text-align: center;
          display: table;
          div {
            display: table-cell;
            vertical-align: middle;
            height: 17px;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
          }
        }
        li:nth-child(1) {
          margin-top: 80px;
          width: 197px;
          position: absolute;
          left: 131px;
          z-index: 99999;
          top: 0;
          line-height: 30px;
          height: 197px;
          background: rgba(84, 104, 154, 1);
          border-radius: 50%;
          div {
            width: 178px;
            .navCon_top {
              font-size: 18px;
            }
            .navCon_bottom {
              font-size: 16px;
            }
          }
        }
        li:nth-child(2) {
          width: 332px;
          height: 331px;
          position: absolute;
          left: 208px;
          top: 0;
          border: 4px solid rgba(84, 104, 154, 1);
          border-radius: 50%;
          margin-left: -70px !important;
          margin-right: -70px !important;
          position: relative;
          .middleBorder {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 149px;
            height: 130px;
            div {
              position: absolute;
              left: 42px;
              bottom: -7px;
              span {
                color: rgba(105, 105, 105, 1);
                font-size: 16px;
                display: block;
                line-height: 20px;
              }
            }
          }
        }
        li:nth-child(3) {
          position: absolute;
          right: 152px;
          top: 0;
          margin-top: 80px;
          width: 197px;
          height: 197px;
          background: rgba(84, 104, 154, 1);
          border-radius: 50%;
          line-height: 197px;
          color: white;
        }
      }
    }
    .navFooter {
      padding: 40px 0 57px 0;
      h3 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
      p {
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(105, 105, 105, 1);
      }
      ul {
        overflow: hidden;
        margin-top: 35px;
        li {
          float: left;
          text-align: center;
          display: table;
          width: 268px;
          height: 268px;
          margin: 0 auto;
          border-radius: 50%;
          .navFooter_num {
            font-size: 50px;
            font-weight: bold;
          }
          .middle_Footer {
            height: 22px;
            font-weight: bold;
            line-height: 2px;
          }
          .top_Footer {
            height: 64px;
            font-size: 16px;
            line-height: 24px;
            p {
              margin-top: 0;
            }
          }
        }
        li:nth-child(1) {
          margin-left: 20px;
          background: rgba(161, 189, 240, 1);
          margin-right: 14px;
          color: rgba(255, 255, 255, 1);
          p {
            color: rgba(255, 255, 255, 1);
          }
        }
        li:nth-child(2) {
          background: rgba(241, 241, 241, 1);
          margin-right: 15px;
          color: rgba(68, 68, 68, 1);
          .navFooter_num {
            color: rgba(161, 189, 240, 1);
          }
        }
        li:nth-child(3) {
          border: 2px solid rgba(161, 189, 240, 1);
          color: rgba(59, 59, 59, 1);
        }
      }
    }
  }
  .navRightItem {
    .navTitle {
      margin-top: 19px;
      margin-left: 14px;
      width: 193px;
      height: 39px;
      text-align: center;
      line-height: 39px;
      background: rgba(161, 189, 240, 1);
      border-radius: 5px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
    }
    .navContent {
      position: relative;
      margin-top: 15px;
      .img_List {
        transition: all 0.4s ease-in;
      }
      .left_icon {
        cursor: pointer;
        position: absolute;
        left: 10px;
        top: 180px;
        width: 60px;
        height: 60px;
        background: red;
        opacity: 0.6;
        border-radius: 50%;
        i {
          background: url(/static/qygj/img/help/tbz.png) no-repeat;
          display: inline-block;
          width: 62px;
          height: 62px;
        }
      }
      .right_icon {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 180px;
        width: 60px;
        height: 60px;
        background: red;
        opacity: 0.6;
        border-radius: 50%;
        i {
          background: url(/static/qygj/img/help/tby.png) no-repeat;
          display: inline-block;
          width: 62px;
          height: 62px;
        }
      }
    }
  }
}
</style>
