<template>
    <div>
       <div class="liveContainer">
        <div class="banner">
            <banView :headerImg="headerImg"></banView>
        </div>
        <div class="box_bg">
            <vpLive :themes='themes'></vpLive>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpLive from "../../../public/gameSortV4/type_live.vue";
export default {
  data() {
    return {
      headerImg: "/static/klk/img/new_games/banner/zr.jpg",
      themes:{
          width:"1200",
           rightBg:{
                background: "#fff",
           },
           titleColor:{
              color:"#181818",
           },
           line:{
              borderBottom: '2px solid #ba8d4d',
           },
           text:{
              color:' #828282',
           }
      }
    };
  },
  components: {
    banView,
    vpLive
  }
};
</script>
<style lang="less" scoped>
.liveContainer {
  padding-bottom: 20px;
  max-width: 1920px;
  min-width: 1200px;
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
    margin-top: -20px;
    padding-top: 20px;
    background: url("/static/klk/img/new_games/bg.png") left top / cover, #ffffff;
    background-size: auto;
    padding-bottom:20px; 
  }
}
</style>

