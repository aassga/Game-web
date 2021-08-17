<template>
  <div>
    <div class="on-line" v-if="paymentData.length">
      <div class="header">
        <div class="title">
          <span v-if="(classType=='transfer_bank' || classType=='transfer_account') && className.includes('微信')"><img :src="wechat"></span>
          <span v-if="(classType=='transfer_bank' || classType=='transfer_account') && className.includes('支付宝')" ><img :src="alipay"></span>
          <!-- <span v-if="(classType=='transfer_usdt') && className.includes('USDT转账')" ><img :src="usdtImg"></span> -->
          <span>{{className.length>4?className:className}}</span>
        </div>
      </div>
      <div v-if="classType=='payment'" class="content">
        <div class="title">
          <ul>
            <li v-for="(item,i) in paymentData" :key="i">
              <span :class="{spanActive:spanActive ==i}" @click="toggle(i,item)">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="content-main" v-if="spanActive ==i" v-show="!qrcodeShow" v-for="(item,i) in paymentData" :key="i">
          <div class="bar">
            <label class="text">存款金额:</label>
            <input type="text" v-model="amount" :placeholder="+item.minAmount+'~'+item.maxAmount+'有效金额'" v-if="!item.isFormatAmount" style="width:220px;">
            <RadioGroup v-model="amount" v-if="!item.isFormatAmount">

              <Radio :label="quick" v-for="(quick,index) in item.quick_amount_list" :key="index">
                <span class="radio-span">{{quick}}</span>
              </Radio>
            </RadioGroup>

            <Select v-model="amount" style="width:200px" v-if="item.isFormatAmount">
                <Option v-for="(v,pricei) in item.priceList" :value="v" :key="pricei">{{v}}</Option>
            </Select>
          </div>
          <div class="bar" v-if="preferentialList.length !==0">
            <label class="text">优惠方式：</label>
            <Select v-model="preferentiaId">
              <Option v-for="(item,i) in preferentialList" :value="item.id" :key="i">{{item.title}}</Option>
            </Select>
          </div>
          <div class="bar bank-bar" v-if="item.codeShow && className === '网银在线'">
            <label class="text">存款方式:</label>
            <RadioGroup v-model="bankCode">
              <Radio v-for="(val,key,i) in item.bankCode" :label="val.code" :key="i">
                <img :src="val.icon" alt="">
              </Radio>
            </RadioGroup>
          </div>

          <div class="bar">
            <label class="text">温馨提示:</label>
            <span>1、充值时候，切记提交订单的金额和充值的金额要相一致，这样成功率较高，1~3分钟即可到帐,</span>
            <p style="margin-left:155px;">如不一致，会导致不到帐哦【<span style="color:#F00; font-size: 14PX;">支付成功不到帐的，请找在线客服或推广代理</span>】</p>
            <p style="margin-left:134px">2、由于银行管制、导致第三方充值通道不稳定、如果充值一次未成功请换其他通道进行充值！</p>
          </div>

          <div :class="{'active':!canClick}"
               class="submitPay"
               @click="onlinePayment(item.id,item.minAmount,item.maxAmount)"
               v-if="!qrcodeShow">
            确认提交
          </div>
          <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
            {{toastText}}
          </div>

        </div>
        <div class="qrcode" v-if="qrcodeShow">
          <div class="bar">
            <label class="text">订单号:</label>[]
            <span>{{order}}</span>
          </div>

          <div class="bar">
            <label class="text">二维码:</label>
            <canvas id="qrcode"></canvas>
          </div>

          <div class="main">
            <p>用手机{{payName}}扫一扫</p>
            <p>扫面二维码完成支付</p>
          </div>
        </div>
      </div>
      <div v-if="classType=='qr_code'" class="content content2">
        <div class="title">
          <ul>
            <li v-for="(item,i) in paymentData" :key="i">
              <span :class="{spanActive:spanActive ==i}" @click="toggle(i,item)">充值通道{{i+1}}</span>
            </li>
          </ul>
        </div>
        <div class="content-main">
          <div class="erCode">
            <img :src="url" alt="">
          </div>
          <div class="bar">
            <span class="tip">打开{{className.includes('微信')?'微信': className.includes('支付宝')?'支付宝':className.includes('财付通')?'财付通':''}}扫一扫</span>
          </div>
          <div class="bar">
            <input placeholder="姓名" type="text" v-model="passKey.depositAccountName">
          </div>
          <div class="bar">
            <input :placeholder="'单笔限额'+passKey.min_amount+'~'+passKey.max_amount" type="text" v-model="passKey.money">
          </div>
          <div class="bar" v-if="discountList.length > 0">
            <!-- <span class="text">优惠比例:</span> -->
            <Select class="bank2" v-model="discountVal" :disabled="discountList.length == 1">
              <Option :value="i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]" v-for="(i,j) in discountList" :key="j">{{i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]}}% (存款{{i.multiple}}倍打码)</Option>
            </Select>
          </div>
          <div class="bar">
            <input placeholder="输入订单号后九位" type="text" v-model="passKey.order">
          </div>
          <div class="submitPay" @click="submitCode" :class="{'active':!canClick}">
            确认提交
          </div>
        </div>
      </div>

      <div v-if="classType=='transfer_bank' || classType=='transfer_account'" class="content_tansfer">

         <!-- 宣传栏 -->
         <div class="warning-wrap" v-if="this.$store.state.mainState.flag">
          <div class="warning">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-user-sound"></use>
            </svg>
            <span>{{notice}}</span>
          </div>
        </div>
        <div class="content-main2">
          <div class="left">
            <p class="teach">
              <span></span>
              <i>{{className.includes('微信转卡') ? '微信转银行卡教程' : className.includes('支付宝转卡') ? '支付宝转银行卡教程' : className.includes('微信转账') ? '微信转账教程' : '支付宝转账教程'}}</i>
              <span></span>
            </p>
            <div class="slide_list" v-if="className.includes('支付宝转账')">
              <div class="slide_item" :style="{transform : 'translateX('+ move +'px)'}">
                <div v-for="(v,i) in carouselData" :key="i">
                  <img :src="v.imgUrl">
                  <p><span v-for="(k,j) in carouselData" :key="j" :class="{'ac': j == n}"></span></p>
                  <p>{{v.text}}</p>
                </div>
              </div>
              <span class="pre" @click="pre"></span>
              <span class="next" @click="next('alipay')"></span>
            </div>
            <div class="slide_list" v-if="className.includes('支付宝转卡')">
              <div class="slide_item" :style="{transform : 'translateX('+ move +'px)'}">
                <div v-for="(v,i) in carouselData3" :key="i">
                  <img :src="v.imgUrl">
                  <p><span v-for="(k,j) in carouselData3" :key="j" :class="{'ac': j == n}"></span></p>
                  <p>{{v.text}}</p>
                </div>
              </div>
              <span class="pre" @click="pre"></span>
              <span class="next" @click="next('alipaytoCard')"></span>
            </div>
            <div class="slide_list" v-if="className.includes('微信转账')">
              <div class="slide_item" :style="{transform : 'translateX('+ move +'px)'}">
                <div v-for="(v,i) in carouselData2" :key="i">
                  <img :src="v.imgUrl">
                  <p><span v-for="(k,j) in carouselData2" :key="j" :class="{'ac': j == n}"></span></p>
                  <p>{{v.text}}</p>
                </div>
              </div>
              <span class="pre" @click="pre"></span>
              <span class="next" @click="next('wechat')"></span>
            </div>
            <div class="slide_list" v-if="className.includes('微信转卡')">
              <div class="slide_item" :style="{transform : 'translateX('+ move +'px)'}">
                <div v-for="(v,i) in carouselData4" :key="i">
                  <img :src="v.imgUrl">
                  <p><span v-for="(k,j) in carouselData4" :key="j" :class="{'ac': j == n}"></span></p>
                  <p>{{v.text}}</p>
                </div>
              </div>
              <span class="pre" @click="pre"></span>
              <span class="next" @click="next('wechatToCard')"></span>
            </div>
          </div>
          <div class="right">
            <!-- <p v-if="className.includes('微信转账') || className.includes('微信转卡')" style="height:40px">添加微信好友转账成功100%</p> -->
            <!-- <p v-if="className.includes('支付宝转账') || className.includes('支付宝转卡')" style="height:40px">添加支付宝好友转账成功100%</p> -->
            <p v-if="className.includes('微信转卡') || className.includes('支付宝转卡')">选择汇款卡号:</p>
            <div class="bank_kind">
              <span @click="chooseBank(v,i)" :class="{'active': i == bankIndex}" v-for="(v,i) in wetbankList" :key="i">
                <span v-if="className.includes('微信转账')"><img :src="wechat"><i class="wechatName">微信帐号</i></span>
                <span v-if="className.includes('支付宝转账')"><img :src="alipay"><i class="alipayName">支付宝</i></span>
                <span class="noeWechat" v-if="!className.includes('支付宝转账') && !className.includes('微信转账')"><img :src="v.cardImg">{{v.bankName}}</span>
              </span>
            </div>
            <div class="customer_list">
              <div>
                <span v-if="className.includes('微信转账')">微信昵称: </span>
                <span v-else-if="className.includes('支付宝转账')">账号姓名: </span>
                <span v-else>收款姓名: </span>
                <i @click="onCopy(bankInfo.saveName)">复制</i>
                <input v-model="bankInfo.saveName" type="text" placeholder="收款姓名" disabled="disabled">
              </div>
              <div>
                <span v-if="className.includes('微信转账')">微信账号: </span>
                <span v-else-if="className.includes('支付宝转账')">转账账号: </span>
                <span v-else>收款账号: </span>
                <i @click="onCopy(bankInfo.saveMoney)">复制</i>
                <input v-model="bankInfo.saveMoney" type="text" placeholder="收款金额" disabled="disabled">
              </div>
              <div v-if="className.includes('微信转账') || className.includes('支付宝转账')" >
                <span>温馨提示: </span>
                <input v-if="className.includes('支付宝转账')" v-model="bankInfo.classRemarks" type="text" disabled="disabled" :placeholder="classRemarks">
                <input v-if="className.includes('微信转账')" v-model="bankInfo.classRemarks" type="text" disabled="disabled" :placeholder="classRemarks">
              </div>
              <div>
                <span v-if="className.includes('微信转账') || className.includes('支付宝转账')">汇款昵称: </span>
                <input v-if="className.includes('微信转账') || className.includes('支付宝转账')" v-model="bankInfo.backName" maxlength="32" type="text" placeholder="请输入1~32位汇款昵称">
                <span v-if="!className.includes('微信转账') && !className.includes('支付宝转账')">汇款姓名: </span>
                <input v-if="!className.includes('微信转账') && !className.includes('支付宝转账')" v-model="bankInfo.backName" type="text" placeholder="汇款姓名">
              </div>
              <div>
                <span>汇款金额: </span>
                <input v-model="bankInfo.backMoney" type="text" placeholder="汇款金额">
              </div>
              <div v-if="discountList.length > 0">
                <span class="text">优惠比例:</span>
                <Select class="bank2" v-model="discountVal" :disabled="discountList.length == 1">
                  <Option :value="i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]" v-for="(i,j) in discountList" :key="j">{{i.bonusRate.indexOf('_') === -1 ? i.bonusRate : i.bonusRate.split('_')[1]}}% (存款{{i.multiple}}倍打码)</Option>
                </Select>
              </div>
              <div>
                <div class="submitPay" @click="submitBnk" :class="{'actives':!canClick}" >
                    确认提交
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else class="no-pay-tongdao">
      <img src="/static/public/image/userImg/no-pay-tongdao.png" alt="">
    </div>

    <Modal
      v-model="ifmodel"
      class="oldmal"
      class-name="agent-transfer"
      width="424"
      :mask-closable="false"
    >
      <div
        class="vp-admin-wrap-close"
        slot="close"

      >
        <div class="vp-admin-wrap-close-empty">
          <a></a>
        </div>
      </div>
      <div slot="header" class="tishi">
           <span>提示</span>
      </div>
      <div class="agent-con">
          <span class="iconspan"> <i class="iconfont icon-baojing"></i><span class="tispan">是否继续该笔充值</span></span>
          <a class='pay' :href="hrefpath" target="_blank">支付</a>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal
      v-model="newmodel"
      class="newmodal"
      class-name="agent-transfer"
      width="345"
      :mask-closable="false"
    >
      <div
        class="vp-admin-wrap-close"
        slot="close"

      >
      </div>
      <div slot="header" class="tishi">
           <span>请填写真实姓名</span>
      </div>
      <div class="agent-con">
           <span class="rename">请务必填写真实姓名，一旦绑定将无法修改姓名</span>
           <input type="text" placeholder="真实姓名" id="inputtext" v-model="realName">
      </div>
      <div slot="footer" class="footer">
            <span class="span1" @click="hidemode">取消</span>
            <span @click="sendName">确定</span>
      </div>
    </Modal>
    <rechargeLog></rechargeLog>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import store from '@/vuex/store'
