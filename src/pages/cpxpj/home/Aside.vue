<template>
<div>
   <ul class="qy-service TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
    <li class="service" >
      <a class="kefu" :href="url" target="_blank">
      </a>
    </li>

    <li class="cs-mail">
      <div>
      </div>
      <div class="shrink">
        xpjtsyouxiang@gmail.com    
      </div>
    </li>
    
    <li class="Agency" @click="$router.push('/home/about/4')">
      <div>
      </div>
    </li>

    <li class="jiebei" @click="(advantageClick('tryplay'))">
      <div>
      </div>
    </li>

    <li class="gold_housekeeper" @click="gojgj">
      <div>
      </div>
    </li>

    <li class="download" @click="goDownload">
      <div>
        </div>
    </li>

    <li class="cs-goTop" @click="goTop">
      <div>
      </div>
    </li>

  </ul>
  <!-- <div class="new2019 animated fadeInUp mobile_auto" onclick="window.open('/static/cpxpj/html/active/pig2019/#')" v-if="showNew2019">
    <div class="clBtn clBtn1" @click.stop="hideNew2019"></div>
  </div> -->
</div>
 
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  // import $ from 'jquery'
  import store from '@/vuex/store'
  export default {
    data () {
      return {
        showNew2019:true,
        url:""
      }
    },
    methods: {
      async advantageClick(advanItem){
        if(advanItem=='tryplay'){
            //  window.open("/static/cpxpj/html/active/jiebei/index.html")
            if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                   }
            }else{
                  this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                });
         }
        }
        
      },
      gojgj(){
         window.open('/static/public/active/jgj/index_white.html')
      },
      goDownload(){
         window.open("/static/cpxpj/html/download/index.html")
      },
      goResiter () {
        this.$router.push('/home/register')
      },
     
      goTop () {
        let curr_top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let time_id = setInterval(()=>{

                curr_top -= 40;
                document.documentElement.scrollTop = curr_top;
                document.body.scrollTop = curr_top;  
                if(curr_top <= 0){
                    clearInterval(time_id);
                }
            } , 10);
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
    },
    mounted(){
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
  .qy-service {
    // position: absolute;;
    right: 20px;
    // z-index: 99;
    // top: 225px;
    li {
      position: relative;
      width: 65px;
      height: 65px;
      margin-bottom: 5px;
      border: 1px solid #a4b3d7;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
      background: -webkit-gradient(linear, left bottom, left top, from(#dee5fb), to(#fff));
      background: -webkit-linear-gradient(bottom, #dee5fb, #fff);
      background: -o-linear-gradient(bottom, #dee5fb, rgb(82, 81, 81));
      background: linear-gradient(0deg, #dee5fb, #fff);

      div {
        background-size: 100% 100%;
        height:65px;
        width:65px;
      }

      p {
        font-size: 14px;
        text-align: center;
        line-height: 1;
        color: inherit;;
      }
    }

    li:hover {
      background: url("/static/cpxpj/img/thirdparty/service-bg.png");
      border: unset;
    }

    .service {
      a{
        display: inline-block;
        height:65px;
        width:65px;
        background: url("/static/cpxpj/img/thirdparty/kefu.png");
      }
    }
    .by-service{
      div{
        background:url(/static/cpxpj/img/thirdparty/by-kefu.png)
      }
    }

    .cs-mail {
      div{
        background: url("/static/cpxpj/img/thirdparty/tousu.png");
      }
      .shrink {
        right: 70px;
        background: #fff;
        border: 2px solid #bb9a55;
        position: absolute;
        top: 0px;
        width: 195px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        display: none;
      }
    }

    .cs-mail:hover {
      .shrink {
        display: block;
      }
    }
    .Agency{
      div{
         background:url(/static/cpxpj/img/thirdparty/daili.png)
      }
    }
    .jiebei {
      div{
        background: url("/static/cpxpj/img/thirdparty/jiebei.png");
      }
    }

    .gold_housekeeper {
      div{
        background: url("/static/cpxpj/img/thirdparty/jinguanjia.png");
      }
    }

    .download{
      div{
        background: url("/static/cpxpj/img/thirdparty/download.png")
      }
    }

    .cs-goTop {
      div{
        background: url("/static/cpxpj/img/thirdparty/zhiding.png")
      }
    }
  }
  .new2019{
    position:fixed;
    z-index:9999;
    right:20px;
    bottom:30px;
    cursor:pointer;
    width: 230px;
    height: 230px;
    background-image: url('/static/cpxpj/img/new2019.gif');

    .clBtn{
      background: url('/static/cpxpj/img/new2019_close.png'); 
      z-index: 99999; 
      position: absolute; 
      width: 23px;
      height: 23px; 
      top: 0px;
      right: 0px; 
      display: none;
    }
    &:hover .clBtn{
      display: block;
    }
  }
</style>
