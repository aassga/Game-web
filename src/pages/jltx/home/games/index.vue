<template>
  <div class="game-wrap">
    <div class="banner">
        <!-- <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView> -->
        <banLantern :notice='notice' :siteName="'jltx'"></banLantern>
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
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
export default {
  mixins: [secStyle],
  data() {
    return {
      //主题传参
      notice: "/static/jltx/img/home/notice.png",
      headerImg: "/static/jltx/img/banner/dz.jpg",
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
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/jltx/img/banner/dz.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    padding-top: 20px;
    background: #272727;
    padding-bottom: 5px;
  }
}
</style>
