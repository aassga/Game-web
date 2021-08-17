<template>
<div>
  <section class="banner-cpyx">
    <banView :headerImg="headerImg" isScale='true' :picBox='300'></banView>
  </section>
  <div class="about-content clearfix">
    <div class="about-area clearfix main">
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
      <div class="right-content pull-left right">
        <!-- 关于我们 -->
        <div v-if="currPage === 'aboutUs'">
          <div class="title">
            <h1>关于我们：</h1>
          </div>
          <div class="cont">
            <p class="des">澳门新葡京由澳门葡京酒店开发的线上娱乐集团公司，拥有菲律宾最具权威的First Cagayan博彩运营牌照；我们在移动投注、信息安全及其它技术方面都处于行业领先地位。澳门新葡京奉行客户至上，信誉为本的价值观，为众多葡京会员提供优质的服务，是您最值得信赖的投注机构。</p>
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
            <p class="des">澳门新葡京赌场投诉邮箱： amxpj@tgjt888.com</p>
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
            <p class="des">支持借记卡：中国农业银行,中国工商银行,中国建设银行,招商银行,交通银行,上海浦东发展银行,中国光大银行,深圳平安银行。</p>
            <p class="des">4. 确认送出后，将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待加载网络银行页面，传输中已将您账户数据加密，请耐心等待。</p>
            <p class="des">5. 进入网络银行页面，请确实填写您银行账号信息，支付成功，额度将在10分钟内系统处理完成，立即加入您的澳门新葡京会员账户。</p>
            <p class="des">存款需知:</p>
            <p class="des">澳门新葡京最低存款为￥100人民币，最高存款无上限!</p>
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
            <p class="des">6. 最低取款为￥100人民币，取款上限为￥200000人民币。(在线支付每日最高取款总额上限为￥300000人民币,公司入款每日最高取款总额上限为￥1000000人民币)。</p>
            <p class="des">7. 澳门新葡京保留权利审核会员账户，若由最后一次入款起，有效下注金额需达到入款金额的100%，未达到而申请出款者，公司将收取入款金额的30%行政费用，以及￥50出款手续费。</p>
            <p class="des">**如有任何问题，请洽24小时在线客服！</p>
            <p class="des">**请注意**各游戏和局/未接受/取消注单，不纳入有效投注计算。运动博弈游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。</p>
            <p class="des">**大赔率产品包括: 1X2、过关、波胆、总入球、半全场、双胜彩、冠军赛。</p>
            <p class="des">**澳门新葡京相关优惠，请详见‘优惠活动’</p>
          </div>
        </div>
         <!-- 合作伙伴 -->
        <div class="item Cooperative" v-else-if="currPage === 'partner'">
          <h3 class="title_tit">
              <div class="leftNav" :class="{checkedIndex:checkedIndex ==0}" @click="changeNav(0)" >金字塔代理模式</div>
              <div class="rightNav" :class="{checkedIndex:checkedIndex ==1}" @click="changeNav(1)" >金字塔代理教程
                  <ul :class="[{ navActive: checkedIndex==1 }, 'childNavList']">
                      <li v-for="(navItem,navIndex) in childNavList" :key="navIndex" @click="goLinkTO(navIndex,navItem)">{{navItem.text}}</li>
                  </ul>
              </div>

          </h3>
          <div class="title_border"></div>
          <dl v-if="checkedIndex==0" class="navLeftItem">
              <dd>
                  <div class="navHeader">
                      <h3>既是玩家也是代理.合为一体</h3>
                      <p>注册成功后，您可自娱投注亦可赚取下级会员流水返佣，娱乐赚钱两不误</p>
                      <ul>
                          <li>
                              代理帐号<br>
                              自行娱乐
                          </li>
                          <li>
                              发展<br>
                              下线代理
                          </li>
                          <li>
                              发展<br>
                              下线会员
                          </li>
                      </ul>
                  </div>
                  <div class="navContent">
                      <h3>代理佣金计算方式</h3>
                      <p>流水洗码是根据下级会员所产生的有效投注计算，不计输赢，代理即可赚取</p>
                      <ul>
                          <li>
                              <div>
                                  <span class="navCon_top"> 产生的所有有效投注额</span><br/>
                                  <span class="navCon_bottom"> (下级会员+下级代理发展的会员)</span>
                              </div>
                          </li>
                          <li>
                              <div class="middleBorder">
                                  <img src="/static/cjw/img/help/agency.png" alt="">
                                  <div>
                                      <span>代理收益</span>
                                      <span>(佣金)</span>
                                  </div>
                              </div>
                          </li>
                          <li>分润点</li>
                      </ul>
                  </div>
                  <div class="navFooter">
                      <h3>代理共赢亮点</h3>
                      <ul>
                          <li>
                              <div class="navFooter_num">1</div>
                              <div class="middle_Footer">
                                  <span>佣金结算</span>
                              </div>
                              <div class="top_Footer">
                                  <p>佣金日结,于次日自动派</p>
                                  <p>送至游戏帐号,自行</p>
                                  <p>提款即可</p>
                              </div>
                          </li>
                          <li>
                              <div class="navFooter_num">2</div>
                              <div class="middle_Footer">
                                  <span>有效投注</span>
                              </div>
                              <div class="top_Footer">
                                  <p>代理发展的线下会员必须是真实</p>
                                  <p>有效，如虚假注册或无风险下</p>
                                  <p>注产生有效投注，将取消佣</p>
                                  <p>金派送或代理资格</p>
                              </div>
                          </li>
                          <li>
                              <div class="navFooter_num">3</div>
                              <div class="middle_Footer">
                                  <span>资源合作</span>
                              </div>
                              <div class="top_Footer">
                                  <p>如果您有好的推广资源，请立即</p>
                                  <p>送向公司申请定制邀请注册</p>
                                  <p>验证码专属推广网站</p>
                              </div>
                          </li>
                      </ul>
                  </div>
              </dd>
          </dl>
          <dl v-if="checkedIndex==1" class="navRightItem">
              <dd>
                  <div class="navTitle">{{navTitle}}</div>
                  <div class="navContent">
                      <div class="left_icon" @click="pre">
                          <i></i>
                      </div>
                      <div  v-for="(childItem,childIndex) in childNavList" :key="childItem['text']" class="img_List" >
                          <transition name="lists">

                            <img  alt="" :src="childItem.imgSrc" v-if="childIndex==childCheckedIndex" draggable="false">
                          </transition>
                      </div>
                      <div class="right_icon" @click="next">
                          <i></i>
                      </div>
                  </div>
              </dd>
          </dl>
        </div>

      </div>
      <img src="/static/cjw/img/about/left-logo.png" class="left-logo">
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
            icon:'/static/cjw/img/about/gameRule-icon.png',
            icon2:'/static/cjw/img/about/gameRule-icon2.png',
            name:'游戏规则',
            introduce:'GAME RULES',
            linkTo:'#/rules/ssc?id=4',
          },
          {
            icon:'/static/cjw/img/about/aboutUS-icon.png',
            icon2:'/static/cjw/img/about/aboutUS-icon2.png',
            name:'关于我们',
            introduce:'ABOUT US',
            linkTo:'/home/about/aboutUs',
          },
          {
            icon:'/static/cjw/img/about/contactUs-icon.png',
            icon2:'/static/cjw/img/about/contactUs-icon2.png',
            name:'联系我们',
            introduce:'CONTACT US',
            linkTo:'/home/about/contactUs',
          },
          {
            icon:'/static/cjw/img/about/deposit-icon.png',
            icon2:'/static/cjw/img/about/deposit-icon2.png',
            name:'存款帮助',
            introduce:'DEPOSIT',
            linkTo:'/home/about/deposit',
          },
          {
            icon:'/static/cjw/img/about/wthdrawal-icon.png',
            icon2:'/static/cjw/img/about/wthdrawal-icon2.png',
            name:'取款帮助',
            introduce:'WITHDRAW',
            linkTo:'/home/about/wthdrawal',
          },
          {
            icon:'/static/cjw/img/about/partner-icon.png',
            icon2:'/static/cjw/img/about/partner-icon2.png',
            name:'合作伙伴',
            introduce:'PARTNER',
            linkTo:'/home/about/partner',
          },
        ],
        headerImg: '/static/cjw/img/about/about-top-bg.jpg',
        bgColor:'#d2eff7',
        checkedIndex:0,
        childCheckedIndex:0,
        navTitle:"注册帐号",
        childNavList:[
            {text:"1: 如何让邀请注册帐号",imgSrc:"/static/cjw/img/help/register.png",title:'注册帐号'},
            {text:"2: 如何进入代理中心",imgSrc:"/static/cjw/img/help/goAgency.png",title:'进入代理中心'},
            {text:"3: 如何生成链接",imgSrc:"/static/cjw/img/help/invitation.png",title:'生成邀链接'},
            {text:"4: 如何管理链接",imgSrc:"/static/cjw/img/help/Manage.png",title:'管理邀链接'},
            {text:"5: 如何查看下级人数",imgSrc:"/static/cjw/img/help/ViewNumber.png",title:'查看下级人数'},
            {text:"6: 如何查看下级列表",imgSrc:"/static/cjw/img/help/report.png",title:'查看下级列表'},
            {text:"7: 如何查看下级财务",imgSrc:"/static/cjw/img/help/finance.png",title:'查看下级财务'},
            {text:"8: 如何查看代理收益",imgSrc:"/static/cjw/img/help/income.png",title:'查看代理受益'},
            {text:"9: 如何查看下级报表",imgSrc:"/static/cjw/img/help/viewXiaji.png",title:'查看下级报表'},
            {text:"10: 如何查看报表总汇",imgSrc:"/static/cjw/img/help/summary.png",title:'查看报表总汇'}
        ]
      }
    },
    methods:{
      goLink(link) {
        (link.includes('/rules')) && window.open(link)
        this.$router.push(link)
      },
      tab (index) {
        this.$router.push({
          path: '/home/about/' + index
        })
      },
      pre(){
        this.childCheckedIndex --;
        for(let i=0;i<this.childNavList.length;i++){
            if(this.childCheckedIndex==i){
                this.navTitle = this.childNavList[i].title
            }
        }
        if(this.childCheckedIndex<0){
            this.childCheckedIndex = 0;
        }
      },
      next(){
        this.childCheckedIndex ++;
         for(let i=0;i<this.childNavList.length;i++){
            if(this.childCheckedIndex==i){
                this.navTitle = this.childNavList[i].title
            }
        }
        if(this.childCheckedIndex>=this.childNavList.length-1){
            this.childCheckedIndex = this.childNavList.length-1
        }
      },
      changeNav(index){
          this.checkedIndex = index;

      },
      goLinkTO(i,item){
          this.childCheckedIndex =i;
          this.navTitle = item.title
      }
    },
    components:{
      banView
    },
    created() {
      this.currPage = this.$route.params.page
    },
    watch: {
      '$route.params.page'(newPath,oldPath){
        this.currPage = newPath
      }
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
.about-content{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  background-color: #f3f4f6;

  .about-area{
    position: relative;
    width: 1200px;
    min-height: 811px;
    margin: 25px auto;
    background: url('/static/cjw/img/about/about-line.png') no-repeat;
    background-color: #ffffff;
    border:2px solid rgba(222,233,240,1);
    background-position: 229px 88px;
    .left-nav{
      width: 256px;
      margin-top: 98px;
      ul {
        li {
          cursor: pointer;
          width: 202px;
          height: 86px;
          border-bottom: 1px dashed #6ab9ef;
          margin: 0 auto;
          .nav-link{
            display: block;
            width: 100%;
            height: 100%;
            color: #858585;
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
                font-size: 20px;
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
                color: #67A7DC;
              }
            }
          }
        }
      }
    }
    .right-content{
      width: 900px;
      padding: 45px 0 0 35px;
      color: #878787;
      .title{
        color: #696969;
        h1{
          font-size: 22px;
          height: 50px;
          border-bottom: 1px solid #e4e4e4;
        }
      }
      .cont{
        margin-top: 15px;
        min-height: 650px;
        padding-bottom: 20px;
        font-size: 18px;
        h4 {
          padding: 26px 0;
        }
        .des{
          line-height: 36px;
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
    width: 187px;
    height: 51px;
    position: absolute;
    top: 26px;
    left: 40px;
  }

}


.clear{
  clear: both;
  zoom: 1;
  overflow: hidden;
}
.relative{
    position: relative;
}

.content{
    width:1200px;
    margin:20px auto;
}
.right{
    width:890px;
    min-height:700px;
    margin:0 auto;
    font-size: 14px;
    background: #fff;
    border-radius: 5px;
}
.checkedIndex{
    background:#83D1F0!important;
    color:#125B69!important;
    height:58px!important;
}
.leftNav{
    float:left;
    cursor: pointer;
    width:261px;
    display: inline-block;
    height:51px;
    color:#6B6B6B;
    background:#DCDCDC;
    text-align: center;
}
.rightNav{
    cursor: pointer;
    float:left;
    position: relative;
    display: inline-block;
    width:261px;
    height:51px;
    color:#6B6B6B;
    background:#DCDCDC;
    text-align: center;
}
.rightNav .childNavList{
    transition: all 2s;
    display: none;
    position: absolute;
    left:0;
    top:58px;
    z-index: 99999999;
}

.rightNav:hover .navActive{
    display: block;
}
.rightNav .childNavList li{
    color:#fff;
    text-align: left;
    padding-left:36px;
    width:261px;
    height:51px;
    background:#96E1FF;
}
.right .title_tit{
    height: 51px;
    line-height: 51px;
    width: 100%;
    font-size: 18px;
}
.right .title_border{
    width:100%;
    height:7px;
    // background-color: rgba(161, 189, 240, 1)
}

.right h2{
    height:60px;
    width:642px;
    line-height:60px;
    font-size:28px;
    margin-bottom:20px;
    border-bottom:2px solid #e1ceae;
}
.right .item .title_tit{
       padding: 0 25px;
    //    border-bottom: 1px solid #ddd;
}

.right dl{
    padding: 10px 25px 30px;
}

.right dl dt{
    margin: 15px 0;
    font-size: 16px;
    color:#333;
    font-weight:bold;
}

.right dl dd{
    line-height: 2.2;
    font-size: 14px;
}
.right dl dd table tr td{
    border: 1px solid ;
    text-align: center;
    padding: 0 10px;
}

.red{
    color: #ff4a3b;
}
.block{
    display: block;
}

.Cooperative{
    min-height:900px;
    .title_tit{
        padding:0!important;
        .rightNav{
            .childNavList{
                li:hover{
                     background:#88D7F7!important;
                     color:#418EAD;
                }
            }
        }
    }
    dl{
        padding:0!important;
    }
    .navLeftItem{
        width:100%;
        margin:0 auto;
        text-align: center;
        .navHeader{
            margin:0 auto;
            padding:30px 0 56px 0;
            h3{
                font-size:20px;
                font-weight:bold;
                color:rgba(0,0,0,1);
            }
            p{
                margin-top:10px;
                font-size:16px;
                font-weight:bold;
                color:rgba(105,105,105,1);
            }
            ul{
                width:100%;
                margin-top:51px;
                overflow: hidden;
                li{
                    width:160px;
                    height:98px;
                    padding:25px 0 28px 0;
                    text-align: center;
                    line-height: 24px;
                    background:linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1));
                    // box-shadow:0px 7px 8px 0px rgba(38,103,222,0.27);
                    border-radius:10px;
                    color:white;
                    float:left;
                }
                li:nth-child(2){
                    margin:0 67px;
                }
                li:nth-child(1){
                    margin-left:130px;
                }
            }
        }
        .navContent{
            padding:42px 0 37px 0;
            h3{
                font-size:20px;
                font-weight:bold;
                color:rgba(0,0,0,1);
            }
            p{
                margin-top: 12px;
                font-size:16px;
                font-weight:bold;
                color:rgba(105,105,105,1);
            }
            ul{
                overflow: hidden;
                position: relative;
                margin-top: 35px;
                padding-left:131px;
                padding-right: 105px;
                li{
                    float:left;
                    text-align: center;
                    display: table;
                    div{
                        display: table-cell;
                        vertical-align: middle;
                        height:17px;
                        font-size:18px;
                        color:rgba(255,255,255,1);
                    }
                }
                li:nth-child(1){
                    margin-top:80px;
                    width:197px;
                    position: absolute;
                    left:131px;
                    z-index: 99999;
                    top:0;
                    line-height: 30px;
                    height:197px;
                    background:linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1));
                    border-radius:50%;
                    div{
                        width:178px;
                        .navCon_top{
                            font-size: 18px;
                        }
                        .navCon_bottom{
                            font-size:16px;
                        }
                    }
                }
                li:nth-child(2){
                    width:332px;
                    height:331px;
                    position: absolute;
                    left:208px;
                    top:0;
                    border:4px solid rgba(81,177,231,1);
                    border-radius:50%;
                    margin-left:-70px!important;
                    margin-right: -70px!important;
                    position: relative;
                    .middleBorder{
                        position: absolute;
                        left:0;right:0;top:0;bottom:0;
                        margin:auto;
                        width:149px;
                        height:130px;
                        div{
                            position: absolute;
                            left:42px;
                            bottom:-7px;
                            span{
                                color:rgba(105,105,105,1);
                                font-size: 16px;
                                display: block;
                                line-height: 20px;
                            }
                        }
                    }
                }
                li:nth-child(3){
                    position: absolute;
                    right:152px;
                    top:0;
                    margin-top:80px;
                    width:197px;
                    height:197px;
                    background:linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1));
                    border-radius:50%;
                    line-height: 197px;
                    font-size: 18px;
                    color:white;
                }
            }

        }
        .navFooter{
            padding:40px 0 57px 0;
            h3{
                font-size:20px;
                font-weight:bold;
                color:rgba(0,0,0,1);
            }
            p{
                margin-top: 12px;
                font-size:16px;
                font-weight:bold;
                color:rgba(105,105,105,1);
            }
            ul{
                overflow: hidden;
                margin-top: 35px;
                li{
                    float:left;
                    text-align: center;
                    display: table;
                    width:268px;
                    height:268px;
                    margin:0 auto;
                    border-radius:50%;
                    .navFooter_num{
                        font-size: 50px;
                        font-weight: bold;
                    }
                    .middle_Footer{
                        height:22px;
                        font-weight: bold;
                        line-height: 2px;
                    }
                    .top_Footer{
                        height:64px;
                        font-size:16px;
                        line-height:24px;
                        p{
                            margin-top:0;
                        }
                    }
                }
                li:nth-child(1){
                    margin-left:20px;
                    background:linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1));
                    margin-right: 14px;
                    color:rgba(255,255,255,1);
                    p{
                         color:rgba(255,255,255,1);
                    }

                }
                li:nth-child(2){
                    background:rgba(241,241,241,1);
                    margin-right: 15px;
                    color:rgba(68,68,68,1);
                    .navFooter_num{
                        color:#8ADBEF;
                    }

                }
                li:nth-child(3){
                    border:2px solid rgba(81,177,231,1);
                    color:rgba(59,59,59,1);
                }
            }
        }
    }
    .navRightItem{
         .navTitle{
            margin-top: 19px;
            margin-left:14px;
            width:193px;
            height:39px;
            text-align: center;
            line-height: 39px;
            background:#96E1FF;
            font-size:18px;
            color:rgba(255,255,255,1);
        }
        .navContent{
            position: relative;
            margin-top:15px;
            .img_List{
                transition: all .4s ease-in;
            }
            .left_icon{
                cursor: pointer;
                position: absolute;
                left:10px;
                top:180px;
                width:60px;
                height:60px;
                opacity:0.6;
                border-radius:50%;
                i{
                    background:url(/static/cjw/img/help/tbz-hover.png) no-repeat;
                    display: inline-block;
                    width:62px;
                    height:62px;
                }
            }
            .left_icon:hover{
              i{
                  background:url(/static/cjw/img/help/tbz.png) no-repeat;
              }
            }
            .right_icon{
                cursor: pointer;
                position: absolute;
                right:10px;
                top:180px;
                width:60px;
                height:60px;
                opacity:0.6;
                border-radius:50%;
                i{
                    background:url(/static/cjw/img/help/tby-hover.png) no-repeat;
                    display: inline-block;
                    width:62px;
                    height:62px;
                }
            }
            .right_icon:hover{
              i{
                  background:url(/static/cjw/img/help/tby.png) no-repeat;
              }
            }
        }
    }
}
</style>