import vpBetting from '@/pages/public/tradition/components/betting/betting'
import vpFastAndSubmit from '@/pages/public/tradition/components/fast-and-submit/submit'
import vpDropDown from '@/pages/public/tradition/components/dropDown/dropDown'
import vpRanking from '@/pages/public/tradition/components/ranking/ranking3'
import vpHistory from '@/pages/public/tradition/components/history/history'
import store from '@/vuex/store'
import UserService from '@/service/public/UserService'

const mixin = {
  data: function () {
    return {
      totalCount: {
        number: 0,
        total: 0,
        db: 1, //倍数
        mol: '元', //状态
        ratio: 1 //分角倍率
      },
      saveSelectMoney: {
        money: ''
      },
      childNeedMess: {
        title: '北京赛车',
        issue: '',
        id: '',
        total: '44',
        plays: '传统玩法',
        code: '',
        series: ''
      },
      rebate: 0, //返利点
      modal: false,
      selectFast: {
        list: [{
            price: 5,
            active: false
          },
          {
            price: 10,
            active: false
          },
          {
            price: 50,
            active: false
          },
          {
            price: 100,
            active: false
          },
          {
            price: 500,
            active: false
          },
          {
            price: 1000,
            active: false
          }
        ],
        select: ''
      },
    }
  },
  methods: {
    resetAll() {
      this.seletPriceStaue = ''
      this.saveSelectMoney.money = ''
      this.selectFast.list.forEach((item, v) => {
        item.active = false
      })
      this.active = false;
      this.showData.length &&
        this.showData.forEach((lottery, index) => {
          lottery.playwayJson.length &&
            lottery.playwayJson.forEach(play => {
              play.active = false;
              play.colorActive = false;
            });
        });
      this.active = true;
      this.totalCount.number = 0
      this.totalCount.total = 0
    },
    fastInput() {
      this.calculationTotal()
    },
    rangeChange() {

    },
    calculationTotal() {
      let num = 0;
      this.totalCount.number = 1
      this.showData.length &&
        this.showData.forEach((data) => {
          data.playwayJson.length && data.playwayJson.forEach((lot) => {
            if (lot.colorActive) {
              num += 1
            }
          })
        })
      this.totalCount.number = num
      if (this.saveSelectMoney.money) this.totalCount.total = this.saveSelectMoney.money
      else this.totalCount.total = 0
    },
    publicReview(reviewArr) {
      if (reviewArr.length) {
        this.modal = true
      } else {
        this.$store.commit('alert/showTipModel', {
          bool: true,
          title: '请选择并输金额!',
          model: 'warn'
        })
        return false
      }
      let reviewArrNew = {
        active: false,
        ball: " ",
        code: " ",
        fixedOdds: '',
        fsrate: '',
        id: "",
        model: '',
        price: '',
        title: " ",
      }
      this.childNeedMess.title = reviewArr[0].lotteryName
      this.childNeedMess.issue = reviewArr[0].issue
      reviewArr[0].playwayJson.forEach(element => {
        if (element.colorActive) {
          reviewArrNew.ball = element.ball
          reviewArrNew.title = element.code
          reviewArrNew.code = element.playway
          reviewArrNew.fixedOdds = element.odds
          reviewArrNew.fsrate = 0
          reviewArrNew.model = this.saveSelectMoney.money
          reviewArrNew.price = element.odds
          reviewArrNew.id = reviewArr[0].lid
          reviewArrNew.longDragonType = element.code == reviewArr[0].playwayTitle ? 1 : 2,
            reviewArrNew.active = true
        }
      });
      this.$refs.betting.getList(
        [reviewArrNew],
        this.totalCount,
        this.childNeedMess
      )
    },
    submit() {
      let {
        showerr,
        showbalance
      } = this.$refs.betting
      if (this.$refs.betting.submitList.length == 0) {
        this.dNotify('请选择并输金额!', 'error')
        return false
      }
      let isLottery = this.$refs.betting.submitList.every(function (item) {
        return item.active == false
      })
      let isModel = this.$refs.betting.submitList.some(function (item) {
        if (item.active) {
          return +item.model < 1
        }
      })
      if (isLottery || isModel) {
        this.dNotify('请选择并输金额!', 'error')
        return false
      }
      if (!showerr) {
        if (showbalance) {
          this.dNotify('注单总额超出余额 请调整注单金额再下注', 'error')
          return false
        } else {
          let {
            lotteryBetMax,
            lotteryBetMin
          } = JSON.parse(localStorage.config).limit
          let message = "超出单注限额！单注最高:" + lotteryBetMax + "单注最低:" + lotteryBetMin
          this.dNotify(message, 'error')
          return false
        }
      }
      this.vpSubmit(this.$refs.betting.submitList)
    },
    async vpSubmit(submitData) {
      if (!localStorage.token) {
        // alert('您未登录')
        this.dNotify('您未登录', 'error')
        return false
      }
      if (!this.confirmbet) {
        this.dNotify('请勿重复投注', 'error')
        return false
      }
      let submitArr = []
      submitArr.push({
        'code': submitData[0].title,
        'playway': submitData[0].code,
        'odds': submitData[0].fixedOdds,
        'money': submitData[0].model,
        'ball': submitData[0].ball,
        'attach': ''
      })
      this.confirmbet = false
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/submit`, {
        lotteryId: submitData[0].id,
        issue: this.childNeedMess.issue,
        code: JSON.stringify(submitArr),
        rebate: this.rebate,
        longDragonType: submitData[0].longDragonType
      })
      if (res && res.code == 200) {
        this.confirmbet = true
        this.modal = false
        this.dNotify(res.data, 'success')
        setTimeout(() => {
          this.resetAll()
        }, 1000)
      } else {
        this.confirmbet = true
        this.dNotify(res.message, 'error')
      }
    }
  },
  components: {
    vpFastAndSubmit,
    vpBetting,
    vpDropDown,
    vpRanking,
    vpHistory
  },
  store
}
export default mixin
