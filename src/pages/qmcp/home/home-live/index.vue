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
        headerImg:"/static/qmcp/img/carouel/zr.png",
        params: '',
        clicked:true,
        key: '',
        themes:{
          name:'qmcp'
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
   background: #b62929;
  .banner{
    margin-bottom: 40px;
  }
}

</style>

