<template>
    <div>
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg"></banView>
        </div>
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpSport from '../../../public/gameSortV4/type_sport.vue';
export default {
  data() {
    return {
      headerImg: "/static/klk/img/new_games/banner/ty.jpg",
      themes:{
           name:"theme1",
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
.sportContainer {
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
    // padding-top: 40px;
    background: url("/static/klk/img/new_games/bg.png") left top / cover, #ffffff;
    background-size: auto;
  }
}
</style>

