<template>
    <div class="chessContainer">
        <div class="banner"></div>
        <div class="box_bg">
            <vp-Qipai :themes='themes' :gameType="'chess'"></vp-Qipai>
        </div>
    </div>
</template>
<script>
import vpQipai from "../../../public/gameSortV4/type_game.vue";
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern.vue";
import secStyle from "../secStyle.js";
export default {
  mixins:[secStyle],
  data() {
    return {
      // notice: "/static/478qp/img/home/notice.png",
      headerImg: "/static/vnso/img/carouel/qp.jpg"
    };
  },
  watch: {
    // $route(val,val2){
    //   if(val.path == '/home/chess' ){
    //     console.log(val2.query);
    //     console.log(val.query);
    //     this.$router.push('/home/chess?navid=9&id='+val2.query.id)
    //   }
    // }
  },
  methods: {},
  created() {},
  mounted() {},
  components: {
    vpQipai,
    banView,
    banLantern
  }
};
</script>
<style lang="less" scoped>
.chessContainer {
    background: #eaeaea url("/static/vnso/img/b3.png")repeat-y center top;  
    background-size:100% auto;
    margin: 0 auto;
  .banner {
    max-width: 1920px;
    height: 300px;
    margin: 0 auto;
    background: url('/static/vnso/img/carouel/qp.jpg') center top/ cover no-repeat;
    
  }
  .box_bg{
    // padding-top: 5px;
    // background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
    background-size:100% auto;
    padding-bottom: 5px;
  }
}
</style>
