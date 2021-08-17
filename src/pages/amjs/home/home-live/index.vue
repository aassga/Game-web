<template>
    <div class="live">
       <div class="liveContainer">
        <div class="banner">
          <vp-register class="registerBox"></vp-register>
            <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'amjs'"></banLantern>
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
import vpRegister from '../../admin/nregister';
export default {
  data() {
    return {
      headerImg: "/static/amjs/img/sx.jpg",
      notice: "/static/amjs/img/home/notice.png",
      themes: {
        width: "1000",
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
    banLantern,
    vpRegister
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
      .registerBox {
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
    }
  }
  .box_bg {
    margin-top: 35px;
    background: #1e1e1e;
    background-size:100% auto;
    padding-bottom: 15px;
    background: #1e1e1e url("/static/amjs/img/bg.jpg") no-repeat center top;
  }
}
</style>

