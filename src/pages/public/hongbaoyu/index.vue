<template>
  <div>
      <img
        v-if="showImg"
        @click="onOpen"
        src="/static/public/image/hongbaoyu/xhb.gif"
        class="hb-item"
        :style="getStyle(item)"
        :class="getClass()"
        v-for="item in count"
        :key="item"
        @webkitAnimationIteration="iterationEvent(item, $event)"
      />
    <div :class="this.showBox == true ? 'filter' : ''">
      <transition name="bounce">
        <div class="red-box" v-if="showBox">
          <div
            class="red-close"
          >
            <div class="red-img">
              <p class="red-money">
                <i>￥</i><span>{{ $store.state.home.hongbaoyuMoney }}</span>
              </p>
            </div>
            <div class="lingqu" @click="onClose">
              <img
                style="width: 100%; height: 100%; cursor: pointer"
                src="/static/public/image/hongbaoyu/close-btn3.png"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <img
      v-if="closeR"
      :class="btnSite=='leftBtn'?'closeLeft':'closeRight'"
      src="/static/public/image/hongbaoyu/closeR.png"
      @click="onCloseRain(this)"
    />
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  props: {
    count: {
      type: Number,
      default: 16,
    },
    theme:{
       type:String,
       default: 'theme1',
    },
    btnSite:{
        type:String,
        default:'closeRight',
    }
  },
  data() {
    return {
      closeR: false,
      showBox: false,
      showImg: false,
      signMoney: "",
    };
  },
  created() {
    localStorage.removeItem('hongbaoyuShow')
    if(localStorage.token){
       this.getActivityApplyList()
    }else{
       this.showImg = true;
       this.closeR = true;
    }
  },
  methods: {
    onClose() {
      this.onCloseRain();
    },
    onOpen() {
      if (localStorage.token) {
        this.$store.dispatch("home/getHongboayuLinqu", { class: "A0018" })
          .then((res) => {
            if (res.code == 200) {
              this.showBox = true;
              this.$store.commit("home/getHongbaoyuMoney", res.data.git_amount);
              this.showImg = false;
              this.closeR = false;
              localStorage.setItem('hongbaoyuShow',1)
            } else {
                 this.$errorAlert(res.message, "warn");
            }
          });
      } else {
          this.$errorAlert('请先登录', "warn");
      }
    },
    getActivityApplyList(){
        this.$store.dispatch("home/getActivityApplyList", { class: "A0018" })
         .then((res)=>{
            if(res.code==200){
                 if(res.data=='已领取'){
                     this.showImg = false;
                     this.closeR = false;
                     localStorage.setItem('hongbaoyuShow',1)
                 }else{
                    this.showImg = true;
                    this.closeR = true;
                 }
            }else{
               this.showImg = true;
               this.closeR = true;
            }
         })
    },
    onCloseRain() {
      this.showImg = false;
      this.showBox = false;
      this.closeR = false;
      localStorage.setItem('hongbaoyuShow',1)
    },
    iterationEvent(item, $event) {
      $event.target.style.cssText = this.getStyle(item);
    },
    getClass() {
      return `hb-item ${this.theme}-hbsd-${Math.floor(Math.random() * 50 + 30)}`;
    },
    getStyle(item) {
      return `left:${item*5+5}%;
      width:90px;
       transform:translateY(${-20}vh);
      ` 
    },
    beforeDestroy(){
       localStorage.removeItem('hongbaoyuShow')
    }
  },
  computed:{
      visibStatus(){
        return this.$store.state.mainState.visibStatus
      }
  },
  watch:{
     'visibStatus':function(val){
         if(localStorage.hongbaoyuShow==1){
            this.showImg = false;
            this.closeR = false;
         }else{
            this.showImg = true;
            this.closeR = true;
         }
     }
  }
};
</script>
<style lang="less" scoped>
.hb-item {
  position: absolute;
  z-index: 1400;
  cursor: pointer;
}
@keyframes startHB {
  0% {
    transform: translateY(-400px);
    -ms-transform: translateY(-400px);
    -webkit-transform: translateY(-400px);
  }
  100% {
    transform: translateY(92vh);
    -ms-transform: translateY(92vh);
    -webkit-transform: translateY(92vh);
  }
}
@keyframes startHB2 {
  0% {
    transform: translateY(-400px);
    -ms-transform: translateY(-400px);
    -webkit-transform: translateY(-400px);
  }
  100% {
    transform: translateY(120vh);
    -ms-transform: translateY(120vh);
    -webkit-transform: translateY(120vh);
  }
}

