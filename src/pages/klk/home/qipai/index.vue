<template>
    <div class="chessContainer">
        <div class="banner">
             <banView :headerImg="headerImg"></banView>
        </div>
        <div class="box_bg">
            <vp-Qipai :themes='themes' :gameType="'chess'"></vp-Qipai>
        </div>
    </div>
</template>
<script>
import vpQipai from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView";
import secStyle from "../secStyle.js";
export default {
  mixins:[secStyle],
  data() {
    return {
      headerImg: "/static/klk/img/new_games/banner/qp.jpg"
    };
  },
  methods: {},
  created() {},
  mounted() {},
  components: {
    vpQipai,
    banView
  }
};
</script>
<style lang="less" scoped>
.chessContainer {
  padding-bottom: 20px;
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;
  .banner {
    position: relative;
    opacity: 1;
    img {
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .box_bg {
    background: url("/static/klk/img/new_games/bg.png") left top / 100%, #ffffff;
    background-size: auto;
    padding-bottom: 5px;
  }
}
</style>
