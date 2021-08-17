<template>
  <div class="winlist clearfix slideLeft">
    <div class="left-area pull-left clearfix">
      <div class="left-winList">
        <div class="scroll-area">
          <ul
            class="winning-list"
            :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]"
          >
            <li v-for="(item,i) in winningInfo" :key="i">
              <span class="name">{{item.name.padEnd(9, '*')}}</span>
              <span class="game">{{item.uname}}</span>
              <span class="money">{{item.num}}元</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-area">
      <div class="game-winlist-1 game-winlist">
        <img src="/static/935qp/img/home/ag-s.png" alt />
        <span class="win-name">超级奖池</span>
        <div
          class="win-money"
        >￥{{AGMoney.toString().substring(0,3)}},{{AGMoney.toString().substring(3,6)}},{{AGMoney.toString().substring(6,9)}}.{{AGMoney.toString().substring(9,11)}}</div>
      </div>
      <div class="game-winlist-2 game-winlist">
        <img src="/static/935qp/img/home/mg-s.png" alt />
        <span class="win-name">超级奖池</span>
        <div
          class="win-money"
        >￥{{MGMoney.toString().substring(0,3)}},{{MGMoney.toString().substring(3,6)}},{{MGMoney.toString().substring(6,9)}}.{{MGMoney.toString().substring(9,11)}}</div>
      </div>
    </div>
    <div class="top-title-left top-title">中奖榜单</div>
    <div class="top-title-right top-title">累积奖池</div>
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
        "抢庄牛牛",
        "三公",
        "二人麻将",
        "百人牛牛",
        "跑得快",
        "21点",
        "炸金花",
        "二八杠",
        "德州扑克",
        "斗地主",
        "押庄龙虎",
        "炸金花",
        "抢庄牌九",
        "龙虎斗",
        
      ];
      let data = [];
      for (let i = 0; i < length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        num = num < 10 ? num * 234 : num;
        num = num < 100 ? num * 23 : num;
        num = num < 1000 ? num * 2 : num;
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        name = name.substr(0, 4);
        let k = Math.floor(Math.random() * 12);
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
    top: -500px;
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

.winlist {
  position: relative;
  &.slideLeft{.animationName(slideLeft,.8s)}
  .keyFrames(slideLeft,-2000px,0);
  left: -2000px;
  width: 1200px;
  height: 175px;
  margin: 20px auto 0;
  background: url("/static/935qp/img/home/winlist-bg.png") no-repeat;
  background-size:1200px 175px;
  font-family: Microsoft YaHei !important;
  .left-area {
    .left-winList {
      width: 500px;
      margin-top: 42px;
      margin-left: 18px;
      .scroll-area {
        overflow: hidden;
        position: relative;
        display: inline-block;
        width: 500px;
				height: 110px;
				font-size: 12px;
				margin-top: 12px;
        
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
						margin-left: 20px;
					}
          li {
            position: relative;
            display: inline-block;
            width: 235px;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px dashed #71C9FF;
            span:nth-child(1) {
              left: 0;
            }
            span:nth-child(2) {
              left: 50%;
              transform: translateX(-50%);
            }
            span:nth-child(3) {
              right: 0;
            }
            span {
              position: absolute;
              color: #666;
              &:last-child {
                color: #FF5B00;
                margin-right: 0px;
              }
            }
          }
        }
      }
    }
  }
  .top-title {
    position: absolute;
    top: 0;
    background: url("/static/935qp/img/home/winlist-top.png") no-repeat;
    width: 176px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    font-size: 22px;
    color: #fff;
  }
  .top-title-left {
    left: 180px;
  }
  .top-title-right {
    right: 180px;
  }
  .right-area {
    .game-winlist {
      position: absolute;
      top: 75px;
      width: 184px;
      text-align: center;
      vertical-align: middle;
      .win-name {
        font-size: 22px;
        vertical-align: top;
        color:#333;
        margin-left: 8px;
      }
      .win-money {
        color: #FF5B00;
        font-size: 20px;
        margin-top: 8px;
      }
      &.game-winlist-1 {
        right: 312px;
      }
      &.game-winlist-2 {
        right: 46px;
        img {
          width: 26px;
        }
      }
    }
  }
}
</style>