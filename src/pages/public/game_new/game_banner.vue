<template>
  <div>
    <div :class="`list_user_${themes.clientWidth}`">
        <span class="slidePrev" :style="themes.allbgStyle" @click="setSwiper(2)" @mouseover="changeSrc1" @mouseout="changeSrc2"><i :style="{background:'url('+leftImageSrc+') center center / 17px no-repeat'}"></i></span>
        <swiper :options="swiperOption" v-if="list_arr.length > 1" ref="mySwiper">
            <swiper-slide v-for="(item,index) in list_arr" :key="index">
                <div class="slide_list" :style="themes.allbgStyle" :class="themes.name == '99qp'? 'a99qp':themes.name == '935qp' ? 'a935qp' : themes.name == '500wcp' ? 'a500wcp' : themes.name == '500w' ? 'a500w' : themes.name == '478qp' ? 'y478qp': themes.name" @click="$loginGame(item,themes.name)">
                    <img :src="localUrl+item.src" :alt="index">
                    <div>
                        <span>{{item.name}}</span>
                        <p>
                            <small>投注:<b>{{item.shu}}</b></small>
                            <!-- <small>盈利:<b>{{item.price}}</b></small>  -->
                        </p>
                        <p> <small>盈利:<b>{{item.price}}</b></small> </p>
                        <h2>{{item.game}}</h2>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <span :style="themes.allbgStyle" class="slideNext" @click="setSwiper(1)" @mouseover="changeSrc3" @mouseout="changeSrc4"><i :style="{background:'url('+rightImageSrc+') center center / 17px no-repeat'}"></i></span>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper"
