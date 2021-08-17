<template>
    <div class="chessContainer">
        <div class="banner">
             <banView :headerImg="headerImg" :picBox='400' isScale='true'></banView>
        </div>
        <!-- <banLantern :notice='notice' :siteName="'a478qp'"></banLantern> -->
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
      // notice: "/static/478qp/img/home/notice.png",
      headerImg: "/static/cpxpj/img/carouel/qp.jpg"
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
    opacity: 1;
    img {
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .box_bg{
    // padding-top: 5px;
    background: url("/static/cpxpj/img/index-main-bg-1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 5px;
  }
}
</style>
