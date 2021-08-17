<template>
    <div class="chessContainer">
        <div class="banner">
             <!-- <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView> -->
             <banLantern :notice='notice' :siteName="'jltx'"></banLantern>
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
      notice: "/static/jltx/img/home/notice.png",
      headerImg: "/static/jltx/img/chess/B.jpg"
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
    margin: 0 auto;
  .banner {
    position: relative;
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      background: url('/static/jltx/img/chess/B.jpg') center top/ cover no-repeat;
  }
  .box_bg{
    padding-bottom: 5px;
  }
}
</style>
