<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
            <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
        </div>
        <!-- <banLantern :notice='notice' :siteName="'qxcp'"></banLantern> -->
        <div class="box_bg">
            <vpSport :theme="themes" :tiyuType="'tiyu'"></vpSport>
        </div>
       </div>
    </div>
</template>
<script>
import banView from "../../../public/game_new/banView.vue";
import banLantern from "../../../public/game_new/banLantern.vue";
import vpSport from '../../../public/gameSortV4/type_sport';
export default {
  data() {
    return {
      headerImg: "/static/qxcp/img/new_games/banner/ty.jpg",
      notice: "/static/qxcp/img/home/notice.png",
      themes:{
           name:"qxcp_sport",
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
    // margin-top: 20px;
    background: #272727;
    background-size:100% auto;
  }
}
</style>

