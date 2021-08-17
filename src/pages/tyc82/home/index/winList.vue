<template>
  <div class="winlist clearfix slideLeft">
    <div class="right-area">
      <div class="game-winlist-1 game-winlist">
        <div class="fistTitle">
          <img src="/static/tyc82/img/42.png" alt />
          <span class="win-name">MG超级奖池</span>
        </div>
        <div
          class="win-money"
        >￥{{AGMoney.toString().substring(0,3)}},{{AGMoney.toString().substring(3,6)}},{{AGMoney.toString().substring(6,9)}}.{{AGMoney.toString().substring(9,11)}}</div>
      </div>
      <div class="game-winlist-2 game-winlist">
        <div class="fistTitle">
          <img src="/static/tyc82/img/41.png" alt />
          <span class="win-name">CQ9超级奖池</span>
        </div>
        <div
          class="win-money"
        >￥{{MGMoney.toString().substring(0,3)}},{{MGMoney.toString().substring(3,6)}},{{MGMoney.toString().substring(6,9)}}.{{MGMoney.toString().substring(9,11)}}</div>
      </div>
    </div>
    <div class="left-area pull-left clearfix">
      <div class="left-winList">
        <div class="scroll-area">
          <ul
            class="winning-list"
            :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]"
          >
            <li v-for="(item,i) in winningInfo" :key="i">
              <span class="name">恭喜{{item.name}}在{{item.uname}}中，赢得{{item.num}}元</span>
              <!-- <span class="game"></span>
              <span class="money"></span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shadow"></div>
    <!-- <div class="top-title-left top-title">中奖榜单</div>
    <div class="top-title-right top-title">累积奖池</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      setInter: null,
      AGMoney: 41126438900,
      MGMoney: 36421548700,
      winningInfo: [],
      noticePosition: 0
    };
  },
  methods: {
    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.AGMoney = this.AGMoney + 80.56;
        this.MGMoney = this.MGMoney + 30.71;
      }, 100);
    },
    initWinningInfo() {
      let length = 40;
      let arr = [
        // "幸运飞艇",
        "快乐赛车",
        "北京赛车",
        "快速时时彩",
        "三分时时彩",
        "欢乐生肖",
        "快速六合彩",
        // "香港六合彩",
        // "江苏快3",
        "幸运赛车",
        "五分快3",
        "炸金花",
        "通比牛牛"
      ];
      let data = [];
      for (let i = 0; i < length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        let num2 = parseInt(
          Math.random() * (Math.random() * (Math.random() * 36000000))
        );
        num = num < 10 ? num * 234 : num;
        num = num < 100 ? num * 23 : num;
        num = num < 1000 ? num * 2 : num;
        num = num > 100000 ? num/2 : num;
        num = parseInt(num)
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        let name2 = String.fromCharCode((num2 % 26) + 97) + num2.toString(32);
        name = name.substr(0, 2)+name2.substr(0, 3).padEnd(6, '*');
        let k = Math.floor(Math.random() * 10);
        data[i] = { name, uname: arr[k], num };
      }
      this.arraySort(data, (v1, v2) => v1.num < v2.num);
      this.winningInfo = data;
    }
  },
  mounted() {
    clearInterval(this.setInter);
    this.jackpotFc();
  },
  created() {
    this.initWinningInfo();
  },
  components: {
  }
};
</script>

<style lang="less" scoped>
@keyframes animateSub {
  0% {
    top: 0;
  }

  to {
    top: -310px;
  }
}
.pull-left {
  position: relative;
  left: 20px;
}
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}

.clearfix:after {
  clear: both;
}
.keyFrames(@name,@value,@value1){
  @keyframes @name {
    0%{
    top:@value;height: 0px;opacity: 0;
    } 
    30%{
    top:@value;height:70px;opacity: 0.1;
    }
    50%{
    top:@value;height:70px;opacity: 0.2;
    }
    80%{
    top:@value;height:70px;opacity: 0.3;
    }
    100%{
    top:@value1;height:143px;opacity: 1;
    }
  }
}
.animationName(@name,@time){
  animation-delay:2s;
  animation: @name 1s @time 1;
  animation-timing-function: ease-in-out;
  animation-direction: normal;
  animation-fill-mode:forwards;
}

.winlist {
  position: relative;
  &.slideLeft{
    opacity: 0;
  }
  &.slideLeft{.animationName(slideLeft,1s)}
  .keyFrames(slideLeft,200px,0);
  width: 1230px;
  height: 0px;
  margin: 0px auto 0;
  background-size: 100%;
  background: url("/static/tyc82/img/win_bg.png") no-repeat;
  font-family: Microsoft YaHei !important;
  .left-area {
    position: relative;
    left: 50px;
    .left-winList {
      width: 560px;
      .scroll-area {
        overflow: hidden;
        position: relative;
        display: inline-block;
        width: 560px;
				height: 93px;
				font-size: 12px;
				margin-top: 18px;
        
        &:hover {
          .winning-list {
            animation-play-state: paused;
          }
        }
        .winning-list {
          position: relative;
          left: 0;
          top: 0px;
					animation: animateSub 20s linear infinite;
					li:nth-child(even) {
						margin-left: 15px;
					}
          li {
            position: relative;
            display: inline-block;
            width: 250px;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px dashed #aa5251;
            span:nth-child(1) {
              left: 0;
            }
            span:nth-child(2) {
              left: 55%;
              transform: translateX(-50%);
            }
            span:nth-child(3) {
              right: 0;
            }
            span {
              position: absolute;
              color: #fff;
              &:last-child {
                color: #ffc72e;
                margin-right: 0px;
              }
            }
          }
        }
      }
    }
  }
  
  
  .right-area {
    position: relative;
    left: 585px;
    .game-winlist {
      position: absolute;
      top: 75px;
      width: 184px;
      text-align: center;
      vertical-align: middle;
      .fistTitle{
        position: relative;
        top: -50px;
        left: 98px;
      }
      .win-name {
        font-size: 20px;
        vertical-align: top;
        color:#fff;
      }
      .win-money {
        color: #bf1210;
        font-size: 22px;
        margin-top: -49px;
        margin-left: 86px;
        height: 42px;
        line-height: 42px;
        width: 222px;
        font-weight: 600;
        background: url('/static/tyc82/img/40.png')
      }
      &.game-winlist-1 {
        left: 37px;
        img {
          position: relative;
          top: -5px;
          width: 52px;
          left: 5px;
        }
      }
      &.game-winlist-2 {
        left: 296px;
        img {
          width: 52px;
          position: relative;
          top: -5px;
        }
      }
    }
  }
}
</style>