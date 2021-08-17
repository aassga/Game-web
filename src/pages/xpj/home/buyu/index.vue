<template>
  <div class="buyu-wrap">
    <!-- <div class="banner">
       <banView :headerImg="headerImg" :picBox='350' isScale='true'></banView>
    </div> -->
    <!-- <banLantern :notice='notice' :siteName="'jsyl'"></banLantern> -->
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
      notice: "/static/xpj/img/home/notice.png",
      headerImg: "/static/xpj/img/fish.jpg"
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
   margin: 0 auto;
   .box_bg{
     margin-top: 2px;
     background: url("/static/xpj/img/home/b3.png") center 0 no-repeat,#122253;
     background-size:100% auto;
     padding-bottom: 5px;
   }
}

</style>
