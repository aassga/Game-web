<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" isScale='true'></banView>
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
      headerImg: "/static/amxpj/img/new_games/banner/ty.jpg",
      themes:{
           name:"amxpj_sport",
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
  background: #100b1e;
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
    background: url("/static/amxpj/img/live_bg.png") center
        -12px no-repeat;
    background-size:100% auto;
    // padding-bottom:15px; 
  }
}
</style>

