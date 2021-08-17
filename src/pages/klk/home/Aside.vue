<template>
<div>
   <ul class="qy-service">
    <li class="service">
      <div>
        <i></i>
      </div>
      <a class="kefu" :href="url" target="_blank">在线客服</a>
    </li>
    <li class="cs-mail">
      <div>
        <i></i>
      </div>
      <div class="shrink">
        klk22k@163.com
      </div>
      <p>投诉信箱</p>
    </li>

    <li class="open-user" @click="$goPath('rot','/home/register')">
      <div>
        <i></i>
      </div>
      <p>免费开户</p>
    </li>
    <li class="cs-goTop" @click="goTop">
      <div>
        <i></i>
      </div>
      <p>一键置顶</p>
    </li>
  </ul>
</div>
</template>
<script>
import UserService from "@/service/public/UserService.js";
export default {
  data() {
    return {
      url:""
    };
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
    goTop() {
      let curr_top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let time_id = setInterval(() => {
        curr_top -= 200;
        document.documentElement.scrollTop = curr_top;
        document.body.scrollTop = curr_top;
        if (curr_top <= 0) {
          clearInterval(time_id);
        }
      }, 10);
    }
  },
  mounted(){
    this.getUrl()
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
};
</script>

<style lang="less" scoped>
.qy-service {
  position: fixed;
  right: 20px;
  z-index: 99;
  top: 212px;

  li {
    position: relative;
    width: 65px;
    height: 65px;
    background-color: #fff;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #d6d6d6;
    .kefu{
      display: inline-block;
      width: 100%;
      font-size: 14px;
      color: #6b6a6a;
      text-align: center;
    }
    div {
      height: 40px;
      line-height: 56px;
      text-align: center;

      i {
        display: inline-block;
        background: url("/static/klk/img/thirdparty/cebianlan-sprite.png")
          no-repeat top left;
        width: 19px;
        height: 25px;
      }
    }

    p {
      font-size: 14px;
      text-align: center;
    }
  }

  li:hover {
    background: url("/static/klk/img/thirdparty/service-bg.png");
    border: unset;
  }

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
      right: 70px;
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

  .open-user {
    i {
      width: 43px;
      height: 26px;
      display: inline-block;
      margin: 8px 0;
      background: url("/static/klk/img/thirdparty/right_register.png") no-repeat;
    }
  }
  .shi-pay {
    i {
      width: 43px;
      height: 26px;
      display: inline-block;
      margin: 8px 0;
      background: url("/static/klk/img/thirdparty/right_freeplay.png") no-repeat;
    }
  }
  .cs-app {
    i {
      width: 20px;
      height: 26px;
      display: inline-block;
      margin: 8px 0;
      background: url("/static/klk/img/thirdparty/right_app.png") no-repeat;
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
</style>
