.
<template>
  <div>
    <ul v-if="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/amxpj/img/new_games/l.gif" alt="">
       <a href="javascript: void(0)" class="ky" @click="$router.push('/home/chess?navid=9&id=10042')"></a>
       <a href="javascript: void(0)" class="ly" @click="$router.push('/home/chess?navid=9&id=10612')"></a>
       <a href="javascript: void(0)" class="th" @click="$router.push('/home/chess?navid=9&id=10694')"></a>
       <a href="javascript: void(0)" class="jdb" @click="$router.push('/home/fish?navid=9&id=10054')"></a>
       <a href="javascript: void(0)" class="mg" @click="$router.push('/home/slot?navid=9&id=10022')"></a>
       <a href="javascript: void(0)" class="close" @click="s1=false"></a>
    </ul>
    <ul v-if="s2" class="TplFloatSet1 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/amxpj/img/new_games/r.gif" alt="">
       <a :href="url" target="_blank" class="kf1" ></a>
       <a href="javascript: void(0)" class="kf2"  @click="$router.push('/home/youhui')"></a>
       <a href="javascript: void(0)" class="app" @click="godown"></a>
       <a href="javascript: void(0)" class="line" @click='golink'></a>
       <a href="javascript: void(0)" class="yh" @click="$router.push('/home/youhui')"></a>
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
      godown(){
        window.open("/static/amxpj/html/download/index.html")
      },
      golink(){
        window.open("http://748.com")
      }
    },
    mounted () {
      this.getUrl();
      this.$addWindow()
      this.createDownloadQRCode({
        el: this.$refs['qr-code'],
        url: window.location.origin + '/m#/download',
        size: 100
      })
    },
    computed: {
      reloadeKefu () {
        return this.$store.state.home.reloadeKefu
      }
    },
    watch:{
      '$route':function(val){
        var nodeitem = document.getElementsByClassName('TplFloatPic_1')[0]
        var nodeitem1 = document.getElementsByClassName('TplFloatPic_1')[1]
        if(nodeitem) nodeitem.style.top = 170 + 'px'
        if(nodeitem1)  nodeitem1.style.top = 170 + 'px'
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
    a {
      position: absolute;
      width: 150px;
      height: 50px;
      left: 0;
    }
    .ky{
      top:86px;
    }
    .ly{
      top:136px;
    }
    .th{
      top:186px;
    }
    .jdb{
      top:236px;
    }
    .mg{
      top:286px;
    }
    .close{
       width: 100px;
       height: 23px;
       position: absolute;
       bottom: 4px;
       left:30px;
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
       width: 100px;
       height: 23px;
       position: absolute;
       bottom: 4px;
       left:30px;
    }
  }
</style>
