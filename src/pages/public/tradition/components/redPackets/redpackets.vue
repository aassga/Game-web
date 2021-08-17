<template>
     <transition name="bounce">
            <div class="redBox" v-if="showRedpackets">
              <div class="openBefore"  v-if="isSuccess">
                <div class="cellContent" @click.stop="open">
                      <a href="javascript:void(0)"><img src="/static/public/image/redpackets/red.png" alt="" :class="[clientHeight <750 ? 'clientImg':'']"></a>
                      <div class="red-logo" ><img :src="$parent.lotHeadDatas.logoUrl" alt=""></div>
                      <div class="logo" :class="[clientHeight <750 ? 'client-logo':'']"><img :src="'/static/public/image/lottery/nico/png/'+gameId+'.png'" alt=""></div>
                      <div class="close" @click.stop="close"><img src="/static/public/image/redpackets/close.png" alt=""></div>
                      <div class="red-text"><span>恭喜您获得{{lotteryName}}的随机红包</span></div>
                </div>  
                <ul class="ani">
                    <li v-for="(item,index) in lopeList" :key="index" :style="itemStyle(index)">
                        <img :src="'/static/public/image/redpackets/'+item+'.png'" alt="" :class="[clientHeight <750 ? (item=='s-2'?'s2-img':(item=='s-3'?'s3-img':'')):'']">
                    </li>
                 </ul>
              </div>
              <div class="opeAfter" v-else>
                   <div class="cellContent">
                      <a href="javascript:void(0)"><img src="/static/public/image/redpackets/open.png" alt="" :class="[clientHeight <750 ? 'clientImg':'']"></a>
                      <div class="logo" style="top:19.5%" :class="[clientHeight <750 ? 'client-logo':'']"><img :src="'/static/public/image/lottery/nico/png/'+gameId+'.png'" alt=""></div>
                      <div class="close" @click.stop="showRedpackets=false"><img src="/static/public/image/redpackets/close.png" alt=""></div>
                      <div class="openmessage">
                           <p class="suc_text" :class="[clientHeight <750 ? 'suc_text_client':'']">恭喜您获得{{lotteryName}}的随机红包</p>
                           <p class="suc_text_two" :class="[clientHeight <750 ? 'suc_text_two_client':'']">恭喜发财，大吉大利</p>
                           <p class="money" :class="[clientHeight <750 ? 'money_client':'']"><span>{{amount}}</span>元</p>
                           <p class="suc_text_two" :class="[clientHeight <750 ? 'suc_text_two_client':'']">已存入帐号余额</p>
                           <p class="goplay" @click.stop="goLottery" :class="[clientHeight <750 ? 'goplay_client':'']">好运临头赶紧投注></p>
                      </div>
                  </div> 
              </div>   
            </div>
     </transition>
