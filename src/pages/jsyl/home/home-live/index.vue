<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'jsyl'"></banLantern>
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
      headerImg: "/static/jsyl/img/new_games/banner/live.jpg",
      notice: "/static/jsyl/img/home/notice.png",
      themes: {
        width: "1200",
        rightBg: {
          background: "#181818"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #ba8d4d"
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
    margin-top: 35px;
    background: #1e1e1e;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