import rechargeLog from './rechargeLog'
import UserService from '@/service/public/UserService.js'
let timer
export default {
  data () {
    return {
      n: 0,
      move: 0,
      bankIndex: 0,
      bankInfo: {
        backName: '',
        backMoney: '',
        saveName: '',
        saveMoney: '',
        id: '',
        bankNew: '',
        notice: '',
        classRemarks: ''
      },
      carouselData: [
        { imgUrl: '/static/public/image/userImg/teach1.png', text: '①点击右上角添加好友' },
        { imgUrl: '/static/public/image/userImg/teach2.png', text: '②搜索支付宝账号' },
        { imgUrl: '/static/public/image/userImg/teach3.png', text: '③点击“加好友”' },
        { imgUrl: '/static/public/image/userImg/teach4.png', text: '④点击“转账”' },
        { imgUrl: '/static/public/image/userImg/teach5.png', text: '⑤填写汇款金额' }
      ],
      carouselData2: [
        { imgUrl: '/static/public/image/userImg/wechat1.png', text: '①搜索微信账号”' },
        { imgUrl: '/static/public/image/userImg/wechat2.png', text: '②添加微信好友' },
        { imgUrl: '/static/public/image/userImg/wechat3.png', text: '③点击“发送”添加申请' },
        { imgUrl: '/static/public/image/userImg/wechat4.png', text: '④点击转账' },
        { imgUrl: '/static/public/image/userImg/wechat5.png', text: '⑤输入汇款金额“' }
      ],
      carouselData3: [
        { imgUrl: '/static/public/image/userImg/teach_card1.png', text: '①点击“转账”进入“转账页面”' },
        { imgUrl: '/static/public/image/userImg/teach_card2.png', text: '②点击“转到银行卡”进入信息填写' },
        { imgUrl: '/static/public/image/userImg/teach_card3.png', text: '③点击“下一步”输入密码完成转账' }
      ],
      carouselData4: [
        { imgUrl: '/static/public/image/userImg/wecha_card1.png', text: '①点击“收付款”进入“收付款页面”' },
        { imgUrl: '/static/public/image/userImg/wecha_card2.png', text: '②点击“向银行卡或手机号转账”进入下一步' },
        { imgUrl: '/static/public/image/userImg/wecha_card3.png', text: '③点击“向银行卡转账”进入信息填写' },
        { imgUrl: '/static/public/image/userImg/wecha_card4.png', text: '④填写完成点击“下一步”输入金额' },
        { imgUrl: '/static/public/image/userImg/wecha_card5.png', text: '⑤输入金额点击“转账”进入“转账说明“' },
        { imgUrl: '/static/public/image/userImg/wecha_card6.png', text: '⑥输入转账说明点击“转账”进入支付页面' },
        { imgUrl: '/static/public/image/userImg/wecha_card7.png', text: '⑦输入密码完成转账' }
      ],
      wechat: '/static/public/image/userImg/wechat.png',
      alipay: '/static/public/image/userImg/alipay.png',
      usdtImg: '/static/public/image/userImg/usdt.png',
      priceList: [],
      notice:
          '以下银行帐号限本次存款使用,帐号不定期更换!每次存款前请依照本页所显示的银行帐号入款!如入款至已过期帐号,无法查收,本公司恕不负责', // 顶部公告
      datas: {
        id: '',
        minMoney: '',
        maxMoney: ''
      },
      bankamount: '',
      bankname: '',
      realName: '',
      newmodel: false,
      canClick: true,
      ifmodel: false,
      depositDetail: {},
      passKey: {
        money: '',
        order: '',
        time: '',
        codeId: '',
        max_amount: '',
        min_amount: '',
        code: ''
      },
      name: '',
      bankActive: 0,
      url: '',
      publicUrl: '',
      spanActive: 0,
      amount: '',
      bankCode: '',
      qrcodeShow: false,
      order: '',
      toastShow: false,
      toastNum: -20,
      toastText: '',
      paymentDataShow: true,
      preferentialList: [],
      preferentiaId: '',
      bankList: [],
      hrefpath: '',
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
        '东莞银行',
        '广发银行',
        '平安银行',
        '徽商银行',
        '江苏银行',
        '农村信用社',
        '哈尔滨银行',
        '深圳发展银行',
        '广州农村商业银行',
        '其它'
      ],
      bankDetail: [],
      wetbankList: [],
      discountList: [],
      discountVal: ''
    }
  },
  methods: {
    getDisCountData () {
      this.$http.post(`${this.$HOST_NAME}/deposit/getDepositBonusList `, { depositType: 'bank' }).then(res => {
        if (res.code == 200 && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].val = i;
            res.data[i].bonusRate = res.data[i].bonusRate.toString();
          }
          this.discountList = res.data
          this.discountVal = res.data[0].bonusRate.indexOf('_') === -1 ? res.data[0].bonusRate : res.data[0].bonusRate.split('_')[1]
        }
      })
    },
    pre () {
      if (this.move != 0) {
        this.move = this.move + 360
      }
      if (this.n >= 0) {
        this.n = this.n - 1
        if (this.n < 0) { this.n = 0 }
      }
    },
    next (a) {
      switch (a) {
        case 'wechat':
          if (this.move != -1440) {
            this.move = this.move - 360
          }
          if (this.n < 4) {
            this.n = this.n + 1
          } else {
            this.move = 0
            this.n = 0
          }
          break
        case 'wechatToCard':
          if (this.move != -2160) {
            this.move = this.move - 360
          }
          if (this.n < 6) {
            this.n = this.n + 1
          } else {
            this.move = 0
            this.n = 0
          }
          break
        case 'alipay':
          if (this.move != -1440) {
            this.move = this.move - 360
          }
          if (this.n < 4) {
            this.n = this.n + 1
          } else {
            this.move = 0
            this.n = 0
          }
          break
        case 'alipaytoCard':
          if (this.move != -720) {
            this.move = this.move - 360
          }
          if (this.n < 2) {
            this.n = this.n + 1
          } else {
            this.move = 0
            this.n = 0
          }
          break
      }
    },
    chooseBank (v, i) {
      this.bankIndex = i
      this.bankInfo.saveName = v.cardName
      this.bankInfo.saveMoney = v.cardNum
      this.bankInfo.bankNew = v.bankName
      this.bankInfo.id = v.id
      this.bankDetail = v
      this.bankInfo.backName = ''
      this.bankInfo.backMoney = ''
      this.bankInfo.classRemarks = v.msgTitle
    },
    onCopy (text) {
      this.$copyText(text.replace(/\s*/g, '')).then(() => {
        this.$success('复制成功')
      })
    },
    selectBank (i, item) {
      this.bankActive = i
      this.bankCode = item
    },
    hidemode () {
      this.newmodel = false
    },
    toggle (i, item) {
      /*
        requestType = NNIA  无需输入金额（一般以用户在付款页面实际付款金额为准）
        requestType = NIA 需要输入金额 （一般以用户输入金额或实际付款金额为准）
        */
      if (item.requestType === 'NNIA') {
        $.ajax({
          url: `${this.$HOST_NAME}/onlinePaymentNew`,
          headers: {
            // "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `${localStorage.token}`
          },
          async: true,
          type: 'post',
          data: {
            paymentId: item.id,
            money: 0,
            bankCode: this.bankCode,
            type: 'pc',
            preferentialId: this.preferentiaId,
            categoryId: this.$store.state.personal.categoryId
          },
          success: res => {
            if (res.code === 200) {
              window.open(res.data.formUrl, '_blank')
            } else {
              this.$error(res.message)
            }
          }
        })
      } else {
        this.bankList = item.bankCode
        this.spanActive = i
        this.qrcodeShow = false
        this.amount = ''
        if (this.classType == 'qr_code') {
          this.passKey.max_amount = item.max_amount
          this.passKey.min_amount = item.min_amount
          this.url = this.publicUrl + item.qr_code
          this.passKey.codeId = item.id
        }
        clearInterval(timer)
      }
    },
    toggle2 (index, item) {
      this.depositDetail = this.paymentData[index]
      this.depositDetail.quick_amount_list = []
      this.bankname = ''
      this.bankamount = ''
      this.spanActive = index
      let { bankName, cardNum, quick_amount, quick_amount_list } = this.depositDetail

      if (this.bankData.indexOf(bankName) != -1) {
        this.depositDetail.imgUrl = `/static/public/image/bankImg/${bankName}.png`
      } else {
        if (bankName == '广州发展银行') {
          this.depositDetail.imgUrl = `/static/public/image/bankImg/${bankName}.png`
        } else {
          this.depositDetail.imgUrl = `/static/public/image/bankImg/morenBank.png`
        }
      }
      if (quick_amount) {
        if (quick_amount.indexOf(',') == -1) this.depositDetail.quick_amount_list[0] = quick_amount
        else this.depositDetail.quick_amount_list = quick_amount.split(',').splice(0, 8)
      } else {
        this.depositDetail.quick_amount_list = [50, 100, 500, 1000, 5000]
      }
    },
    onlinePayment (id, minMoney, maxMoney) {
      this.datas.id = id
      this.datas.minMoney = minMoney
      this.datas.maxMoney = maxMoney
      this.$http.post(`${this.$HOST_NAME}/getPaymentMsgImg`).then(res => {
        if (res.code == 200 && res.data.msg) {
          this.$store.state.personal.rechargeText = res.data
          this.getLogContent()
        } else {
          if (!JSON.parse(localStorage.userinfo).realName) {
            this.newmodel = true
            return false
          }
          this.onlinePayment1(id, minMoney, maxMoney)
        }
      })
    },
    // 第三方申请支付
    onlinePayment1 (id, minMoney, maxMoney) {
      // debugger
      if (!this.canClick) {
        return false
      }
      if (!this.amount) {
        this.$error('请选择金额')
        return false
      }
      // debugger
      if (minMoney == 0 && maxMoney == 0) {

      } else {
        // 单选按钮并非下拉框
        if (this.amount - 0 < minMoney - 0) {
          this.toastShow = true
          this.toastNum = 23
          this.toastText = '金额低于通道最低金额' + minMoney
          setTimeout(() => {
            this.toastShow = false
          }, 2000)
          return false
        }
        if (this.amount - 0 > maxMoney - 0) {
          this.toastShow = true
          this.toastText = '金额高于通道最高金额' + maxMoney
          this.toastNum = 23
          setTimeout(() => {
            this.toastShow = false
          }, 2000)
          return false
        }
      }
      this.canClick = false
      setTimeout(() => {
        this.canClick = true
      }, 5 * 1000)
      this.toastShow = false
      // 因为用了ajax同步，所以弄个定时器弄成异步
      setTimeout(() => {
        $.ajax({
          url: `${this.$HOST_NAME}/onlinePaymentNew`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `${localStorage.token}`
          },
          async: false,
          type: 'post',
          data: {
            paymentId: id,
            money: this.amount,
            bankCode: this.bankCode,
            type: 'pc',
            preferentialId: this.preferentiaId,
            categoryId: this.$store.state.personal.categoryId
          },
          success: res => {
            if (res.code === 200) {
              if (res.data.qrCode) {
                // tempwindow.close();

                this.order = res.data.order
                this.qrcodeShow = true

                const that = this
                this.$nextTick(() => {
                  QRCode.toCanvas(document.getElementById('qrcode'), res.data.qrCode, function (err) {
                    if (err) that.$error('生成二维码失败!')
                  })
                })

                // this.spanActive = 999;
                timer = setInterval(this.payOrder, 5000)
              } else {
                this.ifmodel = true
                // window.open(res.data.formUrl)
                this.hrefpath = res.data.formUrl
              }
            }else if(res.code === 5015){
                this.$store.commit('paymentModal', true);
                this.$store.commit('paymentModalData', res.extra);
                this.$store.commit('paymentModalMoney', this.amount);
            } else {
              this.$error(res.message)
            }
          }
        })
      }, 0)
    },
    // 查询订单
    payOrder () {
      this.$http
        .post(`${this.$HOST_NAME}/onlinePayment/order`, {
          order: this.order
        })
        .then(res => {
          if (res.data.orderStatus == 'success') {
            this.$success('支付成功')
            this.qrcodeShow = false
            this.amount = ''
            clearInterval(timer)
          }
        })
    },
    hanlderDate (date) {
      this.passKey.time = date
    },
    subCode () {
      let data = {
        QRCodeId: this.passKey.codeId,
        amount: this.passKey.money,
        depositTime: this.getTime(new Date()),
        serialNumber: this.passKey.order,
        depositAccountName: this.passKey.depositAccountName,
        bonusRate: this.discountVal
      }
      if(data.bonusRate=="") delete data.bonusRate;
      this.$http.post(`${this.$HOST_NAME}/deposit/qr_code_application`, data)
        .then(res => {
          if (res.code == 200) {
            this.passKey.money = ''
            this.passKey.order = ''
            this.passKey.time = ''
            this.passKey.depositAccountName = ''
            this.$success(res.message)
          } else {
            this.$error(res.message)
          }
        })
    },
    submitBnk () {
      if (!this.canClick) {
        return false
      }
      this.canClick = false
      setTimeout(() => {
        this.canClick = true
      }, 3 * 1000)
      let { bankName, cardName, cardNum, classId, className, id, min_amount, max_amount } = this.depositDetail
      let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
      if (this.bankDetail.className == '微信转账' || this.bankDetail.className == '支付宝转账') {
        if (!this.bankInfo.backName || this.bankInfo.backName.length > 32 || this.bankInfo.backName.length < 1) {
          this.$error('请输入1-32位汇款昵称')
          return false
        }
      } else {
        if (!reg.test(this.bankInfo.backName)) {
          this.$error('请输入正确汇款姓名')
          return false
        }
      }

      if (!this.dInvalidMoney(this.bankInfo.backMoney)) {
        this.$error('请输入正确的存款金额')
        return false
      }
      if (+this.bankInfo.backMoney < +min_amount) {
        this.$error('金额低于通道最低金额' + min_amount)
        return false
      }
      if (+this.bankInfo.backMoney > +max_amount) {
        this.$error('金额高于通道最高金额' + max_amount)
        return false
      }
      if (!JSON.parse(localStorage.userinfo).realName) {
        this.newmodel = true
        return false
      }
      this.submitMoney()
    },
    submitMoney () {
      let postUrl = ''
      if (this.classType == 'transfer_account') {
        postUrl = '/deposit/transferAccount'
      } else {
        postUrl = '/deposit/transferBank'
      }
      let data = {
        amount: this.bankInfo.backMoney,
        depositId: this.bankInfo.id,
        bankId: this.bankDetail.cardNum,
        bankName: this.bankInfo.bankNew,
        bankAccountName: this.bankInfo.backName,
        bankSerialNumber: '23412342',
        className: this.bankDetail.className,
        depositTime: this.getTime(new Date()),
        classId: this.bankDetail.classId,
        classRemarks: this.classRemarks,
        bonusRate: this.discountVal
      }
      if(data.bonusRate=="") delete data.bonusRate;
      this.$http.post(`${this.$HOST_NAME + postUrl}`, data).then(
        res => {
          if (res.code == 200) {
            this.bankInfo.backName = ''
            this.bankInfo.backMoney = ''
            this.$success(res.data)
          } else {
            this.$error(res.message)
          }
        }
      )
    },
    submitCode () {
      if (!this.canClick) {
        return false
      }

      var reg = /^[\u4E00-\u9FA5]+$/
      if (!reg.test(this.passKey.depositAccountName)) {
        this.$error('请输入正确存款姓名')
        return false
      }
      if (!this.passKey.money) {
        this.$error('请输入存款金额')
        return false
      }
      if (!this.passKey.order) {
        this.$error('请输入订单号后九位')
        return false
      }
      this.canClick = false
      setTimeout(() => {
        this.canClick = true
      }, 5 * 1000)
      if (!JSON.parse(localStorage.userinfo).realName) {
        this.newmodel = true
        return false
      }
      this.subCode()
    },
    sendName () {
      if (this.realName) {
        this.$postS(`member/set-member-info`, {
          realName: this.realName
        }).then(res => {
          if (res && res.code == 200) {
            this.newmodel = false
            UserService.vpGetBasicInfo.call(this)
            if (this.classType == 'qr_code') {
              this.subCode()
              // let {id,minMoney,maxMoney}=this.datas
              // this.onlinePayment1(id,minMoney,maxMoney)
            } else if (this.classType == 'transfer_bank' || this.classType == 'transfer_account') {
              this.submitMoney()
            } else {
              let { id, minMoney, maxMoney } = this.datas
              this.onlinePayment1(id, minMoney, maxMoney)
            }
          } else {
            this.newmodel = false
            this.$error(res.message)
          }
        })
      } else {
      }
    },
    getSaveBank () {
      this.$http.post(`${this.$HOST_NAME}/deposit/bank`, { devices: 'pc', classId: this.$store.state.personal.itemDatas.id }).then(res => {
        if (res.code === 200 && res.data.length) {
          this.wetbankList = res.data
          this.chooseBank(this.wetbankList[0], 0)
        }
      })
    },
    getLogContent () {
      this.$store.state.personal.showRecharge = true
      let msg = this.$store.state.personal.rechargeText.msg
      msg = msg.replace('{payTypeText}', `<span style='color:#058dd7'>${this.$store.state.personal.rechargeText.payTypeText}</span>`)
      msg = msg.replace('{preferentialText}', `<span style='color:#d06901'>${this.$store.state.personal.rechargeText.preferentialText}</span>`)
      msg = msg.replace('{giftMoreText}', `<span style='color:#c21358'>${this.$store.state.personal.rechargeText.giftMoreText}</span>`)
      this.$store.state.personal.rechargeText['msg'] = msg
      this.$store.state.personal.rechargeMsg = this.$store.state.personal.rechargeText['msg']
    }
  },
  created () {
    if (localStorage.config) {
      let config = JSON.parse(localStorage.config)
      this.publicUrl = config.statics
    }
    this.getSaveBank()
    this.getDisCountData()
  },
  destroyed () {
    clearInterval(timer)
  },
  computed: {
    paymentData () {
      try {
        let bankCodeArr = this.$store.state.personal.paymentData
        let i = this.spanActive
        let bankCodeObj = bankCodeArr[i]
        this.bankCode = bankCodeObj.bankCode[0].code
      } catch (err) {

      }
      return this.$store.state.personal.paymentData
    },
    isRefresh () {
      return this.$store.state.personal.isRefresh
    },
    payName () {
      return this.$store.state.personal.payName
    },
    classType () {
      return this.$store.state.personal.itemDatas.classType
    },
    className () {
      return this.$store.state.personal.itemDatas.className
    },
    classRemarks () {
      return this.$store.state.personal.itemDatas.classRemarks
    },
    classType1 () {
      return this.$store.state.personal.paymentAll.classType
    }
  },
  watch: {
    className: function (val) {
      if (this.classType == 'transfer_bank' || this.classType == 'transfer_account') {
        if (this.className.includes('微信') || this.className.includes('支付宝')) {
          this.n = 0
          this.move = 0
          this.bankIndex = 0
          this.getSaveBank()
        }
      }
    },
    priceList () {
      return this.$store.state.personal.paymentData.priceList
    },
    isRefresh: function (newValue, oldValue) {
      if (newValue > 0) {
        this.qrcodeShow = false
        this.amount = ''
        this.spanActive = 0
        clearInterval(timer)
      }
    },
    paymentData: function (newValue, oldValue) {
      this.passKey.money = ''
      this.passKey.order = ''
      this.passKey.time = ''

      this.url = ''
      this.passKey.codeId = ''
      this.passKey.max_amount = ''
      this.passKey.min_amount = ''

      let item = newValue[this.spanActive]

      if (this.classType == 'qr_code' && item) {
        this.url = this.publicUrl + item.qr_code
        this.passKey.codeId = item.id
        this.passKey.max_amount = item.max_amount
        this.passKey.min_amount = item.min_amount
      }
      if (this.classType == 'transfer_bank' && this.spanActive == 0) {
        this.toggle2(0)
      }

      if (this.$store.state.personal.navView == 4 && newValue) {
        this.bankList = item.bankCode
      }
      this.priceList = this.$store.state.personal.paymentData.priceList
    }
  },
  filters: {
    capitalize: function (value) {
      if (value) {
        switch (value) {
          case '微信':
            value = 'weixin'
            break
          case '支付宝':
            value = 'zfb'
            break
          case '微信扫码':
            value = 'weixin'
            break
          case '支付宝扫码':
            value = 'zfb'
            break
          case '网银':
            value = 'wangying'
            break
          case 'QQ':
            value = 'QQ'
            break
          case '京东':
            value = 'jingdong'
            break
          case '快捷':
            value = 'kuaijie'
            break
          case '银联扫码':
            value = 'saoma'
            break
          case '百度':
            value = 'baidu'
            break
          case '银联':
            value = 'yinlian'
            break
          case '农业银行':
            value = 'bank-1'
            break
          case '工商银行':
            value = 'bank-2'
            break
          case '建设银行':
            value = 'bank-2'
            break
          case '交通银行':
            value = 'bank-3'
            break
          case '中国银行':
            value = 'bank-4'
            break
          case '招商银行':
            value = 'bank-5'
            break
          case '民生银行':
            value = 'bank-6'
            break
          case '邮政银行':
            value = 'bank-7'
            break
          case '兴业银行':
            value = 'bank-8'
            break
          case '中信银行':
            value = 'bank-9'
            break
          case '浦发银行':
            value = 'bank-10'
            break
          case '华夏银行':
            value = 'bank-11'
            break
          case '光大银行':
            value = 'bank-12'
            break
          case '北京银行':
            value = 'bank-13'
            break
          case '广发银行':
            value = 'bank-14'
            break
          case '南京银行':
            value = 'bank-15'
            break
          case '上海银行':
            value = 'bank-16'
            break
          case '平安银行':
            value = 'bank-17'
            break
          case '东亚银行':
            value = 'bank-18'
            break
        }

        return `/static/public/image/bank/${value}.png`
      }
    }
  },
  components: { rechargeLog },
  store
}
</script>

