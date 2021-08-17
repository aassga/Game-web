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
      headerImg: "/static/mgm/img/new_games/banner/qp.jpg"
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
    padding-bottom:1px; 
    background: url("/static/mgm/img/b3.png") center 0 no-repeat,#140d28;
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
  
}
</style>
