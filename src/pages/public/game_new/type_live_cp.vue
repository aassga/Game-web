<template>
    <div class="homeLive">
        <ul class="home-list-wrap">
          <li :key="index" v-for="(item,index) in liveDatas" href="javascript:void(0)" :style="{background:'url(' + bgList +'/bg_' + item.class +  '.png) no-repeat'}" :class="[item.class,'home-list-item']" >
                <div :class="item.clicked=='left'?'left_cont':'right_cont'">
                <div class="left_logo">
                  <img :src="item.logoSrc" alt="">
                </div>
                <h3 class="title">{{item.name}}</h3>
                <p class="text">{{item.text}}</p>
              </div>
              <img :src="item.rightImgSrc" :class="item.clicked=='left'?'right_img':'left_img'" alt="">
              <div class="mark-box">
								
								<div class="join-game-btn js-join-game-btn" :style="{background:'url(./../../../static/'+themes.name+'/img/live/jr.png'}" data-type="aglive" @click="$loginGame(item)">
									<a href="javascript:;"></a>
								</div>
							</div>
          </li>
        </ul>
        <form class="home-list-form" name="agform" ref="formDatas" method="post" target="_blank">
          <input v-model="params" name="params" type="text" value="">
          <input v-model="key" name="key" type="text" value="">
          <input type="submit" value="提交">
        </form>
    </div>
