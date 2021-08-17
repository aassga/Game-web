<template>
    <div class="chessContainer">
        <div class="bannerBox">
          <div class="banner"></div>
        </div>
        <div class="box_bg">
            <vp-Qipai :themes='themes' :gameType="'chess'"></vp-Qipai>
        </div>
    </div>
</template>
<script>
import vpQipai from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
export default {
  mixins:[secStyle],
  data() {
    return {
      // notice: "/static/737qp/img/home/notice.png",
      headerImg: "/static/737qp/img/banner/qp.png"
    };
  },
  methods: {},
  created() {},
  mounted() {},
  components: {
    vpQipai,
    banView,
    banLantern
  }
};
</script>
<style lang="less" scoped>
.chessContainer {
    background: #272727;  
    background-size:100% auto;
    margin: 0 auto;
    .bannerBox{
      background: linear-gradient(0deg,#dfe9fc, #F8F9FF, #fbfbff);;
    }
  .banner {
    max-width: 1920px;
    height: 400px;
    margin: 0 auto;
    background: url('/static/737qp/img/banner/qp.png') center top/ cover no-repeat;
    
  }
  .box_bg{
    // padding-top: 5px;
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 5px;
  }
}
</style>
