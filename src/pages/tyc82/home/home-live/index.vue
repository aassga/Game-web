<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <!-- <banLantern :notice='notice' :siteName="'betsb'"></banLantern> -->
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
      headerImg: "/static/tyc82/img/live_head.jpg",
      notice: "/static/tyc82/img/home/notice-icon.png",
      themes: {
        width: "1200",
        name:"tyc82",
        rightBg: {
          background: "#171717"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #ba8d4d"
        },
        text: {
          color: "#5f5656"
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
  background: #1b1b1b;
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
    background-color:#1b1b1b;
  background: url('/static/tyc82/img/new_games/live_bg.png') no-repeat;
  background-size: 100% auto;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

