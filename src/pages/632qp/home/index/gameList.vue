<template>
  <div class="quickGame clearfix">
    <div class='subNav'>
      <ul class="subNavWrapper">
          <li v-for="(item,index) in gameNavList" :key="index" @mouseover="changeDzId(index)"
              :class="['navItem',{cur:dzId==index}]" @click.stop="goLink(item.link)">
              <img  class="img_bg" src="/static/632qp/img/home/game-list-mask.png" alt="">
              <div :class="[item.ico,'icon_box'] "></div>
              <p>
                {{item.name}}<br/>
                <span>{{item.nickName}}</span>
              </p>
          </li>
      </ul>
      <div class="list_user">
        <span class="slidePrev" @click="setSwiper(1)"><i></i></span>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-no-swiping">
          <swiper-slide v-for="(item,index) in showList[0]" :key="index">
              <div class="slide_box">
                <ul class="list_ul">
                  <li v-for="(it,idx) in item.list" :key="idx" @click="$loginGame(it)">
                    <img :src="it.icon" :alt="index" ondragstart="return false;">
                    <p>{{it.name}}</p>
                  </li>
                </ul>
              </div>
          </swiper-slide>
        </swiper>
        <span class="slideNext" @click="setSwiper(2)"><i></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
    return {
      time: 600,
      timer: 0,
      borderColor: '#a95058',
      countDown:'01:12',
      canvas:null,
      randomData:[],
      colors: { blue: '#8498ff', red: '#ff6565',green:'#2ca752'},
      rows:6,
      randomplayers:{
          bankerNums:'',
          playerNums:'',
          tieNums:'',
          vid:'',
          roundCount:''
      },
      tableplaysers:{
          money:'',
          peopleNum:'',
          vid:'',
      },
      randomTimer:null,
      gamblingList:[],
      datas:{
         initdata:[],
         lastdata:[],
      },
      table:[],
      randomtable:[],
      gameNavList: [
        {
          name: '乐游棋牌',
          nickName:"LEG POKER",
          ico:'KY-icons3',
          link:'/home/chess?navid=9&id=10612',
        },
        {
          name: '开元棋牌',
          nickName:"KY POKER",
          ico:'KY-icons1',
          link:'/home/chess?navid=9&id=10042',
        },
        {
          name: '天游棋牌',
          nickName:"TH POKER",
          ico:'KY-icons2',
          link:'/home/chess?navid=9&id=10694',
        },
        {
          name: 'VG棋牌',
          nickName:"VG POKER",
          ico:'KY-icons4',
          link:'/home/chess?navid=9&id=10041'
        },
        {
          name: 'FG棋牌',
          nickName:"FG POKER",
          ico:'KY-icons5',
          link:'/home/chess?navid=9&id=10732'
        }
      ],
      dzId: 0,
      xlid: 0,
      swiperOption: {
        // autoplay: {
        //     delay: 300000,
        // },
        loop: true,
        slidesPerView: 1,
      },
      showList:[],
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  methods: {
    //获取棋牌参数
    async getQipaiData() {
      let res = await postS(`ChessFishSort`,{device:'pc',type:1})//type:类型：1：棋牌；2:：捕鱼
      if (res && res.code == 200) {
        let gameList=res.data.list.platform;
        if(gameList[1].id !== 10612){
          this.upGo(gameList,2);
        }
        
        let arr = [];
        gameList.forEach(val => {
          if(val.name!='全部'){
            let objectList=val.list[Object.keys(val.list)[0]];
            arr.push(objectList.list[Object.keys(objectList.list)[0]]);
          }
        })
        this.showList.push(arr);
      }
    },
    upGo(fieldData,index) {
      if(index!=0){
         fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0];
      }else{
         fieldData.push(fieldData.shift());
      }
    },
    
    setSwiper(num){
      if(num === 1){
          this.swiper.slidePrev();
          this.dzId--;
          if(this.dzId<=0){
            this.dzId=0;
          }
      }else if(num === 2){
          this.swiper.slideNext();
          this.dzId++;
          if(this.dzId>=4){
            this.dzId=4;
          }
      }
    },
    goLink(link) {
      if(link === '#/plays/hall') window.open(link)
      this.$router.push(link)
    },
    timeStart() {
      let Countdown = 72;
      this.timer = setInterval(() => {
        Countdown--;
        if (Countdown >= 0) {
          let mm = Math.floor(Countdown / 60) < 10 ? "0" + Math.floor(Countdown / 60) : Math.floor(Countdown / 60);
					let ss = Number(Countdown % 60) < 10 ? "0" + Number(Countdown % 60) : Number(Countdown % 60) ;
					this.countDown = mm + ":" + ss
        } else {
          clearInterval(this.timer);
          this.timeStart();
        }
      }, 1000);
    },
    // 改变dzId
    changeDzId(index) {
      this.dzId = index;
      this.xlid = index;
      this.swiper.slideTo(index, 1000);
    },
  },
  computed:{
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  created() {
    this.timeStart(this.time);
    this.getQipaiData();

  },
  mounted(){
  },
  destroyed(){
  },

};
</script>

