<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'fhcp'"></banLantern>
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import banLantern from "../../../public/game_new/banLantern.vue";
import vpSport from '../../../public/gameSortV4/type_sport_cp';
export default {
  data() {
    return {
      headerImg: "/static/fhcp/img/about-banner.jpg",
      notice: "/static/fhcp/img/home/notice.png",
      themes:{
           name:"fhcp",
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
    width: 1200px;
    margin: 0 auto;
    background-size:100% auto;
    padding: 50px 0 30px 0;
  }
}
</style>

