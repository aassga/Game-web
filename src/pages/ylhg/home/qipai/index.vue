<template>
    <div class="chessContainer">
        <div class="banner">
             <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'aylhg'"></banLantern>
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
      notice: "/static/ylhg/img/home/notice.png",
      headerImg: "/static/ylhg/img/chess/B.jpg"
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
    margin-top: 35px;
    padding-bottom: 5px;
  }
}
</style>
