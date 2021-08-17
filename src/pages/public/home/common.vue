<template>
    <div>
        <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box">
            <div class="popout-box">
                <span v-html="popups" v-if="isTest"></span>
                <img :src="popups" v-else />
            </div>
        </Modal>
        <div style="text-align:center">
            <div class="mcBox" v-show="showimg">
                <span class="cellSpan"></span>
                <div class="cellContent">
                    <!-- iview插件 -->
                    <span style="position:absolute;right:0px;top:0;width:70px;height:70px;cursor:pointer;" @click="mcClose"></span>
                    <a href="javascript:void(0)"><img :src="imgsrc" alt=""></a>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      isTest: true,
      popoutObj: {
        client_type: "PC"
      },
      popups: "",
      imgsrc: "",
      showPopout: false,
      description: "text",
      showimg: false
    };
  },
  methods: {
    mcClose() {
      this.showimg = false;
    },
    getPosition() {
      let appears_location = "";
      let bounce_location = "";
      let fullPath = this.$router.currentRoute.fullPath;
      // 是否首页
      if (fullPath == "/home") {
        this.popoutObj.appears_location = 1;
      } else if (
        fullPath.includes("/home/live") ||
        fullPath.includes("/home/games") ||
        fullPath.includes("/home/buyu") ||
        fullPath.includes("/home/tiyu") ||
        fullPath.includes("/home/chess") ||
        fullPath.includes("/home/sport") ||
        fullPath.includes("/home/qipai") ||
        fullPath.includes("/home/caipiao")
      ) {
        this.popoutObj.appears_location = 2;
      } else {
        // 非游戏页面和首页
        this.popoutObj.appears_location = 3;
      }
      // 是否登录
      if (localStorage.token) {
        // 存在表示登录后
        this.popoutObj.bounce_location = 2;
      } else {
        // 登录前
        this.popoutObj.bounce_location = 1;
      }
    },
    async getPopout1() {
      this.getPosition();
      if (this.popoutObj.appears_location == 3) {
        // 非首页和游戏页，不用请求
        return false;
      }
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "popups",
        client_type: this.popoutObj.client_type,
        appears_location: this.popoutObj.appears_location,
        bounce_location: this.popoutObj.bounce_location
      });
      // 换一种写法
      let hasContent = false;
      if (res && res.code == 200) {
        if (res.data.data.length) {
          this.description = res.data.data[0].desc_format_type;
          hasContent = true;
          if (localStorage.token && this.popoutObj.appears_location == 1) {
            this.$store.state.mainState.showDialog.home.login = false;
          } else if (
            !localStorage.token &&
            this.popoutObj.appears_location == 1
          ) {
            this.$store.state.mainState.showDialog.home.noLogin = false;
          } else if (
            localStorage.token &&
            this.popoutObj.appears_location == 2
          ) {
            this.$store.state.mainState.showDialog.game.login = false;
          } else if (
            !localStorage.token &&
            this.popoutObj.appears_location == 2
          ) {
            this.$store.state.mainState.showDialog.game.noLogin = false;
          }
        }
      } else {
        return false;
      }

      let is_appears_location = false;
      // 判断登录状态按钮
      if (hasContent) {
        if (res.data.data[0] && res.data.data[0].desc_format_type == "text") {
          this.isTest = true;
          this.popups = res.data.data[0].description;
        } else {
          this.isTest = false;
          this.imgsrc = res.data.data[0].pc_pic;
        }
        this.$store.commit("mainState/resetPour", true);
        if (
          res.data.data[0].appears_location == this.popoutObj.appears_location
        ) {
          is_appears_location = true;
        }
      } else {
        return false;
      }
      if (is_appears_location) {
        // 登录状态一直
        if (res.data.data[0].bounce_location != 3) {
          // 返回数据显示，并非是不限制登录，都要弹出（登录前和登录后，都要）
          if (
            res.data.data[0].bounce_location == res.data.data[0].bounce_location
          ) {
            // 表示符合后台返回的情况,弹出
            if (this.description == "text") {
              this.showPopout = true;
            } else {
              this.showimg = true;
            }
          } else {
            // 不符合，不弹出
            if (this.description == "text") {
              this.showPopout = false;
            } else {
              this.showimg = false;
            }
          }
        } else {
          // 不限制，都要弹出
          if (this.description == "text") {
            this.showPopout = true;
          } else {
            this.showimg = true;
          }
        }
      } else {
        // 当前页和后台返回的页面不一致（主要判断是否是游戏页面和首页），
        if (res.data.data[0].appears_location == "1,2") {
          // 所有页面都要弹出
          if (this.description == "text") {
            this.showPopout = true;
          } else {
            this.showimg = true;
          }
        } else {
          // 不弹
          if (this.description == "text") {
            this.showPopout = true;
          } else {
            this.showimg = true;
          }
        }
      }
    }
  },
  created() {
    let { game, home } = this.dalaDog;
    if (game.login && game.noLogin && home.login && home.noLogin) {
      this.getPopout1();
    }
  },
  computed: {
    dalaDog() {
      return this.$store.state.mainState.showDialog;
    }
  },
  watch: {
    $route(nVal, oVal) {
      let { game, home } = this.dalaDog;
      if (
        nVal.path == "/home" &&
        !oVal.path.includes("/plays/hall") &&
        !oVal.path.includes("/rules")
      ) {
        if (home.login && home.noLogin) {
          this.getPopout1();
        }
      }
      if (
        nVal.path == "/home/qipai" ||
        nVal.path == "/home/tiyu" ||
        nVal.path == "/home/live" ||
        nVal.path == "/home/buyu" ||
        nVal.path.includes("/home/games")
      ) {
        if (game.login && game.noLogin) {
          this.getPopout1();
        }
      }
    },
    // showPopout: function(val, oldval) {
    //   if (val) {
    //     setTimeout(() => {
    //       this.showPopout = false;
    //     }, 13000);
    //   }
    // },
    // showimg: function(val, oldval) {
    //   if (val) {
    //     setTimeout(() => {
    //       this.showimg = false;
    //     }, 13000);
    //   }
    // }
  }
};
</script>
<style lang="less" scoped>
.mcBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10001;
  display: flex;
  justify-content: center;
  align-items: center;
  .cellSpan {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .cellContent {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    // background-color: red;
    .mcX {
      width: 50px;
      height: 50px;
      position: absolute;
      // right:10px;
      // top:110px;
      right: 0;
      top: 0;
      // 此处位置需要根据位置随时更改
      cursor: pointer;
      font-size: 40px;
      color: #000;
    }
  }
}
</style>
