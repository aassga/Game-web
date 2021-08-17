<template>
    <div class="chessContainer">
        <!-- <div class="banner">
             <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div> -->
        <!-- <banLantern :notice='notice' :siteName="'jsyl'"></banLantern> -->
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
      notice: "/static/xpj/img/home/notice.png",
      headerImg: "/static/xpj/img/tiger.jpg"
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
    margin: -5px auto;
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
    margin-top: 5px;
    background: url("/static/xpj/img/home/b3.png") center 0 no-repeat,#122253;
    background-size:100% auto;
    padding-bottom: 5px;
  }
}
</style>
