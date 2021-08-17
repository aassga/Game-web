<template>
    <div class="chessContainer">
        <div class="banner">
             <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
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
      headerImg: "/static/tycjt/img/qp.jpg"
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
    background: #1b1b1b;
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
  .box_bg{
    background-color:#1b1b1b;
    background: url('/static/tycjt/img/new_games/live_bg.png') no-repeat;
    background-size: 100% auto;
    padding-bottom: 5px;
  }
}
</style>
