<template>
  <div class="new-index klk-home">
    <div class="content_bg">
      <div class="content content-main-bg" :class="{night:colorbool}">
          <div class="wp">
            <div class="gameContainer wow fadeInUp" data-wow-delay="0">
              <ul>
                <li v-for="(item,i) in topList" :key="i" @click="goLink(item)">
                  <div class="bg"></div>
                  <div class="nr">
                    <div class="icon"><img :src="item.picImg" alt="icon"></div>
                    <div class="text"><h2>{{item.name}}</h2><p>{{item.text}}</p></div>
                  </div>
                  <div class="pic"></div>
                </li>
              </ul>
            </div>
            <div class="bg1">
              <div class="gameContainer1 wow fadeInUp" data-wow-delay="0">
                <div class="title1">
                  <p><img src="/static/tccp/img/title_hotGa.png" alt=""></p>
                </div>
                <ul class="wow fadeInUp" data-wow-delay="0">
                  <li v-for="(item,i) in hotGamgeList" :key="i" @click="loginGame(item)">
                    <div class="text">
                      <h2>{{item.name}}</h2><p>{{item.text}}</p>
                    </div>
                    <div class="icon">
                      <img :src="item.img" alt="icon" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg2">
              <div class="gameContainer2 ">
                <div class="title wow fadeInUp" data-wow-delay="0">
                  <p><img src="/static/tccp/img/title_topPlatform.png" alt=""></p>
                </div>
                <div class="index_layer3">
                  <div 
                  class="layer3_box wow" 
                  :class="i===0?'fadeInRight ':'fadeInLeft'"
                  style="visibility: visible;"
                  data-wow-delay="0" 
                  v-for="(item,i) in gameList1" 
                  :key="i">
                    <div class="icon">
                      <img :src="item.bgImg" alt="bg" class="bg">
                      <img :src="item.img" alt="bg" class="pic">
                    </div>
                    <div class="text">
                      <div class="text_box">
                        <div class="text_Top">
                          <p>{{item.content}}</p>
                          <a class="playBtn" @click="$router.push(item.link)"></a>
                        </div>
                        <div class="text_Bottom">
                          <ul>
                            <li v-for="(t,i) in item.games" :key="i">
                              <a  @click="$router.push(t.link)">
                                <img :src="t.icon" alt="icon">
                                <div class="bt">{{t.name}}</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="index_layer4">
                  <ul>
                    <li 
                      v-for="(item,i) in gameList2"
                      :key = "i"
                      class="wow fadeInUp" 
                      :data-wow-delay="i===0?'0.6s':i===1?'0.2s':'0.1s'"
                      >
                      <a @click="games(item)">
                        <div class="bg bg6" :style="{'background':'url('+item.bgImg+') no-repeat'}"></div>
                        <div class="pic" :class="'pic'+(i+1)" :style="{'background':'url('+item.img+') no-repeat'}"></div>
                      </a>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
            
          </div>
          <div class="wow bounceIn liveVideo" data-wow-delay="0.1s">
                <ul>
                  <li><img src="/static/tccp/img/liveBg.png" alt=""></li>
                  <li>
                    <p><img src="/static/tccp/img/live.png" alt=""></p>
                    <p @click="$router.push('/home/live')"><img src="/static/tccp/img/play_right.png" alt=""></p>
                  </li>
                  <li>
                    <p><img src="/static/tccp/img/Video.png" alt=""></p>
                    <p @click="$router.push('/home/slot?navid=9&id=0')"><img src="/static/tccp/img/play_left.png" alt=""></p>
                  </li>
                  <li>
                    <img src="/static/tccp/img/videoBg.png" alt="">
                  </li>
                </ul>
          </div>
          
          <div class="index_layer6">
            <div class="wow fadeInLeft icon" data-wow-delay="0.1s">
              <img src="/static/tccp/img/indPhone.png" alt="icon">
            </div>
            <div class="wow fadeInRight text" data-wow-delay="0.1s">
              <h2><img src="/static/tccp/img/index_dowTitle.png" alt=""></h2>
              <!-- <p>内地顶尖的手机投注APP</p> -->
              <ul>
                <li>
                  <h3><img src="/static/tccp/img/index_H5.png" alt=""></h3>
                  <div class="codeBox">
                    <div class="code_wrap App_wrap" ref="qr-code-app"></div>
                    <span>APP下载</span>
                  </div>
                  <div class="text_wrap">
                    <span>扫码下载APP</span>
                    <h4>支持iOS&amp; Android全部移动设备</h4>
                    <span>https://www.741.com</span>
                  </div>
                </li>
                <li>
                  <h3><img src="/static/tccp/img/index_App.png" alt=""></h3>
                  <div class="codeBox"><div class="code_wrap H5_wrap" ref="qr-code-h5"></div><span>H5手机端</span></div>
                  
                  <div class="text_wrap">
                    <span>无需下载直接访问</span>
                    <h4>无需下载,手机输入网址即可访问</h4>
                    <span>https://www.741.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="index_layer7">
            <div class="title wow fadeInUp" data-wow-delay="0.1s"> 
              <p><img src="/static/tccp/img/title_bestService.png" alt=""></p>
            </div>
            <ul>
              <li class="wow fadeInUp" data-wow-delay="0.1s">
                <img src="/static/tccp/img/index_118.png" alt="bg" />
              </li>
              <li class="wow fadeInUp" data-wow-delay="0.2s">
                <img src="/static/tccp/img/index_120.png" alt="bg" />
              </li>
              <li class="wow fadeInUp" data-wow-delay="0.3s">
                <img src="/static/tccp/img/index_122.png" alt="bg" />
              </li><li class="wow adeInUp" data-wow-delay="0.4s">
                <img src="/static/tccp/img/index_124.png" alt="bg" />
              </li>
            </ul>
          </div>
          <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box" >
            <div class="popout-box">
              <span v-html="popups"></span>
            </div>
          </Modal>
          <!-- <new-modal :newmodal="newmodal"></new-modal> -->

         <!-- <Modal width="657" height="546.67" :scrollable=true :mask-closable=false v-model="showimg" class='guanbi'><img width="100%" height="100%" :src="imgsrc"/><span class="close" @click="close"></span></Modal>  -->
         <!-- <vp-mc :imgsrc="imgsrc"></vp-mc> -->
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import UserService from "@/service/public/UserService.js";
import "@/assets/iconfont/klk/iconfont.css";
import "@/assets/iconfont/public/iconfont.css";
// import newModal from "../../public/home/newmodal.vue";
import {WOW} from 'wowjs'