<style lang="less" scoped>
.keyFrames(@name,@value,@value1){
  @keyframes @name {
    0%{
    left:@value;opacity: 0;
    }
    50%{
    left:@value;opacity:0;
    }
    100%{
    left:@value1;opacity:1;
    }
  }
}
.animationName(@name,@time){
  animation-delay:2s;
  animation: @name 0.5s @time 1;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode:forwards;
}

.keyFrames2(@name,@value,@value1){
     @keyframes @name {
       0%{
        right:@value;opacity: 0;
       }
       50%{
        right:@value;opacity:0;
       }
       100%{
        right:@value1;opacity:1;
       }
    }
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
.whiteLine{
  height: 1px;
  width: 95%;
  margin-top: 5px;
  background: #fff;
}
.clearfix:after {
  clear: both;
}

.yellow {
  color: #ffd656;
}
.blue {
  color: #18f1ff;
}
.green {
  color: #42ff34;
}

.quickGame {
  max-width: 1200px;
  margin: 20px auto 0;
  font-family: Microsoft YaHei !important;
    .subNav {
      width: auto;
      position: relative;
      width: 1200px;
      height:402px;
      background: url(/static/632qp/img/home/game-list-bg.png) center center no-repeat;
      background-size: contain;
      background: #40a8e4;
      .subNavWrapper {
        display: flex;
        padding-bottom: 3px;
        border-bottom: 1px solid #71c9ff;
        &:first-child div{
            width: 70px!important;
            left: 44px!important;
        }
        .navItem {
            width: 240px;
            height: 74px;
            position: relative;
            cursor: pointer;
            background: url(/static/632qp/img/home/game-list-header.png) no-repeat;
            background-position: center right;
            background-size: 34px 62px;
            .icon_box{
              position: absolute;
              width: 76px;
              height: 46px;
              left: 36px;
              top: 14px;
              &.KY-icons1 {
                background: url(/static/632qp/img/home/KY-icons1.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons2 {
                background: url(/static/632qp/img/home/KY-icons2.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons3 {
                background: url(/static/632qp/img/home/KY-icons3.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons4 {
                background: url(/static/632qp/img/home/KY-icons4.png) center center no-repeat;
                background-size: contain;
                height: 40px;
              }
              &.KY-icons5 {
                background: url(/static/632qp/img/home/KY-icons5.png) center center no-repeat;
                background-size: contain;
              }
            }
            p{
              position: absolute;
              left: 119px;
              top: 20px;
              font-size: 20px;
              font-weight: 400;
              line-height: 20px;
              font-weight:400;
              color: #fff;
              text-align: center;
              span{
                font-size: 12px;
                color: #fff;
              }
            }
            .img_bg{
              width: 244px;
              height: 74px;
              opacity: 0;
              position: absolute;
              left: 0;
              top: 0;
            }
          }
          .navItem:last-child{
            background:transparent;
          }
          .cc {
              width: 222px;
          }
          .cur {
            cursor: pointer;
            p{
              color: #40a8e4;
              span{
                color:#40a8e4;
              }
            }
            .img_bg{
              opacity: 1;
            }
          }
      }
      .list_user{
        position: relative;
        width: 1200px;
        height: 326px;
        &>span{
            position: absolute;
            top: 0;
            display: flex;
            width: 52px;
            height: 100%;
            justify-content: center;
            align-items: center;
            background: transparent;
            cursor:pointer;
            outline: none;
            z-index: 99;
            i{
                display: block;
                width: 23px;
                height: 38px;
            }
        }
        .slidePrev{
            left: 0;
            i{
                background: url("/static/632qp/img/home/go_left.png") center center / 23px no-repeat;
            }
        }
        .slidePrev:hover{
            i{
                background: url("/static/632qp/img/home/go_left2.png") center center / 23px no-repeat;
            }
        }
        .slideNext{
            right: 0;
            i{
                background: url("/static/632qp/img/home/go_right.png") center center / 23px no-repeat;
            }
        }
        .slideNext:hover{
            i{
                background: url("/static/632qp/img/home/go_right2.png") center center / 23px no-repeat;
            }
        }
        .slide_box{
          width: 1200px;
          height: 326px;
          padding: 34px 52px 0 52px;
          .list_ul{
            width: 1096px;
            height: 276px;
            overflow: hidden;
            li{
              width: 100px;
              height: 138px;
              margin-right: 42px;
              text-align: center;
              float: left;
              cursor: pointer;
              img{
                width: 100px;
                height: 106px;
              }
              p{
                font-size: 16px;
                line-height: 18px;
                height: 24px;
                overflow: hidden;
                color: #fff;
                padding-top: 4px;
              }
            }
            li:nth-child(8n){
              margin-right: 0;
            }
          }
        }
      }
  }
}
</style>
