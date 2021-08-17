<template>
  <pub-activity show-type="scroll" show-layout="has-title" :styles="cssStyle" :class-obj="classObj"
                :scroll-img="scrollImg"
                widths="1000"></pub-activity>
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
      cssStyle: {
        paddingTop: '20px',
        background: '#ffffff',
        backgroundPosition: 'center top',
        font: '12px/2em Microsoft YaHei,SimSun,Arial'
      },
      classObj: {
        scroll: true
      },
      scrollImg: {
        logo: '/static/csj/img/logo.png',
        defaultImg: '/static/csj/img/notPicture.png',
        floorLine: '/static/csj/img/activityShaw.png'
      }

    }
  }
}
</script>
