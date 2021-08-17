<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner"></div>
        <!-- <banLantern :notice='notice' :siteName="'a478qp'"></banLantern> -->
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpSport from '../../../public/gameSortV4/type_sport';
import banLantern from "../../../public/game_new/banLantern.vue";
export default {
  data() {
    return {
      headerImg: "/static/vnso/img/carouel/ty.jpg",
      notice: "/static/478qp/img/home/notice.png",
      themes:{
           name:"vnso_sport",
           width:"1200"
      }
    };
  },
  components: {
    banView,
    vpSport,
    banLantern
  }
};
</script>
<style lang="less" scoped>

.sportContainer {
    background: #eaeaea url("/static/vnso/img/b3.png")repeat-y center top;  
    background-size:100% auto;
    margin: 0 auto;
  .banner {
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/vnso/img/carouel/ty.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    margin-top: -20px;
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
  }
}
</style>

