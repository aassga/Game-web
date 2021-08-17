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
        <!-- <img :class="[`item-icon${i + 1}`,'item-icon','pull-left'] " :src="activeFlag === i ? item.acIcon : item.icon" alt=""> -->
        <div class="item-area pull-left">
          <div class="item-name">{{item.name}}</div>
          <div class="item-introduce">{{item.introduce}}</div>
        </div>
        <img class="shuxian" src="/static/pjdc/img/home/game-list-header.png" alt />
        <img src="/static/pjdc/img/home/game-list-mask.png" alt class="mask" />
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
          <li v-for="(item,i) in bottomData.icons" :key="i" :class="[item.icon == 'TY-icons1' ? 'theWidth':'']" class="icons-area" @click="goLink(item.link)">
            <img :class="item.icon == 'TY-icons2' ? 'sanSheng': item.icon == 'KY-icons4' ? 'agTop' : item.icon == 'DZ-icons1' ? 'cqTop' : item.icon == 'BY-icons5' ? 'agTop' : item.icon == 'DZ-icons4' ? 'sanSheng' : item.icon == 'DZ-icons5' ? 'sanSheng' : item.icon == 'BY-icons3' ? 'sanSheng' : item.icon == 'KY-icons3' ? 'sanSheng' : item.icon == 'BY-icons6' ? 'bgTop' : item.icon == 'DZ-icons7' ? 'bgTop' :item.icon == 'KY-icons6' ? 'mt': ''" :src="`/static/pjdc/img/home/${item.icon}.png`" alt class="icon" />
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
          bImg: "/static/pjdc/img/home/bimg1.png",
          icons: [
            { name: "开元棋牌", icon: "KY-icons1" ,link:'/home/chess?navid=9&id=10042'},
            { name: "天游棋牌", icon: "KY-icons2" ,link:'/home/chess?navid=9&id=10694'},
            { name: "乐游棋牌", icon: "KY-icons3" ,link:'/home/chess?navid=9&id=10612'},
            { name: "VG棋牌", icon: "KY-icons4" ,link:'/home/chess?navid=9&id=10041'},
            { name: "MT棋牌", icon: "KY-icons6" ,link:'/home/chess?navid=9&id=11775'},
            { name: "更多游戏", icon: "more-icon" ,link:'home/chess?navid=9&id=0'}
          ]
        },
        {
          name: "彩票游戏",
          introduce: "LOTTERY",
          detailed:
            "提供快速时时彩，快速赛车，等各地彩票在线投注，保证公平公开让你快乐游戏",
          bImg: "/static/pjdc/img/home/bimg2.png",
          icons: [
            { name: "快速时时彩", icon: "CP-icons1",link:'#/plays/hall'},
            { name: "欢乐生肖", icon: "CP-icons2" ,link:'#/plays/hall'},
            { name: "快速赛车", icon: "CP-icons3" ,link:'#/plays/hall'},
            { name: "幸运赛车", icon: "CP-icons4" ,link:'#/plays/hall'},
            { name: "快速六合彩", icon: "CP-icons5" ,link:'#/plays/hall'},
            { name: "三分时时彩", icon: "CP-icons7" ,link:'#/plays/hall'}
          ]
        },
        {
          name: "电子游戏",
          introduce: "SLOT GAMES",
          detailed:
            "全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
          bImg: "/static/pjdc/img/home/bimg3.png",
          icons: [
            { name: "AG电子", icon: "DZ-icons1" ,link:'/home/slot?navid=9&id=10015'},
            { name: "MG电子", icon: "DZ-icons2" ,link:'/home/slot?navid=9&id=10022'},
            { name: "PT电子", icon: "DZ-icons3" ,link:'/home/slot?navid=9&id=10024'},
            { name: "CQ9电子", icon: "DZ-icons4",link:'/home/slot?navid=9&id=10018'},
            { name: "JDB电子", icon: "DZ-icons5",link:'/home/slot?navid=9&id=10021'},
            { name: "PG电子", icon: "DZ-icons7" ,link:'/home/slot?navid=9&id=11320'}
          ]
        },
        {
          name: "捕鱼游戏",
          introduce: "GISH GAMES",
          detailed:
            "提供各类捕鱼平台，奖金高达1000倍，大炮一响黄金万两，等你来袭！",
          bImg: "/static/pjdc/img/home/bimg4.png",
          icons: [
            { name: "JDB财神捕鱼", icon: "BY-icons3" ,link:'home/fish?navid=9&id=10054'},
            { name: "JDB五龙捕鱼", icon: "BY-icons3" ,link:'home/fish?navid=9&id=10054'},
            { name: "3D捕鱼", icon: "BY-icons1",link:'home/fish?navid=9&id=10055'},
            { name: "BG捕鱼", icon: "BY-icons6",link:'home/fish?navid=9&id=10058'},
            { name: "CQ9黄金渔场", icon: "BY-icons5",link:'home/fish?navid=9&id=10057'},
            { name: "MW捕鱼", icon: "BY-icons2" ,link:'home/fish?navid=9&id=10053'},
          ]
        },
        {
          name: "体育赛事",
          introduce: "STORTS",
          detailed:
            "汇聚全球顶级经典赛事，欧洲杯，世界杯，篮球，网球，排球，F1赛车等各赛事！",
          bImg: "/static/pjdc/img/home/bimg5.png",
          icons: [
            { name: "沙巴体育", icon: "TY-icons1",link:'/home/tiyu?id=38' },
            { name: "IM体育", icon: "TY-icons5",link:'/home/tiyu?id=11368'},
            { name: "皇冠体育", icon: "huangguan",link:'/home/tiyu?id=39'},
            { name: "更多游戏", icon: "more-icon" ,link:'/home/tiyu?id=0'}
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
    goLink(link) {
      if(link === '#/plays/hall') window.open(link)
      this.$router.push(link)
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
.theWidth{
  margin-right: 40px!important;
}
.mt{
  width: 85px;
  margin-top: -13px;
}
.pull-right {
  float: right !important;
}
.cqTop{
  margin-top: 6px;
}
.agTop{
  margin-top: 7px;
}
.bgTop{
  margin-top: -10px;
}
.sanSheng{
  margin-top: 10px;
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
  background: url("/static/pjdc/img/home/game-list-bg.png") no-repeat;
  font-family: Microsoft YaHei !important;
  top: 2000px;
  &.slideTop{.animationName(slideTop,1s)}
  .keyFrames3(slideTop,2000px,0);
  .header-list {
    height: 78px;
    border-bottom: 1px solid #7d2b28;
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
          background: url(/static/pjdc/img/home/pokerGame.png) no-repeat;
        }
        &.item-icon2 {
          background: url(/static/pjdc/img/home/lottery.png) no-repeat;
        }
        &.item-icon3 {
          background: url(/static/pjdc/img/home/slotGame.png) no-repeat;
        }
        &.item-icon4 {
          background: url(/static/pjdc/img/home/fishGame.png) no-repeat;
        }
        &.item-icon5 {
          background: url(/static/pjdc/img/home/storts.png) no-repeat;
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
          color: #f49f99;
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
          color: #561d1b;
        }
        .item-icon1 {
          background: url(/static/pjdc/img/home/acPokerGame.png) no-repeat;
        }
        .item-icon2 {
          background: url(/static/pjdc/img/home/acLottery.png) no-repeat;
        }
        .item-icon3 {
          background: url(/static/pjdc/img/home/acSlotGame.png) no-repeat;
        }
        .item-icon4 {
          background: url(/static/pjdc/img/home/acFishGame.png) no-repeat;
        }
        .item-icon5 {
          background: url(/static/pjdc/img/home/acStorts.png) no-repeat;
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
      margin-left: 17px;
      .title {
        margin-top: 24px;
        .title-name {
          font-size: 26px;
          font-weight: 400;
          color: #fbdd7e;
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
        color: #f49f99;
        height: 38px;
        margin-top: 22px;
        border-bottom: 1px solid #7d2b28;
      }
      ul {
        // display: flex;
        .icons-area {
          position: relative;
          float: left;
          height: 81px;
          margin-top: 24px;
          margin-right: 22px;
          text-align: center;
          min-width: 76px;
          cursor: pointer;
          // &:nth-child(2){
          //   margin-left: 25px;
          // }
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
      }
    }
  }
}
</style>