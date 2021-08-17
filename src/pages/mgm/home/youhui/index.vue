<template>
  <div class="activity-box">
    <section class="banner-cpyx">
      <banView :headerImg="headerImg"></banView>
    </section>
    <!-- <banLantern :notice='notice' :siteName="'mgm'"></banLantern> -->
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
        headerImg: '/static/mgm/img/new_games/banner/yh.jpg',
        notice: '/static/mgm/img/home/notice-icon.png',
        bannerStyle: {},
        navStyle: {
          bannerHead: {
            width: '100%',
            height: '50px',
            borderRadius: '6px',
            margin: '0 auto 10px',
            backgroundColor: '#2d2052'
          },
          bannerUl: {
            width: '100%',
            margin: '0 auto',
            height: '100%'
          },
          li: {
            float: 'left',
            width: 'auto',
            height: '100%',
            textAlign: 'center',
            boxSizing: 'border-box'
          },
          a: {
            display: 'block',
            position: 'relative',
            height: '50px',
            lineHeight: '50px',
            fontSize: '14px',
            margin: '0 8px',
            padding: '0 20px'
          }
        },
        cssStyle: {
          padding: '20px',
          backgroundSize: 'contain',
          maxWidth: '100%',
          minWidth: '1200px',
          margin: '0 auto'
        },
        classObj: {
          mgm: true,
          navWidth: true
        },
        bgColor: '#251C47'
      }
    },
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
