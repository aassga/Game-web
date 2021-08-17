<template>
  <div class="game-wrap">
    <div class="banner">
        <banView :headerImg="headerImg"></banView>
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
      headerImg: "/static/ybcp/img/carouel/dz.jpg",
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
    gameBanner
  }
};
</script>

<style lang="less" scoped>
.game-wrap {
  padding-bottom:1px; 
   background: url("/static/ybcp/img/home/bg_banner.23dee41.jpg") repeat-y,#f3f2ef;
   background-size:100% auto;
  .banner{
    margin-bottom: 25px;
  }
}
</style>
