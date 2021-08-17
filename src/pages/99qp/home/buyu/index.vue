<template>
  <div class="buyu-wrap">
    <div class="bannerBox">
      <div class="banner"></div>
      
    </div>
    <div class="box_bg">
        <vp-Bu-Yu :themes='themes' :gameType="'fish'"></vp-Bu-Yu>
    </div>
  </div>
</template>
<script>
import vpBuYu from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView";
import secStyle from "../secStyle.js";
export default {
  mixins:[secStyle],
  data() {
    return {
      headerImg: "/static/99qp/img/carouel/by.jpg"
    };
  },
  methods: {},
  created: function() {},
  mounted() {},
  watch: {},
  components: {
    vpBuYu,
    banView
  }
};
</script>

<style lang="less" scoped>
.buyu-wrap {
   padding-bottom:1px; 
    background: #eaeaea url("/static/99qp/img/b3.png")repeat-y center top;  fbfbff
    background-size:100% auto; 
    .bannerBox{
      background: linear-gradient(to top, #e0e9fc, #fbfbff);;
    }
   .banner{
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      background: url('/static/99qp/img/carouel/by.jpg') center top/ cover no-repeat;
   }
}
.box_bg {
  }
</style>
