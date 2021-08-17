const Canvas={
     data () {
         return {
           canvas:null,
           randomTimer:null,
           borderColor:"#424242",
           colors: { blue: '#6e8df8', red: '#dd5566',green:'#22ac38'},
           gamblingList:[],
           table:[],
           randomtable:[],
           randomData:[],
           datas:{
            initdata:[],
            lastdata:[], 
          },
          canvasArry:['canvas1','canvas2','canvas3'],
          randomplayers:{
            bankerNums:'',
            playerNums:'',
            tieNums:'',
            vid:'',
            roundCount:''    
          },
          canvasData:[],
          randomIndex:0,
         }
     },
     mounted () {
        this.getCanDatas()
        setTimeout(()=>{
            this.changDatas()
        },5000)
     },
     methods: {
        async getCanDatas(){
            let res = await this.$http.post(`${this.$HOST_NAME}/getGamblingList`);
            if(res && res.code == 200){
                this.gamblingList=res.data.gamblingList
                this.table=res.data.table
                this.canvas=this.$refs.canvas1
                this.handleData()
                setTimeout(()=>{
                    this.canvas=this.$refs.canvas2
                    this.handleData()
                },300)
                setTimeout(()=>{
                    this.canvas=this.$refs.canvas3
                    this.handleData()
                },500)
            }
        },
        changDatas(){
            clearInterval(this.randomTimer);
            this.randomTimer = null;
            this.randomTimer=setInterval(()=>{
                 this.randomIndex=Math.floor(Math.random()*100+1)
                 if(this.randomIndex<=30)  this.canvas=this.$refs.canvas1
                 else if(this.randomIndex<=70) this.canvas=this.$refs.canvas2
                 else this.canvas=this.$refs.canvas3
                 this.handleData()
            },(3+Math.round(Math.random()*10))*1200)   
        },
        handleData(){
            if(this.gamblingList.length>0){
                  let random=Math.floor(Math.random()*(this.gamblingList.length-1)+1)
                  let random1=Math.floor(Math.random()*(this.table.length-1)+1)
                  this.randomData=this.gamblingList[random].roundRes
                  this.randomtable=[]
                  let randomcavas={ bankerNums:'',playerNums:'',tieNums:'',vid:'',roundCount:''}
                  for(var key in this.randomplayers){
                      randomcavas[key]=this.gamblingList[random][key]
                  }
                  if(this.canvas==this.$refs.canvas1) this.$set(this.canvasData,0, this.gamblingList[random])
                  else if(this.canvas==this.$refs.canvas2) this.$set(this.canvasData,1, this.gamblingList[random])
                  else this.$set(this.canvasData,2, this.gamblingList[random])
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
              if(recieveForWard.length>16) recieveForWard.splice(0,16)
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
                     item.list.splice(6, item.list.length - 5)
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
                if(this.datas.lastdata.length>16) this.datas.lastdata.splice(0,16)
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
            if(this.datas.lastdata.length>16) this.datas.lastdata.splice(0,16)
            this.refreshCanvas() 
         },
          refreshCanvas(){
            this.$nextTick(()=>{
                const context = this.canvas.getContext('2d') 
                context.clearRect(0, 0, 706, 266)
                context.width=706
                context.height=266
                context.scale(2,2);
                const width=353
                const height=133
                context.strokeStyle = this.borderColor
                context.translate(-0.5,-0.5);
                context.lineWidth = 1
                context.beginPath()
                context.moveTo(0, 1)
                context.lineTo(width,1)
                for (let i = 0; i < 6; i++) {
                    const y = (i + 1) *22 + 1
                    context.moveTo(0.5, y)
                    context.lineTo(353.5, y)
                }
                context.moveTo(1, 0)
                context.lineTo(1, 133.5)
                for (let i = 0; i < 16; i++) {
                  const x = (i + 1) * 22 + 1
                  context.moveTo(x, 0.5)
                  context.lineTo(x, 133.5)
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
                            const pX=22*x+11.5
                            const pY=22*y+11.5
                            context.arc(
                                    pX,
                                    pY,
                                    8,
                                    0,
                                    2 * Math.PI)
                            context.stroke()
                            if(!val.banker){
                                context.strokeStyle = this.colors.green
                                context.lineWidth = 2
                                context.beginPath()
                                context.moveTo(x*22+0.5, (y+1)*22-0.5)
                                context.lineTo((x+1)*22,y*22+1)
                                context.stroke()
                            }
                        }
                    }
                }
                context.translate(0.5,0.5);
                context.scale(0.5,0.5);
            })
        } 
     }
}
export default Canvas