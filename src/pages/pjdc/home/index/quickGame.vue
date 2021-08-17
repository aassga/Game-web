<template>
  <div class="quickGame clearfix">
    <div class="quickGame-1 pull-left slideLeft">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/pjdc/img/home/quickgame-bg1-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">真人娱乐</div>
          <div class="introdu">LIVE ENTERTAINMENT</div>
        </div>
      </div>
      <div class="text">豪客专享 真实体验</div>
      <router-link to="/home/live" class="btn">热门推荐</router-link>
      <div class="mask">
        <img src="/static/pjdc/img/home/mask1.png" class="mask1">
        <router-link to="/home/live" class="more-game">
          更多游戏
        </router-link>
        <div class="mask-cont">  
          <div v-for="(item,i) in maskGame" :key="i" :class="['mask-area',`mask-area${i + 1}`]" @click="$loginGame(item)">
              <div class="top-img">
                <img :src="item.img1" alt="" class="img1">
                <img :src="item.img2" alt="" class="img2">
              </div>
              <p class="game-name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="quickGame-2 slideTop1 pull-left">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/pjdc/img/home/quickgame-bg2-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">AG百家乐好路推荐</div>
          <div class="introdu">BACCARAT GOOD ROAD TIPS</div>
        </div>
      </div>
      <div class="text" v-if="gamblingList.length>0">
        <div class="time">{{randomplayers.vid}}</div>
        <div>
          第&nbsp;<span class="yellow">{{randomplayers.roundCount}}</span>局&nbsp;,距离本局结束
        </div>
        <div>
          庄&nbsp;<span class="blue">{{randomplayers.bankerNums}}</span>&nbsp;和&nbsp;<span class="green">{{randomplayers.playerNums}}</span>&nbsp;闲&nbsp;<span class="yellow">{{randomplayers.tieNums}}</span>
        </div>
      </div>
      <div class="btn">
        <a v-if="$store.state.mainState.userinfo" @click="$loginGame(joinLive)">进入游戏</a>
        <router-link v-else :to="'/home/register'">免费开户</router-link>
      </div>
      <div class="game">
        <span class="a3">A03</span>
        <span class="game-name">经典百家乐</span>
      </div>
      <div class="canvas">
           <canvas class="ball-canvas" ref="canvas" width="554" height="280"></canvas>
      </div>
    </div>
    <div class="quickGame-3 pull-left slideRight1">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/pjdc/img/home/quickgame-bg3-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">竞咪推荐</div>
          <div class="introdu">HOT TABLES</div>
        </div>
      </div>
      <div class="quickEnter quickEnter1" v-if="randomtable.length>0">
        <div class="tableNumber">{{randomtable[0].vid}}</div>
        <div class="tablePerson">{{randomtable[0].peopleNum}}</div>
        <a class="tableBtn" @click="$loginGame({id: '31'})">快速入座</a>
      </div>
      <div class="money1" v-if="randomtable.length>0">{{randomtable[0].money}}</div>
      <div class="money2" v-if="randomtable.length>0">{{randomtable[1].money}}</div>
      <div class="quickEnter quickEnter2" v-if="randomtable.length>0">
        <div class="tableNumber">{{randomtable[1].vid}}</div>
        <div class="tablePerson">{{randomtable[1].peopleNum}}</div>
        <a class="tableBtn" @click="$loginGame({id: '31'})">快速入座</a>
      </div>
      <img src="/static/pjdc/img/home/quickhame-bg3-hot.png" class="bg3-hot" />
    </div>
  </div>
</template>

