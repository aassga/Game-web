<template>
    <div id="maincontainer">
        <div class="qpcontent">
            <!-- 一级导航 -->
            <div class="list_nav" :style="themes.allbgStyle">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :style="[nav_active == item.id?themes.oneCheckedStyle:themes.oneStyle]" @click="setNav(item)"><p>{{item.name}}</p></li>
                </ul>
                <div class="seek">
                    <img :src="'/static/'+themes.name+'/img/new_games/coin-l.png'" alt="">
                    <input type="text" placeholder="请输入游戏名称" ref="inputVal" :style="themes.inputStyle" v-model="iptVal" @keyup.enter="search()">
                    <a href="javascript:void(0);" @click="search()" :style="{background:themes.oneCheckedStyle.background}">
                        <i :style="{background:'url(/static/'+themes.name+'/img/new_games/sou.png) center center/100% no-repeat'}"></i>
                    </a>
                </div>
            </div>
            <!-- 平台导航 -->
            <div class="content_box" v-show="nav_active == 9" :style="themes.allbgStyle">
                <div class="list_gams" v-show="nav_active == 9">
                    <ul>
                        <li v-for="(item,index) in listDatas.platform" :key="index">
                            <div :class="['gams_list',active == item.id ? 'active' : '']" @click="setGameMaker(item)" :style="{borderRight:themes.borderStyle}">
                                 <img :src="'/static/' +themes.name+ '/img/new_games/new_icon'+ (active == item.id ? '_a/' : '/') + item.id+'.png'" :alt="index">
                                <p :style="[active == item.id?themes.twoCheckedStyle:themes.twoStyle]">{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 推荐游戏 -->
            <div class="content_boxer" v-show="nav_active !=9&&swiperList.length>0" :style="themes.allbgStyle">
                <div class="title_line" v-show="nav_active != 9"><img :src="'/static/'+themes.name+'/img/new_games/tjyx.png'" alt=""></div>
                <div class="list_gamser" v-show="nav_active != 9">
                    <span class="slidePrev" @click="setSwiper(5)"  @mouseover="changeSrc1" @mouseout="changeSrc2" ><i :style="{background:'url('+leftImageSrc+') center center / 17px no-repeat'}"></i></span>
                    <swiper :options="swiperOption2" ref="mySwiper2">
                        <swiper-slide v-for="(item,index) in swiperList" :key="index">
                            <div class="gams_lister">
                                <ul class="img_boxer" :style="themes.liStyle">
                                    <li v-for="(it, index) in item.list" :key="index" :style="themes.liStyle">
                                        <img v-lazy="it.icon" alt="">
                                        <i v-show="it.Hot == 1"></i>
                                        <p :style="{color:themes.otherColor.leftColor}" >{{it.name}}</p>
                                        <div class="list_btn">
                                            <span class="begin" :style="themes.btnColor" @click="loginGame(it)">开始游戏</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <span class="slideNext" @click="setSwiper(6)" @mouseover="changeSrc3" @mouseout="changeSrc4"><i :style="{background:'url('+rightImageSrc+') center center / 17px no-repeat'}"></i></span>
                </div>
            </div>
            <!-- 展示列表 -->
            <div class="list_box" :style="themes.allbgStyle">
                <div class="box">
                    <img src="/static/public/image/game/new_games/coin-r.png" class="img_l" alt="">
                    <img src="/static/public/image/game/new_games/coin-l1.png" class="img_r" alt="">

                    <ul class="list_type"  v-show="nav_active == 9 && GameTypeList.length>1" :style="{borderBottom:themes.borderColor}">
                        <li class="top" :style="themes.twoCheckedStyle">游戏类型：</li>
                        <li v-for="(item, index) in GameTypeList" :key="index" :style="[gameType_active == item.id?themes.fourCheckedStyle:themes.fourStyle]" @click="setGameType(item)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line"  v-show="nav_active == 9 && gameTitleList.length>1" :style="{borderBottom:themes.borderColor}">
                        <li class="top" :style="themes.twoCheckedStyle" >赔付线数：</li>
                        <li v-for="(item, index) in gameTitleList" :key="index" :style="[gameType_active == item.id?themes.fourCheckedStyle:themes.fourStyle]"  @click="setGameTitle(item)">{{item.name}}</li>
                    </ol>
                    <div class="title_line" v-show="nav_active != 9"><img :src="'/static/'+themes.name+'/img/new_games/'+this.showName+'_bg.png'" alt="" v-if="showName!=''"></div>
                    <div class="noSuit" v-show="searchListShow">
                        <span :style="themes.Souti" >未找到符合条件的相关游戏 , 以下是为您推荐的热门游戏</span>
                    </div>
                    <div class="noSuit" v-show="showGameList.length<1">
                        <span :style="themes.Souti" >—————————— 未找到符合条件的相关游戏 ——————————</span>
                    </div>
                    <ul class="img_box">
                        <li v-for="(item, index) in showGameList" :key="index" :style="themes.liStyle">
                            <div class="itemBox">
                                <img v-lazy="item.icon" alt="">
                            </div>
                            <i v-show="item.Hot == 1"></i>
                            <div class="textBox">
                                <span class="leftName" :style="themes.otherColor.leftColor">{{item.name}}</span>
                                <span class="rightName">{{idToName(item.upid)}}</span>
                            </div>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)" :style="themes.btnColor" >开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item,index)" :style="{background:'url(/static/'+themes.name+'/img/new_games/qxshoucang.png) center center no-repeat'}"></span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item,index)" :style="{background:'url(/static/'+themes.name+'/img/new_games/shoucang.png) center center no-repeat'}"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from "../games/public.js";
