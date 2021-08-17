<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
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
      headerImg: "/static/tyc82/img/handImg.jpg",
      themes:{
           name:"tyc82",
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
  background: #1b1b1b;
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
    background-color:#1b1b1b;
    background: url('/static/tyc82/img/new_games/sports_bg.png') no-repeat;
    background-size: 100% auto;
    padding-bottom:5px; 
  }
}
</style>