let indextime;
export default {
  data() {
    return {
      showimg: false,
      showPopout: false,
      imgsrc: "/static/tccp/img/pcAlert.png",
      popups: "",
      // newmodal: {
      //   title: "来自澳门威尼斯人的消息",
      //   bgcolor: {
      //     background: "linear-gradient(90deg,#65e0f4,#4fade6)"
      //   }
      // },
      topList: [
        {
          name: "免费注册",
          text: "REGISTRATION",
          picImg: "/static/tccp/img/pic1.png",
          link: ""
        },
        {
          name: "快速充值",
          text: "FAST RECHARGE",
          picImg: "/static/tccp/img/pic2.png",
        },
        {
          name: "优惠大厅",
          text: "PROMOTION HALL",
          picImg: "/static/tccp/img/pic3.png",
          link: "/home/youhui"
        },
        {
          name: "APP下载",
          text: "APP DOWNLOAD",
          picImg: "/static/tccp/img/pic4.png",
          dowblink: "/static/tccp/html/download/index.html"
        }
      ],
      hotGamgeList: [
        {
          name: "抢庄牛牛",
          text: "KY",
          img: "/static/tccp/img/245.png",
          link: "",
          id:245
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          img: "/static/tccp/img/lottery.png",
          link: "",
          id:10688,
          type:"lot"
        },
        {
          name: "森林舞会",
          text: "KY",
          img: "/static/tccp/img/3604.png",
          link: "",
          id:3604
        },
        {
          name: "百家乐",
          text: "KY",
          img: "/static/tccp/img/3603.png",
          link: "",
          id:3603
        },
        {
          name: "21点",
          text: "KY",
          img: "/static/tccp/img/251.png",
          link: "",
          id:251
        },
        {
          name: "押庄龙虎",
          text: "KY",
          img: "/static/tccp/img/250.png",
          link: "",
          id:250
        },
        {
          name: "奔驰宝马",
          text: "KY",
          img: "/static/tccp/img/10692.png",
          link: "",
          id:10692
        },
        {
          name: "二八杠",
          text: "KY",
          img: "/static/tccp/img/248.png",
          link: "",
          id:248
        },
        {
          name: "二人麻将",
          text: "LY",
          img: "/static/tccp/img/10629.png",
          link: "",
          id:10629
        },
        {
          name: "炸金花",
          text: "LY",
          img: "/static/tccp/img/10617.png",
          link: "",
          id:10617
        },
        {
          name: "癞子牛牛",
          text: "LY",
          img: "/static/tccp/img/11179.png",
          link: "",
          id:11179
        },
        {
          name: "百人牛牛",
          text: "KY",
          img: "/static/tccp/img/3605.png",
          link: "",
          id:3605
        }
      ],
      gameList1: [
        {
          name: "电子游艺",
          text: "SLOT GAMES",
          bgImg: "/static/tccp/img/gameBg4.png",
          img: "/static/tccp/img/game4.png",
          link:"/home/slot?navid=9&id=0",
          content:
            "全网最全电子游艺，汇聚世界顶级电子游艺平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
          games: [
            { icon: "/static/tccp/img/LG_MGWBDZ.png", name: "MG电子", link: "/home/slot?navid=9&id=10022" },
            { icon: "/static/tccp/img/LG_CQ.png", name: "CQ9电子", link: "/home/slot?navid=9&id=10018" },
            {
              icon: "/static/tccp/img/LG_JDB_DZ_LHJ.png",
              name: "JDB电子",
              link: "/home/slot?navid=9&id=10021",
            },
            { icon: "/static/tccp/img/LG_FGDZ.png", name: "FG电子", link: "/home/slot?navid=9&id=10020" },
            { icon: "/static/tccp/img/LG_AGDZ.png", name: "AG电子", link: "/home/slot?navid=9&id=10015" },
            {
              icon: "/static/tccp/img/LG_BBINDZ.png",
              name: "BBIN电子",
              link: "/home/slot?navid=9&id=10016",
            },
            { icon: "/static/tccp/img/a15.png", name: "MORE", link: "/home/slot?navid=9&id=0" }
          ]
        },
        {
          name: "棋牌游戏",
          text: "CHESS GAMES",
          bgImg: "/static/tccp/img/gameBg5.png",
          img: "/static/tccp/img/game5.png",
          link:"/home/chess?navid=9&id=0",
          content:
            "全网最全棋牌游戏，汇聚世界顶级棋牌游戏平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
          games: [
            { icon: "/static/tccp/img/LG_KYQP.png", name: "开元棋牌", link: "/home/chess?navid=9&id=10042" },
            {
              icon: "/static/tccp/img/LG_SSOCHESS.png",
              name: "乐游棋牌",
              link: "/home/chess?navid=9&id=10612"
            },
            {
              icon: "/static/tccp/img/10694.png",
              name: "天游棋牌",
              link: "/home/chess?navid=9&id=10694"
            },
            { icon: "/static/tccp/img/LG_FGQP.png", name: "FG棋牌", link: "/home/chess?navid=9&id=10732" },
            { icon: "/static/tccp/img/LG_VG.png", name: "VG棋牌", link: "/home/chess?navid=9&id=10041" },
            {
              icon: "/static/tccp/img/LG_ZILLIONAIRE.png",
              name: "大富翁棋牌",
              link: "/home/chess?navid=9&id=11759"
            },
            { icon: "/static/tccp/img/a15.png", name: "MORE", link: "/home/chess?navid=9&id=0" }
          ]
        }
      ],
      gameList2:[
        {
          name: "捕鱼游戏",
          text: "FISHNG",
          bgImg: "/static/tccp/img/bg5.png",
          img: "/static/tccp/img/pic11.png",
          link:"/home/fish?navid=9&id=0",
        },
        {
          name: "体育赛事",
          text: "SPORTS",
          bgImg: "/static/tccp/img/bg3.png",
          img: "/static/tccp/img/pic9.png",
          link:"/home/tiyu?id=0",
        },
        {
          name: "彩票游戏",
          text: "LOTTERY",
          bgImg: "/static/tccp/img/bg4.png",
          img: "/static/tccp/img/pic10.png",
          link:"#/plays/hall"
        }
      ],
      gameList3:[
        {
          name: "真人视讯",
          text: "LIVE CASINO",
          bgImg: "/static/tccp/img/liveBg.png",
          img: "",
          link: "/home/live"
        },
        {
          name: "电竞游戏",
          text: "VIDEO GAME",
          bgImg: "/static/tccp/img/videoBg..png",
          img: "",
          link:"/home/slot?navid=9&id=0",
        }
      ]
    };
  },
  methods: {
    loginGame(item){
       if(item.type)  window.open("#/plays/hall");
       else this.$loginGame(item)
    },
    games(item){
      if (item.text == 'LOTTERY') {
        window.open(item.link)
      }else{
        this.$router.push(item.link)
      }
    },
    goLink(item){
        if(item.link){this.$router.push(item.link);} 
        else if(item.dowblink){window.open(item.dowblink);} 
        else if (item.text == 'REGISTRATION'){
          this.$store.commit('alert/showMgmRegister', true);
        }
        else{
          if(localStorage.token) {this.$goUserCen('recharge',0)}
          else{ this.$store.commit('alert/newshowtip', {
              bool: true,
              title: '请先登录',
              model: '',
              })} 
        } 
    }
  },

  created() {},
  mounted() {
    setTimeout(() => {
          if(localStorage.register){
              this.$store.commit('alert/showMgmRegister', true);
              localStorage.removeItem('register')
          }
      }, 2000);
    this.createDownloadQRCode({
      el: this.$refs["qr-code-app"],
      url: window.location.origin + "/m#/download",
      size: 120
    });
    this.createDownloadQRCode({
      el: this.$refs["qr-code-h5"],
      url: window.location.origin + "/m#/download",
      size: 120
    });

    this.$nextTick(()=>{
      let  wow = new WOW({
      live: false
      })
      wow.init()
    })
  },
  computed: {
    colorbool() {
      return this.$store.state.mainState.color;
    },
    websocketdata() {
      return this.$store.state.mainState.websoc;
    }
  },
  store
};
</script>

