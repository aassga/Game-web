<template>
    <div class="chessContainer">
        <div class="banner">
             <banView :headerImg="headerImg" :picBox='255' isScale='true'></banView>
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
      headerImg: "/static/bet365/img/new_games/banner/qp.jpg"
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
    background: #252525;
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
    padding-bottom: 5px;
  }
}
</style>
