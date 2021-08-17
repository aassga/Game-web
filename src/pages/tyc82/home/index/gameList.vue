<template>
  <div class="game-list slideTop">
    <div class="header-list flipInX">
      <div v-for="(item,i) in headerItem" :class="activeFlag == item.introduce ? activeSlide :''" :key="i" @click="changeBottom(item,i)" >
        <div class="imgBtn">
          <img v-if="activeFlag == item.introduce" :src="'/static/tyc82/img/'+ item.introduce +'.png'" />
          <img v-else :src="'/static/tyc82/img/'+ item.className +'.png'" />
        </div>
        <div class="line_border">
          <div class="item-area pull-left" :class="item.introduce">
            <div class="noticeFont">{{item.detailed}}</div>
          </div>
          <div class="device">
            <ul>
              <li v-for="(v,j) in item.icons" :class="item.className" :key="j" @click="joinGame(v,item.className)">
                <span>
                  <img v-if="item.className == 'win_fish'" :class="[v.icon,item.className+'_1']" :src="'/static/tyc82/img/home/'+v.icon+'.png'" />
                  <img v-else-if="v.id == 10022" style="width:50px!important;margin-top:-10px" :src="'/static/tyc82/img/home/'+v.icon+'.png'" />
                  <img v-else-if="v.id == 10020" style="width:57px!important;margin-top:-20px" :src="'/static/tyc82/img/home/'+v.icon+'.png'" />
                  <img v-else :class="[v.icon,item.className+'_1']" :src="'/static/tyc82/img/home/'+v.icon+'.png'" />
                </span>
                <span :class="item.className+'_name'">{{v.name}}</span>
                <div :ref="item.className+'_el'"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeFlag: 'POKER',
      activeSlide:"activeSlide",
      headerItem: [
        {
          name: "棋牌游戏",
          introduce: "POKER",
          className:"win_chess",
          detailed:"汇聚全球顶级竞技棋牌中心，炸金花，斗地主，百家乐，万人在线，火热pk！天天送豪礼！",
          bImg: "/static/tyc82/img/home/poker_photo.jpg",
          icons: [
            { name: "抢庄牛牛", icon: "111" ,id:'245',link:'/home/chess?navid=9&id=10041'},
            { name: "三公", icon: "10728" ,id:'10728',link:'/home/chess?navid=9&id=10732'},
            { name: "炸金花", icon: "246" ,id:'246',link:'/home/chess?navid=9&id=10694'},
            { name: "21点", icon: "251" ,id:'251',link:'/home/chess?navid=9&id=10732'},
            { name: "二人麻将", icon: "10687" ,id:'10687',link:'/home/chess?navid=9&id=10612'},
            { name: "二八杠", icon: "248",id:'248',link:'/home/chess?navid=9&id=10042'},
          ]
        },
        {
          name: "彩票游戏",
          introduce: "LOTTERY",
          className:"win_lottery",
          detailed:
            "提供快速时时彩，快速赛车，等各地彩票在线投注，保证公平公开让你快乐游戏",
          bImg: "/static/tyc82/img/home/lottery_photo.jpg",
          icons: [
            { name: "快速赛车", icon: "CP-icons3" ,link:'#/plays/tradition/12'},
            { name: "快速时时彩", icon: "CP-icons1",link:'#/plays/tradition/16'},
            { name: "幸运赛车", icon: "CP-icons4" ,link:'#/plays/tradition/3630'},
            { name: "快速快3", icon: "CP-icons6" ,link:'#/plays/tradition/27'},
            { name: "快乐赛车", icon: "CP-icons7" ,link:'#/plays/tradition/13'},
            { name: "快速六合彩", icon: "CP-icons5" ,link:'#/plays/tradition/18'},
            
          ]
        },
        {
          name: "电子游戏",
          introduce: "SLOT",
          className:"win_slot",
          detailed:
            "全球知名游戏，最佳老虎机投注平台，上万款游戏，高额奖池无限喷发！",
          bImg: "/static/tyc82/img/home/slot_photo.jpg",
          icons: []
        },
        {
          name: "捕鱼游戏",
          introduce: "GISH",
          className:"win_fish",
          detailed:
            "提供各类捕鱼平台，奖金高达1000倍，大炮一响黄金万两，等你来袭！",
          bImg: "/static/tyc82/img/home/fish_photo.jpg",
          icons: [
            // { name: "JDB捕鱼", icon: "BY-icons3" ,link:'home/fish?navid=9&id=10054'},
            // { name: "JDB五龙捕鱼", icon: "BY-icons3" ,link:'home/fish?navid=9&id=10054'},
            // { name: "AG捕鱼", icon: "BY-icons1",link:'home/fish?navid=9&id=10055'},
            // { name: "BG捕鱼", icon: "BY-icons6",link:'home/fish?navid=9&id=10058'},
            // { name: "CQ9黄金渔场", icon: "BY-icons5",link:'home/fish?navid=9&id=10057'},
            // { name: "MW捕鱼", icon: "BY-icons2" ,link:'home/fish?navid=9&id=10053'},
          ]
        },
        {
          name: "体育赛事",
          introduce: "STORTS",
          className:"win_sports",
          detailed:
            "汇聚全球顶级经典赛事，欧洲杯，世界杯，篮球，网球，排球，F!赛车等各赛事！",
          bImg: "/static/tyc82/img/home/sport_photo.jpg",
          icons: [
            // { name: "沙巴体育", icon: "TY-icons1",link:'/home/tiyu?id=38' },
            // { name: "IM体育", icon: "TY-icons5",link:'/home/tiyu?id=11368'},
            // { name: "皇冠体育", icon: "huangguan",link:'/home/tiyu?id=39'},
            // { name: "更多游戏", icon: "more-icon" ,link:'/home/tiyu?id=0'}
          ]
        },
        {
          name: "",
          introduce: "PHONE",
          className:"win_phone",
          detailed:
            "随心所欲，随时随地，畅享手机乐趣，最新优惠，精彩不容错过",
          bImg: "/static/tyc82/img/home/mobile_photo.jpg",
          icons: [
            { name: "", icon: "ios",link:'' },
            { name: "", icon: "android",link:''},
          ]
        }
      ],
      
      bottomData: {}
    };
  },
  methods: {
    changeBottom(item, i) {
      this.activeFlag = item.introduce;
    },
    joinGame(v,name){
      if(name == 'win_chess'){
        this.$loginGame(v)
      }else if (name == 'win_lottery'){
        if(!localStorage.token || !localStorage.userinfo){
          this.$errorAlert('请先登录', 'warn')
          return false
        }else{
          window.open(v.link)
        }
        
      }else{
        this.$router.push(v.link)
      }
    },
    getSlideData(){
      // 电子
      if (localStorage.gameSortV4_slot){
        let a = JSON.parse(localStorage.gameSortV4_slot)[1].list;
        let b = a.slice(1,7);
        for (let i = 0; i < b.length; i++) {
          b[i].icon = 'DZ-icons'+b[i].gcid;
          b[i].link = '/home/slot?navid=9&id='+b[i].gcid;
        }
        this.headerItem[2].icons = b; 
      }
      // 体育
      if (localStorage.gameSortV4_sport){
          let a = JSON.parse(localStorage.gameSortV4_sport).games;
          for (let i = 0; i < a.length; i++) {
            a[i].icon = 'ty_'+a[i].id;
            a[i].link = '/home/tiyu?id='+a[i].id;
            a[i].id = a[i].id;
          }
          this.headerItem[4].icons = a; 
          console.log(this.headerItem[4].icons );
          
          if(a.length == 3 || a.length == 5){
            let more = { name: "敬请期待", icon: "moreGame" ,link:''};
            this.headerItem[4].icons.push(more);
          }
      }
      // 捕鱼
      if (localStorage.gameSortV4_fish){
          let lists = JSON.parse(localStorage.gameSortV4_fish)[1].list;
          let b = lists.slice(1,7);
          for (let i = 0; i < b.length; i++) {
            b[i].icon = 'BY-icons'+b[i].gcid;
            b[i].link = '/home/fish?navid=9&id='+b[i].gcid;
          }
            
          this.headerItem[3].icons = b;
      }
    }
  },
  mounted () {
    var qrcode = this.$refs['win_phone_el'];
    this.createDownloadQRCode({
      el: qrcode[0],
      url: window.location.origin + '/m#/download',
      size: 120
    })
    this.createDownloadQRCode({
      el: qrcode[1],
      url: window.location.origin + '/m#/download',
      size: 120
    })
    
  },
  created() {
    this.getSlideData();
    this.changeBottom(this.headerItem[0], this.activeFlag);
  }
};
</script>

