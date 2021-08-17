<template>
  <div class="new-side-css">
    <ul>
      <li v-for="(item,i) in sideDatas" :key="i" @click="goTo(item.id)">
        <img :src="item.id|capitalize" alt="">
        <span>{{item.name}}</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>


  </div>
</template>
<script>
// 获取侧边导航ico分类
import store from "@/vuex/store";

export default {
  data() {
    return {
      sideDatas: [],
      router: "/"
    };
  },
  methods: {
    series() {
      this.sideDatas.forEach(outItem => {
        outItem.lottery &&
          outItem.lottery.forEach(intItem => {
            if (
              intItem &&
              intItem.router &&
              intItem.router == this.$route.path.toString() &&
              outItem.name != "常用彩种"
            ) {
              this.$store.commit("lottery/resetSeriesMsg", {
                code: intItem.code,
                series: JSON.parse(intItem.special_setting).series,
                id: intItem.id,
                title: intItem.name
              });
            }
          });
      });
    },
    toHome(item) {
      if (item.name == "购彩大厅") {
        this.$router.push({
          path: "/plays/hall"
        });
      }
    },
    handleOpen(key, keyPath) {},
    handleSelect(key, keyPath) {},
    handleClose(key, keyPath) {},
    // 获取左边导航栏
    getLeftMenu() {
      let list = this.$getGameV4('lottery',219)
       list.forEach(item => {
              item.id ? (item.router = `/plays/tradition/${item.id}`) : "";
       });
       if (list.length > 22) {
          list = list.splice(0, 22);
       }
       list.push({
          name: "更多彩票",
          router: "/home",
          id: "438"
        })
        list.unshift({
          name: "长龙助手",
          router: "/plays/tradition/99996",
          id: "99996"
        });
        console.log(list)
        this.sideDatas = list;
        this.$store.commit("lottery/setReady");

      // this.$http
      //   .post(`${this.$HOST_NAME}/gameSortNew`, {
      //     id: 30001,
      //     device: "pc"
      //   })
      //   .then(res => {
      //     if (res && res.code == 200) {
      //       let list = res.data[30001];
      //       list.forEach(item => {
      //         item.id ? (item.router = `/plays/tradition/${item.id}`) : "";
      //       });
      //       if (list.length > 22) {
      //         list = list.splice(0, 22);
      //       }
      //       list.push({
      //         name: "更多彩票",
      //         router: "/home",
      //         id: "438"
      //       })
      //       list.unshift({
      //         name: "长龙助手",
      //         router: "/plays/tradition/99996",
      //         id: "99996"
      //       });
      //       this.sideDatas = list;
      //       this.$store.commit("lottery/setReady");
      //     }
      //   });
    },
    goTo(id) {
      if (localStorage.token) {
          if (id !== "438") {
            this.$store.dispatch('lottery/getStopLotteryCheck',id).then(res=>{
               if(res&&res.length >0 ){
                     this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: 'warn',
                        type:'closeMaret',
                     });
               }else{
                  this.$router.push({
                      path: `/plays/tradition/${id}`
                  });
               }
            })
          } else {
            this.$router.push({
              path: "/plays/hall"
            });
          }
      } else {
        this.$store.commit("alert/showLogin", true);
        this.$store.commit("alert/setLoginTitle", "用户登录");
      }
    }
  },
  // 监听路由跳转
  watch: {
    $route() {
      this.series();
    }
  },
  mounted() {},
  created() {
    this.getLeftMenu();
    this.router = this.$route.path;
  },
  computed: {},
  filters: {
    capitalize: function(value) {
      try {
        return `/static/public/image/lottery/nico/svg/${value}.svg`;
      } catch (err) {
        return `/static/public/image/lottery/ico/vp-changwan-ico.png`;
      }
    }
  },
  store
};
</script>

<style lang="less" scoped>
.new-side-css {
  ul {
    li {
      height: 58px;
      border-bottom: 1px solid #f5f5f5;
      line-height: 58px;
      position: relative;
      padding-left: 58px;
      cursor: pointer;

      img {
        width: 40px;
        position: absolute;
        top: 9px;
        left: 10px;
      }
      span {
        font-size: 17px;
      }
      i {
        position: absolute;
        right: 10px;
        top: 20px;
      }
    }
  }
}
</style>
