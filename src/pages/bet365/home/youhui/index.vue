<template>
  <pub-activity :styles="cssStyle" widths="1000" :class-obj="classObj" show-banner :banner-style="bannerStyle"
                show-nav :nav-style="navStyle"></pub-activity>
</template>

<script>
import Activity from '../../../public/activity/index'

export default {
  name: 'index',
  components: {
    pubActivity: Activity
  },
  data () {
    return {
      clientwidth:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
      bannerStyle: {
        width: '100%',
        height: '250px',
        background: 'url(/static/bet365/img/banner_activity.jpg) no-repeat top',
        position: 'relative',
        margin: '0 auto',
        backgroundSize: 'cover'
      },
      navStyle: {
        bannerHead: {
          width: '1000px',
          height: '50px',
          margin: '0 auto 10px',
          backgroundColor: '#1b1b1b'
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
          // transition: '.3s'
        }
      },
      cssStyle: {
        paddingTop: '0px',
        backgroundPosition: 'center top',
        backgroundColor: '#252525'
      },
      classObj: {
        betsb: true,
        navWidth: true
      }

    }
  },
  created () {
    if (this.clientwidth > 1920) {
      this.bannerStyle.height = (250 * this.clientwidth) / 1920 + 'px'
    }
  }
}
</script>
