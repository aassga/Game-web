<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg" isScale='true' :picBox='400'></banView>
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
      headerImg: "/static/cpxpj/img/carouel/by.jpg"
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
   background: url("/static/cpxpj/img/index-main-bg-1.png") repeat-y center top;
   background-size:100% auto;
}
.box_bg {
  }
</style>
