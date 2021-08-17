<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='342'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'a478qp'"></banLantern>
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpSport from '../../../public/game_new/type_sport';
import banLantern from "../../../public/game_new/banLantern.vue";
export default {
  data() {
    return {
      headerImg: "/static/478qp/img/banner/sports-banner.jpg",
      notice: "/static/478qp/img/home/notice.png",
      themes:{
           name:"a478qp_sport",
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
    position: relative;
    opacity: 1;
    img {
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .box_bg {
    background: #272727;
    background-size:100% auto;
    padding-top: 20px; 
  }
}
</style>

