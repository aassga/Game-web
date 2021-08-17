<template>
  <div>
    <ul class="qy-service TplFloatPic_1">
      <li class="service">
        <a class="kefu" :href="url" target="_blank"></a>
      </li>
      <li class="cs-mail" @click="goQq">
        <div>

        </div>
      </li>
      <li class="cs-mail-phone">
        <div>
        </div>
        <div class="downloadcode" style="padding:5px 8px 10px 8px;box-sizing:content-box;background:#fff;">
          <!--        <img src="/static/ybcp/img/code.png" alt="">-->
          <div style="width: 128px; height: 128px" ref="qr-code"></div>
          <div style="font-size:14px;padding:5px 0">APP扫码下载</div>
        </div>

      </li>
      <li class="cs-goTop" @click="goTop">
        <div>

        </div>

      </li>

    </ul>
    <!--<div class="new2019 animated fadeInUp mobile_auto" onclick="window.open('/static/ybcp/html/active/pig2019/#')" v-if="showNew2019">
      <div class="clBtn clBtn1" @click.stop="hideNew2019"></div>
    </div>-->
  </div>

</template>

<script>
  import UserService from '@/service/public/UserService.js'
  export default {
    data () {
      return {
        showNew2019: true,
        url:""
      }
    },
    mounted () {
      this.getUrl()
      this.$addWindow()
      this.createDownloadQRCode({
        el: this.$refs['qr-code'],
        url: window.location.origin + '/m#/download',
        size: 128
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
      
      goQq () {
        window.open('http://yb22q.com')
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
      hideNew2019 () {
        this.showNew2019 = false
      }

    }
  }
</script>

<style lang="less" scoped>
  .qy-service {
    position: absolute;
    right: 20px;
    z-index: 99;
    top: 212px;
     transition:all ease .3s;
    li {
      position: relative;
      width: 50px;
      height: 50px;
      background-color: #fff;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      div {
        height: 52px;
        text-align: center;
      }

      p {
        font-size: 14px;
        text-align: center;
      }
    }

    li:first-child > a {
      display: inline-block;
      height: 52px;
      width: 52px;
      background: url("/static/ybcp/img/thirdparty/11.png") no-repeat center;
      background-size: cover;
    }

    li:first-child > a:hover {
      display: inline-block;
      height: 52px;
      width: 52px;
      background: url("/static/ybcp/img/thirdparty/1.png") no-repeat center;
      background-size: cover;
    }

    li:nth-child(2) > div {
      background: url("/static/ybcp/img/thirdparty/55.png") no-repeat center;
      background-size: cover;
    }

    li:nth-child(2) > div:hover {
      background: url("/static/ybcp/img/thirdparty/5.png") no-repeat center;
      background-size: cover;
    }

    li:nth-child(3) > div {
      background: url("/static/ybcp/img/thirdparty/22.png") no-repeat center;
      background-size: cover;
    }

    li:nth-child(3) > div:hover {
      background: url("/static/ybcp/img/thirdparty/2.png") no-repeat center;
      background-size: cover;
    }


    li:nth-child(4) > div {
      background: url("/static/ybcp/img/thirdparty/44.png") no-repeat center;
      background-size: cover;
    }

    li:nth-child(4) > div:hover {
      background: url("/static/ybcp/img/thirdparty/4.png") no-repeat center;
      background-size: cover;
    }


    // li:hover {
    //   background: url("/static/ybcp/img/thirdparty/service-bg.jpg");
    //   border: unset;
    // }

    .service {
      i {
        background-position: 0 -33px;
      }
    }

    .cs-mail {
      i {
        background-position: 0 -68px;
      }

      .shrink {
        // right: 70px;
        right: 60px;
        background: #fff;
        border: 2px solid #bb9a55;
        position: absolute;
        top: 0px;
        width: 150px;
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

    .cs-mail-phone {
      .downloadcode {
        position: absolute;
        width: 128px;
        height: 150px;
        border: 1px solid #dedede;
        display: none;
        top: -30px;
        // right:70px;
        right: 60px;

        img {
          width: 100%;
          // height:100%;
        }
      }

    }

    .cs-mail-phone:hover {
      .downloadcode {
        display: block;
      }
    }

    .open-user {
      i {
        width: 43px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/ybcp/img/thirdparty/right_register.png") no-repeat;
      }
    }

    .shi-pay {
      i {
        width: 43px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/ybcp/img/thirdparty/right_freeplay.png") no-repeat;
      }
    }

    .cs-app {
      i {
        width: 20px;
        height: 26px;
        display: inline-block;
        margin: 8px 0;
        background: url("/static/ybcp/img/thirdparty/right_app.png") no-repeat;
      }
    }

    .cs-goTop {
      i {
        background-position: 0 -168px;
        height: 15px;
        width: 26px;
      }
    }
  }

  .new2019 {
    position: fixed;
    z-index: 9999;
    right: 20px;
    bottom: 30px;
    cursor: pointer;
    width: 230px;
    height: 230px;
    background-image: url('/static/ybcp/img/new2019.gif');

    .clBtn {
      background: url('/static/ybcp/img/new2019_close.png');
      z-index: 99999;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0px;
      right: 0px;
      display: none;
    }

    &:hover .clBtn {
      display: block;
    }
  }
</style>