<style lang="less">
@keyframes animateSub {
  0% {
    top: 0;
  }

  to {
    top: -700px;
  }
}
.new-index {
  position: relative;
  width: 100%;
  margin: 0 auto;
  .content_bg {
    overflow: hidden;
    background: #2d0738;
    .content-main-bg {
      position: relative;

      .wp {
        width: 100%;
        margin: 0 auto;
        padding-top: 35px;
        >div{
          width: 1200px;
          margin:0 auto;
        }
        .gameContainer {
          ul {
            display: flex;
            justify-content: space-between;
            li {
              width: 290px;
              height: 80px;
              border-radius: 40px;
              position: relative;
              overflow: hidden;
              margin-right: 13px;
              background: #2D2D2D;
              cursor: pointer;
              background: url('/static/tccp/img/index_bg.png') no-repeat;
              .bg {
                width: 10px;
                height: 100%;
                float: left;
                -webkit-transition: 0.5s;
                -o-transition: 0.5s;
                transition: 0.5s;
              }
              // &:first-child .bg {
              //   background: #664535;
              // }
              // &:nth-child(2) .bg {
              //   background: #3ea8ff;
              // }
              // &:nth-child(3) .bg {
              //   background: #fedb41;
              // }
              // &:nth-child(4) .bg {
              //   background: #ff523e;
              // }
              .nr {
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                width: 100%;
                .icon {
                  margin-left: 13px;
                  float: left;
                  width: 52px;
                  height: 52px;
                  border-radius: 50%;
                  img {
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                }
                .text {
                  float: left;
                  padding-left: 15px;
                  h2 {
                    line-height: 38px;
                    font-size: 22px;
                    color: #FFD053;
                    -webkit-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                  }
                  p {
                    color: #d060d2;
                    font-size: 12px;
                    -webkit-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                  }
                }
              }
              .pic {
                position: absolute;
                right: 30px;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                background: url("/static/tccp/img/pic5.png");
                width: 64px;
                height: 64px;
                -webkit-transition: 0.8s;
                -o-transition: 0.8s;
                transition: 0.8s;
              }
              &:hover .nr .text p {
                color: #fff;
              }
              &:hover .pic {
                -webkit-transform: translateY(-50%) rotate(360deg);
                -ms-transform: translateY(-50%) rotate(360deg);
                transform: translateY(-50%) rotate(360deg);
                background: url("/static/tccp/img/pic6.png");
              }
              &:hover .bg {
                width: 100%;
              }
            }
          }
        }
        .bg1{
          width: 1200px;
          margin:0 auto;
        }
        .gameContainer1 {
          width: 1200px;
          margin: 0 auto;
          .title1 {
            padding: 50px 0;
            h2 {
              text-align: center;
              font-size: 34px;
              color: #FFD053;
              line-height: 34px;
              padding-bottom: 10px;
            }
            p {
              text-align: center;
              color: #707574;
              font-size: 10px;
              line-height: 12px;
              // background: url("/static/tccp/img/bg6.png") 50% no-repeat;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;
            li {
              display: flex;
              -ms-flex-pack: justify;
              justify-content: space-between;
              width: 286px;
              height: 125px;
              margin: 0 13px 20px 0;
              background: #460847;
              -webkit-transition: 0.5s;
              -o-transition: 0.5s;
              transition: 0.5s;
              cursor: pointer;
              .text {
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center;
                padding-left: 30px;
                padding-top: 30px;
                h2 {
                  line-height: 40px;
                  font-size: 21px;
                  color: #fff;
                }
                p {
                  font-size: 12px;
                  color: #898989;
                }
              }
              .icon {
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                width: 110px;
                height: 110px;
                padding: 7px 10px 0 0;
                img {
                  width: 100%;
                  max-height: 100%;
                }
              }
              &:hover {
                -webkit-transform: scale(1.05);
                -ms-transform: scale(1.05);
                transform: scale(1.05);
              }
            }
          }
        }
        .bg2{
          width: 100%;
          background: url('/static/tccp/img/bg_3.png')no-repeat;
          background-size: auto;
        }
        .gameContainer2 {
          width: 1200px;
          margin: 0 auto;
          .title {
            padding: 80px 0;
            h2 {
              text-align: center;
              font-size: 34px;
              color: #FFD053;
              line-height: 34px;
              padding-bottom: 10px;
            }
            p {
              text-align: center;
              color: #707574;
              font-size: 10px;
              line-height: 12px;
              // background: url(/static/tccp/img/bg6.png) 50% no-repeat;
            }
          }
          .index_layer3{
            display: flex;
            justify-content: space-between;
            flex-direction: row-reverse;
            .layer3_box{
              width: 590px;
              border-radius: 24px;
              .icon{
                width: 100%;
                height: 200px;
                position: relative;
                .bg{
                  width: 100%;
                  height: 100%;
                }
                .pic{
                  position: absolute;
                  bottom: 0;
                  right: 44px;
                  -webkit-transition: .5s;
                  -o-transition: .5s;
                  transition: .5s;
                  
                }
              }
              &:hover .icon .pic {
                  -webkit-animation: ab infinite linear 1.5s;
                  animation: ab infinite linear 1.5s;
              }
              .text {
                width: 100%;
                height: 215px;
                background: #3d0d41;
                border-radius: 0 0 25px 25px;
                position: relative;
                z-index: 1;
                .text_box {
                  width: 560px;
                  margin: 0 auto;
                  .text_Top {
                    width: 100%;
                    padding: 20px 0;
                    border-bottom: 1px solid #6b1570;
                    overflow: hidden;
                    p{
                      float: left;
                      line-height: 25px;
                      color: #d060d2;
                      width: 385px;
                      font-size:13px;
                    }
                    a{
                      width: 155px;
                      height: 56px;
                      border-color: #d060d2;
                      float: right;
                      &.playBtn {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        font-size: 20px;
                        color:#FFD053;
                        background: url(/static/tccp/img/play.png) 28px no-repeat;
                        text-indent: 40px;
                        font-weight: 700;
                        // border: 1px solid #FFD053;
                      }
                    }
                  }
                  
                  .text_Bottom {
                    width: 100%;
                    ul {
                      display: flex;
                      justify-content:space-between;
                      li {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -ms-flex-direction: column;
                        flex-direction: column;
                        height: 100px;
                        cursor: pointer;
                        a{
                          color: #5c5c5c;
                          text-decoration: none;
                        }
                        &:hover{
                          .bt{
                            color:  #FFD053;
                          }
                          
                        }
                        img{
                          width: 45px;
                          height: 45px;
                          margin: 12px 0;
                          // -webkit-filter: grayscale(100%);
                          // filter: grayscale(100%);
                          // opacity: .4;
                        }
                        .bt {
                          font-size:12px;
                          color: #fff;
                          text-align: center;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .index_layer4{
            margin: 35px auto;
            height: 200px;
            ul {
              display:flex;
              justify-content: space-between;
              height: 200px;
              li {
                position: relative;
                width: 385px;
                height: 200px;
                cursor: pointer;
                .bg {
                  width: 100%;
                  height: 100%;
                }
                .pic {
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  -webkit-transition: .5s;
                  -o-transition: .5s;
                  transition: .5s;
                }
                .pic1 {
                  width: 190px;
                  height: 206px;
                }
                .pic2 {
                  width: 182px;
                  height: 204px;
                }
                .pic3 {
                  width: 222px;
                  height: 200px;
                }
                &:hover .pic {
                  -webkit-animation: ab infinite linear 1.5s;
                          animation: ab infinite linear 1.5s;
                }
              }
            }
          }
          
        }
      }
      .liveVideo {
            display: flex;
            position: relative;
            justify-content: center;
            width: 100%;
            height: 270px;
            margin-top: 40px;
            background: url('/static/tccp/img/liveVideo_bg.png') 50% no-repeat;
            ul {
              display: flex;
              position: relative;
              align-items: center;
              width: 1200px;
              background: url(/static/tccp/img/circle_logo.png) no-repeat 470px;
              li {
                &:nth-child(2){
                  margin: 0 58px;
                }
                &:nth-child(3){
                  margin-left: 300px;
                }
                &:first-child{
                  margin-top: -33px;
                  margin-left: -152px;
                }
                &:last-child{
                  margin-top: -57px;
                  margin-left: 45px;
                }
                p{
                  margin: 10px 0;
                  cursor: pointer;
                }
              }
              
            }
          }
    }
    .index_layer6 {
      width: 1200px;
      height: 616px;
      margin: 0 auto;
      overflow: hidden;
      // display: none;
      padding: 40px 0;
      .icon {
        float: left;
      }
      .text {
        float: right;
        h2 {
          color: #FFD053;
          text-align: center;
          font-size: 42px;
          font-weight: 400;
        }
        p {
          line-height: 70px;
          text-align: center;
          font-size: 16px;
          color: #838383;
        }
        ul {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding: 35px 0;
          width: 430px;
          margin: 0 auto;
          li {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            width: 172px;
            padding-top: 20px;
            h3 {
              display: flex;
              justify-content: center;
              padding-bottom: 45px;
            }
            .codeBox{
              width: 172px;
              height: 188px;
              background: url(/static/tccp/img/eqCode_bg.png) no-repeat;
              color: #d060d2;
              margin-bottom: 20px;
              span{
                display: inline-block;
                width: 169px;
                text-align: center;
              }
            }
            .code_wrap {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-align: center;
              align-items: center;
              width: 130px;
              height: 130px;
              padding-right: 42px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              margin: 20px 35px 10px 20px;
              background-position: 130px;
              padding-left:5px;
              background-color: #fff;
              canvas {
                padding: 4px;
                background-color: #fff;
                margin-left: 2px;
              }
            }
            
            .text_wrap {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-direction: column;
              flex-direction: column;
              -ms-flex-align: center;
              align-items: center;
              span {
                text-align: center;
                line-height: 20px;
                color:#d060d2;
                font-size: 12px;
                width: 172px;
                word-break: break-all;
                &:last-child{
                  display: inline-block;
                  width: 170px;
                  height: 33px;
                  padding: 0 10px;
                  margin-top: 10px;
                  font-size: 14px;
                  line-height: 30px;
                  border-radius: 25px;
                  border: 1px solid #59095b;
                }
              }
              h4 {
                font-size:12px;
                text-align: center;
                line-height: 20px;
                color: #d060d2;
              }
            }

          }
        }
      }
    }
    .index_layer7 {
      width: 1200px;
      margin: 0 auto;
      height: 285px;
      padding-top: 30px;
      // padding-bottom: 55px;
      .title {
        padding:35px 0;
        h2 {
          text-align: center;
          font-size: 34px;
          color: #FFD053;
          line-height: 34px;
          padding-bottom: 10px;
        }
        p {
          text-align: center;
          color: #707574;
          font-size: 10px;
          line-height: 12px;
          // background: url(/static/tccp/img/bg6.png) 50% no-repeat;
        }
      }
      ul {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        li {
          width: 270px;
          height: 100px;
          -webkit-box-shadow: 0 0 10px rgba(0,0,0,.3);
          box-shadow: 0 0 10px rgba(0,0,0,.3);
          border-radius: 23px;
          overflow: hidden;
          -webkit-transition: .5s;
          -o-transition: .5s;
          transition: .5s;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          &:hover {
            -webkit-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
              transform: translateY(-10px);
          }
        }
      }
    }
    .index_layer8{
      width: 1200px;
      margin: 0 auto;
      height: 600px;
      display: flex;
      padding-top: 35px;
      >div{
        >p{
          &:nth-child(2){
            width: 430px;
            margin: 40px auto;
            display: flex;
            justify-content: space-between;
            span{
              display: inline-block;
            }
          }
        }
        .eQrCode{
          width: 430px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          p{
            width: 169px;
            height: 188px;
            background: url('/static/tccp/img/eqCode_bg.png') no-repeat;
            color: #d060d2;
            span{
              display: inline-block;
              border: 1px solid red;
              width: 130px;
              height: 130px;
              margin: 20px 19px 0 19px;
            }
            i{
              display: block;
              text-align: center;
              line-height: 35px;
            }
          }
        }
        .fooTitle{
          width: 430px;
          margin: 10px auto;
          display: flex;
          justify-content: space-between;
          p{
            text-align: center;
            line-height: 20px;
            color: #d060d2;
            font-size: 12px;
            &:last-child{
              width: 170px;
              height: 33px;
              padding: 0 10px;
              margin-top: 10px;
              font-size: 14px;
              line-height: 30px;
              border-radius: 25px;
              border: 1px solid #59095b;
            }
          }

        }
      }
    }
    .night {
      background: url(/static/tccp/img/index-main-bg-n.jpg) no-repeat center
        top;
      background-size: 100% 100%;
    }
  }
}
.vp-popout-box {
  /deep/ .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -328px;
    margin-top: -273px;
  }

  /deep/ .ivu-modal-close {
    z-index: 2;
    top: 6px;

    i {
      color: #fff;
    }
  }

  /deep/ .ivu-modal-header {
    width: 650px;
    height: 34px;
    margin-top: 5px;
    margin-left: 3px;
    padding: 0;
    border-radius: 10px;
    border: 1px solid #494437;
    background: #ff0000
      url(/static/tccp/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50%
      repeat-x;
    color: #ffffff;
    font-weight: bold;
    position: relative;
    top: 4px;

    .ivu-modal-header-inner {
      color: #fff;
      line-height: 34px;
      height: 34px;
      padding-left: 15px;
    }
  }

  /deep/ .ivu-modal-footer {
    border-top: 1px solid #cdd5da;

    .ivu-btn-text {
      display: none;
    }

    .ivu-btn-primary {
      background: #ff0000;
      border-color: #ff0000;
      padding: 3px 12px 3px 12px;
      border-radius: 6px;
    }
  }

  .popout-box {
    min-height: 427px;
    font-family: "Microsoft YaHei";
    font-size: 24px;
    line-height: 1.5;
    color: #383838;
  }

  // /deep/
}

@-webkit-keyframes ab {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(5px);
            transform: translateY(5px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
}
@keyframes ab {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(5px);
            transform: translateY(5px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
}
</style>
