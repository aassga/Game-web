<template>
  <div class="game-list slideTop">
    <div class="header-list">
      <div
        :class="[activeFlag === i ? 'active' : '','header-item','clearfix']"
        v-for="(item,i) in headerItem"
        :key="i"
        @mouseenter="changeBottom(item,i)"
      >
        <div :class="[`item-icon${i + 1}`,'item-icon','pull-left'] "></div>
        <div class="item-area pull-left">
          <div class="item-name">{{item.name}}</div>
          <div class="item-introduce">{{item.introduce}}</div>
        </div>
        <img class="shuxian" src="/static/cjw/img/home/game-list-header.png" alt />
        <img src="/static/cjw/img/home/game-list-mask.png" alt class="mask" />
      </div>
    </div>
    <div class="game-content clearfix">
      <div class="pull-left left-image">
        <img :src="bottomData.bImg" />
      </div>
      <div class="pull-left right-text">
        <div class="title">
          <span class="title-name">{{bottomData.name}}</span>
          <span class="title-introduce">{{bottomData.introduce}}</span>
        </div>
        <div class="detailed">{{bottomData.detailed}}</div>
        <ul>
          <li v-for="(item,i) in bottomData.icons" :key="i" class="icons-area" @click="goLink(item)">
            <!-- <img :src="`/static/cjw/img/home/${item.icon}.png`" alt class="icon" /> -->
            <img :class="item.icon == 'TY-icons2'? 'topImg':''" :src="`/static/cjw/img/home/${item.icon}.png`" alt class="icon" />
            <span class="icon-name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeFlag: 0,
      headerItem: [
        {
          name: "棋牌游戏",
          introduce: "POKER GAMES",
          detailed:
            "汇聚全球顶级竞技棋牌中心，炸金花，斗地主，百家乐，万人在线，火热pk！天天送豪礼！",
          bImg: "/static/cjw/img/home/bimg1.png",
          icons: [
            { name: "开元棋牌", icon: "KY-icons1" ,link:'/home/chess?navid=9&id=10042'},
            { name: "天游棋牌", icon: "KY-icons2" ,link:'/home/chess?navid=9&id=10694'},
            { name: "乐游棋牌", icon: "KY-icons3" ,link:'/home/chess?navid=9&id=10612'},
            { name: "VG棋牌", icon: "KY-icons4" ,link:'/home/chess?navid=9&id=10041'},
            { name: "FG棋牌", icon: "KY-icons5" ,link:'/home/chess?navid=9&id=10732'},
            { name: "更多游戏", icon: "more-icon" ,link:'/home/chess?navid=9&id=0'}
          ]
        },
        {
          name: "彩票游戏",
          introduce: "LOTTERY",
          detailed:
            "提供快速时时彩，快速赛车，等各地彩票在线投注，保证公平公开让你快乐游戏",
          bImg: "/static/cjw/img/home/bimg2.png",
          icons: [
            { name: "快速时时彩", icon: "CP-icons1",link:'#/plays/tradition/16',id:16},
            { name: "欢乐生肖", icon: "CP-icons2" ,link:'#/plays/tradition/4',id:4},
            { name: "快速赛车", icon: "CP-icons3" ,link:'#/plays/tradition/12',id:12},
            { name: "幸运赛车", icon: "CP-icons4" ,link:'#/plays/tradition/3630',id:3630},
            { name: "快速六合彩", icon: "CP-icons5" ,link:'#/plays/tradition/18',id:18},
            { name: "香港六合彩", icon: "CP-icons6" ,link:'#/plays/tradition/1',id:1}
          ]
        },
        {
          name: "电子游戏",
          introduce: "SLOT GAMES",
          detailed:
            "全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
          bImg: "/static/cjw/img/home/bimg3.png",
          icons: [
            { name: "AG电子", icon: "DZ-icons1" ,link:'home/slot?navid=9&id=10015'},
            { name: "MG电子", icon: "DZ-icons2" ,link:'home/slot?navid=9&id=10022'},
            { name: "PT电子", icon: "DZ-icons3" ,link:'home/slot?navid=9&id=10024'},
            { name: "JDB电子", icon: "DZ-icons4" ,link:'home/slot?navid=9&id=10021'},
            { name: "CQ9电子", icon: "DZ-icons5",link:'home/slot?navid=9&id=10018' },
            { name: "FG电子", icon: "DZ-icons6" ,link:'home/slot?navid=9&id=10020'}
          ]
        },
        {
          name: "捕鱼游戏",
          introduce: "GISH GAMES",
          detailed:
            "提供各类捕鱼平台，奖金高达1000倍，大炮一响黄金万两，等你来袭！",
          bImg: "/static/cjw/img/home/bimg4.png",
          icons: [
            { name: "AG捕鱼", icon: "BY-icons1",link:'/home/fish?navid=9&id=10055'},
            { name: "MW捕鱼", icon: "BY-icons2" ,link:'/home/fish?navid=9&id=10053'},
            { name: "JDB捕鱼", icon: "BY-icons3" ,link:'/home/fish?navid=9&id=10054'},
            { name: "FG美人捕鱼", icon: "BY-icons4" ,link:'/home/fish?navid=9&id=10056'},
            { name: "BG捕鱼", icon: "BY-icons6" ,link:'/home/fish?navid=9&id=10058'},
            { name: "PT捕鱼", icon: "BY-icons5" ,link:'/home/fish?navid=9&id=11677'}
          ]
        },
        {
          name: "体育赛事",
          introduce: "STORTS",
          detailed:
            "汇聚全球顶级经典赛事，欧洲杯，世界杯，篮球，网球，排球，F!赛车等各赛事！",
          bImg: "/static/cjw/img/home/bimg5.png",
          icons: [
            { name: "沙巴体育", icon: "TY-icons1",link:'/home/tiyu' },
            { name: "三昇体育", icon: "TY-icons2",link:'/home/tiyu'  },
            { name: "皇冠体育", icon: "TY-icons5",link:'/home/tiyu'  },
           { name: "IM体育", icon: "TY-icons6",link:'/home/tiyu'  },
            { name: "更多游戏", icon: "more-icon" ,link:'/home/tiyu' }
          ]
        }
      ],
      bottomData: {}
    };
  },
  methods: {
    changeBottom(item, i) {
      this.activeFlag = i;
      this.bottomData = item;
    },
    goLink(item) {
      if(item.link.includes('#/plays/tradition')){
           if(!localStorage.token || !localStorage.userinfo){
            this.$store.commit('alert/newshowtip',{
              bool:true,
              title:'请先登录！',
              model:'',
              leftspan:true
           })
          }else{
            this.$store.dispatch('lottery/getStopLotteryCheck',item).then(res=>{
                if(res&&res.length >0 ){
                   this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: '',
                        type:'closeMaret',
                    });
                }else{
                      window.open(item.link)
                }
            })
          }
        }else{
          this.$router.push(item.link)
        }
    }
  },
  created() {
    this.changeBottom(this.headerItem[0], this.activeFlag);
  }
};
</script>

