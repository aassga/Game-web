<template>
  <div>
    <ul v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <span class="kefuw-left-01" @click="$goUserCen('recharge',0)">
        <a href="javascript:;" class="mobdm"></a>
      </span>
      <span class="kefuw-left-02" @click="goPage('#/home/about/4')">
        <a href="javascript:;" class="mobdm"></a>
      </span>
       <span class="kefuw-left-03" @click="godown">
        <a href="javascript:;" class="mobdm"></a>
    </span>
      <a class="close" @click="s1=false" href="javascript:;"></a>
    </ul>
    <ul v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <span class="kefuw-tit" @click="$openKefu">
        <a class="mobdm" :href="url" target="_blank" title="在线客服"></a>
      </span>
      <div class="twem" @click="gomessge"></div>
      <a class="close" @click="s2=false" href="javascript:;"></a>
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
        show_mobile: true,
        show_hongbao: true,
        url:""
      }
    },
    methods: {
      goPage(v){
        window.open(v,'_blank')
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
      godown(){
          window.open("/static/amvns/html/download/index.html")
      },
      gomessge(){
        if(localStorage.token){
            this.$goUserCen('message',1)
        }else{
          this.$store.commit('alert/newshowtip',{
              bool:true,
              title:'您还没有登录,请先登录',
              model:'',
              leftspan:false
          })
        }
      }
    },
    computed: {
      reloadeKefu () {
        return this.$store.state.home.reloadeKefu
      }
    },
    watch:{
      reloadeKefu:function(val){
        if(val){
          this.getUrl()
        }
      }
    },
    mounted () {
      this.getUrl();
      this.$addWindow(200);
    },
    created () {},
    store
  }
</script>

<style lang="less" scoped>
  .TplFloatSet {
    width: 119px;
    height: 272px;
    right: 10px;
    background: url(/static/amvns/img/kefuw-right.png) no-repeat;
    background-size:contain;
    z-index: 1000;

    .kefuw-tit {
      display: block;
      width: 100%;
      height: 209px;
      margin-bottom: 0px;

      a {
        &.mobdm {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .twem {
      width: 102px;
      height: 35px;
      margin-bottom: 14px;
      cursor: pointer;
    }

    .close,
    .kefu,
    .btn_reg,
    .wechat,
    .zhifubao,
    .qq,
    .bank {
      padding: 15px 50px;
      position: absolute;
      bottom: -6px;
      left: 8px;
    }

    .kefu {
      bottom: 304px;
    }

    .btn_reg {
      bottom: 270px;
    }

    .wechat {
      bottom: 228px;
    }

    .zhifubao {
      bottom: 188px;
    }

    .qq {
      bottom: 148px;
    }

    .bank {
      bottom: 112px;
    }
  }

  .TplFloatSet0 {
    width: 119px;
    height: 272px;
    left: 10px;
    z-index: 1000;
    background: url(/static/amvns/img/kefuw-left.png) no-repeat;
    background-size:contain;

  
    .kefuw-left-001{
      display: block;
      height: 34px;
      padding: 18px 8px 0 9px;
    }
    .kefuw-left-001:hover{
      cursor:pointer;
    }
    .kefuw-left-01{
      display: block;
      width: 100%;
      height: 37px;
      margin-top: 115px;
      cursor:pointer;
    }

    .kefuw-left-02 {
      display: block;
      width: 100%;
      height: 26px;
      margin-top: 28px;
      cursor:pointer;
      a {
        &.mobdm {
          display: block;
          width: 100%;
          height: 26px;
        }
      }
    }

    .kefuw-left-03 {
      display: block;
      width: 100%;
      height: 26px;
      margin-top: 9px;
      cursor:pointer;
      a {
        &.mobdm {
          display: block;
          width: 100%;
          height: 26px;
        }
      }
    }

    a {
      position: absolute;
    }

    .sign-in {
      width: 100%;
      height: 42px;
      top: 75px;
    }
  }

  
</style>
