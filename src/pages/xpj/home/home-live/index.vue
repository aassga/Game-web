<template>
    <div class="live">
       <div class="liveContainer">
        <!-- <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div> -->
        <!-- <banLantern :notice='notice' :siteName="'jsyl'"></banLantern> -->
        <div class="box_bg">
            <vpLive :themes='themes' :site="'xpj'"></vpLive>
        </div>
       </div>
    </div>
</template>
<script>
import banLantern from "../../../public/game_new/banLantern";
import banView from "../../../public/game_new/banView.vue";
import vpLive from "../../../public/gameSortV4/type_live.vue";
export default {
  data() {
    return {
      headerImg: "/static/xpj/img/new_games/banner/live.jpg",
      notice: "/static/xpj/img/home/notice.png",
      themes: {
        width: "1000",
        rightBg: {
          background: "#0b3386"
        },
        titleColor: {
          color: "#ffffff"
        },
        line: {
          borderBottom: "2px solid #feca4c"
        },
        text: {
          color: "#586DA1"
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
    background: url("/static/xpj/img/home/b3.png") center 0 no-repeat,#122253;
    background-size:100% auto;
    padding-bottom: 20px;
  }
}
</style>

