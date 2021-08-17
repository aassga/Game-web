<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'pjdc'"></banLantern>
        <div class="box_bg">
            <vpLive :themes='themes'></vpLive>
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
      headerImg: "/static/pjdc/img/live.jpg",
      notice: "/static/pjdc/img/home/notice-icon.png",
      themes: {
        width: "1200",
        rightBg: {
          background: "#3C0202"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #ba8d4d"
        },
        text: {
          color: " #B14C4C"
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
.live {
  background: #600919;
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
    margin-top: 35px;
    background: url("/static/public/image/casino/images/liveGame_bg.png") center
        0 no-repeat,
      #600919;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

