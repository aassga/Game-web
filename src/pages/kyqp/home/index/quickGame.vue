<template>
  <div class="quickGame clearfix">
    <div class="quickGame-2 slideTop1 pull-left">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/kyqp/img/home/quickgame-bb-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">棋牌游戏</div>
          <div class="introdu">CHESS GAMES</div>
        </div>
      </div>
      <div class="text">休闲益智 棋乐无穷</div>
      <router-link to="/home/chess?navid=9&id=0" class="btn">快速游戏</router-link>
       <div class="mask">
        <div class="mask1">
          推荐游戏
        </div>
        <router-link to="/home/chess?navid=9&id=0" class="more-game">
          更多游戏
        </router-link>
        <div class="mask-cont">  
          <div v-for="(item,i) in maskGame2" :key="i" :class="['mask-area',`mask-area${i + 1}`]" @click="$router.push(`/home/chess?navid=9&id=${item.id}`)">
              <div class="top-img">
                <img :src="item.img1" alt="" class="img1">
                <img :src="item.img2" alt="" class="img2">
              </div>
              <p class="game-name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="quickGame-1 pull-left slideLeft">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/kyqp/img/home/quickgame-by-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">捕鱼游戏</div>
          <div class="introdu">LIVE ENTERTAINMENT</div>
        </div>
      </div>
      <div class="text">豪客专享 真实体验</div>
      <router-link to="/home/fish?navid=9&id=0" class="btn">热门推荐</router-link>
      <div class="mask">
        <div class="mask1">
          推荐游戏
        </div>
        <router-link to="/home/fish?navid=9&id=0" class="more-game">
          更多游戏
        </router-link>
        <div class="mask-cont">  
          <div v-for="(item,i) in maskGame" :key="i" :class="['mask-area',`mask-area${i + 1}`]" @click="joinGames(item)">
              <div class="top-img">
                <img :src="item.img1" alt="" class="img1">
                <img :src="item.img2" alt="" class="img2">
              </div>
              <p class="game-name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="quickGame-3 pull-left slideRight1">
      <div class="title clearfix">
        <div class="pull-left left-icon">
          <img src="/static/kyqp/img/home/quickgame-bg3-icon.png" alt />
        </div>
        <div class="pull-left right-text">
          <div class="name">电子游艺</div>
          <div class="introdu">SLOT GAMES</div>
        </div>
      </div>
      <div class="text">大奖爆不停</div>
      <router-link to="/home/slot?navid=9&id=0" class="btn">快速游戏</router-link>
      <!-- <img src="/static/kyqp/img/home/quickhame-bg3-hot.png" class="bg3-hot" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 600,
			timer: 0,
      countDown:'01:12',
      maskGame:[
        { img1: '/static/kyqp/img/home/mask6.png',img2:'/static/kyqp/img/home/mask6-hover.png', name: 'JDB', id: 10054, index: 4 },
        { img1: '/static/kyqp/img/home/mask3.png',img2:'/static/kyqp/img/home/mask3-hover.png', name: 'CQ9', id: 10057, index: 1 },
        { img1: '/static/kyqp/img/home/mask2.png',img2:'/static/kyqp/img/home/mask2-hover.png', name: 'AG', id: 10055, index: 0 },
        { img1: '/static/kyqp/img/home/mask4.png',img2:'/static/kyqp/img/home/mask4-hover.png', name: 'FG', id: 10056, index: 3 },
      ],
       maskGame2:[
        { img1: '/static/kyqp/img/home/ky.png',img2:'/static/kyqp/img/home/ky-1.png', name: 'KY', id: 10042, index: 4 },
        { img1: '/static/kyqp/img/home/ly.png',img2:'/static/kyqp/img/home/ly-1.png', name: 'LEG', id: 10612, index: 1 },
        { img1: '/static/kyqp/img/home/th.png',img2:'/static/kyqp/img/home/th-1.png', name: 'TH', id: 10694, index: 0 },
        { img1: '/static/kyqp/img/home/vg.png',img2:'/static/kyqp/img/home/vg-1.png', name: 'VG', id: 10041, index: 3 },
      ],
    };
  },
  methods: {
    joinGames(a){
      if(a.name == 'AG'){
        this.$router.push("/home/fish?navid=9&id=10055")
      }else if(a.name == 'CQ9'){
        this.$router.push("/home/fish?navid=9&id=10057")
      }else if(a.name == 'FG'){
        this.$router.push("/home/fish?navid=9&id=10056")
      }else{
        this.$router.push("/home/fish?navid=9&id=10054")
      }
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
    }
  },
  created() {
    this.timeStart(this.time);
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
.mask-area4{
  img{
    width: 53px;
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
          color: #fff;
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
      color: #ffffff;
      border: 1px solid #ffffff;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.3s linear;
      &:hover {
        transform: scale(1.06);
        background: linear-gradient(180deg, #ecbc49, #ffe4a5);
        color: #00324F;
        border: none;
      }
    }
  }
  .quickGame-1 {
    background: url("/static/kyqp/img/home/quickgame-bybg.png") -29px 0px no-repeat;
    left: -2000px;
    &.slideLeft{.animationName(slideLeft,.6s)}
    .keyFrames(slideLeft,-2000px,0);
    .text {
      position: absolute;
      left: 26px;
      top: 112px;
      font-size: 20px;
      color: #fff;
    }
    .btn {
      left: 26px;
      bottom: 50px;
    }
    // .mask {
    //   position: absolute;
    //   display: none;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: rgba(0,0,0,0.8);
    //   .mask-cont {
    //     overflow: hidden;
    //       .mask-area {
    //         float: left;
    //         width: 90px;
    //         margin-left: 18px;
    //         margin-top: 82px;
    //         cursor: pointer;
    //         .top-img{
    //           width: 90px;
    //           height: 60px;
    //           border:1px solid #ffffff;
    //           border-radius: 4px;
    //           img {
    //             margin: 14px auto 0;
    //             display: block;
    //           }
    //           .img1 {
    //             display: block;
    //           }
    //           .img2 {
    //             display: none;
    //           }
    //         }
    //         .game-name{
    //           text-align: center;
    //           font-size: 18px;
    //           margin-top: 6px;
    //           color: #fff;
    //         }
    //         &:hover {
    //           .top-img {
    //             border: 1px solid #ecbc49;
    //             .img1 {
    //               display: none;
    //             }
    //             .img2 {
    //               display: block;
    //             }
    //           }
    //           .game-name {
    //             color: #f5d065;
    //           }
    //         }
    //       }
    //     }
    //     .more-game{
    //       display: block;
    //       position: absolute;
    //       bottom: 34px;
    //       left: 155px;
    //       width: 146px;
    //       height: 34px;
    //       line-height: 34px;
    //       border-radius: 15px;
    //       border: 1px solid #ecbc49;
    //       font-size: 16px;
    //       text-align: center;
    //       color: #f5d065;
    //       cursor: pointer;
    //       transition: all 0.3s linear;
    //       &:hover {
    //         transform: scale(1.06);
    //         background: linear-gradient(180deg, #ecbc49, #ffe4a5);
    //         color: #00324F;
    //         border: none;
    //       }
    //     }
    //     .mask1 {
    //       width: 314px;
    //       height: 28px;
    //       line-height: 28px;
    //       font-size: 25px;
    //       text-align: center;
    //       color: #fff;
    //       position: absolute;
    //       top: 20px;
    //       left: 50%;
    //       transform: translateX(-50%);
    //       background: url("/static/kyqp/img/home/mask1.png") no-repeat;
    //       background-size: 100% 100%;
      
    //     }
    // }

    // &:hover {
    //   .mask{
    //     display: block;
    //   }
    // }
  }
  .quickGame-2 {
    background: url("/static/kyqp/img/home/quickgame-bg2.png") no-repeat;
    top: 2000px;
    &.slideTop1{.animationName(slideTop1,0.2s)}
    .keyFrames3(slideTop1,2000px,0);
      .text {
        position: absolute;
        left: 26px;
        top: 112px;
        font-size: 20px;
        color: #fff;
      }
      .btn {
        left: 26px;
        bottom: 50px;
      }
  }
  .quickGame-3 {
    background: url("/static/kyqp/img/home/quickgame-bg3.png") no-repeat;
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
        color: #ffffff;
        border: 1px solid #ffffff;
        font-size: 15px;
        cursor: pointer;
        transition: all 0.3s linear;
        &:hover {
          transform: scale(1.06);
          background: linear-gradient(180deg, #ecbc49, #ffe4a5);
          color: #00324F; 
          border: none;
        }
      }
    }
    .quickEnter1 {
      top: 75px;
    }
    .text {
      position: absolute;
      left: 20px;
      top: 112px;
      font-size: 20px;
      color: #fff;
    }
    .btn {
      left: 20px;
      bottom: 50px;
    }
    .quickEnter2 {
      top: 164px;
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
.quickGame-1,.quickGame-2{
    .mask {
      position: absolute;
      display: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
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
              border:1px solid #ffffff;
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
            color: #00324F;
            border: none;
          }
        }
        .mask1 {
          width: 314px;
          height: 28px;
          line-height: 28px;
          font-size: 25px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: url("/static/kyqp/img/home/mask1.png") no-repeat;
          background-size: 100% 100%;
      
        }
    }
     &:hover {
      .mask{
        display: block;
      }
    }
}
</style>