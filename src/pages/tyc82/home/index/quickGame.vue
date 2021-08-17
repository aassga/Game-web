<template>
  <div class="quickGame">
    <div class="liveGame">
      <p v-for="(item,index) in liveGameList" class="borderHover" :key="index" @click="$loginGame(item)">
        <span class="fontBg"></span>
        <i>
          <span class="live_icon"><img :src="item.icon"></span>
          <span class="name_title">{{item.name}}</span>
          <span>{{item.title}}</span>
          <a class="joinGame joinGame2" @click="$loginGame(item)">进入游戏</a>
        </i>
      </p>
    </div>
    <div class="slotGame">
        <ul>
          <li v-for="(item,index) in slotGameList" class="borderHover" :key="index" @click="$loginGame(item)">
            <span class="modelBg" :class="item.className"></span>
            <div>
              <span class="icon_name"><img :src="item.icon"></span>
              <span>{{item.name}}</span>
              <span>{{item.title}}</span>
              <a class="joinGame" @click="$loginGame(item)">进入游戏</a>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
export default {
  data() {
    return {
      gameIndex:0,
      gameIndex2:0,
      liveGameList:[
        {name:"AG女优厅",title:"最顶尖的真人视讯平台，美女荷官在线发牌，画面真实高清...",icon:"/static/tyc82/img/27.png",id:31},
        {name:"BBIN波音厅",title:"亚洲最顶级的真人视讯平台，亿万玩家首选，性感女优...",icon:"/static/tyc82/img/26.png",id:32}
      ],
      slotGameList:[
        {name:"BG大游厅",title:"BG GAME",id:3180,className:"BG",icon:"/static/tyc82/img/25.png",},
        {name:"WM贵宾厅",title:"WM GAME",id:12035,className:"WM",icon:"/static/tyc82/img/12035.png",},
        // {name:"OG东方厅",title:"OG GAME",id:48,className:"OG",icon:"/static/tyc82/img/27.png",},
        {name:"DG梦幻厅",title:"DG GAME",id:42,className:"DG",icon:"/static/tyc82/img/24.png",},
        {name:"eBET易博厅",title:"eBET GAME",id:43,className:"eBET",icon:"/static/tyc82/img/23.png",},
        // {name:"VR彩票厅",title:"VR GAME",id:3180,className:"VR",icon:"/static/tyc82/img/27.png",}
      ]
    };
  },
  methods: {
    changeIndex(i){
      this.gameIndex = i;
    },
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
  created() {},
  mounted(){},
  destroyed(){}
};
</script>

<style lang="less" scoped>
.quickGame {
  max-width: 1200px;
  margin: 20px auto 0;
  font-family: Microsoft YaHei !important;
  display: flex;
  flex-wrap: nowrap;
  .borderHover:hover{
    border: 1px solid #f8ce5a;
    overflow: hidden;
    .joinGame{
      color: #000;
      background: url("/static/tyc82/img/29.png") no-repeat;
    }
  }
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &:first-child{
      position:relative;
      left:-2000px;
      display: flex;
      flex-direction: column;
      p{
        width: 600px;
        height: 185px;
        cursor: pointer;
        border: 1px solid transparent;
        .name_title{
          font-size: 24px;
          color: #fff;
          position: absolute;
          top: 24px;
          left: 90px;
        }
        .live_icon{
          position: absolute;
          left: 0;
          top: 13px;
        }
        i{
          display: block;
            width: 300px;
            height: 185px;
            position: absolute;
            right: 0;
          span{
            font-size: 12px;
            color: #8c8c8c;
            position: absolute;
            top: 56px;
            line-height: 25px;
            text-align: left;
            left: 18px;
          }
        }
        &:first-child{
          background: url('/static/tyc82/img/31.png') -1px no-repeat;
          position: relative;
          
        }
        &:last-child{
          background: url('/static/tyc82/img/32_1.png') -1px no-repeat;
          position: relative;
          top: -15px;
        }
        .fontBg{
          display: inline-block;
          height: 185px;
          width: 295px;
          position: absolute;
          right:0px;
          top: -1px;
          background: url('/static/tyc82/img/AG_bg.jpg')
        }
        span{
          display: block;
          width: 70%;
          text-align: center;
          font-size:13px;
          color: #878787;
          &:first-child{
            color: #fff;
            font-size:18px;
          }
        }
      }
    }
    &:last-child{
      position:relative;
      right:-2000px;
      ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li{
          width: 285px;
          height: 185px;
          margin: 0 0 15px 13px;
          background: url('/static/tyc82/img/BG_bg.jpg') no-repeat;
          cursor: pointer;
          color: #fff;
          border: 1px solid transparent;
          position: relative;
          .modelBg{
            width: 285px;
            height: 185px;
            position: absolute;
            top: -2px;
          }
          .icon_name{
            margin-top: 10px;
          }
          div{
            position: absolute;
            width: 200px;
          }
          span{
            display: block;
            width: 60%;
            text-align: center;
            font-size:13px;
            color: #878787;
            &:nth-child(1){

            }
            &:nth-child(2){
              color: #fff;
              font-size:18px;
              padding: 19px 0 12px 0;
            }
          }
          .BG{
            background: url('/static/tyc82/img/BG.png') 110px 0 no-repeat
          }
          .DS{
            background: url('/static/tyc82/img/DS.png') 110px 0 no-repeat
          }
          .WM{
            background: url('/static/tyc82/img/DS.png') 110px 0 no-repeat
          }
          .OG{
            background: url('/static/tyc82/img/OG.png') 110px 0  no-repeat
          }
          .DG{
            background: url('/static/tyc82/img/DG.png') 110px 0  no-repeat
          }
          .eBET{
            background: url('/static/tyc82/img/eBET.png') 110px 0 no-repeat
          }
          .VR{
            background: url('/static/tyc82/img/VR.png') 110px 0 no-repeat
          }
        }
      }
    }
  }
  .joinGame{
    display: inline-block;
    height: 32px;
    width: 95px;
    color: #fed969;
    font-size: 14px;
    cursor: pointer;
    margin: 16px 0 0 19px;
    text-align: center;
    line-height: 31px;
    background: url("/static/tyc82/img/30.png") no-repeat;
    &:hover{
      color: #000;
      background: url("/static/tyc82/img/29.png") no-repeat;
    }
  }
  .joinGame2{
    position: absolute;
    top: 124px;
    left: 10px;
  }
  .changeBorder{
    border: 1px solid #fce470!important;
    
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
  .liveGame{.animationName(liveGame,0.8s)}
  .keyFrames(liveGame,-2000px,0);

  .slotGame{.animationName(slotGame,0.8s)}
  .keyFrames2(slotGame,-2000px,0);
}
</style>