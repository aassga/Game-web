<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg"></banView>
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
      headerImg: "/static/ybcp/img/carouel/by.jpg"
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
   background: url("/static/ybcp/img/home/bg_banner.23dee41.jpg") top repeat-y,#f3f2ef;
   background-size:100% auto;
}
</style>
