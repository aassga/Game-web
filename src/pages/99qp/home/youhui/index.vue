<template>
  <pub-activity show-banner :banner-style="bannerStyle" show-nav-left :nav-style="navStyle" show-type="alert"
                show-layout="column" :styles="cssStyle" :contentStyle="contentStyle" :class-obj="classObj" widths="1200"></pub-activity>
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
      headerImg: '/static/99qp/img/carouel/yh.jpg',
      notice: '/static/99qp/img/home/notice-icon.png',
      bannerStyle: {},
      navStyle: {
        bannerHead: {
          width: '220px',
          height: '540px',
          margin: '0 auto',
          padding: '20px 0',
          borderRadius: '10px',
          boxShadow: '0 0 10px #f3f5f8',
          overflowY: 'auto',
          position: 'absolute',
          top: '0',
          zIndex: '2',
          backgroundColor: '#fff'
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
          color: '#454a53',
          transition: '.3s'
        }
      },
      cssStyle: {
        // padding: '30px 20px 20px',
        background: '#f7fbfe',
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
        amhg: true,
        navWidth: true
      },
      bgColor: '#f6f6f6'
    }
  }
}
</script>
<style lang="less" scoped>
.activity-box {
  font-size: 0;
  // background: #140d28;
  background: rgb(227, 234, 241);

  .box_bg {
    // margin-top: 35px;
  }
}
</style>
