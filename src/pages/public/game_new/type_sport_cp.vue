<template>
    <div class="tiyu">
        <div id="items">
            <div :class="item.bigclass" :style="{background:'url(' + btnBg +'/' + item.btn +  '1.png) no-repeat center bottom'}" class="clear" v-for="(item,index) in defaultGameData" :key="index" >
                <img :src="item.img" :class="item.divclass">
                <a href="javascript:void(0);" @click="$loginGame(item)">
                    <div class="js-join-game-btn" :style="{background:'url(' + btnBg +'/' + item.btn +  '-join-game.png) no-repeat center top'}" :data-type="item.type" :class="item.btnclass"></div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    props:{
      theme:{
        type:Object
      }
    },
    data () {
      return {
        defaultGameData:[],
        btnBg:"./../../../static/"+this.theme.name+'/img/tiyu'
      }
    },
    methods: {
      getSports() {
        let allGame = this.$getObjByLocalStorage(`sport_game_new`);
        if (allGame) {
          this.inintSports();
        } else {
          this.getData(true);
        }
      },
      getData(status) {
        this.$store
          .dispatch("game/gameSortNew", {
            device: "pc",
            id: 10002
          })
          .then(res => {
            if (res && res.code == 200) {
              this.$setObjByLocalStorage("sport_game_new", res.data[10002]);
              if (status) {
                this.inintSports();
              }
            }
          });
      },
      inintSports() {
        let allGame = this.$getObjByLocalStorage(`sport_game_new`);
        allGame.forEach((ele, index) => {
          let data2 = {
            name: ele.name,
            id: ele.id,
            
            img: `/static/public/image/sports/newsport/s${ele.id == '11756' ? '188' : ele.id}.png`,
            bigclass: `sport_${ele.id}`,
            btn:ele.id == '38'?"sb":ele.id == '39'?"ss":ele.id == '11368'?"im":ele.id == '11752'?"hg":ele.id == '11754'?"lj":ele.id == '11756'?"a188":'',
            divclass:ele.id == '38'?"sb-sport":ele.id == '39'?"ss-sport":ele.id == '11368'?"im-sport":ele.id == '11752'?"hg-sport":ele.id == '11754'?"lj-sport":ele.id == '11756'?"a188-sport":'',
            bigclass:ele.id == '38'?"sb-game-item1":ele.id == '39'?"ss-game-item1":ele.id == '11368'?"im-game-item1":ele.id == '11752'?"hg-game-item1":ele.id == '11754'?"lj-game-item1":ele.id == '11756'?"a188-game-item1":'',
            btnclass:ele.id == '38'?"sb-join-game-btn":ele.id == '39'?"ss-join-game-btn":ele.id == '11368'?"im-join-game-btn":ele.id == '11752'?"hg-join-game-btn":ele.id == '11754'?"lj-join-game-btn":ele.id == '11756'?"a188-join-game-btn":'',
          };
          this.defaultGameData.push(data2);
        });
      },
    },
    created() {
       this.getSports();
    },
    mounted () {
       setTimeout(() => {
         this.getData();
       }, 3000);
    },
  }
</script>