</template>
<script>
import { _SetPost, postS, getS } from '@/service/public/service.js'
let redtimer
export default {
    data(){
        return{
            showRedpackets:false,
            lopeList: [],
            isSuccess:true,
            gameId:1,
            lotteryName: '香港六合彩',
            amount: 0,
            showType: '',
            clientHeight:document.documentElement.clientHeight,
            isOpen:true,
        }
    },
    methods:{
      itemStyle (i) {
        return {
          animation: 'ani_li 2s ease-in ' + Math.floor(Math.random()*15 / 3) * 360 + 'ms',
          left: +i*4+ 20 + '%'
        }
      },
      open(){
          if(!this.isOpen){
              return false
          }
          this.isOpen=false
          postS(`preferential/HongyundangtouDeliveryGift`).then(res=>{
            if(res.code==200){
              this.bgetBalance()
              this.isSuccess=false
              this.isOpen=true
            }else{
              this.isOpen=true
              this.dNotify(res.message, "error");
            }
        })
      },
      close(){
          this.showRedpackets=false
          redtimer = setInterval(this.getOpenStatus, 15000)
      },
      getOpenStatus(){
           if(localStorage.token){
             postS(`preferential/HongyundangtouGetGift`).then(res=>{
                   if(res.code==200 && +res.data.giftAmount>0){
                      clearInterval(redtimer)  
                      this.showRedpackets=true
                      this.isSuccess=true
                      this.isOpen=true
                      this.amount = res.data.giftAmount
                      this.showType = res.data.showType
                      if(res.data.showType === 'currentGameName'){
                           this.gameId = this.$route.meta.id
                           this.lotteryName = this.$route.meta.name
                      }else{
                          this.gameId = res.data.lotteryId
                          this.lotteryName = res.data.lotteryName
                      }
                   }
             }).catch()
           }else{
               clearInterval(redtimer)  
           }
      },
      goLottery () {
       this.showRedpackets = false
       if (this.showType === 'designationGameName') {
           this.$router.push({path: '/plays/tradition/' + this.gameId})
           } else {
           return false
      }
    },
    bgetBalance() {
            if (localStorage.token) {
                getS(`member/balance`).then((res) => {
                    if (res.code == 200) {
                        let userinfo = JSON.parse(localStorage.userinfo);
                        userinfo.balance = res.data.member;
                        userinfo.agent = res.data.agency;
                        this.$store.commit('mainState/reloadUserinfo', userinfo);
                    }
                });
            }
       },
    },
    created(){
          let arr=['s-1', 's-2', 's-3','s-1']
          for (let i = 0; i < 15; i++) {
                this.lopeList.push(arr[Math.floor(Math.random() * (3 + 1))])
          }
    },
    watch:{
        '$route.path':function(newval,oldval){
            if(newval.includes("/plays/tradition")){
                  clearInterval(redtimer)
                  redtimer = setInterval(this.getOpenStatus, 15000)
            }
        }
    },
    beforeDestroy(){
        clearInterval(redtimer)
    }
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

  @keyframes ani_li {
    from {
      transform: translateY(-10vh);
      opacity: 1;
    }
    to {
      transform: translateY(70vh);
      opacity: 0;
    }
  }  
</style>
<style lang="less" scoped>
      .redBox{
           width: 100%;
           height: 100%;
           background-color:rgba(0, 0, 0, .4);
           position: fixed;
           left: 0;
           top: 0;
           right: 0;
           bottom: 0;
           margin: auto;
           z-index: 1000;
           display: flex;
           justify-content: center;
           align-items: center; 
           .cellContent{
                 .clientImg{
                     width:560px;
                     height:655px;
                 }
                 position: relative;
                 display: inline-block;
                 vertical-align: middle;
                 z-index: 1005;
                 cursor: pointer;
                 .red-logo{
                      position: absolute;
                      left: 37.5%;
                      top: 18.2%;
                      img{
                         width: 140px;
                         height: 45px;
                      }
                 }
                 .logo{
                     width:128px;
                     height: 128px;
                     border:5px solid #fff;
                     border-radius:50%;
                     position: absolute;
                     left: 38.5%;
                     top: 27.4%;
                     img{
                       width: 118px;
                       height: 118px;
                       border-radius:50%;
                       display: block;
                     }
                  }
                  .client-logo{
                       width:118px;
                       height: 118px;
                       img{
                           width:109px;
                           height: 109px;
                       }
                  }
                  .close{
                     position: absolute;
                     left: 45%;
                     bottom: -2.4%;
                     cursor: pointer;
                     z-index: 1009;
                 }
                 .red-text{
                     position: absolute;
                     left: 13.3%;
                     top:45.8%;
                     text-align:center;
                     width:71.7%;
                     span{
                         font-size:23px;
                         color:#fff;
                     }
                 }
                 .openmessage{
                    position: absolute;
                    width:71.7%;
                    height: auto;
                    left: 13.3%;
                    top:38%;
                    p{
                      text-align:center; 
                    }
                    .suc_text{
                        font-size:28px;
                        color:#FFF7A2;
                        margin-bottom:19px;
                        line-height:28px;
                    }
                    .suc_text_client{
                        margin-top:10px;
                        font-size:24px;
                        line-height:24px;
                    }
                    .suc_text_two{
                        font-size:22px;
                        color:#fff;
                         text-align:center;
                         line-height:22px;
                    }
                    .suc_text_two_client{
                        font-size:20px;
                        line-height:20px;
                    }
                    .money{
                        font-size:21px;
                        color:#FFF7A2;
                        margin:62px 0 24px 0;
                         text-align:center;
                       span{
                          font-size:70px;
                          color:#FFF7A2;
                          
                      }
                    }
                    .money_client{
                        margin:13px 0 12px 0;
                    }
                    .goplay{
                        font-size:30px;
                        color:#fff;
                        margin-top:90px;
                        text-align:center;
                        line-height:30px;
                    }
                    .goplay_client{
                        margin-top:65px;
                        font-size:26px;
                        line-height:26px;
                    }
                 }
           }
            .ani {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                overflow: hidden;
                li {
                position: absolute;
                transform: translateY(-20vh);
                z-index: 1010;
                img {
                    width: 100%;
                    height: 100%;
                }
                .s2-img{
                    width:64px;
                    height: 88px;
                }
                .s3-img{
                    width:80px;
                    height: 150px;
                }
                }
            }
      }
</style>

