<template>
  <div class="activity-box">
    <div class="banner">
        <banView :headerImg="headerImg" :picBox='400' isScale='true'></banView>
    </div>
    <!-- <div class="lantern">
      <banLantern :notice='notice' :siteName="'tyc82'"></banLantern>
    </div> -->

    <!-- <section class="banner-cpyx">
      <vp-header-pic :headerImg="headBg" :BGC='bgColor'></vp-header-pic>
    </section> -->
    <div class="box_bg">
      <pub-activity
        show-banner
        :banner-style="bannerStyle"
        :styles="cssStyle"
        :class-obj="classObj"
        noTitle="noTitle"
        widths="1200"
        show-nav
        :nav-style="navStyle"
      ></pub-activity>
    </div>

  </div>
</template>

<script>
import banLantern from "../../../public/game_new/banLantern";
import banView from "../../../public/game_new/banView.vue";
import Activity from "../../../public/activity/index2";
export default {
  name: "index",
  components: {
    pubActivity: Activity,
    banView,
    banLantern
  },
  data() {
    return {
      notice: "/static/tyc82/img/home/notice-icon.png",
      headerImg: '/static/tyc82/img/prom_banner.jpg',
      bannerStyle: {
        liBackGroud:{
          backgroundColor:"#383838",
          borderRadius:"5px",
          height:"40px",
          lineHeight:"40px",
          margin:"5px 10px 0 0"
        },
        contentBack:{
          backgroundColor:"#191919"
        },
        noneBorder:{
          border:"none!important",
          lineHeight:"40px!important",
          color:"#fff"
        },
        className:"test4"
      },
      navStyle: {
        bannerHead: {
          width: "100%",
          height: "50px",
          borderRadius: "6px",
          margin: "0 auto 10px",
          backgroundColor: "#191919"
        },
        bannerUl: {
          width: "100%",
          margin: "0 auto",
          height: "100%"
        },
        li: {
          float: "left",
          width: "auto",
          height: "100%",
          textAlign: "center",
          boxSizing: "border-box"
        },
        a: {
          display: "block",
          position: "relative",
          lineHeight: "50px",
          fontSize: "14px",
          margin: "0 8px",
          padding: "0 20px"
        }
      },
      cssStyle: {
        padding: "20px",
        backgroundSize: "contain",
        maxWidth: "100%",
        minWidth: "1200px",
        margin: "0 auto"
      },
      classObj: {
        tyc82: true,
        navWidth: true
      },
      bgColor:'#47080E'
    };
  },
};
</script>
<style lang="less" scoped>
.activity-box{
  font-size: 0;
  background-color: #090909;
  .box_bg{
    // margin-top: 38px;
    background-color: #090909;
    background: url('/static/tyc82/img/prom_bg.png') no-repeat;
    background-size: 100% auto;
  }
  // .lantern{
  //   background: red;
  //   height: 50px;
  // }
}
</style>
