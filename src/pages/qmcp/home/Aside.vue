<template>
  <div>

    <div v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/qmcp/img/aside_left.png" alt="">
      <a href="/static/public/active/jgj/index.html" class="jgj" target="_blank"></a>
      <a href="/static/qmcp/html/active/opportunity/index.html" class="dzp" target="_blank"></a>
      <a class="close" @click="s1=false" href="javascript:;"></a>
    </div>
    <div v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <img src="/static/qmcp/img/aside_right.png" alt="">

      <a class="kefu" :href="url" target="_blank"></a>
      <a href="javascript:;" class="idea" @click="gomessge"></a>
      <a class="close" @click="s2=false" href="javascript:;"></a>
    </div>
  </div>

</template>

<script>
  import store from '@/vuex/store'
  // import $ from 'jquery'

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
      gomessge(){
        if(localStorage.token){
            this.goUserCen('message',1)
        }else{
          // alert("请先登录")
          this.$store.commit('alert/showTipModel',{
              bool:true,
              title:'请先登录',
              model:'warn'
          })
        }
      }
    },
    mounted () {
      this.getUrl()
      this.$addWindow()
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
    store
  }
</script>

<style lang="less" scoped>
  .TplFloatSet {
    // position: absolute;
    // cursor: pointer;
    // z-index: 1000;
    // top: 170px;
    right: 18px;
    width: 119px;

    .kefu,
    .btn_reg,
    .wechat,
    .zhifubao,
    .qq,
    .bank,
    .webs {
      // background: RED;
    }

    .kefu {
      bottom: 88px;
    }

    .btn_reg {
      bottom: 130px;
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

    .webs {
      bottom: 80px;
    }

    .jgj {
      position: absolute;
      left: 0;
      bottom: 58px;
      width: 119px;
      height: 31px;
    }

    .kefu {
      position: absolute;
      left: 0;
      bottom: 78px;
      width: 119px;
      height: 31px;
    }
    .idea{
      position: absolute;
      left: 0;
      bottom: 40px;
      width: 119px;
      height: 31px;
    }
    .dzp {
      position: absolute;
      left: 0;
      bottom: 26px;
      width: 119px;
      height: 31px;
    }

    .close {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 119px;
      height: 20px;
    }
  }

  .TplFloatSet0 {
    left: 18px;
  }
</style>
