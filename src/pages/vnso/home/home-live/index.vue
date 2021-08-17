<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner"></div>
        <div class="box_bg">
            <vpLive :themes='themes' :site="'vnso'"></vpLive>
        </div>
       </div>
    </div>
</template>
<script>
import banLantern from "../../../public/game_new/banLantern";
import banView from "../../../public/game_new/banView.vue";
import vpLive from "../../../public/gameSortV4/type_live";
export default {
  data() {
    return {
      headerImg: "/static/vnso/img/carouel/sx.jpg",
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
  background: #eaeaea url("/static/vnso/img/b3.png")repeat-y center top;  
  background-size:100% auto;
  .banner {
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/vnso/img/carouel/sx.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