// import mixin from "../games/public.js";
export default {
    // mixins: [mixin],
    props:{
        themes: {
            type: Object
        },
    },
    data () {
        return {
          localUrl:"",
          list_arr: [
              {
                  id: 11738,
                  shu: 56900,
                  price: 328996,
                  name: "th*****321",
                  game: "财神捕鱼",
                  src: "images/default/pc/11738.png"
              },
              {
                  id: 10369,
                  shu: 102000,
                  price: 489633,
                  name: "65****22y",
                  game: "幸运双星",
                  src: "images/default/pc/1834.png"
              },
              {
                  id: 11197,
                  shu: 129650,
                  price: 809663,
                  name: "su****155",
                  game: "冰球突破",
                  src: "images/default/pc/11197.png"
              },
              {
                  id: 11216,
                  shu: 208966,
                  price: 569831,
                  name: "nn****35m",
                  game: "不朽情缘",
                  src: "images/default/pc/11216.png"
              },
              {
                  id: 11341,
                  shu: 97562,
                  price: 380965,
                  name: "wh******566",
                  game: "后羿射日",
                  src: "images/default/pc/11341.png",
              },
              {
                  id: 11184,
                  shu: 209517,
                  price: 1008965,
                  name: "lh*****556",
                  game: "捕鱼王3D",
                  src: "images/default/pc/11184.png"
              },
              {
                  id: 10075,
                  shu: 68982,
                  price: 276960,
                  name: "xx****895",
                  game: "动物狂欢",
                  src: "images/default/pc/10075.png"
              },
              {
                  id: 11739,
                  shu: 75696,
                  price:592233,
                  name: "qi*****066",
                  game: "五龙捕鱼",
                  src: "images/default/pc/11739.png"
              },
              {
                  id: 2669,
                  shu: 896663,
                  price: 5609643,
                  name: "56*****2yy",
                  game: "五福临门",
                  src: "images/default/pc/2669.png"
              },
              {
                  id: 300,
                  shu: 14563,
                  price: 235458,
                  name: "wq****w14",
                  game: "西洋棋老虎机",
                  src: "images/default/pc/300.gif"
              },
              {
                  id: 11359,
                  shu: 50741,
                  price: 371526,
                  name: "t1****846",
                  game: "赏金船长",
                  src: "images/default/pc/11359.png"
              },
              {
                  id: 10348,
                  shu: 709866,
                  price: 3560524,
                  name: "62*****7951",
                  game: "淑女派对",
                  src: "images/default/pc/1836.png"
              },
              {
                  id: 2643,
                  shu: 89063,
                  price: 403695,
                  name: "wo*****jin",
                  game: "世界杯球場",
                  src: "images/default/pc/2643.png"
              },
              {
                  id: 198,
                  shu: 693302,
                  price: 5231842,
                  name: "66******li8",
                  game: "麻雀无双",
                  src: "images/default/pc/198.png"
              },
              {
                  id: 11365,
                  shu: 309515,
                  price: 1069856,
                  name: "sy******436",
                  game: "麻将胡了",
                  src: "images/default/pc/11365.png"
              }
          ],
          swiperOption: {
              autoplay: true,
              observer: true,
              observeParents: true,
              autoplay: {
              delay: 3000,
              disableOnInteraction: false
              },
              loop: true,
              slidesPerView: 4
          },
          leftImageSrc:
          "/static/" + this.themes.name + "/img/new_games/next_l.png",
          rightImageSrc:
          "/static/" + this.themes.name + "/img/new_games/next_r.png",
          jackpotNum1: 41126438914,
          jackpotNum2: 90166438211,
          jackpotNum3: 81522438312,
          setInter: null,
        }
    },
    methods: {
        getLocalUrl(){
          this.localUrl = JSON.parse(localStorage.config).statics;
        },
        jackpotNumAdd() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                this.jackpotNum1 = this.jackpotNum1 + Math.floor(Math.random() * 10000);
                this.jackpotNum2 = this.jackpotNum2 + Math.floor(Math.random() * 10000);
                this.jackpotNum3 = this.jackpotNum3 + Math.floor(Math.random() * 10000);
            }, 3000);
        },
        setSwiper(num) {
            if (num === 1) {
                this.swiper.slideNext();
            } else {
                this.swiper.slidePrev();
            }
        },
        changeSrc1(){
            this.leftImageSrc='/static/'+this.themes.name+'/img/new_games/next_l_a.png'
          },
        changeSrc2(){
            this.leftImageSrc='/static/'+this.themes.name+'/img/new_games/next_l.png'
          },
        changeSrc3(){
            this.rightImageSrc='/static/'+this.themes.name+'/img/new_games/next_r_a.png'
          },
        changeSrc4(){
            this.rightImageSrc='/static/'+this.themes.name+'/img/new_games/next_r.png'
          },
    },
    components: {
        swiper,
        swiperSlide,
    },
    created: function() {
        this.jackpotNumAdd();
        this.getLocalUrl();
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    beforeDestroy() {
        clearInterval(this.setInter);
    }
}
</script>

