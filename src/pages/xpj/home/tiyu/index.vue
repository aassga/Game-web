<template>
    <div class="sports" style="margin-top:-20px">
       <div class="sportContainer">
        <!-- <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div> -->
        <!-- <banLantern :notice='notice' :siteName="'jsyl'"></banLantern> -->
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import vpSport from '../../../public/gameSortV4/type_sport.vue';
import banLantern from "../../../public/game_new/banLantern.vue";
export default {
  data() {
    return {
      headerImg: "/static/xpj/img/new_games/banner/sports.jpg",
      notice: "/static/xpj/img/home/notice.png",
      themes:{
           name:"xpj_sport",
           width:"1000"
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
    background: url("/static/xpj/img/home/b3.png") center 0 no-repeat,#122253;
    background-size:100% auto;
  }
}
</style>

