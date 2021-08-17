<template>
  <div class="homeLive-wrap" >
    <div class="live" >
      <div class="banner">
          <banView :headerImg="headerImg" :picBox="300" isScale='true'></banView>
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
        headerImg:"/static/cjw/img/shixun.png",
        params: '',
        clicked:true,
        key: '',
        themes:{
          name:'cjw'
        },
        liveDatas: 
        [
        //   {name: 'AG视讯厅',clicked:"left",text:"美女主播 热线传情", platform: 'live_casino', id: '31', class: 'ag',logoSrc:"/static/t111/img/live/log_ag.png",rightImgSrc:"/static/t111/img/live/img_ag1.png"},
        //   {name: 'BBIN视讯厅',clicked:"left",text:"独特界面 畅游娱乐",  platform: 'live_casino', id: '32', class: 'bb',logoSrc:"/static/t111/img/live/log_bbin.png",rightImgSrc:"/static/t111/img/live/img_bbin.png"},
        //   {name: 'BG视讯厅',clicked:"left",text:"众多美女 陪你畅游",  platform: 'live_casino', id: '3180', class: 'bg',logoSrc:"/static/t111/img/live/log_bg.png",rightImgSrc:"/static/t111/img/live/right_img.png"},
        //   {name: 'DG视讯厅',clicked:"left",text:"美女主播 热线传情",  platform: 'live_casino', id: '42', class: 'dg',logoSrc:"/static/t111/img/live/log_dg.png",rightImgSrc:"/static/t111/img/live/img_dg.png"},
        //   {name: 'DS视讯厅',clicked:"left",text:"业界顶尖 奢华娱乐",  platform: 'live_casino', id: '34', class: 'ds',logoSrc:"/static/t111/img/live/log_ds.png",rightImgSrc:"/static/t111/img/live/img_ds.png"},
        //   // {name: 'LEBO视讯厅',clicked:"left",text:"众多美女 陪你畅游", platform: 'live_casino', id: '44', class: 'lebo',logoSrc:"/static/t111/img/live/log_lebo.png",rightImgSrc:"/static/t111/img/live/img_lebo.png"},
        //   {name: 'OG视讯厅',clicked:"left",text:"口碑良好 欢乐无限",  platform: 'live_casino',id: '48', class: 'og',logoSrc:"/static/t111/img/live/log_og.png",rightImgSrc:"/static/t111/img/live/img_og.png"},
        //   {name: 'eBET视讯厅',clicked:"left",text:"画质高清 界面高贵",  platform: 'live_casino',id: '43', class: 'ebet',logoSrc:"/static/t111/img/live/log_ebet.png",rightImgSrc:"/static/t111/img/live/img_ebet.png"},
        //   {name: 'LMG视讯厅',clicked:"left",text:"知名顶级 极致博彩",  platform: 'live_casino', id: '45', class: 'lmg',logoSrc:"/static/t111/img/live/log_lmg.png",rightImgSrc:"/static/t111/img/live/img_lmg.png"},
        //  {name: '欧博视讯厅',clicked:"left",text:"挑选好路 直接投注",  platform: 'live_casino', id: '46', class: 'ob',logoSrc:"/static/t111/img/live/log_ob.png",rightImgSrc:"/static/t111/img/live/img_ob.png"},
        // {name: 'SA视讯厅',clicked:"left",text:"众多美女 陪你畅游",  platform: 'live_casino', id: '49', class: 'sa',logoSrc:"/static/t111/img/live/log_sa.png",rightImgSrc:"/static/t111/img/live/img_sa.png"},
        //   {name: 'VR彩票',clicked:"left",text:"高清画质 专业VR",  platform: 'vr_lottery', id: '30', class: 'vr',logoSrc:"/static/t111/img/live/log_vr.png",rightImgSrc:"/static/t111/img/live/img_vr.png"}
        ]
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
  background: #eaeaea url("/static/public/image/game/ptgame/slotGame_bg1.png") repeat-y center top;
  background-size:100% auto;
  padding-bottom: 15px;
  .banner{
      margin-bottom: 40px;
  }
}
  
</style>

