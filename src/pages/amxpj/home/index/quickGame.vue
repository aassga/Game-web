<template>
  <div class="quickGame clearfix">
    <div class='subNav'>
      <div class="headNavList">
        <ul v-if="gameNavList.length>9" :class="['subNavWrapper',dzId == 2 ? 'hoverSlide1' : dzId == 3 ? 'hoverSlide2' : dzId == 4 ? 'hoverSlide3' : dzId == 5 ? 'hoverSlide4' : dzId == 6 ? 'hoverSlide5' : dzId == 7 ? 'hoverSlide5' :dzId == 8 ? 'hoverSlide5':'']">
          <li v-for="(item,index) in gameNavList" :key="index" @click="changeDzId(index)"
              :class="['navItem',{cur:dzId==index}]" @click.stop="goLink(index)">
              <img  class="img_bg" src="/static/amxpj/img/home/game-list-mask.png" ondragstart="return false;" alt="">
              <div :class="[item.ico,'icon_box'] "></div>
              <p :class="item.name=='大富翁棋牌'||item.name=='新世界棋牌'?'specialP':''">
                {{item.name}}<br/>
                <span>{{item.nickName}}</span>
              </p>
          </li>
        </ul>
        <ul v-else :class="['subNavWrapper',dzId == 4 ? 'hoverSlide1': dzId == gameNavList.length-1 ? 'hoverSlide1':'']">
          <li v-for="(item,index) in gameNavList" :key="index" @click="changeDzId(index)"
              :class="['navItem',{cur:dzId==index}]" @click.stop="goLink(index)">
              <img  class="img_bg" src="/static/amxpj/img/home/game-list-mask.png" ondragstart="return false;" alt="">
              <div :class="[item.ico,'icon_box'] "></div>
              <p :class="item.name=='大富翁棋牌'||item.name=='新世界棋牌'?'specialP':''">
                {{item.name}}<br/>
                <span>{{item.nickName}}</span>
              </p>
          </li>
        </ul>
      </div>
      <div class="list_user">
        <span class="slidePrev" @click="setSwiper(1)"><i></i></span>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-no-swiping">
          <swiper-slide v-for="(item,index) in showList" :key="index">
              <div class="slide_box">
                <ul class="list_ul">
                  <li v-for="(it,idx) in item.games" :key="idx" @click="$loginGame(it)">
                    <img :src="$getStaticUrl() + it.icon" :alt="index">
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
      hoverIndex:0,
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
    // 获取棋牌分类
    getDataKind(data) {
      let arr = []
      for (let i = 0; i < data.length; i++) {
        switch (data[i].gcid) {
          case 10694:
            this.gameNavList.push({
              name: '天游棋牌',
              nickName:"TY POKER",
              ico:'KY-icons2',
              link:'/home/chess?navid=9&id=10694',
            })
            break;
          case 10612:
            this.gameNavList.push({
              name: '乐游棋牌',
              nickName:"LEG POKER",
              ico:'KY-icons3',
              link:'/home/chess?navid=9&id=10612',
            })
            break;
          case 11775:
            this.gameNavList.push({
              name: 'MT棋牌',
              nickName:"MT POKER",
              ico:'mt-icons',
              link:'/home/chess?navid=9&id=10612',
            })
            break;
          case 10042:
            this.gameNavList.push({
              name: '开元棋牌',
              nickName:"KY POKER",
              ico:'KY-icons1',
              link:'/home/chess?navid=9&id=10042',
            })
            break;
          case 10041:
            this.gameNavList.push({
              name: 'VG棋牌',
              nickName:"VG POKER",
              ico:'KY-icons4',
              link:'/home/chess?navid=9&id=10694',
            })
            break;
          case 11828:
            this.gameNavList.push({
              name: '凯旋棋牌',
              nickName:"KX POKER",
              ico:'lc-icons',
              link:'/home/chess?navid=9&id=10694',
            })
            break;
          case 11759:
            this.gameNavList.push({
              name: '大富翁棋牌',
              nickName:"DFW POKER",
              ico:'dfw-icons',
              link:'/home/chess?navid=9&id=10694',
            })
            break;
          case 11857:
            this.gameNavList.push({
              name: '新世界棋牌',
              nickName:"XSJ POKER",
              ico:'xsj-icons',
              link:'/home/chess?navid=9&id=10694',
            })
            break;
          case 10732:
            this.gameNavList.push({
              name: 'FG棋牌',
              nickName:"FG POKER",
              ico:'KY-icons5',
              link:'/home/chess?navid=9&id=10732'
            })
            break;
          case 12465:
          this.gameNavList.push({
            name: '美博棋牌',
            nickName:"FG POKER",
            ico:'MB-icons5',
            link:'/home/chess?navid=9&id=12465'
          })
          break;  
        }
      }
    },
    //获取棋牌参数
    async getQipaiData() {
      setTimeout(() => {
        this.getqp();
     }, 600);
    },
    async getqp(){
        // let res = await postS(`gameSortV4`,{device:'pc',type:'style35'})//type:类型：1：棋牌；2:：捕鱼
        // if (res && res.code == 200) {
          // let gameList=res.data[1].list[1].list;
          let gameList = JSON.parse(localStorage.gameSortV4_chess)[1].list;
          let gameList2 =[];
          for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].name != '全部') {
              gameList2.push(gameList[i])
            }
          }
          if(gameList2[1].id == 18){
            this.upGo(gameList,6);
            this.upGo(gameList,5);
            this.upGo(gameList,6);
          }
          if(gameList2[1].id == 19){
            this.upGo(gameList,2);
            this.upGo(gameList,6);
            this.upGo(gameList,5);
            this.upGo(gameList,6);
          }
          this.getDataKind(gameList2)
          gameList2.forEach(val => {
            if(val.name!='全部'){
              let objectList=val.list[0];
              this.showList.push(objectList);
            }
          })
    },
    upGo(fieldData,index) {
      if(index!=0){
         fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0];
      }else{
         fieldData.push(fieldData.shift());
      }
    },
    setSwiper(num,list){
      if(num === 1){
          this.swiper.slidePrev();
          this.dzId--;
          if(this.dzId<=0){
            this.dzId=0;
            this.swiper.slideTo(0, 1000);
          }
      }else if(num === 2){
          this.swiper.slideNext();
          this.dzId++;
          if(this.dzId>=this.gameNavList.length && this.dzId !=this.gameNavList.length){
            this.dzId=list.length;
            this.swiper.slideTo(this.gameNavList.length-1, 1000);
          }
          if(this.dzId == this.gameNavList.length){
            this.dzId=0;
            this.swiper.slideTo(0);
          }
      }
    },
    goLink(index) {
      this.hoverIndex = index;
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
    // changDatas(){
    //     clearInterval(this.randomTimer);
    //     this.randomTimer = null;
    //     this.randomTimer=setInterval(()=>{
    //          this.handleData()
    //     },(1+Math.round(Math.random()*10))*1000)   
    // },
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
.hoverSlide1{
  transition: .5s linear;
  transform: translateX(-244px);
}
.hoverSlide2{
  transition: .5s linear;
  transform: translateX(-488px);
}
.hoverSlide3{
  transition: .5s linear;
  transform: translateX(-732px);
}
.hoverSlide4{
  transition: .5s linear;
  transform: translateX(-956px);
}
.hoverSlide5{
  transition: .5s linear;
  transform: translateX(-956px);
}
.hoverSlide6{
  transition: .5s linear;
  transform: translateX(-1200px);
}
// .hoverSlide7{
//   transition: .5s linear;
//   // transform: translateX(-1200px);
// }
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
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
      background: url(/static/amxpj/img/home/iconNav_bg.png) center center no-repeat;
      background-size: contain;
      .headNavList{
        overflow: hidden;
      }
      .subNavWrapper {
        display: flex;
        border: 1px solid #443776;
        width: 2160px;
        .navItem {
            width: 240px;
            height: 74px;
            position: relative;
            cursor: pointer;
            background: url(/static/amxpj/img/home/item_right.png) no-repeat;
            background-position: center right;
            background-size: 34px 62px;
            .icon_box{
              position: absolute;
              width: 76px;
              height: 46px;
              left: 36px;
              top: 14px;
              &.KY-icons1 {
                background: url(/static/amxpj/img/home/KY-icons1.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons2 {
                background: url(/static/amxpj/img/home/KY-icons2.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons3 {
                background: url(/static/amxpj/img/home/KY-icons3.png) center center no-repeat;
                background-size: contain;
              }
              &.KY-icons4 {
                background: url(/static/amxpj/img/home/KY-icons4.png) center center no-repeat;
                background-size: contain;
                height: 40px;
              }
              &.KY-icons5 {
                background: url(/static/amxpj/img/home/KY-icons5.png) center center no-repeat;
                background-size: contain;
              }
              &.ak-icons {
                background: url(/static/amxpj/img/home/ak-icons.png) center center no-repeat;
                background-size: 100% auto;
              }
              &.xsj-icons {
                background: url(/static/amxpj/img/home/xsj-icons.png) center 60% no-repeat;
                background-size: 100% auto;
                left: 29px;
              }
              &.mt-icons {
                background: url(/static/amxpj/img/home/mt-icons.png) center center no-repeat;
                background-size: 100% auto;
                
              }
              &.lc-icons {
                background: url(/static/amxpj/img/home/lc-icons.png) center center no-repeat;
                background-size: 100% auto;
              }
              &.dfw-icons {
                background: url(/static/amxpj/img/home/dfw-icons.png) center 60% no-repeat;
                background-size: 100% auto;
                left: 29px;
              }
               &.MB-icons5 {
                background: url(/static/amxpj/img/home/MB-icons5.png) center center no-repeat;
                background-size: 100% auto;
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
                color: #afa1e9;
              }
            }
            .specialP{
              left: 110px;
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
              color: #1B1533;
              span{
                color:#251c47;
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
                background: url("/static/amxpj/img/home/go_left.png") center center / 23px no-repeat;
            }
        }
        .slidePrev:hover{
            i{
                background: url("/static/amxpj/img/home/go_left2.png") center center / 23px no-repeat;
            }
        }
        .slideNext{
            right: 0;
            i{
                background: url("/static/amxpj/img/home/go_right.png") center center / 23px no-repeat;
            }
        }
        .slideNext:hover{
            i{
                background: url("/static/amxpj/img/home/go_right2.png") center center / 23px no-repeat;
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
                color: #AFA1E9;
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