import qpmixin from "./alltype.js";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  mixins: [mixin, qpmixin],
  components: {
    swiper,
    swiperSlide
  },
  props: {
    themes: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
#maincontainer {
  .qpcontent {
    width: 100%;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    .list_nav {
      position: relative;
      width: 1000px;
      height: 60px;
      margin: 0 auto 20px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      & > ul {
        width: 950px;
        height: 60px;
        overflow: hidden;
        li {
          width: 97px;
          height: 60px;
          line-height: 60px;
          display: inline-block;
          transform: skewX(20deg);
          text-align: center;
          cursor: pointer;
          p {
            transform: skewX(-20deg);
            font-size: 16px;
          }
        }
        li.active {
          background: linear-gradient(#ffb55a, #ff5f00);
          p {
            color: #fff;
          }
        }
        li:first-child {
          margin-left: -10px;
          padding-left: 12px;
        }
      }
      .seek {
        width: 268px; // 搜索框外层修改我268px
        height: 60px;
        position: relative;
        padding-right: 20px; // 右内边距修改为20px
        display: flex;
        justify-content: flex-end;
        align-items: center;
        input {
          position: absolute;
          top: 15px;
          right: 63px;
           width: 155px; // 搜索框修改为155px
          height: 31px;
          line-height: 31px;
          font-size: 14px;
          padding: 0 10px;
          z-index: 1;
          display: inline-block;
          border: 1px solid #dcdcdc;
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          outline: none;
        }
        a {
          position: absolute;
          top: 15px;
          right: 23px; // 按钮往右23px
          display: inline-block;
          width: 40px; // 搜索按钮宽度修改为40px
          height: 31px;
          z-index: 1;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          background: linear-gradient(#ffb55a, #ff5f00);
          cursor: pointer;
          i {
            display: block;
            width: 22px;
            height: 22px;
            margin: 5px auto;
            background: url(/static/public/image/game/new_games/sou.png) center
              center / 100% no-repeat;
          }
        }
        img {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 220px; // 搜索框背景图片修改为220px
          height: 60px;
        }
      }
    }
    .content_box {
      width: 1000px;
      margin: 0 auto;
      .list_img {
        position: relative;
        width: 1000px;
        height: 119px;
        margin: 20px auto;
        padding: 0 40px;
        display: flex;
        & > span {
          position: absolute;
          top: 0;
          display: flex;
          width: 30px;
          height: 100%;
          justify-content: center;
          align-items: center;
          background: #fff;
          cursor: pointer;
          i {
            display: block;
            width: 17px;
            height: 33px;
          }
        }
        .list_img_btn {
          padding: 0 10px;
          overflow: hidden;
          img {
            width: 500px;
            cursor: pointer;
          }
        }
      }
      .list_gams {
        position: relative;
        width: 1000px;
        height: 119px;
        margin: 20px auto;
        display: flex;
        ul {
          li {
            float: left;
            .gams_list {
              width: 140px;
              height: 119px;
              // border-right: 1px dashed #eee;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img {
                width: 55%;
                margin: 0 auto;
              }
              p {
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .content_boxer {
      width: 1000px;
      height: 319px;
      margin: 0 auto;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      background-color: #fff;
      position: relative;
      .img_bg {
        position: absolute;
        top: 0;
        left: 0;
      }
      .title_line {
        padding-left: 30px;
        padding-top: 20px;
        height: 38px;
        img {
          height: 18px;
        }
      }
      .list_img {
        position: relative;
        width: 1000px;
        height: 307px;
        margin: 20px auto;
        padding: 0 40px;
        display: flex;
        & > span {
          position: absolute;
          top: 0;
          display: flex;
          width: 30px;
          height: 100%;
          justify-content: center;
          align-items: center;
          background: #fff;
          cursor: pointer;
          i {
            display: block;
            width: 17px;
            height: 33px;
          }
        }
        .slidePrev {
          left: 0;
        }
        .slideNext {
          right: 0;
        }
        .slideNext:hover {
        }
        .list_img_btn {
          padding: 0 10px;
          overflow: hidden;
          img {
            width: 500px;
            cursor: pointer;
          }
        }
      }
      .list_gamser {
        position: relative;
        width: 1000px;
        height: 282px;
        padding: 0 30px;
        display: flex;
        & > span {
          position: absolute;
          top: 0;
          display: flex;
          width: 30px;
          height: 100%;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i {
            display: block;
            width: 17px;
            height: 33px;
          }
        }
        .slidePrev {
          left: 0;
        }
        .slideNext {
          right: 0;
        }
        .gams_lister {
          width: 1140px;
          height: 282px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .img_boxer {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            li {
              position: relative;
              width: 200px;
              height: 232px;
              padding: 11px 11px 0 11px;
              margin-left: 16px;
              margin-right: 11px;
              overflow: hidden;
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              img {
                width: 178px;
                height: 178px;
                border-radius: 4px;
              }
              i {
                position: absolute;
                top: 18px;
                right: 20px;
                display: block;
                width: 20px;
                height: 26px;
                background: url(/static/public/image/game/new_games/top.png)
                  center center / 70px no-repeat;
              }
              p {
                font-size: 16px;
                text-align: center;
                line-height: 42px;
              }
              div.list_btn {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                background: rgba(0, 0, 0, 0);
                z-index: 0;
                transition: all 0.3s;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                & > span {
                  display: block;
                  width: 114px;
                  height: 36px;
                  line-height: 36px;
                  text-align: center;
                  font-size: 16px;
                  margin-bottom: 20px;
                  border-radius: 4px;
                  cursor: pointer;
                }
              }
            }
            li:nth-child(5n + 5) {
              margin-right: 0;
            }
            li:hover {
              div.list_btn {
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1;
              }
            }
          }
        }
        div.active {
          p {
            color: #eb410a;
          }
        }
      }
    }
    .list_box {
      width: 1000px;
      margin: 20px auto;
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      .box {
        position: relative;
        width: 1000px;
        padding: 20px 30px;
        background: rgba(0, 0, 0, 0);
        .img_l {
          position: absolute;
          left: -45px;
          top: 20px;
          width: 141px;
        }
        .img_r {
          position: absolute;
          top: -20px;
          right: -105px;
          width: 266px;
        }
        .list_type,
        .list_line {
          width: 100%;
          height: 42px;
          display: flex;
          align-items: center;
          li {
            height: 25px;
            line-height: 25px;
            padding: 0 10px;
            color: #5b6168;
            cursor: pointer;
          }
          li:first-child {
            padding: 0;
            cursor: default;
          }
        }
        .title_line {
          height: 18px;
          img {
            height: 18px;
          }
        }
        .img_box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;
          justify-content: flex-start;
          align-items: center;
          li {
            position: relative;
            width: 165px; // 游戲列表项修改为165px
            height: 232px;
            padding: 11px 11px 0 11px;
            margin-bottom: 20px;
            margin-right: 28px; // 右边距修改为28px
            overflow: hidden;
            box-shadow: rgba(238, 238, 238, 0.5) 0px 1px 4px 2px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .itemBox {
              width: 165px;
              height: 178px;
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              img {
                width: 143px; // 图片修改为143px
                height: 165px;// 图片高度修改为165px
              }
              span {
                font-size: 14px;
                text-align: center;
                width: 52px;
                height: 22px;
                line-height: 22px;
                background-color: #008e64;
                border-bottom-right-radius: 6px;
                border-top-right-radius: 6px;
                color: #fff;
                position: absolute;
                left: 0;
                bottom: 0;
              }
            }
            i {
              position: absolute;
              top: 18px;
              right: 20px;
              display: block;
              width: 20px;
              height: 26px;
              background: url(/static/public/image/game/new_games/top.png)
                center center / 70px no-repeat;
            }
            .textBox {
              width: 178px;
              height: 42px;
              position: relative;
              span {
                position: absolute;
                top: 0;
                font-size: 16px;
                text-align: center;
                margin: 15px 0;
              }
              .leftName {
                right: 10px;
                text-overflow:ellipsis;
                overflow:hidden;
                white-space:nowrap;
                width: 178px;
                color: #fff;
              }
              .rightName {
                right: 0;
                color: #ac727c;
              }
            }
            div.list_btn {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0;
              background: rgba(0, 0, 0, 0);
              z-index: 0;
              transition: all 0.3s;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              & > span {
                display: block;
                width: 114px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                font-size: 16px;
                margin-bottom: 20px;
                border-radius: 4px;
                cursor: pointer;
              }
              .collect {
                background-size: 36px 36px;
              }
              .collectY {
                background-size: 36px 36px;
              }
            }
          }
          li:nth-child(5n + 5) {
            margin-right: 0;
          }
          li:hover {
            div.list_btn {
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1;
            }
          }
        }
        .noSuit {
          width: 100%;
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 16px;
            color: #ffb359;
          }
        }
      }
    }
  }
}
</style>
