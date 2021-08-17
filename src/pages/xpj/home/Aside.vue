<template>
  <div>
    <div v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <div class="dial" @click="gojibei"></div>
      <div class="person" @click="goJgj"></div>
      <div class="chongzhi" @click="$goUserCen('recharge',0)"></div>
      <div class="newclose" @click="s1 = false"></div>
    </div>
    <div v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
      <a class="kefu" :href="url" target="_blank"></a>
      <div class="huiyuan"  @click="goLink"></div>
      <div class="zhifu">
          <span class='koukou' @click="$goUserCen('recharge',1)"></span>
          <span class='weixin'  @click="$goUserCen('recharge',1)"></span>
          <span class='zhifubao' @click="$goUserCen('recharge',1)"></span>
      </div>
      <div class="jiance" @click="goXl"></div>
      <div class="newclose" @click="s2 = false"></div>

      <div class="codeBox" style="    position: absolute;
                left: 16px;
                bottom: 29px;
                background: #fff;
                padidng: 5px;
                padding: 5px;
                height: 110px;
                width: 110px;
                text-align: center;">
         <div class="QR-code" ref="qr-code"
         style="
             width: 100px;
            display: inline-block;
            margin-left: 5px;">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
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
      goXl(){
          window.open('http://X9970.com','_blank')
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
      gojibei(){
         if(localStorage.token){
              if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                   }
            }else{
                   this.$store.commit('alert/showTipModel',{
                    bool:true,
                    title:'您还没有登录,请先登录。',
                    model:'warn'
                  })
         }
      },
      goJgj(){
        window.open('/static/public/active/jgj/index.html','_blank')
        // if(!localStorage.token||!localStorage.userinfo){
        //   this.$store.commit('alert/showTipModel',{
        //     bool:true,
        //     title:'您还没有登录,请先登录。',
        //     model:'warn'
        //   })
        // }else{
        //   window.open('/static/xpj/html/active/sxjgj/index.html','_blank')
        // }
        
      },
      goLink(){
        this.$router.push('/home/register')
      }
    },
    mounted () {
      this.getUrl()
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
        reloadeKefu:function(val){
            if(val){
            this.getUrl()
            }
        }
    },
    created () {

    }
  }
</script>

<style lang="less" scoped>
   .TplFloatSet {
    right: 10px;
    width: 143px;
    height:382px;
    background: url("/static/xpj/img/right12.gif") no-repeat left top;
    .kefu{
      height: 72px;
      display: inline-block;
      width: 100%;
    }
    div {
      position: absolute;
      width: 100%;
      left: 0;
      cursor:pointer;
      &.kefu{
        height: 73px;
      }
      &.dial{
        top:0;
        height:70px;
      }
      &.chongzhi{
        bottom:24px;
        height:90px;
      }
      &.person{
        top:70px;
        height:93px;
      }
      &.huiyuan{
        top: 73px;
        height: 40px;
        cursor: pointer;
        overflow: hidden;
      }

       &.zhifu{
        top: 113px;
        height: 40px;
        cursor: pointer;
        span{
        
          height: 40px;
          display: block;
          float: left;
        }
        span:nth-child(1){
           width: 50px;

        }
         span:nth-child(2){
           width: 40px;
           
        }
         span:nth-child(3){
           width: 50px;
           
        }
      }
      &.jiance{
        top: 155px;
        height: 56px;
      }
      &.newclose {
        height: 24px;
        bottom: 0;
        cursor:pointer;
      }
    }
  }

  .TplFloatSet0 {
    left: 10px;
    background: url("/static/xpj/img/left12.gif") no-repeat left top;
  }
</style>
