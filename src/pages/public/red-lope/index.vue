<template>
<div class="filter"  v-if="isRedShow">
<transition name="bounce">
    <!-- 砸金蛋 redLopeType = 2 -->
    <div v-if="$store.state.home.redLopeType == 2" class="red-box egg"> 
        <div class="box-wrap">
            <div class="preloadImg"></div>
            <!-- <div class="red-close-btn" @click="close"></div> -->
            <div class="red-close" @click="openEgg" v-if="!isMoney" :class="isOpen ? 'open_red':''">
            </div>
            <div v-show='isMoney'>
                <div class="red-open">
                    <p class="get-money" :style="[$store.state.home.redLopeMoney.toString().length>5 ? {fontSize:'40px'}:'']">{{$store.state.home.redLopeMoney}}元</p>
                    <div class="getMoney" @click="getMoney"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- 大紅包 redLopeType = 1 || 0 || default -->
    <div v-else class="red-box hongbao">
        <div class="red-close"  v-if="!isMoney" :class="isOpen ? 'open_red':''">
            <div @click="openHongbao"></div>
            <div class="red-close-btn" @click="close"></div>
        </div>
        <div class="red-open" v-show='isMoney'>
            <div class="red-open-jb" ref="openJb">
                <span class="jb1"></span>
                <span class="jb2"></span>
                <span class="jb3"></span>
            </div>
            <div class="red-open-zb" ref="openZb">
                <span class="zb1"></span>
                <span class="zb2"></span>
                <span class="zb3"></span>
                <span class="zb4"></span>
                <span class="zb5"></span>
            </div>
            <p class="get-money">{{$store.state.home.redLopeMoney}}</p>
            <div class="red-close-btn" @click="close"></div>
            <div class="getMoney" @click="getMoney"></div>
        </div>
    </div>
</transition>
</div>
</template>
<script>
export default {
    name:'RedLope',
    props:{
        isRedShow :{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: false,
            isMoney: false,
            redMoney:1000
        }
    },
    methods:{
         close(){
            this.$store.commit('home/getisRedLop',false)
            localStorage.removeItem('relope') 
            this.isOpen = false
            this.isMoney = false
         },
         openHongbao(){
            this.$nextTick(()=>{
               this.isOpen = true
               setTimeout(() => {
                  this.isMoney = true 
               }, 1000);
               setTimeout(() => {
                   this.$refs['openJb'].style.visibility = 'hidden'
               }, 2500);
               setTimeout(() => {
                   this.$refs['openZb'].style.visibility = 'hidden'
               }, 3500);
            })
        },
         openEgg(){
            this.$nextTick(()=>{
               this.isOpen = true
               setTimeout(() => {
                  this.isMoney = true 
               }, 2800);
            })
        },
        
        getMoney(){
            this.$store.dispatch('home/getQipaiShouyeHongbaoLingqu', this.$store.state.home.redLopeId).then(res=>{
                if(res.code === 200) {
                    this.$store.dispatch('mainState/reloadBalance')
                    this.close()
                    setTimeout(()=>{
                       this.getRedLope()
                    },1000)
                }
            })
        },
        getRedLope(){
            this.$store.dispatch('home/getQipaiShouyeHongbao').then(res=>{
            if(res.code === 200){
                try{
                    this.$store.commit('home/getRedLopeMoney',res.data.gift_money)
                    this.$store.commit('home/getRedLopeId',res.data.id)
                    this.$store.commit('home/getRedLopeType',res.data.send_type)
                }catch(error){
                    this.$store.commit('home/getRedLopeMoney', 0)
                }
                this.$store.commit('home/getisRedLop',true)
            }
          })
        },
    },
    beforeDestroy() {
        this.close()
    }
}
</script>
<style lang="less">
.bounce-enter-active {
    animation: bounce-in 0s;
}
.bounce-leave-to{
    animation: bounce-in 1s reverse !important;
}
.bounce-leave-active {
    animation: bounce-in 1s reverse;
}
.bounce-leave-active.filter{
    background-color: transparent !important;
}

