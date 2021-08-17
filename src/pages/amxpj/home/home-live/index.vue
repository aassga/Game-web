<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg"></banView>
        </div>
        <banLantern :notice='notice' :siteName="'mgm'"></banLantern>
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
      headerImg: "/static/amxpj/img/new_games/banner/zr.jpg",
      notice: "/static/amxpj/img/home/notice-icon.png",
      themes: {
        name:"amxpj",
        width: "1200",
        rightBg: {
          background: "#271A4F"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #feca4c"
        },
        text: {
          color: "#7269A5"
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
    background: url("/static/amxpj/img/live_bg.png") center
        -12px no-repeat;
    background-size:100% auto;
    padding-bottom: 15px;
  }
}
</style>

