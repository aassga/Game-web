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
        headerImg:"/static/wycp/img/carouel/zr.jpg",
        params: '',
        clicked:true,
        key: '',
        themes:{
          name:'wycp'
        },
        liveDatas:[]
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
  .banner{
    margin-bottom: 40px;
  }
  .homeLive-wrap {
    background: #000 url(/static/wycp/img/bg_promotions.jpg) center top no-repeat;
    padding: 20px 0;
  }
</style>

