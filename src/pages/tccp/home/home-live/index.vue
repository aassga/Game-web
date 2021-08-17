<template>
    <div class="live">
       <div class="liveContainer">
        <div class="bannerBox">
          <div class="banner"></div>
        </div>
        <div class="box_bg">
            <vpLive :themes='themes' :site="'jsyl'"></vpLive>
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
      headerImg: "/static/tccp/img/carouel/zr.jpg",
      // notice: "/static/tccp/img/home/notice.png",
      themes: {
        width: "1200",
        rightBg: {
          background: "#380f3a"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #f7c96a"
        },
        text: {
          color: "#a9a9a9"
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
  background: #280830;  
  background-size:100% auto;
  .bannerBox{
    // background: linear-gradient(to top, #e0e9fc, #fbfbff);;
  }
  .banner {
    max-width: 1920px;
    height: 400px;
    margin: 0 auto;
    background: url('/static/tccp/img/banner/sx.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 15px;
    background: #280830;
  }
}
</style>