<style lang="less" scoped>
#items {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  &.ag-game-item a, &.sb-game-item a,&im-game-item,&.hg-game-item a, &.lj-game-item a,&a188-game-item {
      display: block;
      width: 100%;
      height: 100%;
  }
  .a188-game-item1 {
      position: relative;
      height: 530px;
      overflow: hidden;
      background: url('/static/public/image/sports/newsport/a188.png') no-repeat center bottom!important;

      .a188-join-game-btn {
          position: absolute;
          bottom: 60px;
          left: 863px;
          height: 99px;
          width: 152px;
          background: url('/static/public/image/sports/newsport/jr.png') no-repeat center top;
          cursor: pointer;
      }
      .a188-sport{
          position: absolute;
          left: 90px;
          bottom: 0;
          transition: all .3s;
          &:hover{
            left: 135px;
          }
      }
      
  }
  .ss-game-item1 {
      position: relative;
      height: 536px;
      margin-top: 30px;
      margin-bottom: 10px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/ag1.png') no-repeat center bottom;

      .ss-join-game-btn {
          position: absolute;
          bottom: 65px;
          right: 200px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/ag-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .ss-sport{
          position: absolute;
          left: 110px;
          bottom: 0px;
          transition: all .3s;
      }
      &:hover .ss-sport{
          left: 160px;
      }
  }
  .ag-game-item1 {
      position: relative;
      height: 541px;
      margin-bottom: 10px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/ag1.png') no-repeat center bottom;

      .ag-join-game-btn {
          position: absolute;
          bottom: 20px;
          left: 390px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/ag-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .ag-sport{
          position: absolute;
          right: 50px;
          bottom: 0px;
          transition: all .3s;
      }
      &:hover .ag-sport{
          right: 100px;
      }
  }
  .im-game-item1 {
      position: relative;
      height: 530px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/im1.png') no-repeat center bottom;

      .im-join-game-btn {
          position: absolute;
          bottom: 48px;
          left: 362px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/hg-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .im-sport{
          position: absolute;
          right: 0;
          bottom: 0;
          transition: all .3s;
      }
      &:hover .im-sport{
          right: 50px;
      }
  }
  .sb-game-item1 {
      position: relative;
      height: 530px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/sb1.png') no-repeat center bottom;

      .sb-join-game-btn {
          position: absolute;
          bottom: 13px;
          left: 362px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/sb-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .sb-sport{
          position: absolute;
          right: 0;
          bottom: 0;
          transition: all .3s;
      }
      &:hover .sb-sport{
          right: 50px;
      }
  }
  .lj-game-item1 {
      position: relative;
      height: 530px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/lj1.png') no-repeat center bottom;

      .lj-join-game-btn {
          position: absolute;
          bottom: 50px;
          left: 362px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/ag-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .lj-sport{
          position: absolute;
          right: 0;
          bottom: 0;
          transition: all .3s;
      }
      &:hover .lj-sport{
          right: 50px;
      }
  }
  .hg-game-item1 {
      position: relative;
      height: 530px;
      overflow: hidden;
      // background: url('/static/t111/img/tiyu/hg1.png') no-repeat center bottom;

      .hg-join-game-btn {
          position: absolute;
          bottom: 13px;
          left: 362px;
          height: 99px;
          width: 152px;
          // background: url('/static/t111/img/tiyu/ag-join-game.png') no-repeat center top;
          cursor: pointer;
      }
      .hg-sport{
          position: absolute;
          right: 0;
          bottom: 0;
          transition: all .3s;
      }
      &:hover .hg-sport{
          right: 50px;
      }
  }
  // .a188-game-item1 {
  //     position: relative;
  //     height: 530px;
  //     overflow: hidden;
  //     background: url('/static/public/image/sports/newsport/188ty.png') no-repeat center bottom!important;

  //     .a188-join-game-btn {
  //         position: absolute;
  //         bottom: 35px;
  //         left: 362px;
  //         height: 99px;
  //         width: 152px;
  //         background: url('/static/public/image/sports/newsport/jr.png') no-repeat center top;
  //         cursor: pointer;
  //     }
  //     .a188-sport{
  //         position: absolute;
  //         right: 140px;
  //         bottom: 0;
  //         transition: all .3s;
  //     }
  //     &:hover .a188-sport{
  //         right: 160px;
  //     }
  // }
  
}
.tiyu {
  .theme1 {
    dd {
      background: #fff;
      color: #5b6168;
      &:hover {
        color: #fff;
        background: linear-gradient(to bottom right, #ff5f00, #ffb459);
      }
    }
    .firstdd1 {
      background: url("/static/klk/img/new_klk/0.png") no-repeat center
        center;
      &:hover {
        background: url("/static/klk/img/new_klk/h0.png") no-repeat center
          center;
      }
    }
    .firstdd {
      background: url("/static/klk/img/new_klk/h0.png") no-repeat center
        center;
    }
    .active {
      color: #fff;
      background: linear-gradient(to bottom right, #ff5f00, #ffb459);
    }
  }
  .theme2 {
    dd {
      background: #fff;
      color: #5b6168;
      &:hover {
        color: #fff;
        background: linear-gradient(to bottom right, #ff5f00, #ffb459);
      }
    }
    .firstdd1 {
      background: url("/static/t111/img/new_games/0.png") no-repeat center
        center;
      &:hover {
        background: url("/static/t111/img/new_games/h0.png") no-repeat center
          center;
      }
    }
    .firstdd {
      background: url("/static/t111/img/new_games/h0.png") no-repeat center
        center;
    }
    .active {
      color: #fff;
      background: linear-gradient(to bottom right, #ff5f00, #ffb459);
    }
  }
  #items{
    .imgBox {
      &.sport_39 {
        background: url("/static/public/image/sports/newsport/hg1.png")
          no-repeat center bottom;
        img{
            position: absolute;
            left: 170px;
            bottom: 0px;
            transition: all .3s;
        }
        &:hover .img {
            left: 130px;
        }
        .btn {
          position: absolute;
          bottom: 86px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
      &.sport_38 {
        background: url("/static/public/image/sports/newsport/sb-bg.png")
          no-repeat center bottom;
        img{
          position: absolute;
          right: 0;
          bottom: -40px;
          transition: all 0.3s;
        }
        &:hover .img {
            right: 50px;
        }
        .btn {
          position: absolute;
          bottom: 152px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
      &.sport_11368 {
        background: url("/static/public/image/sports/newsport/im-bg.png")
          no-repeat center bottom;
        img{
          position: absolute;
          right: 241px;
          bottom: -40px;
          transition: all .3s;
        }
        &:hover .img {
          right: 260px;
        }
        .btn {
          position: absolute;
          bottom: 86px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
      &.sport_11754 {
        background: url("/static/public/image/sports/newsport/jlty.png")
          no-repeat center bottom;
        img{
          position: absolute;
          left: 84px;
          bottom: -6px;
          transition: all .3s;
        }
        &:hover .img {
          left: 105px;
        }
        .btn {
          position: absolute;
          bottom: 8px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
      &.sport_11752 {
        background: url("/static/public/image/sports/newsport/hg-bg.png")
          no-repeat center bottom;
        img{
          position: absolute;
          right: 260px;
          bottom: -46px;
          transition: all .3s;
        }
        &:hover .img {
          right: 290px;
        }
        .btn {
          position: absolute;
          bottom: 86px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
      &.sport_11756 {
        background: url("/static/public/image/sports/newsport/188ty.png")
          no-repeat center bottom;
        img{
          position: absolute;
          right: 260px;
          bottom: -42px;
          transition: all .3s;
        }
        &:hover .img {
          right: 290px;
        }
        .btn {
          position: absolute;
          bottom: 86px;
          left: 935px;
          height: 100px;
          width: 254px;
          background: url("/static/public/image/sports/newsport/jr_2.png")
            no-repeat center top;
          cursor: pointer;
          // background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
