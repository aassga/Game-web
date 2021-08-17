<template>
    <div class="homeLive">
        <div class="pageBody">
            <div class="content " :class="`content-${themes.width}`">
                <div class="cell" v-for="(liveItem,liveIndex) in liveDatas" :key="liveIndex">
                    <div class="live-image relative" id="live-1" :style="{background:liveItem.bgImgSrc}" @click="$loginGame(liveItem,themes.name == 'jltx-new2' ? 'betsb' : themes.name)">
                        <div class="hot cover-sprite" v-if="liveItem.hot"></div>
                        <div class="mask"></div>
                        <div class="color-cell-wrapper-1">
                            <a href="javascript:void(0)" class="pur-cell" :class="childOne.className"
                                v-for="(childOne,childIndex) in liveItem.child1" :key="childIndex">{{childOne.gameName}}</a>
                        </div>
                        <div class="color-cell-wrapper-2">
                            <a href="javascript:void(0)" class="pur-cell" :class="childTwo.className"
                                v-for="(childTwo,child2Index) in liveItem.child2" :key="child2Index">{{childTwo.gameName}}</a>
                        </div>
                    </div>
                    <div class="cell-text-wrapper" :class="themes.name" :style='themes.rightBg'>
                        <div class="cell-title" :style='themes.titleColor' >{{liveItem.name}}</div>
                        <div class="redpink-line" :style="themes.line"></div>
                        <div class="cell-text" :style="themes.text">{{liveItem.text1}}<br>{{liveItem.text2}}</div>
                        <div class="cell-more" :class="site">
                            <!-- 预览版  getItemId(liveItem) -->
                            <a href="javascript:void(0)" v-show="liveItem.name!='敬请期待'" class="start-game" data-game-id="A02026" @click="$loginGame(liveItem,themes.name == 'jltx-new2' ? 'betsb' : themes.name)">
                                <span>开始游戏 &gt;</span>
                            </a>
                            <a href="javascript:void(0)" v-show="liveItem.name=='敬请期待'" class="start-game" data-game-id="A02026">
                                <span>敬请期待 &gt;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    themes: {
      type: Object
    },
    site:{
      type: String,
      default: function() {
        return "";
      },
    }
  },
  data() {
    return {
      liveDatas: []
    };
  },
  methods: {
    getLiveData() {
      let allGame = this.$getObjByLocalStorage(`live_game_new`);
      if (allGame) {
        this.initLiveData();
      } else {
        this.getlive(true);
      }
    },
    initLiveData() {
      let allGame = this.$getObjByLocalStorage(`live_game_new`);
      let arr = [];
      for (let i = 0; i < allGame.length; i++) {
        if(allGame[i].id != 48){
          arr.push(allGame[i])
        }
      }
      arr.forEach((live, index) => {
        let data;
        switch (live.id) {
          case 31:
            data = {
              name: "AG视讯厅",
              id: "31",
              class: "ag",
              text1: "美女主播互动综合游戏区",
              text2: "2万在线玩家同场竞技",
              bgImgSrc: "url(/static/public/image/live/live-1.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "包桌百家乐", className: "blue-cell" },
                { gameName: "竞咪百家乐", className: "purple-cell" }
              ],
              child2: [
                { gameName: "龙虎", className: "blue-cell" },
                { gameName: "骰宝", className: "purple-cell" },
                { gameName: "轮盘", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 32:
            data = {
              name: "BBIN视讯厅",
              id: "32",
              class: "bb",
              text1: "唯一线上合作伙伴",
              text2: "专业电投手 ，视频直播",
              bgImgSrc: "url(/static/public/image/live/live-14.jpg)",
              child1: [
                { gameName: "多台下注", className: "purple-cell" },
                { gameName: "快速厅", className: "blue-cell" },
                { gameName: "旗舰厅", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 3180:
            data = {
              name: "BG视讯厅",
              id: "3180",
              class: "bg",
              text1: "最老牌的博彩平台",
              text2: "独创多台下注",
              bgImgSrc: "url(/static/public/image/live/live-3.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "牛牛", className: "blue-cell" }
              ],
              child2: [
                { gameName: "温州牌九", className: "blue-cell" },
                { gameName: "德州扑克", className: "purple-cell" }
              ],
              hot: false
            };
            break;
          case 42:
            data = {
              name: "DG视讯厅",
              id: "42",
              class: "dg",
              text1: "特有的PLAYBOY真人系统",
              text2: "深受欧美玩家喜欢",
              bgImgSrc: "url(/static/public/image/live/live-6.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "PLAYBOY真人", className: "blue-cell" },
                { gameName: "德州扑克", className: "purple-cell" }
              ],
              child2: [
                { gameName: "二十一点", className: "blue-cell" },
                { gameName: "轮盘", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 34:
            data = {
              name: "DS视讯厅",
              id: "34",
              class: "ds",
              text1: "实时荷官互动",
              text2: "360度旋转咪牌",
              bgImgSrc: "url(/static/public/image/live/live-9.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "包桌百家乐", className: "blue-cell" },
                { gameName: "多台百家乐", className: "purple-cell" }
              ],
              child2: [
                { gameName: "龙虎", className: "blue-cell" },
                { gameName: "骰宝", className: "purple-cell" },
                { gameName: "轮盘", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 48:
            data = {
              name: "OG视讯厅",
              id: "48",
              class: "og",
              text1: "特有的PLAYBOY真人系统",
              text2: "专业电投手,视频直播",
              bgImgSrc: "url(/static/public/image/live/live-4.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "包桌百家乐", className: "blue-cell" },
                { gameName: "竞咪百家乐", className: "purple-cell" }
              ],
              child2: [
                { gameName: "龙虎", className: "blue-cell" },
                { gameName: "骰宝", className: "purple-cell" },
                { gameName: "轮盘", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 43:
            data = {
              name: "EBET视讯厅",
              id: "43",
              class: "ebet",
              text1: "最老牌的博彩平台",
              text2: "360度旋转咪牌,特殊玩法",
              bgImgSrc: "url(/static/public/image/live/live-5.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "包桌百家乐", className: "blue-cell" },
                { gameName: "多台百家乐", className: "purple-cell" }
              ],
              hot: true
            };
            break;
          case 30:
            data = {
              name: "VR彩票",
              id: "30",
              class: "vr",
              text1: "美女主播互动综合游戏区",
              text2: "深受欧美玩家喜欢",
              bgImgSrc: "url(/static/public/image/live/live-17.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "VR彩票", className: "blue-cell" },
                { gameName: "VR赛车", className: "purple-cell" }
              ],
              hot: true
            };
            break;
           case 12033:
            data = {
              name: "MG视讯",
              id: "12033",
              class: "mg",
              text1: "知名顶级娱乐品牌",
              text2: "精彩娱乐不打烊",
              bgImgSrc: "url(/static/public/image/live/12033.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "轮盘", className: "blue-cell" },
              ],
              hot: true
            };
            break;  
            case 11543:
            data = {
              name: "PT视讯",
              id: "11543",
              class: "pt",
              text1: "高清视讯直播",
              text2: "美女荷官在线发牌",
              bgImgSrc: "url(/static/public/image/live/11543.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "轮盘", className: "blue-cell" },
              ],
              hot: true
            };
            break;  
            case 11758:
            data = {
              name: "EVO视讯",
              id: "11758",
              class: "evo",
              text1: "知名顶级娱乐",
              text2: "精彩娱乐不打烊",
              bgImgSrc: "url(/static/public/image/live/11758.jpg)",
              child1: [
                { gameName: "百家乐", className: "purple-cell" },
                { gameName: "龙虎斗", className: "blue-cell" },
                { gameName: "现场真人秀", className: "purple-cell" }
              ],
              hot: true
            };
            break;
            case 12035:
            data = {
              name: "WM视讯",
              id: "12035",
              class: "wm",
              text1: "综艺天王（吴宗宪）站台",
              text2: "实体现场结合真人美女发牌",
              bgImgSrc: "url(/static/public/image/live/12035.jpg)",
              child1: [
                { gameName: "多台百家乐", className: "purple-cell" },
                { gameName: "龙虎", className: "blue-cell" },
                { gameName: "牛牛", className: "purple-cell" }
              ],
              child2: [
                { gameName: "三公", className: "blue-cell" },
                { gameName: "色碟", className: "purple-cell" },
              ],
              hot: true
            };
            break;    
        }
        if(data!=null){
          this.liveDatas.push(data);
        }
      });
      if (this.liveDatas.length % 2 != 0) {
        this.liveDatas.push({
          name: "敬请期待",
          id: "0",
          class: "",
          text1: "精彩娱乐不打烊",
          text2: "更多品牌将陆续加盟",
          bgImgSrc: "url(/static/public/image/live/live-99.png)",
          child1: [],
          hot: false
        });
      }
    },
    getlive(status) {
      this.$store
        .dispatch("game/gameSortNew", {
          device: "pc",
          id: 10003
        })
        .then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage("live_game_new", res.data[10003]);
            if (status) {
              this.initLiveData();
            }
          }
        });
    }
  },
  created() {
    this.getLiveData();
    setTimeout(() => {
      this.getlive(false);
    }, 3000);
  },
  mounted() {},
  watch: {},
  components: {}
};
</script>

<style lang="less" scoped>
.homeLive {
  .pageBody {
    .content {
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .cell {
        width: 50%;
        height: 225px;
        float: left;
        margin-top: 22px;
        &:nth-child(even){
          padding-left: 10px;
        }
        .live-image {
          text-align: center;
          height: 225px;
          float: left;
          position: relative;
          cursor: pointer;
          .hot {
            width: 63px;
            height: 30px;
            background: url("/static/public/image/live/hot.png");
            right: 18px;
            top: 10px;
            position: absolute;
            // z-index: 50;
          }
          .color-cell-wrapper-1 {
            position: relative;
            z-index: 50;
            margin-top: 133px;
            display: none;
            .pur-cell {
              display: inline-block;
              border-radius: 3px;
              color: #ffffff;
              height: 30px;
              line-height: 30px;
              padding: 0 12px;
              font-size: 14px;
              margin-left: 3px;
            }
            .purple-cell {
              border: 1px solid #bf5ef9;
            }
            .blue-cell {
              border: 1px solid #33bafe;
            }
            .purple-cell:hover {
              background: rgb(191, 94, 249);
              outline: 0;
            }
            .blue-cell:hover {
              background: rgb(51, 186, 254);
              outline: 0;
            }
          }
          .color-cell-wrapper-2 {
            position: relative;
            z-index: 50;
            margin-top: 8px;
            display: none;
            .pur-cell {
              display: inline-block;
              border-radius: 3px;
              color: #ffffff;
              height: 30px;
              line-height: 30px;
              padding: 0 12px;
              font-size: 14px;
              margin-left: 3px;
            }
            .purple-cell {
              border: 1px solid #bf5ef9;
            }
            .blue-cell {
              border: 1px solid #33bafe;
            }
            .purple-cell:hover {
              background: rgb(191, 94, 249);
              outline: 0;
            }
            .blue-cell:hover {
              background: rgb(51, 186, 254);
              outline: 0;
            }
          }
        }
        .live-image:hover .mask {
          background: url("/static/public/image/live/mask.png") no-repeat;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
        }
        .live-image:hover .color-cell-wrapper-1 {
          display: block;
        }
        .live-image:hover .color-cell-wrapper-2 {
          display: block;
        }
        .cell-text-wrapper {
          float: left;
          height: 100%;
          overflow: hidden;
          
          .cell-title {
            font-size: 22px;
            line-height: 24px;
          }
          .redpink-line {
            width: 37px;
            margin-top: 10px;
            margin-bottom: 17px;
          }
          .cell-text {
            font-size: 12px;
            line-height: 20px;
          }
          .cell-more {
            margin-top: 27px;
            position: relative;
            a {
              position: absolute;
              top: 0;
              left: 0;
              display: inline-block;
              width: 134px;
              height: 36px;
              border: 1px solid #ba8d4d;
              color: #ba8d4d;
              font-size: 16px;
              line-height: 36px;
              text-align: center;
              transition: 0.2s;
              cursor: pointer;
              opacity: 1;
              z-index: 1;
              span {
                position: relative;
                z-index: 3;
              }
            }
            a:before {
              position: absolute;
              content: "";
              z-index: 2;
              background: #ba8d4d;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
              -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
              -webkit-transition: -webkit-transform 0.6s
                cubic-bezier(0.8, 0, 0.2, 1);
              -webkit-transition-delay: 0s;
              transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
              transform: scale(0, 1);
              transform-origin: right top;
            }

            a:hover:before {
              transform-origin: left top;
              transform: scale(1, 1);
            }
            a:hover {
              color: #fff;
            }
          }
          .betsb{
             a{
                border: 1px solid #24c098;
                color: #24c098;
             }
             a:before{
                 background: #24c098;
             }
             a:hover {
              color: #fff;
            }
          }
          .tycjt{
             a{
                border: 1px solid #24c098;
                color: #24c098;
             }
             a:before{
                 background: #24c098;
             }
             a:hover {
              color: #fff;
            }
          }
          .tyc82{
             a{
                border: 1px solid #24c098;
                color: #24c098;
             }
             a:before{
                 background: #24c098;
             }
             a:hover {
              color: #fff;
            }
          }
           .hqyl{
             a{
                border: 1px solid #DFB65F;
                color: #DFB65F;
             }
             a:before{
                 background: #DFB65F;
             }
             a:hover {
              color: #fff;
            }
          }
          .xpj{
             a{
                border: 1px solid #feca4c;
                color: #feca4c;
             }
             a:before{
                 background: #feca4c;
             }
             a:hover {
              color: #fff;
            }
          }
           .qygj,.amhg{
             a{
                border: 1px solid #51b5e9;
                color: #51b5e9;
             }
             a:before{
                background: linear-gradient(to right, #51b6e9, #62dbf2);;
             }
             a:hover {
              color: #fff;
            }
          }
          .test-1{
             a{
                border: 1px solid #51b5e9;
                color: #51b5e9;
             }
             a:before{
                background: linear-gradient(to right, #51b6e9, #62dbf2);;
             }
             a:hover {
              color: #fff;
            }
          }
           .vnso,.ylhg{
             a{
                border: 1px solid #51b5e9;
                color: #51b5e9;
             }
             a:before{
                background: linear-gradient(to right, #51b6e9, #62dbf2);;
             }
             a:hover {
              color: #fff;
            }
          }
          .jltx{
             a{
                border: 1px solid #CF3A36;
                color: #CF3A36;
             }
             a:before{
                background: linear-gradient(to right, #FF6F6B,#CF3A36);;
             }
             a:hover {
              color: #fff;
            }
          }
          //  .vnso{
          //    a{
          //       border: 1px solid #ffa724;
          //       color: #ffa724;
          //    }
          //    a:before{
          //       background: linear-gradient(to right, #ffa724,#ffa724);
          //    }
          //    a:hover {
          //     color: #fff;
          //   }
          // }
        }
      }
      
    }
    .content-1200 {
      width: 1200px;
      .live-image{
        width: 364px;
      }
      .cell-text-wrapper {
        width: 225px;
        padding: 22px 27px 0;
      }
      .mgm,.mgm-preview{
        .cell-more a{
            border: 1px solid#feca4c!important;
            color:#feca4c!important;
        }
        .cell-more a:hover{
          color: #fff!important;
        }
      }
    }
    .content-1000 {
      width: 1000px;
      .live-image{
        width: 320px;
      }
      .cell-text-wrapper {
        width: 160px;
        padding: 15px 0 0 10px;
      }
    }
  }
}
</style>
