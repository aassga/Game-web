<template>
  <pub-activity :stationName="stationName" show-banner :banner-style="bannerStyle" showNav :nav-style="navStyle" show-type="alert"
                show-layout="column-img2" :styles="cssStyle" :class-obj="classObj" widths="1200"></pub-activity>
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
        stationName:'tg1',
        clientwidth:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        bannerStyle: {
          maxWidth: '1920px',
          height: '300px',
          // background: 'url(/static/test-1/img/carouel/yh.jpg) no-repeat top',
          position: 'relative',
          margin: '0 auto',
          backgroundSize: 'cover'
        },
        navStyle: {
          bannerHead: {
            /* width: '1130px',
             // height: '60px',
             margin: '40px auto 0',
             padding: '0 0 22px',
             backgroundColor: '#fff'*/
          },
          bannerUl: {
            overflow:'hidden',
            width: '1130px',
            // height: '60px',
            margin: '40px auto 0',
            padding: '0 0 22px',
            backgroundColor: '#fff'
          },
          li: {
            float: 'left',
            height: '100%',
            fontSize:'14px',
            textAlign: 'center',
            boxSizing: 'border-box'
          },
          a: {
            display: 'block',
            margin: '0 5px',
            borderRadius: '25px',
            border: 'none',
            padding: '0 10px',
            minWidth: '120px',
            backgroundColor: '#f0f6f9',
            color: '#313131',
            lineHeight: '42px',
            transition: 'none',
          },
        },
        cssStyle: {
          padding: '30px 0',
          background: '#f6f6f6',
          // maxWidth: '1920px',
          // minWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        },
        classObj: {
          column: true,
          test1: true
        }

      }
    }

  }
</script>
