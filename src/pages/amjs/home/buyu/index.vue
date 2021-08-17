<template>
  <div class="buyu-wrap">
    <div class="banner">
       <vp-register class="registerBox"></vp-register>
       <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
    </div>
    <banLantern :notice='notice' :siteName="'amjs'"></banLantern>
    <div class="box_bg">
        <vp-Bu-Yu :themes='themes' :gameType="'fish'"></vp-Bu-Yu>
    </div>
  </div>
</template>
<script>
import vpBuYu from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
import vpRegister from '../../admin/nregister';
export default {
  mixins:[secStyle],
  data() {
    return {
      notice: "/static/amjs/img/home/notice.png",
      headerImg: "/static/amjs/img/fish.jpg"
    };
  },
  methods: {},
  created: function() {},
  mounted() {},
  watch: {},
  components: {
    vpBuYu,
    banView,
    banLantern,
    vpRegister

  }
};
</script>

<style lang="less" scoped>
.buyu-wrap {
   background: #272727;
   margin: 0 auto;
   .banner{
       position: relative;
        .registerBox {
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
    }
   }
   .box_bg{
     margin-top: 35px;
     background: #1e1e1e url("/static/amjs/img/bg.jpg") no-repeat center top;
     background-size:100% auto;
   }
}

</style>