<style lang="less" scoped>
.huangguan{
    margin-top: 15px;
    width: 81px!important;
}
.win_phone{
  height: 143px!important;
  width: 200px!important;
  padding: 10px 3px 13px 0px!important;
  span{
    img{
      width: 178px!important;
      margin-left: 8px;
    }
  }
  div{
    background: #000;
    margin-top: -40px;
    margin-left: 21px;
  }
}
.win_chess{
  padding: 7px 0px 10px 0px!important;
  span{
    line-height: 120px;
    img{
      width: 65px!important;
    }
    &:hover{
      img{
        transform:rotate(360deg);
        transition:transform .3s linear;
      }
    }
    .qp_10612{
      width: 60px!important;
    }
  }
}
.win_chess_name{
  line-height: 64px!important;
  height: 32px!important;
}
.moreGame{
  width: 85px!important;
}
.win_sports{
  &:hover{
     img{
      transform:rotate(360deg);
      transition:transform .4s linear;
    } 
  }
  
}
.win_sports:last-child{
  &:hover{
     img{
      transform:rotate(0deg);
      transition:transform 0s linear;
    } 
  }
}
.ty_39,.ty_11752,.ty_11754,.ty_11756{
  width: 85px!important;
  // margin-top: -10px;
}
.ty_38,.ty_11368 {
  width: 73px!important;
}
.win_lottery{
  padding: 15px 0px 13px 0px!important;
  img{
    width: 60px!important;
  }
  &:hover{
    img{
      transition:transform .4s linear;
      transform:rotate(360deg);
    }
  }
  
}
.win_lottery_name{
  line-height: 57px!important;
  height: 19px!important;
  
}

