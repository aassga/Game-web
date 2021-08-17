<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='400' isScale='true'></banView>
        </div>
        <!-- <banLantern :notice='notice' :siteName="'a478qp'"></banLantern> -->
        <div class="box_bg">
            <vpLive :themes='themes' :site="'632qp'"></vpLive>
        </div>
       </div>
    </div>
</template>
<script>
import banLantern from "../../../public/game_new/banLantern";
import banView from "../../../public/game_new/banView.vue";
import vpLive from "../../../public/game_new/type_live";
export default {
  data() {
    return {
      headerImg: "/static/632qp/img/carouel/zr.jpg",
      // notice: "/static/478qp/img/home/notice.png",
      themes: {
        width: "1200",
        rightBg: {
          background: "#fff"
        },
        titleColor: {
          color: "#000"
        },
        line: {
          borderBottom: "2px solid #51b5e9"
        },
        text: {
          color: "#828282"
        }
      },
      lantern: ""
    };
  },
  methods: {},
  mounted() {},
  components: {
    banView,
    vpLive,
    banLantern
  }
};
</script>
<style lang="less" scoped>
.demolist {
  display: inline-block;
  width: 990px;
}

.liveContainer {
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
    background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