<style lang="less" scoped>
.pull-left {
  float: left !important;
}
.topImg{
  margin-top: 15px;
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

.animationName(@name,@time){
  animation-delay:2s;
  animation: @name 0.5s @time 1;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode:forwards;
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

.game-list {
  position: relative;
  width: 1200px;
  height: 350px;
  margin: 20px auto 0;
  background: url("/static/cjw/img/home/game-list-bg.png") no-repeat;
  font-family: Microsoft YaHei !important;
  top: 2000px;
  &.slideTop{.animationName(slideTop,1s)}
  .keyFrames3(slideTop,2000px,0);
  .header-list {
    height: 78px;
    border-bottom: 1px solid #71C9FF;
    display: flex;
    cursor: pointer;
    .header-item {
      position: relative;
      flex: 1;
      .item-icon {
        position: absolute;
        left: 50px;
        top: 18px;
        width: 54px;
        height: 46px;
        z-index: 1;
        &.item-icon1 {
          background: url(/static/cjw/img/home/pokerGame.png) no-repeat;
        }
        &.item-icon2 {
          background: url(/static/cjw/img/home/lottery.png) no-repeat;
        }
        &.item-icon3 {
          background: url(/static/cjw/img/home/slotGame.png) no-repeat;
        }
        &.item-icon4 {
          background: url(/static/cjw/img/home/fishGame.png) no-repeat;
        }
        &.item-icon5 {
          background: url(/static/cjw/img/home/storts.png) no-repeat;
        }
      }
      .item-area {
        position: absolute;
        top: 18px;
        left: 110px;
        text-align: center;
        z-index: 1;
        .item-name {
          font-size: 20px;
          font-weight: 400;
          color: #fff;
          margin-top: 2px;
        }
        .item-introduce {
          font-size: 11px;
          font-weight: 400;
          color: #fff;
          margin-top: 6px;
        }
      }
      .shuxian {
        position: absolute;
        top: 8px;
        right: 0;
      }
      .mask {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
      }
      &.active,
      &:hover {
        .mask {
          display: block;
        }
        .item-name,
        .item-introduce {
          color: #0086D7;
        }
        .item-icon1 {
          background: url(/static/cjw/img/home/acPokerGame.png) no-repeat;
        }
        .item-icon2 {
          background: url(/static/cjw/img/home/acLottery.png) no-repeat;
        }
        .item-icon3 {
          background: url(/static/cjw/img/home/acSlotGame.png) no-repeat;
        }
        .item-icon4 {
          background: url(/static/cjw/img/home/acFishGame.png) no-repeat;
        }
        .item-icon5 {
          background: url(/static/cjw/img/home/acStorts.png) no-repeat;
        }
      }
    }
  }
  .game-content {
    .left-image {
      margin-top: 10px;
      margin-left: 18px;
    }
    .right-text {
      margin-left: 26px;
      .title {
        margin-top: 24px;
        .title-name {
          font-size: 26px;
          font-weight: 400;
          color: #fff;
        }
        .title-introduce {
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          margin-left: 12px;
        }
      }
      .detailed {
        font-size: 15px;
        font-weight: 400;
        color: #fff;
        height: 38px;
        margin-top: 22px;
        border-bottom: 1px solid #71C9FF;
      }
      ul {
        .icons-area {
          position: relative;
          float: left;
          height: 81px;
          margin-top: 24px;
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
            bottom: 0;
            width: 100%;
            text-align: center;
            display: block;
            font-size: 14px;
            font-weight: 400;
            color: #fff;
            margin-top: 10px;
          }
          &:hover {
            .icon{
              transform: rotate(1turn);
            }
          }
        }
      }
    }
  }
}
</style>