// egg
@keyframes openRedEgg1Hammer {
    0% {
        visibility: visible;
        
    }
    0%, 50% {
        transform: rotate(0);
        right: 11px;
    } 
    25%, 75% , 100%{
        transform-origin: bottom right;
        transform: rotate(-10deg);
        right: 63px;
    }
    100%{
        visibility: hidden;
    }
} 
 
@keyframes openRedEgg1Bg {
    0% {
        background-image: url('/static/public/image/redlope/egg/close.png');
    }
    100%{
        background-image: none;
    }
} 
 
@keyframes openRedEgg2Bg {
    0% { 
        background-image: url('/static/public/image/redlope/egg/close.png');
    } 
    18%{
        background-image: url('/static/public/image/redlope/egg/5.png');
    }
    36%{
        background-image: url('/static/public/image/redlope/egg/6.png');
    }
    54%{
        background-image: url('/static/public/image/redlope/egg/7.png');
    }
    72%{
        background-image: url('/static/public/image/redlope/egg/8.png');
    }
    90%, 100%{
        background-image: url('/static/public/image/redlope/egg/9.png');
    }
}

 
@keyframes openRedEgg3Bg {
    0% { 
        background-image: url('/static/public/image/redlope/egg/10.png');
    } 
    6%, 48% {
        background-image: url('/static/public/image/redlope/egg/11.png');
    }
    12%, 54% {
        background-image: url('/static/public/image/redlope/egg/12.png');
    }
    18%, 60% {
        background-image: url('/static/public/image/redlope/egg/13.png');
    }
    24%, 66% {
        background-image: url('/static/public/image/redlope/egg/14.png');
    }
    30%, 72% {
        background-image: url('/static/public/image/redlope/egg/15.png');
    }
    36%, 78% {
        background-image: url('/static/public/image/redlope/egg/16.png');
    }
    42%, 84% {
        background-image: url('/static/public/image/redlope/egg/17.png');
    }
    90%, 100%{
        background-image: url('/static/public/image/redlope/egg/24.png');
    }
}


// hongbao
@keyframes scaleDraw {
    from{
        transform :scale(0)
    }

    to{
        transform: scale(1)
    }
}

