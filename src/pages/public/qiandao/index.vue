<template>
<div class="filter" v-if="$store.state.mainState.isDialog">
<transition name="bounce">
    <div class="red-box">
        <div class="red-close"  v-if="!$store.state.mainState.isOpen" :class="showAnimation ? 'open_red':''">
            <div @click="onOpenSign"></div>
            <div class="red-close-btn" @click="close"></div>
        </div>
        <div class="red-open" v-show='$store.state.mainState.isOpen'>
            <p class="get-money">{{$store.state.mainState.signMoney}}</p>
            <div class="red-close-btn" @click="close"></div>
            <div @click="onsignIn" class="getMoney"></div>
        </div>
    </div>
</transition>
</div>
</template>
<script>
export default {
    name:'Qiandao',
    props:{
    },
    data() {
        return {
            showAnimation: false,
            signMoney:''
        }
    },
    methods:{
         close(){
             this.$store.commit("mainState/showDialog", false);
         }, 
         getMoney(){
             this.$store.commit("mainState/showDialog", false);
             this.$store.commit("mainState/isGet", true);
         },
         onOpenSign(){
              this.$store.dispatch('home/onsignIn', {
              type: 'open',
            }).then(res => {
            if(res.code === 200) {
                this.showAnimation = true
                setTimeout(() => {
                  this.$store.commit("mainState/isOpen", true);
                }, 1000);
             }else {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: res.message,
                    model: 'warn'
                  }) 
               }
             }).catch(() => {
            })
         },
         onsignIn() {
            this.$store.dispatch('home/onsignIn', {
            type: 'lingqu',
            id:this.$store.state.mainState.signData.dailySignIn.id,
            }).then(res => {
            if(res.code === 200) {
                this.$store.commit("mainState/showDialog", false);
                this.$store.commit("mainState/isGet", true);
            }else {
                 this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: res.message,
                    model: 'warn'
                  }) 
               }
              }).catch(() => {
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
        .open_red{
            animation: openRed 1s cubic-bezier(0.72, 0.58, 0.93, 0.72) 1;
        }
    }
    .red-close{
        width: 579px;
        height: 517px;
        background-image: url('/static/public/image/qiandao/nopen.png');
        background-size: 100%;
        background-repeat: no-repeat;
        top: 50%;
        left: 50%;
        position: relative;
        transform: translate(-50%, -50%);
        div:first-child{
           width:155px;
           height: 165px;
           position: absolute;
           left: 224px;
           bottom:141px;
           cursor: pointer;
           background-image: url('/static/public/image/qiandao/open-btn.png');
           background-size: 100%;
           background-repeat: no-repeat;
       }
       .red-close-btn {
            width: 71px;
            height: 71px;
            position: absolute;
            right: -25px;
            top: -20px;
            background-image: url('/static/public/image/qiandao/close.png');
            background-size: 100%;
            background-repeat: no-repeat;
            cursor: pointer;
       }
      
    }
    .red-open{
        width: 618px;
        height: 613px;
        background-image: url('/static/public/image/qiandao/open.png');
        background-size: 100%;
        background-repeat: no-repeat;
        top: 50%;
        left: 50%;
        position: relative;
        transform: translate(-50%, -50%);
        .get-money{
            width:100%;
            height:100px;
            position: absolute;
            line-height:100px;
            font-size:70px;
            color: #E32A03;
            font-weight:400;
            top:170px;
            text-align:center;
        }
        .red-close-btn{
            width: 71px;
            height: 71px;
            position: absolute;
            right: 74px;
            top: -20px;
            background-image: url('/static/public/image/qiandao/close.png');
            background-size: 100%;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        .getMoney{
            width:155px;
            height: 165px;
            position: absolute;
            left: 236px;
            bottom:175px;
            cursor: pointer;
            background-image: url('/static/public/image/qiandao/open-get.png');
            background-size: 100%;
            background-repeat: no-repeat;
        }
    }
</style>

