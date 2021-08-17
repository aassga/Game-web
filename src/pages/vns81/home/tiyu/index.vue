<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'vns81'"></banLantern>
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
      headerImg: "/static/vns81/img/about-banner.jpg",
      notice: "/static/vns81/img/home/notice.png",
      themes:{
           name:"vns81_sport",
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
    margin-top: 20px;
    background: #272727;
    background-size:100% auto;
    // padding-bottom:15px; 
  }
}
</style>