.KY-icons3{
  width: 65px!important;
}

.win_fish{
  padding: 9px 0px 0px 0px!important;
  img{
    width: 65px!important;
  }
  &:hover{
    img{
      transition:transform .4s linear;
      transform:rotate(360deg);
    }
  }
}
.win_fish_name{
  margin-top: 25px;
}

.win_slot{
  margin-top: 5px;
  img{
    width: 70px;
  }
  &:hover{
    img{
      transform:rotate(360deg);
      transition:transform .4s linear;
    }
  }
}

.DZ-icons10022{
  width: 50px!important;
  margin-top: -17px;
}
.DZ-icons10023{
  margin-top: -27px;
}

.DZ-icons10015{
  margin-top: -10px;
}
.DZ-icons11320,.DZ-icons10016{
  margin-top: -21px;
}
.DZ-icons10020{
  margin-top: -20px;
  width: 57px!important;
}
.DZ-icons10019{
  margin-top: -31px;
  width: 75px!important;
}
.DZ-icons6{
  width: 70px!important;
  margin-top: -22px;
}
.BY-icons10054{
  margin-top: 27px;
}
.BY-icons10055,.BY-icons10057{
  margin-top: 20px;
}
.BY-icons3{
  width: 70px!important;
}
.BY-icons5{
  width: 62px!important;
      margin-top: 8px;
}
.pull-right {
  float: right !important;
}
.line_border{
  display:flex;
  background: url('/static/tyc82/img/home/bg05.png') no-repeat;
  width: 770px;
  height: 300px;
  margin-left: 3px;
  z-index: 1;
}