@keyframes chandou {
  0% {
    margin-left: -50px;
  }
  10% {
    margin-left: 50px;
  }
  20% {
    margin-left: -50px;
  }
  30% {
    margin-left: 50px;
  }
  40% {
    margin-left: -50px;
  }
  50% {
    margin-left: 50px;
  }
  60% {
    margin-left: -50px;
  }
  70% {
    margin-left: 50px;
  }
  80% {
    margin-left: -50px;
  }
  90% {
    margin-left: 50px;
  }
  100% {
    margin-left: 0px;
  }
}

.for(@i,@t:@i/2.5s) when(@i <= 100) {
  //@i、@cor循环的初值ms
  .for(@i + 1); //@i + 1 相当于"++i"
  .theme1-hbsd-@{i} {
    animation: startHB @t linear infinite,
      chandou @t infinite linear alternate both;
  }
}
.for(1,1);

.for1(@i,@t:@i/2.5s) when(@i <= 100) {
  //@i、@cor循环的初值ms
  .for1(@i + 1); //@i + 1 相当于"++i"
  .theme2-hbsd-@{i} {
    animation: startHB2 @t linear infinite,
      chandou @t infinite linear alternate both;
  }
}
.for1(1,1);



.filter {
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
  // z-index: 10002;
  animation: scaleDraw 1s ease-in-out 1;
  .open_red {
    animation: openRed 1s cubic-bezier(0.72, 0.58, 0.93, 0.72) 1;
  }
}
.red-close {
  width: 579px;
  height: 517px;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
  top: 50%;
  position: relative;
  left: 50%;
  z-index: 30000;
  transform: translate(-50%, -50%);
  .red-img {
    position: absolute;
    top: 0;
    width: 579px;
    height: 517px;
    background-image: url("/static/public/image/hongbaoyu/open5.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    .red-money {
      color: #fff;
      position: absolute;
      top: 153px;
      left: 225px;
      i {
        font-size: 40px;
      }
      span {
        font-size: 40px;
      }
    }
  }

  .lingqu {
    background-size: 100%;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 14px;
    left: 45%;
  }
}
.red-open {
  width: 618px;
  height: 613px;
  background-image: url("/static/public/image/qiandao/open.png");
  background-size: 100%;
  background-repeat: no-repeat;
  top: 50%;
  left: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  .get-money {
    width: 100%;
    height: 100px;
    position: absolute;
    line-height: 100px;
    font-size: 70px;
    color: #e32a03;
    font-weight: 400;
    top: 170px;
    text-align: center;
  }
  .red-close-btn {
    width: 71px;
    height: 71px;
    position: absolute;
    right: 74px;
    top: -20px;
    background-image: url("/static/public/image/qiandao/close.png");
    background-size: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .getMoney {
    width: 155px;
    height: 165px;
    position: absolute;
    left: 236px;
    bottom: 175px;
    cursor: pointer;
    background-image: url("/static/public/image/qiandao/open-get.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
.closeRight{
   cursor: pointer;
    position: fixed;
    z-index: 20050;
    bottom: 20px;
    right: 20px;
}
.closeLeft{
   cursor: pointer;
    position: fixed;
    z-index: 20050;
    bottom: 20px;
    left: 20px;
}
</style>
