<template>
  <div class="new-index test-7-home">
    <!-- 新轮播图接口写法 -->
    <div class="carouse" :class="{'bounceOut':$route.path=='/home'}">
      <Carousel :dots='"none"' autoplay loop :style="{height: bannerH+'px',overflow:'hidden',background:'#1b1533'}">
        <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
          <img :src="item.img" :style="{height: bannerH+'px'}"/>
        </Carousel-item>
      </Carousel>
      <div class="newgong">
        <div class="newgong-content" @click="showTextModal">
          <div class="notice">
            <img src="/static/mgm/img/home/notice-icon.png" class="notice-icon" alt />
            <span>最新公告 :</span>
          </div>
          <div class="demolist list">
            <marquee
              v-if="lantern"
              align="middle"
              direction="left"
              loop="-1"
              scrollamount="3"
              onmouseout="this.start()"
              onmouseover="this.stop()"
              style="color: white; font-size: 13px; line-height: 36px;overflow: hidden;height: 36px;"
            >
              <span v-html="lantern"></span>
            </marquee>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <quick-game></quick-game>
      <win-list></win-list>
      <game-list></game-list>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import store from "@/vuex/store";
import "@/assets/iconfont/klk/iconfont.css";
import quickGame from "./index/quickGame";
import winList from "./index/winList";
import gameList from "./index/gameList";
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';

export default {
  data() {
    return {
      lantern: "",
      // 轮播设置
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "none",
        trigger: "click",
        arrow: "hover",
        arrow2: "never"
      },
      carouselData: [],
      clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      bannerH:450
    };
  },
  methods: {
    // 新文字走马灯接口
    async getLantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        // desc_client_type: 'html'
        client_type: "PC"
      });
      if (res && res.code == 200) {
        if (res.data.data.length) {
          this.lantern = res.data.data[0] && res.data.data[0].description;
        } else {
          return false;
        }
      }
    },
    async getLanternList() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: "lantern",
                client_type: "PC",
                limit:1000,
                page:1
            });
            if (res && res.code == 200) {
                this.lanternData = res.data;
                if(res.data.total>0){
                    sessionStorage.setItem('lanterndata', JSON.stringify( this.lanternData));
                }
            }else{
                return false
            }
    },
    showTextModal(){
            if(this.lanternData.total>0){
                this.$store.commit('alert/showTextTip', true)
            }else{
                return false
            }  
    },
    //获取banner
    async getBanner() {
      // this.carouselData = [
      //   {
      //     img: "/static/mgm/img/banner/banner1_1.jpg"
      //   },
      //   {
      //     img: "/static/mgm/img/banner/banner2.jpg"
      //   },
      //   {
      //     img: "/static/mgm/img/banner/banner3.jpg"
      //   },
      //   {
      //     img: "/static/mgm/img/banner/banner4.jpg"
      //   },
      //   {
      //     img: "/static/mgm/img/banner/banner5.jpg"
      //   },
      //   {
      //     img: "/static/mgm/img/banner/banner6.jpg"
      //   }
      // ];
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },
    //获取棋牌参数
    async getQipaiData() {
      let res = await postS(`ChessFishSort`,{device:'pc',type:1})//type:类型：1：棋牌；2:：捕鱼
      if (res && res.code == 200) {
          sessionStorage.setItem('chessgame', JSON.stringify(res.data));
      }
    },
    //获取电子游艺参数
    async getGameData() {
      let res = await postS(`gameSortSlot`,{device:'pc'})
      if (res && res.code === 200) {
        sessionStorage.setItem('allgames', JSON.stringify(res.data));
      }
    },
  },
  created() {
    this.getBanner();
    // this.getQipaiData();
    // this.getGameData();
    if (this.clientwidth > 1920) {
      this.bannerH = this.bannerH * (this.clientwidth / 1920);
    }
    setTimeout(() => {
      if(localStorage.register){
        this.$store.commit('alert/showMgmRegister', true);
        localStorage.removeItem('register')
      }
    }, 2000);
    
  },
  mounted() {
    clearInterval(this.setInter);
    this.getLantern();
    this.getLanternList()
  },
  components: {
    quickGame,
    winList,
    gameList
  },
  store
};
</script>

<style lang="less" scoped>
@keyframes bounceOut {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        transform: scale3d(0.7, 0.7, 0.7);
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
        transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
        opacity: 1;
        transform: scaleX(1);
    }
}
.alert-img {
  /deep/ .ivu-modal-content {
    background-color: transparent;
    // background:none;
  }
}
.new-index {
  position: relative;
  min-width: 1200px;
  margin: 0 auto;
  font-size: 0;
  background-color:#15112A;
  .newgong {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: #140405;
    background: rgba(0, 0, 0, 0.75);
    z-index: 12;

    .newgong-content {
      width: 1200px;
      height: 36px;
      margin: 0 auto;

      .notice {
        float: left;
        position: relative;
        top: 2px;
        left: 25px;
        margin-right: 36px;
        color: #ffd587;
        width: 94px;
        .notice-icon {
          position: absolute;
          top: 9px;
          width: 18px;
          height: 18px;
        }
        span {
          font-size: 14px;
          vertical-align: super;
          margin-left: 27px;
        }
      }

      .demolist {
        display: inline-block;
        width: 990px;
      }
      /deep/.el-carousel {
        overflow: visible;
      }
    }
  }

  .carouse {
    text-align: center;
    // min-width: 1920px;
    width: 100%;
    // max-width: 1920px;
    margin: 0 auto;
    overflow: hidden;
    border-bottom: 1px solid #3E3363;
    background-color: #15112A;
    &.bounceOut {
      position: relative;
      animation: bounceOut 0.3s ease;
      animation-delay: 0.5s;
      animation-iteration-count: 1;
    }
    img {
      width: 100%;
      height: 100%;
    }
    /deep/.el-carousel {
      overflow-x: unset;
    }

    /deep/ .el-carousel__indicators {
      bottom: 5px;
    }

    /deep/ .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }

  .content {
    overflow: hidden;
    background: url("/static/mgm/img/home/content-bg.png") no-repeat;
    background-size: cover;
    // padding-bottom: 20px;

    background:#1b1533;
  }
}
</style>