@keyframes openRed {
    20%{
         transform :translate(-50%, -50%) scale(1.4,0.4)
    }
    40%{
        transform: translate(-50%, -50%) scale(1,1.2);
        transform-origin: bottom;
    }
    // 60%{
    //     transform: translate(-50%, -50%) scale(1,1);
    //     transform-origin: bottom;
    // }
    70%{
        transform: translate(-50%, -50%) scale(1,0.9);
        transform-origin: bottom;
    }
    100%{
        transform: translate(-50%, -50%) scale(1,1);
    } 
}
@keyframes roatejb{
    10%{
        transform:translateY(4px) rotateX(72deg)
    }
    20%{
        transform:translateY(8px) rotateX(144deg)
    }
    30%{
        transform:translateY(12px) rotateX(216deg)
    }
    40%{
        transform:translateY(16PX) rotateX(288deg)
    }
    50%{
        transform:translateY(20PX) rotateX(360deg);
    }
    60%{
        transform:translateY(24px) rotateX(432deg)
    }
    70%{
        transform:translateY(28px) rotateX(504deg)
    }
    80%{
        transform:translateY(32px) rotateX(576deg)
    }
    90%{
        transform:translateY(36PX) rotateX(648deg);
        opacity: 0.5;
    }
    100%{
        transform:translateY(40PX) rotateX(720deg);
        opacity: 0;
    }
}
@keyframes rotezb1{
    0%{
        transform:translateY(0) rotateY(0deg)
    }
    10%{
        transform:translateY(20px) rotateY(-80deg)
    }
    20%{
        transform:translateY(40px) rotateY(-10deg)
    }
    30%{
        transform:translateY(60PX) rotateY(70deg)
    }
    40%{
        transform:translateY(80PX) rotateY(-8deg);
    }
    50%{
        transform:translateY(100PX) rotateY(-70deg);
    }
    60%{
        transform:translateY(120PX) rotateY(3deg);
    }
    70%{
        transform:translateY(140PX) rotateY(60deg);
    }
    80%{
        transform:translateY(160PX) rotateY(-6deg);
    }
    90%{
        transform:translateY(180PX) rotateY(-50deg);
        opacity: 0.5;
    }
    100%{
        transform:translateY(200PX) rotateY(0deg);
        opacity: 0;
    }
}
</style>
<style lang="less" scoped>
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
        z-index: 10002;
    }
    .red-box {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 10002;
        animation: scaleDraw 1s ease-in-out 1;

        &.hongbao {
            
            .open_red{
                animation: openRed 1s cubic-bezier(0.72, 0.58, 0.93, 0.72) 1;
            }
            .red-close{
                width: 495px;
                height: 584px;
                background-image: url('/static/public/image/redlope/hongbao/1.png');
                background-size: 100%;
                background-repeat: no-repeat;
                top: 50%;
                left: 50%;
                position: relative;
                transform: translate(-50%, -50%);

                div:first-child{
                    width:160px;
                    height: 160px;
                    position: absolute;
                    left: 165px;
                    bottom:150px;
                    cursor: pointer;
                }
                .red-close-btn {
                    width: 69px;
                    height: 72px;
                    position: absolute;
                    right: -25px;
                    top: -20px;
                    background-image: url('/static/public/image/redlope/btn-close.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    cursor: pointer;
                }
    
            }
            .red-open{
                width: 546px;
                height: 675px;
                background-image: url('/static/public/image/redlope/hongbao/2.png');
                background-size: 100%;
                background-repeat: no-repeat;
                top: 50%;
                left: 50%;
                position: relative;
                transform: translate(-50%, -50%);
            .red-open-jb{
                height: 100px;
                width: 546px;
                margin: auto;
                display: flex;
                justify-content: space-around;
                overflow: hidden;
                >span{
                    width: 60px;
                    height: 46px;
                    display: inline-block;
                    background-image: url('/static/public/image/redlope/hongbao/7.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    animation: roatejb 1.5s linear 1;
                }
            }
            .red-open-zb{
                height: 400px;
                width: 480px;
                margin: auto;
                >span{
                    &:nth-child(1){
                        display: inline-block;
                        width:56px;
                        height: 45px;
                        background-image: url('/static/public/image/redlope/hongbao/3.png');
                        background-size: 100%;
                        background-repeat: no-repeat;
                        position: relative;
                        left: 16px;
                        top: 0;  
                        animation: rotezb1 3s linear 1;
                    }
                    &:nth-child(2){
                        display: inline-block;
                        width: 55px;
                        height: 47px;
                        background-image: url('/static/public/image/redlope/hongbao/4.png');
                        background-size: 100%;
                        background-repeat: no-repeat;
                        position: relative;
                        left:65px;
                        top: 0;
                        animation: rotezb1 2.8s linear 1;
                    }
                    &:nth-child(3){
                        display: inline-block;
                        width:47px;
                        height: 38px;
                        background-image: url('/static/public/image/redlope/hongbao/8.png');
                        background-size: 100%;
                        background-repeat: no-repeat;
                        position: relative;
                        left: 160px;
                        top: 0;
                        animation: rotezb1 3.2s linear 1;
                    }
                    &:nth-child(4){
                        display: inline-block;
                        width: 46px;
                        height: 39px;
                        background-image: url('/static/public/image/redlope/hongbao/9.png');
                        background-size: 100%;
                        background-repeat: no-repeat;
                        position: relative;
                        left: 210px;
                        top: 0;
                        animation: rotezb1 2.6s linear 1;
                    }
                    &:nth-child(5){
                        display: inline-block;
                        width: 29px;
                        height: 26px;
                        background-image: url('/static/public/image/redlope/hongbao/10.png');
                        background-size: 100%;
                        background-repeat: no-repeat;
                        position: relative;
                        left: 220px;
                        top:-30px;
                        animation: rotezb1 3s linear 1;
                    }
                }
            }
            .get-money{
                width:100%;
                height:100px;
                position: absolute;
                line-height:100px;
                font-size:70px;
                color: #E32A03;
                font-weight:400;
                top:216px;
                text-align:center;
            }
            .getMoney{
                width:160px;
                height: 160px;
                position: absolute;
                left: 193px;
                bottom:172px;
                cursor: pointer;
            }
            }
        }
        &.egg {
            // .red-close-btn{
            //     width: 69px;
            //     height: 72px;
            //     position: absolute;
            //     right: 15px;
            //     top: 6px;
            //     background-image: url('/static/public/image/redlope/btn-close.png');
            //     background-size: 100%;
            //     background-repeat: no-repeat;
            //     cursor: pointer;
            // }
            
            .box-wrap {
                width: 697px;
                height: 631px;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
            }
            .preloadImg {
                visibility: hidden;
                background: url('/static/public/image/redlope/egg/close.png'),
                            url('/static/public/image/redlope/egg/5.png'),
                            url('/static/public/image/redlope/egg/6.png'),
                            url('/static/public/image/redlope/egg/7.png'),
                            url('/static/public/image/redlope/egg/8.png'),
                            url('/static/public/image/redlope/egg/9.png'),
                            url('/static/public/image/redlope/egg/10.png'),
                            url('/static/public/image/redlope/egg/11.png'),
                            url('/static/public/image/redlope/egg/12.png'),
                            url('/static/public/image/redlope/egg/13.png'),
                            url('/static/public/image/redlope/egg/14.png'),
                            url('/static/public/image/redlope/egg/15.png'),
                            url('/static/public/image/redlope/egg/16.png'),
                            url('/static/public/image/redlope/egg/17.png'),
                            url('/static/public/image/redlope/egg/24.png');
            }
            .red-close{
                width: 100%;
                height: 100%;
                background-image: url('/static/public/image/redlope/egg/close.png');
                background-repeat: no-repeat;
                background-position: center;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                
                &:hover {
                    cursor: pointer;
                    &:before {
                        opacity: 1;
                        transition: opacity 1s;
                    }
                }
                &:before {
                    opacity: 0;
                    transition: opacity 1s;
                    content: "";
                    width: 201px;
                    height: 244px;
                    background: url('/static/public/image/redlope/egg/hammer.png') no-repeat;
                    position: absolute;
                    right: 11px;
                    top: 70px;
                }
                &.open_red {
                    animation: openRedEgg1Bg 0.1s 1 step-end;;
                    animation-delay: 0.8s; 
                    &:before { 
                        visibility: hidden;
                        opacity: 1;
                        animation: openRedEgg1Hammer 0.8s 1 cubic-bezier(0.72, 0.58, 0.93, 0.72); 
                        animation-fill-mode: forwards; 
                    }
                    animation: openRedEgg2Bg 2s 1 step-end;
                    animation-delay: 0.5s; 
                    animation-fill-mode: forwards;
                }
            }
            .red-open{
                width: 100%;
                height: 100%;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                animation: openRedEgg3Bg 3s 1 step-end;
                animation-fill-mode: forwards;
                background-image: url('/static/public/image/redlope/egg/24.png');
                background-repeat: no-repeat;
                background-position: center;
                .get-money{
                    position: absolute;
                    line-height:100px;
                    font-size:60px;
                    color: #E32A03;
                    top: 50%;
                    left: 50%;
                    text-align: center;
                    transform: translate(-50%, -50%);
                    font-weight: bold;
                    text-shadow: #fff 0px 2px 2px;
                    letter-spacing: 0.05em;
                }
                .getMoney{
                    width: 250px;
                    height: 66px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, calc(-50% + 133px));
                    cursor: pointer;
                }
            }
        }
    }
</style>

