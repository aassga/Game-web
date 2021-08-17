<template>
    <div class="filter"  v-if="showRedpackets">
            <!-- <transition name="bounce"> -->
                    <div class="red-box">
                        <!-- <div class="close" @click="close"></div> -->
                        <div class="red-top"></div>
                        <div class="red-cont">
                        <div class="jinbi-cont" ref="jinbi">
                        </div>
                        <p class="text">恭喜您在【{{ kaijiangObj.lotteryName }}】击中奖池</p>
                        <p class="money">{{kaijiang}}<span>元</span></p>
                        <p class="balance">已放入您的帐户余额</p>
                        <div class="ikonw" @click="close"></div>
                        <div id='leafContainer' ref="leaf">
                        </div>
                       </div>
                   </div>
            <!-- </transition>   -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                 lotteryDatasSave:[6,1,3,7,9,8,2],
                 kaijiangInter:null,
                 kaijiangObj:{
                      lotteryName:'',
                      amount:'',
                 },
                 kaijiang:'',
                 showRedpackets:false,
                 NUMBER_OF_LEAVES: 30,
                 width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)/2,
            }
        },
        mounted() {
          
          
        },
        created(){
          
        },
        destroyed(){
          clearInterval(this.kaijiangInter)
        },
        computed:{
            websocketdata() {
                return this.$store.state.mainState.prizePool
            },
            visibStatus(){
                 return this.$store.state.mainState.visibStatus
            }

        },
        watch:{
            websocketdata(){
                 this.websoc()
            },
            'showRedpackets':function(){
                if(this.showRedpackets&&this.visibStatus){
                    this.init()
                    this.$store.commit('mainState/changeNotice',false) 
                    this.kaijiangInter=setInterval(()=>{
                    let length = this.lotteryDatasSave.length
                    while (length) {
                    let j = Math.floor(Math.random() * length--);
                    [this.lotteryDatasSave[j], this.lotteryDatasSave[length]] = [this.lotteryDatasSave[length], this.lotteryDatasSave[j]]
                    }
                    let lotteryDatasShow = []
                    for (let index = 0; index < 7; index++) {
                            lotteryDatasShow.push(this.lotteryDatasSave[index])
                    }
                    let data=''
                    lotteryDatasShow.forEach((item)=>{
                            data+=item
                    })
                    this.kaijiang=data
                    },100)
                    setTimeout(()=>{
                        clearInterval(this.kaijiangInter)
                        this.kaijiang=this.kaijiangObj.amount
                    },3000)
                }
            },
        },
        methods: {
            websoc(){
                 if(this.websocketdata.type=='user.prizePool'){
                      if(this.websocketdata.data.amount!=''){
                            for(var key in this.kaijiangObj){
                                this.kaijiangObj[key]=this.websocketdata.data[key]
                            }
                            this.showRedpackets=true
                            if(this.visibStatus) this.showRedpackets=true
                            else this.showRedpackets=false
                      }
                 }
            },
             getBalance() {
                if (localStorage.token) {
                this.$getS(`member/balance`).then(res => {
                    if (res.code == 200) {
                    let userinfo = JSON.parse(localStorage.userinfo)
                    userinfo.balance = res.data.member
                    userinfo.agent = res.data.agency
                    this.$store.commit('mainState/reloadUserinfo', userinfo)
                    }
                  })
                }
            },
            close(){
                this.showRedpackets=false
                this.$store.commit('mainState/changeNotice',true) 
                this.getBalance()
                clearInterval(this.kaijiangInter)
            },
            init() {
                this.$nextTick(()=>{
                    var container = this.$refs['leaf']
                    for (var i = 0; i < this.NUMBER_OF_LEAVES; i++) {
                        container.appendChild(this.createALeaf());
                    }
                    var jinbi = this.$refs['jinbi'];
                    for (let index = 0; index < 10; index++) {
                        jinbi.appendChild(this.createdJinBi())
                        jinbi.appendChild(this.createdHongBao())
                        
                    }
                })
            }, 
            randomInteger(low, high) {
               return low + Math.floor(Math.random() * (high - low));
             },
            randomFloat(low, high) {
                return low + Math.random() * (high - low);
            },
            pixelValue(value) {
                return value + 'px';
            },

            durationValue(value) {
                return value + 's';
            },
            createALeaf() {
                var leafDiv = document.createElement('div');
                var image = document.createElement('img');
                let num=this.randomInteger(3, 7)
                image.src = ('/static/public/image/open/money' + num + '.png');
                leafDiv.style.top = '-100px';
                leafDiv.style.position = 'absolute';
                leafDiv.className='leaf'+num
                leafDiv.style.left = this.pixelValue(this.randomInteger(25, 355));
                image.className='leafimg'+num
                var fadeAndDropDuration = this.durationValue(this.randomFloat(5, 10));
                var spinDuration = this.durationValue(this.randomFloat(3, 9));
                 leafDiv.style.animation='fade '+ fadeAndDropDuration +' linear 1s infinite normal'
                 leafDiv.style.animation='drop '+ fadeAndDropDuration +' ease-in 1s infinite normal'
                if((Math.random() < 0.5)) image.style.animation='clockwiseSpin spinDuration ease-in-out infinite alternate'
                else image.style.animation='counterclockwiseSpinAndFlip spinDuration ease-in-out infinite alternate'
                image.style.transformOrigin = '50% -100%';
                leafDiv.appendChild(image);
                return leafDiv;
           },
            createdJinBi() {
                var iTag = document.createElement('i')
                iTag.style.width = '45px'
                iTag.style.height = '39px'
                iTag.style.position = 'absolute'
                iTag.style.display = 'inline-block'
                iTag.style.left = this.pixelValue(this.randomInteger(15, 345));
                iTag.style.top = '-100px'
                iTag.style.backgroundImage = "url('/static/public/image/open/jinbi.png')"
                iTag.style.backgroundSize ='100%'
                iTag.style.backgroundRepeat = 'no-repeat'
                iTag.style.backgroundPosition = 'center'
                var fadeAndDropDuration = this.durationValue(this.randomFloat(5, 10));
                 iTag.style.animation='fade '+ fadeAndDropDuration +' linear 2s infinite normal'
                 iTag.style.animation='drop '+ fadeAndDropDuration +' ease-in 2s infinite normal'
                return iTag
           },
            createdHongBao() {
                var imgTag = document.createElement('img')
                imgTag.src = ('/static/public/image/open/hongbao.png')
                imgTag.style.position = 'absolute'
                imgTag.style.left = this.pixelValue(this.randomInteger(15, 345));
                imgTag.style.top = '-100px';
                imgTag.style.width = '34px'
                imgTag.style.height = '37px'
                imgTag.style.backgroundSize = '100%'
                imgTag.style.backgroundRepeat = 'no-repeat'
                imgTag.style.backgroundPosition = 'center'
                var fadeAndDropDuration = this.durationValue(this.randomFloat(5, 10));
                imgTag.style.animation='fade '+ fadeAndDropDuration +' linear 2s infinite normal'
                imgTag.style.animation='drop '+ fadeAndDropDuration +' ease-in 2s infinite normal'
                return imgTag
        }
        },
    }
