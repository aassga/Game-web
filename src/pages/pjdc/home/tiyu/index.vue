<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
        </div>
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpSport from '../../../public/gameSortV4/type_sport';
export default {
  data() {
    return {
      headerImg: "/static/pjdc/img/handImg.jpg",
      themes:{
           name:"pj_sport",
           width:"1200"
      }
    };
  },
  components: {
    banView,
    vpSport
  }
};
</script>
<style lang="less" scoped>
.sports{
  background: #210000;
}
.sportContainer {
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
   background: url("/static/public/image/casino/images/tiyuGame_bg.png") center
        0 no-repeat,
      #2a0509;
    background-size: auto;
    padding-bottom:5px; 
  }
}
</style>

