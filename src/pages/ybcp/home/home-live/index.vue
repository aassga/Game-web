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
        headerImg:"/static/ybcp/img/carouel/zr.jpg",
        params: '',
        clicked:true,
        key: '',
        themes:{
          name:'ybcp'
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
  background: url("/static/ybcp/img/home/bg_banner.23dee41.jpg") no-repeat top #ebebeb;
  background-size:100% auto;
  padding-bottom: 15px;
  .banner{
    margin-bottom: 40px;
  }
}

</style>

