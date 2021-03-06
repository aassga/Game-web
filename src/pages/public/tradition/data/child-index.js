import vpBetting from '@/pages/public/tradition/components/betting/betting'
import vpFastAndSubmit from '@/pages/public/tradition/components/fast-and-submit/submit'
import vpDropDown from '@/pages/public/tradition/components/dropDown/dropDown'
import vpRanking from '@/pages/public/tradition/components/ranking/ranking3'
import vpHistory from '@/pages/public/tradition/components/history/history'
import store from '@/vuex/store'
import UserService from '@/service/public/UserService'

const mixin = {
  props: {
    childNeedMess: {
      type: Object
    },
    isopen: {
      type: Boolean
    },
    oddsListPar: {
      type: Object
    }
  },
  data: function () {
    return {
      maxlength: JSON.parse(localStorage.config).limit.lotteryBetMax.toString().length,
      luZhuStaueCode: '',
      luZhuDatas: '',
      modal: false,
      rangeVal: 25,
      visible: false,
      rebate: 0, //返利点
      oddsList: '',
      seletPriceStaue: '',
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
      submitList: [],
      // 组合
      submitDatas: {
        submitList: [],
        list1: [],
        list2: [],
        list3: []
      },
      active: {
        moneyStaue: '5',
        ballHistory: '大小'
      },
      selectDown: {
        list: [{
          price: 10
        }, {
          price: 50
        }, {
          price: 100
        }, {
          price: 500
        }, {
          price: 1000
        }, {
          price: 10000
        }],
        select: ''
      },
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
    //选择价格框消失
    hidePrice() {
      this.seletPriceStaue = ''
    },
    //快速替换填金额
    fastInput(type) {
      if (!this.isopen) return false
      if (!type) {
        this.allData.forEach((outItem) => {
          outItem.list.forEach((intItem) => {
            intItem.mess.forEach((thirItem) => {
              if (thirItem.active) {
                thirItem.model = this.saveSelectMoney.money
              }
            })
          })
        })
      }
      this.calculationTotal()
    },
    //计算全部金额
    calculationTotal() {
      // 计算总数
      let number = 0
      let total = 0
      this.allData.forEach((outItem) => {
        outItem.list.forEach((intItem) => {
          intItem.mess.forEach((thirItem) => {
            if (thirItem.active) {
              number += 1
              total += +thirItem.model
            }
          })
        })
      })
      this.totalCount.number = number
      this.totalCount.total = total
      if (this.childNeedMess.series === 'lhc') {
        return false
      }
      if (this.totalCount.mol === '元') {
        this.totalCount.total =
          total * +this.totalCount.ratio * +this.totalCount.db
      } else if (this.totalCount.mol === '角') {
        this.totalCount.total = (total *
          +this.totalCount.ratio *
          +this.totalCount.db
        ).toFixed(1)
      } else if (this.totalCount.mol === '分') {
        this.totalCount.total = (total *
          +this.totalCount.ratio *
          +this.totalCount.db
        ).toFixed(2)
      }
    },
    // 该变赔率和返水
    rangeChange(num) {
      // debugger
      this.rebate = num
      this.allData.forEach((outItem) => {
        outItem.list.forEach((intItem) => {
          intItem.mess.forEach((thirItem) => {
            let newPrice = (thirItem.fixedOdds * (1 - num / 100)).toString()
            newPrice = newPrice.substring(0, newPrice.lastIndexOf('.') + 4)
            if (newPrice.toString().includes('.') &&
              +newPrice.toString().substring(newPrice.toString().length - 2) === 0) {
              thirItem.price = newPrice.toString().substring(0, newPrice.toString().length - 2)
            } else if (
              newPrice.toString().includes('.') &&
              +newPrice.toString().substring(newPrice.toString().length - 1) === 0) {
              thirItem.price = newPrice.toString().substring(0, newPrice.toString().length - 1)
            } else {
              thirItem.price = newPrice
            }
          })
        })
      })
    },
    //获取赔率信息
    async getOdds() {
      if (!this.oddsList) {
        this.oddsList = this.oddsListPar;
        this.oddsBelong()
      } else {
        this.oddsBelong()
      }
    },
    //公共还原
    resetAll() {
      this.allData.forEach((outItem) => {
        outItem.list.forEach((intItem) => {
          intItem.mess && intItem.mess.forEach((thirItem) => {
            thirItem.active = false
            thirItem.model = ''
          })
        })
      })
      //清空提交
      this.submitList = []
      this.seletPriceStaue = ''
      this.saveSelectMoney.money = '' //清空输入钱
      this.selectFast.list.forEach((item, v) => {
        item.active = false
      })
      this.totalCount.number = 0
      this.totalCount.total = 0
      if (this.listRigTemaAnima) {
        this.listRigTemaAnima.forEach((item) => {
          item.active = false
        })
      }
    },
    // 封盘
    disabled(type) {
      this.$nextTick(() => {
        for (let i = 0; 0 < this.$refs.formDynamic.length; i++) {
          if (i == this.$refs.formDynamic.length - 1) return false
          this.$refs.formDynamic[i].setAttribute('disabled', true)
          this.$refs.formDynamic[i].style.cursor = 'not-allowed'
        }
      })
      this.modal = false
      this.resetAll()
      if (!type) {
        this.dNotify('已封盘', 'warn')
      }
    },
    // 开盘
    abled() {
      this.$nextTick(() => {
        for (let i = 0; 0 < this.$refs.formDynamic.length; i++) {
          if (i == this.$refs.formDynamic.length - 1) return false
          this.$refs.formDynamic[i].removeAttribute('disabled', false)
          this.$refs.formDynamic[i].style.cursor = 'text'
        }
      })
    },
    //选择下拉框下注金额
    seletPrice(itemInner, itemSelet) {
      itemInner.model = itemSelet.price
      this.seletPriceStaue = ''
      this.calculationTotal()
    },
    //点击给投注项加样式
    clickFocus(itemInner) {
      if (!this.isopen) return false
      itemInner.active = !itemInner.active
      itemInner.model = ''
      this.seletPriceStaue = ''
      if (this.saveSelectMoney.money && itemInner.active) {
        itemInner.model = this.saveSelectMoney.money
      }
      this.calculationTotal()
    },
    //键盘按起
    keyupInput(itemInner) {
      // 键盘起来时
      if (!itemInner.model) {
        this.seletPriceStaue = itemInner.id
      }
      if (this.dInvalidMoneynew(itemInner.model)) {
        this.calculationTotal()
      } else {
        itemInner.model = ''
        this.calculationTotal()
      }
    },
    //键盘按下输入时价格框消失
    keydownInput(itemInner) {
      this.seletPriceStaue = ''
    },
    //获取焦点时给投注项加样式
    focusInput(itemInner) {
      itemInner.active = true
      this.seletPriceStaue = itemInner.id
      this.calculationTotal()
    },
    //选择历史球记录
    chooseHistory(datas) {
      this.active.ballHistory = datas
    },
    //发送走势数据
    // getTrend(trend) {
    //   if(this.$route.meta.series=='lhc'){
    //     return false;
    //   }
    //   this.$nextTick(() => {
    //     this.$refs['vpHistory'].getData(trend.list);
    //   })
    // },
    //公共预览
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
      this.$refs.betting.getList(
        reviewArr,
        this.totalCount,
        this.childNeedMess
      )
    },


    //正式提交
    submit(type) {
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
      this.submitList = []
      this.allData.forEach((outItem) => {
        outItem.list.forEach((intItem) => {
          intItem.mess.forEach((thirItem) => {
            if (thirItem.active && thirItem.model) {
              this.submitList.push(thirItem)
            }
          })
        })
      })
      let submitArr = []
      let submitListNew = []
      this.submitList.forEach((item, index) => {
        this.$refs.betting.submitList.forEach((newitem) => {
          if (item.ball == newitem.ball && item.title == newitem.title && item.price == newitem.price) {
            if (newitem.active) {
              item.model = newitem.model
              item.money = newitem.model
              submitListNew.push(item)
            }
          }
        })
      })
      submitListNew.forEach((item) => {
        // let finalModel
        // if (this.$route.meta.series == 'lhc') {
        //   finalModel = item.model
        // } else {
        //   finalModel = ((+item.model) * (+this.totalCount.ratio) * (+this.totalCount.db)).toFixed(2)
        // }
        let newcode = item.ball
        let newtitle = item.title
        if (item.id.includes('A-冠亚')) {
          newcode = item.ball.substr(2, 1)
        }
        if (item.id.includes('B-龙') || item.id.includes('B-虎')) {
          newtitle = item.title.split("龙虎")[0].replace(/^\s+|\s+$/g, "")
        }
        if (item.id.includes('C-亚军')) {
          newtitle = '2V9'
        }
        if (item.id.includes('C-冠军')) {
          newtitle = '1V10'
        }
        if (item.id.includes('D-点数')) {
          newcode = item.ball.split('点')[0]
        }
        if (item.id.includes('E-总和') || item.id.includes('F-总和')) {
          newcode = item.ball.split('总和')[1]
        }
        if (item.id.includes('G-冠亚')) {
          newcode = item.ball.split('冠亚')[1]
        }
        if (type && type.code === 'dpc-zsp') {
          submitArr.push({
            'code': item.title,
            'playway': item.code,
            'odds': item.fixedOdds,
            'money': item.money,
            'ball': item.ball,
            'attach': ''
          })
        } else {
          submitArr.push({
            'code': newcode,
            'playway': item.code,
            'odds': item.fixedOdds,
            'money': item.money,
            'ball': newtitle,
            'attach': ''
          })
        }

      })
      this.vpSubmit(submitArr)
    },
    //提交注单
    async vpSubmit(submitArr) {
      if (!localStorage.token) {
        // alert('您未登录')
        this.dNotify('您未登录', 'error')
        return false
      }
      if(!this.confirmbet){
        this.dNotify('请勿重复投注', 'error')
        return false
      }
      this.confirmbet=false
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/submit`, {
        lotteryId: this.$route.meta.id,
        issue: this.childNeedMess.issue,
        code: JSON.stringify(submitArr),
        rebate: this.rebate
      })
      if (res && res.code == 200) {
        this.confirmbet=true
        this.modal = false
        this.dNotify(res.data, 'success')
        setTimeout(() => {
          this.resetAll()
        },1000)
        this.$store.commit("lottery/fetchBetRecord", Date.now());
        UserService.vpGetBasicInfo.call(this)
      } else {
        this.confirmbet=true
        this.dNotify(res.message, 'error')
      }
    },
    //获取露珠走势
  },
  created: function () {
    if (this.isopen) {
      this.abled()
    } else {
      this.disabled('1')
    }
    if (JSON.stringify(this.oddsListPar) != '{}') {
      this.getOdds()
    }
  },
  // 听封盘
  watch: {
    isopen(isopen) {
      if (isopen) {
        this.abled()
      } else {
        this.disabled()
      }
    },
    oddsListPar: {
      handler: function (val, oldVal) {
        this.getOdds()
      },
      deep: true
    },
    modal(newval, oldval) {
      if (newval == false && oldval == true) {
        this.calculationTotal()
      }
    }
  },
  //销毁之前
  beforeDestroy() {
    this.resetAll()
  },
  // 组件
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
