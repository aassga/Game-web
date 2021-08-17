<template>
  <div class="new-index klk-home">
    <div class="content_bg">
      <div class="content content-main-bg" :class="{night:colorbool}">
          <div class="wp">
          <div class="game-lists-container">
            <ul>
              <li class="t-default slideLeft">
                <div class="rtop">
                  <p>真人视讯</p>
                  <p>美女主播 热火传情</p>
                </div>
                <div class="lbottom" v-if="gamblingList.length>0">
                  <p>AG视讯</p>
                  <p><span>{{randomplayers.vid}}</span>  <span>第{{randomplayers.roundCount}}局</span></p>
                  <p @click="$router.push('/home/live')">快速入座</p>
                </div>
                <div class="canvas">
                    <canvas class="ball-canvas" ref="canvas" width="542" height="256"></canvas>
                </div>
              </li>
              <li class="t-default slideTop1">
                <div class="lotteryTopbox">
                  <p><b>热门</b><span>彩种推荐</span></p>
                  <p @click="changeArr">换一换</p>
                </div>
                <div class="lotterylistBox">
                  <div v-for="(item,i) in randomDatalist" :key="i" class="itemlibox">
                    <div class="lotterybg">
                       <img :src="item.lotteryId|capitalize">
                    </div>
                     <!-- <div class="lotterynum" v-if="item.djs_fengpan < 0 ">{{封盘中}}</div> -->
                     <vp-home-timer :timerDatas="item" v-on:child-say="timeout" ></vp-home-timer>
                    <div class="lotteryrt">
                      <p class="lotteryissue">第{{item.lastissue.toString().length > 8 ? (item.lastissue.toString().slice(4)) : (item.lastissue)}}期</p>
                      <p class="lotteryStart" @click="golotteryStart(item.lotteryId)">快速游戏</p>    
                    </div>
                  </div>
                </div>
              </li>
              <li class="t-default slideRight1" :class="{active:showlist}">
                <div class="prizeTop">
                  <p @click="showlist=true" :class="{active:showlist}">盈利榜</p>
                  <p @click="showlist=false" :class="{active:!showlist}">投注榜</p>
                </div>
                <div class="prizeRanklist">
                  <div class="rankToptxt">
                    <p>排行/帐号</p>
                    <p v-if="showlist">盈利(元)</p>
                    <p v-else>投注(金额)</p>
                  </div>
                  <div class="ranklistbox">
                    <!-- 盈利排行榜 -->
                    <div class="rankwrapper" v-show="showlist">

                        <div class="listdiv" v-for="(item,i) in winningInfo" :key="i">
                          <span class="rankIcon">{{i+1}}</span>
                          <span class="rankName">{{item.name}}</span>
                          <span class="rankPrizenum">{{item.num|formateNum}}</span>
                        </div>

                    </div>
                    <!-- 投注排行榜 -->
                    <div class="ranktouzhu" v-show="!showlist">

                        <div class="listdiv" v-for="(item,i) in touzhuInfo" :key="i">
                          <span class="rankIcon">{{i+1}}</span>
                          <span class="rankName">{{item.name}}</span>
                          <span class="rankPrizenum">{{item.num|formateNum}}</span>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="prizeTime">统计时间：<span>今天</span></div>
              </li>
            </ul>
            <ul>
              <li @click="$router.push('/home/chess?navid=9&id=0')" class="t-default slideLeft2">
                <div>
                  <p>棋牌游戏</p>
                  <p>休闲益智  棋乐无穷</p>
                </div>
              </li>
              <li @click="golottery" class="t-default slideRight2">
                <div>
                  <p>彩票游戏</p>
                  <p>超高赔率  分秒精彩</p>
                </div>
              </li>
            </ul>
            <ul>
              <li @click="$router.push('/home/slot?navid=9&id=0')" class="t-default slideLeft3">
                <div>
                  <p>电子游艺</p>
                  <p>超级大奖池</p>
                </div>
              </li>
              <li @click="$router.push('/home/fish?navid=9&id=0')" class="t-default slideTop2">
                <div>
                  <p>捕鱼游戏</p>
                  <p>满屏暴金</p>
                </div>
              </li>
              <li @click="$router.push('/home/tiyu?id=0')" class="t-default slideRight3">
                <div>
                  <p>体育电竞</p>
                  <p>丰富赛事</p>
                </div>
              </li>
            </ul>

          </div>
          <div class="advantage" :class="{nightTage:colorbool}">
              <div class="slideTop3">
                <ul class="advantage-cont">
                  <li class="advan_box" v-for="(advanItem,advanIndex) in advanDatas" :key="advanIndex" @click="advantageClick(advanItem)">
                      <a href="javascript:" class="link-cont">
                        <div class="bg_box help-link" :style="{background: 'url(' + advanItem.icon + ') no-repeat center left'}">
                            <h3 class="link-title">{{advanItem.name}}</h3>
                            <p class="link-text">{{advanItem.text}}</p>
                        </div>
                      </a>
                  </li>
                </ul>
          </div>
          </div>
           <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box" >
              <div class="popout-box">
                <span v-html="popups"></span>
              </div>
         </Modal>
         <!-- <Modal width="657" height="546.67" :scrollable=true :mask-closable=false v-model="showimg" class='guanbi'><img width="100%" height="100%" :src="imgsrc"/><span class="close" @click="close"></span></Modal>  -->
         <!-- <vp-mc :imgsrc="imgsrc"></vp-mc> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'
  import '@/assets/iconfont/klk/iconfont.css'
  import '@/assets/iconfont/public/iconfont.css'
  import vpHomeTimer  from "./timer.vue"
  import vpMc from "./mc"
  let indextime
  export default {
    data () {
      return {
        timerDatas:"",
        showimg:false,
        slideTrue:false,
        showPopout: false,
        nightColor:"#fff",
        imgsrc:'/static/xpj80/img/pcAlert.png',
        imgdata:['/static/xpj80/img/pcAlert1.png','/static/xpj80/img/pcAlert2.png','/static/xpj80/img/pcAlert3.png'],
        popups: '',
        lantern: '',
        value3: 0,
        canvas:null,
        borderColor:'#c6e4fc',
        colors: { blue: '#0084ff', red: '#fe0000',green:'#49ea00'},
        // 轮播设置
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover',
          arrow2: 'never'
        },
        timer: {
          timerModel: '',
          timeLeave: '',
          djs_next_kaipan: ''
        },
        changdate:[[16,12,3630],[1,19,17],[10044,27,3632]],
        changIndex:0,
        watchdata:"",
        //彩票大厅游戏数据
        randomData:[],
        randomDatalist:[],
        //中奖名单数据
        winningInfo:[],
        touzhuInfo:[],
        showlist:true,
        newlotterydate:"",
        // 滚动名单
        random: [
          {
            account: '',
            name: 'PT游戏满月财富',
            ico: '/static/public/image/game/ptgame/ashfmf.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏丛林之心',
            ico: '/static/public/image/game/ptgame/ashhotj.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏猫女王',
            ico: '/static/public/image/game/ptgame/catqk.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏埃斯梅拉达',
            ico: '/static/public/image/game/ptgame/esmk.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏古怪猴子',
            ico: '/static/public/image/game/ptgame/fm.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏玛丽莲梦露',
            ico: '/static/public/image/game/ptgame/gtsmrln.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏年年有余',
            ico: '/static/public/image/game/ptgame/nian_k.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏幸运直击',
            ico: '/static/public/image/game/ptgame/sol.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏三倍猴子',
            ico: '/static/public/image/game/ptgame/trpmnk.jpg',
            in: 0,
            out: 0
          },
          {
            account: '',
            name: 'PT游戏招财进宝',
            ico: '/static/public/image/game/ptgame/zcjb.jpg',
            in: 0,
            out: 0
          }
        ],
        scrollDatas: [],
        // 选项选择
       
        optionSel: 'PT',
        rebet:[1.668,1.879,2.114,2.655,3.156,4.324],
        winRebet:[6.568,12.457,9.586,7.888,10.845,14.598],
        // 显示图片
        showTypList: [],
        newlotData:[],
        jackpotNum: 41126438900,
        setInter: null,
        merNumber:{
            num1:0,
            num2:0,
            num3:0,
        },
        touzhuTimer:null,
        winnerTimer:null,
        set:null,
        reloadTimeStaue:true,
        hoursDatas: {
          hou: 0,
          min: 0,
          sec: 0
        },
        daysDatas: {
          day: 0,
          hou: 0,
          min: 0,
          sec: 0
        },
        randomTimer:null,
        gamblingList:[],
        datas:{
          initdata:[],
          lastdata:[], 
        },
        randomplayers:{
          bankerNums:'',
          playerNums:'',
          tieNums:'',
          vid:'',
          roundCount:''    
        },
        table:[],
        randomtable:[],
        shownum:false,
        btnTimer: null,
        publicUrl: 'http://img.7900005.com/',
        downloadAppTarget: '',
        // 首页展示图
        displayDatas:{
          fristData:[
            {
              path:"/home/live",
              ico:"/static/xpj80/img/slot-game1.png",
              name:"真人视讯",
              text:"美女主播  热火传情"
            },
           
          ],
          rightData:[
            {
              path:"",
              ico:"/static/xpj80/img/live-game.png",
              name:"棋牌游戏",
              text:"休闲益智  棋乐无穷"
            },
            {
              path:"",
              ico:"/static/xpj80/img/sport-game.png",
              name:"彩票游戏",
              text:"主流玩法精彩加奖"
            },
          ],
          lastData:[
            {
              path:"",
              ico:"/static/xpj80/img/lottery-game1.png",
              name:"电子游戏",
              text:"超级大奖池"
            },
            {
              path:"",
              ico:"/static/xpj80/img/chess-game1.png",
              name:"捕鱼游戏",
              text:"满屏暴金"
            },
            {
              path:"",
              ico:"/static/xpj80/img/other-game1.png",
              name:"体育电竞",
              text:"丰富赛事 分秒精彩"
            }
          ]
        },
        advanDatas:[
          {
            icon:"/static/xpj80/img/tip-demo-5.png",
            name:"免息借呗",
            text:"单一会员最高可借1560000",
            gamename:"tryplay"

          },
          {
            icon:"/static/xpj80/img/tip-demo-2.png",
            name:"下载App",
            text:"防劫持，极致体验",
            gamename:"download"
          },
          {
            icon:"/static/xpj80/img/tip-demo-3.png",
            name:"合作代理",
            text:"日进斗金，月入百万",
            gamename:"Cooperation"
          }
        ],
      }
    },
    methods: {
      upCarl () {
        if (this.value3 == 0) return false
        this.value3--
        if (this.value3 <= 0) {
          this.value3 = 0
        }
        this.optionSel = this.optionList[this.value3].name
        this.getTypeL(this.optionList[this.value3].id)
      },
      golotteryStart(v){
        if(!localStorage.token || !localStorage.userinfo){
          this.$store.commit('alert/newshowtip',{
              bool:true,
              title:'请先登录！',
              model:'',
              leftspan:true
          })
        }else{
             this.$store.dispatch('lottery/getStopLotteryCheck',v).then(res=>{
               if(res&&res.length >0 ){
                     this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: '',
                        type:'closeMaret',
                     });
               }else{
                   window.open(`#/plays/tradition/${v}`)
               }
            })
          
        }
      },
      golottery(){
          window.open(`#/plays/hall`)
      },
      sortBy(field){
          return function(a,b){
              var value1 = a[field];
              var value2 = b[field];
              return -(value1 - value2);
          }
      },
      initWinningInfo () {
          let timestam = new Date().getTime()
          let dateObj = new Date(timestam)
          let H = dateObj.getHours()+""
          let M = this.ee(dateObj.getMinutes())+""
          let randomNum
          if(+H<1){
             randomNum='1'+M+"9"  
          }else{
             randomNum=H+M+"89"      
          }
         
          let length = 6
          let data = []
          for (let i = 0; i < length; i++) {
          let num = parseInt(randomNum*this.winRebet[i])
          let name = String.fromCharCode((num % 26) + 97) + num.toString(32)
          name = name.substr(0, 3)+'***'+name.substr(3,6)
          num = num
          data[i] = {name, num}
          }
          data.sort(this.sortBy('num'))
          this.winningInfo = data
      },
      initTouzhuInfo () {
        let timestam = new Date().getTime()
        let dateObj = new Date(timestam)
        let H = dateObj.getHours()+""
        let M = this.ee(dateObj.getMinutes())+""
        let randomNum;
        if(+H<1){
             randomNum='1'+M+"99"  
          }else{
             randomNum=H+M+"859"       
        }

        let length = 6
        let data = []
        for (let i = 0; i < length; i++) {
          let num = parseInt(randomNum*this.rebet[i])
          let name = String.fromCharCode((num % 26) + 97) + num.toString(32)
          name = name.substr(0, 3)+'***'+name.substr(3,6)
          data[i] = {name, num}
        }
        data.sort(this.sortBy('num'))
        this.touzhuInfo = data
      },
      ee(num) {
        if (num < 10) {
          num = "0" + num;
        }
        return num;
      },
      close(){
          this.showimg=false;
      },
      timeout(){
         this.getRandomData()
        setTimeout(() => {
           this.reloadTimeStaue = true
        })
        if (this.reloadTimeStaue) {
         
        }
          
      },
      //随机生成几个不重复的数
      getShterr(){
        this.randomData=[]
        var add=0;
        while(add<3){
          var num= Math.floor(this.lotteryData.length*Math.random());
          if(this.randomData.indexOf(num) == -1){
            this.randomData.push(num);
            add++;
          }
          this.randomData.sort(function(a,b){
              return b-a;
          })
        }
        return this.randomData
      },
      async getRandomData(){
        this.reloadTimeStaue=false
        let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getIssues`, {})
        if(res && res.code == 200){
            this.lotteryData = res.data
            this.newlotData=[]
            this.changdate[this.changIndex].forEach((item)=>{
            this.lotteryData && this.lotteryData.forEach((lotteryitem)=>{
                if(item==lotteryitem.lotteryId){
                    this.newlotData.push(lotteryitem)
                }
            })
          })
          this.randomDatalist=this.newlotData
        }
      },
      changeArr(){
         this.changIndex++
        if(this.changIndex==3){
          this.changIndex=0
        } 
        this.shownum=false
        this.getRandomData()
      },
      async advantageClick(advanItem){
        if(advanItem.gamename=='tryplay'){
            // 借呗
                 if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                      //window.open('/static/839qp/html/active/jiebei/index.html');
                   }
                  }else{
                    // window.open('/static/839qp/html/active/jiebei/index.html');
                  this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                   });
                 }
        }
        else if(advanItem.gamename=="download"){
            window.open("/static/xpj80/html/download/index.html")
        }
        else if(advanItem.gamename=="Cooperation"){
             this.$router.push('/home/about/4')
        }
      }, 
      // showAttention(){
      //   this.$store.commit('alert/changeAttention', true)
      // }, 
      getMycount(){
        let date= new Date();
        if(date.getHours()>=15&&date.getHours()<18){
　　　　  this.imgsrc=this.imgdata[1]
　　    }else if(date.getHours()>=18&&date.getHours()<21){
          this.imgsrc=this.imgdata[2]
        }else{
　　　　   this.imgsrc=this.imgdata[0]
　      }
      },
      downCarl () {
        if (this.value3 == this.optionList.length - 1) return false
        this.value3++
        if (this.value3 >= this.optionList.length - 1) {
          this.value3 = this.optionList.length - 1
        }
        this.optionSel = this.optionList[this.value3].name
        this.getTypeL(this.optionList[this.value3].id)
      },
      optionFc (item) {
        this.optionSel = item.name
        this.getTypeL(item.id)
        this.value3 = item.index
      },

      //获取数据
      async getTypeL(item) {
        this.gameData = [];
        let id=this.$route.query.id
        let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
            device: "pc",
            id
        });
        if (res && res.code === 200) {
          this.gameData = res.data[id];
          this.total = res.data.last_page;
        }
      },
      jackpotFc () {
        clearInterval(this.setInter)
        this.setInter = setInterval(() => {
          this.jackpotNum = this.jackpotNum + 8.56
        }, 100)
      },

      touzhuInter(){
        clearInterval(this.touzhuTimer)
        this.touzhuTimer = setInterval(()=>{
          this.initTouzhuInfo()
        },300000)
      },

      winnerInter(){
        clearInterval(this.winnerTimer)
        this.winnerTimer = setInterval(()=>{
          this.initWinningInfo()
        },300000)
      },
     
      async getPopout () {
        if (!this.$store.state.mainState.ifpourT || localStorage.token)
          return false
        let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
          type: 'popups',
          desc_client_type: 'html'
        })
        if (res && res.code == 200) {
          if (!res.data.data.length){
              this.showimg=true
              return false
          } 
          this.showPopout = true
          this.showimg=true
          this.popups = res.data.data[0] && res.data.data[0].description
          this.$store.commit('mainState/resetPour', false)
        }
      },
      downloadAppFc () {
        window.open('/static/xpj80/html/download/index.html')
      },
      websoc () {
        if (this.websocketdata.type == 'user.lotteryOpen') {
         this.websocketdata.data.forEach((msgItem, index) => {
            this.randomDatalist.forEach((recoItem, i) => {
              if (msgItem.lotteryId == recoItem.lotteryId) {
                 let saveResult = msgItem.lastresultInfo.split(',')
                 recoItem.issue = msgItem.lastissue
                 recoItem.djs_next_kaipan= msgItem.djs_next_kaipan
                 this.newlotterydate = msgItem.djs_next_kaipan
              }
            })
          })
        }
      },
      async getCanDatas(){
       let res = await this.$http.post(`${this.$HOST_NAME}/getGamblingList`);
       if(res && res.code == 200){
           this.gamblingList=res.data.gamblingList
           this.table=res.data.table
           this.handleData()
       }
      },
      changDatas(){
        clearInterval(this.randomTimer);
        this.randomTimer = null;
        this.randomTimer=setInterval(()=>{
             this.handleData()
        },(5+Math.round(Math.random()*20))*1000)   
      },
      handleData(){
        if(this.gamblingList.length>0){
              let random=Math.floor(Math.random()*(this.gamblingList.length-1)+1)
              let random1=Math.floor(Math.random()*(this.table.length-1)+1)
              this.randomData=this.gamblingList[random].roundRes
              this.randomtable=[]
              for(var key in this.randomplayers){
                  this.randomplayers[key]=this.gamblingList[random][key]
              }
              this.randomtable.push(this.table[random1])

              if(random1==this.table.length-1)  this.randomtable.push(this.table[random1-1])
              else this.randomtable.push(this.table[random1+1])
              this.datas.initdata=[]
              let recieveForWard = []
              let index=0
              this.randomData&&this.randomData.forEach((randomVal,index)=>{
                    let forward={}
                    forward.banker=Number(randomVal.bankerpoint)-Number(randomVal.playerpoint)
                    if(forward.banker>0) forward.lineColor=this.colors.blue
                    else forward.lineColor=this.colors.red
                    this.datas.initdata.push(forward)
             })
             this.datas.initdata&&this.datas.initdata.forEach((item,v)=>{
                if( v>0 && this.datas.initdata[v].lineColor!==this.datas.initdata[v-1].lineColor){
                     let lineward=[]
                     for(let i=index;i<v;i++){
                        lineward.push(this.datas.initdata[i])
                     }
                     let linewardArr=lineward.length
                     if(linewardArr<7){
                       for(let j=1;j<=7-linewardArr;j++){
                           lineward.push({})
                         }
                     }
                     recieveForWard.push({list:lineward})
                     index=v
                }  
                if(v==this.datas.initdata.length-1){
                      let last=[]
                      for(let i=index;i<=v;i++){
                          last.push(this.datas.initdata[i])  
                      }
                      let lastArr=last.length
                      if(lastArr<7){
                        for(let j=1;j<=7-lastArr;j++){
                              last.push({})
                        }
                      }
                      recieveForWard.push({list:last})
                }
          })
          if(recieveForWard.length>15) recieveForWard.splice(0,15)
          this.handleTurn(recieveForWard)
        } 
      },
       handleTurn(recieveForWard){ 
            let turnArr=[]
            let span=-1
            recieveForWard.forEach((item,v)=>{
               let spliceArr=[]
               if(item.list.length > 7 && !turnArr.length && span === -1){
                     spliceArr = item.list.splice(7, item.list.length - 7)
                     turnArr.push({list: spliceArr, index: v, length: 7})
                     item.list.splice(7, item.list.length - 7)
                     span = v
               }else if(item.list.length > 6 && turnArr.length && span !== -1 &&
                     turnArr[0].list.length + span >= v){
                     spliceArr = item.list.splice(6, item.list.length - 6)
                     turnArr.push({list: spliceArr, index: v, length: 6})
                     item.list.splice(6, item.list.length - 6)
                     span = v 
               }else if(item.list.length > 7 && turnArr.length && span !== -1){
                     spliceArr = item.list.splice(7, item.list.length - 7)
                     turnArr.push({list: spliceArr, index: v, length: 7})
                     item.list.splice(7, item.list.length - 7)
                     span = v
               }
            }) 
            this.datas.lastdata=recieveForWard
            if(!turnArr.length){
                if(this.datas.lastdata.length>15) this.datas.lastdata.splice(0,15)
                this.canvas=this.$refs.canvas
                this.refreshCanvas()
               return false
            }
            turnArr.forEach((item,j)=>{
                if(item.length==7){
                     for (let k = 0; k < item.list.length; k++) {
                        if (!this.datas.lastdata[item.index + k + 1]) {
                            return false
                        }
                        this.datas.lastdata[item.index + k + 1]['list'][6] = item.list[k]
                    }
                }else if(item.length==6){
                     for (let k = 0; k < item.list.length; k++) {
                        if (!this.datas.lastdata[item.index + k + 1]) {
                          return false
                        }
                        this.datas.lastdata[item.index + k + 1]['list'][5] = item.list[k]
                    }
                }
            }) 
            if(this.datas.lastdata.length>15) this.datas.lastdata.splice(0,15)
            this.canvas=this.$refs.canvas
            this.refreshCanvas() 
      },
      refreshCanvas(){
           this.canvas=this.$refs.canvas
           this.$nextTick(()=>{
              if(this.canvas){
                  const context = this.canvas.getContext('2d')
                  context.clearRect(0, 0, 542, 256)
                  context.width=542
                  context.height=256
                  context.scale(2,2)
                  const width=271
                  const height=128
                  context.strokeStyle = this.borderColor
                  context.translate(-0.5,-0.5);
                  context.lineWidth = 1
                  context.beginPath()
                  context.moveTo(0, 1)
                  context.lineTo(width,1)
                  for (let i = 0; i < 7; i++) {
                    const y = (i + 1) *18 + 1
                    context.moveTo(0.5, y)
                    context.lineTo(270.5, y)
                  }
                  context.moveTo(1, 0)
                  context.lineTo(1, 128.5)
                  for (let i = 0; i < 15; i++) {
                    const x = (i + 1) * 18 + 1
                    context.moveTo(x, 0.5)
                    context.lineTo(x, 128.5)
                  }
                  context.stroke()
                  for(let x=0;x<this.datas.lastdata.length;x++){
                      for(let y=0;y<this.datas.lastdata[x].list.length;y++){
                           const val=this.datas.lastdata[x].list[y]
                           if(val.lineColor){
                              context.beginPath()
                              context.textAlign = 'center'
                              context.strokeStyle =val.lineColor
                              context.fillStyle = val.lineColor
                              context.lineWidth=1.5
                              const pX=18*x+9.5
                              const pY=18*y+9.5
                              context.arc(
                                        pX,
                                        pY,
                                        5,
                                        0,
                                        2 * Math.PI)
                              context.stroke()
                              if(!val.banker){
                                    context.strokeStyle = this.colors.green
                                    context.lineWidth = 1.5
                                    context.beginPath()
                                    context.moveTo(x*18+0.5, (y+1)*18-0.5)
                                    context.lineTo((x+1)*18,y*18+1)
                                    context.stroke()
                              }
                           }
                      }
                  }
                    context.translate(0.5,0.5);
                    context.scale(0.5,0.5);
              }
           })
      }
    },
    created () {
       this.getRandomData()
       setTimeout(() => {
         this.showimg=false
      }, 10000)
      if(localStorage.register){
        this.$router.push('/home/register');
        localStorage.removeItem('register')
      }
    },
    mounted () {
      clearInterval(this.setInter)
      clearInterval(this.winnerTimer)
      clearInterval(this.touzhuTimer)
      this.jackpotFc()
      this.touzhuInter()
      this.winnerInter()
      this.initTouzhuInfo()
      this.initWinningInfo()
      this.getCanDatas()
      this.handleData()
      setTimeout(()=>{
           this.changDatas()
      },5000)
      if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        this.publicUrl = config.statics
      }
     },
     destroyed(){
        this.changDatas() 
     },
     computed: {
        colorbool(){
         return this.$store.state.mainState.color
       },
        websocketdata(){
          return this.$store.state.mainState.websoc
       },
    },
     watch:{
       websocketdata(){
          this.websoc();
       },
     },
    components: {
      vpMc,
      vpHomeTimer,
    },
    // beforeDestroy () {
    //     clearInterval(indextime)
    // },
    filters:{
      capitalize:function(value){
        try{
          return `/static/public/image/lottery/nico/png/${value}.png`
        }catch(err){
          return `/static/public/image/lottery/nico/png/438.png`
        }
      },
      formateNum:function(value){
        value = value.toString();
        if (!value) return '0.00';
        var intPart = Number(value).toFixed(0); // 获取整数部分
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
        var floatPart = '.00'; // 预定义小数部分
        var value2Array = value.split('.');
        if (value2Array.length === 2) { // =2表示数据有小数位
          floatPart = value2Array[1].toString(); // 拿到小数部分
          if (floatPart.length === 1) { // 补0,实际上用不着
            return intPartFormat + '.' + floatPart + '0';
          } else {
            return intPartFormat + '.' + floatPart;
          }
        } else {
          return intPartFormat + floatPart;
        }
      }
    },
    store
  }
</script>

<style lang="less">
  .new-index {
    position: relative;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    background: #f1f1f1;

    .content_bg{
      background-color: #f1f1f1;
      overflow: hidden;
      
      .content-main-bg{
        position: relative;
        padding-bottom:10px;
        background:url(/static/xpj80/img/index-main-bg-1.jpg) no-repeat center top;
        background-size: 100% 100%;
        .wp{
          width: 1150px;
          margin: 0 auto;
         
          .game-lists-container{
            // padding: 25px 0 0;
             padding:10px 0 0;

             ul:after{
               clear:both;
               content:'';
               display:block;
             }

             ul{
               position:relative;
               li{
                 float:left;
               }
               li:last-child{
                 float:right;
               }
              
             }


            &>ul:first-child{
              height:389px;
              li{
                height:350px;
              }
              li:first-child{
                width:498px;
                height:389px;
                position:relative;
                left:-2000px;
                background:url(/static/xpj80/img/shouye/newlivebg.png) no-repeat center;
                .rtop{
                  position:absolute;
                  top:60px;
                  right:12px;
                  p{
                    margin:0;
                    padding:0;
                    color:#fff;
                    text-align:right;
                  }
                  p:first-child{
                    font-size:30px;
                    font-family: 'FZL THK GBK1 0';
                    margin-bottom:8px;
                  }
                  p:last-child{
                    font-size:20px;
                    font-family: 'FZL THK GBK1 0';
                  }
                }
                .lbottom{
                  position:absolute;
                  left:48px;
                  bottom:28px;
                  p{
                    text-align:center;
                    cursor:pointer;
                  }
                  p:first-child{
                    font-size:26px;
                    color:#4fade6;
                    margin-bottom:13px;
                  }
                  p:nth-child(2){
                    font-size:13px;
                    margin-bottom:12px;
                    span{
                      color:#545454;
                      font-size:13px;
                    }
                    span:first-child{
                      color:#ff5b00;
                    }
                  }
                  p:last-child{
                    height:35px;
                    line-height:35px;
                    width:108px;
                    text-align:center;
                    font-size:15px;
                    border-radius:18px;
                    border:1px solid #4fade6;
                    color:#4fade6;
                    transition:all .4s linear;
                  }
                  p:last-child:hover{
                    transform: scale(1.06);
                    background: -webkit-linear-gradient(right, #65e0f4, #4fade6); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(right, #65e0f4, #4fade6); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(right, #65e0f4, #4fade6); /* Firefox 3.6 - 15 */
                    background: linear-gradient(to right, #65e0f4, #4fade6); /* 标准的语法 */
                    border:0;
                    color:#fff;
                  }
                }
                .canvas{
                    transform:scale(0.5);
                    -ms-transform:scale(0.5);
                    -moz-transform:scale(0.5);
                    -moz-transform-origin:bottom right;
                    -webkit-transform-origin:bottom right; 
                    -ms-transform-origin:bottom right; 
                    // width: 270px;
                    // height: 128px;
                    // border: 1px solid #c6e4fc;
                    position: absolute;
                    bottom: 13px;
                    right: 30px;
                    .ball-canvas{
                       display: table;
                       white-space: nowrap;
                       min-width: 100%;
                    }
                }
              }
              li:nth-child(2){
                width:301px;
                margin-top:39px;
                margin-left:24.5px;
                background:url(/static/xpj80/img/shouye/lotteryBg.png) no-repeat center;
                position:relative;
                top:2000px;
                .lotteryTopbox{
                  height:58px;
                  line-height:58px;
                  width:100%;
                  margin-top:6px;
                  padding:0 32px;
                  p:first-child{
                    float:left;
                    b{
                      font-size:22px;
                      font-weight: bold;
                      color:#fff;
                    }
                    span{
                      font-size:18px;
                      color:#fff;
                    }
                  }
                  p:last-child{
                    float:right;
                    color:#fff;
                    font-size:14.36px;
                    cursor:pointer;
                    transition:all .3s linear;
                    font-family: "微软雅黑"
                  }
                  p:last-child:hover{
                    font-size:15px;
                  }
                }
                .lotterylistBox{
                  height:275px;
                  margin-top:6px;
                  padding: 0 15px 0 22px;
                  overflow:hidden;
                  .itemlibox:first-child{
                    margin-top:15px;
                  }
                  .itemlibox:nth-child(2){
                    margin:22px 0;
                  }
                  .itemlibox{
                    height:70px;
                    .lotterybg,.lotterynum,.lotteryrt{
                      float:left;
                      min-width:66px;
                      height:70px;
                      font-size:14px;
                      color:#333;
                    }
                    .lotterybg{
                      margin-right:11px;
                      img{
                        height: 70px;
                        width:70px;
                        transition:all .3s linear;
                        cursor:pointer;
                      }
                      img:hover{
                        transform: rotate(360deg)
                      }
                    }
                    
                    .lotterynum{
                      line-height:70px;
                      font-size:14px;
                    }
                    .lotteryrt{
                      float:right;
                      padding:3px 0;
                      .lotteryissue{
                        height:30px;
                        line-height: 30px;
                        text-align:center;
                        color:#333;
                      }
                      .lotteryStart{
                        width:105px;
                        height:31px;
                        line-height: 31px;
                        text-align:center;
                        color:#ff7e36;
                        border:1px solid #ff7e36;
                        border-radius:15px;
                        cursor:pointer;
                        margin:0 auto;
                        transition:all .3s linear;
                      }

                      .lotteryStart:hover{  
                        transform: scale(1.06);
                        background: -webkit-linear-gradient(right, #65e0f4, #4fade6); /* Safari 5.1 - 6.0 */
                        background: -o-linear-gradient(right, #65e0f4, #4fade6); /* Opera 11.1 - 12.0 */
                        background: -moz-linear-gradient(right, #65e0f4, #4fade6); /* Firefox 3.6 - 15 */
                        background: linear-gradient(to right, #65e0f4, #4fade6); /* 标准的语法 */
                        border:0;
                        color:#fff;
                      }

                    }
                    
                  }
                }
              }
              li:last-child{
                width:302px;
                height:377px;
                margin-top:12px;
                margin-right:0;
                background:url(/static/xpj80/img/shouye/prizeBg.png) no-repeat center;
                position:relative;
                right:2000px;
                .prizeTop{
                  height:34px;
                  line-height:34px;
                  margin-top:93px;
                  p{
                    margin:0;
                    padding:0;
                    width:100px;
                    height:34px;
                    float:left;
                    color:#666;
                    text-align:center;
                    cursor:pointer;
                  }
                  p:hover{
                    color:#5caaea;
                  }
                  .active{
                    color:#5caaea;
                  }
                  p:last-child{
                    float:right;
                  }
                }
                .prizeRanklist{
                  width:100%;
                  padding:0 15px;
                  height:216px;
                  .rankToptxt{
                    height:35px;
                    line-height:35px;
                    p{
                      float:left;
                      height:35px;
                      font-size:13px;
                      text-align:center;
                    }
                    p:last-child{
                      float:right;
                    }
                  }
                  .ranklistbox{
                    height:181px;
                    position: relative;
                    overflow: hidden;
                    font-size: 14px;
                    line-height: 28px;
                    .rankwrapper,.ranktouzhu{
                      position: absolute;
                      width: 100%;
                      top: 0;
                      left: 0;
                      // -webkit-animation: winning-list-animation 30s linear infinite;
                      // animation: winning-list-animation 30s linear infinite;
                      .listdiv{
                        width:100%;
                        height:31px;
                        line-height:31px;
                        .rankIcon,.rankName{
                          float:left;
                          height:28px;
                          line-height:28px;
                          text-align:center;
                          font-size: 13px;
                          color:#666;
                        }
                        .rankPrizenum{
                          float:right;
                          height:28px;
                          line-height:28px;
                          text-align:center;
                          color:#ff5b00;
                          font-size: 13px;
                          font-weight: bold;
                        }
                      }
                      .listdiv .rankIcon{
                        width:22px;
                        height:22px;
                        line-height:22px;
                        background:#50b0e7;
                        border-radius: 50%;
                        color:#fff;
                        font-size:10px;
                        margin-right:25px;
                        text-align:center;
                      }
                      .listdiv:first-child>.rankIcon{
                          width: 25px;
                          height: 20px;
                          line-height: 28px;
                          background: url(/static/xpj80/img/55.png) no-repeat center;
                          background-size: contain;
                          position: relative;
                          top: 50%;
                          transform: translateY(-50%);
                      }
                      .listdiv:nth-child(2)>.rankIcon{
                        width: 25px;
                        height: 20px;
                        line-height: 28px;
                        background:url(/static/xpj80/img/66.png) no-repeat center;
                        background-size:contain;
                        position: relative;
                        top: 50%;
                        transform: translateY(-50%);
                      }
                      .listdiv:nth-child(3)>.rankIcon{
                        width:23px;
                        height:20px;
                        line-height:28px;
                        background:url(/static/xpj80/img/77.png) no-repeat center;
                        background-size:contain;
                        position: relative;
                        top: 50%;
                        transform: translateY(-50%);
                      }
                    }
                  }
                }
                .prizeTime{
                  position:absolute;
                  bottom:0;
                  height:34px;
                  line-height:34px;
                  text-align:center;
                  color:#fff;
                  width:100%;
                  font-size:13px;
                }
              }
              li.active{
                background:url(/static/xpj80/img/shouye/prizeBg1.png) no-repeat center;
              }
            }

            &>ul:nth-child(2){
              height:298px;
              margin:10px 0;
              li{
                width:590px;
                position:relative;
                div{
                  width:172px;
                }
                p{
                  color:#fff;
                  font-family: "FZL TCHK GBK1 0";
                  text-align:right;
                }
                p:first-child{
                  font-size:30px;
                  font-weight: bold;
                  margin-bottom:8px;
                }
                p:last-child{
                  font-size:20px;
                }
              }
              li:first-child{
                height:298px;
                width:590px;
                background:url(/static/xpj80/img/shouye/qiapibg.png) no-repeat center;
                margin-left:-27px;
                left:-2000px;
                div{
                  position:absolute;
                  right:25px;
                  top:45px;
                }
              }
              li:last-child{
                width:598px;
                height:276px;
                margin-top:18px;
                margin-right:-35px;
                right:2000px;
                background:url(/static/xpj80/img/shouye/lotterylistbg.png) no-repeat center;
                div{
                  position:absolute;
                  left:25px;
                  bottom:35px;
                  p{
                    text-align:left;
                  }
                }
              }
            }


            &>ul:nth-child(3){
              height:230px;
              margin-bottom:20px;
              li{
                position:relative;
                div{
                  width:172px;
                  position:absolute;
                  right:20px;
                  bottom:35px;
                }
                p{
                  color:#fff;
                  font-family: "FZL TCHK GBK1 0";
                  text-align:right;
                }
                p:first-child{
                  font-size:30px;
                  font-weight: bold;
                  margin-bottom:8px;
                }
                p:last-child{
                  font-size:20px;
                }
              }
              li:first-child{
                width:434px;
                height:230px;
                background:url(/static/xpj80/img/shouye/slotbg.png) no-repeat center;
                margin-left: -66px;
                left:2000px;
              }
              li:nth-child(2){
                width:382px;
                height:230px;
                margin-left: 11px;
                background:url(/static/xpj80/img/shouye/buyubg.png) no-repeat center;
                top:2000px;
              }
              li:last-child{
                width:367px;
                height:230px;
                background:url(/static/xpj80/img/shouye/tiyubg.png) no-repeat center;
                right:2000px;
              }
            }


            &>ul:not(:first-child){
              li{
                transition:all .4s linear;
              }
              li:hover{
                transform:scale(1.06);
                cursor:pointer;
              }
            }




            .above-game-content{
              height:462px;
              display: flex;
              -webkit-box-pack:justify;
              justify-content: space-between;
              flex-wrap: wrap;
              // padding-left: 20px;
              position: relative;
              .item{
                transform: scale(1);
                transition: transform 100ms;
                cursor: pointer;
                &:hover {
                   transform: scale(1.03)
                }
              }
              .slot-game-cont{
                  position: relative;
                  display: inline-block;
                  width: 633px;
                  height: 100%;
                  background: url(/static/xpj80/img/slot-game1.png) no-repeat center top;
                  background-size:100% 100%;   
                  -moz-background-size:100% 100%;   
                  -webkit-background-size:100% 100%;   
                  -o-background-size:100% 100%;
                  left:-2000px; 
                .slot-game-context{
                  position: absolute;
                  right: 30px;
                  top: 60px;
                  color: #fff;
                  font-size: 16px;
                  font-style: italic;
                  text-align: right;
                 
                  .title{
                    line-height:42px;
                    font-size: 26px;
                    font-weight: bold;
                  }
                  .desc{
                    line-height: 28px;
                    font-size: 18px
                  }
                }
              }
              .live-sport-cont{
                position: absolute;
                right: 0;
                top: 0;
                height: 462px;
                font-style: italic;
                cursor: pointer;
                ul{
                  .live-game{
                    cursor: pointer;
                    position: absolute;
                    right: 15px;
                    top:5px;
                    height: 240px;
                    width: 590px;
                    background: url(/static/xpj80/img/live-game.png) no-repeat center top;
                    background-size: 100% 100%;
                    right:-2000px;
                    .live-game-context{
                      position: absolute;
                      left: 36px;
                      text-align: center;
                      bottom: 15px;
                      color: #fff;
                      .title{
                        line-height: 42px;
                        margin-left: 12px;
                        font-size: 26px;
                        font-weight: bold;
                      }
                      .desc{
                        font-size: 18px;
                        line-height: 29px;
                      }
                    }
                  }
                  .sport-game{
                    position: absolute;
                    // right: -26px;
                    right:-10px;
                    top: 251px;
                    height: 210px;
                    width: 680px;
                    background: url(/static/xpj80/img/sport-game.png) no-repeat center top;
                    background-size: 100% 100%;
                    right:-2000px;
                    .sport-game-context{
                      position: absolute;
                      left: 36px;
                      bottom: 15px;
                      color: #fff;
                      text-align: center;
                      .title{
                        line-height: 42px;
                        margin-left:12px;
                        font-size: 26px;
                        font-weight: bold;
                      }
                      .desc{
                        line-height: 29px;
                        font-size: 18px;
                      }
                    }
                  }
                  .t1{
                    transform: scale(1);
                    transition: transform 100ms;
                     &:hover {
                      transform: scale(1.03)
                    }
                  }
                }
              }
            } 
            .below-game-content{
              position: relative;
              height: 219px;
              margin: 5px 0 30px;
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              flex-wrap: wrap;
              cursor: pointer;
              // padding-left: 20px;
              li{
                .game-context{
                  position: absolute;
                  right: 15px;
                  bottom: 15px;
                  text-align: right;
                  color: #fff;
                  font-style: italic;
                  cursor: pointer;
                  .title{
                    margin-right: 10px;
                    font-size: 22px;
                    font-weight: bold;
                    line-height: 35px;
                  }
                  .desc{
                    font-size: 16px;
                    line-height: 25px;
                  }
                }
              }
              .esports{
                 transform: scale(1);
                 transition: transform 100ms;
                  &:hover {
                      transform: scale(1.03)
                  }
              }
              .lottery-game{
                  position: absolute;
                  top: 9px;
                  height: 219px;
                  width: 470px;
                  background:url(/static/xpj80/img/lottery-game1.png) no-repeat center top;
                  background-size: 100% 100%;
                  left:-2000px
              }
              .chess-game{
                    position: absolute;
                    right: 406px;
                    top: 6px;
                    width: 420px;
                    height: 222px;
                    background: url(/static/xpj80/img/chess-game1.png) no-repeat center top;
                    background-size: 100% 100%;
                    top:2000px;
                }
              .other-game{
                    position: absolute;
                    top: 9px;
                    width: 396px;
                    height: 219px;
                    background: url(/static/xpj80/img/other-game1.png) no-repeat center top;
                    background-size: 100% 100%;
                    right:-2000px;
                }  
              }
            }
          .advantage{
            max-width: 1164px;
            height: 200px;
            // margin: 0 auto;
            .advantage-cont{
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              width:100%;
              height:200px;
              .advan_box{
                  -webkit-box-flex: 1;
                  -ms-flex: 1;
                  flex: 1;
                  display: inline-block;
                  width: 33%;
                  padding: 67px 0;
                  vertical-align: top;
                  cursor: pointer;
                  transition: all .2s;
                  .link-cont{
                    display: block;
                    text-align: left;
                    .help-link{
                       transform: translateY(0);
                       transition: transform 500ms;
                    
                      &:hover {
                        transform: translateY(-20px)
                      }
                      height: 67px;
                      padding-left: 66px;
                      .link-title{
                        line-height: 40px;
                        padding: 0 0 5px;
                        font-size: 22px;
                        color: #666;
                        font-weight: bold;
                      }
                      .link-text{
                        font-size: 18px;
                        color: #999;
                    }
                  }
                }
              }
              .advan_box:nth-child(1){
                .help-link{
                  width:305px; 
                }
              }
              .advan_box:nth-child(2){
                margin-left:100px;
                .help-link{
                   padding-left: 72px;
                }
              }
              .advan_box:nth-child(3){
                 margin-left:40px;
                .help-link{
                   padding-left: 80px;
                }
              }
            }
          }
          .nightTage{
            background:rgba(18, 21, 66, 0.8);
            h3,p{
              color:white!important;
            }
          }
        }
      }
     .night{
        background:url(/static/xpj80/img/index-main-bg-n.jpg) no-repeat center top;
        background-size:100% 100%; 
     }
    }
  }
    .vp-popout-box {
      /deep/ .ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -328px;
        margin-top: -273px;
      }

      /deep/ .ivu-modal-close {
        z-index: 2;
        top: 6px;

        i {
          color: #fff;
        }
      }

      /deep/ .ivu-modal-header {
        width: 650px;
        height: 34px;
        margin-top: 5px;
        margin-left: 3px;
        padding: 0;
        border-radius: 10px;
        border: 1px solid #494437;
        background: #ff0000 url(/static/xpj80/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50% repeat-x;
        color: #ffffff;
        font-weight: bold;
        position: relative;
        top: 4px;

        .ivu-modal-header-inner {
          color: #fff;
          line-height: 34px;
          height: 34px;
          padding-left: 15px;
        }
      }

      /deep/ .ivu-modal-footer {
        border-top: 1px solid #cdd5da;

        .ivu-btn-text {
          display: none;
        }

        .ivu-btn-primary {
          background: #ff0000;
          border-color: #ff0000;
          padding: 3px 12px 3px 12px;
          border-radius: 6px;
        }
      }

      .popout-box {
        min-height: 427px;
        font-family: "Microsoft YaHei";
        font-size: 24px;
        line-height: 1.5;
        color: #383838;
      }

      // /deep/
    }
    .slideTop3{
      padding: 0 70px;
      background-color: white;
      border-radius: 20px;
      position: relative;
      bottom:-2000px;
    }


  .animationName(@name,@time){
      animation-delay:2s;
      animation: @name 0.5s @time 1;
      animation-timing-function: ease;
      animation-direction: normal;
      animation-fill-mode:forwards;
  }

  .keyFrames(@name,@value,@value1){
     @keyframes @name {
       0%{
        left:@value;opacity: 0;
       } 
       50%{
        left:@value;opacity:0;
       }
       100%{
        left:@value1;opacity:1;
       }
    }
  }
   .keyFrames2(@name,@value,@value1){
     @keyframes @name {
       0%{
        right:@value;opacity: 0;
       } 
       50%{
        right:@value;opacity:0;
       }
       100%{
        right:@value1;opacity:1;
       }
    }
  }
   .keyFrames3(@name,@value,@value1){
      @keyframes @name {
       0%{
        top:@value;opacity: 0;
       } 
       50%{
        top:@value;opacity:0;
       }
       100%{
        top:@value1;opacity:1;
       }
    }
   }
 
    .slideLeft{.animationName(slideLeft,.2s)}
    .keyFrames(slideLeft,-2000px,0);

    .slideRight1{.animationName(slideRight1,0.4s)}
    .keyFrames2(slideRight1,-2000px,0);
  
    .slideRight2{.animationName(slideRight2,1.0s)}
    .keyFrames2(slideRight2,-2000px,0);

    .slideLeft2{.animationName(slideLeft2,0.8s)}
    .keyFrames(slideLeft2,-2000px,0);
 
    .slideTop1{.animationName(slideTop1,0.6s)}
    .keyFrames3(slideTop1,2000px,0);

    .slideLeft3{.animationName(slideLeft3,1.2s)}
    .keyFrames(slideLeft3,-2000px,0);

    .slideTop2{.animationName(slideTop2,1.6s)}
    .keyFrames3(slideTop2,2000px,0);

    .slideRight3{.animationName(slideRight3,1.4s)} 
    .keyFrames2(slideRight3,-2000px,0);

    .slideTop3{.animationName(slideTop3,1.8s)} 
    .keyFrames3(slideTop3,2000px,0);


  //  @keyframes winning-list-animation {
  //   from {
  //     top: 0;
  //   }
  //   to {
  //     top: -760%;
  //   }
  // }

  // @-webkit-keyframes winning-list-animation {
  //   from {
  //     top: 0;
  //   }
  //   to {
  //     top: -760%;
  //   }
  // }
  
</style>
