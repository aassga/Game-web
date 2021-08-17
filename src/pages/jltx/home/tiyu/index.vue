<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <!-- <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView> -->
            <banLantern :notice='notice' :siteName="'jltx'"></banLantern>
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
import banLantern from "../../../public/game_new/banLantern.vue";
export default {
  data() {
    return {
      headerImg: "/static/jltx/img/banner/ty.jpg",
      notice: "/static/jltx/img/home/notice.png",
      themes:{
           name:"jltx_sport",
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
  margin: 0 auto;
  .banner {
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      position: relative;
      background: url('/static/jltx/img/banner/ty.jpg') center top/ cover no-repeat;
  }
  .box_bg {
    background: #272727;
    background-size:100% auto;
    margin-top:-22px;
  }
}
</style>

