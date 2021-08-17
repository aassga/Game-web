<template>
  <div class="activity-box">
    <section class="banner-cpyx">
      <banView :headerImg="headerImg"></banView>
    </section>
    <!-- <banLantern :notice='notice' :siteName="'amxpj'"></banLantern> -->
    <div class="box_bg">
      <pub-activity show-banner :banner-style="bannerStyle" show-nav-left :nav-style="navStyle" show-type="alert"
                    show-layout="column" :styles="cssStyle" :contentStyle="contentStyle" :class-obj="classObj" widths="1200"></pub-activity>
    </div>

  </div>
</template>

<script>
import Activity from '../../../public/activity/index'
import banView from '../../../public/game_new/banView.vue'
import banLantern from '../../../public/game_new/banLantern'

export default {
  name: 'index',
  components: {
    pubActivity: Activity,
    banView,
    banLantern
  },
  data () {
    return {
      headerImg: '/static/amxpj/img/new_games/banner/yh.jpg',
      notice: '/static/amxpj/img/home/notice-icon.png',
      bannerStyle: {},
      navStyle: {
        bannerHead: {
          width: '220px',
          height: '540px',
          margin: '0 auto',
          padding: '20px 0',
          borderRadius: '10px',
          boxShadow: 'rgb(25,29,34) 0px 0px 10px',
          overflowY: 'auto',
          position: 'absolute',
          top: '0',
          zIndex: '2',
          backgroundColor: '#1d1534'
        },
        bannerUl: {
          width: '100%',
          margin: '0 auto',
          height: '100%'
        },
        li: {
          // float: 'left',
          height: '70px',
          lineHeight: '70px',
          textAlign: 'center',
          boxSizing: 'border-box'
        },
        a: {
          display: 'block',
          position: 'relative',
          height: '70px',
          lineHeight: '70px',
          fontSize: '20px',
          color: '#9075de',
          transition: '.3s'
        }
      },
      cssStyle: {
        // padding: '30px 20px 20px',
        background: '#140d28',
        minHeight: '800px',
        // maxWidth: '1920px',
        // minWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      },
      contentStyle: {
        position: 'relative'
      },
      classObj: {
        column: true,
        amxpj1: true,
        navWidth: true
      },
      bgColor: '#251C47'
    }
  }
}
</script>
<style lang="less" scoped>
.activity-box {
  font-size: 0;
  background: #140d28;

  .box_bg {
    // margin-top: 35px;
  }
}
</style>
