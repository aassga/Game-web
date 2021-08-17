<template>
    <div class="wrapper">
        <div :class="`tiyu_cont_${theme.width}`">
            <div class="tiyu" :style="{paddingTop:theme.name=='amjs_sport'?'15px':''}">
                <!-- 导航栏 -->
                <dl class="list-items" :class="theme.name">
                    <dd v-for="(item,index) in sport_nav_data" :key="index" @click="changgeme(item.id)"
                        :class="[{active:item.id==gameIndex&& gameIndex!=0},{firstdd:item.id==0 && gameIndex==0},{firstdd1:item.id==0},]">
                        <p :class="`sport_${item.gameId}`"></p>
                        <br>
                        {{item.name}}
                    </dd>
                </dl>
                <div id="items" :class="theme.name" :style="{marginTop:itemtop}">
                    <div :class="item.bigclass" class="imgBox clear" v-for="(item,index) in gameData" :key="index">
                        <img :src="item.img" :class="['img',!isdong? '':'right_img_a']" alt />
                        <a href="javascript:void(0);">
                            <!-- 预览版  trustLogin(item) -->
                            <div class="btn" :data-type="item.type"  @click="$loginGame(item,theme.name)"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  props: {
    theme: {
      type: Object
    },
    tiyuType: {
      type: String
    }
  },
  data() {
    return {
      sport_item: {},
      idlist: [],
      isdong: false,
      gameData: [],
      itemtop: "-40px",
      defaultGameData: [],
      sport_nav_data: [
        {
          id: 0,
          name: ""
        }
      ],
      gameIndex: 0,
      showGames: []
    };
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
        if(this.$websiteName=='blr'&&ele.name=='188体育'){
            ele.name='365体育'
        }
        let data = {
          id: ele.id,
          name: ele.name,
          path: `/home/tiyu?id=${ele.id}&name=${ele.id}`,
          gameId: ele.id
        };
        let data2 = {
          name: ele.name,
          id: ele.id,
          img: `/static/public/image/sports/newsport/s${ele.id}.png`,
          bigclass: `sport_${ele.id}`
        };
         if(this.$websiteName=='blr'&&ele.id==11756){
            data2.img= `/static/public/image/sports/newsport/blrman.png`
        }
        this.sport_nav_data.push(data);
        this.defaultGameData.push(data2);
      });
    },
    giveDataById(gid) {
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      this.gameData = [];
      if (gid == 0) {
        this.gameData = this.defaultGameData;
      } else {
        this.gameData = this.defaultGameData.filter(ele => ele.id == gid);
      }
      this.$router.push({
        path: `/home/${this.tiyuType}`,
        query: { id: gid }
      });
      window.scrollTo(0, scrollTop);
    },
    // 点击导航栏
    async changgeme(id) {
      this.gameIndex = id;
      this.giveDataById(id);
      this.isdong = false;
      setTimeout(() => {
        this.isdong = true;
      }, 100);
    }
  },
  created() {
    this.getSports();
  },
  mounted() {
    this.changgeme(this.$route.query.id);
    setTimeout(() => {
      this.getData();
    }, 3000);
  },
  watch: {
    "$route.query.id": function(newval, oldval) {
      if (newval != "" || newval != undefined) {
        this.changgeme(newval);
      }
    }
  },
  components: {},
  computed: {}
};
</script>

