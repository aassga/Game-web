<template>
  <div>
    <div v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:200px;transition:all ease .3s">
      <a @click="$goUserCen('recharge',1)" class="wechat" href="javascript:;"></a>
      <a @click="$goUserCen('recharge',1)" class="zhifubao" href="javascript:;"></a>
      <a @click="$goUserCen('recharge',1)" class="qq" href="javascript:;"></a>
      <!-- <a href="javascript:;"  class="hongbaoyu"></a> -->
      <a href="javascript:;" @click="$goUserCen('message',1)" class="tousu"></a>
      <!-- <a href="http://666cpzj.com" target="_blank" class="beiyong"></a> -->
      <a href="http://666cpzj.com" target="_blank" class="jinguanjia"></a>
      <a class="close" @click="s1=false" href="javascript:;"></a>
    </div>
    <div v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:200px;transition:all ease .3s">
      <a :href="url" target="_blank" class="kefu1"></a>
      <a :href="url" target="_blank" class="kefu2"></a>
      <a class="close" @click="s2=false" href="javascript:;"></a>
      <!-- <a href="javascript:;" @click="$goUserCen('message',1)" class="tousu"></a> -->
    </div>
    <div class="tip" v-show="s3">
      <a href="/static/cpzj/html/active/czjhb/index.html">
         <img src="/static/cpzj/img/redb.gif"/>
      </a>
     
      <span class="fa fa-fw fa-close" @click="s3 = false"></span>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  export default {
    data () {
      return {
        s1: true,
        s2: true,
        s3: true,
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
    },
    mounted () {
      this.getUrl();
      this.$addWindow(200);
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
  }
</script>

<style type="text/less" lang="less" scoped>
  .tip {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 230px;
    height: 230px;
    z-index: 1000;

    img {
      width: 100%;
      height: 100%;
    }
    .fa {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      font-weight: 700;

      &:hover {
        color: #f13131;
      }
    }
  }

  .TplFloatSet {
    right: 18px;
    width: 127px;
    height: 298px;
    background-size: 100% 100% !important;
    background: url("/static/cpzj/img/online-right3.png") no-repeat;

    a{
      display: inline-block;
      position: absolute;
      height: 24px;
      width: 100%;
      left: 0;

      &.wechat{
        top:90px;
      }
       &.zhifubao{
        top:125px;
      }
       &.qq{
        top:165px;
      }
       &.hongbaoyu{
        top:182px;
      }
      &.beiyong{
        top:213px;
      }
      &.jinguanjia{
        top:237px;
      }
      &.kefu1{
        top: 192px;
      }
      &.kefu2{
        top:233px;
      }
      &.tousu{
        top:202px;
      }
   
      &.close {
        bottom: 0;
      }
    }

   

    
  }

  .TplFloatSet0 {
    left: 18px;
    background: url("/static/cpzj/img/online-left.png") no-repeat;
  }
</style>
