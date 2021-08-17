<template>
  <div class="vp-activity">
    <div class="activity-content">
      <i class="sound"></i>
       <div style="height:40px" class="textBox">
          <simple-notice :text="ballList" :prizeOpen='prizeOpen'/>
      </div>
    </div>
  </div>

</template>

<script>
  import SimpleNotice from '../simple-notice-bar/simple-notice-bar.vue'
  import {postS,getS} from "@/service/public/service.js";
  export default {
    props: {
      text: {
        type: String,
        default: false
      }
    },
    components:{
       SimpleNotice 
    },
    data () {
      return {
        ballList: [],
        timer: {},
        timerLeft: '',
        notice: '',
        prizeList: [],
        activeIndex: 1,
        zIndex:100,
        myPrize:{},
        count:1,
        prizeIndex:"",
        prizeOpen:false,
        pool:[],
        poolData:{}
      }
    },
    methods: {
      async getLotteryJackpot(){
         let res = await getS(`/lotteryJackpot`,{lid:this.$route.meta.id})
         if( res && res.code == 200){
             this.ballList=res.data
         }
      },
    },
    created: function () {
      this.getLotteryJackpot();
    },
    mounted () {
    },
    computed:{
      prizePoolList() {
          return this.$store.state.mainState.prizePoolList
      },
      userinfo(){
         return this.$store.state.mainState.userinfo
      },
      prizePool() {
         return this.$store.state.mainState.prizePool
      },
      isNotice() {
         return this.$store.state.mainState.isNotice
      },
    },
    watch:{
      'prizePoolList':{
        handler:function(val){
            if(this.userinfo){
                if(this.ballList.length>40) this.ballList.splice(0,20)
                this.pool= this.prizePoolList.filter(item=>item.lotteryId==this.$route.meta.id)
                if(this.pool.length){
                  if(!this.ballList.length) this.ballList=this.pool
                  else this.ballList=this.ballList.concat(this.pool)
                }
            }
        },
        deep:true
      },
      'prizePool':function(val){ 
             this.poolData=val.data
       },
       'isNotice':function(val){
           if(val){
                if(this.poolData.lotteryId==this.$route.meta.id){
                    this.ballList.push(this.poolData)
                }
           }
       }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/less/public/var.less';
  .vp-activity {
    padding: 9px 23px;
    .activity-content {
      position: relative;
      background: #fbfafa;
      border-radius: 5px;
      font-size: 14px;
      color: #999;
      height: 40px;
      overflow: hidden;
      .sound {
        position: absolute;
        top: 8px;
        // font-size: 18px;
        // color: #FF0000;
        width: 27px;
        height: 24px;
        background: url('/static/public/image/sound.png');
        left: 16px;
      }
      .textBox {
        position: absolute;
        margin-left: 50px;
        display: inline-block;
        width: 1080px;
        // top: 3px;
        .scroll-content{
            position: relative;
            transition: top 0.6s cubic-bezier(0,0,1,1);
            li{
                 line-height: 40px;
                 text-align: left;
                 font-size:19px; 
                 margin-left:20px; 
            }
        }
      }
    }
  }
</style>