<style lang="less" scoped>
.wrapper {
  >div{
    width: 100%;
    background: transparent;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    padding-bottom: 25px;
    overflow: hidden;
    >div{
      width: 1200px;
      margin: auto;
      padding-top: 33px;
      .list-items {
        padding: 10px 0 0 12px;
        margin: 0 0 -10px;
        position: relative;
        z-index: 2;
        dd {
          display: inline-block;
          vertical-align: top;
          height: 104px;
          width: 140px;
          margin-left: 15px;
          padding-top: 5px;
          border-radius: 10px;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -o-transition: all 0.2s;
          transition: all 0.2s;
          &:hover {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            font-size: 16px;
          }
          p {
            width: 111px;
            height: 55px;
            margin: 0 auto;
          }
        }
        .firstdd1 {
          background-size: 142px 105px;
          p {
            display: none;
          }
          line-height: 28px;
          margin-left: 0;
        }
        .firstdd {
          background-size: 142px 105px;
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
        }
        dd {
          @bgcardList: 38, 11368, 39,11752,11754,11756;
          .backgroundcard(@className,@pngName) {
            .sport_@{className} {
              background: url("/static/public/image/sports/newsport/@{className}.png")
                no-repeat center center;
            }
          }
          .loop(@i) when (@i < length(@bgcardList)+1) {
            .backgroundcard(extract(@bgcardList, @i),extract(@bgcardList, @i));
            .loop(@i+1);
          }
          .loop(1);
          @bgcardList1: 38, 11368, 39,11752,11754,11756;
          .backgroundcard1(@className,@pngName) {
            &:hover .sport_@{className} {
              background: url("/static/public/image/sports/newsport/h@{className}.png")
                no-repeat center center;
            }
          }
          .loop1(@i) when (@i < length(@bgcardList1)+1) {
            .backgroundcard1(extract(@bgcardList1, @i),extract(@bgcardList1, @i));
            .loop1(@i+1);
          }
          .loop1(1);
        }
        .active {
          // -webkit-transform: scale(1.1);
          // -ms-transform: scale(1.1);
          // transform: scale(1.1);
          font-size: 16px;
          @bgcardList2: 38, 11368, 39,11752,11754,11756;
          .backgroundcard2(@className,@pngName) {
            .sport_@{className} {
              background: url("/static/public/image/sports/newsport/h@{className}.png")
                no-repeat center center;
            }
          }
          .loop2(@i) when (@i < length(@bgcardList2)+1) {
            .backgroundcard2(extract(@bgcardList2, @i),extract(@bgcardList2, @i));
            .loop2(@i+1);
          }
          .loop2(1);
        }
      }
      #items{
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        position: relative;
        padding-left: 5px;
        z-index: 1;
        &::before {
          content: "";
          display: table;
        }
        .imgBox {
          height: 530px;
          margin-top: 0px;
          position: relative;
          overflow: hidden;
          .btn {
              position: absolute;
              bottom: 26px;
              left: 835px;
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
        }
      }
    }
  }
  .tiyu_cont_1000 {
    width: 1000px;
    .tiyu {
      width: 1000px;
      .list-items {
        margin: 0 0 30px 0px;

         dd:nth-child(7){
          margin-left: 0;
          margin-top: 15px;
        }
      }
      .theme_sports {
        dd {
          background: #3F2D19;
          color: #ffffff;
          &:hover {
            color: #fff;
            background: linear-gradient(#4E3821, #C59844);
          }
        }
      
        .firstdd1 {
          background: url("/static/mgm/img/0.png") no-repeat center
            center;
          &:hover {
            background: url("/static/mgm/img/h0.png") no-repeat center
              center;
          }
        }
        .firstdd {
          background: url("/static/mgm/img/h0.png") no-repeat center
            center;
        }
        .active {
          color: #fff;
          background: linear-gradient(#C59844, #4E3821);
        }
      }
      .betsb_sport {
        dd {
          background: #383838;
          color: #cdcdcd;
          &:hover {
            color: #fff;
            background: linear-gradient(#24c098,#058a67);
          }
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          &:hover .sport_11754{
            background: url("/static/public/image/sports/newsport/h11754.png") no-repeat center center;
          }
          .sport_11756{
            background: url("/static/public/image/sports/newsport/xj.png")
              no-repeat center center;
          }
          &:hover .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        .firstdd1 {
          background: url("/static/betsb/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/betsb/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
          
        }
        .firstdd {
          background: url("/static/betsb/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#25c199,#008260);
          .sport_11754{
            background: url("/static/public/image/sports/newsport/h11754.png") no-repeat center center;
          }
        }
      }
       .amjs_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
            
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/amjs/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/amjs/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/amjs/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .bet365_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
            
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(#24c098,#058a67);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/bet365/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/bet365/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/bet365/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#25c199,#008260);
          .sport_11756{
            background: url("/static/public/image/sports/newsport/h_xj.png")
            no-repeat center center;
          }
          
        }
      }
       .blr_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(#24c098,#058a67);
          }
          .sport_11756{
               background: url("/static/public/image/sports/newsport/blr.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/blrhover.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/blr/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/blr/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/blr/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#25c199,#008260);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/blrhover.png")
                no-repeat center center;
           }
        }
      }
      // .vnso_sport {
      //    margin: -18px 0 30px 0px;
      //   dd {
      //     .sport_11754{
      //       background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
      //     }
      //     background: #2b3154;
      //     color: #fff;
      //     &:hover {
      //       color: #fff;
      //       background: linear-gradient(#ffa724,#fe5d25);
      //     }
      //      .sport_11754{
      //      background: url("/static/public/image/sports/newsport/xpj.png")
      //           no-repeat center center;
      //      }
      //      &:hover .sport_11754{
      //          background: url("/static/public/image/sports/newsport/h11754.png")
      //           no-repeat center center;
      //      }
      //      .sport_11756{
      //         background: url("/static/public/image/sports/newsport/xj.png")
      //           no-repeat center center;
      //      }
      //      &:hover .sport_11756{
      //          background: url("/static/public/image/sports/newsport/h_xj.png")
      //           no-repeat center center;
      //      }
      //   }
      //   .firstdd1 {
      //     background: url("/static/vnso/img/new_games/0.png") no-repeat center
      //       center;
      //       background-size: cover;
      //     &:hover {
      //       background: url("/static/vnso/img/new_games/h0.png") no-repeat center
      //         center;
      //         background-size: cover;
      //     }
      //   }
      //   .firstdd {
      //     background: url("/static/vnso/img/new_games/h0.png") no-repeat center
      //       center;
      //       background-size: cover;
      //   }
      //   .active {
      //     color: #fff;
      //     background: linear-gradient(#ffa724,#fe5d25);
      //     .sport_11756{
      //          background: url("/static/public/image/sports/newsport/h_xj.png")
      //           no-repeat center center;
      //      }
      //   }
      // }
      .hqyl_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #333;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(180deg,#DFB65F,#8E7938);
          }
        }
        .firstdd1 {
          background: url("/static/hqyl/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/hqyl/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/hqyl/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(180deg,#DFB65F,#8E7938);
        }
      }
      // .blr_sport {
      //    margin: -18px 0 30px 0px;
      //   dd {
      //     .sport_11754{
      //       background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
      //     }
      //     background: #333;
      //     color: #fff;
      //     &:hover {
      //       color: #fff;
      //       background: linear-gradient(180deg,#DFB65F,#8E7938);
      //     }
      //     .sport_11756{
      //         background: url("/static/public/image/sports/newsport/xj.png")
      //           no-repeat center center;
      //      }
      //      &:hover .sport_11756{
      //          background: url("/static/public/image/sports/newsport/h_xj.png")
      //           no-repeat center center;
      //      }
      //   }
      //   .firstdd1 {
      //     background: url("/static/blr/img/new_games/0.png") no-repeat center
      //       center;
      //       background-size: cover;
      //     &:hover {
      //       background: url("/static/blr/img/new_games/h0.png") no-repeat center
      //         center;
      //         background-size: cover;
      //     }
      //   }
      //   .firstdd {
      //     background: url("/static/blr/img/new_games/h0.png") no-repeat center
      //       center;
      //       background-size: cover;
      //   }
      //   .active {
      //     color: #fff;
      //     background: linear-gradient(180deg,#DFB65F,#8E7938);
      //     .sport_11756{
      //         background: url("/static/public/image/sports/newsport/h_xj.png")
      //         no-repeat center center;
      //     }
      //   }
        
      // }

      .xpj_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #0b3386;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient( #ffb459,#ff5f00);
          }
          .sport_11754{
           background: url("/static/public/image/sports/newsport/xpj.png")
                no-repeat center center;
           }
           &:hover .sport_11754{
               background: url("/static/public/image/sports/newsport/h11754.png")
                no-repeat center center;
           }
           .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/xpj/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/xpj/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/xpj/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient( #ffb459,#ff5f00);
          .sport_11754{
               background: url("/static/public/image/sports/newsport/h11754.png")
                no-repeat center center;
           }
           .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
       
      }
      #items{
        .imgBox {

          margin-top: -25px;
          &.sport_39 {
            background: url("/static/public/image/sports/newsport/1000/b39.png")
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
              bottom: 70px;
              left: 760px;
              height: 56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

          &.sport_38 {
            background: url("/static/public/image/sports/newsport/1000/b38.png")
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
              bottom: 145px;
              left: 760px;
              height: 56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

          &.sport_11368 {
            background: url("/static/public/image/sports/newsport/1000/b11368.png")
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
              left: 760px;
              height:56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

           &.sport_11752 {
            background: url("/static/public/image/sports/newsport/1000/b11752.png")
              no-repeat center bottom;
            img{
              position: absolute;
              right: 219px;
              bottom: -45px;
              transition: all .3s;
            }
            &:hover .img {
              right: 240px;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 760px;
              height:56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

           &.sport_11756 {
            background: url("/static/public/image/sports/newsport/1000/b11756.png")
              no-repeat center bottom;
            img{
              position: absolute;
              left: 290px;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              left: 270px;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 760px;
              height:56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

            &.sport_11754 {
            background: url("/static/public/image/sports/newsport/1000/b11754.png")
              no-repeat center bottom;
            img{
              position: absolute;
              left: 0px;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              left: 20px;
            }
            .btn {
              position: absolute;
              bottom: 16px;
              left: 760px;
              height:56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }

        }
      }
      .blr_sport{
          .imgBox{
            &.sport_11756 {
            background: url("/static/public/image/sports/newsport/1000/blr.png")
              no-repeat center bottom !important;
            img{
              position: absolute;
              left: 350px  !important;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              left: 310px  !important;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 760px;
              height:56px;
              width: 213px;
              background: url("/static/public/image/sports/newsport/1000/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
          }
      }

    }
  }
  .tiyu_cont_1200 {
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
      .betsb {
        dd {
          background: #611A16;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(#f3cb52,#fcdf84);
          }
        }
        .firstdd1 {
          background: url("/static/betsb/img/0.png") no-repeat center
            center;
          &:hover {
            background: url("/static/betsb/img/h0.png") no-repeat center
              center;
          }
        }
        .firstdd {
          background: url("/static/betsb/img/h0.png") no-repeat center
            center;
        }
        .active {
          color: #fff;
          background: linear-gradient(#f3cb52,#fcdf84);
        }
      }
      .tyc82 {
        margin-bottom: 25px;
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #262626;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#e9d89c,#cb9b35);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/tyc82/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/tyc82/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/tyc82/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#cb9b35,#e9d89c);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .tycjt {
        margin-bottom: 25px;
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #262626;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#e9d89c,#cb9b35);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/tycjt/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/tycjt/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/tycjt/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#cb9b35,#e9d89c);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .pj_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #611A16;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(#f3cb52,#fcdf84);
          }

          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/pjdc/img/0.png") no-repeat center
            center;
          &:hover {
            background: url("/static/pjdc/img/h0.png") no-repeat center
              center;
          }
        }
        .firstdd {
          background: url("/static/pjdc/img/h0.png") no-repeat center
            center;
        }
        .active {
          color: #fff;
          background: linear-gradient(#f3cb52,#fcdf84);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .jltx_sport{
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/jltx/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/jltx/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/jltx/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
       .jltx-new2_sport{
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/jltx-new2/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/jltx-new2/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/jltx-new2/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .amxpj_sport {
        dd {
          background: #251C47;
          color: #dddddd;
          &:hover {
            color: #fff;
            background: linear-gradient(#ffb459,#ff5f00);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/amxpj/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/amxpj/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/amxpj/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#ffb459,#ff5f00);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .mgm_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #251C47;
          color: #dddddd;
          &:hover {
            color: #fff;
            background: linear-gradient(#ffb459,#ff5f00);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/mgm/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/mgm/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/mgm/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#ffb459,#ff5f00);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .a99q_new_sport{
       dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/99qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/99qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/99qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
        
      }
      .jsyl_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/jsyl/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/jsyl/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/jsyl/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .vns81_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/amvnsr/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/amvnsr/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/amvnsr/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .amvnsr_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/amvnsr/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/amvnsr/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/amvnsr/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
      }
      .y478qp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/188.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/188h.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/dqr/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/dqr/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/dqr/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/188.png")
              no-repeat center center;
          }
        }
        
      }
      .y737qp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/188.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/188h.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/737qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/737qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/737qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/188.png")
              no-repeat center center;
          }
        }
        
      }
      .vnst_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/vnst/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/vnst/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/vnst/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }
      .fhcp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/fhcp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/fhcp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/fhcp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
      }
      .xpj83_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/xpj83/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/xpj83/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/xpj83/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
      }
      .qxcp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/qxcp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/qxcp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/qxcp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }
      .tccp_sport{
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #251C47;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(0deg, #C000BB, #E65BE3);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/tccp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/tccp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/tccp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(0deg, #C000BB, #E65BE3);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }
      .a103qp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/103qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/103qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/103qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }
       .hty_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/hty/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/hty/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/hty/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }

      .a478qp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/478qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/478qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/478qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
        }
      }
      .test-1_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/test-1/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/test-1/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/test-1/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .jsyl_new_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/478qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/478qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/478qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
       .vnso_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/vnso/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/vnso/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/vnso/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .amhg_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/amhg/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/amhg/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/amhg/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .qygj_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/qygj/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/qygj/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/qygj/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .xpj80_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/xpj80/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/xpj80/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/xpj80/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .a935qp_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/935qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/935qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/935qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
       .ak78qp_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/k78qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/k78qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/k78qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .a839qp_sport {
        dd {
          .sport_11754{
            background: url("/static/public/image/sports/newsport/11754_1.png") no-repeat center center;
          }
          background: #383838;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#faf762,#c19b38);
          }
          .sport_11756{
              background: url("/static/public/image/sports/newsport/xj.png")
                no-repeat center center;
           }
           &:hover .sport_11756{
               background: url("/static/public/image/sports/newsport/h_xj.png")
                no-repeat center center;
           }
        }
        .firstdd1 {
          background: url("/static/839qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/839qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/839qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#faf762,#c19b38);
          .sport_11756{
              background: url("/static/public/image/sports/newsport/h_xj.png")
              no-repeat center center;
          }
        }
        
      }
       .kyqp_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/kyqp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/kyqp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/kyqp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
       .a632qp_sport {
        dd {
          background: #fff;
          color: #000;
          &:hover {
            color: #fff;
            background: linear-gradient(#65e0f4,#4fade6);
          }
        }
        .firstdd1 {
          background: url("/static/632qp/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/632qp/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/632qp/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(#65e0f4,#4fade6);
        }
      }
      .test4_sport {
        margin-bottom: 25px;
        dd {
          background: #262626;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#e9d89c,#cb9b35);
          }
        }
        .firstdd1 {
          background: url("/static/test-4/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/test-4/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/test-4/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#cb9b35,#e9d89c);
        }
      }
      .betsb-preview {
        margin-bottom: 25px;
        dd {
          background: #262626;
          color: #fff;
          &:hover {
            color: #fff;
            background: linear-gradient(135deg,#e9d89c,#cb9b35);
          }
        }
        .firstdd1 {
          background: url("/static/betsb/img/new_games/0.png") no-repeat center
            center;
            background-size: cover;
          &:hover {
            background: url("/static/betsb/img/new_games/h0.png") no-repeat center
              center;
              background-size: cover;
          }
        }
        .firstdd {
          background: url("/static/betsb/img/new_games/h0.png") no-repeat center
            center;
            background-size: cover;
        }
        .active {
          color: #fff;
          background: linear-gradient(135deg,#cb9b35,#e9d89c);
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
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
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
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
          &.sport_11368 {
            background: url("/static/public/image/sports/newsport/im-bg.png")
              no-repeat center bottom;
            img{
              position: absolute;
              right: 241px;
              bottom: -46px;
              transition: all .3s;
            }
            &:hover .img {
              right: 260px;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 935px;
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
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
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
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
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
           &.sport_11756 {
            background: url("/static/public/image/sports/newsport/188ty.png")
              no-repeat center bottom;
            img{
              position: absolute;
              right: 260px;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              right: 290px;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 935px;
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
          
       

        }
      }
       .y478qp_sport{
          .imgBox{
               &.sport_11756 {
            background: url("/static/public/image/sports/newsport/a188.png")
              no-repeat center bottom !important;
            img{
              position: absolute;
              left: 70px!important;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              left: 90px!important;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 935px;
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
          }
        }
         .y737qp_sport{
          .imgBox{
               &.sport_11756 {
            background: url("/static/public/image/sports/newsport/a188.png")
              no-repeat center bottom !important;
            img{
              position: absolute;
              left: 70px!important;
              bottom: 0px;
              transition: all .3s;
            }
            &:hover .img {
              left: 90px!important;
            }
            .btn {
              position: absolute;
              bottom: 86px;
              left: 935px;
              height: 67px;
              width: 254px;
              background: url("/static/public/image/sports/newsport/jr.png")
                no-repeat center top;
              cursor: pointer;
              background-size: 100% 100%;
            }
          }
          }
        }

    }
  }

}
</style>
