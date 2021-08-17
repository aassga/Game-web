<template>
    <pub-activity show-banner :banner-style="bannerStyle" show-type="alert" show-layout="column" :styles="cssStyle" :class-obj="classObj"
                  widths="1200"></pub-activity>
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
      bannerStyle: {
        width: '1920px',
        height: '270px',
        background: 'url(/static/ybcp/img/banner_activity.png) no-repeat top',
        position: 'relative',
        margin: '0 auto'
      },
      cssStyle: {
        padding: '30px 20px 20px',
        background: '#e3eaf1',
        maxWidth: '1920px',
        minWidth: '1200px',
        margin: '0 auto'
      },
      classObj: {
        column: true
      }

    }
  }
}
</script>
