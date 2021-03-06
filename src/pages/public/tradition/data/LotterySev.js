import UserService from '@/service/public/UserService.js'

function LotterySev () {
  //子页面分割线 ——————————————————————————————————————————————————————————————————————————————————————————
  //提交注单
  this.vpSubmit = async function (submitArr) {
    let {showerr,showbalance}=this.$refs.betting
    if (!localStorage.token) {
      this.$store.commit('alert/showLogin', true)
      return false
    }
    if(this.$refs.betting.submitList.length==0){
      this.dNotify('请选择并输金额!', 'error')
      return false
   }
   let isLottery=this.$refs.betting.submitList.every(function(item){
        return item.active==false
   })
   let isModel = this.$refs.betting.submitList.some(function(item){
          if(item.active){
            return  +item.model<1
        }
   })
   if(isLottery ||isModel){
       this.dNotify('请选择并输金额!', 'error')
       return false
   }
   if(!showerr){
    if(showbalance){
        this.dNotify('注单总额超出余额 请调整注单金额再下注', 'error')
        return false
    }else{
        let {lotteryBetMax,lotteryBetMin}=JSON.parse(localStorage.config).limit
        let message="超出单注限额！单注最高:"+lotteryBetMax +"单注最低:"+lotteryBetMin
        this.dNotify(message, 'error')
        return false
    }
  }
    if(!this.confirmbet){
     this.dNotify('请勿重复投注', 'error')
     return false
    }
    this.confirmbet=false
    let totalCount = JSON.parse(localStorage.totalCount)
    if (totalCount.mol == '角') {
      submitArr[0].money = String(submitArr[0].money / 10)
    } else if (totalCount.mol == '分') {
      submitArr[0].money = String(submitArr[0].money / 100)
    }
    submitArr[0].money = submitArr[0].money * totalCount.db

    let res = await Post.call(this, `${this.$HOST_NAME}/lottery/submit`, {
      lotteryId: this.$route.meta.id,
      issue: this.childNeedMess.issue,
      code: JSON.stringify(submitArr),
      rebate: this.rebate
    })
    if (res && res.code == 200) {
      this.modal=false
      this.confirmbet=true
      this.dNotify(res.data, 'success')
      setTimeout(() => {
        this.resetAll()
      },1000)
      UserService.vpGetBasicInfo.call(this)
    } else {
      this.confirmbet=true
      this.dNotify(res.message, 'error')
    }
  }

  //网络请求Post
  function Post (url, data) {
    return this.$http.post('' + url, data)
  }

  //网络请求Get
  function Get (url, data) {
    return this.$http.get('' + url, data)
  }
}

export default new LotterySev
