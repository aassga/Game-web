<template>
<div>
  <div class="about-content clearfix">
    <div class="noticeBar">
      <banLantern :notice='notice' :siteName="'tycjt'"></banLantern>
    </div>
    
    <div class="about-area clearfix">
      
      <div class="left-nav pull-left">
        <ul>
          <li v-for="(item,i) in navList" :key="i">
            <div @click="goLink(item.linkTo)" :class="['clearfix','nav-link',item.linkTo.includes(currPage) ? 'active' : '']">
              <!-- <img :src="item.icon" class="pull-left nav-img">
              <img :src="item.icon2" class="pull-left nav-img2"> -->
              <span :class="['icon1_'+i,'icon_1']"></span>
              <span :class="['icon2_'+i,'icon_2']"></span>
              <div class="name-area pull-left">
                <div class="name">{{item.name}}</div>
                <div class="introduce"></div>
              </div>
            </div>
          </li>
        </ul>
        <div style="padding: 41px 10px 23px 8px;"><img src="/static/tycjt/img/s_img02.png"></div>
      </div>
      <div class="right-content pull-left">
        <!-- 关于我们 -->
        <div v-if="currPage === 'aboutUs'">
          <!-- <div class="title">
            <h1>关于我们：</h1>
          </div> -->
          <div class="cont">
            <p class="des">澳门太阳城拥有菲律宾最具权威的First Cagayan博彩运营牌照；我们在移动投注、信息安全及其它技术方面都处于行业领先地位。澳门太阳城奉行客户至上，信誉为本的价值观，为众多澳门太阳城会员提供优质的服务，是您最值得信赖的投注机构。</p>
            <p class="des">澳门太阳城拥有多元化游戏平台，集真人娱乐、棋牌、彩票、电子游戏、体育竞猜，捕鱼等多款游戏，澳门太阳城是2018世界杯官方指定合作伙伴，是四大体育赛事的顶级合法投注机构，被誉为是业内最安全、最丰富，最专业，最诚信的线上博彩集团公司。</p>
            <h4 class="title">产品介绍</h4>
            <p class="des">澳门太阳城自主研发的全球一体化移动娱乐客户端，将海量真人娱乐厅、棋牌、彩票、电子游戏、体育竞猜，捕鱼等最新娱乐项目装进移动端，让用户体验时下备受推崇的一体化移动娱乐概念。被誉为业界最便捷，最丰富，最专业的当代产品，全方位覆盖安卓/IOS/H5/PC四大端，让用户足不出户，随时随地均可享受澳门太阳城带来的尊贵优质投注体验，最佳赔率选择，最便捷的操作方式，最高投注效率，是一款业界领先、具有里程碑意义的移动客户端。</p>
            <h4 class="title">支付渠道</h4>
            <p class="des">澳门太阳城与中国银联合作，全面无缝衔接，支持各大支付方式，云闪付、支付宝、微信、网银、银联、京东钱包等应有尽有。经过云加密采用国际标准256位加密技术的支付系统保障您的支付存提万无一失。</p>
            <h4 class="title">安全及隐私</h4>
            <p class="des">澳门太阳城非常重视客户的隐私，绝不会泄漏、转售或与其他机构进行交换，公司在严格的安全系统中将客户资料加密储存，以保护客户资料的安全。</p>
          </div>
        </div>
        <!-- 联系我们 -->
        <div v-else-if="currPage === 'contactUs'">
          <!-- <div class="title">
            <h1>联系我们：</h1>
          </div> -->
          <div class="cont">
            <p class="des">澳门太阳城的客服中心全年无休，提供1周7 天、每天24小时的优质服务。</p>
            <p class="des">如果您对本网站的使用有任何疑问，可以通过下列方式与客服人员联系，享受最实时的服务</p>
            <p class="des">点击"在线客服"链接，即可进入在线客服系统与客服人员联系。</p>
            <p class="des">您亦可使用Email与客服人员取得联系</p>
            <p class="des">官方邮箱：tyctsyouxiang@gmail.com</p>
          </div>
        </div>
        <!-- 存款帮助 -->
        <div v-else-if="currPage === 'deposit'">
          <!-- <div class="title">
            <h1>存款帮助：</h1>
          </div> -->
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
            <p class="des">如入款账号已过期，澳门太阳城恕不负责！万请见谅，感谢配合。</p>
            <p class="des">4. 核对提交数据/提交申请</p>
            <p class="des">汇款完成请填写并提交相关数据，并备份您的公司入款订单号。 系统在收到款项后会进行比对，如果存款金</p>
            <p class="des">额、时间相符合，则会将款项加入您的游戏账号中。处理时间通常为5-30分钟。(跨行转账时间可能会超过30分)</p>
            <p class="des">5. 若5钟内未到帐，请联系在线客服人员。</p>
            <p class="des">客服人员会与您核对存款数据，必要时需要您提供截图、转账数据等相关证明。</p>
            <h4 class="title">二、在线存款 :</h4>
            <p class="des">1. 会员登入后点击 [在线存款]，选择 [在线付款]</p>
            <p class="des">2. 选择入款额度，并请确实填写 ”联络电话” ，如有任何问题，方便澳门太阳城客服第一时间与您联系。</p>
            <p class="des">3. 选择”支付银行”。</p>
            <p class="des">支援借记卡：中国农业银行,中国工商银行,中国建设银行,招商银行,交通银行,上海浦东发展银行,中国光大银行,深圳平安银行。</p>
            <p class="des">4. 确认送出后，将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待加载网络银行页面，传输中已将您账户数据加密，请耐心等待。</p>
            <p class="des">5. 进入网络银行页面，请确实填写您银行账号信息，支付成功，额度将在10分钟内系统处理完成，立即加入您的澳门太阳城会员账户。</p>
            <p class="des">存款需知:</p>
            <p class="des">澳门太阳城最低存款为$100人民币，最高存款无上限!</p>
            <p class="des">未开通网银的会员，请亲洽您的银行柜台办理。</p>
            <p class="des">如有任何问题，请洽24小时在线客服。</p>
          </div>
        </div>
        <!-- 取款帮助 -->
        <div v-else-if="currPage === 'wthdrawal'">
          <!-- <div class="title">
            <h1>取款帮助：</h1>
          </div> -->
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
            <p class="des">6. 最低取款为$100人民币，取款金额无上限RMB。取款前请先核对您的银行卡号是否正确，如有问题第一时间联系在线客服处理，谢谢！</p>
            <p class="des">7. 澳门太阳城保留权利审核会员账户，若由最后一次入款起，有效下注金额需达到入款金额的100%，未达到而申请出款者，公司将收取入款金额的30%行政费用，以及$50出款手续费。</p>
            <p class="des">**如有任何问题，请洽24小时在线客服！</p>
            <p class="des">**请注意**各游戏和局/未接受/取消注单，不纳入有效投注计算。运动博弈游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。</p>
            <p class="des">**大赔率产品包括: 1X2、过关、波胆、总入球、半全场、双胜彩、冠军赛。</p>
            <p class="des">**澳门太阳城相关优惠，请详见‘优惠活动’</p>
          </div>
        </div>
        <!-- 代理咨询 -->
        <div v-else-if="currPage === 'agent'">
          <div class="agent">
            <span v-for="(v,i) in arr" :key="i"  @mouseover="showBlock(v.id)">合作伙伴</span>
          </div>
          <!-- 合作伙伴 -->
          <div class="cont" v-if="showIndex == 1">
            <p class="des">澳门太阳城集团【www.3299.com】代理全新升级，加入澳门太阳城集团代理零风险、零投资，一次加入，终生收益。根据各代理的不同需求，澳门太阳城集团代理佣金结算为两种方式：</p>
            <p class="des"><span>日结算:</span>按照代理线下会员总的投注流水进行代理佣金结算。</p>
            <p class="des"><span>周结算:</span>按照代理线下会员一周内的负盈利进行结算。</p>
            <p class="des">
              <table style="border: 1px solid #333333; border-right: 1px solid #3e3e3e; border-top: 1px solid #333333; border-bottom: 1px solid #3e3e3e; border-collapse: collapse; border-spacing: 0px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; margin: 0px auto; text-align: center; width: 700px; color: #ffffff; font-family: 微软雅黑;">
                <tbody>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;" colspan="5">澳门太阳城集团【www.3299.com】代理佣金日结算方案详情</td>
                  </tr>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;">当日线下总流水</td>
                    <td style="border: 1px solid #333333;">电子抽水</td>
                    <td style="border: 1px solid #333333;">棋牌、捕鱼抽水</td>
                    <td style="border: 1px solid #333333;">视讯、彩票抽水</td>
                    <td style="border: 1px solid #333333;">佣金结算时间</td>
                  </tr>
                  <tr style="padding-right: 7px;padding-left: 7px;border-color: #3e3e3e #333333 #333333 #3e3e3e;font-size: 13px;text-align: center;color: #000000;margin: 0px;background: #FFFFFF;border-width: 1px;border-style: solid;height: 30px;line-height: 24px;">
                    <td style="border: 1px solid #333333;">1000元+</td>
                    <td style="border: 1px solid #333333;">0.3%</td>
                    <td style="border: 1px solid #333333;">0.2%</td>
                    <td style="border: 1px solid #333333;">0.1%</td>
                    <td style="border: 1px solid #333333;"><span style="font-size: 13px; font-weight: 600; color: #ff0000;">次日结算到代理账户<br>20:00-23:00</span></td>
                  </tr>
                </tbody>
              </table>
            </p>
            <p class="des"><span>注:</span>桌面电子类游戏不参与统计投注流水。</p>
            <p class="des"><span>例:</span>代理A线下会员13日线下投注如下：电子投注30万、棋牌捕鱼投注50万，14日代理A即可获得佣金=30万*0.3%+50万*0.2%=1900元。</p>
            <p class="des">
              <table style="border: 1px solid #333333; border-right: 1px solid #3e3e3e; border-top: 1px solid #333333; border-bottom: 1px solid #3e3e3e; border-collapse: collapse; border-spacing: 0px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; margin: 0px auto; text-align: center; width: 700px; color: #ffffff; font-family: 微软雅黑;">
                <tbody>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;" colspan="4">澳门太阳城集团【www.3299.com】代理佣金周结算方案详情</td>
                  </tr>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;">周实际盈利</td>
                    <td style="border: 1px solid #333333;">有效会员</td>
                    <td style="border: 1px solid #333333;">退佣比例</td>
                    <td style="border: 1px solid #333333;">佣金结算时间</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">1000元+</td>
                    <td style="border: 1px solid #333333;">1人+</td>
                    <td style="border: 1px solid #333333;">5%</td>
                    <td style="border: 1px solid #333333;" rowspan="4"><span style="font-size: 13px; font-weight: 600; color: #ff0000;">每周二23:00前结算完毕</span></td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">1万元+</td>
                    <td style="border: 1px solid #333333;">3人+</td>
                    <td style="border: 1px solid #333333;">15%</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">10万元+</td>
                    <td style="border: 1px solid #333333;">5人+</td>
                  <td style="border: 1px solid #333333;">20%</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">50万元+</td>
                    <td style="border: 1px solid #333333;">7人+</td>
                    <td style="border: 1px solid #333333;">30%</td>
                  </tr>
                  </tbody>
                </table>
            </p>
            <p class="des"><span>周实际盈利: </span>投注报表需扣除网站的返水以及其他一切优惠。</p>
            <p class="des"><span>有效会员: </span>周期内有效投注达到3000元以上的会员视为有效会员。</p>
            <p class="des"><span>例: </span>代理B线下本周实际盈利5万元，线下有3个有效会员，本周二可获得佣金=5万*15%=7500元。</p>
            <h4 class="title">如何成为代理</h4> 
            <p class="des">1、进入网站使用自己的真实信息注册一个会员账号。</p>
            <p class="des">2、进入代理注册页面，使用您注册的会员账号作为代理账号来注册一个代理账号。(代理账号用于生成代理推广链接，会员账号用于结算佣金）</p>
            <p class="des">3、代理账号注册成功后请您联系在线客服为您激活代理账号。</p>
            <p class="des">4、在日结方案和周结算方案中任选其中一种作为您的佣金结算方式</p>
            <p class="des">5、在线客服会帮你生成代理推广链接。</p>
            <p class="des">6、当您的线下有效会员达到3人或以上可以联系客服为你办理一条全数字顶级域名作为您的代理专用链接。</p>
            <div style="margin:35px 0;"><img src="/static/tycjt/img/about/ftpc.png" alt=""></div>
          </div>
          <!-- 联营协议 -->
          <div class="cont" v-if="showIndex == 2">
            <h4 class="title">澳门太阳城集团对代理的权利与义务</h4>
            <p class="des">1、澳门太阳城集团的客服部会登记联盟的会员并会观察他们的投注状况。联盟及会员必须同意并遵守澳门太阳城集团的会员条例，政策及操作程式。</p>
            <p class="des">2、代理可随时登入代理管理系统观察线下会员的下注状况及会员在网站的活动概况。</p>
            <p class="des">3、澳门太阳城集团保留可以修改合约书上的任何条例，包括:</p>
            <p class="des">现有的佣金范围、佣金计划、付款程式、及参考计划条例的权力，澳门太阳城集团会以电邮、网站公告等方法通知代理。</p>
            <p class="des">代理对于所做的修改有异议，代理可选择终止合约，或联系在线客服提出您的宝贵意见。</p>
            <p class="des">如修改后代理无任何异议，便视作默认合约修改，代理必须遵守更改后的相关规定。</p>
            <h4 class="title">代理对澳门太阳城集团的权力及义务</h4>
            <p class="des">1、代理应尽其所能，广泛地宣传、销售及推广澳门太阳城集团，使代理本身及澳门太阳城集团的利润最大化。</p>
            <p class="des">2、代理可在不违反法律下，以正面形象宣传、销售及推广澳门太阳城集团，并有责任义务告知旗下会员所有澳门太阳城集团的相关优惠。</p>
            <p class="des">3、代理选择的澳门太阳城集团推广手法若需付费，则代理应承担该费用。</p>
            <p class="des">4、任何澳门太阳城集团相关资讯包括: 标志、报表、游戏画面、图样、文案等，代理不得私自复制、公开、分发有关材料，澳门太阳城集团保留法律追诉权。</p>
            <p class="des">5、如代理在做业务推广有相关需要，请随时洽澳门太阳城集团。</p>
            <h4 class="title">规则条款</h4> 
            <p class="des">1、代理不可在未经澳门太阳城集团许可情况下开设双/多个的代理帐号，也不可从澳门太阳城集团帐户或相关人士赚取佣金。</p>
            <p class="des">2、为确保所有澳门太阳城集团会员账号隐私与权益，澳门太阳城集团不会提供任何会员密码，或会员个人资料。</p>
            <p class="des">3、代理旗下的会员不得开设多于一个的帐户。澳门太阳城集团有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。</p>
            <p class="des">4、如代理旗下的会员因为违反条例而被禁止享用澳门太阳城集团的游戏，或澳门太阳城集团退回存款给会员，澳门太阳城集团将不会分配相应的佣金给代理。</p>
          </div>
          <!-- 代理注册 -->
          <div class="cont" v-if="showIndex == 3">
            <fieldset>
              <legend>代理资料</legend>
              <div class="form-group">
                  <label class="label" for="us">
                      <span>会员帐号：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="usFixTip"><div class="txt-info-mouseout1">6~10位字母开头，字母+数字组合</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="us" maxlength="12" id="us" class="form-input">
                  </span>
                  <span class="onShow" id="usTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="password1">
                      <span>设置密码：</span>
                      <div class="form-tips" id="password1FixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">6-12位密码，字母、数字和符号组合</div></div>
                  </label>
                  <span class="form-control">
                      <input type="password" name="password1" maxlength="12" id="password1" class="form-input">
                      <div class="psd-strong" id="psdStrong">弱</div>
                  </span>
                  <span class="onShow" id="password1Tip"></span>
              </div>
              <div class="form-group">
                    <label class="label" for="password2">
                        <span>确认密码：</span>
                        <div class="form-tips" id="password2FixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">请输入确认密码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="password" name="password2" maxlength="12" id="password2" class="form-input">
                    </span>
                    <span class="onShow" id="password2Tip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="code">
                        <span>验证码：</span>
                        <div class="form-tips" id="codeFixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">请输入4位的验证码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="button" id="getCode" data-name="getCode" class="form-btn getCode-btn" value="验证码">
                        <input type="text" name="code" id="code" maxlength="4" class="form-input">
                        <img src="/static/tycjt/img/about/ValidateCode.jfif" border="0" width="150" height="40" id="codeimg">
                    </span>
                    <span class="onShow" id="codeTip"></span>
                </div>
            </fieldset>
            <fieldset>
                <legend>会员资料</legend>
                <div class="form-group">
                    <label class="label" for="realname">
                        <span>真实姓名：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="realnameFixTip"><div class="txt-info-mouseout1">请输入中文的真实姓名</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="realname" maxlength="16" id="realname" class="form-input">
                    </span>
                    <span class="onShow" id="realnameTip"></span>
                </div>
                
                <div class="form-group">
                    <label class="label" for="qq">
                        <span>QQ号码：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="qqFixTip"><div class="txt-info-mouseout1">请输入正确的QQ号码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="qq" maxlength="12" id="qq" class="form-input">
                    </span>
                    <span class="onShow" id="qqTip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="tel">
                        <span>手机号码：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="telFixTip"><div class="txt-info-mouseout1">请输入11位的手机号码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="tel" maxlength="11" id="tel" class="form-input">
                    </span>
                    <span class="onShow" id="telTip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="email">
                        <span>邮箱地址：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="emailFixTip"><div class="txt-info-mouseout1">请输入正确的邮箱</div></div>
                    </label>
                    <span class="form-control">
                        <ul class="emailist" style="position: absolute; margin-top: 40px; min-width: 310px; visibility: hidden; z-index: 11;"></ul><input type="text" name="email" maxlength="50" id="email" class="form-input" autocomplete="off">
                    </span>
                    <span class="onShow" id="emailTip"></span>
                </div>
            </fieldset>
            <fieldset>
              <legend>银行资料</legend>
              <div class="form-group">
                  <label class="label" for="bankid">
                      <span>出款银行：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankidFixTip"><div class="txt-info-mouseout1">请选择出款银行</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankid" id="bankid" class="form-select">
                          <option value="">选择银行</option>
                          <option value="中国银行">中国银行</option>
                          <option value="中国农业银行">中国农业银行</option>
                          <option value="中国民生银行">中国民生银行</option>
                          <option value="中国建设银行">中国建设银行</option>
                          <option value="中国招商银行">中国招商银行</option>
                          <option value="中国工商银行">中国工商银行</option>
                          <option value="中国交通银行">中国交通银行</option>
                          <option value="中国邮政银行">中国邮政银行</option>
                          <option value="中国兴业银行">中国兴业银行</option>
                          <option value="华夏银行">华夏银行</option>
                          <option value="浦发银行">浦发银行</option>
                          <option value="广州银行">广州银行</option>
                          <option value="BEA东亚银行">BEA东亚银行</option>
                          <option value="广州农商银行">广州农商银行</option>
                          <option value="顺德农商银行">顺德农商银行</option>
                          <option value="北京银行">北京银行</option>
                          <option value="平安银行">平安银行</option>
                          <option value="杭州银行">杭州银行</option>
                          <option value="温州银行">温州银行</option>
                          <option value="上海农商银行">上海农商银行</option>
                          <option value="尧都信用社">尧都信用社</option>
                          <option value="中国光大银行">中国光大银行</option>
                          <option value="中信银行">中信银行</option>
                          <option value="渤海银行">渤海银行</option>
                          <option value="浙商银行">浙商银行</option>
                          <option value="晋商银行">晋商银行</option>
                          <option value="汉口银行">汉口银行</option>
                          <option value="浙江稠州商业银行">浙江稠州商业银行</option>
                          <option value="上海银行">上海银行</option>
                          <option value="广发银行">广发银行</option>
                          <option value="深圳发展银行">深圳发展银行</option>
                          <option value="东莞银行">东莞银行</option>
                          <option value="宁波银行">宁波银行</option>
                          <option value="南京银行">南京银行</option>
                          <option value="珠海信用社">珠海信用社</option>
                          <option value="北京农商银行">北京农商银行</option>
                          <option value="重庆银行">重庆银行</option>
                          <option value="广西信用社">广西信用社</option>
                          <option value="农村信用社">农村信用社</option>
                          <option value="江苏银行">江苏银行</option>
                          <option value="吉林银行">吉林银行</option>
                          <option value="成都银行">成都银行</option>
                          <option value="支付宝">支付宝</option>
                          <option value="微信支付">微信支付</option>
                          <option value="徽商银行">徽商银行</option>
                          <option value="财付通">财付通</option>
                      </select>
                  </span>
                  <span class="onShow" id="bankidTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankaccount">
                      <span>银行帐号：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankaccountFixTip"><div class="txt-info-mouseout1">请输入您的银行帐号</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="bankaccount" minlength="13" maxlength="19" id="bankaccount" class="form-input">
                  </span>
                  <span class="onShow" id="bankaccountTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankprovince">
                      <span>银行省份：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankprovinceFixTip"><div class="txt-info-mouseout1">请输入银行所在省份</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankprovince" id="bankprovince" class="form-select">
                          <option value="" disabled="" selected="">选择省份</option>
                      <option value="北京">北京</option><option value="广东">广东</option><option value="上海">上海</option><option value="天津">天津</option><option value="重庆">重庆</option><option value="辽宁">辽宁</option><option value="江苏">江苏</option><option value="湖北">湖北</option><option value="四川">四川</option><option value="陕西">陕西</option><option value="河北">河北</option><option value="山西">山西</option><option value="河南">河南</option><option value="吉林">吉林</option><option value="黑龙江">黑龙江</option><option value="内蒙古">内蒙古</option><option value="山东">山东</option><option value="安徽">安徽</option><option value="浙江">浙江</option><option value="福建">福建</option><option value="湖南">湖南</option><option value="广西">广西</option><option value="江西">江西</option><option value="贵州">贵州</option><option value="云南">云南</option><option value="西藏">西藏</option><option value="海南">海南</option><option value="甘肃">甘肃</option><option value="宁夏">宁夏</option><option value="青海">青海</option><option value="新疆">新疆</option><option value="香港">香港</option><option value="澳门">澳门</option><option value="台湾">台湾</option><option value="海外">海外</option></select>
                  </span>
                  <span class="onShow" id="bankprovinceTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankcity">
                      <span>银行县市：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankcityFixTip"><div class="txt-info-mouseout1">请输入银行所在县市</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankcity" id="bankcity" class="form-select">
                          <option value="" disabled="" selected="">选择城市</option>
                      </select>
                  </span>
                  <span class="onShow" id="bankcityTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="MultiPwd">
                      <span>取款密码：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="MultiPwdFixTip"><div class="txt-info-mouseout1">请输入4位的取款密码</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="MultiPwd" maxlength="16" id="MultiPwd" class="form-input nmpd-target" readonly="readonly" data-numpad="nmpd1">
                      <input type="hidden" name="pwd1" id="pwd1">
                      <input type="hidden" name="pwd2" id="pwd2">
                      <input type="hidden" name="pwd3" id="pwd3">
                      <input type="hidden" name="pwd4" id="pwd4">
                  </span>
                  <span class="onShow" id="MultiPwdTip"></span>
              </div>
            </fieldset>
            <div class="form-group form-rules">
                <label class="label">&nbsp;</label>
                <span class="form-control">
                    <label for="agreeRules" style="margin-left: 110px;">
                        <input type="checkbox" name="agreeRules" class="agreeInput" id="agreeRules" checked="checked">我已届满合法博彩年龄﹐且同意各项开户条约
                    </label>
                </span>
            </div>
            <div class="form-group btn-group">
                <label class="label"></label>
                <span class="form-control" style="margin-left: 135px;">
                    <input type="button" class="form-btn regist-btn" id="regSubmit" onclick="register()" value="提交注册">
                    <input type="button" class="form-btn reset-btn" id="resetbtn" onclick="location.reload()" value="重新填写">
                </span>
            </div>
          </div>
          <!-- 代理登入 -->
          <div class="cont" v-if="showIndex == 4">
            <p>代理登入</p>
          </div>
        </div>
        <!-- 免费代理 -->
        <div v-else-if="currPage === 'agent2'">
          <div class="agent">
            <span v-for="(v,i) in arr" :key="i"  @mouseover="showBlock(v.id)">合作伙伴</span>
          </div>
          <!-- 合作伙伴 -->
          <div class="cont" v-if="showIndex == 1">
            <p class="des">澳门太阳城集团【www.3299.com】代理全新升级，加入澳门太阳城集团代理零风险、零投资，一次加入，终生收益。根据各代理的不同需求，澳门太阳城集团代理佣金结算为两种方式：</p>
            <p class="des"><span>日结算:</span>按照代理线下会员总的投注流水进行代理佣金结算。</p>
            <p class="des"><span>周结算:</span>按照代理线下会员一周内的负盈利进行结算。</p>
            <p class="des">
              <table style="border: 1px solid #333333; border-right: 1px solid #3e3e3e; border-top: 1px solid #333333; border-bottom: 1px solid #3e3e3e; border-collapse: collapse; border-spacing: 0px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; margin: 0px auto; text-align: center; width: 700px; color: #ffffff; font-family: 微软雅黑;">
                <tbody>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;" colspan="5">澳门太阳城集团【www.3299.com】代理佣金日结算方案详情</td>
                  </tr>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;">当日线下总流水</td>
                    <td style="border: 1px solid #333333;">电子抽水</td>
                    <td style="border: 1px solid #333333;">棋牌、捕鱼抽水</td>
                    <td style="border: 1px solid #333333;">视讯、彩票抽水</td>
                    <td style="border: 1px solid #333333;">佣金结算时间</td>
                  </tr>
                  <tr style="padding-right: 7px;padding-left: 7px;border-color: #3e3e3e #333333 #333333 #3e3e3e;font-size: 13px;text-align: center;color: #000000;margin: 0px;background: #FFFFFF;border-width: 1px;border-style: solid;height: 30px;line-height: 24px;">
                    <td style="border: 1px solid #333333;">1000元+</td>
                    <td style="border: 1px solid #333333;">0.3%</td>
                    <td style="border: 1px solid #333333;">0.2%</td>
                    <td style="border: 1px solid #333333;">0.1%</td>
                    <td style="border: 1px solid #333333;"><span style="font-size: 13px; font-weight: 600; color: #ff0000;">次日结算到代理账户<br>20:00-23:00</span></td>
                  </tr>
                </tbody>
              </table>
            </p>
            <p class="des"><span>注:</span>桌面电子类游戏不参与统计投注流水。</p>
            <p class="des"><span>例:</span>代理A线下会员13日线下投注如下：电子投注30万、棋牌捕鱼投注50万，14日代理A即可获得佣金=30万*0.3%+50万*0.2%=1900元。</p>
            <p class="des">
              <table style="border: 1px solid #333333; border-right: 1px solid #3e3e3e; border-top: 1px solid #333333; border-bottom: 1px solid #3e3e3e; border-collapse: collapse; border-spacing: 0px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; margin: 0px auto; text-align: center; width: 700px; color: #ffffff; font-family: 微软雅黑;">
                <tbody>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;" colspan="4">澳门太阳城集团【www.3299.com】代理佣金周结算方案详情</td>
                  </tr>
                  <tr style="font-style: normal; font-weight: 600; text-align: center; font-size: 14px; color: #ffffff; border: 1px solid #333333; margin: 0px; background: #668B8B; height: 30px; line-height: 24px; padding: 5px 10px 5px 10px;">
                    <td style="border: 1px solid #333333;">周实际盈利</td>
                    <td style="border: 1px solid #333333;">有效会员</td>
                    <td style="border: 1px solid #333333;">退佣比例</td>
                    <td style="border: 1px solid #333333;">佣金结算时间</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">1000元+</td>
                    <td style="border: 1px solid #333333;">1人+</td>
                    <td style="border: 1px solid #333333;">5%</td>
                    <td style="border: 1px solid #333333;" rowspan="4"><span style="font-size: 13px; font-weight: 600; color: #ff0000;">每周二23:00前结算完毕</span></td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">1万元+</td>
                    <td style="border: 1px solid #333333;">3人+</td>
                    <td style="border: 1px solid #333333;">15%</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">10万元+</td>
                    <td style="border: 1px solid #333333;">5人+</td>
                  <td style="border: 1px solid #333333;">20%</td>
                  </tr>
                  <tr style="padding-right: 7px; padding-left: 7px; border-color: #3e3e3e #333333 #333333 #3e3e3e; font-size: 13px; text-align: center; color: #000000; margin: 0px; background: #FFFFFF; border-width: 1px; border-style: solid; height: 30px; line-height: 24px;">
                    <td style="border: 1px solid #333333;">50万元+</td>
                    <td style="border: 1px solid #333333;">7人+</td>
                    <td style="border: 1px solid #333333;">30%</td>
                  </tr>
                  </tbody>
                </table>
            </p>
            <p class="des"><span>周实际盈利: </span>投注报表需扣除网站的返水以及其他一切优惠。</p>
            <p class="des"><span>有效会员: </span>周期内有效投注达到3000元以上的会员视为有效会员。</p>
            <p class="des"><span>例: </span>代理B线下本周实际盈利5万元，线下有3个有效会员，本周二可获得佣金=5万*15%=7500元。</p>
            <h4 class="title">如何成为代理</h4> 
            <p class="des">1、进入网站使用自己的真实信息注册一个会员账号。</p>
            <p class="des">2、进入代理注册页面，使用您注册的会员账号作为代理账号来注册一个代理账号。(代理账号用于生成代理推广链接，会员账号用于结算佣金）</p>
            <p class="des">3、代理账号注册成功后请您联系在线客服为您激活代理账号。</p>
            <p class="des">4、在日结方案和周结算方案中任选其中一种作为您的佣金结算方式</p>
            <p class="des">5、在线客服会帮你生成代理推广链接。</p>
            <p class="des">6、当您的线下有效会员达到3人或以上可以联系客服为你办理一条全数字顶级域名作为您的代理专用链接。</p>
            <div style="margin:35px 0;"><img src="/static/tycjt/img/about/ftpc.png" alt=""></div>
          </div>
          <!-- 联营协议 -->
          <div class="cont" v-if="showIndex == 2">
            <h4 class="title">澳门太阳城集团对代理的权利与义务</h4>
            <p class="des">1、澳门太阳城集团的客服部会登记联盟的会员并会观察他们的投注状况。联盟及会员必须同意并遵守澳门太阳城集团的会员条例，政策及操作程式。</p>
            <p class="des">2、代理可随时登入代理管理系统观察线下会员的下注状况及会员在网站的活动概况。</p>
            <p class="des">3、澳门太阳城集团保留可以修改合约书上的任何条例，包括:</p>
            <p class="des">现有的佣金范围、佣金计划、付款程式、及参考计划条例的权力，澳门太阳城集团会以电邮、网站公告等方法通知代理。</p>
            <p class="des">代理对于所做的修改有异议，代理可选择终止合约，或联系在线客服提出您的宝贵意见。</p>
            <p class="des">如修改后代理无任何异议，便视作默认合约修改，代理必须遵守更改后的相关规定。</p>
            <h4 class="title">代理对澳门太阳城集团的权力及义务</h4>
            <p class="des">1、代理应尽其所能，广泛地宣传、销售及推广澳门太阳城集团，使代理本身及澳门太阳城集团的利润最大化。</p>
            <p class="des">2、代理可在不违反法律下，以正面形象宣传、销售及推广澳门太阳城集团，并有责任义务告知旗下会员所有澳门太阳城集团的相关优惠。</p>
            <p class="des">3、代理选择的澳门太阳城集团推广手法若需付费，则代理应承担该费用。</p>
            <p class="des">4、任何澳门太阳城集团相关资讯包括: 标志、报表、游戏画面、图样、文案等，代理不得私自复制、公开、分发有关材料，澳门太阳城集团保留法律追诉权。</p>
            <p class="des">5、如代理在做业务推广有相关需要，请随时洽澳门太阳城集团。</p>
            <h4 class="title">规则条款</h4> 
            <p class="des">1、代理不可在未经澳门太阳城集团许可情况下开设双/多个的代理帐号，也不可从澳门太阳城集团帐户或相关人士赚取佣金。</p>
            <p class="des">2、为确保所有澳门太阳城集团会员账号隐私与权益，澳门太阳城集团不会提供任何会员密码，或会员个人资料。</p>
            <p class="des">3、代理旗下的会员不得开设多于一个的帐户。澳门太阳城集团有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。</p>
            <p class="des">4、如代理旗下的会员因为违反条例而被禁止享用澳门太阳城集团的游戏，或澳门太阳城集团退回存款给会员，澳门太阳城集团将不会分配相应的佣金给代理。</p>
          </div>
          <!-- 代理注册 -->
          <div class="cont" v-if="showIndex == 3">
            <fieldset>
              <legend>代理资料</legend>
              <div class="form-group">
                  <label class="label" for="us">
                      <span>会员帐号：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="usFixTip"><div class="txt-info-mouseout1">6~10位字母开头，字母+数字组合</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="us" maxlength="12" id="us" class="form-input">
                  </span>
                  <span class="onShow" id="usTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="password1">
                      <span>设置密码：</span>
                      <div class="form-tips" id="password1FixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">6-12位密码，字母、数字和符号组合</div></div>
                  </label>
                  <span class="form-control">
                      <input type="password" name="password1" maxlength="12" id="password1" class="form-input">
                      <div class="psd-strong" id="psdStrong">弱</div>
                  </span>
                  <span class="onShow" id="password1Tip"></span>
              </div>
              <div class="form-group">
                    <label class="label" for="password2">
                        <span>确认密码：</span>
                        <div class="form-tips" id="password2FixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">请输入确认密码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="password" name="password2" maxlength="12" id="password2" class="form-input">
                    </span>
                    <span class="onShow" id="password2Tip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="code">
                        <span>验证码：</span>
                        <div class="form-tips" id="codeFixTip" style="padding: 0px; margin: 0px;"><div class="txt-info-mouseout1">请输入4位的验证码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="button" id="getCode" data-name="getCode" class="form-btn getCode-btn" value="验证码">
                        <input type="text" name="code" id="code" maxlength="4" class="form-input">
                        <img src="/static/tycjt/img/about/ValidateCode.jfif" border="0" width="150" height="40" id="codeimg">
                    </span>
                    <span class="onShow" id="codeTip"></span>
                </div>
            </fieldset>
            <fieldset>
                <legend>会员资料</legend>
                <div class="form-group">
                    <label class="label" for="realname">
                        <span>真实姓名：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="realnameFixTip"><div class="txt-info-mouseout1">请输入中文的真实姓名</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="realname" maxlength="16" id="realname" class="form-input">
                    </span>
                    <span class="onShow" id="realnameTip"></span>
                </div>
                
                <div class="form-group">
                    <label class="label" for="qq">
                        <span>QQ号码：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="qqFixTip"><div class="txt-info-mouseout1">请输入正确的QQ号码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="qq" maxlength="12" id="qq" class="form-input">
                    </span>
                    <span class="onShow" id="qqTip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="tel">
                        <span>手机号码：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="telFixTip"><div class="txt-info-mouseout1">请输入11位的手机号码</div></div>
                    </label>
                    <span class="form-control">
                        <input type="text" name="tel" maxlength="11" id="tel" class="form-input">
                    </span>
                    <span class="onShow" id="telTip"></span>
                </div>
                <div class="form-group">
                    <label class="label" for="email">
                        <span>邮箱地址：</span>
                        <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="emailFixTip"><div class="txt-info-mouseout1">请输入正确的邮箱</div></div>
                    </label>
                    <span class="form-control">
                        <ul class="emailist" style="position: absolute; margin-top: 40px; min-width: 310px; visibility: hidden; z-index: 11;"></ul><input type="text" name="email" maxlength="50" id="email" class="form-input" autocomplete="off">
                    </span>
                    <span class="onShow" id="emailTip"></span>
                </div>
            </fieldset>
            <fieldset>
              <legend>银行资料</legend>
              <div class="form-group">
                  <label class="label" for="bankid">
                      <span>出款银行：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankidFixTip"><div class="txt-info-mouseout1">请选择出款银行</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankid" id="bankid" class="form-select">
                          <option value="">选择银行</option>
                          <option value="中国银行">中国银行</option>
                          <option value="中国农业银行">中国农业银行</option>
                          <option value="中国民生银行">中国民生银行</option>
                          <option value="中国建设银行">中国建设银行</option>
                          <option value="中国招商银行">中国招商银行</option>
                          <option value="中国工商银行">中国工商银行</option>
                          <option value="中国交通银行">中国交通银行</option>
                          <option value="中国邮政银行">中国邮政银行</option>
                          <option value="中国兴业银行">中国兴业银行</option>
                          <option value="华夏银行">华夏银行</option>
                          <option value="浦发银行">浦发银行</option>
                          <option value="广州银行">广州银行</option>
                          <option value="BEA东亚银行">BEA东亚银行</option>
                          <option value="广州农商银行">广州农商银行</option>
                          <option value="顺德农商银行">顺德农商银行</option>
                          <option value="北京银行">北京银行</option>
                          <option value="平安银行">平安银行</option>
                          <option value="杭州银行">杭州银行</option>
                          <option value="温州银行">温州银行</option>
                          <option value="上海农商银行">上海农商银行</option>
                          <option value="尧都信用社">尧都信用社</option>
                          <option value="中国光大银行">中国光大银行</option>
                          <option value="中信银行">中信银行</option>
                          <option value="渤海银行">渤海银行</option>
                          <option value="浙商银行">浙商银行</option>
                          <option value="晋商银行">晋商银行</option>
                          <option value="汉口银行">汉口银行</option>
                          <option value="浙江稠州商业银行">浙江稠州商业银行</option>
                          <option value="上海银行">上海银行</option>
                          <option value="广发银行">广发银行</option>
                          <option value="深圳发展银行">深圳发展银行</option>
                          <option value="东莞银行">东莞银行</option>
                          <option value="宁波银行">宁波银行</option>
                          <option value="南京银行">南京银行</option>
                          <option value="珠海信用社">珠海信用社</option>
                          <option value="北京农商银行">北京农商银行</option>
                          <option value="重庆银行">重庆银行</option>
                          <option value="广西信用社">广西信用社</option>
                          <option value="农村信用社">农村信用社</option>
                          <option value="江苏银行">江苏银行</option>
                          <option value="吉林银行">吉林银行</option>
                          <option value="成都银行">成都银行</option>
                          <option value="支付宝">支付宝</option>
                          <option value="微信支付">微信支付</option>
                          <option value="徽商银行">徽商银行</option>
                          <option value="财付通">财付通</option>
                      </select>
                  </span>
                  <span class="onShow" id="bankidTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankaccount">
                      <span>银行帐号：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankaccountFixTip"><div class="txt-info-mouseout1">请输入您的银行帐号</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="bankaccount" minlength="13" maxlength="19" id="bankaccount" class="form-input">
                  </span>
                  <span class="onShow" id="bankaccountTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankprovince">
                      <span>银行省份：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankprovinceFixTip"><div class="txt-info-mouseout1">请输入银行所在省份</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankprovince" id="bankprovince" class="form-select">
                          <option value="" disabled="" selected="">选择省份</option>
                      <option value="北京">北京</option><option value="广东">广东</option><option value="上海">上海</option><option value="天津">天津</option><option value="重庆">重庆</option><option value="辽宁">辽宁</option><option value="江苏">江苏</option><option value="湖北">湖北</option><option value="四川">四川</option><option value="陕西">陕西</option><option value="河北">河北</option><option value="山西">山西</option><option value="河南">河南</option><option value="吉林">吉林</option><option value="黑龙江">黑龙江</option><option value="内蒙古">内蒙古</option><option value="山东">山东</option><option value="安徽">安徽</option><option value="浙江">浙江</option><option value="福建">福建</option><option value="湖南">湖南</option><option value="广西">广西</option><option value="江西">江西</option><option value="贵州">贵州</option><option value="云南">云南</option><option value="西藏">西藏</option><option value="海南">海南</option><option value="甘肃">甘肃</option><option value="宁夏">宁夏</option><option value="青海">青海</option><option value="新疆">新疆</option><option value="香港">香港</option><option value="澳门">澳门</option><option value="台湾">台湾</option><option value="海外">海外</option></select>
                  </span>
                  <span class="onShow" id="bankprovinceTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="bankcity">
                      <span>银行县市：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="bankcityFixTip"><div class="txt-info-mouseout1">请输入银行所在县市</div></div>
                  </label>
                  <span class="form-control">
                      <select name="bankcity" id="bankcity" class="form-select">
                          <option value="" disabled="" selected="">选择城市</option>
                      </select>
                  </span>
                  <span class="onShow" id="bankcityTip"></span>
              </div>
              <div class="form-group">
                  <label class="label" for="MultiPwd">
                      <span>取款密码：</span>
                      <div class="form-tips" style="display: block; padding: 0px; margin: 0px;" id="MultiPwdFixTip"><div class="txt-info-mouseout1">请输入4位的取款密码</div></div>
                  </label>
                  <span class="form-control">
                      <input type="text" name="MultiPwd" maxlength="16" id="MultiPwd" class="form-input nmpd-target" readonly="readonly" data-numpad="nmpd1">
                      <input type="hidden" name="pwd1" id="pwd1">
                      <input type="hidden" name="pwd2" id="pwd2">
                      <input type="hidden" name="pwd3" id="pwd3">
                      <input type="hidden" name="pwd4" id="pwd4">
                  </span>
                  <span class="onShow" id="MultiPwdTip"></span>
              </div>
            </fieldset>
            <div class="form-group form-rules">
                <label class="label">&nbsp;</label>
                <span class="form-control">
                    <label for="agreeRules" style="margin-left: 110px;">
                        <input type="checkbox" name="agreeRules" class="agreeInput" id="agreeRules" checked="checked">我已届满合法博彩年龄﹐且同意各项开户条约
                    </label>
                </span>
            </div>
            <div class="form-group btn-group">
                <label class="label"></label>
                <span class="form-control" style="margin-left: 135px;">
                    <input type="button" class="form-btn regist-btn" id="regSubmit" onclick="register()" value="提交注册">
                    <input type="button" class="form-btn reset-btn" id="resetbtn" onclick="location.reload()" value="重新填写">
                </span>
            </div>
          </div>
          <!-- 代理登入 -->
          <div class="cont" v-if="showIndex == 4">
            <p>代理登入</p>
          </div>
        </div>
        <!-- 常见问题 -->
        <div v-else-if="currPage === 'question'">
          <!-- <div class="title">
            <h1>取款帮助：</h1>
          </div> -->
          <div class="cont">
            <h4 class="title">开户是否会收取费用？</h4>
            <p class="des">您好，开户是免费的，最低取款金额为10元人民币，存款需要达到一倍流水，每天线上取款最高1000万，24小时不限次数取款，不收取手续费，取款一般情况下3-5分钟内到账。</p>
            <h4 class="title">开户后如何充值？</h4>
            <p class="des">您好，您可以通过银行卡转账，现金存款或者在线支付微信扫一扫等方式进行充值，更多详情请联系我们的客服人员为您服务。</p>
            <h4 class="title">转账时是否收取手续费？</h4>
            <p class="des">您好，如果您通过银行转账的方式进行充值，银行会收取一定的的手续费，但是我们会返还您存款金额的0.5%存款优惠，相当于为您报销手续费，澳门太阳城集团取款，不收取任何手续费，取款的手续费由我们来承担。</p>
            <h4 class="title">为什么在线支付成功后额度没有立即返到我的游戏帐号呢？</h4>
            <p class="des">您好，这是因为在线支付系统需要经过密锁切换及内部验证程序，而这也是我们的保安程序之一，所以请您不必担心，款项一定不会丢失。如果您在在线支付超过5分钟后仍然还未收到您的款项，请与我们客服联系处理。</p>
            <h4 class="title">取款是否有限制</h4>
            <p class="des">您好，最低取款金额为100元，每天24小时不限次数取款，不收取手续费。存款需要达到一倍流水才可取款，线上取款当日最高1000万人民币。</p>
            <h4 class="title">如何取款？</h4>
            <p class="des">您好，开户之后，请您登录账户完善个人信息，绑定您的取款银行账号，取款银行账户姓名必须与开户姓名保持一致，取款才能成功支付。</p>
            <h4 class="title">我忘记密码了怎么办？</h4>
            <p class="des">您好，如果您忘记密码了，请您联系我们的客服人员，我们会与您核实会员信息无误之后为您重置密码。重置密码后您可以登录账号修改您的密码。</p>
            <h4 class="title">如何修改您的个人信息？</h4>
            <p class="des">您好，如需修改您的电话号码、取款银行账号等信息，请您登录账号，进入“会员中心”，提交修改资料申请或者直接联系客服申请修改，我们会在24小时内拨打您绑定的电话号码与您核实信息之后，为您修改。</p>
            <h4 class="title">请问我在哪边可以找到游戏规则？</h4>
            <p class="des">您好，在您未登入之前，您可以在各个游戏项目内，看见游戏规则的选项，清楚告知游戏的玩法、规则及派彩方式。在游戏窗口中，也有"规则"选项，让您在享受游戏乐趣的同时，可以弹跳窗口随时提醒您游戏规则。</p>
            <h4 class="title">如何证明游戏结果是实时的？</h4>
            <p class="des">您好，您可以通过游戏的视频影像进行监查，视频内的画面均为实地赌场现场所播放的画面是同步的。我们确保所有游戏结果均为真实的实时结果。</p>
            <h4 class="title">进行游戏对系统配置有要求么？</h4>
            <p class="des">您好，我们设计的网页将会提供新一代浏览器服务，提供更好的特点，让您能够享有更好的投注乐趣。我们希望您能使用Internet Explorer 6.0或者是以上的浏览器版本。</p>
            <h4 class="title">为什么系统会将我的登陆注销？</h4>
            <p class="des">您好，这是网页的安全程序之一，避免您离开电脑时间过久您的账号被他人冒用。当您在一定的时间内没有使用有关的网页，那么有关的网页将不再活跃，并且无法浏览最新的页面，您需要重新登陆会员账号即可。</p>
          </div>
        </div>
      </div>
      <!-- <img src="/static/tycjt/img/about/left-logo.png" class="left-logo"> -->
    </div>
  </div>
</div>
</template>

<script>
import banLantern from "../../../public/game_new/banLantern";
  export default {
    data() {
      return {
        showPaterner:false,
        showXieyi:true,
        showRegister:false,
        showLogin:false,
        showIndex:1,
        currPage:'',
        arr:[
          {name:"合作伙伴",id:1},
          {name:"联营协议",id:2},
          {name:"代理注册",id:3},
          {name:"代理登录",id:4},
        ],
        notice: "/static/tycjt/img/home/notice-icon.png",
        navList:[
          {
            icon:'/static/tycjt/img/about/gameRule-icon.png',
            icon2:'/static/tycjt/img/about/gameRule-icon2.png',
            name:'游戏规则',
            introduce:'GAME RULES',
            linkTo:'#/rules/ssc?id=4',
          },
          {
            icon:'/static/tycjt/img/about/aboutUS-icon.png',
            icon2:'/static/tycjt/img/about/aboutUS-icon2.png',
            name:'关于我们',
            introduce:'ABOUT US',
            linkTo:'/home/about/aboutUs',
          },
          {
            icon:'/static/tycjt/img/about/contactUs-icon.png',
            icon2:'/static/tycjt/img/about/contactUs-icon2.png',
            name:'联系我们',
            introduce:'CONTACT US',
            linkTo:'/home/about/contactUs',
          },
          // {
          //   icon:'/static/tycjt/img/about/deposit-icon.png',
          //   icon2:'/static/tycjt/img/about/deposit-icon2.png',
          //   name:'代理咨询',
          //   introduce:'DEPOSIT',
          //   linkTo:'/home/about/agent',
          // },
          // {
          //   icon:'/static/tycjt/img/about/wthdrawal-icon.png',
          //   icon2:'/static/tycjt/img/about/wthdrawal-icon2.png',
          //   name:'免费代理',
          //   introduce:'WITHDRAW',
          //   linkTo:'/home/about/agent2',
          // },
          {
            icon:'/static/tycjt/img/about/deposit-icon.png',
            icon2:'/static/tycjt/img/about/deposit-icon2.png',
            name:'存款帮助',
            introduce:'DEPOSIT',
            linkTo:'/home/about/deposit',
          },
          {
            icon:'/static/tycjt/img/about/wthdrawal-icon.png',
            icon2:'/static/tycjt/img/about/wthdrawal-icon2.png',
            name:'取款帮助',
            introduce:'WITHDRAW',
            linkTo:'/home/about/wthdrawal',
          },
          {
            icon:'/static/tycjt/img/about/wthdrawal-icon.png',
            icon2:'/static/tycjt/img/about/wthdrawal-icon2.png',
            name:'常见问题',
            introduce:'WITHDRAW',
            linkTo:'/home/about/question',
          }
        ],
        headBg: '/static/tycjt/img/about/about-top-bg.jpg',
        bgColor:'#47080E'
      }
    },
    components:{banLantern},
    methods:{
      showBlock(r){
        this.showIndex = r;
      },
      goLink(link) {
        // if(link.includes('/rules')){
        //   this.$errorAlert('预览版 暂未开放', 'warn')
        //   return false
        // }else{
        //   this.$router.push(link)
        // }
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
    }
  }
</script>

<style lang="less" scoped>
.pull-right {
  float: right !important;
}
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
fieldset {
    padding: .35em 10.625em .75em;
    margin: 20px auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.form-group.form-rules {
    font-size: 12px;
}
.form-group {
    margin-top: 20px;
    width: 100%;
    position: relative;
}
.psd-strong {
    position: absolute;
    right: 5px;
    top: 4px;
    width: 17px;
    height: 16px;
    background: url(https://cgimage.kexinshengtai.com//cl/tpl/newcommon/register/icons.png) no-repeat;
    background-position: 0 -578px;
    background-color: #06a7e2;
}
#codeimg {
    width: 50px;
    height: 22px;
    line-height: 22px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #f4f4f4;
    color: #555;
    border: 1px solid #e1e1e1;
    border-left: 0;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 12px;
    position: absolute;
    right: 1px;
    top: 1px;
    display: none;
}
legend {
    margin-left: 18px;
    padding: 0 5px;
    color: #fff100;
    font-size: 14px;
}
.form-group.btn-group {
    margin-top: 30px;
    margin-bottom: 30px;
}
.form-group .label {
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 114px;
    padding-right: 4px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #fff;
    text-align: right;
    z-index: 2;
}
.form-group .form-btn.regist-btn {
    display: inline-block;
    width: 100px;
    height: 28px;
    line-height: 28px;
    color: #462205;
    font-size: 15px;
    margin: 0 10px;
    background-color: #FEC36A;
    background-image: -webkit-gradient(linear,0 0,0 100%,from(#FFECCE),to(#FEC36A));
    background-image: -webkit-linear-gradient(top,#FFECCE,#FEC36A);
    background-image: -o-linear-gradient(top,#FFECCE,#FEC36A);
    background-image: linear-gradient(to bottom,#FFECCE,#FEC36A);
    background-image: -moz-linear-gradient(top,#FFECCE,#FEC36A);
    background-repeat: repeat-x;
    filter: progid:dximagetransform.microsoft.gradient(startColorstr='#FFECCE',endColorstr='#FEC36A',GradientType=0);
    filter: progid:dximagetransform.microsoft.gradient(enabled=false);
    box-shadow: inset 0px 0px 2px #fff5e6;
}
.form-group .form-btn.reset-btn {
    display: inline-block;
    width: 100px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    font-size: 15px;
    margin: 0 10px;
    background-color: #8B0B12;
    background-image: -webkit-gradient(linear,0 0,0 100%,from(#DB242C),to(#8B0B12));
    background-image: -webkit-linear-gradient(top,#DB242C,#8B0B12);
    background-image: -o-linear-gradient(top,#DB242C,#8B0B12);
    background-image: linear-gradient(to bottom,#DB242C,#8B0B12);
    background-image: -moz-linear-gradient(top,#DB242C,#8B0B12);
    background-repeat: repeat-x;
    filter: progid:dximagetransform.microsoft.gradient(startColorstr='#DB242C',endColorstr='#8B0B12',GradientType=0);
    filter: progid:dximagetransform.microsoft.gradient(enabled=false);
    box-shadow: inset 0px 0px 2px #ff000e;
}
.form-group .form-input {
    height: 24px;
    line-height: 24px;
    padding: 5px;
    width: 240px;
    border: 1px solid #e1e1e1;
    outline: 0;
    font-size: 14px;
    border-radius: 2px;
    vertical-align: top;
    box-sizing: border-box;
    vertical-align: middle;
}
.form-group .label .form-tips {
    position: absolute;
    left: 380px;
    top: 0;
    font-size: 12px;
    z-index: 10;
    color: #bbb;
    width: 280px;
    text-align: left;
    cursor: text;
    line-height: 24px;
}
.form-group .form-btn.getCode-btn {
    width: 50px;
    height: 22px;
    line-height: 22px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #f4f4f4;
    color: #555;
    border: 1px solid #e1e1e1;
    border-left: 0;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 12px;
    position: absolute;
    right: 1px;
    top: 1px;
}
.form-group .form-select {
    height: 24px;
    line-height: 24px;
    width: 240px;
    border: 1px solid #e1e1e1;
    outline: 0;
    font-size: 14px;
    border-radius: 2px;
    vertical-align: top;
    box-sizing: border-box;
}
.form-group .form-btn {
    // display: block;
    // height: 44px;
    // width: 310px;
    // line-height: 44px;
    // background-color: #06a7e2;
    // color: #fff;
    outline: 0;
    border: 0;
    // font-size: 14px;
    font-family: 'microsoft yahei';
    border-radius: 2px;
    cursor: pointer;
}
.form-group .form-control {
    display: inline-block;
    text-align: left;
    vertical-align: top;
    position: relative;
    margin-left: 10px;
}
.form-group {
    margin-top: 20px;
    width: 100%;
    font-size: 0;
    position: relative;
}
.clearfix:after {
  clear: both;
}
.banner-cpyx {
  background-color: #2a0509;
}
.noticeBar{
  height: 40px;
  background: #1a1a1a;
  border: 1px solid #413233;
}
.about-content{
  width: 100%;
  min-width: 1200px;
  margin: 0 auto;
  background: url('/static/tycjt/img/about_bg.jpg') no-repeat;
  background-position: 50% 0;
  background-color: #1d1717;
  .about-area{
    display: flex;
    position: relative;
    width: 1200px;
    min-height: 811px;
    margin: 20px auto;
    // background: url('/static/tycjt/img/about/about-line.png') no-repeat;
    background-color: rgb(21, 16, 16);
    border:1px solid rgb(48, 38, 38);
    background-position: 229px 88px;
    margin-top: 25px;
    .left-nav{
      width: 222px;
      // height: 788px;
      overflow: hidden;
      margin: 10px;
      background-color: rgb(36, 29, 29);
      border: 1px solid rgb(72, 57, 58);
      .icon_1,.icon_2{
        display: inline-block;
        width: 24px;
        height: 24px;
        margin: 11px;
      }
      .icon1_0{
        background: url('/static/tycjt/img/about/gameRule-icon2.png')
      }
      .icon1_1{
        background: url('/static/tycjt/img/about/sp2.png');
        // background-position-y: -49px;
      }
      .icon1_2{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -49px;
        
      }
      .icon1_3{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -97px;
      }
      .icon1_4{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -145px;
      }
      .icon1_5{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -193px;
      }
      .icon1_6{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -242px;
      }
      .icon1_7{
        background: url('/static/tycjt/img/about/sp2.png');
        background-position-y: -288px;
      }
      .icon2_0{
        background: url('/static/tycjt/img/about/gameRule-icon.png')
      }
      .icon2_1{
        background: url('/static/tycjt/img/about/sp3.png');
      }
      .icon2_2{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -49px;
      }
      .icon2_3{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -97px;
      }
      .icon2_4{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -145px;
      }
      .icon2_5{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -193px;
      }
      .icon2_6{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -242px;
      }
      .icon2_7{
        background: url('/static/tycjt/img/about/sp3.png');
        background-position-y: -288px;
      }
      ul {
        li {
          cursor: pointer;
          height: 46px;
          font-size: 16px;
          border-bottom: 1px solid rgb(72, 57, 58);
          &:hover{
            background: linear-gradient(#f0c250,#fcf495);
            .name{
              color: #000;
            }
            .icon_1{
              display: none;
            }
            .icon_2{
              display: block;
            }
          }
          .icon_2{
            display: none;
          }
          .nav-link{
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
            .nav-img{
              display: block;
              margin-left: 30px;
              width: 20px;
              margin-top: 14px;
            }
            .nav-img2{
              display: none;
              margin-left: 30px;
              width: 20px;
              margin-top: 14px;
            }
            .name-area{
              margin-left: 75px;
              margin-top: -34px;
              .introduce{
                height: 16px;
                width: 16px;
                margin-top: -16px;
                margin-left: 110px;
                background: url('/static/tycjt/img/other.png') no-repeat;
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
      padding: 22px 0 0 35px;
      color: #fff;
      .agent{
        display: flex;
        justify-content: space-between;
        width:438px;
        margin: 0 auto;
        span{
          display: inline-block;
          width: 100px;
          height: 30px;
          line-height: 30px;
          background-color: #E3C95B;
          border-radius: 22px;
          text-align: center;
          color: #000;
          &:hover{
            color: #fff;
          }
        }
      }

      .title{
        font-size: 16px;
        color: #fed969;
        font-weight: 600;
        h1{
          font-size: 22px;
          height: 50px;
        }
      }
      .cont{
        min-height: 650px;
        padding-bottom: 20px;
        h4 {
          padding: 18px 0;
        }
        .des{
          line-height: 28px;
          font-size: 13px;
          color: #e7c1c1;
          span{
            color: #00ff00;
          }
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
    left: 50px;
  }

}
</style>