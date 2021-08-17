import LotterySev from '@/pages/public/tradition/data/LotterySev.js'

const mixin = {
  data: function () {
    return {}
  },
  methods: {
    //选择位置球 position
    choosePosit (itemInner) {
      if (!this.isopen) return false
      this.submitDatas.list1 = []
      itemInner.active = !itemInner.active
      this.listPosit.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          if (inItem.active) {
            this.submitDatas.list1.push(inItem)
          }
        })
      })
      this.calculationTotal()
    },
    //选择数字number
    chooseNumber (itemInner) {
      if (!this.isopen) return false
      this.submitDatas.list2 = []
      itemInner.active = !itemInner.active
      this.listNumber.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          if (inItem.active) {
            this.submitDatas.list2.push(inItem)
          }
        })
      })
      this.calculationTotal()
    },
    //选择玩法Style
    chooseStyle (itemInner) {
      if (!this.isopen) return false
      this.submitDatas.list3 = []
      itemInner.active = !itemInner.active
      this.listStyle.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          if (inItem.active) {
            this.submitDatas.list3.push(inItem)
          }
        })
      })
      this.calculationTotal()
    },
    //计算全部金额
    calculationTotal () {
      // 计算总数
      let number = 0
      let total = 0
      let dragonNum = 0 //龙虎长度
      let doubleNum = 0 //非龙虎长度
      let positNum = 0 //小于6的选位长度
      let testDragon = false
      let list1=[]
      let list2=[]
      let list3=[]
      if(this.submitDatas.list1.length>0){
         list1= this.submitDatas.list1.filter(function(item){
          return item.active==true
        })
      }
      if(this.submitDatas.list2.length>0){
        list2= this.submitDatas.list2.filter(function(item){
          return item.active==true
       })
      }
     if(this.submitDatas.list3.length>0){
       list3= this.submitDatas.list3.filter(function(item){
          return item.active==true
     })
     }
      this.listStyle.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          if (
            (inItem.active && inItem.ball == '龙') ||
            (inItem.active && inItem.ball == '虎')
          ) {
            testDragon = true
          }
        })
      })
      if (
        (this.submitDatas.list1.length &&
          this.submitDatas.list2.length &&
          !testDragon) ||
        (this.submitDatas.list1.length &&
          this.submitDatas.list3.length &&
          !testDragon)
      ) {        
        number =
             list1.length *
          (list2.length + list3.length)
        if (this.saveSelectMoney.money) {
          total = number * +this.saveSelectMoney.money
        }
         
      } else if (
        (this.submitDatas.list1.length &&
          this.submitDatas.list2.length &&
          testDragon) ||
        (this.submitDatas.list1.length &&
          this.submitDatas.list3.length &&
          testDragon)
      ) {
        // 选龙
        this.listStyle.forEach((outItem, v) => {
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            if (
              (inItem.active && inItem.ball == '龙') ||
              (inItem.active && inItem.ball == '虎')
            ) {
              dragonNum++
            } else if (
              (inItem.active && inItem.ball != '龙') ||
              (inItem.active && inItem.ball != '虎')
            ) {
              doubleNum++
            }
          })
        })
        this.listPosit.forEach((outItem, v) => {
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            if (
              (inItem.active)
            ) {
              positNum++
            }
          })
        })
        number =
           list1.length * list2.length +
           list1.length * doubleNum +
          dragonNum * positNum
        total = number * this.saveSelectMoney.money
      }
      this.totalCount.number = number
      if (this.totalCount.mol == '元') {
        this.totalCount.total =
          total * +this.totalCount.ratio * +this.totalCount.db
      } else if (this.totalCount.mol == '角') {
        this.totalCount.total = (total *
          +this.totalCount.ratio *
          +this.totalCount.db
        ).toFixed(1)
      } else if (this.totalCount.mol == '分') {
        this.totalCount.total = (total *
          +this.totalCount.ratio *
          +this.totalCount.db
        ).toFixed(2)
      }
    },
    // 重置所有信息
    resetAll () {
      this.listPosit.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          inItem.active = false
          inItem.model = ''
        })
      })
      this.listNumber.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          inItem.active = false
          inItem.model = ''
        })
      })
      this.listStyle.forEach((outItem, v) => {
        outItem.mess &&
        outItem.mess.forEach((inItem, v) => {
          inItem.active = false
          inItem.model = ''
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
      this.submitDatas.submitList = []
      this.submitDatas.list1 = []
      this.submitDatas.list2 = []
      this.submitDatas.list3 = []
    },
    // 该变赔率和返水
    // rangeChange(num) {
    //   debugger
    //   this.rebate = num;
    // },
    // 提交前检查，展示
    review () {
        let list1status=this.submitDatas.list1.some((item)=>{
              return item.active==true
        }) 
      if (!this.submitDatas.list1.length) {
        this.dNotify('快捷必须选择位置', 'error')
        return false
      }
      if(!list1status){
        this.dNotify('快捷必须选择位置', 'error')
        return false
      }
      if (!this.isopen) return false
      this.submitDatas.submitList = []
      if (
        (this.submitDatas.list1.length && this.submitDatas.list2.length) ||
        (this.submitDatas.list1.length && this.submitDatas.list3.length)
      ) {
        this.submitDatas.list1.forEach((postItem, v) => {
          this.submitDatas.list2.length &&
          this.submitDatas.list2.forEach((numberItem, v) => {
            if(postItem.active&& numberItem.active){
              this.submitDatas.submitList.push({
                code: '',
                title: postItem.title,
                ball: numberItem.ball,
                id: '',
                model: this.saveSelectMoney.money,
                price: numberItem.price,
                active: false,
                ballid: postItem.ballid ? postItem.ballid:'',
                codeid: numberItem.codeid ? numberItem.codeid:'',
              })
            }
          })
        })
        this.submitDatas.list1.forEach((postItem, v) => {
          this.submitDatas.list3.length &&
          this.submitDatas.list3.forEach((numberItem, v) => {
            if(postItem.active && numberItem.active){
              this.submitDatas.submitList.push({
                code: '',
                title: postItem.title,
                ball: numberItem.ball,
                id: '',
                model: this.saveSelectMoney.money,
                price: numberItem.price,
                active: false,
                ballid: postItem.ballid ? postItem.ballid:'',
                codeid: numberItem.codeid ? numberItem.codeid:'',
              })
            }
          })
        })
      }

      if (this.submitDatas.submitList.length && this.saveSelectMoney.money) {
        this.modal = true
      } else {
        this.$store.commit('alert/showTipModel', {
          bool: true,
          title: '请选择并输金额!',
          model: 'warn'
        })
        return false
      }
      this.submitDatas.submitList.sort(function(a,b){
            return a.ballid-b.ballid
      });
      this.submitDatas.submitList.sort(function(a,b){
           if(a.title==b.title){
                return a.codeid-b.codeid
           }
        });
      this.$refs.betting.getList(
        this.submitDatas.submitList,
        this.totalCount,
        this.childNeedMess
      )
    },
    //正式提交
    async submit () {
      let submitArr = []
      // let total = [];
      const titles = [
        {title: '冠军', alias: '1V10'},
        {title: '亚军', alias: '2V9'},
        {title: '第三名', alias: '3V8'},
        {title: '第四名', alias: '4V7'},
        {title: '第五名', alias: '5V6'},
        {title: '第六名', alias: '5V6'},
        {title: '第七名', alias: '4V7'},
        {title: '第八名', alias: '3V8'},
        {title: '第九名', alias: '2V9'},
        {title: '第十名', alias: '1V10'},
      ]   
      this.submitDatas.list1.length &&
      this.submitDatas.list1.forEach((postItem, v) => {
        // total.push(postItem.title);
        this.submitDatas.list2.forEach((numberItem, v) => {
          submitArr.push({
            code: numberItem.ball,
            playway: numberItem.code,
            odds: numberItem.fixedOdds,
            money: this.saveSelectMoney.money,
            ball: postItem.title,
            attach: ''
          })
        })
        this.submitDatas.list3.forEach((numberItem, v) => {
           submitArr.push({
                code: numberItem.ball,
                playway: numberItem.code,
                odds: numberItem.fixedOdds,
                money: this.saveSelectMoney.money,
                ball: postItem.title,
                attach: ''
              })
        })
      })
      let newsubmitArr=[]
      this.$refs.betting.submitList.forEach((item)=>{
          submitArr.forEach((newitem,index)=>{
               if(item.ball==newitem.code && item.title==newitem.ball && item.price==newitem.odds){
                   newsubmitArr.push(newitem)
               }
          })
      })
      this.$refs.betting.submitList.forEach((item)=>{
         newsubmitArr.forEach((newitem,index)=>{
            if(item.ball==newitem.code && item.title==newitem.ball && item.price==newitem.odds){
              newitem.money=item.model
              if(!item.active){
                newsubmitArr.splice(index,1)
              }      
            }
          })
      })
      newsubmitArr.forEach((item)=>{
           if(item.code=="龙"||item.code=='虎'){
               let retitle = titles.filter(t => t.title == item.ball)[0]
               item.ball=retitle.alias
           }
      })
      LotterySev.vpSubmit.call(this, newsubmitArr)  
    },
    changInputstatus(betsubmitList){
        let titlelist=[]
        let titlestatus=[]
        let balllist=[]
        let ballstatus=[]
        let obj={}
        betsubmitList.length &&
        betsubmitList.forEach((betItem)=>{
           let titleObj={
              title:betItem.title,
              status:false,
              list:[]
           }
           let ballObj={
               ball:betItem.ball,
               status:false,
               list:[]
           }
           titlelist.push(titleObj)
           balllist.push(ballObj)
        })
        titlestatus=titlelist.reduce((cur,next)=>{
             obj[next.title] ? "":obj[next.title]=true&&cur.push(next)
             return cur
        },[])
        ballstatus=balllist.reduce((cur,next)=>{
          obj[next.ball] ? "":obj[next.ball]=true&&cur.push(next)
          return cur
        },[])

        titlestatus.length&&
        titlestatus.forEach((titItem)=>{
            betsubmitList.forEach((subItem)=>{
                   if(titItem.title==subItem.title){
                        titItem.list.push(subItem)
                   }
            })
        })

        ballstatus.length&&
        ballstatus.forEach((ballItem)=>{
             betsubmitList.forEach((subItem)=>{
                  if(ballItem.ball==subItem.ball){
                       ballItem.list.push(subItem)
                  }
             })
        })

        titlestatus.length &&
        titlestatus.forEach((titItem)=>{
              titItem.status =titItem.list.every(function(item){
                    return item.active==false
           })
        })

        ballstatus.length &&
        ballstatus.forEach((titItem)=>{
              titItem.status =titItem.list.every(function(item){
                    return item.active==false
           })
        })
        titlestatus.length &&
        titlestatus.forEach((titItem)=>{
          this.submitDatas.list1.forEach((subtitle)=>{
                if(titItem.title==subtitle.title){
                        subtitle.active = !titItem.status
                }
          })
        })
        ballstatus.length &&
        ballstatus.forEach((ballItem)=>{
           this.submitDatas.list2.forEach((subball)=>{
                 if(ballItem.ball==subball.ball){
                     subball.active =!ballItem.status
                 }

           })
           this.submitDatas.list3.forEach((subball)=>{
            if(ballItem.ball==subball.ball){
                 subball.active =!ballItem.status
            }
          })

        })
    },
  },
  watch: {
  },
}

export default mixin