</script>
<style lang='less'>  
    .bounce-enter-active {
      animation: bounce-in .5s;
    }

    .bounce-leave-active {
       animation: bounce-in .5s reverse;
    }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
   @keyframes hezi-on {
    from {
        transform: translate(0px, 29px);
    }

    to{
        transform: translate(0, 9px);
    }
   }
   @keyframes dous-b {
    from {
        transform:rotate(6deg)  translate(0, 9px);
        transform-origin: center;
    }

    to{
        transform:rotate(-6deg) translate(0, 9px);
        transform-origin: center;
    }
   }
@keyframes fade {
    0% {
        opacity: 1;
    }

    95% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes drop {
    0% {
        transform: translate(0px, 0px);
        -ms-transform: translateX(0px, 0px);
        -moz-transform: translateX(0px, 0px);
        -webkit-transform: translateX(0px, 0px);
        -o-transform: translateX(0px, 0px);
    }

    100% {
        transform: translate(0px, 300px);
        -ms-transform: translateX(0px, 300px);
        -moz-transform: translateX(0px, 300px);
        -webkit-transform: translateX(0px, 300px);
        -o-transform: translateX(0px, 300px);
    }
}

@keyframes clockwiseSpin {
    0% {
        transform: rotate(-50deg);
    }

    100% {
        transform: rotate(50deg);
    }
}

@keyframes counterclockwiseSpinAndFlip {
    0% {
        transform: scale(-1, 1) rotate(50deg);
    }

    100% {
        transform: scale(-1, 1) rotate(-50deg);
    }
}
@keyframes scaleDraw {
    from{
        transform :scale(0)
    }

    to{
        transform: scale(1)
    }
}
</style>

<style lang='less' scoped>
.filter{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center; 
    .red-box{
         width: 395px;
         height: 503px;
         position: relative;
        //  border: 1px solid red;
        //  .close{
        //     width:51px;
        //     height: 50px;
        //     position: absolute;
        //     right: 0;
        //     top:0;
        //     background-image:url('/static/public/image/open/close.png');
        //     background-size: 100%;
        //     background-repeat: no-repeat;
        //     background-position: center;  
        //     cursor: pointer;
        //  }
         .red-top{
            width: 346px;
            height: 105px;
            margin: 0px 24.5px 0 24.5px;
            background-image:url('/static/public/image/open/gaizi.png');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;  
            animation:hezi-on 0.6s ease-in 1s 1 normal;
            animation:dous-b 0.6s linear 1.5s infinite alternate;
            // animation-name: hezi-on , dous-b;
            // animation-duration: 0.6s ,0.6s;
            // animation-delay: 1s , 1.5s;
            // animation-iteration-count: 1 ,infinite;
            // animation-fill-mode: forwards ,forwards;
            // animation-direction: normal ,alternate;
            // animation-timing-function: ease-in, linear;
         }
         .red-cont{
              width: 395px;
              height: 398px;
              margin:auto;
              background-image:url('/static/public/image/open/hezi.png');
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center; 
              position: relative;
              overflow: hidden; 
              .text{
                margin-top: 66px;
                text-align: center;
                font-size: 18px;
                color: #E48428; 
              }
              .money{
                color:#F7211E;
                text-align: center; 
                margin-top: 32px;
                font-size: 45px;
                 >span{
                   font-size: 26px;
                   margin-left: 6px;
                }
              }
              .balance{
                text-align: center; 
                margin-top: 59px;
                font-size: 18px;
                font-weight: normal;
                color: #F7211E; 
              }
              .ikonw{
                position: absolute;
                width: 275px;
                height: 57px;
                left: 60px;
                bottom:60px;
                // margin: 41.5px auto 0 auto;
                background-image: url('/static/public/image/open/button.png');
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
                z-index: 2060;
                cursor: pointer;
            }
         }
          #leafContainer , .jinbi-cont {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
                left: 0;
                top: 0;
                z-index:2050
                .leaf3{
                     width:36px;
                     height: 19px;
                     .leafimg3{
                          width:36px;
                          height: 19px;
                     }
                }
                .leaf4{
                     width:28px;
                     height: 14px;
                     .leafimg4{
                          width:28px;
                          height: 14px;
                     }
                }
                 .leaf5{
                     width:24px;
                     height: 19px;
                     .leafimg5{
                          width:24px;
                          height: 1px;
                     }
                 }
                 .leaf6{
                     width:14px;
                     height:21px;
                     .leafimg6{
                          width:14px;
                          height:21px;
                     }
                }                       
         }
    }
}

</style>