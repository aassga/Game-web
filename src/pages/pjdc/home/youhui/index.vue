<template>
  <div class="activity-box">
    <section class="banner-cpyx">
      <banView :headerImg="headBg" :picBox='300' :BGC='bgColor'></banView>
    </section>
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
</template>

<script>
  import Activity from '../../../public/activity/index'
  import banView from '../../../public/game_new/banView.vue'

  export default {
    name: 'index',
    components: {
      pubActivity: Activity,
      banView
    },
    data () {
      return {
        headBg: '/static/pjdc/img/activity-top-bg.png',
        bannerStyle: {},
        navStyle: {
          bannerHead: {
            width: '100%',
            height: '50px',
            borderRadius: '6px',
            margin: '0 auto 10px',
            backgroundColor: '#47110d'
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
          pjdc: true,
          navWidth: true
        },
        bgColor: '#47080E'
      }
    },
  }
</script>
<style lang="less" scoped>
  .activity-box {
    font-size: 0;
    background: #2f0906;
  }
</style>
