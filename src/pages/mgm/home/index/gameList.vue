<template>
  <div class="game-list slideTop">
    <div class="header-top"></div>
    <div class="header-list">
      <div class="list_left">
          <ul>
              <li  v-for="(item,i) in headerItem" :key="i" @mouseover="changeBottom(item,i)" :class="[activeFlag === i ? 'active' : '']">
                <div class="libox_img">
                  <img :src="item.bImg" />
                </div>
                <div class="libox_text">
                    <h5>{{item.name}}</h5>
                    <h6>{{item.introduce}}</h6>
                </div>
              </li>
          </ul>
      </div>
      <div class="list_right">
          <div class="right_box">
            <img class="right_pic" :src="bottomData.showImg" alt="">
          </div>
          <div class="right_text">
            <img class="txt_pic" :src="bottomData.icon" alt="">
            <h5>{{bottomData.name}}</h5>
            <p>{{bottomData.detailed}}</p>
            <img class="txt_btn" src="/static/mgm/img/home/more-game.png" alt="" @click="goLink(bottomData.link)">
          </div>
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
          name: "捕鱼游戏",
          introduce: "Fishing",
          detailed:"提供各类捕鱼平台，奖金高达1000倍，大炮一响黄金万两，等你来袭！",
          bImg:"/static/mgm/img/home/home_bot3_2.png",
          showImg:"/static/mgm/img/home/fish_bg1.png",
          icon:"/static/mgm/img/home/icon_buyu.png",
          link:"/home/fish?navid=9&id=0",
        },
        {
          name: "真人视讯",
          introduce: "Live Casino",
          detailed:"全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
          bImg:"/static/mgm/img/home/home_bot3_1.png",
          showImg:"/static/mgm/img/home/fish_bg3.png",
          icon:"/static/mgm/img/home/icon_zhenren.png",
          link:"/home/live",
        },
        {
          name: "体育赛事",
          introduce: "Sports",
          detailed:"汇聚全球顶级经典赛事，欧洲杯，世界杯，篮球，网球，排球，F!赛车等各赛事！",
          bImg:"/static/mgm/img/home/home_bot3_3.png",
          showImg:"/static/mgm/img/home/fish_bg2.png",
          icon:"/static/mgm/img/home/icon_tiyu.png",
          link:"/home/tiyu?id=0",
        }
      ],
      bottomData:{
        name: "真人视讯",
        introduce: "casino",
        detailed:"全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
        bImg: "/static/mgm/img/home/home_bot3_1.png",
        showImg:"/static/mgm/img/home/fish_bg1.png",
        icon:"/static/mgm/img/home/icon_zhenren.png",
        link:"/home/games",
      },
    }
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
  width: 100%;
  height:562px;
  margin: 20px auto 0;
  font-family: Microsoft YaHei !important;
  top: 2000px;
  &.slideTop{.animationName(slideTop,1s)}
  .keyFrames3(slideTop,2000px,0);
  .header-top{
    width: 100%;
    height: 44px;
    background: #1b1533 url("/static/mgm/img/home/game-list-bg.png") top center repeat-x;
    background-size: 100% 44px;
  }
  .header-list{
    width: 1200px;
    height: 518px;
    margin: 0 auto;
    background: #1b1533;
    font-family: Microsoft YaHei !important;
    top: 2000px;
    &.slideTop{.animationName(slideTop,1s)}
    .keyFrames3(slideTop,2000px,0);
        .list_left{
            float: left;
            width: 284px;
            height: 518px;
            background: #1b1533;
            ul{
                padding-top: 29px;
                li{
                    width: 284px;
                    height: 130px;
                    background:url("/static/mgm/img/home/img_bg.png") center center no-repeat;
                    background-size: contain;
                    margin-bottom: 13px;
                    .libox_img{
                        float: left;
                        width: 99px;
                        height: 99px;
                        margin: 16px 0 0 20px;
                        img{
                          width: 99px;
                          height: 99px;
                        }
                    }
                    .libox_text{
                        float: left;
                        width: 154px;
                        height: 130px;
                        text-align: center;
                        h5{
                            font-size:23px;
                            line-height: 23px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(175,161,233,1);
                            padding-top: 39px;
                        }
                        h6{
                            font-size:20px;
                            line-height: 20px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(99,88,150,1);
                            padding-top: 12px;
                        }
                    }
                }
                .active{
                    background:url("/static/mgm/img/home/img_check.png") center center no-repeat;
                    background-size: contain;
                }
            }
        }
        .list_right{
            float: left;
            width: 916px;
            height: 518px;
            .right_box{
                float: left;
                width: 626px;
                height: 518px;
                .right_pic{
                  width: 626px;
                  height: 518px;
                }
            }
            .right_text{
                float: left;
                width: 290px;
                height: 518px;
                text-align: center;
                .txt_pic{
                    width: 74px;
                    height: 74px;
                    margin-top: 54px;
                }
                h5{
                    font-size: 39px;
                    line-height: 39px;
                    font-weight:400;
                    color:rgba(180,171,218,1);
                    font-family:Microsoft YaHei;
                    padding-top: 14px;
                }
                p{
                    line-height: 30px;
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(146,136,189,1);
                    padding-top: 28px;
                }
                .txt_btn{
                    width: 270px;
                    height: 110px;
                    cursor: pointer;
                }
                .txt_btn:hover{
                     transform: scale(1.05);
                     transition: all .5s ease-in-out;
                }
            }
        }
    }
  .game-content {
    width: 916px;
    height: 558px;
    float: left;
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