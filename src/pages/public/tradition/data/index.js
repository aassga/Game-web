import vpActivity from '@/pages/public/tradition/components/activity/activity'
import vpTimer from '@/pages/public/tradition/components/timer/timer'
import vpNavigation from '@/pages/public/tradition/components/navigation/navigation'
import vpLotteryLogo from '@/pages/public/tradition/components/lottery-logo/lottery-logo'
import vpPrizeHeader from '@/pages/public/tradition/components/prize-header/prize-header'

import vpLotteryAnimate from '@/pages/public/tradition/animate'

import UserService from '@/service/public/UserService.js'
import store from '@/vuex/store'
let newtimer
const mixin = {
  data: function () {
    return {
      isLoading: false,
      ifshowLottery: false,
      LotteryAnimateStaue: false,
      isopen: true,
      destroyedStaue: true,
      activityText: '★元宵节大礼★“十五团团吃汤圆，元宵圆圆像银元”元宵节大礼包已陆续派送，请留意帐号余额变化',
      oddsListPar: {},
      timer: {
        timerModel: '',
        timeLeave: '',
        djs_next_kaipan: ''
      },
      openDatas: {},
      lastIssue: '',
      ifAnimateBt: true,
      ifAnimate: true,
      trueAward: [],
      savelotteryIndex: [],
      trendDatas: {},
      animateInter: null,
      isdNotify: true,
      lotteryOpenUpdateModel:JSON.parse(localStorage.getItem('config')).lotteryOpenUpdateModel
    }
  },
  methods: {
    LotteryAnimateFc(bool) {
      this.LotteryAnimateStaue = bool
    },
    // 玩法选择（快速玩法）
    playsChoose(datas) {
      this.childNeedMess.plays = datas
    },
    // 配置参数
    param() {
      let param = this.$store.state.lottery.childNeedMess
      this.childNeedMess.code = param.code
      this.childNeedMess.id = param.id
      this.childNeedMess.series = param.series
      this.childNeedMess.title = param.title
    },
    // 时间到子组件触发
    timeout(datas) {
      this.getOpenDatas()
    },
    // 获取统计记录
    async getTrend() {
      let idArr = this.$route.fullPath.split('/')
      let lotteryId = idArr.filter(item => Number.isInteger(item * 1) && item !== '')[0] * 1
      let res = await this.$http.post(`${this.$HOST_NAME}/lottery/resultsnew`, {
        lotteryId: lotteryId,
      })
      if (res && res.code === 200) {
        if (this.$route.meta.series === 'lhc') {
          return false
        }
        this.trendDatas = res;
        this.tsferTrend()
      } else {
      }
    },
    //传递统计记录
    tsferTrend(type) {
      const data = this.trendDatas.data[this.$route.meta.code]['list']
      if (type) {
        setTimeout(() => {
          this.$refs.content.$refs.vpRanking.getTrend(this.trendDatas.data[this.$route.meta.code]['double:'])
          this.$refs.content.$refs.vpHistory.getData(this.trendDatas.data[this.$route.meta.code]['list'])
        }, 500)
      } else {
        this.$nextTick(() => {
          this.$refs.content.$refs.vpRanking.getTrend(this.trendDatas.data[this.$route.meta.code]['double:'])
          this.$refs.content.$refs.vpHistory.getData(this.trendDatas.data[this.$route.meta.code]['list'])
        })
      }
    },
    // 获取向下传赔率
    async getOdds() {
      let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getOdds/${this.$route.meta.id}`, {})
      if (res && res.code === 200) {
        this.oddsListPar = res.data;
      } else {
      }
    },
    //soket接收信息
    websoc() {
      if (this.websocketdata.type === 'user.lotteryOpen') {
        this.websocketdata.data.forEach((item, index) => {
          if (item.lotteryId === this.$route.meta.id) {
            this.ifAnimateBt = true //正在开奖显示结束
            clearInterval(this.animateInter)
            if([2,3,12,13,3630,10044,10045].includes(this.$route.meta.id)){
              setTimeout(()=>{
                this.open=true
                this.animationStatus = 'num-animation'
                setTimeout(() => {
                  this.open = false
                }, 400)
                setTimeout(()=>{
                  this.animationStatus = 'num-animation'
                  this.activeArr = []
                  this.trueAward = item.lastresultInfo ? item.lastresultInfo.split(',') : []
                  this.trueAward.forEach((item, _v) => {
                     this.lotteryDatasShow[_v] = +item
                    })
                  this.lastArr=this.numArr
                  this.numArr=this.lotteryDatasShow
                  this.savelotteryIndex = item.lastluzhu ? item.lastluzhu.split(',') : []
                  this.lastIssue = item.lastissue //替换显示期号
                  this.$refs.timer.playMusicReset() //播放音乐
                  this.getTrend() //获取走势数据
                },300)
              },2000)
            }else{
              this.trueAward = item.lastresultInfo ? item.lastresultInfo.split(',') : []
              this.trueAward.forEach((item, _v) => {
                this.lotteryDatasShow[_v] = +item
              })
              this.savelotteryIndex = item.lastluzhu ? item.lastluzhu.split(',') : []
              this.lastIssue = item.lastissue //替换显示期号
              this.$refs.timer.playMusicReset() //播放音乐
              this.getTrend() //获取走势数据
            }
          }
        })
      }
    },
    lotteryAnimateStart() {
      clearInterval(this.animateInter)
      if([2,3,12,13,3630,10044,10045].includes(this.$route.meta.id)){
        this.animationTask()
        this.animateInter = setInterval(() => {
          this.animationTask()
        }, 2000)
      }else{
        this.animateInter = setInterval(() => {
          let length = this.lotteryDatasSave.length
          while (length) {
            let j = Math.floor(Math.random() * length--);
            [this.lotteryDatasSave[j], this.lotteryDatasSave[length]] = [this.lotteryDatasSave[length], this.lotteryDatasSave[j]]
          }
          this.lotteryDatasShow = []
          for (let index = 0; index < this.lotteryDatasShowLength; index++) {
            this.lotteryDatasShow.push(this.lotteryDatasSave[index])
          }
        }, 80)
      }
    },
    // 获取要开奖的时间等信息
    async getOpenDatas() {
      let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getIssue/${this.$route.meta.id}`, {})
      if (res && res.code === 200) {
        this.$Loading.finish()
        this.isLoading = false
        this.openDatas = res.data
        // if(this.$route.meta.id=='3630'||this.$route.meta.id=='13'||this.$route.meta.id=='12'){
        //     let {lasthistoryissue,lasthistorylotteryname,lasthistorypentime}=res.data
        //     this.lasthistorylotteryname=lasthistorylotteryname
        //     this.lasthistoryissue=lasthistoryissue
        //     this.lasthistorypentime=this.getTimesYMD(lasthistorypentime*1000)
        // }
        // 下注期数传
        this.childNeedMess.issue = res.data.issue
        this.$store.commit('mainState/lotteryiuss', res.data.issue)
        // 时间传
        this.timer.timeLeave = res.data.djs_fengpan
        this.timer.djs_next_kaipan = res.data.djs_next_kaipan
        this.timer.lotteryName = res.data.lotteryName
        // 向下传信息
        this.$nextTick(() => {
          this.$refs.timer.getTime(this.timer)
        })
        // 锁定封关盘
        if (this.ifAnimate) {
          this.trueAward = res.data.lastresultInfo ? res.data.lastresultInfo.split(',') : []
          this.savelotteryIndex = res.data.lastluzhu ? res.data.lastluzhu.split(',') : []
          //最后开奖期数
          this.lastIssue = res.data.lastissue
          this.trueAward.forEach((item, _v) => {
            this.lotteryDatasSave[_v] = +item
            this.lotteryDatasShow[_v] = +item
          })
          if([2,3,12,13,3630,10044,10045].includes(this.$route.meta.id)){
             this.numArr=this.lotteryDatasShow
          }
          if (
            this.childNeedMess.series === 'pcdd' ||
            this.childNeedMess.series === 'k3'
          ) {
            this.lastBallTotal = this.savelotteryIndex[0]
          }
        }
        if (res.data.djs_next_kaipan) {
          clearInterval(newtimer)
          // 是否显示开奖动画
          this.ifAnimateBt = false
          //调用动画
          this.lotteryAnimateStart()
          if([2,3,12,13,3630,10044,10045].includes(this.$route.meta.id)){
              this.isAimate=true
          }
          this.isopen = false
          if (this.fengpanStaue) {
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: '已封盘，请等待下一期开盘',
              model: 'warn'
            })
          }
          // 只封一次
          this.fengpanStaue = false
        } else {
          this.isopen = true;
          // 封盘后的倒计时（时时彩，13s，触发）
          this.$store.commit('alert/showTipModel', {
            bool: false,
            model: 'warn'
          });
          if(this.lotteryOpenUpdateModel=="http"){
            let iussueCount=Number(res.data.issue)-Number(res.data.lastissue)
            if(iussueCount==1){
              clearInterval(newtimer)
              clearInterval(this.animateInter)
              this.ifAnimateBt = true
              if([2,3,12,13,3630,10044,10045].includes(this.$route.meta.id)){//pk10赛车的开奖动画
                 setTimeout(()=>{
                    if(this.isAimate){
                      this.open=true
                      this.animationStatus = 'num-animation'
                      setTimeout(() => {
                        this.open = false
                      }, 400)
                    }
                    setTimeout(()=>{
                      this.animationStatus = 'num-animation'
                      this.activeArr = []
                      this.trueAward = res.data.lastresultInfo ? res.data.lastresultInfo.split(',') : []
                      this.trueAward.forEach((item, _v) => {
                      this.lotteryDatasShow[_v] = +item
                      })
                      this.lastArr=this.numArr
                      this.numArr=this.lotteryDatasShow
                      this.savelotteryIndex = res.data.lastluzhu ? res.data.lastluzhu.split(',') : []
                      this.lastIssue = res.data.lastissue //替换显示期号
                      this.$refs.timer.playMusicReset() //播放音乐
                      this.getTrend() //获取走势数据
                    },300)
                    this.isAimate=false
                 },2000)
              }else{
                this.trueAward = res.data.lastresultInfo ? res.data.lastresultInfo.split(',') : []
                this.trueAward.forEach((item, _v) => {
                  this.lotteryDatasShow[_v] = +item
                })
                this.savelotteryIndex = res.data.lastluzhu ? res.data.lastluzhu.split(',') : []
                this.lastIssue = res.data.lastissue //替换显示期号
                this.$refs.timer.playMusicReset() //播放音乐
                this.getTrend() //获取走势数据
              }
            }else{
              if(iussueCount>1&&iussueCount<=10){
                clearInterval(newtimer)
                newtimer=setInterval(this.getOpenDatas,5000)
              }else{
                setTimeout(() => {
                   this.getOpenDatas();
                }, 5000)
              }
            }
          }
        }
        this.ifshowLottery = true
        this.ifAnimate = false

      } else {
        if (!this.isdNotify) {
          this.dNotify("网络异常", "error")
        }
        this.isdNotify = true;
        setTimeout(() => {
          this.getOpenDatas();
        }, 5000)
      }
    }
  },
  created: function () {
    if (this.sideReady) {
      this.param()
      this.getOpenDatas()
      this.getOdds()
      this.getTrend()
      if (this.getAnimal) this.getAnimal()
    }
    this.$Loading.start()
    UserService.vpGetBasWebsoc.call(this)
  },
  computed: {
    sideReady() {
      return this.$store.state.lottery.sideReady
    },
    websocketdata() {
      return this.$store.state.mainState.websoc
    }
  },
  beforeDestroy() {
    this.destroyedStaue = false
    this.isdNotify=false
    clearInterval(this.animateInter)
    clearInterval(newtimer)
  },
  watch: {
    sideReady() {
      this.param()
      this.getOpenDatas()
      this.getOdds()
      this.getTrend()
      if (this.getAnimal) this.getAnimal()
    },
    websocketdata(){
        if(this.lotteryOpenUpdateModel=="websocket"){
          this.websoc()
        }
    }
  },
  components: {
    vpActivity,
    vpTimer,
    vpNavigation,
    vpLotteryLogo,
    vpPrizeHeader,
    vpLotteryAnimate
  },
  store
}

export default mixin
