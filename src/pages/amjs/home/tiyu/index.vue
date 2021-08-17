<template>
    <div class="sports">
       <div class="sportContainer">
        <div class="banner">
           <vp-register class="registerBox"></vp-register>
            <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
        </div>
        <banLantern :notice='notice' :siteName="'amjs'"></banLantern>
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
import vpRegister from '../../admin/nregister';
export default {
  data() {
    return {
      headerImg: "/static/amjs/img/ty.jpg",
      notice: "/static/amjs/img/home/notice.png",
      themes:{
           name:"amjs_sport",
           width:"1000"
      }
    };
  },
  components: {
    vpRegister,
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
      .registerBox {
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
    }
    img {
      width: 100%;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .box_bg {
    margin-top: 36px;
    background: #272727;
    background-size:100% auto;
    // padding-bottom:15px; 
     background: #1e1e1e url("/static/amjs/img/bg.jpg") no-repeat center top;
     background-size:100% auto;
     .tiyu{
       padding-top: 10px !important;
     }
  }
}
</style>

