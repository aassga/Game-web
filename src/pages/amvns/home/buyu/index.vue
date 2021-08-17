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
      headerImg: "/static/amvns/img/carouel/by.jpg"
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
   background: #eaeaea url(/static/amvns/img/live/image_2019_02_18T01_12_35_435Z.png) repeat-y bottom;
   background-size:100% auto;
}
</style>
