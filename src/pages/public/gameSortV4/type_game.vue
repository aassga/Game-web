<template>
  <div id="maincontainer">
    <div class="content">
      <div
        class="list_nav"
        :class="`list_${themes.clientWidth}`"
        :style="themes.allbgStyle"
      >
        <ul>
          <li
            v-for="(item, index) in list_nav"
            :key="index"
            :style="[
              nav_active == item.id ? themes.oneCheckedStyle : themes.oneStyle,
            ]"
            @click="setNav(item)"
          >
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <div class="seek">
          <img
            :src="'/static/' + themes.name + '/img/new_games/coin-l.png'"
            alt=""
          />
          <input
            type="text"
            placeholder="请输入游戏名称"
            ref="inputVal"
            :style="themes.inputStyle"
            v-model="iptVal"
            @keyup.enter="search()"
          />
          <a
            href="javascript:void(0);"
            @click="search()"
            :style="{ background: themes.oneCheckedStyle.background }"
          >
            <i
              :style="{
                background:
                  'url(/static/' +
                  themes.name +
                  '/img/new_games/sou.png) center center/100% no-repeat',
              }"
            ></i>
          </a>
        </div>
      </div>
      <div
        class="content_box"
        :class="`content_${themes.clientWidth}`"
        ref="gameMenu"
        v-if="nav_active == 9"
      >
        <div class="mainbox">
          <ul
            class="game_type"
            :class="`theme_${themes.name}`"
            v-if="
              ['935qp', '632qp', 'kyqp', '839qp', 'k78qp'].includes(
                this.$websiteName
              )
            "
          >
            <li
              :class="[
                item.name == '全部' ? 'slot_0' : '',
                active == item.gcid ? 'active' : '',
              ]"
              :key="index"
              @click="setGameMaker(item)"
              v-for="(item, index) in gameKind"
              v-if="item.gcid != 10024 && item.gcid != 11677"
            >
              <div style="display: flex; justify-content: center">
                <p
                  class="game_icon"
                  :class="[
                    { newactive: active == item.gcid },
                    item.gcid != 0 ? `slot_${item.gcid}` : '',
                  ]"
                ></p>
              </div>
              <span v-if="item.gcid != 0 && item.name != '全部'">{{
                item.name
              }}</span>
            </li>
          </ul>
          <ul class="game_type" :class="`theme_${themes.name}`" v-else>
            <li
              :class="[
                item.name == '全部' ? 'slot_0' : '',
                active == item.gcid ? 'active' : '',
              ]"
              :key="index"
              @click="setGameMaker(item)"
              v-for="(item, index) in gameKind"
            >
              <div style="display: flex; justify-content: center">
                <p
                  class="game_icon"
                  :class="[
                    { newactive: active == item.gcid },
                    item.gcid != 0 ? `slot_${item.gcid}` : '',
                  ]"
                ></p>
              </div>
              <span v-if="item.gcid != 0 && item.name != '全部'">{{
                item.name
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 推荐游戏 -->
      <div
        class="content_boxer"
        :class="`content_boxer_${themes.clientWidth}`"
        v-if="nav_active != 9 && swiperList.length > 0"
        :style="themes.allbgStyle"
      >
        <div class="title_line" v-if="nav_active != 9">
          <img
            :src="'/static/' + themes.name + '/img/new_games/tjyx.png'"
            alt=""
          />
        </div>
        <div class="list_gamser" v-if="nav_active != 9">
          <span
            class="slidePrev"
            @click="setSwiper(6)"
            @mouseover="changeSrc1"
            @mouseout="changeSrc2"
            ><i
              :style="{
                background:
                  'url(' + leftImageSrc + ') center center / 17px no-repeat',
              }"
            ></i
          ></span>
          <swiper :options="swiperOption2" ref="mySwiper2">
            <swiper-slide
              v-for="(item, index) in swiperList"
              :key="index + 1"
              v-if="swiperList.length > 1"
            >
              <div class="gams_lister">
                <div class="img_boxer" :style="themes.liStyle">
                  <img :src="$getStaticUrl() + item.icon" alt="" />
                  <span
                    :style="themes.platColor"
                    v-if="idConfig[item.upid]"
                    class="code"
                    >{{ idConfig[item.upid].name }}</span
                  >
                  <span
                    v-if="item.payline && item.payline != '0'"
                    :style="themes.lineColor"
                    class="code2"
                    >{{
                      isNaN(Number(item.payline))
                        ? item.payline
                        : item.payline + "线"
                    }}</span
                  >
                  <i v-show="item.Hot == 1"></i>
                  <p :style="{ color: themes.otherColor.leftColor }">
                    {{ item.name }}
                  </p>
                  <div class="list_btn" v-if="isSwiper">
                    <span
                      class="collect"
                      v-show="item.love == 'no'"
                      @click="joinCollect(item, index, 'recode')"
                      :style="{
                        background:
                          'url(/static/' +
                          themes.name +
                          '/img/new_games/qxshoucang.png) center center no-repeat',
                      }"
                    ></span>
                    <span
                      class="collectY"
                      v-show="item.love == 'yes'"
                      @click="cancelCollect(item, index, 'recode')"
                      :style="{
                        background:
                          'url(/static/' +
                          themes.name +
                          '/img/new_games/shoucang.png) center center no-repeat',
                      }"
                    ></span>
                    <span
                      v-if="themes.name == 'mgm'"
                      class="begin"
                      :style="themes.btnColor"
                      @click="$loginGame(item, themes.name)"
                      >开始游戏</span
                    >
                    <span
                      v-else
                      class="begin"
                      :style="themes.btnColor"
                      @click="$loginGame(item, themes.name)"
                      >开始游戏</span
                    >
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <span
            class="slideNext"
            @click="setSwiper(5)"
            @mouseover="changeSrc3"
            @mouseout="changeSrc4"
            ><i
              :style="{
                background:
                  'url(' + rightImageSrc + ') center center / 17px no-repeat',
              }"
            ></i
          ></span>
        </div>
      </div>
      <!-- 展示列表 -->
      <div
        class="list_box"
        :style="themes.allbgStyle"
        :class="`list_box_${themes.clientWidth}`"
        ref="getHeight"
      >
        <div class="box">
          <ul
            class="list_type"
            :style="{ borderBottom: themes.borderColor }"
            v-show="nav_active == 9 && GameTypeList.length > 1"
          >
            <li :style="themes.twoCheckedStyle">游戏类型：</li>
            <li
              v-for="(item, index) in GameTypeList"
              :key="index"
              :style="[
                gameType_active == item.gcid
                  ? themes.fourCheckedStyle
                  : themes.fourStyle,
              ]"
              @click="setGameType(item)"
            >
              {{ item.name }}
            </li>
          </ul>
          <ol
            class="list_line"
            :style="{ borderBottom: themes.borderColor }"
            v-show="nav_active == 9 && gameTitleList.length > 1"
          >
            <li :style="themes.twoCheckedStyle">赔付线数：</li>
            <li
              v-for="(item, index) in gameTitleList"
              :key="index"
              :style="[
                gameTitle_active == item.gcid
                  ? themes.fourCheckedStyle
                  : themes.fourStyle,
              ]"
              @click="setGameTitle(item)"
            >
              {{ item.name }}
            </li>
          </ol>
          <div class="title_line" v-show="nav_active != 9">
            <img
              :src="
                '/static/' +
                themes.name +
                '/img/new_games/' +
                this.showName +
                '_bg.png'
              "
              alt=""
              v-if="showName != ''"
            />
          </div>
          <div class="noSuit" v-show="searchListShow">
            <span :style="themes.Souti"
              >未找到符合条件的相关游戏 , 以下是为您推荐的热门游戏</span
            >
          </div>
          <div class="noSuit" v-show="showGameList.length < 1">
            <span :style="themes.Souti"
              >—————————— 未找到符合条件的相关游戏 ——————————</span
            >
          </div>
          <ul class="img_box">
            <li
              v-for="(item, index) in showGameList"
              :key="index"
              :style="themes.liStyle"
            >
              <div class="itemBox">
                <div v-lazy-container="{ selector: 'img' }" v-if="isLazy">
                  <img
                    :data-src="
                      $route.query.navid == '1000'
                        ? item.icon
                        : $getStaticUrl() + item.icon
                    "
                    :data-error="
                      idConfig[item.upid] ? idConfig[item.upid].errorImg : ''
                    "
                    :data-loading="
                      '/static/' + themes.name + '/img/new_games/load.gif'
                    "
                    :key="item.gcid"
                  />
                </div>
                <div v-if="!isLazy">
                  <img
                    v-lazy="
                      $route.query.navid == '1000'
                        ? item.icon
                        : $getStaticUrl() + item.icon
                    "
                    alt=""
                  />
                </div>
                <span :style="themes.platColor" v-if="idConfig[item.upid]">{{
                  idConfig[item.upid].name
                }}</span>
                <span
                  v-if="item.payline && item.payline != '0'"
                  :style="themes.lineColor"
                  >{{
                    isNaN(Number(item.payline))
                      ? item.payline
                      : item.payline + "线"
                  }}</span
                >
              </div>
              <i v-show="item.Hot == 1"></i>
              <div class="textBox">
                <span
                  class="leftName"
                  :style="{ color: themes.otherColor.leftColor }"
                  >{{ item.name }}</span
                >
                <!-- <span class="rightName" :style="{color:themes.otherColor.rightColor}">{{idConfig[item.upid].name}}</span> -->
              </div>
              <div class="list_btn">
                <span
                  class="collect"
                  v-show="item.love == 'no'"
                  @click="joinCollect(item, index, 'tab', themes.name)"
                  :style="{
                    background:
                      'url(/static/' +
                      themes.name +
                      '/img/new_games/qxshoucang.png) center center no-repeat',
                  }"
                ></span>
                <span
                  class="collectY"
                  v-show="item.love == 'yes'"
                  @click="cancelCollect(item, index, 'tab')"
                  :style="{
                    background:
                      'url(/static/' +
                      themes.name +
                      '/img/new_games/shoucang.png) center center no-repeat',
                  }"
                ></span>
                <span
                  v-if="themes.name == 'mgm'"
                  class="begin"
                  :style="themes.btnColor"
                  @click="$loginGame(item, themes.name)"
                  >开始游戏</span
                >
                <span
                  v-else
                  class="begin"
                  :style="themes.btnColor"
                  @click="$loginGame(item, themes.name)"
                  >开始游戏</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import type from "./type_game.js";