<script>
// import mixin from '../../../public/games/public';
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
export default {
  // mixins: [mixin],
  data() {
    return {
      time: 600,
      timer: 0,
      borderColor: '#a95058',
      countDown:'01:12',
      canvas:null,
      randomData:[],
      joinLive:{id:31},
      colors: { blue: '#8498ff', red: '#ff6565',green:'#2ca752'},
      rows:6,
      randomplayers:{
          bankerNums:'',
          playerNums:'',
          tieNums:'',
          vid:'',
          roundCount:''    
      },
      tableplaysers:{
          money:'',
          peopleNum:'',
          vid:'',
      },
      randomTimer:null,
      gamblingList:[],
      datas:{
         initdata:[],
         lastdata:[], 
      },
      table:[],
      randomtable:[],
      maskGame:[
        { img1: '/static/pjdc/img/home/mask2.png',img2:'/static/pjdc/img/home/mask2-hover.png', name: 'AG', id: 31, index: 0 },
        { img1: '/static/pjdc/img/home/mask3.png',img2:'/static/pjdc/img/home/mask3-hover.png', name: 'BBIN', id: 32, index: 1 },
        { img1: '/static/pjdc/img/home/mask4.png',img2:'/static/pjdc/img/home/mask4-hover.png', name: 'BG', id: 3180, index: 3 },
        { img1: '/static/pjdc/img/home/mask5.png',img2:'/static/pjdc/img/home/mask5-hover.png', name: 'DG', id: 42, index: 4 },
      ],
    };
  },
  methods: {
    timeStart() {
      let Countdown = 72;
      this.timer = setInterval(() => {
        Countdown--;
        if (Countdown >= 0) {
          let mm = Math.floor(Countdown / 60) < 10 ? "0" + Math.floor(Countdown / 60) : Math.floor(Countdown / 60);
					let ss = Number(Countdown % 60) < 10 ? "0" + Number(Countdown % 60) : Number(Countdown % 60) ;
					this.countDown = mm + ":" + ss
        } else {
          clearInterval(this.timer);
          this.timeStart();
        }
      }, 1000);
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
        },(1+Math.round(Math.random()*10))*1000)   
    },
    handleData(){
        if(this.gamblingList){
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
                     if(linewardArr<6){
                       for(let j=1;j<=6-linewardArr;j++){
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
                      if(lastArr<6){
                        for(let j=1;j<=6-lastArr;j++){
                              last.push({})
                        }
                      }
                      recieveForWard.push({list:last})
                }
          })
          if(recieveForWard.length>12) recieveForWard.splice(0,11)
          this.handleTurn(recieveForWard)
        } 
    },
    handleTurn(recieveForWard){ 
            let turnArr=[]
            let span=-1
            recieveForWard.forEach((item,v)=>{
               let spliceArr=[]
               if(item.list.length > 6 && !turnArr.length && span === -1){
                     spliceArr = item.list.splice(6, item.list.length - 6)
                     turnArr.push({list: spliceArr, index: v, length: 6})
                     item.list.splice(6, item.list.length - 6)
                     span = v
               }else if(item.list.length > 5 && turnArr.length && span !== -1 &&
                     turnArr[0].list.length + span >= v){
                     spliceArr = item.list.splice(5, item.list.length - 5)
                     turnArr.push({list: spliceArr, index: v, length: 5})
                     item.list.splice(5, item.list.length - 5)
                     span = v 
               }else if(item.list.length > 6 && turnArr.length && span !== -1){
                     spliceArr = item.list.splice(6, item.list.length - 6)
                     turnArr.push({list: spliceArr, index: v, length: 6})
                     item.list.splice(6, item.list.length - 6)
                     span = v
               }
            }) 
            this.datas.lastdata=recieveForWard
            if(!turnArr.length){
                if(this.datas.lastdata.length>12) this.datas.lastdata.splice(0,12)
                this.canvas=this.$refs.canvas
                this.refreshCanvas()
               return false
            }
            turnArr.forEach((item,j)=>{
                if(item.length==6){
                     for (let k = 0; k < item.list.length; k++) {
                        if (!this.datas.lastdata[item.index + k + 1]) {
                            return false
                        }
                        this.datas.lastdata[item.index + k + 1]['list'][5] = item.list[k]
                    }
                }else if(item.length==5){
                     for (let k = 0; k < item.list.length; k++) {
                        if (!this.datas.lastdata[item.index + k + 1]) {
                          return false
                        }
                        this.datas.lastdata[item.index + k + 1]['list'][4] = item.list[k]
                    }
                }
            }) 
            if(this.datas.lastdata.length>12) this.datas.lastdata.splice(0,12)
            this.canvas=this.$refs.canvas
            this.refreshCanvas() 
            
    },
    refreshCanvas(){
       this.$nextTick(()=>{
          if(this.canvas){
           const context = this.canvas.getContext('2d')
           context.clearRect(0, 0, 554, 280)
           context.width=554
           context.height=280
           context.scale(2,2);
           const width=277
           const height=140
           context.strokeStyle = this.borderColor
           context.translate(-0.5,-0.5);
           context.lineWidth = 1
           context.beginPath()
           context.moveTo(0, 1)
           context.lineTo(width,1)
           for (let i = 0; i < this.rows; i++) {
              const y = (i + 1) *23 + 1
              context.moveTo(0.5, y)
              context.lineTo(276.5, y)
           }
           context.moveTo(1, 0)
           context.lineTo(1, 139.5)
           for (let i = 0; i < 12; i++) {
            const x = (i + 1) * 23 + 1
            context.moveTo(x, 0.5)
            context.lineTo(x, 139.5)
           }
           context.stroke()
           for(let x=0;x<this.datas.lastdata.length;x++){
              for(let y=0;y<this.datas.lastdata[x].list.length;y++){
                   const val=this.datas.lastdata[x].list[y]
                   if(val.lineColor){
                        context.beginPath()
                        context.textAlign = 'center'
                        context.strokeStyle = val.lineColor
                        context.fillStyle = val.lineColor
                        context.lineWidth=1.5
                        const pX=23*x+12.5
                        const pY=23*y+12.5
                        context.arc(
                            pX,
                            pY,
                            9,
                            0,
                            2 * Math.PI)
                      context.stroke()
                      if(!val.banker){
                          context.strokeStyle = this.colors.green
                          context.lineWidth = 2
                          context.beginPath()
                          context.moveTo(x*23+0.5, (y+1)*23-0.5)
                          context.lineTo((x+1)*23,y*23+1)
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
  created() {
    this.timeStart(this.time);
   
  },
  mounted(){
    this.getCanDatas()
    setTimeout(()=>{
      this.changDatas()
    },5000)
  },
  destroyed(){
      this.changDatas()
  }
};
</script>

<style lang="less" scoped>
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
.animationName(@name,@time){
  animation-delay:2s;
  animation: @name 0.5s @time 1;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode:forwards;
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

.yellow {
  color: #ffd656;
}
.blue {
  color: #18f1ff;
}
.green {
  color: #42ff34;
}

.quickGame {
  max-width: 1200px;
  margin: 20px auto 0;
  font-family: Microsoft YaHei !important;
  & > div {
    position: relative;
    margin-right: 10px;
    width: 450px;
    height: 266px;
    .hot {
      position: absolute;
      right: -8px;
      top: -8px;
    }
    .title {
      position: absolute;
      left: 32px;
      top: 28px;
      .left-icon {
        img {
          vertical-align: middle;
        }
      }
      .right-text {
        margin-left: 12px;
        .name {
          font-size: 22px;
          color: #fff;
        }
        .introdu {
          margin-top: 8px;
          font-size: 12px;
          color: #f49f99;
        }
      }
    }
    .btn {
      position: absolute;
      width: 122px;
      height: 36px;
      line-height: 34px;
      text-align: center;
      font-size: 16px;
      color: #f5d065;
      border: 1px solid #ecbc49;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.3s linear;
      &:hover {
        transform: scale(1.06);
        background: linear-gradient(180deg, #ecbc49, #ffe4a5);
        color: #5d1a14;
        border: none;
      }
    }
  }
  .quickGame-1 {
    background: url("/static/pjdc/img/home/quickgame-bg1.png") no-repeat;
    left: -2000px;
    &.slideLeft{.animationName(slideLeft,.2s)}
    .keyFrames(slideLeft,-2000px,0);
    .text {
      position: absolute;
      left: 26px;
      top: 112px;
      font-size: 20px;
      color: #f49f99;
    }
    .btn {
      left: 26px;
      bottom: 50px;
    }
    .mask {
      position: absolute;
      display: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(31,4,6,.9);
      .mask-cont {
        overflow: hidden;
          .mask-area {
            float: left;
            width: 90px;
            margin-left: 18px;
            margin-top: 82px;
            cursor: pointer;
            .top-img{
              width: 90px;
              height: 60px;
              border:1px solid #ae535a;
              border-radius: 4px;
              img {
                margin: 14px auto 0;
                display: block;
              }
              .img1 {
                display: block;
              }
              .img2 {
                display: none;
              }
            }
            .game-name{
              text-align: center;
              font-size: 18px;
              margin-top: 6px;
              color: #fff;
            }
            &:hover {
              .top-img {
                border: 1px solid #ecbc49;
                .img1 {
                  display: none;
                }
                .img2 {
                  display: block;
                }
              }
              .game-name {
                color: #f5d065;
              }
            }
          }
        }
        .more-game{
          display: block;
          position: absolute;
          bottom: 34px;
          left: 155px;
          width: 146px;
          height: 34px;
          line-height: 34px;
          border-radius: 15px;
          border: 1px solid #ecbc49;
          font-size: 16px;
          text-align: center;
          color: #f5d065;
          cursor: pointer;
          transition: all 0.3s linear;
          &:hover {
            transform: scale(1.06);
            background: linear-gradient(180deg, #ecbc49, #ffe4a5);
            color: #50080f;
            border: none;
          }
        }
        .mask1 {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%)
        }
    }
    &:hover {
      .mask{
        display: block;
      }
    }
  }
  .quickGame-2 {
    background: url("/static/pjdc/img/home/quickgame-bg2.png") no-repeat;
    top: 2000px;
    &.slideTop1{.animationName(slideTop1,0.6s)}
    .keyFrames3(slideTop1,2000px,0);
    .text {
      position: absolute;
      top: 104px;
      left: 11px;
      color: #f49f99;
      font-size: 14px;
      .time {
        font-size: 28px;
        font-weight: 400;
        color: #fff;
      }
      & > div {
        margin-bottom: 8px;
      }
    }
    .btn {
      right: 16px;
      top: 30px;
      a {
        color: #f5d065;
      }
      &:hover a {
        color: #2a0a0e;
      }
    }
    .game {
      position: absolute;
      bottom: 32px;
      left: 11px;
      .a3 {
        display: inline-block;
        width: 40px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        background-color: #ea5b51;
        margin-right: 4px;
        font-size: 14px;
      }
      .game-name {
        font-size: 14px;
        color: #f49f99;
      }
    }
    .canvas{
        // zoom: 0.5;
        // overflow: hidden;
        transform:scale(0.5);
        -ms-transform:scale(0.5);
        -moz-transform:scale(0.5);
        -moz-transform-origin:bottom right;
        -webkit-transform-origin:bottom right; 
        -ms-transform-origin:bottom right; 
        position: absolute;
        right: 13px;
        bottom: 16px;
        .ball-canvas{
          // transform:scale(.5);
          display: table;
          white-space: nowrap;
          min-width: 100%;
        }
    }
  }
  .quickGame-3 {
    background: url("/static/pjdc/img/home/quickgame-bg3.png") no-repeat;
    width: 280px;
    right: -2000px;
    &.slideRight1{.animationName(slideRight1,0.4s)}
    .keyFrames2(slideRight1,-2000px,0);
    .quickEnter {
      position: absolute;
      right: 8px;
      text-align: right;
      .tableNumber {
        color: #ffffff;
        font-size: 16px;
      }
      .tablePerson {
        margin-top: 6px;
        font-size: 12px;
        color: #f49f99;
      }
      .tableBtn {
        display: block;
        margin-top: 6px;
        width: 94px;
        height: 32px;
        text-align: center;
        line-height: 30px;
        border-radius: 16px;
        color: #f5d065;
        border: 1px solid #ecbc49;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s linear;
        &:hover {
          transform: scale(1.06);
          background: #cb232f;
          color: #fff; 
          border: none;
        }
      }
    }
    .quickEnter1 {
      top: 75px;
    }

    .quickEnter2 {
      top: 164px;
    }
    .money1{
        position: absolute;
        left: 71px;
        top:101px;
        color: #ffe12e;
        font-size: 13px;
    }
    .money2{
        position: absolute;
        left: 71px;
        top:197px;
        color: #ffe12e;
        font-size:13px; 
    }
    .bg3-hot {
      position: absolute;
      right: -9px;
      top: -8px;
    }
  }
  & > div:last-child {
    margin-right: 0;
  }
}
</style>