.game-list {
  position: relative;
  width: 1200px;
  height: 300px;
  margin: 0px auto 0;
  font-family: Microsoft YaHei !important;
  
  .header-list {
    height: 300px;
    cursor: pointer;
    visibility: visible;
    animation-name: flipInX;
    .noticeFont{
      position: absolute;
      bottom: 12px;
      left: 77px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      width: 555px;
      font-size: 12px;
      overflow: hidden;
      z-index: 3;
      background: #000;
      opacity: 0.7;
      padding: 0 15px;
    }
    .top{
      margin-top: 10px;
    }
    .device{
      height: 300px;
      width: 200px;
      ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li{
          width: 100px;
          padding: 20px 0px 13px 0px;
          color: #fff;
          span{
            display: block;
            text-align: center;
            font-size: 12px;
            &:first-child{
              height: 48px;
            }
            &:last-child{
              height: 15px;
              line-height: 15px;
            }
          }
          &:hover{
            color: #fce470;
          }
        }
      }
    }
    .POKER,.LOTTERY,.SLOT,.GISH,.STORTS,.PHONE{
      height: 300px;
      width: 563px;
    }
    .POKER{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/poker_photo.jpg') no-repeat;
    }
    .LOTTERY{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/lottery_photo.jpg') no-repeat;
    }
    .SLOT{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/slot_photo.jpg') no-repeat;
    }
    .GISH{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/fish_photo.jpg') no-repeat;
    }
    .STORTS{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/sport_photo.jpg') no-repeat;
    }
    .PHONE{
      background-position: 4px 10px!important;
      background: url('/static/tyc82/img/home/mobile_photo.jpg') no-repeat;
    }
    >div{
      height: 300px;
      width: 70px;
      overflow: hidden;
      float: left;
      // margin-left: 2px;
      transition:width .4s linear;
      position:relative;
      flex-wrap: nowrap;
      display: flex;
    }
    .imgBtn{
      margin-right: 2px;
    }
    .activeSlide{
      background-position: 73px 10px!important;
      width: 847px;
      transition:width .4s linear;
      .device{
        transition: opacity .6s linear;
        opacity:1;
        display: block;
      }
    }
    .header-item {
      position: relative;
      flex: 1;
      
      .item-area {
        position: absolute;
        top: 18px;
        left: 110px;
        text-align: center;
        z-index: 1;
        .item-name {
          font-size: 20px;
          font-weight: 400;
          color: #fff;
          margin-top: 2px;
        }
        .item-introduce {
          font-size: 11px;
          font-weight: 400;
          color: #f49f99;
          margin-top: 6px;
        }
      }
      .shuxian {
        position: absolute;
        top: 8px;
        right: 0;
      }
      .mask {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
      }
      
    }
  }
  .game-content {
    .left-image {
      margin-top: 10px;
      margin-left: 18px;
    }
    .right-text {
      margin-left: 17px;
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
          // &:nth-child(2){
          //   margin-left: 25px;
          // }
          .icon {
            transition: all .3s linear;
            vertical-align: middle;
          }
          .icon-name {
            position: absolute;
            bottom: -15px;
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
  @keyframes flipInX {
    0% {
      -webkit-transform: perspective(400px) rotateX(90deg);
      -ms-transform: perspective(400px) rotateX(90deg);
      transform: perspective(400px) rotateX(90deg);
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotateX(-10deg);
      -ms-transform: perspective(400px) rotateX(-10deg);
      transform: perspective(400px) rotateX(-10deg);
    }

    70% {
      -webkit-transform: perspective(400px) rotateX(10deg);
      -ms-transform: perspective(400px) rotateX(10deg);
      transform: perspective(400px) rotateX(10deg);
    }

    100% {
      -webkit-transform: perspective(400px) rotateX(0deg);
      -ms-transform: perspective(400px) rotateX(0deg);
      transform: perspective(400px) rotateX(0deg);
      opacity: 1;
    }
  }
  .flipInX {
    -webkit-animation: flipInX 1s linear;
    animation: flipInX 1s linear ;
  }
}
</style>