<template>
  <div class="winlist clearfix slideLeft">
    <ul class="list_li">
      <li  v-for="(item,i) in headerItem" :key="i">
        <div class="img_box">
          <img :src="item.bImg" alt="">
        </div>
        <div class="text_box">
          <h5>￥{{item.money}}</h5>
          <a>{{item.name}}</a>
          <dl>
            <dd v-for="(it,i) in item.icons" :key="i"  @click="goLink(it.link)">
              <div class="icon_box">
                <img :src="'/static/amxpj/img/home/' + it.icon + '.png'" class="icon">
              </div>
              <h6>{{it.name}}</h6>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setInter: null,
      AGMoney: 4112643890,
      MGMoney: 3642154870,
      winningInfo: [],
      noticePosition: 0,
      headerItem: [
        {
          name: "电子游戏",
          introduce: "SLOT GAMES",
          money:'',
          detailed:
            "全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
          bImg: "/static/amxpj/img/home/boat.png",
          icons: [
            { name: "MG电子", icon: "DZ-icons2" ,link:'/home/slot?navid=9&id=10022'},
            { name: "CQ9电子", icon: "DZ-icons4",link:'/home/slot?navid=9&id=10018'},
            { name: "JDB电子", icon: "DZ-icons5",link:'/home/slot?navid=9&id=10021'},
            { name: "FG电子", icon: "DZ-icons6" ,link:'/home/slot?navid=9&id=10020'},
            { name: "PT电子", icon: "DZ-icons3" ,link:'/home/slot?navid=9&id=10024'},
            { name: "更多游戏", icon: "CP-icons4" ,link:'/home/slot?navid=9&id=0'},
          ]
        },
        {
          name: "彩票游戏",
          introduce: "LOTTERY",
          money:'',
          detailed:
            "提供快速时时彩，快速赛车，等各地彩票在线投注，保证公平公开让你快乐游戏",
          bImg: "/static/amxpj/img/home/ball.png",
          icons: [
            { name: "快速时时彩", icon: "CP-icons1",link:'#/plays/hall'},
            { name: "快速赛车", icon: "CP-icons3" ,link:'#/plays/hall'},
            { name: "快速六合彩", icon: "CP-icons5" ,link:'#/plays/hall'},
            { name: "快速快三", icon: "CP-icons2" ,link:'#/plays/hall'},
            { name: "香港六合彩", icon: "CP-icons6" ,link:'#/plays/hall'},
            { name: "更多游戏", icon: "CP-icons4" ,link:'#/plays/hall'},
          ]
        }
      ]
    }
  },
  methods: {
    jackpotFc() {
      clearInterval(this.setInter);
      this.setInter = setInterval(() => {
        this.AGMoney = this.AGMoney + 8012;
        this.MGMoney = this.MGMoney + 3031;
        let num1=this.AGMoney.toString();
        let num2=this.MGMoney.toString();
        this.headerItem[0].money=num1.substring(0,2)+","+num1.substring(2,5)+","+num1.substring(5,8)+"."+num1.substring(8,10);
        this.headerItem[1].money=num2.substring(0,2)+","+num2.substring(2,5)+","+num2.substring(5,8)+"."+num2.substring(8,10);
      }, 1000);
    },
    initWinningInfo() {
      let length = 40;
      let arr = [
        "幸运飞艇",
        "快乐赛车",
        "北京赛车",
        "快速时时彩",
        "三分时时彩",
        "欢乐生肖",
        "快速六合彩",
        "香港六合彩",
        "江苏快3",
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
    },
    goLink(link) {
      if(link){
        if(link === '#/plays/hall') window.open(link)
        this.$router.push(link)
      }else{
        return false
      }
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
.icon_box {
    position: relative;
    float: left;
    height: 71px;
    // margin-top: 24px;
    margin-right: 22px;
    text-align: center;
    min-width: 76px;
    cursor: pointer;
    .icon {
      transition: all .3s linear;
      vertical-align: middle;
    }
    .icon-name {
      position: absolute;
      bottom: -15px;
      width: 100%;
      text-align: center;
      display: block;
      font-size: 14px;
      font-weight: 400;
      color: #f49f99;
      margin-top: 10px;
    }
    &:hover {
      .icon{
        transform: rotate(1turn);
      }
    }
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
  height: 304px;
  margin: 20px auto 0;
  background: #1b1533;
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
            border-bottom: 1px dashed #c04765;
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
  .top-title {
    position: absolute;
    top: 0;
    background: url("/static/amxpj/img/home/winlist-top.png") no-repeat;
    width: 176px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    font-size: 22px;
    color: #a41331;
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
        color:#fff;
        margin-left: 8px;
      }
      .win-money {
        color: #ffe593;
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
  .list_li{
    width: 1200px;
    height: 304px;
    li{
      width:595px;
      height: 304px;
      border:2px solid rgba(68,55,118,1);
      float: left;
      .img_box{
        float: left;
        width: 342px;
        height: 300px;
        padding: 12px 0 12px 12px;
        img{
          width: 330px;
          height: 276px;
        }
      }
      .text_box{
        float: left;
        width: 249px;
        font-family:Microsoft YaHei;
        h5{
          font-size:30px;
          font-weight:400;
          color: #FFECB1;
          padding-top:20px;
          padding-left: 6px;
        }
        a{
          font-size:22px;
          line-height: 42px;
          font-weight:400;
          color: #8779c4;
          padding-bottom: 6px;
          margin-left: 12px;
          border-bottom: 2px solid #afa1e9;
        }
        dl{
          width: 249px;
          dd{
            text-align: center;
            width: 33.33%;
            float: left;
            padding-top: 8px;
            cursor: pointer;
            
            h6{
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(175,161,233,1);
              line-height:21px;
              padding-top: 2px;
            }
          }
        }
      }
    }
    li:nth-child(2n){
      float: right;
    }
  }
}
</style>