</template>
<script>
// import mixin from '../games/public'
export default {
  // mixins: [mixin],
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
      liveDatas: [],
      params: '',
      clicked:true,
      key: '',
      bgList:'./../../../static/'+this.themes.name+'/img/live',
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
              name: 'AG视讯厅',
              clicked:"left",
              text:"美女主播 热线传情",
              platform: 'live_casino', 
              id: '31', 
              class: 'ag',logoSrc:"/static/"+this.themes.name+"/img/live/log_ag.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_ag1.png"
            }
            break;
          case 32:
            data = {
              name: 'BBIN视讯厅',
              clicked:"left",
              text:"独特界面 畅游娱乐",  
              platform: 'live_casino', 
              id: '32', class: 'bbin',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_bbin.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_bbin.png"
            }
            break;
          case 3180:
            data = {
              name: 'BG视讯厅',
              clicked:"left",
              text:"众多美女 陪你畅游",  
              platform: 'live_casino', 
              id: '3180', class: 'bg',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_bg.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_bg.png"
            };
            break;
          case 42:
            data = {
              name: 'DG视讯厅',
              clicked:"left",
              text:"美女主播 热线传情",  
              platform: 'live_casino', 
              id: '42', 
              class: 'dg',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_dg.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_dg.png"
            }

            break;
          case 34:
            data ={
              name: 'DS视讯厅',
              clicked:"left",
              text:"业界顶尖 奢华娱乐",  
              platform: 'live_casino', 
              id: '34', class: 'ds',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_ds.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_ds.png"
            }
            break;
          case 48:
            data = {
              name: 'OG视讯厅',
              clicked:"left",
              text:"口碑良好 欢乐无限",  
              platform: 'live_casino',
              id: '48', 
              class: 'og',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_og.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_og.png"
            }
            break;
          case 43:
            data = {
              name: 'eBET视讯厅',
              clicked:"left",
              text:"画质高清 界面高贵",  
              platform: 'live_casino',
              id: '43', class: 'ebet',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_ebet.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_ebet.png"
            }
            break;
          case 30:
            data = {
              name: 'VR彩票',
              clicked:"left", 
              text:"高清画质 专业VR",  
              platform: 'vr_lottery', 
              id: '30', class: 'vr',
              logoSrc:"/static/"+this.themes.name+"/img/live/log_vr.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_vr.png"
            }
            break;
          case 12033:
            data = {
              name: "MG视讯",
              id: "12033",class: 'mg',
              clicked:"left", 
              text:"知名顶级娱乐品牌",
              platform: 'mg_lottery', 
              logoSrc:"/static/"+this.themes.name+"/img/live/log_mg.png",
              rightImgSrc:"/static/"+this.themes.name+"/img/live/img_mg.png"
            };
            break;  
            case 11543:
              data = {
                name: "PT视讯",
                id: "11543",class: 'pt',
                clicked:"left", 
                text:"美女荷官在线发牌",
                platform: 'pt_lottery', 
                logoSrc:"/static/"+this.themes.name+"/img/live/log_pt.png",
                rightImgSrc:"/static/"+this.themes.name+"/img/live/img_pt.png"
              };
              break;  
            case 11758:
              data = {
                name: "EOV视讯",
                id: "11758",class: 'eov',
                clicked:"left", 
                text:"知名顶级娱乐品牌",
                platform: 'eov_lottery', 
                logoSrc:"/static/"+this.themes.name+"/img/live/log_eov.png",
                rightImgSrc:"/static/"+this.themes.name+"/img/live/img_eov.png"
              };
              break;
            case 12035:
              data = {
                name: "wm视讯",
                id: "12035",class: 'wm',
                clicked:"left", 
                text:"知名顶级娱乐品牌",
                platform: 'mg_lottery', 
                logoSrc:"/static/"+this.themes.name+"/img/live/log_wm.png",
                rightImgSrc:"/static/"+this.themes.name+"/img/live/img_wm.png"
              };
              break;    
        }
        if(data!=null){
          this.liveDatas.push(data);
        }
      });
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
.live {
    // background: url("/static/public/image/game/live/zr.jpg") no-react centertop,#f1f1f1;
  }
  * {
    margin: 0;
    padding: 0;
  }

  span {
    position: abso;
    top: 0;
    z-index: 1;
    display: inline-block;
    width: 27px;
    height: 80px;
    vertical-align: top;
    background-color: #202020;
    cursor: pointer;
  }

  span:hover:before {
    background-position-y: bottom;
  }

  #prev {
    left: 27px;
  }

  #next {
    right: 27px;
  }

  span:before {
    content: "";
    position: absolute;
    top: 30px;
    left: 8px;
    width: 12px;
    height: 20px;
    background-position: center top;
    background-repeat: no-repeat;
  }

  #prev:before {
    background-image: url("/static/public/image/game/live/left.png");
  }

  #next:before {
    background-image: url("/static/public/image/game/live/right.png");
  }

  .active {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(-150px, 0, 0);
  }

  .back {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(150px, 0, 0);
  }

  .home-list-wrap {
    text-align: center;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    font-size: 0;
    padding-bottom: 15px;
    .home-list-item {
      position: relative;
      float:left;
      margin-bottom: 20px;
      width:590px;
      height: 323px;
      background-size: 100% 100%;
      .left_cont{
        float:left;
        position: relative;
        left:0;
        padding:35px 0 0 35px;
        color:#fff;
        transition: all .3s;
        .left_logo{
          text-align: left;
        }
        .title{
          margin:25px auto 12px;
          font-size: 24px;
          font-weight: bolder;
          text-align: left; 
        }
        .text{
          font-size: 20px;
          line-height: 1.5;
        }
      }
      .right_cont{
          float:right;
          position: relative;
          left:0;
          padding:35px 35px 0 0;
          color:#fff;
          transition: all .3s;
          .left_logo{
            text-align: right;
          }
          .title{
            margin:25px auto 25px;
            font-size: 24px;
            font-weight: bolder;
            text-align: right; 
          }
          .text{
            font-size: 16px;
            line-height: 1.5;
        }
      }
      .right_img{
        position: absolute;
        right:0px;
        bottom:0px;
        transition: all .3s;
      }
      .left_img{
        position: absolute;
        left:0px;
        bottom:0px;
        transition: all .3s;
      }
      .mark-box{
        position: absolute;
        top:0px;
        left:0px;
        right:0px;
        bottom: 0px;
        padding-top: 35px;
        .qr-code-container{
          opacity:0;
          width:59%;
          overflow: hidden;
          margin-bottom: 25px;
          .client-down{
            float:left;
            margin:0 0 0 45px;
            img{
              border:0;
              vertical-align: middle;
            }
            p{
              font-size: 14px;
              color:#fff;
              text-align: center;
            }
          }
        }
        .join-game-btn{
          position: absolute;
          bottom: 20px;
          left:35px;
          z-index: 200;
          height: 33px;
          width: 153px;
          text-align: center;
          // background: url(/static/t111/img/live/jr.png);
          opacity:0;
          transition: all .3s;
          cursor: pointer;
          line-height: 33px;
          background-size: 100% 100%;
          a{
            font-size: 16px;
            color:#fff;
            display: block;
            width:100%;
            height:100%;
            text-align: center;
          }
        }
      }
    }
    .home-list-item:nth-child(even){
      margin-left:20px;
    }
    .home-list-item:hover .qr-code-container{
      opacity: 1;
    }
    .home-list-item:hover .join-game-btn{
      opacity: 1;
    }
    li:hover {
      background-position-y: bottom;
    }

    // .ag {
    //   background-image: url(/static/t111/img/live/bg_ag.png);
    // }

    // .bb {
    //   background-image: url(/static/t111/img/live/bg_bbin.png);
    // }

    // .bg {
    //   background-image: url(/static/t111/img/live/bg_bg.png);
    // }

    // .dg {
    //   background-image: url(/static/t111/img/live/bg_dg.png);
    // }

    // .ds {
    //   background-image: url(/static/t111/img/live/bg_ds.png); 
    // }

    // .lebo {
    //   background-image: url(/static/t111/img/live/bg_lebo.png);
    // }

    // .og {
    //   background-image: url(/static/t111/img/live/bg_og.png);
    // }

    // .ebet {
    //   background-image: url(/static/t111/img/live/bg_ebet.png);
    // }

    // .lmg {
    //   background-image: url(/static/t111/img/live/bg_lmg.png);
    // }

    // .ob{
    //   background-image: url(/static/t111/img/live/bg_ob.png);
    // }

    // .sa {
    //   background-image: url(/static/t111/img/live/bg_sa.png);
    // }

    // .vr {
    //   background-image: url(/static/t111/img/live/bg_vr.png);
    // }
    // .mg{
    //   background-image: url(/static/t111/img/live/bg_mg.png);
    // }

    // .pt {
    //   background-image: url(/static/t111/img/live/bg_pt.png);
    // }

    // .eov {
    //   background-image: url(/static/t111/img/live/bg_eov.png);
    // }
    // .wm {
    //   background-image: url(/static/t111/img/live/bg_wm.png);
    // }
    .more{
      background-image: url(/static/t111/img/live/more.png);
    }

  }
  .home-list-item:hover .left_cont{
      transform: translateX(10px);
    }
  .home-list-item:hover .right_img{
      transform: translateX(-10px);
   }

  .home-list-item:hover .right_cont{
      transform: translateX(10px);
    }
  .home-list-item:hover .left_img{
      transform: translateX(-10px);
   }
    
 
  .home-list-form {
    display: none;
  }

  .banner-cpyx {
    // background: black;
    .wrapper {
      margin: 0 auto;
      width: 960px;
      height: 10px;

      .demolist {
        margin-top: 30px;
      }
    }
  }
  .live_content{
    position: relative;
    // padding:30px 0;
    padding:50px 0 30px;
    max-width: 1920px;
    min-width: 1200px;
    margin:0 auto;
    background:#eaeaea url(/static/t111/img/live/image_2019_02_18T01_12_35_435Z.png) repeat-y center bottom
  }
  .night{
      background: rgba(18,21,66,.8)
  }
</style>
