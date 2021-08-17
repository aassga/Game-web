<template>
  <div class="wrapper">
    <!-- 除首页外的banner -->
    <section class="banner-cpyx">
      <banView :headerImg="headBg"></banView>
    </section>

    <!-- 公告跑马灯 -->
    <banLantern :notice="notice" :siteName="'aqvns'"></banLantern>

    <pub-activity
      :banner-style="bannerStyle"
      show-nav-left
      :nav-style="navStyle"
      show-type="alert"
      show-layout="column"
      :styles="cssStyle"
      :contentStyle="contentStyle"
      :class-obj="classObj"
      widths="1200"
    ></pub-activity>
  </div>
</template>

<script>
import Activity from "../../../public/activity/index";
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern";
export default {
  name: "index",
  components: {
    pubActivity: Activity,
    banView,
    banLantern,
  },
  data() {
    return {
      clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      headBg: "/static/js85/img/banner_activity.jpg",
      notice: "/static/js85/img/home/notice.png",
      bannerStyle: {
        width: "100%",
        height: "400px",
        background: "url(/static/js85/img/banner_activity.jpg) no-repeat top",
        position: "relative",
        margin: "0 auto",
        backgroundSize: "cover",
      },
      navStyle: {
        bannerHead: {
          width: "220px",
          height: "540px",
          margin: "0 auto",
          padding: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 0 10px #181818",
          overflowY: "auto",
          position: "absolute",
          top: "0",
          zIndex: "2",
          // backgroundColor: '#fff'
          backgroundImage: "linear-gradient(90deg,#191919,#242424)",
        },
        bannerUl: {
          width: "100%",
          margin: "0 auto",
          height: "100%",
        },
        li: {
          // float: 'left',
          height: "70px",
          lineHeight: "70px",
          textAlign: "center",
          boxSizing: "border-box",
        },
        a: {
          display: "block",
          position: "relative",
          height: "70px",
          lineHeight: "70px",
          fontSize: "20px",
          color: "#454a53",
          transition: ".3s",
        },
      },
      cssStyle: {
        // padding: '30px 20px 20px',
        background: "#090909",
        minHeight: "800px",
        // maxWidth: '1920px',
        // minWidth: '1200px',
        margin: "36px auto 0",
        width: "100%",
      },
      contentStyle: {
        position: "relative",
      },
      classObj: {
        column: true,
        aqvns1: true,
        navWidth: true,
      },
    };
  },
  created() {
    if (this.clientwidth > 1920) {
      this.bannerStyle.height = (400 * this.clientwidth) / 1920 + "px";
    }
  },
  methods: {
    // 新文字走马灯接口
    async getLantern() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
      });
      if (res && res.code == 200) {
        if (res.data.data.length) {
          this.lantern = res.data.data[0] && res.data.data[0].description;
        } else {
          return false;
        }
      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
    },
  },
  mounted() {
    this.getLantern();
  },
};
</script>
