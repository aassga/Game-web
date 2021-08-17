<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
            <!-- <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView> -->
            <banLantern :notice='notice' :siteName="'jltx'"></banLantern>
        </div>
        
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
      headerImg: "/static/jltx/img/banner/sx.jpg",
      notice: "/static/jltx/img/home/notice.png",
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
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      position: relative;
      background: url('/static/jltx/img/banner/sx.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    background: #272727;
    background-size:100% auto;
    padding-bottom: 15px;
    margin-top: -4px;
  }
}
</style>

