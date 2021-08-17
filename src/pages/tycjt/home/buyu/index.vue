<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
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
      headerImg: "/static/tycjt/img/by.jpg"
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
    background: url('/static/tycjt/img/new_games/fish_bg.png') no-repeat,#121212;
    background-size: 100% auto;
    padding-bottom: 5px;
  }
</style>
