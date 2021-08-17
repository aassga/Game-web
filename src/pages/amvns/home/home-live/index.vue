<template>
  <div class="homeLive-wrap" >
    <div class="live" >
      <div class="banner">
          <banView :headerImg="headerImg"></banView>
      </div>
      <div class="banner-cpyx">
      </div>
      <div class="live_content" :class="{night:colorbool}">
        
        <liveGame :themes="themes"></liveGame>
      </div> 
    </div>
  </div>
</template>
<script>
  import { _SetGet, _SetPost } from '@/service/public/service.js'
  import banView from "../../../public/game_new/banView.vue";
  import liveGame from "../../../public/gameSortV4/type_live_cp.vue";
  export default {
    data () {
      return {
        headerImg:"/static/amvns/img/carouel/zr.jpg",
        params: '',
        clicked:true,
        key: '',
        themes:{
          name:'amvns'
        },
        liveDatas: []
      }
    },
    methods: {},
    created: function (){},
    mounted () {},
    watch: {},
    components: {
      banView,
      liveGame
    },
    computed:{
      colorbool(){
        return this.$store.state.mainState.color
      },
    }

  
  }
</script>

<style lang="less" scoped>
.homeLive-wrap{
  background: #eaeaea url(/static/amvns/img/live/image_2019_02_18T01_12_35_435Z.png) repeat-y bottom;
  background-size:100% auto;
  padding-bottom: 15px;
  .banner{
    margin-bottom: 40px;
  }
}

</style>

