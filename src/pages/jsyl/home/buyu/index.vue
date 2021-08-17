<template>
  <div class="buyu-wrap">
    <div class="banner">
       <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
    </div>
    <banLantern :notice='notice' :siteName="'jsyl'"></banLantern>
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
      notice: "/static/jsyl/img/home/notice.png",
      headerImg: "/static/jsyl/img/fish.jpg"
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