<style lang="less" scoped>
    .list_user_1200 {
      position: relative;
      width: 1200px;
      height: 150px;
      margin: 0 auto;
      padding: 0 38px;
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
        // background:#383838;
        // i {
        //   background: url("/static/jsyl/img/new_games/next_l.png") center center /
        //     17px no-repeat;
        // }
      }
      .slidePrev:hover {
        // i {
        //   background: url("/static/jsyl/img/new_games/next_l_a.png") center
        //     center / 17px no-repeat;
        // }
      }
      .slideNext {
        // background:#383838;
        right: 0;
        // i {
        //   background: url("/static/jsyl/img/new_games/next_r.png") center center /
        //     17px no-repeat;
        // }
      }
      .slideNext:hover {
        // i {
        //   background: url("/static/jsyl/img/new_games/next_r_a.png") center
        //     center / 17px no-repeat;
        // }
      }
      .slide_list {
        width: 265px;
        margin: 0 8px;
        // background: #383838;
        padding: 23px 16px;
        display: flex;
        cursor: pointer;
        img {
          width: 104px;
          height: 104px;
          border-radius: 4px;
          margin-right: 10px;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 70%;
          span {
            font-size: 14px;
            color: #fff;
          }
          p {
            width: 100%;
            font-size: 14px;
            // display: flex;
            // flex-wrap: nowrap;
            // justify-content: space-between;
            text-align: center;
            small {
              color: #fff;
              b {
                font-size: 14px;
                color: #ff5f00;
                display: inline-block;
                padding-left: 4px;
              }
            }
          }
          h2 {
            font-size: 18px;
            color: #fff;
          }
        }
      }
      .qygj.slide_list.qygj,.a99qp.slide_list.a99qp,.slide_list.vnso,.slide_list.amhg,.slide_list.y478qp,.slide_list.klk,.slide_list.vnso-preview,.slide_list.test-1,.slide_list.tczj,.slide_list.ybcp,.slide_list.amvns,.slide_list.a935qp,.slide_list.t111,.slide_list.cjw,.slide_list.cpzj,.slide_list.qmcp,.slide_list.dalao,.slide_list.a500wcp,.slide_list.szc,.slide_list.fczx,.slide_list.jhcp,.slide_list.a500w,.slide_list.ecp,.slide_list.wycp,.slide_list.hsyl{
        span {
            font-size: 14px;
            color: #000;
          }
        small{
          color: #000;
        }
        h2 {
            font-size: 18px;
            color: #000;
          }
      }
      .slide_list.amjs,
      .slide_list.fhcp,
      .slide_list.xpj83,
      .slide_list.dqr,
      .slide_list.hty{
        span {
            font-size: 14px;
            color: #fff;
          }
        small{
          color: #fff;
        }
        h2 {
            font-size: 18px;
            color: #fff;
          }
      }
      .slide_list.jltx{
        span {
            font-size: 14px;
            color: #fff;
          }
        small{
          color: #fff;
        }
        h2 {
            font-size: 18px;
            color: #fff;
          }
      }
    }
    .list_user_1000 {
      position: relative;
      width: 1000px;
      height: 150px;
      margin: 0 auto;
      padding: 0 38px;
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
        // background: #fff;
        // i {
        //   background: url("/static/jltx/img/new_games/next_l.png") center center /
        //     17px no-repeat;
        // }
      }
      .slidePrev:hover {
        // i {
        //   background: url("/static/jltx/img/new_games/next_l_a.png") center
        //     center / 17px no-repeat;
        // }
      }
      .slideNext {
        // background: #fff;
        right: 0;
        // i {
        //   background: url("/static/jltx/img/new_games/next_r.png") center center /
        //     17px no-repeat;
        // }
      }
      .slideNext:hover {
        // i {
        //   background: url("/static/jltx/img/new_games/next_r_a.png") center
        //     center / 17px no-repeat;
        // }
      }
      .slide_list {
        width: 219px;
        height: 149px;
        margin: 0 8px;
        // background: #fff;
        padding: 23px 5px;
        display: flex;
        cursor: pointer;
        img {
          width: 94px;
          height: 94px;
          border-radius: 4px;
          margin-right: 3px;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 70%;
          span {
            font-size: 14px;
            color: #fff;
          }
          p {
            width: 100%;
            font-size: 14px;
            // display: flex;
            // align-items: center;
            // flex-wrap: nowrap;
            // justify-content: space-between;
            text-align: center;
            small {
              color: #fff;
              b {
                font-size: 14px;
                color: #ff5f00;
                display: inline-block;
                padding-left: 4px;
              }
            }
          }
          h2 {
            font-size: 18px;
            color: #fff;
          }
        }
      }
      .slide_list.jltx{
        span {
            font-size: 14px;
            color: #000;
          }
        small{
          color: #000;
        }
        h2 {
            font-size: 18px;
            color: #000;
          }
      }
      // .slide_list.jltx-new{
      //   span {
      //       font-size: 14px;
      //       color: #fff;
      //     }
      //   small{
      //     color: #fff;
      //   }
      //   h2 {
      //       font-size: 18px;
      //       color: #fff;
      //     }
      // }
    }
</style>>