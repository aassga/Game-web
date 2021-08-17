<template>
<div>
   <ul class="qy-service TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
    <li class="service" >
      <a :href="url" target="_blank">
      </a>
    </li>

    <li class="cs-mail">
      <div>
      </div>
      <div class="shrink">
        vip623com@gmail.com
      </div>
    </li>

    <li class="Agency" @click="$router.push('/home/about/4')">
      <div>
      </div>
    </li>

    <!-- <li class="jiebei" @click="$router.push('/home/youhui')">
      <div>
      </div>
    </li> -->

    <li class="gold_housekeeper" @click="$router.push('/home/youhui')">
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
</div>

</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'
  export default {
    data () {
      return {
        showNew2019:true,
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
      },
      goDownload(){
         window.open("/static/632qp/html/download/index.html")
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
    },
    mounted(){
      this.getUrl()
      this.$addWindow()
    },
    store
  }
</script>

<style lang="less" scoped>
  .qy-service {
    right: 20px;
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
      background: url("/static/632qp/img/thirdparty/service-bg.png");
      border: unset;
    }

    .service {
      a{
        display: inline-block;
        height:65px;
        width:65px;
        background: url("/static/632qp/img/thirdparty/kefu.png");
      }
    }
    .by-service{
      div{
        background:url(/static/632qp/img/thirdparty/by-kefu.png)
      }
    }

    .cs-mail {
      div{
        background: url("/static/632qp/img/thirdparty/tousu.png");
      }
      .shrink {
        right: 70px;
        background: #fff;
        border: 2px solid #bb9a55;
        position: absolute;
        top: 0px;
        width: 175px;
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
         background:url(/static/632qp/img/thirdparty/daili.png)
      }
    }
    .jiebei {
      div{
        background: url("/static/632qp/img/thirdparty/jiebei.png");
      }
    }

    .gold_housekeeper {
      div{
        background: url("/static/632qp/img/thirdparty/jinguanjia.png");
      }
    }

    .download{
      div{
        background: url("/static/632qp/img/thirdparty/download.png")
      }
    }

    .cs-goTop {
      div{
        background: url("/static/632qp/img/thirdparty/zhiding.png")
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
    background-image: url('/static/632qp/img/new2019.gif');

    .clBtn{
      background: url('/static/632qp/img/new2019_close.png');
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
