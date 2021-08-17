.
<template>
  <div>
    <ul v-if="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/tycjt/img/home/left.png" alt="">
        <div class="navGroup">
          <span @click="$router.push('/home/slot?navid=9&id=0')"></span>
          <span @click="$router.push('/home/chess?navid=9&id=0')"></span>
          <span @click="goToLottery"></span>
        </div>
        <a href="javascript: void(0)" class="mg" @click="$router.push('/home/slot?navid=9&id=10022')"></a>
        <a href="javascript: void(0)" class="cq9" @click="$router.push('/home/slot?navid=9&id=10018')"></a>
        <a href="javascript: void(0)" class="jdb" @click="$router.push('/home/slot?navid=9&id=10021')"></a>
        <a href="javascript: void(0)" class="by" @click="$router.push('/home/fish?navid=9&id=0')"></a>
        <a href="javascript: void(0)" class="ky" @click="$router.push('/home/chess?navid=9&id=10042')"></a>
        <a href="javascript: void(0)" class="close" @click="s1=false"></a>
    </ul>
    <ul v-if="s2" class="TplFloatSet1 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/tycjt/img/home/right.png" alt="" style="display: block;">
       <!-- <a href="javascript: void(0)" class="kf1" @click="kefuFc"></a>
       <a href="javascript: void(0)" class="kf2" @click="kefuFc"></a>
       <a href="javascript: void(0)" class="app"></a>
       <a href="javascript: void(0)" class="line"></a>
       <a href="javascript: void(0)" class="yh" @click="$router.push('/home/youhui')"></a> -->
       <a :href="url" target="_blank" class="kefu" ></a>
       <a href="javascript: void(0)" class="log" @click="goKaihu"></a>
       <div href="javascript: void(0)" class="qrcode" ref="qrcode"></div>
       <a href="javascript: void(0)" class="close" @click="s2=false"></a>
    </ul>
    
  </div>

</template>

<script>
  import store from '@/vuex/store'
  export default {
    data () {
      return {
        s1: true,
        s2: true,
        url:""
      }
    },
    methods: {
      goKaihu(){
        if(!localStorage.token || !localStorage.userinfo){
          this.$store.commit('alert/showMgmRegister', true);
        }
        
      },
      getUrl(){
        let service = JSON.parse(localStorage.config).service;
        if (service) {
          let ser = service.find(item => item.status === 'on')
          if (ser) {
            this.url = ser.url
          }
        }
        this.$store.commit('home/reloadeKefu',false)
      },
      goToLottery(){
        window.open('#/plays/hall')
      },
      
    },
    mounted () {
      this.getUrl();
      this.$addWindow();
      // this.createDownloadQRCode({
      //   el: this.$refs['qrcode'],
      //   url: window.location.origin + '/m#/download',
      //   size: 101
      // })
    },
    computed: {
      reloadeKefu () {
        return this.$store.state.home.reloadeKefu
      }
    },
    watch:{
        '$route.path':function(val){
            var nodeitem = document.getElementsByClassName('TplFloatPic_1')[0]
            var nodeitem1 = document.getElementsByClassName('TplFloatPic_1')[1]
            nodeitem.style.top = 170 + 'px'
            nodeitem1.style.top = 170 + 'px'
        },
        reloadeKefu:function(val){
          if(val){
            this.getUrl()
          }
        }
    },
    
    store
  }
</script>

<style lang="less" scoped>

  .TplFloatSet0 {
    left: 18px;
    .navGroup{
      display: inline-block;
      flex-wrap: nowrap;
      position: absolute;
      width: 90%;
      left: 9px;
      top: 11px;
      span{
        width: 31%;
        height: 24px;
        cursor: pointer;
        display: inline-block;
      }
    }
    a {
      position: absolute;
      width: 150px;
      height: 45px;
      left: 0px;
    }
    .mg{
      top: 137px;
    
    }
    .cq9{
      top:187px;
    }
    .jdb{
      bottom:128px;
    }
    .by{
      bottom:81px;
    }
    .ky{
      bottom:31px;
    }
    
    .close{
      width: 95px;
      height: 25px;
      position: absolute;
      bottom: 2px;
      left: 28px;
    }
  }
   .TplFloatSet1{
     right: 18px;
    a {
      position: absolute;
      width: 150px;
      height: 50px;
      left: 0;
    }
    .kefu{
      width: 150px;
      height: 80px;
      top:0;
      &:hover{
        cursor: pointer;
      }
    }
    .log{
      width: 150px;
      height: 40px;
      top: 80px;
      &:hover{
        cursor: pointer;
      }
    }
    .qrcode{
      display: inline-block;
      height: 100px;
      width: 100px;
      position: absolute;
      bottom: 13px;
      left: 18px;
      margin: 5px auto;
    }
    .kf1{
      top:86px;
    }
    .kf2{
      top:136px;
    }
    .app{
      top:186px;
    }
    .line{
      top:236px;
    }
    .yh{
      top:286px;
    }
    .close{
      width: 95px;
      height: 25px;
      position: absolute;
      bottom: 2px;
      left: 28px;
    }
  }
</style>
