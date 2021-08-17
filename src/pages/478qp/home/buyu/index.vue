<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg" :picBox='342'></banView>
    </div>
    <banLantern :notice='notice' :siteName="'a478qp'"></banLantern>
    <div class="box_bg">
        <vp-Bu-Yu :themes='themes' :gameType="'fish'"></vp-Bu-Yu>
    </div>
  </div>
</template>
<script>
import vpBuYu from "../../../public/game_new/type_game.vue";
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
export default {
  mixins:[secStyle],
  data() {
    return {
      notice: "/static/478qp/img/home/notice.png",
      headerImg: "/static/478qp/img/buyu/fish.jpg"
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
   .box_bg{
     margin-top: 35px;
   }
}

</style>
