<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="bannerBox">
          <div class="banner"></div>
        </div>
        <!-- <banLantern :notice='notice' :siteName="'a99qp'"></banLantern> -->
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
      headerImg: "/static/99qp/img/carouel/ty.jpg",
      notice: "/static/99qp/img/home/notice.png",
      themes:{
           name:"a99q_new_sport",
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
    background: #eaeaea url("/static/99qp/img/b3.png")repeat-y center top;  
    background-size:100% auto;
    margin: 0 auto;
    .bannerBox{
      background: linear-gradient(to top, #e0e9fc, #fbfbff);;
    }
  .banner {
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/99qp/img/carouel/ty.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    margin-top: -20px;
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
  }
}
</style>

