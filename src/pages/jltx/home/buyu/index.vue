<template>
  <div class="buyu-wrap">
    <!-- <div class="banner">
       <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
    </div> -->
    <div class="banner">
      <banLantern :notice='notice' :siteName="'jltx'"></banLantern>
    </div>
    
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
export default {
  mixins:[secStyle],
  data() {
    return {
      notice: "/static/jltx/img/home/notice.png",
      headerImg: "/static/jltx/img/banner/by.jpg"
    };
  },
  methods: {},
  created: function() {},
  mounted() {},
  watch: {},
  components: {
    vpBuYu,
    banView,
    banLantern
  }
};
</script>

<style lang="less" scoped>
.buyu-wrap {
   background: #272727;
   margin: 0 auto;
   .banner{
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      position: relative;
      background: url('/static/jltx/img/banner/by.jpg') center top/ cover no-repeat;
   }
}

</style>
