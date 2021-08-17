<template>
  <pub-activity show-banner :banner-style="bannerStyle" show-nav-left :nav-style="navStyle" show-type="alert"
                show-layout="column" :styles="cssStyle" :contentStyle="contentStyle" :class-obj="classObj" widths="1200"></pub-activity>
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
        background: 'url(/static/amhg/img/banner_activity.jpg) no-repeat top',
        position: 'relative',
        margin: '0 auto',
        backgroundSize: 'cover'
      },
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
      }

    }
  },
  created () {
       if(this.clientwidth>1920){
            this.bannerStyle.height= (400*this.clientwidth)/1920+"px"
       }
  }
}
</script>
