<template>
  <div class="game-wrap">
    <div class="banner">
        <banView :headerImg="headerImg" :picBox='400' isScale='true'></banView>
    </div>
    <!-- <banLantern :notice='notice' :siteName="'a478qp'"></banLantern> -->
    <!-- 滚动盈利榜 -->
    <div class="box_bg">
      <gameBanner :themes='themes'></gameBanner>
      <vp-Games :themes='themes' :gameType="'slot'"></vp-Games>
    </div>
  </div>
</template>
<script>
// import vpGames from '../../../public/games/alltype_index_1200.vue'
import vpGames from "../../../public/game_new/type_game.vue";
import banView from "../../../public/game_new/banView.vue";
import gameBanner from "../../../public/game_new/game_banner.vue";
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
export default {
  mixins: [secStyle],
  data() {
    return {
      //主题传参
      // notice: "/static/478qp/img/home/notice.png",
      headerImg: "/static/kyqp/img/carouel/dz.jpg",
    };
  },
  methods: {},
  created: function() {},
  mounted() {},
  watch: {},
  computed: {},
  components: {
    vpGames,
    banView,
    gameBanner,
    banLantern
  }
};
</script>

<style lang="less" scoped>
.game-wrap {
  // padding-bottom: 20px;
//   max-width: 1920px;
//   min-width: 1200px;
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
    padding-top: 20px;
    background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 5px;
  }
}
</style>
