<template>
  <pub-activity show-banner :banner-style="bannerStyle" show-nav-out :nav-style="navStyle" show-type="alert"
                show-layout="column" :styles="cssStyle" :class-obj="classObj" widths="1200"></pub-activity>
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
          height: '400px',
          background: 'url(/static/cpzj/img/banner_activity.jpg) no-repeat top',
          position: 'relative',
          margin: '0 auto',
          backgroundSize: 'cover'
        },
        navStyle: {
          bannerHead: {
            width: '100%',
            height: '60px',
            margin: '0 auto',
            backgroundColor: '#af221f'
          },
          bannerUl: {
            width: '1200px',
            margin: '0 auto',
            height: '100%'
          },
          li: {
            float: 'left',
            height: '100%',
            textAlign: 'center',
            boxSizing: 'border-box'
          },
          a: {
            display: 'block',
            position: 'relative',
            height: '60px',
            lineHeight: '60px',
            fontSize: '16px',
            color: '#ffffff',
            transition: '.3s'
          }
        },
        cssStyle: {
          padding: '30px 20px 20px',
          background: 'url(/static/cpzj/img/bg_activity.png)',
          maxWidth: '1920px',
          minWidth: '1200px',
          margin: '0 auto'
        },
        classObj: {
          column: true,
          cpzj: true
        }

      }
    },
    created () {
      if (this.clientwidth > 1920) {
        this.bannerStyle.height = (400 * this.clientwidth) / 1920 + 'px'
      }
    }
  }
</script>
