<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg" :picBox='255' isScale='true'></banView>
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
      headerImg: "/static/betnew/img/new_games/banner/fish.jpg"
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
  margin: 0 auto;
}
.box_bg {
    background:#252525;
    background-size: 100% auto;
    padding-bottom: 5px;
  }
</style>