import "swiper/dist/css/swiper.css";
import loginMethods from "../games/public.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  mixins: [type, loginMethods],
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    themes: {
      type: Object,
    },
    gameType: {
      type: String,
      default: function () {
        return "slot";
      },
      themes: {
        type: Object,
      },
    },
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    if (this.$refs.getHeight.offsetHeight == 0) {
      location.reload();
    }
  },
};
</script>
<style lang="less" scoped>
/deep/.swiper-wrapper {
  transition-timing-function: linear !important;
}
#maincontainer {
  .content {
    width: 100%;
    height: auto;
    padding-top: 20px;
    // padding-bottom: 20px;
    .list_nav {
      position: relative;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      align-items: center;
      & > ul {
        overflow: hidden;
        li {
          display: inline-block;
          transform: skewX(20deg);
          text-align: center;
          cursor: pointer;
          p {
            transform: skewX(-20deg);
            font-size: 16px;
            letter-spacing: 1px;
          }
        }
        li:first-child {
          margin-left: -12px;
          padding-left: 12px;
        }
      }
      .seek {
        width: 345px;
        height: 60px;
        position: relative;
        padding-right: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        input {
          position: absolute;
          top: 15px;
          right: 80px;
          width: 190px;
          height: 31px;
          line-height: 31px;
          font-size: 14px;
          padding: 0 10px;
          z-index: 1;
          display: inline-block;
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          outline: none;
        }
        a {
          position: absolute;
          top: 15px;
          right: 42px;
          display: inline-block;
          width: 49px;
          height: 31px;
          z-index: 1;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
          i {
            display: block;
            width: 22px;
            height: 22px;
            margin: 5px auto;
          }
        }
        img {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 236px;
          height: 60px;
        }
      }
    }
    .list_1200 {
      width: 1200px;
      height: 60px;
      margin: 0 auto 20px auto;
      & > ul {
        width: 950px;
        height: 60px;
        li {
          width: 97px;
          height: 60px;
          line-height: 60px;
        }
      }
    }
    .list_1000 {
      width: 1000px;
      height: 60px;
      margin: 0 auto 20px auto;
      & > ul {
        width: 950px;
        height: 60px;
        li {
          width: 85px;
          height: 60px;
          line-height: 60px;
        }
      }
      .seek {
        width: 295px;
        padding-right: 20px;
        input {
          right: 74px;
          width: 150px;
        }
        a {
          right: 25px;
        }
      }
    }
    .content_box {
      overflow: hidden;
    }
    .content_1200 {
      width: 1200px;
      margin: -10px auto;
      // padding: 10px 0;
      .mainbox {
        position: relative;
        margin: 0;
        .game_type {
          clear: both;
          zoom: 1;
          display: inline-block;
          width: 1200px;
          padding: 0 0 5px 5px;
          li {
            width: 98px;
            height: 106px;
            float: left;
            margin-right: 11.1px;
            margin-top: 10px;
            padding: 0 5px;
            font-size: 14px;
            border-radius: 10px;
            transition: all 0.2s ease 0s;
            cursor: pointer;
            text-align: center;
            overflow: hidden;
            &.slot_0:hover {
              background-size: 100% 100%;
              transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -ms-transform: scale(1.1);
            }
            div {
              padding: 8px 0 5px;
              .game_icon {
                width: 60px;
                height: 60px;
              }
            }
            span {
              line-height: 32px;
            }
          }
          li:nth-child(11) {
            margin-right: 5px;
          }
        }
        .theme_klk {
          li {
            background-color: #fff;
            color: rgb(153, 153, 153);
            &.slot_0 {
              background: url("/static/klk/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/klk/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694,10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/klk/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/klk/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #5b6168;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732, 10058,
            11759, 11775, 11828, 11857, 11881, 11906;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/klk/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(to bottom, #ff5f00, #ffb459);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              to bottom,
              #ff5f00,
              #ffb459
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              to bottom,
              #ff5f00,
              #ffb459
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(to bottom, #ff5f00, #ffb459);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              to bottom,
              #ff5f00,
              #ffb459
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #ffffff;
            }
          }
          .slot_0.active {
            background: url("/static/klk/img/new_games/new_icon_a/0.png") center
              top no-repeat;
            background-size: 100% 100%;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_99qp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/99qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/99qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              .game_icon {
                width: 67px;
              }
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/99qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/99qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/99qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/99qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_103qp {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/103qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/103qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/103qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/103qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/103qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/103qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_betsb {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/betsb/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/betsb/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/betsb/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #cb9b35, #e9d89c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(
              135deg,
              #e9d89c,
              #cb9b35
            ); /* Safari 5.1 - 6.0 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/betsb/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_tycjt {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/tycjt/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/tycjt/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/tycjt/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/tycjt/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/tycjt/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #cb9b35, #e9d89c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(
              135deg,
              #e9d89c,
              #cb9b35
            ); /* Safari 5.1 - 6.0 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/tycjt/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_tyc82 {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/tyc82/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/tyc82/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/tyc82/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/tyc82/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/tyc82/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #cb9b35, #e9d89c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(
              135deg,
              #e9d89c,
              #cb9b35
            ); /* Safari 5.1 - 6.0 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/tyc82/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_ylhg {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/ylhg/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/ylhg/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/ylhg/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/ylhg/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/ylhg/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/ylhg/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_test-4 {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/test-4/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/test-4/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/test-4/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/test-4/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/test-4/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #cb9b35, #e9d89c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(135deg, #e9d89c, #cb9b35);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/test-4/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            span {
              color: #fff;
            }
          }
        }
        .theme_betsb-preview {
          li {
            background-color: #262626;
            color: #fff;
            &.slot_0 {
              background: url("/static/betsb/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/betsb/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #2b2b2b;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/betsb/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #cb9b35, #e9d89c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(135deg, #e9d89c, #cb9b35);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/betsb/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            span {
              color: #fff;
            }
          }
        }
        .theme_pjdc {
          li {
            background-color: #530815;
            color: #bc7783;
            &.slot_0 {
              background: url("/static/pjdc/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/pjdc/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #712c24;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/pjdc/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/pjdc/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/pjdc/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#f3cb52, #fcdf84);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #f3cb52,
              #fcdf84
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #f3cb52,
              #fcdf84
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#f3cb52, #fcdf84);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#f3cb52, #fcdf84); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/pjdc/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_mgm {
          li {
            background-color: #251c47;
            color: #fff;
            &.slot_0 {
              background: url("/static/mgm/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/mgm/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #45377a;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/mgm/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/mgm/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #ebebeb;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/mgm/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#ffb459, #ff5f00);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#ffb459, #ff5f00);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#ffb459, #ff5f00); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/mgm/img/new_games/new_icon_a/0.png") center
              top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_cmgm {
          li {
            background-color: rgb(55, 37, 28);
            color: #fff;
            &.slot_0 {
              background: url("/static/cmgm/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/cmgm/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #45377a;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/cmgm/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/cmgm/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #ebebeb;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/cmgm/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#ad1c16, #37251c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #ad1c16,
              #37251c
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #ad1c16,
              #37251c
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#ad1c16, #37251c);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#ad1c16, #37251c); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/cmgm/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_mgm-preview {
          li {
            background-color: #251c47;
            color: #fff;
            &.slot_0 {
              background: url("/static/mgm-preview/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/mgm-preview/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #45377a;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/mgm-preview/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/mgm-preview/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #ebebeb;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/mgm-preview/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#ffb459, #ff5f00);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#ffb459, #ff5f00);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#ffb459, #ff5f00); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/mgm-preview/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_test-1 {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/test-1/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/test-1/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/test-1/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/test-1/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/test-1/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/test-1/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_vnso {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/vnso/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/vnso/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/vnso/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/vnso/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/vnso/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/vnso/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_478qp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/478qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/478qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/478qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/478qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/478qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/478qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_737qp {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/737qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/737qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/737qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/737qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/737qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/737qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_jsyl {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/jsyl/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/jsyl/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/jsyl/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/jsyl/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/jsyl/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(135deg, #faf762, #c19b38);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/jsyl/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        // .theme_amjs {
        //   li {
        //     background-color: #383838;
        //     color: #fff;
        //     &.slot_0 {
        //       background: url("/static/amjs/img/new_games/new_icon/0.png") center
        //         top no-repeat;
        //     }
        //     &.slot_0:hover {
        //       background: url("/static/amjs/img/new_games/new_icon_a/0.png")
        //         center top no-repeat;
        //       border-bottom: 1px solid transparent;
        //     }
        //     div {
        //       border-bottom: 1px solid #4c4b4e;
        //       @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .backgroundcard(@className,@pngName) {
        //         .slot_@{className} {
        //           background: url("/static/amjs/img/new_games/new_icon/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop(@i) when (@i < length(@bgcardList)+1) {
        //         .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
        //         .loop(@i+1);
        //       }
        //       .loop(1);

        //       @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .background2(@className,@pngName) {
        //         .slot_@{className}.newactive {
        //           background: url("/static/amjs/img/new_games/new_icon_a/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop2(@i) when (@i < length(@bgcardList2)+1) {
        //         .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
        //         .loop2(@i+1);
        //       }
        //       .loop2(1);
        //     }
        //     &.slot_0 {
        //       div {
        //         border-bottom: 1px solid transparent;
        //       }
        //     }
        //     span {
        //       color: #fff;
        //       font-size: 16px;
        //     }
        //   }
        //   @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //     10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //   .background3(@className,@pngName) {
        //     li:hover .slot_@{className} {
        //       background: url("/static/amjs/img/new_games/new_icon_a/@{className}.png")
        //         center top no-repeat;
        //     }
        //   }
        //   .loop3(@i) when (@i < length(@bgcardList3)+1) {
        //     .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
        //     .loop3(@i+1);
        //   }
        //   .loop3(1);
        //   li:not(.slot_0).active {
        //     background: linear-gradient(135deg,#faf762,#c19b38);
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   li:not(.slot_0):hover {
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //     background: -webkit-linear-gradient(135deg,#faf762,#c19b38); /* Safari 5.1 - 6.0 */
        //     background: -o-linear-gradient(135deg,#faf762,#c19b38); /* Opera 11.1 - 12.0 */
        //     background: -moz-linear-gradient(135deg,#faf762,#c19b38);
        //     /* Firefox 3.6 - 15 */
        //     background: linear-gradient(135deg,#faf762,#c19b38); /* 标准的语法 */
        //     color: #fff;
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   .slot_0.active {
        //     background: url("/static/amjs/img/new_games/new_icon_a/0.png") center
        //       top no-repeat;
        //     border-bottom: 1px solid transparent;
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //   }
        // }

        // .theme_jltx{
        //   li {
        //     background-color: #fff;
        //     color: #5b6168;
        //     &.slot_0 {
        //       background: url("/static/jltx/img/new_games/new_icon/hover.png") center
        //         top no-repeat;
        //     }
        //     &.slot_0:hover {
        //       background: url("/static/jltx/img/new_games/new_icon_a/hover_active.png")
        //         center top no-repeat;
        //       border-bottom: 1px solid transparent;
        //     }
        //     div {
        //       border-bottom: 1px solid #efefef;
        //       @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .backgroundcard(@className,@pngName) {
        //         .slot_@{className} {
        //           background: url("/static/jltx/img/new_games/new_icon/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop(@i) when (@i < length(@bgcardList)+1) {
        //         .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
        //         .loop(@i+1);
        //       }
        //       .loop(1);

        //       @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .background2(@className,@pngName) {
        //         .slot_@{className}.newactive {
        //           background: url("/static/jltx/img/new_games/new_icon_a/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop2(@i) when (@i < length(@bgcardList2)+1) {
        //         .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
        //         .loop2(@i+1);
        //       }
        //       .loop2(1);
        //     }
        //     &.slot_0 {
        //       div {
        //         border-bottom: 1px solid transparent;
        //       }
        //     }
        //     span {
        //       color: #5b6168;
        //       font-size: 16px;
        //     }
        //   }
        //   @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //     10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //   .background3(@className,@pngName) {
        //     li:hover .slot_@{className} {
        //       background: url("/static/jltx/img/new_games/new_icon_a/@{className}.png")
        //         center top no-repeat;
        //     }
        //   }
        //   .loop3(@i) when (@i < length(@bgcardList3)+1) {
        //     .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
        //     .loop3(@i+1);
        //   }
        //   .loop3(1);
        //   li:not(.slot_0).active {
        //     background: linear-gradient(#FF6F6B,#CF3A36);
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   li:not(.slot_0):hover {
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //     background: -webkit-linear-gradient(#FF6F6B,#CF3A36); /* Safari 5.1 - 6.0 */
        //     background: -o-linear-gradient(#FF6F6B,#CF3A36); /* Opera 11.1 - 12.0 */
        //     background: -moz-linear-gradient(#FF6F6B,#CF3A36);
        //     /* Firefox 3.6 - 15 */
        //     background: linear-gradient(#FF6F6B,#CF3A36); /* 标准的语法 */
        //     color: #fff;
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   .slot_0.active {
        //     background: url("/static/jltx/img/new_games/new_icon_a/hover_active.png") center
        //       top no-repeat;
        //     border-bottom: 1px solid transparent;
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //   }
        // }

        .theme_jltx {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/jltx/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/jltx/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/jltx/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/jltx/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/jltx/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(135deg, #faf762, #c19b38);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/jltx/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_jltx-new2 {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/jltx-new2/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/jltx-new2/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/jltx-new2/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/jltx-new2/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/jltx-new2/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(135deg, #faf762, #c19b38);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/jltx-new2/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_vnst {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/vnst/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/vnst/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/vnst/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/vnst/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/vnst/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/vnst/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_fhcp {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/fhcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/fhcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/fhcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/fhcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/fhcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/fhcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_xpj83 {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/xpj83/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/xpj83/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/xpj83/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/xpj83/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/xpj83/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/xpj83/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_amvnsr {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/amvnsr/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/amvnsr/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/amvnsr/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/amvnsr/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/amvnsr/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/amvnsr/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_vns81 {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/vns81/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/vns81/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/vns81/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/vns81/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/vns81/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/vns81/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_cpxpj {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/cpxpj/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/cpxpj/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/cpxpj/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/cpxpj/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/cpxpj/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/cpxpj/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_aqvns {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/aqvns/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/aqvns/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/aqvns/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/aqvns/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/aqvns/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/aqvns/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_js85 {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/js85/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/js85/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,
                10058, 11759, 11775, 11828, 11857, 11881, 11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/js85/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,
                10058, 11759, 11775, 11828, 11857, 11881, 11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/js85/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732, 10058,
            11759, 11775, 11828, 11857, 11881, 11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/js85/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/js85/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        // .theme_478qp {
        //   li {
        //     background-color: #383838;
        //     color: #fff;
        //     &.slot_0 {
        //       background: url("/static/478qp/img/new_games/new_icon/0.png") center
        //         top no-repeat;
        //     }
        //     &.slot_0:hover {
        //       background: url("/static/478qp/img/new_games/new_icon_a/0.png")
        //         center top no-repeat;
        //       border-bottom: 1px solid transparent;
        //     }
        //     div {
        //       border-bottom: 1px solid #4c4b4e;
        //       @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .backgroundcard(@className,@pngName) {
        //         .slot_@{className} {
        //           background: url("/static/478qp/img/new_games/new_icon/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop(@i) when (@i < length(@bgcardList)+1) {
        //         .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
        //         .loop(@i+1);
        //       }
        //       .loop(1);

        //       @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .background2(@className,@pngName) {
        //         .slot_@{className}.newactive {
        //           background: url("/static/478qp/img/new_games/new_icon_a/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop2(@i) when (@i < length(@bgcardList2)+1) {
        //         .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
        //         .loop2(@i+1);
        //       }
        //       .loop2(1);
        //     }
        //     &.slot_0 {
        //       div {
        //         border-bottom: 1px solid transparent;
        //       }
        //     }
        //     span {
        //       color: #fff;
        //       font-size: 16px;
        //     }
        //   }
        //   @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //     10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //   .background3(@className,@pngName) {
        //     li:hover .slot_@{className} {
        //       background: url("/static/478qp/img/new_games/new_icon_a/@{className}.png")
        //         center top no-repeat;
        //     }
        //   }
        //   .loop3(@i) when (@i < length(@bgcardList3)+1) {
        //     .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
        //     .loop3(@i+1);
        //   }
        //   .loop3(1);
        //   li:not(.slot_0).active {
        //     background: linear-gradient(135deg,#faf762,#c19b38);
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   li:not(.slot_0):hover {
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //     background: -webkit-linear-gradient(135deg,#faf762,#c19b38); /* Safari 5.1 - 6.0 */
        //     background: -o-linear-gradient(135deg,#faf762,#c19b38); /* Opera 11.1 - 12.0 */
        //     background: -moz-linear-gradient(135deg,#faf762,#c19b38);
        //     /* Firefox 3.6 - 15 */
        //     background: linear-gradient(135deg,#faf762,#c19b38); /* 标准的语法 */
        //     color: #fff;
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   .slot_0.active {
        //     background: url("/static/478qp/img/new_games/new_icon_a/0.png") center
        //       top no-repeat;
        //     border-bottom: 1px solid transparent;
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //   }
        // }

        .theme_qygj {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/qygj/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/qygj/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/qygj/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/qygj/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/qygj/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/qygj/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_xpj80 {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/xpj80/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/xpj80/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/xpj80/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/xpj80/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/xpj80/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/xpj80/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_hsyl {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/hsyl/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/hsyl/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/hsyl/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/hsyl/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/hsyl/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/hsyl/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_cjw {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/cjw/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/cjw/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/cjw/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/cjw/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/cjw/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/cjw/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_500wcp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/500wcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/500wcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/500wcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/500wcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/500wcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/500wcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_fczx {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/fczx/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/fczx/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/fczx/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/fczx/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/fczx/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/fczx/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_500w {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/500w/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/500wcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/500w/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/500w/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/500w/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/500w/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_cpzj {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/cpzj/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/cpzj/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/cpzj/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/cpzj/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/cpzj/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/cpzj/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_hty {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/hty/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/hty/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/hty/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/hty/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/hty/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/hty/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_tczj {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/tczj/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/tczj/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/tczj/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/tczj/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/tczj/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #d35ca4, #986bff);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #d35ca4, #986bff);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/tczj/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_wycp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/wycp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/wycp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/wycp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/wycp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/wycp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/wycp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_szc {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/szc/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/szc/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/szc/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/szc/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/szc/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/szc/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_ybcp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/ybcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/ybcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/ybcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/ybcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/ybcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/ybcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_jhcp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/jhcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/jhcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/jhcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/jhcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/jhcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/jhcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_dalao {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/dalao/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/dalao/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/dalao/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/dalao/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/dalao/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(180deg, #d23820, #ad1c16);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(180deg, #ad1c16, #d23820);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/dalao/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_qmcp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/qmcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/qmcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/qmcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/qmcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/qmcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(180deg, #d23820, #ad1c16);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(180deg, #ad1c16, #d23820);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/qmcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_ecp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/ecp/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/ecp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/ecp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/ecp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/ecp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(23deg, #fd9080, #f71b2c);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(23deg, #f71b2c, #fd9080);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/ecp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_dqr {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/dqr/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/dqr/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/dqr/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/dqr/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/dqr/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/dqr/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_hty {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/hty/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/hty/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/hty/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/hty/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/hty/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/hty/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_amxpj {
          li {
            background-color: #251c47;
            color: #fff;
            &.slot_0 {
              background: url("/static/amxpj/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/amxpj/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #45377a;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/amxpj/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/amxpj/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #ebebeb;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/amxpj/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#ffb459, #ff5f00);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#ffb459, #ff5f00);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#ffb459, #ff5f00); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/amxpj/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_tccp {
          li {
            background-color: #251c47;
            color: #fff;
            &.slot_0 {
              background: url("/static/tccp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/tccp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/tccp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/tccp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/tccp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(0deg, #c000bb, #e65be3);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0:hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/tccp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_tyc86 {
          li {
            background-color: #251c47;
            color: #fff;
            &.slot_0 {
              background: url("/static/tyc86/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/tyc86/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/tyc86/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/tyc86/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/tyc86/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(0deg, #c000bb, #e65be3);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0:hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              0deg,
              #c000bb,
              #e65be3
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/tyc86/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_amhg {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/amhg/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/amhg/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/amhg/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/amhg/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/amhg/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#c2a775, #d3bc8f);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #c2a775,
              #d3bc8f
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #c2a775,
              #d3bc8f
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#c2a775, #d3bc8f);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#c2a775, #d3bc8f); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/amhg/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_sjcp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/sjcp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/sjcp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/sjcp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/sjcp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/sjcp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#7385bd, #2c3966);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(#2c3966, #7385bd);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/sjcp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_t111 {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/t111/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/t111/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/t111/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/t111/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/t111/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#d55ca2, #9d61dd);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(#9d61dd, #d55ca2);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/t111/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        // .theme_ybcp {
        //   li {
        //     background-color: #fff;
        //     color: #000;
        //     &.slot_0 {
        //       background: url("/static/ybcp/img/new_games/new_icon/0.png") center
        //         top no-repeat;
        //     }
        //     &.slot_0:hover {
        //       background: url("/static/ybcp/img/new_games/new_icon_a/h0.png")
        //         center top no-repeat;
        //       border-bottom: 1px solid transparent;
        //     }
        //     div {
        //       border-bottom: 1px solid #efefef;
        //       @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .backgroundcard(@className,@pngName) {
        //         .slot_@{className} {
        //           background: url("/static/ybcp/img/new_games/new_icon/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop(@i) when (@i < length(@bgcardList)+1) {
        //         .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
        //         .loop(@i+1);
        //       }
        //       .loop(1);

        //       @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .background2(@className,@pngName) {
        //         .slot_@{className}.newactive {
        //           background: url("/static/ybcp/img/new_games/new_icon_a/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop2(@i) when (@i < length(@bgcardList2)+1) {
        //         .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
        //         .loop2(@i+1);
        //       }
        //       .loop2(1);
        //     }
        //     &.slot_0 {
        //       div {
        //         border-bottom: 1px solid transparent;
        //       }
        //     }
        //     span {
        //       color: #000;
        //       font-size: 16px;
        //     }
        //   }
        //   @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //     10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //   .background3(@className,@pngName) {
        //     li:hover .slot_@{className} {
        //       background: url("/static/ybcp/img/new_games/new_icon_a/@{className}.png")
        //         center top no-repeat;
        //     }
        //   }
        //   .loop3(@i) when (@i < length(@bgcardList3)+1) {
        //     .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
        //     .loop3(@i+1);
        //   }
        //   .loop3(1);
        //   li:not(.slot_0).active {
        //     background: linear-gradient(#d55ca2, #9d61dd);
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   li:not(.slot_0):hover {
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //     background: linear-gradient(#9d61dd,#d55ca2);
        //     color: #fff;
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   .slot_0.active {
        //     background: url("/static/ybcp/img/new_games/new_icon_a/h0.png") center
        //       top no-repeat;
        //     border-bottom: 1px solid transparent;
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //   }
        // }

        .theme_amvns {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/amvns/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/amvns/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/amvns/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/amvns/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/amvns/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#d55ca2, #9d61dd);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: linear-gradient(#9d61dd, #d55ca2);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/amvns/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_632qp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/632qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/632qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/632qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/632qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/632qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/632qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_935qp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/935qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/935qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/935qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/935qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/935qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/935qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_k78qp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/k78qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/k78qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/k78qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/k78qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/k78qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/k78qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_839qp {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/839qp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/839qp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/839qp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/839qp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12042,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/839qp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(:first-child).active {
            background: linear-gradient(45deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(:first-child):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:nth-child(1).active {
            background: url("/static/839qp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_kyqp {
          li {
            background-color: #fff;
            color: #000;
            &.slot_0 {
              background: url("/static/kyqp/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/kyqp/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/kyqp/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/kyqp/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #000;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/kyqp/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#65e0f4, #4fade6);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #65e0f4,
              #4fade6
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#65e0f4, #4fade6);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/kyqp/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
      }
    }
    .content_1000 {
      width: 1000px;
      margin: -10px auto;
      // padding: 10px 0;
      .mainbox {
        position: relative;
        margin: 0;
        .game_type {
          clear: both;
          zoom: 1;
          display: inline-block;
          width: 1000px;
          padding: 0 0 5px 5px;
          li {
            width: 90px;
            height: 103px;
            float: left;
            margin-right: 10px;
            margin-top: 11px;
            padding: 0 5px;
            font-size: 14px;
            border-radius: 10px;
            transition: all 0.2s ease 0s;
            cursor: pointer;
            text-align: center;
            overflow: hidden;
            &.slot_0:hover {
              background-size: 100% 100%;
              transform: scale(1.1);
              -webkit-transform: scale(1.1);
              -ms-transform: scale(1.1);
            }
            div {
              padding: 8px 0 5px;
              .game_icon {
                width: 60px;
                height: 60px;
              }
            }
            span {
              line-height: 32px;
            }
          }
          li:nth-child(10) {
            margin-right: 5px;
          }
        }
        .theme_mgm {
          li {
            background-color: #3f2d19;
            color: #ffffff;
            &.slot_0 {
              background: url("/static/mgm/img/0.png") center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/mgm/img/h0.png") center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              // border-bottom: 1px solid #efefef;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10056, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/klk/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);
              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10056, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/klk/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042,10056, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/klk/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#c59844, #4e3821);
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(#4e3821, #c59844);
            /* Safari 5.1 - 6.0 */
            background: -o-linear-linear-gradient(
              #4e3821,
              #c59844
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-linear-gradient(#4e3821, #c59844);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#4e3821, #c59844); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #ffffff;
            }
          }
          .slot_0.active {
            background: url("/static/mgm/img/h0.png") center top no-repeat;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_betsb {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/betsb/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/betsb/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/betsb/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #cdcdcd;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/betsb/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#25c199, #008260);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #25c199,
              #008260
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #25c199,
              #008260
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#25c199, #008260);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#25c199, #008260); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/betsb/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_amjs {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/amjs/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/amjs/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #4c4b4e;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/amjs/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/amjs/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/amjs/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(135deg, #faf762, #c19b38);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(135deg, #faf762, #c19b38);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              135deg,
              #faf762,
              #c19b38
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/amjs/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_bet365 {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/bet365/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/bet365/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/bet365/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/bet365/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/bet365/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#25c199, #008260);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #25c199,
              #008260
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #25c199,
              #008260
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#25c199, #008260);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#25c199, #008260); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/bet365/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_betnew {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/betnew/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/betnew/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/betnew/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/betnew/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/betnew/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#25c199, #008260);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #25c199,
              #008260
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #25c199,
              #008260
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#25c199, #008260);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#25c199, #008260); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/betnew/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_newbet {
          li {
            background-color: #383838;
            color: #fff;
            &.slot_0 {
              background: url("/static/newbet/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/newbet/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/newbet/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/newbet/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/newbet/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#25c199, #008260);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #25c199,
              #008260
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #25c199,
              #008260
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#25c199, #008260);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#25c199, #008260); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/newbet/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        // .theme_vnso {
        //   li {
        //     background-color: #2b3154;
        //     color: #fff;
        //     &.slot_0 {
        //       background: url("/static/vnso/img/new_games/new_icon/0.png") center
        //         top no-repeat;
        //     }
        //     &.slot_0:hover {
        //       background: url("/static/vnso/img/new_games/new_icon_a/0.png")
        //         center top no-repeat;
        //       border-bottom: 1px solid transparent;
        //     }
        //     div {
        //       border-bottom: 1px solid #484848;
        //       @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .backgroundcard(@className,@pngName) {
        //         .slot_@{className} {
        //           background: url("/static/vnso/img/new_games/new_icon/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop(@i) when (@i < length(@bgcardList)+1) {
        //         .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
        //         .loop(@i+1);
        //       }
        //       .loop(1);

        //       @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //         10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //       .background2(@className,@pngName) {
        //         .slot_@{className}.newactive {
        //           background: url("/static/vnso/img/new_games/new_icon_a/@{className}.png")
        //             center top no-repeat;
        //         }
        //       }
        //       .loop2(@i) when (@i < length(@bgcardList2)+1) {
        //         .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
        //         .loop2(@i+1);
        //       }
        //       .loop2(1);
        //     }
        //     &.slot_0 {
        //       div {
        //         border-bottom: 1px solid transparent;
        //       }
        //     }
        //     span {
        //       color: #fff;
        //       font-size: 16px;
        //     }
        //   }
        //   @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
        //     10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
        //   .background3(@className,@pngName) {
        //     li:hover .slot_@{className} {
        //       background: url("/static/vnso/img/new_games/new_icon_a/@{className}.png")
        //         center top no-repeat;
        //     }
        //   }
        //   .loop3(@i) when (@i < length(@bgcardList3)+1) {
        //     .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
        //     .loop3(@i+1);
        //   }
        //   .loop3(1);
        //   li:not(.slot_0).active {
        //     background: linear-gradient(#ffa724,#fe5d25);
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   li:not(.slot_0):hover {
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //     background: -webkit-linear-gradient(#ffa724,#fe5d25); /* Safari 5.1 - 6.0 */
        //     background: -o-linear-gradient(#ffa724,#fe5d25); /* Opera 11.1 - 12.0 */
        //     background: -moz-linear-gradient(#ffa724,#fe5d25);
        //     /* Firefox 3.6 - 15 */
        //     background: linear-gradient(#ffa724,#fe5d25); /* 标准的语法 */
        //     color: #fff;
        //     div {
        //       border-bottom: 1px solid #fff;
        //     }
        //     span{
        //       color: #fff;
        //     }
        //   }
        //   .slot_0.active {
        //     background: url("/static/vnso/img/new_games/new_icon_a/0.png") center
        //       top no-repeat;
        //     border-bottom: 1px solid transparent;
        //     transform: scale(1.1);
        //     -webkit-transform: scale(1.1);
        //     -ms-transform: scale(1.1);
        //   }
        // }

        .theme_hqyl {
          li {
            background-color: #333;
            color: #fff;
            &.slot_0 {
              background: url("/static/hqyl/img/new_games/new_icon/0.png")
                center top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/hqyl/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/hqyl/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/hqyl/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/hqyl/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(180deg, #dfb65f, #8e7938);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(180deg, #dfb65f, #8e7938);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/hqyl/img/new_games/new_icon_a/0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
        .theme_blr {
          li {
            background-color: #333;
            color: #fff;
            &.slot_0 {
              background: url("/static/blr/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/blr/img/new_games/new_icon_a/0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #484848;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/blr/img/new_games/new_icon/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/blr/img/new_games/new_icon_a/@{className}.png")
                    center top no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/blr/img/new_games/new_icon_a/@{className}.png")
                center top no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(180deg, #dfb65f, #8e7938);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(180deg, #dfb65f, #8e7938);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(
              180deg,
              #dfb65f,
              #8e7938
            ); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/blr/img/new_games/new_icon_a/0.png") center
              top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }

        .theme_xpj {
          li {
            background-color: #0b3386;
            color: #fff;
            &.slot_0 {
              background: url("/static/xpj/img/new_games/new_icon/0.png") center
                top no-repeat;
            }
            &.slot_0:hover {
              background: url("/static/xpj/img/new_games/new_icon_a/h0.png")
                center top no-repeat;
              border-bottom: 1px solid transparent;
            }
            div {
              border-bottom: 1px solid #204ba5;
              @bgcardList: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .backgroundcard(@className,@pngName) {
                .slot_@{className} {
                  background: url("/static/xpj/img/new_games/new_icon/@{className}.png")
                    center no-repeat;
                }
              }
              .loop(@i) when (@i < length(@bgcardList)+1) {
                .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
                .loop(@i+1);
              }
              .loop(1);

              @bgcardList2: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
                10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
              .background2(@className,@pngName) {
                .slot_@{className}.newactive {
                  background: url("/static/xpj/img/new_games/new_icon_a/@{className}.png")
                    center no-repeat;
                }
              }
              .loop2(@i) when (@i < length(@bgcardList2)+1) {
                .background2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
                .loop2(@i+1);
              }
              .loop2(1);
            }
            &.slot_0 {
              div {
                border-bottom: 1px solid transparent;
              }
            }
            span {
              color: #fff;
              font-size: 16px;
            }
          }
          @bgcardList3: 999, 10014, 10015, 10016, 10018, 10019, 10020, 10021,
            10022, 10023, 10024, 11320, 10041, 10042, 10612, 10694, 10732,10058,11759,11775,11828,11857,11881,11906,12465;
          .background3(@className,@pngName) {
            li:hover .slot_@{className} {
              background: url("/static/xpj/img/new_games/new_icon_a/@{className}.png")
                center no-repeat;
            }
          }
          .loop3(@i) when (@i < length(@bgcardList3)+1) {
            .background3(extract(@bgcardList3, @i),extract(@bgcardList3, @i));
            .loop3(@i+1);
          }
          .loop3(1);
          li:not(.slot_0).active {
            background: linear-gradient(#ffb459, #ff5f00);
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          li:not(.slot_0):hover {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            background: -webkit-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
              #ffb459,
              #ff5f00
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(#ffb459, #ff5f00); /* 标准的语法 */
            color: #fff;
            div {
              border-bottom: 1px solid #fff;
            }
            span {
              color: #fff;
            }
          }
          .slot_0.active {
            background: url("/static/xpj/img/new_games/new_icon_a/h0.png")
              center top no-repeat;
            border-bottom: 1px solid transparent;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
          }
        }
      }
    }
    .content_boxer {
    }
    .content_boxer_1200 {
      width: 1200px;
      height: 319px;
      margin: 0 auto;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      position: relative;
      overflow: hidden;

      .img_bg {
        position: absolute;
        top: -22px;
        left: -100px;
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
        width: 1200px;
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
        width: 1200px;
        height: 282px;
        padding: 0 30px;
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
          width: 228px;
          height: 282px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .img_boxer {
            position: relative;
            width: 210px;
            height: 256px;
            overflow: hidden;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
              width: 210px;
              height: 210px;
              border-radius: 4px;
            }
            .code {
              font-size: 14px;
              text-align: center;
              width: 52px;
              height: 22px;
              line-height: 22px;
              border-radius: 6px;
              color: #fff;
              position: absolute;
              left: 8px;
              top: 8px;
            }
            .code2 {
              font-size: 14px;
              text-align: center;
              width: 52px;
              height: 22px;
              line-height: 22px;
              border-radius: 6px;
              position: absolute;
              left: 8px;
              top: 33px;
            }
            i {
              position: absolute;
              top: 18px;
              right: 20px;
              display: block;
              width: 20px;
              height: 26px;
            }
            p {
              font-size: 16px;
              text-align: center;
              height: 46px;
              line-height: 46px;
            }
            div.list_btn {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0;
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
          .img_boxer:hover {
            div.list_btn {
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1;
            }
          }
        }
      }
    }
    .content_boxer_1000 {
      width: 1000px;
      height: 319px;
      margin: 0 auto;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      position: relative;
      overflow: hidden;
      .img_bg {
        position: absolute;
        top: -22px;
        left: -100px;
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
        width: 1200px;
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
          width: 182px;
          height: 282px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .img_boxer {
            position: relative;
            width: 172px;
            height: 212px;
            overflow: hidden;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
              width: 172px;
              height: 172px;
              border-radius: 4px;
              // margin-left: -10px;
            }
            .code {
              font-size: 14px;
              text-align: center;
              width: 52px;
              height: 22px;
              line-height: 22px;
              border-radius: 6px;
              color: #fff;
              position: absolute;
              left: 8px;
              top: 8px;
            }
            .code2 {
              font-size: 14px;
              text-align: center;
              width: 52px;
              height: 22px;
              line-height: 22px;
              border-radius: 6px;
              position: absolute;
              left: 8px;
              top: 33px;
            }
            i {
              position: absolute;
              top: 18px;
              right: 20px;
              display: block;
              width: 20px;
              height: 26px;
            }
            p {
              font-size: 16px;
              text-align: center;
              line-height: 40px;
            }
            div.list_btn {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0;
              z-index: 0;
              transition: all 0.3s;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              & > span {
                display: block;
                width: 90px;
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
          .img_boxer:hover {
            div.list_btn {
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1;
            }
          }
        }
      }
    }
    .list_box_1200 {
      width: 1200px;
      margin: 20px auto;
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      .box {
        position: relative;
        width: 1200px;
        padding: 10px 30px;
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
          height: 50px;
          display: flex;
          align-items: center;
          li {
            font-size: 16px;
            line-height: 25px;
            padding: 0 10px;
            color: #0f1724;
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
            width: 210px;
            height: 256px; // padding: 11px 11px 0 11px;
            margin-bottom: 20px;
            margin-right: 20px;
            overflow: hidden;
            box-shadow: rgba(0, 8, 28, 0.6) 0px 1px 4px 2px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .itemBox {
              width: 210px;
              height: 210px;
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              img {
                width: 210px;
                height: 210px;
              }
              span {
                font-size: 14px;
                text-align: center;
                width: 52px;
                height: 22px;
                line-height: 22px;
                border-radius: 6px;
                color: #fff;
                position: absolute;
                left: 8px;
              }
              span:nth-child(3) {
                top: 33px;
              }
              span:nth-child(2) {
                top: 8px;
              }
            }
            i {
              position: absolute;
              top: 18px;
              right: 20px;
              display: block;
              width: 20px;
              height: 26px;
            }
            .textBox {
              width: 210px;
              height: 46px;
              position: relative;
              span {
                position: absolute;
                top: 0;
                font-size: 16px;
                text-align: center;
                color: #0f1724;
                margin: 15px 0;
              }
              .leftName {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                width: 210px;
              }
              .rightName {
                right: 18px;
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
          }
        }
      }
    }
    .list_box_1000 {
      width: 1000px;
      margin: 20px auto;
      background: #fff;
      box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
      .box {
        position: relative;
        width: 1000px;
        padding: 10px 30px;
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
            font-size: 16px;
            line-height: 25px;
            padding: 0 10px;
            color: #0f1724;
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
            width: 172px;
            height: 212px; // padding: 11px 11px 0 11px;
            margin-bottom: 20px;
            margin-right: 20px;
            overflow: hidden;
            box-shadow: rgba(238, 238, 238, 0.5) 0px 1px 4px 2px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .itemBox {
              width: 172px;
              height: 172px;
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              img {
                width: 172px;
                height: 172px;
              }
              span {
                font-size: 14px;
                text-align: center;
                width: 52px;
                height: 22px;
                line-height: 22px;
                border-radius: 6px;
                color: #fff;
                position: absolute;
                left: 8px;
              }
              span:nth-child(3) {
                top: 33px;
              }
              span:nth-child(2) {
                top: 8px;
              }
            }
            i {
              position: absolute;
              top: 18px;
              right: 20px;
              display: block;
              width: 20px;
              height: 26px;
            }
            .textBox {
              width: 172px;
              height: 40px;
              position: relative;
              span {
                position: absolute;
                top: 0;
                font-size: 16px;
                text-align: center;
                color: #0f1724;
                margin: 12px 0;
              }
              .leftName {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: center;
                width: 172px;
              }
              .rightName {
                right: 18px;
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
                width: 90px;
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
          }
        }
      }
    }
  }
}
</style>
