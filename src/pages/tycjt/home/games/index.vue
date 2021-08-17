<template>
  <div class="game-wrap">
    <div class="banner">
        <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
    </div>
    <!-- 滚动盈利榜 -->
    <div class="box_bg">
       <gameBanner :themes='themes'></gameBanner>
      <vp-Games :themes='themes' :gameType="'slot'"></vp-Games>
    </div>
  </div>
</template>
<script>
// import vpGames from '../../../public/games/alltype_index_1200.vue'
import vpGames from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView.vue";
import gameBanner from "../../../public/game_new/game_banner.vue";
import secStyle from "../secStyle.js";
export default {
  mixins: [secStyle],
  data() {
    return {
      //主题传参
      headerImg: "/static/tycjt/img/lhj.jpg",
    };
  },
  methods: {},
  created: function() {},
  mounted() {
    let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
    if(curHeight > 0){
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  },
  watch: {},
  computed: {},
  components: {
    vpGames,
    banView,
    gameBanner
  }
};
</script>

<style lang="less" scoped>
.game-wrap {
  background: #1e1e1e;
  margin: 0 auto;
  .banner {
    position: relative;
    img {
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
    }
    ul {
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      width: 100%;
      background: url("/static/klk/img/new_games/feature.png") center top;
      background-size: auto 100%;
      display: flex;
      font-size: 16px;
      justify-content: center;
      align-items: center;
      li {
        width: 17%;
        height: 55%;
        margin-top: 1.5%;
        margin-bottom: 6px;
        text-align: center;
        p {
          font-size: 24px;
          margin-bottom: 10px;
          color: #fff;
        }
        span {
          font-size: 16px;
          color: #ffb359;
        }
      }
    }
  }
  .box_bg {
    margin-top: -20px;
    padding-top: 40px;
    background-color:#1e1e1e;
  background: url('/static/tycjt/img/new_games/slot_bg.png') no-repeat;
  background-size: 100% auto;
    padding-bottom: 5px;
    .list_user {
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
        background: #420711;
        i {
          background: url("/static/tycjt/img/new_games/next_l.png") center center /
            17px no-repeat;
        }
      }
      .slidePrev:hover {
        i {
          background: url("/static/tycjt/img/new_games/next_l_a.png") center
            center / 17px no-repeat;
        }
      }
      .slideNext {
        background: #420711;
        right: 0;
        i {
          background: url("/static/tycjt/img/new_games/next_r.png") center center /
            17px no-repeat;
        }
      }
      .slideNext:hover {
        i {
          background: url("/static/tycjt/img/new_games/next_r_a.png") center
            center / 17px no-repeat;
        }
      }
      .slide_list {
        width: 265px;
        margin: 0 8px;
        background: #420711;
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
            font-size: 12px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            small {
              color: #fff;
              b {
                font-size: 12px;
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
    }
  }
}
</style>
