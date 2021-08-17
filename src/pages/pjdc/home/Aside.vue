<template>
<div>
   <ul class="qy-service TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
    <li class="service" >
      <a class="kefu" :href="url" target="_blank">
      </a>
    </li>
    <li class="chess" @click="$router.push('/home/chess?navid=9&id=0')">
      <div>
      </div>
    </li>

    <li class="fish" @click="$router.push('/home/fish?navid=9&id=0')">
      <div>
      </div>
    </li>

    <li class="app" @click="goDownload">
      <div>
      </div>
    </li>

    <li class="youhui" @click="$router.push('/home/youhui')">
      <div>
        </div>
    </li>

    <li class="goTop" @click="goTop">
      <div>
      </div>
    </li>
  </ul>
</div>
 
</template>

<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      showNew2019: true,
      url:""
    };
  },
  methods: {
    goDownload() {
       window.open("/static/pjdc/html/download/index.html")
    },
    goResiter() {
      this.$router.push("/home/register");
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
    goTop() {
      let curr_top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let time_id = setInterval(() => {
        curr_top -= 40;
        document.documentElement.scrollTop = curr_top;
        document.body.scrollTop = curr_top;
        if (curr_top <= 0) {
          clearInterval(time_id);
        }
      }, 10);
    }
  },
  mounted() {
    this.getUrl();
    this.$addWindow();
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
};
</script>

<style lang="less" scoped>
.qy-service {
  right: 20px;
  li {
    position: relative;
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
    border: 1px solid #74262e;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#dee5fb),
      to(#fff)
    );
    background: -webkit-linear-gradient(bottom, #dee5fb, #fff);
    background: -o-linear-gradient(bottom, #dee5fb, rgb(82, 81, 81));
    background: linear-gradient(0deg, #dee5fb, #fff);
    div {
      background-size: 100% 100%;
      height: 65px;
      width: 65px;
    }

    p {
      font-size: 14px;
      text-align: center;
      line-height: 1;
      color: inherit;
    }
  }

  li:hover {
    background: url("/static/pjdc/img/new_games/fc/service-bg.png");
    border: unset;
  }
  .service {
    a {
      display: inline-block;
      width: 65px;
      height: 65px;
      background: url("/static/pjdc/img/new_games/fc/1.png");
    }
  }
  .chess {
    div {
      background: url("/static/pjdc/img/new_games/fc/2.png");
    }
  }
  .fish {
    div {
      background: url("/static/pjdc/img/new_games/fc/3.png");
    }
  }
  .app {
    div {
      background: url("/static/pjdc/img/new_games/fc/4.png");
    }
  }
  .youhui {
    div {
      background: url("/static/pjdc/img/new_games/fc/5.png");
    }
  }
  .goTop {
    div {
      background: url("/static/pjdc/img/new_games/fc/6.png");
    }
  }
}
</style>