<style lang="less" scoped>
  .ac{
    background: #FF9900;
  }
  .active{
    border: 1px solid orange;
  }
  /deep/.ivu-select-dropdown{
    max-height:210px;
    overflow-y: auto;
  }

  .on-line {
    padding: 0 14px;
    height: 100%;
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(246,246,246,1);
    .header {
      height: 66px;
      padding-top: 15px;

      .title {
        padding-left: 30px;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;

        img {
          width: 26px;
          vertical-align: middle;
        }

        span {
          font-size: 16px;
          vertical-align: middle;
          padding-left: 5px;
          border-right: 1px solid #dbdbdb;
          padding-right: 10px;
          &:last-child{
            border-right: none;
          }
        }
      }
    }
    .content_tansfer{
      height: 100%;
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      padding: 0 14px;
      .warning-wrap {
        background-color: #fff;
        .warning {
          height: 40px;
          line-height: 40px;
          color: #ff3333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.4em;
          border-radius: 5px;
          .icon {
            width: 17px;
            height: 17px;
            fill: #979797;
            overflow: hidden;
            margin-left: 12px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }

      }
      .title {
        padding-left: 126px;
        padding-top: 10px;
        min-height: 66px;
        height: auto;
        display: inline-block;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 10px;
        width: 95%;
        ul {
          li {
            font-size: 16px;
            font-weight: 200;
            width: 125px;
            height: 40px;
            float: left;
            line-height: 40px;
            text-align: center;

            span {
              padding: 8px 20px;
              cursor: pointer;
            }

            .spanActive {
              background: linear-gradient(180deg, #fe8983, #f0b761);
              border-radius: 10px;
              color: #fff;
            }
          }
        }
      }
      .content-main2{
        width:950px;
        // height:430px;
        border:1px solid rgba(225,225,225,1);
        border-radius:6px;
        display: flex;
        flex-wrap: nowrap;
        >div{
          width: 50%;
          &:first-child{
            box-shadow:0px 2px 13px 0px rgba(0, 0, 0, 0.05);
            .teach{
              color: #FF9900;
              font-size: 18px;
              text-align: center;
              margin-top: 25px;
              span{
                display: inline-block;
                width: 15px;
                height: 14px;
                background-image: url('/static/public/image/userImg/square.png');
                background-repeat: no-repeat;
                background-size: 100% auto;
                margin-top: 10px;
              }
            }
          }
          &:last-child{
            padding: 20px 0 10px 20px;
            p{
              color: #000;
              font-size: 17px;
              height: 50px;
              line-height: 50px;
              // font-weight: bold;
            }
            .bank_kind{
              display: flex;
              flex-wrap: wrap;
              >span{
                display: inline-block;
                width:110px;
                height:40px;
                background:rgba(243,243,243,1);
                border:1px solid rgba(255, 153, NaN, 1);
                border-radius:10px;
                line-height: 40px;
                text-align: center;
                color: #000;
                cursor: pointer;
                font-size: 16px;
                overflow: hidden;
                margin-right: 6px;
                margin-top: 10px;
                .noeWechat{
                  img{
                    width: 20px;
                    position: relative;
                    top: 4px;
                    left: -5px;
                  }
                }
                span{
                  img{
                    width: 20px;
                    position: relative;
                    top: 4px;
                  }
                  .alipayName{
                    position: relative;
                    top: 0px;
                    right: 4px;
                    display: inline-block;
                    width: 70px;
                    text-align: center;
                  }
                  .wechatName{
                    position: relative;
                    top: 0px;
                    right: 4px;
                    display: inline-block;
                    width: 70px;
                    text-align: right;
                  }
                }

              }
            }
            .customer_list{
              /deep/.bank2{
                // .ivu-select-single .ivu-select-selection{
                  width: 263px;
                  margin-top: 0;
                // }
                /deep/.ivu-select-selection{
                  width: 263px;
                }
              }
              div{
                display: flex;
                flex-wrap: nowrap;
                margin-top: 20px;
                position: relative;
                span{
                  display: inline-block;
                  width:76px;
                  color: #000;
                  font-size: 16px;
                  margin-top: 12px;
                }
                input{
                  border: none;
                  outline: none;
                  width:262px;
                  height:38px;
                  background:rgba(245,245,245,1);
                  border-radius:10px;
                  padding-left: 10px;
                  font-size: 15px;
                }
                .submitPay {
                  border-top: 1px solid #f3f3f3;
                  width: 140px;
                  height: 42px;
                  line-height: 42px;
                  text-align: center;
                  color: #fff;
                  font-size: 1.8em;
                  background:linear-gradient(0deg,rgba(255,31,83,1) 0%,rgba(255,34,136,1) 100%);
                  border-radius: 10px;
                  margin-top: 0px;
                  margin-left: 125px;
                  display: inline-block;
                  cursor: pointer;

                  &.actives {
                    background: linear-gradient(180deg, #ccc, #eee);

                    &:hover {
                      cursor: not-allowed;
                    }
                  }
                }
                i{
                  display: inline-block;
                  width: 40px;
                  height: 30px;
                  background: #ff9900;
                  border-radius: 6px;
                  color: #fff;
                  position: absolute;
                  right: 120px;
                  top: 4px;
                  line-height: 30px;
                  text-align: center;
                  cursor: pointer;
                }
              }

            }
          }
          .slide_list{
            height: 330px;
            width: 360px;
            margin: 30px 50px;
            overflow: hidden;
            position: relative;
            .slide_item{
              width: 2555px;
              display: flex;
              transition: all 0.2s linear;
              p{
                text-align: center;
                color: #000;
                margin-top: 6px;
                font-size: 15px;
                span{
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  border: 1px solid #FF9900;
                  margin-left: 10px;
                }
              }
            }
            span{
              display: inline-block;
              width: 35px;
              height: 35px;
              cursor: pointer;
            }
            .pre{
              position: absolute;
              top: 40%;
              left: 0px;
              background: url('/static/public/image/userImg/pre.png') no-repeat;
            }
            .next{
              background: url('/static/public/image/userImg/next.png') no-repeat;
              position: absolute;
              top: 40%;
              right: -7px;
            }
          }
        }

      }
      .ivu-carousel-dots-inside{
        display: none!important;
      }
      .carouse {
        text-align: center;
        width: 100%;
        overflow: hidden;
        margin: 50px;
        /deep/.el-carousel {
          overflow-x: unset;
        }

        /deep/ .el-carousel__indicators {
          bottom: 5px;
        }

        /deep/ .el-carousel__button {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
    }
    .content {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0 14px;

      .title {
        // height: 66px;
        padding-left: 126px;
        padding-top: 10px;
        min-height: 66px;
        height: auto;
        display: inline-block;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 10px;
        width: 95%;
        ul {
          li {
            font-size: 16px;
            font-weight: 200;
            width: 125px;
            height: 40px;
            float: left;
            line-height: 40px;
            text-align: center;

            span {
              padding: 8px 20px;
              cursor: pointer;
            }

            .spanActive {
              background: linear-gradient(180deg, #fe8983, #f0b761);
              border-radius: 10px;
              color: #fff;
            }
          }
        }
      }

      .content-main {
        // border-bottom: 1px solid #f3f3f3;
        padding-bottom: 26px;
        position: relative;
        height: 540px;
        overflow-y: scroll;
        .discountSelect{
          .selectOp{
            width: 220px;
            outline: none;
            border-color: transparent;
            background: #f5f5f5;
            height: 38px;
            border-radius: 10px;
            font-size: 15px;
            box-shadow: inset 0 1px 10px 0 rgb(0 0 0 / 6%);
          }
        }
        /deep/.bank2{
          // .ivu-select-single .ivu-select-selection{
            width: 263px;
            margin-top: 0;
          // }
          /deep/.ivu-select-selection{
            width: 220px;
          }
        }
        .bar {
          margin-top: 20px;

          .bank-wrap {
            overflow: hidden;
            margin: 20px 0;

            .bank {
              width: 80%;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              margin-left: 20px;

              .bank-item {
                position: relative;
                margin-right: 15px;
                margin-bottom: 20px;
                cursor: pointer;
                border: 1px solid #aaa;

                .ico {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 14px;
                  height: 14px;
                  display: none;
                  background-color: #fff;
                  border-radius: 100%;
                }

                img {
                  width: 150px;
                  height: auto;
                }
              }

              .bank-item.active {
                -webkit-animation-duration: 0.3s;
                animation-duration: 0.3s;
                -webkit-animation-name: bounceIn;
                animation-name: bounceIn;
                box-shadow: 0px 0px 5px 2px #68a1d8;

                .ico {
                  display: block;
                  background-image: url("/static/public/image/bank/selected.png");
                }
              }

              @keyframes bounceIn {
                from,
                20%,
                40%,
                60%,
                80%,
                to {
                  -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                }
                0% {
                  opacity: 0;
                  -webkit-transform: scale3d(0.3, 0.3, 0.3);
                  transform: scale3d(0.3, 0.3, 0.3);
                }
                20% {
                  -webkit-transform: scale3d(1.1, 1.1, 1.1);
                  transform: scale3d(1.1, 1.1, 1.1);
                }
                40% {
                  -webkit-transform: scale3d(0.9, 0.9, 0.9);
                  transform: scale3d(0.9, 0.9, 0.9);
                }
                60% {
                  opacity: 1;
                  -webkit-transform: scale3d(1.03, 1.03, 1.03);
                  transform: scale3d(1.03, 1.03, 1.03);
                }
                80% {
                  -webkit-transform: scale3d(0.97, 0.97, 0.97);
                  transform: scale3d(0.97, 0.97, 0.97);
                }
                to {
                  opacity: 1;
                  -webkit-transform: scale3d(1, 1, 1);
                  transform: scale3d(1, 1, 1);
                }
              }
            }
          }
         .newBank{
          width: 280px;
          height: 130px;
          // background: linear-gradient(90deg, #96c2fd, #538af7);
          display: inline-block;
          vertical-align: middle;
          padding: 10px 6px 10px 6px;
          font-size: #fff;
          border-radius: 10px;
          a {
            text-decoration: underline;
            font-size: 1em;
            color: #fff;
            margin-left: 6px;
            font-weight: 100;
          }
          .title2 {
            img {
              width: 36px;
              vertical-align: middle;
              margin-right: 25px;
              opacity: 0;
            }
            span {
              font-size: 15px;
              color: #fff;
              vertical-align: middle;
            }
            a {
              margin-top: 10px;
              font-size: 15px;
            }
           }
          .row {
            padding-top: 10px;
            font-size: 15px;
            color: #fff;
            height: 25px;
            label {
              // width: 52px;
              display: inline-block;
              text-align: left;
              margin-left: 10px;
            }
            a {
              font-size: 15px;
            }
            .cardNameOv {
              width: 165px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: inline-block;
            }
          }
        }

          .text {
            display: inline-block;
            width: 126px;
            text-align: right;
            font-size: 15px;
            font-family: "Microsoft YaHei";
            vertical-align: middle;
            margin-right: 5px;
          }

          input {
            height: 38px;
            font-size: 16px;
            background: #f5f5f5;
            border: 1px solid #f5f5f5;
            border-radius: 10px;
            // padding: 0 16px;
            text-align: left;
            text-indent: 1em;
            -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
            color: #666;

            &:not(.other) {
              width: 200px;
              height: 38px;
            }

            .ivu-radio {
              font-size: 16px;
              color: #666;
            }
          }

          input:focus {
            outline: none !important;
            border: 1px solid rgba(254, 134, 93, 0.6);
            box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06), 0 1px 10px 5px rgba(254, 134, 93, 0.14);
          }

          .ivu-select {
            width: 160px;
          }

          span {
            font-size: 1.4em;
            vertical-align: middle;
          }
          p{
            font-size: 1.4em;
            vertical-align: middle;
            margin-top:10px;
          }
          .ivu-radio-group {
            margin-left: 30px;
          }

          .radio-span {
            font-size: 1.2em;
            font-weight: 200;
            color: #696969;
          }

        }

        .bank-bar {
          .text {
            vertical-align: top;
            padding-top: 15px;
          }

          .ivu-radio-group {
            width: 70%;
            line-height: 40px;
            margin-left: 0;
          }

          .ivu-radio-wrapper {
            margin-right: 20px;
          }

          img {
            vertical-align: middle;
          }
        }
      }

      .submitPay {
        border-top: 1px solid #f3f3f3;
        width: 140px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        color: #fff;
        font-size: 1.8em;
        background: linear-gradient(180deg, #ff3492, #ff1e4f);
        border-radius: 10px;
        margin-top: 25px;
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
       .messageTip{
          width: 350px;
          font-size: 13px;
          margin: 10px 147px;
          color: #FF3333;
          }
        .message{
          width: 480px;
          position: absolute;
          left: 535px;
          bottom: -35px;
          font-size: 14px;
          p{
             margin-top: 10px;
          }
        }
      .qrcode {
        .bar {
          margin-top: 20px;

          .text {
            display: inline-block;
            width: 144px;
            text-align: right;
            font-size: 1.4em;
            vertical-align: middle;
            margin-right: 5px;
          }
        }

        .main {
          margin-left: 210px;
          font-size: 1.3em;
          margin-top: 30px;

          p {
            margin-bottom: 20px;
          }
        }

        #qrcode {
          width: 250px;
          height: 250px;
          // background: #000;
          display: inline-block;
          vertical-align: top;
        }
      }
    }

    .content2 {
      .erCode {
        width: 220px;
        height: 220px;
        border: 1px solid #eee;
        margin-top: 5px;
        margin-left: 134px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .cont2-Picker {
        /deep/ .ivu-select-dropdown {
          top: 307px !important;
          left: 298px !important;
        }
      }

      .content-main {
        .bar {
          padding-left: 135px;

          .tip {
            color: #ff8e00;
            font-size: 16px;
            width: 220px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #ff8e00;
            display: inline-block;
            border-radius: 2px;
            text-align: center;
          }

          // .text {
          //   width: 184px;
          //   text-indent: 10px;
          // }
          input {
            &:not(.other) {
              text-indent: 2px;
              padding-left: 8px;
              width: 220px;
            }
          }
        }
         // 新加的支付方式

        .submitPay {
          margin-left: 135px;
        }
      }
    }

    .toast {
      width: 210px;
      height: 30px;
      line-height: 30px;
      background: #ff9900;
      color: #fff;
      font-size: 14px;
      font-weight: 200;
      position: absolute;
      right: 490px;
      top: 340px;
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

  .no-pay-tongdao {
    img {
      display: block;
      margin: 200px auto;
    }
  }

  .ivu-radio-group {
    margin-left: 0;

    img {
      width: 106px;
      height: 20px;
    }
  }

  .oldmal{
     /deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
/deep/.ivu-modal-close {
  right: 0;
}
/deep/.ivu-modal-footer {
  border-top: none;
  display: none;
}
/deep/.ivu-modal {
  top: 50%;
  margin-top: -159px;
  height: 318px;
}
/deep/.ivu-modal-header {
  border-bottom: none;
  padding: 0;
}
/deep/ .ivu-modal-close .ivu-icon-ios-close-empty{
  display: none;
}

/deep/ .ivu-modal-body{
   padding: 0;
}

/deep/.ivu-modal-close{
    top:3px;
}
.headerp{
   text-align: center;
   margin-top:20px;
}
.tishi{
   height: 43px;
   line-height: 43px;
   font-size:18px;
   color:565656;
   background-color:#e5e5e5;
   border-radius:6px 6px 0 0;
   span{
     margin-left: 30px;
   }
}
.agent-con{
  position: relative;
  height: 157px;

}
.icon-baojing{
  font-size: 45px;
  color: #f90;
}
.iconspan{
   margin-left:82px;
   height: 45px;
   line-height: 45px;
   display: block;
   font-size: 16px;
   position: relative;
   margin-top: 40px;
   .tispan{
      margin-left:10px;
      position: absolute;
      font-size:26px;
      color:#1f1f1f;
   }
}
.pay{
  display: block;
  position: absolute;
  width: 160px;
  height: 35px;
   background: linear-gradient(180deg, #ff3492, #ff1e4f);
  text-align: center;
  line-height: 35px;
  color: #fff;
  font-size: 18px;
  left:130px;
  top:80px;
  border-radius: 10px;
}

.vp-admin-wrap-close {
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;
    &:hover {
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }
    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      -moz-transition: all 0.5s ease-in;
      -webkit-transition: all 0.5s ease-in;
      -o-transition: all 0.5s ease-in;
      transition: all 0.5s ease-in;
      a {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("/static/public/image/common/vp-common-close.png") #fff;
        background-size: 98% 98%;
        // transform: rotate(0deg);
      }
      &:hover {
        transform: translateX(40%);
        // &::before{
        //   color: #fff;
        // }
      }
    }
  }
  }
  .newmodal{
       /deep/ .ivu-modal-mask {
         z-index: 2000;
     }

  /deep/ .ivu-modal-wrap {
    z-index: 2000;
  }

  /deep/ .ivu-modal-close {
    right: 0;
  }

  /deep/ .ivu-modal-footer {
    border-top: none;
    padding: 0;
    text-align: left;
  }

  /deep/ .ivu-modal {
    top: 50%;
    margin-top: -159px;
    height: 318px;
  }

  /deep/ .ivu-modal-header {
    border-bottom: none;
    padding: 0;
  }

  /deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
    display: none;
  }

  /deep/ .ivu-modal-body {
    padding: 0;
  }

  /deep/ .ivu-modal-close {
    top: 3px;
  }
  .footer{
     height: 39px;
     background: #D93D32;
     border-radius: 0 0 6px 6px;
     display: flex;
     span{
        width: 172.5px;
        height: 39px;
        display: inline-block;
        color: #FFFFFF;
        font-size: 16px;
        line-height: 39px;
        text-align: center;
        cursor: pointer;
     }
     .span1{
        border-right:1px solid #e96057;
     }
  }
  .headerp {
    text-align: center;
    margin-top: 20px;
  }

  .tishi {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #403D58;
    border-radius: 6px 6px 0 0;
    border-bottom:1px solid #4B495C;
    span {
      margin-left: 110px;
      margin-top: 16px;
      font-size:18px;
    }
  }

  .agent-con {
    position: relative;
    background-color: #403D58;
    height: 135px;
    padding-top:17px;
    .showname{
       color: #D93D32;
    }
    .rename{
       margin-left: 27px;
       font-size: 14px;
       color: #fff;
    }
    input{
        width: 238px;
        height: 38px;
        margin-left:54px;
        margin-top: 21px;
        border: 1px solid #6E6C7C;
        border-radius:3px;
        color: #fff;
        text-indent: 5px;
    }
    #inputtext{
       background-color: #403D58;
    }
  }

  .icon-baojing {
    font-size: 45px;
    color: #f90;
  }

  .iconspan {
    margin-left: 82px;
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 16px;
    position: relative;
    margin-top: 40px;

    .tispan {
      margin-left: 10px;
      position: absolute;
      font-size: 26px;
      color: #1f1f1f;
    }
  }

  .pay {
    display: block;
    position: absolute;
    width: 160px;
    height: 35px;
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 18px;
    left: 130px;
    top: 80px;
    border-radius: 10px;
  }

  .vp-admin-wrap-close {
    display: none;
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;

    &:hover {
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }

    .vp-admin-wrap-close-empty {
      position: relative;
      background: #fff;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 56px;
      left: 2px;
      top: 2px;
      -moz-transition: all 0.5s ease-in;
      -webkit-transition: all 0.5s ease-in;
      -o-transition: all 0.5s ease-in;
      transition: all 0.5s ease-in;

      a {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("/static/public/image/common/vp-common-close.png") #fff;
        background-size: 98% 98%;
        // transform: rotate(0deg);
      }
    }
    }
  }
  // .warning-wrap {
  //   background-color: #fff;
  //   padding: 20px 30px 0 30px;
  //   .warning {
  //     height: 40px;
  //     line-height: 40px;
  //     color: #ff3333;
  //     background-color: #f9f9f9;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //     font-size: 1.4em;
  //     border: 1px solid #dbdbdb;
  //     border-radius: 5px;
  //     .icon {
  //       width: 17px;
  //       height: 17px;
  //       fill: #979797;
  //       overflow: hidden;
  //       margin-left: 12px;
  //       margin-right: 5px;
  //       vertical-align: middle;
  //     }
  //   }
  // }
</style>
